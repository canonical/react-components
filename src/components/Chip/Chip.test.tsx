import { shallow, mount } from "enzyme";
import React from "react";

import Chip from "./Chip";

describe("Chip ", () => {
  it("renders default chip", () => {
    const wrapper = shallow(<Chip onClick={jest.fn()} value="positive" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders lead-value chip", () => {
    const wrapper = shallow(
      <Chip onClick={jest.fn()} lead="Owner" value="Bob" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("displays the value", () => {
    const wrapper = mount(<Chip onClick={jest.fn()} value="positive" />);
    expect(wrapper.find(".p-chip").text()).toBe("positive");
  });

  it("displays the lead-value", () => {
    const wrapper = mount(
      <Chip onClick={jest.fn()} lead="Owner" value="Bob" />
    );
    expect(wrapper.find(".p-chip").text()).toBe("OWNERBob"); // Colon and space added with CSS
  });

  it("displays the dismiss action", () => {
    const onDismiss = jest.fn();
    const wrapper = mount(
      <Chip
        onClick={jest.fn()}
        lead="Owner"
        value="Bob"
        onDismiss={onDismiss}
      />
    );
    expect(wrapper.find(".p-chip__dismiss").exists()).toBe(true);
  });

  it("calls onDismiss when clicked", () => {
    const onDismiss = jest.fn();
    const wrapper = mount(
      <Chip
        onClick={jest.fn()}
        lead="Owner"
        value="Bob"
        onDismiss={onDismiss}
      />
    );
    const dismissButton = wrapper.find(".p-chip__dismiss");
    dismissButton.simulate("click");
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
