// Test the Logical Model Generator functionality
import { 
  createFhirLogicalModel, 
  createFhirLogicalModelFromJson, 
  createFhirLogicalModelFromXml 
} from "../helpers/logical_model_generator";
import { describe, expect, test } from "@jest/globals";

const sampleJson = `{
  "id":"test-id",
  "token":true,
  "other":45,
  "sponsor":[45.5, 123],
  "nested": {
    "innerString": "hello",
    "innerBool": false,
    "usingXmlAttribute": "attrValue"
  }
}`;

const sampleXml = `<root>
  <id>test-id</id>
  <token>true</token>
  <other>45</other>
  <sponsor>45.5</sponsor>
  <sponsor>123</sponsor>
  <nested>
    <innerString>hello</innerString>
    <innerBool>false</innerBool>
    <usingXmlAttribute attributeProp="attrValue"/>
  </nested>
</root>`;

describe("createFhirLogicalModel - JSON", () => {
  test("generates StructureDefinition from JSON", () => {
    const sd = createFhirLogicalModelFromJson(sampleJson, 'root');
    
    expect(sd).toBeDefined();
    expect(sd.resourceType).toBe('StructureDefinition');
    expect(sd.kind).toBe('logical');
    expect(sd.abstract).toBe(false);
    expect(sd.status).toBe('draft');
    expect(sd.derivation).toBe('specialization');
    expect(sd.baseDefinition).toBe('http://hl7.org/fhir/StructureDefinition/Base');
  });

  test("infers correct types from JSON values", () => {
    const sd = createFhirLogicalModelFromJson(sampleJson, 'root');
    const elements = sd.differential?.element || [];
    
    // Find the id element (string)
    const idElement = elements.find(e => e.path === 'root.id');
    expect(idElement).toBeDefined();
    expect(idElement?.type?.[0]?.code).toBe('string');
    
    // Find the token element (boolean)
    const tokenElement = elements.find(e => e.path === 'root.token');
    expect(tokenElement).toBeDefined();
    expect(tokenElement?.type?.[0]?.code).toBe('boolean');
    
    // Find the other element (positive integer)
    const otherElement = elements.find(e => e.path === 'root.other');
    expect(otherElement).toBeDefined();
    expect(otherElement?.type?.[0]?.code).toBe('positiveInt');
    
    // Find the sponsor element (array with decimals)
    const sponsorElement = elements.find(e => e.path === 'root.sponsor');
    expect(sponsorElement).toBeDefined();
    expect(sponsorElement?.type?.[0]?.code).toBe('decimal');
  });

  test("includes root element without type, min, or max", () => {
    const sd = createFhirLogicalModelFromJson(sampleJson, 'root');
    const elements = sd.differential?.element || [];
    
    const rootElement = elements[0];
    expect(rootElement).toBeDefined();
    expect(rootElement.path).toBe('root');
    // Root element should not have type, min, or max per FHIR spec
    expect(rootElement.type).toBeUndefined();
    expect(rootElement.min).toBeUndefined();
    expect(rootElement.max).toBeUndefined();
  });

  test("respects custom options", () => {
    const sd = createFhirLogicalModelFromJson(sampleJson, 'root', {
      name: 'TestModel',
      url: 'http://example.org/StructureDefinition/TestModel',
      description: 'A test logical model',
      publisher: 'Test Publisher',
      version: '1.0.0',
      status: 'active'
    });
    
    expect(sd.name).toBe('TestModel');
    expect(sd.url).toBe('http://example.org/StructureDefinition/TestModel');
    expect(sd.description).toBe('A test logical model');
    expect(sd.publisher).toBe('Test Publisher');
    expect(sd.version).toBe('1.0.0');
    expect(sd.status).toBe('active');
  });
});

