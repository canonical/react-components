import { shallow, mount } from "enzyme";
import React from "react";

import SearchAndFilter from "./SearchAndFilter";

const sampleData = [
  {
    heading: "Clouds",
    chips: [{ value: "Google" }, { value: "AWS" }, { value: "Azure" }],
  },
  {
    heading: "Regions",
    chips: [
      { value: "us-east1" },
      { value: "us-east2" },
      { value: "us-east3" },
    ],
  },
  {
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
        data={sampleData}
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
        data={sampleData}
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

  it("shows correct data passed as prop", () => {
    const mockOnChange = jest.fn();
    const wrapper = mount(
      <SearchAndFilter
        externallyControlled
        onChange={mockOnChange}
        data={sampleData}
      />
    );
    expect(wrapper.find(".search-and-filter__section").length).toEqual(3);
    // Test first section of filter panel
    const firstSection = wrapper.find(".search-and-filter__section").at(0);
    expect(
      firstSection.find(".search-and-filter__section-header").text()
    ).toEqual("Clouds");
    const firstSectionFirstChip = firstSection.find(".p-chip").at(0);
    expect(firstSectionFirstChip.text()).toEqual("Google");
    // Test second section of filter panel
    const secondSection = wrapper.find(".search-and-filter__section").at(1);
    expect(
      secondSection.find(".search-and-filter__section-header").text()
    ).toEqual("Regions");
    const secondSectionSecondChip = secondSection.find(".p-chip").at(1);
    expect(secondSectionSecondChip.text()).toEqual("us-east2");
  });
});
