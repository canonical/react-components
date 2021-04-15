import { shallow } from "enzyme";
import React from "react";

import CheckableInput from "./CheckableInput";

describe("CheckableInput ", () => {
  it("renders a checkable input", () => {
    const wrapper = shallow(
      <CheckableInput type="checkbox" label="Test label"></CheckableInput>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
