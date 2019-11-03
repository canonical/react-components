import { shallow } from "enzyme";
import React from "react";

import Accordion from "./Accordion";

jest.mock("uuid/v4", () =>
  jest.fn(() => "00000000-0000-0000-0000-000000000000")
);

describe("Accordion ", () => {
  it("renders", () => {
    const wrapper = shallow(
      <Accordion
        sections={[
          {
            title: "Advanced topics",
            content: "test content"
          },
          {
            title: "Networking",
            content: <>More test content</>
          }
        ]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    const wrapper = shallow(
      <Accordion className="extra-class" sections={[]} />
    );
    const className = wrapper.prop("className");
    expect(className.includes("p-accordion")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
