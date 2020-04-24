import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import "./SearchBox.scss";

const SearchBox = ({
  className,
  disabled,
  externallyControlled,
  loading,
  onChange,
  onSubmit,
  placeholder = "Search",
  value,
  ...props
}) => {
  const input = React.createRef();
  const resetInput = () => {
    onChange && onChange("");
    input.current.value = "";
  };
  const submit = evt => {
    evt.preventDefault();
    onSubmit && onSubmit(evt);
  };
  return (
    <form
      className={classNames("p-search-box", className)}
      onSubmit={submit}
      {...props}
    >
      <input
        className="p-search-box__input"
        disabled={disabled}
        name="search"
        onChange={evt => onChange(evt.target.value)}
        placeholder={placeholder}
        ref={input}
        type="search"
        defaultValue={externallyControlled ? undefined : value}
        value={externallyControlled ? value : undefined}
      />
      {loading && (
        <p className="p-search-box__spinner">
          <i className="p-icon--spinner u-animation--spin"></i>
        </p>
      )}
      {value && (
        <button
          alt="reset"
          className="p-search-box__reset"
          disabled={disabled}
          onClick={resetInput}
          type="reset"
        >
          <i className="p-icon--close"></i>
        </button>
      )}
      <button
        alt="search"
        className="p-search-box__button"
        disabled={disabled}
        type="submit"
      >
        <i className="p-icon--search"></i>
      </button>
    </form>
  );
};

SearchBox.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * Whether the input value will be controlled via external state.
   */
  externallyControlled: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default SearchBox;
