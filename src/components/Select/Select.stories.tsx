import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Select from "./Select";

const meta: Meta<typeof Select> = {
  component: Select,
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

    options: {
      control: {
        disable: true,
      },
    },

    required: {
      control: {
        type: "boolean",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  name: "Select",

  args: {
    name: "exampleSelect",
    id: "exampleSelect2",
    defaultValue: "",

    options: [
      {
        value: "",
        disabled: true,
        label: "Select an option",
      },
      {
        value: "1",
        label: "Cosmic Cuttlefish",
      },
      {
        value: "2",
        label: "Bionic Beaver",
      },
      {
        value: "3",
        label: "Xenial Xerus",
      },
    ],

    label: "Ubuntu releases",
  },
};

export const SelectMultiple: Story = {
  render: () => (
    <Select
      name="exampleSelectMulti"
      id="exampleSelectMulti2"
      options={[
        {
          value: "",
          disabled: true,
          label: "Select...",
        },
        {
          value: "1",
          label: "Cosmic Cuttlefish",
        },
        {
          value: "2",
          label: "Bionic Beaver",
        },
        {
          value: "3",
          label: "Xenial Xerus",
        },
      ]}
      label="Ubuntu releases"
      multiple
    />
  ),

  name: "Select multiple",
};

export const RequiredSelect: Story = {
  args: {
    required: true,
  },

  render: (args) => (
    <form>
      <Select
        name="exampleSelectRequired"
        id="exampleSelectRequired"
        options={[
          {
            value: "",
            disabled: true,
            label: "Select an option",
          },
          {
            value: "1",
            label: "Cosmic Cuttlefish",
          },
          {
            value: "2",
            label: "Bionic Beaver",
          },
          {
            value: "3",
            label: "Xenial Xerus",
          },
        ]}
        label="Ubuntu releases (required)"
        required={args.required}
        defaultValue=""
      />
      <button type="submit">Submit</button>
    </form>
  ),

  name: "Select with required",
};
