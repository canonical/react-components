import { render, screen } from "@testing-library/react";
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
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(".p-radio__label")
    ).toBeInTheDocument();

    expect(screen.getByRole("radio")).toHaveAccessibleName("text label");
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(".p-form__label")
    ).not.toBeInTheDocument();
  });

  it("moves the label for checkboxes", () => {
    render(<Input type="checkbox" label="text label" />);
    expect(screen.getByRole("checkbox")).toHaveAccessibleName("text label");
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(".p-checkbox__label")
    ).toBeInTheDocument();
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(".p-form__label")
    ).not.toBeInTheDocument();
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
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(".p-radio")
    ).toHaveClass("label-class-name");
  });

  it("can set a label class name for a checkbox", () => {
    render(<Input type="checkbox" labelClassName="label-class-name" />);
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(".p-checkbox")
    ).toHaveClass("label-class-name");
  });

  it("renders", () => {
    const { container } = render(<Input type="text" id="test-id" />);
    expect(container).toMatchSnapshot();
  });

  it("can display an error for a text input", async () => {
    render(<Input error="Uh oh!" type="text" />);
    expect(screen.getByRole("textbox")).toHaveAccessibleErrorMessage(
      "Error: Uh oh!"
    );
  });

  it("can display an error for a radiobutton", async () => {
    render(<Input error="Uh oh!" type="radio" />);
    expect(screen.getByRole("radio")).toHaveAccessibleErrorMessage(
      "Error: Uh oh!"
    );
  });

  it("can display an error for a checkbox", async () => {
    render(<Input error="Uh oh!" type="checkbox" />);
    expect(screen.getByRole("checkbox")).toHaveAccessibleErrorMessage(
      "Error: Uh oh!"
    );
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
    render(<Input help={help} type="checkbox" />);
    expect(screen.getByRole("checkbox")).toHaveAccessibleDescription(help);
  });

  it("can add additional classes", () => {
    const { container } = render(
      <Input
        type="text"
        className="extra-class"
        help="additional description"
        helpClassName="additional-help-text-class"
      />
    );
    expect(screen.getByRole("textbox")).toHaveClass(
      "p-form-validation__input",
      "extra-class"
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector(".p-form-help-text")).toHaveClass(
      "additional-help-text-class"
    );
  });
});
