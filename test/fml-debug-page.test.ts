import {readFileSync} from "node:fs";
import path from "node:path";
import ts from "typescript";
import {compile, parseComponent} from "vue-template-compiler";
import {
    createFmlContent,
    parseDebugTrace,
    parseFmlInput,
} from "../fml-vscode-extension/fml-debug-service/src/FmlDebugService";
import {FmlTraceLocationIndex} from "../fml-vscode-extension/fml-debug-service/src/FmlTraceLocationIndex";
import type {FmlTraceEvent, FmlTraceVariable} from "../fml-vscode-extension/fml-debug-service/src/contracts";
import {isFmlParseError, parseFML} from "../helpers/fml_parser";
import {FmlLocalDebugService} from "../fml-vscode-extension/fml-debug-service/src/FmlLocalDebugService";
import {parseFmlJson, stringifyFmlJson} from "../fml-vscode-extension/fml-executor/src";

interface PageMethods {
    evaluateFhirPathExpression(this: unknown): Promise<void>;
    processTransformResponse(this: unknown, response: fhir4b.Parameters | fhir4b.OperationOutcome, inputText: string, mapText: string, status?: number): void;
    executeRequest(this: unknown, url: string, request: fhir4b.Parameters, inputText: string, mapText: string): Promise<void>;
    populateTracePositions(this: unknown, mapText: string): void;
    selectTrace(this: unknown, position: number, debugMode?: boolean): void;
    navigateToTrace(this: unknown, trace: FmlTraceEvent): void;
    debuggerStepBack(this: unknown): void;
    debuggerStepForward(this: unknown): void;
    formatTraceVariable(this: unknown, variable: FmlTraceVariable): string | undefined;
}

const methodNames = [
    "evaluateFhirPathExpression", "processTransformResponse", "executeRequest", "populateTracePositions",
    "selectTrace", "navigateToTrace", "debuggerStepBack", "debuggerStepForward", "formatTraceVariable",
];
const source = readFileSync(path.join(__dirname, "..", "pages", "fml.vue"), "utf8");
const component = parseComponent(source);
const script = ts.createSourceFile("fml.ts", component.script!.content, ts.ScriptTarget.Latest, true);
const selectedMethods: string[] = [];
function collectMethods(node: ts.Node): void {
    if (ts.isMethodDeclaration(node)
        && methodNames.includes(node.name.getText(script))) {
        selectedMethods.push(node.getText(script));
    }
    ts.forEachChild(node, collectMethods);
}
collectMethods(script);
const compiled = ts.transpileModule(`const methods = {${selectedMethods.join(",\n")}};`, {
    compilerOptions: {target: ts.ScriptTarget.ES2018},
}).outputText;
const settings = {
    getServerEngineUrl: jest.fn(async () => "http://example.test/transformDebugger"),
    getTabSpaces: jest.fn(() => 2),
};
const axios = {
    post: jest.fn(),
    isCancel: () => false,
    CancelToken: {source: () => {
        const token: {reason?: string} = {};
        return {token, cancel: (reason: string) => { token.reason = reason; }};
    }},
};
const methods: PageMethods = new Function(
    "createFmlContent", "parseDebugTrace", "parseFmlInput", "settings", "axios", "FmlLocalDebugService",
    "parseFmlJson", "stringifyFmlJson", "parseFML", "isFmlParseError", "FmlTraceLocationIndex",
    `const requestFhirAcceptHeaders = "application/fhir+json";
     const requestFhirContentTypeHeaders = "application/fhir+json";
     const debugMapFileName = "map.fml";
     ${compiled}\nreturn methods;`,
)(createFmlContent, parseDebugTrace, parseFmlInput, settings, axios, FmlLocalDebugService, parseFmlJson, stringifyFmlJson,
    parseFML, isFmlParseError, FmlTraceLocationIndex);

