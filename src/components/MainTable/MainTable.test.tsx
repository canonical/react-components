import { render, screen, within } from "@testing-library/react";
import React from "react";

import MainTable from "./MainTable";
import type { MainTableHeader, MainTableRow } from "./MainTable";
import { Label as PaginationButtonLabel } from "../Pagination/PaginationButton/PaginationButton";
import userEvent from "@testing-library/user-event";

describe("MainTable", () => {
  let headers: MainTableHeader[];
  let rows: MainTableRow[];

  beforeEach(() => {
    headers = [
      { content: "Status" },
      { content: "Cores", className: "u-align--right" },
      { content: "RAM", className: "u-align--right" },
      {
        content: (
          <span>
            Disks <i className="p-icon--information"></i>
          </span>
        ),
        className: "u-align--right",
      },
    ];
    rows = [
      {
        columns: [
          { content: "Ready", role: "rowheader" },
          { content: 1, className: "u-align--right" },
          { content: "1 GiB", className: "u-align--right" },
          { content: 2, className: "u-align--right" },
        ],
      },
      {
        columns: [
          { content: "Waiting", role: "rowheader" },
          { content: 1, className: "u-align--right" },
          { content: "1 GiB", className: "u-align--right" },
          { content: 2, className: "u-align--right" },
        ],
      },
      {
        columns: [
          { content: "Idle", role: "rowheader" },
          { content: 8, className: "u-align--right" },
          { content: "3.9 GiB", className: "u-align--right" },
          { content: 3, className: "u-align--right" },
        ],
      },
    ];
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    render(<MainTable headers={headers} rows={rows} />);
    expect(screen.getByRole("grid")).toMatchSnapshot();
  });

  it("renders rows with provided keys", () => {
    // There isn't a way to access the key using RTL so this test checks for the
    // error: "Encountered two children with the same key".
    // This test helps to prevent this recurring issue, but if you're reading
    // this and know of a better way to write this test then please update it!
    const errorSpy = jest.spyOn(console, "error");
    rows[0].key = 1;
    rows[1].key = 2;
    rows[2].key = 0; // we explicitly want to test 0 as a falsy value provided as a key
    render(<MainTable headers={headers} rows={rows} />);
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockReset();
  });

  it("can be expanding", () => {
    rows.push({
      columns: [
        { content: "Expanding", role: "rowheader" },
        { content: 1, className: "u-align--right" },
        { content: "1.9 GiB", className: "u-align--right" },
        { content: 2, className: "u-align--right" },
      ],
      expanded: true,
      expandedContent: <div>Expand this</div>,
    });
    render(<MainTable expanding={true} headers={headers} rows={rows} />);
    expect(screen.getByRole("grid")).toHaveClass("p-table--expanding");
    // Need to query the DOM as this cell is not exposed by default.
    // eslint-disable-next-line testing-library/no-node-access
    const heads = document.querySelectorAll("th");
    // There should be an additional hidden table header to account for the
    // expanding cell
    expect(heads.length).toEqual(headers.length + 1);
    expect(heads[heads.length - 1]).toHaveAttribute("aria-hidden", "true");
    // eslint-disable-next-line testing-library/no-node-access
    const columns = document.querySelectorAll("tr:last-child td");
    // There should be an additional table cell for the expanding content.
    expect(columns.length).toEqual(rows[rows.length - 1].columns.length + 1);
    const expandingColumn = columns[columns.length - 1];
    expect(expandingColumn.classList.contains("p-table__expanding-panel")).toBe(
      true
    );
    expect(expandingColumn.textContent).toBe("Expand this");
  });

  it("can be responsive", () => {
    render(<MainTable headers={headers} responsive={true} rows={rows} />);
    expect(screen.getByRole("grid")).toHaveClass("p-table--mobile-card");
  });

  it("contains data-heading attribute equal to heading on columns in responsive table", () => {
    render(<MainTable headers={headers} responsive={true} rows={rows} />);
    expect(screen.getAllByRole("rowheader")[0]).toHaveAttribute(
      "data-heading",
      "Status"
    );
  });

  it("doesn't contain data-heading attribute if there is no heading", () => {
    render(<MainTable responsive={true} rows={rows} />);
    expect(screen.getAllByRole("rowheader")[0]).not.toHaveAttribute(
      "data-heading"
    );
  });

  it("uses heading prop for data-heading if there are is no heading for that column", () => {
    headers[3].heading = "Replacement";
    render(<MainTable headers={headers} responsive={true} rows={rows} />);
    expect(screen.getAllByRole("gridcell")[2]).toHaveAttribute(
      "data-heading",
      "Replacement"
    );
  });

  it("can be paginated", () => {
    render(<MainTable paginate={2} rows={rows} />);
    expect(
      screen.getByRole("button", { name: PaginationButtonLabel.Next })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(2);
  });

  it("can change the page", async () => {
    render(<MainTable paginate={2} rows={rows} />);
    await userEvent.click(
      screen.getByRole("button", { name: PaginationButtonLabel.Next })
    );
    expect(screen.getAllByRole("row")).toHaveLength(1);
    expect(screen.getAllByRole("rowheader")[0].textContent).toEqual("Idle");
  });

  describe("sorting", () => {
    beforeEach(() => {
      headers[0].sortKey = "status";
      headers[1].sortKey = "cores";
      headers[2].sortKey = "ram";
      rows[0].sortData = {
        status: "ready",
        cores: 2,
        ram: 1,
      };
      rows[1].sortData = {
        status: "waiting",
        cores: 1,
        ram: 1,
      };
      rows[2].sortData = {
        status: "idle",
        cores: 8,
        ram: 3.9,
      };
    });

    it("can be sortable", async () => {
      render(<MainTable headers={headers} rows={rows} sortable={true} />);
      // Sortable headers should have the sort prop set.
      expect(
        screen.getByRole("columnheader", { name: "Status" })
      ).toHaveAttribute("aria-sort", "none");
      // non-sortable headers should not have the sort prop set.
      expect(
        screen.getByRole("columnheader", { name: "Disks" })
      ).not.toHaveAttribute("aria-sort");
    });

    it("can sort when clicking on a header", async () => {
      render(<MainTable headers={headers} rows={rows} sortable={true} />);
      const rowItems = screen.getAllByRole("row");
      // Check the initial status order.
      expect(within(rowItems[1]).getByRole("rowheader").textContent).toBe(
        "Ready"
      );

      expect(within(rowItems[2]).getByRole("rowheader").textContent).toBe(
        "Waiting"
      );

      expect(within(rowItems[3]).getByRole("rowheader").textContent).toBe(
        "Idle"
      );

      await userEvent.click(
        screen.getByRole("columnheader", { name: "Status" })
      );
      // The status should now be ascending.
      expect(within(rowItems[1]).getByRole("rowheader").textContent).toBe(
        "Idle"
      );

      expect(within(rowItems[2]).getByRole("rowheader").textContent).toBe(
        "Ready"
      );

      expect(within(rowItems[3]).getByRole("rowheader").textContent).toBe(
        "Waiting"
      );

      await userEvent.click(
        screen.getByRole("columnheader", { name: "Status" })
      );
      // The status should now be descending.
      expect(within(rowItems[1]).getByRole("rowheader").textContent).toBe(
        "Waiting"
      );

      expect(within(rowItems[2]).getByRole("rowheader").textContent).toBe(
        "Ready"
      );

      expect(within(rowItems[3]).getByRole("rowheader").textContent).toBe(
        "Idle"
      );

      await userEvent.click(
        screen.getByRole("columnheader", { name: "Status" })
      );
      // The status be back to the original order.
      expect(within(rowItems[1]).getByRole("rowheader").textContent).toBe(
        "Ready"
      );

      expect(within(rowItems[2]).getByRole("rowheader").textContent).toBe(
        "Waiting"
      );

      expect(within(rowItems[3]).getByRole("rowheader").textContent).toBe(
        "Idle"
      );
    });

    it("can set a default sort", () => {
      render(
        <MainTable
          defaultSort="status"
          defaultSortDirection="descending"
          headers={headers}
          rows={rows}
          sortable={true}
        />
      );
      // Sortable headers should have the sort prop set.
      expect(
        screen.getByRole("columnheader", { name: "Status" })
      ).toHaveAttribute("aria-sort", "descending");
    });

    it("updates sort when props change", () => {
      const { rerender } = render(
        <MainTable
          defaultSort="status"
          defaultSortDirection="descending"
          headers={headers}
          rows={rows}
          sortable={true}
        />
      );
      expect(
        screen.getByRole("columnheader", { name: "Status" })
      ).toHaveAttribute("aria-sort", "descending");
      expect(
        screen.getByRole("columnheader", { name: "Cores" })
      ).toHaveAttribute("aria-sort", "none");
      rerender(
        <MainTable
          defaultSort="cores"
          defaultSortDirection="ascending"
          headers={headers}
          rows={rows}
          sortable={true}
        />
      );
      expect(
        screen.getByRole("columnheader", { name: "Status" })
      ).toHaveAttribute("aria-sort", "none");
      expect(
        screen.getByRole("columnheader", { name: "Cores" })
      ).toHaveAttribute("aria-sort", "ascending");
    });

    it("shows a hidden caption if provided", () => {
      const captionText = "This is a caption for screen readers";

      render(
        <MainTable
          defaultSort="status"
          defaultSortDirection="descending"
          headers={headers}
          rows={rows}
          sortable={true}
          hiddenCaption={captionText}
        />
      );

      // can't target the caption using getByRole :(
      expect(screen.getByTestId("hidden-caption").textContent).toEqual(
        captionText
      );
    });
  });
});
