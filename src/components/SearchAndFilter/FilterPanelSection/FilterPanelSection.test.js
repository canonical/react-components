import { shallow, mount } from "enzyme";
import React from "react";

import FilterPanelSection from "./FilterPanelSection";

const sampleData = {
  heading: "Regions",
  chips: [{ value: "us-east1" }, { value: "us-east2" }, { value: "us-east3" }],
};

describe("Filter panel section", () => {
  it("renders", () => {
    const wrapper = shallow(<FilterPanelSection data={sampleData} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("shows correct data passed as prop", () => {
    const wrapper = mount(<FilterPanelSection data={sampleData} />);
    expect(wrapper.find(".filter-panel-section").length).toEqual(1);
    const section = wrapper.find(".filter-panel-section");
    const chips = wrapper.find(".p-chip");
    expect(chips.length).toEqual(3);
    expect(section.find(".filter-panel-section__heading").text()).toEqual(
      "Regions"
    );
    const firstChip = section.find(".p-chip").at(0);
    expect(firstChip.text()).toEqual("us-east1");
  });

  it("should hide chip overflow counter when none overflow", () => {
    // Jest is unaware of layout so we must mock the offsetTop and offsetHeight
    // of the chips
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 40,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetTop", {
      configurable: true,
      value: 40,
    });
    const wrapper = mount(<FilterPanelSection data={sampleData} />);
    expect(wrapper.find(".filter-panel-section__counter").length).toEqual(0);
  });

  it("show overflow chip counter when chips overflow", () => {
    // Jest is unaware of layout so we must mock the offsetTop and offsetHeight
    // of the chips
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 40,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetTop", {
      configurable: true,
      value: 100,
    });
    const wrapper = mount(<FilterPanelSection data={sampleData} />);
    expect(wrapper.find(".filter-panel-section__counter").text()).toEqual("+3");
  });
});
