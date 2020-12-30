import { LcdClient, Msg } from "@cosmjs/launchpad";

import {
  MsgRegisterAccount,
  MsgRegisterDomain,
  MsgRenewDomain,
  MsgTransferAccount,
  MsgTransferDomainAll,
} from "../messages";
import { AccountNft, DomainNft, Fees, IovConfig, wrapFees, wrapIovConfig } from "../types";
import {
  getAccountTransferQuery,
  getDomainRenewsQuery,
  getDomainTransferQuery,
  getRegAccountQuery,
  getRegDomainQuery,
  getStarnameMessageModuleQuery,
} from "./queries";

export interface StarnameExtension {
  readonly starname: {
    readonly domains: (limit: number, page: number) => Promise<readonly MsgRegisterDomain[]>;
    readonly domainTransfers: (limit: number, page: number) => Promise<readonly MsgTransferDomainAll[]>;
    readonly domainRenews: (limit: number, page: number) => Promise<readonly MsgRenewDomain[]>;
    readonly accounts: (limit: number, page: number) => Promise<readonly MsgRegisterAccount[]>;
    readonly accountTransfers: (limit: number, page: number) => Promise<readonly MsgTransferAccount[]>;
    readonly txsCount: (query: (limit: number, page: number) => string) => Promise<number>;
    readonly starnameModule: (limit: number, page: number) => Promise<readonly Msg[]>;
    readonly transactions: (
      query: (limit: number, page: number) => string,
      limit: number,
      page: number,
    ) => Promise<readonly Msg[]>;
    readonly queryResolve: (starname: string) => Promise<AccountNft>;
    readonly queryAccountsInDomain: (
      domain: string,
      results_per_page: number,
      page: number,
    ) => Promise<AccountNft[]>;
    readonly queryDomainInfo: (name: string) => Promise<DomainNft>;
    readonly queryFees: () => Promise<Fees>;
    readonly queryConfiguration: () => Promise<IovConfig>;
  };
}

export function setupStarnameExtension(base: LcdClient): StarnameExtension {
  return {
    starname: {
      domains: getStarnameData<MsgRegisterDomain>(base, getRegDomainQuery),
      domainTransfers: getStarnameData<MsgTransferDomainAll>(base, getDomainTransferQuery),
      domainRenews: getStarnameData<MsgRenewDomain>(base, getDomainRenewsQuery),
      accounts: getStarnameData<MsgRegisterAccount>(base, getRegAccountQuery),
      accountTransfers: getStarnameData<MsgTransferAccount>(base, getAccountTransferQuery),
      starnameModule: getStarnameData<MsgTransferAccount>(base, getStarnameMessageModuleQuery),
      transactions: async (query: (limit: number, page: number) => string, limit: number, page: number) =>
        getStarnameData<Msg>(base, query)(limit, page),
      txsCount: async (query: (limit: number, page: number) => string) =>
        Number((await base.txsQuery(query(1, 1))).total_count),
      queryResolve: async (starname: string) =>
        (await base.post("/starname/query/resolve", { starname })).result.account as AccountNft,
      queryAccountsInDomain: async (domain: string, results_per_page: number, page: number) =>
        (await base.post("/starname/query/accountsInDomain", { domain, results_per_page, offset: page }))
          .result.accounts as AccountNft[],
      queryDomainInfo: async (name: string) =>
        (await base.post("/starname/query/domainInfo", { name })).result.domain as DomainNft,
      queryFees: getFees(base),
      queryConfiguration: getConfiguration(base),
    },
  };
}

const getFees = (base: LcdClient) => async (): Promise<Fees> => {
  const rawFees = (await base.post("/configuration/query/fees", {})).result.fees;

  return wrapFees(rawFees);
};

const getConfiguration = (base: LcdClient) => async (): Promise<IovConfig> => {
  const rawConfig = (await base.post("/configuration/query/configuration", {})).result.configuration;

  return wrapIovConfig(rawConfig);
};

const getStarnameData = <T extends Msg>(
  base: LcdClient,
  query: (limit: number, page: number) => string,
) => async (limit: number, page: number): Promise<readonly T[]> => {
  return ([] as T[]).concat(
    ...(await base.txsQuery(query(limit, page))).txs.map((tx) => tx.tx.value.msg.map((msg) => msg as T)),
  );
};
