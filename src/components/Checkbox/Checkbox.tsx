import PropTypes from "prop-types";
import React, { HTMLProps } from "react";

import CheckableInput from "../CheckableInput";

type Props = {
  label: string;
} & HTMLProps<HTMLElement>;

const Checkbox = ({ type, label, ...checkboxProps }: Props): JSX.Element => {
  return (
    <CheckableInput
      type="checkbox"
      label={label}
      {...checkboxProps}
    ></CheckableInput>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Checkbox;
