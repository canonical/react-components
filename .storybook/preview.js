import { themes } from "@storybook/theming";
import "vanilla-framework/scss/build.scss";
import { themeType, WithThemeProvider } from "./addons/withTheme";

export const parameters = {
  docs: {
    theme: themes.vanillaish,
  },
  backgrounds: {
    disable: true,
  },
};

export const decorators = [WithThemeProvider];

export const globalTypes = themeType;
