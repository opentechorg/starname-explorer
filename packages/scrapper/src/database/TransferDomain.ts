import { DomainSchemaModel, TransferDomainAllValue } from "@starname-explorer/shared";

export async function TransferDomain(transfer: TransferDomainAllValue): Promise<void> {
  await DomainSchemaModel.updateOne({ domain: transfer.domain }, { $set: { admin: transfer.new_admin } });
}
