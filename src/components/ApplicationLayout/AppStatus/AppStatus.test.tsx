import React from "react";
import { render, screen } from "@testing-library/react";

import AppStatus from "./AppStatus";

it("displays children", () => {
  const children = "Test content";
  render(<AppStatus>{children}</AppStatus>);
  expect(screen.getByText(children)).toBeInTheDocument();
});
