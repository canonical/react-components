import { MainTableHeader, MainTableRow } from "components/MainTable/MainTable";

export const visibleRowColumns = (
  rows: MainTableRow[],
  hiddenCols: string[],
): MainTableRow[] => {
  return rows.map((row) => {
    return {
      ...row,
      columns: row.columns.filter(
        (item) => !hiddenCols.includes(item["aria-label"]),
      ),
    };
  });
};

export const visibleHeaderColumns = (
  headers: MainTableHeader[],
  hiddenCols: string[],
): MainTableHeader[] =>
  headers.filter(
    (item) =>
      typeof item.content !== "string" || !hiddenCols.includes(item.content),
  );
