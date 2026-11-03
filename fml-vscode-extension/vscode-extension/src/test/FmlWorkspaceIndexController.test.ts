import * as assert from "node:assert/strict";
import type {WorkspaceIndexResult} from "@fhirpath-lab/language-service";
import {FmlWorkspaceIndexController} from "../FmlWorkspaceIndexController";

function deferred<T>() {
    let resolve!: (value: T) => void;
    let reject!: (error: unknown) => void;
    const promise = new Promise<T>((onResolve, onReject) => {
        resolve = onResolve;
        reject = onReject;
    });
    return {promise, resolve, reject};
}

const result: WorkspaceIndexResult = {
    fileCount: 1, canonicalUrlCount: 0, groupCount: 1, importCount: 0, failedFileCount: 0, durationMs: 1,
};

suite("FML workspace indexing readiness", () => {
    test("rejects calls before indexing and retains failures for existing and future waiters until recovery", async () => {
        let attempt = deferred<WorkspaceIndexResult>();
        const controller = new FmlWorkspaceIndexController(() => attempt.promise, async () => {});
        await assert.rejects(controller.waitUntilReady(), /not been initialized/);
        for (const message of ["initial index failed", "retry failed"]) {
            attempt = deferred<WorkspaceIndexResult>();
            const failure = new Error(message);
            const operation = controller.reindex();
            const failed = assert.rejects(operation, error => error === failure);
            const waiting = assert.rejects(controller.waitUntilReady(), error => error === failure);
            assert.equal(controller.isReady, false);
            attempt.reject(failure);
            await Promise.all([failed, waiting]);
            assert.equal(controller.isReady, false);
            await assert.rejects(controller.waitUntilReady(), error => error === failure);
        }
        attempt = deferred<WorkspaceIndexResult>();
        const recovered = controller.reindex();
        const waiting = controller.waitUntilReady();
        assert.equal(controller.isReady, false);
        attempt.resolve(result);
        await Promise.all([recovered, waiting]);
        assert.equal(controller.isReady, true);
    });

    test("does not reuse readiness from a previous successful index after a refresh fails", async () => {
        const failure = new Error("model upload failed");
        let fail = false;
        const controller = new FmlWorkspaceIndexController(async () => {
            if (fail) {throw failure;}
            return result;
        }, async () => {});
        await controller.reindex();
        assert.equal(controller.isReady, true);
        fail = true;
        await assert.rejects(controller.reindex(true), error => error === failure);
        assert.equal(controller.isReady, false);
        await assert.rejects(controller.waitUntilReady(), error => error === failure);
    });

    test("coalesces requests and waits for the queued model refresh, including a failed final pass", async () => {
        const first = deferred<WorkspaceIndexResult>();
        const second = deferred<WorkspaceIndexResult>();
        const secondStarted = deferred<void>();
        let calls = 0;
        const controller = new FmlWorkspaceIndexController(() => {
            if (++calls === 1) {return first.promise;}
            secondStarted.resolve();
            return second.promise;
        }, async () => {});
        const operation = controller.reindex();
        assert.strictEqual(controller.reindex(), operation);
        assert.strictEqual(controller.reindex(true), operation);
        const failure = new Error("latest models failed");
        const failed = assert.rejects(operation, error => error === failure);
        const waiting = assert.rejects(controller.waitUntilReady(), error => error === failure);
        first.resolve(result);
        await secondStarted.promise;
        assert.equal(controller.isReady, false);
        second.reject(failure);
        await Promise.all([failed, waiting]);
        assert.equal(calls, 2);
        await assert.rejects(controller.waitUntilReady(), error => error === failure);
    });

    for (const interruptedFails of [false, true]) {
        test(`restart supersedes an in-flight index that ${interruptedFails ? "fails" : "succeeds"} without releasing waiters early`, async () => {
            const first = deferred<WorkspaceIndexResult>();
            const fresh = deferred<WorkspaceIndexResult>();
            const server = deferred<void>();
            const freshStarted = deferred<void>();
            let calls = 0;
            const controller = new FmlWorkspaceIndexController(() => {
                if (++calls === 1) {return first.promise;}
                freshStarted.resolve();
                return fresh.promise;
            }, () => server.promise);
            const original = controller.reindex();
            let released = false;
            const waiting = controller.waitUntilReady().then(() => { released = true; });
            const restart = controller.restart();
            assert.strictEqual(controller.restart(), restart);
            assert.strictEqual(controller.reindex(true), restart);
            if (interruptedFails) {
                const failure = new Error("server stopped");
                const failed = assert.rejects(original, error => error === failure);
                first.reject(failure);
                await failed;
            } else {
                first.resolve(result);
                await original;
            }
            assert.equal(controller.isReady, false);
            assert.equal(released, false);
            server.resolve();
            await freshStarted.promise;
            assert.equal(controller.isReady, false);
            fresh.resolve(result);
            await Promise.all([restart, waiting]);
            assert.equal(controller.isReady, true);
            assert.equal(calls, 2);
        });
    }

    test("a failed restart remains failed even if the old index succeeds later, and re-indexing can recover", async () => {
        const old = deferred<WorkspaceIndexResult>();
        const failure = new Error("restart failed");
        let calls = 0;
        const controller = new FmlWorkspaceIndexController(() => ++calls === 1 ? old.promise : Promise.resolve(result),
            async () => { throw failure; });
        const original = controller.reindex();
        await assert.rejects(controller.restart(), error => error === failure);
        await assert.rejects(controller.waitUntilReady(), error => error === failure);
        assert.equal(controller.isReady, false);
        await controller.reindex();
        old.resolve(result);
        await original;
        await controller.waitUntilReady();
        assert.equal(controller.isReady, true);
        assert.equal(calls, 2);
    });

    test("keeps a successful index with reported per-file failures usable", async () => {
        const controller = new FmlWorkspaceIndexController(async () => ({...result, failedFileCount: 1}), async () => {});
        assert.equal((await controller.reindex()).failedFileCount, 1);
        await controller.waitUntilReady();
        assert.equal(controller.isReady, true);
    });
});
