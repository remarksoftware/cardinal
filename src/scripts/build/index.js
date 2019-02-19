if (process.argv.includes('--typescript')) {
  require('./typescript');
} else {
  console.log('Unknown build target!');

  process.exit(1);
}
