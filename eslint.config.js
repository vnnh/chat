import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import noReturnInLoop from "@kapouer/eslint-plugin-no-return-in-loop";
import prettier from "eslint-plugin-prettier";

export default tseslint.config(
	{ ignores: ["dist"] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				project: ["./tsconfig.node.json", "./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			prettier,
			"@kapouer/no-return-in-loop": noReturnInLoop,
			react,
		},
		rules: {
			...react.configs.recommended.rules,
			...react.configs["jsx-runtime"].rules,
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"prettier/prettier": [
				"warn",
				{
					semi: true,
					trailingComma: "all",
					singleQuote: false,
					printWidth: 120,
					tabWidth: 4,
					useTabs: true,
				},
			],
			"prefer-const": 0,
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-unnecessary-condition": "warn",
			"@typescript-eslint/no-array-constructor": 0,
			"@kapouer/no-return-in-loop/no-return-in-loop": "error",
			"@typescript-eslint/no-non-null-assertion": 0,
			"@typescript-eslint/no-empty-object-type": 0,
			"no-unreachable-loop": "error",
		},
	},
);
