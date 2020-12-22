import { IovConfig } from "@starname-explorer/shared";
import { Action } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "./actions";

export interface SetConfigActionType extends Action {
  type: "@@configuration/SET";
  payload: IovConfig;
}

export interface SetLoadingActionType extends Action {
  type: "@@configuration/LOADING";
  payload: boolean;
}

export interface SetErrorActionType extends Action {
  type: "@@configuration/ERROR";
  payload: Error;
  error: boolean;
}

export type ConfigurationActions = ActionType<typeof actions>;

export interface IovConfigState {
  readonly loading: boolean;
  readonly data: IovConfig;
  readonly error: Error | undefined;
}

export const initConfig = ({} as unknown) as IovConfig;

const initState: IovConfigState = { loading: false, data: initConfig, error: undefined };

export function iovConfigReducer(
  state: IovConfigState = initState,
  action: ConfigurationActions,
): IovConfigState {
  switch (action.type) {
    case "@@configuration/SET":
      return {
        loading: false,
        error: undefined,
        data: action.payload,
      };
    case "@@configuration/LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "@@configuration/ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
