import { StarnameExtension, StarnameSchemaModel } from "@starname-explorer/shared";

export async function RenewAccount(client: StarnameExtension, domain: string, name: string): Promise<void> {
  const accountDetails = await client.starname.queryResolve(`${name}*${domain}`);

  await StarnameSchemaModel.updateOne(
    { domain: accountDetails.domain, name: accountDetails.name },
    { $set: { valid_until: accountDetails.valid_until } },
  );
}
