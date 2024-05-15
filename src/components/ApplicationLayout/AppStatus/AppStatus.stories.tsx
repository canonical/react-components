import type { Meta, StoryObj } from "@storybook/react";

import AppStatus from "./AppStatus";

const meta: Meta<typeof AppStatus> = {
  component: AppStatus,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AppStatus>;

export const Default: Story = {
  args: {},
};
