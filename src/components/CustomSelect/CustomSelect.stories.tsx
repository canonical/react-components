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

const generateCustomOptionsWithSelectedLabel = () => {
  const options = [
    {
      type: "ovn",
      name: "ovntest",
      config: {
        "security.acls": "foo,bar",
      },
    },
    {
      type: "bridge",
      name: "lxdbr0",
      config: {},
    },
    {
      type: "bridge",
      name: "microbr0",
      config: {},
    },
    {
      type: "macvlan",
      name: "macvlantest",
      config: {},
    },
  ].map((network) => {
    return {
      label: (
        <div className="label" style={{ display: "flex", gap: "5px" }}>
          <span
            title={network.name}
            className="network-option u-truncate"
            style={{ width: "12rem" }}
          >
            {network.name}
          </span>
          <span
            title={network.type}
            className="network-option u-truncate"
            style={{ width: "8rem" }}
          >
            {network.type}
          </span>
          <span
            title="network ACLs"
            className="network-option u-truncate u-align--right"
            style={{ paddingRight: "8px", width: "4rem" }}
          >
            {network.config["security.acls"]?.length || "-"}
          </span>
        </div>
      ),
      value: network.name,
      text: `${network.name} - ${network.type}`,
      disabled: false,
      selectedLabel: (
        <span>
          {network.name}&nbsp;
          <span className="u-text--muted">&#40;{network.type}&#41;</span>
        </span>
      ),
    };
  });

  return options;
};

const getHeader = () => {
  return (
    <div
      className="header"
      style={{
        backgroundColor: "$colors--theme--background-alt",
        display: "flex",
        gap: "$sph--small",
        padding: "$sph--x-small $sph--small",
        position: "sticky",
        top: 0,
      }}
    >
      <span
        className="network-option u-no-margin--bottom"
        style={{ color: "$colors--theme--text-default", width: "12rem" }}
      >
        Name
      </span>
      <span
        className="network-option u-no-margin--bottom"
        style={{ color: "$colors--theme--text-default", width: "8rem" }}
      >
        Type
      </span>
      <span
        className="network-option u-no-margin--bottom"
        style={{ color: "$colors--theme--text-default", width: "4rem" }}
      >
        ACLs
      </span>
    </div>
  );
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
    defaultToggleLabel: "Select an option",
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
 * If `label` is of `ReactNode` type. You can render custom content.
 * In this case, the `selectedLabel` for each option is provided and will be displayed in the toggle instead of `text`
 * The `text` property for each option is still required and is used for search and sort functionalities.
 */
export const CustomOptionsAndSelectedLabel: Story = {
  args: {
    options: generateCustomOptionsWithSelectedLabel(),
    header: getHeader(),
    dropdownClassName: "network-select-dropdown",
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
