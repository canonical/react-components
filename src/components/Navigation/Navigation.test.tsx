import React from "react";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Navigation from "./Navigation";
import { Theme } from "../../types";

/* eslint-disable testing-library/no-node-access */
it("displays light theme", () => {
  render(<Navigation logo={<img src="" alt="" />} theme={Theme.LIGHT} />);
  expect(screen.getByRole("banner").className.includes("is-light")).toBe(true);
});

it("displays dark theme", () => {
  render(<Navigation logo={<img src="" alt="" />} theme={Theme.DARK} />);
  expect(screen.getByRole("banner").className.includes("is-dark")).toBe(true);
});

it("displays full width", () => {
  render(<Navigation fullWidth logo={<img src="" alt="" />} />);

  expect(
    document.querySelector(".p-navigation__row--full-width")
  ).toBeInTheDocument();
  expect(document.querySelector(".p-navigation__row")).not.toBeInTheDocument();
});

it("passes additional classes to the header element", () => {
  render(
    <Navigation
      className="not-a-footer-thats-for-sure"
      logo={<img src="" alt="" />}
    />
  );
  expect(screen.getByRole("banner")).toHaveClass(
    "p-navigation not-a-footer-thats-for-sure"
  );
});

it("passes additional props to the header element", () => {
  render(
    <Navigation
      aria-label="This is definitely the header"
      logo={<img src="" alt="" />}
    />
  );
  expect(screen.getByRole("banner")).toHaveAttribute(
    "aria-label",
    "This is definitely the header"
  );
});

it("can display a standard logo", () => {
  render(
    <Navigation
      logo={{
        src: "http://this.is.the.logo.svg",
        title: "This is the site name",
        url: "/this/is/the/logo/link",
      }}
    />
  );
  expect(
    screen.getByRole("link", { name: "This is the site name" })
  ).toHaveAttribute("href", "/this/is/the/logo/link");
  expect(document.querySelector("img.p-navigation__logo-icon")).toHaveAttribute(
    "src",
    "http://this.is.the.logo.svg"
  );
});

it("can provide a custom logo", () => {
  render(
    <Navigation
      aria-label="This is definitely the header"
      logo={
        <a href="#thisisthelogolink">
          <img src="" alt="" />
          This logo is totally not anything like the normal one.
        </a>
      }
    />
  );
  expect(
    screen.getByRole("link", {
      name: "This logo is totally not anything like the normal one.",
    })
  ).toBeInTheDocument();
});

it("can display menus", () => {
  render(
    <Navigation
      items={[{ items: [], label: "THIS IS A MENU" }]}
      logo={<img src="" alt="" />}
    />
  );
  expect(
    screen.getByRole("button", { name: "THIS IS A MENU" })
  ).toBeInTheDocument();
});

it("can display links", () => {
  render(
    <Navigation
      items={[{ label: "THIS IS A LINK", url: "/this/is/the/url" }]}
      logo={<img src="" alt="" />}
    />
  );
  expect(
    screen.getByRole("link", { name: "THIS IS A LINK" })
  ).toBeInTheDocument();
});

it("can pass additional classes to links", () => {
  render(
    <Navigation
      items={[
        {
          className: "this-link-has-a-very-nice-custom-class",
          label: "THIS IS A LINK",
          url: "/this/is/the/url",
        },
      ]}
      logo={<img src="" alt="" />}
    />
  );
  expect(screen.getByRole("link", { name: "THIS IS A LINK" })).toHaveClass(
    "p-navigation__link this-link-has-a-very-nice-custom-class"
  );
});

it("can mark a nav item as selected", () => {
  render(
    <Navigation
      items={[
        {
          isSelected: true,
          label: "THIS IS A LINK",
          url: "/this/is/the/url",
        },
      ]}
      leftNavProps={{ "aria-label": "Left nav" }}
      logo={<img src="" alt="" />}
    />
  );
  expect(
    within(screen.getByLabelText("Left nav"))
      .getByRole("listitem")
      .className.includes("is-selected")
  ).toBe(true);
});

it("displays without search", () => {
  render(<Navigation logo={<img src="" alt="" />} />);
  expect(
    screen.queryByRole("button", {
      name: "Search",
    })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("listitem", {
      name: "Search",
    })
  ).not.toBeInTheDocument();
  expect(
    document.querySelector(".p-navigation__search")
  ).not.toBeInTheDocument();
  expect(
    document.querySelector(".p-navigation__search-overlay")
  ).not.toBeInTheDocument();
});

