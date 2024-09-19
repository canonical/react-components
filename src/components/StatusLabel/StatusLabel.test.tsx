import React from "react";
import { render, screen } from "@testing-library/react";

import StatusLabel from "./StatusLabel";

it("does not set an appearance by default", () => {
  render(<StatusLabel data-testid="StatusLabel">Test</StatusLabel>);
  // Check that the wrapping element contains the default class.
  expect(screen.getByTestId("StatusLabel")).toHaveClass("p-status-label");
});

it("can set an appearance", () => {
  render(
    <StatusLabel appearance="caution" data-testid="StatusLabel">
      Test
    </StatusLabel>,
  );
  // Check that the wrapping element contains the default class.
  expect(screen.getByTestId("StatusLabel")).toHaveClass(
    "p-status-label--caution",
  );
});

it("can pass additional classes", () => {
  render(
    <StatusLabel
      appearance="caution"
      className="custom"
      data-testid="StatusLabel"
    >
      Test
    </StatusLabel>,
  );
  // Check that the wrapping element contains the custon class.
  expect(screen.getByTestId("StatusLabel")).toHaveClass(
    "p-status-label--caution custom",
  );
});
