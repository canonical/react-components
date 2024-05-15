import type { Meta, StoryObj } from "@storybook/react";

import AppAside from "./AppAside";

const meta: Meta<typeof AppAside> = {
  component: AppAside,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AppAside>;

export const Default: Story = {
  args: {},
};
