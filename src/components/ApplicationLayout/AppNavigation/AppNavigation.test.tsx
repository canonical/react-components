import { screen } from "@testing-library/react";

import { renderComponent } from "testing/utils";

import AppNavigation from "./AppNavigation";

it("displays children", () => {
  const children = "Test content";
  renderComponent(<AppNavigation>{children}</AppNavigation>);
  expect(screen.getByText(children)).toBeInTheDocument();
});

it("displays as collapsed", () => {
  const { result } = renderComponent(<AppNavigation collapsed />);
  expect(result.container.firstChild).toHaveClass("is-collapsed");
});

it("displays as pinned", () => {
  const { result } = renderComponent(<AppNavigation pinned />);
  expect(result.container.firstChild).toHaveClass("is-pinned");
});
