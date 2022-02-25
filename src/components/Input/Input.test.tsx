import { mount, shallow } from "enzyme";
import React from "react";

import Input from "./Input";

describe("Input ", () => {
  it("renders", () => {
    const wrapper = shallow(<Input type="text" id="test-id" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<Input type="text" className="extra-class" />);
    const className = wrapper.find("input").prop("className");
    expect(className.includes("p-form-validation__input")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });

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
