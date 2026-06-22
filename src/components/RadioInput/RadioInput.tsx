import React, { ReactNode, useId } from "react";
import classnames from "classnames";

import CheckableInput from "../CheckboxInput/CheckableInput";
import type { CheckableInputProps } from "../CheckboxInput/CheckableInput";
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
  wrapperClassName?: string;
};

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Radio input](https://docs.vanillaframework.io/base/forms#radio-button).
 *
 * Use radio buttons to select one of the given set of options.
 */
const RadioInput = ({
  label,
  caution,
  className,
  error,
  help,
  helpClassName,
  id,
  inline,
  success,
  ...radioProps
}: Props): React.JSX.Element => {
  const defaultInputId = useId();
  const inputId = id || defaultInputId;
  const validationId = useId();
  const helpId = useId();
  const hasError = !!error;

  return (
    <Field
      caution={caution}
      className={classnames(className, { "p-radio--inline": inline })}
      error={error}
      forId={inputId}
      help={help}
      helpClassName={helpClassName}
      helpId={helpId}
      isTickElement={true}
      success={success}
      validationId={validationId}
      inline={inline}
    >
      <CheckableInput
        {...radioProps}
        aria-describedby={help ? helpId : undefined}
        aria-errormessage={hasError ? validationId : undefined}
        aria-invalid={hasError}
        id={inputId}
        inline={inline}
        inputType="radio"
        label={label}
      ></CheckableInput>
    </Field>
  );
};

export default RadioInput;
