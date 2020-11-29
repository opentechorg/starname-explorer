import { makeStyles } from "@material-ui/core";
import { Domain } from "@starname-explorer/shared";
import React from "react";

import Paper from "../../../components/Paper";
import Table from "../../../components/Table";
import TableBody from "../../../components/TableBody";
import TableCell from "../../../components/TableCell";
import TableContainer from "../../../components/TableContainer";
import TableFooter from "../../../components/TableFooter";
import TableHead from "../../../components/TableHead";
import TablePagination from "../../../components/TablePagination";
import TableRow from "../../../components/TableRow";

export const TABLE_WIDTH = 820;

const useStyles = makeStyles({
  table: {
    width: TABLE_WIDTH,
  },
  cell: {
    width: "200px",
  },
});

export interface TableProps {
  readonly domains: readonly Domain[];
  readonly count: number;
  readonly page: number;
  readonly setPage: React.Dispatch<React.SetStateAction<number>>;
  readonly limit: number;
  readonly setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const ConsentsTable: React.FunctionComponent<TableProps> = ({
  count,
  domains,
  page,
  setPage,
  limit,
  setLimit,
}): JSX.Element => {
  const classes = useStyles();

  const emptyRows = limit - Math.min(limit, count - page * limit);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="domains table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.cell}>
              Domain
            </TableCell>
            <TableCell align="center" className={classes.cell}>
              Admin
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {domains.map((domain) => {
            return (
              <TableRow key={domain._id}>
                <TableCell>{domain.domain}</TableCell>
                <TableCell>{domain.admin}</TableCell>
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={2} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              colSpan={3}
              count={count}
              rowsPerPage={limit}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ConsentsTable;
