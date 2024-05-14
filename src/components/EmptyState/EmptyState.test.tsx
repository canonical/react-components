import { render, screen } from "@testing-library/react";
import React from "react";

import EmptyState from "./EmptyState";

describe("EmptyState ", () => {
  it("renders the title", () => {
    render(<EmptyState title="Test title" image={<img alt="" src="" />} />);
    const title = screen.getByText("Test title");
    expect(title).toHaveClass("p-heading--4");
  });

  it("renders the image", () => {
    render(
      <EmptyState
        title="Test title"
        image={<img alt="pic" src="path/to/image" />}
      />
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", "path/to/image");
  });

  it("renders the content", () => {
    render(
      <EmptyState title="Test title" image={<img alt="" src="" />}>
        Empty
      </EmptyState>
    );
    expect(screen.getByText("Empty")).toBeInTheDocument();
  });

  it("passes extra classes to the wrapping element", async () => {
    render(
      <EmptyState
        title="Test title"
        image={<img alt="" src="" />}
        className="extra-class"
        data-testid="wrapper"
      >
        Empty
      </EmptyState>
    );
    expect(screen.getByTestId("wrapper")).toHaveClass("extra-class");
  });
});
