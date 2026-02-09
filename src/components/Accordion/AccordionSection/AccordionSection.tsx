import React, { useId } from "react";
import type { ReactNode } from "react";

import type { Headings } from "types";

export type AccordionHeadings = Exclude<Headings, "h1">;

export type Props = {
  /**
   * The content of the section.
   */
  content?: ReactNode;
  /**
   * An optional value to set the expanded section. The value must match a
   * section key.
   */
  expanded?: string | null;
  headingLevel?: number;
  /**
   * An optional click event when the title is clicked.
   */
  onTitleClick?: (expanded: boolean, key: string) => void;
  /**
   * An optional key to be used to track which section is selected.
   */
  sectionKey?: string;
  setExpanded?: (key: string | null, title: ReactNode | null) => void;
  /**
   * The title of the section.
   */
  title?: ReactNode;
  /**
   * Optional string describing heading element that should be used for the section titles.
   */
  titleElement?: AccordionHeadings;
};

const AccordionSection = ({
  content,
  expanded,
  onTitleClick,
  sectionKey,
  setExpanded,
  title,
  titleElement,
  headingLevel = 3,
}: Props): React.JSX.Element => {
  const sectionId = useId();
  const tabId = useId();
  const key = sectionKey || sectionId;
  const isExpanded = expanded === key;
  const Title = titleElement || "div";

  return (
    <li className="p-accordion__group">
      <Title
        role={titleElement ? null : "heading"}
        aria-level={titleElement ? null : headingLevel}
        className="p-accordion__heading"
      >
        <button
          aria-controls={`#${sectionId}`}
          aria-expanded={isExpanded ? "true" : "false"}
          className="p-accordion__tab"
          id={tabId}
          onClick={() => {
            if (isExpanded) {
              setExpanded(null, null);
            } else {
              setExpanded(key, title);
            }
            onTitleClick && onTitleClick(!isExpanded, key);
          }}
          role="tab"
          type="button"
        >
          {title}
        </button>
      </Title>
      <section
        aria-hidden={isExpanded ? "false" : "true"}
        aria-labelledby={tabId}
        className="p-accordion__panel"
        id={sectionId}
        role="tabpanel"
      >
        {content}
      </section>
    </li>
  );
};

export default AccordionSection;
