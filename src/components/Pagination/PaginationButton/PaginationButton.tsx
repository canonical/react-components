import classNames from "classnames";
import React from "react";
import type { MouseEventHandler } from "react";

export enum Label {
  Next = "Next page",
  Previous = "Previous page",
}

export type PaginationDirection = "forward" | "back";
export type Props = {
  /**
   * The direction of the pagination.
   */
  direction: PaginationDirection;
  /**
   * Whether the pagination button should be disabled.
   */
  disabled?: boolean;
  /**
   * Function to handle clicking the pagination button.
   */
  onClick: MouseEventHandler<HTMLButtonElement>;
  /**
   * Whether to show the label for button.
   */
  showLabel?: boolean;
  /**
   * Custom label for button.
   */
  label?: string;
};

const PaginationButton = ({
  direction,
  onClick,
  disabled = false,
  showLabel,
  label,
}: Props): JSX.Element => {
  const buttonLabel =
    label || (direction === "back" ? Label.Previous : Label.Next);
  return (
    <li className="p-pagination__item">
      <button
        className={classNames({
          "p-pagination__link--previous": direction === "back",
          "p-pagination__link--next": direction === "forward",
        })}
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        {direction === "forward" && showLabel && <span>{buttonLabel}</span>}
        <i className="p-icon--chevron-down">{buttonLabel}</i>
        {direction === "back" && showLabel && <span>{buttonLabel}</span>}
      </button>
    </li>
  );
};

export default PaginationButton;
