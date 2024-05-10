import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Icon, { ICONS } from "./Icon";

import "./Icon.stories.scss";

const meta: Meta<typeof Icon> = {
  component: Icon,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Base: Story = {
  name: "Base",

  args: {
    name: "facebook",
  },
};

export const Default: Story = {
  render: () => <Icon name={ICONS.plus} />,
  name: "Default",
};

/**
 * To use custom icons that are not included in Vanilla you need to provide your own icon styling following the `.p-icon--{name}` convention.
 */
export const Custom: Story = {
  render: () => <Icon name="custom" />,
  name: "Custom",
};

/**
 * To use custom icons that provide the name of the social media icon following the `.p-icon--{name}` convention.
 */
export const Social: Story = {
  render: () => <Icon name={ICONS.facebook} />,
  name: "Social",
};
