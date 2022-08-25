import React from "react";
import { render, screen } from "@testing-library/react";

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
    render(<PaginationItem number={1} onClick={jest.fn()} isActive />);

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
  });

  it("sets isActive", () => {
    render(<PaginationItem number={1} onClick={jest.fn()} isActive />);

    expect(screen.getByRole("button")).toHaveClass("is-active");
  });

  it("sets aria-current when isActive is true", () => {
    render(<PaginationItem number={1} onClick={jest.fn()} isActive />);

    expect(screen.getByRole("button", { current: "page" })).toBeInTheDocument();
  });
});
