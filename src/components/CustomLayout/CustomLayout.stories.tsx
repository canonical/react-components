import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Panel from "components/Panel";
import CustomLayout from "./CustomLayout";
import AppMain from "components/ApplicationLayout/AppMain";

const meta: Meta<typeof CustomLayout> = {
  component: CustomLayout,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CustomLayout>;

export const Default: Story = {
  args: {
    children: "CustomLayout",
  },
};

export const Content: Story = {
  render: () => {
    return (
      <AppMain id="main-content">
        <Panel>test</Panel>
      </AppMain>
    );
  },
};
