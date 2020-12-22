import { combineReducers, Reducer } from "redux";

import { ConfigurationActions, iovConfigReducer, IovConfigState } from "./configuration";
import { FeesActions, feesReducer, FeesState } from "./fees";

export interface RootState {
  fees: FeesState;
  iovConfiguration: IovConfigState;
}

export type AllActions = FeesActions | ConfigurationActions;

const createRootReducer = (): Reducer<RootState, AllActions> =>
  combineReducers({
    fees: feesReducer,
    iovConfiguration: iovConfigReducer,
  });

export default createRootReducer();
