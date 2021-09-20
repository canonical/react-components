import { mount, shallow } from "enzyme";
import React from "react";

import PasswordToggle from "./PasswordToggle";

describe("PasswordToggle ", () => {
  it("renders", () => {
    const wrapper = shallow(<PasswordToggle id="test-id" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    const wrapper = shallow(
      <PasswordToggle id="test-id" className="extra-class" />
    );
    const className = wrapper.find("input").prop("className");
    expect(className.includes("p-form-validation__input")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });

  it("can take focus on first render", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const wrapper = mount(<PasswordToggle id="test-id" takeFocus />, {
      attachTo: container,
    });
    expect(wrapper.find("input").getDOMNode()).toBe(document.activeElement);
  });

  it("toggles the visability of the password whent the button is clicked", () => {
    const wrapper = mount(<PasswordToggle id="test-id" />);
    expect(wrapper.find("input#test-id").prop("type")).toBe("password");
    wrapper.find("button[aria-controls='test-id']").simulate("click");
    expect(wrapper.find("input#test-id").prop("type")).toBe("text");
  });
});
