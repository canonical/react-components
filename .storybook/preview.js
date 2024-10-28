import { themes } from "@storybook/theming";
import "vanilla-framework/scss/build.scss";
import { THEMES, WithThemeProvider } from "./addons/withTheme";

export const parameters = {
  docs: {
    theme: themes.vanillaish,
  },
};

export const decorators = [WithThemeProvider];

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: THEMES[0].value,
    toolbar: {
      title: "Theme",
      items: THEMES,
      showName: true,
    },
  },
};
