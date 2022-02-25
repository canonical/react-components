import { mount, shallow } from "enzyme";
import React from "react";

import CheckableInput from "./CheckableInput";

describe("CheckableInput ", () => {
  it("renders a checkable input", () => {
    const wrapper = shallow(
      <CheckableInput inputType="checkbox" label="Test label"></CheckableInput>
    );
    expect(wrapper.find("input.p-checkbox__input").length).toBe(1);
  });

  it("can disable an input", () => {
    const wrapper = shallow(
      <CheckableInput
        inputType="checkbox"
        label="Test disabled"
        disabled
      ></CheckableInput>
    );
    expect(wrapper.find("input[disabled]").length).toBe(1);
  });

  it("can apply the is-required class", () => {
    const wrapper = shallow(
      <CheckableInput
        inputType="radio"
        label="Test required"
        required
      ></CheckableInput>
    );
    expect(wrapper.find(".p-radio.is-required").length).toBe(1);
  });

  it("can apply the --inline modifier class", () => {
    const wrapper = shallow(
      <CheckableInput
        inputType="radio"
        label="Test required"
        inline
      ></CheckableInput>
    );
    expect(wrapper.find(".p-radio--inline").length).toBe(1);
  });

  it("can set a checkbox to indeterminate state", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const wrapper = mount(
      <CheckableInput
        inputType="checkbox"
        label="Test label"
        indeterminate
      ></CheckableInput>,
      { attachTo: container }
    );
    expect(wrapper.find("input").getDOMNode().indeterminate).toBe(true);
  });

  it("can set a label class name", () => {
    const wrapper = mount(
      <CheckableInput
        inputType="checkbox"
        label="Test label"
        labelClassName="label-class-name"
      />
    );
    expect(
      wrapper.find("label").prop("className").includes("label-class-name")
    ).toBe(true);
  });
});
