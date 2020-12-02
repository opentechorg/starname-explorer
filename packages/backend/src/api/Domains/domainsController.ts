import { DomainSchemaModel } from "@starname-explorer/shared";
import { DefinedError } from "ajv";
import { Request, Response } from "express";

import validateDomainPageReq from "../../validators/domainPageRequest";

export class DomainsController {
  getDomains(req: Request, res: Response): void {
    if (!validateDomainPageReq(req.query)) {
      for (const err of validateDomainPageReq.errors as DefinedError[]) {
        console.log(err);
      }
      res.status(400).send(JSON.stringify(validateDomainPageReq.errors));
      return;
    }

    let query = {};
    if (req.query.query) {
      query = {
        $or: [
          { domain: new RegExp(req.query.query ? .toLowerCase()) },
          { admin: new RegExp(req.query.query.toLowerCase()) },
        ],
      }
    }

    try {
      if (req.query.id != null) {
        const domainId = req.params.id;
        DomainSchemaModel.findWithPages(
          { _id: domainId },
          {
            page: 1,
            limit: 1,
            // populate: "starnames",
          },
        ).then(
          (page) => res.json(page),
          (reason) => console.error(reason),
        );
      } else {
        DomainSchemaModel.findWithPages(
          query,
          {
            page: req.query.page,
            limit: req.query.limit,
            // populate: "starnames",
            sort: { [req.query.sortColumn]: req.query.sortOrder },
          },
        ).then(
          (page) => res.json(page),
          (reason) => console.error(reason),
        );
      }
    } catch (err) {
      console.error(err);
    }
  }
}
