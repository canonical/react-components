import { shallow } from "enzyme";
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
    expect(wrapper.prop("labelFirst")).toBe(false);
  });

  it("moves the label for checkboxes", () => {
    const wrapper = shallow(<Input type="checkbox" />);
    expect(wrapper.prop("labelFirst")).toBe(false);
  });
});
