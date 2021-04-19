import classNames from "classnames";
import { TSFixMe } from "index";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import React, { useEffect, useRef, HTMLProps } from "react";

type Props = {
  inputType: "radio" | "checkbox";
  label: string;
  indeterminate?: boolean;
} & HTMLProps<HTMLInputElement>;

const CheckableInput = ({
  inputType,
  label,
  indeterminate = false,
  ...checkboxProps
}: Props): JSX.Element => {
  const inputId = useRef(nanoid());
  // setting this type as any for now, otherwise it causes linting errors
  const inputRef: TSFixMe = useRef(null);

  useEffect(() => {
    inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      className={classNames(`p-${inputType}`, {
        "is-required": checkboxProps.required,
      })}
    >
      <input
        ref={inputRef}
        type={inputType}
        aria-labelledby={inputId.current}
        className={`p-${inputType}__input`}
        {...checkboxProps}
      />
      <span className={`p-${inputType}__label`} id={inputId.current}>
        {label}
      </span>
    </label>
  );
};

CheckableInput.propTypes = {
  inputType: PropTypes.oneOf(["checkbox", "radio"]).isRequired,
  label: PropTypes.string.isRequired,
  indeterminate: PropTypes.bool,
};

export default CheckableInput;
