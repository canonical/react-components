import classNames from "classnames";
import React from "react";
import type { HTMLProps, ReactNode } from "react";

import type { ClassName, PropsWithSpread } from "types";
import { useId } from "hooks";

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
      aria-labelledby={titleId}
      className={classNames(className, {
        "p-card": !highlighted && !overlay,
        "p-card--highlighted": highlighted,
        "p-card--overlay": overlay,
      })}
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
