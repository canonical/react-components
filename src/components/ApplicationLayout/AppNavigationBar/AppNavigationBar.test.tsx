import { screen } from "@testing-library/react";

import { renderComponent } from "testing/utils";

import AppNavigationBar from "./AppNavigationBar";

it("displays children", () => {
  const children = "Test content";
  renderComponent(<AppNavigationBar>{children}</AppNavigationBar>);
  expect(screen.getByText(children)).toBeInTheDocument();
});
