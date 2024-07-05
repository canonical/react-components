import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import RadioInput from "./RadioInput";

const meta: Meta<typeof RadioInput> = {
  component: RadioInput,
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
    label: "RadioInput",
  },
};

export default meta;

type Story = StoryObj<typeof RadioInput>;

export const Default: Story = {
  render: () => <RadioInput label="RadioInput" />,
  name: "Default",
};

export const Children: Story = {
  render: () => (
    <RadioInput
      label={
        <>
          I agree to<a href="http://ubuntu.com/legal">Terms and Conditions</a>
        </>
      }
      name="RadioInput"
    />
  ),

  name: "Children",
};

export const Disabled: Story = {
  render: () => <RadioInput label="Disabled" name="RadioInput" disabled />,
  name: "Disabled",
};

export const Required: Story = {
  render: () => <RadioInput label="Required" name="RadioInput" required />,
  name: "Required",
};

export const Inline: Story = {
  render: () => <RadioInput label="Inline" name="RadioInput" inline />,
  name: "Inline",
};
