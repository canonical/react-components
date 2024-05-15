import type { Meta, StoryObj } from "@storybook/react";

import SideNavigationText from "./SideNavigationText";

const meta: Meta<typeof SideNavigationText> = {
  component: SideNavigationText,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SideNavigationText>;

export const Default: Story = {
  args: {},
};
