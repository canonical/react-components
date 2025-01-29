import classNames from "classnames";
import React, { useId, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

import Button from "../Button";
import Field from "../Field";
import VanillaLabel from "../Label";

import type { ClassName, PropsWithSpread } from "types";

export enum Label {
  Hide = "Hide",
  Show = "Show",
}

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
     * The content for success validation.
     */
    type?: "submit" | "reset" | "button";
    /**
     * Optional class(es) to pass to the wrapping Field component
     */
    wrapperClassName?: string;
  },
  InputHTMLAttributes<HTMLInputElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Password Toggle](https://docs.vanillaframework.io/base/forms/#password-toggle).
 *
 * It can be used when an input needs to obscure its value, whilst giving the user a way to reveal it if needed.
 */
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
      type,
      wrapperClassName,
      ...inputProps
    },
    ref,
  ): React.JSX.Element => {
    const [isPassword, setIsPassword] = useState(true);
    const validationId = useId();
    const helpId = useId();
    const hasError = !!error;
    const defaultPasswordToggleId = useId();
    const passwordToggleId = id || defaultPasswordToggleId;

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
        helpId={helpId}
        required={required}
        success={success}
        validationId={validationId}
      >
        <div className="p-form-password-toggle">
          <VanillaLabel forId={passwordToggleId} required={required}>
            {label}
          </VanillaLabel>
          <Button
            appearance="base"
            type={type ? type : "button"}
            className="u-no-margin--bottom"
            hasIcon
            aria-controls={id}
            aria-live="polite"
            onClick={() => togglePassword()}
          >
            <span className="p-form-password-toggle__label">
              {isPassword ? Label.Show : Label.Hide}
            </span>
            <i className={isPassword ? "p-icon--show" : "p-icon--hide"}></i>
          </Button>
        </div>
        <input
          aria-describedby={[
            help ? helpId : null,
            success ? validationId : null,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-errormessage={hasError ? validationId : null}
          aria-invalid={hasError}
          className={classNames("p-form-validation__input", className)}
          id={passwordToggleId}
          readOnly={readOnly}
          ref={ref}
          type={isPassword ? "password" : "text"}
          {...inputProps}
        />
      </Field>
    );
  },
);

export default PasswordToggle;
