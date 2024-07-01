import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Badge from "components/Badge";

import SideNavigationText from "./SideNavigationText";

const meta: Meta<typeof SideNavigationText> = {
  component: SideNavigationText,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SideNavigationText>;

export const Default: Story = {
  args: {
    icon: "drag",
    children: "Models",
    status: <Badge value={9} isNegative />,
  },
};
