import React from "react";
import { render, screen } from "@testing-library/react";
import type { ButtonHTMLAttributes } from "react";

import SideNavigation from "./SideNavigation";

const Link = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} />
);

it("displays links", () => {
  render(
    <SideNavigation
      items={[
        {
          label: "Link one",
          href: "#",
        },
        {
          label: "Link two",
          href: "#",
        },
      ]}
    />,
  );
  expect(screen.getByRole("link", { name: "Link one" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Link two" })).toBeInTheDocument();
});

it("displays links using a custom component", () => {
  render(
    <SideNavigation
      items={[
        {
          label: "Link one",
        },
        <Link>Link two</Link>,
      ]}
      linkComponent={Link}
    />,
  );
  expect(screen.getByRole("button", { name: "Link one" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Link two" })).toBeInTheDocument();
});

it("displays a mix of links and custom components", () => {
  render(
    <SideNavigation
      items={[
        {
          label: "Link one",
          href: "#",
        },
        <Link>Link two</Link>,
      ]}
    />,
  );
  expect(screen.getByRole("link", { name: "Link one" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Link two" })).toBeInTheDocument();
});

it("sets components per link", () => {
  render(
    <SideNavigation
      items={[
        {
          label: "Link one",
          component: Link,
        },
        {
          label: "Link two",
          component: "h1",
        },
      ]}
    />,
  );
  expect(screen.getByRole("button", { name: "Link one" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Link two" })).toBeInTheDocument();
});

it("sets icons", () => {
  const { container } = render(
    <SideNavigation
      hasIcons
      items={[
        {
          label: "Link one",
        },
      ]}
    />,
  );
  expect(container.firstChild).toHaveClass("p-side-navigation--icons");
});

it("automatically determines if icon class should be applied", () => {
  const { container } = render(
    <SideNavigation
      items={[
        {
          label: "Link one",
          href: "#",
          icon: "user",
        },
      ]}
    />,
  );
  expect(container.firstChild).toHaveClass("p-side-navigation--icons");
});
