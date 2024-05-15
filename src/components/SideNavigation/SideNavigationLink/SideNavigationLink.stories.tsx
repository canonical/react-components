import type { Meta, StoryObj } from "@storybook/react";

import SideNavigationLink from "./SideNavigationLink";

const meta: Meta<typeof SideNavigationLink> = {
  component: SideNavigationLink,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SideNavigationLink>;

export const Default: Story = {
  args: {},
};
