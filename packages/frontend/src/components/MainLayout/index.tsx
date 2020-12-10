import React from "react";

import Box from "../Box";
import Container from "../Container";

interface Props {
  readonly children: JSX.Element;
}

const Layout: React.FunctionComponent<Props> = ({ children }): JSX.Element => (
  <Box sx={{ margin: 2 }}>
    <Container maxWidth="lg">{children}</Container>
  </Box>
);

export default Layout;
