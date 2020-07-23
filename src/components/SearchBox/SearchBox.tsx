import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { HTMLProps, FocusEvent, FormEvent, MouseEvent } from "react";
import { TSFixMe } from "index";

type Props = {
  autocomplete?: "on" | "off";
  className?: string;
  disabled?: boolean;
  externallyControlled?: boolean;
  onClick?: (evt: MouseEvent<HTMLFormElement>) => void;
  onChange?: (evt: TSFixMe) => void;
  onFocus?: (evt: FocusEvent<HTMLFormElement>) => void;
  onSubmit?: (evt: FormEvent) => void;
  placeholder?: string;
  value?: string;
} & HTMLProps<HTMLFormElement>;

const SearchBox = ({
  autocomplete = "on",
  className,
  disabled,
  externallyControlled,
  onChange,
  onSubmit,
  placeholder = "Search",
  value,
  ...formProps
}: Props): JSX.Element => {
  const input = React.createRef<HTMLInputElement>();
  const resetInput = () => {
    onChange && onChange(null);
    input.current.value = "";
  };
  const submit = (evt) => {
    evt.preventDefault();
    onSubmit && onSubmit(evt);
  };
  return (
    <form
      className={classNames("p-search-box", className)}
      onSubmit={submit}
      {...formProps}
    >
      <label className="u-off-screen" htmlFor="search">
        {placeholder || "Search"}
      </label>
      <input
        aria-label="search"
        autoComplete={autocomplete}
        className="p-search-box__input"
        disabled={disabled}
        id="search"
        name="search"
        onChange={(evt) => onChange(evt.target.value)}
        placeholder={placeholder}
        ref={input}
        type="search"
        defaultValue={externallyControlled ? undefined : value}
        value={externallyControlled ? value : undefined}
      />
      {value && (
        <button
          aria-label="reset"
          className="p-search-box__reset"
          disabled={disabled}
          onClick={resetInput}
          type="reset"
        >
          <i className="p-icon--close">Clear search field</i>
        </button>
      )}
      <button
        aria-label="search"
        className="p-search-box__button"
        disabled={disabled}
        type="submit"
      >
        <i className="p-icon--search">Search</i>
      </button>
    </form>
  );
};

SearchBox.propTypes = {
  autocomplete: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * Whether the input value will be controlled via external state.
   */
  externallyControlled: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default SearchBox;
