import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Domain } from "@starname-explorer/shared";
import React from "react";

import Avatar from "../../../components/Avatar";
import Box from "../../../components/Box";
import Link from "../../../components/Link";
import Paper from "../../../components/Paper";
import Table from "../../../components/Table";
import TableBody from "../../../components/TableBody";
import TableCell from "../../../components/TableCell";
import TableContainer from "../../../components/TableContainer";
import TableFooter from "../../../components/TableFooter";
import TableHead from "../../../components/TableHead";
import TablePagination from "../../../components/TablePagination";
import TableRow from "../../../components/TableRow";

type Columns = "domain" | "admin";
type SortOrder = 1 | -1;

export interface TablePageSettings {
  readonly sorting: { column: Columns; order: SortOrder };
  readonly page: number;
  readonly limit: number;
}

interface SortingProps {
  order: SortOrder;
}

const SortingIcon: React.FunctionComponent<SortingProps> = ({ order }): JSX.Element => (
  <React.Fragment>
    {order === 1 && <ArrowDropDownIcon />}
    {order === -1 && <ArrowDropUpIcon />}
  </React.Fragment>
);

export interface TableProps {
  readonly domains: readonly Domain[];
  readonly count: number;
  readonly pageSettings: TablePageSettings;
  readonly setPageSettings: React.Dispatch<React.SetStateAction<TablePageSettings>>;
}

const DomainsTable: React.FunctionComponent<TableProps> = ({
  count,
  domains,
  pageSettings,
  setPageSettings,
}): JSX.Element => {
  const emptyRows =
    pageSettings.limit - Math.min(pageSettings.limit, count - pageSettings.page * pageSettings.limit);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    setPageSettings({ ...pageSettings, page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setPageSettings({ ...pageSettings, limit: parseInt(event.target.value, 10), page: 0 });
  };

  const handleSorting = (column: Columns): void => {
    let sortOrder = pageSettings.sorting.order;
    if (pageSettings.sorting.column !== column) {
      sortOrder = 1;
    } else {
      sortOrder = (sortOrder * -1) as SortOrder;
    }
    setPageSettings({
      ...pageSettings,
      sorting: {
        column: column,
        order: sortOrder,
      },
    });
  };

  const handleDomainSorting = (): void => {
    handleSorting("domain");
  };

  const handleOwnerSorting = (): void => {
    handleSorting("admin");
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="domains table">
        <TableHead>
          <TableRow>
            <TableCell width={250}>
              <Box display="flex" onClick={handleDomainSorting}>
                Domain
                {pageSettings.sorting.column === "domain" && (
                  <SortingIcon order={pageSettings.sorting.order} />
                )}
              </Box>
            </TableCell>
            <TableCell>
              <Box display="flex" onClick={handleOwnerSorting}>
                Owner{" "}
                {pageSettings.sorting.column === "admin" && (
                  <SortingIcon order={pageSettings.sorting.order} />
                )}
              </Box>
            </TableCell>
            <TableCell align="center" width={120}>
              Resources
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {domains.map((domain) => {
            return (
              <TableRow key={domain._id}>
                <TableCell>{domain.domain}</TableCell>
                <TableCell>{domain.admin}</TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="center">
                    <Link to={`https://starname.me/*${domain.domain}`}>
                      <Avatar alt="Remy Sharp" src="/assets/logo_starname.jpeg" />
                    </Link>
                    <Link to={`https://www.mintscan.io/starname/account/${domain.admin}`}>
                      <Avatar alt="Remy Sharp" src="/assets/logo_mintscan.png" />
                    </Link>
                  </Box>
                </TableCell>
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
              rowsPerPage={pageSettings.limit}
              page={pageSettings.page}
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

export default DomainsTable;
