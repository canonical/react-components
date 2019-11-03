import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Field from "../Field";

const generateOptions = options =>
  options.map(({ label, value, ...props }) => (
    <option value={value} key={value || label} {...props}>
      {label}
    </option>
  ));

const Select = ({
  caution,
  className,
  error,
  help,
  id,
  label,
  options,
  required,
  stacked,
  success,
  ...props
}) => {
  return (
    <Field
      caution={caution}
      error={error}
      forId={id}
      help={help}
      isSelect={true}
      label={label}
      required={required}
      stacked={stacked}
      success={success}
    >
      <select
        className={classNames("p-form-validation__input", className)}
        id={id}
        {...props}
      >
        {generateOptions(options)}
      </select>
    </Field>
  );
};

Select.propTypes = {
  caution: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  help: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ).isRequired,
  required: PropTypes.bool,
  stacked: PropTypes.bool,
  success: PropTypes.string
};

export default Select;
