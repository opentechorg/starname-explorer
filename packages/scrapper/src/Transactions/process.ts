import { Msg } from "@cosmjs/launchpad";

import { StarnameExtension } from "../starname";
import { isMsgDeleteAccount, MsgDeleteAccountStore } from "./DeleteAccount";
import { isMsgDeleteDomain, MsgDeleteDomainStore } from "./DeleteDomain";
import { isMsgRegisterAccount, MsgRegisterAccountStore } from "./RegisterAccount";
import { isMsgRegisterDomain, MsgRegisterDomainStore } from "./RegisterDomain";
import { isMsgRenewAccount, MsgRenewAccountStore } from "./RenewAccount";
import { isMsgRenewDomain, MsgRenewDomainStore } from "./RenewDomain";
import { isMsgReplaceAccountResources } from "./ReplaceAccountResources";
import { isMsgSetAccountMetadata } from "./SetAccountMetadata";
import { isMsgTransferAccount, MsgTransferAccountStore } from "./TransferAccount";
import { isMsgTransferDomainAll, MsgTransferDomainAllStore } from "./TransferDomain";

/**
 * Supported events:
 * - renew_domain
 * - register_account
 * - register_domain
 * - transfer_domain
 * - transfer_account
 * - delete_domain
 * - renew_account
 * - transfer_account
 * - replace_account_resources
 */
export async function processStarnameTx(client: StarnameExtension, msg: Msg): Promise<void> {
  if (isMsgRegisterDomain(msg)) {
    await MsgRegisterDomainStore(client, msg.value);
  } else if (isMsgRegisterAccount(msg)) {
    await MsgRegisterAccountStore(client, msg.value);
  } else if (isMsgDeleteAccount(msg)) {
    await MsgDeleteAccountStore(msg.value);
  } else if (isMsgDeleteDomain(msg)) {
    await MsgDeleteDomainStore(msg.value);
  } else if (isMsgTransferDomainAll(msg)) {
    await MsgTransferDomainAllStore(msg.value);
  } else if (isMsgRenewDomain(msg)) {
    await MsgRenewDomainStore(client, msg.value.domain);
  } else if (isMsgRenewAccount(msg)) {
    await MsgRenewAccountStore(client, msg.value.domain, msg.value.name);
  } else if (isMsgTransferAccount(msg)) {
    await MsgTransferAccountStore(msg.value);
  } else if (isMsgReplaceAccountResources(msg)) {
    // placeholder
  } else if (isMsgSetAccountMetadata(msg)) {
    // placeholder
  } else {
    console.error(msg);
  }
}
