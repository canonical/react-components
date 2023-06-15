import { render } from "@testing-library/react";
import React from "react";

import EmptyState from "./EmptyState";

describe("EmptyState ", () => {
  it("renders the title", () => {
    const { container } = render(
      <EmptyState title="Test title" iconName="plus">
        Empty
      </EmptyState>
    );
    expect(container).toContainHTML("Test title");
  });

  it("renders the icon", () => {
    const { container } = render(
      <EmptyState title="Test title" iconName="plus">
        Empty
      </EmptyState>
    );
    expect(container).toContainHTML("p-icon--plus");
  });

  it("renders the content", () => {
    const { container } = render(
      <EmptyState title="Test title" iconName="plus">
        Empty
      </EmptyState>
    );
    expect(container).toContainHTML("Empty");
  });

  it("passes extra classes to the wrapping element", async () => {
    const { container } = render(
      <EmptyState title="Test title" iconName="plus" className="extra-class">
        Empty
      </EmptyState>
    );
    expect(container).toContainHTML("extra-class row");
  });

  it("passes extra classes to the icon element", async () => {
    const { container } = render(
      <EmptyState
        title="Test title"
        iconName="plus"
        iconClassName="extra-class"
      >
        Empty
      </EmptyState>
    );
    expect(container).toContainHTML("extra-class p-icon--plus");
  });
});
