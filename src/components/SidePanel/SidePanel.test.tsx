import React from "react";
import { render, screen } from "@testing-library/react";

import SidePanel from "./SidePanel";

it("renders", () => {
  render(<SidePanel>SidePanel</SidePanel>);
  expect(screen.getByText("SidePanel")).toBeInTheDocument();
});

it("applies className", () => {
  render(<SidePanel className="test-class">SidePanel</SidePanel>);
  expect(screen.getByText("SidePanel")).toHaveClass("test-class");
});

it("displays as loading", () => {
  render(<SidePanel loading>SidePanel</SidePanel>);
  expect(screen.getByText("Loading")).toBeInTheDocument();
  expect(screen.queryByText("SidePanel")).not.toBeInTheDocument();
});

it("displays with error", () => {
  render(<SidePanel hasError>SidePanel</SidePanel>);
  expect(screen.getByText("Loading failed")).toBeInTheDocument();
  expect(screen.queryByText("SidePanel")).not.toBeInTheDocument();
});

it("displays as pinned", () => {
  render(<SidePanel pinned>SidePanel</SidePanel>);
  expect(screen.getByText("SidePanel")).toHaveClass("is-pinned");
});

it("displays as wide", () => {
  render(<SidePanel wide>SidePanel</SidePanel>);
  expect(screen.getByText("SidePanel")).toHaveClass("is-wide");
});

it("assembles complex structure", () => {
  render(
    <SidePanel>
      <SidePanel.Sticky>
        <SidePanel.Header>
          <SidePanel.HeaderTitle>Edit panel</SidePanel.HeaderTitle>
        </SidePanel.Header>
      </SidePanel.Sticky>
      <SidePanel.Content className="u-no-padding">
        <p>Here be dragons!</p>
      </SidePanel.Content>
      <SidePanel.Sticky position="bottom">
        <SidePanel.Footer className="u-align--right">
          Footer content
        </SidePanel.Footer>
      </SidePanel.Sticky>
    </SidePanel>,
  );
  expect(
    screen.getByText("Here be dragons!").parentElement.parentElement,
  ).toMatchSnapshot();
});
