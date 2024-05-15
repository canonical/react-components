import type { Meta, StoryObj } from "@storybook/react";

import AppNavigation from "./AppNavigation";

const meta: Meta<typeof AppNavigation> = {
  component: AppNavigation,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AppNavigation>;

export const Default: Story = {
  args: {},
};
