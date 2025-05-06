import React from "react";
import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import Notification, { NotificationSeverity } from "./Notification";

const meta: Meta<typeof Notification> = {
  component: Notification,
  tags: ["autodocs"],

  argTypes: {
    borderless: {
      control: {
        type: "boolean",
      },
    },

    children: {
      control: {
        type: "text",
      },
    },

    inline: {
      control: {
        type: "boolean",
      },
    },

    severity: {
      control: {
        type: "radio",
      },

      options: Object.values(NotificationSeverity),
    },

    timestamp: {
      control: {
        type: "text",
      },
    },

    title: {
      control: {
        type: "text",
      },
    },
  },

  args: {
    borderless: false,
    inline: false,
    severity: NotificationSeverity.INFORMATION,
  },
};

export default meta;

type Story = StoryObj<typeof Notification>;

/**
 * The information severity should be used to convey an information message.
 */
export const Information: Story = {
  name: "Information",

  args: {
    children: "Anyone with access can view your invited users.",
    severity: "information",
    title: "Permissions changed",
  },
};

/**
 * The caution severity should be used to convey information that is not critical but the user should be aware of.
 */
export const Caution: Story = {
  name: "Caution",

  args: {
    children:
      "Custom storage configuration is only supported on Ubuntu, CentOS and RHEL.",
    severity: "caution",
    title: "Blocked",
  },
};

/**
 * The negative severity should be used to convey information that is critical and the user should take action.
 */
export const Negative: Story = {
  name: "Negative",

  args: {
    children: "Node must be connected to a network.",
    severity: "negative",
    title: "Error",
  },
};

/**
 * The positive severity should be used to convey success or completion.
 */
export const Positive: Story = {
  name: "Positive",

  args: {
    children: "Code successfully reformatted.",
    severity: "positive",
    title: "Success",
  },
};

/**
 * When vertical space is limited, you can use the inline variant.
 */
export const Inline: Story = {
  name: "Inline",

  args: {
    children: "Not enough space.",
    inline: true,
    severity: "negative",
    title: "Error:",
  },
};

/**
 * In cases where a notification sits inside another component, such as a table cell or a card, it may be useful to remove the outer border and highlight bar.
 */
export const Borderless: Story = {
  name: "Borderless",

  args: {
    borderless: true,
    children: "Only 8GB storage remaining.",
    severity: "caution",
    title: "Warning",
  },
};

/**
 * Actions will appear below the notification message.
 */
export const Actions: Story = {
  name: "Actions",

  args: {
    actions: [
      {
        label: "Action 1",
        onClick: () => null,
      },
      {
        label: "Action 2",
        onClick: () => null,
      },
    ],

    children:
      "Body lorem ipsum dolor sit amet consequiteor. Lorem ipsum dolor sit amet consequiteor.",
    severity: "information",
    title: "Title",
  },
};

/**
 * Notifications that can be dismissed should be given an onDismiss function.
 */
export const Dismissible: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [show, setShow] = useState(true);

    if (!show) {
      return null;
    }

    return (
      <Notification onDismiss={() => setShow(false)} title="Dismissible">
        Click the dismiss button to get rid of me.
      </Notification>
    );
  },

  name: "Dismissible",
};

/**
 * Notifications can be automatically dismissed after a timeout interval.
 */
export const Timeout: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [show, setShow] = useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [timer, setTimer] = useState(0);

    if (!show) {
      return null;
    }

    return (
      <Notification
        actions={[
          {
            label: "Start timer",
            onClick: () => setTimer(3000),
          },
        ]}
        onDismiss={() => setShow(false)}
        timeout={timer}
        title="Timeout"
      >
        Click the action to start a 3 second timer.
      </Notification>
    );
  },

  name: "Timeout",
};

/**
 * For notifications in which recency is important, you can include a section for time.
 */
export const Timestamp: Story = {
  name: "Timestamp",

  args: {
    children:
      "Body lorem ipsum dolor sit amet consequiteor. Lorem ipsum dolor sit amet consequiteor.",
    severity: "information",
    timestamp: "1h ago",
    title: "Title",
  },
};
