import { Decimal } from "@cosmjs/math";

export const iovFractionDigits = 18;

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
    fee_coin_price: getIovDecimal(fees.fee_coin_price),
    fee_default: getIovDecimal(fees.fee_default),
    register_account_closed: getIovDecimal(fees.register_account_closed),
    register_account_open: getIovDecimal(fees.register_account_open),
    transfer_account_closed: getIovDecimal(fees.transfer_account_closed),
    transfer_account_open: getIovDecimal(fees.transfer_account_open),
    replace_account_resources: getIovDecimal(fees.replace_account_resources),
    add_account_certificate: getIovDecimal(fees.add_account_certificate),
    del_account_certificate: getIovDecimal(fees.del_account_certificate),
    set_account_metadata: getIovDecimal(fees.set_account_metadata),
    register_domain_1: getIovDecimal(fees.register_domain_1),
    register_domain_2: getIovDecimal(fees.register_domain_2),
    register_domain_3: getIovDecimal(fees.register_domain_3),
    register_domain_4: getIovDecimal(fees.register_domain_4),
    register_domain_5: getIovDecimal(fees.register_domain_5),
    register_domain_default: getIovDecimal(fees.register_domain_default),
    register_open_domain_multiplier: getIovDecimal(fees.register_open_domain_multiplier),
    transfer_domain_closed: getIovDecimal(fees.transfer_domain_closed),
    transfer_domain_open: getIovDecimal(fees.transfer_domain_open),
    renew_domain_open: getIovDecimal(fees.renew_domain_open),
  };
}

function getIovDecimal(amount: string): Decimal {
  return Decimal.fromUserInput(amount, iovFractionDigits);
}
