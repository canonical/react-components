import { Meta, StoryObj } from "@storybook/react";

import SearchAndFilter from "./SearchAndFilter";

const meta: Meta<typeof SearchAndFilter> = {
  component: SearchAndFilter,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SearchAndFilter>;

export const Default: Story = {
  name: "Default",

  args: {
    returnSearchData: () => {},

    filterPanelData: [
      {
        id: 0,
        heading: "Cloud",

        chips: [
          {
            lead: "Cloud",
            value: "Google",
          },
          {
            lead: "Cloud",
            value: "AWS",
          },
          {
            lead: "Cloud",
            value: "Azure",
          },
        ],
      },
      {
        id: 1,
        heading: "Region",

        chips: [
          {
            lead: "Region",
            value: "us-east1",
          },
          {
            lead: "Region",
            value: "us-north2",
          },
          {
            lead: "Region",
            value: "us-south3",
          },
          {
            lead: "Region",
            value: "us-north4",
          },
          {
            lead: "Region",
            value: "us-east5",
          },
          {
            lead: "Region",
            value: "us-south6",
          },
          {
            lead: "Region",
            value: "us-east7",
          },
          {
            lead: "Region",
            value: "us-east8",
          },
          {
            lead: "Region",
            value: "us-east9",
          },
          {
            lead: "Region",
            value: "us-east10",
          },
        ],
      },
      {
        id: 2,
        heading: "Owner",

        chips: [
          {
            lead: "Owner",
            value: "foo",
          },
          {
            lead: "Owner",
            value: "bar",
          },
          {
            lead: "Owner",
            value: "baz",
          },
        ],
      },
    ],
  },
};

export const WithDataSet: Story = {
  name: "With data set",

  args: {
    filterPanelData: [
      {
        id: 0,
        heading: "Cloud",

        chips: [
          {
            lead: "Cloud",
            value: "Google",
          },
          {
            lead: "Cloud",
            value: "AWS",
          },
          {
            lead: "Cloud",
            value: "Azure",
          },
        ],
      },
      {
        id: 1,
        heading: "Region",

        chips: [
          {
            lead: "Region",
            value: "us-east1",
          },
          {
            lead: "Region",
            value: "us-north2",
          },
          {
            lead: "Region",
            value: "us-south3",
          },
          {
            lead: "Region",
            value: "us-north4",
          },
          {
            lead: "Region",
            value: "us-east5",
          },
          {
            lead: "Region",
            value: "us-south6",
          },
          {
            lead: "Region",
            value: "us-east7",
          },
          {
            lead: "Region",
            value: "us-east8",
          },
          {
            lead: "Region",
            value: "us-east9",
          },
          {
            lead: "Region",
            value: "us-east10",
          },
        ],
      },
      {
        id: 2,
        heading: "Owner",

        chips: [
          {
            lead: "Owner",
            value: "foo",
          },
          {
            lead: "Owner",
            value: "bar",
          },
          {
            lead: "Owner",
            value: "baz",
          },
        ],
      },
    ],

    returnSearchData: () => {},
  },
};

export const WithExistingSearchData: Story = {
  name: "With existing search data",

  args: {
    existingSearchData: [
      {
        lead: "Cloud",
        value: "Google",
      },
    ],

    filterPanelData: [
      {
        id: 0,
        heading: "Cloud",

        chips: [
          {
            lead: "Cloud",
            value: "Google",
          },
          {
            lead: "Cloud",
            value: "AWS",
          },
          {
            lead: "Cloud",
            value: "Azure",
          },
        ],
      },
      {
        id: 1,
        heading: "Region",

        chips: [
          {
            lead: "Region",
            value: "us-east1",
          },
          {
            lead: "Region",
            value: "us-north2",
          },
          {
            lead: "Region",
            value: "us-south3",
          },
          {
            lead: "Region",
            value: "us-north4",
          },
          {
            lead: "Region",
            value: "us-east5",
          },
          {
            lead: "Region",
            value: "us-south6",
          },
          {
            lead: "Region",
            value: "us-east7",
          },
          {
            lead: "Region",
            value: "us-east8",
          },
          {
            lead: "Region",
            value: "us-east9",
          },
          {
            lead: "Region",
            value: "us-east10",
          },
        ],
      },
      {
        id: 2,
        heading: "Owner",

        chips: [
          {
            lead: "Owner",
            value: "foo",
          },
          {
            lead: "Owner",
            value: "bar",
          },
          {
            lead: "Owner",
            value: "baz",
          },
        ],
      },
    ],

    returnSearchData: () => {},
  },
};
