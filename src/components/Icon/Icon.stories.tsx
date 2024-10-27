import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Icon, {
  ICONS,
  STANDART_ICONS,
  ADDITIONAL_ICONS,
  SOCIAL_ICONS,
  STATUS_ICONS,
} from "./Icon";

import "./Icon.stories.scss";

const meta: Meta<typeof Icon> = {
  component: Icon,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Base: Story = {
  name: "Base",
  argTypes: {
    name: {
      options: Object.keys(ICONS),
      control: { type: "select" },
    },
  },
  args: {
    name: ICONS.facebook,
  },
};

export const Standart: Story = {
  name: "Standart",
  argTypes: {
    name: {
      options: Object.keys(STANDART_ICONS),
      control: { type: "select" },
    },
  },
  args: {
    name: STANDART_ICONS.plus,
  },
};

/**
 * To use custom icons that are not included in Vanilla you need to provide your own icon styling following the `.p-icon--{name}` convention.
 */
export const Custom: Story = {
  render: () => <Icon name="custom" />,
  name: "Custom",
};

/**
 * To use custom icons that provide the name of the social media icon following the `.p-icon--{name}` convention.
 */
export const Social: Story = {
  name: "Social",
  argTypes: {
    name: {
      options: Object.keys(SOCIAL_ICONS),
      control: { type: "select" },
    },
  },
  args: {
    name: SOCIAL_ICONS.facebook,
  },
};

/**
 * Outside of the standard set, additional icons are available for use, and need to be individually imported as `@include vf-p-icon-{name};`.
 * To use additional icons that provide the name of the additional icon following the `.p-icon--{name}` convention.
 */
export const Additional: Story = {
  name: "Additional",
  argTypes: {
    name: {
      options: Object.keys(ADDITIONAL_ICONS),
      control: { type: "select" },
    },
  },
  args: {
    name: ADDITIONAL_ICONS.applications,
  },
};

const allIcons = {
  Standard: STANDART_ICONS,
  Additional: ADDITIONAL_ICONS,
  Social: SOCIAL_ICONS,
  Status: STATUS_ICONS,
};

/**
 * Here are provided all the icons that can be used following the `.p-icon--{name}` convention.
 */
export const AllIcons: Story = {
  render: () => (
    <>
      {Object.entries(allIcons).map(([name, icons]) => (
        <>
          <h2>{name}</h2>
          <div className="grid-row">
            {Object.keys(icons).map((icon) => (
              <div key={icon} className="p-card grid-col-2">
                <p>
                  <Icon name={icon} style={{ marginRight: ".5rem" }} />
                  <span>{icon}</span>
                </p>
              </div>
            ))}
          </div>
        </>
      ))}
    </>
  ),
  name: "All icons",
};
