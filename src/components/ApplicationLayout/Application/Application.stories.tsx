import type { Meta, StoryObj } from "@storybook/react";

import Application from "./Application";

const meta: Meta<typeof Application> = {
  component: Application,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Application>;

export const Default: Story = {
  args: {},
};
