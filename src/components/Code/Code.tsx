import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import type { AllHTMLAttributes } from "react";

type Props = {
  children: string;
  className?: string;
  inline?: boolean;
  copyable?: boolean;
  numbered?: boolean;
} & AllHTMLAttributes<HTMLElement>;

const Code = ({
  children,
  className,
  inline,
  copyable,
  numbered,
  ...props
}: Props): JSX.Element => {
  const input = useRef(null);
  if (inline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  } else if (copyable) {
    const handleClick = () => {
      input.current.focus();
      input.current.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Copy was unsuccessful");
      }
    };
    return (
      <div className={classNames(className, "p-code-copyable")} {...props}>
        <input
          className="p-code-copyable__input"
          ref={input}
          value={children}
          readOnly
        />
        <button className="p-code-copyable__action" onClick={handleClick}>
          Copy to clipboard
        </button>
      </div>
    );
  } else if (numbered) {
    const lines = children.split(/\r?\n/);
    const content = lines.map((line, i) => (
      <span className="p-code-numbered__line" key={i}>
        {line}
      </span>
    ));
    return (
      <pre className={classNames(className, "p-code-numbered")} {...props}>
        <code>{content}</code>
      </pre>
    );
  } else {
    return (
      <pre className={className} {...props}>
        <code>{children}</code>
      </pre>
    );
  }
};

Code.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  inline: PropTypes.bool,
  copyable: PropTypes.bool,
  numbered: PropTypes.bool,
};

export default Code;
