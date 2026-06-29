import { render, screen } from "@testing-library/react";
import React from "react";

import FilterPanelSection from "./FilterPanelSection";
import userEvent from "@testing-library/user-event";

const sampleData = {
  id: 1,
  heading: "Regions",
  chips: [{ value: "us-east1" }, { value: "us-east2" }, { value: "us-east3" }],
};

const manyChipsData = {
  ...sampleData,
  chips: Array.from({ length: 30 }, (_, i) => ({ value: `us-east${i + 1}` })),
};

describe("Filter panel section", () => {
  it("renders", () => {
    render(
      <FilterPanelSection
        searchData={[]}
        searchTerm=""
        toggleSelected={jest.fn()}
        data={sampleData}
      />,
    );
    expect(document.querySelector(".p-filter-panel-section")).toMatchSnapshot();
  });

  it("shows correct data passed as prop", () => {
    render(
      <FilterPanelSection
        searchData={[]}
        searchTerm=""
        toggleSelected={jest.fn()}
        data={sampleData}
      />,
    );
    expect(
      document.querySelector(".p-filter-panel-section"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "us-east1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "us-east2" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "us-east3" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Regions" }),
    ).toBeInTheDocument();
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
    render(
      <FilterPanelSection
        searchData={[]}
        searchTerm=""
        toggleSelected={jest.fn()}
        data={sampleData}
      />,
    );
    expect(
      document.querySelector(".p-search-and-filter__selected-count"),
    ).not.toBeInTheDocument();
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
    render(
      <FilterPanelSection
        searchData={[]}
        searchTerm=""
        toggleSelected={jest.fn()}
        data={sampleData}
      />,
    );
    expect(
      // Use a query selector because the element's text is split up over
      // multiple elements so it can't be selected by its content.
      document.querySelector(".p-filter-panel-section__counter")?.textContent,
    ).toBe("+3");
  });

  it("all chips are shown when counter is clicked", async () => {
    // Jest is unaware of layout so we must mock the offsetTop and offsetHeight
    // of the chips to force the overflow counter to show.
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 40,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetTop", {
      configurable: true,
      value: 100,
    });
    render(
      <FilterPanelSection
        searchData={[]}
        searchTerm=""
        toggleSelected={jest.fn()}
        data={manyChipsData}
        sectionHidden={false}
      />,
    );

    const counter = document.querySelector(
      ".p-filter-panel-section__counter",
    ) as HTMLElement;
    expect(counter).toBeInTheDocument();

    await userEvent.click(counter);

    expect(
      document.querySelector(".p-filter-panel-section__counter"),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "us-east1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "us-east15" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "us-east30" }),
    ).toBeInTheDocument();
  });
});
