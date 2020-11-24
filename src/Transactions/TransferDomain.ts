import { Msg } from "@cosmjs/launchpad";

import DomainModel from "../models/Domain/DomainSchema";

interface TransferDomainAllValue {
  readonly domain: string;
  /** Bech32 owner address */
  readonly owner: string;
  /** Bech32 new_admin address */
  readonly new_admin: string;
  readonly transfer_flag: number;
  /** Bech32 fee_payer address */
  readonly fee_payer: string;
}

export interface MsgTransferDomainAll extends Msg {
  readonly type: "starname/TransferDomainAll";
  readonly value: TransferDomainAllValue;
}

export function isMsgTransferDomainAll(msg: Msg): msg is MsgTransferDomainAll {
  return (msg as MsgTransferDomainAll).type === "starname/TransferDomainAll";
}

export async function MsgTransferDomainAllStore(transfer: TransferDomainAllValue): Promise<void> {
  await DomainModel.updateOne({ domain: transfer.domain }, { $set: { admin: transfer.new_admin } });
}
