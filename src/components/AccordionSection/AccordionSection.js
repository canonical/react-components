import PropTypes from "prop-types";
import React, { useRef } from "react";
import uuidv4 from "uuid/v4";

const AccordionSection = ({
  content,
  expanded,
  onTitleClick,
  sectionKey,
  setExpanded,
  title
}) => {
  const sectionId = useRef(uuidv4());
  const key = sectionKey || sectionId.current;
  const isExpanded = expanded === key;
  return (
    <li className="p-accordion__group">
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
  title: PropTypes.string
};

export default AccordionSection;
