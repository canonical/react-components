import React, { type ReactElement, useId } from "react";
import classNames from "classnames";
import Input, { type InputProps } from "components/Input";
import Field from "components/Field";
import "./PrefixedInput.scss";

export type PrefixedInputProps = {
  /**
   * The immutable text that appears at the beginning of the input field.
   * This text is not editable by the user and visually appears inside the input.
   */
  immutableText: string;
} & Omit<InputProps, "type">;

const PrefixedInput = ({
  immutableText,
  disabled,
  className,
  wrapperClassName,
  label,
  error,
  help,
  caution,
  success,
  id,
  required,
  ...props
}: PrefixedInputProps): ReactElement => {
  const defaultId = useId();
  const inputId = id || defaultId;

  return (
    <Field
      label={label}
      error={error}
      help={help}
      caution={caution}
      success={success}
      required={required}
      forId={inputId}
      className={classNames("p-prefixed-input", wrapperClassName)}
    >
      <div
        className={classNames("p-prefixed-input__flex-container", {
          "is-disabled": disabled,
          "is-error": !!error,
          "is-caution": !!caution,
          "is-success": !!success,
        })}
      >
        <span className="p-prefixed-input__prefix">{immutableText}</span>
        <Input
          {...props}
          id={inputId}
          disabled={disabled}
          required={required}
          // IMPORTANT: pass nulls so Input doesn't trigger its own Field wrapper
          label={null}
          error={null}
          help={null}
          caution={null}
          success={null}
          type="text"
          className={classNames("p-prefixed-input__input-field", className)}
        />
      </div>
    </Field>
  );
};

export default PrefixedInput;
