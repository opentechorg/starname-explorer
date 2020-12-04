import { LcdClient } from "@cosmjs/launchpad";
import dotenv from "dotenv";
import mongoose from "mongoose";

// import { bcEventsSubscription } from "./events-subscription";
import { processHistory } from "./process-history";
import { setupStarnameExtension } from "./starname";

dotenv.config();

mongoose.connect(`${process.env.DB_HOST_URL}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const client = LcdClient.withExtensions({ apiUrl: process.env.REST_URL! }, setupStarnameExtension);

  bcEventsSubscription(client);

  await processHistory(client);
});
