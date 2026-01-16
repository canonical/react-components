import React, { type ReactElement } from "react";
import { useLayoutEffect, useRef, useCallback } from "react";

import Input, { type InputProps } from "components/Input";
import classNames from "classnames";
import "./PrefixedInput.scss";
import { PropsWithSpread } from "types";

// export type PrefixedInputProps = Omit<InputProps, "type"> & {
//   /**
//    * The immutable text that appears at the beginning of the input field.
//    * This text is not editable by the user and visually appears inside the input.
//    */
//   immutableText: string;
// };

export type PrefixedInputProps = PropsWithSpread<
  {
    /**
     * The immutable text that appears at the beginning of the input field.
     * This text is not editable by the user and visually appears inside the input.
     */
    immutableText: string;
  },
  Omit<InputProps, "type">
>;

const PrefixedInput = ({
  immutableText,
  ...props
}: PrefixedInputProps): ReactElement => {
  const prefixTextRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const updatePadding = useCallback(() => {
    const prefixElement = prefixTextRef.current;
    const inputElement = inputWrapperRef.current?.querySelector("input");

    if (prefixElement && inputElement) {
      // Adjust the left padding of the input to be the same width as the immutable text.
      // This displays the user input and the unchangeable text together as one combined string.
      const prefixWidth = prefixElement.getBoundingClientRect().width;
      inputElement.style.paddingLeft = `${prefixWidth}px`;
    }
  }, []);

  useLayoutEffect(() => {
    updatePadding();

    // Listen for window resize events (includes zoom changes)
    window.addEventListener("resize", updatePadding);
  }, [immutableText, props.label, updatePadding]);

  return (
    <div
      className={classNames("prefixed-input", {
        "prefixed-input--with-label": !!props.label,
      })}
    >
      <div className="prefixed-input__text" ref={prefixTextRef}>
        {immutableText}
      </div>
      <div ref={inputWrapperRef}>
        <Input
          {...props}
          className={classNames("prefixed-input__input", props.className)}
          type="text"
          wrapperClassName={classNames(
            "prefixed-input__wrapper",
            props.wrapperClassName,
          )}
        />
      </div>
    </div>
  );
};

export default PrefixedInput;
