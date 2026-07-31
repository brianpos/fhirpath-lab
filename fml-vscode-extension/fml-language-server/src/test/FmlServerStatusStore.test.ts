import assert from "node:assert/strict";
import test from "node:test";
import {FmlServerStatusStore} from "../FmlServerStatusStore";

const stats = {
    fileCount: 4,
    canonicalUrlCount: 3,
    groupCount: 8,
    importCount: 2,
};

test("tracks indexing lifecycle and counts", () => {
    const store = new FmlServerStatusStore();
    store.startIndexing();
    assert.equal(store.getStatus(stats, 1).state, "indexing");

    store.completeIndex({...stats, failedFileCount: 0, durationMs: 42});
    const status = store.getStatus(stats, 2);
    assert.equal(status.state, "ready");
    assert.equal(status.durationMs, 42);
    assert.equal(status.openDocumentCount, 2);
    assert.ok(status.lastIndexedAt);
});

test("retains and clears indexing failures", () => {
    const store = new FmlServerStatusStore();
    store.recordFailure("file:///broken.fml", "Unable to parse");
    assert.equal(store.getStatus(stats, 0).failedFileCount, 1);
    assert.equal(store.getFailures()[0].message, "Unable to parse");

    store.clearFailure("file:///broken.fml");
    assert.equal(store.getFailures().length, 0);
});

test("reports server errors", () => {
    const store = new FmlServerStatusStore();
    store.fail("Index request failed");

    const status = store.getStatus(stats, 0);
    assert.equal(status.state, "error");
    assert.equal(status.lastError, "Index request failed");
});
