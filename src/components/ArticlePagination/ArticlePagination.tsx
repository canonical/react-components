import classNames from "classnames";
import React from "react";
import type { HTMLProps } from "react";

import type { ClassName, PropsWithSpread } from "types";

export type Props = PropsWithSpread<
  {
    /**
     * Optional classes to add to the wrapping element.
     */
    className?: ClassName;
    /**
     * The URL for the next link.
     */
    nextURL?: string;
    /**
     * The label for the next link.
     */
    nextLabel?: string;
    /**
     * The URL for the previous link.
     */
    previousURL?: string;
    /**
     * The label for the previous link.
     */
    previousLabel?: string;
  },
  HTMLProps<HTMLElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Article pagination](https://docs.vanillaframework.io/patterns/article-pagination/).
 *
 * The article pagination component should be used to navigate from one article to the next, or previous, in chronological order.
 */
const ArticlePagination = ({
  className,
  nextURL,
  nextLabel,
  previousURL,
  previousLabel,
  ...props
}: Props): JSX.Element => {
  return (
    <footer
      className={classNames(className, "p-article-pagination")}
      {...props}
    >
      {previousURL && previousLabel && (
        <a className="p-article-pagination__link--previous" href={previousURL}>
          <span className="p-article-pagination__label">Previous</span>
          <span className="p-article-pagination__title">{previousLabel}</span>
        </a>
      )}
      {nextURL && nextLabel && (
        <a className="p-article-pagination__link--next" href={nextURL}>
          <span className="p-article-pagination__label">Next</span>
          <span className="p-article-pagination__title">{nextLabel}</span>
        </a>
      )}
    </footer>
  );
};

export default ArticlePagination;
