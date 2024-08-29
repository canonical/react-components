import { Meta, StoryObj } from "@storybook/react";

import ActionButton from "./ActionButton";

const meta: Meta<typeof ActionButton> = {
  component: ActionButton,
  tags: ["autodocs"],

  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ActionButton>;

export const Default: Story = {
  name: "Default",

  args: {
    appearance: "positive",
    children: "Click me!",
  },
};

export const Loading: Story = {
  name: "Loading",

  args: {
    appearance: "positive",
    loading: true,
    disabled: true,
    children: "Click me!",
  },
};
