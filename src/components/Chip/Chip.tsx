import React, { type ReactNode } from "react";
import { highlightSubString } from "../../utils";
import type { KeyboardEvent, MouseEvent, HTMLProps } from "react";
import { ValueOf, PropsWithSpread } from "types";
import classNames from "classnames";
import { ICONS } from "../Icon";

export enum Label {
  Dismiss = "Dismiss",
}

export const ChipType = {
  CAUTION: "caution",
  INFORMATION: "information",
  NEGATIVE: "negative",
  POSITIVE: "positive",
} as const;

export type Props = PropsWithSpread<
  {
    /**
     * The appearance of the chip.
     */
    appearance?: ValueOf<typeof ChipType>;

    /**
     * Whether the chip is read-only.
     * If true, the chip will not be interactive.
     */
    isReadOnly?: boolean;
    /**
     * A badge to display on the chip.
     */
    badge?: ReactNode;
    /**
     * The name of an icon to display on the chip.
     */
    iconName?: ValueOf<typeof ICONS> | string;
    /**
     * Whether the chip is dense.
     * Reduces the height of the chip by removing padding.
     */
    isDense?: boolean;
    /**
     * Whether the chip is inline.
     * If true, the chip will be displayed inline with other content (such as text).
     */
    isInline?: boolean;
    /**
     * The lead for the chip.
     */
    lead?: string;
    /**
     * Function for handling chip div click event.
     */
    onClick?: (
      event: MouseEvent<HTMLButtonElement> | { lead: string; value: string },
    ) => void;
    /**
     * Function for handling dismissing a chip.
     */
    onDismiss?: (event: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Whether the chip is selected.
     */
    selected?: boolean;
    /**
     * A substring to emphasise if it is part of the chip's value,
     * e.g. "sit" => poSITive
     */
    subString?: string;
    /**
     * Whether to wrap the value in quotation marks.
     */
    quoteValue?: boolean;
    /**
     * The value of the chip.
     */
    value: string;
  },
  HTMLProps<HTMLButtonElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Chip](https://vanillaframework.io/docs/patterns/chip).
 *
 * It can be used to display a small value attached to a component.
 */
const Chip = ({
  appearance,
  lead = "",
  onClick,
  onDismiss,
  quoteValue,
  selected,
  subString = "",
  isReadOnly = false,
  isDense = false,
  isInline = false,
  iconName,
  badge,
  value,
  ...props
}: Props): React.JSX.Element => {
  // When user tabs over chip and presses Enter or Space key, chip will trigger
  // click functionality
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    // The " " value is what is returned for the spacebar
    if (e.key === " " || e.key === "Enter") {
      if (typeof onClick === "function") {
        onClick({ lead: lead, value: value });
      }
    }
  };

  const chipValue = highlightSubString(value, subString).text;

  const chipContent = (
    <>
      {iconName && <i className={`p-icon--${iconName}`} />}
      {lead && <span className="p-chip__lead">{lead.toUpperCase()}</span>}
      <span
        className="p-chip__value"
        dangerouslySetInnerHTML={{
          __html: quoteValue ? `'${chipValue}'` : chipValue,
        }}
      />
      {badge && badge}
    </>
  );

  const chipClassName = classNames(
    {
      [`p-chip--${appearance}`]: !!appearance,
      "p-chip": !appearance,
      "is-dense": isDense,
      "is-readonly": isReadOnly,
      "is-inline": isInline,
    },
    props.className,
  );

  if (isReadOnly) {
    return (
      <span {...props} className={chipClassName}>
        {chipContent}
      </span>
    );
  } else if (onDismiss) {
    return (
      <span {...props} className={chipClassName}>
        {chipContent}
        <button className="p-chip__dismiss" onClick={onDismiss} type="button">
          <i className="p-icon--close">{Label.Dismiss}</i>
        </button>
      </span>
    );
  } else {
    return (
      <button
        {...props}
        aria-pressed={selected}
        className={chipClassName}
        onClick={onClick}
        onKeyDown={(e) => onKeyDown(e)}
        type="button"
      >
        {chipContent}
      </button>
    );
  }
};

export default Chip;
