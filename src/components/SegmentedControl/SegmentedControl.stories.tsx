import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import SegmentedControl from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
  component: SegmentedControl,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  name: "Default",

  args: {
    segments: [
      {
        label: "OLM",
        segmentContent: (
          <p>
            A system to help you move from configuration management to
            application management across your hybrid cloud estate - through
            sharable, reusable, tiny applications called Charmed Operators.
          </p>
        ),
      },
      {
        label: "SDK",
        segmentContent: (
          <p>
            A set of tools to help you write Charmed Operators and to package
            them as Charms.
          </p>
        ),
      },
      {
        label: "Charmhub",
        segmentContent: (
          <p>
            A repository for charms - from Observability to Data to Identity and
            more.
          </p>
        ),
      },
    ],
  },
};

/**
 * The buttons take up a more compact apperance by adding the modifier is-dense
 */

export const Dense: Story = {
  name: "Dense",

  args: {
    className: "is-dense",
    segments: [
      {
        label: "OLM",
        segmentContent: (
          <p>
            A system to help you move from configuration management to
            application management across your hybrid cloud estate - through
            sharable, reusable, tiny applications called Charmed Operators.
          </p>
        ),
      },
      {
        label: "SDK",
        segmentContent: (
          <p>
            A set of tools to help you write Charmed Operators and to package
            them as Charms.
          </p>
        ),
      },
      {
        label: "Charmhub",
        segmentContent: (
          <p>
            A repository for charms - from Observability to Data to Identity and
            more.
          </p>
        ),
      },
    ],
  },
};
/**
 * The pattern also supports the use of icons within each button.
 *
 * Icons : If any icons are used, all buttons within the pattern should have an icon, to avoid any potential confusion that could arise from a mix of buttons with and without an icon.
 */
export const WithIcon: Story = {
  name: "With Icon",
  args: {
    segments: [
      {
        label: "OLM",
        segmentContent: (
          <p>
            A system to help you move from configuration management to
            application management across your hybrid cloud estate - through
            sharable, reusable, tiny applications called Charmed Operators.
          </p>
        ),
        segmentIcon: <i className="p-icon--information"></i>,
      },
      {
        label: "SDK",
        segmentContent: (
          <p>
            A set of tools to help you write Charmed Operators and to package
            them as Charms.
          </p>
        ),
        segmentIcon: <i className="p-icon--information"></i>,
      },
      {
        label: "Charmhub",
        segmentContent: (
          <p>
            A repository for charms - from Observability to Data to Identity and
            more.
          </p>
        ),
        segmentIcon: <i className="p-icon--information"></i>,
      },
    ],
  },
};
