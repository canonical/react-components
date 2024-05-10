import { Meta, StoryObj } from "@storybook/react";

import Spinner from "./Spinner";

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  name: "Default",
};

export const Text: Story = {
  name: "Text",

  args: {
    text: "Loading...",
  },
};

export const Assertive: Story = {
  name: "Assertive",

  args: {
    ariaLive: "assertive",
  },
};
