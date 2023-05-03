const fs = require('fs');
const path = require('path');
const readPkgUp = require('read-pkg-up');
const which = require('which');

const { pkg, path: pkgPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});
const appDirectory = path.dirname(pkgPath);

function resolveCardinal() {
  if (pkg.name === '@remark/cardinal') {
    return require.resolve('./').replace(process.cwd(), '.');
  }

  return resolveBin('@remark/cardinal');
}

function resolveBin(
  moduleName,
  { executable = moduleName, cwd = process.cwd() } = {}
) {
  let pathFromWhich;
  try {
    pathFromWhich = fs.realpathSync(which.sync(executable));
  } catch (err) {
    // Ignore error.
  }

  try {
    const modulePackageJsonPath = require.resolve(`${moduleName}/package.json`);
    const moduleDirectory = path.dirname(modulePackageJsonPath);

    const { bin } = require(modulePackageJsonPath);
    const binPath = typeof bin === 'string' ? bin : bin[executable];
    const fullPathToBin = path.join(moduleDirectory, binPath);
    if (fullPathToBin === pathFromWhich) {
      return executable;
    }

    return fullPathToBin.replace(cwd, '.');
  } catch (err) {
    if (pathFromWhich) {
      return executable;
    }

    throw err;
  }
}

const fromRoot = (...p) => path.join(appDirectory, ...p);

const hasFile = (...p) => fs.existsSync(fromRoot(...p));

module.exports = {
  appDirectory,
  fromRoot,
  hasFile,
  resolveBin,
  resolveCardinal,
};
