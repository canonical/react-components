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
  labelClassName,
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
      labelClassName={labelClassName}
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
  caution: PropTypes.node,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  error: PropTypes.node,
  help: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.node,
  labelClassName: PropTypes.string,
  required: PropTypes.bool,
  stacked: PropTypes.bool,
  success: PropTypes.node,
  type: PropTypes.string,
};

export default Input;
