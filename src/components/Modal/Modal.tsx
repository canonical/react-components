import classNames from "classnames";
import type { HTMLProps, ReactNode, RefObject } from "react";
import React, { useEffect, useId, useRef } from "react";
import { ClassName, PropsWithSpread } from "types";

export type Props = PropsWithSpread<
  {
    /**
     * Buttons to display underneath the main modal content.
     */
    buttonRow?: ReactNode | null;
    /**
     * Optional class(es) to apply to the wrapping element.
     */
    className?: ClassName;
    /**
     * The content of the modal.
     */
    children: ReactNode;
    /**
     * Function to handle closing the modal.
     */
    close?: () => void | null;
    /**
     * The title of the modal.
     */
    title?: ReactNode | null;
    /**
     * Whether the button click event should propagate.
     */
    shouldPropagateClickEvent?: boolean;
    /**
     * Whether the modal should close when clicking outside the modal.
     */
    closeOnOutsideClick?: boolean;
  },
  HTMLProps<HTMLDivElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Modal](https://docs.vanillaframework.io/patterns/modal/).
 *
 * The modal component can be used to overlay an area of the screen which can contain a prompt, dialog or interaction.
 */
export const Modal = ({
  buttonRow,
  children,
  className,
  close,
  title,
  shouldPropagateClickEvent = false,
  closeOnOutsideClick = true,
  ...wrapperProps
}: Props): React.JSX.Element => {
  // list of focusable selectors is based on this Stack Overflow answer:
  // https://stackoverflow.com/a/30753870/3732840
  const focusableElementSelectors =
    'a[href]:not([tabindex="-1"]), button:not([disabled]), textarea:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), area[href]:not([tabindex="-1"]), iframe:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]), [contentEditable=true]:not([tabindex="-1"])';
  const descriptionId = useId();
  const titleId = useId();
  const shouldClose = useRef(false);

  const modalRef: RefObject<HTMLDivElement> = useRef(null);
  const closeButtonRef: RefObject<HTMLButtonElement> = useRef(null);
  const focusableModalElements = useRef(null);
  const handleTabKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (focusableModalElements.current.length > 0) {
      const firstElement = focusableModalElements.current[0];
      const lastElement =
        focusableModalElements.current[
          focusableModalElements.current.length - 1
        ];

      if (!event.shiftKey && document.activeElement === lastElement) {
        (firstElement as HTMLElement).focus();
        event.preventDefault();
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        (lastElement as HTMLElement).focus();
        return event.preventDefault();
      }
    }
  };

  const handleEscKey = (
    event: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if ("nativeEvent" in event && event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation();
    } else if ("stopImmediatePropagation" in event) {
      event.stopImmediatePropagation();
    } else if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (close) {
      close();
    }
  };

  const keyListenersMap = new Map([
    ["Escape", handleEscKey],
    ["Tab", handleTabKey],
  ]);

  useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    } else {
      modalRef.current.focus();
    }

    focusableModalElements.current = modalRef.current.querySelectorAll(
      focusableElementSelectors,
    );
  }, []);

  useEffect(() => {
    const keyDown = (event: KeyboardEvent) => {
      const listener = keyListenersMap.get(event.code);
      return listener && listener(event);
    };

    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  });

  const handleContentOnMouseDown = () => {
    shouldClose.current = false;
  };

  const handleContentOnMouseUp = () => {
    shouldClose.current = false;
  };

  const handleOverlayOnMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (event.target === modalRef.current && closeOnOutsideClick) {
      shouldClose.current = true;
    }
  };

  const handleClose = (event: React.MouseEvent) => {
    if (!shouldPropagateClickEvent) {
      event.stopPropagation();
    }
    if (close) {
      close();
    }
  };

  const handleOverlayOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldClose.current) {
      handleClose(event);
    }
  };

  return (
    <div
      className={classNames("p-modal", className)}
      onClick={handleOverlayOnClick}
      onMouseDown={handleOverlayOnMouseDown}
      {...wrapperProps}
      ref={modalRef}
    >
      <section
        className="p-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onMouseDown={handleContentOnMouseDown}
        onMouseUp={handleContentOnMouseUp}
      >
        {!!title && (
          <header className="p-modal__header">
            <h2 className="p-modal__title" id={titleId}>
              {title}
            </h2>
            {close && (
              <button
                type="button"
                className="p-modal__close"
                aria-label="Close active modal"
                onClick={handleClose}
                ref={closeButtonRef}
              >
                Close
              </button>
            )}
          </header>
        )}
        <div id={descriptionId}>{children}</div>
        {!!buttonRow && (
          <footer className="p-modal__footer">{buttonRow}</footer>
        )}
      </section>
    </div>
  );
};

export default Modal;
