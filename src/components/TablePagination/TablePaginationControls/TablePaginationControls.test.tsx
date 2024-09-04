import React from "react";
import { render, screen } from "@testing-library/react";

import TablePaginationControls from "./TablePaginationControls";
import userEvent from "@testing-library/user-event";
import { Label } from "./TablePaginationControls";

describe("<TablePaginationControls />", () => {
  // snapshot tests
  it("renders table pagination controls and matches the snapshot", () => {
    render(
      <TablePaginationControls
        visibleCount={5}
        itemName="item"
        pageLimits={[20, 50, 100]}
        totalItems={100}
        currentPage={0}
        pageSize={20}
        onPageChange={jest.fn()}
        onPageSizeChange={jest.fn()}
      />,
    );

    expect(screen.getAllByRole("button")).toMatchSnapshot();
    expect(screen.getByRole("spinbutton")).toMatchSnapshot();
  });

  it("can go to the next page", async () => {
    const onPageChange = jest.fn();
    const onNextPage = jest.fn();
    render(
      <TablePaginationControls
        visibleCount={5}
        itemName="item"
        pageLimits={[20, 50, 100]}
        totalItems={100}
        currentPage={2}
        pageSize={20}
        onPageChange={onPageChange}
        onNextPage={onNextPage}
        onPageSizeChange={jest.fn()}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: Label.NEXT_PAGE }),
    );
    expect(onPageChange).toHaveBeenCalledWith(3);
    expect(onNextPage).toHaveBeenCalledWith(3);
  });

  it("can go to the previous page", async () => {
    const onPageChange = jest.fn();
    const onPreviousPage = jest.fn();
    render(
      <TablePaginationControls
        visibleCount={5}
        itemName="item"
        pageLimits={[20, 50, 100]}
        totalItems={100}
        currentPage={2}
        pageSize={20}
        onPageChange={onPageChange}
        onPreviousPage={onPreviousPage}
        onPageSizeChange={jest.fn()}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: Label.PREVIOUS_PAGE }),
    );
    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(onPreviousPage).toHaveBeenCalledWith(1);
  });

  it("can set the page using the input", async () => {
    const onInputPageChange = jest.fn();
    render(
      <TablePaginationControls
        visibleCount={5}
        itemName="item"
        pageLimits={[20, 50, 100]}
        totalItems={100}
        currentPage={2}
        pageSize={20}
        onPageChange={jest.fn()}
        onPreviousPage={jest.fn()}
        onPageSizeChange={jest.fn()}
        onInputPageChange={onInputPageChange}
      />,
    );
    await userEvent.type(
      screen.getByRole("spinbutton", { name: Label.PAGE_NUMBER }),
      "1",
    );
    expect(onInputPageChange).toHaveBeenCalledWith(21);
  });

  it("can hide the page input", async () => {
    render(
      <TablePaginationControls
        visibleCount={5}
        itemName="item"
        pageLimits={[20, 50, 100]}
        totalItems={100}
        currentPage={2}
        pageSize={20}
        onPageChange={jest.fn()}
        onPreviousPage={jest.fn()}
        onPageSizeChange={jest.fn()}
        showPageInput={false}
      />,
    );
    expect(
      screen.queryByRole("spinbutton", { name: Label.PAGE_NUMBER }),
    ).not.toBeInTheDocument();
  });

  it("can display the description", async () => {
    render(
      <TablePaginationControls
        visibleCount={5}
        itemName="item"
        pageLimits={[20, 50, 100]}
        totalItems={100}
        currentPage={2}
        pageSize={20}
        onPageChange={jest.fn()}
        onPreviousPage={jest.fn()}
        onPageSizeChange={jest.fn()}
        showPageInput={false}
      />,
    );
    expect(document.querySelector(".description")?.textContent).toBe(
      "Showing 5 out of 100 items",
    );
  });

  it("can hide the description", async () => {
    render(
      <TablePaginationControls
        visibleCount={5}
        itemName="item"
        pageLimits={[20, 50, 100]}
        totalItems={100}
        currentPage={2}
        pageSize={20}
        onPageChange={jest.fn()}
        onPreviousPage={jest.fn()}
        onPageSizeChange={jest.fn()}
        displayDescription={false}
      />,
    );
    expect(
      document.querySelector(".description")?.textContent,
    ).not.toBeUndefined();
  });
});
