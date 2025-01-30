import React, { HTMLProps } from "react";
import { Meta, StoryObj } from "@storybook/react";

import Tooltip from "components/Tooltip";

import Button, { ButtonAppearance } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],

  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },

    appearance: {
      control: {
        options: ButtonAppearance,
        type: "select",
      },
    },
  },

  args: {
    children: "Click me!",
    appearance: ButtonAppearance.DEFAULT,
  },
};

export default meta;

type Story<P = null> = StoryObj<typeof Button<P>>;

export const Default: Story = {
  name: "Default",

  args: {
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story: "Button with default appearance",
      },
    },
  },
};

export const DefaultDisabled: Story = {
  name: "Default disabled",

  args: {
    children: "Button",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled button with default appearance",
      },
    },
  },
};

export const Base: Story = {
  name: "Base",

  args: {
    children: "Base button",
    appearance: "base",
  },
  parameters: {
    docs: {
      description: {
        story: "Button with base appearance",
      },
    },
  },
};

export const BaseDisabled: Story = {
  name: "Base disabled",

  args: {
    children: "Base button disabled",
    appearance: "base",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled button with base appearance",
      },
    },
  },
};

export const Link = {
  name: "Link",

  args: {
    children: "Link button",
    appearance: "link",
  },
  parameters: {
    docs: {
      description: {
        story: "Button with link appearance",
      },
    },
  },
};

export const LinkDisabled = {
  name: "Link disabled",

  args: {
    children: "Link button disabled",
    appearance: "link",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled button with link appearance",
      },
    },
  },
};

export const Positive: Story = {
  name: "Positive",

  args: {
    children: "Positive button",
    appearance: "positive",
  },
  parameters: {
    docs: {
      description: {
        story: "Button with positive appearance",
      },
    },
  },
};

export const PositiveDisabled: Story = {
  name: "Positive disabled",

  args: {
    children: "Positive button disabled",
    appearance: "positive",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled button with positive appearance",
      },
    },
  },
};

export const Negative: Story = {
  name: "Negative",

  args: {
    children: "Negative button",
    appearance: "negative",
  },
  parameters: {
    docs: {
      description: {
        story: "Button with negative appearance",
      },
    },
  },
};

export const NegativeDisabled: Story = {
  name: "Negative disabled",

  args: {
    children: "Negative button disabled",
    appearance: "negative",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled button with negative appearance",
      },
    },
  },
};

export const Brand: Story = {
  name: "Brand",

  args: {
    children: "Brand button",
    appearance: "brand",
  },
  parameters: {
    docs: {
      description: {
        story: "Button with brand appearance",
      },
    },
  },
};

export const BrandDisabled: Story = {
  name: "Brand disabled",

  args: {
    children: "Brand button disabled",
    appearance: "brand",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled button with brand appearance",
      },
    },
  },
};

export const Inline: Story = {
  render: () => (
    <>
      <span>Everything you need to get started with Vanilla.</span>
      <Button appearance="neutral" inline>
        Inline button
      </Button>
    </>
  ),

  name: "Inline",
  parameters: {
    docs: {
      description: {
        story: "Button that displays on the same line as the sibling elements",
      },
    },
  },
};

export const Dense: Story = {
  render: () => (
    <>
      <span>Everything you need to get started with Vanilla.</span>
      <Button dense>Dense button</Button>
    </>
  ),

  name: "Dense",
  parameters: {
    docs: {
      description: {
        story: "Button with reduced vertical padding",
      },
    },
  },
};

export const Small: Story = {
  render: () => (
    <>
      <Button small>Small button</Button>
      <Button small dense>
        Small dense button
      </Button>
    </>
  ),

  name: "Small",
  parameters: {
    docs: {
      description: {
        story: "Button that can fit small text inside",
      },
    },
  },
};

export const Icon: Story = {
  name: "Icon",

  args: {
    children: <i className="p-icon--plus"></i>,
    hasIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Button with an icon inside",
      },
    },
  },
};

export const IconText: Story = {
  name: "Icon & text",

  args: {
    children: (
      <>
        <i className="p-icon--plus"></i> <span>Button with icon & text</span>
      </>
    ),

    hasIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Button with both an icon and text inside",
      },
    },
  },
};

export const DisabledWithTooltip: Story = {
  name: "Disabled with tooltip",

  args: {
    children: "Disabled button with a tooltip",
    disabled: true,
  },
  render: (args) => (
    <div style={{ paddingTop: "3rem" }}>
      <Tooltip message="This button is disabled">
        <Button {...args} />
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled button that displays a tooltip when hovered",
      },
    },
  },
};

export const ButtonAsLink = {
  name: "Button as link",

  args: {
    children: "Button as link",
    appearance: "base",
    element: "a",
    href: "#test",
  },
  parameters: {
    docs: {
      description: {
        story: "Button that is rendered as an `a` element",
      },
    },
  },
};

export const ButtonAsLinkDisabled: Story<HTMLProps<HTMLAnchorElement>> = {
  name: "Button as link disabled",

  args: {
    children: "Button as link disabled",
    appearance: "base",
    element: "a",
    href: "#test",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled button that is rendered as an `a` element",
      },
    },
  },
};
