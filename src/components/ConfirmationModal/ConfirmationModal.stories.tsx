import { useState } from "react";
import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import ConfirmationModal from "./ConfirmationModal";
import Input from "../Input";

const doNothing = () => {};

const meta: Meta<typeof ConfirmationModal> = {
  component: ConfirmationModal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ConfirmationModal>;

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalOpen, setModalOpen] = useState(false);
    const closeHandler = () => setModalOpen(false);

    return (
      <>
        <button onClick={() => setModalOpen(true)}>
          Open confirmation modal
        </button>
        {modalOpen ? (
          <ConfirmationModal
            title="Confirm delete"
            confirmButtonLabel="Delete"
            onConfirm={doNothing}
            close={closeHandler}
          >
            <p>
              This will permanently delete the user "Simon".
              <br />
              You cannot undo this action.
            </p>
          </ConfirmationModal>
        ) : null}
      </>
    );
  },

  name: "Default",
};

/**
 * The title is optional, and the content is fully customisable.
 */
export const NoTitle: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalOpen, setModalOpen] = useState(false);
    const closeHandler = () => setModalOpen(false);

    return (
      <>
        <button onClick={() => setModalOpen(true)}>Run</button>
        {modalOpen ? (
          <ConfirmationModal
            close={closeHandler}
            confirmButtonAppearance="positive"
            confirmButtonLabel="Confirm"
            onConfirm={doNothing}
          >
            <h4
              style={{
                margin: "1rem 0",
              }}
            >
              Run list-backups?
            </h4>
            <div
              style={{
                width: "480px",
                marginBottom: "1rem",
              }}
            >
              <div className="u-text--muted">UNIT COUNT</div>
              <div>1</div>
            </div>
            <div
              style={{
                marginBottom: "1.5rem",
              }}
            >
              <div className="u-text--muted">UNIT NAME</div>
              <div>mysql/0</div>
            </div>
          </ConfirmationModal>
        ) : null}
      </>
    );
  },

  name: "No title",
};

/**
 * The appearance of the confirm button can be any of the `Button`'s appearance values.
 */
export const Positive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalOpen, setModalOpen] = useState(false);
    const closeHandler = () => setModalOpen(false);

    return (
      <>
        <button onClick={() => setModalOpen(true)}>Apply changes</button>
        {modalOpen ? (
          <ConfirmationModal
            close={closeHandler}
            confirmButtonAppearance="positive"
            confirmButtonLabel="Yes, apply changes"
            onConfirm={doNothing}
          >
            <h4
              style={{
                margin: "1rem 0",
              }}
            >
              Are you sure you wish to apply these changes?
            </h4>
            <p>
              You have edited the following values to the mysql configuration:
            </p>
            <div>
              <h5 className="u-no-margin--bottom">cluster-name</h5>
              <pre
                className="u-no-padding"
                style={{
                  backgroundColor: "transparent",
                }}
              >
                test
              </pre>
            </div>
            <div
              className="p-text--small"
              style={{
                width: "480px",
              }}
            >
              You can revert back to the applications default settings by
              clicking the “Reset all values” button; or reset each edited field
              by clicking “Use default”.
            </div>
          </ConfirmationModal>
        ) : null}
      </>
    );
  },

  name: "Positive",
};

/**
 * Extra elements can be added to the button row.
 */
export const Extra: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalOpen, setModalOpen] = useState(false);
    const closeHandler = () => setModalOpen(false);

    return (
      <>
        <button onClick={() => setModalOpen(true)}>Stop</button>
        {modalOpen ? (
          <ConfirmationModal
            confirmExtra={
              <span className="u-float-left">
                <Input
                  type="checkbox"
                  id="extraCheckbox"
                  label="Force stop"
                  tabIndex={-1}
                />
              </span>
            }
            title="Confirm stop"
            confirmButtonLabel="Stop"
            onConfirm={doNothing}
            close={closeHandler}
          >
            <p>
              This will stop instance<b>whimsical-mouflon</b>.
            </p>
          </ConfirmationModal>
        ) : null}
      </>
    );
  },

  name: "Extra",
};
