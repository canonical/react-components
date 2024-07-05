import { useState } from "react";
import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Accordion from "./Accordion";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  tags: ["autodocs"],

  argTypes: {
    sections: {
      control: {
        disable: true,
      },
    },

    externallyControlled: {
      control: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  name: "Default",

  args: {
    sections: [
      {
        title: "Advanced topics",

        content: (
          <>
            <p>Charm bundles</p>
            <p>Machine authentication</p>
            <p>Migrating models</p>
            <p>Using storage</p>
            <p>Working with actions</p>
            <p>Working with resources</p>
            <p>Cloud image metadata</p>
            <p>Tools</p>
          </>
        ),
      },
      {
        title: "Networking",

        content: (
          <>
            <p>Working offline</p>
            <p>Fan container networking</p>
            <p>Network spaces</p>
          </>
        ),
      },
      {
        title: "Miscellaneous",

        content: (
          <>
            <p>Juju GUI</p>
            <p>CentOS support</p>
            <p>Collecting Juju metrics</p>
          </>
        ),
      },
    ],
  },
};

/**
 * The expanded accordion section can be controlled by external state.
 */
export const ExternalState: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expandedSection, setExpandedSection] = useState<string>();

    return (
      <Accordion
        expanded={expandedSection}
        externallyControlled
        onExpandedChange={setExpandedSection}
        sections={[
          {
            title: "Advanced topics",
            key: "advanced-topics",

            content: (
              <>
                <p>Charm bundles</p>
                <p>Machine authentication</p>
                <p>Migrating models</p>
                <p>Using storage</p>
                <p>Working with actions</p>
                <p>Working with resources</p>
                <p>Cloud image metadata</p>
                <p>Tools</p>
              </>
            ),
          },
          {
            title: "Networking",
            key: "networking",

            content: (
              <>
                <p>Working offline</p>
                <p>Fan container networking</p>
                <p>Network spaces</p>
              </>
            ),
          },
          {
            title: "Miscellaneous",
            key: "miscellaneous",

            content: (
              <>
                <p>Juju GUI</p>
                <p>CentOS support</p>
                <p>Collecting Juju metrics</p>
              </>
            ),
          },
        ]}
      />
    );
  },

  name: "External state",
};

/**
 * `titleElement` prop can be used to define heading element for section titles.
 */
export const Headings: Story = {
  name: "Headings",

  args: {
    sections: [
      {
        title: "Advanced topics",

        content: (
          <>
            <p>Charm bundles</p>
            <p>Machine authentication</p>
            <p>Migrating models</p>
            <p>Using storage</p>
            <p>Working with actions</p>
            <p>Working with resources</p>
            <p>Cloud image metadata</p>
            <p>Tools</p>
          </>
        ),
      },
      {
        title: "Networking",

        content: (
          <>
            <p>Working offline</p>
            <p>Fan container networking</p>
            <p>Network spaces</p>
          </>
        ),
      },
      {
        title: "Miscellaneous",

        content: (
          <>
            <p>Juju GUI</p>
            <p>CentOS support</p>
            <p>Collecting Juju metrics</p>
          </>
        ),
      },
    ],

    titleElement: "h3",
  },
};

/**
 * The `title` prop can be a `ReactNode`, allowing a higher degree of customisation of the section titles.
 */
export const CustomHeadings: Story = {
  args: {
    sections: [
      {
        title: (
          <>
            Advanced topics{" "}
            <span className="u-text--muted p-text--small">optional</span>
          </>
        ),
        content: (
          <>
            <p>Charm bundles</p>
            <p>Machine authentication</p>
            <p>Migrating models</p>
            <p>Using storage</p>
            <p>Working with actions</p>
            <p>Working with resources</p>
            <p>Cloud image metadata</p>
            <p>Tools</p>
          </>
        ),
      },
      {
        title: (
          <>
            Networking{" "}
            <span className="u-text--muted p-text--small">optional</span>
          </>
        ),
        content: (
          <>
            <p>Working offline</p>
            <p>Fan container networking</p>
            <p>Network spaces</p>
          </>
        ),
      },
      {
        title: (
          <>
            Miscellaneous{" "}
            <span className="u-text--muted p-text--small">optional</span>
          </>
        ),
        content: (
          <>
            <p>Juju GUI</p>
            <p>CentOS support</p>
            <p>Collecting Juju metrics</p>
          </>
        ),
      },
    ],
    titleElement: "h3",
  },
};
