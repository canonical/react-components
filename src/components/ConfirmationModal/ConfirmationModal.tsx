import React, { MouseEvent, ReactElement } from "react";
import type { ReactNode } from "react";
import { PropsWithSpread, ValueOf } from "types";
import Button, { ButtonAppearance } from "components/Button";
import Modal, { ModalProps } from "components/Modal";

export type Props = PropsWithSpread<
  {
    /**
     * Label for the cancel button.
     */
    cancelButtonLabel?: string;
    /**
     * The content of the modal.
     */
    children: ReactNode;
    /**
     * Appearance of the confirm button.
     */
    confirmButtonAppearance?: ValueOf<typeof ButtonAppearance> | string;
    /**
     * Label for the confirm button.
     */
    confirmButtonLabel: string;
    /**
     * Extra elements to be placed in the button row of the modal.
     */
    confirmExtra?: ReactNode;
    /**
     * Show the SHIFT+Click shortcut hint to skip the confirmation.
     */
    hasShiftClickHint?: boolean;
    /**
     * Function to perform the action prompted by the modal.
     */
    onConfirm: (e: MouseEvent<HTMLElement>) => void;
  },
  Omit<ModalProps, "buttonRow">
>;

export const ConfirmationModal = ({
  cancelButtonLabel = "Cancel",
  children,
  confirmButtonAppearance = "negative",
  confirmButtonLabel,
  confirmExtra,
  hasShiftClickHint = false,
  onConfirm,
  ...props
}: Props): ReactElement => {
  return (
    <Modal
      buttonRow={
        <>
          {confirmExtra}
          <Button className="u-no-margin--bottom" onClick={props.close}>
            {cancelButtonLabel}
          </Button>
          <Button
            appearance={confirmButtonAppearance}
            className="u-no-margin--bottom"
            onClick={onConfirm}
          >
            {confirmButtonLabel}
          </Button>
        </>
      }
      {...props}
    >
      <p style={{ textAlign: "start", whiteSpace: "pre-line" }}>{children}</p>
      {hasShiftClickHint && (
        <p className="u-text--muted u-hide--small">
          You can skip these confirmation modals by holding <code>SHIFT</code>{" "}
          when clicking on the action.
        </p>
      )}
    </Modal>
  );
};

export default ConfirmationModal;
