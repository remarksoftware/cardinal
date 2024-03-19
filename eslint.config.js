const js = require('@eslint/js');
const globals = require('globals');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  { languageOptions: { globals: { ...globals.node } } },
  js.configs.recommended,
  eslintConfigPrettier,
];
