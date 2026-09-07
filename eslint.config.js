/**
 * ESLint 9 flat config.
 *
 * `npm run lint` had been broken since the ESLint 9 migration: the plugins were
 * installed but no eslint.config.js existed, so the command errored out before
 * linting anything.
 */

import js from "@eslint/js"
import globals from "globals"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"

export default [
    {
        ignores: ["dist/**", "node_modules/**", "docs/**", "prototypes/**", "tmp/**"]
    },
    js.configs.recommended,
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parserOptions: {
                ecmaFeatures: {jsx: true}
            }
        },
        settings: {
            react: {version: "18.3"}
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,

            // This project uses the automatic JSX runtime, so React need not be
            // in scope, and it does not use prop-types.
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",

            "react-refresh/only-export-components": ["warn", {allowConstantExport: true}],
            "no-unused-vars": ["warn", {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                // Allows the `({body, ...meta}) => meta` omit pattern.
                ignoreRestSiblings: true
            }]
        }
    }
]
