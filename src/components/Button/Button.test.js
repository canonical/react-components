import { shallow } from "enzyme";
import React from "react";

import Button from "./Button";

describe("Button ", () => {
  it("renders", () => {
    const wrapper = shallow(<Button>Test content</Button>);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders as a link", () => {
    const wrapper = shallow(<Button element="a">Test content</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it("correctly disables a button", () => {
    const wrapper = shallow(<Button disabled={true} />);
    expect(wrapper.prop("disabled")).toBe(true);
    expect(wrapper.prop("className").includes("is-disabled")).toBe(false);
    expect(wrapper.prop("aria-disabled")).toBe(undefined);
  });

  it("correctly disables a link", () => {
    const wrapper = shallow(<Button element="a" disabled={true} />);
    expect(wrapper.prop("className").includes("is-disabled")).toBe(true);
    expect(wrapper.prop("aria-disabled")).toBe(true);
    expect(wrapper.prop("disabled")).toBe(undefined);
  });

  it("correctly handle icons", () => {
    const wrapper = shallow(<Button hasIcon={true} />);
    expect(wrapper.prop("className").includes("has-icon")).toBe(true);
  });

  it("can be inline", () => {
    const wrapper = shallow(<Button inline={true} />);
    expect(wrapper.prop("className").includes("is-inline")).toBe(true);
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<Button className="extra-class" />);
    const className = wrapper.prop("className");
    expect(className.includes("p-button--neutral")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
