export interface IFhirPathEngineDetails {
    /** The name of the engine in the UI (without FHIR Version) */
    name: string;

    /** Name that is used as the selector in the UI/parameters (not seen by users) - has FHIR version in it */
    legacyName: string;

    engineVersion?: string; // Optional version of the engine itself

    /** FHIR version supported by the engine at this endpoint (e.g. R4, R5, R6) */
    fhirVersion: string;

    /** The name used to identify the engine in Application Insights - engine name, excluding FHIR or product versions, e.g. HAPI, FirelySDK */
    appInsightsEngineName: string;

    /** Name of the publisher of the Engine, and usually host of external engines (Organization or Individual working on the engine) */
    publisher: string;

    /** configuration settings for the test engine's URL (comes from config.json - this file is used so that Devops can replace server URLs during deployment) */
    configSetting?: string;

    /** Optional GitHub repository URL where the source for the fhirpath engine can be found */
    githubRepo?: string;

    /** Description of the FHIRPath engine */
    description: string;

    /** True if this is an external engine (i.e. not running in the same environment as the FHIRPath Lab application */
    external?: boolean;

    /** The engine can provide an AST for the expression (otherwise will display that it's not supported) */
    supportsAST: boolean;

    /** The engine can process XML content (XML sent in the extension as a string) */
    supportsXML?: boolean;

    /** If true, the engine requires the resource JSON to be passed as an extension
     *  (because it can't handle cross-version parsing)
     * For FHIR versions other than R4 */
    encodeResourceJsonAsExtension?: boolean;

    /** If true, the engine is only visible when showAdvancedSettings is on.
     *  Use for new/in-development engines that shouldn't clutter the default UI. */
    earlyAdopter?: boolean;
}

