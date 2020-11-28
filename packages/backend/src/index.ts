import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import apiBackend from "./api";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use("/api", apiBackend);

const PORT = Number(process.env.PORT) || 30000;

mongoose.connect(`${process.env.DB_HOST_URL}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  app
    .listen(PORT, "0.0.0.0", 999, () => {
      console.info(`==> 🌎 Listening on port ${PORT}. Open up http://localhost:${PORT}/ in your browser.`);
    })
    .on("error", console.error);
});

process.on("SIGINT", async () => {
  console.info("Bye bye!");
  process.exit(0);
});
