import { shallow } from "enzyme";
import React from "react";

import ContextualMenu from "./ContextualMenu";

describe("Contextual Menu ", () => {
  it("renders instance but not visible", () => {
    const wrapper = shallow(<ContextualMenu>Test content</ContextualMenu>);
    expect(
      wrapper.find(".p-contextual-menu__dropdown").prop("aria-hidden")
    ).toEqual(true);
  });

  it("renders visible instance", () => {
    const wrapper = shallow(
      <ContextualMenu visible={true}>Test content</ContextualMenu>
    );
    expect(
      wrapper.find(".p-contextual-menu__dropdown").prop("aria-hidden")
    ).toEqual(false);
  });
});
