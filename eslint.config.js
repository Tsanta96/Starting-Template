import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

export default tseslint.config({
  files: ["**/*.{ts,tsx}"],
  ignores: ["dist", "build", "public", "node_modules", "src/assets/**"],
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      parser: tseslint.parser,
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "@typescript-eslint": tseslint.plugin,
    prettier: pluginPrettier,
    react: react,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    ...prettier.rules,
    "prettier/prettier": "error",
  },
});
