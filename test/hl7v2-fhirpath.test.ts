import { describe, expect, test } from "@jest/globals";
import {
  defaultHl7v2Message,
  formatHl7v2Message,
  isHl7v2Content,
  parseHl7v2,
  parseHl7v2Message,
} from "../helpers/hl7v2_parser";
import { findNodeByPath } from "../helpers/json_parser";
import {
  evaluateExpressionUsingFhirpathJs,
  evaluateFhirPathExpression,
} from "../helpers/fhirpath_api_engine";
import { validateFhirpathExpression } from "../helpers/fhirpath_validator";
import { registeredEngines } from "../types/fhirpath_test_engine";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-text";
import {
  Rules as FhirPathHighlightRules,
  setCustomHighlightRules,
} from "../helpers/fhirpath_highlighter";
import { Hl7v2HighlightRules, defaultHl7v2Expression } from "../helpers/hl7v2_parser";

describe("HL7 v2 parser and positional AST", () => {
  test("detects HL7 v2 messages and formats lines", () => {
    expect(isHl7v2Content(defaultHl7v2Message)).toBe(true);
    expect(isHl7v2Content('{"resourceType": "Patient"}')).toBe(false);
    expect(isHl7v2Content("<Patient/>")).toBe(false);
    expect(formatHl7v2Message("MSH|^~\\&|A\r\n\r\nPID|1")).toBe("MSH|^~\\&|A\nPID|1");
  });

  test("numbers MSH-1 as field[1] and MSH-2 as field[2] without splitting encoding chars", () => {
    const parsed = parseHl7v2Message(defaultHl7v2Message);
    const msh = parsed.message.segment[0];
    expect(msh.code).toBe("MSH");
    // MSH-1 is '|'
    expect(msh.field[0].element[0].text).toBe("|");
    // MSH-2 is '^~\&' (not split on ^, ~, or \)
    expect(msh.field[1].element[0].text).toBe("^~\\&");
    expect(msh.field[1].element[0].component).toBeUndefined();
    // MSH-3 is SendingApp
    expect(msh.field[2].element[0].text).toBe("SendingApp");
    // MSH-9 is ORU^R01^ORU_R01
    expect(msh.field[8].element[0].component[0].text).toBe("ORU");
    expect(msh.field[8].element[0].component[1].text).toBe("R01");
    expect(msh.field[8].element[0].component[2].text).toBe("ORU_R01");
  });

  test("decodes HL7 v2 escape sequences in simple text", () => {
    const msg = [
      "MSH|^~\\&|App|Fac|RApp|RFac|20250101120000||ADT^A01^ADT_A01|1|P|2.5",
      "PID|1||12345^^^HOSP^MR||Smith\\F\\Jones^John\\S\\Jr",
    ].join("\n");
    const parsed = parseHl7v2Message(msg);
    const pid = parsed.message.segment[1];
    expect(pid.field[4].element[0].component[0].text).toBe("Smith|Jones");
    expect(pid.field[4].element[0].component[1].text).toBe("John^Jr");
  });

  test("handles bare CR (\\r) wire terminators, MLLP framing, blank lines, and indentation", () => {
    const wireMsg =
      "\x0b  MSH|^~\\&|App|Fac|RApp|RFac|20250101120000||ADT^A01^ADT_A01|1|P|2.5\r\r  PID|1||12345^^^HOSP^MR||Doe^Jane\x1c\r";
    expect(isHl7v2Content(wireMsg)).toBe(true);
    const parsed = parseHl7v2Message(wireMsg);
    expect(parsed.message.segment).toHaveLength(2);
    expect(parsed.message.segment[0].code).toBe("MSH");
    expect(parsed.message.segment[0].field[1].element[0].text).toBe("^~\\&");
    expect(parsed.message.segment[1].code).toBe("PID");
    expect(parsed.message.segment[1].field[4].element[0].component[0].text).toBe("Doe");
    expect(parsed.message.segment[1].field[4].element[0].component[1].text).toBe("Jane");
  });

  test("builds 1-based positional AST paths for ResourceEditor navigation", () => {
    const ast = parseHl7v2(defaultHl7v2Message);
    const pidSegmentNode = findNodeByPath(ast, "Message.segment[2]");
    expect(pidSegmentNode).toBeDefined();
    expect(pidSegmentNode?.position?.line).toBe(2);

    const pidField3Elem1Comp5 = findNodeByPath(
      ast,
      "Message.segment[2].field[3].element[1].component[5]"
    );
    expect(pidField3Elem1Comp5).toBeDefined();
    expect(pidField3Elem1Comp5?.position?.line).toBe(2);
    const slice = defaultHl7v2Message.substring(
      pidField3Elem1Comp5!.position!.prop_start_pos,
      pidField3Elem1Comp5!.position!.value_stop_pos! + 1
    );
    expect(slice).toBe("MR");
  });
});

