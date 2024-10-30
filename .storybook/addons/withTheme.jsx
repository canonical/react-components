import React, { useEffect, useRef } from "react";

import "./withTheme.css";

const THEMES = [
  {
    value: "is-light",
    title: "Theme: Light",
  },
  {
    value: "is-dark",
    title: "Theme: Dark",
  },
  {
    value: "is-paper",
    title: "Theme: Paper",
  },
];

export const themeType = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: THEMES[0].value,
    toolbar: {
      items: THEMES,
      showName: true,
      dynamicTitle: true,
    },
  },
};

export const WithThemeProvider = (Story, context) => {
  const theme = context.globals.theme;
  const themeRef = useRef(null);

  useEffect(() => {
    if (themeRef.current !== theme) {
      if (themeRef.current) {
        document.body.classList.remove(themeRef.current);
      }

      document.body.classList.add(theme);
      themeRef.current = theme;
    }
  }, [theme]);

  return <Story {...context} />;
};
