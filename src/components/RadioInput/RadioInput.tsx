import React from "react";

import CheckableInput from "../CheckableInput";
import type { Props as CheckableInputProps } from "../CheckableInput/CheckableInput";

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
