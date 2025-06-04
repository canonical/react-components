import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { MultiSelect, MultiSelectItem, MultiSelectProps } from "./MultiSelect";

const Template = (props: MultiSelectProps) => {
  const [selectedItems, setSelectedItems] = useState<MultiSelectItem[]>(
    props.selectedItems || [],
  );
  return (
    <MultiSelect
      {...props}
      selectedItems={selectedItems}
      onItemsUpdate={setSelectedItems}
    />
  );
};

const meta: Meta<typeof MultiSelect> = {
  component: MultiSelect,
  render: Template,
  tags: ["autodocs"],
  parameters: {},
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

export const CondensedExample: Story = {
  args: {
    items: [
      ...Array.from({ length: 26 }, (_, i) => ({
        label: `${String.fromCharCode(i + 65)}`,
        value: `${String.fromCharCode(i + 65)}`,
      })),
      ...Array.from({ length: 26 }, (_, i) => ({
        label: `Item ${i + 1}`,
        value: i + 1,
      })),
    ],
    selectedItems: [
      { label: "A", value: "A" },
      { label: "Item 2", value: 2 },
    ],
    variant: "condensed",
  },
};

export const SearchExample: Story = {
  args: {
    ...CondensedExample.args,
    variant: "search",
    items: [
      ...CondensedExample.args.items.map((item, i) => ({
        ...item,
        group: i % 2 === 0 ? "Group 1" : "Group 2",
      })),
    ],
  },
};

export const WithDisabledItems: Story = {
  args: {
    ...CondensedExample.args,
    disabledItems: [
      { label: "Item 1", value: 1 },
      { label: "Item 2", value: 2 },
    ],
  },
};

export const WithoutSorting: Story = {
  args: {
    items: [
      {
        label: "Sunday",
        value: 0,
      },
      {
        label: "Monday",
        value: 1,
      },
      {
        label: "Tuesday",
        value: 2,
      },
      {
        label: "Wednesday",
        value: 3,
      },
      {
        label: "Thursday",
        value: 4,
      },
      {
        label: "Friday",
        value: 5,
      },
      {
        label: "Saturday",
        value: 6,
      },
    ],
    selectedItems: [
      {
        label: "Monday",
        value: 1,
      },
      {
        label: "Wednesday",
        value: 3,
      },
      {
        label: "Friday",
        value: 5,
      },
    ],
    variant: "condensed",
    isSortedAlphabetically: false,
    hasSelectedItemsFirst: false,
  },
};
