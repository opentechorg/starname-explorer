import { Msg } from "@cosmjs/launchpad";

export interface DeleteDomainValue {
  readonly domain: string;
  /** Bech32 owner address */
  readonly owner: string;
  /** Bech32 fee_payer address */
  readonly fee_payer: string;
}

export interface MsgDeleteDomain extends Msg {
  readonly type: "starname/DeleteDomain";
  readonly value: DeleteDomainValue;
}

export function isMsgDeleteDomain(msg: Msg): msg is MsgDeleteDomain {
  return (msg as MsgDeleteDomain).type === "starname/DeleteDomain";
}
