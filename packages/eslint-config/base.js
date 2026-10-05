import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

const baseConfig = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { turbo: turboPlugin },
    rules: { "turbo/no-undeclared-env-vars": "warn" },
  },
  eslintConfigPrettier,
  globalIgnores(["**/dist/**", "**/.next/**", "**/out/**", "**/.turbo/**"]),
];

export default baseConfig;
