import classNames from "classnames";
import PropTypes from "prop-types";
import React, { HTMLProps } from "react";

// Todo: Improve this type such that nextURL & nextLabel and previousURL & previousLabel
// are required together, but mutually optional.
type Props = {
  className?: string;
  nextURL?: string;
  nextLabel?: string;
  previousURL?: string;
  previousLabel?: string;
} & HTMLProps<HTMLElement>;

const ArticlePagination = ({
  className,
  nextURL,
  nextLabel,
  previousURL,
  previousLabel,
  ...footerProps
}: Props): JSX.Element => (
  <footer
    className={classNames(className, "p-article-pagination")}
    {...footerProps}
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

ArticlePagination.propTypes = {
  className: PropTypes.string,
  /**
   * The URL for the next link.
   */
  nextURL: PropTypes.string,
  /**
   * The label for the next link.
   */
  nextLabel: PropTypes.string,
  /**
   * The URL for the previous link.
   */
  previousURL: PropTypes.string,
  /**
   * The label for the previous link.
   */
  previousLabel: PropTypes.string,
};

export default ArticlePagination;
