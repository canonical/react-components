import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import ColumnSelector, { Props as ColumnSelectorProps } from "./ColumnSelector";
import { MainTableHeader, MainTableRow } from "components/MainTable/MainTable";
import {
  visibleHeaderColumns,
  visibleRowColumns,
} from "./columnSelectorHelper";

// Child components are mocked here to test the ColumnSelector in isolation.
jest.mock("classnames", () =>
  jest.fn((...args) => args.filter(Boolean).join(" ")),
);

jest.mock("../Tooltip", () => {
  return ({
    children,
    message,
  }: {
    children: React.ReactElement;
    message: string;
  }) => (
    <div data-testid="tooltip">
      <div data-testid="tooltip-message">{message}</div>
      {children}
    </div>
  );
});

jest.mock("../ContextualMenu", () => {
  return ({
    children,
    title,
    toggleLabel,
  }: {
    children: React.ReactNode;
    title: string;
    toggleLabel: React.ReactNode;
  }) => (
    <div data-testid="contextual-menu">
      <div data-testid="contextual-menu-toggle">{toggleLabel}</div>
      <h1 data-testid="contextual-menu-title">{title}</h1>
      {children}
    </div>
  );
});

jest.mock("../Icon", () => {
  return ({ name }: { name: string }) => <span data-testid="icon">{name}</span>;
});

jest.mock("../CheckboxInput", () => {
  return ({
    label,
    checked,
    indeterminate,
    onChange,
    disabled,
    "aria-label": ariaLabel,
  }: {
    label: string;
    checked: boolean;
    indeterminate: boolean;
    onChange: () => void;
    disabled: boolean;
    "aria-label": string;
  }) => (
    <label>
      <input
        type="checkbox"
        aria-label={ariaLabel || label}
        checked={!!checked}
        data-indeterminate={indeterminate ? "true" : "false"}
        onChange={onChange}
        disabled={!!disabled}
      />
      {label}
    </label>
  );
});

describe("ColumnSelector", () => {
  const mockSetUserHidden = jest.fn();
  const defaultProps: ColumnSelectorProps = {
    columns: ["Name", "Status", "Role", "Last Seen"],
    userHidden: [],
    sizeHidden: [],
    setUserHidden: mockSetUserHidden,
  };

  beforeEach(() => {
    mockSetUserHidden.mockClear();
  });

  it("should render the toggle icon and menu title", () => {
    render(<ColumnSelector {...defaultProps} />);
    expect(screen.getByTestId("icon")).toHaveTextContent("settings");
    expect(screen.getByTestId("contextual-menu-title")).toHaveTextContent(
      "Columns",
    );
  });

  it("should display the correct count of selected columns in the main checkbox label", () => {
    render(<ColumnSelector {...defaultProps} userHidden={["Role"]} />);
    expect(
      screen.getByLabelText("3 out of 4 columns selected"),
    ).toBeInTheDocument();
  });

  it("should render a checkbox for each column", () => {
    render(<ColumnSelector {...defaultProps} />);
    defaultProps.columns.forEach((column) => {
      expect(screen.getByLabelText(column)).toBeInTheDocument();
    });
  });

  describe("Header Checkbox (Toggle All)", () => {
    it("should be checked when all columns are visible", () => {
      render(<ColumnSelector {...defaultProps} userHidden={[]} />);
      const mainCheckbox = screen.getByLabelText("4 out of 4 columns selected");
      expect(mainCheckbox).toBeChecked();
      expect(mainCheckbox.getAttribute("data-indeterminate")).toBe("false");
    });

    it("should be indeterminate when some columns are visible", () => {
      render(<ColumnSelector {...defaultProps} userHidden={["Name"]} />);
      const mainCheckbox = screen.getByLabelText("3 out of 4 columns selected");
      expect(mainCheckbox).not.toBeChecked();
      expect(mainCheckbox.getAttribute("data-indeterminate")).toBe("true");
    });

    it("should call setUserHidden with all columns (to hide all) when clicked while all are visible", () => {
      render(<ColumnSelector {...defaultProps} userHidden={[]} />);
      const mainCheckbox = screen.getByLabelText("4 out of 4 columns selected");
      fireEvent.click(mainCheckbox);
      expect(mockSetUserHidden).toHaveBeenCalledWith(defaultProps.columns);
    });

    it("should call setUserHidden with an empty array (to show all) when clicked while some columns are hidden", () => {
      render(
        <ColumnSelector {...defaultProps} userHidden={["Name", "Status"]} />,
      );
      const mainCheckbox = screen.getByLabelText("2 out of 4 columns selected");
      fireEvent.click(mainCheckbox);
      expect(mockSetUserHidden).toHaveBeenCalledWith([]);
    });
  });

  describe("Individual Column Checkboxes", () => {
    it("should be checked for a visible column and unchecked for a hidden one", () => {
      render(<ColumnSelector {...defaultProps} userHidden={["Role"]} />);
      expect(screen.getByLabelText("Name")).toBeChecked();
      expect(screen.getByLabelText("Role")).not.toBeChecked();
    });

    it("should call setUserHidden to hide a column when a visible column is clicked", () => {
      render(<ColumnSelector {...defaultProps} userHidden={[]} />);
      fireEvent.click(screen.getByLabelText("Role"));
      expect(mockSetUserHidden).toHaveBeenCalledWith(["Role"]);
    });

    it("should call setUserHidden to show a column when a hidden column is clicked", () => {
      render(
        <ColumnSelector {...defaultProps} userHidden={["Name", "Role"]} />,
      );
      fireEvent.click(screen.getByLabelText("Role"));
      // It should return the array without 'Role'
      expect(mockSetUserHidden).toHaveBeenCalledWith(["Name"]);
    });
  });

  describe("Size-Hidden Columns", () => {
    it("should disable the checkbox for a size-hidden column", () => {
      render(<ColumnSelector {...defaultProps} sizeHidden={["Last Seen"]} />);
      expect(screen.getByLabelText("Last Seen")).toBeDisabled();
      expect(screen.getByLabelText("Name")).not.toBeDisabled();
    });

    it("should wrap the size-hidden column in a Tooltip with the correct message", () => {
      render(<ColumnSelector {...defaultProps} sizeHidden={["Last Seen"]} />);
      const checkbox = screen.getByLabelText("Last Seen");

      // Check that the checkbox is inside a tooltip mock
      const tooltip = checkbox.closest('[data-testid="tooltip"]');
      expect(tooltip).toBeInTheDocument();

      // Check the content of the mocked tooltip message
      const messageElement = screen.getByTestId("tooltip-message");
      expect(messageElement).toHaveTextContent(
        /Screen is too narrow to fit the column/,
      );
      expect(messageElement).toHaveTextContent(
        /Disable columns above or use a bigger screen/,
      );
    });
  });
});

