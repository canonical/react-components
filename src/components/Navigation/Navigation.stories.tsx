import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Navigation from "./Navigation";
import { Theme } from "../../enums";

const meta: Meta<typeof Navigation> = {
  component: Navigation,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Navigation>;

/**
 * The default navigation is constrained to the max width of the Vanilla grid and
uses the light theme.
 */
export const Default: Story = {
  name: "Default",

  args: {
    items: [
      {
        label: "Products",
        url: "#",
      },
      {
        label: "Services",
        url: "#",
      },
      {
        label: "Partners",
        url: "#",
      },
    ],

    logo: {
      src: "https://assets.ubuntu.com/v1/82818827-CoF_white.svg",
      title: "Canonical",
      url: "#",
    },
  },
};

/**
 * You can switch to a dark themed Navigation by using the `dark` prop. This will
automatically update the Navigation items to use lighter text and hover state
colours.
 */
export const Dark: Story = {
  name: "Dark",

  args: {
    items: [
      {
        label: "Products",
        url: "#",
      },
      {
        label: "Services",
        url: "#",
      },
      {
        label: "Partners",
        url: "#",
      },
    ],

    logo: {
      src: "https://assets.ubuntu.com/v1/82818827-CoF_white.svg",
      title: "Canonical",
      url: "#",
    },

    theme: Theme.DARK,
  },
};

/**
 * Sub-navigation dropdown menus can be added to Navigation by adding an `items`
array instead of a URL. By default, the dropdown items will align to the left of the
parent item. This can be changed by adding `alignRight` to the subnav
object.
 */
export const Dropdown: Story = {
  name: "Dropdown",

  args: {
    items: [
      {
        items: [
          {
            label: "Introduction",
            url: "#",
          },
          {
            label: "News",
            url: "#",
          },
          {
            label: "Getting started - Command line",
            url: "#",
          },
          {
            label: "Getting started - OpenStack",
            url: "#",
          },
          {
            label: "Getting started - OpenNebula",
            url: "#",
          },
        ],

        label: "LXD",
      },
      {
        items: [
          {
            label: "Introduction",
            url: "#",
          },
          {
            label: "News",
            url: "#",
          },
          {
            label: "Getting started",
            url: "#",
          },
        ],

        label: "LXCFS",
      },
    ],

    itemsRight: [
      {
        alignRight: true,

        items: [
          {
            label: "Sign out",
            url: "#",
          },
        ],

        label: "My account",
      },
    ],

    logo: {
      src: "https://assets.ubuntu.com/v1/82818827-CoF_white.svg",
      title: "LXD",
      url: "#",
    },
  },
};

/**
 * Expanding search can be enabled by providing props to the underlying [`SearchBox`](/?path=/docs/searchbox--default-story)
component. Elements to toggle the Searchbox will be included automatically if
the SearchBox props are provided.
 */
export const Search: Story = {
  name: "Search",

  args: {
    items: [
      {
        label: "Products",
        url: "#",
      },
      {
        label: "Services",
        url: "#",
      },
      {
        label: "Partners",
        url: "#",
      },
    ],

    logo: {
      src: "https://assets.ubuntu.com/v1/82818827-CoF_white.svg",
      title: "Canonical",
      url: "#",
    },

    searchProps: {
      onSearch: () => null,
    },
  },
};

/**
 * Logos can be displayed using the new tag design. In cases where another logo
style is required then an element can be provided to the `logo` prop.
 */
export const OverridingTheLogo: Story = {
  name: "Overriding the logo",

  args: {
    items: [
      {
        label: "Products",
        url: "#",
      },
      {
        label: "Services",
        url: "#",
      },
      {
        label: "Partners",
        url: "#",
      },
    ],

    logo: (
      <img
        alt=""
        src="https://assets.ubuntu.com/v1/5d6da5c4-logo-canonical-aubergine.svg"
        width="100"
      />
    ),
  },
};

/**
 * In some cases such as when using [React Router](https://reactrouter.com/) it is
necessary to use custom components for links. When this is required then a
function can be passed to `generateLink` which should return your component.
Bear in mind that some props like classes and on-click events might be passed to
this function so take care in overriding any link props.
 */
export const OverridingTheLinkComponent: Story = {
  name: "Overriding the link component",

  args: {
    generateLink: ({ label, className }) => (
      <button className={className}>{label}</button>
    ),

    items: [
      {
        label: "Products",
        url: "#",
      },
      {
        label: "Services",
        url: "#",
      },
      {
        label: "Partners",
        url: "#",
      },
    ],

    logo: {
      src: "https://assets.ubuntu.com/v1/82818827-CoF_white.svg",
      title: "Canonical",
      url: "#",
    },
  },
};

export const NoMenuItems: Story = {
  name: "No menu items",

  args: {
    generateLink: ({ label, className }) => (
      <button className={className}>{label}</button>
    ),

    logo: {
      src: "https://assets.ubuntu.com/v1/82818827-CoF_white.svg",
      title: "Canonical",
      url: "#",
    },
  },
};
