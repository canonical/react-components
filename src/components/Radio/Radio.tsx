import PropTypes from "prop-types";
import React, { HTMLProps } from "react";

import CheckableInput from "../CheckableInput";

type Props = {
  label: string;
} & HTMLProps<HTMLElement>;

const Radio = ({ type, label, ...radioProps }: Props): JSX.Element => {
  return (
    <CheckableInput type="radio" label={label} {...radioProps}></CheckableInput>
  );
};

Radio.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Radio;
