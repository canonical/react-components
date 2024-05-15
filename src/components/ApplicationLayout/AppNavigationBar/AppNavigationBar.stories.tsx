import type { Meta, StoryObj } from "@storybook/react";

import AppNavigationBar from "./AppNavigationBar";

const meta: Meta<typeof AppNavigationBar> = {
  component: AppNavigationBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AppNavigationBar>;

export const Default: Story = {
  args: {},
};
