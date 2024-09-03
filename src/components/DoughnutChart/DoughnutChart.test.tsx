import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import DoughnutChart, { TestIds } from "./DoughnutChart";

describe("DoughnutChart", () => {
  const defaultProps = {
    chartID: "test",
    segmentHoverWidth: 10,
    segmentThickness: 8,
    size: 100,
    segments: [
      {
        color: "#3498DB",
        tooltip: "aaa",
        value: 12,
      },
      {
        color: "#E74C3C",
        tooltip: "bbb",
        value: 8,
      },
      {
        color: "#F1C40F",
        tooltip: "ccc",
        value: 18,
      },
      {
        color: "#2ECC71",
        tooltip: "ddd",
        value: 14,
      },
    ],
  };

  it("renders", () => {
    render(<DoughnutChart {...defaultProps} />);
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });

  it("displays the correct number of segments", () => {
    render(<DoughnutChart {...defaultProps} />);
    const segments = screen.getAllByTestId(TestIds.Segment);
    expect(segments).toHaveLength(defaultProps.segments.length);
  });

  it("shows tooltips on hover", async () => {
    const { container } = render(<DoughnutChart {...defaultProps} />);
    const segments = screen.getAllByTestId(TestIds.Segment);

    fireEvent.mouseOver(segments[0]);
    fireEvent.click(container.firstChild.firstChild);

    await waitFor(() => {
      expect(screen.getByText("aaa")).toBeInTheDocument();
    });
  });

  it("applies custom styles to segments", () => {
    render(<DoughnutChart {...defaultProps} />);
    const segment = screen.getAllByTestId(TestIds.Segment)[0];
    expect(segment).toHaveStyle(`stroke: ${defaultProps.segments[0].color}`);
    expect(segment).toHaveStyle(
      `stroke-width: ${defaultProps.segmentThickness}`,
    );
  });

  it("displays the label in the center if provided", () => {
    render(<DoughnutChart {...defaultProps} label="Test Label" />);
    expect(screen.getByTestId(TestIds.Label)).toHaveTextContent("Test Label");
  });

  it("does not display the label if not provided", () => {
    render(<DoughnutChart {...defaultProps} />);
    expect(screen.queryByText("Test Label")).not.toBeInTheDocument();
  });
});
