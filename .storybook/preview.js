import { themes } from "@storybook/theming";
import "vanilla-framework/scss/build.scss";

// or global addParameters
export const parameters = {
  docs: {
    theme: themes.vanillaish,
  },
};
