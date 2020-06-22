import { shallow, mount } from "enzyme";
import React from "react";

import Chip from "./Chip";

describe("Chip ", () => {
  it("renders", () => {
    const wrapper = shallow(<Chip value="positive" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("displays the value", () => {
    const wrapper = mount(<Chip value="positive" />);
    expect(wrapper.find(".p-chip").text()).toBe("positive");
  });
});