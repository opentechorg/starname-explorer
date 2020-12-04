import { DomainSchemaModel } from "@starname-explorer/shared";
import { DefinedError } from "ajv";
import { Request, Response } from "express";

import validateDomainPageReq from "../../validators/domainPageRequest";

export class DomainsController {
  getDomains(req: Request, res: Response): void {
    if (!validateDomainPageReq(req.query)) {
      for (const err of validateDomainPageReq.errors as DefinedError[]) {
        console.error(err);
      }
      res.status(400).send(JSON.stringify(validateDomainPageReq.errors));
      return;
    }

    let query = {};
    if (req.query.query) {
      const clearQuery = req.query.query.toLowerCase().replace(/[^a-z^0-9^\-^_]/g, "");
      query = {
        $or: [{ domain: new RegExp(clearQuery) }, { admin: new RegExp(clearQuery) }],
      };
    }

    try {
      DomainSchemaModel.findWithPages(query, {
        page: req.query.page,
        limit: req.query.limit,
        populate: "starnames",
        sort: { [req.query.sortColumn]: req.query.sortOrder },
      }).then(
        (page) => res.json(page),
        (reason) => console.error(reason),
      );
    } catch (err) {
      console.error(err);
    }
  }
}
