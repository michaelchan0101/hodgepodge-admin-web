const fabric = require('@umijs/fabric')

module.exports = {
  ...fabric.prettier,
  semi: false,
  singleQuote: true,
  printWidth: 90,
  arrowParens: 'avoid',
}
