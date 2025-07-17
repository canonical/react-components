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

export const Dense: Story = {
  render: () => <Chip lead="Owner" value="Bob" isDense={true} />,
  name: "Dense",
};

export const Inline: Story = {
  render: () => (
    <p>
      This is text with an inline{" "}
      <Chip value="chip" isDense={true} isInline={true} />
    </p>
  ),
  name: "Inline",
};

export const ReadOnly: Story = {
  render: () => <Chip lead="Owner" value="Bob" isReadOnly={true} />,
  name: "Read-only",
};

export const WithIcon: Story = {
  render: () => <Chip value="Users" iconName="user" />,
  name: "With Icon",
};

export const WithBadge: Story = {
  render: () => (
    <Chip
      lead="Owner"
      value="Bob"
      badge={
        <span className="p-badge" aria-label="More than 2.5 billion items">
          2.5B
        </span>
      }
    />
  ),
  name: "With Badge",
};
