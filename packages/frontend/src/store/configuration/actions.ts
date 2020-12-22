import { LcdClient } from "@cosmjs/launchpad";
import { IovConfig, setupStarnameExtension } from "@starname-explorer/shared";
import { Dispatch } from "redux";

import { Config } from "../../utils/config";
import { SetConfigActionType, SetErrorActionType, SetLoadingActionType } from "./reducer";

export const loadConfigurationAction = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(setLoadingAction(true));
  try {
    const client = LcdClient.withExtensions({ apiUrl: Config.rpcURL }, setupStarnameExtension);
    const result = await client.starname.queryConfiguration();
    dispatch(setConfigrationAction(result));
  } catch (err) {
    dispatch(setErrorAction(err.message, true));
  }
};

export const setConfigrationAction = (fees: IovConfig): SetConfigActionType => ({
  type: "@@configuration/SET",
  payload: fees,
});

export const setLoadingAction = (isLoading: boolean): SetLoadingActionType => ({
  type: "@@configuration/LOADING",
  payload: isLoading,
});

export const setErrorAction = (message: Error, error: boolean): SetErrorActionType => ({
  type: "@@configuration/ERROR",
  payload: message,
  error: error,
});
