import classNames from "classnames";
import React, { useId } from "react";
import type { HTMLProps, ReactNode } from "react";

import type { ClassName, PropsWithSpread } from "types";

export type Props = PropsWithSpread<
  {
    /**
     * The content of the card.
     */
    children?: ReactNode;
    /**
     * Optional class(es) to pass to the wrapping div element.
     */
    className?: ClassName;
    /**
     * Whether the card should have highlighted styling.
     */
    highlighted?: boolean;
    /**
     * Whether the card should have overlay styling.
     */
    overlay?: boolean;
    /**
     * The path to a thumbnail image.
     */
    thumbnail?: string;
    /**
     * The title of the card.
     */
    title?: ReactNode;
  },
  HTMLProps<HTMLDivElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Card](https://docs.vanillaframework.io/patterns/card/).
 *
 * There are four card styles available to use in Vanilla: default, header, highlighted and overlay. Our card component will expand to fill the full width of its parent container.
 */

const Card = ({
  children,
  className,
  highlighted,
  overlay,
  thumbnail,
  title,
  ...props
}: Props): JSX.Element => {
  const titleId = useId();
  return (
    <div
      aria-labelledby={title ? titleId : undefined}
      className={classNames(className, {
        "p-card": !highlighted && !overlay,
        "p-card--highlighted": highlighted,
        "p-card--overlay": overlay,
      })}
      role="group"
      {...props}
    >
      {thumbnail && (
        <>
          <img className="p-card__thumbnail" src={thumbnail} alt="" />
          <hr className="u-sv1" />
        </>
      )}
      {title && (
        <h3 className="p-card__title" id={titleId}>
          {title}
        </h3>
      )}
      <div className="p-card__content">{children}</div>
    </div>
  );
};

export default Card;
