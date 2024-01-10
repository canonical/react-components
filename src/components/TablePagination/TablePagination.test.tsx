/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TablePagination from "./TablePagination";
import userEvent from "@testing-library/user-event";

const dummyData = [
  { id: "row-1" },
  { id: "row-2" },
  { id: "row-3" },
  { id: "row-4" },
  { id: "row-5" },
];

describe("<TablePagination />", () => {
  // snapshot tests
  it("renders table pagination and matches the snapshot", () => {
    render(<TablePagination data={dummyData} />);

    expect(screen.getByRole("navigation")).toMatchSnapshot();
  });

  // unit tests
  it("renders default display title correctly when no pagination takes place", () => {
    render(<TablePagination data={dummyData} />);

    expect(screen.getByRole("navigation")).toHaveTextContent(
      "Showing all 5 items"
    );
  });

  it("renders default display title correctly when pagination takes place", () => {
    render(<TablePagination data={dummyData} pageLimits={[1]} />);

    expect(screen.getByRole("navigation")).toHaveTextContent(
      "Showing 1 out of 5 items"
    );
  });

  it("has correct per page setting when changed", () => {
    render(<TablePagination data={dummyData} pageLimits={[2, 5, 10]} />);

    expect(screen.getByRole("navigation")).toHaveTextContent("2/page");
    userEvent.selectOptions(
      screen.getByRole("combobox", { name: "Items per page" }),
      "5"
    );
    expect(screen.getByRole("navigation")).toHaveTextContent("5/page");
  });

  it("resets to first page when page size is changed", () => {
    render(<TablePagination data={dummyData} pageLimits={[2, 5, 10]} />);

    expect(screen.getByRole("navigation")).toHaveTextContent("2/page");
    userEvent.selectOptions(
      screen.getByRole("combobox", { name: "Items per page" }),
      "5"
    );
    const currentPageInput = screen.getByRole("spinbutton", {
      name: "Page number",
    });
    expect(currentPageInput).toHaveValue(1);
  });

  it("should paginate correctly in incrementing or decrementing directions", async () => {
    render(<TablePagination data={dummyData} pageLimits={[1, 2, 5]} />);
    const incButton = screen.getByRole("button", { name: "Next page" });
    const decButton = screen.getByRole("button", { name: "Previous page" });
    const currentPageInput = screen.getByRole("spinbutton", {
      name: "Page number",
    });
    const pageSizeSelector = screen.getByRole("combobox", {
      name: "Items per page",
    });

    expect(currentPageInput).toHaveValue(1);
    await userEvent.click(decButton);
    expect(currentPageInput).toHaveValue(1);
    await userEvent.click(incButton);
    expect(currentPageInput).toHaveValue(2);
    await userEvent.selectOptions(pageSizeSelector, "2");
    expect(currentPageInput).toHaveValue(1);
    await fireEvent.change(currentPageInput, { target: { value: 3 } });
    expect(currentPageInput).toHaveValue(3);
    await userEvent.click(incButton);
    expect(currentPageInput).toHaveValue(3);
    await userEvent.click(decButton);
    expect(currentPageInput).toHaveValue(2);
  });
});
