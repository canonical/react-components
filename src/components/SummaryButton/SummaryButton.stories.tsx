import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import SummaryButton from "./SummaryButton";

const doNothing = () => {};

const meta: Meta<typeof SummaryButton> = {
  component: SummaryButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SummaryButton>;

export const Default: Story = {
  render: () => (
    <SummaryButton
      summary="Showing 15 out of 100 items."
      label="Show more"
      onClick={doNothing}
    />
  ),

  name: "Default",
};

/**
 * Summary text is optional.
 */
export const ActionOnly: Story = {
  render: () => <SummaryButton label="Show more items" onClick={doNothing} />,
  name: "Action only",
};

/**
 * Action is optional as well. When `onClick` prop is not provided component will render just the summary text.
 */
export const SummaryOnly: Story = {
  render: () => (
    <SummaryButton
      summary="Showing 100 out of 100 items."
      label="Show more items"
      onClick={doNothing}
    />
  ),
  name: "Summary only",
};

/**
 * When data is loaded asynchronusly `isLoading` prop should be set to `true` to shows a spinner animation in place of the action button.
 */
export const Loading: Story = {
  render: () => (
    <SummaryButton
      summary="Showing 15 out of 100 items."
      label="Show more"
      isLoading
      onClick={doNothing}
    />
  ),

  name: "Loading",
};
