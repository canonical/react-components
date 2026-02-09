import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Stepper from "./Stepper";
import Step from "./Step";

const meta: Meta<typeof Stepper> = {
  component: Stepper,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  name: "Default",

  args: {
    variant: "vertical",
    steps: [
      <Step
        key="Default Step 1"
        title="Step 1"
        index={1}
        enabled={true}
        hasProgressLine={true}
        iconName="success"
        handleClick={() => {}}
      />,
      <Step
        key="Default Step 2"
        title="Step 2"
        index={2}
        enabled={true}
        hasProgressLine={true}
        iconName="spinner"
        iconClassName="u-animation--spin"
        handleClick={() => {}}
      />,
      <Step
        key="Default Step 3"
        title="Step 3"
        index={3}
        enabled={false}
        hasProgressLine={false}
        iconName="number"
        handleClick={() => {}}
      />,
      <Step
        key="Default Step 4"
        title="Step 4"
        index={4}
        enabled={false}
        hasProgressLine={false}
        iconName="number"
        handleClick={() => {}}
      />,
    ],
  },
};

export const HorizontalStepper: Story = {
  name: "Horizontal Stepper",
  render: () => (
    <Stepper
      variant="horizontal"
      steps={[
        <Step
          key="Horizontal Step 1"
          title="Step 1"
          index={1}
          enabled={false}
          hasProgressLine={true}
          iconName="success"
          handleClick={() => {}}
        />,
        <Step
          key="Horizontal Step 2"
          title="Step 2"
          index={2}
          enabled={false}
          hasProgressLine={true}
          iconName="error"
          handleClick={() => {}}
        />,
        <Step
          key="Horizontal Step 3"
          title="Step 3"
          index={3}
          enabled={true}
          hasProgressLine={true}
          iconName="spinner"
          iconClassName="u-animation--spin"
          handleClick={() => {}}
        />,
        <Step
          key="Horizontal Step 4"
          title="Step 4"
          index={4}
          enabled={false}
          hasProgressLine={false}
          iconName="number"
          handleClick={() => {}}
        />,
      ]}
    />
  ),
};

export const VerticalOptional: Story = {
  name: "Vertical variant: Optional labels and links",
  render: () => (
    <Stepper
      steps={[
        <Step
          key="Vertical optional Step 1"
          title="Step 1"
          index={1}
          enabled={true}
          hasProgressLine={true}
          iconName="success"
          label="Optional label"
          handleClick={() => {}}
        />,
        <Step
          key="Vertical optional Step 2"
          title="Step 2"
          index={2}
          enabled={true}
          hasProgressLine={true}
          iconName="success"
          handleClick={() => {}}
          label="Optional label"
        />,
        <Step
          key="Vertical optional Step 3"
          title="Step 3"
          index={3}
          enabled={true}
          hasProgressLine={true}
          iconName="number"
          label="Optional label"
          linkProps={{ children: "Optional link" }}
          handleClick={() => {}}
        />,
        <Step
          key="Vertical optional Step 4"
          title="Step 4"
          index={4}
          enabled={false}
          hasProgressLine={false}
          linkProps={{ children: "Optional link" }}
          iconName="number"
          handleClick={() => {}}
        />,
      ]}
    />
  ),
};

export const HorizontalOptional: Story = {
  name: "Horizontal variant: Optional labels and links",
  render: () => (
    <Stepper
      variant="horizontal"
      steps={[
        <Step
          key="Horizontal optional Step 1"
          title="Step 1"
          index={1}
          enabled={true}
          hasProgressLine={true}
          iconName="success"
          label="Optional label"
          handleClick={() => {}}
        />,
        <Step
          key="Horizontal optional Step 2"
          title="Step 2"
          index={2}
          enabled={true}
          hasProgressLine={true}
          iconName="success"
          handleClick={() => {}}
          label="Optional label"
        />,
        <Step
          key="Horizontal optional Step 3"
          title="Step 3"
          index={3}
          enabled={true}
          hasProgressLine={true}
          iconName="number"
          label="Optional label"
          linkProps={{ children: "Optional link" }}
          handleClick={() => {}}
        />,
        <Step
          key="Horizontal optional Step 4"
          title="Step 4"
          index={4}
          enabled={false}
          hasProgressLine={false}
          iconName="number"
          linkProps={{ children: "Optional link" }}
          handleClick={() => {}}
        />,
      ]}
    />
  ),
};

export const VerticalSelected: Story = {
  name: "Vertical variant: Selected step",
  render: () => (
    <div style={{ width: "50%" }}>
      <Stepper
        steps={[
          <Step
            key="Vertical Selected Step 1"
            title="Step 1"
            index={1}
            enabled={true}
            hasProgressLine={true}
            iconName="success"
            label="Optional label"
            handleClick={() => {}}
          />,
          <Step
            key="Vertical Selected Step 2"
            title="Step 2"
            index={2}
            enabled={true}
            hasProgressLine={true}
            iconName="success"
            handleClick={() => {}}
            label="Optional label"
            selected={true}
          />,
          <Step
            key="Vertical Selected Step 3"
            title="Step 3"
            index={3}
            enabled={true}
            hasProgressLine={true}
            iconName="number"
            label="Optional label"
            linkProps={{ children: "Optional link" }}
            handleClick={() => {}}
          />,
          <Step
            key="Vertical Selected Step 4"
            title="Step 4"
            index={4}
            enabled={false}
            hasProgressLine={false}
            linkProps={{ children: "Optional link" }}
            iconName="number"
            label="Optional label"
            handleClick={() => {}}
          />,
        ]}
      />
    </div>
  ),
};

export const HorizontalSelected: Story = {
  name: "Horizontal variant: Selected step",
  render: () => (
    <Stepper
      variant="horizontal"
      steps={[
        <Step
          key="Horizontal Selected Step 1"
          title="Step 1"
          index={1}
          enabled={true}
          hasProgressLine={true}
          iconName="success"
          label="Optional label"
          handleClick={() => {}}
        />,
        <Step
          key="Horizontal Selected Step 2"
          title="Step 2"
          index={2}
          enabled={true}
          hasProgressLine={true}
          iconName="success"
          selected={true}
          handleClick={() => {}}
          label="Optional label"
        />,
        <Step
          key="Horizontal Selected Step 3"
          title="Step 3"
          index={3}
          enabled={true}
          hasProgressLine={true}
          iconName="number"
          label="Optional label"
          linkProps={{ children: "Optional link" }}
          handleClick={() => {}}
        />,
        <Step
          key="Horizontal Selected Step 4"
          title="Step 4"
          index={4}
          enabled={false}
          hasProgressLine={false}
          iconName="number"
          label="Optional label"
          linkProps={{ children: "Optional link" }}
          handleClick={() => {}}
        />,
      ]}
    />
  ),
};
