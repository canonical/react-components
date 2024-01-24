import { screen } from "@testing-library/react";

import { renderComponent } from "testing/utils";

import SideNavigationText from "./SideNavigationText";

it("displays text", () => {
  const label = "Test content";
  renderComponent(<SideNavigationText>{label}</SideNavigationText>);
  expect(screen.getByText(label)).toBeInTheDocument();
});
