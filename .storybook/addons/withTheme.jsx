import React, { useEffect } from "react";

export const THEMES = [
  {
    value: "is-light",
    title: "Light",
  },
  {
    value: "is-dark",
    title: "Dark",
  },
  {
    value: "is-paper",
    title: "Paper",
  },
];

export const WithThemeProvider = (Story, context) => {
  const theme = context.globals.theme;

  useEffect(() => {
    Object.values(THEMES).forEach(({ value }) => {
      document.body.classList.remove(value);
    });

    document.body.classList.add(theme);
  }, [theme]);

  return <Story {...context} />;
};
