import { DomainSchemaModel } from "@starname-explorer/shared";
import { Request, Response } from "express";

export class DomainsController {
  getDomains(req: Request, res: Response): void {
    const page = Number(req.query.page) || 1;

    const maxLimitPerPage = Number(process.env.MAX_RESULTS_PER_PAGE);
    let limit = Number(req.query.limit) || maxLimitPerPage || 100;

    if (limit > maxLimitPerPage) {
      limit = maxLimitPerPage;
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
        ).then((page) => res.json(page));
      } else {
        DomainSchemaModel.findWithPages(
          {},
          {
            page,
            limit,
            // populate: "starnames",
            sort: { domain: +1 },
          },
        ).then((page) => res.json(page));
      }
    } catch (err) {
      console.error(err);
    }
  }
}
