import { DomainSchemaModel } from "@starname-explorer/shared";
import { Request, Response } from "express";

export class DomainsController {
  getDomains(req: Request, res: Response): void {
    const page = Number(req.params.page) || 1;
    const limit = Number(req.params.limit) || Number(process.env.MAX_RESULTS_PER_PAGE) || 100;

    try {
      if (req.params.id != null) {
        const domainId = req.params.id;
        DomainSchemaModel.findWithPages(
          { _id: domainId },
          {
            page,
            limit,
            populate: "starnames",
          },
        ).then((page) => res.json(page));
      } else {
        DomainSchemaModel.findWithPages(
          {},
          {
            page,
            limit,
            populate: "starnames",
            sort: { name: +1 },
          },
        ).then((page) => res.json(page));
      }
    } catch (err) {
      console.error(err);
    }
  }
}
