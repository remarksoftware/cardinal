const path = require('path');
const spawn = require('cross-spawn');
const { hasFile, resolveBin } = require('../../utils');

const args = process.argv.slice(2);
const tscArgs = args.filter(arg => arg !== '--typescript');

const here = p => path.join(__dirname, p);

const hereRelative = p => here(p).replace(process.cwd(), '.');

const shouldUseCardinalConfig =
  !(args.includes('-p') || args.includes('--project')) &&
  !hasFile('tsconfig.json');
const config = shouldUseCardinalConfig
  ? [
      '--project',
      args.includes('--react')
        ? hereRelative('../config/tsconfig.json')
        : hereRelative('../config/tsconfig-react.json'),
    ]
  : [];

const result = spawn.sync(
  resolveBin('typescript', { executable: 'tsc' }),
  [...config].concat(tscArgs),
  {
    stdio: 'inherit',
  }
);

process.exit(result.status);
