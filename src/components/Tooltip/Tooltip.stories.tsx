import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Button from "../Button";
import Tooltip, { position } from "./Tooltip";

const Template = (args) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
      <Tooltip {...args}>
        <Button className="u-no-margin--bottom">Hover over me!</Button>
      </Tooltip>
    </div>
  );
};

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  render: Template,
  tags: ["autodocs"],

  argTypes: {
    position: {
      control: {
        type: "radio",
      },

      options: Object.values(position),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: Template.bind({}),
  name: "Default",

  args: {
    message: (
      <>
        Tooltip{" "}
        <a href="#todo" target="_blank">
          Link1
        </a>
      </>
    ),
  },
};

export const FollowMouse: Story = {
  render: Template.bind({}),
  name: "Follow mouse",

  args: {
    followMouse: true,
    message: "Tooltip message to display.",
    position: "top-center",
  },
};

/**
 * The tooltip elements are displayed inside a [Portal](https://reactjs.org/docs/portals.html) so that the tooltip is not constrained by its current position in the DOM.
 * Sometimes however, you need to target the tooltip elements. This can be achieved by passing class names to the tooltip elements. You can also pass classes to the elements that trigger and position the tooltip.
 */
export const TargetingElements: Story = {
  render: Template.bind({}),
  name: "Targeting elements",

  args: {
    className: "custom-wrapping-class",
    positionElementClassName: "custom-position-class",
    tooltipClassName: "custom-tooltip-class",
    message: "Tooltip message to display.",
  },
};
