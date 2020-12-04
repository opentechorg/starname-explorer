import { LcdClient, Msg } from "@cosmjs/launchpad";

import {
  MsgRegisterAccount,
  MsgRegisterDomain,
  MsgRenewDomain,
  MsgTransferAccount,
  MsgTransferDomainAll,
} from "./Transactions";

export interface DomainNft {
  readonly name: string;
  /** Bech32 account address */
  readonly admin: string;
  /** Bech32 account address */
  readonly broker: string;
  readonly type: string;
  readonly valid_until: number;
}

export interface AccountNft {
  readonly domain: string;
  readonly name: string;
  /** Bech32 account address */
  readonly owner: string;
  /** Bech32 account address */
  readonly broker: string;
  readonly metadata_uri: string;
  readonly valid_until: number;
}

export interface StarnameExtension {
  readonly starname: {
    readonly domains: (limit: number, page: number) => Promise<readonly MsgRegisterDomain[]>;
    readonly domainTransfers: (limit: number, page: number) => Promise<readonly MsgTransferDomainAll[]>;
    readonly domainRenews: (limit: number, page: number) => Promise<readonly MsgRenewDomain[]>;
    readonly accounts: (limit: number, page: number) => Promise<readonly MsgRegisterAccount[]>;
    readonly accountTransfers: (limit: number, page: number) => Promise<readonly MsgTransferAccount[]>;
    readonly txsCount: (query: (limit: number, page: number) => string) => Promise<number>;
    readonly transactions: (
      query: (limit: number, page: number) => string,
      limit: number,
      page: number,
    ) => Promise<readonly Msg[]>;
    readonly queryResolve: (starname: string) => Promise<AccountNft>;
    readonly queryAccountsInDomain: (
      domain: string,
      results_per_page: number,
      offset: number,
    ) => Promise<AccountNft[]>;
    readonly queryDomainInfo: (name: string) => Promise<DomainNft>;
  };
}

/**
 * Supported queries:
 * - renew_domain
 * - register_account
 * - register_domain
 * - transfer_domain
 * - transfer_account
 */

export const getRegDomainQuery = (limit: number, page: number): string =>
  `message.action=register_domain&limit=${limit}&page=${page}`;

export const getRegAccountQuery = (limit: number, page: number): string =>
  `message.action=register_account&limit=${limit}&page=${page}`;

export const getDomainTransferQuery = (limit: number, page: number): string =>
  `message.action=transfer_domain&limit=${limit}&page=${page}`;

export const getAccountTransferQuery = (limit: number, page: number): string =>
  `message.action=transfer_account&limit=${limit}&page=${page}`;

export const getDomainRenewsQuery = (limit: number, page: number): string =>
  `message.action=renew_domain&limit=${limit}&page=${page}`;

export const getStarnameTransactionsQuery = (limit: number, page: number): string =>
  `message.module=starname&limit=${limit}&page=${page}`;

export function setupStarnameExtension(base: LcdClient): StarnameExtension {
  return {
    starname: {
      domains: getStarnameData<MsgRegisterDomain>(base, getRegDomainQuery),
      domainTransfers: getStarnameData<MsgTransferDomainAll>(base, getDomainTransferQuery),
      domainRenews: getStarnameData<MsgRenewDomain>(base, getDomainRenewsQuery),
      accounts: getStarnameData<MsgRegisterAccount>(base, getRegAccountQuery),
      accountTransfers: getStarnameData<MsgTransferAccount>(base, getAccountTransferQuery),
      transactions: async (query: (limit: number, page: number) => string, limit: number, page: number) =>
        getStarnameData<Msg>(base, query)(limit, page),
      txsCount: async (query: (limit: number, page: number) => string) =>
        Number((await base.txsQuery(query(1, 1))).total_count),
      queryResolve: async (starname: string) =>
        (await base.post(`/starname/query/resolve`, { starname })).result.account as AccountNft,
      queryAccountsInDomain: async (domain: string, results_per_page: number, offset: number) =>
        (await base.post(`/starname/query/accountsInDomain`, { domain, results_per_page, offset })).result
          .accounts as AccountNft[],
      queryDomainInfo: async (name: string) =>
        (await base.post(`/starname/query/domainInfo`, { name })).result.domain as DomainNft,
    },
  };
}

const getStarnameData = <T extends Msg>(
  base: LcdClient,
  query: (limit: number, page: number) => string,
) => async (limit: number, page: number): Promise<readonly T[]> => {
  return ([] as T[]).concat(
    ...(await base.txsQuery(query(limit, page))).txs.map((tx) => tx.tx.value.msg.map((msg) => msg as T)),
  );
};
