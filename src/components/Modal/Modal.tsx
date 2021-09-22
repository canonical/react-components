import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { ReactElement, useRef, useEffect } from "react";
import type { HTMLProps, ReactNode } from "react";
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
  const descriptionId = useRef(nanoid());
  const titleId = useRef(nanoid());

  // This useEffect sets up listeners so the panel will close if user clicks
  // anywhere else on the page or hits the escape key
  useEffect(() => {
    const keyDown = (e) => {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    };

    // Add listener on document to capture keydown events
    document.addEventListener("keydown", keyDown);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  });

  const modalRef = React.useRef();
  const handleTabKey = (e) => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const keyListenersMap = new Map([
    [27, close],
    [9, handleTabKey],
  ]);

  return (
    <div
      className={classNames("p-modal", className)}
      onClick={close}
      {...wrapperProps}
      role="dialog"
      ref={modalRef as React.RefObject<HTMLDivElement>}
    >
      <section
        className="p-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId.current}
        aria-describedby={descriptionId.current}
        onClick={(evt) => evt.stopPropagation()}
      >
        {!!title && (
          <header className="p-modal__header">
            <h2 className="p-modal__title" id={titleId.current}>
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
        <div id={descriptionId.current}>{children}</div>
        {!!buttonRow && (
          <footer className="p-modal__footer">{buttonRow}</footer>
        )}
      </section>
    </div>
  );
};

export default Modal;
