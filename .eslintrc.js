module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react-hooks', 'react', 'simple-import-sort'],
  rules: {
    indent: ['error', 2],
    semi: ['error', 'never'],
    'prefer-const': 'error',
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'no-multi-spaces': ['error'],
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off'
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
}
