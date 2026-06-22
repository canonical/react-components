import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import CheckboxInput from "./CheckboxInput";

const meta: Meta<typeof CheckboxInput> = {
  component: CheckboxInput,
  tags: ["autodocs"],

  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },

    disabled: {
      control: {
        type: "boolean",
      },
    },

    required: {
      control: {
        type: "boolean",
      },
    },

    inline: {
      control: {
        type: "boolean",
      },
    },

    indeterminate: {
      control: {
        type: "boolean",
      },
    },
  },

  args: {
    label: "CheckboxInput",
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxInput>;

export const Default: Story = {
  name: "Default",
};

export const Caution: Story = {
  render: () => (
    <CheckboxInput label="Caution" caution="This is a caution message" />
  ),
  name: "Caution",
};

export const Disabled: Story = {
  render: () => <CheckboxInput label="Disabled" disabled />,
  name: "Disabled",
};

export const Error: Story = {
  render: () => (
    <CheckboxInput label="Error" error="This is an error message" />
  ),
  name: "Error",
};

export const Help: Story = {
  render: () => <CheckboxInput label="Help" help="This is a help message" />,
  name: "Help",
};

export const Indeterminate: Story = {
  render: () => <CheckboxInput label="Indeterminate" indeterminate />,
  name: "Indeterminate",
};

export const Inline: Story = {
  render: () => <CheckboxInput inline label="Inline" />,
  name: "Inline",
};

export const LabelWithChildElements: Story = {
  render: () => (
    <CheckboxInput
      label={
        <>
          I agree to<a href="http://ubuntu.com/legal">Terms and Conditions</a>
        </>
      }
      name="CheckboxInput"
    />
  ),

  name: "Label with child elements",
};

export const Required: Story = {
  render: () => <CheckboxInput label="Required" required />,
  name: "Required",
};

export const Success: Story = {
  render: () => (
    <CheckboxInput label="Success" success="This is a success message" />
  ),
  name: "Success",
};
