import PropTypes from "prop-types";
import React, { HTMLProps } from "react";

import CheckableInput from "../CheckableInput";

type Props = {
  label: string;
  indeterminate?: boolean;
} & HTMLProps<HTMLInputElement>;

const CheckboxInput = ({
  label,
  indeterminate = false,
  ...checkboxProps
}: Props): JSX.Element => {
  return (
    <CheckableInput
      label={label}
      inputType="checkbox"
      indeterminate={indeterminate}
      {...checkboxProps}
    ></CheckableInput>
  );
};

CheckboxInput.propTypes = {
  label: PropTypes.string.isRequired,
  indeterminate: PropTypes.bool,
};

export default CheckboxInput;
