import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import TablePagination from "./TablePagination";
import MainTable from "../MainTable";
import userEvent from "@testing-library/user-event";

const dummyData = [
  { id: "row-1" },
  { id: "row-2" },
  { id: "row-3" },
  { id: "row-4" },
  { id: "row-5" },
];

const sortableRows = ["c", "a", "d", "b"].map((name) => ({
  columns: [{ content: name.toUpperCase(), role: "rowheader" }],
  sortData: { name },
}));

const renderSortableTable = () =>
  render(
    <TablePagination data={sortableRows} pageLimits={[2]}>
      <MainTable headers={[{ content: "Name", sortKey: "name" }]} sortable />
    </TablePagination>,
  );

const getFirstPage = () =>
  screen
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getByRole("rowheader").textContent);

const sortByName = () =>
  userEvent.click(
    within(screen.getByRole("columnheader", { name: "Name" })).getByRole(
      "button",
    ),
  );

describe("<TablePagination />", () => {
  // snapshot tests
  it("renders table pagination and matches the snapshot", () => {
    render(<TablePagination data={dummyData} />);

    expect(screen.getByRole("navigation")).toMatchSnapshot();
  });

  // unit tests
  it("renders default display title correctly when no pagination takes place", () => {
    render(<TablePagination data={dummyData} />);

    expect(screen.getByRole("navigation")).toHaveTextContent(
      "Showing all 5 items",
    );
  });

  it("renders default display title correctly when pagination takes place", () => {
    render(<TablePagination data={dummyData} pageLimits={[1]} />);

    expect(screen.getByRole("navigation")).toHaveTextContent(
      "Showing 1 out of 5 items",
    );
  });

  it("has correct per page setting when changed", async () => {
    render(<TablePagination data={dummyData} pageLimits={[2, 5, 10]} />);

    expect(screen.getByRole("navigation")).toHaveTextContent("2/page");
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "Items per page" }),
      "5",
    );
    expect(screen.getByRole("navigation")).toHaveTextContent("5/page");
  });

  it("resets to first page when page size is changed", async () => {
    render(<TablePagination data={dummyData} pageLimits={[2, 5, 10]} />);

    expect(screen.getByRole("navigation")).toHaveTextContent("2/page");
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "Items per page" }),
      "5",
    );
    const currentPageInput = screen.getByRole("spinbutton", {
      name: "Page number",
    });
    expect(currentPageInput).toHaveValue(1);
  });

  it("should paginate correctly in locally controlled mode", async () => {
    render(<TablePagination data={dummyData} pageLimits={[1, 2, 5]} />);
    const incButton = screen.getByRole("button", { name: "Next page" });
    const decButton = screen.getByRole("button", { name: "Previous page" });
    const currentPageInput = screen.getByRole("spinbutton", {
      name: "Page number",
    });
    const pageSizeSelector = screen.getByRole("combobox", {
      name: "Items per page",
    });

    expect(currentPageInput).toHaveValue(1);
    await userEvent.click(decButton);
    expect(currentPageInput).toHaveValue(1);
    await userEvent.click(incButton);
    expect(currentPageInput).toHaveValue(2);
    await userEvent.selectOptions(pageSizeSelector, "2");
    expect(currentPageInput).toHaveValue(1);
    fireEvent.change(currentPageInput, { target: { value: 3 } });
    expect(currentPageInput).toHaveValue(3);
    await userEvent.click(incButton);
    expect(currentPageInput).toHaveValue(3);
    await userEvent.click(decButton);
    expect(currentPageInput).toHaveValue(2);
  });

  it("should paginate correctly in externally controlled mode", async () => {
    const totalItems = 100;
    let currentPage = 1;
    let pageSize = 10;
    const handlePageChange = (page: number) => {
      currentPage = page;
    };
    const handlePageSizeChange = (size: number) => {
      currentPage = 1;
      pageSize = size;
    };
    const { rerender } = render(
      <TablePagination
        data={dummyData}
        pageLimits={[10, 20, 50]}
        externallyControlled
        totalItems={totalItems}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />,
    );

    const incButton = screen.getByRole("button", { name: "Next page" });
    const decButton = screen.getByRole("button", { name: "Previous page" });
    const currentPageInput = screen.getByRole("spinbutton", {
      name: "Page number",
    });
    const pageSizeSelector = screen.getByRole("combobox", {
      name: "Items per page",
    });

    expect(currentPageInput).toHaveValue(1);
    await userEvent.click(decButton);
    rerender(
      <TablePagination
        data={dummyData}
        pageLimits={[10, 20, 50]}
        externallyControlled
        totalItems={totalItems}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />,
    );
    expect(currentPageInput).toHaveValue(1);

    await userEvent.click(incButton);
    rerender(
      <TablePagination
        data={dummyData}
        pageLimits={[10, 20, 50]}
        externallyControlled
        totalItems={totalItems}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />,
    );
    expect(currentPageInput).toHaveValue(2);

    await userEvent.selectOptions(pageSizeSelector, "20");
    rerender(
      <TablePagination
        data={dummyData}
        pageLimits={[10, 20, 50]}
        externallyControlled
        totalItems={totalItems}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />,
    );
    expect(currentPageInput).toHaveValue(1);

    fireEvent.change(currentPageInput, { target: { value: 5 } });
    rerender(
      <TablePagination
        data={dummyData}
        pageLimits={[10, 20, 50]}
        externallyControlled
        totalItems={totalItems}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />,
    );
    expect(currentPageInput).toHaveValue(5);

    await userEvent.click(incButton);
    rerender(
      <TablePagination
        data={dummyData}
        pageLimits={[10, 20, 50]}
        externallyControlled
        totalItems={totalItems}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />,
    );
    expect(currentPageInput).toHaveValue(5);

    await userEvent.click(decButton);
    rerender(
      <TablePagination
        data={dummyData}
        pageLimits={[10, 20, 50]}
        externallyControlled
        totalItems={totalItems}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />,
    );
    expect(currentPageInput).toHaveValue(4);
  });

  it("sorts the whole data set of a sortable table before paginating", async () => {
    renderSortableTable();
    expect(getFirstPage()).toEqual(["C", "A"]);
    await sortByName();
    // "B" is on the second page in the raw data.
    expect(getFirstPage()).toEqual(["A", "B"]);
    expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
    await sortByName();
    expect(getFirstPage()).toEqual(["D", "C"]);
    await sortByName();
    expect(getFirstPage()).toEqual(["C", "A"]);
  });

  it("finds the table among other children and only passes sort props to it", async () => {
    const Sibling = jest.fn((): null => null);
    render(
      <TablePagination data={sortableRows} pageLimits={[2]}>
        <Sibling />
        <MainTable headers={[{ content: "Name", sortKey: "name" }]} sortable />
      </TablePagination>,
    );
    await sortByName();
    expect(getFirstPage()).toEqual(["A", "B"]);
    expect(Sibling).toHaveBeenLastCalledWith(
      { rows: expect.any(Array) },
      undefined,
    );
  });

  it("sorts a table with only a default sort key the same way as a standalone table", () => {
    const table = (
      <MainTable
        headers={[{ content: "Name", sortKey: "name" }]}
        defaultSort="name"
        sortable
      />
    );
    const { unmount } = render(
      React.cloneElement(table, { rows: sortableRows }),
    );
    const standaloneOrder = getFirstPage();
    unmount();
    render(
      <TablePagination data={sortableRows} pageLimits={[4]}>
        {table}
      </TablePagination>,
    );
    expect(getFirstPage()).toEqual(standaloneOrder);
  });

  it("does not sort a table that is not sortable", () => {
    render(
      <TablePagination data={sortableRows} pageLimits={[2]}>
        <MainTable headers={[{ content: "Name", sortKey: "name" }]} />
      </TablePagination>,
    );
    expect(getFirstPage()).toEqual(["C", "A"]);
  });

  it("calls the table's own onUpdateSort when sorting the whole data set", async () => {
    const onUpdateSort = jest.fn();
    render(
      <TablePagination data={sortableRows} pageLimits={[2]}>
        <MainTable
          headers={[{ content: "Name", sortKey: "name" }]}
          sortable
          onUpdateSort={onUpdateSort}
        />
      </TablePagination>,
    );
    await sortByName();
    expect(onUpdateSort).toHaveBeenCalledWith("name");
  });

  it("should throw an error if pageSize is not in pageLimits when externally controlled", () => {
    // Don't print out massive error logs for this test
    console.error = () => "";
    expect(() =>
      render(
        <TablePagination
          data={dummyData}
          pageLimits={[10, 20, 50]}
          externallyControlled
          totalItems={100}
          currentPage={1}
          pageSize={5}
          onPageChange={jest.fn()}
          onPageSizeChange={jest.fn()}
        />,
      ),
    ).toThrow(
      "pageSize must be a valid option in pageLimits, pageLimits is set to [10,20,50]",
    );
  });
});
