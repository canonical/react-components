import type { Meta, StoryObj } from "@storybook/react";

import Badge from "components/Badge";

import SideNavigationLink from "./SideNavigationLink";
import React from "react";

const meta: Meta<typeof SideNavigationLink> = {
  component: SideNavigationLink,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SideNavigationLink>;

export const Default: Story = {
  args: {
    icon: "drag",
    label: "Models",
    status: <Badge value={9} isNegative />,
  },
};

export const CustomComponent: Story = {
  args: {
    component: (props) => <button {...props} />,
    icon: "drag",
    label: "Models",
  },
};
