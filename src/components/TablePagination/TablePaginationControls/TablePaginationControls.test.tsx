/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";

import TablePaginationControls from "./TablePaginationControls";

describe("<TablePaginationControls />", () => {
  // snapshot tests
  it("renders table pagination controls and matches the snapshot", () => {
    render(
      <TablePaginationControls
        onPageChange={jest.fn()}
        currentPage={1}
        totalPages={50}
      />
    );

    expect(screen.getAllByRole("button")).toMatchSnapshot();
    expect(screen.getByRole("spinbutton")).toMatchSnapshot();
  });
});
