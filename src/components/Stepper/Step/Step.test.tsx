import React from "react";
import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step from "./Step";
import type { Props } from "./Step";

describe("Step component", () => {
  const props: Props = {
    hasProgressLine: true,
    index: 1,
    title: "Title",
    enabled: true,
    iconName: "number",
    handleClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the step with the required props", () => {
    render(<Step {...props} />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(document.querySelector(".progress-line")).toBeInTheDocument();
  });

  it("can display an icon", () => {
    render(<Step {...props} iconName="success" />);
    expect(document.querySelector(".p-icon--success")).toBeInTheDocument();
  });

  it("can remove the progress line", () => {
    render(<Step {...props} hasProgressLine={false} />);
    expect(document.querySelector(".progress-line")).toBeNull();
  });

  it("can disable the step", () => {
    render(<Step {...props} enabled={false} />);
    expect(screen.getByText("Title")).toHaveClass("step-disabled");
  });

  it("can select the step", () => {
    render(<Step {...props} selected={true} />);
    expect(document.querySelector(".step-selected")).toBeInTheDocument();
  });

  it("can call handleClick when clicked", async () => {
    render(<Step {...props} />);
    await userEvent.click(screen.getByText("Title"));
    expect(props.handleClick).toHaveBeenCalled();
  });

  it("exposes the title as a button role", () => {
    render(<Step {...props} />);
    expect(screen.getByRole("button", { name: "Title" })).toBeInTheDocument();
  });

  it("is keyboard focusable and not aria-disabled when enabled", () => {
    render(<Step {...props} />);
    const title = screen.getByText("Title");
    expect(title).toHaveAttribute("tabindex", "0");
    expect(title).toHaveAttribute("aria-disabled", "false");
  });

  it("calls handleClick when Enter is pressed and enabled", async () => {
    render(<Step {...props} />);
    screen.getByText("Title").focus();
    await userEvent.keyboard("{Enter}");
    expect(props.handleClick).toHaveBeenCalled();
  });

  it("calls handleClick and prevents default when Space is pressed and enabled", () => {
    render(<Step {...props} />);
    const title = screen.getByText("Title");
    const event = createEvent.keyDown(title, { key: " " });
    fireEvent(title, event);
    expect(props.handleClick).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
  });

  it("is not focusable and is aria-disabled when disabled", () => {
    render(<Step {...props} enabled={false} />);
    const title = screen.getByText("Title");
    expect(title).toHaveAttribute("tabindex", "-1");
    expect(title).toHaveAttribute("aria-disabled", "true");
  });

  it("does not call handleClick on keyboard activation when disabled", () => {
    render(<Step {...props} enabled={false} />);
    const title = screen.getByText("Title");
    fireEvent.keyDown(title, { key: "Enter" });
    fireEvent.keyDown(title, { key: " " });
    expect(props.handleClick).not.toHaveBeenCalled();
  });

  it("does not call handleClick when clicked while disabled", async () => {
    render(<Step {...props} enabled={false} />);
    await userEvent.click(screen.getByText("Title"));
    expect(props.handleClick).not.toHaveBeenCalled();
  });

  it("can display optional label", () => {
    render(<Step {...props} label="Optional label" />);

    expect(screen.getByText("Optional label")).toBeInTheDocument();
  });

  it("can display optional link", () => {
    const linkProps = {
      href: "/test-link",
      children: "Link",
    };
    render(<Step {...props} linkProps={linkProps} />);
    const linkElement = screen.getByRole("link", { name: "Link" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/test-link");
  });
});
