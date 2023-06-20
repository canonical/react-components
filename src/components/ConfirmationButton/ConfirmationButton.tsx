import React, { MouseEvent, ReactElement } from "react";
import { PropsWithSpread, SubComponentProps } from "types";
import ActionButton, { ActionButtonProps } from "../ActionButton";
import ConfirmationModal, {
  ConfirmationModalProps,
} from "../ConfirmationModal";
import usePortal from "react-useportal";

export type Props = PropsWithSpread<
  {
    /**
     * Additional props to pass to the confirmation modal.
     */
    confirmationModalProps: SubComponentProps<ConfirmationModalProps>;
    /**
     * An optional text to be shown when hovering over the button.<br/>
     * Defaults to the label of the confirm button in the modal.
     */
    onHoverText?: string;
    /**
     * Whether to enable the SHIFT+Click shortcut to skip the confirmation modal and perform the action.
     */
    shiftClickEnabled?: boolean;
    /**
     * Whether to show a hint about the SHIFT+Click shortcut to skip the confirmation modal.
     */
    showShiftClickHint?: boolean;
  },
  ActionButtonProps
>;

export const ConfirmationButton = ({
  confirmationModalProps,
  onHoverText,
  shiftClickEnabled = false,
  showShiftClickHint = false,
  ...actionButtonProps
}: Props): ReactElement => {
  const { openPortal, closePortal, isOpen, Portal } = usePortal();

  const handleCancelModal = () => {
    closePortal();
    if (confirmationModalProps.close) {
      confirmationModalProps.close();
    }
  };

  const handleConfirmModal = (e: MouseEvent<HTMLElement>) => {
    closePortal();
    confirmationModalProps.onConfirm(e);
  };

  const handleShiftClick = (e: MouseEvent<HTMLElement>) => {
    if (e.shiftKey) {
      confirmationModalProps.onConfirm(e);
    } else {
      openPortal(e);
    }
  };

  return (
    <>
      {isOpen && (
        <Portal>
          <ConfirmationModal
            {...confirmationModalProps}
            close={handleCancelModal}
            confirmButtonLabel={confirmationModalProps.confirmButtonLabel}
            onConfirm={handleConfirmModal}
          >
            {confirmationModalProps.children}
            {showShiftClickHint && (
              <p className="p-text--small u-text--muted u-hide--small">
                Next time, you can skip this confirmation by holding{" "}
                <code>SHIFT</code> and clicking the action.
              </p>
            )}
          </ConfirmationModal>
        </Portal>
      )}
      <ActionButton
        {...actionButtonProps}
        onClick={shiftClickEnabled ? handleShiftClick : openPortal}
        title={onHoverText ?? confirmationModalProps.confirmButtonLabel}
      >
        {actionButtonProps.children}
      </ActionButton>
    </>
  );
};

export default ConfirmationButton;
