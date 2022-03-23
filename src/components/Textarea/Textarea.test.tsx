import { render, screen } from "@testing-library/react";
import { mount, shallow } from "enzyme";
import React from "react";

import Textarea from "./Textarea";

describe("Textarea ", () => {
  it("renders", () => {
    const wrapper = shallow(<Textarea id="test-id" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<Textarea className="extra-class" />);
    const className = wrapper.find("textarea").prop("className");
    expect(className.includes("p-form-validation__input")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });

  it("can take focus on first render", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const wrapper = mount(<Textarea takeFocus />, { attachTo: container });
    expect(wrapper.find("textarea").getDOMNode()).toBe(document.activeElement);
    document.body.removeChild(container);
  });

  it("can accept input attributes", () => {
    const wrapper = shallow(<Textarea autoComplete="on" />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe("Textarea RTL", () => {
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
