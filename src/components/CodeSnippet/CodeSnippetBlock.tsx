import classNames from "classnames";
import React from "react";
import type { ReactNode } from "react";

import CodeSnippetDropdown from "./CodeSnippetDropdown";
import type { Props as CodeSnippetDropdownProps } from "./CodeSnippetDropdown";
import type { ValueOf } from "../../types";

export const CodeSnippetBlockAppearance = {
  LINUX_PROMPT: "linuxPrompt",
  NUMBERED: "numbered",
  URL: "url",
  WINDOWS_PROMPT: "windowsPrompt",
} as const;

export type Props = {
  /**
   * The appearance of the code block.
   */
  appearance?: ValueOf<typeof CodeSnippetBlockAppearance>;
  /**
   * The code snippet to display.
   */
  code: ReactNode;
  /**
   * Content to show below the code snippet.
   */
  content?: ReactNode;
  /**
   * A list of dropdowns to display in the header.
   */
  dropdowns?: CodeSnippetDropdownProps[];
  /**
   * Whether the title should display stacked on top of the dropdowns.
   */
  stacked?: boolean;
  /**
   * The title of the code block.
   */
  title?: string;
  /**
   * Whether to enable line wrapping inside the code block.
   */
  wrapLines?: boolean;
};

export default function CodeSnippetBlock({
  appearance,
  code,
  content,
  dropdowns,
  stacked = false,
  title,
  wrapLines = false,
}: Props): React.JSX.Element {
  let className = "p-code-snippet__block";
  const isNumbered = appearance === CodeSnippetBlockAppearance.NUMBERED;
  const hasIcon =
    appearance === CodeSnippetBlockAppearance.LINUX_PROMPT ||
    appearance === CodeSnippetBlockAppearance.WINDOWS_PROMPT ||
    appearance === CodeSnippetBlockAppearance.URL;
  let numberedCode: ReactNode;

  if (isNumbered) {
    className += "--numbered";

    // wrap code lines in spans (and preserve the whitespace)
    let lines: ReactNode[];
    if (Array.isArray(code)) {
      lines = code;
    } else if (typeof code === "string") {
      lines = code.split(/\r?\n/);
    } else {
      // If the code is not able to be split over multiple lines, then display
      // a single line number.
      lines = [code];
    }
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
      {content}
    </>
  );
}
