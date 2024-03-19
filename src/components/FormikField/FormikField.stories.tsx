import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import FormikField from "./FormikField";
import Select from "../Select";
import { Formik } from "formik";

const meta: Meta<typeof FormikField> = {
  title: "FormikField",
  component: FormikField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FormikField>;

export const Default: Story = {
  render: () => (
    <Formik initialValues={{ username: "" }} onSubmit={() => {}}>
      <FormikField name="username" label="Username" type="text" />
    </Formik>
  ),
};

export const Fields: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Any React Components input can be provided to FormikField (e.g. Input, Textarea or Select) or you may provide a custom component.

Any additional props that need to be passed can be given to FormikField.
        `,
      },
    },
  },
  render: () => (
    <Formik initialValues={{ release: "" }} onSubmit={() => {}}>
      <FormikField
        component={Select}
        name="release"
        label="Release"
        options={[
          { value: "", disabled: true, label: "Select an option" },
          { value: "1", label: "Cosmic Cuttlefish" },
          { value: "2", label: "Bionic Beaver" },
          { value: "3", label: "Xenial Xerus" },
        ]}
      />
    </Formik>
  ),
};

export const Errors: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Formik parameters are passed to the field using Formik's \`useField\`. This means that validation and errors, state handlers etc. should all just work.
        `,
      },
    },
  },
  render: () => (
    <Formik
      initialErrors={{ username: "This username has already been taken." }}
      initialTouched={{ username: true }}
      initialValues={{ username: "" }}
      onSubmit={() => {}}
    >
      <FormikField name="username" label="Username" type="text" />
    </Formik>
  ),
};
