import { screen } from "@testing-library/react";

import { renderComponent } from "testing/utils";

import Application from "./Application";

it("displays children", () => {
  const children = "Test content";
  renderComponent(<Application>{children}</Application>);
  expect(screen.getByText(children)).toBeInTheDocument();
});
