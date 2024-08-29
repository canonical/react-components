import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Chip from "./Chip";

const meta: Meta<typeof Chip> = {
  component: Chip,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  name: "Default",

  args: {
    value: "Default",
  },
};

export const LeadValue: Story = {
  render: () => <Chip lead="Owner" value="Bob" />,
  name: "Lead-value",
};

export const Appearance: Story = {
  render: () => <Chip lead="Type" value="Positive" appearance="positive" />,
  name: "Appearance",
};

export const Dismissible: Story = {
  render: () => (
    <Chip
      lead="Owner"
      value="Bob"
      onDismiss={() => {
        console.log("onDismiss called");
      }}
    />
  ),

  name: "Dismissible",
};
