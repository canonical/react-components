import { render, screen, fireEvent, within } from "@testing-library/react";
import CustomSelect from "./CustomSelect";
import { CustomSelectOption } from "./CustomSelectDropdown";
import React from "react";

// Global mocks
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("CustomSelect", () => {
  const mockOnChange = jest.fn();
  const options: CustomSelectOption[] = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    {
      value: "3",
      label: "Option 3",
      selectedLabel: "Selected label of 3",
    },
    {
      value: "4",
      label: "Option 4",
      selectedLabel: (
        <span data-testid="selected-label-test-id">🇯🇵 Selected label of 4</span>
      ),
    },
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    render(
      <CustomSelect
        data-testid="test-select"
        name="test-select"
        label="Test Select"
        options={options}
        value="1"
        onChange={mockOnChange}
      />,
    );
    expect(screen.getByTestId("test-select")).toMatchSnapshot();
  });

  it("renders the CustomSelectDropdown when clicked", () => {
    render(
      <CustomSelect
        name="test-select"
        options={options}
        value="1"
        onChange={mockOnChange}
      />,
    );

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    options.forEach((option) => {
      expect(
        screen.getByRole("option", { name: option.label as string }),
      ).toBeInTheDocument();
    });
  });

  it("calls onChange when an option is selected and closes the dropdown", () => {
    render(
      <CustomSelect
        name="test-select"
        options={options}
        value="1"
        onChange={mockOnChange}
      />,
    );

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);
    fireEvent.click(screen.getByRole("option", { name: "Option 2" }));

    expect(mockOnChange).toHaveBeenCalledWith("2");
    const option = screen.queryByRole("option", { name: "Option 2" });
    expect(option).not.toBeInTheDocument();
  });

  it("should display the default placeholder when no option is selected", () => {
    render(<CustomSelect options={options} value={null} onChange={() => {}} />);
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("should allow customizing the placeholder when no option is selected", () => {
    render(
      <CustomSelect
        options={options}
        defaultToggleLabel="Custom label"
        value={null}
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("Custom label")).toBeInTheDocument();
  });

  it("should display the standard label when selected option has no selectedLabel", () => {
    render(<CustomSelect options={options} value="1" onChange={() => {}} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("should display the selectedLabel when the selected option has one", () => {
    render(<CustomSelect options={options} value="3" onChange={() => {}} />);
    expect(screen.getByText("Selected label of 3")).toBeInTheDocument();
    expect(screen.queryByText("Option 3")).not.toBeInTheDocument();
  });

  it("should correctly display a React element provided as a selectedLabel", () => {
    render(<CustomSelect options={options} value="4" onChange={() => {}} />);

    const span = screen.getByTestId("selected-label-test-id");
    expect(
      within(span).getByText("🇯🇵 Selected label of 4"),
    ).toBeInTheDocument();
  });

  it("should update the displayed label when the selection changes", () => {
    const { rerender } = render(
      <CustomSelect
        options={options}
        value="1" // Initially selected
        onChange={() => {}}
      />,
    );

    expect(screen.getByText("Option 1")).toBeInTheDocument();

    rerender(
      <CustomSelect
        options={options}
        value="3" // New selection
        onChange={() => {}}
      />,
    );

    expect(screen.getByText("Selected label of 3")).toBeInTheDocument();
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });
});
