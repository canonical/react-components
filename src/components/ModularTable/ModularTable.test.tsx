import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { Row } from "react-table";

import ModularTable from "./ModularTable";

const columns = [
  { accessor: "status", Header: "Status", sortType: "alphanumeric" },
  {
    accessor: "cores",
    Header: "Cores",
    className: "u-align--right",
    sortType: "alphanumeric",
    title: "Cores",
  },
  {
    accessor: "ram",
    Header: "RAM",
    className: "u-align--right",
    sortType: "alphanumeric",
  },
  {
    accessor: "disks",
    Header: "Disks",
    className: "u-align--right",
    sortType: "alphanumeric",
  },
];
const data: Record<string, unknown>[] = [
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

describe("ModularTable", () => {
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

  it("renders all rows and columns when the sortable option is set", async () => {
    render(<ModularTable columns={columns} data={data} sortable={true} />);
    screen.getAllByRole("columnheader").forEach((ch) => {
      expect(ch).toHaveAttribute("aria-sort", "none");
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

  it("can set a default sort", async () => {
    render(
      <ModularTable
        columns={columns}
        data={data}
        initialSortColumn="disks"
        initialSortDirection="descending"
        sortable
      />
    );
    const tableBody = screen.getAllByRole("rowgroup")[1];
    const rowItems = within(tableBody).getAllByRole("row");
    expect(rowItems).toHaveLength(3);
    expect(within(rowItems[0]).queryAllByRole("cell")[3]).toHaveTextContent(
      "3"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[3]).toHaveTextContent(
      "2"
    );
    expect(within(rowItems[2]).queryAllByRole("cell")[3]).toHaveTextContent(
      "2"
    );
  });

  it("renders subrows", async () => {
    const data: Record<string, unknown>[] = [
      {
        status: "Ready",
        cores: 1,
        ram: "1 GiB",
        disks: 2,
        subRows: [
          {
            status: "Waiting",
            cores: 1,
            ram: "1 GiB",
            disks: 2,
          },
        ],
      },
      {
        status: "Idle",
        cores: 8,
        ram: "3.9 GiB",
        disks: 3,
      },
    ];
    render(<ModularTable columns={columns} data={data} />);
    const tableBody = screen.getAllByRole("rowgroup")[1];
    const rowItems = within(tableBody).getAllByRole("row");
    expect(rowItems).toHaveLength(3);
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Waiting"
    );
    expect(within(rowItems[2]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
  });

  it("sorts group headers then sub-rows", async () => {
    const data: Record<string, unknown>[] = [
      {
        status: "Ready",
        cores: 3,
        ram: "1 GiB",
        disks: 2,
        subRows: [
          {
            status: "Waiting",
            cores: 4,
            ram: "1 GiB",
            disks: 2,
          },
          {
            status: "Error",
            cores: 2,
            ram: "1 GiB",
            disks: 2,
          },
        ],
      },
      {
        status: "Idle",
        cores: 1,
        ram: "3.9 GiB",
        disks: 3,
      },
    ];
    render(<ModularTable columns={columns} data={data} sortable />);
    const tableBody = screen.getAllByRole("rowgroup")[1];
    let rowItems = within(tableBody).getAllByRole("row");
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Waiting"
    );
    expect(within(rowItems[2]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Error"
    );
    expect(within(rowItems[3]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
    await userEvent.click(screen.getByRole("columnheader", { name: "Cores" }));
    rowItems = within(tableBody).getAllByRole("row");
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );
    expect(within(rowItems[2]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Error"
    );
    expect(within(rowItems[3]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Waiting"
    );
  });

  it("renders no rows when data is empty", () => {
    render(<ModularTable columns={columns} data={[]} />);
    const tableBody = screen.getAllByRole("rowgroup")[1];

    expect(within(tableBody).queryByRole("row")).not.toBeInTheDocument();
  });

  it("renders empty message when data is empty", () => {
    render(
      <ModularTable columns={columns} data={[]} emptyMsg="Nothing here" />
    );

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
            value === "Waiting"
              ? "This is a cell with custom label"
              : undefined,
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
        getRowProps={(row: Row<Record<string, unknown>>) => ({
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

  it("should not reset sort by after data change", async () => {
    const data: Record<string, unknown>[] = [
      {
        status: "Idle",
        cores: 8,
        ram: "3.9 GiB",
        disks: 3,
      },
      {
        status: "Ready",
        cores: 1,
        ram: "1 GiB",
        disks: 2,
      },
    ];
    const MockTableWithChangeDataButton = (): JSX.Element => {
      const [tableData, setTableData] = useState(data);
      return (
        <>
          <ModularTable columns={columns} data={tableData} sortable />
          <button
            onClick={() =>
              setTableData((prevData) => [
                ...prevData,
                {
                  status: "Error",
                  cores: 2,
                  ram: "1 GiB",
                  disks: 2,
                },
              ])
            }
          >
            Change table data
          </button>
        </>
      );
    };
    render(<MockTableWithChangeDataButton />);
    const tableBody = screen.getAllByRole("rowgroup")[1];
    let rowItems = within(tableBody).getAllByRole("row");
    expect(rowItems).toHaveLength(2);
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );
    await userEvent.click(screen.getByRole("columnheader", { name: "Cores" }));
    rowItems = within(tableBody).getAllByRole("row");
    expect(rowItems).toHaveLength(2);
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Change table data" })
    );
    rowItems = within(tableBody).getAllByRole("row");
    expect(rowItems).toHaveLength(3);
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Error"
    );
    expect(within(rowItems[2]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
  });

  it("should have no aria-sort attribute and not sort by columns that have sorting disabled", async () => {
    const columns = [
      { accessor: "status", Header: "Status", sortType: "alphanumeric" },
      { accessor: "notSortable", Header: "Not Sortable", disableSortBy: true },
    ];
    const data: Record<string, unknown>[] = [
      {
        status: "Idle",
        notSortable: "second",
      },
      {
        status: "Ready",
        notSortable: "first",
      },
    ];
    render(<ModularTable columns={columns} data={data} sortable />);

    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(
      screen.getByRole("columnheader", { name: "Status" })
    ).toHaveAttribute("aria-sort", "none");
    expect(
      screen.getByRole("columnheader", { name: "Not Sortable" })
    ).not.toHaveAttribute("aria-sort");

    const tableBody = screen.getAllByRole("rowgroup")[1];
    let rowItems = within(tableBody).getAllByRole("row");
    expect(rowItems).toHaveLength(2);
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );

    await userEvent.click(
      screen.getByRole("columnheader", { name: "Not Sortable" })
    );

    rowItems = within(tableBody).getAllByRole("row");
    expect(rowItems).toHaveLength(2);
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );
  });

  it("should not have aria-sort attribute and should not sort by columns with no name or with only whitespaces", async () => {
    const columns = [
      { accessor: "status", Header: "Status", sortType: "alphanumeric" },
      { accessor: "nameless", sortType: "alphanumeric" },
      { accessor: "whitespace", Header: "   ", sortType: "alphanumeric" },
    ];
    const data: Record<string, unknown>[] = [
      {
        status: "Idle",
        nameless: "second",
        accessor: "two",
      },
      {
        status: "Ready",
        nameless: "first",
        accessor: "one",
      },
    ];
    render(<ModularTable columns={columns} data={data} sortable />);

    const header = screen.getAllByRole("columnheader");
    expect(header[0]).toHaveTextContent("Status");
    expect(header[0]).toHaveAttribute("aria-sort", "none");
    expect(header[1]).toHaveTextContent("");
    expect(header[1]).not.toHaveAttribute("aria-sort");
    expect(header[2]).toHaveTextContent("");
    expect(header[2]).not.toHaveAttribute("aria-sort");

    const tableBody = screen.getAllByRole("rowgroup")[1];
    let rowItems = within(tableBody).getAllByRole("row");
    expect(rowItems).toHaveLength(2);
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );

    await userEvent.click(header[1]);

    rowItems = within(tableBody).getAllByRole("row");
    expect(rowItems).toHaveLength(2);
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );

    await userEvent.click(header[2]);

    rowItems = within(tableBody).getAllByRole("row");
    expect(rowItems).toHaveLength(2);
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );
  });

  it("should not have aria-sort attribute and should not sort by columns whose header is a deeply nested ReactNode with no text inside", async () => {
    const columns = [
      { accessor: "status", Header: "Status", sortType: "alphanumeric" },
      {
        accessor: "deeplyNested",
        Header: (
          <div>
            <button></button>
            <div>
              <p></p>
              <span></span>
            </div>
          </div>
        ),
        sort: "alphanumeric",
      },
    ];
    const data: Record<string, unknown>[] = [
      {
        status: "Idle",
        deeplyNested: "second",
      },
      {
        status: "Ready",
        deeplyNested: "first",
      },
    ];
    render(<ModularTable columns={columns} data={data} sortable />);

    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(
      screen.getByRole("columnheader", { name: "Status" })
    ).toHaveAttribute("aria-sort", "none");
    expect(screen.getByRole("columnheader", { name: "" })).not.toHaveAttribute(
      "aria-sort"
    );

    const tableBody = screen.getAllByRole("rowgroup")[1];
    let rowItems = within(tableBody).getAllByRole("row");
    expect(rowItems).toHaveLength(2);
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );

    await userEvent.click(screen.getByRole("columnheader", { name: "" }));

    rowItems = within(tableBody).getAllByRole("row");
    expect(rowItems).toHaveLength(2);
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );
  });

  it("should have aria-sort attribute and should sort by columns whose header is a deeply nested ReactNode with text inside", async () => {
    const columns = [
      { accessor: "status", Header: "Status", sortType: "alphanumeric" },
      {
        accessor: "deeplyNested",
        Header: (
          <div>
            <button></button>
            <div>
              <p></p>
              <span>Deeply Nested Text</span>
            </div>
          </div>
        ),
        sortBy: "alphanumeric",
      },
    ];
    const data: Record<string, unknown>[] = [
      {
        status: "Idle",
        deeplyNested: "second",
      },
      {
        status: "Ready",
        deeplyNested: "first",
      },
    ];
    render(<ModularTable columns={columns} data={data} sortable />);

    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(
      screen.getByRole("columnheader", { name: "Status" })
    ).toHaveAttribute("aria-sort", "none");
    expect(
      screen.getByRole("columnheader", { name: "Deeply Nested Text" })
    ).toHaveAttribute("aria-sort", "none");

    const tableBody = screen.getAllByRole("rowgroup")[1];
    let rowItems = within(tableBody).getAllByRole("row");
    expect(rowItems).toHaveLength(2);
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );

    await userEvent.click(
      screen.getByRole("columnheader", { name: "Deeply Nested Text" })
    );

    rowItems = within(tableBody).getAllByRole("row");
    expect(rowItems).toHaveLength(2);
    expect(within(rowItems[0]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Ready"
    );
    expect(within(rowItems[1]).queryAllByRole("cell")[0]).toHaveTextContent(
      "Idle"
    );
  });
});
