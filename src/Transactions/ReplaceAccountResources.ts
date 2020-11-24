import { Msg } from "@cosmjs/launchpad";

export interface MsgReplaceAccountResources extends Msg {
  readonly type: "starname/ReplaceAccountResources";
  readonly value: any;
}

export function isMsgReplaceAccountResources(msg: Msg): msg is MsgReplaceAccountResources {
  return (msg as MsgReplaceAccountResources).type === "starname/ReplaceAccountResources";
}
