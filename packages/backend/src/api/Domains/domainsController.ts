import { Domain, DomainSchemaModel } from "@starname-explorer/shared";
import { DefinedError } from "ajv";
import { Request, Response } from "express";
import { MongooseFilterQuery } from "mongoose";

import validateDomainPageReq, { Columns, DomainTablePageReq } from "../../validators/domainPageRequest";

export class DomainsController {
  getDomains(req: Request, res: Response): void {
    if (!validateDomainPageReq(req.query)) {
      DomainsController.sendValidationError(res);
      return;
    }

    DomainsController.sendQueryResult(res, req.query);
  }

  private static sendQueryResult(res: Response, query: DomainTablePageReq): void {
    try {
      DomainSchemaModel.findWithPages(DomainsController.getSearchQuery(query), {
        page: query.page,
        limit: query.limit,
        populate: "starnames",
        sort: DomainsController.getSortOrder(query),
      }).then(
        (page) => res.json(page),
        (reason) => console.error(reason),
      );
    } catch (err) {
      console.error(err);
    }
  }

  private static sendValidationError(res: Response): void {
    for (const err of validateDomainPageReq.errors as DefinedError[]) {
      console.error(err);
    }
    res.status(400).send(JSON.stringify(validateDomainPageReq.errors));
  }

  private static getSearchQuery(query: DomainTablePageReq): MongooseFilterQuery<Domain> {
    if (query.query) {
      const clearQuery = query.query.toLowerCase().replace(/[^a-z^0-9^\-^_]/g, "");
      const regExpQuery = new RegExp(clearQuery);
      return {
        $or: [{ domain: regExpQuery }, { admin: regExpQuery }],
      };
    }

    return {};
  }

  private static getSortOrder(query: DomainTablePageReq): Partial<{ [K in Columns]: number }> {
    return {
      [query.sortColumn]: query.sortOrder,
      domain: query.sortColumn === "domain" ? query.sortOrder : 1,
    };
  }
}
