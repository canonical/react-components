import { render, screen } from "@testing-library/react";
import React from "react";

import TableHeader from "./TableHeader";

describe("TableHeader", () => {
  it("renders", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeader>Column 1</TableHeader>
          </tr>
        </thead>
      </table>,
    );
    expect(screen.getByRole("columnheader")).toMatchSnapshot();
  });

  it("can set a sort", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeader sort="ascending">Column 1</TableHeader>
          </tr>
        </thead>
      </table>,
    );
    expect(screen.getByRole("columnheader")).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
  });

  it("renders auxiliary content when not sortable", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeader
              auxiliaryContent={<span data-testid="header-help">info</span>}
            >
              Column 1
            </TableHeader>
          </tr>
        </thead>
      </table>,
    );

    const header = screen.getByRole("columnheader");

    expect(screen.getByTestId("header-help")).toBeInTheDocument();
    expect(header).not.toHaveAttribute("aria-sort");
    expect(header).toHaveTextContent("Column 1info");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
