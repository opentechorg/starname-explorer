import { Msg } from "@cosmjs/launchpad";
import { DomainSchemaModel, StarnameSchemaModel } from "@starname-explorer/shared";

import { AccountNft, StarnameExtension } from "../starname";

const txsPerPage = Number(process.env.TXS_PER_PAGE);

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
  await DomainSchemaModel.updateOne({ domain: domain.domain }, domain as any, {
    upsert: true,
  });

  const domainInfo = await client.starname.queryDomainInfo(domain.domain);

  await DomainSchemaModel.updateOne(
    { domain: domainInfo.name },
    { $set: { valid_until: domainInfo.valid_until } },
  );

  let offset = 0;
  let accounts: AccountNft[] = [];

  do {
    accounts = await client.starname.queryAccountsInDomain(domain.domain, txsPerPage, offset);
    offset += txsPerPage;

    for (const account of accounts) {
      await StarnameSchemaModel.updateOne(
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
  } while (accounts.length === 10);
}
