import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Badge from "components/Badge";

import SideNavigation from "./SideNavigation";

const meta: Meta<typeof SideNavigation> = {
  component: SideNavigation,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SideNavigation>;

/**
 * Menu items can be provided as links, text or custom components.
 */
export const Default: Story = {
  args: {
    items: [
      {
        icon: "drag",
        label: "Models",
        status: <Badge value={9} isNegative />,
      },
      {
        icon: "menu",
        label: "Controllers",
        nonInteractive: true,
      },
      <div>Custom item</div>,
    ],
  },
};

/**
 * To display multiple menus a nested array of items can be used.
 */
export const MultipleMenus: Story = {
  args: {
    items: [
      [
        {
          icon: "drag",
          label: "Models",
          href: "/models",
        },
        {
          icon: "menu",
          label: "Controllers",
          href: "/controllers",
        },
        {
          icon: "user",
          label: "Permissions",
          href: "/users",
        },
      ],
      [
        {
          icon: "information",
          label: "Docs",
          href: "/docs",
        },
        {
          label: "Logout",
          href: "/logout",
        },
      ],
    ],
  },
};

/**
 * To provide attributes to individual menus then each menu can be provided as a
 * object containing an items array: `{ className: "menu-one", items: [...] }`.
 */
export const ListAttributes: Story = {
  args: {
    items: [
      {
        className: "menu-one",
        items: [
          {
            icon: "drag",
            label: "Models",
            href: "/models",
          },
          {
            icon: "menu",
            label: "Controllers",
            href: "/controllers",
          },
          {
            icon: "user",
            label: "Permissions",
            href: "/users",
          },
        ],
      },
      {
        className: "menu-two",
        items: [
          {
            icon: "information",
            label: "Docs",
            href: "/docs",
          },
          {
            label: "Logout",
            href: "/logout",
          },
        ],
      },
    ],
  },
};

/**
 * `children` can be provided instead of `items` in cases where custom content
 * is required.
 */
export const CustomContent: Story = {
  args: {
    children: <div>Custom menu content.</div>,
  },
};
