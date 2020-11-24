import { Msg } from "@cosmjs/launchpad";

import DomainModel from "../models/Domain/DomainSchema";
import StarnameModel from "../models/Starname/StarnameSchema";
import { StarnameExtension } from "../starname";

interface RegisterDomainValue {
  readonly domain: string;
  readonly type: string;
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

export async function MsgRegisterDomainStore(
  domain: RegisterDomainValue,
  client: StarnameExtension,
): Promise<void> {
  await DomainModel.updateOne({ domain: domain.domain }, domain as any, {
    upsert: true,
  });

  const domainDetails = await client.starname.query(`*${domain.domain}`);

  await StarnameModel.updateOne(
    { domain: domainDetails.domain, name: domainDetails.name },
    { ...domainDetails },
    {
      upsert: true,
    },
  );
}
