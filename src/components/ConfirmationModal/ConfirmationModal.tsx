import React, { MouseEvent, ReactElement, useRef, useEffect } from "react";
import type { ReactNode, MutableRefObject, RefObject } from "react";
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
  const modalRef: MutableRefObject<HTMLElement> = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      const positiveButton: HTMLButtonElement | null =
        modalRef?.current?.querySelector("button.p-button--positive");
      // If the modal has a positive button then focus on that after opening
      // to make a better keyboard navigation experience.
      if (positiveButton) {
        console.log("positive button focus");
        positiveButton.focus();
      } else {
        // If there is no button then focus on the modal wrapper.
        modalRef.current.focus();
      }
    }
  }, []);

  return (
    <div
      className="p-confirmation-modal"
      ref={modalRef as RefObject<HTMLDivElement>}
    >
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
        {children}
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
