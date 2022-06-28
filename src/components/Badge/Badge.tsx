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
   * Round the value to the nearest unit
   */
  isRounded?: boolean;
  /**
   * Optional class(es) to give to the badge.
   */
  className?: ClassName;
};

const Badge = ({
  value,
  className,
  isNegative,
  isRounded,
}: Props): JSX.Element => {
  const badgeClassName = classNames(
    {
      [`p-badge--negative`]: !!isNegative,
      "p-badge": !isNegative,
    },
    className
  );

  const nextUnit = {
    none: "k",
    k: "M",
    M: "B",
    B: "T",
  };

  const round = (value, unit = "none") => {
    console.log(value);
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

  const formattedValue = isRounded ? round(value) : value;

  return <span className={badgeClassName}>{formattedValue}</span>;
};

export default Badge;
