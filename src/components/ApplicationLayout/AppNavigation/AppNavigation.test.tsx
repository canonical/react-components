import React from "react";
import { render, screen } from "@testing-library/react";

import AppNavigation from "./AppNavigation";

it("displays children", () => {
  const children = "Test content";
  render(<AppNavigation>{children}</AppNavigation>);
  expect(screen.getByText(children)).toBeInTheDocument();
});

it("displays as collapsed", () => {
  const { container } = render(<AppNavigation collapsed />);
  expect(container.firstChild).toHaveClass("is-collapsed");
});

it("displays as pinned", () => {
  const { container } = render(<AppNavigation pinned />);
  expect(container.firstChild).toHaveClass("is-pinned");
});
