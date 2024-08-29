import { useState } from "react";
import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Modal from "./Modal";

const Template = (args) => {
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
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
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
