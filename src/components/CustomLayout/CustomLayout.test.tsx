import React from "react";
import { render, screen } from "@testing-library/react";

import CustomLayout from "./CustomLayout";

it("displays children", () => {
  const children = "Test content";
  render(<CustomLayout>{children}</CustomLayout>);
  expect(screen.getByText(children)).toBeInTheDocument();
});
