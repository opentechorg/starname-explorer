import { DomainSchemaModel } from "@starname-explorer/shared";

import { StarnameExtension } from "../starname";

export async function RenewDomain(client: StarnameExtension, domain: string): Promise<void> {
  const domainInfo = await client.starname.queryDomainInfo(domain);

  await DomainSchemaModel.updateOne(
    { domain: domainInfo.name },
    { $set: { valid_until: domainInfo.valid_until } },
  );
}
