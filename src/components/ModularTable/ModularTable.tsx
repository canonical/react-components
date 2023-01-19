import React, { ReactNode, HTMLProps } from "react";
import {
  TableCellProps,
  TableHeaderProps,
  TableRowProps,
  useTable,
  useSortBy,
} from "react-table";
import type {
  Column,
  UseTableOptions,
  Cell,
  Row,
  HeaderGroup,
} from "react-table";
import { PropsWithSpread } from "types";
import Table from "../Table";
import TableRow from "../TableRow";
import TableHeader from "../TableHeader";
import TableCell from "../TableCell";
import Icon from "../Icon";

export type Props<D extends Record<string, unknown>> = PropsWithSpread<
  {
    /**
     * The columns of the table.
     */
    columns: Column<D>[];
    /**
     * The data of the table.
     */
    data: D[];
    /**
     * A message to display if data is empty.
     */
    emptyMsg?: string;
    /**
     * Optional extra row to display underneath the main table content.
     */
    footer?: ReactNode;
    /**
     * Optional argument to make the tables be sortable and use the `useSortBy` plugin.
     */
    sortable?: Boolean;
    /**
     * This function is used to resolve any props needed for a particular column's header cell.
     */
    getHeaderProps?: (
      header: HeaderGroup<D>
    ) => Partial<TableHeaderProps & HTMLProps<HTMLTableHeaderCellElement>>;
    /**
     * This function is used to resolve any props needed for a particular row.
     */
    getRowProps?: (
      row: Row<D>
    ) => Partial<TableRowProps & HTMLProps<HTMLTableRowElement>>;
    /**
     * This function is used to resolve any props needed for a particular cell.
     */
    getCellProps?: (
      cell: Cell<D>
    ) => Partial<TableCellProps & HTMLProps<HTMLTableCellElement>>;
    getRowId?: UseTableOptions<D>["getRowId"];
  },
  HTMLProps<HTMLTableElement>
>;

function ModularTable({
  data,
  columns,
  emptyMsg,
  footer,
  sortable,
  getHeaderProps,
  getRowProps,
  getCellProps,
  getRowId,
  ...props
}: Props<Record<string, unknown>>): JSX.Element {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Record<string, unknown>>(
      {
        columns,
        data,
        getRowId: getRowId || undefined,
      },
      sortable ? useSortBy : undefined
    );

  const showEmpty: boolean = !!emptyMsg && (!rows || rows.length === 0);

  return (
    <Table {...getTableProps()} {...props}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHeader
                sort={
                  column.isSorted
                    ? column.isSortedDesc
                      ? "descending"
                      : "ascending"
                    : "none"
                }
                {...column.getHeaderProps([
                  {
                    className: column.className,
                  },
                  {
                    className: column.getCellIcon
                      ? "p-table__cell--icon-placeholder"
                      : "",
                  },
                  { ...getHeaderProps?.(column) },
                  // Only call this if we want it to be sortable too.
                  sortable ? column.getSortByToggleProps() : {},
                ])}
              >
                {column.render("Header")}
              </TableHeader>
            ))}
          </TableRow>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          // This function is responsible for lazily preparing a row for rendering.
          // Any row that you intend to render in your table needs to be passed to this function before every render.
          // see: https://react-table.tanstack.com/docs/api/useTable#instance-properties
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps(getRowProps?.(row))}>
              {row.cells.map((cell) => {
                const hasColumnIcon = cell.column.getCellIcon;
                const iconName =
                  hasColumnIcon && cell.column.getCellIcon?.(cell);

                return (
                  <TableCell
                    {...cell.getCellProps([
                      {
                        className: cell.column.className,
                      },
                      {
                        className: hasColumnIcon
                          ? "p-table__cell--icon-placeholder"
                          : "",
                      },
                      { ...getCellProps?.(cell) },
                    ])}
                  >
                    {iconName && <Icon name={iconName} />}
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
        {showEmpty && (
          <TableRow>
            <TableCell colSpan={columns.length}>{emptyMsg}</TableCell>
          </TableRow>
        )}
        {footer && (
          <TableRow>
            <TableCell colSpan={columns.length}>{footer}</TableCell>
          </TableRow>
        )}
      </tbody>
    </Table>
  );
}

export default ModularTable;
