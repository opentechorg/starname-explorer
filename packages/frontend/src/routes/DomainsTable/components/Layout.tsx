import React from "react";

import Box from "../../../components/Box";
import Table, { TableProps } from "./Table";

const Layout: React.FunctionComponent<TableProps> = ({
  domains,
  count,
  pageSettings,
  setPageSettings,
}): JSX.Element => {
  return (
    <Box width={920}>
      <Table domains={domains} count={count} pageSettings={pageSettings} setPageSettings={setPageSettings} />
    </Box>
  );
};

export default Layout;
