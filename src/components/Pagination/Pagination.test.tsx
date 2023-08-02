/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "./Pagination";
import { Label as PaginationButtonLabel } from "./PaginationButton/PaginationButton";
import { CustomLabel as CustomButtonLabel } from "./PaginationButton/PaginationButton.test";

describe("<Pagination />", () => {
  // snapshot tests
  it("renders numbered pagination and matches the snapshot", () => {
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={50}
        paginate={jest.fn()}
        currentPage={1}
      />
    );

    expect(screen.getByRole("navigation")).toMatchSnapshot();
  });

  // unit tests
  it("renders no numbered pagination with only a single page", () => {
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={5}
        paginate={jest.fn()}
        currentPage={1}
      />
    );

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders a simple numbered paginator with back and forward arrows if only five pages or less", () => {
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={50}
        paginate={jest.fn()}
        currentPage={1}
      />
    );

    expect(
      screen.queryByRole("listitem", { name: "…" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: PaginationButtonLabel.Next })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: PaginationButtonLabel.Previous })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
  });

  it("renders a complex numbered paginator with truncation if more than five pages", () => {
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={1000}
        paginate={jest.fn()}
        currentPage={5}
      />
    );

    expect(screen.getAllByText("…")).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: PaginationButtonLabel.Next })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: PaginationButtonLabel.Previous })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "6" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "100" })).toBeInTheDocument();
  });

  it("does not render a truncation separator for numbered pagination if currentPage is contiguous at start", () => {
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={1000}
        paginate={jest.fn()}
        currentPage={2}
      />
    );

    // There should only be one ellipsis.
    expect(screen.getAllByText("…")).toHaveLength(1);
  });

  it("does not render a truncation separator for numbered pagination if currentPage is contiguous at end", () => {
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={1000}
        paginate={jest.fn()}
        currentPage={98}
      />
    );

    // There should only be one ellipsis.
    expect(screen.getAllByText("…")).toHaveLength(1);
  });

  it("does not trigger form submission on numbered pagination button click by default", async () => {
    const handleOnSubmit = jest.fn();
    render(
      <form onSubmit={handleOnSubmit}>
        <Pagination
          itemsPerPage={10}
          totalItems={1000}
          paginate={jest.fn()}
          currentPage={98}
        />
      </form>
    );

    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    await userEvent.click(screen.getByRole("button", { name: "99" }));
    expect(handleOnSubmit).not.toHaveBeenCalled();
  });

  it("should center the numbered pagination", () => {
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={1000}
        paginate={jest.fn()}
        currentPage={98}
        centered
      />
    );
    expect(document.querySelector(".p-pagination__items")).toHaveClass(
      "u-align--center"
    );
  });

  it("should show default labels in correct order for numbered pagination", () => {
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={50}
        paginate={jest.fn()}
        currentPage={1}
        showLabels
      />
    );
    const previousButton = screen.getByRole("button", {
      name: new RegExp(PaginationButtonLabel.Previous),
    });
    expect(previousButton.querySelector("span")).toHaveTextContent(
      PaginationButtonLabel.Previous
    );
    const nextButton = screen.getByRole("button", {
      name: new RegExp(PaginationButtonLabel.Next),
    });
    expect(nextButton.querySelector("span")).toHaveTextContent(
      PaginationButtonLabel.Next
    );
    expect(
      previousButton &&
        nextButton &&
        previousButton.compareDocumentPosition(nextButton) &
          Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("should show custom labels in correct order for numbered pagination", () => {
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={50}
        paginate={jest.fn()}
        currentPage={1}
        showLabels
        forwardLabel={CustomButtonLabel.Next}
        backLabel={CustomButtonLabel.Previous}
      />
    );
    const previousButton = screen.getByRole("button", {
      name: new RegExp(CustomButtonLabel.Previous),
    });
    expect(previousButton.querySelector("span")).toHaveTextContent(
      CustomButtonLabel.Previous
    );
    const nextButton = screen.getByRole("button", {
      name: new RegExp(CustomButtonLabel.Next),
    });
    expect(nextButton.querySelector("span")).toHaveTextContent(
      CustomButtonLabel.Next
    );
    expect(
      previousButton &&
        nextButton &&
        previousButton.compareDocumentPosition(nextButton) &
          Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("should have forward and back buttons disabled for numbered pagination", () => {
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={50}
        paginate={jest.fn()}
        currentPage={1}
        forwardDisabled
        backDisabled
      />
    );
    expect(
      screen.getByRole("button", {
        name: PaginationButtonLabel.Next,
      })
    ).toBeDisabled();
    expect(
      screen.getByRole("button", {
        name: PaginationButtonLabel.Previous,
      })
    ).toBeDisabled();
  });

  it("should call paginate and onForward for numbered pagination when pressing forward button", async () => {
    const mockHandlePaginate = jest.fn();
    const mockHandleForward = jest.fn();
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={50}
        paginate={mockHandlePaginate}
        currentPage={1}
        onForward={mockHandleForward}
      />
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: new RegExp(PaginationButtonLabel.Next),
      })
    );
    expect(mockHandlePaginate).toHaveBeenCalledTimes(1);
    expect(mockHandlePaginate).toHaveBeenCalledWith(2);
    expect(mockHandleForward).toHaveBeenCalledTimes(1);
    expect(mockHandleForward).toHaveBeenCalledWith(2);
  });

  it("should call paginate and onBack for numbered pagination when pressing back button", async () => {
    const mockHandlePaginate = jest.fn();
    const mockHandleBack = jest.fn();
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={50}
        paginate={mockHandlePaginate}
        currentPage={2}
        onBack={mockHandleBack}
      />
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: new RegExp(PaginationButtonLabel.Previous),
      })
    );
    expect(mockHandlePaginate).toHaveBeenCalledTimes(1);
    expect(mockHandlePaginate).toHaveBeenCalledWith(1);
    expect(mockHandleBack).toHaveBeenCalledTimes(1);
    expect(mockHandleBack).toHaveBeenCalledWith(1);
  });

  it("should hide numbers for numbered pagination", () => {
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={50}
        paginate={jest.fn()}
        currentPage={2}
        hideNumbers
      />
    );
    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(
      screen.getByRole("button", {
        name: new RegExp(PaginationButtonLabel.Next),
      })
    ).toBeVisible();
    expect(
      screen.getByRole("button", {
        name: new RegExp(PaginationButtonLabel.Previous),
      })
    ).toBeVisible();
  });

  it("should render default buttons-only pagination and match the snapshot", () => {
    render(<Pagination onForward={jest.fn()} onBack={jest.fn()} />);
    expect(screen.getByRole("navigation")).toMatchSnapshot();
  });

  it("should center the buttons-only pagination", () => {
    render(<Pagination onForward={jest.fn()} onBack={jest.fn()} centered />);
    expect(document.querySelector(".p-pagination__items")).toHaveClass(
      "u-align--center"
    );
  });

  it("should show default labels for buttons-only pagination", () => {
    render(<Pagination onForward={jest.fn()} onBack={jest.fn()} showLabels />);
    const previousButton = screen.getByRole("button", {
      name: new RegExp(PaginationButtonLabel.Previous),
    });
    expect(previousButton.querySelector("span")).toHaveTextContent(
      PaginationButtonLabel.Previous
    );
    const nextButton = screen.getByRole("button", {
      name: new RegExp(PaginationButtonLabel.Next),
    });
    expect(nextButton.querySelector("span")).toHaveTextContent(
      PaginationButtonLabel.Next
    );
    expect(
      previousButton &&
        nextButton &&
        previousButton.compareDocumentPosition(nextButton) &
          Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("should show custom labels in correct order for buttons-only pagination", () => {
    render(
      <Pagination
        onForward={jest.fn()}
        onBack={jest.fn()}
        showLabels
        forwardLabel={CustomButtonLabel.Next}
        backLabel={CustomButtonLabel.Previous}
      />
    );
    const previousButton = screen.getByRole("button", {
      name: new RegExp(CustomButtonLabel.Previous),
    });
    expect(previousButton.querySelector("span")).toHaveTextContent(
      CustomButtonLabel.Previous
    );
    const nextButton = screen.getByRole("button", {
      name: new RegExp(CustomButtonLabel.Next),
    });
    expect(nextButton.querySelector("span")).toHaveTextContent(
      CustomButtonLabel.Next
    );
    expect(
      previousButton &&
        nextButton &&
        previousButton.compareDocumentPosition(nextButton) &
          Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("should have forward and back buttons disabled for buttons-only pagination", () => {
    render(
      <Pagination
        onForward={jest.fn()}
        onBack={jest.fn()}
        backDisabled
        forwardDisabled
      />
    );
    expect(
      screen.getByRole("button", {
        name: PaginationButtonLabel.Next,
      })
    ).toBeDisabled();
    expect(
      screen.getByRole("button", {
        name: PaginationButtonLabel.Previous,
      })
    ).toBeDisabled();
  });

  it("should call onForward for buttons-only pagination when pressing forward button", async () => {
    const mockHandleForward = jest.fn();
    render(<Pagination onForward={mockHandleForward} onBack={jest.fn()} />);
    await userEvent.click(
      screen.getByRole("button", {
        name: new RegExp(PaginationButtonLabel.Next),
      })
    );
    expect(mockHandleForward).toHaveBeenCalledTimes(1);
  });

  it("should call onBack for buttons-only pagination when pressing back button", async () => {
    const mockHandleBack = jest.fn();
    render(<Pagination onForward={jest.fn()} onBack={mockHandleBack} />);
    await userEvent.click(
      screen.getByRole("button", {
        name: new RegExp(PaginationButtonLabel.Previous),
      })
    );
    expect(mockHandleBack).toHaveBeenCalledTimes(1);
  });
});
