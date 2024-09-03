import React, { useLayoutEffect, useState } from "react";
import { render, screen, within } from "@testing-library/react";

import LoginPageLayout from "./LoginPageLayout";
import userEvent from "@testing-library/user-event";

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

it("should display the title", () => {
  render(<LoginPageLayout title="Login page" />);
  expect(
    screen.getByRole("heading", { name: "Login page" }),
  ).toBeInTheDocument();
});

it("should add and then remove is-paper class to body if initially is-paper wasn't present", async () => {
  const NoInitialIsPaperComponent = () => {
    const [displayLogin, setDisplayLogin] = useState(false);
    return (
      <div>
        {displayLogin ? (
          <>
            <LoginPageLayout title="Login page" />
            <button onClick={() => setDisplayLogin(false)}>Remove login</button>
          </>
        ) : (
          <button onClick={() => setDisplayLogin(true)}>Display login</button>
        )}
      </div>
    );
  };
  render(<NoInitialIsPaperComponent />);
  expect(document.querySelector("body")).not.toHaveClass("is-paper");
  await userEvent.click(screen.getByRole("button", { name: "Display login" }));
  expect(document.querySelector("body")).toHaveClass("is-paper");
  await userEvent.click(screen.getByRole("button", { name: "Remove login" }));
  expect(document.querySelector("body")).not.toHaveClass("is-paper");
});

it("shouldn't remove is-paper class to body if initially is-paper was present", async () => {
  const InitialIsPaperComponent = () => {
    const [displayLogin, setDisplayLogin] = useState(false);
    useLayoutEffect(() => {
      document.querySelector("body")?.classList.add("is-paper");
    }, []);
    return (
      <div>
        {displayLogin ? (
          <>
            <LoginPageLayout title="Login page" />
            <button onClick={() => setDisplayLogin(false)}>Remove login</button>
          </>
        ) : (
          <button onClick={() => setDisplayLogin(true)}>Display login</button>
        )}
      </div>
    );
  };
  render(<InitialIsPaperComponent />);
  expect(document.querySelector("body")).toHaveClass("is-paper");
  await userEvent.click(screen.getByRole("button", { name: "Display login" }));
  expect(document.querySelector("body")).toHaveClass("is-paper");
  await userEvent.click(screen.getByRole("button", { name: "Remove login" }));
  expect(document.querySelector("body")).toHaveClass("is-paper");
});
