import React from "react";
import { render } from "@testing-library/react";

import PrefixedInput, { PrefixedInputProps } from "./PrefixedInput";

// Mock the Input component
jest.mock("components/Input", () => {
  return function MockInput(props: PrefixedInputProps) {
    return <input data-testid="mock-input" type="text" {...props} />;
  };
});

jest.mock("classnames", () =>
  jest.fn((...args) => args.filter(Boolean).join(" ")),
);

describe("PrefixedInput", () => {
  beforeEach(() => {
    // Mock getBoundingClientRect
    HTMLElement.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 50,
      height: 20,
      top: 0,
      left: 0,
      bottom: 20,
      right: 50,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the immutable text", () => {
    const { container } = render(<PrefixedInput immutableText="https://" />);
    expect(container).toContainHTML("https://");
  });

  it("passes extra classes to the input element", () => {
    const { container } = render(
      <PrefixedInput immutableText="prefix" className="extra-class" />,
    );
    expect(container).toContainHTML("extra-class prefixed-input__input");
  });

  it("passes extra classes to the wrapper element", () => {
    const { container } = render(
      <PrefixedInput
        immutableText="prefix"
        wrapperClassName="extra-wrapper-class"
      />,
    );
    expect(container).toContainHTML(
      "extra-wrapper-class prefixed-input__wrapper",
    );
  });

  it("renders with label class when label is provided", () => {
    const { container } = render(
      <PrefixedInput immutableText="prefix" label="Test Label" />,
    );
    expect(container).toContainHTML("prefixed-input--with-label");
  });

  it("renders without label class when label is not provided", () => {
    const { container } = render(<PrefixedInput immutableText="prefix" />);
    expect(container.querySelector(".prefixed-input--with-label")).toBeNull();
  });

  it("updates padding on window resize", () => {
    const { container } = render(<PrefixedInput immutableText="https://" />);
    const input = container.querySelector("input");

    expect(input?.style.paddingLeft).toBe("50px");

    HTMLElement.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 20,
      top: 0,
      left: 0,
      bottom: 20,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    window.dispatchEvent(new Event("resize"));

    expect(input?.style.paddingLeft).toBe("100px");
  });

  it("passes additional props to the Input component", () => {
    const { container } = render(
      <PrefixedInput
        immutableText="prefix"
        placeholder="Enter text"
        disabled
      />,
    );
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("placeholder", "Enter text");
    expect(input).toHaveAttribute("disabled");
  });

  it("sets input type to text", () => {
    const { container } = render(<PrefixedInput immutableText="prefix" />);
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("type", "text");
  });
});
