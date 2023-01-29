/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ['prettier'],
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'prettier'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        bracketSpacing: true,
        printWidth: 80,
        quoteProps: 'as-needed',
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none',
        jsxSingleQuote: true
      }
    ]
  }
}
