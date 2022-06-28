import React from "react";
import { render, screen } from "@testing-library/react";

import Badge, { BadgeType } from "./Badge";

it("does not set an appearance by default", () => {
  render(<Badge value={15} />);
  // Check that the element contains the default class.
  expect(screen.getByText("15")).toHaveClass("p-badge");
});

it("can set its appearance", () => {
  render(<Badge value={15} isNegative />);
  // Check that the element has the correct class.
  expect(screen.getByText(15)).toHaveClass("p-badge--negative");
});

it("can set its type as undefined large number", () => {
  render(<Badge value={1000} badgeType={BadgeType.UNDEFINED_LARGE_NUMBER} />);
  // Check that the correct value is displayed.
  expect(screen.getByText("999+")).toBeInTheDocument();
});
