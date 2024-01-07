import "vanilla-framework/scss/build.scss";

import { themes } from "@storybook/theming";
import { Title, Description, ArgTypes, Stories } from '@storybook/blocks';

export const parameters = {
  docs: {
    theme: themes.vanillaish,
    page: () => (
      <>
        <Title />
        <Description />
        <ArgTypes sort="alpha" />
        <Stories />
      </>
    ),
  },
};
