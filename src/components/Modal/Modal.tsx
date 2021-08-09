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
      if (e.code === "Escape") {
        // Close panel if Esc keydown detected
        if (close) {
          close();
        }
      }
    };

    // Add listener on document to capture keydown events
    document.addEventListener("keydown", keyDown);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, [close]);

  return (
    <div
      className={classNames("p-modal", className)}
      onClick={close}
      {...wrapperProps}
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
