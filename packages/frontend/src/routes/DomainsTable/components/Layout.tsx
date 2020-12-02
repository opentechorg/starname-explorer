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
    <Box width={920}>
      <SearchQuery onSearch={onSearch} />
      <Box marginTop={2} />
      <Table domains={domains} count={count} pageSettings={pageSettings} setPageSettings={setPageSettings} />
    </Box>
  );
};

export default Layout;
