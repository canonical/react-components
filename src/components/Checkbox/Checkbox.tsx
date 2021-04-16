import PropTypes from "prop-types";
import React, { HTMLProps } from "react";

import CheckableInput from "../CheckableInput";

type Props = {
  label: string;
  disabled?: boolean;
  indeterminate?: boolean;
  required?: boolean;
} & HTMLProps<HTMLInputElement>;

const Checkbox = ({
  label,
  disabled = false,
  indeterminate = false,
  required = false,
  ...checkboxProps
}: Props): JSX.Element => {
  return (
    <CheckableInput
      inputType="checkbox"
      label={label}
      disabled={disabled}
      indeterminate={indeterminate}
      required={required}
      {...checkboxProps}
    ></CheckableInput>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  required: PropTypes.bool,
};

export default Checkbox;
