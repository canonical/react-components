import { shallow, mount } from "enzyme";
import React from "react";

import SearchAndFilter from "./SearchAndFilter";

const sampleData = [
  {
    id: 0,
    heading: "Clouds",
    chips: [{ value: "Google" }, { value: "AWS" }, { value: "Azure" }],
  },
  {
    id: 1,
    heading: "Regions",
    chips: [
      { value: "us-east1" },
      { value: "us-east2" },
      { value: "us-east3" },
    ],
  },
  {
    id: 3,
    heading: "Owner",
    chips: [{ value: "foo" }, { value: "bar" }, { value: "baz" }],
  },
];

describe("Search and filter", () => {
  it("renders", () => {
    const wrapper = shallow(<SearchAndFilter />);
    expect(wrapper).toMatchSnapshot();
  });

  it("hide the clear button when there is no value in search box", () => {
    const wrapper = mount(<SearchAndFilter />);
    expect(wrapper.find(".p-search-box__reset").exists()).toBe(false);
  });

  it("onChange handler called", () => {
    const mockOnChange = jest.fn();
    const wrapper = mount(
      <SearchAndFilter externallyControlled onChange={mockOnChange} />
    );
    wrapper.find(".p-search-box__input").simulate("change");
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("shows panel on focus", () => {
    const mockOnChange = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        externallyControlled
        onChange={mockOnChange}
        filterPanelData={sampleData}
      />
    );
    expect(
      wrapper.find(".search-and-filter__panel").prop("aria-hidden")
    ).toEqual(true);
    wrapper.find(".p-search-box__input").simulate("focus");
    expect(
      wrapper.find(".search-and-filter__panel").prop("aria-hidden")
    ).toEqual(false);
  });

  it("shows panel on click", () => {
    const mockOnChange = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        externallyControlled
        onChange={mockOnChange}
        filterPanelData={sampleData}
      />
    );
    expect(
      wrapper.find(".search-and-filter__panel").prop("aria-hidden")
    ).toEqual(true);
    wrapper.find(".p-search-box__input").simulate("click");
    expect(
      wrapper.find(".search-and-filter__panel").prop("aria-hidden")
    ).toEqual(false);
  });

  it("should hide chip overflow counter when none overflow", () => {
    const mockOnChange = jest.fn();
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
    const wrapper = mount(
      <SearchAndFilter
        externallyControlled
        onChange={mockOnChange}
        filterPanelData={sampleData}
      />
    );
    expect(wrapper.find(".search-and-filter__selected-count").length).toEqual(
      0
    );
  });

  it("show overflow chip counter when chips overflow", () => {
    const mockOnChange = jest.fn();
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
    const wrapper = mount(
      <SearchAndFilter
        externallyControlled
        onChange={mockOnChange}
        filterPanelData={sampleData}
      />
    );
    wrapper
      .find(".filter-panel-section__chips .p-chip")
      .first()
      .simulate("click");
    expect(wrapper.find(".search-and-filter__selected-count").text()).toEqual(
      "+1"
    );
  });

  it("all chips are shown when counter is clicked", () => {
    const mockOnChange = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        externallyControlled
        onChange={mockOnChange}
        filterPanelData={sampleData}
      />
    );
    wrapper
      .find(".filter-panel-section__chips .p-chip")
      .first()
      .simulate("click");
    expect(
      wrapper.find(".search-and-filter__search-container").prop("aria-expanded")
    ).toEqual(false);
    wrapper.find(".search-and-filter__selected-count").simulate("click");
    expect(
      wrapper.find(".search-and-filter__search-container").prop("aria-expanded")
    ).toEqual(true);
  });
});
