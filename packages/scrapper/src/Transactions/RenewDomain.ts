import { Msg } from "@cosmjs/launchpad";
import { DomainSchemaModel } from "@starname-explorer/shared";

import { StarnameExtension } from "../starname";

interface RenewDomainValue {
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

export async function MsgRenewDomainStore(domain: string, client: StarnameExtension): Promise<void> {
  const domainInfo = await client.starname.queryDomainInfo(domain);

  await DomainSchemaModel.updateOne(
    { domain: domainInfo.name },
    { $set: { valid_until: domainInfo.valid_until } },
  );
}
