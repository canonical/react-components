import { shallow } from "enzyme";
import React from "react";

import Code from "./Code";

describe("Code ", () => {
  it("can render", () => {
    const wrapper = shallow(<Code>Test content</Code>);
    expect(wrapper).toMatchSnapshot();
  });

  it("can render inline", () => {
    const wrapper = shallow(<Code inline>Test content</Code>);
    expect(wrapper).toMatchSnapshot();
  });

  it("can render as copyable", () => {
    const wrapper = shallow(<Code copyable>Test content</Code>);
    expect(wrapper).toMatchSnapshot();
  });

  it("can render with line numbers", () => {
    const wrapper = shallow(<Code numbered>Test content</Code>);
    expect(wrapper).toMatchSnapshot();
  });
});
