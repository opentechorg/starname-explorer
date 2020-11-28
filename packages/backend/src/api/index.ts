import express from "express";

import { DomainsController } from "./Domains";

const router = express.Router();

const domainsController = new DomainsController();
router.route("/domains").get(domainsController.getDomains);

export default router;
