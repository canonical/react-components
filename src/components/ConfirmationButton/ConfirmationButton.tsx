import React, { MouseEvent, ReactNode } from "react";
import { PropsWithSpread, SubComponentProps } from "types";
import ActionButton, { ActionButtonProps } from "../ActionButton";
import ConfirmationModal, {
  ConfirmationModalProps,
} from "../ConfirmationModal";
import { usePortal } from "external";
import { KeyboardKey } from "@canonical/react-ds-global";

const generateTitle = (title: ReactNode) => {
  if (typeof title === "string") {
    return title;
  }
  if (typeof title === "number") {
    return title.toString();
  }
  return null;
};

export type Props = PropsWithSpread<
  {
    /**
     * Additional props to pass to the confirmation modal.
     * The `renderInPortal` and `portalRenderer` props are controlled internally by this component.
     */
    confirmationModalProps: SubComponentProps<
      Omit<ConfirmationModalProps, "renderInPortal" | "portalRenderer">
    >;
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
    /**
     * A handler that determines whether the confirmation modal should be shown.
     * If it returns `true`, the modal is shown. If it returns `false`, the modal is not shown.
     */
    preModalOpenHook?: (event: MouseEvent<HTMLButtonElement>) => boolean;
  },
  ActionButtonProps
>;

/**
 * `ConfirmationButton` is a specialised version of the [ActionButton](?path=/docs/actionbutton--default-story) component that uses a [ConfirmationModal](?path=/docs/confirmationmodal--default-story) to prompt a confirmation from the user before executing an action.
 */
export const ConfirmationButton = ({
  confirmationModalProps,
  onHoverText,
  shiftClickEnabled = false,
  showShiftClickHint = false,
  preModalOpenHook,
  ...actionButtonProps
}: Props): React.JSX.Element => {
  const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const {
    renderInPortal: _ignoredRenderInPortal,
    portalRenderer: _ignoredPortalRenderer,
    ...safeConfirmationModalProps
  } = confirmationModalProps as SubComponentProps<ConfirmationModalProps>;

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

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (preModalOpenHook) {
      const result = preModalOpenHook(e);

      if (!result) return;
    }

    shiftClickEnabled ? handleShiftClick(e) : openPortal(e);
  };

  return (
    <>
      {isOpen && (
        <ConfirmationModal
          {...safeConfirmationModalProps}
          close={handleCancelModal}
          confirmButtonLabel={confirmationModalProps.confirmButtonLabel}
          onConfirm={handleConfirmModal}
          portalRenderer={Portal}
        >
          {confirmationModalProps.children}
          {showShiftClickHint && (
            <p className="p-text--small u-text--muted u-hide--small">
              Next time, you can skip this confirmation by holding{" "}
              <KeyboardKey keyValue="shift" /> and clicking the action.
            </p>
          )}
        </ConfirmationModal>
      )}
      <ActionButton
        {...actionButtonProps}
        onClick={handleClick}
        title={generateTitle(
          onHoverText ?? confirmationModalProps.confirmButtonLabel,
        )}
      >
        {actionButtonProps.children}
      </ActionButton>
    </>
  );
};

export default ConfirmationButton;
