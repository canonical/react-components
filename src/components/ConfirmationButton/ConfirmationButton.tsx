import React, { MouseEvent, ReactElement, ReactNode } from "react";
import { PropsWithSpread, ValueOf } from "types";
import Button, { ButtonProps } from "components/Button";
import ConfirmationModal, {
  ConfirmationModalProps,
} from "../ConfirmationModal";
import Icon, { ICONS } from "components/Icon";
import classNames from "classnames";
import usePortal from "react-useportal";

export type Props = PropsWithSpread<
  {
    /**
     * An optional text to be shown inside the button.
     */
    buttonLabel?: string;
    /**
     * The content of the confirmation modal.
     */
    children: ReactNode;
    /**
     * The name of an optional icon to be shown inside the button.
     */
    icon?: ValueOf<typeof ICONS> | string;
    /**
     * Whether the button is loading.<br/>
     * It displays an animated spinner only if the `icon` prop is set.
     */
    isLoading?: boolean;
    /**
     * An optional text to be shown when hovering over the button.<br/>
     * If not specified, the `confirmButtonLabel` will be shown on hover.
     */
    onHoverText?: string;
    /**
     * Whether to enable the SHIFT+Click shortcut to skip the confirmation modal and perform the action.
     */
    shiftClickEnabled?: boolean;
    /**
     * Optional class(es) to apply to the modal wrapper element.
     */
    modalClassName?: string;
  },
  Omit<ConfirmationModalProps, "className"> & Omit<ButtonProps, "hasIcon">
>;

export const ConfirmationButton = ({
  buttonLabel,
  icon,
  isLoading = false,
  onHoverText,
  shiftClickEnabled = false,
  modalClassName,
  ...props
}: Props): ReactElement => {
  const { openPortal, closePortal, isOpen, Portal } = usePortal();

  const handleCancelModal = () => {
    closePortal();
    if (props.close) {
      props.close();
    }
  };

  const handleConfirmModal = (e: MouseEvent<HTMLElement>) => {
    closePortal();
    props.onConfirm(e);
  };

  const handleShiftClick = (e: MouseEvent<HTMLElement>) => {
    if (e.shiftKey) {
      props.onConfirm(e);
    } else {
      openPortal(e);
    }
  };

  const iconName = icon ? (isLoading ? "spinner" : icon) : undefined;

  return (
    <>
      {isOpen && (
        <Portal>
          <ConfirmationModal
            className={modalClassName}
            title={props.title}
            close={handleCancelModal}
            confirmExtra={props.confirmExtra}
            confirmButtonLabel={props.confirmButtonLabel}
            confirmButtonAppearance={props.confirmButtonAppearance}
            onConfirm={handleConfirmModal}
            hasShiftClickHint={props.hasShiftClickHint}
          >
            {props.children}
          </ConfirmationModal>
        </Portal>
      )}
      <Button
        appearance={props.appearance}
        hasIcon={!!iconName}
        className={props.className}
        dense={props.dense}
        disabled={props.disabled}
        onClick={shiftClickEnabled ? handleShiftClick : openPortal}
        aria-label={props.confirmButtonLabel}
        title={onHoverText ?? props.confirmButtonLabel}
        type={props.type ?? "button"}
      >
        {iconName && (
          <Icon
            className={classNames({ "u-animation--spin": isLoading })}
            name={iconName}
          />
        )}
        {buttonLabel && (
          <span className="confirmation-toggle-caption">{buttonLabel}</span>
        )}
      </Button>
    </>
  );
};

export default ConfirmationButton;
