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

export const Children: Story = {
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

export const Disabled: Story = {
  render: () => <CheckboxInput label="Disabled" disabled />,
  name: "Disabled",
};

export const Required: Story = {
  render: () => <CheckboxInput label="Required" required />,
  name: "Required",
};

export const Inline: Story = {
  render: () => <CheckboxInput label="Inline" inline />,
  name: "Inline",
};

export const Indeterminate: Story = {
  render: () => <CheckboxInput label="Indeterminate" indeterminate />,
  name: "Indeterminate",
};
