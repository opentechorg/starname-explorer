import {
  getAccountTransferQuery,
  getDomainRenewsQuery,
  getDomainTransferQuery,
  getRegAccountQuery,
  getRegDomainQuery,
  StarnameExtension,
} from "./starname";
import { processStarnameTx } from "./Transactions/process";

let txsPerPage = 10;

async function fetchHistoryData(
  client: StarnameExtension,
  query: (limit: number, page: number) => string,
): Promise<void> {
  const txsCount = await client.starname.txsCount(query);

  const totalPages = Math.ceil(txsCount / txsPerPage);

  for (let page = 1; page <= totalPages; page++) {
    try {
      const txMsgs = await client.starname.transactions(query, txsPerPage, page);

      for (const msg of txMsgs) {
        await processStarnameTx(client, msg);
      }
    } catch (err) {
      console.error(err);
    }
  }

  console.log(`${txsCount} records has been processed.`);
}

export async function processHistory(client: StarnameExtension): Promise<void> {
  txsPerPage = Number(process.env.TXS_PER_PAGE);

  console.log("Processing domains...");
  await fetchHistoryData(client, getRegDomainQuery);
  console.log("Processing accounts...");
  await fetchHistoryData(client, getRegAccountQuery);
  console.log("Processing domain transfers...");
  await fetchHistoryData(client, getDomainTransferQuery);
  console.log("Processing domain renews...");
  await fetchHistoryData(client, getDomainRenewsQuery);
  console.log("Processing account transfers...");
  await fetchHistoryData(client, getAccountTransferQuery);

  console.log("History processing done!");
}
