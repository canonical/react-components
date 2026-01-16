import type { Meta, StoryObj } from "@storybook/react";
import PrefixedInput from "./PrefixedInput";

const meta: Meta<typeof PrefixedInput> = {
  component: PrefixedInput,
  tags: ["autodocs"],
  title: "PrefixedInput",
};

export default meta;

type Story = StoryObj<typeof PrefixedInput>;

export const Default: Story = {
  args: {
    immutableText: "https://",
    placeholder: "example.com",
  },
};

export const WithLabel: Story = {
  args: {
    immutableText: "https://",
    label: "Website URL",
    placeholder: "example.com",
  },
};

export const WithValue: Story = {
  args: {
    immutableText: "$",
    label: "Price",
    value: "100.00",
    placeholder: "0.00",
  },
};

export const Disabled: Story = {
  args: {
    immutableText: "@",
    label: "Username",
    placeholder: "username",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    immutableText: "https://",
    label: "Website URL",
    placeholder: "example.com",
    error: "Invalid URL format",
  },
};

export const WithHelpText: Story = {
  args: {
    immutableText: "User ID:",
    label: "User Identifier",
    placeholder: " Enter user ID",
    help: "This will be used to identify your account",
  },
};

export const Required: Story = {
  args: {
    immutableText: "https://",
    label: "Website URL",
    placeholder: "example.com",
    required: true,
  },
};
