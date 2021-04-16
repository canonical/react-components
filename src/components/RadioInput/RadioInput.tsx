import PropTypes from "prop-types";
import React, { HTMLProps } from "react";

import CheckableInput from "../CheckableInput";

type Props = {
  label: string;
  disabled?: boolean;
  required?: boolean;
} & HTMLProps<HTMLInputElement>;

const RadioInput = ({
  label,
  disabled = false,
  required = false,
  ...radioProps
}: Props): JSX.Element => {
  return (
    <CheckableInput
      inputType="radio"
      label={label}
      disabled={disabled}
      required={required}
      {...radioProps}
    ></CheckableInput>
  );
};

RadioInput.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

export default RadioInput;
