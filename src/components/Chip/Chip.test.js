import { shallow, mount } from "enzyme";
import React from "react";

import Chip from "./Chip";

describe("Chip ", () => {
  it("renders default chip", () => {
    const wrapper = shallow(<Chip value="positive" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders lead-value chip", () => {
    const wrapper = shallow(<Chip lead="Owner" value="Bob" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("displays the value", () => {
    const wrapper = mount(<Chip value="positive" />);
    expect(wrapper.find(".p-chip").text()).toBe("positive");
  });

  it("displays the lead-value", () => {
    const wrapper = mount(<Chip lead="Owner" value="Bob" />);
    expect(wrapper.find(".p-chip").text()).toBe("OWNER: Bob");
  });
});
