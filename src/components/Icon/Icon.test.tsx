import { shallow } from "enzyme";
import React from "react";

import Icon, { ICONS } from "./Icon";

describe("Icon", () => {
  it("renders", () => {
    const wrapper = shallow(<Icon name={ICONS.success} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("sets correct class name based on given name", () => {
    const wrapper = shallow(<Icon name="test" />);
    expect(wrapper.prop("className").includes("p-icon--test")).toBe(true);
  });
});
