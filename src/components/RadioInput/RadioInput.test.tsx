import { render, screen } from "@testing-library/react";
import React from "react";

import RadioInput from "./RadioInput";

it("renders a radio input", () => {
  render(<RadioInput label="Test radio" name="Radio test"></RadioInput>);
  expect(screen.getByRole("radio", { name: "Test radio" })).toBeInTheDocument();
});
