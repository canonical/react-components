import { mount, shallow } from "enzyme";
import React from "react";

import Tooltip from "./Tooltip";

describe("<Tooltip />", () => {
  const body = document.querySelector("body");
  const app = document.createElement("div");
  app.setAttribute("id", "app");
  body.appendChild(app);

  // snapshot tests
  it("renders and matches the snapshot", () => {
    const component = shallow(<Tooltip message="text">Child</Tooltip>);
    expect(component).toMatchSnapshot();
  });

  // unit tests
  it("does not show tooltip message by default", () => {
    const component = mount(<Tooltip message="text">Child</Tooltip>);
    expect(component.exists("[data-test='tooltip-portal']")).toEqual(false);
  });

  it("renders tooltip message when focused", () => {
    const component = mount(<Tooltip message="text">Child</Tooltip>);
    component.simulate("focus");
    expect(component.find("[data-test='tooltip-portal']").text()).toEqual(
      "text"
    );
  });

  it("gives the correct class name to the tooltip", () => {
    const component = mount(
      <Tooltip message="text" position="right">
        Child
      </Tooltip>
    );
    component.simulate("focus");
    expect(component.exists(".p-tooltip--right")).toEqual(true);
  });
});
