import { Meta, StoryObj } from "@storybook/react";

import ArticlePagination from "./ArticlePagination";

const meta: Meta<typeof ArticlePagination> = {
  component: ArticlePagination,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ArticlePagination>;

export const Default: Story = {
  name: "Default",

  args: {
    nextLabel: "Consectetur adipisicing elit",
    nextURL: "#next",
    previousLabel: "Lorem ipsum dolor sit amet",
    previousURL: "#previous",
  },
};
