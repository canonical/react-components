import React, { useId } from "react";
import type { ChangeEventHandler, HTMLProps, ReactNode } from "react";

import Field from "../Field";

import type { PropsWithSpread } from "types";

export const FILLED_COLOR = "#0066CC";
export const EMPTY_COLOR = "#D9D9D9";

export type Props = PropsWithSpread<
  {
    /**
     * Field caution message.
     */
    caution?: ReactNode;
    /**
     * Whether to disable the slider and input (if showInput is true).
     */
    disabled?: boolean;
    /**
     * Field error message.
     */
    error?: ReactNode;
    /**
     * Field help message.
     */
    help?: ReactNode;
    /**
     * Field id. Only passed to range input, not to number input.
     */
    id?: string;
    /**
     * Whether to disable only the input, but not the slider.
     */
    inputDisabled?: boolean;
    /**
     * Field label.
     */
    label?: ReactNode;
    /**
     * Maximum value of the slider.
     */
    max: number;
    /**
     * Minimum value of the slider.
     */
    min: number;
    /**
     * Change event handler.
     */
    onChange: ChangeEventHandler<HTMLInputElement>;
    /**
     * Whether the field is required for the form to submit.
     */
    required?: boolean;
    /**
     * Whether to show a number input with the numerical value next to the slider.
     */
    showInput?: boolean;
  },
  HTMLProps<HTMLInputElement>
>;

/**
 * This is the [React](https://reactjs.org/) component for the Vanilla [Slider](https://vanillaframework.io/docs/patterns/slider).
 *
 * Sliders should be used to let a user specify a numeric value between a defined
minimum and maximum value, however the precise value is not especially important.
 */
export const Slider = ({
  caution,
  disabled = false,
  error,
  help,
  id,
  inputDisabled = false,
  label,
  max,
  min,
  onChange,
  required = false,
  showInput = false,
  ...inputProps
}: Props): JSX.Element => {
  const validationId = useId();
  const helpId = useId();
  const defaultSliderId = useId();
  const sliderId = id || defaultSliderId;
  const hasError = !!error;
  let style = {};
  if (navigator?.userAgent?.includes("AppleWebKit")) {
    // Range inputs on Webkit browsers don't have a built-in "filled" portion,
    // so instead it is handled here as a background.
    const val = inputProps.value ?? inputProps.defaultValue;
    const filledPercentage = `${((Number(val) - min) / (max - min)) * 100}%`;
    style = {
      background: `linear-gradient(
        to right,
        ${FILLED_COLOR} 0%,
        ${FILLED_COLOR} ${filledPercentage},
        ${EMPTY_COLOR} ${filledPercentage},
        ${EMPTY_COLOR} 100%
      )`,
    };
  }
  return (
    <Field
      caution={caution}
      error={error}
      help={help}
      forId={sliderId}
      helpId={helpId}
      label={label}
      required={required}
      validationId={validationId}
    >
      <div className="p-slider__wrapper">
        <input
          aria-describedby={help ? helpId : null}
          aria-errormessage={hasError ? validationId : null}
          aria-invalid={hasError}
          disabled={disabled}
          id={sliderId}
          max={max}
          min={min}
          onChange={onChange}
          required={required}
          style={style}
          type="range"
          {...inputProps}
        />
        {showInput && (
          <input
            aria-describedby={help ? helpId : null}
            aria-errormessage={hasError ? validationId : null}
            aria-invalid={hasError}
            className="p-slider__input"
            disabled={disabled || inputDisabled}
            max={max}
            min={min}
            onChange={onChange}
            type="number"
            {...inputProps}
          />
        )}
      </div>
    </Field>
  );
};

export default Slider;
