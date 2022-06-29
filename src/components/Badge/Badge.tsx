import classNames from "classnames";
import React, { HTMLProps } from "react";
import type { ClassName, PropsWithSpread, ValueOf } from "types";

export const BadgeType = {
  ROUNDED_LARGE_NUMBER: "ROUNDED_LARGE_NUMBER",
  UNDEFINED_LARGE_NUMBER: "UNDEFINED_LARGE_NUMBER",
} as const;

/**
 * The props for the Badge component.
 */
export type Props = PropsWithSpread<
  {
    /**
     * Numeric value to be displayed.
     */
    value: number;
    /**
     * The type of the badge component.
     */
    badgeType?: ValueOf<typeof BadgeType>;
    /**
     * The appearance of the badge.
     */
    isNegative?: boolean;
    /**
     * Optional class(es) to give to the badge.
     */
    className?: ClassName;
  },
  HTMLProps<HTMLElement>
>;

const MAX_VAL = 999;

const Badge = ({
  value,
  badgeType = BadgeType.UNDEFINED_LARGE_NUMBER,
  className,
  isNegative,
  ...spanProps
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

  const round = (value: number, unit = "none") => {
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

  return (
    <span {...spanProps} className={badgeClassName}>
      {formattedValue}
    </span>
  );
};

export default Badge;
