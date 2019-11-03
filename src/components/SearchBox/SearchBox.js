import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const SearchBox = ({
  disabled,
  className,
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
        defaultValue={value}
      />
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
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default SearchBox;
