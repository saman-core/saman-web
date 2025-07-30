import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      'projects/**/*',
      '!/*.js',
      '.vscode',
      '.idea',
      '.angular',
    ],
  },
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:@angular-eslint/recommended'),
  {
    files: ['*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        createDefaultProgram: true,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  // Linting de templates HTML desactivado temporalmente por sintaxis Angular moderna no soportada
];
