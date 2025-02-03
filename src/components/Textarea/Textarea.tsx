import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { TextareaHTMLAttributes, ReactNode } from "react";

import Field from "../Field";

import type { ClassName, PropsWithSpread } from "types";

/**
 * The props for the Textarea component.
 */
export type Props = PropsWithSpread<
  {
    /**
     * The content for caution validation.
     */
    caution?: ReactNode;
    /**
     * Optional class(es) to pass to the textarea element.
     */
    className?: ClassName;
    /**
     * The content for error validation.
     */
    error?: ReactNode;
    /**
     * Whether the textarea should grow to fit the content automatically.
     */
    grow?: boolean;
    /**
     * Help text to show below the field.
     */
    help?: ReactNode;
    /**
     * The id of the textarea.
     */
    id?: string;
    /**
     * The label for the field.
     */
    label?: ReactNode;
    /**
     * Optional class(es) to pass to the label component.
     */
    labelClassName?: string;
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
    wrapperClassName?: string;
    /**
     * Function to occur on keyboard event, 'CTRL + Enter'
     */
    onControlEnter?: () => void;
  },
  TextareaHTMLAttributes<HTMLTextAreaElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Textarea](https://docs.vanillaframework.io/base/forms/#textarea).
 *
 * The Textarea component defines a multi-line text input control.
 */
const Textarea = ({
  caution,
  className,
  error,
  grow = false,
  help,
  id,
  label,
  labelClassName,
  onKeyUp,
  onControlEnter,
  required,
  stacked,
  style,
  success,
  takeFocus = false,
  wrapperClassName,
  ...props
}: Props): React.JSX.Element => {
  const textareaRef = useRef(null);
  const validationId = useId();
  const helpId = useId();
  const hasError = !!error;
  const [innerValue, setInnervalue] = useState(props.defaultValue);
  const defaultTextAreaId = useId();
  const textAreaId = id || defaultTextAreaId;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        (event.ctrlKey || event.metaKey) &&
        document.activeElement === textareaRef.current
      ) {
        onControlEnter();
      }
    },
    [onControlEnter],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (takeFocus) {
      textareaRef.current.focus();
    }
  }, [takeFocus]);

  useLayoutEffect(() => {
    if (grow) {
      const textArea = textareaRef.current;
      if (textArea) {
        textArea.style.height = "0px";
        const scrollHeight = textArea.scrollHeight;
        textArea.style.height = `${scrollHeight}px`;
      }
    }
  }, [textareaRef, grow, innerValue, props.value]);

  return (
    <Field
      caution={caution}
      className={wrapperClassName}
      error={error}
      forId={textAreaId}
      help={help}
      helpId={helpId}
      label={label}
      labelClassName={labelClassName}
      required={required}
      stacked={stacked}
      success={success}
      validationId={validationId}
    >
      <textarea
        aria-describedby={[help ? helpId : null, success ? validationId : null]
          .filter(Boolean)
          .join(" ")}
        aria-errormessage={hasError ? validationId : null}
        aria-invalid={hasError}
        className={classNames("p-form-validation__input", className)}
        id={textAreaId}
        onKeyUp={(evt) => {
          onKeyUp && onKeyUp(evt);
        }}
        onChange={(evt) => {
          if (!props.value) {
            setInnervalue(evt.target.value);
          }
        }}
        ref={textareaRef}
        style={
          (grow && {
            minHeight: "5rem",
            resize: "none",
            overflow: "hidden",
            boxSizing: "border-box",
            ...style,
          }) ||
          style
        }
        {...props}
        value={props.value ?? innerValue}
      />
    </Field>
  );
};

export default Textarea;
