import PropTypes from "prop-types";
import React from "react";

import CodeSnippet, { CodeSnippetBlockAppearance } from "../CodeSnippet";

/**
 * @deprecated Code component is deprecated. Use CodeSnippet component or inline `<code>` instead.
 */
const Code = ({
  children,
  className,
  inline,
  copyable,
  numbered,
  ...props
}) => {
  if (inline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  } else {
    let appearance = null;

    if (numbered) {
      appearance = CodeSnippetBlockAppearance.NUMBERED;
    } else if (copyable) {
      appearance = CodeSnippetBlockAppearance.LINUX_PROMPT;
    }
    return (
      <CodeSnippet
        blocks={[
          {
            appearance,
            code: children,
          },
        ]}
      />
    );
  }
};

Code.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inline: PropTypes.bool,
  copyable: PropTypes.bool,
  numbered: PropTypes.bool,
};

export default Code;
