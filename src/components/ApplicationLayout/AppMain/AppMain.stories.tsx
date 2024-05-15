import type { Meta, StoryObj } from "@storybook/react";

import AppMain from "./AppMain";

const meta: Meta<typeof AppMain> = {
  component: AppMain,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AppMain>;

export const Default: Story = {
  args: {},
};
