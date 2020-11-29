import { Domain } from "@starname-explorer/shared";
import React from "react";

import Box from "../../../components/Box";
import Table, { TABLE_WIDTH, TableProps } from "./Table";

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
      <Box width={TABLE_WIDTH}>
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
