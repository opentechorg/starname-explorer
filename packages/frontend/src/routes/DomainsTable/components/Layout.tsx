import React from "react";

import Box from "../../../components/Box";
import Table, { TableProps } from "./Table";

const Layout: React.FunctionComponent<TableProps> = ({
  domains,
  count,
  page,
  setPage,
  limit,
  setLimit,
}): JSX.Element => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box>
        <Table
          domains={domains}
          count={count}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      </Box>
    </Box>
  );
};

export default Layout;
