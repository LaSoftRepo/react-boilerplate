/* eslint-disable import/no-extraneous-dependencies */

const chalk        = require('chalk');
const semver       = require('semver');
const shell        = require('shelljs');
const childProcess = require('child_process');

/* eslint-enable  */

const packageConfig = require('../package.json');

function exec(command) {
  return childProcess.execSync(command).toString().trim();
}

const requirements = [{
  name: 'node',
  currentVersion: semver.clean(process.version),
  versionRequirement: packageConfig.engines.node,
}]

if (shell.which('yarn')) {
  requirements.push({
    name: 'yarn',
    currentVersion: exec('yarn --version'),
    versionRequirement: packageConfig.engines.yarn
  })
}

module.exports = () => {
  const warnings = [];
  for (let i = 0, len = requirements.length; i < len; ++i) {
    const req = requirements[i]
    if (!semver.satisfies(req.currentVersion, req.versionRequirement)) {
      warnings.push(
        `${ req.name }: ${ chalk.red(req.currentVersion) } should be ${ chalk.green(req.versionRequirement) }`
      )
    }
  }

  if (warnings.length) {
    // eslint-disable-next-line no-console
    console.info(chalk.yellow('\nReact Boilerplate required following modules:\n'))

    for (let i = 0, len = warnings.length; i < len; ++i)
      console.warn(`  ${ warnings[i] }`); // eslint-disable-line no-console

    console.warn(); // eslint-disable-line no-console

    process.exit(1);
  }
}
