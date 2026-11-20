import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
} from "react";

import type {
  MainTableHeader,
  MainTableRow,
  Props as MainTableProps,
} from "components/MainTable/MainTable";
import { getNextSort, sortRows } from "components/MainTable/utils";
import type { SortState } from "components/MainTable/utils";
import type { SortDirection } from "types";

export type SortTableDataOptions = {
  /**
   * The rows to sort. The array is not mutated.
   */
  rows: MainTableRow[];
  /**
   * The key to sort the rows by initially.
   */
  defaultSort?: MainTableHeader["sortKey"];
  /**
   * The direction to sort the rows by initially. Behaves as the MainTable
   * `defaultSortDirection` prop.
   */
  defaultSortDirection?: SortDirection;
  /**
   * A custom function to be used when sorting, with the same signature as the
   * MainTable `sortFunction` prop.
   */
  sortFunction?: MainTableProps["sortFunction"];
};

export type SortTableData = {
  /**
   * A sorted copy of the rows.
   */
  rows: MainTableRow[];
  /**
   * The key the rows are currently sorted by.
   */
  sortKey: MainTableHeader["sortKey"];
  /**
   * The direction the rows are currently sorted by.
   */
  sortDirection: SortDirection;
  /**
   * Update the sort key. Pass this to the MainTable `onUpdateSort` prop.
   */
  updateSort: (sortKey: MainTableHeader["sortKey"]) => void;
};

/**
 * A hook that sorts a full data set outside of MainTable, so that sorting is
 * applied to every row before pagination (e.g. by TablePagination) rather than
 * to the visible page only.
 *
 * Pass the returned `rows` to the paginating component, and the returned
 * `updateSort`, `sortKey` and `sortDirection` to MainTable's `onUpdateSort`,
 * `defaultSort` and `defaultSortDirection` props so that the table headers
 * reflect the current sort.
 * @param {Object} options
 * @param {MainTableRow[]} options.rows - The rows to sort.
 * @param {string} [options.defaultSort] - The key to sort the rows by initially.
 * @param {SortDirection} [options.defaultSortDirection] - The initial sort direction, as for MainTable.
 * @param {Function} [options.sortFunction] - A custom sort function, as accepted by MainTable.
 */
export const useSortTableData = ({
  rows,
  defaultSort = null,
  defaultSortDirection,
  sortFunction,
}: SortTableDataOptions): SortTableData => {
  const [{ sortKey, sortDirection }, setSort] = useState<SortState>({
    sortKey: defaultSort,
    sortDirection: defaultSortDirection,
  });

  // Reset the sort if the defaults change after mount, as MainTable does.
  const resetSort = useEffectEvent(() =>
    setSort((current) =>
      current.sortKey === defaultSort &&
      current.sortDirection === defaultSortDirection
        ? current
        : { sortKey: defaultSort, sortDirection: defaultSortDirection },
    ),
  );
  useEffect(() => resetSort(), [defaultSort, defaultSortDirection]);

  const updateSort = useCallback(
    (newSortKey: MainTableHeader["sortKey"]) =>
      setSort((current) => getNextSort(current, newSortKey)),
    [],
  );

  const sortedRows = useMemo(
    () =>
      sortRows({
        currentSortDirection: sortDirection,
        currentSortKey: sortKey,
        rows,
        sortable: true,
        sortFunction,
      }),
    [rows, sortDirection, sortFunction, sortKey],
  );

  return {
    rows: sortedRows,
    sortKey,
    sortDirection,
    updateSort,
  };
};
