import { Msg } from "@cosmjs/launchpad";
import {
  isMsgDeleteAccount,
  isMsgDeleteDomain,
  isMsgRegisterAccount,
  isMsgRegisterDomain,
  isMsgRenewAccount,
  isMsgRenewDomain,
  isMsgReplaceAccountResources,
  isMsgSetAccountMetadata,
  isMsgTransferAccount,
  isMsgTransferDomainAll,
} from "@starname-explorer/shared";

import { StarnameExtension } from "../starname";
import { DeleteAccount } from "./DeleteAccount";
import { DeleteDomain } from "./DeleteDomain";
import { RegisterAccount } from "./RegisterAccount";
import { RegisterDomain } from "./RegisterDomain";
import { RenewAccount } from "./RenewAccount";
import { RenewDomain } from "./RenewDomain";
import { TransferAccount } from "./TransferAccount";
import { TransferDomain } from "./TransferDomain";

export async function processStarnameTx(client: StarnameExtension, msg: Msg): Promise<void> {
  if (isMsgRegisterDomain(msg)) {
    await RegisterDomain(client, msg.value);
  } else if (isMsgRegisterAccount(msg)) {
    await RegisterAccount(client, msg.value);
  } else if (isMsgDeleteAccount(msg)) {
    await DeleteAccount(msg.value);
  } else if (isMsgDeleteDomain(msg)) {
    await DeleteDomain(msg.value);
  } else if (isMsgTransferDomainAll(msg)) {
    await TransferDomain(msg.value);
  } else if (isMsgRenewDomain(msg)) {
    await RenewDomain(client, msg.value.domain);
  } else if (isMsgRenewAccount(msg)) {
    await RenewAccount(client, msg.value.domain, msg.value.name);
  } else if (isMsgTransferAccount(msg)) {
    await TransferAccount(msg.value);
  } else if (isMsgReplaceAccountResources(msg)) {
    // placeholder
  } else if (isMsgSetAccountMetadata(msg)) {
    // placeholder
  } else {
    console.error(msg);
  }
}