describe("createFhirLogicalModel - XML", () => {
  test("generates StructureDefinition from XML", () => {
    const sd = createFhirLogicalModelFromXml(sampleXml);
    
    expect(sd).toBeDefined();
    expect(sd.resourceType).toBe('StructureDefinition');
    expect(sd.kind).toBe('logical');
    expect(sd.abstract).toBe(false);
    expect(sd.status).toBe('draft');
    expect(sd.derivation).toBe('specialization');
    expect(sd.baseDefinition).toBe('http://hl7.org/fhir/StructureDefinition/Base');
  });

  test("uses root element name as model name", () => {
    const sd = createFhirLogicalModelFromXml(sampleXml);
    
    expect(sd.name).toBe('root');
    expect(sd.title).toBe('root');
  });

  test("does not create duplicate root elements", () => {
    const sd = createFhirLogicalModelFromXml(sampleXml);
    const elements = sd.differential?.element || [];
    
    // Count how many elements have the root path
    const rootElements = elements.filter(e => e.path === 'root');
    expect(rootElements.length).toBe(1);
    
    // Root element should be first and should not have type/min/max
    expect(elements[0].path).toBe('root');
    expect(elements[0].type).toBeUndefined();
    expect(elements[0].min).toBeUndefined();
    expect(elements[0].max).toBeUndefined();
  });

  test("creates elements for XML children", () => {
    const sd = createFhirLogicalModelFromXml(sampleXml);
    const elements = sd.differential?.element || [];
    
    // Should have root + id + token + other + sponsor + nested = 6 elements minimum
    expect(elements.length).toBeGreaterThanOrEqual(6);
    
    // Find the id element
    const idElement = elements.find(e => e.path === 'root.id');
    expect(idElement).toBeDefined();
    
    // Find the token element
    const tokenElement = elements.find(e => e.path === 'root.token');
    expect(tokenElement).toBeDefined();
    
    // Find the sponsor element (repeated, so should be array)
    const sponsorElement = elements.find(e => e.path === 'root.sponsor');
    expect(sponsorElement).toBeDefined();
    expect(sponsorElement?.max).toBe('*');
  });

  test("marks XML attributes with representation xmlAttr", () => {
    // Debug: let's see what the XML parser produces
    const { parseXmlAndObject } = require('../helpers/xml_parser');
    const emptyModel = {
      version: 'r4',
      score: { extensionURI: [] },
      choiceTypePaths: {},
      pathsDefinedElsewhere: {},
      type2Parent: {},
      path2Type: {}
    };
    const simpleXml = '<root><nested><usingXmlAttribute attributeProp="attrValue"/></nested></root>';
    const result = parseXmlAndObject(simpleXml, emptyModel, emptyModel.choiceTypePaths, emptyModel.path2Type);
    console.log('Parsed object:', JSON.stringify(result.object, null, 2));
    console.log('Node tree:', JSON.stringify(result.node, null, 2));
    
    const sd = createFhirLogicalModelFromXml(sampleXml);
    const elements = sd.differential?.element || [];
    
    // Debug: show all element paths
    console.log('All element paths:', elements.map(e => e.path));
    
    // The attributeProp on usingXmlAttribute should have representation: ["xmlAttr"]
    const attrElement = elements.find(e => e.path === 'root.nested.usingXmlAttribute.attributeProp');
    expect(attrElement).toBeDefined();
    expect(attrElement?.representation).toEqual(['xmlAttr']);
    
    // Regular elements should NOT have representation
    const idElement = elements.find(e => e.path === 'root.id');
    expect(idElement).toBeDefined();
    expect(idElement?.representation).toBeUndefined();
  });

  test("respects custom options", () => {
    const sd = createFhirLogicalModelFromXml(sampleXml, {
      name: 'RootModel',
      url: 'http://example.org/StructureDefinition/RootModel',
      description: 'XML-based logical model',
      status: 'draft'
    });
    
    expect(sd.name).toBe('RootModel');
    expect(sd.url).toBe('http://example.org/StructureDefinition/RootModel');
    expect(sd.description).toBe('XML-based logical model');
  });
});

