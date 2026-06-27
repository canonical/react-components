import React, { ReactNode, useId } from "react";
import classnames from "classnames";

import CheckableInput from "./CheckableInput";
import type { CheckableInputProps } from "./CheckableInput";
import Field from "components/Field";

export type Props = Omit<CheckableInputProps, "inputType"> & {
  caution?: ReactNode;
  className?: string;
  error?: ReactNode;
  help?: ReactNode;
  helpClassName?: string;
  id?: string;
  inline?: boolean;
  success?: ReactNode;
};

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Checkbox input](https://docs.vanillaframework.io/base/forms#checkbox).
 *
 * Use the checkbox component to select one or more options.
 */
const CheckboxInput = ({
  label,
  indeterminate = false,
  caution,
  className,
  error,
  help,
  helpClassName,
  id,
  inline,
  success,
  ...checkboxProps
}: Props): React.JSX.Element => {
  const defaultInputId = useId();
  const inputId = id || defaultInputId;
  const validationId = useId();
  const helpId = useId();
  const hasError = !!error;

  return (
    <Field
      caution={caution}
      className={classnames("p-checkbox-wrapper", className, {
        "p-checkbox--inline": inline,
      })}
      error={error}
      forId={inputId}
      help={help}
      helpClassName={helpClassName}
      helpId={helpId}
      inline={inline}
      isTickElement={true}
      success={success}
      validationId={validationId}
    >
      <CheckableInput
        {...checkboxProps}
        aria-describedby={help ? helpId : undefined}
        aria-errormessage={hasError ? validationId : undefined}
        aria-invalid={hasError}
        id={inputId}
        indeterminate={indeterminate}
        inline={inline}
        inputType="checkbox"
        label={label}
      ></CheckableInput>
    </Field>
  );
};

export default CheckboxInput;
