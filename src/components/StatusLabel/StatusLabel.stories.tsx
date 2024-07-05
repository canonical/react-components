import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import StatusLabel, { StatusLabelAppearance } from "./StatusLabel";

const meta: Meta<typeof StatusLabel> = {
  component: StatusLabel,
  tags: ["autodocs"],

  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },

    appearance: {
      control: {
        options: StatusLabelAppearance,
        type: "select",
      },
    },
  },

  args: {
    children: "Label",
    appearance: StatusLabelAppearance.POSITIVE,
  },
};

export default meta;

type Story = StoryObj<typeof StatusLabel>;

export const Default: Story = {
  render: () => <StatusLabel>Default</StatusLabel>,
  name: "Default",
};

export const Positive: Story = {
  render: () => <StatusLabel appearance="positive">Positive</StatusLabel>,
  name: "Positive",
};

export const Caution: Story = {
  render: () => <StatusLabel appearance="caution">Caution</StatusLabel>,
  name: "Caution",
};

export const Negative: Story = {
  render: () => <StatusLabel appearance="negative">Negative</StatusLabel>,
  name: "Negative",
};

export const Information: Story = {
  render: () => <StatusLabel appearance="information">Information</StatusLabel>,
  name: "Information",
};
