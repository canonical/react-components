import React from "react";
import { render, screen } from "@testing-library/react";

import SideNavigationText from "./SideNavigationText";

it("displays text", () => {
  const label = "Test content";
  render(<SideNavigationText>{label}</SideNavigationText>);
  expect(screen.getByText(label)).toBeInTheDocument();
});
