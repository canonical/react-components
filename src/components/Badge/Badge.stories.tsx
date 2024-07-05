import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Badge, { BadgeType } from "./Badge";

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ["autodocs"],

  argTypes: {
    badgeType: {
      control: {
        options: BadgeType,
        type: "select",
      },
    },
  },

  args: {
    badgeType: BadgeType.UNDEFINED_LARGE_NUMBER,
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  name: "Default",

  args: {
    value: 9,
  },
};

export const ColourCoding: Story = {
  render: () => <Badge value={9} isNegative />,
  name: "Colour Coding",
};

/**
 * When the amount of items is only relevant for small values, this variant should be used. When the value grows further than 999, the badge should show "999+".
 */
export const UndefinedLargeNumber: Story = {
  render: () => (
    <Badge value={1000} badgeType={BadgeType.UNDEFINED_LARGE_NUMBER} />
  ),
  name: "Undefined Large Number",
};

/**
 * When the value of the badge represents a type of information where differences between large amounts of items are relevant, it should include a decimal unit prefix and round the value.
 */
export const RoundedLargeNumber: Story = {
  render: () => (
    <Badge value={1234} badgeType={BadgeType.ROUNDED_LARGE_NUMBER} />
  ),
  name: "Rounded Large Number",
};