function responsePage(mapText = "group Main(source src, target tgt) { src.id -> tgt.id; }") {
    return {
        raw: undefined as fhir4b.Parameters | fhir4b.OperationOutcome | undefined,
        trace: [] as FmlTraceEvent[],
        variables: [] as FmlTraceVariable[],
        results: undefined as {value: string} | undefined,
        traceStatus: "complete",
        processedByEngine: undefined as string | undefined,
        saveOutcome: undefined as fhir4b.OperationOutcome | undefined,
        showOutcome: false,
        debugTracePosition: 0,
        loadingData: false,
        cancelSource: undefined as ReturnType<typeof axios.CancelToken.source> | undefined,
        processTransformResponse: methods.processTransformResponse,
        populateTracePositions: methods.populateTracePositions,
        selectTrace: methods.selectTrace,
        getFhirpathExpression: () => mapText,
        setResultJson: jest.fn(),
        clearDebuggerSelectionMarkers: jest.fn(),
        highlightText: jest.fn(),
        highlightDebuggerVariables: jest.fn(),
        scrollIntoView: jest.fn(),
    };
}

describe("FML web page transform protocol", () => {
    beforeEach(() => {
        settings.getTabSpaces.mockReturnValue(2);
    });

    test("displays a failed local check without presenting partial targets as a result", async () => {
        const editor = {removeMarkers: jest.fn()};
        const page = {
            $refs: {inputResourceEditor: editor, outputResourceEditor: editor},
            selectedEngine: "JavaScript (local)", initializing: false,
            getResourceJson: () => '{"resourceType":"Patient","id":"partial","gender":"male"}',
            getFhirpathExpression: () => `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target
group Main(source src : P, target tgt : T) {
 src.id -> tgt.id;
 src.gender check (false) -> tgt.gender;
}`,
            getModel: () => undefined,
            removeMarkers: jest.fn(), regenerateDiagrams: jest.fn(),
            executeRequest: jest.fn(), processTransformResponse: methods.processTransformResponse,
            setResultJson: jest.fn(), populateTracePositions: methods.populateTracePositions,
            traceStatus: "", results: undefined, showOutcome: false,
            saveOutcome: undefined as fhir4b.OperationOutcome | undefined,
        };
        await methods.evaluateFhirPathExpression.call(page);
        expect(page.executeRequest).not.toHaveBeenCalled();
        expect(page.results).toBeUndefined();
        expect(page.traceStatus).toBe("stopped");
        expect(page.showOutcome).toBe(true);
        expect(page.saveOutcome?.issue.some(issue => issue.severity === "error" && /check failed/.test(issue.diagnostics ?? "")))
            .toBe(true);
    });

    test.each([2, 4])("pretty prints local output using %i-space tabs without posting to a mapping endpoint", async tabSpaces => {
        settings.getTabSpaces.mockReturnValue(tabSpaces);
        const editor = {removeMarkers: jest.fn()};
        const page = {
            $refs: {inputResourceEditor: editor, outputResourceEditor: editor},
            selectedEngine: "JavaScript (local)", initializing: false,
            getResourceJson: () => '{"resourceType":"Patient","id":"browser-local"}',
            getFhirpathExpression: () => `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target
group Main(source src : P, target tgt : T) { src.id -> tgt.id; }`,
            getModel: () => undefined,
            removeMarkers: jest.fn(), regenerateDiagrams: jest.fn(),
            executeRequest: jest.fn(), processTransformResponse: methods.processTransformResponse,
            setResultJson: jest.fn(), populateTracePositions: methods.populateTracePositions,
            raw: undefined as fhir4b.Parameters | undefined,
            results: undefined as {value: string} | undefined,
            trace: [] as FmlTraceEvent[],
        };
        await methods.evaluateFhirPathExpression.call(page);
        expect(page.executeRequest).not.toHaveBeenCalled();
        expect(page.results?.value).toBe(JSON.stringify({resourceType: "Patient", id: "browser-local"}, null, tabSpaces));
        expect(page.raw?.parameter?.find(parameter => parameter.name === "return")?.valueString)
            .toBe('{"resourceType":"Patient","id":"browser-local"}');
        expect(page.trace.length).toBeGreaterThan(0);
        expect(page.trace.every(event => event.source?.fileName === "map.fml")).toBe(true);
        expect(page.trace.some(event => event.range !== undefined)).toBe(true);
        const remotePage = responsePage(page.getFhirpathExpression());
        axios.post.mockResolvedValueOnce({status: 200, data: page.raw});
        await methods.executeRequest.call(remotePage, "http://example.test/transformDebugger",
            {resourceType: "Parameters"}, page.getResourceJson(), page.getFhirpathExpression());
        expect(remotePage.trace).toEqual(page.trace);
        expect(remotePage.results).toEqual(page.results);
    });

    test.each(["JavaScript (local)", ".NET (brianpos)", "java (HAPI)", "java (Validator)", "matchbox", "Python (MaLaC-HD)"])(
        "pretty prints %s JSON without losing numeric precision or changing the raw response", selectedEngine => {
        settings.getTabSpaces.mockReturnValue(4);
        const rawResult = '{"integer":9007199254740993,"nested":{"decimal":1.23000000000000000001},"items":[false,null,{}]}';
        const response: fhir4b.Parameters = {
            resourceType: "Parameters",
            parameter: [{name: "return", valueString: rawResult}],
        };
        const page = {
            selectedEngine,
            results: undefined as {value: string} | undefined,
            setResultJson: jest.fn(), populateTracePositions: jest.fn(),
        };
        methods.processTransformResponse.call(page, response, "{}", "group Main {}");
        expect(page.results?.value).toBe([
            "{",
            '    "integer": 9007199254740993,',
            '    "nested": {',
            '        "decimal": 1.23000000000000000001',
            "    },",
            '    "items": [',
            "        false,",
            "        null,",
            "        {}",
            "    ]",
            "}",
        ].join("\n"));
        expect(response.parameter?.[0].valueString).toBe(rawResult);
    });

    test("leaves remote XML output unchanged", () => {
        const xml = '<Patient xmlns="http://hl7.org/fhir"><id value="remote"/></Patient>';
        const page = {
            selectedEngine: "java (HAPI)",
            results: undefined as {value: string} | undefined,
            setResultJson: jest.fn(), populateTracePositions: jest.fn(),
        };
        methods.processTransformResponse.call(page, {
            resourceType: "Parameters",
            parameter: [{name: "return", resource: createFmlContent(xml)}],
        }, "{}", "group Main {}");
        expect(page.results?.value).toBe(xml);
    });
    test("compiles its trace and variable templates", () => {
        expect(compile(component.template!.content).errors).toEqual([]);
        expect(selectedMethods).toHaveLength(methodNames.length);
    });

    test.each([
        '{"resourceType":"Patient","id":"\u00e9"}',
        '<Patient xmlns="http://hl7.org/fhir"><id value="\u00e9"/></Patient>',
    ])("sends srcMap, unchanged model, Binary content and an explicit debug flag for %s", async inputText => {
        const editor = {removeMarkers: jest.fn()};
        const page = {
            $refs: {inputResourceEditor: editor, outputResourceEditor: editor},
            selectedEngine: "java (HAPI)",
            initializing: false,
            getResourceJson: () => inputText,
            getFhirpathExpression: () => "group Main(source src, target tgt) {}",
            getModel: () => '{"resourceType":"Bundle","type":"collection"}',
            removeMarkers: jest.fn(),
            regenerateDiagrams: jest.fn(),
            executeRequest: jest.fn(async (_url: string, _parameters: fhir4b.Parameters) => {}),
        };
        await methods.evaluateFhirPathExpression.call(page);
        expect(page.executeRequest).toHaveBeenCalledTimes(1);
        const [url, parameters] = page.executeRequest.mock.calls[0];
        expect(url).toBe("http://example.test/transformDebugger");
        expect(parameters.parameter).toEqual([
            {name: "srcMap", valueString: "group Main(source src, target tgt) {}", extension: [{
                url: "http://hl7.org/fhir/StructureDefinition/operationoutcome-file", valueString: "map.fml",
            }]},
            {name: "model", valueString: '{"resourceType":"Bundle","type":"collection"}'},
            {name: "content", resource: createFmlContent(inputText)},
            {name: "debug", valueBoolean: true},
        ]);
        const binary = parameters.parameter?.[2].resource;
        expect(binary?.resourceType).toBe("Binary");
        if (binary?.resourceType !== "Binary") throw new Error("Expected Binary content.");
        expect(Buffer.from(binary.data!, "base64").toString("utf8")).toBe(inputText);
    });

    test("displays structured trace snapshots, return and completeness while retaining all output parameters", () => {
        const outcome: fhir4b.OperationOutcome = {
            resourceType: "OperationOutcome",
            issue: [{severity: "error", code: "processing", diagnostics: "stopped at snapshot"}],
        };
        const response: fhir4b.Parameters = {
            resourceType: "Parameters",
            parameter: [
                {name: "parameters", part: [
                    {name: "extra", valueBoolean: true}, {name: "evaluator", valueString: "test engine"},
                ]},
                {name: "return", resource: createFmlContent('{"resourceType":"Patient","id":"new"}')},
                {name: "result", valueString: '{"id":"legacy"}'},
                {name: "output", resource: {resourceType: "StructureMap", status: "draft"}},
                {name: "traceStatus", valueCode: "stopped"},
                {name: "outcome", resource: outcome},
                {name: "trace", part: [
                    {name: "phase", valueCode: "step"},
                    {name: "startRow", valueInteger: 0},
                    {name: "startColumn", valueInteger: 0},
                    {name: "endRow", valueInteger: 0},
                    {name: "endColumn", valueInteger: 5},
                    {name: "variable", part: [
                        {name: "name", valueString: "captured"},
                        {name: "contextType", valueString: "query-alias"},
                        {name: "jsonValue", valueString: '{"field":false}'},
                    ]},
                    {name: "message", part: [{name: "text", valueString: "captured snapshot"}]},
                ]},
            ],
        };
        const page = {
            raw: undefined as fhir4b.Parameters | undefined,
            variables: [] as FmlTraceVariable[],
            trace: [] as FmlTraceEvent[],
            results: undefined as {value: string} | undefined,
            traceStatus: "",
            processedByEngine: "",
            saveOutcome: undefined as fhir4b.OperationOutcome | undefined,
            showOutcome: false,
            setResultJson: jest.fn(),
            populateTracePositions: jest.fn(),
        };
        methods.processTransformResponse.call(page, response, "{}", "group Main {}");
        expect(page.raw).toBe(response);
        expect(page.traceStatus).toBe("stopped");
        expect(page.processedByEngine).toBe("test engine");
        expect(JSON.parse(page.results!.value)).toEqual({resourceType: "Patient", id: "new"});
        expect(page.trace[0]).toMatchObject({
            range: {startOffset: 0, length: 5}, message: "captured snapshot", exception: "stopped at snapshot",
        });
        expect(page.variables[0]).toMatchObject({
            name: "captured", mode: "query-alias", data: {value: {field: false}},
        });
        expect(page.saveOutcome).toBe(outcome);
        expect(page.showOutcome).toBe(true);
    });

    test("uses the shared structured source-location index without an editor dependency", () => {
        const index = new FmlTraceLocationIndex({groups: [{
            parameters: [],
            rules: [{
                position: {startIndex: 10, endIndex: 30},
                sources: [{position: {startIndex: 10, endIndex: 16}}],
                targets: [],
            }],
        }]});
        expect(index.rangeFor("StructureMap.group[0].rule[0].source[0]")).toEqual({
            startOffset: 10, length: 6,
        });
    });

    test.each(["complete", "truncated", "stopped"])("retains %s snapshots and ordered messages while stepping", traceStatus => {
        const page = responsePage();
        methods.processTransformResponse.call(page, {
            resourceType: "Parameters",
            parameter: [
                {name: "traceStatus", valueCode: traceStatus},
                ...["enter", "step", "exit"].map(phase => ({
                    name: "trace",
                    part: [
                        {name: "phase", valueCode: phase},
                        {name: "source", valueString: "map.fml"},
                        {name: "expressionPosition", valueString: "StructureMap.group[0].rule[0].source[0]"},
                        {name: "message", part: [
                            {name: "name", valueString: "label"},
                            {name: "text", valueString: "first"},
                            {name: "text", valueString: "second"},
                        ]},
                        {name: "message", part: [{name: "text", valueString: "third"}]},
                        ...[false, true].map(valueBoolean => ({name: "variable", part: [
                            {name: "name", valueString: "flags"},
                            {name: "contextType", valueString: "OUTPUT"},
                            {name: "value", valueBoolean},
                        ]})),
                        {name: "variable", part: [
                            {name: "name", valueString: "empty"},
                        ]},
                        {name: "variable", part: [
                            {name: "name", valueString: "fromInput"},
                            {name: "contextType", valueString: "OUTPUT"},
                            {name: "path", valueString: "Patient.id"},
                        ]},
                    ],
                })),
            ],
        }, '{"resourceType":"Patient","id":"original"}', page.getFhirpathExpression());
        expect(page.traceStatus).toBe(traceStatus);
        expect(page.trace.map(event => event.depth)).toEqual([0, 1, 0]);
        expect(page.trace[0].message).toBe("label: first\nlabel: second\nthird");
        expect(page.trace[0].messages).toEqual([
            {name: "label", text: ["first", "second"]}, {text: ["third"]},
        ]);
        expect(page.variables.map(variable => variable.data?.value)).toEqual([[false, true], [], "original"]);
        expect(methods.formatTraceVariable.call(page, page.variables[0])).toBe("[\n  false,\n  true\n]");
        methods.debuggerStepForward.call(page);
        expect(page.debugTracePosition).toBe(1);
        expect(page.variables).toBe(page.trace[1].variables);
        expect(page.highlightText).toHaveBeenLastCalledWith(undefined,
            page.trace[1].range!.startOffset, page.trace[1].range!.length, true);
        methods.debuggerStepBack.call(page);
        expect(page.debugTracePosition).toBe(0);
        methods.navigateToTrace.call(page, page.trace[2]);
        expect(page.debugTracePosition).toBe(2);
        expect(page.variables).toBe(page.trace[2].variables);
    });

    test("uses submitted coordinates and canonical sources, never guessed message names or foreign sources", () => {
        const mapText = "/// url = 'http://example.test/Map'\r\n"
            + "group Main(source src, target tgt) { src.id -> tgt.id; }";
        const page = responsePage(mapText);
        methods.processTransformResponse.call(page, {
            resourceType: "Parameters", parameter: [
                {name: "trace", part: [
                    {name: "phase", valueCode: "step"},
                    {name: "source", valueString: "http://example.test/Map"},
                    {name: "startRow", valueInteger: 1}, {name: "startColumn", valueInteger: 0},
                    {name: "endRow", valueInteger: 1}, {name: "endColumn", valueInteger: 5},
                    {name: "expressionPosition", valueString: "StructureMap.group[0].rule[0]"},
                ]},
                {name: "trace", part: [
                    {name: "phase", valueCode: "step"},
                    {name: "source", valueString: "imported.fml"},
                    {name: "expressionPosition", valueString: "StructureMap.group[0].rule[0]"},
                    {name: "message", part: [{name: "text", valueString: "Group : Main"}]},
                ]},
                {name: "trace", part: [{name: "debug", valueString: "Group : Main"}]},
            ],
        }, "{}", mapText);
        expect(page.trace[0].range).toEqual({startOffset: mapText.indexOf("group"), length: 5});
        expect(page.trace[1].source).toBeUndefined();
        expect(page.trace[1].range).toBeUndefined();
        expect(page.trace[2].range).toBeUndefined();
        methods.navigateToTrace.call(page, page.trace[1]);
        expect(page.highlightText).not.toHaveBeenCalled();
        page.getFhirpathExpression = () => "// edited\n" + mapText;
        methods.navigateToTrace.call(page, page.trace[0]);
        expect(page.highlightText).not.toHaveBeenCalled();
        expect(page.variables).toBe(page.trace[0].variables);
    });

    test("keeps legacy cursor navigation and safely handles empty recordings", () => {
        const page = responsePage();
        methods.debuggerStepBack.call(page);
        methods.debuggerStepForward.call(page);
        expect(page.clearDebuggerSelectionMarkers).not.toHaveBeenCalled();
        methods.processTransformResponse.call(page, {
            resourceType: "Parameters", parameter: [{name: "trace", part: [{
                name: "debug", valueString: "Group : Main",
                extension: [{url: "http://fhirpath-lab.com/StructureDefinition/Cursor", valueString: "0 - 5"}],
            }]}],
        }, "{}", page.getFhirpathExpression());
        methods.navigateToTrace.call(page, page.trace[0]);
        expect(page.highlightText).toHaveBeenCalledWith(undefined, 0, 5, false);
    });

    test("shows unavailable XML path variables as errors while preserving inline snapshots", () => {
        const page = responsePage();
        methods.processTransformResponse.call(page, {
            resourceType: "Parameters", parameter: [{name: "trace", part: [
                {name: "phase", valueCode: "step"},
                {name: "variable", part: [
                    {name: "name", valueString: "missing"}, {name: "path", valueString: "Patient.id"},
                ]},
                {name: "variable", part: [
                    {name: "name", valueString: "captured"}, {name: "jsonValue", valueString: "null"},
                ]},
            ]}],
        }, '<Patient xmlns="http://hl7.org/fhir"/>', page.getFhirpathExpression());
        expect(page.variables[0].errorMessage).toMatch(/XML/);
        expect(methods.formatTraceVariable.call(page, page.variables[0])).toBe(page.variables[0].errorMessage);
        expect(methods.formatTraceVariable.call(page, page.variables[1])).toBe("null");
    });

    test.each(["matchbox", "Python (MaLaC-HD)"])("retains legacy %s requests with exactly one resource parameter", async selectedEngine => {
        const page = {
            ...responsePage(),
            $refs: {inputResourceEditor: {removeMarkers: jest.fn()}, outputResourceEditor: {removeMarkers: jest.fn()}},
            selectedEngine,
            getResourceJson: () => '{"resourceType":"Patient","id":"legacy"}',
            getModel: () => undefined,
            removeMarkers: jest.fn(), regenerateDiagrams: jest.fn(),
            executeRequest: jest.fn(),
        };
        await methods.evaluateFhirPathExpression.call(page);
        const [url, body, inputText, mapText] = page.executeRequest.mock.calls[0];
        expect(url).toBe("http://example.test/transformDebugger");
        expect(inputText).toBe(page.getResourceJson());
        expect(mapText).toBe(page.getFhirpathExpression());
        expect(body.parameter.map((part: {name: string}) => part.name)).toEqual(["map", "resource", "debug"]);
        expect(body.parameter[1]).toEqual({name: "resource", valueString: inputText});
    });

    test.each([false, 0, null, [], {id: "native"}])("displays JSON return values including %j", value => {
        const page = responsePage();
        methods.processTransformResponse.call(page, {
            resourceType: "Parameters", parameter: [
                {name: "result", valueString: '"legacy"'},
                {name: "return", valueString: JSON.stringify(value)},
            ],
        }, "{}", page.getFhirpathExpression());
        expect(page.results?.value).toBe(JSON.stringify(value, null, 2));
    });

    test.each([
        {name: "return", resource: {resourceType: "Patient", id: "native"}},
        {name: "return", resource: createFmlContent('{"resourceType":"Patient","id":"native"}')},
        {name: "return", valueString: '{"resourceType":"Patient","id":"native"}'},
        {name: "result", valueString: '{"resourceType":"Patient","id":"native"}'},
    ] satisfies fhir4b.ParametersParameter[])("displays native, Binary and legacy JSON results consistently: %j", result => {
        const page = responsePage();
        methods.processTransformResponse.call(page, {
            resourceType: "Parameters", parameter: [result],
        }, "{}", page.getFhirpathExpression());
        expect(page.results?.value).toBe('{\n  "resourceType": "Patient",\n  "id": "native"\n}');
    });

    test("handles standalone OperationOutcome through the same response path and clears previous execution data", () => {
        const page = responsePage();
        const outcome: fhir4b.OperationOutcome = {
            resourceType: "OperationOutcome", issue: [{severity: "warning", code: "processing", diagnostics: "details"}],
        };
        methods.processTransformResponse.call(page, {
            resourceType: "Parameters", parameter: [
                {name: "return", valueString: "{}"},
                {name: "trace", part: [{name: "phase", valueCode: "step"}]},
            ],
        }, "{}", page.getFhirpathExpression());
        methods.processTransformResponse.call(page, outcome, "{}", page.getFhirpathExpression(), 503);
        expect(page.trace).toEqual([]);
        expect(page.variables).toEqual([]);
        expect(page.results).toBeUndefined();
        expect(page.raw).toBe(outcome);
        expect(page.saveOutcome?.issue.map(issue => issue.diagnostics)).toEqual(["details", "Transform engine returned HTTP 503."]);
        expect(outcome.issue).toHaveLength(1);
    });

    test.each([
        ["<html>gateway unavailable</html>", /without FHIR Parameters/],
        [{resourceType: "Parameters", parameter: [{name: "trace", part: [
            {name: "phase", valueCode: "invalid"},
        ]}]}, /Unrecognized trace phase/],
    ])("reports invalid responses without claiming success: %j", async (data, error) => {
        const page = responsePage();
        axios.post.mockResolvedValueOnce({status: 200, data});
        await methods.executeRequest.call(page, "http://example.test/transformDebugger",
            {resourceType: "Parameters"}, "{}", page.getFhirpathExpression());
        expect(page.results).toBeUndefined();
        expect(page.showOutcome).toBe(true);
        expect(page.saveOutcome?.issue[0].diagnostics).toMatch(error);
        expect(page.loadingData).toBe(false);
    });

    test("does not apply a cancelled response or clear a newer request's loading state", async () => {
        let complete: ((value: unknown) => void) | undefined;
        axios.post.mockReturnValueOnce(new Promise(resolve => { complete = resolve; }));
        const page = responsePage();
        const pending = methods.executeRequest.call(page, "http://example.test/transformDebugger",
            {resourceType: "Parameters"}, "{}", page.getFhirpathExpression());
        page.cancelSource!.cancel("new execution");
        const current = axios.CancelToken.source();
        page.cancelSource = current;
        complete!({status: 200, data: {resourceType: "Parameters"}});
        await pending;
        expect(page.raw).toBeUndefined();
        expect(page.saveOutcome).toBeUndefined();
        expect(page.cancelSource).toBe(current);
        expect(page.loadingData).toBe(true);
    });

    test("clears cancelled execution state before reporting a missing input", async () => {
        const previousRemote = axios.CancelToken.source();
        const previousLocal = new AbortController();
        const page = {
            ...responsePage(),
            $refs: {inputResourceEditor: {removeMarkers: jest.fn()}, outputResourceEditor: {removeMarkers: jest.fn()}},
            selectedEngine: "JavaScript (local)",
            getResourceJson: () => undefined,
            getModel: () => undefined,
            removeMarkers: jest.fn(), regenerateDiagrams: jest.fn(),
            cancelSource: previousRemote,
            localExecutionAbort: previousLocal,
            loadingData: true,
        };
        await methods.evaluateFhirPathExpression.call(page);
        expect(previousLocal.signal.aborted).toBe(true);
        expect(previousRemote.token.reason).toBeDefined();
        expect(page.cancelSource).toBeUndefined();
        expect(page.localExecutionAbort).toBeUndefined();
        expect(page.loadingData).toBe(false);
        expect(page.saveOutcome?.issue[0].code).toBe("required");
    });

    test("retains Parameters failure traces on non-2xx responses and reports HTTP failures", async () => {
        const response: fhir4b.Parameters = {
            resourceType: "Parameters",
            parameter: [
                {name: "traceStatus", valueCode: "stopped"},
                {name: "trace", part: [{name: "phase", valueCode: "enter"}]},
            ],
        };
        axios.post.mockResolvedValueOnce({status: 500, data: response});
        const page = responsePage();
        await methods.executeRequest.call(page, "http://example.test/transformDebugger", {
            resourceType: "Parameters", parameter: [],
        }, "{}", page.getFhirpathExpression());
        expect(page.raw).toBe(response);
        expect(page.traceStatus).toBe("stopped");
        expect(page.trace[0].exception).toContain("HTTP 500");
        expect(page.saveOutcome?.issue[0].diagnostics).toContain("HTTP 500");
        expect(page.showOutcome).toBe(true);
    });

    test("surfaces network errors instead of retaining success-shaped output", async () => {
        axios.post.mockRejectedValueOnce(new Error("connection failed"));
        const page = {
            getResourceJson: () => "{}",
            getFhirpathExpression: () => "",
            saveOutcome: undefined as fhir4b.OperationOutcome | undefined,
            showOutcome: false,
        };
        await methods.executeRequest.call(page, "http://example.test/transformDebugger", {
            resourceType: "Parameters",
        }, "{}", "");
        expect(page.saveOutcome?.issue[0].diagnostics).toContain("connection failed");
        expect(page.showOutcome).toBe(true);
    });
});
