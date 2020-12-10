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
