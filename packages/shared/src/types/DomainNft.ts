import { DomainType } from "../models/Domain/DomainSchema";

export interface DomainNft {
  readonly name: string;
  /** Bech32 account address */
  readonly admin: string;
  /** Bech32 account address */
  readonly broker: string;
  readonly type: DomainType;
  readonly valid_until: number;
}
