import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import { Meta, StoryObj } from "@storybook/react";

import { FormikField } from "../../index";
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

const groupedItems = [
  { label: "Almond", value: "almond", group: "Nuts" },
  { label: "Cashew", value: "cashew", group: "Nuts" },
  { label: "Mango", value: "mango", group: "Fruit" },
  { label: "Peach", value: "peach", group: "Fruit" },
];

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
    id: "search-id",
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
    id: "external-id",
  },
};

export const Disabled: Story = {
  args: {
    ...CondensedExample.args,
    disabled: true,
  },
};

export const HelpText: Story = {
  args: {
    ...CondensedExample.args,
    help: (
      <span>
        This is a help text, that should appear underneath the component.
      </span>
    ),
  },
};

const FormikCallbacksAndEmptyStateTemplate = () => {
  const [selectedItems, setSelectedItems] = useState<MultiSelectItem[]>([]);
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = (eventName: string) => {
    setEvents((previousEvents) => [eventName, ...previousEvents].slice(0, 6));
  };

  return (
    <div style={{ maxWidth: "28rem" }}>
      <Formik initialValues={{ ingredients: "" }} onSubmit={() => {}}>
        <FormikField
          name="ingredients"
          component={MultiSelect}
          label="Ingredients"
          variant="search"
          placeholder="Search ingredients"
          items={groupedItems}
          selectedItems={selectedItems}
          onItemsUpdate={setSelectedItems}
          onSearchChange={(value: string) => {
            addEvent(`onSearchChange("${value}")`);
          }}
          onOpen={() => addEvent("onOpen()")}
          onClose={() => addEvent("onClose()")}
          emptyMessage="No ingredients found"
        />
      </Formik>
      <p style={{ marginBottom: "0.5rem" }}>Callback log:</p>
      <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
        {events.map((event, index) => (
          <li key={`${event}-${index}`}>{event}</li>
        ))}
      </ul>
    </div>
  );
};

export const FormikCallbacksAndEmptyState: Story = {
  render: FormikCallbacksAndEmptyStateTemplate,
};

export const EmptyMessage: Story = {
  args: {
    variant: "search",
    items: groupedItems,
    emptyMessage: "No matching ingredients.",
    placeholder: "Try typing kiwi",
  },
};

export const EmptyStateNode: Story = {
  args: {
    variant: "search",
    items: groupedItems,
    placeholder: "Try typing kiwi",
    emptyState: (
      <div className="u-align--center" style={{ padding: "0.75rem 1rem" }}>
        <strong>No ingredient matches.</strong>
        <p style={{ margin: "0.25rem 0 0" }}>Use a broader term.</p>
      </div>
    ),
  },
};
