import { LcdClient } from "@cosmjs/launchpad";

import { StarnameExtension } from "./starname";

export interface JsonRpcSuccessResponse {
  readonly jsonrpc: "2.0";
  readonly id: "1";
  readonly result: any;
}

export interface JsonRpcErrorResponse {
  readonly jsonrpc: "2.0";
  readonly id: "1";
  readonly error: any;
}

export type JsonRpcResponse = JsonRpcSuccessResponse | JsonRpcErrorResponse;

export function isJsonRpcErrorResponse(response: JsonRpcResponse): response is JsonRpcErrorResponse {
  return typeof (response as JsonRpcErrorResponse).error === "object";
}

export function isJsonRpcSuccessResponse(response: JsonRpcResponse): response is JsonRpcSuccessResponse {
  return !isJsonRpcErrorResponse(response);
}

export interface SubscriptionEvent {
  readonly query: string;
  readonly data: {
    readonly type: string;
    readonly value: any;
  };
}

export type LcdStarnameClient = LcdClient & StarnameExtension;
