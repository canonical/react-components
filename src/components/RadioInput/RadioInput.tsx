import React from "react";

import CheckableInput from "../CheckboxInput/CheckableInput";
import type { CheckableInputProps } from "../CheckboxInput/CheckableInput";

export type Props = Omit<CheckableInputProps, "inputType">;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Radio input](https://docs.vanillaframework.io/base/forms#radio-button).
 *
 * Use radio buttons to select one of the given set of options.
 */
const RadioInput = ({ label, ...radioProps }: Props): JSX.Element => {
  return (
    <CheckableInput
      inputType="radio"
      label={label}
      {...radioProps}
    ></CheckableInput>
  );
};

export default RadioInput;
