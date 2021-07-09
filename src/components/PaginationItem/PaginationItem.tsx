import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { MouseEventHandler } from "react";

export type Props = {
  number: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
};

const PaginationItem = ({
  number,
  onClick,
  isActive = false,
}: Props): JSX.Element => (
  <li className="p-pagination__item">
    <button
      className={classNames("p-pagination__link", {
        "is-active": isActive,
      })}
      onClick={onClick}
    >
      {number}
    </button>
  </li>
);

PaginationItem.propTypes = {
  number: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

export default PaginationItem;
