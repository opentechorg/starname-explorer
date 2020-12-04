import React from "react";

import Container from "../Container";

interface Props {
  readonly children: JSX.Element;
}

const Layout: React.FunctionComponent<Props> = ({ children }): JSX.Element => (
  <Container maxWidth="lg">{children}</Container>
);

export default Layout;
