import classNames from "classnames";
import React, { useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

import Button from "../Button";
import Field from "../Field";
import Label from "../Label";

import type { ClassName, PropsWithSpread } from "types";

/**
 * The props for the Password Toggle component.
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
     * The content for error validation.
     */
    error?: ReactNode;
    /**
     * Help text to show below the field.
     */
    help?: ReactNode;
    /**
     * The id of the input.
     */
    id: string;
    /**
     * The label for the field.
     */
    label?: ReactNode;
    /**
     * Whether the field is read only.
     */
    readOnly?: boolean;
    /**
     * Whether the field is required.
     */
    required?: boolean;
    /**
     * The content for success validation.
     */
    success?: ReactNode;
    /**
     * Optional class(es) to pass to the wrapping Field component
     */
    wrapperClassName?: string;
  },
  InputHTMLAttributes<HTMLInputElement>
>;

const PasswordToggle = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      caution,
      className,
      error,
      help,
      id,
      label,
      readOnly,
      required,
      success,
      wrapperClassName,
      ...inputProps
    },
    ref
  ): JSX.Element => {
    const [isPassword, setIsPassword] = useState(true);

    const togglePassword = () => {
      if (isPassword) {
        setIsPassword(false);
      } else {
        setIsPassword(true);
      }
    };

    return (
      <Field
        caution={caution}
        className={wrapperClassName}
        error={error}
        help={help}
        required={required}
        success={success}
      >
        <div className="p-form-password-toggle">
          <Label forId={id} required={required}>
            {label}
          </Label>
          <Button
            appearance="base"
            className="u-no-margin--bottom"
            hasIcon
            aria-controls={id}
            aria-live="polite"
            onClick={() => togglePassword()}
          >
            <span className="p-form-password-toggle__label">
              {isPassword ? "Show" : "Hide"}
            </span>
            <i className={isPassword ? "p-icon--show" : "p-icon--hide"}></i>
          </Button>
        </div>
        <input
          className={classNames("p-form-validation__input", className)}
          id={id}
          ref={ref}
          type={isPassword ? "password" : "text"}
          readOnly={readOnly}
          {...inputProps}
        />
      </Field>
    );
  }
);

export default PasswordToggle;
