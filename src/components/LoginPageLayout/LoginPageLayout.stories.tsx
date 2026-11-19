import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import CodeSnippet from "../CodeSnippet/CodeSnippet";
import Spinner from "../Spinner/Spinner";
import LoginPageLayout from "./LoginPageLayout";

const meta: Meta<typeof LoginPageLayout> = {
  component: LoginPageLayout,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LoginPageLayout>;

export const Default: Story = {
  args: {
    title: "This is the title",
  },
};

export const LoginPage: Story = {
  args: {
    title: "Sign in",
    children: <Spinner />,
  },
};

export const ErrorPage: Story = {
  args: {
    title: "Sign in failed",
    children: (
      <CodeSnippet
        blocks={[
          {
            wrapLines: true,
            code: <>An error occurred. Try signing in again.</>,
          },
        ]}
      />
    ),
  },
};

export const RegistrationPage: Story = {
  args: {
    title: "Sign up",
    children: (
      <>
        <p>Fill in the form below to create an account</p>
        <form>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign up</button>
        </form>
      </>
    ),
    logo: {
      src: "https://assets.ubuntu.com/v1/04242fd4-anbox-cloud-logo.svg",
      title: "Anbox Cloud",
      url: "/",
    },
  },
};

/**
 * The standard tagged logo can be replaced by passing an element to the `logo`
 * prop, in the same way as when overriding the logo in
 * [Navigation](?path=/docs/components-navigation--docs).
 */
export const OverridingTheLogo: Story = {
  name: "Overriding the logo",
  args: {
    title: "Sign in",
    children: <Spinner />,
    logo: (
      <a className="p-navigation__item" href="/">
        <img
          alt="Canonical"
          className="p-navigation__image"
          src="https://assets.ubuntu.com/v1/9c74eb2d-logo-canonical-white.svg"
          width="95"
        />
      </a>
    ),
  },
};
