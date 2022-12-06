import { render, screen } from "@testing-library/react";
import { mount, shallow } from "enzyme";
import React from "react";

import Input from "./Input";

describe("Input", () => {
  it("moves the label for radio buttons", () => {
    const wrapper = shallow(<Input type="radio" />);
    expect(wrapper.prop("label")).toBe("");
  });

  it("moves the label for checkboxes", () => {
    const wrapper = shallow(<Input type="checkbox" />);
    expect(wrapper.prop("label")).toBe("");
  });

  it("can take focus on first render", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const wrapper = mount(<Input takeFocus />, { attachTo: container });
    expect(wrapper.find("input").getDOMNode()).toBe(document.activeElement);
    document.body.removeChild(container);
  });

  it("can take focus with delay", async () => {
    render(<Input takeFocus takeFocusDelay={10} />);
    expect(screen.getByRole("textbox")).not.toBe(document.activeElement);
    await new Promise((r) => setTimeout(r, 10));
    expect(screen.getByRole("textbox")).toBe(document.activeElement);
  });

  it("sets aria-invalid to false when there is no error", () => {
    const wrapper = mount(<Input type="text" />);
    expect(wrapper.find("input").prop("aria-invalid")).toBe(false);
  });

  it("sets aria-invalid to true when there is an error", () => {
    const wrapper = mount(<Input type="text" error="Incorrect value" />);
    expect(wrapper.find("input").prop("aria-invalid")).toBe(true);
  });

  it("sets required field on input", () => {
    const wrapper = mount(<Input type="text" required />);
    expect(wrapper.find("input").prop("required")).toBe(true);
  });

  it("can set required for a radiobutton", () => {
    const wrapper = mount(<Input type="radio" required />);
    expect(wrapper.find("input").prop("required")).toBe(true);
  });

  it("can set required for a checkbox", () => {
    const wrapper = mount(<Input type="checkbox" required />);
    expect(wrapper.find("input").prop("required")).toBe(true);
  });

  it("can set a label class name for a radiobutton", () => {
    const wrapper = mount(
      <Input type="radio" labelClassName="label-class-name" />
    );
    expect(
      wrapper.find("label").prop("className").includes("label-class-name")
    ).toBe(true);
  });

  it("can set a label class name for a checkbox", () => {
    const wrapper = mount(
      <Input type="checkbox" labelClassName="label-class-name" />
    );
    expect(
      wrapper.find("label").prop("className").includes("label-class-name")
    ).toBe(true);
  });
});

describe("Input RTL", () => {
  it("renders", () => {
    const { container } = render(<Input type="text" id="test-id" />);
    expect(container).toMatchSnapshot();
  });

  it("can display an error for a text input", async () => {
    render(<Input error="Uh oh!" type="text" />);
    expect(screen.getByRole("textbox")).toHaveErrorMessage("Error: Uh oh!");
  });

  it("can display an error for a radiobutton", async () => {
    render(<Input error="Uh oh!" type="radio" />);
    expect(screen.getByRole("radio")).toHaveErrorMessage("Error: Uh oh!");
  });

  it("can display an error for a checkbox", async () => {
    render(<Input error="Uh oh!" type="checkbox" />);
    expect(screen.getByRole("checkbox")).toHaveErrorMessage("Error: Uh oh!");
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
