import classNames from "classnames";
import React, { HTMLProps } from "react";

import CodeSnippetBlock from "./CodeSnippetBlock";
import type { Props as CodeSnippetBlockProps } from "./CodeSnippetBlock";

import type { ClassName, PropsWithSpread } from "types";

export type Props = PropsWithSpread<
  {
    /**
     * Optional class(es) to pass to the wrapping div element.
     */
    className?: ClassName;
    /**
     * A list of code blocks to display.
     */
    blocks: CodeSnippetBlockProps[];
  },
  HTMLProps<HTMLDivElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Code snippet](https://docs.vanillaframework.io/base/code#code-snippet).
 *
 * #### Blocks
 *
 * A single `CodeSnippet` component can render multiple separate code blocks. Blocks are provided as an array via the `blocks` prop. Each block object defines values of props for each code block of the snippet.
 */
export default function CodeSnippet({
  className,
  blocks,
  ...props
}: Props): React.JSX.Element {
  return (
    <div
      className={classNames(
        "p-code-snippet",
        { "is-bordered": blocks.some((block) => block.content) },
        className,
      )}
      {...props}
    >
      {blocks.map((blockProps, i) => (
        <CodeSnippetBlock
          key={`code-snippet-block-${i}`}
          {...blockProps}
        ></CodeSnippetBlock>
      ))}
    </div>
  );
}
