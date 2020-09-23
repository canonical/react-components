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
    const returnSearchData = jest.fn();
    const wrapper = shallow(
      <SearchAndFilter
        filterPanelData={[]}
        returnSearchData={returnSearchData}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("hide the clear button when there is no value in search box", () => {
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        filterPanelData={[]}
        returnSearchData={returnSearchData}
      />
    );
    expect(wrapper.find(".p-search-box__reset").exists()).toBe(false);
  });

  it("shows panel on focus", () => {
    const mockOnChange = jest.fn();
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        externallyControlled
        onChange={mockOnChange}
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
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
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        externallyControlled
        onChange={mockOnChange}
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
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
    const returnSearchData = jest.fn();
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
        returnSearchData={returnSearchData}
      />
    );
    expect(wrapper.find(".search-and-filter__selected-count").length).toEqual(
      0
    );
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
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        externallyControlled
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    wrapper.find(".p-search-box__input").simulate("click");
    wrapper
      .find(".filter-panel-section__chips .p-chip")
      .first()
      .simulate("click");
    expect(wrapper.find(".search-and-filter__selected-count").text()).toEqual(
      "+1"
    );
  });

  it("all chips are shown when counter is clicked", () => {
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
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        externallyControlled
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    expect(
      wrapper.find(".search-and-filter__search-container").prop("aria-expanded")
    ).toEqual(false);
    wrapper.find(".p-search-box__input").simulate("click");
    wrapper
      .find(".filter-panel-section__chips .p-chip")
      .first()
      .simulate("click");
    wrapper.find(".search-and-filter__selected-count").simulate("click");
    expect(
      wrapper.find(".search-and-filter__search-container").prop("aria-expanded")
    ).toEqual(true);
  });

  it("search prompt appears when search field has search term", () => {
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        externallyControlled
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    expect(wrapper.find(".search-prompt").length).toEqual(0);
    wrapper
      .find(".p-search-box__input")
      .simulate("change", { target: { value: "My new value" } });
    expect(wrapper.find(".search-prompt").length).toEqual(1);
  });

  it("no search results appear for unknown search term", () => {
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        externallyControlled
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    expect(wrapper.find(".filter-panel-section").length).toEqual(3);
    wrapper
      .find(".p-search-box__input")
      .simulate("change", { target: { value: "Unknown value" } });
    expect(wrapper.find(".filter-panel-section").length).toEqual(0);
  });

  it("correct number of panels appear for matching search terms", () => {
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        externallyControlled
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    wrapper
      .find(".p-search-box__input")
      .simulate("change", { target: { value: "Google" } });
    expect(wrapper.find(".filter-panel-section").length).toEqual(1);
    wrapper
      .find(".p-search-box__input")
      .simulate("change", { target: { value: "re" } });
    expect(wrapper.find(".filter-panel-section").length).toEqual(2);
  });

  it("Matching search terms are highlighted with strong tag", () => {
    const returnSearchData = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        externallyControlled
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    wrapper.find(".p-search-box__input").simulate("click");
    wrapper
      .find(".p-search-box__input")
      .simulate("change", { target: { value: "Google" } });
    const firstChip = wrapper.find(".p-chip").first();
    expect(firstChip.find(".p-chip__value").html()).toEqual(
      '<span class="p-chip__value"><strong>Google</strong></span>'
    );
  });
});
