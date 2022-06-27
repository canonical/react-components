import classNames from "classnames";
import React from "react";
import type { ClassName } from "types";

/**
 * The props for the Badge component.
 */
export type Props = {
  /**
   * Numeric value to be displayed.
   */
  value: number;
  /**
   * The appearance of the badge.
   */
  isNegative?: boolean;
  /**
   * Optional class(es) to give to the badge.
   */
  className?: ClassName;
};

const Badge = ({ value, className, isNegative }: Props): JSX.Element => {
  const badgeClassName = classNames(
    {
      [`p-badge--negative`]: !!isNegative,
      "p-badge": !isNegative,
    },
    className
  );

  return <span className={badgeClassName}>{value}</span>;
};

export default Badge;
