const { hasFile } = require('../utils');

const args = process.argv.slice(2);

const shouldUseCardinalConfig =
  !args.includes('--config') && !hasFile('jest.config.js');
const config = shouldUseCardinalConfig
  ? ['--config', JSON.stringify(require('../config/jest.config'))]
  : [];

require('jest').run([...config, ...args]);
