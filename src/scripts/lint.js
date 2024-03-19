const spawn = require('cross-spawn');
const { resolveBin } = require('../utils');

const args = process.argv.slice(2);

const relativeArgs = args.map(arg => arg.replace(`${process.cwd()}/`, ''));

const result = spawn.sync(resolveBin('eslint'), relativeArgs, {
  stdio: 'inherit',
});

process.exit(result.status);
