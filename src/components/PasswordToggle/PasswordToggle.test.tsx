import { render, screen } from "@testing-library/react";
import React from "react";

import PasswordToggle, { Label } from "./PasswordToggle";
import userEvent from "@testing-library/user-event";

describe("PasswordToggle", () => {
  it("can add additional classes", () => {
    render(
      <PasswordToggle label="password" id="test-id" className="extra-class" />
    );
    expect(screen.getByLabelText("password")).toHaveClass(
      "p-form-validation__input"
    );
    expect(screen.getByLabelText("password")).toHaveClass("extra-class");
  });

  it("accepts a ref prop we can use to target the input element directly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<PasswordToggle label="password" id="test-id" ref={ref} />);
    ref.current?.focus();
    expect(screen.getByLabelText("password")).toHaveFocus();
  });

  it("toggles the visibility of the password when the button is clicked", async () => {
    render(<PasswordToggle label="password" id="test-id" />);
    expect(screen.getByLabelText("password")).toHaveAttribute(
      "type",
      "password"
    );
    await userEvent.click(screen.getByRole("button", { name: Label.Show }));
    expect(screen.getByLabelText("password")).toHaveAttribute("type", "text");
  });

  it("implicitly accepts input props", () => {
    render(
      <PasswordToggle
        label="password"
        id="test-id"
        value="My test value"
        onChange={() => null}
      />
    );
    expect(screen.getByLabelText("password")).toHaveAttribute(
      "value",
      "My test value"
    );
  });

  it("can display an error", async () => {
    render(<PasswordToggle error="Uh oh!" id="test-id" label="password" />);
    expect(screen.getByLabelText("password")).toHaveErrorMessage(
      "Error: Uh oh!"
    );
  });

  it("can display help", async () => {
    const help = "Save me!";
    render(<PasswordToggle help={help} id="test-id" label="password" />);
    expect(screen.getByLabelText("password")).toHaveAccessibleDescription(help);
  });
});
