import { render, screen } from "@testing-library/react";
import React from "react";

import Table from "./Table";

const TEST_ID = "table";

describe("Table", () => {
  it("renders", () => {
    render(
      <Table data-testid={TEST_ID}>
        <thead></thead>
      </Table>
    );
    expect(screen.getByTestId(TEST_ID)).toMatchSnapshot();
  });

  it("can be expanding", () => {
    render(<Table data-testid={TEST_ID} expanding={true} />);
    expect(screen.getByTestId(TEST_ID)).toHaveClass("p-table--expanding");
  });

  it("can be responsive", () => {
    render(<Table data-testid={TEST_ID} responsive={true} />);
    expect(screen.getByTestId(TEST_ID)).toHaveClass("p-table--mobile-card");
  });

  it("can pass additional classes", () => {
    render(
      <Table data-testid={TEST_ID} responsive={true} className="extra-class" />
    );
    expect(screen.getByTestId(TEST_ID)).toHaveClass("p-table--mobile-card");
    expect(screen.getByTestId(TEST_ID)).toHaveClass("extra-class");
  });
});
