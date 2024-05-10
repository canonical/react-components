import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import List from "./List";
import StatusLabel from "../StatusLabel";

const meta: Meta<typeof List> = {
  component: List,
  tags: ["autodocs"],

  argTypes: {
    items: {
      control: {
        disable: true,
      },
    },

    stepped: {
      control: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  name: "Default",

  args: {
    items: ["Digital signage", "Robotics", "Gateways"],
  },
};

export const Ticked: Story = {
  render: () => (
    <List
      items={[
        "Hardware guidance and sizing",
        "Fixed-price deployment",
        "Reference architecture",
      ]}
      ticked
    />
  ),

  name: "Ticked",
};

export const HorizontalDivider: Story = {
  render: () => (
    <List
      items={[
        "Single-command install and upgrade",
        "Postgres database for reliable state",
        "High availability for all services",
      ]}
      divided
    />
  ),

  name: "Horizontal divider",
};

export const TickedWithHorizontalDivider: Story = {
  render: () => (
    <List
      items={[
        "Balance compute load in the cloud",
        "Optimise for specific workloads",
        "Assess overcommit ratios",
      ]}
      divided
      ticked
    />
  ),

  name: "Ticked with horizontal divider",
};

export const Inline: Story = {
  render: () => (
    <List items={["Community", "Careers", "Press centre"]} inline />
  ),
  name: "Inline",
};

export const Middot: Story = {
  render: () => (
    <List
      items={["Legal information", "Data privacy", "Report a bug on this site"]}
      middot
    />
  ),

  name: "Middot",
};

export const Stretch: Story = {
  render: () => (
    <List
      items={[
        {
          content: <h3>Documentation</h3>,
        },
        {
          content: <StatusLabel appearance="positive">New</StatusLabel>,
          className: "u-vertically-center u-align--right",
        },
      ]}
      stretch
    />
  ),

  name: "Stretch",
};

export const VerticalStepped: Story = {
  render: () => (
    <List
      items={[
        {
          title: "Log in to JAAS",
          content:
            "Ensure you have an Ubuntu SSO account before contacting JAAS. Log in to JAAS now.",
        },
        {
          title: "Configure a model",
          content:
            'Applications are contained within models and are installed via charms. Configure your model by pressing the "Start a new model" button.',
        },
        {
          title: "Credentials and SSH keys",
          content:
            "After having selected a cloud, a form will appear for submitting your credentials to JAAS. The below resources are available if you need help with gathering credentials.",
        },
      ]}
      stepped
    />
  ),

  name: "Vertical stepped",
};

export const HorizontalStepped: Story = {
  render: () => (
    <List
      items={[
        {
          title: "Log in to JAAS",
          content:
            "Ensure you have an Ubuntu SSO account before contacting JAAS. Log in to JAAS now.",
        },
        {
          title: "Configure a model",
          content:
            'Applications are contained within models and are installed via charms. Configure your model by pressing the "Start a new model" button.',
        },
      ]}
      stepped
      detailed
    />
  ),

  name: "Horizontal stepped",
};

export const Split: Story = {
  render: () => (
    <List
      items={[
        "Jointly shape the OpenStack architecture",
        "We help you plan your cloud hardware requirements",
        "We build OpenStack in your data center",
        "We operate the cloud to an SLA",
        "Transparent audit, logging, monitoring and management",
        "When your team is ready, we hand over the keys",
      ]}
      divided
      split
      ticked
    />
  ),

  name: "Split",
};
