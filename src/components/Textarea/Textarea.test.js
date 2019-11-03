import { shallow } from "enzyme";
import React from "react";

import Textarea from "./Textarea";

describe("Textarea ", () => {
  it("renders", () => {
    const wrapper = shallow(<Textarea id="test-id" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    const wrapper = shallow(<Textarea className="extra-class" />);
    const className = wrapper.find("textarea").prop("className");
    expect(className.includes("p-form-validation__input")).toBe(true);
    expect(className.includes("extra-class")).toBe(true);
  });
});
