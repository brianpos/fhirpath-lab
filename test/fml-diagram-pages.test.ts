import { readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { parseComponent } from "vue-template-compiler";
import { isFmlParseError, parseFML } from "../helpers/fml_parser";
import { fmlToStructureMap } from "../helpers/fml_to_structuremap";
import {
  generateFmlStructureMapDiagramSvg,
  generateStructureMapDiagramSvg,
} from "../helpers/structuremap_diagram";
import {
  generateFmlInstanceDiagramSvg,
  generateInstanceDiagramSvg,
} from "../helpers/structuremap_diagram_instance";
import { generateFmlInstanceDiagramSvg as generateFmlCompleteDiagramSvg } from "../helpers/structuremap_diagram_complete";
import { lookupByTypeName as lookupByTypeNameR4B } from "../helpers/models/generated/r4b";

const mapText = [
  "uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias Patient as source",
  "uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias PatientTarget as target",
  "group Main(source src : Patient, target tgt : PatientTarget) {",
  "  src.id -> tgt.id;",
  "}",
].join("\n");
function parseMap() {
  const result = parseFML(mapText);
  if (isFmlParseError(result)) throw new Error(JSON.stringify(result.issue));
  return result;
}
const parsedMap = parseMap();
const rawMap = fmlToStructureMap(parsedMap);

const parse = jest.fn(parseFML);
const render = jest.fn(() => mapText);
const loadCanonicalResource = jest.fn(async () => undefined);

interface DiagramPageMethods {
  searchFhirServer(this: unknown): Promise<void>;
  regenerateDiagrams(this: unknown): void;
}

function loadMethods(relativePath: string[], methodName: string): DiagramPageMethods {
  const source = readFileSync(path.join(__dirname, "..", ...relativePath), "utf8");
  const component = parseComponent(source);
  if (!component.script) throw new Error("Page has no script");
  const script = ts.createSourceFile("page.ts", component.script.content, ts.ScriptTarget.Latest, true);
  const methods: string[] = [];
  function collect(node: ts.Node): void {
    if (ts.isMethodDeclaration(node) && node.name.getText(script) === methodName) {
      methods.push(node.getText(script));
    }
    ts.forEachChild(node, collect);
  }
  collect(script);
  if (methods.length !== 1) throw new Error(`Expected one ${methodName} method`);
  const compiled = ts.transpileModule(`const methods = {${methods[0]}};`, {
    compilerOptions: { target: ts.ScriptTarget.ES2018 },
  }).outputText;
  return new Function(
    "parseFML", "isFmlParseError", "StructureMapUtilitiesRender", "loadCanonicalResource",
    "settings", "isFavourite", "document", "generateFmlStructureMapDiagramSvg",
    "generateStructureMapDiagramSvg", "generateFmlInstanceDiagramSvg",
    "generateInstanceDiagramSvg", "generateFmlCompleteDiagramSvg", "lookupByTypeNameR4B",
    "validateFmlModel",
    `${compiled}\nreturn methods;`,
  )(
    parse, isFmlParseError, { render }, loadCanonicalResource,
    { getFhirServerUrl: () => "http://example.test/fhir" }, () => false, { title: "" },
    generateFmlStructureMapDiagramSvg, generateStructureMapDiagramSvg,
    generateFmlInstanceDiagramSvg, generateInstanceDiagramSvg, generateFmlCompleteDiagramSvg,
    lookupByTypeNameR4B, () => [],
  );
}

const structureMapMethods = loadMethods(["pages", "StructureMap", "_id.vue"], "searchFhirServer");
const fmlMethods = loadMethods(["pages", "fml.vue"], "regenerateDiagrams");

function structureMapPage() {
  return {
    raw: rawMap,
    rawMap: "",
    $route: { params: { id: "example" } },
    diagramSvg: undefined as string | undefined,
    instanceSvg: undefined as string | undefined,
  };
}

function expectPosition(svg: string | undefined): void {
  const position = parsedMap.groups[0].rules[0].sources[0].position!;
  expect(svg).toContain(`data-pos-start="${position.startIndex}" data-pos-end="${position.endIndex}"`);
}

describe("diagram page API migration", () => {
  beforeEach(() => {
    parse.mockReset();
    parse.mockImplementation(parseFML);
    render.mockReturnValue(mapText);
  });

  test("StructureMap page renders both diagrams with editor positions", async () => {
    const page = structureMapPage();
    await structureMapMethods.searchFhirServer.call(page);
    expect(page.rawMap).toBe(mapText);
    expectPosition(page.diagramSvg);
    expectPosition(page.instanceSvg);
  });

  test("StructureMap page logs syntax errors and renders both raw-map fallbacks", async () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => undefined);
    try {
      render.mockReturnValue("group {");
      const page = structureMapPage();
      await structureMapMethods.searchFhirServer.call(page);
      expect(warn).toHaveBeenCalledWith(
        "FML re-parse for diagram positions failed:", expect.any(Array),
      );
      expect(page.diagramSvg).toBe(generateStructureMapDiagramSvg(rawMap));
      expect(page.instanceSvg).toBe(generateInstanceDiagramSvg(rawMap, lookupByTypeNameR4B, true));
      expect(page.diagramSvg).not.toContain('data-pos-start="');
      expect(page.instanceSvg).not.toContain('data-pos-start="');
    } finally {
      warn.mockRestore();
    }
  });

  test("StructureMap page logs unexpected parser failures before falling back", async () => {
    const error = new Error("Parser unavailable");
    parse.mockImplementation(() => { throw error; });
    const warn = jest.spyOn(console, "warn").mockImplementation(() => undefined);
    try {
      const page = structureMapPage();
      await structureMapMethods.searchFhirServer.call(page);
      expect(warn).toHaveBeenCalledWith("FML re-parse for diagram positions failed:", error);
      expect(page.diagramSvg).toBe(generateStructureMapDiagramSvg(rawMap));
      expect(page.instanceSvg).toBe(generateInstanceDiagramSvg(rawMap, lookupByTypeNameR4B, true));
    } finally {
      warn.mockRestore();
    }
  });

  test("FML page renders its base and instance previews without discarding positions", () => {
    const page = {
      getFhirpathExpression: () => mapText,
      composedTypeLookup: () => lookupByTypeNameR4B,
      lookupForVersion: () => lookupByTypeNameR4B,
      prepareDiagramNavigation: jest.fn(),
      pauseDiagramPreview: jest.fn(),
      diagramSvg: undefined as string | undefined,
      instanceSvg: undefined as string | undefined,
      completeSvg: undefined as string | undefined,
    };
    fmlMethods.regenerateDiagrams.call(page);
    expect(page.pauseDiagramPreview).not.toHaveBeenCalled();
    expect(page.prepareDiagramNavigation).toHaveBeenCalledTimes(1);
    expectPosition(page.diagramSvg);
    expectPosition(page.instanceSvg);
    expectPosition(page.completeSvg);
  });
});
