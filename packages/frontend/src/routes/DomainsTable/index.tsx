import { Domain } from "@starname-explorer/shared";
import React from "react";

import { ResultsPage } from "../../types/ResultsPage";
import { Config } from "../../utils/config";
import Layout from "./components/Layout";
import { TablePageSettings } from "./components/Table";

const DomainsTable: React.FunctionComponent = (): JSX.Element => {
  const [query, setQuery] = React.useState<string | null>();
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
    const getParams: string[] = [];
    getParams.push(`limit=${pageSettings.limit}`);
    getParams.push(`page=${pageSettings.page + 1}`);
    getParams.push(`sortColumn=${pageSettings.sorting.column}`);
    getParams.push(`sortOrder=${pageSettings.sorting.order}`);
    if (query) {
      getParams.push(`query=${query}`);
    }
    fetch(`${Config.backendURL}api/domains?${getParams.join("&")}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDomainsPage(data);
        console.log(data);
      });
  }, [pageSettings]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSearch = (query: string): void => {
    setPageSettings({ ...pageSettings, page: 0 });
    setQuery(query);
  };
  return (
    <React.Fragment>
      {domainsPage && (
        <Layout
          domains={domainsPage.docs}
          count={domainsPage.totalDocs}
          pageSettings={pageSettings}
          setPageSettings={setPageSettings}
          onSearch={onSearch}
        />
      )}
    </React.Fragment>
  );
};

export default DomainsTable;
