import React from "react";
import { render, screen, within } from "@testing-library/react";

import LoginPageLayout from "./LoginPageLayout";

it("should display the default logo", () => {
  render(<LoginPageLayout title="Login page" />);
  const link = screen.getByRole("link", { name: "Logo Canonical" });
  expect(within(link).getByRole("img", { name: "Logo" })).toHaveAttribute(
    "src",
    "https://assets.ubuntu.com/v1/82818827-CoF_white.svg",
  );
});

it("should display a custom logo", () => {
  render(
    <LoginPageLayout
      title="Login page"
      logo={{ src: "logo.png", title: "My logo", url: "/" }}
    />,
  );
  const link = screen.getByRole("link", { name: "Logo My logo" });
  expect(within(link).getByRole("img", { name: "Logo" })).toHaveAttribute(
    "src",
    "logo.png",
  );
});

it("should display a custom logo element", () => {
  render(
    <LoginPageLayout
      title="Login page"
      logo={<img alt="Custom logo" src="custom-logo.svg" />}
    />,
  );
  expect(screen.getByRole("img", { name: "Custom logo" })).toHaveAttribute(
    "src",
    "custom-logo.svg",
  );
  expect(
    screen.queryByRole("link", { name: "Logo Canonical" }),
  ).not.toBeInTheDocument();
});

it("should display the title", () => {
  render(<LoginPageLayout title="Login page" />);
  expect(
    screen.getByRole("heading", { name: "Login page" }),
  ).toBeInTheDocument();
});
