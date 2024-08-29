import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Row from "../Row";
import Tabs from "./Tabs";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  name: "Default",

  args: {
    links: [
      {
        active: true,
        label: "Summary",
      },
      {
        active: false,
        label: "Network",
      },
      {
        active: false,
        label: "Storage",
      },
      {
        active: false,
        label: "Settings",
      },
    ],
  },
};

/**
 * To horizontally align the Tabs with other content, they can be contained within a Row component to
provide correct gutters.
 */
export const HorizontallyAligned: Story = {
  render: () => (
    <Row>
      <Tabs
        links={[
          {
            active: true,
            label: "Summary",
          },
          {
            active: false,
            label: "Network",
          },
          {
            active: false,
            label: "Storage",
          },
          {
            active: false,
            label: "Settings",
          },
        ]}
      />
      <p>There should be gutters and the text should be horizontally aligned</p>
    </Row>
  ),

  name: "Horizontally aligned",
};
