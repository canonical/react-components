import PropTypes from "prop-types";
import React, { useRef } from "react";
import uuidv4 from "uuid/v4";

const AccordionSection = ({ content, expanded, setExpanded, title }) => {
  const buttonId = useRef(uuidv4());
  const sectionId = useRef(uuidv4());
  const isExpanded = expanded === buttonId.current;
  return (
    <li className="p-accordion__group">
      <button
        aria-controls={`#${sectionId.current}`}
        aria-expanded={isExpanded ? "true" : "false"}
        className="p-accordion__tab"
        id={buttonId.current}
        onClick={() => setExpanded(isExpanded ? null : buttonId.current)}
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
  setExpanded: PropTypes.func,
  title: PropTypes.string
};

export default AccordionSection;
