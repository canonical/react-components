import React from "react";
import { render, screen } from "@testing-library/react";

import Application from "./Application";

it("displays children", () => {
  const children = "Test content";
  render(<Application>{children}</Application>);
  expect(screen.getByText(children)).toBeInTheDocument();
});
