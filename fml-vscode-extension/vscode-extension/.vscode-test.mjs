import { defineConfig } from '@vscode/test-cli';
import { fileURLToPath } from 'node:url';

export default defineConfig({
	files: 'out/test/**/*.test.js',
	workspaceFolder: fileURLToPath(new URL('.', import.meta.url)),
	launchArgs: [
		'--new-window',
		`--user-data-dir=${fileURLToPath(new URL('.vscode-test/workspace-user-data', import.meta.url))}`,
	],
});
