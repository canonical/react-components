import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { ReactNode } from "react";

export type DropdownOptionPros = {
  label: string;
  value: string | number;
};

export type CodeSnippetDropdownProps = {
  onChange?: (evt: React.SyntheticEvent) => void;
  options: Array<DropdownOptionPros>;
};

export const CodeSnippetDropdown = ({
  options,
  onChange,
}: CodeSnippetDropdownProps): JSX.Element => {
  return (
    <select className="p-code-snippet__dropdown" onChange={onChange}>
      {options.map(({ label, value, ...props }) => (
        <option value={value} key={value || label} {...props}>
          {label}
        </option>
      ))}
    </select>
  );
};

CodeSnippetDropdown.props = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};

export const CodeSnippetBlock = ({
  code,
  title,
  numbered = false,
  icon = null,
  isWrapped = false,
  dropdowns,
}: CodeSnippetBlockProps): JSX.Element => {
  let className = "p-code-snippet__block";
  let numberedCode;

  if (numbered) {
    className += "--numbered";

    // wrap code lines in spans (and preserve the whitespace)
    const lines = code.split(/\r?\n/);
    numberedCode = lines.map((line, i) => (
      <React.Fragment key={`p-code-snippet__line-${i}`}>
        <span className="p-code-snippet__line">{line}</span>
        {"\n"}
      </React.Fragment>
    ));
  } else if (icon) {
    className += "--icon";
  }

  className = classNames(className, {
    "is-windows-prompt": icon === "windowsPrompt",
    "is-url": icon === "url",
    "is-wrapped": isWrapped,
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
        <code>{numbered ? numberedCode : code}</code>
      </pre>
    </>
  );
};

CodeSnippetBlock.props = {
  code: PropTypes.string.isRequired,
  title: PropTypes.string,
  numbered: PropTypes.bool,
  icon: PropTypes.oneOf(["linuxPrompt", "windowsPrompt", "url"]),
  isWrapped: PropTypes.bool,
  dropdowns: PropTypes.array,
};

export type Props = {
  className?: string;
  children?: ReactNode;
  blocks: Array<CodeSnippetBlockProps>;
};

type CodeSnippetBlockProps = {
  code: string;
  title?: string;
  numbered?: boolean;
  icon?: "linuxPrompt" | "windowsPrompt" | "url";
  isWrapped?: boolean;
  dropdowns?: Array<CodeSnippetDropdownProps>;
};

const CodeSnippet = ({ className, blocks }: Props): JSX.Element => {
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
};

CodeSnippet.propTypes = {
  className: PropTypes.string,
  blocks: PropTypes.array,
};

export default CodeSnippet;