describe("createFhirLogicalModel - Auto-detection", () => {
  test("auto-detects JSON input", () => {
    const sd = createFhirLogicalModel(sampleJson);
    
    expect(sd).toBeDefined();
    expect(sd.resourceType).toBe('StructureDefinition');
    expect(sd.kind).toBe('logical');
  });

  test("auto-detects XML input", () => {
    const sd = createFhirLogicalModel(sampleXml);
    
    expect(sd).toBeDefined();
    expect(sd.resourceType).toBe('StructureDefinition');
    expect(sd.kind).toBe('logical');
    expect(sd.name).toBe('root');
  });

  test("handles whitespace before content", () => {
    const jsonWithWhitespace = `   \n  ${sampleJson}`;
    const xmlWithWhitespace = `  \n  ${sampleXml}`;
    
    const sdJson = createFhirLogicalModel(jsonWithWhitespace);
    expect(sdJson.resourceType).toBe('StructureDefinition');
    
    const sdXml = createFhirLogicalModel(xmlWithWhitespace);
    expect(sdXml.resourceType).toBe('StructureDefinition');
  });

  test("throws error for invalid input", () => {
    expect(() => createFhirLogicalModel('not valid content')).toThrow();
  });
});

describe("createFhirLogicalModel - Arrays", () => {
  test("detects arrays in JSON", () => {
    const jsonWithArray = `{
      "items": [
        {"name": "first"},
        {"name": "second"}
      ]
    }`;
    
    const sd = createFhirLogicalModelFromJson(jsonWithArray, 'root');
    const elements = sd.differential?.element || [];
    
    const itemsElement = elements.find(e => e.path === 'root.items');
    expect(itemsElement).toBeDefined();
    expect(itemsElement?.max).toBe('*');
  });

  test("detects arrays of complex types in JSON", () => {
    const jsonWithComplexArray = `{
      "contacts": [
        {"name": "John", "phone": "555-1234", "active": true},
        {"name": "Jane", "phone": "555-5678", "active": false}
      ]
    }`;
    
    const sd = createFhirLogicalModelFromJson(jsonWithComplexArray, 'root');
    const elements = sd.differential?.element || [];
    
    // The contacts array should be marked as repeating
    const contactsElement = elements.find(e => e.path === 'root.contacts');
    expect(contactsElement).toBeDefined();
    expect(contactsElement?.max).toBe('*');
    expect(contactsElement?.type?.[0]?.code).toBe('BackboneElement');
    
    // Child elements should be present
    const nameElement = elements.find(e => e.path === 'root.contacts.name');
    expect(nameElement).toBeDefined();
    expect(nameElement?.type?.[0]?.code).toBe('string');
    
    const phoneElement = elements.find(e => e.path === 'root.contacts.phone');
    expect(phoneElement).toBeDefined();
    expect(phoneElement?.type?.[0]?.code).toBe('string');
    
    const activeElement = elements.find(e => e.path === 'root.contacts.active');
    expect(activeElement).toBeDefined();
    expect(activeElement?.type?.[0]?.code).toBe('boolean');
  });

  test("detects repeated elements in XML as arrays", () => {
    const xmlWithRepeated = `<root>
      <item>first</item>
      <item>second</item>
    </root>`;
    
    const sd = createFhirLogicalModelFromXml(xmlWithRepeated);
    const elements = sd.differential?.element || [];
    
    const itemElement = elements.find(e => e.path === 'root.item');
    expect(itemElement).toBeDefined();
    expect(itemElement?.max).toBe('*');
  });

  test("detects repeated complex elements in XML as arrays", () => {
    const xmlWithComplexRepeated = `<root>
      <contact>
        <name>John</name>
        <phone>555-1234</phone>
        <active>true</active>
      </contact>
      <contact>
        <name>Jane</name>
        <phone>555-5678</phone>
        <active>false</active>
      </contact>
    </root>`;
    
    const sd = createFhirLogicalModelFromXml(xmlWithComplexRepeated);
    const elements = sd.differential?.element || [];
    
    // The contact element should be marked as repeating
    const contactElement = elements.find(e => e.path === 'root.contact');
    expect(contactElement).toBeDefined();
    expect(contactElement?.max).toBe('*');
    
    // Child elements should be present
    const nameElement = elements.find(e => e.path === 'root.contact.name');
    expect(nameElement).toBeDefined();
    
    const phoneElement = elements.find(e => e.path === 'root.contact.phone');
    expect(phoneElement).toBeDefined();
    
    const activeElement = elements.find(e => e.path === 'root.contact.active');
    expect(activeElement).toBeDefined();
  });
});

