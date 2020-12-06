import { Msg } from "@cosmjs/launchpad";
import { StarnameSchemaModel } from "@starname-explorer/shared";

import { AccountNft, StarnameExtension } from "../starname";

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
  client: StarnameExtension,
  account: RegisterAccountValue,
): Promise<void> {
  const accountDetails = await client.starname.queryResolve(`${account.name}*${account.domain}`);

  await saveAccountNft(accountDetails);

  /* await StarnameSchemaModel.updateOne(
    { domain: accountDetails.domain, name: accountDetails.name },
    { $set: { valid_until: accountDetails.valid_until } },
  );

  await StarnameSchemaModel.updateOne(
    { domain: account.domain, name: account.name },
    accountDetails,
    {
      upsert: true,
    },
    (error) => {
      if (error) {
        console.error(error);
      }
    },
  );*/
}

export async function saveAccountNft(account: AccountNft): Promise<void> {
  await StarnameSchemaModel.updateOne(
    { domain: account.domain, name: account.name },
    account,
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
