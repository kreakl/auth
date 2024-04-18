module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    "@feature-sliced/eslint-config/rules/layers-slices",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  parserOptions: {
    project: 'tsconfig.json'
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "linebreak-style": ["error", "windows"],
    'import/no-internal-modules': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    "react/require-default-props": "off",
    'react/jsx-props-no-spreading': 'off',
    "react/react-in-jsx-scope": "off",
    'no-nested-ternary': "off",
    'import/extensions': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
