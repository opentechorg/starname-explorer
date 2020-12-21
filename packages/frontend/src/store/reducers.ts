import { combineReducers, Reducer } from "redux";

import { FeesActions, feesReducer, FeesState } from "./fees";

export interface RootState {
  fees: FeesState;
}

export type AllActions = FeesActions;

const createRootReducer = (): Reducer<RootState, AllActions> =>
  combineReducers({
    fees: feesReducer,
  });

export default createRootReducer();
