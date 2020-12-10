import { StarnameSchemaModel, TransferAccountValue } from "@starname-explorer/shared";

export async function TransferAccount(transfer: TransferAccountValue): Promise<void> {
  await StarnameSchemaModel.updateOne(
    { domain: transfer.domain, name: transfer.name },
    { $set: { owner: transfer.new_owner } },
  );
}
