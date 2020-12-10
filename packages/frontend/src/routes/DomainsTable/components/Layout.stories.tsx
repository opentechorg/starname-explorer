import { Domain } from "@starname-explorer/shared";
import { action } from "@storybook/addon-actions";
import React from "react";

import Layout from "./Layout";
import { TablePageSettings } from "./Table";

const storyMeta = { title: "Show domains" };

export default storyMeta;

function createDomainData(
  id: string,
  domain: string,
  admin: string,
  valid_until: number,
  type: string,
): Domain {
  return ({ _id: id, domain, admin, valid_until, type, starnames: [] } as unknown) as Domain;
}

const domainsData = [
  createDomainData(
    "5fcc1d04262402f79fa39c1e",
    "iov",
    "star1nrnx8mft8mks3l2akduxdjlf8rwqs8r9l36a78",
    1924991999,
    "open",
  ),
  createDomainData(
    "5fcc1d04262402f79fa39c20",
    "_agentgirl_",
    "star1v794jm5am4qpc52kvgmxxm2j50kgu9mjszcq96",
    1613556000,
    "closed",
  ),
  createDomainData(
    "5fcc1d04262402f79fa39c22",
    "_asia_amore",
    "star1v794jm5am4qpc52kvgmxxm2j50kgu9mjszcq96",
    1615975200,
    "closed",
  ),
  createDomainData(
    "5fcc1d04262402f79fa39c24",
    "_cristinereyes_",
    "star1v794jm5am4qpc52kvgmxxm2j50kgu9mjszcq96",
    1611136800,
    "closed",
  ),
  createDomainData(
    "5fcc1d04262402f79fa39c26",
    "_emmachamberlain",
    "star1nrnx8mft8mks3l2akduxdjlf8rwqs8r9l36a78",
    1615975200,
    "closed",
  ),
  createDomainData(
    "5fcc1d04262402f79fa39c52",
    "1010tires",
    "star1v794jm5am4qpc52kvgmxxm2j50kgu9mjszcq96",
    1608112800,
    "closed",
  ),
];

const pageSettingsData: TablePageSettings = {
  sorting: {
    column: "domain",
    order: 1,
  },
  page: 0,
  limit: 25,
};

export const layout = (): JSX.Element => (
  <Layout
    domains={domainsData}
    count={5}
    pageSettings={pageSettingsData}
    setPageSettings={action("setPageSettings")}
    onSearch={action("onSearch")}
    onBuyDomain={action("onBuyDomain")}
  />
);
