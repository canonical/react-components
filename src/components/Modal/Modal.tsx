import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import React, { ReactElement, ReactNode, useRef } from "react";

type Props = {
  buttonRow?: ReactNode | null;
  children: ReactNode;
  close?: () => void | null;
  title?: ReactNode | null;
};

export const Modal = ({
  buttonRow,
  children,
  close,
  title,
}: Props): ReactElement => {
  const descriptionId = useRef(nanoid());
  const titleId = useRef(nanoid());
  return (
    <div className="p-modal" onClick={close}>
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

Modal.propTypes = {
  buttonRow: PropTypes.node,
  children: PropTypes.node.isRequired,
  close: PropTypes.func,
  title: PropTypes.node,
};

export default Modal;
