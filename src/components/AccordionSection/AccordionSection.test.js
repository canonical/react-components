import { shallow } from "enzyme";
import React from "react";

import AccordionSection from "./AccordionSection";

jest.mock("uuid/v4", () =>
  jest.fn(() => "00000000-0000-0000-0000-000000000000")
);

describe("AccordionSection ", () => {
  it("renders", () => {
    const wrapper = shallow(
      <AccordionSection
        content={<span>Test</span>}
        expanded="abcd-1234"
        setExpanded={jest.fn()}
        title="Test section"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("can handle click events on the title", () => {
    const onTitleClick = jest.fn();
    let expanded = null;
    const wrapper = shallow(
      <AccordionSection
        content={<span>Test</span>}
        expanded={expanded}
        onTitleClick={onTitleClick}
        setExpanded={id => {
          expanded = id;
        }}
        title="Test section"
      />
    );
    wrapper
      .find(".p-accordion__tab")
      .at(0)
      .simulate("click");
    expect(onTitleClick.mock.calls[0][0]).toBe(true);
    wrapper.setProps({ expanded });
    // Clicking the title again should close the accordion section.
    wrapper
      .find(".p-accordion__tab")
      .at(0)
      .simulate("click");
    expect(onTitleClick.mock.calls[1][0]).toBe(false);
  });
});
