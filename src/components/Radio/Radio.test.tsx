import { shallow } from "enzyme";
import React from "react";

import Radio from "./Radio";

describe("Radio ", () => {
  it("renders", () => {
    const wrapper = shallow(<Radio label="Test radio"></Radio>);
    expect(wrapper).toMatchSnapshot();
  });
});
