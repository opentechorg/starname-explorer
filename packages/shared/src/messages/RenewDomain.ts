import { Msg } from "@cosmjs/launchpad";

export interface RenewDomainValue {
  readonly domain: string;
  /** Bech32 signer address */
  readonly signer: string;
  /** Bech32 fee_payer address */
  readonly fee_payer: string;
}

export interface MsgRenewDomain extends Msg {
  readonly type: "starname/RenewDomain";
  readonly value: RenewDomainValue;
}

export function isMsgRenewDomain(msg: Msg): msg is MsgRenewDomain {
  return (msg as MsgRenewDomain).type === "starname/RenewDomain";
}
