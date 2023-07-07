import classNames from "classnames";
import React from "react";
import type { HTMLProps, ReactNode } from "react";

import { ClassName, Headings, PropsWithSpread } from "types";

export type ListItem =
  | ReactNode
  | PropsWithSpread<
      {
        content: ReactNode;
      },
      HTMLProps<HTMLLIElement>
    >;

export type SteppedListItem = PropsWithSpread<
  {
    content: ReactNode;
    title: ReactNode;
    titleElement?: Headings;
  },
  HTMLProps<HTMLLIElement>
>;

export type Props = {
  /**
   * Optional class(es) to pass to the wrapping element.
   */
  className?: ClassName;
  /**
   * The list's items.
   */
  items: ListItem[] | SteppedListItem[];
  detailed?: boolean;
  divided?: boolean;
  inline?: boolean;
  isDark?: boolean;
  middot?: boolean;
  split?: boolean;
  stepped?: boolean;
  stretch?: boolean;
  ticked?: boolean;
} & Omit<HTMLProps<HTMLOListElement>, "type">;

const generateItems = ({
  items,
  ticked,
  inline,
  middot,
  stepped,
}: Pick<Props, "items" | "ticked" | "inline" | "middot" | "stepped">) =>
  items.map((item, i) => {
    let body: ReactNode;
    let title: ReactNode;
    let className: string;
    let content: ReactNode;
    let TitleComponent: Headings = "h3";
    let liProps: HTMLProps<HTMLLIElement>;
    if (
      React.isValidElement(item) ||
      typeof item === "string" ||
      typeof item === "number"
    ) {
      content = item;
    } else if (item && typeof item === "object" && "content" in item) {
      if ("titleElement" in item) {
        ({
          title,
          className,
          content,
          titleElement: TitleComponent = "h3",
          ...liProps
        } = item);
      } else {
        ({ title, className, content, ...liProps } = item);
      }
    }
    if (stepped) {
      body = (
        <>
          <TitleComponent className="p-stepped-list__title">
            {title}
          </TitleComponent>
          <div className="p-stepped-list__content">{content}</div>
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
          "is-ticked": ticked,
        })}
        key={i}
        {...liProps}
      >
        {body}
        {/* middot variant in Vanilla relies on whitespace between inline elements for correct spacing */}
        {middot ? " " : null}
      </li>
    );
  });

const List = ({
  className,
  detailed,
  divided,
  inline,
  isDark,
  items,
  middot,
  stretch,
  split,
  stepped,
  ticked,
  ...props
}: Props): JSX.Element => {
  const Component = stepped ? "ol" : "ul";
  return (
    <Component
      className={classNames(className, {
        "p-list": !divided && !inline && !middot && !stretch && !stepped,
        "p-list--divided": divided,
        "p-inline-list": inline,
        "p-inline-list--middot": middot,
        "p-inline-list--stretch": stretch,
        "p-stepped-list": stepped && !detailed,
        "p-stepped-list--detailed": stepped && detailed,
        "is-dark": isDark,
        "is-split": split,
      })}
      {...props}
    >
      {generateItems({
        items,
        ticked,
        inline: inline || middot || stretch,
        middot,
        stepped,
      })}
    </Component>
  );
};

export default List;
