import { render, screen, fireEvent } from "@testing-library/react";
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
});
