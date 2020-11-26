import { Msg } from "@cosmjs/launchpad";
import { StarnameSchemaModel } from "@starname-explorer/shared";

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

export async function MsgRenewDomainStore(
  domain: string,
  name: string,
  client: StarnameExtension,
): Promise<void> {
  const domainDetails = await client.starname.query(`${name}*${domain}`);

  await StarnameSchemaModel.updateOne(
    { domain: domainDetails.domain, name: domainDetails.name },
    { $set: { valid_until: domainDetails.valid_until } },
  );
}
