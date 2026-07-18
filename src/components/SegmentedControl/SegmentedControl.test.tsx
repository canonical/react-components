import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SegmentedControl from "./SegmentedControl";

describe("SegmentedControl", () => {
  it("renders", () => {
    const { container } = render(
      <SegmentedControl
        segments={[
          {
            label: "label1",
            segmentContent: <p>content1</p>,
          },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("can set className correctly", () => {
    render(
      <SegmentedControl
        className="is-dense"
        segments={[
          {
            label: "label1",
            segmentContent: <p>content1</p>,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("segmented-control-div")).toHaveClass("is-dense");
  });

  it("can set active segment on segment click", async () => {
    render(
      <SegmentedControl
        segments={[
          {
            label: "label1",
            segmentContent: <p>content1</p>,
          },
          {
            label: "label2",
            segmentContent: <p>content2</p>,
          },
        ]}
      />,
    );
    const segment = screen.getByRole("tab", { name: "label2" });
    await userEvent.click(segment);
    expect(screen.getByRole("tab", { name: "label2" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("content2");
  });
});
