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
    sortable?: boolean;
    /**
     * This function is used to resolve any props needed for a particular column's header cell.
     */
    getHeaderProps?: (
      header: HeaderGroup<D>,
    ) => Partial<TableHeaderProps & HTMLProps<HTMLTableHeaderCellElement>>;
    /**
     * This function is used to resolve any props needed for a particular row.
     */
    getRowProps?: (
      row: Row<D>,
    ) => Partial<TableRowProps & HTMLProps<HTMLTableRowElement>>;
    /**
     * This function is used to resolve any props needed for a particular cell.
     */
    getCellProps?: (
      cell: Cell<D>,
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
  getCellProps: Props<D>["getCellProps"],
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
  getCellProps: Props<D>["getCellProps"],
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
      </TableRow>,
    );
    if (row.subRows?.length) {
      tableRows = tableRows.concat(
        generateRows<D>(row.subRows, prepareRow, getRowProps, getCellProps),
      );
    }
  });
  return tableRows;
};

/**
This is a [React](https://reactjs.org/) component to support many table use cases.
 
ModularTable components accepts `columns` and `data` arguments in the same format as [`useTable`](https://react-table.tanstack.com/docs/api/useTable) hook of the ReactTable library.

`columns` - The core columns configuration object for the entire table. https://react-table.tanstack.com/docs/api/useTable#column-options
`data` - The data array that you want to display on the table.
### Important note!
Values passed to both of these params have to me memoized (for example via{" "}
  <code>React.useMemo</code>). Memoization ensures that our data isn't recreated
  on every render. If we didn't use <code>React.useMemo</code>, the table would
  think it was receiving new data on every render and attempt to recalulate a
  lot of logic every single time.

#### Custom column options

In addition to standard column propeties from [`useTable`](https://react-table.tanstack.com/docs/api/useTable) `ModularTable` accepts some custom properties.

##### Class names

Custom `className` can be used to provide a specific CSS class name that will be added to all cells in given column.
You can also provide `getHeaderProps`, `getRowProps` and `getCellProps` to resolve additional custom props for a specific element. More on this in [`useTable - cell properties`](https://react-table.tanstack.com/docs/api/useTable#cell-properties).

```js
getCellProps={({ value, column }) => ({
  className: `table__cell--${column.id} ${value ===  "1 minute" ? "p-heading--5" : ""}`,
})}
columns = {
  Header: "Hidden on mobile",
  accessor: "example",
  className: "u-hide--small"
}
```

##### Icons

To show an icon in the cells of a column `getCellIcon` function should be defined. The function takes a cell data as an argument and should return one of built in icons (from the `ICONS` const), a string with a custom icon name, or `false` if no icon should be shown.

The `ICONS` const contains all [the Vanilla built in icons](https://vanillaframework.io/docs/patterns/icons) such as "plus", "minus", "success", "error", etc.

Product specific icons can be used as well, assuming that the product provides the necessary CSS styling and the icon follows the Vanilla naming convention `p-icon--{name}`.

```js
columns = {
  Header: "With icons",
  accessor: "status",
  getCellIcon: ({ value }) => {
    return value === "released" ? ICONS.success : false;
  },
};
```
 */
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
    [initialSortColumn, initialSortDirection],
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
      sortable ? useSortBy : undefined,
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
        {headerGroups.map((headerGroup, i) => (
          <TableRow {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column, j) => (
              <TableHeader
                key={j}
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
