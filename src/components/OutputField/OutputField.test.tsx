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

it("always truncates the value and shows it in a title attribute", () => {
  render(<OutputField label="Label" id="output-field" value="Output value" />);
  const output = screen.getByRole("status", { name: "Label" });
  expect(output).toHaveClass("output-field-truncate");
  expect(output).toHaveAttribute("title", "Output value");
});
