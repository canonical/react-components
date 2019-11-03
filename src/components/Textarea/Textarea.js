import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Field from "../Field";

const Textarea = ({
  caution,
  className,
  error,
  grow,
  help,
  id,
  label,
  onKeyUp,
  required,
  stacked,
  style,
  success,
  ...props
}) => {
  return (
    <Field
      caution={caution}
      error={error}
      forId={id}
      help={help}
      label={label}
      required={required}
      stacked={stacked}
      success={success}
    >
      <textarea
        className={classNames("p-form-validation__input", className)}
        id={id}
        onKeyUp={evt => {
          if (grow) {
            evt.currentTarget.style.height =
              evt.currentTarget.scrollHeight + "px";
          }
        }}
        style={
          (grow && {
            minHeight: "5rem",
            resize: "none",
            overflow: "hidden",
            boxSizing: "border-box",
            ...style
          }) ||
          style
        }
        {...props}
      />
    </Field>
  );
};

Textarea.propTypes = {
  caution: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  grow: PropTypes.bool,
  help: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node,
  onKeyUp: PropTypes.func,
  required: PropTypes.bool,
  stacked: PropTypes.bool,
  style: PropTypes.object,
  success: PropTypes.string
};

export default Textarea;
