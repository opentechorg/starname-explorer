export interface IovConfig {
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
