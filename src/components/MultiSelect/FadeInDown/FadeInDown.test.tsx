import React from "react";
import { render, screen } from "@testing-library/react";

import { FadeInDown } from "./FadeInDown";

it("renders with correct attributes", () => {
  render(
    <FadeInDown className="test-class" isVisible>
      <div>Content</div>
    </FadeInDown>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const element = screen.getByText("Content").parentElement;
  expect(element).toHaveAttribute("aria-hidden", "false");
  expect(element).toHaveClass("fade-in--down test-class");
});

it("hides and reveals children", () => {
  const { rerender } = render(
    <FadeInDown isVisible>
      <div>Content</div>
    </FadeInDown>
  );
  expect(screen.getByText("Content")).toBeInTheDocument();

  rerender(
    <FadeInDown className="test-class" isVisible={false}>
      <div>Test child</div>
    </FadeInDown>
  );

  expect(screen.queryByText("Content")).not.toBeInTheDocument();
});
