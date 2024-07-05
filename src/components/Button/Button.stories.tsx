import React, { HTMLProps } from "react";
import { Meta, StoryObj } from "@storybook/react";

import Tooltip from "components/Tooltip";

import Button, { ButtonAppearance } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],

  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },

    appearance: {
      control: {
        options: ButtonAppearance,
        type: "select",
      },
    },
  },

  args: {
    children: "Click me!",
    appearance: ButtonAppearance.DEFAULT,
  },
};

export default meta;

type Story<P = null> = StoryObj<typeof Button<P>>;

export const Default: Story = {
  name: "Default",

  args: {
    children: "Button",
  },
};

export const DefaultDisabled: Story = {
  name: "Default disabled",

  args: {
    children: "Button",
    disabled: true,
  },
};

export const Base: Story = {
  name: "Base",

  args: {
    children: "Base button",
    appearance: "base",
  },
};

export const BaseDisabled: Story = {
  name: "Base disabled",

  args: {
    children: "Base button disabled",
    appearance: "base",
    disabled: true,
  },
};

export const Link = {
  name: "Link",

  args: {
    children: "Link button",
    appearance: "base",
    element: "a",
    href: "#test",
  },
};

export const LinkDisabled: Story<HTMLProps<HTMLAnchorElement>> = {
  name: "Link disabled",

  args: {
    children: "Link button disabled",
    appearance: "base",
    element: "a",
    href: "#test",
    disabled: true,
  },
};

export const Positive: Story = {
  name: "Positive",

  args: {
    children: "Positive button",
    appearance: "positive",
  },
};

export const PositiveDisabled: Story = {
  name: "Positive disabled",

  args: {
    children: "Positive button disabled",
    appearance: "positive",
    disabled: true,
  },
};

export const Negative: Story = {
  name: "Negative",

  args: {
    children: "Negative button",
    appearance: "negative",
  },
};

export const NegativeDisabled: Story = {
  name: "Negative disabled",

  args: {
    children: "Negative button disabled",
    appearance: "negative",
    disabled: true,
  },
};

export const Brand: Story = {
  name: "Brand",

  args: {
    children: "Brand button",
    appearance: "brand",
  },
};

export const BrandDisabled: Story = {
  name: "Brand disabled",

  args: {
    children: "Brand button disabled",
    appearance: "brand",
    disabled: true,
  },
};

export const Inline: Story = {
  render: () => (
    <>
      <span>Everything you need to get started with Vanilla.</span>
      <Button appearance="neutral" inline>
        Inline button
      </Button>
    </>
  ),

  name: "Inline",
};

export const Dense: Story = {
  render: () => (
    <>
      <span>Everything you need to get started with Vanilla.</span>
      <Button dense>Dense button</Button>
    </>
  ),

  name: "Dense",
};

export const Small: Story = {
  render: () => (
    <>
      <Button small>Small button</Button>
      <Button small dense>
        Small dense button
      </Button>
    </>
  ),

  name: "Small",
};

export const Icon: Story = {
  name: "Icon",

  args: {
    children: <i className="p-icon--plus"></i>,
    hasIcon: true,
  },
};

export const IconText: Story = {
  name: "Icon & text",

  args: {
    children: (
      <>
        <i className="p-icon--plus"></i> <span>Button with icon & text</span>
      </>
    ),

    hasIcon: true,
  },
};

export const IconWithTooltip: Story = {
  name: "Disabled with tooltip",

  args: {
    children: "Disabled button with a tooltip",
    disabled: true,
  },
  render: (args) => (
    <div style={{ paddingTop: "3rem" }}>
      <Tooltip message="This button is disabled">
        <Button {...args} />
      </Tooltip>
    </div>
  ),
};