// All registered FHIRPath engines (read-only baseline; config additions produce a new copy using applyConfigEngines)
export const registeredEngines: { [key: string]: IFhirPathEngineDetails } = {
    "fhirpath.js": {
        name: "fhirpath.js",
        legacyName: "fhirpath.js",
        fhirVersion: "R4",
        appInsightsEngineName: "fhirpath.js",
        publisher: "HL7 FHIR Community",
        githubRepo: "https://github.com/HL7/fhirpath.js",
        description: "A JavaScript FHIRPath engine.",
        external: false,
        supportsAST: true,
        supportsXML: true
    },
    "fhirpath.js (R5)": {
        name: "fhirpath.js",
        legacyName: "fhirpath.js (R5)",
        fhirVersion: "R5",
        appInsightsEngineName: "fhirpath.js",
        publisher: "HL7 FHIR Community",
        githubRepo: "https://github.com/HL7/fhirpath.js",
        description: "A JavaScript FHIRPath engine for FHIR R5.",
        external: false,
        supportsAST: true,
        supportsXML: true
    },
    "fhirpath.js (R6)": {
        name: "fhirpath.js",
        legacyName: "fhirpath.js (R6)",
        fhirVersion: "R6",
        appInsightsEngineName: "fhirpath.js",
        publisher: "HL7 FHIR Community",
        githubRepo: "https://github.com/HL7/fhirpath.js",
        description: "A JavaScript FHIRPath engine for FHIR R6.",
        external: false,
        supportsAST: true,
        supportsXML: true
    },
    ".NET SDK": {
        name: ".NET SDK",
        legacyName: ".NET (firely)",
        fhirVersion: "R4",
        appInsightsEngineName: "FirelySDK",
        publisher: "Firely",
        configSetting: "dotnet_server_r4b",
        githubRepo: "https://github.com/FirelyTeam/firely-net-sdk",
        description: "A FHIRPath engine implemented in .NET by Firely Team.",
        external: false,
        supportsAST: true,
        supportsXML: true
    },
    ".NET R5": {
        name: ".NET SDK",
        legacyName: ".NET (firely-R5)",
        fhirVersion: "R5",
        appInsightsEngineName: "FirelySDK",
        publisher: "Firely",
        configSetting: "dotnet_server_r5",
        githubRepo: "https://github.com/FirelyTeam/firely-net-sdk",
        description: "A FHIRPath engine implemented in .NET by Firely Team for FHIR R5.",
        external: false,
        supportsAST: true,
        supportsXML: true
    },
    ".NET R6": {
        name: ".NET SDK",
        legacyName: ".NET (firely-R6)",
        fhirVersion: "R6",
        appInsightsEngineName: "FirelySDK",
        publisher: "Firely",
        configSetting: "dotnet_server_r6",
        githubRepo: "https://github.com/FirelyTeam/firely-net-sdk",
        description: "A FHIRPath engine implemented in .NET by Firely Team for FHIR R6.",
        external: false,
        supportsAST: true,
        supportsXML: true
    },
    "java (HAPI)": {
        name: "java-hapi",
        legacyName: "java (HAPI)",
        fhirVersion: "R4",
        appInsightsEngineName: "HAPI",
        publisher: "HAPI FHIR",
        configSetting: "java_server_r4b",
        githubRepo: "https://github.com/hapifhir/hapi-fhir",
        description: "A Java FHIRPath engine from HAPI FHIR.",
        external: false,
        supportsAST: true,
        supportsXML: true
    },
    "java (HAPI-R5)": {
        name: "java-hapi",
        legacyName: "java (HAPI-R5)",
        fhirVersion: "R5",
        appInsightsEngineName: "HAPI",
        publisher: "HAPI FHIR",
        configSetting: "java_server_r5",
        githubRepo: "https://github.com/hapifhir/hapi-fhir",
        description: "A Java FHIRPath engine from HAPI FHIR for FHIR R5.",
        external: false,
        supportsAST: true,
        supportsXML: true,
        encodeResourceJsonAsExtension: true,
    },
    "java (HAPI-R6)": {
        name: "java-hapi",
        legacyName: "java (HAPI-R6)",
        fhirVersion: "R6",
        appInsightsEngineName: "HAPI",
        publisher: "HAPI FHIR Team",
        configSetting: "java_server_r6",
        githubRepo: "https://github.com/hapifhir/hapi-fhir",
        description: "A Java FHIRPath engine from HAPI FHIR for FHIR R6.",
        external: false,
        supportsAST: true,
        supportsXML: true,
        encodeResourceJsonAsExtension: true,
    },
    "fhirpath-py (Beda Software)": {
        name: "fhirpath-py",
        legacyName: "fhirpath-py (Beda Software)",
        fhirVersion: "R4",
        appInsightsEngineName: "Python",
        publisher: "Beda Software",
        configSetting: "python_server_r4b",
        githubRepo: "https://github.com/beda-software/fhirpath-py",
        description: "A Python FHIRPath engine by Beda Software.",
        external: true,
        supportsAST: false,
        supportsXML: false
    },
    "fhirpath-py (Beda Software-R5)": {
        name: "fhirpath-py",
        legacyName: "fhirpath-py (Beda Software-R5)",
        fhirVersion: "R5",
        appInsightsEngineName: "Python",
        publisher: "Beda Software",
        configSetting: "python_server_r5",
        githubRepo: "https://github.com/beda-software/fhirpath-py",
        description: "A Python FHIRPath engine by Beda Software for FHIR R5.",
        external: true,
        supportsAST: false,
        supportsXML: false
    },
    "Aidbox (Health Samurai)": {
        name: "Aidbox",
        legacyName: "Aidbox (Health Samurai)",
        fhirVersion: "R4",
        appInsightsEngineName: "Aidbox",
        publisher: "Health Samurai",
        configSetting: "clojure_server_r4",
        description: "A Clojure-based FHIRPath engine from Aidbox by Health Samurai.",
        external: true,
        supportsAST: false,
        supportsXML: false
    },
    "Aidbox (Health Samurai-R5)": {
        name: "Aidbox",
        legacyName: "Aidbox (Health Samurai-R5)",
        fhirVersion: "R5",
        appInsightsEngineName: "Aidbox",
        publisher: "Health Samurai",
        configSetting: "clojure_server_r5",
        description: "A Clojure-based FHIRPath engine from Aidbox by Health Samurai for FHIR R5.",
        external: true,
        supportsAST: false,
        supportsXML: false
    },
    "Helios Software (R4B)": {
        name: "Helios",
        legacyName: "Helios Software (R4B)",
        fhirVersion: "R4",
        appInsightsEngineName: "Helios Software",
        publisher: "Helios Software",
        configSetting: "helios_server_r4b",
        githubRepo: "https://github.com/HeliosSoftware/hfs",
        description: "A Rust-based FHIRPath engine from Helios Software.",
        external: true,
        supportsAST: true,
        supportsXML: false
    },
    "Helios Software (R5)": {
        name: "Helios",
        legacyName: "Helios Software (R5)",
        fhirVersion: "R5",
        appInsightsEngineName: "Helios Software",
        publisher: "Helios Software",
        configSetting: "helios_server_r5",
        githubRepo: "https://github.com/HeliosSoftware/hfs",
        description: "A Rust-based FHIRPath engine from Helios Software.",
        external: true,
        supportsAST: true,
        supportsXML: false
    },
    "OctoFHIR (R4)": {
        name: "OctoFHIR",
        legacyName: "OctoFHIR (R4)",
        fhirVersion: "R4",
        appInsightsEngineName: "OctoFHIR",
        publisher: "Alex Streltsov",
        configSetting: "octofhir_server_r4",
        githubRepo: "https://github.com/octofhir/fhirpath-rs",
        description: "A Rust-based FHIRPath engine from OctoFHIR",
        external: true,
        supportsAST: true,
        supportsXML: false
    },
    "OctoFHIR (R5)": {
        name: "OctoFHIR",
        legacyName: "OctoFHIR (R5)",
        fhirVersion: "R5",
        appInsightsEngineName: "OctoFHIR",
        publisher: "Alex Streltsov",
        configSetting: "octofhir_server_r5",
        githubRepo: "https://github.com/octofhir/fhirpath-rs",
        description: "A Rust-based FHIRPath engine from OctoFHIR",
        external: true,
        supportsAST: true,
        supportsXML: false
    },
    "OctoFHIR (R6)": {
        name: "OctoFHIR",
        legacyName: "OctoFHIR (R6)",
        fhirVersion: "R6",
        appInsightsEngineName: "OctoFHIR",
        publisher: "Alex Streltsov",
        configSetting: "octofhir_server_r6",
        githubRepo: "https://github.com/octofhir/fhirpath-rs",
        description: "A Rust-based FHIRPath engine from OctoFHIR",
        external: true,
        supportsAST: true,
        supportsXML: false
    },

    "AtomicEHR (R4)": {
        name: "AtomicEHR",
        legacyName: "AtomicEHR (R4)",
        fhirVersion: "R4",
        appInsightsEngineName: "AtomicEHR",
        publisher: "Health Samurai ",
        configSetting: "atomic_server_r4",
        githubRepo: "https://github.com/atomic-ehr/fhirpath",
        description: "A TypeScript implementation of FHIRPath from AtomicEHR team",
        external: true,
        supportsAST: true,
        supportsXML: false
    },
    "AtomicEHR (R5)": {
        name: "AtomicEHR ",
        legacyName: "AtomicEHR (R5)",
        fhirVersion: "R5",
        appInsightsEngineName: "AtomicEHR",
        publisher: "Health Samurai",
        configSetting: "atomic_server_r5",
        githubRepo: "https://github.com/atomic-ehr/fhirpath",
        description:  "A TypeScript implementation of FHIRPath from AtomicEHR team",
        external: true,
        supportsAST: true,
        supportsXML: false
    },
    "AtomicEHR (R6)": {
        name: "AtomicEHR ",
        legacyName: "AtomicEHR  (R6)",
        fhirVersion: "R6",
        appInsightsEngineName: "AtomicEHR",
        publisher: "Health Samurai",
        configSetting: "atomic_server_r6",
        githubRepo: "https://github.com/atomic-ehr/fhirpath",
        description:  "A TypeScript implementation of FHIRPath from AtomicEHR team",
        external: true,
        supportsAST: true,
        supportsXML: false
    },

    "toolbox-go (R4)": {
        name: "toolbox-go",
        legacyName: "toolbox-go (R4)",
        fhirVersion: "R4",
        appInsightsEngineName: "toolbox-go",
        publisher: "Damedic",
        configSetting: "toolbox_go_r4",
        githubRepo: "https://github.com/DAMEDIC/fhir-toolbox-go",
        description: "A Go implementation of FHIRPath",
        external: true,
        supportsAST: false,
        supportsXML: false,
        encodeResourceJsonAsExtension: true
    },
    "toolbox-go (R5)": {
        name: "toolbox-go",
        legacyName: "toolbox-go (R5)",
        fhirVersion: "R5",
        appInsightsEngineName: "toolbox-go",
        publisher: "Damedic",
        configSetting: "toolbox_go_r5",
        githubRepo: "https://github.com/DAMEDIC/fhir-toolbox-go",
        description: "A Go implementation of FHIRPath",
        external: true,
        supportsAST: false,
        supportsXML: false,
        encodeResourceJsonAsExtension: true
    },

    "CQL (R4)": {
        name: "CQL-Facade",
        legacyName: "CQL (R4)",
        fhirVersion: "R4",
        appInsightsEngineName: "Local",
        publisher: "Brian/Bryn CQL Facade",
        configSetting: "cql_r4",
        description: "Experimental CQL engine runner, VERY DRAFT",
        external: true,
        supportsAST: true,
        supportsXML: false
    },
    "Ignixa (R4)": {
        name: "Ignixa",
        legacyName: "Ignixa (R4)",
        fhirVersion: "R4",
        appInsightsEngineName: "Ignixa",
        publisher: "Ignixa",
        configSetting: "ignixa_r4",
        githubRepo: "https://github.com/brendankowitz/ignixa-fhir",
        description: "Ignixa FHIRPath engine",
        external: true,
        supportsAST: true,
        supportsXML: false
    },
    "Ignixa (R5)": {
        name: "Ignixa",
        legacyName: "Ignixa (R5)",
        fhirVersion: "R5",
        appInsightsEngineName: "Ignixa",
        publisher: "Ignixa",
        configSetting: "ignixa_r5",
        githubRepo: "https://github.com/brendankowitz/ignixa-fhir",
        description: "Ignixa FHIRPath engine for FHIR R5",
        external: true,
        supportsAST: true,
        supportsXML: false
    },
    "Ignixa (R6)": {
        name: "Ignixa",
        legacyName: "Ignixa (R6)",
        fhirVersion: "R6",
        appInsightsEngineName: "Ignixa",
        publisher: "Ignixa",
        configSetting: "ignixa_r6",
        githubRepo: "https://github.com/brendankowitz/ignixa-fhir",
        description: "Ignixa FHIRPath engine for FHIR R6",
        external: true,
        supportsAST: true,
        supportsXML: false
    },

    "Kotlin FHIRPath R4 (Open Health Stack)": {
      name: "kotlin-fhirpath",
      legacyName: "Kotlin FHIRPath R4 (Open Health Stack)",
      fhirVersion: "R4",
      appInsightsEngineName: "Kotlin",
      publisher: "Open Health Stack Foundation",
      configSetting: "kotlin_server_r4",
      githubRepo: "https://github.com/ohs-foundation/kotlin-fhirpath",
      description: "A Kotlin implementation of FHIRPath by Open Health Stack.",
      external: true,
      supportsAST: false,
      supportsXML: false
    },

    "Kotlin FHIRPath R5 (Open Health Stack)": {
      name: "kotlin-fhirpath",
      legacyName: "Kotlin FHIRPath R5 (Open Health Stack)",
      fhirVersion: "R5",
      appInsightsEngineName: "Kotlin",
      publisher: "Open Health Stack",
      configSetting: "kotlin_server_r5",
      githubRepo: "https://github.com/ohs-foundation/kotlin-fhirpath",
      description: "A Kotlin implementation of FHIRPath for FHIR R5 by Open Health Stack.",
      external: true,
      supportsAST: false,
      supportsXML: false
    },
};

