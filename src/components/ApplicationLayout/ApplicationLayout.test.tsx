import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AppAside from "./AppAside";
import ApplicationLayout from "./ApplicationLayout";

const logo = {
  icon: "icon.svg",
  href: "http://example.com",
  name: "name.svg",
  nameAlt: "Juju",
};

it("displays a logo", () => {
  render(<ApplicationLayout logo={logo} navItems={[]} />);
  const link = screen.getAllByRole("link", { name: "Juju" })[0];
  expect(within(link).getByRole("img", { name: "Juju" })).toHaveAttribute(
    "src",
    "name.svg"
  );
});

it("displays as light", () => {
  render(<ApplicationLayout dark={false} logo={logo} navItems={[]} />);
  expect(document.querySelectorAll(".is-dark")).toHaveLength(0);
  expect(document.querySelectorAll(".is-light")).toHaveLength(0);
});

it("displays as dark", () => {
  render(<ApplicationLayout dark logo={logo} navItems={[]} />);
  expect(document.querySelectorAll(".is-dark")).toHaveLength(5);
  // Two icons are light so that they appear over the dark background.
  expect(document.querySelectorAll(".is-light")).toHaveLength(2);
});

it("displays main content", () => {
  const content = "Main content";
  render(
    <ApplicationLayout logo={logo} navItems={[]}>
      {content}
    </ApplicationLayout>
  );
  expect(screen.getByText(content)).toBeInTheDocument();
});

it("displays a status bar", () => {
  const content = "Status content";
  render(<ApplicationLayout logo={logo} navItems={[]} status={content} />);
  expect(screen.getByText(content)).toBeInTheDocument();
  expect(screen.getByText(content)).toHaveClass("l-status");
});

it("displays an aside", () => {
  const content = "Aside content";
  render(
    <ApplicationLayout
      logo={logo}
      navItems={[]}
      aside={<AppAside>{content}</AppAside>}
    />
  );
  expect(screen.getByText(content)).toBeInTheDocument();
  expect(document.querySelector(".l-aside")).toBeInTheDocument();
});

it("pins the menu", async () => {
  render(<ApplicationLayout logo={logo} navItems={[]} />);
  expect(document.querySelector(".l-navigation")).not.toHaveClass("is-pinned");
  await userEvent.click(screen.getByRole("button", { name: "Pin menu" }));
  expect(document.querySelector(".l-navigation")).toHaveClass("is-pinned");
});

it("pins the menu using external state", async () => {
  const onPinMenu = jest.fn();
  render(
    <ApplicationLayout
      logo={logo}
      navItems={[]}
      menuPinned={true}
      onPinMenu={onPinMenu}
    />
  );
  expect(document.querySelector(".l-navigation")).toHaveClass("is-pinned");
  await userEvent.click(screen.getByRole("button", { name: "Unpin menu" }));
  expect(onPinMenu).toHaveBeenCalledWith(false);
});

it("opens and collapses the menu", async () => {
  render(<ApplicationLayout logo={logo} navItems={[]} />);
  expect(document.querySelector(".l-navigation")).toHaveClass("is-collapsed");
  await userEvent.click(screen.getByRole("button", { name: "Menu" }));
  expect(document.querySelector(".l-navigation")).not.toHaveClass(
    "is-collapsed"
  );
  await userEvent.click(screen.getByRole("button", { name: "Close menu" }));
  expect(document.querySelector(".l-navigation")).toHaveClass("is-collapsed");
});

it("collapses the menu using external state", async () => {
  const onCollapseMenu = jest.fn();
  render(
    <ApplicationLayout
      logo={logo}
      navItems={[]}
      menuCollapsed={true}
      onCollapseMenu={onCollapseMenu}
    />
  );
  expect(document.querySelector(".l-navigation")).toHaveClass("is-collapsed");
  await userEvent.click(screen.getByRole("button", { name: "Menu" }));
  expect(onCollapseMenu).toHaveBeenCalledWith(false);
});
