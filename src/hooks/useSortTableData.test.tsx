import React from "react";
import {
  act,
  render,
  renderHook,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MainTable from "components/MainTable";
import type { MainTableRow } from "components/MainTable/MainTable";
import TablePagination from "components/TablePagination";
import { useSortTableData } from "./useSortTableData";

const makeRows = (): MainTableRow[] =>
  ["c", "a", "d", "b"].map((name) => ({
    columns: [{ content: name.toUpperCase(), role: "rowheader" }],
    sortData: { name },
  }));

const rowNames = (rows: MainTableRow[]) =>
  rows.map((row) => row.sortData?.name);

describe("useSortTableData", () => {
  it("returns the rows unsorted when there is no sort key", () => {
    const rows = makeRows();
    const { result } = renderHook(() => useSortTableData({ rows }));
    expect(rowNames(result.current.rows)).toEqual(["c", "a", "d", "b"]);
    expect(result.current.sortKey).toBeNull();
  });

  it("sorts by the default sort key and direction", () => {
    const { result } = renderHook(() =>
      useSortTableData({
        rows: makeRows(),
        defaultSort: "name",
        defaultSortDirection: "descending",
      }),
    );
    expect(rowNames(result.current.rows)).toEqual(["d", "c", "b", "a"]);
    expect(result.current.sortKey).toBe("name");
    expect(result.current.sortDirection).toBe("descending");
  });

  it("follows the default sort when it changes after mount", () => {
    const { result, rerender } = renderHook(
      (props: {
        defaultSort: string;
        defaultSortDirection: "ascending" | "descending";
      }) => useSortTableData({ rows: makeRows(), ...props }),
      {
        initialProps: {
          defaultSort: "name",
          defaultSortDirection: "ascending" as const,
        },
      },
    );
    expect(rowNames(result.current.rows)).toEqual(["a", "b", "c", "d"]);
    rerender({ defaultSort: "name", defaultSortDirection: "descending" });
    expect(result.current.sortDirection).toBe("descending");
    expect(rowNames(result.current.rows)).toEqual(["d", "c", "b", "a"]);
    rerender({ defaultSort: null, defaultSortDirection: "descending" });
    expect(result.current.sortKey).toBeNull();
    expect(rowNames(result.current.rows)).toEqual(["c", "a", "d", "b"]);
  });

  it("does not mutate the input rows", () => {
    const rows = makeRows();
    renderHook(() => useSortTableData({ rows, defaultSort: "name" }));
    expect(rowNames(rows)).toEqual(["c", "a", "d", "b"]);
  });

  it("cycles ascending, descending, cleared when the same key is updated", () => {
    const { result } = renderHook(() => useSortTableData({ rows: makeRows() }));
    act(() => result.current.updateSort("name"));
    expect(result.current.sortDirection).toBe("ascending");
    expect(rowNames(result.current.rows)).toEqual(["a", "b", "c", "d"]);

    act(() => result.current.updateSort("name"));
    expect(result.current.sortDirection).toBe("descending");
    expect(rowNames(result.current.rows)).toEqual(["d", "c", "b", "a"]);

    // MainTable sends a null key on the third click to clear the sort.
    act(() => result.current.updateSort(null));
    expect(result.current.sortKey).toBeNull();
    expect(result.current.sortDirection).toBe("none");
    expect(rowNames(result.current.rows)).toEqual(["c", "a", "d", "b"]);
  });

  it("sorts ascending when a different key is updated", () => {
    const rows = makeRows().map((row, index) => ({
      ...row,
      sortData: { ...row.sortData, index: 3 - index },
    }));
    const { result } = renderHook(() =>
      useSortTableData({
        rows,
        defaultSort: "name",
        defaultSortDirection: "descending",
      }),
    );
    act(() => result.current.updateSort("index"));
    expect(result.current.sortKey).toBe("index");
    expect(result.current.sortDirection).toBe("ascending");
    expect(rowNames(result.current.rows)).toEqual(["b", "d", "a", "c"]);
  });

  it("uses a custom sort function", () => {
    const sortFunction = jest.fn(() => -1 as const);
    const { result } = renderHook(() =>
      useSortTableData({
        rows: makeRows(),
        defaultSort: "name",
        defaultSortDirection: "ascending",
        sortFunction,
      }),
    );
    expect(sortFunction).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      "ascending",
      "name",
    );
    expect(result.current.rows).toHaveLength(4);
  });

  it("sorts the full data set when used with TablePagination and MainTable", async () => {
    const PaginatedTable = () => {
      const rows = makeRows();
      const {
        rows: sortedRows,
        sortKey,
        sortDirection,
        updateSort,
      } = useSortTableData({ rows });
      return (
        <TablePagination data={sortedRows} pageLimits={[2]}>
          <MainTable
            headers={[{ content: "Name", sortKey: "name" }]}
            sortable
            defaultSort={sortKey}
            defaultSortDirection={sortDirection}
            onUpdateSort={updateSort}
          />
        </TablePagination>
      );
    };
    render(<PaginatedTable />);
    const firstPage = () =>
      screen
        .getAllByRole("row")
        .slice(1)
        .map((row) => within(row).getByRole("rowheader").textContent);
    expect(firstPage()).toEqual(["C", "A"]);

    await userEvent.click(
      within(screen.getByRole("columnheader", { name: "Name" })).getByRole(
        "button",
      ),
    );
    // "B" and "D" are not on the first page, but are sorted before "C".
    expect(firstPage()).toEqual(["A", "B"]);
    expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );

    await userEvent.click(
      within(screen.getByRole("columnheader", { name: "Name" })).getByRole(
        "button",
      ),
    );
    expect(firstPage()).toEqual(["D", "C"]);
    expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "descending",
    );
  });
});
