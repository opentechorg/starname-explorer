import { Domain } from "@starname-explorer/shared";
import React from "react";

import { ResultsPage } from "../../types/ResultsPage";
import Layout from "./components/Layout";

const Consents: React.FunctionComponent = (): JSX.Element => {
  const [domainsPage, setDomainsPage] = React.useState<ResultsPage<Domain> | null>();
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  React.useEffect(() => {
    fetch(`https://explorer.opentech.ee/api/domains?limit=${limit}&page=${page + 1}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDomainsPage(data);
        console.log(data);
      });
  }, [page, limit]);

  return (
    <React.Fragment>
      {domainsPage && (
        <Layout
          domains={domainsPage.docs}
          count={domainsPage.totalDocs}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      )}
    </React.Fragment>
  );
};

export default Consents;
