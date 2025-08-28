export interface IFhirPathEngineDetails {
    name: string;
    legacyName: string;
    engineVersion?: string; // Optional version of the engine itself
    fhirVersion: string;
    publisher: string;
    url?: string; // endpoint of the test engine to call
    githubRepo?: string; // Optional GitHub repository URL
    description: string;
    external?: boolean;
    supportsAST: boolean;
}

// All registered FHIRPath engines
// (exported as editable so that values can be updated in the UI - specifically version)
export let registeredEngines: { [key: string]: IFhirPathEngineDetails } = {
    "fhirpath.js": {
        name: "fhirpath.js",
        legacyName: "fhirpath.js",
        fhirVersion: "R4",
        publisher: "HL7 FHIR Community",
        githubRepo: "https://github.com/HL7/fhirpath.js",
        description: "A JavaScript FHIRPath engine.",
        external: false,
        supportsAST: true
    },
    "fhirpath.js (R5)": {
        name: "fhirpath.js",
        legacyName: "fhirpath.js (R5)",
        fhirVersion: "R5",
        publisher: "HL7 FHIR Community",
        githubRepo: "https://github.com/HL7/fhirpath.js",
        description: "A JavaScript FHIRPath engine for FHIR R5.",
        external: false,
        supportsAST: true
    },
    "fhirpath.js (R6)": {
        name: "fhirpath.js",
        legacyName: "fhirpath.js (R6)",
        fhirVersion: "R6",
        publisher: "HL7 FHIR Community",
        githubRepo: "https://github.com/HL7/fhirpath.js",
        description: "A JavaScript FHIRPath engine for FHIR R5.",
        external: false,
        supportsAST: true
    },
    ".NET SDK": {
        name: ".NET SDK",
        legacyName: ".NET (firely)",
        fhirVersion: "R4",
        publisher: "Firely",
        githubRepo: "https://github.com/FirelyTeam/firely-net-sdk",
        description: "A FHIRPath engine implemented in .NET by Firely Team.",
        external: false,
        supportsAST: true
    },
    ".NET R5": {
        name: ".NET SDK",
        legacyName: ".NET (firely-R5)",
        fhirVersion: "R5",
        publisher: "Firely",
        githubRepo: "https://github.com/FirelyTeam/firely-net-sdk",
        description: "A FHIRPath engine implemented in .NET by Firely Team for FHIR R5.",
        external: false,
        supportsAST: true
    },
    // "fhirpath.js(api)": {
    //     name: "fhirpath.js(api)",
    //     legacyName: "fhirpath.js (R5)",
    //     fhirVersion: "5.0.0",
    //     publisher: "HL7 FHIR Community",
    //     url: "http://localhost:3001/$fhirpath-r5",
    //     githubRepo: "https://github.com/HL7/fhirpath.js",
    //     description: "A JavaScript FHIRPath engine accessed via API.",
    //     external: false
    // },
    // "java (CQL)": {
    //     name: "java (CQL)",
    //     fhirVersion: "4.0.1",
    //     publisher: "CQL Engine Team",
    //     url: "http://localhost:8080/fhir/$fhirpath-cql",
    //     description: "A Java-based CQL FHIRPath engine.",
    //     external: false
    // },
    "java (HAPI)": {
        name: "java-hapi",
        legacyName: "java (HAPI)",
        fhirVersion: "R4",
        publisher: "HAPI FHIR",
        githubRepo: "https://github.com/hapifhir/hapi-fhir",
        description: "A Java FHIRPath engine from HAPI FHIR.",
        external: false,
        supportsAST: true
    },
    "java (HAPI-R5)": {
        name: "java-hapi",
        legacyName: "java (HAPI-R5)",
        fhirVersion: "R5",
        publisher: "HAPI FHIR",
        githubRepo: "https://github.com/hapifhir/hapi-fhir",
        description: "A Java FHIRPath engine from HAPI FHIR for FHIR R5.",
        external: false,
        supportsAST: true
    },
    "java (HAPI-R6)": {
        name: "java-hapi",
        legacyName: "java (HAPI-R6)",
        fhirVersion: "R6",
        publisher: "HAPI FHIR Team",
        githubRepo: "https://github.com/hapifhir/hapi-fhir",
        description: "A Java FHIRPath engine from HAPI FHIR for FHIR R6.",
        external: false,
        supportsAST: true
    },
    // "java (IBM)": {
    //     name: "java-ibm",
    //     legacyName: "java (IBM)",
    //     fhirVersion: "R4",
    //     publisher: "Linux for health (formerly IBM FHIR Server)",
    //     githubRepo: "https://github.com/LinuxForHealth/FHIR",
    //     description: "A Java FHIRPath engine from Linux for health (formerly IBM FHIR Server).",
    //     external: false
    // },
    "fhirpath-py (Beda Software)": {
        name: "fhirpath-py",
        legacyName: "fhirpath-py (Beda Software)",
        fhirVersion: "R4",
        publisher: "Beda Software",
        githubRepo: "https://github.com/beda-software/fhirpath-py",
        description: "A Python FHIRPath engine by Beda Software.",
        external: true,
        supportsAST: false
    },
    "fhirpath-py (Beda Software-R5)": {
        name: "fhirpath-py",
        legacyName: "fhirpath-py (Beda Software-R5)",
        fhirVersion: "R5",
        publisher: "Beda Software",
        githubRepo: "https://github.com/beda-software/fhirpath-py",
        description: "A Python FHIRPath engine by Beda Software for FHIR R5.",
        external: true,
        supportsAST: false
    },
    "Aidbox (Health Samurai)": {
        name: "Aidbox",
        legacyName: "Aidbox (Health Samurai)",
        fhirVersion: "R4",
        publisher: "Health Samurai",
        description: "A Clojure-based FHIRPath engine from Aidbox by Health Samurai.",
        external: true,
        supportsAST: false
    },
    "Aidbox (Health Samurai-R5)": {
        name: "Aidbox",
        legacyName: "Aidbox (Health Samurai-R5)",
        fhirVersion: "R5",
        publisher: "Health Samurai",
        description: "A Clojure-based FHIRPath engine from Aidbox by Health Samurai for FHIR R5.",
        external: true,
        supportsAST: false
    },
    "Helios Software - R4B": {
        name: "Helios Software",
        legacyName: "Helios Software - R4B",
        fhirVersion: "R4",
        publisher: "Helios Software",
        githubRepo: "https://github.com/HeliosSoftware/hfs",
        description: "A Rust-based FHIRPath engine from Helios Software.",
        external: true,
        supportsAST: true
    },
    "Helios Software - R5": {
        name: "Helios Software",
        legacyName: "Helios Software - R5",
        fhirVersion: "R5",
        publisher: "Helios Software",
        description: "A Rust-based FHIRPath engine from Helios Software.",
        external: true,
        supportsAST: true
    },
};
