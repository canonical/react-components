import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ButtonHTMLAttributes } from "react";

import Panel from "./Panel";

it("displays a title", () => {
  const title = "Test Panel";
  render(<Panel title={title} />);
  expect(screen.getByText(title)).toHaveClass("p-panel__title");
});

it("displays a logo", () => {
  render(
    <Panel
      logo={{
        href: "http://example.com",
        icon: "icon.svg",
        iconAlt: "Icon SVG",
        name: "name.svg",
        nameAlt: "Name SVG",
      }}
    />
  );
  const link = screen.getByRole("link", { name: "Icon SVG Name SVG" });
  expect(link).toHaveAttribute("href", "http://example.com");
  expect(within(link).getByRole("img", { name: "Icon SVG" })).toHaveAttribute(
    "src",
    "icon.svg"
  );
  expect(within(link).getByRole("img", { name: "Name SVG" })).toHaveAttribute(
    "src",
    "name.svg"
  );
});

it("logo handles different components", () => {
  const Link = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} />
  );
  render(
    <Panel
      logo={{
        title: "http://example.com",
        component: Link,
        icon: "icon.svg",
        iconAlt: "Icon SVG",
        name: "name.svg",
        nameAlt: "Name SVG",
      }}
    />
  );
  expect(
    screen.getByRole("button", { name: "Icon SVG Name SVG" })
  ).toHaveAttribute("title", "http://example.com");
});

it("displays a toggle", async () => {
  const onClick = jest.fn();
  render(<Panel title="Test panel" toggle={{ label: "Toggle", onClick }} />);
  const toggle = screen.getByRole("button", { name: "Toggle" });
  await userEvent.click(toggle);
  expect(onClick).toHaveBeenCalled();
});

it("handles key presses on the toggle", async () => {
  const onClick = jest.fn();
  render(<Panel title="Test panel" toggle={{ label: "Toggle", onClick }} />);
  const toggle = screen.getByRole("button", { name: "Toggle" });
  await userEvent.type(toggle, "{Space}");
  expect(onClick).toHaveBeenCalled();
});

it("displays a panel with no header", async () => {
  render(<Panel>Content</Panel>);
  expect(screen.getByText("Content")).toBeInTheDocument();
});
