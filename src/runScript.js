const path = require('path');
const spawn = require('cross-spawn');
const glob = require('glob');

const [executor, ignoredBin, script, ...args] = process.argv;

if (script) {
  spawnScript();
} else {
  const scriptsPath = path.join(__dirname, 'scripts/');
  const scriptsAvailable = glob.sync(path.join(__dirname, 'scripts', '*'));
  const scriptsAvailableMessage = scriptsAvailable
    .map(path.normalize)
    .map(script => script.replace(scriptsPath, '').replace(/\.js$/, ''))
    .filter(Boolean)
    .join('\n  ')
    .trim();
  const fullMessage = `
Usage: ${ignoredBin} [script] [--flags]

Available Scripts:
  ${scriptsAvailableMessage}
  `.trim();
  console.log(`\n${fullMessage}\n`);
}

function spawnScript() {
  const relativeScriptPath = path.join(__dirname, './scripts', script);
  const scriptPath = attemptResolve(relativeScriptPath);

  if (!scriptPath) {
    throw new Error(`Unknown script "${script}".`);
  }

  const result = spawn.sync(executor, [scriptPath, ...args], {
    stdio: 'inherit',
    env: getEnv()
  });

  if (result.signal) {
    handleSignal(result);
  } else {
    process.exit(result.status);
  }
}

function attemptResolve(...resolveArgs) {
  try {
    return require.resolve(...resolveArgs);
  } catch (err) {
    return void 0;
  }
}

function getEnv() {
  return Object.keys(process.env)
    .filter(key => typeof process.env[key] !== 'undefined')
    .reduce(
      (acc, key) => {
        acc[key] = process.env[key];
        return acc;
      },
      {
        [`SCRIPTS_${script.toUpperCase()}`]: true
      }
    );
}

function handleSignal(result) {
  if (result.signal === 'SIGKILL') {
    console.log(
      `The script "${script}" failed because the process exited too early. ` +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.'
    );
  } else if (result.signal === 'SIGTERM') {
    console.log(
      `The script "${script}" failed because the process exited too early. ` +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.'
    );
  }

  process.exit(1);
}
