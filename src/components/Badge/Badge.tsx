import classNames from "classnames";
import React from "react";
import type { ClassName, ValueOf } from "types";

export const BadgeType = {
  ROUNDED_LARGE_NUMBER: "ROUNDED_LARGE_NUMBER",
  UNDEFINED_LARGE_NUMBER: "UNDEFINED_LARGE_NUMBER",
} as const;

/**
 * The props for the Badge component.
 */
export type Props = {
  /**
   * Numeric value to be displayed.
   */
  value: number;
  /**
   * The type of the badge component.
   */
  badgeType?: ValueOf<typeof BadgeType> | string;
  /**
   * The appearance of the badge.
   */
  isNegative?: boolean;
  /**
   * Optional class(es) to give to the badge.
   */
  className?: ClassName;
};

const MAX_VAL = 999;

const Badge = ({
  value,
  badgeType = BadgeType.UNDEFINED_LARGE_NUMBER,
  className,
  isNegative,
}: Props): JSX.Element => {
  const badgeClassName = classNames(
    {
      [`p-badge--negative`]: !!isNegative,
      "p-badge": !isNegative,
    },
    className
  );

  const getDisplayValue = () => {
    let displayValue: string = value.toString();

    if (badgeType === BadgeType.UNDEFINED_LARGE_NUMBER) {
      if (value > MAX_VAL) {
        displayValue = MAX_VAL + "+";
      }
    }

    return displayValue;
  };

  return <span className={badgeClassName}>{getDisplayValue()}</span>;
};

export default Badge;
