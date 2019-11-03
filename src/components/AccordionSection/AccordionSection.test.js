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
});
