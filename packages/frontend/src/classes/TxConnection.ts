import {
  AccountData,
  BroadcastTxResult,
  Msg,
  OfflineSigner,
  SigningCosmosClient,
  StdFee,
} from "@cosmjs/launchpad";
import { MsgDeleteDomain, MsgRegisterDomain } from "@starname-explorer/shared";

import { Config } from "../utils/config";

interface WindowsKeplr {
  readonly getOfflineSigner: (chainId: string) => any;
  readonly keplr: any;
}

const windowKeplr = (window as unknown) as WindowsKeplr;

export class KeplrNotFoundError extends Error {}
export class AccountNotFoundError extends Error {}

export class TxConnection {
  private constructor(protected offlineSigner: OfflineSigner, protected account: AccountData) {}

  static async init(): Promise<TxConnection> {
    if (windowKeplr.getOfflineSigner || windowKeplr.keplr) {
      await windowKeplr.keplr.enable(Config.chainId);
      const offlineSigner: OfflineSigner = windowKeplr.getOfflineSigner(Config.chainId);
      const accounts = await offlineSigner.getAccounts();
      if (accounts.length !== 1) {
        throw new AccountNotFoundError();
      }

      return new TxConnection(offlineSigner, accounts[0]);
    }

    throw new KeplrNotFoundError();
  }

  async registerDomain(domain: string): Promise<BroadcastTxResult> {
    const client = new SigningCosmosClient(Config.rpcURL, this.account.address, this.offlineSigner);

    const msgs: Msg[] = [
      this.getDeleteDomainMsg(domain, this.account.address),
      this.getRegisterDomainMsg(domain, this.account.address),
    ];

    return await client.signAndBroadcast(msgs, this.getTxFee());
  }

  private getDeleteDomainMsg(domain: string, address: string): MsgDeleteDomain {
    return {
      type: "starname/DeleteDomain",
      value: {
        domain: domain,
        owner: address,
        fee_payer: "",
      },
    };
  }

  private getRegisterDomainMsg(domain: string, address: string): MsgRegisterDomain {
    return {
      type: "starname/RegisterDomain",
      value: {
        admin: address,
        domain: domain,
        fee_payer: "",
        type: "closed",
        broker: "star13x0u28w09dhx02nrza2arajkvf9wny5hm6ul8l",
      },
    };
  }

  private getTxFee(): StdFee {
    return { amount: [{ denom: "uiov", amount: "250000" }], gas: "250000" };
  }
}
