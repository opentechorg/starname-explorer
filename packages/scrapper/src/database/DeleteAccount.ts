import { DeleteAccountValue, StarnameSchemaModel } from "@starname-explorer/shared";

export async function DeleteAccount(accountToDelete: DeleteAccountValue): Promise<void> {
  await StarnameSchemaModel.deleteOne({ domain: accountToDelete.domain, name: accountToDelete.name });
}
