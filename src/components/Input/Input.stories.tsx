import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Input from "./Input";

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ["autodocs"],

  argTypes: {
    caution: {
      control: {
        type: "text",
      },
    },

    error: {
      control: {
        type: "text",
      },
    },

    help: {
      control: {
        type: "text",
      },
    },

    helpClassName: {
      control: {
        type: "text",
      },
    },

    label: {
      control: {
        type: "text",
      },
    },

    success: {
      control: {
        type: "text",
      },
    },

    id: {
      control: {
        disable: true,
      },
    },

    placeholder: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  name: "Text input",

  args: {
    type: "text",
    id: "exampleTextInput2",
    placeholder: "example@canonical.com",
    label: "Email address",
    help: "Additional description for the field",
    helpClassName: "u-no-margin--bottom",
  },
};

export const Stacked: Story = {
  render: () => (
    <Input
      type="text"
      id="exampleTextInput3"
      placeholder="example@canonical.com"
      stacked
      label="Email address"
    />
  ),

  name: "Stacked",
};

export const Disabled: Story = {
  render: () => (
    <Input
      type="text"
      id="exampleTextInput4"
      placeholder="example@canonical.com"
      disabled
      label="Email address"
    />
  ),

  name: "Disabled",
};

export const Error: Story = {
  render: () => (
    <Input
      type="text"
      id="exampleTextInput5"
      placeholder="example@canonical.com"
      error="This field is required."
      label="Email address"
    />
  ),

  name: "Error",
};

export const Success: Story = {
  render: () => (
    <Input
      type="text"
      id="exampleTextInput6"
      placeholder="example@canonical.com"
      success="Verified."
      label="Email address"
    />
  ),

  name: "Success",
};

export const Caution: Story = {
  render: () => (
    <Input
      type="text"
      id="exampleTextInput7"
      placeholder="example@canonical.com"
      caution="No validation is performed in preview mode."
      label="Email address"
    />
  ),

  name: "Caution",
};

export const Required: Story = {
  render: () => (
    <Input
      type="text"
      id="exampleTextInput8"
      placeholder="example@canonical.com"
      required
      label="Email address"
    />
  ),

  name: "Required",
};

export const Checkbox: Story = {
  render: () => (
    <Input type="checkbox" id="checkExample12" defaultChecked label="HTML" />
  ),
  name: "Checkbox",
};

export const RadioButton: Story = {
  render: () => (
    <Input
      label="Linux"
      type="radio"
      name="RadioOptions"
      id="Radio12"
      defaultValue="option1"
      defaultChecked
      help="Ubuntu"
    />
  ),

  name: "Radio button",
};
