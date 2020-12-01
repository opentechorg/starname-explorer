import React from "react";

import Box from "../Box";

interface Props {
  readonly children: JSX.Element;
}

const Layout: React.FunctionComponent<Props> = ({ children }): JSX.Element => (
  <Box display="flex" justifyContent="center" p={2}>
    {children}
  </Box>
);

export default Layout;
