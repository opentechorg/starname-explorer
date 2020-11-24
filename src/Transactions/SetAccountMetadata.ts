import { Msg } from "@cosmjs/launchpad";

export interface MsgSetAccountMetadata extends Msg {
  readonly type: "starname/SetAccountMetadata";
  readonly value: any;
}

export function isMsgSetAccountMetadata(msg: Msg): msg is MsgSetAccountMetadata {
  return (msg as MsgSetAccountMetadata).type === "starname/SetAccountMetadata";
}
