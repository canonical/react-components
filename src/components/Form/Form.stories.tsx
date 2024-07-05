import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Form from "./Form";
import Input from "../Input";
import Select from "../Select";

const meta: Meta<typeof Form> = {
  component: Form,
  tags: ["autodocs"],

  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  name: "Default",

  args: {
    children: (
      <>
        <Input
          type="text"
          id="exampleInputEmail12"
          placeholder="example@canonical.com"
          label="Email address"
        />
        <Input
          type="password"
          id="exampleInputPassword12"
          placeholder="******"
          label="Password"
        />
        <Input type="file" id="exampleInputFile2" label="File input" />
        <Input
          type="checkbox"
          id="CheckMe2"
          label={
            "I agree to receive information about Canonical’s products and services."
          }
        />
      </>
    ),
  },
};

export const Fieldset: Story = {
  render: () => (
    <Form>
      <fieldset>
        <Input
          placeholder="Joe"
          id="list-input-12"
          type="text"
          label="First name"
        />
        <Input
          placeholder="Bloggs"
          id="list-input-22"
          type="text"
          label="Last name"
        />
        <Input
          placeholder="example@canonical.com"
          id="list-input-32"
          type="text"
          label="Email address"
        />
      </fieldset>
    </Form>
  ),

  name: "Fieldset",
};

export const Inline: Story = {
  render: () => (
    <Form inline>
      <Input
        type="text"
        id="username-inline2"
        className="p-form__control"
        label="Username"
        help="30 characters or fewer."
      />
      <Input
        type="text"
        id="address-inline22"
        aria-invalid="true"
        label="Email address"
        error="Please enter a valid email address."
      />
    </Form>
  ),

  name: "Inline",
};

export const Stacked: Story = {
  render: () => (
    <Form stacked>
      <Input type="text" id="full-name-stacked2" label="Full name" stacked />
      <Input
        type="text"
        id="username-stacked2"
        label="Username"
        stacked
        help="30 characters or fewer."
      />
      <Input
        type="text"
        id="username-stacked-error2"
        label="Email address"
        stacked
        error="This field is required"
      />
      <Input
        type="text"
        id="address-optional-stacked2"
        label="Address line 1"
        stacked
      />
      <Input
        type="text"
        id="address-optional-stacked3"
        label="Address line 2"
        stacked
      />
    </Form>
  ),

  name: "Stacked",
};

export const Disabled: Story = {
  render: () => (
    <Form>
      <Input
        label="Email address"
        type="text"
        id="disabled-input2"
        placeholder="example@canonical.com"
        disabled
      />
    </Form>
  ),

  name: "Disabled",
};

export const Validation: Story = {
  render: () => (
    <Form>
      <Input
        type="text"
        id="exampleTextInputError2"
        placeholder="example@canonical.com"
        label="Email address"
        error="This field is required."
      />
      <Input
        type="text"
        id="exampleTextInputCaution2"
        placeholder="14"
        label="Mail configuration ID"
        caution="No validation is performed in preview mode."
      />
      <Input
        type="text"
        id="exampleTextInputSuccess2"
        placeholder="**** **** **** ****"
        label="Card number"
        success="Verified."
      />
      <Select
        id="exampleSelectInputError3"
        defaultValue=""
        options={[
          {
            value: "",
            disabled: true,
            label: "--Select an option--",
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
        error="You need to select an OS to complete your install."
      />
    </Form>
  ),

  name: "Validation",
};

export const Required: Story = {
  render: () => (
    <Form>
      <Input
        type="text"
        id="exampleTextInputError3"
        placeholder="e.g joe@bloggs.com"
        error="This field is required."
        label="Email address"
        required
      />
    </Form>
  ),

  name: "Required",
};
