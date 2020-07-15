import PropTypes from "prop-types";
import React, { useRef } from "react";
import type { ElementType, ReactNode } from "react";
import uuidv4 from "uuid/v4";

type Props = {
  content?: ReactNode;
  expanded?: string;
  onTitleClick?: (expanded: boolean, key: string) => void;
  sectionKey?: string;
  setExpanded?: (key: string | null, title: string | null) => void;
  title?: string;
  titleElement?: ElementType | null;
};

const AccordionSection = ({
  content,
  expanded,
  onTitleClick,
  sectionKey,
  setExpanded,
  title,
  titleElement,
}: Props): JSX.Element => {
  const sectionId = useRef(uuidv4());
  const key = sectionKey || sectionId.current;
  const isExpanded = expanded === key;
  const Title = titleElement || null;
  const hasTitleElement = !!Title;

  return (
    <li className="p-accordion__group">
      <button
        aria-controls={`#${sectionId.current}`}
        aria-expanded={isExpanded ? "true" : "false"}
        className={
          hasTitleElement ? "p-accordion__tab--with-title" : "p-accordion__tab"
        }
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
        {hasTitleElement ? (
          <Title className="p-accordion__title">{title}</Title>
        ) : (
          title
        )}
      </button>
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
};

export default AccordionSection;
