import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./routes";
import theme from "./utils/theme";

const render = (Component: React.ComponentType): void => {
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Component />
        </Router>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root"),
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./routes", (): void => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const NextApp = require("./routes").default;
    render(NextApp);
  });
}
