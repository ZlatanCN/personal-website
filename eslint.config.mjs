// eslint.config.js
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  // 0️⃣ 忽略文件
  {
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/out/**'],
  },

  // 1️⃣ ESLint 推荐基础规则
  js.configs.recommended,

  // 2️⃣ TypeScript + React + Next.js 官方推荐规则
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@next/next': nextPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // 先加载官方推荐规则（会被后续对象覆盖）
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      // ...jsxA11yPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals']?.rules,
      ...prettierConfig.rules,
    },
  },

  // 3️⃣ 自定义规则（放在最后，优先级最高）
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { prettier: prettierPlugin },
    rules: {
      // Prettier 冲突全部交给 prettier 处理
      'prettier/prettier': 'error',

      // 自定义覆盖
      '@typescript-eslint/no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'always', children: 'never' },
      ],
      '@typescript-eslint/ban-ts-comment': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
