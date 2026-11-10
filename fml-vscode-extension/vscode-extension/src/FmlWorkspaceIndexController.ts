import type {WorkspaceIndexResult} from "@fhirpath-lab/language-service";

export class FmlWorkspaceIndexController {
    private indexOperation?: Promise<WorkspaceIndexResult>;
    private restartOperation?: Promise<WorkspaceIndexResult>;
    private readyOperation?: Promise<WorkspaceIndexResult>;
    private reindexRequested = false;
    private revision = 0;
    private indexRevision = 0;
    private ready = false;

    public constructor(
        private readonly indexWorkspace: () => Promise<WorkspaceIndexResult>,
        private readonly restartServer: () => Promise<void>,
    ) {}

    public get isReady(): boolean {
        return this.ready;
    }

    public reindex(modelsChanged = false): Promise<WorkspaceIndexResult> {
        const pending = this.restartOperation
            ?? (this.indexRevision === this.revision ? this.indexOperation : undefined);
        if (pending) {
            this.reindexRequested ||= modelsChanged;
            return pending;
        }
        const revision = ++this.revision;
        this.indexRevision = revision;
        this.indexOperation = this.track(this.runIndex(revision).finally(() => {
            if (this.indexRevision === revision) {
                this.indexOperation = undefined;
            }
        }), revision);
        return this.indexOperation;
    }

    public restart(): Promise<WorkspaceIndexResult> {
        if (this.restartOperation) {
            return this.restartOperation;
        }
        const revision = ++this.revision;
        // Restarting can reject an in-flight index; the fresh pass determines recovery.
        const interrupted = this.indexOperation?.then(() => undefined, () => undefined);
        this.restartOperation = this.track((async () => {
            await this.restartServer();
            await interrupted;
            return this.runIndex(revision);
        })().finally(() => {
            this.restartOperation = undefined;
        }), revision);
        return this.restartOperation;
    }

    public async waitUntilReady(): Promise<void> {
        if (!this.readyOperation) {
            throw new Error("The FML workspace index has not been initialized.");
        }
        while (true) {
            const operation: Promise<WorkspaceIndexResult> = this.readyOperation;
            try {
                await operation;
            } catch (error) {
                if (operation === this.readyOperation) {
                    throw error;
                }
            }
            if (operation === this.readyOperation) {
                return;
            }
        }
    }

    private async runIndex(revision: number): Promise<WorkspaceIndexResult> {
        while (true) {
            this.reindexRequested = false;
            const result = await this.indexWorkspace();
            if (revision !== this.revision || !this.reindexRequested) {
                return result;
            }
        }
    }

    private track(operation: Promise<WorkspaceIndexResult>, revision: number): Promise<WorkspaceIndexResult> {
        this.ready = false;
        this.readyOperation = operation.then(result => {
            if (revision === this.revision) {
                this.ready = true;
            }
            return result;
        });
        return this.readyOperation;
    }
}
