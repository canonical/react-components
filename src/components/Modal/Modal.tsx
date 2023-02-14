import classNames from "classnames";
import React, { ReactElement, useRef, useEffect } from "react";
import type {
  HTMLProps,
  ReactNode,
  MutableRefObject,
  KeyboardEvent,
  RefObject,
} from "react";
import { ClassName, PropsWithSpread } from "types";
import { useId } from "hooks/useId";

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
  },
  HTMLProps<HTMLDivElement>
>;

export const Modal = ({
  buttonRow,
  children,
  className,
  close,
  title,
  ...wrapperProps
}: Props): ReactElement => {
  // list of focusable selectors is based on this Stack Overflow answer:
  // https://stackoverflow.com/a/30753870/3732840
  const focusableElementSelectors =
    'a[href]:not([tabindex="-1"]), button:not([disabled]), textarea:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), area[href]:not([tabindex="-1"]), iframe:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]), [contentEditable=true]:not([tabindex="-1"])';
  const descriptionId = useId();
  const titleId = useId();
  const shouldClose = useRef(false);

  const modalRef: MutableRefObject<HTMLElement> = useRef(null);
  const focusableModalElements = useRef(null);
  const handleTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (focusableModalElements.current.length > 0) {
      const firstElement = focusableModalElements.current[0];
      const lastElement =
        focusableModalElements.current[
          focusableModalElements.current.length - 1
        ];

      if (!e.shiftKey && document.activeElement === lastElement) {
        (firstElement as HTMLElement).focus();
        e.preventDefault();
      }

      if (e.shiftKey && document.activeElement === firstElement) {
        (lastElement as HTMLElement).focus();
        return e.preventDefault();
      }
    }
  };

  const handleEscKey = (e: KeyboardEvent<HTMLDivElement>) => {
    e.nativeEvent.stopImmediatePropagation();
    close();
  };

  const keyListenersMap = new Map([
    ["Escape", handleEscKey],
    ["Tab", handleTabKey],
  ]);

  useEffect(() => {
    modalRef.current.focus();
  }, [modalRef]);

  useEffect(() => {
    focusableModalElements.current = modalRef.current.querySelectorAll(
      focusableElementSelectors
    );
    let focusIndex = 0;
    // when the close button is rendered, focus on the 2nd content element and not the close btn.
    if (close && focusableModalElements.current.length > 1) {
      focusIndex = 1;
    }
    focusableModalElements.current[focusIndex]?.focus();
  }, []);

  useEffect(() => {
    const keyDown = (e) => {
      const listener = keyListenersMap.get(e.code);
      return listener && listener(e);
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

  const handleOverlayOnMouseDown = (event) => {
    if (event.target === modalRef.current) {
      shouldClose.current = true;
    }
  };

  const handleOverlayOnClick = () => {
    if (shouldClose.current) {
      close();
    }
  };

  return (
    <div
      className={classNames("p-modal", className)}
      onClick={handleOverlayOnClick}
      onMouseDown={handleOverlayOnMouseDown}
      {...wrapperProps}
      ref={modalRef as RefObject<HTMLDivElement>}
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
            {!!close && (
              <button
                className="p-modal__close"
                aria-label="Close active modal"
                onClick={close}
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
