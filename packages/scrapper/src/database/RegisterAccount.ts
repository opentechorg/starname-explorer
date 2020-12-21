import {
  AccountNft,
  RegisterAccountValue,
  StarnameExtension,
  StarnameSchemaModel,
} from "@starname-explorer/shared";

export async function RegisterAccount(
  client: StarnameExtension,
  account: RegisterAccountValue,
): Promise<void> {
  const accountDetails = await client.starname.queryResolve(`${account.name}*${account.domain}`);

  await saveAccountNft(accountDetails);
}

export async function saveAccountNft(account: AccountNft): Promise<void> {
  await StarnameSchemaModel.updateOne(
    { domain: account.domain, name: account.name },
    account,
    {
      upsert: true,
    },
    (error) => {
      if (error) {
        console.error(error);
      }
    },
  );
}