describe("createFhirLogicalModel - Type inference", () => {
  test("infers date type", () => {
    const jsonWithDate = `{"birthDate": "2024-01-15"}`;
    const sd = createFhirLogicalModelFromJson(jsonWithDate, 'root');
    const elements = sd.differential?.element || [];
    
    const dateElement = elements.find(e => e.path === 'root.birthDate');
    expect(dateElement?.type?.[0]?.code).toBe('date');
  });

  test("infers dateTime type", () => {
    const jsonWithDateTime = `{"timestamp": "2024-01-15T10:30:00Z"}`;
    const sd = createFhirLogicalModelFromJson(jsonWithDateTime, 'root');
    const elements = sd.differential?.element || [];
    
    const dateTimeElement = elements.find(e => e.path === 'root.timestamp');
    expect(dateTimeElement?.type?.[0]?.code).toBe('dateTime');
  });

  test("infers url type", () => {
    const jsonWithUrl = `{"website": "https://example.org"}`;
    const sd = createFhirLogicalModelFromJson(jsonWithUrl, 'root');
    const elements = sd.differential?.element || [];
    
    const urlElement = elements.find(e => e.path === 'root.website');
    expect(urlElement?.type?.[0]?.code).toBe('url');
  });

  test("infers negative integer type", () => {
    const jsonWithNegative = `{"offset": -5}`;
    const sd = createFhirLogicalModelFromJson(jsonWithNegative, 'root');
    const elements = sd.differential?.element || [];
    
    const intElement = elements.find(e => e.path === 'root.offset');
    expect(intElement?.type?.[0]?.code).toBe('integer');
  });
});

describe("createFhirLogicalModel - FHIR Resource Detection", () => {
  test("rejects JSON with resourceType property", () => {
    const fhirJson = `{
      "resourceType": "Patient",
      "id": "example",
      "name": [{"family": "Doe", "given": ["John"]}]
    }`;
    
    expect(() => createFhirLogicalModelFromJson(fhirJson, 'root')).toThrow('Input appears to be a FHIR resource');
  });

  test("rejects XML with FHIR namespace", () => {
    const fhirXml = `<Patient xmlns="http://hl7.org/fhir">
      <id value="example"/>
      <name>
        <family value="Doe"/>
        <given value="John"/>
      </name>
    </Patient>`;
    
    expect(() => createFhirLogicalModelFromXml(fhirXml)).toThrow('Input appears to be a FHIR resource');
  });

  test("accepts JSON without resourceType property", () => {
    const nonFhirJson = `{
      "patient": {
        "id": "example",
        "name": "John Doe"
      }
    }`;
    
    const sd = createFhirLogicalModelFromJson(nonFhirJson, 'root');
    expect(sd).toBeDefined();
    expect(sd.resourceType).toBe('StructureDefinition');
  });

  test("accepts XML without FHIR namespace", () => {
    const nonFhirXml = `<patient>
      <id>example</id>
      <name>John Doe</name>
    </patient>`;
    
    const sd = createFhirLogicalModelFromXml(nonFhirXml);
    expect(sd).toBeDefined();
    expect(sd.resourceType).toBe('StructureDefinition');
  });

  test("auto-detect rejects FHIR JSON", () => {
    const fhirJson = `{"resourceType": "Observation", "status": "final"}`;
    
    expect(() => createFhirLogicalModel(fhirJson)).toThrow('Input appears to be a FHIR resource');
  });

  test("auto-detect rejects FHIR XML", () => {
    const fhirXml = `<Bundle xmlns="http://hl7.org/fhir"><type value="collection"/></Bundle>`;
    
    expect(() => createFhirLogicalModel(fhirXml)).toThrow('Input appears to be a FHIR resource');
  });
});
