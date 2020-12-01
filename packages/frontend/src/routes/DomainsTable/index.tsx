import { Domain } from "@starname-explorer/shared";
import React from "react";

import { ResultsPage } from "../../types/ResultsPage";
import Layout from "./components/Layout";
import { TablePageSettings } from "./components/Table";

const DomainsTable: React.FunctionComponent = (): JSX.Element => {
  const [domainsPage, setDomainsPage] = React.useState<ResultsPage<Domain> | null>();
  const [pageSettings, setPageSettings] = React.useState<TablePageSettings>({
    sorting: {
      column: "domain",
      order: 1,
    },
    page: 0,
    limit: 25,
  });
  React.useEffect(() => {
    fetch(
      `https://explorer.opentech.ee/api/domains?limit=${pageSettings.limit}&page=${pageSettings.page + 1}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDomainsPage(data);
        console.log(data);
      });
  }, [pageSettings]);

  return (
    <React.Fragment>
      {domainsPage && (
        <Layout
          domains={domainsPage.docs}
          count={domainsPage.totalDocs}
          pageSettings={pageSettings}
          setPageSettings={setPageSettings}
        />
      )}
    </React.Fragment>
  );
};

export default DomainsTable;
