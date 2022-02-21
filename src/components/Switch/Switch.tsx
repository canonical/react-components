import React from "react";
import type { HTMLProps, ReactNode } from "react";

import Field from "../Field";

import type { PropsWithSpread } from "types";

export type Props = PropsWithSpread<
  {
    /**
     * The label name for the switch
     */
    label: ReactNode;
    /**
     * Whether the switch is disabled or not
     */
    disabled?: boolean;
  },
  HTMLProps<HTMLInputElement>
>;

export const Switch = ({
  label,
  disabled = false,
  ...inputProps
}: Props): JSX.Element => {
  return (
    <Field>
      <label className="p-switch">
        <input
          type="checkbox"
          className="p-switch__input"
          role="switch"
          disabled={disabled}
          {...inputProps}
        ></input>
        <span className="p-switch__slider"></span>
        <span className="p-switch__label">{label}</span>
      </label>
    </Field>
  );
};

export default Switch;
