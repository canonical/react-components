import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const generateItems = (items, ticked, inline, stepped) =>
  items.map((item, i) => {
    let body, title, className, content, TitleComponent, props;
    if (
      React.isValidElement(item) ||
      typeof item === "string" ||
      typeof item === "number"
    ) {
      content = item;
    } else {
      ({
        title,
        className,
        content,
        titleElement: TitleComponent = "h3",
        ...props
      } = item);
    }
    if (stepped) {
      body = (
        <>
          <TitleComponent className="p-stepped-list__title">
            {title}
          </TitleComponent>
          <p className="p-stepped-list__content">{content}</p>
        </>
      );
    } else {
      body = content;
    }
    return (
      <li
        className={classNames(className, {
          "p-list__item": !inline && !stepped,
          "p-inline-list__item": inline,
          "p-stepped-list__item": stepped,
          "is-ticked": ticked
        })}
        key={i}
        {...props}
      >
        {body}
      </li>
    );
  });

const List = ({
  className,
  detailed,
  divided,
  inline,
  items,
  middot,
  split,
  stepped,
  ticked,
  ...props
}) => {
  const Component = stepped ? "ol" : "ul";
  return (
    <Component
      className={classNames("p-list", className, {
        "p-list": !divided && !inline && !middot && !stepped,
        "p-list--divided": divided,
        "p-inline-list": inline,
        "p-inline-list--middot": middot,
        "p-stepped-list": stepped && !detailed,
        "p-stepped-list--detailed": stepped && detailed,
        "is-split": split
      })}
      {...props}
    >
      {generateItems(items, ticked, inline || middot, stepped)}
    </Component>
  );
};

List.propTypes = {
  className: PropTypes.string,
  detailed: PropTypes.bool,
  divided: PropTypes.bool,
  inline: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        content: PropTypes.node,
        title: PropTypes.node,
        titleElement: PropTypes.string
      })
    ])
  ).isRequired,
  middot: PropTypes.bool,
  split: PropTypes.bool,
  stepped: PropTypes.bool,
  ticked: PropTypes.bool
};

export default List;
