import React from "react";
import { render, screen } from "@testing-library/react";

import AppAside from "./AppAside";

it("displays collapsed", async () => {
  render(<AppAside collapsed>Content</AppAside>);
  expect(screen.queryByRole("complementary")).toHaveClass("is-collapsed");
});

it("displays as narrow", async () => {
  render(<AppAside narrow>Content</AppAside>);
  expect(screen.queryByRole("complementary")).toHaveClass("is-narrow");
});

it("displays pinned", async () => {
  render(<AppAside pinned>Content</AppAside>);
  expect(screen.queryByRole("complementary")).toHaveClass("is-pinned");
});

it("displays as wide", async () => {
  render(<AppAside wide>Content</AppAside>);
  expect(screen.queryByRole("complementary")).toHaveClass("is-wide");
});
