import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import PrefixedIpInput from "./PrefixedIpInput";

const PrefixedIpInputWrapper = (
  args: React.ComponentProps<typeof PrefixedIpInput>,
) => {
  const [ip, setIp] = useState(args.ip);
  return (
    <PrefixedIpInput
      {...args}
      ip={ip}
      onIpChange={(newIp) => {
        setIp(newIp);
        args.onIpChange?.(newIp);
      }}
    />
  );
};

const meta: Meta<typeof PrefixedIpInput> = {
  component: PrefixedIpInput,
  tags: ["autodocs"],
  argTypes: {
    ip: { control: "text" },
    cidr: { control: "text" },
    label: { control: "text" },
    name: { control: "text" },
    error: { control: "text" },
    help: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  render: (args) => <PrefixedIpInputWrapper {...args} />,
};

export default meta;

type Story = StoryObj<typeof PrefixedIpInput>;

export const IPv4Default: Story = {
  name: "IPv4 default",
  args: {
    cidr: "192.168.1.0/24",
    ip: "",
    name: "ip-address",
    label: "IP Address",
    onIpChange: (ip) => console.log("IP changed:", ip),
  },
};

export const IPv4WithValue: Story = {
  name: "IPv4 with value",
  args: {
    cidr: "192.168.1.0/24",
    ip: "192.168.1.100",
    name: "ip-address",
    label: "IP Address",
    onIpChange: (ip) => console.log("IP changed:", ip),
  },
};

export const IPv4WithError: Story = {
  name: "IPv4 with error",
  args: {
    cidr: "192.168.1.0/24",
    ip: "192.168.1.256",
    name: "ip-address",
    label: "IP Address",
    error: "Invalid IP address",
    onIpChange: (ip) => console.log("IP changed:", ip),
  },
};

export const IPv4Disabled: Story = {
  name: "IPv4 disabled",
  args: {
    cidr: "192.168.1.0/24",
    ip: "192.168.1.50",
    name: "ip-address",
    label: "IP Address",
    disabled: true,
    onIpChange: (ip) => console.log("IP changed:", ip),
  },
};

export const IPv6Default: Story = {
  name: "IPv6 default",
  args: {
    cidr: "2001:db8::/32",
    ip: "",
    name: "ipv6-address",
    label: "IPv6 Address",
    onIpChange: (ip) => console.log("IP changed:", ip),
  },
};

export const IPv6WithValue: Story = {
  name: "IPv6 with value",
  args: {
    cidr: "2001:db8::/32",
    ip: "2001:db8::1",
    name: "ipv6-address",
    label: "IPv6 Address",
    onIpChange: (ip) => console.log("IP changed:", ip),
  },
};

export const WithCustomHelp: Story = {
  args: {
    cidr: "10.0.0.0/16",
    ip: "",
    name: "ip-address",
    label: "IP Address",
    help: "Enter a custom IP address for this device",
    onIpChange: (ip) => console.log("IP changed:", ip),
  },
};

export const Required: Story = {
  args: {
    cidr: "192.168.0.0/24",
    ip: "",
    name: "ip-address",
    label: "IP Address",
    required: true,
    onIpChange: (ip) => console.log("IP changed:", ip),
  },
};
