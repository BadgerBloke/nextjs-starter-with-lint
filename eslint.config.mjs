import tseslint from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nPlugin from 'eslint-plugin-n';
import prettierPlugin from 'eslint-plugin-prettier';
import promisePlugin from 'eslint-plugin-promise';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default [
    {
        ignores: [
            '.next/**',
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '.git/**',
            '.husky/**',
            '**/*.d.ts',
            'README.md',
        ],
    },
    {
        files: ['src/**/*.{js,jsx,ts,tsx}'],
        plugins: {
            '@next/next': nextPlugin,
            '@typescript-eslint': tseslint,
            react: reactPlugin,
            'jsx-a11y': jsxA11yPlugin,
            'react-hooks': reactHooksPlugin,
            'simple-import-sort': simpleImportSortPlugin,
            prettier: prettierPlugin,
            import: importPlugin,
            'unused-imports': unusedImportsPlugin,
            n: nPlugin,
            promise: promisePlugin,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: true,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                JSX: true,
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
            noInlineConfig: false,
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {},
                node: true,
            },
            next: {
                rootDir: '.',
            },
        },
        rules: {
            '@typescript-eslint/no-unsafe-declaration-merging': 'off',
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'jsx-a11y/anchor-is-valid': 'off',
            'jsx-a11y/heading-has-content': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/ban-ts-comment': 'warn',
            'new-cap': ['error', { capIsNewExceptions: ['Inter'] }],
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['server-only'],
                        ['^.+\\.s?css$'],
                        ['^react$', '^next', '^[a-z]'],
                        ['^@'],
                        ['^~'],
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        ['^\\u0000'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
            'no-console': 'warn',
        },
    },
    {
        files: ['*.{js,mjs}'],
        plugins: {
            '@typescript-eslint': tseslint,
            import: importPlugin,
            'unused-imports': unusedImportsPlugin,
            n: nPlugin,
            promise: promisePlugin,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
        },
    },
];
