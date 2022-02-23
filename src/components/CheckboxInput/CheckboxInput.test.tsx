import { render, screen } from "@testing-library/react";
import React from "react";

import CheckboxInput from "./CheckboxInput";

it("renders a checkbox", () => {
  render(<CheckboxInput label="Test checkbox"></CheckboxInput>);
  expect(
    screen.getByRole("checkbox", { name: "Test checkbox" })
  ).toBeInTheDocument();
});
