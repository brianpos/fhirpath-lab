# Custom Configuration for FHIRPath Engine Authors

This guide explains how engine authors can create a custom configuration file to test their FHIRPath engine locally with FHIRPath Lab **before** submitting it for inclusion in the default configuration.

## Architecture Overview

FHIRPath Lab uses two layers of engine configuration:

| Layer | Source | Purpose |
|-------|--------|---------|
| **Baseline** | `types/fhirpath_test_engine.ts` — compiled into the app | Defines all built-in engines with their metadata and capabilities |
| **Config JSON** | `static/config.json` — loaded at runtime | Maps `configSetting` keys to endpoint URLs, and can optionally add new engines to the baseline registry |

When the application loads config JSON, it:
1. Reads the flat URL map (e.g. `"dotnet_server_r4b": "https://..."`)
2. If an `"engines"` key is present, adds **new** engine entries to the registry (built-in engines cannot be modified — see [Security](#security) below)
3. If an `"enabledEngines"` key is present, filters to only the listed engines and orders them to match the array

This layered approach means you can provide a minimal config file that only contains what you need to change, without duplicating the entire engine registry.

## Using the `config` URL Parameter

Both the Vue 2 and Vue 3 versions of the FHIRPath tester page support a `config` query parameter that overrides which config JSON file is loaded:

```
https://fhirpath-lab.com/FhirPath?config=https://my-server.example.com/my-config.json
```

This is the primary mechanism for engine authors to test locally. You can:
- Host your config JSON alongside your engine (or on any CORS-enabled server)
- Point the live FHIRPath Lab at your custom config without modifying any source code

> **Note:** The `config` parameter must be set before any engine evaluation occurs. It is read during page initialization (in the `mounted` / `onMounted` lifecycle hook).

## Config JSON Structure

The config JSON is a single object with three types of keys:

### 1. URL Map (flat keys)

The traditional URL map — flat key/value pairs where the key matches a `configSetting` value from an engine definition and the value is the endpoint URL:

```json
{
  "my_engine_r4": "http://localhost:8080/fhir/$fhirpath",
  "my_engine_r5": "http://localhost:8080/fhir/$fhirpath-r5"
}
```

### 2. `engines` — Add New Engines

An optional object where each key is a new engine registry key and the value is a full `IFhirPathEngineDetails` object with all required fields.

> **Security:** Config JSON can only **add** new engines — it cannot override or modify built-in engines. Entries whose key, `name`, or `legacyName` matches a built-in engine (case-insensitive) are silently ignored. See [Security](#security) for details.

**Add a new engine** (all required fields must be present):
```json
{
  "engines": {
    "My Engine (R4)": {
      "name": "MyEngine",
      "legacyName": "My Engine (R4)",
      "fhirVersion": "R4",
      "appInsightsEngineName": "MyEngine",
      "publisher": "My Organization",
      "description": "My custom FHIRPath engine",
      "supportsAST": true,
      "external": true,
      "configSetting": "my_engine_r4"
    }
  },
  "my_engine_r4": "http://localhost:8080/fhir/$fhirpath"
}
```

### 3. `enabledEngines` — Filter Visible Engines

An optional array of engine registry keys. When present, **only** the listed engines will be visible, and the **order of the array controls the order in the engine selector dropdown**. This is useful for a focused testing view:

```json
{
  "enabledEngines": ["fhirpath.js", "My Engine (R4)"]
}
```

## Required Fields for New Engines

When adding a new engine via the `engines` config key, the following fields are **required**:

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Display name in the UI (without FHIR version) |
| `legacyName` | `string` | Internal selector name (typically includes FHIR version) |
| `fhirVersion` | `string` | FHIR version: `"R4"`, `"R5"`, or `"R6"` |
| `appInsightsEngineName` | `string` | Name for Application Insights telemetry |
| `publisher` | `string` | Organization or individual publishing the engine |
| `description` | `string` | Brief description of the engine |
| `supportsAST` | `boolean` | Whether the engine returns an AST in its response |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `configSetting` | `string` | — | Key used to look up the endpoint URL in the flat URL map |
| `external` | `boolean` | `false` | `true` for engines hosted outside the FHIRPath Lab infrastructure |
| `supportsXML` | `boolean` | `false` | Whether the engine accepts XML resources |
| `encodeResourceJsonAsExtension` | `boolean` | `false` | If `true`, the resource JSON is sent as an extension string rather than a FHIR Resource parameter (needed for engines that can't do cross-version parsing) |
| `githubRepo` | `string` | — | URL to the engine's source repository |
| `engineVersion` | `string` | — | Version string (usually populated at runtime from the engine's response) |
| `earlyAdopter` | `boolean` | `false` | If `true`, the engine is only shown when the user has **Show Advanced Settings** enabled (see below) |

## The `earlyAdopter` Flag

When an engine has `"earlyAdopter": true`, it is hidden from the engine selector dropdown **unless** the user has enabled **Show Advanced Settings** in their FHIRPath Lab user settings.

This is intended for:
- **New engines under development** — include them in the registry without cluttering the default view for most users
- **Gradual rollout** — let power users opt in to testing new engines before they are promoted to the default list

You can set this flag in the compiled baseline (`types/fhirpath_test_engine.ts`) or on a new custom engine via config JSON:

```json
{
  "engines": {
    "My Engine (R4)": {
      "name": "MyEngine",
      "legacyName": "My Engine (R4)",
      "fhirVersion": "R4",
      "appInsightsEngineName": "MyEngine",
      "publisher": "My Organization",
      "description": "My custom FHIRPath engine (beta)",
      "supportsAST": true,
      "external": true,
      "configSetting": "my_engine_r4",
      "earlyAdopter": true
    }
  },
  "my_engine_r4": "http://localhost:8080/fhir/$fhirpath"
}
```

## Complete Example: Testing a New Engine Locally

Here is a complete workflow for an engine author:

### 1. Implement the Server API

Your engine must expose an HTTP endpoint that accepts and returns FHIR `Parameters` resources as described in [server-api.md](../server-api.md). Ensure CORS headers allow requests from `http://localhost:3000` (for local dev) and `https://fhirpath-lab.com` / `https://dev.fhirpath-lab.com` (for production testing).

### 2. Create a Config JSON File

Save this as a file accessible via HTTP (e.g. served by your engine, or a local static file server):

```json
{
  "engines": {
    "My Engine (R4)": {
      "name": "MyEngine",
      "legacyName": "My Engine (R4)",
      "fhirVersion": "R4",
      "appInsightsEngineName": "MyEngine",
      "publisher": "My Organization",
      "description": "My custom FHIRPath engine",
      "supportsAST": true,
      "external": true,
      "configSetting": "my_engine_r4"
    },
    "My Engine (R5)": {
      "name": "MyEngine",
      "legacyName": "My Engine (R5)",
      "fhirVersion": "R5",
      "appInsightsEngineName": "MyEngine",
      "publisher": "My Organization",
      "description": "My custom FHIRPath engine for R5",
      "supportsAST": true,
      "external": true,
      "configSetting": "my_engine_r5"
    }
  },
  "enabledEngines": ["fhirpath.js", "My Engine (R4)", "My Engine (R5)"],
  "my_engine_r4": "http://localhost:8080/fhir/$fhirpath-r4",
  "my_engine_r5": "http://localhost:8080/fhir/$fhirpath-r5"
}
```

> **Tip:** Including `"fhirpath.js"` in `enabledEngines` gives you a local reference engine to compare results against, since it runs entirely in the browser and needs no server.

### 3. Test with FHIRPath Lab

Open the FHIRPath tester with your config:

```
https://fhirpath-lab.com/FhirPath?config=http://localhost:8080/my-config.json
```

Or if running FHIRPath Lab locally (`npm run dev`):

```
http://localhost:3000/FhirPath?config=http://localhost:8080/my-config.json
```

Your engine should now appear in the engine selector dropdown.

### 4. Submit for Inclusion

Once your engine is working correctly, submit a pull request to the [fhirpath-lab repository](https://github.com/brianpos/fhirpath-lab) with:

1. **`static/config.json`** — Add endpoint URL(s) with a descriptive key (e.g. `"my_engine_r4"`)
2. **`static/config.local.json`** — Add the same key(s) pointing to your local dev URLs
3. **`types/fhirpath_test_engine.ts`** — Add your engine(s) to the `registeredEngines` object

If your engine is still under active development when submitted, consider setting `"earlyAdopter": true` so it is only visible to users who have enabled advanced settings.

## Local Development with `config.local.json`

When running FHIRPath Lab locally, you can also edit `static/config.local.json` to point existing engines at local URLs. This file has the same structure as `config.json` but is intended for local development only and should not be committed with production URLs.

## Security

Because the `?config=` URL parameter can be shared via links, the engine merge function (`applyConfigEngines`) enforces several safety rules to prevent a malicious config from hijacking built-in engines:

1. **No overriding built-in engine keys** — If a config `engines` entry uses a key that already exists in the baseline registry (e.g. `".NET SDK"`), it is ignored with a console warning.
2. **No display-name spoofing** — If a new engine's `name` or `legacyName` matches (case-insensitive) the `name` or `legacyName` of any built-in engine, it is ignored. This prevents a custom engine from impersonating a trusted engine in the UI.
3. **New engines only** — Config JSON can add engines to the registry but cannot modify properties of existing ones. To change a built-in engine, submit a PR to update `types/fhirpath_test_engine.ts`.

These rules ensure that sharing a `?config=` link can introduce new engines for testing but can never silently redirect evaluation traffic intended for a known engine to an untrusted endpoint.

## Merging Behavior Summary

| Config Key | Behavior |
|------------|----------|
| Flat URL keys (e.g. `"my_engine_r4"`) | Used by `getServerEngineUrl()` to resolve endpoint URLs at evaluation time |
| `engines` → built-in key | **Ignored** (cannot override built-in engines) |
| `engines` → new key | Adds a new engine (requires all required fields and unique `name`/`legacyName`; logs a warning and skips otherwise) |
| `enabledEngines` | Filters to only listed engines, in the order specified by the array (applied after `engines` additions) |
