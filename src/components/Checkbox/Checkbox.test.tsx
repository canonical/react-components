import { shallow } from "enzyme";
import React from "react";

import Checkbox from "./Checkbox";

describe("Checkbox ", () => {
  it("renders a checkbox", () => {
    const wrapper = shallow(<Checkbox label="Test checkbox"></Checkbox>);
    expect(wrapper).toMatchSnapshot();
  });
});
