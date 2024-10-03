import React from "react";
import { render, screen } from "@testing-library/react";
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
