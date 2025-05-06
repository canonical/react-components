import React from "react";
import classNames from "classnames";
import type { HTMLProps, ReactNode } from "react";
import type { PropsWithSpread } from "types";
import "./Switch.scss";

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
    /**
     * Help text to show below the field.
     */
    help?: ReactNode;
    /**
     * Optional class(es) to pass to the help text element.
     */
    helpClassName?: string;
  },
  HTMLProps<HTMLInputElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Switch](https://vanillaframework.io/docs/patterns/switch) component.
 */
export const Switch = ({
  label,
  disabled = false,
  help,
  helpClassName,
  ...inputProps
}: Props): React.JSX.Element => {
  return (
    <>
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
      {help && (
        <p
          className={classNames(
            "p-form-help-text",
            "switch-help-text",
            helpClassName,
          )}
          id={inputProps["aria-describedby"]}
        >
          {help}
        </p>
      )}
    </>
  );
};

export default Switch;
