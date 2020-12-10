import { makeStyles } from "@material-ui/core/styles";
import { DomainType, Starname } from "@starname-explorer/shared";
import React from "react";

import Avatar from "../../../components/Avatar";
import Box from "../../../components/Box";
import Link from "../../../components/Link";
import Table from "../../../components/Table";
import TableBody from "../../../components/TableBody";
import TableCell from "../../../components/TableCell";
import TableHead from "../../../components/TableHead";
import TableRow from "../../../components/TableRow";

const useRowStyles = makeStyles((theme) => ({
  headerStyle: {
    backgroundColor: theme.palette.grey[500],
  },
  starnameAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

interface Props {
  readonly starnames: Starname[];
  readonly domainType: DomainType;
}

const StarnamesTable: React.FunctionComponent<Props> = ({ starnames, domainType }): JSX.Element => {
  const classes = useRowStyles();

  return (
    <Table size="small" aria-label="starnames">
      <TableHead className={classes.headerStyle}>
        <TableRow>
          <TableCell>Starname</TableCell>
          <TableCell width={600}>Owner</TableCell>
          {domainType === "open" && <TableCell>Valid until</TableCell>}
          <TableCell width={56}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {starnames
          .filter((starname) => starname.name)
          .map((starname) => (
            <TableRow key={starname._id}>
              <TableCell component="th" scope="row">
                {starname.name}*{starname.domain}
              </TableCell>
              <TableCell>{starname.owner}</TableCell>
              {domainType === "open" && (
                <TableCell>{new Date(starname.valid_until * 1000).toLocaleDateString()}</TableCell>
              )}
              <TableCell>
                <Link to={`https://www.mintscan.io/starname/account/${starname.owner}`}>
                  <Avatar alt="Mintscan" src="/assets/logo_mintscan.png" className={classes.starnameAvatar} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default StarnamesTable;
