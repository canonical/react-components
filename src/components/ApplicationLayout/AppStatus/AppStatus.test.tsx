import { screen } from "@testing-library/react";

import { renderComponent } from "testing/utils";

import AppStatus from "./AppStatus";

it("displays children", () => {
  const children = "Test content";
  renderComponent(<AppStatus>{children}</AppStatus>);
  expect(screen.getByText(children)).toBeInTheDocument();
});
