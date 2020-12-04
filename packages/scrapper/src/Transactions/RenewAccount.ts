import { Msg } from "@cosmjs/launchpad";
import { StarnameSchemaModel } from "@starname-explorer/shared";

import { StarnameExtension } from "../starname";

interface RenewAccountValue {
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

export async function MsgRenewAccountStore(
  domain: string,
  name: string,
  client: StarnameExtension,
): Promise<void> {
  const accountDetails = await client.starname.queryResolve(`${name}*${domain}`);

  await StarnameSchemaModel.updateOne(
    { domain: accountDetails.domain, name: accountDetails.name },
    { $set: { valid_until: accountDetails.valid_until } },
  );
}
