import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import SkipLink from "./SkipLink";

describe("<SkipLink />", () => {
  it("renders and is found in the DOM", () => {
    render(<SkipLink />);

    expect(screen.getByText("Skip to main content")).toBeInTheDocument();
  });

  it("gets focused only after a TAB press", async () => {
    render(<SkipLink />);

    const skipLink = screen.getByText("Skip to main content");
    expect(skipLink).not.toHaveFocus();

    await userEvent.tab();
    expect(skipLink).toHaveFocus();
  });

  it("redirects focus to the main content", async () => {
    render(
      <div>
        <SkipLink mainId="main-element" />
        <main id="#main-element">
          <input />
        </main>
      </div>,
    );

    const input = screen.getByRole("textbox");
    expect(input).not.toHaveFocus();

    await userEvent.click(screen.getByText("Skip to main content"));
    expect(window.location.hash).toBe("#main-element");

    await userEvent.tab();
    expect(input).toHaveFocus();
  });
});
