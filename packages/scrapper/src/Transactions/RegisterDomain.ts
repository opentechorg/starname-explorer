import { Msg } from "@cosmjs/launchpad";
import { DomainSchemaModel, StarnameSchemaModel } from "@starname-explorer/shared";

import { AccountNft, DomainNft, StarnameExtension } from "../starname";

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
  client: StarnameExtension,
  domain: RegisterDomainValue,
): Promise<void> {
  const domainInfo = await client.starname.queryDomainInfo(domain.domain);

  await DomainNftStore(client, domainInfo);
}

export async function DomainNftStore(client: StarnameExtension, domain: DomainNft): Promise<void> {
  await DomainSchemaModel.updateOne({ domain: domain.name }, { ...domain, domain: domain.name } as any, {
    upsert: true,
  });

  await getDomainAccounts(client, domain.name);
}

async function getDomainAccounts(client: StarnameExtension, domain: string): Promise<void> {
  const txsPerPage = Number(process.env.TXS_PER_PAGE);
  let accounts: AccountNft[] = [];
  let page = 1;

  do {
    accounts = await client.starname.queryAccountsInDomain(domain, txsPerPage, page++);

    for (const account of accounts) {
      await saveDomainAccount(account);
    }
  } while (accounts.length === txsPerPage);
}

async function saveDomainAccount(account: AccountNft): Promise<void> {
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
