import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineEventHandler(async (event) => {
  // Source of truth stays in the legacy Nuxt 2 folder
  const sourcePath = resolve(process.cwd(), '..', 'static', 'config.json')

  try {
    const raw = await readFile(sourcePath, 'utf8')
    // Validate JSON and return as JSON response
    return JSON.parse(raw)
  } catch (error) {
    // Make the failure obvious in dev, but return a 500 rather than crashing the whole app
    throw createError({
      statusCode: 500,
      statusMessage: `Unable to load config.json from ${sourcePath}`,
      data: { error: String(error) }
    })
  }
})
