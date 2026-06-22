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

export const Caution: Story = {
  render: () => (
    <RadioInput label="Caution" caution="This is a caution message" />
  ),
  name: "Caution",
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

export const Error: Story = {
  render: () => <RadioInput label="Error" error="This is an error message" />,
  name: "Error",
};

export const Help: Story = {
  render: () => <RadioInput label="Help" help="This is a help message" />,
  name: "Help",
};

export const Inline: Story = {
  render: () => <RadioInput inline label="Inline" />,
  name: "Inline",
};

export const Required: Story = {
  render: () => <RadioInput label="Required" name="RadioInput" required />,
  name: "Required",
};

export const Success: Story = {
  render: () => (
    <RadioInput label="Success" success="This is a success message" />
  ),
  name: "Success",
};
