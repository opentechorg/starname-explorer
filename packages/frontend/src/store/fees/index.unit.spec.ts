import { Decimal } from "@cosmjs/math";
import { Fees } from "@starname-explorer/shared";
import { Store } from "redux";

import { aNewStore } from "../../store";
import { AllActions, RootState } from "../reducers";
import { initFees } from ".";
import { setFeesAction } from "./actions";

describe("Fees reducer", () => {
  let store: Store<RootState, AllActions>;
  beforeEach(() => {
    store = aNewStore();
  });

  it("has correct initial state", async () => {
    const fees = store.getState().fees;
    expect(fees).toEqual({ loading: false, data: initFees, error: undefined });
  });

  it("dispatches fees correctly", async () => {
    const store = aNewStore();
    const fees: Fees = {
      fee_coin_denom: "iov",
      fee_coin_price: Decimal.fromAtomics("0.000000100000000000", 18),
      fee_default: Decimal.fromAtomics("0.010000000000000000", 18),
      register_account_closed: Decimal.fromAtomics("0.100000000000000000", 18),
      register_account_open: Decimal.fromAtomics("0.100000000000000000", 18),
      transfer_account_closed: Decimal.fromAtomics("1.000000000000000000", 18),
      transfer_account_open: Decimal.fromAtomics("1.000000000000000000", 18),
      replace_account_resources: Decimal.fromAtomics("0.100000000000000000", 18),
      add_account_certificate: Decimal.fromAtomics("1.000000000000000000", 18),
      del_account_certificate: Decimal.fromAtomics("0.010000000000000000", 18),
      set_account_metadata: Decimal.fromAtomics("0.100000000000000000", 18),
      register_domain_1: Decimal.fromAtomics("1000.000000000000000000", 18),
      register_domain_2: Decimal.fromAtomics("500.000000000000000000", 18),
      register_domain_3: Decimal.fromAtomics("200.000000000000000000", 18),
      register_domain_4: Decimal.fromAtomics("100.000000000000000000", 18),
      register_domain_5: Decimal.fromAtomics("50.000000000000000000", 18),
      register_domain_default: Decimal.fromAtomics("10.000000000000000000", 18),
      register_open_domain_multiplier: Decimal.fromAtomics("5.000000000000000000", 18),
      transfer_domain_closed: Decimal.fromAtomics("1.000000000000000000", 18),
      transfer_domain_open: Decimal.fromAtomics("1.000000000000000000", 18),
      renew_domain_open: Decimal.fromAtomics("30.000000000000000000", 18),
    };
    store.dispatch(setFeesAction(fees));
    const feesState = store.getState().fees;
    expect(feesState.data).toEqual(fees);
  });
});
