import {OutputChannel, Uri, workspace} from "vscode";
import {UiConstants} from "./constants/UiConstants";
import {logData} from "./utils";

export type MapBuilderFileEventType = "create" | "change" | "delete";

export interface MapBuilderFileEvent {
    type: MapBuilderFileEventType;
    uri: Uri;
}

export interface MapBuilderWatcherHooks {
    onFmlFile?: (event: MapBuilderFileEvent) => Promise<void> | void;
    onPackageBuild?: (event: MapBuilderFileEvent) => Promise<void> | void;
}

/**
 * Filesystem integration point for behavior that is independent of open
 * documents. Real-time validation is handled by the language server.
 */
export class MapBuilderWatcher {
    private readonly fmlWatcher = workspace.createFileSystemWatcher(UiConstants.fmlFilesPathToWatch);
    private readonly packageWatcher = workspace.createFileSystemWatcher(UiConstants.qaPathToWatch);

    public constructor(
        private readonly logger: OutputChannel,
        private readonly hooks: MapBuilderWatcherHooks = {},
    ) {
        this.fmlWatcher.onDidCreate(uri => this.dispatch(this.hooks.onFmlFile, {type: "create", uri}));
        this.fmlWatcher.onDidChange(uri => this.dispatch(this.hooks.onFmlFile, {type: "change", uri}));
        this.fmlWatcher.onDidDelete(uri => this.dispatch(this.hooks.onFmlFile, {type: "delete", uri}));

        this.packageWatcher.onDidCreate(uri => this.dispatch(this.hooks.onPackageBuild, {type: "create", uri}));
        this.packageWatcher.onDidChange(uri => this.dispatch(this.hooks.onPackageBuild, {type: "change", uri}));
        this.packageWatcher.onDidDelete(uri => this.dispatch(this.hooks.onPackageBuild, {type: "delete", uri}));
    }

    public dispose(): void {
        this.fmlWatcher.dispose();
        this.packageWatcher.dispose();
    }

    public async scanFmlFiles(): Promise<Uri[]> {
        const startedAt = Date.now();
        logData("Starting workspace FML file scan.", this.logger);
        try {
            const files = await workspace.findFiles(
                UiConstants.fmlFilesPathToWatch,
                "**/{.git,node_modules,dist,out,target,.vscode-test}/**",
            );
            logData(
                `Workspace FML file scan found ${files.length} file(s) in ${Date.now() - startedAt}ms.`,
                this.logger,
            );
            return files;
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            logData(`Workspace FML file scan failed after ${Date.now() - startedAt}ms: ${message}`, this.logger);
            throw error;
        }
    }

    private dispatch(
        hook: ((event: MapBuilderFileEvent) => Promise<void> | void) | undefined,
        event: MapBuilderFileEvent,
    ): void {
        if (!hook) {
            return;
        }

        void Promise.resolve(hook(event)).catch(error => {
            const message = error instanceof Error ? error.message : String(error);
            logData(`Filesystem hook failed for ${event.uri.fsPath}: ${message}`, this.logger);
        });
    }
}
