module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard'
  ],
  ignorePatterns: [
    'coverage/**',
    'node_modules/**',
    'dist/**'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'jest'
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/ban-types': 0,
    'import/no-unresolved': 0,
    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [1],
    'react/prop-types': 0
  }
}
