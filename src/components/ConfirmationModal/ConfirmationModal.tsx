import React, { MouseEvent } from "react";
import type { ReactNode } from "react";
import { PropsWithSpread, ValueOf } from "types";
import Button, { ButtonAppearance, ButtonProps } from "components/Button";
import Modal, { ModalProps } from "components/Modal";
import ActionButton, { ActionButtonProps } from "components/ActionButton";
import { usePortal } from "external";

export type Props = PropsWithSpread<
  {
    /**
     * Label for the cancel button.
     */
    cancelButtonLabel?: ReactNode;
    /**
     * Additional props to be spread on the cancel button.
     */
    cancelButtonProps?: Partial<ButtonProps>;
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
    confirmButtonLabel: ReactNode;
    /**
     * Additional props to be spread on the confirm button.
     */
    confirmButtonProps?: Partial<ActionButtonProps>;
    /**
     * Extra elements to be placed in the button row of the modal.
     */
    confirmExtra?: ReactNode;
    /**
     * Function to perform the action prompted by the modal.
     */
    onConfirm: (event: MouseEvent<HTMLElement>) => void;
    /**
     * Whether the confirm button should be in the loading state.
     */
    confirmButtonLoading?: boolean;
    /**
     * Whether the confirm button should be disabled.
     */
    confirmButtonDisabled?: boolean;
    /**
     * Whether to render the modal inside a Portal component.
     */
    renderInPortal?: boolean;
  },
  Omit<ModalProps, "buttonRow">
>;

/**
 * `ConfirmationModal` is a specialised version of the [Modal](?path=/docs/modal--default-story) component to prompt a confirmation from the user before executing an action.
 */
export const ConfirmationModal = ({
  cancelButtonLabel = "Cancel",
  cancelButtonProps,
  children,
  confirmButtonAppearance = "negative",
  confirmButtonLabel,
  confirmExtra,
  onConfirm,
  confirmButtonLoading,
  confirmButtonDisabled,
  confirmButtonProps,
  renderInPortal = false,
  ...props
}: Props): React.JSX.Element => {
  const { Portal } = usePortal();

  const handleClick =
    <A extends Function>( // eslint-disable-line @typescript-eslint/no-unsafe-function-type
      action: A | null | undefined,
    ) =>
    (event: MouseEvent<HTMLButtonElement>) => {
      if (!props.shouldPropagateClickEvent) {
        event.stopPropagation();
      }
      if (action) {
        action(event);
      }
    };

  const ModalElement = (
    <Modal
      buttonRow={
        <>
          {confirmExtra}
          <Button
            {...cancelButtonProps}
            type={cancelButtonProps?.type ?? "button"}
            className="u-no-margin--bottom"
            onClick={handleClick(props.close)}
          >
            {cancelButtonLabel}
          </Button>
          <ActionButton
            {...confirmButtonProps}
            appearance={confirmButtonAppearance}
            className="u-no-margin--bottom"
            onClick={handleClick(onConfirm)}
            loading={confirmButtonLoading}
            disabled={confirmButtonDisabled}
          >
            {confirmButtonLabel}
          </ActionButton>
        </>
      }
      {...props}
    >
      {children}
    </Modal>
  );

  return renderInPortal ? <Portal>{ModalElement}</Portal> : ModalElement;
};

export default ConfirmationModal;
