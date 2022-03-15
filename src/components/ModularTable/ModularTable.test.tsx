import { render, screen, within } from "@testing-library/react";
import React from "react";

import ModularTable from "./ModularTable";

const columns = [
  { accessor: "status" as const, Header: "Status" },
  { accessor: "cores" as const, Header: "Cores", className: "u-align--right" },
  { accessor: "ram" as const, Header: "RAM", className: "u-align--right" },
  { accessor: "disks" as const, Header: "Disks", className: "u-align--right" },
];
const data = [
  {
    status: "Ready",
    cores: 1,
    ram: "1 GiB",
    disks: 2,
  },
  {
    status: "Waiting",
    cores: 1,
    ram: "1 GiB",
    disks: 2,
  },
  {
    status: "Idle",
    cores: 8,
    ram: "3.9 GiB",
    disks: 3,
  },
];

it("renders all rows and columns", async () => {
  render(<ModularTable columns={columns} data={data} />);
  const tableBody = screen.getAllByRole("rowgroup")[1];
  const rowItems = within(tableBody).getAllByRole("row");
  expect(rowItems.length).toEqual(data.length);

  rowItems.forEach((row) => {
    const cells = within(row).getAllByRole("cell");
    expect(cells.length).toEqual(columns.length);
  });
});

it("renders all cells with a correct content", async () => {
  render(<ModularTable columns={columns} data={data} />);
  const tableBody = screen.getAllByRole("rowgroup")[1];
  const rowItems = within(tableBody).getAllByRole("row");

  rowItems.forEach((row, rowIndex) => {
    const cellsWithinRow = within(row).getAllByRole("cell");
    const rowData = data[rowIndex];

    cellsWithinRow.forEach((cell, cellIndex) => {
      const columnAccessor = columns[cellIndex].accessor;
      expect(cell.textContent).toEqual(`${rowData[columnAccessor]}`);
    });
  });
});

it("renders no rows when data is empty", () => {
  render(<ModularTable columns={columns} data={[]} />);
  const tableBody = screen.getAllByRole("rowgroup")[1];

  expect(within(tableBody).queryByRole("row")).not.toBeInTheDocument();
});

it("renders empty message when data is empty", () => {
  render(<ModularTable columns={columns} data={[]} emptyMsg="Nothing here" />);

  const rowItems = screen.getAllByRole("row");
  expect(rowItems.length).toEqual(2);
  expect(
    within(rowItems[rowItems.length - 1]).getByRole("gridcell", {
      name: "Nothing here",
    })
  ).toBeInTheDocument();
});

it("renders a row with footer content", () => {
  render(
    <ModularTable columns={columns} data={data} footer="This is a footer" />
  );

  const rowItems = screen.getAllByRole("row");
  expect(rowItems.length).toEqual(5);
  expect(
    within(rowItems[rowItems.length - 1]).getByRole("gridcell", {
      name: "This is a footer",
    })
  ).toBeInTheDocument();
});

it("renders extra props", () => {
  render(<ModularTable columns={columns} data={data} data-testid="testID" />);

  expect(screen.getByTestId("testID")).toBeInTheDocument();
});

it("allows setting custom aria-label for specific cells based on their value", async () => {
  render(
    <ModularTable
      columns={columns}
      data={data}
      getCellProps={({ value }) => ({
        "aria-label":
          value === "Waiting" ? "This is a cell with custom label" : undefined,
      })}
    />
  );

  expect(
    screen.getByRole("cell", { name: "This is a cell with custom label" })
  ).toBeInTheDocument();
});

it("allows setting custom attributes for cells in specific columns", async () => {
  render(
    <ModularTable
      columns={columns}
      data={data}
      getCellProps={({ column }) => ({
        role: column.id === "status" ? "rowheader" : undefined,
      })}
    />
  );
  const tableBody = screen.getAllByRole("rowgroup")[1];
  const rowItems = within(tableBody).getAllByRole("row");

  rowItems.forEach((row, index) => {
    const rowheader = within(row).getByRole("rowheader");
    expect(rowheader.textContent).toEqual(`${data[index].status}`);
  });
});

it("allows setting custom attributes for specific rows", async () => {
  render(
    <ModularTable
      columns={columns}
      data={data}
      getRowProps={(row) => ({
        "aria-label":
          row.values.status === "Idle" ? "Custom idle row label" : undefined,
      })}
    />
  );
  const tableBody = screen.getAllByRole("rowgroup")[1];
  expect(
    within(tableBody).getByRole("row", {
      name: "Custom idle row label",
    })
  ).toBeInTheDocument();
});
