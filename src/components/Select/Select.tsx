import classNames from "classnames";
import PropTypes from "prop-types";
import React, { HTMLAttributes } from "react";
import type { ChangeEventHandler, ReactNode } from "react";

import Field from "../Field";

type Option = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

const generateOptions = (options) =>
  options.map(({ label, value, ...props }) => (
    <option value={value} key={value || label} {...props}>
      {label}
    </option>
  ));

type Props = {
  options: Option[];
  caution?: string;
  className?: string;
  error?: string;
  help?: string;
  id?: string;
  label?: ReactNode;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
  stacked?: boolean;
  success?: string;
} & HTMLAttributes<HTMLSelectElement>;

const Select = ({
  caution,
  className,
  error,
  help,
  id,
  label,
  onChange,
  options,
  required,
  stacked,
  success,
  ...selectProps
}: Props): JSX.Element => {
  return (
    <Field
      caution={caution}
      error={error}
      forId={id}
      help={help}
      isSelect={true}
      label={label}
      required={required}
      stacked={stacked}
      success={success}
    >
      <select
        className={classNames("p-form-validation__input", className)}
        id={id}
        onChange={(evt) => onChange && onChange(evt)}
        {...selectProps}
      >
        {generateOptions(options)}
      </select>
    </Field>
  );
};

Select.propTypes = {
  caution: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  help: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  required: PropTypes.bool,
  stacked: PropTypes.bool,
  success: PropTypes.string,
};

export default Select;
