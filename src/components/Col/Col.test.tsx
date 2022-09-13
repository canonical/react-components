import { render, screen } from "@testing-library/react";
import React from "react";

import Col from "./Col";

describe("Col ", () => {
  it("renders", () => {
    render(
      <Col data-testid="col" size={3}>
        Test content
      </Col>
    );
    expect(screen.getByTestId("col")).toMatchSnapshot();
  });

  it("can set a size for small screens", () => {
    render(
      <Col data-testid="col" size={3} small={1}>
        Test content
      </Col>
    );
    expect(screen.getByTestId("col")).toHaveClass("col-small-1");
  });

  it("can set a size for medium screens", () => {
    render(
      <Col data-testid="col" size={3} medium={1}>
        Test content
      </Col>
    );
    expect(screen.getByTestId("col")).toHaveClass("col-medium-1");
  });

  it("can set a size for large screens", () => {
    render(
      <Col data-testid="col" size={3} large={1}>
        Test content
      </Col>
    );
    expect(screen.getByTestId("col")).toHaveClass("col-large-1");
  });

  it("can set empty cols for small screens", () => {
    render(
      <Col data-testid="col" size={3} emptySmall={1}>
        Test content
      </Col>
    );
    expect(screen.getByTestId("col")).toHaveClass("col-start-small-1");
  });

  it("can set empty cols for medium screens", () => {
    render(
      <Col data-testid="col" size={3} emptyMedium={1}>
        Test content
      </Col>
    );
    expect(screen.getByTestId("col")).toHaveClass("col-start-medium-1");
  });

  it("can set empty cols for large screens", () => {
    render(
      <Col data-testid="col" size={3} emptyLarge={1}>
        Test content
      </Col>
    );
    expect(screen.getByTestId("col")).toHaveClass("col-start-large-1");
  });

  it("can add additional classes", () => {
    render(<Col data-testid="col" size={3} className="extra-class"></Col>);
    const col = screen.getByTestId("col");
    expect(col).toHaveClass("col-3");
    expect(col).toHaveClass("extra-class");
  });
});
