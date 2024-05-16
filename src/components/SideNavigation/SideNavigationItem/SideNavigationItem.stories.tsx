import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import SideNavigation from "../SideNavigation";

import SideNavigationItem from "./SideNavigationItem";
import SideNavigationText from "../SideNavigationText";

const meta: Meta<typeof SideNavigationItem> = {
  component: SideNavigationItem,
  render: (args) => (
    <SideNavigation
      dark={false}
      items={[<SideNavigationItem {...args} dark={false} />]}
    />
  ),
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SideNavigationItem>;

export const Default: Story = {
  args: {
    icon: "drag",
    label: "Models",
    href: "/models",
  },
};

/**
 * The navigation item can appear as a link and accept the props from [`SideNavigationLink`](/docs/components-sidenavigation-sidenavigationlink--docs).
 */
export const Links: Story = {
  args: {
    icon: "drag",
    label: "Models",
    href: "/models",
  },
};

/**
 * By providing the `nonInteractive` prop the navigation item will appear as a
 * text entry and accept the props from
 * [`SideNavigationText`](/docs/components-sidenavigation-sidenavigationtext--docs).
 */
export const Text: Story = {
  args: {
    icon: "drag",
    label: "Models",
    nonInteractive: true,
  },
};

/**
 * The navigation item can display custom content by providing the `children` prop.
 * In this case, any other attributes provided to the object will be given to
 * the list item.
 */
export const CustomContent: Story = {
  args: {
    className: "custom-class",
    children: (
      <SideNavigationText>
        This item has been given a custom class
      </SideNavigationText>
    ),
  },
};
