import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import type {
  ChangeEventHandler,
  ReactNode,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

import Field from "../Field";

import type { ClassName, PropsWithSpread } from "types";

type Option = OptionHTMLAttributes<HTMLOptionElement>;

/**
 * The props for the Select component.
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
    id?: string | null;
    /**
     * The label for the field.
     */
    label?: ReactNode;
    /**
     * Optional class(es) to pass to the label component.
     */
    labelClassName?: string | null;
    /**
     * Function to run when select value changes.
     */
    onChange?: ChangeEventHandler<HTMLSelectElement> | null;
    /**
     * Array of options that the select can choose from.
     */
    options?: Option[] | null;
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
    wrapperClassName?: ClassName;
  },
  SelectHTMLAttributes<HTMLSelectElement>
>;

const generateOptions = (options: Props["options"]) =>
  options?.map(({ label, value, ...props }) => (
    <option value={value} key={`${value}` || label} {...props}>
      {label}
    </option>
  ));

const Select = ({
  caution,
  className,
  error,
  help,
  id,
  label,
  labelClassName,
  onChange,
  options,
  required,
  stacked,
  success,
  takeFocus,
  wrapperClassName,
  ...selectProps
}: Props): JSX.Element => {
  const selectRef = useRef(null);

  useEffect(() => {
    if (takeFocus) {
      selectRef.current.focus();
    }
  }, [takeFocus]);

  return (
    <Field
      caution={caution}
      className={wrapperClassName}
      error={error}
      forId={id}
      help={help}
      isSelect={true}
      label={label}
      labelClassName={labelClassName}
      required={required}
      stacked={stacked}
      success={success}
    >
      <select
        className={classNames("p-form-validation__input", className)}
        id={id}
        onChange={(evt) => onChange && onChange(evt)}
        ref={selectRef}
        {...selectProps}
      >
        {generateOptions(options)}
      </select>
    </Field>
  );
};

export default Select;
