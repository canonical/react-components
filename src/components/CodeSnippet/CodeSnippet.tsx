import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { HTMLProps } from "react";

export type Props = {
  className?: string;
  blocks: Array<CodeSnippetBlockProps>;
};

export default function CodeSnippet({ className, blocks }: Props): JSX.Element {
  return (
    <div className={classNames("p-code-snippet", className)}>
      {blocks.map((props, i) => (
        <CodeSnippetBlock
          key={`code-snippet-block-${i}`}
          {...props}
        ></CodeSnippetBlock>
      ))}
    </div>
  );
}

CodeSnippet.propTypes = {
  blocks: PropTypes.array.isRequired,
  className: PropTypes.string,
};

type CodeSnippetBlockProps = {
  code: string;
  title?: string;
  appearance?: "numbered" | "linuxPrompt" | "windowsPrompt" | "url";
  wrapLines?: boolean;
  dropdowns?: Array<CodeSnippetDropdownProps>;
};

export const CodeSnippetBlock = ({
  code,
  title,
  appearance = null,
  wrapLines = false,
  dropdowns,
}: CodeSnippetBlockProps): JSX.Element => {
  let className = "p-code-snippet__block";
  const isNumbered = appearance === "numbered";
  const hasIcon =
    appearance === "linuxPrompt" ||
    appearance === "windowsPrompt" ||
    appearance === "url";
  let numberedCode;

  if (isNumbered) {
    className += "--numbered";

    // wrap code lines in spans (and preserve the whitespace)
    const lines = code.split(/\r?\n/);
    numberedCode = lines.map((line, i) => (
      <React.Fragment key={`p-code-snippet__line-${i}`}>
        <span className="p-code-snippet__line">{line}</span>
        {"\n"}
      </React.Fragment>
    ));
  } else if (hasIcon) {
    className += "--icon";
  }

  className = classNames(className, {
    "is-windows-prompt": appearance === "windowsPrompt",
    "is-url": appearance === "url",
    "is-wrapped": wrapLines,
  });

  const hasDropdowns = dropdowns && dropdowns.length;

  return (
    <>
      {(title || hasDropdowns) && (
        <div className="p-code-snippet__header">
          <h5 className="p-code-snippet__title">{title}</h5>
          {hasDropdowns && (
            <div className="p-code-snippet__dropdowns">
              {dropdowns.map((dropdown, i) => (
                <CodeSnippetDropdown
                  {...dropdown}
                  key={`code-snippet-dropdown-${i}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <pre className={className}>
        <code>{isNumbered ? numberedCode : code}</code>
      </pre>
    </>
  );
};

CodeSnippetBlock.props = {
  code: PropTypes.string.isRequired,
  title: PropTypes.string,
  appearance: PropTypes.oneOf([
    "numbered",
    "linuxPrompt",
    "windowsPrompt",
    "url",
  ]),
  wrapLines: PropTypes.bool,
  dropdowns: PropTypes.array,
};

type DropdownOptionProps = {
  label: string;
} & HTMLProps<HTMLOptionElement>;

type CodeSnippetDropdownProps = {
  onChange: (evt: React.SyntheticEvent) => void;
  options: Array<DropdownOptionProps>;
} & HTMLProps<HTMLSelectElement>;

export const CodeSnippetDropdown = ({
  options,
  onChange,
  ...props
}: CodeSnippetDropdownProps): JSX.Element => {
  return (
    <select className="p-code-snippet__dropdown" onChange={onChange} {...props}>
      {options.map(({ label, value, ...props }) => (
        <option value={value} key={value + "" || label} {...props}>
          {label}
        </option>
      ))}
    </select>
  );
};

CodeSnippetDropdown.props = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};
