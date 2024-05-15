import type { Meta, StoryObj } from "@storybook/react";

import SideNavigationItem from "./SideNavigationItem";

const meta: Meta<typeof SideNavigationItem> = {
  component: SideNavigationItem,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SideNavigationItem>;

export const Default: Story = {
  args: {},
};
