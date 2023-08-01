import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "./Pagination";
import { Label as PaginationButtonLabel } from "./PaginationButton/PaginationButton";

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
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(".p-pagination__items")).toHaveClass(
      "u-align--center"
    );
  });

  it("should render default buttons-only pagination and match the snapshot", () => {
    render(<Pagination onForward={() => {}} onBack={() => {}} />);
    expect(screen.getByRole("navigation")).toMatchSnapshot();
  });

  it("should show default labels for buttons-only pagination", () => {
    render(<Pagination onForward={() => {}} onBack={() => {}} showLabels />);
    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(
      screen
        .getByRole("button", { name: /Previous page/ })
        // eslint-disable-next-line testing-library/no-node-access
        .querySelector("span")
    ).toHaveTextContent("Previous page");
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByRole("button", { name: /Next page/ }).querySelector("span")
    ).toHaveTextContent("Next page");
  });

  it("should show custom labels for buttons-only pagination", () => {
    render(
      <Pagination
        onForward={() => {}}
        onBack={() => {}}
        showLabels
        forwardLabel="Custom forward label"
        backLabel="Custom back label"
      />
    );
    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(
      screen
        .getByRole("button", { name: /Custom forward label/ })
        // eslint-disable-next-line testing-library/no-node-access
        .querySelector("span")
    ).toHaveTextContent("Custom forward label");
    expect(
      screen
        .getByRole("button", { name: /Custom back label/ })
        // eslint-disable-next-line testing-library/no-node-access
        .querySelector("span")
    ).toHaveTextContent("Custom back label");
  });
});
