import { Msg } from "@cosmjs/launchpad";
import { StarnameSchemaModel } from "@starname-explorer/shared";

interface DeleteAccount {
  readonly domain: string;
  readonly name: string;
  /** Bech32 owner address */
  readonly owner: string;
  /** Bech32 fee_payer address */
  readonly fee_payer: string;
}

export interface MsgDeleteAccount extends Msg {
  readonly type: "starname/DeleteAccount";
  readonly value: DeleteAccount;
}

export function isMsgDeleteAccount(msg: Msg): msg is MsgDeleteAccount {
  return (msg as MsgDeleteAccount).type === "starname/DeleteAccount";
}

export async function MsgDeleteAccountStore(accountToDelete: DeleteAccount): Promise<void> {
  await StarnameSchemaModel.deleteOne({ domain: accountToDelete.domain, name: accountToDelete.name });
}
