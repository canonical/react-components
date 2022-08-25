import React from "react";

import CheckableInput from "../CheckboxInput/CheckableInput";
import type { CheckableInputProps } from "../CheckboxInput/CheckableInput";

export type Props = Omit<CheckableInputProps, "inputType">;

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
