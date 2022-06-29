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

  const safeValue = value < 0 ? 0 : value;

  const nextUnit = {
    none: "k",
    k: "M",
    M: "B",
    B: "T",
  };

  const round = (value: number, unit: string = "none") => {
    if (value < 1000) {
      const truncatedValue = Number(value.toString().slice(0, 3));
      return `${truncatedValue}${unit === "none" ? "" : unit}`;
    }
    if (!nextUnit[unit]) {
      return "+999T";
    }
    const newValue = value / 1000;
    return round(newValue, nextUnit[unit]);
  };

  const clamp = (value: number) => {
    if (value > MAX_VAL) {
      return `${MAX_VAL}+`;
    }
    return value;
  };

  const formattedValue =
    badgeType === BadgeType.ROUNDED_LARGE_NUMBER
      ? round(safeValue)
      : clamp(safeValue);

  return <span className={badgeClassName}>{formattedValue}</span>;
};

export default Badge;
