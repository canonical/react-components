import { Meta, StoryObj } from "@storybook/react";

import Row from "./Row";

const meta: Meta<typeof Row> = {
  component: Row,
  tags: ["autodocs"],

  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Row>;

/**
 * See [Col](?path=/docs/components-col--docs) for grid details.
 */
export const Default: Story = {
  name: "Default",

  args: {
    children: "children...",
  },
};
