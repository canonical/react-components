import { create } from "@storybook/theming/create";

export default create({
  base: "light",

  colorPrimary: "#fff",
  colorSecondary: "rgba(0,0,0,0.05)",

  // UI
  appBg: "#fff",
  appContentBg: "#fff",
  appBorderColor: "#cdcdcd",
  appBorderRadius: ".125rem",

  // Typography
  fontBase:
    '"Ubuntu", -apple-system, "Segoe UI", "Roboto", "Oxygen", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  fontCode: '"Ubuntu Mono", Consolas, Monaco, Courier, monospace',

  // Text colors
  textColor: "#111",
  textInverseColor: "#111",

  // Toolbar default and active colors
  barTextColor: "#111",
  barSelectedColor: "#666",
  barBg: "#fff",

  // Form colors
  inputBg: "#fff",
  inputBorder: "#cdcdcd",
  inputTextColor: "#111",
  inputBorderRadius: ".125rem",

  brandTitle: "Vanilla React Library",
  brandUrl: "/react-components",
  brandImage:
    "https://assets.ubuntu.com/v1/746e552e-vanilla_black-orange_hex.svg",
});
