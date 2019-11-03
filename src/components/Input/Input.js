import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Field from "../Field";

const Input = ({
  caution,
  className,
  error,
  wrapperClassName,
  help,
  id,
  label,
  required,
  stacked,
  success,
  type,
  ...props
}) => {
  const labelFirst = !["checkbox", "radio"].includes(type);
  return (
    <Field
      caution={caution}
      className={wrapperClassName}
      error={error}
      forId={id}
      help={help}
      label={label}
      labelFirst={labelFirst}
      required={required}
      stacked={stacked}
      success={success}
    >
      <input
        className={classNames("p-form-validation__input", className)}
        id={id}
        type={type}
        {...props}
      />
    </Field>
  );
};

Input.propTypes = {
  caution: PropTypes.string,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  error: PropTypes.string,
  help: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node,
  required: PropTypes.bool,
  stacked: PropTypes.bool,
  success: PropTypes.string,
  type: PropTypes.string
};

export default Input;
