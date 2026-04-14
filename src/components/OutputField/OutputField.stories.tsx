import { Meta, StoryObj } from "@storybook/react";
import OutputField from "./OutputField";

const meta: Meta<typeof OutputField> = {
  component: OutputField,
  tags: ["autodocs"],

  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },
    id: {
      control: {
        type: "text",
      },
    },
    value: {
      control: {
        type: "text",
      },
    },
    help: {
      control: {
        type: "text",
      },
    },
    required: {
      control: {
        type: "boolean",
      },
    },
  },

  args: {
    label: "Label",
    id: "output-field",
    value: "Output value",
    help: "",
    required: false,
  },
};

export default meta;

type Story = StoryObj<typeof OutputField>;

export const Default: Story = {
  name: "Default",
};

export const HelpText: Story = {
  name: "Help Text",
  args: {
    help: "This is an output field with text",
  },
};

export const Required: Story = {
  name: "Required",
  args: {
    required: true,
  },
};
