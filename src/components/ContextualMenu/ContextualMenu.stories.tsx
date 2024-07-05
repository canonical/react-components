import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Button from "../Button";
import ContextualMenu from "./ContextualMenu";

const ScrollTemplate = (args) => (
  <div
    style={{
      maxWidth: "30rem",
      maxHeight: "10rem",
      overflow: "auto",
      padding: "1rem",
    }}
  >
    <ContextualMenu {...args} />
    {Array(3).fill(
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
        cum dicta beatae nostrum eligendi similique earum, dolorem fuga quis,
        sequi voluptates architecto ipsa dolorum eaque rem expedita inventore
        voluptas odit aspernatur alias molestias facere.
      </p>
    )}
    <ContextualMenu {...args} />
  </div>
);

const Template = (args) => (
  <div className="u-align--center">
    <ContextualMenu {...args} />
  </div>
);

const meta: Meta<typeof ContextualMenu> = {
  component: ContextualMenu,
  render: Template,
  tags: ["autodocs"],

  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },

    links: {
      control: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContextualMenu>;

/**
 * The contextual menu will provide a visual wrapper to any provided children. Visibility can be toggled via the `visible` prop.
 */
export const Default: Story = {
  name: "Default",

  args: {
    children: (
      <span
        style={{
          padding: "1rem",
        }}
      >
        This is a menu.
      </span>
    ),

    closeOnOutsideClick: false,
    constrainPanelWidth: false,
    position: "left",
    visible: true,
  },
};

export const Toggle: Story = {
  name: "Toggle",

  args: {
    links: [
      {
        children: "Link 1",
        onClick: () => {},
      },
      {
        children: "Link 2",
        onClick: () => {},
      },
    ],

    hasToggleIcon: true,
    position: "right",
    toggleLabel: "Click me!",
  },
};

export const OverflowingContainer: Story = {
  render: ScrollTemplate.bind({}),
  name: "Overflowing container",

  args: {
    links: [
      {
        children: "Link 1",
        onClick: () => {},
      },
      {
        children: "Long Link 2",
        onClick: () => {},
      },
    ],

    hasToggleIcon: true,
    position: "right",
    toggleLabel: "Click me!",
  },
};

export const ChildFunction: Story = {
  name: "Child function",

  args: {
    children: (close) => <Button onClick={close}>child function</Button>,
    hasToggleIcon: true,
    position: "right",
    toggleLabel: "Click me!",
  },
};

export const ChildElement: Story = {
  name: "Child element",

  args: {
    children: <Button>child element</Button>,
    hasToggleIcon: true,
    position: "right",
    toggleLabel: "Click me!",
  },
};
