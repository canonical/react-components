import { render, screen } from "@testing-library/react";
import React from "react";

import Label from "./Label";

describe("Label ", () => {
  it("renders", () => {
    render(
      <Label forId="test-id" data-testid="label">
        Test content
      </Label>
    );
    expect(screen.getByTestId("label")).toMatchSnapshot();
  });

  it("can be required", () => {
    render(<Label required={true} data-testid="label" />);
    expect(screen.getByTestId("label")).toHaveClass("is-required");
  });

  it("can add additional classes", () => {
    render(<Label className="extra-class" data-testid="label" />);
    const label = screen.getByTestId("label");
    expect(label).toHaveClass("p-form__label");
    expect(label).toHaveClass("extra-class");
  });
});
