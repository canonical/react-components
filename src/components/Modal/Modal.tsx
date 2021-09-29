import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { ReactElement, useRef, useEffect } from "react";
import type {
  HTMLProps,
  ReactNode,
  MutableRefObject,
  KeyboardEvent,
  RefObject,
} from "react";
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
  // list of focusable selectors is based on this Stack Overflow answer:
  // https://stackoverflow.com/a/30753870/3732840
  const focusableElementSelectors =
    'a[href]:not([tabindex="-1"]), button:not([disabled]), textarea:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), area[href]:not([tabindex="-1"]), iframe:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]), [contentEditable=true]:not([tabindex="-1"])';
  const descriptionId = useRef(nanoid());
  const titleId = useRef(nanoid());

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

  const keyListenersMap = new Map([
    [27, close],
    [9, handleTabKey],
  ]);

  useEffect(() => {
    modalRef.current.focus();
  }, [modalRef]);

  useEffect(() => {
    focusableModalElements.current = modalRef.current.querySelectorAll(
      focusableElementSelectors
    );
    focusableModalElements.current[0]?.focus();
  }, []);

  useEffect(() => {
    const keyDown = (e) => {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    };

    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  });

  return (
    <div
      className={classNames("p-modal", className)}
      onClick={close}
      {...wrapperProps}
      ref={modalRef as RefObject<HTMLDivElement>}
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
