import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Pagination from "./Pagination";

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  name: "Default",

  args: {
    itemsPerPage: 20,
    totalItems: 100,
    paginate: () => {},
    currentPage: 3,
  },
};

export const TruncatedNumberedPagination: Story = {
  render: () => (
    <Pagination
      itemsPerPage={10}
      totalItems={1000}
      paginate={() => {}}
      currentPage={34}
    />
  ),
  name: "Truncated (Numbered Pagination)",
};

export const DisabledControlsNumberedPagination: Story = {
  render: () => (
    <Pagination
      itemsPerPage={20}
      totalItems={100}
      paginate={() => {}}
      currentPage={1}
    />
  ),
  name: "Disabled controls (Numbered Pagination)",
};

export const CenteredNumberedPagination: Story = {
  render: () => (
    <Pagination
      itemsPerPage={10}
      totalItems={50}
      paginate={() => {}}
      currentPage={1}
      centered
    />
  ),

  name: "Centered (Numbered Pagination)",
};

export const DisabledPaginationItemsNumberedPagination: Story = {
  render: () => (
    <Pagination
      itemsPerPage={10}
      totalItems={50}
      paginate={() => {}}
      currentPage={1}
      hideNumbers
    />
  ),

  name: "Disabled pagination items (Numbered Pagination)",
};

export const DefaultButtonsOnlyPagination: Story = {
  render: () => <Pagination onForward={() => {}} onBack={() => {}} />,
  name: "Default (Buttons-only Pagination)",
};

export const DefaultButtonLabelsButtonsOnlyPagination: Story = {
  render: () => (
    <Pagination onForward={() => {}} onBack={() => {}} showLabels />
  ),
  name: "Default button labels (Buttons-only Pagination)",
};

export const CustomButtonLabelsButtonsOnlyPagination: Story = {
  render: () => (
    <Pagination
      onForward={() => {}}
      onBack={() => {}}
      showLabels
      forwardLabel="Custom forward label"
      backLabel="Custom back label"
    />
  ),

  name: "Custom button labels (Buttons-only Pagination)",
};

export const CenteredButtonsOnlyPagination: Story = {
  render: () => <Pagination onForward={() => {}} onBack={() => {}} centered />,
  name: "Centered (Buttons-only Pagination)",
};
