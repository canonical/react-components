import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import EmptyState from "./EmptyState";
import Icon, { ICONS } from "../Icon";
import Button from "../Button";

const boxImage = (
  <img
    src="https://assets.ubuntu.com/v1/c17e0d92-container.svg"
    style={{
      maxWidth: "10rem",
      maxHeight: "10rem",
    }}
    alt="empty state"
  />
);

const doNothing = () => {};

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  render: () => (
    <EmptyState
      image={boxImage}
      title="This application doesn't have any configuration parameters"
    />
  ),

  name: "Default",
};

export const WithContent: Story = {
  render: () => (
    <EmptyState image={boxImage} title="No instances found">
      <p>
        There are no instances in this project. Spin up your first instance!
      </p>
      <p>
        <a href="#todo" target="_blank">
          How to create instances
          <Icon name={ICONS.externalLink} />
        </a>
      </p>
      <Button appearance="positive" onClick={doNothing}>
        Create instance
      </Button>
    </EmptyState>
  ),

  name: "With content",
};
