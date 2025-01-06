import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CustomSelectDropdown, {
  CustomSelectOption,
  getNearestParentsZIndex,
} from "./CustomSelectDropdown";
import { CustomSelectDropdownProps } from ".";

// Global mocks
window.HTMLElement.prototype.scrollIntoView = jest.fn();

const defaultOptions: CustomSelectOption[] = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
  { value: "4", label: "Option 4" },
  { value: "5", label: "Option 5" },
];

const defaultProps: CustomSelectDropdownProps = {
  name: "test-dropdown",
  toggleId: "test-toggle",
  onSelect: jest.fn(),
  onClose: jest.fn(),
  searchable: "auto",
  options: defaultOptions,
};

// mock the toggle for the dropdown menu
const mockToggle = (name: string, fn: () => unknown) => {
  const toggle = document.createElement("span");
  toggle.setAttribute("id", "test-toggle");
  toggle.classList.add("p-custom-select__toggle");
  document.body.appendChild(toggle);
  Object.defineProperty(toggle, name, {
    value: jest.fn(fn),
  });
  return toggle;
};

const cleanUpDOM = () => {
  const toggle = document.getElementById("test-toggle");
  if (toggle) {
    document.body.removeChild(toggle);
  }
};

describe("CustomSelectDropdown", () => {
  beforeEach(() => {
    cleanUpDOM();
    jest.resetAllMocks();
  });

  it("renders", () => {
    const options: CustomSelectOption[] = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
      { value: "4", label: "Option 4" },
      { value: "5", label: "Option 5" },
    ];

    mockToggle("getBoundingClientRect", () => ({}));

    const { container } = render(
      <CustomSelectDropdown {...defaultProps} options={options} />,
    );

    expect(container).toMatchSnapshot();
  });

  it("should render the search box when `searchable` is 'always'", () => {
    const options: CustomSelectOption[] = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ];

    mockToggle("getBoundingClientRect", () => ({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }));

    render(
      <CustomSelectDropdown
        {...defaultProps}
        options={options}
        searchable="always"
      />,
    );

    const searchBox = screen.queryByRole("textbox", {
      name: /search for test-dropdown/i,
    });
    expect(searchBox).toBeInTheDocument();
  });

  describe("search functionality", () => {
    const setup = (
      searchable: CustomSelectDropdownProps["searchable"],
      options?: CustomSelectOption[],
    ) => {
      mockToggle("getBoundingClientRect", () => ({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }));

      render(
        <CustomSelectDropdown
          {...defaultProps}
          options={options || defaultOptions}
          searchable={searchable}
        />,
      );
    };

    it("should render the search box when `searchable` is 'always'", () => {
      const options: CustomSelectOption[] = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2", disabled: true },
        { value: "3", label: "Option 3" },
      ];

      setup("always", options);

      const searchBox = screen.queryByRole("textbox", {
        name: /search for test-dropdown/i,
      });
      expect(searchBox).toBeInTheDocument();
    });

    it("should render the search box when `searchable` is `auto` and there are 5 or more options", () => {
      setup("auto");

      const searchBox = screen.queryByRole("textbox", {
        name: /search for test-dropdown/i,
      });
      expect(searchBox).toBeInTheDocument();
    });

    it("should not render search box when `searchable` is `never`", () => {
      setup("never");

      const searchBox = screen.queryByRole("textbox", {
        name: /search for test-dropdown/i,
      });
      expect(searchBox).not.toBeInTheDocument();
    });

    it("should filter options based on the search input", () => {
      setup("auto");

      const searchBox = screen.queryByRole("textbox", {
        name: /search for test-dropdown/i,
      });

      const allOptions = [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
        "Option 5",
      ];

      for (const option of allOptions) {
        expect(screen.getByText(option)).toBeInTheDocument();
      }

      fireEvent.change(searchBox, { target: { value: "Option 1" } });

      expect(screen.getByText("Option 1")).toBeInTheDocument();
      for (const option of allOptions.slice(1)) {
        expect(screen.queryByText(option)).not.toBeInTheDocument();
      }
    });

    it("should reset the selected index when search input changes", () => {
      setup("auto");

      const searchBox = screen.queryByRole("textbox", {
        name: /search for test-dropdown/i,
      });

      fireEvent.change(searchBox, { target: { value: "Option 2" } });

      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 2").parentElement).toHaveClass(
        "highlight",
      );

      fireEvent.change(searchBox, { target: { value: "Option 1" } });

      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 1").parentElement).toHaveClass(
        "highlight",
      );
    });
  });

  describe("dropdown positioning", () => {
    it("should align the dropdown width with the toggle button width", () => {
      mockToggle("getBoundingClientRect", () => ({
        width: 200,
      }));

      render(<CustomSelectDropdown {...defaultProps} />);

      const dropdown = screen.queryByRole("combobox");
      expect(dropdown).toHaveStyle(`min-width: ${200}px`);
    });
  });

  describe("keyboard navigation", () => {
    it("allows keyboard navigation with ArrowUp and ArrowDown keys", () => {
      mockToggle("", () => ({}));

      render(<CustomSelectDropdown {...defaultProps} />);

      const dropdown = screen.queryByRole("combobox");

      fireEvent.keyDown(dropdown, { key: "ArrowDown" });
      fireEvent.keyDown(dropdown, { key: "ArrowDown" });

      expect(screen.getByText("Option 3").parentElement).toHaveClass(
        "highlight",
      );

      fireEvent.keyDown(dropdown, { key: "ArrowUp" });
      fireEvent.keyDown(dropdown, { key: "ArrowUp" });

      expect(screen.getByText("Option 1").parentElement).toHaveClass(
        "highlight",
      );
    });

    it("skips disabled options during navigation", () => {
      mockToggle("", () => ({}));

      const disabledOptions: CustomSelectOption[] = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2", disabled: true },
        { value: "3", label: "Option 3" },
      ];

      render(
        <CustomSelectDropdown {...defaultProps} options={disabledOptions} />,
      );

      const dropdown = screen.queryByRole("combobox");
      fireEvent.keyDown(dropdown, { key: "ArrowDown" });

      expect(screen.getByText("Option 3").parentElement).toHaveClass(
        "highlight",
      );
    });

    it("selects an option with Enter key", () => {
      mockToggle("", () => ({}));

      const onSelectMock = jest.fn();
      render(
        <CustomSelectDropdown {...defaultProps} onSelect={onSelectMock} />,
      );

      const dropdown = screen.queryByRole("combobox");

      fireEvent.keyDown(dropdown, { key: "ArrowDown" });
      fireEvent.keyDown(dropdown, { key: "ArrowDown" });
      fireEvent.keyDown(dropdown, { key: "Enter" });

      expect(onSelectMock).toHaveBeenCalledWith("3");
    });

    it("closes the dropdown with Escape or Tab key", () => {
      mockToggle("", () => ({}));

      const onCloseMock = jest.fn();
      render(<CustomSelectDropdown {...defaultProps} onClose={onCloseMock} />);

      const dropdown = screen.queryByRole("combobox");
      fireEvent.keyDown(dropdown, { key: "Escape" });
      fireEvent.keyDown(dropdown, { key: "Tab" });
      expect(onCloseMock).toHaveBeenCalledTimes(2);
    });
  });

  describe("getNearestParentsZIndex", () => {
    it("should return '0' if the element is not available", () => {
      const actual = getNearestParentsZIndex(null);
      expect(actual).toBe("0");
    });

    it("should return the element's z-index if it does not have a parent", () => {
      const div = document.createElement("div");
      div.style.zIndex = "5";
      document.body.appendChild(div);

      const actual = getNearestParentsZIndex(div);
      expect(actual).toBe("5");

      document.body.removeChild(div);
    });

    it("should return the z-index of the closest parent with a defined value", () => {
      const grandparent = document.createElement("div");
      grandparent.style.zIndex = "5";
      const parent = document.createElement("div");
      parent.style.zIndex = "auto";
      const child = document.createElement("div");
      child.style.zIndex = "auto";
      parent.appendChild(child);
      grandparent.appendChild(parent);
      document.body.appendChild(grandparent);

      const actual = getNearestParentsZIndex(child);
      expect(actual).toBe("5");

      document.body.removeChild(grandparent);
    });
  });
});
