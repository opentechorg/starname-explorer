import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import DomainsTable from "./DomainsTable";
import { DOMAINS_ROUTE } from "./paths";

const Main: React.FunctionComponent = (): JSX.Element => {
  return (
    <Switch>
      <Redirect exact from="/" to={DOMAINS_ROUTE} />
      <Route path={DOMAINS_ROUTE} component={DomainsTable} />
    </Switch>
  );
};

export default Main;
