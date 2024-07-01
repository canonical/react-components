import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Panel from "./Panel";
import Button from "components/Button";
import Icon from "components/Icon";

const meta: Meta<typeof Panel> = {
  component: Panel,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  args: {
    children: "Panel content",
    title: "Panel",
  },
};

export const Header: Story = {
  args: {
    controls: (
      <Button appearance="positive">
        <Icon name="plus" light /> Create
      </Button>
    ),
    title: "Panel title",
    titleComponent: "h1",
  },
};

/**
 * The logo may be provided as attributes to use the standard logo. If this is
 * not sufficient the a `ReactNode` can be passed to the `logo` prop instead.
 */
export const Logo: Story = {
  args: {
    logo: {
      icon: "https://assets.ubuntu.com/v1/7144ec6d-logo-jaas-icon.svg",
      name: "https://assets.ubuntu.com/v1/a85f7947-juju_black-text-only.svg",
      nameAlt: "Juju",
    },
  },
};

/**
 * If the default header does not meet your needs then a `ReactNode` can be
 * passed to the `header` prop to replace the header.
 */
export const CustomHeader: Story = {
  args: {
    header: (
      <div className="p-panel__header">
        This header replaces the entire header area
      </div>
    ),
  },
};
