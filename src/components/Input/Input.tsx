import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

import Field from "../Field";

import type { ClassName, PropsWithSpread } from "types";

/**
 * The props for the Input component.
 */
export type Props = PropsWithSpread<
  {
    /**
     * The content for caution validation.
     */
    caution?: ReactNode;
    /**
     * Optional class(es) to pass to the input element.
     */
    className?: ClassName;
    /**
     * The content for error validation message. Controls the value of aria-invalid attribute.
     */
    error?: ReactNode;
    /**
     * Help text to show below the field.
     */
    help?: ReactNode;
    /**
     * The id of the input.
     */
    id?: string;
    /**
     * The label for the field.
     */
    label?: ReactNode;
    /**
     * Optional class(es) to pass to the label component.
     */
    labelClassName?: string;
    /**
     * Whether the field is required.
     */
    required?: boolean;
    /**
     * Whether the form field should have a stacked appearance.
     */
    stacked?: boolean;
    /**
     * The content for success validation.
     */
    success?: ReactNode;
    /**
     * Whether to focus on the input on initial render.
     */
    takeFocus?: boolean;
    /**
     * Optional class(es) to pass to the wrapping Field component
     */
    wrapperClassName?: string;
  },
  InputHTMLAttributes<HTMLInputElement>
>;

const Input = ({
  caution,
  className,
  error,
  help,
  id,
  label,
  labelClassName,
  required,
  stacked,
  success,
  takeFocus,
  type,
  wrapperClassName,
  ...inputProps
}: Props): JSX.Element => {
  const inputRef = useRef(null);
  const labelFirst = !["checkbox", "radio"].includes(type);

  useEffect(() => {
    if (takeFocus) {
      inputRef.current.focus();
    }
  }, [takeFocus]);

  return (
    <Field
      caution={caution}
      className={wrapperClassName}
      error={error}
      forId={id}
      help={help}
      label={label}
      labelClassName={labelClassName}
      labelFirst={labelFirst}
      required={required}
      stacked={stacked}
      success={success}
    >
      <input
        className={classNames("p-form-validation__input", className)}
        id={id}
        ref={inputRef}
        type={type}
        aria-invalid={!!error}
        {...inputProps}
      />
    </Field>
  );
};

export default Input;
