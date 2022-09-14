import { render, screen } from "@testing-library/react";
import React from "react";

import Table from "./Table";

describe("Table", () => {
  it("renders", () => {
    render(
      <Table>
        <thead></thead>
      </Table>
    );
    expect(screen.getByRole("grid")).toMatchSnapshot();
  });

  it("can be expanding", () => {
    render(<Table expanding={true} />);
    expect(screen.getByRole("grid")).toHaveClass("p-table--expanding");
  });

  it("can be responsive", () => {
    render(<Table responsive={true} />);
    expect(screen.getByRole("grid")).toHaveClass("p-table--mobile-card");
  });

  it("can pass additional classes", () => {
    render(<Table responsive={true} className="extra-class" />);
    expect(screen.getByRole("grid")).toHaveClass("p-table--mobile-card");
    expect(screen.getByRole("grid")).toHaveClass("extra-class");
  });
});
