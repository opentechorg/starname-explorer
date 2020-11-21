import { Msg } from "@cosmjs/launchpad";

/** Supports submitting arbitrary proposal content. */
export interface MsgRegisterDomain extends Msg {
  readonly type: "starname/RegisterDomain";
  readonly value: {
    readonly domain: string;
    readonly type: string;
    /** Bech32 admin address */
    readonly admin: string;
    /** Bech32 broker address */
    readonly broker: string;
    /** Bech32 fee_payer address */
    readonly fee_payer: string;
  };
}

export function isMsgRegisterDomain(msg: Msg): msg is MsgRegisterDomain {
  return (msg as MsgRegisterDomain).type === "starname/RegisterDomain";
}

export interface MsgRegisterAccount extends Msg {
  readonly type: "starname/RegisterAccount";
  readonly value: {
    readonly domain: string;
    readonly name: string;
    /** Bech32 admin address */
    readonly admin: string;
    /** Bech32 registerer address */
    readonly registerer: string;
    /** Bech32 broker address */
    readonly broker: string;
    /** Bech32 fee_payer address */
    readonly fee_payer: string;
  };
}

export function isMsgRegisterAccount(msg: Msg): msg is MsgRegisterAccount {
  return (msg as MsgRegisterAccount).type === "starname/RegisterAccount";
}

export interface MsgTransferDomainAll extends Msg {
  readonly type: "starname/TransferDomainAll";
  readonly value: {
    readonly domain: string;
    /** Bech32 owner address */
    readonly owner: string;
    /** Bech32 new_admin address */
    readonly new_admin: string;
    readonly transfer_flag: number;
    /** Bech32 fee_payer address */
    readonly fee_payer: string;
  };
}

export function isMsgTransferDomainAll(msg: Msg): msg is MsgTransferDomainAll {
  return (msg as MsgTransferDomainAll).type === "starname/TransferDomainAll";
}

export interface MsgRenewDomain extends Msg {
  readonly type: "starname/RenewDomain";
  readonly value: {
    readonly domain: string;
    /** Bech32 signer address */
    readonly signer: string;
    /** Bech32 fee_payer address */
    readonly fee_payer: string;
  };
}

export function isMsgRenewDomain(msg: Msg): msg is MsgRenewDomain {
  return (msg as MsgRenewDomain).type === "starname/RenewDomain";
}

export interface MsgTransferAccount extends Msg {
  readonly type: "starname/TransferAccount";
  readonly value: {
    readonly domain: string;
    readonly name: string;
    /** Bech32 owner address */
    readonly owner: string;
    /** Bech32 new_owner address */
    readonly new_owner: string;
    /** Bech32 fee_payer address */
    readonly fee_payer: string;
    readonly reset: boolean;
  };
}

export function isMsgTransferAccount(msg: Msg): msg is MsgTransferAccount {
  return (msg as MsgTransferAccount).type === "starname/TransferAccount";
}
