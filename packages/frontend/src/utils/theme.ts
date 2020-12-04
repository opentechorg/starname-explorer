import { ThemeOptions, unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({});

const themeOptions: ThemeOptions = {
  ...theme,
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.main,
          "& .MuiTableCell-head": {
            color: "white",
            cursor: "pointer",
          },
        },
      },
    },
  },
};

export default createMuiTheme(themeOptions);
