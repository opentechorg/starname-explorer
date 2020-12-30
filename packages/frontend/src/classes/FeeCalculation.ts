import { Decimal, Uint32 } from "@cosmjs/math";
import { Domain, Fees, iovFractionDigits } from "@starname-explorer/shared";

export class FeeCalculation {
  constructor(private domain: Domain, private fees: Fees) {}
  calculateDomainFeeIov(): number {
    const currentPriceMicroUsd = this.fees.fee_coin_price;
    const domainFee = this.getDomainOrDefaultFee();

    const currentPriceUsd = currentPriceMicroUsd.multiply(new Uint32(1_000_000));

    return Math.floor(domainFee.toFloatApproximation() / currentPriceUsd.toFloatApproximation());
  }

  private getDomainOrDefaultFee(): Decimal {
    const domainFee = this.getDomainFee();
    if (domainFee.isLessThan(this.fees.fee_default)) {
      return this.fees.fee_default;
    }

    return domainFee;
  }

  private getDomainFee(): Decimal {
    const fee = (this.fees as any)[this.getRegisterDomainPropertyName()];
    if (this.isValidDecimal(fee)) {
      return fee;
    }

    return Decimal.fromAtomics("0", iovFractionDigits);
  }

  private getRegisterDomainPropertyName(): string {
    return `register_domain_${this.domain.domain.length <= 5 ? this.domain.domain.length : "default"}`;
  }

  private isValidDecimal(value: any): value is Decimal {
    return (value as Decimal).atomics != null;
  }
}
