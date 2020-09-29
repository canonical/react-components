import PropTypes from "prop-types";
import React from "react";
import type { ChangeEventHandler, HTMLProps, ReactNode } from "react";

import Field from "../Field";

export const FILLED_COLOR = "#0066CC";

type Props = {
  caution?: ReactNode;
  disabled?: boolean;
  error?: ReactNode;
  id?: string;
  help?: ReactNode;
  inputDisabled?: boolean;
  label?: ReactNode;
  max: number;
  min: number;
  onChange: ChangeEventHandler;
  required?: boolean;
  showInput?: boolean;
} & HTMLProps<HTMLInputElement>;

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
  let style = {};
  if (navigator?.userAgent?.includes("AppleWebKit")) {
    // Range inputs on Webkit browsers don't have a built-in "filled" portion,
    // so instead it is handled here as a background.
    const val = inputProps.value || inputProps.defaultValue;
    const filledPercentage = `${((Number(val) - min) / (max - min)) * 100}%`;
    style = {
      background: `linear-gradient(
        to right,
        ${FILLED_COLOR} 0%,
        ${FILLED_COLOR} ${filledPercentage},
        transparent ${filledPercentage},
        transparent 100%
      )`,
    };
  }
  return (
    <Field
      caution={caution}
      error={error}
      help={help}
      label={label}
      required={required}
    >
      <div className="p-slider__wrapper">
        <input
          className="p-slider"
          disabled={disabled}
          id={id}
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

Slider.propTypes = {
  /**
   * Field caution message.
   */
  caution: PropTypes.node,
  /**
   * Whether to disable the slider and input (if showInput is true).
   */
  disabled: PropTypes.bool,
  /**
   * Field error message.
   */
  error: PropTypes.node,
  /**
   * Field help message.
   */
  help: PropTypes.node,
  /**
   * Field id. Only passed to range input, not to number input.
   */
  id: PropTypes.string,
  /**
   * Whether to disable only the input, but not the slider.
   */
  inputDisabled: PropTypes.bool,
  /**
   * Field label.
   */
  label: PropTypes.node,
  /**
   * Maximum value of the slider.
   */
  max: PropTypes.number.isRequired,
  /**
   * Minimum value of the slider.
   */
  min: PropTypes.number.isRequired,
  /**
   * Change event handler.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Whether the field is required for the form to submit.
   */
  required: PropTypes.bool,
  /**
   * Whether to show a number input with the numerical value next to the slider.
   */
  showInput: PropTypes.bool,
};

export default Slider;
