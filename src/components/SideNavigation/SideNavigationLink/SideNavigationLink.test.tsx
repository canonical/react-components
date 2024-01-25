import React from "react";
import { render, screen } from "@testing-library/react";
import type { ButtonHTMLAttributes } from "react";

import SideNavigationLink from "./SideNavigationLink";

it("displays a link", () => {
  const label = "Test content";
  render(<SideNavigationLink label={label} href="#" />);
  expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
});

it("can apply additional classes", () => {
  const label = "Test content";
  render(<SideNavigationLink label={label} href="#" className="extra-class" />);
  expect(screen.getByRole("link", { name: label })).toHaveClass("extra-class");
});

it("displays an icon", () => {
  render(<SideNavigationLink icon="user" label="Test content" />);
  expect(document.querySelector(".p-icon--user")).toBeInTheDocument();
});

it("displays a light icon", () => {
  render(<SideNavigationLink icon="user" label="Test content" />);
  expect(document.querySelector(".p-icon--user")).toHaveClass("is-light");
});

it("displays a dark icon", () => {
  render(<SideNavigationLink dark icon="user" label="Test content" />);
  expect(document.querySelector(".p-icon--user")).not.toHaveClass("is-light");
});

it("can use a custom link component", () => {
  const Link = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} />
  );
  const label = "Test content";
  render(<SideNavigationLink label={label} component={Link} />);
  expect(screen.getByRole("button", { name: label })).toHaveClass(
    "p-side-navigation__link",
  );
});
