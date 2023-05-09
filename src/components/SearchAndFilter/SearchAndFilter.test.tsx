import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

import SearchAndFilter from "./SearchAndFilter";
import { Label } from "./SearchAndFilter";
import userEvent from "@testing-library/user-event";

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
// eslint-disable-next-line testing-library/no-node-access
const getPanel = () => document.querySelector(".p-search-and-filter__panel");

const getSearchContainer = () =>
  // eslint-disable-next-line testing-library/no-node-access
  document.querySelector(".p-search-and-filter__search-container");

describe("Search and filter", () => {
  it("renders", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        data-testid="searchandfilter"
        filterPanelData={[]}
        returnSearchData={returnSearchData}
      />
    );
    expect(screen.getByTestId("searchandfilter")).toMatchSnapshot();
  });

  it("hide the clear button when there is no value in search box", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={[]}
        returnSearchData={returnSearchData}
      />
    );
    expect(
      screen.queryByRole("button", { name: Label.Clear })
    ).not.toBeInTheDocument();
  });

  it("shows panel when clicking the wrapping element", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        data-testid="searchandfilter"
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    expect(getPanel()).toHaveAttribute("aria-hidden", "true");
    await waitFor(async () => {
      await userEvent.click(screen.getByTestId("searchandfilter"));
    });
    expect(getPanel()).toHaveAttribute("aria-hidden", "false");
  });

  it("shows panel on click", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    expect(getPanel()).toHaveAttribute("aria-hidden", "true");
    await waitFor(async () => {
      await userEvent.click(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter })
      );
    });
    expect(getPanel()).toHaveAttribute("aria-hidden", "false");
  });

  it("should hide chip overflow counter when none overflow", async () => {
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
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(".p-search-and-filter__selected-count")
    ).not.toBeInTheDocument();
  });

  it("show overflow chip counter when chips overflow", async () => {
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
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(".p-search-and-filter__selected-count")
    ).not.toBeInTheDocument();
    await waitFor(async () => {
      await userEvent.click(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter })
      );
    });
    await waitFor(async () => {
      await userEvent.click(screen.getByRole("button", { name: "us-east1" }));
    });
    expect(screen.getByRole("button", { name: "+1" })).toBeInTheDocument();
  });

  it("all chips are shown when counter is clicked", async () => {
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
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    expect(getSearchContainer()).toHaveAttribute("aria-expanded", "false");
    await waitFor(async () => {
      await userEvent.click(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter })
      );
    });
    await waitFor(async () => {
      await userEvent.click(screen.getByRole("button", { name: "us-east1" }));
    });
    await waitFor(async () => {
      await userEvent.click(screen.getByRole("button", { name: "+1" }));
    });
    expect(getSearchContainer()).toHaveAttribute("aria-expanded", "true");
  });

  it("search prompt appears when search field has search term", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    await waitFor(async () => {
      await userEvent.click(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter })
      );
    });
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(".p-search-and-filter__search-prompt")
    ).not.toBeInTheDocument();
    await waitFor(async () => {
      await userEvent.clear(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter })
      );
    });
    await waitFor(async () => {
      await userEvent.type(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
        "My new value"
      );
    });
    expect(
      screen.getByRole("button", { name: "Search for My new value ..." })
    ).toBeInTheDocument();
  });

  it("no search results appear for unknown search term", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    await waitFor(async () => {
      await userEvent.click(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter })
      );
    });
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelectorAll(".p-filter-panel-section").length).toEqual(
      3
    );
    await waitFor(async () => {
      await userEvent.clear(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter })
      );
    });
    await waitFor(async () => {
      await userEvent.type(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
        "Unknown value"
      );
    });
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelectorAll(".p-filter-panel-section").length).toEqual(
      0
    );
  });

  it("correct number of panels appear for matching search terms", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    await waitFor(async () => {
      await userEvent.click(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter })
      );
    });
    await waitFor(async () => {
      await userEvent.clear(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter })
      );
    });
    await waitFor(async () => {
      await userEvent.type(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
        "Google"
      );
    });
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelectorAll(".p-filter-panel-section").length).toEqual(
      1
    );
    await waitFor(async () => {
      await userEvent.clear(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter })
      );
    });
    await waitFor(async () => {
      await userEvent.type(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
        "re"
      );
    });
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelectorAll(".p-filter-panel-section").length).toEqual(
      2
    );
  });

  it("Matching search terms are highlighted with strong tag", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />
    );
    await waitFor(async () => {
      await userEvent.click(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter })
      );
    });
    await waitFor(async () => {
      await userEvent.clear(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter })
      );
    });
    await waitFor(async () => {
      await userEvent.type(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
        "Google"
      );
    });
    const boldText = document
      // eslint-disable-next-line testing-library/no-node-access
      .querySelectorAll(".p-chip")[0]
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector("strong");
    expect(boldText?.textContent).toEqual("Google");
  });

  it("Existing search data displays correctly", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
        existingSearchData={[{ lead: "Cloud", value: "Google" }]}
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const lead = document.querySelector(
      ".p-search-and-filter__search-container .p-chip__lead"
    )?.textContent;
    // eslint-disable-next-line testing-library/no-node-access
    const value = document.querySelector(
      ".p-search-and-filter__search-container .p-chip__value"
    )?.textContent;
    expect(lead).toBe("CLOUD");
    expect(value).toBe("Google");
  });

  it("Existing search data displays correctly if two search items present", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
        existingSearchData={[
          { lead: "Cloud", value: "Google" },
          { lead: "Region", value: "eu-west-1" },
        ]}
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const chips = document.querySelectorAll(
      ".p-search-and-filter__search-container .p-chip"
    );
    expect(chips.length).toBe(2);

    // eslint-disable-next-line testing-library/no-node-access
    const chip1Value = document.querySelector(
      ".p-search-and-filter__search-container .p-chip:nth-child(1) .p-chip__value"
    )?.textContent;
    expect(chip1Value).toEqual("Google");

    // eslint-disable-next-line testing-library/no-node-access
    const chip2Value = document.querySelector(
      ".p-search-and-filter__search-container .p-chip:nth-child(2) .p-chip__value"
    )?.textContent;
    expect(chip2Value).toEqual("eu-west-1");
  });

  it("calls onHeightChange function when provided and the counter is clicked", async () => {
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
    const onHeightChange = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
        onHeightChange={onHeightChange}
      />
    );
    await waitFor(async () => {
      await userEvent.click(
        screen.getByRole("searchbox", { name: Label.SearchAndFilter })
      );
    });
    await waitFor(async () => {
      await userEvent.click(screen.getByRole("button", { name: "us-east1" }));
    });
    await waitFor(async () => {
      await userEvent.click(screen.getByRole("button", { name: "+1" }));
    });
    expect(onHeightChange).toHaveBeenCalled();
  });
});
