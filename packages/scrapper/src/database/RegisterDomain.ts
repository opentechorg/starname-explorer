import {
  DomainNft,
  DomainSchemaModel,
  RegisterDomainValue,
  StarnameExtension,
} from "@starname-explorer/shared";

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
