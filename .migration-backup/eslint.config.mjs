import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals"
import tseslint from "typescript-eslint"
import nextTs from "eslint-config-next/typescript";

function withoutLegacyReactRules(config) {
  const rules = Object.fromEntries(
    Object.entries(config.rules ?? {}).filter(
      ([ruleName]) => !ruleName.startsWith("react/")
    )
  )

  const plugins = { ...(config.plugins ?? {}) }
  delete plugins.react

  return {
    ...config,
    plugins,
    rules,
  }
}

const eslintConfig = tseslint.config(
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".source/**",
    "**/__index__.tsx",
    "public/*",
    "public/duckdb/*",
    "public/playground/*",
    ".agent/**",
    ".agents/**",
    ".github/**",
    "temp/**",
    "test_loop.js",
  ]),
  // Remove incompatible or duplicate plugin registrations from inherited configs.
  ...nextTs,
  ...nextVitals.map((config) =>
    withoutLegacyReactRules(
      config.name === "next/typescript"
        ? { ...config, plugins: {} }
        : config
    )
  ),
  ...tseslint.configs.recommended,
  {
    rules: {
      "react-refresh/only-export-components": "off",
      "react-hooks/incompatible-library": "off",
      "react-hooks/purity": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
      "react/display-name": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
    },
  },
)

export default eslintConfig
