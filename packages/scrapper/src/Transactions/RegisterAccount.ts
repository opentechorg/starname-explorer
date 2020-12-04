import { Msg } from "@cosmjs/launchpad";
import { StarnameSchemaModel } from "@starname-explorer/shared";

import { StarnameExtension } from "../starname";

interface RegisterAccountValue {
  readonly domain: string;
  readonly name: string;
  /** Bech32 admin address */
  readonly admin: string;
  /** Bech32 registerer address */
  readonly registerer: string;
  /** Bech32 broker address */
  readonly broker: string;
  /** Bech32 fee_payer address */
  readonly fee_payer: string;
  readonly metadata_uri: string;
}

export interface MsgRegisterAccount extends Msg {
  readonly type: "starname/RegisterAccount";
  readonly value: RegisterAccountValue;
}

export function isMsgRegisterAccount(msg: Msg): msg is MsgRegisterAccount {
  return (msg as MsgRegisterAccount).type === "starname/RegisterAccount";
}

export async function MsgRegisterAccountStore(
  account: RegisterAccountValue,
  client: StarnameExtension,
): Promise<void> {
  const accountDetails = await client.starname.queryResolve(`${account.name}*${account.domain}`);

  await StarnameSchemaModel.updateOne(
    { domain: accountDetails.domain, name: accountDetails.name },
    { $set: { valid_until: accountDetails.valid_until } },
  );

  await StarnameSchemaModel.updateOne(
    { domain: account.domain, name: account.name },
    { ...account, valid_until: accountDetails.valid_until },
    {
      upsert: true,
    },
    (error) => {
      if (error) {
        console.error(error);
      }
    },
  );
}
