import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";
import { chain } from "stream-chain";
import { parser } from "stream-json";
import { pick } from "stream-json/filters/Pick";
import { streamArray } from "stream-json/streamers/StreamArray";

import DomainModel from "./models/Domain/DomainSchema";
import StarnameModel from "./models/Starname/StarnameSchema";

dotenv.config();

const processDomains = async (): Promise<void> => {
  return new Promise((resolve) => {
    console.log("Processing domains...");
    const pipeline = chain([
      fs.createReadStream("./assets/genesis.json"),
      parser(),
      pick({ filter: "app_state" }),
      pick({ filter: "starname" }),
      pick({ filter: "domains" }),
      streamArray(),
      async (domain) => {
        // console.log("new data");
        // console.log(domain.value);
        await DomainModel.updateOne(
          { domain: domain.value.name },
          { ...domain.value, domain: domain.value.name },
          {
            upsert: true,
          },
        );
        // const value = data.value;
        // keep data only for the accounting department
        return domain;
      },
    ]);

    let counter = 0;
    pipeline.on("data", () => ++counter);
    pipeline.on("end", () => {
      console.log(`${counter} domains has been processed.`);
      resolve();
    });
  });
};

const processStarnames = async (): Promise<void> => {
  return new Promise((resolve) => {
    console.log("Processing starnames...");
    const pipeline = chain([
      fs.createReadStream("genesis.json"),
      parser(),
      pick({ filter: "app_state" }),
      pick({ filter: "starname" }),
      pick({ filter: "accounts" }),
      streamArray(),
      async (account) => {
        // console.log("new data");
        // console.log(account.value);
        await StarnameModel.updateOne(
          { domain: account.value.domain, name: account.value.name },
          { ...account.value },
          {
            upsert: true,
          },
        );
        return account;
      },
    ]);

    let counter = 0;
    pipeline.on("data", () => ++counter);
    pipeline.on("end", () => {
      console.log(`${counter} starnames has been processed.`);
      resolve();
    });
  });
};

mongoose.connect(`${process.env.DB_HOST_URI}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  await processDomains();
  await processStarnames();
  db.close();
  process.exit();
});
