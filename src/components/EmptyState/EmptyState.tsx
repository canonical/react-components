import React, { ReactNode, HTMLProps, ReactElement } from "react";
import Col from "components/Col";
import Icon from "components/Icon";
import Row from "components/Row";
import { PropsWithSpread } from "types";

export type Props = PropsWithSpread<
  {
    /**
     * The content of the empty state.
     */
    children: ReactNode;
    /**
     * Optional class(es) to add to the wrapping element.
     */
    className?: string;
    /**
     * Optional class(es) to add to the icon element.
     */
    iconClassName?: string;
    /**
     * The name of the icon.
     */
    iconName: string;
    /**
     * The title of the empty state.
     */
    title: string;
  },
  HTMLProps<HTMLDivElement>
>;

export const EmptyState = ({
  children,
  className,
  iconClassName,
  iconName,
  title,
  ...props
}: Props): ReactElement => {
  return (
    <Row className={className} {...props}>
      <Col size={6} className="col-start-large-4">
        <p>
          <Icon
            name={iconName}
            className={iconClassName}
            style={{ opacity: 0.25, height: "2.5rem", width: "2.5rem" }}
          />
        </p>
        <h2 className="p-heading--4" style={{ paddingTop: 0 }}>
          {title}
        </h2>
        {children}
      </Col>
    </Row>
  );
};

export default EmptyState;
