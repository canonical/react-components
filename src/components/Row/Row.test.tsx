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
    expect(row).not.toHaveClass("row--4-cols-medium");
    expect(row).toHaveClass("extra-class");
  });

  it("can use a four column grid on medium screens", () => {
    render(
      <Row data-testid="row" fourColumnMedium={true}>
        Test content
      </Row>,
    );
    const row = screen.getByTestId("row");
    expect(row).toHaveClass("row--4-cols-medium");
    expect(row).not.toHaveClass("row");
  });
});
