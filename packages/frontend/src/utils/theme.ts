import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";

const theme = createMuiTheme({});

const themeOptions: ThemeOptions = {
  ...theme,
  overrides: {
    MuiTableHead: {
      root: {
        backgroundColor: theme.palette.primary.main,
        "& .MuiTableCell-head": {
          color: "white",
          cursor: "pointer",
        },
      },
    },
  },
};

export default createMuiTheme(themeOptions);
