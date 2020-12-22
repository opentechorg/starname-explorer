import { Decimal } from "@cosmjs/math";
import { IovConfig } from "@starname-explorer/shared";
import { Store } from "redux";

import { aNewStore } from "../../store";
import { AllActions, RootState } from "../reducers";
import { initConfig } from ".";
import { setConfigrationAction } from "./actions";

describe("IOV configuration reducer", () => {
  let store: Store<RootState, AllActions>;
  beforeEach(() => {
    store = aNewStore();
  });

  it("has correct initial state", async () => {
    const config = store.getState().iovConfiguration;
    expect(config).toEqual({ loading: false, data: initConfig, error: undefined });
  });

  it("dispatches iov configuration correctly", async () => {
    const store = aNewStore();
    const fees: IovConfig = {
      configurer: "star1nrnx8mft8mks3l2akduxdjlf8rwqs8r9l36a78",
      valid_domain_name: "^[-a-z0-9]{4,32}$",
      valid_account_name: "^[-.a-z0-9]{1,63}$",
      valid_uri: "^[-a-z0-9]{1,15}:[-a-z0-9]{1,40}$",
      valid_resource: "^[-.a-z0-9A-Z/:_ #]{1,200}$",
      domain_renew_period: "31557600000000000",
      domain_renew_count_max: 2,
      domain_grace_period: "5184000000000000",
      account_renew_period: "31557600000000000",
      account_renew_count_max: 4,
      account_grace_period: "5184000000000000",
      resources_max: 24,
      certificate_size_max: 1024,
      certificate_count_max: 5,
      metadata_size_max: 1024,
    };
    store.dispatch(setConfigrationAction(fees));
    const feesState = store.getState().fees;
    expect(feesState.data).toEqual(fees);
  });
});
