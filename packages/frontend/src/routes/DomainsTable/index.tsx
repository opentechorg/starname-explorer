import { Color } from "@material-ui/core/Alert";
import { Domain } from "@starname-explorer/shared";
import React from "react";

import { AccountNotFoundError, KeplrNotFoundError, TxConnection } from "../../classes/TxConnection";
import Snackbar from "../../components/Snackbar";
import { ResultsPage } from "../../types/ResultsPage";
import { Config } from "../../utils/config";
import Layout from "./components/Layout";
import { TablePageSettings } from "./components/Table";

interface SnackbarProps {
  readonly open: boolean;
  readonly message: string;
  readonly severity: Color;
}

const DomainsTable: React.FunctionComponent = (): JSX.Element => {
  const [snackbar, setSnackbar] = React.useState<SnackbarProps>({
    open: false,
    message: "",
    severity: "success",
  });
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

  const close = (): void => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const onBuyDomain = async (domain: Domain): Promise<void> => {
    try {
      const txConnection = await TxConnection.init();
      const result = await txConnection.registerDomain(domain.domain);
      console.log(result);
    } catch (err) {
      if (err instanceof KeplrNotFoundError) {
        setSnackbar({
          open: true,
          message: "Keplr extension was not found. Please install it.",
          severity: "error",
        });
      } else if (err instanceof AccountNotFoundError) {
        setSnackbar({
          open: true,
          message: "Account was not found. Please check your Keplr extension settings",
          severity: "error",
        });
      } else {
        setSnackbar({ open: true, message: err.message, severity: "error" });
      }
    }
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
          onBuyDomain={onBuyDomain}
        />
      )}
      <Snackbar open={snackbar.open} close={close} severity={snackbar.severity}>
        {snackbar.message}
      </Snackbar>
    </React.Fragment>
  );
};

export default DomainsTable;
