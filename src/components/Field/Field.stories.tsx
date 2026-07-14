import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Field from "./Field";

const meta: Meta<typeof Field> = {
  component: Field,
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
  },
};

export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => (
    <Field
      forId="exampleField1"
      label="Email address"
      help="Additional description for the field"
    >
      <input
        className="p-form-validation__input"
        type="text"
        id="exampleField1"
        placeholder="example@canonical.com"
      />
    </Field>
  ),

  name: "Default",
};

export const Stacked: Story = {
  render: () => (
    <Field forId="exampleField2" label="Email address" stacked>
      <input
        className="p-form-validation__input"
        type="text"
        id="exampleField2"
        placeholder="example@canonical.com"
      />
    </Field>
  ),

  name: "Stacked",
};

export const Error: Story = {
  render: () => (
    <Field
      forId="exampleField3"
      label="Email address"
      error="This field is required."
      validationId="exampleField3-error"
    >
      <input
        className="p-form-validation__input"
        type="text"
        id="exampleField3"
        placeholder="example@canonical.com"
        aria-errormessage="exampleField3-error"
        aria-invalid="true"
      />
    </Field>
  ),

  name: "Error",
};

export const Success: Story = {
  render: () => (
    <Field
      forId="exampleField4"
      label="Email address"
      success="Verified."
      validationId="exampleField4-success"
    >
      <input
        className="p-form-validation__input"
        type="text"
        id="exampleField4"
        placeholder="example@canonical.com"
        aria-describedby="exampleField4-success"
      />
    </Field>
  ),

  name: "Success",
};

export const Caution: Story = {
  render: () => (
    <Field
      forId="exampleField5"
      label="Email address"
      caution="No validation is performed in preview mode."
      validationId="exampleField5-caution"
    >
      <input
        className="p-form-validation__input"
        type="text"
        id="exampleField5"
        placeholder="example@canonical.com"
        aria-errormessage="exampleField5-caution"
        aria-invalid="true"
      />
    </Field>
  ),

  name: "Caution",
};

export const Required: Story = {
  render: () => (
    <Field forId="exampleField6" label="Email address" required>
      <input
        className="p-form-validation__input"
        type="text"
        id="exampleField6"
        placeholder="example@canonical.com"
      />
    </Field>
  ),

  name: "Required",
};
