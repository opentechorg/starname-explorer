import { Msg } from "@cosmjs/launchpad";

import StarnameModel from "../models/Starname/StarnameSchema";

interface TransferAccountValue {
  readonly domain: string;
  readonly name: string;
  /** Bech32 owner address */
  readonly owner: string;
  /** Bech32 new_owner address */
  readonly new_owner: string;
  /** Bech32 fee_payer address */
  readonly fee_payer: string;
  readonly reset: boolean;
}

export interface MsgTransferAccount extends Msg {
  readonly type: "starname/TransferAccount";
  readonly value: TransferAccountValue;
}

export function isMsgTransferAccount(msg: Msg): msg is MsgTransferAccount {
  return (msg as MsgTransferAccount).type === "starname/TransferAccount";
}

export async function MsgTransferAccountStore(transfer: TransferAccountValue): Promise<void> {
  await StarnameModel.updateOne(
    { domain: transfer.domain, name: transfer.name },
    { $set: { owner: transfer.new_owner } },
  );
}
