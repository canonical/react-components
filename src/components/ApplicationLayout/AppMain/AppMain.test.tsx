import React from "react";
import { render, screen } from "@testing-library/react";

import AppMain from "./AppMain";

it("displays children", () => {
  const children = "Test content";
  render(<AppMain>{children}</AppMain>);
  expect(screen.getByText(children)).toBeInTheDocument();
});
