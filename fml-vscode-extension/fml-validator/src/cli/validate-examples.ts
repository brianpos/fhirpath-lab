import {promises as fs} from "node:fs";
import path from "node:path";
import {FmlValidatorApi} from "../FmlValidatorApi";

async function findFmlFiles(root: string): Promise<string[]> {
    const entries = await fs.readdir(root, {withFileTypes: true});
    const files = await Promise.all(entries.map(async entry => {
        const fullPath = path.join(root, entry.name);
        if (entry.isDirectory()) {
            return findFmlFiles(fullPath);
        }
        return entry.isFile() && entry.name.endsWith(".fml") ? [fullPath] : [];
    }));
    return files.flat();
}

async function main(): Promise<void> {
    const directory = process.argv[2];
    if (!directory) {
        throw new Error("Usage: npm run validate-examples -- <directory>");
    }

    const validator = new FmlValidatorApi();
    const files = await findFmlFiles(path.resolve(directory));
    let failures = 0;
    let warnings = 0;

    for (const file of files) {
        const result = await validator.validate({
            sourceName: file,
            sourceText: await fs.readFile(file, "utf8"),
        });

        for (const diagnostic of result.diagnostics) {
            const message = `${file}:${diagnostic.line}:${diagnostic.column + 1}: ${diagnostic.severity}: ${diagnostic.message}`;
            if (diagnostic.severity === "warning") {
                warnings++;
                console.warn(message);
            } else {
                console.error(message);
            }
        }

        if (result.status !== "success") {
            failures++;
        }
    }

    console.log(
        `${files.length - failures}/${files.length} FML files validated successfully with ${warnings} warning(s).`,
    );
    if (failures > 0) {
        process.exitCode = 1;
    }
}

void main();
