import { create } from "@storybook/theming/create";

export default create({
  base: "light",

  // UI
  appBorderRadius: ".125rem",

  // Typography
  fontBase:
    '"Ubuntu", -apple-system, "Segoe UI", "Roboto", "Oxygen", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  fontCode: '"Ubuntu Mono", Consolas, Monaco, Courier, monospace',

  // Form colors
  inputBorderRadius: ".125rem",

  brandTitle: "Vanilla React Library",
  brandUrl: "https://vanillaframework.io",
  brandImage:
    "https://assets.ubuntu.com/v1/746e552e-vanilla_black-orange_hex.svg",
});
