import { screen } from "@testing-library/react";

import { renderComponent } from "testing/utils";

import AppMain from "./AppMain";

it("displays children", () => {
  const children = "Test content";
  renderComponent(<AppMain>{children}</AppMain>);
  expect(screen.getByText(children)).toBeInTheDocument();
});
