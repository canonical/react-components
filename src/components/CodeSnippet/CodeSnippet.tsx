import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { ReactNode } from "react";

export const CodeSnippetBlock = ({
  code,
  title,
  numbered = false,
  icon = null,
  isWrapped = false,
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

  return (
    <>
      {title && (
        <div className="p-code-snippet__header">
          <h5 className="p-code-snippet__title">{title}</h5>
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
