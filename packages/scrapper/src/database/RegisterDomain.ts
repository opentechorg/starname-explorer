import { DomainNft, DomainSchemaModel, RegisterDomainValue } from "@starname-explorer/shared";

import { StarnameExtension } from "../starname";

export async function RegisterDomain(client: StarnameExtension, domain: RegisterDomainValue): Promise<void> {
  const domainInfo = await client.starname.queryDomainInfo(domain.domain);

  await saveDomainNft(domainInfo);
}

export async function saveDomainNft(domain: DomainNft): Promise<void> {
  await DomainSchemaModel.updateOne(
    { domain: domain.name },
    { ...domain, domain: domain.name },
    {
      upsert: true,
    },
  );
}
