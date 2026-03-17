import React from "react";
import { render, screen } from "@testing-library/react";
import PrefixedInput, { PrefixedInputProps } from "./PrefixedInput";

jest.mock("../Input", () => {
  return function MockInput({
    label,
    error,
    help,
    ...props
  }: PrefixedInputProps) {
    return (
      <div data-testid="input-wrapper">
        <input data-testid="mock-input" {...props} />
        {!label && !error && !help && <span data-testid="input-is-headless" />}
      </div>
    );
  };
});

jest.mock("../Field", () => {
  return function MockField({
    children,
    label,
    error,
    help,
    required,
  }: PrefixedInputProps) {
    return (
      <div data-testid="mock-field" className={error ? "is-error" : ""}>
        {label && (
          <label>
            {label}
            {required && "*"}
          </label>
        )}
        {children}
        {help && <div data-testid="field-help">{help}</div>}
        {error && <div data-testid="field-error">{error}</div>}
      </div>
    );
  };
});

describe("PrefixedInput", () => {
  it("renders the immutable text", () => {
    render(<PrefixedInput immutableText="https://" />);
    expect(screen.getByText("https://")).toBeInTheDocument();
  });

  it("applies the prefix and input within a flex container", () => {
    const { container } = render(<PrefixedInput immutableText="prefix" />);
    const flexContainer = container.querySelector(
      ".p-prefixed-input__flex-container",
    );
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toContainElement(screen.getByText("prefix"));
    expect(flexContainer).toContainElement(screen.getByTestId("mock-input"));
  });

  it("passes label and required props to the Field wrapper", () => {
    render(<PrefixedInput immutableText="prefix" label="Website" required />);
    expect(screen.getByText(/Website/)).toBeInTheDocument();
    expect(screen.getByText(/\*/)).toBeInTheDocument();
  });

  it("strips label/error/help from the inner Input to avoid duplication", () => {
    render(
      <PrefixedInput
        immutableText="prefix"
        label="Label"
        error="Error"
        help="Help"
      />,
    );
    expect(screen.getByTestId("input-is-headless")).toBeInTheDocument();
  });

  it("applies the error class to the flex container for visual styling", () => {
    const { container } = render(
      <PrefixedInput immutableText="prefix" error="Invalid URL" />,
    );
    const flexContainer = container.querySelector(
      ".p-prefixed-input__flex-container",
    );
    expect(flexContainer).toHaveClass("is-error");
  });

  it("applies the disabled class and passes disabled prop", () => {
    const { container } = render(
      <PrefixedInput immutableText="prefix" disabled />,
    );
    const flexContainer = container.querySelector(
      ".p-prefixed-input__flex-container",
    );
    const input = screen.getByTestId("mock-input");

    expect(flexContainer).toHaveClass("is-disabled");
    expect(input).toBeDisabled();
  });

  it("passes additional input props like placeholder", () => {
    render(<PrefixedInput immutableText="prefix" placeholder="example.com" />);
    expect(screen.getByPlaceholderText("example.com")).toBeInTheDocument();
  });
});
