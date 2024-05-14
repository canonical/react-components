import React from "react";
import { render, screen } from "@testing-library/react";
import type { HTMLProps } from "react";

import SideNavigationBase from "./SideNavigationBase";

it("displays an element", () => {
  const label = "Test content";
  render(<SideNavigationBase label={label} component="button" />);
  expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
});

it("can use a custom component", () => {
  const Link = ({ children, ...props }: HTMLProps<HTMLAnchorElement>) => (
    <a href="#test" {...props}>
      {children}
    </a>
  );
  const label = "Test content";
  render(<SideNavigationBase label={label} component={Link} />);
  expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
});

it("displays an icon", () => {
  render(
    <SideNavigationBase icon="user" label="Test content" component="button" />
  );
  expect(document.querySelector(".p-icon--user")).toBeInTheDocument();
});

it("displays a light icon", () => {
  render(
    <SideNavigationBase icon="user" label="Test content" component="button" />
  );
  expect(document.querySelector(".p-icon--user")).toHaveClass("is-light");
});

it("displays a dark icon", () => {
  render(
    <SideNavigationBase
      dark
      icon="user"
      label="Test content"
      component="button"
    />
  );
  expect(document.querySelector(".p-icon--user")).not.toHaveClass("is-light");
});
