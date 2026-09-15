import { render, screen, within } from "@testing-library/react";
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
const getPanel = () => document.querySelector(".p-search-and-filter__panel");

const getSearchContainer = () =>
  document.querySelector(".p-search-and-filter__search-container");

describe("Search and filter", () => {
  it("renders", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        data-testid="searchandfilter"
        filterPanelData={[]}
        returnSearchData={returnSearchData}
      />,
    );
    expect(screen.getByTestId("searchandfilter")).toMatchSnapshot();
  });

  it("hide the clear button when there is no value in search box", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={[]}
        returnSearchData={returnSearchData}
      />,
    );
    expect(
      screen.queryByRole("button", { name: Label.Clear }),
    ).not.toBeInTheDocument();
  });

  it("shows panel when clicking the wrapping element", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        data-testid="searchandfilter"
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />,
    );
    expect(getPanel()).toHaveAttribute("aria-hidden", "true");
    await userEvent.click(screen.getByTestId("searchandfilter"));
    expect(getPanel()).toHaveAttribute("aria-hidden", "false");
  });

  it("shows panel on click", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />,
    );
    expect(getPanel()).toHaveAttribute("aria-hidden", "true");
    await userEvent.click(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
    );
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
      />,
    );
    expect(
      document.querySelector(".p-search-and-filter__selected-count"),
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
      />,
    );
    expect(
      document.querySelector(".p-search-and-filter__selected-count"),
    ).not.toBeInTheDocument();
    await userEvent.click(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
    );
    await userEvent.click(screen.getByRole("button", { name: "us-east1" }));
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
      />,
    );
    expect(getSearchContainer()).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
    );
    await userEvent.click(screen.getByRole("button", { name: "us-east1" }));
    await userEvent.click(screen.getByRole("button", { name: "+1" }));

    expect(getSearchContainer()).toHaveAttribute("aria-expanded", "true");
  });

  it("search prompt appears when search field has search term", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />,
    );
    await userEvent.click(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
    );
    expect(
      document.querySelector(".p-search-and-filter__search-prompt"),
    ).not.toBeInTheDocument();
    await userEvent.clear(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
    );
    await userEvent.type(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
      "My new value",
    );
    expect(
      screen.getByRole("button", { name: "Search for My new value ..." }),
    ).toBeInTheDocument();
  });

  it("no search results appear for unknown search term", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />,
    );
    await userEvent.click(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
    );
    expect(document.querySelectorAll(".p-filter-panel-section").length).toEqual(
      3,
    );
    await userEvent.clear(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
    );
    await userEvent.type(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
      "Unknown value",
    );
    expect(document.querySelectorAll(".p-filter-panel-section").length).toEqual(
      0,
    );
  });

  it("correct number of panels appear for matching search terms", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />,
    );
    await userEvent.click(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
    );
    await userEvent.clear(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
    );
    await userEvent.type(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
      "Google",
    );
    expect(document.querySelectorAll(".p-filter-panel-section").length).toEqual(
      1,
    );
    await userEvent.clear(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
    );
    await userEvent.type(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
      "re",
    );
    expect(document.querySelectorAll(".p-filter-panel-section").length).toEqual(
      2,
    );
  });

  it("Matching search terms are highlighted with strong tag", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />,
    );
    await userEvent.click(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
    );
    await userEvent.clear(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
    );
    await userEvent.type(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
      "Google",
    );
    const boldText = document
      .querySelectorAll(".p-chip")[0]
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
      />,
    );
    const lead = document.querySelector(
      ".p-search-and-filter__search-container .p-chip__lead",
    )?.textContent;
    const value = document.querySelector(
      ".p-search-and-filter__search-container .p-chip__value",
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
      />,
    );
    const chips = document.querySelectorAll(
      ".p-search-and-filter__search-container .p-chip",
    );
    expect(chips.length).toBe(2);

    const chip1Value = document.querySelector(
      ".p-search-and-filter__search-container .p-chip:nth-child(1) .p-chip__value",
    )?.textContent;
    expect(chip1Value).toEqual("Google");

    const chip2Value = document.querySelector(
      ".p-search-and-filter__search-container .p-chip:nth-child(2) .p-chip__value",
    )?.textContent;
    expect(chip2Value).toEqual("eu-west-1");
  });

  it("calls onPanelToggle function when provided and the searchbox is clicked", async () => {
    const returnSearchData = jest.fn();
    const onPanelToggle = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
        onPanelToggle={onPanelToggle}
      />,
    );
    await userEvent.click(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
    );
    expect(onPanelToggle).toHaveBeenCalled();
  });

  it("calls onExpandChange function when provided and the counter is clicked", async () => {
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
    const onExpandChange = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
        onExpandChange={onExpandChange}
      />,
    );
    await userEvent.click(
      screen.getByRole("searchbox", { name: Label.SearchAndFilter }),
    );
    await userEvent.click(screen.getByRole("button", { name: "us-east1" }));
    await userEvent.click(screen.getByRole("button", { name: "+1" }));
    expect(onExpandChange).toHaveBeenCalled();
  });

  it("does not toggle the panel when a filter is dismissed", async () => {
    const returnSearchData = jest.fn();
    const onExpandChange = jest.fn();
    const onPanelToggle = jest.fn();
    render(
      <SearchAndFilter
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
        onExpandChange={onExpandChange}
        onPanelToggle={onPanelToggle}
        existingSearchData={[
          { lead: "Cloud", value: "Google" },
          { lead: "Region", value: "eu-west-1" },
        ]}
      />,
    );

    // onPanelToggle is called on initial render, so we need to clear the mock before asserting
    onPanelToggle.mockClear();

    // Dismiss the Cloud: Google filter chip
    const cloudChip: HTMLElement = screen.getByText("CLOUD").closest(".p-chip");
    const dismissButton = within(cloudChip).getByRole("button", {
      name: "Dismiss",
    });
    await userEvent.click(dismissButton);

    expect(onPanelToggle).not.toHaveBeenCalled();
  });

  it("closes the filter panel when escape is pressed", async () => {
    const returnSearchData = jest.fn();
    render(
      <SearchAndFilter
        data-testid="searchandfilter"
        filterPanelData={sampleData}
        returnSearchData={returnSearchData}
      />,
    );
    await userEvent.click(screen.getByTestId("searchandfilter"));
    expect(getPanel()).toHaveAttribute("aria-hidden", "false");

    await userEvent.keyboard("{Escape}");
    expect(getPanel()).toHaveAttribute("aria-hidden", "true");
  });

  it("does not occupy the escape stack while the panel is closed", async () => {
    // Regression test for https://github.com/canonical/react-components/pull/1339#discussion_r1234
    //
    // SearchAndFilter must only join the global escape-key stack while its
    // panel is open. Otherwise, if it is mounted alongside another overlay
    // (e.g. Navigation's search box) and registers unconditionally, it can
    // sit on top of the LIFO stack and swallow Escape presses meant for that
    // other overlay even though its own panel is closed.
    const returnSearchData = jest.fn();
    const onEscPress = jest.fn();

    const MockEscEventComponent = (): React.JSX.Element => {
      React.useEffect(() => {
        const handleEscPress = (e: KeyboardEvent) => {
          if (e.key === "Escape") {
            onEscPress();
          }
        };
        document.addEventListener("keydown", handleEscPress);
        return () => {
          document.removeEventListener("keydown", handleEscPress);
        };
      });
      return <div>Mock component with event on Esc key press</div>;
    };

    render(
      <>
        <SearchAndFilter
          filterPanelData={sampleData}
          returnSearchData={returnSearchData}
        />
        <MockEscEventComponent />
      </>,
    );

    expect(getPanel()).toHaveAttribute("aria-hidden", "true");
    await userEvent.keyboard("{Escape}");
    expect(onEscPress).toHaveBeenCalledTimes(1);
  });
});
