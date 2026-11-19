import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import Input from "./Input";

describe("Input", () => {
  it("displays the field label for text inputs", () => {
    render(<Input type="text" label="text label" />);
    expect(screen.getByText("text label")).toHaveClass("p-form__label");
    expect(screen.getByRole("textbox")).toHaveAccessibleName("text label");
  });

  it("can display JSX labels for text inputs", () => {
    render(<Input type="text" label={<>text label</>} />);
    expect(screen.getByText("text label")).toHaveClass("p-form__label");
    expect(screen.getByRole("textbox")).toHaveAccessibleName("text label");
  });

  it("moves the label for radio buttons", () => {
    render(<Input type="radio" label="text label" />);
    expect(document.querySelector(".p-radio__label")).toBeInTheDocument();

    expect(screen.getByRole("radio")).toHaveAccessibleName("text label");
    expect(document.querySelector(".p-form__label")).not.toBeInTheDocument();
  });

  it("moves the label for checkboxes", () => {
    render(<Input type="checkbox" label="text label" />);
    expect(screen.getByRole("checkbox")).toHaveAccessibleName("text label");
    expect(document.querySelector(".p-checkbox__label")).toBeInTheDocument();
    expect(document.querySelector(".p-form__label")).not.toBeInTheDocument();
  });

  it("can take focus on first render", () => {
    render(<Input takeFocus />);
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("can take focus with delay", async () => {
    render(<Input takeFocus takeFocusDelay={10} />);
    expect(screen.getByRole("textbox")).not.toBe(document.activeElement);
    await new Promise((r) => setTimeout(r, 10));
    expect(screen.getByRole("textbox")).toBe(document.activeElement);
  });

  it("sets aria-invalid to false when there is no error", () => {
    render(<Input type="text" />);
    expect(screen.getByRole("textbox")).not.toBeInvalid();
  });

  it("sets aria-invalid to true when there is an error", () => {
    render(<Input type="text" error="Incorrect value" />);
    expect(screen.getByRole("textbox")).toBeInvalid();
  });

  it("sets required field on input", () => {
    render(<Input type="text" required />);
    expect(screen.getByRole("textbox")).toBeRequired();
  });

  it("keeps read-only inputs focusable without allowing edits", async () => {
    const user = userEvent.setup();
    render(
      <Input
        type="text"
        label="Email address"
        defaultValue="example@canonical.com"
        readOnly
      />,
    );
    const input = screen.getByRole("textbox", { name: "Email address" });

    expect(input).toHaveAttribute("readonly");
    expect(input).toBeEnabled();

    await user.tab();
    expect(input).toHaveFocus();

    await user.keyboard("changed");
    expect(input).toHaveValue("example@canonical.com");
  });

  it("adds a decorative icon after a read-only JSX label", async () => {
    const user = userEvent.setup();
    render(<Input label={<span>Email address</span>} readOnly />);
    const label = screen.getByText("Email address").closest("label");

    expect(label.lastElementChild).toHaveClass("p-icon--read-only");
    expect(label.lastElementChild).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("textbox")).toHaveAccessibleName("Email address");

    await user.click(label);
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("updates the icon when readOnly changes", () => {
    const { rerender } = render(<Input label="Email address" />);
    const label = screen.getByText("Email address");

    expect(label.querySelector(".p-icon--read-only")).not.toBeInTheDocument();

    rerender(<Input label="Email address" readOnly />);
    expect(label.querySelector(".p-icon--read-only")).toBeInTheDocument();

    rerender(<Input label="Email address" readOnly={false} />);
    expect(label.querySelector(".p-icon--read-only")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).not.toHaveAttribute("readonly");
  });

  it("does not add an icon without a label", () => {
    const { container } = render(<Input readOnly />);

    expect(container.querySelector("label")).not.toBeInTheDocument();
    expect(
      container.querySelector(".p-icon--read-only"),
    ).not.toBeInTheDocument();
  });

  it.each(["checkbox", "radio"])(
    "does not add a read-only icon to %s labels",
    (type) => {
      const { container } = render(
        <Input type={type} label="Option" readOnly />,
      );

      expect(
        container.querySelector(".p-icon--read-only"),
      ).not.toBeInTheDocument();
    },
  );

  it("can set required for a radiobutton", () => {
    render(<Input type="radio" required />);
    expect(screen.getByRole("radio")).toBeRequired();
  });

  it("can set required for a checkbox", () => {
    render(<Input type="checkbox" required />);
    expect(screen.getByRole("checkbox")).toBeRequired();
  });

  it("can set a label class name for a radiobutton", () => {
    render(<Input type="radio" labelClassName="label-class-name" />);
    expect(document.querySelector(".p-radio")).toHaveClass("label-class-name");
  });

  it("can set a label class name for a checkbox", () => {
    render(<Input type="checkbox" labelClassName="label-class-name" />);
    expect(document.querySelector(".p-checkbox")).toHaveClass(
      "label-class-name",
    );
  });

  it("renders", () => {
    const { container } = render(<Input type="text" id="test-id" />);
    expect(container).toMatchSnapshot();
  });

  it("can display an error for a text input", async () => {
    render(<Input error="Uh oh!" type="text" />);
    expect(screen.getByRole("textbox")).toHaveAccessibleErrorMessage("Uh oh!");
  });

  it("can display an error for a radiobutton", async () => {
    render(<Input error="Uh oh!" type="radio" />);
    expect(screen.getByRole("radio")).toHaveAccessibleErrorMessage("Uh oh!");
  });

  it("can display an error for a checkbox", async () => {
    render(<Input error="Uh oh!" type="checkbox" />);
    expect(screen.getByRole("checkbox")).toHaveAccessibleErrorMessage("Uh oh!");
  });

  it("can display help for a text input", async () => {
    const help = "Save me!";
    render(<Input help={help} type="text" />);
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription(help);
  });

  it("can display help for a radiobutton", async () => {
    const help = "Save me!";
    render(<Input help={help} type="radio" />);
    expect(screen.getByRole("radio")).toHaveAccessibleDescription(help);
  });

  it("can display help for a checkbox", async () => {
    const help = "Save me!";
    const { container } = render(<Input help={help} type="checkbox" />);
    expect(screen.getByRole("checkbox")).toHaveAccessibleDescription(help);
    expect(container.querySelector(".p-form-help-text")).not.toHaveClass(
      "undefined",
    );
  });

  it("can add additional classes", () => {
    const { container } = render(
      <Input
        type="text"
        className="extra-class"
        help="additional description"
        helpClassName="additional-help-text-class"
      />,
    );
    expect(screen.getByRole("textbox")).toHaveClass(
      "p-form-validation__input",
      "extra-class",
    );
    expect(container.querySelector(".p-form-help-text")).toHaveClass(
      "additional-help-text-class",
    );
  });
});
