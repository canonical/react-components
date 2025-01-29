import React, { HTMLProps } from "react";

export type Props = {
  /**
   * Id of the main content area to skip to.
   */
  mainId?: string;
} & HTMLProps<HTMLAnchorElement>;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Skip link](https://vanillaframework.io/docs/patterns/links#skip-link) component.
 */
export const SkipLink = ({
  mainId = "main-content",
}: Props): React.JSX.Element => {
  return (
    <a className="p-link--skip" href={`#${mainId}`}>
      Skip to main content
    </a>
  );
};

export default SkipLink;
