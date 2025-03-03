import { themes } from "@storybook/theming";
import "vanilla-framework/scss/build.scss";
import { themeType, WithThemeProvider } from "./addons/withTheme";
import { gridType, WithGridProvider } from "./addons/withGrid";

export const parameters = {
  docs: {
    theme: themes.vanillaish,
  },
  backgrounds: {
    grid: {
      disable: true,
    },
    disable: true,
  },
};

export const decorators = [WithThemeProvider, WithGridProvider];

export const globalTypes = { ...themeType, ...gridType };
