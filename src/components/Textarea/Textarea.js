import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

import Field from "../Field";

const Textarea = ({
  caution,
  className,
  error,
  grow,
  help,
  id,
  label,
  labelClassName,
  onKeyUp,
  required,
  stacked,
  style,
  success,
  takeFocus,
  wrapperClassName,
  ...props
}) => {
  const textareaRef = useRef();

  useEffect(() => {
    if (takeFocus) {
      textareaRef.current.focus();
    }
  }, [takeFocus]);

  return (
    <Field
      caution={caution}
      className={wrapperClassName}
      error={error}
      forId={id}
      help={help}
      label={label}
      labelClassName={labelClassName}
      required={required}
      stacked={stacked}
      success={success}
    >
      <textarea
        className={classNames("p-form-validation__input", className)}
        id={id}
        onKeyUp={(evt) => {
          if (grow) {
            evt.currentTarget.style.height =
              evt.currentTarget.scrollHeight + "px";
          }
        }}
        ref={textareaRef}
        style={
          (grow && {
            minHeight: "5rem",
            resize: "none",
            overflow: "hidden",
            boxSizing: "border-box",
            ...style,
          }) ||
          style
        }
        {...props}
      />
    </Field>
  );
};

Textarea.propTypes = {
  caution: PropTypes.node,
  className: PropTypes.string,
  error: PropTypes.node,
  grow: PropTypes.bool,
  help: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.node,
  labelClassName: PropTypes.string,
  onKeyUp: PropTypes.func,
  required: PropTypes.bool,
  stacked: PropTypes.bool,
  style: PropTypes.object,
  success: PropTypes.node,
  /**
   * Focus on the textarea on first render.
   */
  takeFocus: PropTypes.bool,
  wrapperClassName: PropTypes.string,
};

export default Textarea;
