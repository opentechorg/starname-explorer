import { LcdClient, Msg } from "@cosmjs/launchpad";
import { ReconnectingSocket, SocketWrapperMessageEvent } from "@cosmjs/socket";

import { processStarnameTx } from "./database/process";
import { isJsonRpcErrorResponse, JsonRpcResponse, LcdStarnameClient, SubscriptionEvent } from "./types";

async function getStarnameTxMsg(client: LcdClient, event: SubscriptionEvent): Promise<Msg[]> {
  console.log("getStarnameTxMsg, data");
  console.log(event.data);
  console.log("getStarnameTxMsg, TxResult");
  console.log(event.data.value.TxResult);

  const tx = event.data.value.TxResult.tx;

  const response = await client.post("/txs/decode", { tx });

  console.log("getStarnameTxMsg, response");
  console.log(response);
  console.log("getStarnameTxMsg exit");
  return response.result.msg;
}

const processSubscriptionEvent = (client: LcdStarnameClient) => async (
  event: SocketWrapperMessageEvent,
): Promise<void> => {
  console.log("Incoming transaction....");

  const dataJson: JsonRpcResponse = JSON.parse(event.data);
  console.log(dataJson);

  if (isJsonRpcErrorResponse(dataJson) || typeof dataJson.result.data === "undefined") {
    return;
  }

  const txMsgs = await getStarnameTxMsg(client, dataJson.result);

  for (const msg of txMsgs) {
    await processStarnameTx(client, msg);
  }

  console.log("End of transaction");
};

export function bcEventsSubscription(client: LcdStarnameClient): void {
  console.log("Subscribing to the blockchain events...");
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const socket = new ReconnectingSocket(`${process.env.RPC_URL!}/websocket`);

    const subscription = socket.events.subscribe({
      next: processSubscriptionEvent(client),
      error: console.error,
      complete: () => {
        subscription.unsubscribe();
      },
    });

    socket.connect();

    socket.queueRequest(
      '{ "jsonrpc": "2.0", "method": "subscribe", "params": ["tm.event=\'Tx\' AND message.module=\'starname\'"], "id": 1 }',
    );
  } catch (err) {
    console.error(err);
  }
}
