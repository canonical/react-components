import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import prettier from "eslint-plugin-prettier";
import cypress from "eslint-plugin-cypress";
import testingLibrary from "eslint-plugin-testing-library";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import react from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends("plugin:cypress/recommended", "plugin:prettier/recommended"),
  ),
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  {
    plugins: {
      "react-hooks": fixupPluginRules(hooksPlugin),
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  {
    plugins: {
      prettier: fixupPluginRules(prettier),
      cypress: fixupPluginRules(cypress),
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2018,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/forbid-component-props": [
        "error",
        {
          forbid: [
            {
              propName: "data-test",
              message: "Use `data-testid` instead of `data-test` attribute",
            },
          ],
        },
      ],
      "react/forbid-dom-props": [
        "error",
        {
          forbid: [
            {
              propName: "data-test",
              message: "Use `data-testid` instead of `data-test` attribute",
            },
          ],
        },
      ],
      "react/display-name": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  ...fixupConfigRules(compat.extends("plugin:prettier/recommended")).map(
    (config) => ({
      ...config,
      files: ["**/*.ts?(x)"],
    }),
  ),
  {
    files: ["**/*.ts?(x)"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2018,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    plugins: {
      "testing-library": fixupPluginRules({
        rules: testingLibrary.rules,
      }),
    },
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    rules: {
      ...testingLibrary.configs["flat/react"].rules,
      "testing-library/no-node-access": "off",
      "testing-library/no-container": "off",
      "testing-library/no-render-in-lifecycle": "off",
    },
  },
];
