import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import React, { ReactElement, useRef } from "react";

import "./modal.scss";

type Props = {
  buttons?: ReactElement[];
  children?: ReactElement;
  close?: () => void;
  title?: string;
};

export const Modal = ({
  buttons,
  children,
  close,
  title,
}: Props): ReactElement => {
  const descriptionId = useRef(nanoid());
  const titleId = useRef(nanoid());
  return (
    <div className="p-modal" onClick={close}>
      <div
        className="p-modal__dialog"
        role="dialog"
        aria-labelledby={titleId.current}
        aria-describedby={descriptionId.current}
        onClick={(evt) => evt.stopPropagation()}
      >
        {title && (
          <header className="p-modal__header">
            <h2 className="p-modal__title" id={titleId.current}>
              {title}
            </h2>
            {close && (
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
        {buttons && <div className="p-modal__button-row">{buttons}</div>}
      </div>
    </div>
  );
};

Modal.propTypes = {
  buttons: PropTypes.array,
  children: PropTypes.node.isRequired,
  close: PropTypes.func,
  title: PropTypes.string,
};

export default Modal;
