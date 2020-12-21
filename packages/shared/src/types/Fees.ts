import { Decimal } from "@cosmjs/math";

export interface Fees {
  readonly fee_coin_denom: string;
  readonly fee_coin_price: Decimal;
  readonly fee_default: Decimal;
  readonly register_account_closed: Decimal;
  readonly register_account_open: Decimal;
  readonly transfer_account_closed: Decimal;
  readonly transfer_account_open: Decimal;
  readonly replace_account_resources: Decimal;
  readonly add_account_certificate: Decimal;
  readonly del_account_certificate: Decimal;
  readonly set_account_metadata: Decimal;
  readonly register_domain_1: Decimal;
  readonly register_domain_2: Decimal;
  readonly register_domain_3: Decimal;
  readonly register_domain_4: Decimal;
  readonly register_domain_5: Decimal;
  readonly register_domain_default: Decimal;
  readonly register_open_domain_multiplier: Decimal;
  readonly transfer_domain_closed: Decimal;
  readonly transfer_domain_open: Decimal;
  readonly renew_domain_open: Decimal;
}

export interface FeesRaw {
  readonly fee_coin_denom: string;
  readonly fee_coin_price: string;
  readonly fee_default: string;
  readonly register_account_closed: string;
  readonly register_account_open: string;
  readonly transfer_account_closed: string;
  readonly transfer_account_open: string;
  readonly replace_account_resources: string;
  readonly add_account_certificate: string;
  readonly del_account_certificate: string;
  readonly set_account_metadata: string;
  readonly register_domain_1: string;
  readonly register_domain_2: string;
  readonly register_domain_3: string;
  readonly register_domain_4: string;
  readonly register_domain_5: string;
  readonly register_domain_default: string;
  readonly register_open_domain_multiplier: string;
  readonly transfer_domain_closed: string;
  readonly transfer_domain_open: string;
  readonly renew_domain_open: string;
}

export function wrapFees(fees: FeesRaw): Fees {
  return {
    fee_coin_denom: fees.fee_coin_denom,
    fee_coin_price: Decimal.fromAtomics(fees.fee_coin_price, 18),
    fee_default: Decimal.fromAtomics(fees.fee_default, 18),
    register_account_closed: Decimal.fromAtomics(fees.register_account_closed, 18),
    register_account_open: Decimal.fromAtomics(fees.register_account_open, 18),
    transfer_account_closed: Decimal.fromAtomics(fees.transfer_account_closed, 18),
    transfer_account_open: Decimal.fromAtomics(fees.transfer_account_open, 18),
    replace_account_resources: Decimal.fromAtomics(fees.replace_account_resources, 18),
    add_account_certificate: Decimal.fromAtomics(fees.add_account_certificate, 18),
    del_account_certificate: Decimal.fromAtomics(fees.del_account_certificate, 18),
    set_account_metadata: Decimal.fromAtomics(fees.set_account_metadata, 18),
    register_domain_1: Decimal.fromAtomics(fees.register_domain_1, 18),
    register_domain_2: Decimal.fromAtomics(fees.register_domain_2, 18),
    register_domain_3: Decimal.fromAtomics(fees.register_domain_3, 18),
    register_domain_4: Decimal.fromAtomics(fees.register_domain_4, 18),
    register_domain_5: Decimal.fromAtomics(fees.register_domain_5, 18),
    register_domain_default: Decimal.fromAtomics(fees.register_domain_default, 18),
    register_open_domain_multiplier: Decimal.fromAtomics(fees.register_open_domain_multiplier, 18),
    transfer_domain_closed: Decimal.fromAtomics(fees.transfer_domain_closed, 18),
    transfer_domain_open: Decimal.fromAtomics(fees.transfer_domain_open, 18),
    renew_domain_open: Decimal.fromAtomics(fees.renew_domain_open, 18),
  };
}