it("displays with search", () => {
  render(
    <Navigation
      logo={<img src="" alt="" />}
      searchProps={{ onSearch: jest.fn() }}
      rightNavProps={{ "aria-label": "Right nav" }}
    />
  );
  expect(
    within(screen.getByLabelText("Right nav")).getByRole("button", {
      name: "Search",
    })
  ).toBeInTheDocument();
  expect(
    document.querySelector(".p-navigation__link--search-toggle")
  ).toBeInTheDocument();
  expect(document.querySelector(".p-navigation__search")).toBeInTheDocument();
  expect(
    document.querySelector(".p-navigation__search-overlay")
  ).toBeInTheDocument();
});

it("can open the search form", () => {
  render(
    <Navigation
      logo={<img src="" alt="" />}
      searchProps={{ onSearch: jest.fn() }}
    />
  );
  userEvent.click(screen.getAllByRole("button", { name: "Search" })[0]);
  expect(screen.getByRole("banner").className.includes("has-search-open")).toBe(
    true
  );
});

it("closes the search form when opening the mobile menu", () => {
  render(
    <Navigation
      logo={<img src="" alt="" />}
      searchProps={{ onSearch: jest.fn() }}
    />
  );
  const banner = screen.getByRole("banner");
  // Open the search form.
  userEvent.click(screen.getAllByRole("button", { name: "Search" })[0]);
  expect(banner.className.includes("has-search-open")).toBe(true);
  userEvent.click(screen.getByRole("button", { name: "Menu" }));
  expect(banner.className.includes("has-menu-open")).toBe(true);
  expect(banner.className.includes("has-search-open")).toBe(false);
});

it("closes the search form when clicking on the overlay", () => {
  render(
    <Navigation
      logo={<img src="" alt="" />}
      searchProps={{ onSearch: jest.fn() }}
    />
  );
  const banner = screen.getByRole("banner");
  // Open the search form.
  userEvent.click(screen.getAllByRole("button", { name: "Search" })[0]);
  expect(banner.className.includes("has-search-open")).toBe(true);
  userEvent.click(document.querySelector(".p-navigation__search-overlay"));
  expect(banner.className.includes("has-search-open")).toBe(false);
});

it("closes the mobile menu when opening the search form", () => {
  render(
    <Navigation
      logo={<img src="" alt="" />}
      searchProps={{ onSearch: jest.fn() }}
    />
  );
  const banner = screen.getByRole("banner");
  // Open the mobile menu.
  userEvent.click(screen.getByRole("button", { name: "Menu" }));
  expect(banner.className.includes("has-menu-open")).toBe(true);
  userEvent.click(screen.getAllByRole("button", { name: "Search" })[0]);
  expect(banner.className.includes("has-search-open")).toBe(true);
  expect(banner.className.includes("has-menu-open")).toBe(false);
});

it("can open the mobile menu", () => {
  render(<Navigation logo={<img src="" alt="" />} />);
  const banner = screen.getByRole("banner");
  expect(banner.className.includes("has-menu-open")).toBe(false);
  userEvent.click(screen.getByRole("button", { name: "Menu" }));
  expect(banner.className.includes("has-menu-open")).toBe(true);
});

it("closes the mobile menu when clicking on a nav link", () => {
  render(
    <Navigation
      items={[{ label: "THIS IS A LINK", url: "/this/is/the/url" }]}
      logo={<img src="" alt="" />}
    />
  );
  const banner = screen.getByRole("banner");
  userEvent.click(screen.getByRole("button", { name: "Menu" }));
  expect(banner.className.includes("has-menu-open")).toBe(true);
  userEvent.click(screen.getByRole("link", { name: "THIS IS A LINK" }));
  expect(banner.className.includes("has-menu-open")).toBe(false);
});

it("does not close the mobile menu when clicking on a nav menu", () => {
  render(
    <Navigation
      items={[{ items: [], label: "THIS IS A MENU" }]}
      logo={<img src="" alt="" />}
    />
  );
  const banner = screen.getByRole("banner");
  userEvent.click(screen.getByRole("button", { name: "Menu" }));
  expect(banner.className.includes("has-menu-open")).toBe(true);
  userEvent.click(screen.getByRole("button", { name: "THIS IS A MENU" }));
  expect(banner.className.includes("has-menu-open")).toBe(true);
});
