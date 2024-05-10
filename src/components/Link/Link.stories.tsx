import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Link from "./Link";
import Strip from "../Strip";

const meta: Meta<typeof Link> = {
  component: Link,
  tags: ["autodocs"],

  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  name: "Default",

  args: {
    children:
      "Fast, secure and simple, Ubuntu powers millions of PCs worldwide",
  },
};

export const Soft: Story = {
  render: () => <Link soft>Learn about MAAS</Link>,
  name: "Soft",
};

export const Inverted: Story = {
  render: () => (
    <Strip type="dark">
      <Link inverted>Package & publish your app</Link>
    </Strip>
  ),

  name: "Inverted",
};

export const BackToTop: Story = {
  render: () => <Link top>Back to top</Link>,
  name: "Back to top",
};
