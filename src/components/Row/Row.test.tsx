import { render, screen } from "@testing-library/react";
import React from "react";

import Row from "./Row";

describe("Row ", () => {
  it("renders", () => {
    render(<Row data-testid="row">Test content</Row>);
    expect(screen.getByTestId("row")).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    render(
      <Row data-testid="row" className="extra-class">
        Test content
      </Row>,
    );
    const row = screen.getByTestId("row");
    expect(row).toHaveClass("row");
    expect(row).toHaveClass("extra-class");
  });
});
