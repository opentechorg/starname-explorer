import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Domain } from "@starname-explorer/shared";
import React from "react";

import Box from "../../../components/Box";
import Paper from "../../../components/Paper";
import Table from "../../../components/Table";
import TableBody from "../../../components/TableBody";
import TableCell from "../../../components/TableCell";
import TableContainer from "../../../components/TableContainer";
import TableFooter from "../../../components/TableFooter";
import TableHead from "../../../components/TableHead";
import TablePagination from "../../../components/TablePagination";
import TableRow from "../../../components/TableRow";
import DomainRow from "./DomainRow";

type Columns = "domain" | "admin" | "valid_until";
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
  readonly onBuyDomain: (domain: Domain) => Promise<void>;
}

const DomainsTable: React.FunctionComponent<TableProps> = ({
  count,
  domains,
  pageSettings,
  setPageSettings,
  onBuyDomain,
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

  const handleValidUntilSorting = (): void => {
    handleSorting("valid_until");
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="domains table">
        <TableHead>
          <TableRow>
            <TableCell width={62} />
            <TableCell width={250}>
              <Box sx={{ display: "flex" }} onClick={handleDomainSorting}>
                Domain
                {pageSettings.sorting.column === "domain" && (
                  <SortingIcon order={pageSettings.sorting.order} />
                )}
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex" }} onClick={handleOwnerSorting}>
                Owner{" "}
                {pageSettings.sorting.column === "admin" && (
                  <SortingIcon order={pageSettings.sorting.order} />
                )}
              </Box>
            </TableCell>
            <TableCell width={150}>
              <Box sx={{ display: "flex" }} onClick={handleValidUntilSorting}>
                Valid until
                {pageSettings.sorting.column === "valid_until" && (
                  <SortingIcon order={pageSettings.sorting.order} />
                )}
              </Box>
            </TableCell>
            <TableCell align="center" width={120}>
              Resources
            </TableCell>
            <TableCell width={56}>Order</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {domains.map((domain) => (
            <DomainRow key={domain._id} domain={domain} onBuyDomain={onBuyDomain} />
          ))}
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
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DomainsTable;
