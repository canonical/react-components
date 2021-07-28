import classNames from "classnames";
import React from "react";

import CodeSnippetBlock from "./CodeSnippetBlock";
import type { Props as CodeSnippetBlockProps } from "./CodeSnippetBlock";

import type { ClassName } from "types";

export type Props = {
  /**
   * Optional class(es) to pass to the wrapping div element.
   */
  className?: ClassName;
  /**
   * A list of code blocks to display.
   */
  blocks: CodeSnippetBlockProps[];
};

export default function CodeSnippet({ className, blocks }: Props): JSX.Element {
  return (
    <div
      className={classNames(
        "p-code-snippet",
        { "is-bordered": blocks.some((block) => block.content) },
        className
      )}
    >
      {blocks.map((props, i) => (
        <CodeSnippetBlock
          key={`code-snippet-block-${i}`}
          {...props}
        ></CodeSnippetBlock>
      ))}
    </div>
  );
}
