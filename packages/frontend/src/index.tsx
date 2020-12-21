import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./routes";
import { configureStore } from "./store";
import theme from "./utils/theme";

const store = configureStore();

const render = (Component: React.ComponentType): void => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <CssBaseline />
            <Component />
          </Router>
        </ThemeProvider>
      </Provider>
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