/**
 * Build a merged engine registry from a baseline and config overrides.
 * Returns a new object — the baseline is never mutated.
 *
 * Supported config keys:
 * - `engines`: A map of engine key → full IFhirPathEngineDetails for **new** engines only.
 *     Keys that match a built-in baseline engine are ignored (security: prevents
 *     a shared `?config=` URL from hijacking known engine endpoints).
 *     New keys are added if they provide all required fields.
 * - `enabledEngines`: An array of engine keys. When present, only listed engines are
 *     returned and the result order follows the array order.
 *
 * Ordering:
 * - Without `enabledEngines`: baseline engines first (in registration order),
 *   followed by any new engines added via `config.engines`.
 * - With `enabledEngines`: result order matches the `enabledEngines` array.
 */
export function applyConfigEngines(
    baseline: Record<string, IFhirPathEngineDetails>,
    config: any
): Record<string, IFhirPathEngineDetails> {
    // Build a merged pool: baseline first (insertion order), then new additions from config.
    const pool: Record<string, IFhirPathEngineDetails> = {};
    for (const [key, value] of Object.entries(baseline)) {
        pool[key] = { ...value };
    }

    if (!config) return pool;

    // Add new engines from config (existing baseline engines cannot be overridden
    // to prevent a malicious ?config= URL from hijacking known engine endpoints).
    // Also reject new engines whose display label (name or legacyName) collides
    // with a built-in engine to prevent UI spoofing.
    const engineOverrides = config.engines as Record<string, Partial<IFhirPathEngineDetails>> | undefined;
    if (engineOverrides && typeof engineOverrides === 'object') {
        // Pre-compute the set of display labels used by baseline engines
        const baselineNames = new Set<string>();
        const baselineLegacyNames = new Set<string>();
        for (const e of Object.values(baseline)) {
            baselineNames.add(e.name.toLowerCase());
            baselineLegacyNames.add(e.legacyName.toLowerCase());
        }

        for (const [key, overrideValues] of Object.entries(engineOverrides)) {
            if (key in baseline) {
                // Security: refuse to override a built-in engine
                console.warn(
                    `Config engine "${key}" matches a built-in engine key — ignored.`
                );
                continue;
            }
            // New engine — validate required fields are present
            const required: (keyof IFhirPathEngineDetails)[] = [
                'name', 'legacyName', 'fhirVersion', 'appInsightsEngineName',
                'publisher', 'description', 'supportsAST'
            ];
            const missing = required.filter(f => !(f in overrideValues));
            if (missing.length > 0) {
                console.warn(
                    `Config engine "${key}" is missing required fields: ${missing.join(', ')} — skipping.`
                );
                continue;
            }
            // Security: reject if name or legacyName collides with a built-in engine
            if (overrideValues.name && baselineNames.has(overrideValues.name.toLowerCase())) {
                console.warn(
                    `Config engine "${key}" uses name "${overrideValues.name}" which matches a built-in engine — ignored.`
                );
                continue;
            }
            if (overrideValues.legacyName && baselineLegacyNames.has(overrideValues.legacyName.toLowerCase())) {
                console.warn(
                    `Config engine "${key}" uses legacyName "${overrideValues.legacyName}" which matches a built-in engine — ignored.`
                );
                continue;
            }
            // Appended after all baseline entries
            pool[key] = overrideValues as IFhirPathEngineDetails;
        }
    }

    // If enabledEngines is specified, return a new record in that exact order.
    const enabledEngines = config.enabledEngines as string[] | undefined;
    if (Array.isArray(enabledEngines)) {
        const ordered: Record<string, IFhirPathEngineDetails> = {};
        for (const key of enabledEngines) {
            if (key in pool) {
                ordered[key] = pool[key];
            } else {
                console.warn(`enabledEngines references unknown engine key "${key}" — skipping.`);
            }
        }
        console.log("Ordered engines based on enabledEngines config:", Object.keys(ordered));
        return ordered;
    }

    console.log("Merged engine pool without enabledEngines filtering:", Object.keys(pool));
    return pool;
}
