import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import PrefixedIpInput, { PrefixedIpInputProps } from "./PrefixedIpInput";

jest.mock("classnames", () =>
  jest.fn((...args) => args.filter(Boolean).join(" ")),
);

// Mock the wrapper component
const PrefixedIpInputWrapper = (props: PrefixedIpInputProps) => {
  const [ip, setIp] = React.useState(props.ip);

  const handleIpChange = (newIp: string) => {
    setIp(newIp);
    props.onIpChange?.(newIp);
  };

  return <PrefixedIpInput {...props} ip={ip} onIpChange={handleIpChange} />;
};

describe("PrefixedIpInput", () => {
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

  it("renders the immutable IPv4 prefix", () => {
    const { container } = render(
      <PrefixedIpInput
        cidr="192.168.1.0/24"
        ip="192.168.1.100"
        name="ip"
        onIpChange={jest.fn()}
      />,
    );
    expect(container).toContainHTML("192.168.1.");
  });

  it("renders the immutable IPv6 prefix", () => {
    const { container } = render(
      <PrefixedIpInput
        cidr="2001:db8::/32"
        ip="2001:db8::1"
        name="ip"
        onIpChange={jest.fn()}
      />,
    );
    expect(container).toContainHTML("2001:db8:");
  });

  it("displays the editable portion of IPv4 address", () => {
    const { container } = render(
      <PrefixedIpInput
        cidr="192.168.1.0/24"
        ip="192.168.1.100"
        name="ip"
        onIpChange={jest.fn()}
      />,
    );
    const input = container.querySelector("input");
    expect(input).toHaveValue("100");
  });

  it("displays the editable portion of IPv6 address", () => {
    const { container } = render(
      <PrefixedIpInput
        cidr="2001:db8::/32"
        ip="2001:db8::1"
        name="ip"
        onIpChange={jest.fn()}
      />,
    );
    const input = container.querySelector("input");
    expect(input).toHaveValue(":1");
  });

  it("renders default help text for IPv4", () => {
    const { container } = render(
      <PrefixedIpInput
        cidr="192.168.1.0/24"
        ip="192.168.1.100"
        name="ip"
        onIpChange={jest.fn()}
      />,
    );
    expect(container).toContainHTML("The available range in this subnet is");
  });

  it("renders default help text for IPv6", () => {
    const { container } = render(
      <PrefixedIpInput
        cidr="2001:db8::/32"
        ip="2001:db8::1"
        name="ip"
        onIpChange={jest.fn()}
      />,
    );
    expect(container).toContainHTML("The available IPV6 address range is");
  });

  it("renders custom help text when provided", () => {
    const { container } = render(
      <PrefixedIpInput
        cidr="192.168.1.0/24"
        ip="192.168.1.100"
        name="ip"
        onIpChange={jest.fn()}
        help="Custom help text"
      />,
    );
    expect(container).toContainHTML("Custom help text");
  });

  it("calls onIpChange with full IPv4 address on input change", async () => {
    const onIpChange = jest.fn();
    const { container } = render(
      <PrefixedIpInputWrapper
        cidr="192.168.1.0/24"
        ip=""
        name="ip"
        onIpChange={onIpChange}
      />,
    );
    const input = container.querySelector("input") as HTMLInputElement;

    await userEvent.type(input, "200");

    expect(onIpChange).toHaveBeenLastCalledWith("192.168.1.200");
  });

  it("calls onIpChange with full IPv6 address on input change", async () => {
    const onIpChange = jest.fn();
    const { container } = render(
      <PrefixedIpInputWrapper
        cidr="2001:db8::/32"
        ip=""
        name="ip"
        onIpChange={onIpChange}
      />,
    );
    const input = container.querySelector("input") as HTMLInputElement;

    await userEvent.type(input, ":2");

    expect(onIpChange).toHaveBeenLastCalledWith("2001:db8::2");
  });

  it("handles paste event for IPv4 address", async () => {
    const onIpChange = jest.fn();
    const { container } = render(
      <PrefixedIpInput
        cidr="192.168.1.0/24"
        ip=""
        name="ip"
        onIpChange={onIpChange}
      />,
    );
    const input = container.querySelector("input") as HTMLInputElement;

    await userEvent.click(input);
    await userEvent.paste("192.168.1.150");

    expect(onIpChange).toHaveBeenLastCalledWith("192.168.1.150");
  });

  it("handles paste event for IPv6 address", async () => {
    const onIpChange = jest.fn();
    const { container } = render(
      <PrefixedIpInput
        cidr="2001:db8::/32"
        ip=""
        name="ip"
        onIpChange={onIpChange}
      />,
    );
    const input = container.querySelector("input") as HTMLInputElement;

    await userEvent.click(input);
    await userEvent.paste("2001:db8::5");

    expect(onIpChange).toHaveBeenCalledWith("2001:db8::5");
  });

  it("sets correct maxLength for IPv4 input", () => {
    const { container } = render(
      <PrefixedIpInput
        cidr="192.168.1.0/24"
        ip="192.168.1.100"
        name="ip"
        onIpChange={jest.fn()}
      />,
    );
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("maxLength", "3");
  });

  it("displays placeholder when not disabled", () => {
    const { container } = render(
      <PrefixedIpInput
        cidr="192.168.1.0/24"
        ip=""
        name="ip"
        onIpChange={jest.fn()}
      />,
    );
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("placeholder");
    expect(input?.getAttribute("placeholder")).not.toBe("");
  });

  it("hides placeholder when disabled", () => {
    const { container } = render(
      <PrefixedIpInput
        cidr="192.168.1.0/24"
        ip=""
        name="ip"
        onIpChange={jest.fn()}
        disabled
      />,
    );
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("placeholder", "");
  });

  it("passes extra classes to the input component", () => {
    const { container } = render(
      <PrefixedIpInput
        cidr="192.168.1.0/24"
        ip="192.168.1.100"
        name="ip"
        onIpChange={jest.fn()}
        className="extra-class"
      />,
    );
    const input = container.querySelector("input");
    expect(input).toHaveClass("extra-class");
  });

  it("passes name attribute to input", () => {
    const { container } = render(
      <PrefixedIpInput
        cidr="192.168.1.0/24"
        ip="192.168.1.100"
        name="test-ip"
        onIpChange={jest.fn()}
      />,
    );
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("name", "test-ip");
  });

  it("calls onIpChange with empty string when input is cleared", async () => {
    const onIpChange = jest.fn();
    const { container } = render(
      <PrefixedIpInput
        cidr="192.168.1.0/24"
        ip="192.168.1.100"
        name="ip"
        onIpChange={onIpChange}
      />,
    );
    const input = container.querySelector("input") as HTMLInputElement;

    await userEvent.clear(input);

    expect(onIpChange).toHaveBeenCalledWith("");
  });
});
