import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Domain } from "@starname-explorer/shared";
import React from "react";

import Avatar from "../../../components/Avatar";
import Box from "../../../components/Box";
import Collapse from "../../../components/Collapse";
import Link from "../../../components/Link";
import TableCell from "../../../components/TableCell";
import TableRow from "../../../components/TableRow";
import Typography from "../../../components/Typography";
import StarnamesTable from "./StarnamesTable";

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  headerStyle: {
    backgroundColor: theme.palette.grey[500],
  },
  starnameAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

interface Props {
  readonly domain: Domain;
  readonly onBuyDomain: (domain: Domain) => void;
}

const DomainRow: React.FunctionComponent<Props> = ({ domain, onBuyDomain }): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const onClick = (): void => onBuyDomain(domain);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {domain.starnames.length > 1 && (
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell>{domain.domain}</TableCell>
        <TableCell>{domain.admin}</TableCell>
        <TableCell>{new Date(domain.valid_until * 1000).toLocaleDateString()}</TableCell>
        <TableCell>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Link to={`https://starname.me/*${domain.domain}`}>
              <Avatar alt="Starname profile" src="/assets/logo_starname.jpeg" />
            </Link>
            <Link to={`https://www.mintscan.io/starname/account/${domain.admin}`}>
              <Avatar alt="Mintscan" src="/assets/logo_mintscan.png" />
            </Link>
          </Box>
        </TableCell>
        <TableCell>
          <Box onClick={onClick} sx={{ cursor: "pointer" }}>
            <ShoppingCartIcon color="primary" fontSize="large" />
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Starnames
              </Typography>
              <StarnamesTable starnames={domain.starnames} domainType={domain.type} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default DomainRow;
