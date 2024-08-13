import React, { FC, ReactNode, useLayoutEffect } from "react";
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

/**
 * This is a layout component that is used to display a page with a title and children.
 * The LoginPageLayout recommended usages are in the login flow like registration, sign up and error pages.
 */
const LoginPageLayout: FC<Props> = ({
  children,
  title,
  logo = defaultLogo,
}) => {
  useLayoutEffect(() => {
    const bodyInitiallyContainsIsPaper = document
      .querySelector("body")
      ?.classList.contains("is-paper");
    if (!bodyInitiallyContainsIsPaper) {
      document.querySelector("body")?.classList.add("is-paper");
    }
    return () => {
      if (!bodyInitiallyContainsIsPaper) {
        document.querySelector("body")?.classList.remove("is-paper");
      }
    };
  }, []);

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
