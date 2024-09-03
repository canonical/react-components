import { Meta, StoryObj } from "@storybook/react";

import DoughnutChart from "./DoughnutChart";

const meta: Meta<typeof DoughnutChart> = {
  component: DoughnutChart,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DoughnutChart>;

/**
 * The Doughnut Chart component visually represents data segments in a circular format, with tooltips that appear on hover, and segments that can be customized via props.
 */
export const Default: Story = {
  name: "Default",
  args: {
    chartID: "default",
    segmentHoverWidth: 45,
    segmentThickness: 40,
    segments: [
      {
        color: "#0E8420",
        tooltip: "Running",
        value: 10,
      },
      {
        color: "#CC7900",
        tooltip: "Stopped",
        value: 15,
      },
      { color: "#C7162B", tooltip: "Frozen", value: 5 },
      { color: "#000", tooltip: "Error", value: 5 },
    ],
    size: 150,
  },
};
