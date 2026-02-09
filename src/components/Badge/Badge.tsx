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
  HTMLProps<HTMLSpanElement>
>;

const MAX_VAL = 999;
const units = ["", "k", "M", "B", "T"];

const round = (value: number, unit = 0) => {
  if (value < 1000) {
    const truncatedValue = Number(value.toString().slice(0, 3));
    return `${truncatedValue}${units[unit]}`;
  }

  if (unit >= units.length - 1) {
    return "999T";
  }
  const newValue = value / 1000;
  return round(newValue, unit + 1);
};

const clamp = (value: number) => {
  if (value > MAX_VAL) {
    return `${MAX_VAL}+`;
  }
  return value;
};

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Badge](https://vanillaframework.io/docs/patterns/badge).
 *
 * It can be used to display a numeric values.
 */
const Badge = ({
  value,
  badgeType = BadgeType.UNDEFINED_LARGE_NUMBER,
  className,
  isNegative,
  ...spanProps
}: Props): React.JSX.Element => {
  const badgeClassName = classNames(
    {
      [`p-badge--negative`]: !!isNegative,
      "p-badge": !isNegative,
    },
    className,
  );

  let safeValue = Math.round(value);

  if (value < 0) {
    console.error("The value used in the badge should be positive");
    safeValue = 0;
  }

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
