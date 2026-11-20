import type { SortDirection } from "types";
import type { MainTableHeader, MainTableRow, Props } from "./MainTable";

export type SortState = {
  sortKey: MainTableHeader["sortKey"];
  sortDirection: SortDirection;
};

/**
 * Returns the sort state after a header is clicked. Clicking a new header sorts
 * ascending, clicking the current one cycles ascending -> descending -> cleared.
 * Shared by MainTable and useSortTableData so both apply the same cycle.
 */
export const getNextSort = (
  current: SortState,
  sortKey: MainTableHeader["sortKey"],
): SortState => {
  if (!sortKey) {
    return { sortKey: null, sortDirection: "none" };
  }
  if (sortKey !== current.sortKey || current.sortDirection === "none") {
    return { sortKey, sortDirection: "ascending" };
  }
  if (current.sortDirection === "ascending") {
    return { sortKey, sortDirection: "descending" };
  }
  return { sortKey: null, sortDirection: "none" };
};

export type SortRowsOptions = Pick<
  Props,
  "rows" | "sortable" | "sortFunction"
> & {
  currentSortDirection: Props["defaultSortDirection"];
  currentSortKey: Props["defaultSort"];
};

/**
 * Returns a sorted copy of the rows. Shared by MainTable and useSortTableData
 * so both use the same default comparison.
 */
export const sortRows = ({
  currentSortDirection,
  currentSortKey,
  rows,
  sortable,
  sortFunction,
}: SortRowsOptions): MainTableRow[] => {
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
