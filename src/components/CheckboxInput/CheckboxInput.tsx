import PropTypes from "prop-types";
import React, { HTMLProps } from "react";
import type { ReactNode } from "react";

import CheckableInput from "../CheckableInput";

export type Props = {
  label: ReactNode;
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
  label: PropTypes.node.isRequired,
  indeterminate: PropTypes.bool,
};

export default CheckboxInput;
