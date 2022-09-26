import { render, screen } from "@testing-library/react";
import React from "react";

import Textarea from "./Textarea";

describe("Textarea ", () => {
  it("renders", () => {
    const { container } = render(
      <Textarea id="test-id" wrapperClassName="textarea" />
    );
    // Get the wrapping element.
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.firstChild).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    render(<Textarea className="extra-class" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("p-form-validation__input");
    expect(textarea).toHaveClass("extra-class");
  });

  it("can take focus on first render", () => {
    render(<Textarea takeFocus />);
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("can accept input attributes", () => {
    render(<Textarea autoComplete="on" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("autocomplete", "on");
  });

  it("can display an error for a text input", async () => {
    render(<Textarea error="Uh oh!" />);
    expect(screen.getByRole("textbox")).toHaveErrorMessage("Error: Uh oh!");
  });

  it("can display help for a text input", async () => {
    const help = "Save me!";
    render(<Textarea help={help} />);
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription(help);
  });
});
