import { Msg } from "@cosmjs/launchpad";

import { StarnameExtension } from "../starname";
import { isMsgDeleteDomain, MsgDeleteDomainStore } from "./DeleteDomain";
import { isMsgRegisterAccount, MsgRegisterAccountStore } from "./RegisterAccount";
import { isMsgRegisterDomain, MsgRegisterDomainStore } from "./RegisterDomain";
import { isMsgRenewAccount } from "./RenewAccount";
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
    await MsgRegisterDomainStore(msg.value, client);
  } else if (isMsgRegisterAccount(msg)) {
    await MsgRegisterAccountStore(msg.value);
  } else if (isMsgDeleteDomain(msg)) {
    MsgDeleteDomainStore(msg.value);
  } else if (await isMsgTransferDomainAll(msg)) {
    await MsgTransferDomainAllStore(msg.value);
  } else if (isMsgRenewDomain(msg)) {
    await MsgRenewDomainStore(msg.value.domain, "", client);
  } else if (isMsgRenewAccount(msg)) {
    await MsgRenewDomainStore(msg.value.domain, msg.value.name, client);
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