describe("FHIRPath on HL7 v2 specification examples", () => {
  const evalV2 = async (expression: string, message: string = defaultHl7v2Message) => {
    return evaluateExpressionUsingFhirpathJs(
      {
        expression,
        resourceJson: message,
        enableDebugTrace: true,
      },
      "hl7v2"
    );
  };

  test("Example 1: Message.segment.where(code = 'PID').count() = 1", async () => {
    const res = await evalV2("Message.segment.where(code = 'PID').count() = 1");
    expect(res.results).toHaveLength(1);
    expect(res.results[0].result).toHaveLength(1);
    expect(res.results[0].result[0].value).toBe(true);
    expect(res.results[0].result[0].type).toBe("Boolean");
  });

  test("Example 2: (Message.segment[1].code = 'MSH') and (Message.segment.tail().code !~ 'MSH')", async () => {
    const res = await evalV2(
      "(Message.segment[1].code = 'MSH') and (Message.segment.tail().code !~ 'MSH')"
    );
    expect(res.results).toHaveLength(1);
    expect(res.results[0].result).toHaveLength(1);
    expect(res.results[0].result[0].value).toBe(true);
  });

  test("Example 3: Message.segment.where(code = 'PID').field[3].element.where(component[5].simple() = 'MR').exists()", async () => {
    const res = await evalV2(
      "Message.segment.where(code = 'PID').field[3].element.where(component[5].simple() = 'MR').exists()"
    );
    expect(res.results).toHaveLength(1);
    expect(res.results[0].result).toHaveLength(1);
    expect(res.results[0].result[0].value).toBe(true);
  });

  test("Example 4: Message.segment.where(code = 'PV1').field[9].elements().count() = 1", async () => {
    const res = await evalV2(
      "Message.segment.where(code = 'PV1').field[9].elements().count() = 1"
    );
    expect(res.results).toHaveLength(1);
    expect(res.results[0].result).toHaveLength(1);
    expect(res.results[0].result[0].value).toBe(true);
  });

  test("Example 5: Message.group('PATIENT').group('PATIENT_OBSERVATION').segment.where(code='OBX').field[2].element.all($this.simple() in ('ST' | 'TX'))", async () => {
    const res = await evalV2(
      "Message.group('PATIENT').group('PATIENT_OBSERVATION').segment.where(code='OBX').field[2].element.all($this.simple() in ('ST' | 'TX'))"
    );
    expect(res.results).toHaveLength(1);
    expect(res.results[0].result).toHaveLength(1);
    expect(res.results[0].result[0].value).toBe(true);
  });

  test("supports implicit string conversion on simple Cell nodes and 1-based context paths", async () => {
    const res = await evalV2(
      "Message.segment.where(code = 'PID').field[5].element[1].component[1]"
    );
    expect(res.results).toHaveLength(1);
    expect(res.results[0].result).toHaveLength(1);
    expect(res.results[0].result[0].type).toBe("Component");
    expect(res.results[0].result[0].path).toBe(
      "Message.segment[2].field[5].element[1].component[1]"
    );

    const eqRes = await evalV2(
      "Message.segment.where(code = 'PID').field[5].element[1].component[1] = 'Chalmers'"
    );
    expect(eqRes.results[0].result[0].value).toBe(true);
  });

  test("simple() on a complex cell returns simple() of its first component", async () => {
    const res = await evalV2(
      "Message.segment.where(code = 'PID').field[5].element[1].simple()"
    );
    expect(res.results[0].result).toHaveLength(1);
    expect(res.results[0].result[0].value).toBe("Chalmers");
  });

  test("raises an error when group(name) references a group not defined in the message structure", async () => {
    const res = await evalV2("Message.group('INSURANCE')");
    expect(res.showOutcome).toBe(true);
    expect(res.saveOutcome?.issue?.[0]?.details?.text).toContain(
      "is not defined in message structure"
    );
  });

  test("evaluates via evaluateFhirPathExpression with registered fhirpath.js (hl7v2) engine", async () => {
    const engine = registeredEngines["fhirpath.js (hl7v2)"];
    expect(engine).toBeDefined();
    expect(engine.fhirVersion).toBe("hl7v2");

    const res = await evaluateFhirPathExpression(
      {
        expression: "Message.groups().name",
        resourceJson: defaultHl7v2Message,
      },
      engine
    );
    expect(res.results[0].result.map((r) => JSON.parse(r.value))).toEqual([
      "PATIENT_RESULT",
      "PATIENT",
      "PATIENT_OBSERVATION",
      "VISIT",
      "ORDER_OBSERVATION",
      "OBSERVATION",
      "OBSERVATION",
    ]);
  });
});

