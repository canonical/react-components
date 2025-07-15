import React from "react";
import { render, screen } from "@testing-library/react";

import ScrollableTable from "./ScrollableTable";
import { MainTable } from "../../index";

const headers = [{ content: "Fact" }];
const rows = [
  {
    columns: [{ content: "foo" }],
  },
];

it("renders", () => {
  render(
    <ScrollableTable dependencies={[]} tableId="test-table">
      <MainTable headers={headers} rows={rows} id="test-table" />
    </ScrollableTable>,
  );
  expect(screen.getByText("Fact")).toBeInTheDocument();
});

it("respects above spacing", () => {
  render(
    <div role="main">
      <h1>Above</h1>
      <ScrollableTable dependencies={[]} tableId="test-table">
        <MainTable headers={headers} rows={rows} id="test-table" />
      </ScrollableTable>
    </div>,
  );
  expect(screen.getByRole("main")).toMatchSnapshot();
});

it("respects below spacing", () => {
  render(
    <div role="main">
      <h1>Above</h1>
      <ScrollableTable
        dependencies={[]}
        belowIds={["footer"]}
        tableId="test-table"
      >
        <MainTable headers={headers} rows={rows} id="test-table" />
      </ScrollableTable>
      <div id="footer">
        <h2>Below</h2>
      </div>
    </div>,
  );
  expect(screen.getByRole("main")).toMatchSnapshot();
});
