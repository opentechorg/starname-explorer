import { isBroadcastTxFailure } from "@cosmjs/launchpad";
import { Color } from "@material-ui/core/Alert";
import { Domain } from "@starname-explorer/shared";
import React from "react";
import { useSelector } from "react-redux";

import { FeeCalculation } from "../../classes/FeeCalculation";
import { AccountNotFoundError, KeplrNotFoundError, TxConnection } from "../../classes/TxConnection";
import { PriceDialog } from "../../components/PriceDialog";
import Snackbar from "../../components/Snackbar";
import { RootState } from "../../store/reducers";
import { ResultsPage } from "../../types/ResultsPage";
import { Config } from "../../utils/config";
import Layout from "./components/Layout";
import { TablePageSettings } from "./components/Table";

interface SnackbarProps {
  readonly open: boolean;
  readonly message: string;
  readonly severity: Color;
}

interface BuyAssetState {
  readonly show: boolean;
  readonly fee?: number;
  readonly domain?: Domain;
  readonly loading?: boolean;
}

const DomainsTable: React.FunctionComponent = (): JSX.Element => {
  const fees = useSelector((state: RootState) => state.fees.data);
  const [buyAsset, setAssetToBuy] = React.useState<BuyAssetState>({
    show: false,
  });
  const [isTxProcessing, SetTxProcessing] = React.useState(false);

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

  const handleClose = (): void => {
    setAssetToBuy({ show: false });
    SetTxProcessing(false);
  };

  const onBuyDomain = async (domain: Domain): Promise<void> => {
    const calc = new FeeCalculation(domain, fees);
    const fee = calc.calculateDomainFeeIov();
    setAssetToBuy({ show: true, domain, fee });
  };

  const handleAgree = (): void => {
    if (buyAsset.show && buyAsset.domain) {
      proceedToPayment(buyAsset.domain);
    }
  };

  const proceedToPayment = async (domain: Domain): Promise<void> => {
    SetTxProcessing(true);
    try {
      const txConnection = await TxConnection.init();
      const result = await txConnection.registerDomain(domain.domain);
      console.log(result);
      if (isBroadcastTxFailure(result)) {
        setSnackbar({
          open: true,
          message: result.rawLog,
          severity: "error",
        });
      }
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
    } finally {
      handleClose();
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
      <PriceDialog
        open={buyAsset.show}
        handleClose={handleClose}
        handleAgree={handleAgree}
        loading={isTxProcessing}
        title="Are you ready to buy this starname?"
      >
        You can buy <strong>*{buyAsset.domain?.domain}</strong> starname for only{" "}
        <strong>{buyAsset.fee} IOV</strong> and small transaction fee in Keplr extension.
      </PriceDialog>
    </React.Fragment>
  );
};

export default DomainsTable;
