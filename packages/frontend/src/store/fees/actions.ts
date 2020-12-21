import { LcdClient } from "@cosmjs/launchpad";
import { Fees, setupStarnameExtension } from "@starname-explorer/shared";
import { Dispatch } from "redux";

import { Config } from "../../utils/config";
import { SetErrorActionType, SetFeesActionType, SetLoadingActionType } from "./reducer";

export const loadFeesAction = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(setLoadingAction(true));
  try {
    const client = LcdClient.withExtensions({ apiUrl: Config.rpcURL }, setupStarnameExtension);
    const result = await client.starname.queryFees();
    dispatch(setFeesAction(result));
  } catch (err) {
    dispatch(setErrorAction(err.message, true));
  }
};

export const setFeesAction = (fees: Fees): SetFeesActionType => ({
  type: "@@fees/SET",
  payload: fees,
});

export const setLoadingAction = (isLoading: boolean): SetLoadingActionType => ({
  type: "@@fees/LOADING",
  payload: isLoading,
});

export const setErrorAction = (message: Error, error: boolean): SetErrorActionType => ({
  type: "@@fees/ERROR",
  payload: message,
  error: error,
});
