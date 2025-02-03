import React from "react";
import type { HTMLProps, ReactNode } from "react";

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

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Switch](https://vanillaframework.io/docs/patterns/switch) component.
 */
export const Switch = ({
  label,
  disabled = false,
  ...inputProps
}: Props): React.JSX.Element => {
  return (
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
  );
};

export default Switch;
