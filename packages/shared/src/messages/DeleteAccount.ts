import { Msg } from "@cosmjs/launchpad";

export interface DeleteAccountValue {
  readonly domain: string;
  readonly name: string;
  /** Bech32 owner address */
  readonly owner: string;
  /** Bech32 fee_payer address */
  readonly fee_payer: string;
}

export interface MsgDeleteAccount extends Msg {
  readonly type: "starname/DeleteAccount";
  readonly value: DeleteAccountValue;
}

export function isMsgDeleteAccount(msg: Msg): msg is MsgDeleteAccount {
  return (msg as MsgDeleteAccount).type === "starname/DeleteAccount";
}
