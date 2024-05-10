import { Meta, StoryObj } from "@storybook/react";

import Textarea from "./Textarea";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
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
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  name: "Default",

  args: {
    label: "Tell us about your project or interest",
    id: "textarea2",
    rows: 3,
    defaultValue: "Ubuntu",
  },
};

export const DynamicHeight: Story = {
  name: "Dynamic Height",

  args: {
    label: "Text area that will dynamically adjust its height based on content",
    defaultValue: "Ubuntu",
    grow: true,
  },
};
