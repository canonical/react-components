import PropTypes from "prop-types";
import React from "react";
import type { HTMLProps } from "react";

type DropdownOptionProps = {
  label: string;
} & HTMLProps<HTMLOptionElement>;

export type CodeSnippetDropdownProps = {
  onChange: (evt: React.SyntheticEvent) => void;
  options: DropdownOptionProps[];
} & HTMLProps<HTMLSelectElement>;

export default function CodeSnippetDropdown({
  options,
  onChange,
  ...props
}: CodeSnippetDropdownProps): JSX.Element {
  return (
    <select className="p-code-snippet__dropdown" onChange={onChange} {...props}>
      {options.map(({ label, value, ...props }) => (
        <option value={value} key={value + "" || label} {...props}>
          {label}
        </option>
      ))}
    </select>
  );
}

CodeSnippetDropdown.props = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};
