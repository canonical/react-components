import React from "react";
import { render } from "@testing-library/react";

import PaginationItem from "./PaginationItem";

describe("<PaginationItem />", () => {
  // snapshot tests
  it("renders and matches the snapshot", () => {
    const { container } = render(
      <PaginationItem number={1} onClick={jest.fn()} />
    );

    expect(container).toMatchSnapshot();
  });

  // unit tests
  it("displays the page number", () => {
    const { container } = render(
      <PaginationItem number={1} onClick={jest.fn()} isActive />
    );

    expect(container.querySelector("button")).toHaveTextContent("1");
  });

  it("sets isActive", () => {
    const { container } = render(
      <PaginationItem number={1} onClick={jest.fn()} isActive />
    );

    expect(container.querySelector("button")).toHaveClass("is-active");
  });

  it("sets aria-current when isActive is true", () => {
    const { container } = render(
      <PaginationItem number={1} onClick={jest.fn()} isActive />
    );

    expect(container.querySelector("button")).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});
