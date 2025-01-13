import { Meta, StoryObj } from "@storybook/react/*";
import CustomSelect from "./CustomSelect";
import React, { ComponentProps, useState } from "react";
import { CustomSelectOption } from ".";

type StoryProps = ComponentProps<typeof CustomSelect>;

const generateStandardOptions = (num: number): CustomSelectOption[] =>
  Array(num)
    .fill(null)
    .map((_, i) => ({
      value: `option-${i + 1}`,
      label: `Option ${i + 1}`,
      text: `Option ${i + 1}`,
      disabled: false,
    }));

const generateCustomOptions = (): CustomSelectOption[] => {
  return [
    {
      value: "smile",
      label: <div>&#128512;</div>,
      text: "Smile",
      disabled: false,
    },
    {
      value: "grin",
      label: <div>&#128513;</div>,
      text: "Grin",
      disabled: false,
    },
    {
      value: "cry",
      label: <div>&#128557;</div>,
      text: "Cry",
      disabled: false,
    },
    {
      value: "angry",
      label: <div>&#128545;</div>,
      text: "Angry",
      disabled: false,
    },
    {
      value: "sad",
      label: <div>&#128546;</div>,
      text: "Sad",
      disabled: false,
    },
  ];
};

const Template = ({ ...props }: StoryProps) => {
  const [selected, setSelected] = useState<string>(props.value || "");
  return (
    <CustomSelect
      {...props}
      value={selected}
      onChange={(value) => setSelected(value)}
    />
  );
};

const meta: Meta<StoryProps> = {
  component: CustomSelect,
  render: Template,
  tags: ["autodocs"],
  args: {
    name: "customSelect",
    label: "Custom Select",
    searchable: "auto",
    initialPosition: "left",
  },
  argTypes: {
    searchable: {
      options: ["auto", "always", "never"],
      control: {
        type: "select",
      },
    },
    initialPosition: {
      options: ["left", "right"],
      control: {
        type: "select",
      },
    },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

/**
 * If `label` is of `string` type. You do not have to do anything extra to render it.
 */
export const StandardOptions: Story = {
  args: {
    options: generateStandardOptions(10),
  },
};

/**
 * If `label` is of `ReactNode` type. You can render custom content.
 * In this case, the `text` property for each option is required and is used for display in the toggle, search and sort functionalities.
 */
export const CustomOptions: Story = {
  args: {
    options: generateCustomOptions(),
  },
};

/**
 * For each option, if `disabled` is set to `true`, the option will be disabled.
 */
export const DisabledOptions: Story = {
  args: {
    options: generateStandardOptions(5).map((option, i) => ({
      ...option,
      disabled: i % 2 === 0,
    })),
  },
};

/**
 * Search is enabled by default when there are 5 or more options.
 */
export const AutoSearchable: Story = {
  args: {
    options: generateStandardOptions(5),
    searchable: "auto",
  },
};

/**
 * Search can be enabled manually by setting `searchable` to `always`.
 */
export const ManualSearchable: Story = {
  args: {
    options: generateStandardOptions(4),
    searchable: "always",
  },
};
