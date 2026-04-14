import React from "react";
import { render, screen } from "@testing-library/react";

import OutputField from "./OutputField";

it("renders an OutputField", () => {
  render(
    <OutputField
      label="Label"
      id="output-field"
      value="Output value"
      help="Help text"
      required
    />,
  );
  expect(screen.getByRole("status", { name: "Label" })).toBeInTheDocument();
});
