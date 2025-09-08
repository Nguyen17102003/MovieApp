import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint"; // ⬅️ import TypeScript plugin
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser, // ⬅️ use TS parser
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json", // ⬅️ link to tsconfig
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin, // ⬅️ add TS plugin
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // ⬅️ TS recommended rules
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    rules: {
      "no-unused-vars": "off", // turn off base rule
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^[A-Z_]" },
      ],
    },
  },
]);
