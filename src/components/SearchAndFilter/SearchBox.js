import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

const SearchBox = React.forwardRef(
  (
    {
      autocomplete = "off",
      className,
      disabled,
      onChange,
      onSubmit,
      placeholder = "Search",
      value,
      ...props
    },
    ref
  ) => {
    const submit = (e) => {
      e.preventDefault();
      onSubmit && onSubmit(e);
    };
    return (
      <form
        className={classNames("p-search-and-filter__box", className)}
        onSubmit={submit}
        {...props}
        ref={ref}
      >
        <label className="u-off-screen" htmlFor="search">
          {placeholder || "Search"}
        </label>
        <input
          autoComplete={autocomplete}
          className="p-search-and-filter__input"
          disabled={disabled}
          id="search"
          name="search"
          onChange={(evt) => onChange(evt.target.value)}
          placeholder={placeholder}
          type="search"
          value={value}
        />
        <button
          alt="search"
          className="u-off-screen"
          disabled={disabled}
          type="submit"
        >
          Search
        </button>
      </form>
    );
  }
);

SearchBox.propTypes = {
  autocomplete: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

SearchBox.displayName = "SearchBox";

export default SearchBox;
