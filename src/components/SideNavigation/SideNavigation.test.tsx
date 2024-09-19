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
    />,
  );
  expect(screen.getByRole("list")).toHaveClass("custom-list-class-one");
  expect(screen.getByRole("list")).toHaveClass("custom-list-class-two");
});

it("can display text items", () => {
  render(
    <SideNavigation
      items={[
        {
          items: [
            {
              label: "Link one",
              href: "#",
            },
            {
              nonInteractive: true,
              label: "Text one",
            },
          ],
        },
      ]}
    />,
  );
  expect(screen.getByRole("link", { name: "Link one" })).toBeInTheDocument();
  expect(screen.getByText("Text one")).toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "Text one" }),
  ).not.toBeInTheDocument();
});

it("can display custom elements", () => {
  render(
    <SideNavigation
      items={[
        {
          items: [
            {
              label: "Link one",
              href: "#",
            },
            <button key="button" onClick={jest.fn()}>
              Hello
            </button>,
          ],
        },
      ]}
    />,
  );
  expect(screen.getByRole("button", { name: "Hello" })).toBeInTheDocument();
});

it("displays links by default", () => {
  render(
    <SideNavigation
      items={[
        {
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
          items: [
            {
              label: "Link one",
            },
            <Link key="link">Link two</Link>,
          ],
        },
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
          items: [
            {
              label: "Link one",
              href: "#",
            },
            <Link key="link">Link two</Link>,
          ],
        },
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
          items: [
            {
              label: "Link one",
              component: Link,
            },
            {
              label: "Link two",
              component: "h1",
            },
          ],
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
          items: [
            {
              label: "Link one",
            },
          ],
        },
      ]}
    />,
  );
  expect(container.firstChild).toHaveClass("p-side-navigation--icons");
});

it("automatically determines if icon class should be applied from a list of items", () => {
  const { container } = render(
    <SideNavigation
      items={[
        {
          items: [
            {
              label: "Link one",
              href: "#",
              icon: "user",
            },
          ],
        },
      ]}
    />,
  );
  expect(container.firstChild).toHaveClass("p-side-navigation--icons");
});

it("automatically determines if icon class should be applied from multiple menus", () => {
  const { container } = render(
    <SideNavigation
      items={[
        {
          items: [
            {
              label: "Link one",
              href: "#",
            },
          ],
        },
        {
          items: [
            {
              label: "Link two",
              href: "#",
              icon: "user",
            },
          ],
        },
      ]}
    />,
  );
  expect(container.firstChild).toHaveClass("p-side-navigation--icons");
});

it("automatically determines if icon class should be applied from object menus", () => {
  const { container } = render(
    <SideNavigation
      items={[
        {
          items: [
            {
              label: "Link one",
              href: "#",
            },
          ],
        },
        {
          items: [
            {
              label: "Link two",
              href: "#",
              icon: "user",
            },
          ],
        },
      ]}
    />,
  );
  expect(container.firstChild).toHaveClass("p-side-navigation--icons");
});
