import React, { MouseEvent, ReactElement, useState, useEffect } from "react";
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
  onConfirm,
  ...props
}: Props): ReactElement => {
  const [minWidth, setMinWidth] = useState("480px");
  useEffect(() => {
    const updateMinWidth = () => {
      if (window.matchMedia("(max-width: 400px)").matches) {
        setMinWidth("200px");
      } else if (window.matchMedia("(max-width: 700px)").matches) {
        setMinWidth("300px");
      } else {
        setMinWidth("480px");
      }
    };

    window.addEventListener("resize", updateMinWidth);
    updateMinWidth();
    return () => {
      window.removeEventListener("resize", updateMinWidth);
    };
  }, []);

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
      <div style={{ minWidth: minWidth }}>
        {children}
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
