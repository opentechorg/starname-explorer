import { Fees } from "@starname-explorer/shared";
import { Action } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "./actions";

export interface SetFeesActionType extends Action {
  type: "@@fees/SET";
  payload: Fees;
}

export interface SetLoadingActionType extends Action {
  type: "@@fees/LOADING";
  payload: boolean;
}

export interface SetErrorActionType extends Action {
  type: "@@fees/ERROR";
  payload: Error;
  error: boolean;
}

export type FeesActions = ActionType<typeof actions>;

export interface FeesState {
  readonly loading: boolean;
  readonly data: Fees;
  readonly error: Error | undefined;
}

export const initFees: Fees = ({} as unknown) as Fees;

const initState: FeesState = { loading: false, data: initFees, error: undefined };

export function feesReducer(state: FeesState = initState, action: FeesActions): FeesState {
  switch (action.type) {
    case "@@fees/SET":
      return {
        loading: false,
        error: undefined,
        data: action.payload,
      };
    case "@@fees/LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "@@fees/ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
