import {
    FmlServerState,
    FmlServerStatus,
    WorkspaceIndexFailure,
    WorkspaceIndexResult,
} from "@fhirpath-lab/language-service";
import {WorkspaceIndexStats} from "./WorkspaceFmlIndex";

export class FmlServerStatusStore {
    private state: FmlServerState = "starting";
    private readonly failures = new Map<string, WorkspaceIndexFailure>();
    private startedAt = new Date().toISOString();
    private lastIndexedAt?: string;
    private lastError?: string;
    private durationMs = 0;

    public startIndexing(): void {
        this.state = "indexing";
        this.lastError = undefined;
        this.durationMs = 0;
    }

    public completeIndex(result: WorkspaceIndexResult): void {
        this.state = "ready";
        this.durationMs = result.durationMs;
        this.lastIndexedAt = new Date().toISOString();
        this.lastError = undefined;
    }

    public recordFailure(uri: string, message: string): void {
        this.failures.set(uri, {
            uri,
            message,
            occurredAt: new Date().toISOString(),
        });
    }

    public clearFailure(uri: string): void {
        this.failures.delete(uri);
    }

    public clearFailures(): void {
        this.failures.clear();
    }

    public fail(message: string): void {
        this.state = "error";
        this.lastError = message;
    }

    public getFailures(): WorkspaceIndexFailure[] {
        return [...this.failures.values()].sort((left, right) => {
            return left.uri.localeCompare(right.uri);
        });
    }

    public getStatus(stats: WorkspaceIndexStats, openDocumentCount: number): FmlServerStatus {
        return {
            state: this.state,
            ...stats,
            failedFileCount: this.failures.size,
            durationMs: this.durationMs,
            openDocumentCount,
            startedAt: this.startedAt,
            lastIndexedAt: this.lastIndexedAt,
            lastError: this.lastError,
        };
    }
}
