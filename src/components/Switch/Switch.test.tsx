import { shallow } from "enzyme";
import React from "react";

import Switch from "./Switch";

describe("<Switch />", () => {
  // snapshot tests
  it("renders and matches the snapshot", () => {
    const component = shallow(<Switch label="Switch" />);

    expect(component).toMatchSnapshot();
  });

  it("renders and matches the snapshot with disabled", () => {
    const component = shallow(<Switch label="Disabled switch" disabled />);

    expect(component).toMatchSnapshot();
  });

  //unit tests
  it("renders a switch with a label", () => {
    const component = shallow(<Switch label="Switch" />);

    expect(component.find("label").first().hasClass("p-switch")).toBeTruthy();
  });

  it("renders a disabled switch", () => {
    const component = shallow(<Switch label="Disabled switch" disabled />);

    expect(component.find("input[disabled]").length).toBe(1);
  });
});
