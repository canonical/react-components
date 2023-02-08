import { render, screen } from "@testing-library/react";
import React from "react";

import CheckableInput from "./CheckableInput";

describe("CheckableInput ", () => {
  it("renders a checkable input", () => {
    render(
      <CheckableInput inputType="checkbox" label="Test label"></CheckableInput>
    );
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("can disable an input", () => {
    render(
      <CheckableInput
        inputType="checkbox"
        label="Test disabled"
        disabled
      ></CheckableInput>
    );
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("can apply the is-required class", () => {
    render(
      <CheckableInput
        inputType="radio"
        label="Test required"
        required
      ></CheckableInput>
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector("label")).toHaveClass("is-required");
  });

  it("can apply the --inline modifier class", () => {
    render(
      <CheckableInput
        inputType="radio"
        label="Test required"
        inline
      ></CheckableInput>
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector("label")).toHaveClass("p-radio--inline");
  });

  it("can set a checkbox to indeterminate state", () => {
    render(
      <CheckableInput
        inputType="checkbox"
        label="Test label"
        indeterminate
      ></CheckableInput>
    );
    expect(screen.getByRole("checkbox")).toBePartiallyChecked();
  });

  it("can set a label class name", () => {
    render(
      <CheckableInput
        inputType="checkbox"
        label="Test label"
        labelClassName="label-class-name"
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector("label")).toHaveClass("label-class-name");
  });
});
