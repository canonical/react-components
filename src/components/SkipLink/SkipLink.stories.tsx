import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import SkipLink from "./SkipLink";

const meta: Meta<typeof SkipLink> = {
  component: SkipLink,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SkipLink>;

export const Default: Story = {
  render: () => (
    <div>
      <SkipLink />
      <p>
        Click inside this example box, then hit the "Tab" key to make the skip
        link focused and visible.
      </p>
    </div>
  ),

  name: "Default",
};
