import PropTypes from "prop-types";
import React, { useRef } from "react";
import uuidv4 from "uuid/v4";

export const Modal = ({ children, close, title }) => {
  const descriptionId = useRef(uuidv4());
  const titleId = useRef(uuidv4());
  return (
    <div className="p-modal" onClick={close}>
      <div
        className="p-modal__dialog"
        role="dialog"
        aria-labelledby={titleId.current}
        aria-describedby={descriptionId.current}
        onClick={evt => evt.stopPropagation()}
      >
        <header className="p-modal__header">
          <h2 className="p-modal__title" id={titleId.current}>
            {title}
          </h2>
          <button
            className="p-modal__close"
            aria-label="Close active modal"
            onClick={close}
          >
            Close
          </button>
        </header>
        <div id={descriptionId.current}>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Modal;
