import { LcdClient } from "@cosmjs/launchpad";

import { setupStarnameExtension } from "./starname";
import { LcdStarnameClient } from "./types";

export function getStarnameClient(apiUrl: string): LcdStarnameClient {
  return LcdClient.withExtensions({ apiUrl }, setupStarnameExtension);
}
