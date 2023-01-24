import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "./Pagination";
import { Label as PaginationButtonLabel } from "./PaginationButton/PaginationButton";

describe("<Pagination />", () => {
  // snapshot tests
  it("renders and matches the snapshot", () => {
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
  it("renders no pagination with only a single page", () => {
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

  it("renders a simple paginator with back and forward arrows if only five pages or less", () => {
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

  it("renders a complex paginator with truncation if more than five pages", () => {
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

  it("does not render a truncation separator if currentPage is contiguous at start", () => {
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

  it("does not render a truncation separator if currentPage is contiguous at end", () => {
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

  it("does not trigger form submission on pagination button click by default", async () => {
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

  it("can be centered", () => {
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={1000}
        paginate={jest.fn()}
        currentPage={98}
        centered
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(".p-pagination")).toHaveClass(
      "u-align--center"
    );
  });
});
