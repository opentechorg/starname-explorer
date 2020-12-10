import { Msg } from "@cosmjs/launchpad";

import { DomainType } from "../models/Domain/DomainSchema";

export interface RegisterDomainValue {
  readonly domain: string;
  readonly type: DomainType;
  /** Bech32 admin address */
  readonly admin: string;
  /** Bech32 broker address */
  readonly broker: string;
  /** Bech32 fee_payer address */
  readonly fee_payer: string;
}

export interface MsgRegisterDomain extends Msg {
  readonly type: "starname/RegisterDomain";
  readonly value: RegisterDomainValue;
}

export function isMsgRegisterDomain(msg: Msg): msg is MsgRegisterDomain {
  return (msg as MsgRegisterDomain).type === "starname/RegisterDomain";
}