describe("visibleRowColumns", () => {
  const mockRows: MainTableRow[] = [
    {
      id: "row1",
      columns: [
        { "aria-label": "Name", content: "First" },
        { "aria-label": "Status", content: "Online" },
        { "aria-label": "Role", content: "Admin" },
      ],
    },
    {
      id: "row2",
      columns: [
        { "aria-label": "Name", content: "Second" },
        { "aria-label": "Status", content: "Offline" },
        { "aria-label": "Role", content: "User" },
      ],
    },
  ];

  it("should not remove any columns if hiddenCols is empty", () => {
    const result = visibleRowColumns(mockRows, []);
    expect(result).toEqual(mockRows);
  });

  it("should remove a single specified column from all rows", () => {
    const hiddenCols = ["Status"];
    const result = visibleRowColumns(mockRows, hiddenCols);

    expect(result[0].columns).toHaveLength(2);
    expect(
      result[0].columns.find((c) => c["aria-label"] === "Status"),
    ).toBeUndefined();
    expect(result[1].columns).toHaveLength(2);
    expect(
      result[1].columns.find((c) => c["aria-label"] === "Status"),
    ).toBeUndefined();
  });

  it("should remove multiple specified columns from all rows", () => {
    const hiddenCols = ["Name", "Role"];
    const result = visibleRowColumns(mockRows, hiddenCols);

    expect(result[0].columns).toHaveLength(1);
    expect(result[0].columns[0]["aria-label"]).toBe("Status");
    expect(result[1].columns).toHaveLength(1);
    expect(result[1].columns[0]["aria-label"]).toBe("Status");
  });

  it("should return rows unchanged if hidden columns are not found", () => {
    const hiddenCols = ["Location", "Last Seen"];
    const result = visibleRowColumns(mockRows, hiddenCols);
    expect(result).toEqual(mockRows);
  });

  it("should return an empty array if the input rows array is empty", () => {
    const result = visibleRowColumns([], ["Name"]);
    expect(result).toEqual([]);
  });

  it("should handle rows that have no columns", () => {
    const rowsWithEmptyColumns: MainTableRow[] = [{ id: "row3", columns: [] }];
    const result = visibleRowColumns(rowsWithEmptyColumns, ["Name"]);
    expect(result).toEqual(rowsWithEmptyColumns);
  });
});

describe("visibleHeaderColumns", () => {
  const mockHeaders: MainTableHeader[] = [
    { content: "Name", sortKey: "Name" },
    { content: "Status", sortKey: "Status" },
    { content: "Role", sortKey: "Role" },
    { content: <button>Actions</button>, sortKey: "actions" },
  ];

  it("should not filter any headers if hiddenCols is empty", () => {
    const result = visibleHeaderColumns(mockHeaders, []);
    expect(result).toEqual(mockHeaders);
  });

  it("should filter out a single specified header", () => {
    const hiddenCols = ["Status"];
    const result = visibleHeaderColumns(mockHeaders, hiddenCols);
    expect(result).toHaveLength(3);
    expect(result.find((h) => h.content === "Status")).toBeUndefined();
  });

  it("should filter out multiple specified headers", () => {
    const hiddenCols = ["Name", "Role"];
    const result = visibleHeaderColumns(mockHeaders, hiddenCols);
    expect(result).toHaveLength(2);
    expect(result.map((h) => h.content)).not.toContain("Name");
    expect(result.map((h) => h.content)).not.toContain("Role");
  });

  it("should never filter headers where content is not a string", () => {
    const hiddenCols = ["Name", "Status", "Role", "actions"];
    const result = visibleHeaderColumns(mockHeaders, hiddenCols);
    expect(result).toHaveLength(1);
    expect(typeof result[0].content).toBe("object");
  });

  it("should return headers unchanged if hidden columns are not found", () => {
    const hiddenCols = ["Location", "IP Address"];
    const result = visibleHeaderColumns(mockHeaders, hiddenCols);
    expect(result).toEqual(mockHeaders);
  });

  it("should return an empty array if the input headers array is empty", () => {
    const result = visibleHeaderColumns([], ["Name"]);
    expect(result).toEqual([]);
  });
});
