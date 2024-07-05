import React from "react";

import CheckableInput from "./CheckableInput";
import type { CheckableInputProps } from "./CheckableInput";

export type Props = Omit<CheckableInputProps, "inputType">;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Checkbox input](https://docs.vanillaframework.io/base/forms#checkbox).
 *
 * Use the checkbox component to select one or more options.
 */
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
