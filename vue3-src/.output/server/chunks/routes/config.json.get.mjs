import { d as defineEventHandler, c as createError } from '../nitro/nitro.mjs';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'node:url';

const config_json_get = defineEventHandler(async (event) => {
  const sourcePath = resolve(process.cwd(), "..", "static", "config.json");
  try {
    const raw = await readFile(sourcePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Unable to load config.json from ${sourcePath}`,
      data: { error: String(error) }
    });
  }
});

export { config_json_get as default };
//# sourceMappingURL=config.json.get.mjs.map
