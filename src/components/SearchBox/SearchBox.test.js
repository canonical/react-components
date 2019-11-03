import { shallow } from "enzyme";
import React from "react";

import SearchBox from "./SearchBox";

describe("SearchBox ", () => {
  it("renders", () => {
    const wrapper = shallow(<SearchBox />);
    expect(wrapper).toMatchSnapshot();
  });

  it("shows the clear button when there is a value", () => {
    const wrapper = shallow(<SearchBox value="admin" />);
    expect(wrapper.find(".p-search-box__reset").exists()).toBe(true);
  });
});
