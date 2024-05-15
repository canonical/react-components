import type { Meta, StoryObj } from "@storybook/react";

import Panel from "./Panel";

const meta: Meta<typeof Panel> = {
  component: Panel,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  args: {},
};
