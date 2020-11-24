import { Msg } from "@cosmjs/launchpad";

import StarnameModel from "../models/Starname/StarnameSchema";

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
}

export interface MsgRegisterAccount extends Msg {
  readonly type: "starname/RegisterAccount";
  readonly value: RegisterAccountValue;
}

export function isMsgRegisterAccount(msg: Msg): msg is MsgRegisterAccount {
  return (msg as MsgRegisterAccount).type === "starname/RegisterAccount";
}

export async function MsgRegisterAccountStore(account: RegisterAccountValue): Promise<void> {
  await StarnameModel.updateOne(
    { domain: account.domain, name: account.name },
    { ...account },
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
