import React from "react";
import { render, screen } from "@testing-library/react";

import AppNavigationBar from "./AppNavigationBar";

it("displays children", () => {
  const children = "Test content";
  render(<AppNavigationBar>{children}</AppNavigationBar>);
  expect(screen.getByText(children)).toBeInTheDocument();
});
