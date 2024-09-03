import React, { useEffect, useMemo, useState } from "react";
import type { HTMLProps, ReactNode } from "react";

import type { ClassName, PropsWithSpread, SortDirection } from "types";
import Pagination from "../Pagination";
import Table from "../Table";
import type { TableProps } from "../Table";
import TableRow from "../TableRow";
import TableHeader from "../TableHeader";
import TableCell from "../TableCell";
import type { TableCellProps } from "../TableCell";
import { usePagination } from "hooks";

export type MainTableHeader = PropsWithSpread<
  {
    /**
     * The content of the table header.
     */
    content?: ReactNode;
    /**
     * Optional classes to apply to the table header.
     */
    className?: ClassName;
    /**
     * A key to sort the rows by. It should match a key given to the row `sortData`.
     */
    sortKey?: string | null;
    /**
     * Replacement value for data-heading if content is not a string.
     */
    heading?: string;
  },
  HTMLProps<HTMLTableHeaderCellElement>
>;

export type MainTableCell = PropsWithSpread<
  {
    /**
     * The content of the table cell.
     */
    content?: ReactNode;
  },
  // We explicitly omit "children" otherwise it's possible to overwrite "content".
  // Might want to consider just using "children" instead.
  Omit<TableCellProps, "children">
>;

export type MainTableRow = PropsWithSpread<
  {
    /**
     * Optional class(es) to apply to the row.
     */
    className?: ClassName;
    /**
     * The columns in this row.
     */
    columns?: MainTableCell[];
    /**
     * Whether this row should display as expanded.
     */
    expanded?: boolean;
    /**
     * The content to display when this column is expanded.
     */
    expandedContent?: ReactNode;
    /**
     * An optional key to identify this table row.
     */
    key?: number | string | null;
    /**
     * An object of data for use when sorting the rows. The keys of this object
     * should match the header sort keys.
     */
    sortData?: Record<string, unknown>;
  },
  HTMLProps<HTMLTableRowElement>
>;

export type Props = PropsWithSpread<
  {
    /**
     * The default key to sort the rows by.
     */
    defaultSort?: MainTableHeader["sortKey"];
    /**
     * The default direction the row data should be sorted by.
     */
    defaultSortDirection?: SortDirection;
    /**
     * A message to display when there are no table rows.
     */
    emptyStateMsg?: ReactNode;
    /**
     * The header columns for this table.
     */
    headers?: MainTableHeader[];
    /**
     * A function that is called when the sort key is changed.
     */
    onUpdateSort?: (sortKey: MainTableHeader["sortKey"]) => void;
    /**
     * A number of rows to paginate by.
     */
    paginate?: number | null;
    /**
     * The rows to display in the table.
     */
    rows?: MainTableRow[];
    /**
     * Whether this table should be sortable.
     */
    sortable?: boolean;
    /**
     * A function to be used when sorting.
     */
    sortFunction?: (
      a: MainTableRow,
      b: MainTableRow,
      currentSortDirection: SortDirection,
      currentSortKey: MainTableHeader["sortKey"],
    ) => -1 | 0 | 1;
    /**
     * A hidden caption to display on the table for screen readers
     */
    hiddenCaption?: string | null;
  },
  TableProps
>;

const updateSort = (
  setSortKey: (sortKey: MainTableHeader["sortKey"]) => void,
  setSortDirection: (direction: SortDirection) => void,
  sortKey: MainTableHeader["sortKey"],
  sortDirection: SortDirection,
) => {
  let newDirection = null;
  if (sortDirection === "none") {
    newDirection = "ascending";
  } else if (sortDirection === "ascending") {
    newDirection = "descending";
  } else {
    sortKey = null;
  }
  setSortKey(sortKey);
  setSortDirection(newDirection);
};

const generateHeaders = (
  currentSortKey: MainTableHeader["sortKey"],
  currentSortDirection: SortDirection,
  expanding: Props["expanding"],
  headers: Props["headers"],
  sortable: Props["sortable"],
  setSortKey: (sortKey: MainTableHeader["sortKey"]) => void,
  setSortDirection: (direction: SortDirection) => void,
) => {
  const headerItems = headers.map(({ content, sortKey, ...props }, index) => {
    let sortDirection: SortDirection;
    if (sortable && sortKey) {
      if (currentSortKey === sortKey) {
        sortDirection = currentSortDirection;
      } else {
        sortDirection = "none";
      }
    }
    return (
      <TableHeader
        key={index}
        sort={sortDirection}
        onClick={
          sortable && sortKey
            ? updateSort.bind(
                this,
                setSortKey,
                setSortDirection,
                sortKey,
                sortDirection,
              )
            : undefined
        }
        {...props}
      >
        {content}
      </TableHeader>
    );
  });
  // When there is expanding content then provide an extra hidden header to
  // account for the extra cell in the body rows.
  return (
    <thead>
      <TableRow>
        {headerItems}
        {expanding && <TableHeader aria-hidden="true"></TableHeader>}
      </TableRow>
    </thead>
  );
};