describe("FHIRPath validator with hl7v2 model", () => {
  test("validates HL7 v2 FHIRPath expressions without spurious errors", () => {
    const validation = validateFhirpathExpression(
      "Message.group('PATIENT').group('PATIENT_OBSERVATION').segment.where(code='OBX').field[2].element.all($this.simple() in ('ST' | 'TX'))",
      {
        fhirVersion: "hl7v2",
        contextType: "Message",
      }
    );
    expect(validation.parseDebugTree).toBeDefined();
    const errors = validation.diagnostics.filter((d) => d.severity === "error");
    expect(errors).toHaveLength(0);
  });

  test("setCustomHighlightRules isolates mode tokenizers across multiple editors when switching to hl7v2", () => {
    const EditSession = ace.require("ace/edit_session").EditSession;
    const createMockEditor = (text: string) => {
      const session = new EditSession(text, "ace/mode/text");
      return {
        session,
        getSession: () => session,
        commands: { bindKey: () => {} },
      } as unknown as ace.Ace.Editor;
    };

    const contextEditor = createMockEditor("name");
    const exprEditor = createMockEditor("trace('trc').given.join(' ')");
    const resourceEditor = createMockEditor(defaultHl7v2Message);

    setCustomHighlightRules(contextEditor, FhirPathHighlightRules);
    setCustomHighlightRules(exprEditor, FhirPathHighlightRules);
    setCustomHighlightRules(resourceEditor, Hl7v2HighlightRules, true);

    // Modes must be distinct instances, not a mutated shared singleton
    expect(contextEditor.session.getMode()).not.toBe(resourceEditor.session.getMode());
    expect(exprEditor.session.getMode()).not.toBe(resourceEditor.session.getMode());

    // Tokenizing lines on all three editors must succeed without throwing onMatch errors
    const exprTokenizer = exprEditor.session.getMode().getTokenizer();
    const exprTokens = exprTokenizer.getLineTokens(defaultHl7v2Expression, "start");
    expect(exprTokens.tokens.length).toBeGreaterThan(5);

    const hl7Tokenizer = resourceEditor.session.getMode().getTokenizer();
    const hl7Tokens = hl7Tokenizer.getLineTokens(
      defaultHl7v2Message.split("\n")[0],
      "start"
    );
    expect(hl7Tokens.tokens[0]).toEqual({ type: "keyword", value: "MSH" });

    (contextEditor.session as any).bgTokenizer?.stop();
    (exprEditor.session as any).bgTokenizer?.stop();
    (resourceEditor.session as any).bgTokenizer?.stop();
  });
});
