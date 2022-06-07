import React from "react";

import { render, screen } from "@testing-library/react";

import NavigationLink from "./NavigationLink";

it("generates a standard anchor", () => {
  render(<NavigationLink link={{ label: "Go here", url: "/to/here" }} />);
  expect(
    screen.getByRole("link", {
      name: "Go here",
    })
  ).toBeInTheDocument();
});

it("generates a button", () => {
  render(<NavigationLink link={{ label: "Go here" }} />);
  expect(
    screen.getByRole("button", {
      name: "Go here",
    })
  ).toBeInTheDocument();
});

it("can select an anchor", () => {
  render(
    <NavigationLink
      link={{ isSelected: true, label: "Go here", url: "/to/here" }}
    />
  );
  expect(
    screen.getByRole("link", {
      name: "Go here",
    })
  ).toHaveAttribute("aria-current", "page");
});

it("generates a custom link", () => {
  render(
    <NavigationLink
      generateLink={({ label }) => <button>{label}</button>}
      link={{ label: "Go here", url: "/to/here" }}
    />
  );
  expect(
    screen.getByRole("button", {
      name: "Go here",
    })
  ).toBeInTheDocument();
});

it("can select a custom link", () => {
  render(
    <NavigationLink
      generateLink={({ label, ...props }) => (
        <button aria-current={props["aria-current"]}>{label}</button>
      )}
      link={{ isSelected: true, label: "Go here", url: "/to/here" }}
    />
  );
  expect(
    screen.getByRole("button", {
      name: "Go here",
    })
  ).toHaveAttribute("aria-current", "page");
});
