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

it("rounds number correctly for thousands", () => {
  render(<Badge value={1200} badgeType={BadgeType.ROUNDED_LARGE_NUMBER} />);
  // Check that the correct value is displayed.
  expect(screen.getByText("1.2k")).toBeInTheDocument();
});

it("rounds number correctly for millions", () => {
  render(
    <Badge value={132456455} badgeType={BadgeType.ROUNDED_LARGE_NUMBER} />
  );
  // Check that the correct value is displayed.
  expect(screen.getByText("132M")).toBeInTheDocument();
});

it("rounds number correctly for billions", () => {
  render(
    <Badge value={13245645512} badgeType={BadgeType.ROUNDED_LARGE_NUMBER} />
  );
  // Check that the correct value is displayed.
  expect(screen.getByText("13B")).toBeInTheDocument();
});

it("rounds number correctly for trillions", () => {
  render(
    <Badge value={132456455123112} badgeType={BadgeType.ROUNDED_LARGE_NUMBER} />
  );
  // Check that the correct value is displayed.
  expect(screen.getByText("132T")).toBeInTheDocument();
});

it("displays the correct max value if it exceeds 999T", () => {
  render(
    <Badge
      value={1324564551231125}
      badgeType={BadgeType.ROUNDED_LARGE_NUMBER}
    />
  );
  // Check that the correct value is displayed.
  expect(screen.getByText("+999T")).toBeInTheDocument();
});

it("renders negative numbers as 0", () => {
  render(<Badge value={-1} badgeType={BadgeType.UNDEFINED_LARGE_NUMBER} />);
  // Check that the correct value is displayed.
  expect(screen.getByText("0")).toBeInTheDocument();
});
