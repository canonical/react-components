import React from "react";
import type { FC } from "react";
import { useState } from "react";

const LOCAL_STORAGE_KEY = "theme";
const THEME_SYSTEM = "system";
const THEME_DARK = "dark";
const THEME_LIGHT = "light";

export const loadTheme = (): string => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved || THEME_SYSTEM;
};

const saveTheme = (theme: string): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, theme);
};

export const isDarkTheme = (theme: string) => {
  if (theme === THEME_SYSTEM) {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }
  return theme === THEME_DARK;
};

export const applyTheme = (theme: string): void => {
  if (isDarkTheme(theme)) {
    document.body.classList.add("is-dark");
  } else {
    document.body.classList.remove("is-dark");
  }
};

/**
 * This is a [React](https://reactjs.org/) component for the [Vanilla framework](https://docs.vanillaframework.io).
 *
 * The ThemeSwitcher component allows users to switch between different themes: dark, light, and system. It saves the selected theme in local storage and applies it to the document body. You can use it in user settings.
 *
 * In your root component, call the exported functions `loadTheme` and `applyTheme`, such as in the example below:
 * ```
 * useEffect(() => {
 *   const theme = loadTheme();
 *   applyTheme(theme);
 * }, []);
 * ```
 */
const ThemeSwitcher: FC = () => {
  const [activeTheme, setActiveTheme] = useState(loadTheme());

  const themeButton = (theme: string) => {
    return (
      <button
        className="p-segmented-control__button"
        type="button"
        aria-selected={activeTheme === theme ? "true" : "false"}
        onClick={() => {
          saveTheme(theme);
          setActiveTheme(theme);
          applyTheme(theme);
        }}
      >
        {theme}
      </button>
    );
  };

  return (
    <div className="p-segmented-control">
      <div className="p-segmented-control__list" aria-label="Theme switcher">
        {themeButton(THEME_DARK)}
        {themeButton(THEME_LIGHT)}
        {themeButton(THEME_SYSTEM)}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
