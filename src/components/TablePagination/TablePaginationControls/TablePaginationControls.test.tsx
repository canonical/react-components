/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";

import TablePaginationControls from "./TablePaginationControls";

const dummyData = [
  { id: "row-1" },
  { id: "row-2" },
  { id: "row-3" },
  { id: "row-4" },
  { id: "row-5" },
];

describe("<TablePaginationControls />", () => {
  // snapshot tests
  it("renders table pagination controls and matches the snapshot", () => {
    render(
      <TablePaginationControls
        data={dummyData}
        itemName="item"
        pageLimits={[20, 50, 100]}
        totalItems={100}
        currentPage={0}
        pageSize={20}
        onPageChange={jest.fn()}
        onPageSizeChange={jest.fn()}
      />
    );

    expect(screen.getAllByRole("button")).toMatchSnapshot();
    expect(screen.getByRole("spinbutton")).toMatchSnapshot();
  });
});
