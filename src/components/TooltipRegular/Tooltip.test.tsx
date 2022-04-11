import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Tooltip from "./Tooltip";

it("adds a description to the wrapped element", () => {
  render(
    <Tooltip message="Additional description">
      <button>open the tooltip</button>
    </Tooltip>
  );
  expect(
    screen.getByRole("button", { name: /open the tooltip/ })
  ).toHaveAccessibleDescription("Additional description");
});

it("focuses on the first focusable element within the tooltip on pressing tab ", () => {
  render(
    <Tooltip
      message={
        <>
          Additional information <a href="canonical.com">Canonical</a>
        </>
      }
    >
      <button>open the tooltip</button>
    </Tooltip>
  );

  userEvent.click(screen.getByRole("button"));
  userEvent.tab();

  expect(screen.getByRole("link", { name: "Canonical" })).toHaveFocus();
});

it("preserves click handlers for elements within the tooltip", () => {
  const clickHandler = jest.fn();

  render(
    <Tooltip
      message={
        <>
          Additional information{" "}
          <a
            href="canonical.com"
            onClick={(e) => {
              e.preventDefault();
              clickHandler();
            }}
          >
            Canonical
          </a>
        </>
      }
    >
      <button>open the tooltip</button>
    </Tooltip>
  );

  userEvent.click(screen.getByRole("button"));
  userEvent.click(screen.getByRole("link", { name: "Canonical" }));

  expect(clickHandler).toHaveBeenCalled();
});
