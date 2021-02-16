import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import CodeSnippetDropdown from "./CodeSnippetDropdown";
import type { CodeSnippetDropdownProps } from "./CodeSnippetDropdown";

export enum CodeSnippetBlockAppearance {
  LINUX_PROMPT = "linuxPrompt",
  NUMBERED = "numbered",
  URL = "url",
  WINDOWS_PROMPT = "windowsPrompt",
}

export type CodeSnippetBlockProps = {
  code: string;
  title?: string;
  appearance?: CodeSnippetBlockAppearance; //"numbered" | "linuxPrompt" | "windowsPrompt" | "url";
  wrapLines?: boolean;
  dropdowns?: CodeSnippetDropdownProps[];
  stacked?: boolean;
};

export default function CodeSnippetBlock({
  code,
  title,
  appearance = null,
  wrapLines = false,
  dropdowns,
  stacked = false,
}: CodeSnippetBlockProps): JSX.Element {
  let className = "p-code-snippet__block";
  const isNumbered = appearance === CodeSnippetBlockAppearance.NUMBERED;
  const hasIcon =
    appearance === CodeSnippetBlockAppearance.LINUX_PROMPT ||
    appearance === CodeSnippetBlockAppearance.WINDOWS_PROMPT ||
    appearance === CodeSnippetBlockAppearance.URL;
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
    "is-windows-prompt":
      appearance === CodeSnippetBlockAppearance.WINDOWS_PROMPT,
    "is-url": appearance === CodeSnippetBlockAppearance.URL,
    "is-wrapped": wrapLines,
  });

  const hasDropdowns = dropdowns && dropdowns.length;

  return (
    <>
      {(title || hasDropdowns) && (
        <div
          className={`p-code-snippet__header ${stacked ? "is-stacked" : ""}`}
        >
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
}

CodeSnippetBlock.props = {
  code: PropTypes.string.isRequired,
  title: PropTypes.string,
  appearance: PropTypes.oneOf([
    CodeSnippetBlockAppearance.NUMBERED,
    CodeSnippetBlockAppearance.LINUX_PROMPT,
    CodeSnippetBlockAppearance.WINDOWS_PROMPT,
    CodeSnippetBlockAppearance.URL,
  ]),
  wrapLines: PropTypes.bool,
  dropdowns: PropTypes.array,
  stacked: PropTypes.bool,
};
