import { LcdClient } from "@cosmjs/launchpad";
import dotenv from "dotenv";
import mongoose from "mongoose";

import DomainModel from "./models/Domain/DomainSchema";
import StarnameModel from "./models/Starname/StarnameSchema";
import {
  isMsgRegisterAccount,
  isMsgRegisterDomain,
  isMsgRenewDomain,
  isMsgTransferAccount,
  isMsgTransferDomainAll,
} from "./msg";
import {
  getAccountTransferQuery,
  getDomainRenewsQuery,
  getDomainTransferQuery,
  getRegAccountQuery,
  getRegDomainQuery,
  setupStarnameExtension,
  StarnameExtension,
} from "./starname";

dotenv.config();

const txsPerPage = Number(process.env.TXS_PER_PAGE);

const processAccounts = async (client: StarnameExtension, page: number): Promise<void> => {
  const accounts = await client.starname.accounts(txsPerPage, page);

  for (const accountMsg of accounts) {
    if (isMsgRegisterAccount(accountMsg)) {
      const account = accountMsg.value;
      // console.log(account);
      await StarnameModel.updateOne(
        { domain: account.domain, name: account.name },
        { ...account },
        {
          upsert: true,
        },
        (error) => {
          if (error) {
            console.error(error);
          }
        },
      );
    } else {
      console.info(accountMsg);
    }
  }
};

const processDomainTransfers = async (client: StarnameExtension, page: number): Promise<void> => {
  const transfers = await client.starname.domainTransfers(txsPerPage, page);

  for (const transferMsg of transfers) {
    if (isMsgTransferDomainAll(transferMsg)) {
      // console.info(transferMsg);
      const transfer = transferMsg.value;
      await DomainModel.updateOne({ domain: transfer.domain }, { $set: { admin: transfer.new_admin } });
    } else {
      console.info(transferMsg);
    }
  }
};

const processAccountTransfers = async (client: StarnameExtension, page: number): Promise<void> => {
  const transfers = await client.starname.accountTransfers(txsPerPage, page);

  for (const transferMsg of transfers) {
    if (isMsgTransferAccount(transferMsg)) {
      console.info(transferMsg);
      const transfer = transferMsg.value;
      await StarnameModel.updateOne(
        { domain: transfer.domain, name: transfer.name },
        { $set: { owner: transfer.new_owner } },
      );
    } else {
      console.info(transferMsg);
    }
  }
};

const processDomainRenews = async (client: StarnameExtension, page: number): Promise<void> => {
  const renews = await client.starname.domainRenews(txsPerPage, page);

  for (const renewMsg of renews) {
    if (isMsgRenewDomain(renewMsg)) {
      // console.info(renewMsg);
      const renew = renewMsg.value;
      const domainDetails = await client.starname.query(`*${renew.domain}`);

      await StarnameModel.updateOne(
        { domain: domainDetails.domain, name: "" },
        { $set: { valid_until: domainDetails.valid_until } },
      );
    } else {
      console.info(renewMsg);
    }
  }
};

const processDomains = async (client: StarnameExtension, page: number): Promise<void> => {
  const domains = await client.starname.domains(txsPerPage, page);

  for (const domainMsg of domains) {
    if (isMsgRegisterDomain(domainMsg)) {
      const domain = domainMsg.value;
      await DomainModel.updateOne({ domain: domain.domain }, domain as any, {
        upsert: true,
      });

      const domainDetails = await client.starname.query(`*${domain.domain}`);

      await StarnameModel.updateOne(
        { domain: domainDetails.domain, name: domainDetails.name },
        { ...domainDetails },
        {
          upsert: true,
        },
      );
    } else {
      console.info(domainMsg);
    }
  }
};

const main = async (
  processor: (client: StarnameExtension, page: number) => Promise<void>,
  query: (limit: number, page: number) => string,
): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const client = LcdClient.withExtensions({ apiUrl: process.env.REST_URI! }, setupStarnameExtension);

  const txsCount = await client.starname.txsCount(query);

  const totalPages = Math.ceil(txsCount / txsPerPage);

  for (let page = 1; page <= totalPages; page++) {
    try {
      await processor(client, page);
    } catch (err) {
      console.error(err);
    }
  }

  console.log(`${txsCount} data has been processed.`);
};

mongoose.connect(`${process.env.DB_HOST_URI}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  console.log("Processing domains...");
  await main(processDomains, getRegDomainQuery);
  console.log("Processing accounts...");
  await main(processAccounts, getRegAccountQuery);
  console.log("Processing domain transfers...");
  await main(processDomainTransfers, getDomainTransferQuery);
  // console.log("Processing domain renews...");
  // await main(processDomainRenews, getDomainRenewsQuery);
  console.log("Processing account transfers...");
  await main(processAccountTransfers, getAccountTransferQuery);
  console.log("exiting");
  db.close();
});
