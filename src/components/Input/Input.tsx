import classNames from "classnames";
import React, { useEffect, useId, useRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

import Field from "../Field";
import CheckboxInput from "../CheckboxInput";
import RadioInput from "../RadioInput";

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
     * Optional class(es) to pass to the help text element.
     */
    helpClassName?: ReactNode;
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
     * Delay takeFocus in milliseconds i.e. to let animations finish
     */
    takeFocusDelay?: number;
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
  helpClassName,
  id,
  label,
  labelClassName,
  required,
  stacked,
  success,
  takeFocus,
  takeFocusDelay,
  type,
  wrapperClassName,
  ...inputProps
}: Props): JSX.Element => {
  const inputRef = useRef(null);
  const fieldLabel = !["checkbox", "radio"].includes(type) ? label : "";
  const defaultInputId = useId();
  const inputId = id || defaultInputId;
  const validationId = useId();
  const helpId = useId();
  const hasError = !!error;

  const description = [help ? helpId : null, success ? validationId : null]
    .filter(Boolean)
    .join(" ");
  const commonProps = {
    "aria-describedby": !description ? undefined : description,
    "aria-errormessage": hasError ? validationId : null,
    "aria-invalid": hasError,
    id: inputId,
    required: required,
    ...inputProps,
  };

  useEffect(() => {
    if (takeFocus) {
      if (takeFocusDelay) {
        setTimeout(() => inputRef.current.focus(), takeFocusDelay);
      } else {
        inputRef.current.focus();
      }
    }
  }, [takeFocus, takeFocusDelay]);

  let input: ReactNode;
  if (type === "checkbox") {
    input = (
      <CheckboxInput
        label={label}
        labelClassName={labelClassName}
        {...commonProps}
      />
    );
  } else if (type === "radio") {
    input = (
      <RadioInput
        label={label}
        labelClassName={labelClassName}
        {...commonProps}
      />
    );
  } else {
    input = (
      <input
        className={classNames("p-form-validation__input", className)}
        ref={inputRef}
        type={type}
        {...commonProps}
      />
    );
  }
  return (
    <Field
      caution={caution}
      className={wrapperClassName}
      error={error}
      forId={inputId}
      help={help}
      helpClassName={helpClassName + ""}
      helpId={helpId}
      isTickElement={type === "checkbox" || type === "radio"}
      label={fieldLabel}
      labelClassName={labelClassName}
      required={required}
      stacked={stacked}
      success={success}
      validationId={validationId}
    >
      {input}
    </Field>
  );
};

export default Input;
