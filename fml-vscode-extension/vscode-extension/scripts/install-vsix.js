const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

const channelArg = (process.argv[2] || 'stable').toLowerCase();
const cli = channelArg === 'insiders' ? 'code-insiders' : 'code';

const workspacePath = process.cwd();
const packageJsonPath = path.join(workspacePath, 'package.json');

if (!fs.existsSync(packageJsonPath)) {
  console.error('package.json not found in the current directory.');
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const vsixName = `${packageJson.name}-${packageJson.version}.vsix`;
const vsixPath = path.join(workspacePath, vsixName);

if (!fs.existsSync(vsixPath)) {
  console.error(`VSIX not found at ${vsixPath}`);
  console.error('Build it first with: npm run vsix:build');
  process.exit(1);
}

const installArgs = ['--install-extension', vsixPath, '--force'];
const result = spawnSync(cli, installArgs, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.error) {
  console.error(`Failed to run ${cli}. Is the CLI available in PATH?`);
  console.error(`Original error: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
