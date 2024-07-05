import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import PasswordToggle from "./PasswordToggle";

const meta: Meta<typeof PasswordToggle> = {
  component: PasswordToggle,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PasswordToggle>;

export const Default: Story = {
  render: () => <PasswordToggle id="examplePassword1" label="Password" />,
  name: "Default",
};

export const ReadOnly: Story = {
  render: () => (
    <PasswordToggle
      id="examplePassword2"
      label="Password"
      readOnly
      defaultValue="password"
    />
  ),
  name: "Read only",
};

export const Error: Story = {
  render: () => (
    <PasswordToggle
      error="This field is required."
      id="examplePassword3"
      label="Password"
      defaultValue="password"
    />
  ),

  name: "Error",
};

export const Success: Story = {
  render: () => (
    <PasswordToggle
      success="Strong password"
      id="examplePassword4"
      label="Password"
      defaultValue="password"
    />
  ),

  name: "Success",
};

export const Caution: Story = {
  render: () => (
    <PasswordToggle
      caution="Weak password"
      id="examplePassword5"
      label="Password"
      defaultValue="password"
    />
  ),

  name: "Caution",
};

export const Help: Story = {
  render: () => (
    <PasswordToggle
      help="Enter a secure password"
      id="examplePassword6"
      label="Password"
    />
  ),
  name: "Help",
};

export const Disabled: Story = {
  render: () => (
    <PasswordToggle
      disabled
      id="examplePassword7"
      label="Password"
      defaultValue="password"
    />
  ),
  name: "Disabled",
};
