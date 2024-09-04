import React from "react";
import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import Slider from "./Slider";
import { SliderProps } from ".";

const Template = (args: SliderProps) => {
  const [selectedValue, setSelectedValue] = useState(50);
  return (
    <Slider
      {...args}
      onChange={(e) => setSelectedValue(Number(e.target.value))}
      value={selectedValue}
    />
  );
};

const meta: Meta<typeof Slider> = {
  component: Slider,
  render: Template,
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

    label: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: Template.bind({}),
  name: "Default",

  args: {
    disabled: false,
    label: "Volume",
    max: 100,
    min: 0,
    showInput: false,
  },
};

/**
 * You can also optionally provide a numeric representation of the slider value.
 */
export const WithInput: Story = {
  render: Template.bind({}),
  name: "With input",

  args: {
    disabled: false,
    inputDisabled: false,
    label: "Volume",
    max: 100,
    min: 0,
    showInput: true,
  },
};