const generateRows = ({
  rows,
  headers,
  responsive,
  expanding,
}: Required<Pick<Props, "rows">> &
  Pick<Props, "headers" | "responsive" | "expanding">) =>
  rows.map(
    (
      { columns, expanded, expandedContent, key, sortData, ...rowProps },
      index,
    ) => {
      const cellItems = columns?.map(({ content, ...cellProps }, index) => {
        const headerContent = headers && headers[index]["content"];
        const headerReplacement = headers && headers[index]["heading"];

        if (responsive) {
          cellProps["data-heading"] =
            typeof headerContent === "string"
              ? headerContent
              : headerReplacement;
        }

        return (
          <TableCell key={index} {...cellProps}>
            {content}
          </TableCell>
        );
      });
      // if key was not provided as a prop, use row's index instead
      if (key === null || typeof key === "undefined") {
        key = index;
      }

      // The expanding cell is alway created to match the correct number of
      // table cells in rows that do have expanding content.
      return (
        <TableRow key={key} {...rowProps}>
          {cellItems}
          {expanding && (
            <TableCell expanding={true} hidden={!expanded}>
              {expandedContent}
            </TableCell>
          )}
        </TableRow>
      );
    },
  );

const sortRows = ({
  currentSortDirection,
  currentSortKey,
  rows,
  sortable,
  sortFunction,
}: Pick<Props, "rows" | "sortable" | "sortFunction"> & {
  currentSortDirection: Props["defaultSortDirection"];
  currentSortKey: Props["defaultSort"];
}): MainTableRow[] => {
  if (!rows) {
    return [];
  }
  // Clone the rows so we can restore the original order.
  const sortedRows = [...rows];
  if (sortable && currentSortKey) {
    if (!sortFunction) {
      sortFunction = (a, b) => {
        if (!a.sortData || !b.sortData) {
          return 0;
        }
        if (a.sortData[currentSortKey] > b.sortData[currentSortKey]) {
          return currentSortDirection === "ascending" ? 1 : -1;
        } else if (a.sortData[currentSortKey] < b.sortData[currentSortKey]) {
          return currentSortDirection === "ascending" ? -1 : 1;
        }
        return 0;
      };
    }
    sortedRows.sort((a, b) =>
      sortFunction(a, b, currentSortDirection, currentSortKey),
    );
  }
  return sortedRows;
};

/**
 * This is a [React](https://reactjs.org/) component to support many table use cases.
 */
const MainTable = ({
  defaultSort,
  defaultSortDirection,
  emptyStateMsg = "",
  expanding,
  headers,
  onUpdateSort,
  paginate,
  rows,
  responsive,
  sortable,
  sortFunction,
  hiddenCaption,
  ...props
}: Props): JSX.Element => {
  const [currentSortKey, setSortKey] = useState(defaultSort);
  const [currentSortDirection, setSortDirection] =
    useState(defaultSortDirection);

  // Update the current sort state if the prop changes.
  useEffect(() => {
    setSortKey(defaultSort);
  }, [defaultSort]);

  // Update the current sort direction state if the prop changes.
  useEffect(() => {
    setSortDirection(defaultSortDirection);
  }, [defaultSortDirection]);

  const updateSort = (newSort: MainTableHeader["sortKey"]) => {
    setSortKey(newSort);
    onUpdateSort && onUpdateSort(newSort);
  };

  const sortedRows = useMemo(
    () =>
      sortRows({
        currentSortDirection,
        currentSortKey,
        rows,
        sortable,
        sortFunction,
      }),
    [currentSortDirection, currentSortKey, rows, sortable, sortFunction],
  );

  const {
    pageData: finalRows,
    currentPage,
    paginate: setCurrentPage,
  } = usePagination(sortedRows, {
    itemsPerPage: paginate,
    autoResetPage: true,
  });

  return (
    <>
      <Table expanding={expanding} responsive={responsive} {...props}>
        {hiddenCaption && (
          <caption
            data-testid="hidden-caption"
            style={{
              height: "1px",
              left: "-1000px",
              overflow: "hidden",
              position: "absolute",
              top: "auto",
              width: "1px",
            }}
          >
            {hiddenCaption}
          </caption>
        )}
        {!!headers &&
          generateHeaders(
            currentSortKey,
            currentSortDirection,
            expanding,
            headers,
            sortable,
            updateSort,
            setSortDirection,
          )}
        {
          // If the table has no rows, return empty state message
          Object.entries(finalRows).length === 0 && emptyStateMsg ? (
            <caption>{emptyStateMsg}</caption>
          ) : (
            <tbody>
              {generateRows({
                rows: finalRows,
                headers,
                responsive,
                expanding,
              })}
            </tbody>
          )
        }
      </Table>
      {paginate && rows && rows.length > 0 && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={paginate}
          paginate={setCurrentPage}
          style={{ marginTop: "1rem" }}
          totalItems={rows.length}
        />
      )}
    </>
  );
};

export default MainTable;
