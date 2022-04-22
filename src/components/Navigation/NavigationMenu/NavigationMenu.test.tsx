import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NavigationMenu from "./NavigationMenu";

it("can display when closed", () => {
  render(<NavigationMenu items={[]} label="Today's menu" />);
  expect(screen.getByRole("listitem")).not.toHaveClass("is-active");
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: "Today's menu",
    })
  ).toBeInTheDocument();
});

it("can open the menu", () => {
  render(<NavigationMenu items={[]} label="Today's menu" />);
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: "Today's menu" }));
  expect(screen.getByRole("listitem").className.includes("is-active")).toBe(
    true
  );
  expect(screen.getByRole("list")).toHaveAttribute("aria-hidden", "false");
  expect(
    screen.getByRole("button", {
      name: "Today's menu",
    })
  ).toBeInTheDocument();
});

it("can align menu items to the right", () => {
  render(<NavigationMenu alignRight items={[]} label="Today's menu" />);
  userEvent.click(screen.getByRole("button", { name: "Today's menu" }));
  expect(
    screen.getByRole("list").className.includes("p-navigation__dropdown--right")
  ).toBe(true);
});

it("can display links using a standard anchor", () => {
  render(
    <NavigationMenu
      items={[{ label: "Eggs florentine", url: "/eggs/florentine" }]}
      label="Today's menu"
    />
  );
  // Open the menu so the links are displayed.
  userEvent.click(screen.getByRole("button", { name: "Today's menu" }));
  expect(
    screen.getByRole("link", {
      name: "Eggs florentine",
    })
  ).toBeInTheDocument();
});

it("can display links using a custom link", () => {
  render(
    <NavigationMenu
      generateLink={({ label }) => <button>{label}</button>}
      items={[{ label: "Eggs benedict", url: "/eggs/benedict" }]}
      label="Today's menu"
    />
  );
  // Open the menu so the links are displayed.
  userEvent.click(screen.getByRole("button", { name: "Today's menu" }));
  expect(
    screen.getByRole("button", {
      name: "Eggs benedict",
    })
  ).toBeInTheDocument();
});

it("can pass additional classes to the links", () => {
  render(
    <NavigationMenu
      items={[
        {
          className: "on-24-hour-rye",
          label: "Smashed avo",
          url: "/smashed/avo",
        },
      ]}
      label="Today's menu"
    />
  );
  // Open the menu so the links are displayed.
  userEvent.click(screen.getByRole("button", { name: "Today's menu" }));
  expect(
    screen.getByRole("link", {
      name: "Smashed avo",
    })
  ).toHaveClass("p-navigation__dropdown-item on-24-hour-rye");
});
