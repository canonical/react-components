import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Step from "./Step";
import Stepper from "../Stepper";

const meta: Meta<typeof Step> = {
  component: Step,
  render: (args) => (
    <Stepper variant="horizontal" steps={[<Step key="step" {...args} />]} />
  ),
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Step>;

export const Default: Story = {
  name: "Default",

  args: {
    title: "Step 1",
    index: 1,
    enabled: false,
    hasProgressLine: false,
    iconName: "number",
    handleClick: () => {},
  },
};
