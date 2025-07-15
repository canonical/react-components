import React from "react";
import { render, screen } from "@testing-library/react";

import ScrollableContainer from "./ScrollableContainer";

it("renders", () => {
  render(
    <ScrollableContainer dependencies={[]}>
      Scrollable contents
    </ScrollableContainer>,
  );
  expect(screen.getByText("Scrollable contents")).toBeInTheDocument();
});

it("respects above spacing", () => {
  render(
    <div role="main">
      <h1>Above</h1>
      <ScrollableContainer dependencies={[]}>
        Scrollable contents
      </ScrollableContainer>
    </div>,
  );
  expect(screen.getByRole("main")).toMatchSnapshot();
});

it("respects below spacing", () => {
  render(
    <div role="main">
      <h1>Above</h1>
      <ScrollableContainer dependencies={[]} belowIds={["footer"]}>
        Scrollable contents
      </ScrollableContainer>
      <div id="footer">
        <h2>Below</h2>
      </div>
    </div>,
  );
  expect(screen.getByRole("main")).toMatchSnapshot();
});
