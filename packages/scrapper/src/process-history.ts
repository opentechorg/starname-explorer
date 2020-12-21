import { getStarnameMessageModuleQuery, StarnameExtension } from "@starname-explorer/shared";

import { processStarnameTx } from "./database/process";

let txsPerPage = 10;

async function fetchHistoryData(
  client: StarnameExtension,
  query: (limit: number, page: number) => string,
): Promise<void> {
  const txsCount = await client.starname.txsCount(query);

  const totalPages = Math.ceil(txsCount / txsPerPage);
  console.log(`txsPerPage: ${txsPerPage}, totalPages: ${totalPages}`);

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
  await fetchHistoryData(client, getStarnameMessageModuleQuery);

  console.log("History processing done!");
}
