import React from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import MainLayout from "../components/MainLayout";
import { loadConfigurationAction } from "../store/configuration";
import { loadFeesAction } from "../store/fees";
import DomainsTable from "./DomainsTable";
import { DOMAINS_ROUTE } from "./paths";

const Main: React.FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadFeesAction());
    dispatch(loadConfigurationAction());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainLayout>
      <Switch>
        <Redirect exact from="/" to={DOMAINS_ROUTE} />
        <Route path={DOMAINS_ROUTE} component={DomainsTable} />
      </Switch>
    </MainLayout>
  );
};

export default Main;
