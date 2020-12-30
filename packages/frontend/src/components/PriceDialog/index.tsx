import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React from "react";

import Dialog from "../Dialog";

interface Props {
  readonly children: React.ReactNode;
  readonly handleClose: () => void;
  readonly handleAgree: () => void;
  readonly open: boolean;
  readonly title: string;
  readonly loading?: boolean;
}

export const PriceDialog: React.FunctionComponent<Props> = ({
  children,
  handleClose,
  handleAgree,
  loading,
  open,
  title,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="price-dialog-title">
      <DialogTitle id="price-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {loading && <CircularProgress />}
        <Button autoFocus onClick={handleClose} color="secondary">
          Let other buy it
        </Button>
        <Button onClick={handleAgree} color="primary" autoFocus disabled={loading}>
          Give it to me!
        </Button>
      </DialogActions>
    </Dialog>
  );
};
