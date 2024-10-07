import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Row from "./Row";
import Col from "../Col";

const meta: Meta<typeof Row> = {
  component: Row,
  tags: ["autodocs"],

  argTypes: {
    children: {
      control: {
        type: "text",
      },
      description: "The content of the row.",
    },
    fourColumnMedium: {
      control: {
        type: "boolean",
      },
      type: { name: "boolean", required: false },
      description: "Whether the row has four columns on medium screens.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Row>;

/**
 * See [Col](?path=/docs/components-col--docs) for grid details.
 */
export const Default: Story = {
  name: "Default",

  args: {
    children: (
      <>
        <Col size={3} medium={2}>
          .col-3.col-medium-2
        </Col>
        <Col size={6} medium={2}>
          .col-6.col-medium-2
        </Col>
        <Col size={3} medium={2}>
          .col-3.col-medium-2
        </Col>
      </>
    ),
  },
};

export const FourColumnMediumGrid: Story = {
  name: "Four column medium grid",

  args: {
    children: (
      <>
        <Col size={3} medium={2}>
          .col-3.col-medium-2
        </Col>
        <Col size={6} medium={1}>
          .col-6.col-medium-1
        </Col>
        <Col size={3} medium={1}>
          .col-3.col-medium-1
        </Col>
      </>
    ),
    fourColumnMedium: true,
  },
};
