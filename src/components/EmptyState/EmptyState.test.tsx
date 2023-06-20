import { render } from "@testing-library/react";
import React from "react";

import EmptyState from "./EmptyState";

describe("EmptyState ", () => {
  it("renders the title", () => {
    const { container } = render(
      <EmptyState title="Test title" image={<img alt="" src="" />} />
    );
    expect(container).toContainHTML("Test title");
  });

  it("renders the image", () => {
    const { container } = render(
      <EmptyState
        title="Test title"
        image={<img alt="" src="path/to/image" />}
      />
    );
    expect(container).toContainHTML("path/to/image");
  });

  it("renders the content", () => {
    const { container } = render(
      <EmptyState title="Test title" image={<img alt="" src="" />}>
        Empty
      </EmptyState>
    );
    expect(container).toContainHTML("Empty");
  });

  it("passes extra classes to the wrapping element", async () => {
    const { container } = render(
      <EmptyState
        title="Test title"
        image={<img alt="" src="" />}
        className="extra-class"
      >
        Empty
      </EmptyState>
    );
    expect(container).toContainHTML('div class="extra-class"');
  });
});
