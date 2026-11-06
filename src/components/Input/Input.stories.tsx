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
  name: "Stacked",

  args: {
    type: "text",
    id: "exampleTextInput3",
    placeholder: "example@canonical.com",
    stacked: true,
    label: "Email address",
  },
};

export const Disabled: Story = {
  name: "Disabled",

  args: {
    type: "text",
    id: "exampleTextInput4",
    placeholder: "example@canonical.com",
    disabled: true,
    label: "Email address",
  },
};

export const Error: Story = {
  name: "Error",

  args: {
    type: "text",
    id: "exampleTextInput5",
    placeholder: "example@canonical.com",
    error: "This field is required.",
    label: "Email address",
  },
};

export const Success: Story = {
  name: "Success",

  args: {
    type: "text",
    id: "exampleTextInput6",
    placeholder: "example@canonical.com",
    success: "Verified.",
    label: "Email address",
  },
};

export const Caution: Story = {
  name: "Caution",

  args: {
    type: "text",
    id: "exampleTextInput7",
    placeholder: "example@canonical.com",
    caution: "No validation is performed in preview mode.",
    label: "Email address",
  },
};

export const Required: Story = {
  name: "Required",

  args: {
    type: "text",
    id: "exampleTextInput8",
    placeholder: "example@canonical.com",
    required: true,
    label: "Email address",
  },
};

export const Checkbox: Story = {
  name: "Checkbox",

  args: {
    type: "checkbox",
    id: "checkExample12",
    defaultChecked: true,
    label: "HTML",
  },
};

export const RadioButton: Story = {
  name: "Radio button",

  args: {
    label: "Linux",
    type: "radio",
    name: "RadioOptions",
    id: "Radio12",
    defaultValue: "option1",
    defaultChecked: true,
    help: "Ubuntu",
  },
};
