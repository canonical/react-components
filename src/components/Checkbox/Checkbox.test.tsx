import { mount } from "enzyme";
import React from "react";

import Checkbox from "./Checkbox";

describe("Checkbox ", () => {
  it("renders a checkbox", () => {
    const wrapper = mount(<Checkbox label="Test checkbox"></Checkbox>);
    expect(wrapper.find("input.p-checkbox__input").length).toBe(1);
  });
});
