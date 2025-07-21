import { Meta, StoryObj } from "@storybook/react";

import ThemeSwitcher from "./ThemeSwitcher";

const meta: Meta<typeof ThemeSwitcher> = {
  component: ThemeSwitcher,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
  name: "Default",
};
