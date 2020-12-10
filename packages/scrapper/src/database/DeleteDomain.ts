import { DeleteDomainValue, DomainSchemaModel, StarnameSchemaModel } from "@starname-explorer/shared";

export async function DeleteDomain(domain: DeleteDomainValue): Promise<void> {
  await DomainSchemaModel.deleteOne({ domain: domain.domain });
  await StarnameSchemaModel.deleteOne({ domain: domain.domain });
}
