export interface FmlEngineConfiguration {
    serverUrl?: string;
}

export interface FmlExecutionEngine {
    kind: "local" | "remote";
    serverUrl?: string;
}

export function resolveFmlExecutionEngine(
    configuration: FmlEngineConfiguration,
    defaultServerUrl?: string,
): FmlExecutionEngine {
    const serverUrl = (configuration.serverUrl ?? defaultServerUrl)?.trim();
    if (!serverUrl) {
        return {kind: "local"};
    }
    try {
        const url = new URL(serverUrl);
        if (url.protocol !== "http:" && url.protocol !== "https:") {
            throw new Error("Unsupported server URL protocol.");
        }
    } catch (error) {
        throw new Error("The remote FML serverUrl must be an absolute HTTP or HTTPS URL.", {cause: error});
    }
    return {kind: "remote", serverUrl};
}
