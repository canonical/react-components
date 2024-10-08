import React from "react";
import { render, screen } from "@testing-library/react";

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
  render(<SideNavigationLink dark icon="user" label="Test content" />);
  expect(document.querySelector(".p-icon--user")).toHaveClass("is-light");
});

it("displays a dark icon", () => {
  render(<SideNavigationLink dark={false} icon="user" label="Test content" />);
  expect(document.querySelector(".p-icon--user")).not.toHaveClass("is-light");
});

it("can use a custom link component", () => {
  const label = "Test content";
  const Link = ({ to, ...props }: { to: () => void }) => (
    <button {...props} onClick={to}>
      {label}
    </button>
  );
  render(<SideNavigationLink label={label} component={Link} to={jest.fn()} />);
  expect(screen.getByRole("button", { name: label })).toHaveClass(
    "p-side-navigation__link",
  );
});

it("gets the ref and checks if it can be used to get the element's position", () => {
  const ref = React.createRef<HTMLAnchorElement>();
  render(
    <SideNavigationLink
      label="Test content"
      onClick={jest.fn()}
      forwardRef={ref}
    />,
  );
  expect(ref.current?.getBoundingClientRect()).toBeDefined();
});
