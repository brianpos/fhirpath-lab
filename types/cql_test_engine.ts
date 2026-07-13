export interface ICqlEngineDetails {
    /** Stable key used for selection and share links. */
    legacyName: string;
    name: string;
    fhirVersion: string;
    appInsightsEngineName: string;
    publisher: string;
    description: string;
    configSetting?: string;
    endpointUrl?: string;
    githubRepo?: string;
    external?: boolean;
    earlyAdopter?: boolean;
    custom?: boolean;
}

export const registeredCqlEngines: Record<string, ICqlEngineDetails> = {
    "Alphora (R4)": {
        legacyName: "Alphora (R4)",
        name: "Alphora",
        fhirVersion: "R4",
        appInsightsEngineName: "Alphora CQL",
        publisher: "Alphora",
        description: "Public R4 clinical reasoning sandbox hosted by Alphora.",
        configSetting: "cql_alphora_r4",
        external: true,
    },
    "HL7 Quality (R4)": {
        legacyName: "HL7 Quality (R4)",
        name: "HL7 Quality",
        fhirVersion: "R4",
        appInsightsEngineName: "HL7 Quality CQL",
        publisher: "HL7",
        description: "Public R4 clinical reasoning server hosted by HL7.",
        configSetting: "cql_quality_r4",
        external: true,
    },
    "Firely Server (R4)": {
        legacyName: "Firely Server (R4)",
        name: "Firely Server",
        fhirVersion: "R4",
        appInsightsEngineName: "Firely Server CQL",
        publisher: "Firely",
        description: "Public Firely Server dQM endpoint. Its $cql operation supports one inline CQL statement per request.",
        configSetting: "cql_firely_r4",
        external: true,
    },
};

const requiredEngineFields: (keyof ICqlEngineDetails)[] = [
    "legacyName",
    "name",
    "fhirVersion",
    "appInsightsEngineName",
    "publisher",
    "description",
];

export function applyConfigCqlEngines(
    baseline: Record<string, ICqlEngineDetails>,
    config: unknown,
): Record<string, ICqlEngineDetails> {
    const pool = Object.fromEntries(
        Object.entries(baseline).map(([key, engine]) => [key, { ...engine }]),
    );

    if (!config || typeof config !== "object") return pool;

    const cqlConfig = config as {
        cqlEngines?: Record<string, Partial<ICqlEngineDetails>>;
        enabledCqlEngines?: unknown;
    };
    const baselineNames = new Set(
        Object.values(baseline).map((engine) => engine.name.toLowerCase()),
    );
    const baselineLegacyNames = new Set(
        Object.values(baseline).map((engine) => engine.legacyName.toLowerCase()),
    );

    if (cqlConfig.cqlEngines && typeof cqlConfig.cqlEngines === "object") {
        for (const [key, candidate] of Object.entries(cqlConfig.cqlEngines)) {
            if (key in baseline) {
                console.warn(`Config CQL engine "${key}" matches a built-in engine key - ignored.`);
                continue;
            }

            const missing = requiredEngineFields.filter((field) => !candidate[field]);
            if (missing.length > 0 || (!candidate.configSetting && !candidate.endpointUrl)) {
                const details = [
                    ...missing,
                    ...(!candidate.configSetting && !candidate.endpointUrl
                        ? ["configSetting or endpointUrl"]
                        : []),
                ];
                console.warn(`Config CQL engine "${key}" is missing: ${details.join(", ")} - skipped.`);
                continue;
            }

            if (
                baselineNames.has(candidate.name!.toLowerCase())
                || baselineLegacyNames.has(candidate.legacyName!.toLowerCase())
            ) {
                console.warn(`Config CQL engine "${key}" duplicates a built-in display name - ignored.`);
                continue;
            }

            pool[key] = candidate as ICqlEngineDetails;
        }
    }

    if (Array.isArray(cqlConfig.enabledCqlEngines)) {
        const enabled: Record<string, ICqlEngineDetails> = {};
        for (const key of cqlConfig.enabledCqlEngines) {
            if (typeof key !== "string") continue;
            if (pool[key]) {
                enabled[key] = pool[key];
            } else {
                console.warn(`enabledCqlEngines references unknown engine key "${key}" - skipped.`);
            }
        }
        return enabled;
    }

    return pool;
}

export function createCustomCqlEngine(endpointUrl: string, fhirVersion = "R4"): ICqlEngineDetails {
    return {
        legacyName: "Custom URL",
        name: "Custom URL",
        fhirVersion,
        appInsightsEngineName: "Custom CQL",
        publisher: "User supplied",
        description: "A public CQL operation endpoint supplied for this browser session.",
        endpointUrl,
        external: true,
        custom: true,
    };
}
