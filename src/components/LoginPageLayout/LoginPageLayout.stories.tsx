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
      src: "https://anbox-cloud.io/static/logo.svg",
      title: "Anbox Cloud",
      url: "/",
    },
  },
};
