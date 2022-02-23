import classNames from "classnames";
import React, { useEffect, useRef, HTMLProps } from "react";
import type { ReactNode } from "react";

import type { PropsWithSpread } from "types";
import { useId } from "hooks/useId";

export type Props = PropsWithSpread<
  {
    /**
     * The type of the input element.
     */
    inputType: "radio" | "checkbox";
    /**
     * The label for the input element.
     */
    label: ReactNode;
    /**
     * Whether the input element should display in indeterminate state.
     */
    indeterminate?: boolean;
    /**
     * Ensures the input and the label text are properly aligned with other inline text.
     */
    inline?: boolean;
  },
  // We explicitly omit "type" otherwise it's possible to overwrite "inputType".
  // Might want to consider just using "type" instead.
  Omit<HTMLProps<HTMLInputElement>, "type">
>;

const CheckableInput = ({
  inputType,
  label,
  indeterminate = false,
  ...checkboxProps
}: Props): JSX.Element => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      className={classNames(
        `p-${inputType}${checkboxProps.inline ? "--inline" : ""}`,
        {
          "is-required": checkboxProps.required,
        }
      )}
    >
      <input
        aria-labelledby={inputId}
        className={`p-${inputType}__input`}
        ref={inputRef}
        type={inputType}
        {...checkboxProps}
      />
      <span className={`p-${inputType}__label`} id={inputId}>
        {label}
      </span>
    </label>
  );
};

export default CheckableInput;
