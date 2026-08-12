// Extension: npm-upgrade-helper
// Gathers context for npm package upgrades: finds all package.json references,
// source file imports, and fetches changelog/release notes for breaking changes.

import { joinSession } from "@github/copilot-sdk/extension";
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Derive repo root from extension location (.github/extensions/npm-upgrade-helper/extension.mjs)
const __filename = fileURLToPath(import.meta.url);
const REPO_ROOT = dirname(dirname(dirname(dirname(__filename))));

function findFiles(cwd, pattern) {
    try {
        const cmd = process.platform === "win32"
            ? `git ls-files --cached --others --exclude-standard`
            : `git ls-files --cached --others --exclude-standard`;
        const files = execSync(cmd, { cwd, encoding: "utf-8" })
            .split("\n")
            .filter(Boolean);
        const re = new RegExp(pattern, "i");
        return files.filter((f) => re.test(f));
    } catch {
        return [];
    }
}

function grepFiles(cwd, fileList, regex) {
    const re = new RegExp(regex);
    const results = [];
    for (const f of fileList) {
        try {
            const abs = join(cwd, f);
            const lines = readFileSync(abs, "utf-8").split("\n");
            for (let i = 0; i < lines.length; i++) {
                if (re.test(lines[i])) {
                    results.push({ file: f, line: i + 1, text: lines[i].trim() });
                }
            }
        } catch { /* skip unreadable */ }
    }
    return results;
}

const session = await joinSession({
    tools: [
        {
            name: "npm_upgrade_context",
            description:
                "Gather upgrade context for an npm package. Returns: all package.json entries for the package, all source files that import from it, the current installed version, and the npm registry info for the target version (including changelog URL). Use this BEFORE making changes when upgrading an npm dependency.",
            parameters: {
                type: "object",
                properties: {
                    package_name: {
                        type: "string",
                        description: "The npm package name to upgrade (e.g. 'fhirpath')",
                    },
                    target_version: {
                        type: "string",
                        description: "The target version to upgrade to (e.g. '5.0.0')",
                    },
                },
                required: ["package_name", "target_version"],
            },
            skipPermission: true,
            handler: async (args, invocation) => {
                const { package_name, target_version } = args;
                const cwd = REPO_ROOT;
                const sections = [];

                // 1. Find all package.json files referencing the package
                const packageJsonFiles = findFiles(cwd, "package\\.json$")
                    .filter((f) => !f.includes("node_modules"));
                const pkgRefs = [];
                for (const f of packageJsonFiles) {
                    try {
                        const abs = join(cwd, f);
                        const pkg = JSON.parse(readFileSync(abs, "utf-8"));
                        for (const depType of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
                            if (pkg[depType]?.[package_name]) {
                                pkgRefs.push({
                                    file: f,
                                    section: depType,
                                    currentSpec: pkg[depType][package_name],
                                });
                            }
                        }
                    } catch { /* skip */ }
                }
                sections.push(`## package.json references (${pkgRefs.length} found)\n` +
                    (pkgRefs.length
                        ? pkgRefs.map((r) => `- \`${r.file}\` [${r.section}]: "${r.currentSpec}"`).join("\n")
                        : "None found"));

                // 2. Find source files importing the package
                const srcFiles = findFiles(cwd, "\\.(ts|js|vue|tsx|jsx|mjs|cjs)$")
                    .filter((f) => !f.includes("node_modules"));
                const importPattern = `(?:from\\s+['"]${package_name}|require\\(['"]${package_name})`;
                const imports = grepFiles(cwd, srcFiles, importPattern);
                sections.push(`## Source file imports (${imports.length} found)\n` +
                    (imports.length
                        ? imports.map((r) => `- \`${r.file}:${r.line}\`: ${r.text}`).join("\n")
                        : "None found"));

                // 3. Check currently installed version
                let installedVersion = "unknown";
                try {
                    const pkgPath = join(cwd, "node_modules", package_name, "package.json");
                    if (existsSync(pkgPath)) {
                        installedVersion = JSON.parse(readFileSync(pkgPath, "utf-8")).version;
                    }
                } catch { /* ignore */ }
                sections.push(`## Installed version\n${installedVersion}`);

                // 4. Fetch npm registry info for target version
                let registryInfo = "";
                try {
                    const resp = execSync(
                        `npm view ${package_name}@${target_version} --json 2>&1`,
                        { cwd, encoding: "utf-8", timeout: 15000 }
                    );
                    const data = JSON.parse(resp);
                    registryInfo = [
                        `Version: ${data.version}`,
                        `Description: ${data.description || "N/A"}`,
                        `Homepage: ${data.homepage || "N/A"}`,
                        `Repository: ${typeof data.repository === "object" ? data.repository.url : data.repository || "N/A"}`,
                    ].join("\n");
                } catch (e) {
                    registryInfo = `Could not fetch registry info: ${e.message}`;
                }
                sections.push(`## Target version registry info\n${registryInfo}`);

                // 5. Try to find changelog
                let changelogHint = "";
                try {
                    const resp = execSync(
                        `npm view ${package_name}@${target_version} repository.url --json 2>&1`,
                        { cwd, encoding: "utf-8", timeout: 10000 }
                    );
                    const repoUrl = JSON.parse(resp);
                    if (repoUrl && repoUrl.includes("github.com")) {
                        const match = repoUrl.match(/github\.com[:/]([^/]+\/[^/.]+)/);
                        if (match) {
                            changelogHint = `Check changelog at: https://github.com/${match[1]}/blob/master/CHANGELOG.md\n` +
                                `Releases: https://github.com/${match[1]}/releases`;
                        }
                    }
                } catch { /* ignore */ }
                sections.push(`## Changelog\n${changelogHint || "Could not determine changelog URL. Check the package homepage."}`);

                // 6. Upgrade instructions
                sections.push(`## Recommended upgrade steps\n` +
                    `1. Read the changelog/release notes for breaking changes between ${installedVersion} and ${target_version}\n` +
                    `2. Update the version in each package.json listed above\n` +
                    `3. Run \`npm install\` in each directory with a package.json reference\n` +
                    `4. Check each import site for API changes (type exports, function signatures, module paths)\n` +
                    `5. Run the project's test suite to verify compatibility\n` +
                    `6. Fix any breaking changes found`);

                return sections.join("\n\n");
            },
        },
    ],
});
