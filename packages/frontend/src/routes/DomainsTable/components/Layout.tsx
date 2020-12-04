import React from "react";

import Box from "../../../components/Box";
import SearchQuery from "./SearchQuery";
import Table, { TableProps } from "./Table";

interface Props extends TableProps {
  readonly onSearch: (query: string) => void;
}

const Layout: React.FunctionComponent<Props> = ({
  domains,
  count,
  pageSettings,
  setPageSettings,
  onSearch,
}): JSX.Element => {
  return (
    <React.Fragment>
      <SearchQuery onSearch={onSearch} />
      <Box sx={{ marginTop: 2 }} />
      <Table domains={domains} count={count} pageSettings={pageSettings} setPageSettings={setPageSettings} />
    </React.Fragment>
  );
};

export default Layout;
