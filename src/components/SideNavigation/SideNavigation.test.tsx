import React from "react";
import { render, screen } from "@testing-library/react";
import type { ButtonHTMLAttributes } from "react";

import SideNavigation from "./SideNavigation";

const Link = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} />
);

it("displays content", () => {
  render(<SideNavigation>Content</SideNavigation>);
  expect(screen.getByText("Content")).toBeInTheDocument();
});

it("displays a single list of links", () => {
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
    />
  );
  expect(screen.getAllByRole("list")).toHaveLength(1);
});

it("displays multiple lists of links", () => {
  render(
    <SideNavigation
      items={[
        [
          {
            label: "Link one",
            href: "#",
          },
          {
            label: "Link two",
            href: "#",
          },
        ],
        null,
        [
          {
            label: "Link three",
            href: "#",
          },
          {
            label: "Link four",
            href: "#",
          },
        ],
      ]}
    />
  );
  expect(screen.getAllByRole("list")).toHaveLength(2);
});

it("can apply props to the list elements", () => {
  render(
    <SideNavigation
      listClassName="custom-list-class-one"
      items={[
        {
          className: "custom-list-class-two",
          items: [
            {
              label: "Link one",
              href: "#",
            },
            {
              label: "Link two",
              href: "#",
            },
          ],
        },
      ]}
    />
  );
  expect(screen.getByRole("list")).toHaveClass("custom-list-class-one");
  expect(screen.getByRole("list")).toHaveClass("custom-list-class-two");
});

it("can display text items", () => {
  render(
    <SideNavigation
      items={[
        {
          label: "Link one",
          href: "#",
        },
        {
          nonInteractive: true,
          label: "Text one",
        },
      ]}
    />
  );
  expect(screen.getByRole("link", { name: "Link one" })).toBeInTheDocument();
  expect(screen.getByText("Text one")).toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "Text one" })
  ).not.toBeInTheDocument();
});

it("can display custom elements", () => {
  render(
    <SideNavigation
      items={[
        {
          label: "Link one",
          href: "#",
        },
        <button onClick={jest.fn()}>Hello</button>,
      ]}
    />
  );
  expect(screen.getByRole("button", { name: "Hello" })).toBeInTheDocument();
});

it("displays links by default", () => {
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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
  );
  expect(container.firstChild).toHaveClass("p-side-navigation--icons");
});
