import { Msg } from "@cosmjs/launchpad";

export interface RenewAccountValue {
  readonly domain: string;
  readonly name: string;
  /** Bech32 signer address */
  readonly signer: string;
  /** Bech32 fee_payer address */
  readonly fee_payer: string;
}

export interface MsgRenewAccount extends Msg {
  readonly type: "starname/RenewAccount";
  readonly value: RenewAccountValue;
}

export function isMsgRenewAccount(msg: Msg): msg is MsgRenewAccount {
  return (msg as MsgRenewAccount).type === "starname/RenewAccount";
}
