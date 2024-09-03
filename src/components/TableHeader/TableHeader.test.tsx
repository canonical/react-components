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
});
