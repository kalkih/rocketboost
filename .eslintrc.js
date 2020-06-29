module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/prettier'],
  plugins: ['prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'prettier/prettier': ['error'],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
