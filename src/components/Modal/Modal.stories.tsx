import { useRef, useState } from "react";
import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Button from "components/Button";
import Modal from "./Modal";
import { ModalProps } from ".";

const Template = (args: ModalProps) => {
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <Modal {...args} />
    </div>
  );
};

const meta: Meta<typeof Modal> = {
  component: Modal,
  render: Template,
  tags: ["autodocs"],

  argTypes: {
    buttonRow: {
      control: {
        disable: true,
      },
    },

    children: {
      control: {
        disable: true,
      },
    },

    closeOnOutsideClick: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: ({ closeOnOutsideClick }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalOpen, setModalOpen] = useState(true);
    const closeHandler = () => setModalOpen(false);

    return (
      <>
        <button onClick={() => setModalOpen(true)}>Open modal</button>
        {modalOpen ? (
          <Modal
            close={closeHandler}
            title="Confirm delete"
            closeOnOutsideClick={closeOnOutsideClick}
            buttonRow={
              <>
                <button className="u-no-margin--bottom" onClick={closeHandler}>
                  Cancel
                </button>
                <button className="p-button--negative u-no-margin--bottom">
                  Delete
                </button>
              </>
            }
          >
            <p>
              This will permanently delete the user "Simon".
              <br />
              You cannot undo this action.
            </p>
          </Modal>
        ) : null}
      </>
    );
  },

  name: "Default",
};

export const Focus: Story = {
  render: ({ closeOnOutsideClick }) => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const [modalOpen, setModalOpen] = useState(true);
    const buttonRef = useRef<HTMLElement>(null);
    /* eslint-enable react-hooks/rules-of-hooks */

    const closeHandler = () => setModalOpen(false);

    return (
      <>
        <button onClick={() => setModalOpen(true)}>Open modal</button>
        {modalOpen ? (
          <Modal
            close={closeHandler}
            title="Confirm delete"
            closeOnOutsideClick={closeOnOutsideClick}
            buttonRow={
              <>
                <button className="u-no-margin--bottom" onClick={closeHandler}>
                  Cancel
                </button>
                <button className="p-button--negative u-no-margin--bottom">
                  Delete
                </button>
              </>
            }
            focusRef={buttonRef}
          >
            <p>
              This will permanently delete the user "Simon".
              <br />
              You cannot undo this action.
            </p>
            <p>
              <Button appearance="link" ref={buttonRef}>
                More information
              </Button>
            </p>
          </Modal>
        ) : null}
      </>
    );
  },

  name: "Focus",
};
