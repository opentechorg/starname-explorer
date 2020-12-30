export interface IovConfig {
  readonly configurer: string;
  readonly valid_domain_name: string;
  readonly valid_account_name: string;
  readonly valid_uri: string;
  readonly valid_resource: string;
  readonly domain_renew_period: number;
  readonly domain_renew_count_max: number;
  readonly domain_grace_period: number;
  readonly account_renew_period: number;
  readonly account_renew_count_max: number;
  readonly account_grace_period: number;
  readonly resources_max: number;
  readonly certificate_size_max: number;
  readonly certificate_count_max: number;
  readonly metadata_size_max: number;
}

export interface IovConfigRaw {
  readonly configurer: string;
  readonly valid_domain_name: string;
  readonly valid_account_name: string;
  readonly valid_uri: string;
  readonly valid_resource: string;
  readonly domain_renew_period: string;
  readonly domain_renew_count_max: number;
  readonly domain_grace_period: string;
  readonly account_renew_period: string;
  readonly account_renew_count_max: number;
  readonly account_grace_period: string;
  readonly resources_max: number;
  readonly certificate_size_max: number;
  readonly certificate_count_max: number;
  readonly metadata_size_max: number;
}

export function wrapIovConfig(fees: IovConfigRaw): IovConfig {
  return {
    ...fees,
    domain_renew_period: Number(BigInt(fees.domain_renew_period) / BigInt(1_000_000)),
    domain_grace_period: Number(BigInt(fees.domain_grace_period) / BigInt(1_000_000)),
    account_renew_period: Number(BigInt(fees.account_renew_period) / BigInt(1_000_000)),
    account_grace_period: Number(BigInt(fees.account_grace_period) / BigInt(1_000_000)),
  };
}
