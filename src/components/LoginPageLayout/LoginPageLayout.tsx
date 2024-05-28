import React, { FC, ReactNode, useEffect, useLayoutEffect } from "react";
import Card from "components/Card";
import Col from "components/Col";
import Navigation from "components/Navigation";
import Row from "components/Row";
import { Theme } from "enums";
import "./LoginPageLayout.scss";

const defaultLogo = {
  src: "https://assets.ubuntu.com/v1/82818827-CoF_white.svg",
  title: "Canonical",
  url: "/",
};

export type Props = {
  title: string;
  children?: ReactNode;
  logo?: { src: string; title: string; url: string };
};

const LoginPageLayout: FC<Props> = ({
  children,
  title,
  logo = defaultLogo,
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  useLayoutEffect(() => {
    document.querySelector("body")?.classList.add("is-paper");
  });

  return (
    <Row className="p-strip page-row">
      <Col emptyLarge={4} size={6}>
        <Card className="u-no-padding page-card">
          <Navigation logo={logo} theme={Theme.DARK} />
          <div className="p-card__inner page-inner">
            <h1 className="p-heading--4">{title}</h1>
            <div>{children}</div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPageLayout;
