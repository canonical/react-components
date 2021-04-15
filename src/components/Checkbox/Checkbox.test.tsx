import { mount, shallow } from "enzyme";
import React from "react";

import Checkbox from "./Checkbox";

describe("Checkbox ", () => {
  it("renders a checkbox", () => {
    const wrapper = shallow(<Checkbox label="Test checkbox"></Checkbox>);
    expect(wrapper).toMatchSnapshot();
  });

  it("can set a checkbox to indeterminate state", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const wrapper = mount(
      <Checkbox label="Test indeterminate" indeterminate></Checkbox>,
      { attachTo: container }
    );
    expect(wrapper.find("input").getDOMNode().indeterminate).toBe(true);
  });
});
