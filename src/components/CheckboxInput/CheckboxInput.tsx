import React from "react";

import CheckableInput from "./CheckableInput";
import type { CheckableInputProps } from "./CheckableInput";

export type Props = Omit<CheckableInputProps, "inputType">;

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

export default CheckboxInput;
