import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import Button from "./Button";
import userEvent from "@testing-library/user-event";

describe("Button ", () => {
  it("renders", () => {
    render(<Button>Test content</Button>);
    expect(screen.getByRole("button")).toMatchSnapshot();
  });

  it("renders as a link", () => {
    render(
      <Button element="a" href="">
        Test content
      </Button>
    );
    expect(screen.getByRole("link")).toMatchSnapshot();
  });

  it("can handle button click events", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("can handle anchor click events", async () => {
    const onClick = jest.fn();
    render(<Button element="a" href="" onClick={onClick} />);
    await userEvent.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalled();
  });

  it("correctly disables a button", async () => {
    const onClick = jest.fn();
    render(<Button disabled={true} onClick={onClick} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).not.toHaveAttribute("aria-disabled");
    expect(button).not.toHaveClass("is-disabled");
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not prevent default when disabling a button", async () => {
    render(<Button disabled={true} onClick={jest.fn()} />);
    const button = screen.getByRole("button");
    const clickEvent = createEvent.click(button);
    fireEvent(button, clickEvent);
    expect(clickEvent.defaultPrevented).toBe(false);
  });

  it("correctly disables a link", async () => {
    const onClick = jest.fn();
    render(<Button element="a" disabled={true} href="" onClick={onClick} />);
    const button = screen.getByRole("link");
    expect(button).toHaveClass("is-disabled");
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled");
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("prevents default when disabling a link", async () => {
    const onClick = jest.fn();
    render(<Button element="a" disabled={true} href="" onClick={onClick} />);
    const button = screen.getByRole("link");
    const clickEvent = createEvent.click(button);
    fireEvent(button, clickEvent);
    expect(clickEvent.defaultPrevented).toBe(true);
  });

  it("correctly handle icons", () => {
    render(<Button hasIcon={true} />);
    expect(screen.getByRole("button")).toHaveClass("has-icon");
  });

  it("can be inline", () => {
    render(<Button inline={true} />);
    expect(screen.getByRole("button")).toHaveClass("is-inline");
  });

  it("can be dense", () => {
    render(<Button dense />);
    expect(screen.getByRole("button")).toHaveClass("is-dense");
  });

  it("can be small", () => {
    render(<Button small />);
    expect(screen.getByRole("button")).toHaveClass("is-small");
  });

  it("can add additional classes", () => {
    render(<Button className="extra-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("p-button");
    expect(button).toHaveClass("extra-class");
  });

  it("puts additional classes at the end", () => {
    render(<Button className="extra-class" dense />);
    expect(screen.getByRole("button").className).toEqual(
      "p-button is-dense extra-class"
    );
  });

  it("handles base button props", async () => {
    render(<Button type="button" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("handles alternate element props", async () => {
    render(<Button element="a" href="http://example.com" />);
    const button = screen.getByRole("link");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "http://example.com");
  });

  it("handles supplied component props", () => {
    type LinkProps = {
      /** An address */
      to: string;
      children: React.ReactNode;
    };
    const Link = ({ children, to }: LinkProps) => <a href={to}>{children}</a>;
    render(<Button element={Link} to="http://example.com" />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "http://example.com"
    );
  });
});
