import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import type { ReactNode } from "react";

import type { Headings } from "types";

export type AccordionHeadings = Exclude<Headings, "h1">;

export type Props = {
  content?: ReactNode;
  expanded?: string;
  onTitleClick?: (expanded: boolean, key: string) => void;
  sectionKey?: string;
  setExpanded?: (key: string | null, title: string | null) => void;
  title?: string;
  titleElement?: AccordionHeadings;
  headingLevel?: number;
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
}: Props): JSX.Element => {
  const sectionId = useRef(nanoid());
  const key = sectionKey || sectionId.current;
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
          aria-controls={`#${sectionId.current}`}
          aria-expanded={isExpanded ? "true" : "false"}
          className="p-accordion__tab"
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
        aria-labelledby={sectionId.current}
        className="p-accordion__panel"
        id={sectionId.current}
        role="tabpanel"
      >
        {content}
      </section>
    </li>
  );
};

AccordionSection.propTypes = {
  content: PropTypes.node,
  expanded: PropTypes.string,
  /**
   * An optional click event when the title is clicked.
   */
  onTitleClick: PropTypes.func,
  /**
   * An optional key to be used to track which section is selected.
   */
  sectionKey: PropTypes.string,
  setExpanded: PropTypes.func,
  title: PropTypes.string,
  titleElement: PropTypes.oneOf(["h2", "h3", "h4", "h5", "h6"]),
  headingLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
};

export default AccordionSection;
