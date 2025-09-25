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
}

// All registered FHIRPath engines
// (exported as editable so that values can be updated in the UI - specifically version)
export let registeredEngines: { [key: string]: IFhirPathEngineDetails } = {
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
        supportsXML: false
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
        supportsXML: false
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
        supportsXML: false
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
    // "java (IBM)": {
    //     name: "java-ibm",
    //     legacyName: "java (IBM)",
    //     fhirVersion: "R4",
    //     appInsightsEngineName: "IBM",
    //     publisher: "Linux for health (formerly IBM FHIR Server)",
    //     configSetting: "ibm_server_r4b",
    //     githubRepo: "https://github.com/LinuxForHealth/FHIR",
    //     description: "A Java FHIRPath engine from Linux for health (formerly IBM FHIR Server).",
    //     external: false
    // },
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
        supportsAST: false
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
        supportsAST: false
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
        supportsAST: false
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
        supportsAST: false
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
        supportsAST: true
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
        supportsAST: true
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
        supportsAST: true
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
        supportsAST: true
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
        supportsAST: true
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
        supportsAST: true
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
        supportsAST: true
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
        supportsAST: true
    },

    "Local (R4)": {
        name: "Localhost",
        legacyName: "Local (R4)",
        fhirVersion: "R4",
        appInsightsEngineName: "Local",
        publisher: "http://localhost:3001/fhir/$fhirpath",
        configSetting: "local_r4",
        description: "Your own locally hosted fhirpath engine.",
        external: true,
        supportsAST: true
    },
    "Local (R5)": {
        name: "Localhost",
        legacyName: "Local (R5)",
        fhirVersion: "R5",
        appInsightsEngineName: "Local",
        publisher: "http://localhost:3001/fhir/$fhirpath-r5",
        configSetting: "local_r5",
        description: "Your own locally hosted fhirpath engine.",
        external: true,
        supportsAST: true
    },
    "Local (R6)": {
        name: "Localhost",
        legacyName: "Local (R6)",
        fhirVersion: "R6",
        appInsightsEngineName: "Local",
        publisher: "http://localhost:3001/fhir/$fhirpath-r6",
        configSetting: "local_r6",
        description: "Your own locally hosted fhirpath engine.",
        external: true,
        supportsAST: true
    },
};
