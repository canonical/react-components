import React, { ReactNode, HTMLProps, useMemo, isValidElement } from "react";
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
import { PropsWithSpread, SortDirection } from "types";
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
    /**
     * The column that the table will be sorted by (this should match a cell selector).
     */
    initialSortColumn?: string;
    /**
     * The direction of the initial sort.
     */
    initialSortDirection?: "ascending" | "descending";
    /**
     * Whether the sort by needs to be reset after each data change.
     */
    autoResetSortBy?: boolean;
  },
  HTMLProps<HTMLTableElement>
>;

const generateCell = <D extends Record<string, unknown>>(
  cell: Cell<D>,
  getCellProps: Props<D>["getCellProps"]
) => {
  const hasColumnIcon = cell.column.getCellIcon;
  const iconName = hasColumnIcon && cell.column.getCellIcon?.(cell);

  return (
    <TableCell
      {...cell.getCellProps([
        {
          className: cell.column.className,
        },
        {
          className: hasColumnIcon ? "p-table__cell--icon-placeholder" : "",
        },
        { ...getCellProps?.(cell) },
      ])}
    >
      {iconName && <Icon name={iconName} />}
      {cell.render("Cell")}
    </TableCell>
  );
};

const generateRows = <D extends Record<string, unknown>>(
  rows: Row<D>[],
  prepareRow: (row: Row<D>) => void,
  getRowProps: Props<D>["getRowProps"],
  getCellProps: Props<D>["getCellProps"]
) => {
  let tableRows: ReactNode[] = [];
  rows.forEach((row) => {
    // This function is responsible for lazily preparing a row for rendering.
    // Any row that you intend to render in your table needs to be passed to this function before every render.
    // see: https://react-table.tanstack.com/docs/api/useTable#instance-properties
    prepareRow(row);
    tableRows.push(
      <TableRow {...row.getRowProps(getRowProps?.(row))}>
        {row.cells.map((cell) => generateCell<D>(cell, getCellProps))}
      </TableRow>
    );
    if (row.subRows?.length) {
      tableRows = tableRows.concat(
        generateRows<D>(row.subRows, prepareRow, getRowProps, getCellProps)
      );
    }
  });
  return tableRows;
};

function ModularTable<D extends Record<string, unknown>>({
  data,
  columns,
  emptyMsg,
  footer,
  sortable,
  getHeaderProps,
  getRowProps,
  getCellProps,
  getRowId,
  initialSortColumn,
  initialSortDirection,
  autoResetSortBy = false,
  ...props
}: Props<D>): JSX.Element {
  const sortBy = useMemo(
    () =>
      initialSortColumn
        ? [
            {
              id: initialSortColumn,
              desc: initialSortDirection === "descending",
            },
          ]
        : [],
    [initialSortColumn, initialSortDirection]
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<D>(
      {
        columns,
        data,
        getRowId: getRowId || undefined,
        initialState: {
          sortBy,
        },
        autoResetSortBy,
      },
      sortable ? useSortBy : undefined
    );

  const showEmpty: boolean = !!emptyMsg && (!rows || rows.length === 0);

  // Function returns whether table can be sorted by a specific column.
  // Returns true if sorting is enabled for the column and there is text
  // or JSX provided for the header, otherwise returns false.
  const isColumnSortable = (column: HeaderGroup<D>) =>
    column.canSort &&
    (isValidElement(column.Header) ||
      ((typeof column.Header === "string" ||
        typeof column.Header === "number") &&
        !!String(column.Header).trim()));

  const getColumnSortDirection = (column: HeaderGroup<D>): SortDirection => {
    if (!isColumnSortable(column)) {
      return undefined;
    }
    if (!column.isSorted) {
      return "none";
    }
    return column.isSortedDesc ? "descending" : "ascending";
  };

  return (
    <Table {...getTableProps()} {...props}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHeader
                sort={getColumnSortDirection(column)}
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
                  sortable && isColumnSortable(column)
                    ? column.getSortByToggleProps({ title: undefined })
                    : {},
                ])}
              >
                {column.render("Header")}
              </TableHeader>
            ))}
          </TableRow>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {generateRows(rows, prepareRow, getRowProps, getCellProps)}
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
