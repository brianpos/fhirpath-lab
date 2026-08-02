const esbuild = require("esbuild");
const path = require("node:path");

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

const labInstanceDiagramModule = '@fhirpath-lab/lab-instance-diagram';

/**
 * Resolves the extension-facing diagram contract to the canonical renderer
 * used by the FHIRPath Lab application. The implementation is bundled into
 * dist/extension.js, so the published VSIX has no runtime dependency on the
 * repository source tree.
 *
 * @type {import('esbuild').Plugin}
 */
const labInstanceDiagramPlugin = {
	name: 'lab-instance-diagram',
	setup(build) {
		build.onResolve({filter: /^@fhirpath-lab\/lab-instance-diagram$/}, () => ({
			path: path.resolve(__dirname, 'build/fml-instance-diagram-entry.ts'),
		}));
		build.onResolve({filter: /^antlr4$/}, () => ({
			path: require.resolve('antlr4'),
		}));
	},
};

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
	name: 'esbuild-problem-matcher',

	setup(build) {
		build.onStart(() => {
			console.log('[watch] build started');
		});
		build.onEnd((result) => {
			result.errors.forEach(({ text, location }) => {
				console.error(`✘ [ERROR] ${text}`);
				console.error(`    ${location.file}:${location.line}:${location.column}:`);
			});
			console.log('[watch] build finished');
		});
	},
};

async function main() {
	const ctx = await esbuild.context({
		entryPoints: {
			extension: 'src/extension.ts',
			'language-server': '../fml-language-server/src/server.ts',
		},
		bundle: true,
		format: 'cjs',
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		platform: 'node',
		outdir: 'dist',
		nodePaths: [path.resolve(__dirname, 'node_modules')],
		external: ['vscode'],
		logLevel: 'silent',
		plugins: [
			labInstanceDiagramPlugin,
			esbuildProblemMatcherPlugin,
		],
	});
	if (watch) {
		await ctx.watch();
	} else {
		await ctx.rebuild();
		await ctx.dispose();
	}
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});
