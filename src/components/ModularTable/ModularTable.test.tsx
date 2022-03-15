import { render, screen, within } from "@testing-library/react";
import React from "react";

import ModularTable from "./ModularTable";

const columns = [
  { accessor: "status", Header: "Status" },
  { accessor: "cores", Header: "Cores", className: "u-align--right" },
  { accessor: "ram", Header: "RAM", className: "u-align--right" },
  { accessor: "disks", Header: "Disks", className: "u-align--right" },
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
