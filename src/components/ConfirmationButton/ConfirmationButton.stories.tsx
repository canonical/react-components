import React from "react";
import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import ConfirmationButton from "./ConfirmationButton";
import Icon, { ICONS } from "../Icon";

const doNothing = () => {};

const meta: Meta<typeof ConfirmationButton> = {
  component: ConfirmationButton,
  tags: ["autodocs"],
};

export const Default: Story = {
  render: () => (
    <ConfirmationButton
      confirmationModalProps={{
        title: "Confirm delete",
        confirmButtonLabel: "Delete",
        onConfirm: doNothing,
        children: (
          <p>
            This will permanently delete the user "Simon".
            <br />
            You cannot undo this action.
          </p>
        ),
      }}
    >
      Delete
    </ConfirmationButton>
  ),

  name: "Default",
};

export default meta;

type Story = StoryObj<typeof ConfirmationButton>;

export const IconAndLabel: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setLoading] = useState(false);

    const brieflyLoad = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <ConfirmationButton
        confirmationModalProps={{
          title: "Confirm delete",
          confirmButtonLabel: "Delete",
          onConfirm: brieflyLoad,
          children: (
            <p>
              This will permanently delete the user "Simon".
              <br />
              You cannot undo this action.
            </p>
          ),
        }}
        className="has-icon"
        disabled={isLoading}
        loading={isLoading}
        shiftClickEnabled
        showShiftClickHint
      >
        <Icon name={ICONS.delete} />
        <span>Delete</span>
      </ConfirmationButton>
    );
  },

  name: "Icon and label",
};

export const IconOnly: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setLoading] = useState(false);

    const brieflyLoad = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <ConfirmationButton
        confirmationModalProps={{
          title: "Confirm delete",
          confirmButtonLabel: "Delete",
          onConfirm: brieflyLoad,
          children: (
            <p>
              This will permanently delete the user "Simon".
              <br />
              You cannot undo this action.
            </p>
          ),
        }}
        className="has-icon"
        disabled={isLoading}
        loading={isLoading}
        shiftClickEnabled
        showShiftClickHint
      >
        <Icon name={ICONS.delete} />
      </ConfirmationButton>
    );
  },

  name: "Icon only",
};

export const BaseAppearance: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setLoading] = useState(false);

    const brieflyLoad = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <ConfirmationButton
        appearance="base"
        confirmationModalProps={{
          title: "Confirm delete",
          confirmButtonLabel: "Delete",
          onConfirm: brieflyLoad,
          children: (
            <p>
              This will permanently delete the user "Simon".
              <br />
              You cannot undo this action.
            </p>
          ),
        }}
        className="has-icon"
        disabled={isLoading}
        loading={isLoading}
        shiftClickEnabled
        showShiftClickHint
      >
        <Icon name={ICONS.delete} />
      </ConfirmationButton>
    );
  },

  name: "Base appearance",
};

export const WithPreModalOpenHook: Story = {
  render: () => {
    const dontOpenModal = () => false;
    const openModal = () => true;

    return (
      <>
        <ConfirmationButton
          preModalOpenHook={dontOpenModal}
          confirmationModalProps={{
            title: "Confirm delete",
            confirmButtonLabel: "Delete",
            children: (
              <p>
                This will permanently delete the user "Simon".
                <br />
                You cannot undo this action.
              </p>
            ),
          }}
        >
          Don't open modal
        </ConfirmationButton>
        <ConfirmationButton
          preModalOpenHook={openModal}
          confirmationModalProps={{
            title: "Confirm delete",
            confirmButtonLabel: "Delete",
            children: (
              <p>
                This will permanently delete the user "Simon".
                <br />
                You cannot undo this action.
              </p>
            ),
          }}
        >
          Open modal
        </ConfirmationButton>
      </>
    );
  },

  name: "With preModalOpenHook handler",
};
