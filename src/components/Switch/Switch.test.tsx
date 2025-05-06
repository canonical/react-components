import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

import Switch from "./Switch";

describe("<Switch />", () => {
  // snapshot tests
  it("renders and matches the snapshot", () => {
    const { container } = render(<Switch label="Switch" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders and matches the snapshot with disabled", () => {
    const { container } = render(<Switch label="Disabled switch" disabled />);

    expect(container.firstChild).toMatchSnapshot();
  });

  // unit tests
  it("renders a switch with a label", () => {
    const { container } = render(<Switch label="Switch" />);

    expect(container.querySelector("label.p-switch")).toBeInTheDocument();
  });

  it("renders a disabled switch", () => {
    const { container } = render(<Switch label="Disabled switch" disabled />);

    expect(container.querySelector("input.p-switch__input")).toHaveAttribute(
      "disabled",
    );
  });

  it("renders a switch with help text", () => {
    render(
      <Switch label="Switch with help text" help="This is some help text" />,
    );

    expect(screen.getByText("This is some help text")).toBeInTheDocument();
  });
});
