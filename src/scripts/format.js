const path = require('path');
const spawn = require('cross-spawn');
const yargsParser = require('yargs-parser');
const { hasFile, resolveBin } = require('../utils');

const args = process.argv.slice(2);
const parsedArgs = yargsParser(args);

const here = p => path.join(__dirname, p);

const hereRelative = p => here(p).replace(process.cwd(), '.');

const shouldUseCardinalConfig =
  !args.includes('--config') && !hasFile('.prettierc');
const config = shouldUseCardinalConfig
  ? ['--config', hereRelative('../config/prettierrc.js')]
  : [];

const shouldUseCardinalIgnore =
  !args.includes('--ignore-path') && !hasFile('.prettierignore');
const ignore = shouldUseCardinalIgnore ? ['--ignore-path', '.gitignore'] : [];

const write = args.includes('--no-write') ? [] : ['--write'];

const filesToApply = parsedArgs._.length ? [] : ['**/*.+(js|json|md|ts|tsx)'];

const relativeArgs = args.map(arg => arg.replace(`${process.cwd()}/`, ''));

const result = spawn.sync(
  resolveBin('prettier'),
  [...config, ...write, ...ignore, ...filesToApply].concat(relativeArgs),
  { stdio: 'inherit' }
);

process.exit(result.status);
