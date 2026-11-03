/**
 * HL7 v2 Parser, Abstract Message Syntax Group Matcher, and FHIRPath Object Model Builder.
 *
 * Portions adapted from Rethink Health's @glion/parser and @glion/transform-profile-groups
 * (https://github.com/rethinkhealth/glion), licensed under the MIT License:
 * Copyright (c) 2025 Rethink Health, PBC. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation files
 * to deal in the Software without restriction under the MIT License.
 *
 * Implements the HL7 v2 Object Model for FHIRPath as specified in:
 * https://hl7.org/fhirpath/en/appendices.html ("Use of FHIRPath on HL7 Version 2 messages")
 */

import type { IJsonNode, IJsonNodePosition } from "./json_parser";

export interface Delimiters {
  segment: string;
  field: string;
  component: string;
  repetition: string;
  escape: string;
  subcomponent: string;
}

export const DEFAULT_DELIMITERS: Delimiters = {
  segment: "\r",
  field: "|",
  component: "^",
  repetition: "~",
  escape: "\\",
  subcomponent: "&",
};

export interface Point {
  /** 1-based line number */
  line: number;
  /** 1-based column number */
  column: number;
  /** 0-based character offset */
  offset: number;
}

export interface SourcePosition {
  start: Point;
  end: Point;
}

// ============================================================================
// FHIRPath HL7 v2 Object Model Interfaces (https://hl7.org/fhirpath/en/appendices.html)
// ============================================================================

export interface Hl7v2CellObject {
  text?: string;
  value?: string;
}

export interface Hl7v2SubComponentObject extends Hl7v2CellObject {
  resourceType?: "SubComponent";
}

export interface Hl7v2ComponentObject extends Hl7v2CellObject {
  resourceType?: "Component";
  subcomponent?: Hl7v2SubComponentObject[];
}

export interface Hl7v2ElementObject extends Hl7v2CellObject {
  resourceType?: "Element";
  component?: Hl7v2ComponentObject[];
}

export interface Hl7v2FieldObject {
  resourceType?: "Field";
  element?: Hl7v2ElementObject[];
}

export interface Hl7v2SegmentObject {
  resourceType?: "Segment";
  code: string;
  field: Hl7v2FieldObject[];
}

export type Hl7v2BaseItem = Hl7v2SegmentObject | Hl7v2GroupObject;

export interface Hl7v2GroupObject {
  resourceType?: "Group";
  name: string;
  item: Hl7v2BaseItem[];
  segment: Hl7v2SegmentObject[];
  group: Hl7v2GroupObject[];
}

export interface Hl7v2MessageObject {
  resourceType: "Message";
  segment: Hl7v2SegmentObject[];
  group?: Hl7v2GroupObject[];
  __groupError?: string;
}

// ============================================================================
// Raw AST Interfaces (Tokenizer + Parser)
// ============================================================================

interface RawSubcomponent {
  value: string;
  position: SourcePosition;
}

interface RawComponent {
  children: RawSubcomponent[];
  position: SourcePosition;
}

interface RawFieldRepeat {
  children: RawComponent[];
  position: SourcePosition;
}

interface RawField {
  children: RawFieldRepeat[];
  position: SourcePosition;
}

interface RawSegment {
  name: string;
  children: RawField[];
  position: SourcePosition;
}

interface RawRoot {
  delimiters: Delimiters;
  children: RawSegment[];
  position: SourcePosition;
}

const enum TokenType {
  TEXT = 1,
  FIELD_DELIM = 2,
  REPEAT_DELIM = 3,
  COMPONENT_DELIM = 4,
  SUBCOMPONENT_DELIM = 5,
  SEGMENT_END = 6,
  EOF = 7,
}

interface Token {
  type: TokenType;
  value: string;
  position: SourcePosition;
}

const HEADER_SEGMENTS = new Set(["MSH", "FHS", "BHS"]);

function isAsciiLetterOrDigit(code: number): boolean {
  return (
    (code >= 65 && code <= 90) || // A-Z
    (code >= 97 && code <= 122) || // a-z
    (code >= 48 && code <= 57) // 0-9
  );
}

/**
 * Detect whether a text string looks like an HL7 v2 pipe-delimited message.
 */
export function isHl7v2Content(content: string): boolean {
  if (!content) return false;
  const trimmed = content.replace(/^[\s\x0b\x1c]+/, "");
  if (trimmed.length < 4) return false;
  if (trimmed.startsWith("{") || trimmed.startsWith("[") || trimmed.startsWith("<")) {
    return false;
  }
  const seg = trimmed.slice(0, 3);
  const sep = trimmed.charAt(3);
  if (HEADER_SEGMENTS.has(seg) && !isAsciiLetterOrDigit(sep.charCodeAt(0))) {
    return true;
  }
  // Also allow snippet messages starting with a 3-char uppercase segment code + pipe
  if (/^[A-Z][A-Z0-9]{2}\|/.test(trimmed)) {
    return true;
  }
  return false;
}

/**
 * Discover delimiters from MSH/FHS/BHS header segment, or fall back to defaults.
 */
export function discoverDelimiters(input: string): Delimiters {
  const lines = input.split(/\r\n|\r|\n/);
  for (const line of lines) {
    const trimmed = line.replace(/^[\s\x0b\x1c]+/, "");
    if (trimmed.length >= 4 && HEADER_SEGMENTS.has(trimmed.slice(0, 3))) {
      const field = trimmed.charAt(3) || "|";
      const nextFieldIdx = trimmed.indexOf(field, 4);
      const msh2 = nextFieldIdx > 4 ? trimmed.slice(4, nextFieldIdx) : trimmed.slice(4, 8);
      return {
        segment: "\r",
        field,
        component: msh2.charAt(0) || "^",
        repetition: msh2.charAt(1) || "~",
        escape: msh2.charAt(2) || "\\",
        subcomponent: msh2.charAt(3) || "&",
      };
    }
  }
  return { ...DEFAULT_DELIMITERS };
}

/**
 * Decode HL7 v2 escape sequences (e.g. \F\, \S\, \T\, \R\, \E\, \.br\, \X.. \, \C..\, \M..\)
 */
export function decodeHl7v2Escapes(value: string, delimiters: Delimiters): string {
  const esc = delimiters.escape;
  if (!esc || !value || !value.includes(esc)) {
    return value;
  }
  let result = "";
  let i = 0;
  const len = value.length;

  while (i < len) {
    const escStart = value.indexOf(esc, i);
    if (escStart === -1) {
      result += value.slice(i);
      break;
    }
    result += value.slice(i, escStart);
    const escEnd = value.indexOf(esc, escStart + esc.length);
    if (escEnd === -1) {
      // Unclosed escape — keep literal rest
      result += value.slice(escStart);
      break;
    }
    const seq = value.slice(escStart + esc.length, escEnd);
    switch (seq) {
      case "F":
        result += delimiters.field;
        break;
      case "S":
        result += delimiters.component;
        break;
      case "T":
        result += delimiters.subcomponent;
        break;
      case "R":
        result += delimiters.repetition;
        break;
      case "E":
        result += delimiters.escape;
        break;
      case ".br":
        result += "\n";
        break;
      case ".sp":
        result += " ";
        break;
      default:
        if ((seq.startsWith("X") || seq.startsWith("x")) && seq.length > 1) {
          const hex = seq.slice(1);
          if (/^[0-9A-Fa-f]+$/.test(hex) && hex.length % 2 === 0) {
            const bytes: number[] = [];
            for (let b = 0; b < hex.length; b += 2) {
              bytes.push(parseInt(hex.slice(b, b + 2), 16));
            }
            try {
              result += new TextDecoder().decode(new Uint8Array(bytes));
            } catch {
              result += String.fromCharCode(...bytes);
            }
          } else {
            result += esc + seq + esc;
          }
        } else {
          // Unknown or formatting escape (e.g. \H\, \N\, \.in\): preserve raw sequence
          result += esc + seq + esc;
        }
        break;
    }
    i = escEnd + esc.length;
  }

  return result;
}

// ============================================================================
// HL7v2 Tokenizer & Parser (adapted from @glion/parser)
// ============================================================================

class HL7v2Tokenizer {
  private readonly input: string;
  private readonly delimiters: Delimiters;
  private offset = 0;
  private line = 1;
  private column = 1;
  private atSegmentStart = true;
  private readonly pendingBootstrap: Token[] = [];

  constructor(input: string, delimiters: Delimiters) {
    this.input = input;
    this.delimiters = delimiters;
  }

  next(): Token {
    if (this.pendingBootstrap.length > 0) {
      return this.pendingBootstrap.shift()!;
    }

    if (this.offset >= this.input.length) {
      const pt = this.point();
      return {
        type: TokenType.EOF,
        value: "",
        position: { start: pt, end: pt },
      };
    }

    if (this.atSegmentStart) {
      // Skip leading horizontal whitespace or MLLP framing bytes (\x0b VT, \x1c FS) at segment start
      while (this.offset < this.input.length) {
        const leadCh = this.input.charAt(this.offset);
        if (leadCh === " " || leadCh === "\t" || leadCh === "\x0b" || leadCh === "\x1c") {
          this.advance(1);
        } else {
          break;
        }
      }
      if (this.offset >= this.input.length) {
        const pt = this.point();
        return {
          type: TokenType.EOF,
          value: "",
          position: { start: pt, end: pt },
        };
      }
      const nextCh = this.input.charAt(this.offset);
      if (nextCh === "\r" || nextCh === "\n") {
        return this.consumeSegmentEnd(this.point());
      }
      this.atSegmentStart = false;
      const segPrefix = this.input.slice(this.offset, this.offset + 3);
      if (
        HEADER_SEGMENTS.has(segPrefix) &&
        this.offset + 3 < this.input.length &&
        this.input.charAt(this.offset + 3) === this.delimiters.field
      ) {
        return this.bootstrapHeader();
      }
    }

    const start = this.point();
    const ch = this.input.charAt(this.offset);

    if (ch === "\r" || ch === "\n") {
      return this.consumeSegmentEnd(start);
    }

    if (ch === this.delimiters.field) {
      this.advance(1);
      return {
        type: TokenType.FIELD_DELIM,
        value: ch,
        position: { start, end: this.point() },
      };
    }

    if (ch === this.delimiters.repetition) {
      this.advance(1);
      return {
        type: TokenType.REPEAT_DELIM,
        value: ch,
        position: { start, end: this.point() },
      };
    }

    if (ch === this.delimiters.component) {
      this.advance(1);
      return {
        type: TokenType.COMPONENT_DELIM,
        value: ch,
        position: { start, end: this.point() },
      };
    }

    if (ch === this.delimiters.subcomponent) {
      this.advance(1);
      return {
        type: TokenType.SUBCOMPONENT_DELIM,
        value: ch,
        position: { start, end: this.point() },
      };
    }

    return this.consumeText(start);
  }

  private bootstrapHeader(): Token {
    const nameStart = this.point();
    const name = this.input.slice(this.offset, this.offset + 3);
    this.advance(3);
    const nameEnd = this.point();

    // MSH-1: the field separator character itself
    const msh1Start = this.point();
    const msh1Char = this.input.charAt(this.offset);
    this.advance(1);
    const msh1End = this.point();

    this.pendingBootstrap.push(
      {
        type: TokenType.FIELD_DELIM,
        value: msh1Char,
        position: { start: msh1Start, end: msh1End },
      },
      {
        type: TokenType.TEXT,
        value: msh1Char,
        position: { start: msh1Start, end: msh1End },
      }
    );

    // MSH-2: encoding characters up to next field separator or line break
    const msh2Start = this.point();
    let msh2EndOffset = this.offset;
    while (
      msh2EndOffset < this.input.length &&
      this.input.charAt(msh2EndOffset) !== this.delimiters.field &&
      this.input.charAt(msh2EndOffset) !== "\r" &&
      this.input.charAt(msh2EndOffset) !== "\n"
    ) {
      msh2EndOffset++;
    }
    const msh2Value = this.input.slice(this.offset, msh2EndOffset);
    this.advance(msh2EndOffset - this.offset);
    const msh2End = this.point();

    this.pendingBootstrap.push(
      {
        type: TokenType.FIELD_DELIM,
        value: "",
        position: { start: msh2Start, end: msh2Start },
      },
      {
        type: TokenType.TEXT,
        value: msh2Value,
        position: { start: msh2Start, end: msh2End },
      }
    );

    return {
      type: TokenType.TEXT,
      value: name,
      position: { start: nameStart, end: nameEnd },
    };
  }

  private consumeSegmentEnd(start: Point): Token {
    const ch = this.input.charAt(this.offset);
    if (ch === "\r" && this.input.charAt(this.offset + 1) === "\n") {
      this.offset += 2;
    } else {
      this.offset += 1;
    }
    this.line += 1;
    this.column = 1;
    this.atSegmentStart = true;
    const end = this.point();
    return {
      type: TokenType.SEGMENT_END,
      value: "\n",
      position: { start, end },
    };
  }

  private consumeText(start: Point): Token {
    const startOffset = this.offset;
    while (this.offset < this.input.length) {
      const ch = this.input.charAt(this.offset);
      if (
        ch === "\r" ||
        ch === "\n" ||
        ch === "\x1c" ||
        ch === this.delimiters.field ||
        ch === this.delimiters.repetition ||
        ch === this.delimiters.component ||
        ch === this.delimiters.subcomponent
      ) {
        if (ch === "\x1c") {
          const token: Token = {
            type: TokenType.TEXT,
            value: this.input.slice(startOffset, this.offset),
            position: { start, end: this.point() },
          };
          this.advance(1);
          return token;
        }
        break;
      }
      this.advance(1);
    }
    return {
      type: TokenType.TEXT,
      value: this.input.slice(startOffset, this.offset),
      position: { start, end: this.point() },
    };
  }

  private point(): Point {
    return {
      line: this.line,
      column: this.column,
      offset: this.offset,
    };
  }

  private advance(count: number): void {
    this.offset += count;
    this.column += count;
  }
}

function parseRawAst(input: string): RawRoot {
  const delimiters = discoverDelimiters(input);
  const tokenizer = new HL7v2Tokenizer(input, delimiters);
  const segments: RawSegment[] = [];

  let currentSegment: RawSegment | undefined;
  let currentField: RawField | undefined;
  let currentRepeat: RawFieldRepeat | undefined;
  let currentComponent: RawComponent | undefined;
  let currentSubcomponent: RawSubcomponent | undefined;
  let expectingSegmentName = true;

  const ensureSubcomponent = (pt: Point): RawSubcomponent => {
    if (!currentSubcomponent) {
      currentSubcomponent = {
        value: "",
        position: { start: { ...pt }, end: { ...pt } },
      };
    }
    return currentSubcomponent;
  };

  const closeSubcomponent = (pt: Point) => {
    const sub = ensureSubcomponent(pt);
    if (!currentComponent) {
      currentComponent = {
        children: [],
        position: { start: { ...sub.position.start }, end: { ...sub.position.end } },
      };
    }
    currentComponent.children.push(sub);
    currentComponent.position.end = { ...sub.position.end };
    currentSubcomponent = undefined;
  };

  const closeComponent = (pt: Point) => {
    closeSubcomponent(pt);
    if (!currentRepeat) {
      currentRepeat = {
        children: [],
        position: {
          start: { ...currentComponent!.position.start },
          end: { ...currentComponent!.position.end },
        },
      };
    }
    currentRepeat.children.push(currentComponent!);
    currentRepeat.position.end = { ...currentComponent!.position.end };
    currentComponent = undefined;
  };

  const closeRepeat = (pt: Point) => {
    closeComponent(pt);
    if (!currentField) {
      currentField = {
        children: [],
        position: {
          start: { ...currentRepeat!.position.start },
          end: { ...currentRepeat!.position.end },
        },
      };
    }
    currentField.children.push(currentRepeat!);
    currentField.position.end = { ...currentRepeat!.position.end };
    currentRepeat = undefined;
  };

  const closeField = (pt: Point) => {
    if (!currentField && !currentRepeat && !currentComponent && !currentSubcomponent) {
      return;
    }
    closeRepeat(pt);
    if (currentSegment && currentField) {
      currentSegment.children.push(currentField);
      currentSegment.position.end = { ...currentField.position.end };
    }
    currentField = undefined;
  };

  const closeSegment = (pt: Point) => {
    if (!currentSegment) return;
    closeField(pt);
    if (currentSegment.name.trim().length > 0) {
      segments.push(currentSegment);
    }
    currentSegment = undefined;
    expectingSegmentName = true;
  };

  let token = tokenizer.next();
  const rootStart: Point = { ...token.position.start };

  while (token.type !== TokenType.EOF) {
    switch (token.type) {
      case TokenType.TEXT: {
        if (expectingSegmentName) {
          currentSegment = {
            name: token.value.trim(),
            children: [],
            position: {
              start: { ...token.position.start },
              end: { ...token.position.end },
            },
          };
          expectingSegmentName = false;
        } else {
          currentSubcomponent = {
            value: token.value,
            position: {
              start: { ...token.position.start },
              end: { ...token.position.end },
            },
          };
        }
        break;
      }
      case TokenType.FIELD_DELIM: {
        if (expectingSegmentName) {
          // Empty segment name before delimiter
          currentSegment = {
            name: "",
            children: [],
            position: {
              start: { ...token.position.start },
              end: { ...token.position.end },
            },
          };
          expectingSegmentName = false;
        }
        if (currentField || currentRepeat || currentComponent || currentSubcomponent) {
          closeField(token.position.start);
        }
        // Start a new field beginning after the delimiter
        const fieldStart = { ...token.position.end };
        currentField = {
          children: [],
          position: { start: fieldStart, end: fieldStart },
        };
        break;
      }
      case TokenType.REPEAT_DELIM: {
        closeRepeat(token.position.start);
        const repStart = { ...token.position.end };
        currentRepeat = {
          children: [],
          position: { start: repStart, end: repStart },
        };
        break;
      }
      case TokenType.COMPONENT_DELIM: {
        closeComponent(token.position.start);
        const compStart = { ...token.position.end };
        currentComponent = {
          children: [],
          position: { start: compStart, end: compStart },
        };
        break;
      }
      case TokenType.SUBCOMPONENT_DELIM: {
        closeSubcomponent(token.position.start);
        const subStart = { ...token.position.end };
        currentSubcomponent = {
          value: "",
          position: { start: subStart, end: subStart },
        };
        break;
      }
      case TokenType.SEGMENT_END: {
        closeSegment(token.position.start);
        break;
      }
    }
    token = tokenizer.next();
  }

  closeSegment(token.position.start);

  return {
    delimiters,
    children: segments,
    position: {
      start: rootStart,
      end: { ...token.position.end },
    },
  };
}

// ============================================================================
// Abstract Message Syntax Pike VM Group Engine (adapted from @glion)
// ============================================================================

export interface SegmentSchemaElement {
  type: "segment";
  id: string;
  min: number;
  max: number;
}

export interface GroupSchemaElement {
  type: "group";
  id: string;
  min: number;
  max: number;
  elements: SchemaElement[];
}

export type SchemaElement = SegmentSchemaElement | GroupSchemaElement;

type Instruction =
  | { op: "seg"; id: string }
  | { op: "split"; x: number; y: number }
  | { op: "jmp"; target: number }
  | { op: "openGroup"; name: string; repeat: boolean }
  | { op: "closeGroup"; name: string }
  | { op: "accept" };

interface Program {
  code: Instruction[];
}

type TraceEvent =
  | { kind: "open-group"; name: string; repeat: boolean }
  | { kind: "close-group"; name: string }
  | { kind: "seg"; segIdx: number };

interface Thread {
  pc: number;
  events: TraceEvent[];
}

function compileSchema(root: GroupSchemaElement): Program {
  const code: Instruction[] = [];

  function emitElement(el: SchemaElement): void {
    const optional = el.min === 0;
    const repeatable = el.max > 1 || el.max === -1;

    if (optional && !repeatable) {
      // ? (0..1): split(body, after)
      const splitIdx = code.length;
      code.push({ op: "split", x: 0, y: 0 });
      const bodyStart = code.length;
      emitSingle(el);
      const afterIdx = code.length;
      code[splitIdx] = { op: "split", x: bodyStart, y: afterIdx };
    } else if (!optional && repeatable) {
      // + (1..*): bodyStart: single; split(bodyStart, after)
      const bodyStart = code.length;
      emitSingle(el);
      const splitIdx = code.length;
      code.push({ op: "split", x: bodyStart, y: splitIdx + 1 });
    } else if (optional && repeatable) {
      // * (0..*): loopStart: split(bodyStart, after); bodyStart: single; jmp(loopStart)
      const loopStart = code.length;
      code.push({ op: "split", x: 0, y: 0 });
      const bodyStart = code.length;
      emitSingle(el);
      code.push({ op: "jmp", target: loopStart });
      const afterIdx = code.length;
      code[loopStart] = { op: "split", x: bodyStart, y: afterIdx };
    } else {
      // (1..1)
      emitSingle(el);
    }
  }

  function emitSingle(el: SchemaElement): void {
    if (el.type === "segment") {
      code.push({ op: "seg", id: el.id });
    } else {
      const repeat = el.max > 1 || el.max === -1;
      code.push({ op: "openGroup", name: el.id, repeat });
      for (const child of el.elements) {
        emitElement(child);
      }
      code.push({ op: "closeGroup", name: el.id });
    }
  }

  for (const child of root.elements) {
    emitElement(child);
  }
  code.push({ op: "accept" });
  return { code };
}

function runProgram(
  program: Program,
  segmentCodes: string[]
): { matched: boolean; events: TraceEvent[]; failedAtIndex?: number } {
  const { code } = program;

  function addThread(list: Thread[], visited: Set<number>, thread: Thread): void {
    if (visited.has(thread.pc)) return;
    visited.add(thread.pc);

    const instr = code[thread.pc];
    if (!instr) return;

    switch (instr.op) {
      case "jmp":
        addThread(list, visited, { pc: instr.target, events: thread.events });
        break;
      case "split":
        // Greedy preference: try x first, then y
        addThread(list, visited, { pc: instr.x, events: thread.events });
        addThread(list, visited, { pc: instr.y, events: thread.events });
        break;
      case "openGroup":
        addThread(list, visited, {
          pc: thread.pc + 1,
          events: [
            ...thread.events,
            { kind: "open-group", name: instr.name, repeat: instr.repeat },
          ],
        });
        break;
      case "closeGroup":
        addThread(list, visited, {
          pc: thread.pc + 1,
          events: [...thread.events, { kind: "close-group", name: instr.name }],
        });
        break;
      case "seg":
      case "accept":
        list.push(thread);
        break;
    }
  }

  let currentList: Thread[] = [];
  addThread(currentList, new Set<number>(), { pc: 0, events: [] });

  for (let segIdx = 0; segIdx < segmentCodes.length; segIdx++) {
    const segCode = segmentCodes[segIdx];
    const nextList: Thread[] = [];
    const visited = new Set<number>();

    for (const thread of currentList) {
      const instr = code[thread.pc];
      if (instr && instr.op === "seg" && instr.id === segCode) {
        addThread(nextList, visited, {
          pc: thread.pc + 1,
          events: [...thread.events, { kind: "seg", segIdx }],
        });
      }
    }

    if (nextList.length === 0) {
      return { matched: false, events: [], failedAtIndex: segIdx };
    }
    currentList = nextList;
  }

  const accepted = currentList.find((t) => code[t.pc]?.op === "accept");
  if (!accepted) {
    return { matched: false, events: [], failedAtIndex: segmentCodes.length };
  }
  return { matched: true, events: accepted.events };
}

// Helper constructors for concise HL7 v2 Abstract Message Syntax schemas
const seg = (id: string, min = 0, max = 1): SegmentSchemaElement => ({
  type: "segment",
  id,
  min,
  max,
});
const grp = (
  id: string,
  min: number,
  max: number,
  elements: SchemaElement[]
): GroupSchemaElement => ({
  type: "group",
  id,
  min,
  max,
  elements,
});

/**
 * Standard HL7 v2 Abstract Message Syntax structure definitions.
 * Covers common clinical/administrative message structures (ORU_R01, ADT_A01..A61,
 * ORM_O01, RDE_O11, VXU_V04, SIU_S12, MDM_T02, DFT_P03, OML_O21, ACK).
 */
const MESSAGE_STRUCTURE_SCHEMAS: Record<string, GroupSchemaElement> = {
  ORU_R01: grp("ORU_R01", 1, 1, [
    seg("MSH", 1, 1),
    seg("SFT", 0, -1),
    seg("UAC", 0, 1),
    grp("PATIENT_RESULT", 1, -1, [
      grp("PATIENT", 0, 1, [
        seg("PID", 1, 1),
        seg("PD1", 0, 1),
        seg("PRT", 0, -1),
        seg("NTE", 0, -1),
        seg("NK1", 0, -1),
        seg("ARV", 0, -1),
        grp("PATIENT_OBSERVATION", 0, -1, [
          seg("OBX", 1, 1),
          seg("PRT", 0, -1),
          seg("NTE", 0, -1),
        ]),
        grp("VISIT", 0, 1, [
          seg("PV1", 1, 1),
          seg("PV2", 0, 1),
          seg("PRT", 0, -1),
        ]),
      ]),
      grp("ORDER_OBSERVATION", 0, -1, [
        seg("ORC", 0, 1),
        seg("OBR", 1, 1),
        seg("NTE", 0, -1),
        seg("PRT", 0, -1),
        grp("TIMING_QTY", 0, -1, [
          seg("TQ1", 1, 1),
          seg("TQ2", 0, -1),
        ]),
        seg("CTD", 0, 1),
        grp("OBSERVATION", 0, -1, [
          seg("OBX", 1, 1),
          seg("PRT", 0, -1),
          seg("NTE", 0, -1),
        ]),
        seg("FT1", 0, -1),
        seg("CTI", 0, -1),
        grp("SPECIMEN", 0, -1, [
          seg("SPM", 1, 1),
          seg("OBX", 0, -1),
        ]),
      ]),
    ]),
    seg("DSC", 0, 1),
  ]),

  ADT_A01: grp("ADT_A01", 1, 1, [
    seg("MSH", 1, 1),
    seg("SFT", 0, -1),
    seg("UAC", 0, 1),
    seg("EVN", 0, 1),
    seg("PID", 1, 1),
    seg("PD1", 0, 1),
    seg("ARV", 0, -1),
    seg("ROL", 0, -1),
    seg("NK1", 0, -1),
    seg("PV1", 1, 1),
    seg("PV2", 0, 1),
    seg("ARV", 0, -1),
    seg("ROL", 0, -1),
    seg("DB1", 0, -1),
    seg("OBX", 0, -1),
    seg("AL1", 0, -1),
    seg("DG1", 0, -1),
    seg("DRG", 0, 1),
    grp("PROCEDURE", 0, -1, [
      seg("PR1", 1, 1),
      seg("ROL", 0, -1),
    ]),
    seg("GT1", 0, -1),
    grp("INSURANCE", 0, -1, [
      seg("IN1", 1, 1),
      seg("IN2", 0, 1),
      seg("IN3", 0, -1),
      seg("ROL", 0, -1),
    ]),
    seg("ACC", 0, 1),
    seg("UB1", 0, 1),
    seg("UB2", 0, 1),
    seg("PDA", 0, 1),
  ]),

  ADT_A02: grp("ADT_A02", 1, 1, [
    seg("MSH", 1, 1),
    seg("SFT", 0, -1),
    seg("UAC", 0, 1),
    seg("EVN", 0, 1),
    seg("PID", 1, 1),
    seg("PD1", 0, 1),
    seg("ROL", 0, -1),
    seg("PV1", 1, 1),
    seg("PV2", 0, 1),
    seg("ROL", 0, -1),
    seg("DB1", 0, -1),
    seg("OBX", 0, -1),
    seg("PDA", 0, 1),
  ]),

  ADT_A03: grp("ADT_A03", 1, 1, [
    seg("MSH", 1, 1),
    seg("SFT", 0, -1),
    seg("UAC", 0, 1),
    seg("EVN", 0, 1),
    seg("PID", 1, 1),
    seg("PD1", 0, 1),
    seg("ARV", 0, -1),
    seg("ROL", 0, -1),
    seg("NK1", 0, -1),
    seg("PV1", 1, 1),
    seg("PV2", 0, 1),
    seg("ARV", 0, -1),
    seg("ROL", 0, -1),
    seg("DB1", 0, -1),
    seg("AL1", 0, -1),
    seg("DG1", 0, -1),
    seg("DRG", 0, 1),
    grp("PROCEDURE", 0, -1, [
      seg("PR1", 1, 1),
      seg("ROL", 0, -1),
    ]),
    seg("OBX", 0, -1),
    seg("GT1", 0, -1),
    grp("INSURANCE", 0, -1, [
      seg("IN1", 1, 1),
      seg("IN2", 0, 1),
      seg("IN3", 0, -1),
      seg("ROL", 0, -1),
    ]),
    seg("ACC", 0, 1),
    seg("PDA", 0, 1),
  ]),

  ADT_A05: grp("ADT_A05", 1, 1, [
    seg("MSH", 1, 1),
    seg("SFT", 0, -1),
    seg("UAC", 0, 1),
    seg("EVN", 0, 1),
    seg("PID", 1, 1),
    seg("PD1", 0, 1),
    seg("ARV", 0, -1),
    seg("ROL", 0, -1),
    seg("NK1", 0, -1),
    seg("PV1", 1, 1),
    seg("PV2", 0, 1),
    seg("ARV", 0, -1),
    seg("ROL", 0, -1),
    seg("DB1", 0, -1),
    seg("OBX", 0, -1),
    seg("AL1", 0, -1),
    seg("DG1", 0, -1),
    seg("DRG", 0, 1),
    grp("PROCEDURE", 0, -1, [
      seg("PR1", 1, 1),
      seg("ROL", 0, -1),
    ]),
    seg("GT1", 0, -1),
    grp("INSURANCE", 0, -1, [
      seg("IN1", 1, 1),
      seg("IN2", 0, 1),
      seg("IN3", 0, -1),
      seg("ROL", 0, -1),
    ]),
    seg("ACC", 0, 1),
    seg("UB1", 0, 1),
    seg("UB2", 0, 1),
  ]),

  ORM_O01: grp("ORM_O01", 1, 1, [
    seg("MSH", 1, 1),
    seg("NTE", 0, -1),
    grp("PATIENT", 0, 1, [
      seg("PID", 1, 1),
      seg("PD1", 0, 1),
      seg("NTE", 0, -1),
      seg("NK1", 0, -1),
      grp("PATIENT_VISIT", 0, 1, [
        seg("PV1", 1, 1),
        seg("PV2", 0, 1),
      ]),
      grp("INSURANCE", 0, -1, [
        seg("IN1", 1, 1),
        seg("IN2", 0, 1),
        seg("IN3", 0, 1),
      ]),
      seg("GT1", 0, 1),
      seg("AL1", 0, -1),
    ]),
    grp("ORDER", 1, -1, [
      seg("ORC", 1, 1),
      grp("ORDER_DETAIL", 0, 1, [
        seg("OBR", 1, 1),
        seg("NTE", 0, -1),
        seg("CTD", 0, 1),
        seg("DG1", 0, -1),
        grp("OBSERVATION", 0, -1, [
          seg("OBX", 1, 1),
          seg("NTE", 0, -1),
        ]),
      ]),
      seg("FT1", 0, -1),
      seg("CTI", 0, -1),
      seg("BLG", 0, 1),
    ]),
  ]),

  RDE_O11: grp("RDE_O11", 1, 1, [
    seg("MSH", 1, 1),
    seg("SFT", 0, -1),
    seg("UAC", 0, 1),
    seg("NTE", 0, -1),
    grp("PATIENT", 0, 1, [
      seg("PID", 1, 1),
      seg("PD1", 0, 1),
      seg("PRT", 0, -1),
      seg("NTE", 0, -1),
      seg("ARV", 0, -1),
      grp("PATIENT_VISIT", 0, 1, [
        seg("PV1", 1, 1),
        seg("PV2", 0, 1),
        seg("PRT", 0, -1),
        seg("ARV", 0, -1),
      ]),
      grp("INSURANCE", 0, -1, [
        seg("IN1", 1, 1),
        seg("IN2", 0, 1),
        seg("IN3", 0, 1),
      ]),
      seg("GT1", 0, 1),
      seg("AL1", 0, -1),
    ]),
    grp("ORDER", 1, -1, [
      seg("ORC", 1, 1),
      seg("PRT", 0, -1),
      grp("TIMING", 0, -1, [
        seg("TQ1", 1, 1),
        seg("TQ2", 0, -1),
      ]),
      grp("ORDER_DETAIL", 0, 1, [
        seg("OBR", 1, 1),
        seg("NTE", 0, -1),
      ]),
      seg("RXO", 0, 1),
      seg("PRT", 0, -1),
      seg("NTE", 0, -1),
      seg("RXR", 0, -1),
      seg("RXC", 0, -1),
      seg("RXE", 1, 1),
      seg("PRT", 0, -1),
      seg("NTE", 0, -1),
      grp("TIMING_ENCODED", 0, -1, [
        seg("TQ1", 1, 1),
        seg("TQ2", 0, -1),
      ]),
      seg("RXR", 1, -1),
      seg("RXC", 0, -1),
      grp("OBSERVATION", 0, -1, [
        seg("OBX", 1, 1),
        seg("PRT", 0, -1),
        seg("NTE", 0, -1),
      ]),
      seg("FT1", 0, -1),
      seg("BLG", 0, 1),
      seg("CTI", 0, -1),
    ]),
  ]),

  VXU_V04: grp("VXU_V04", 1, 1, [
    seg("MSH", 1, 1),
    seg("SFT", 0, -1),
    seg("UAC", 0, 1),
    seg("PID", 1, 1),
    seg("PD1", 0, 1),
    seg("NK1", 0, -1),
    seg("ARV", 0, -1),
    grp("PATIENT_VISIT", 0, 1, [
      seg("PV1", 1, 1),
      seg("PV2", 0, 1),
      seg("ARV", 0, -1),
    ]),
    seg("GT1", 0, -1),
    grp("INSURANCE", 0, -1, [
      seg("IN1", 1, 1),
      seg("IN2", 0, 1),
      seg("IN3", 0, -1),
    ]),
    grp("PERSON_OBSERVATION", 0, -1, [
      seg("OBX", 1, 1),
      seg("PRT", 0, -1),
      seg("NTE", 0, -1),
    ]),
    grp("ORDER", 0, -1, [
      seg("ORC", 1, 1),
      seg("PRT", 0, -1),
      grp("TIMING", 0, -1, [
        seg("TQ1", 1, 1),
        seg("TQ2", 0, -1),
      ]),
      seg("RXA", 1, 1),
      seg("RXR", 0, 1),
      grp("OBSERVATION", 0, -1, [
        seg("OBX", 1, 1),
        seg("PRT", 0, -1),
        seg("NTE", 0, -1),
      ]),
    ]),
  ]),

  SIU_S12: grp("SIU_S12", 1, 1, [
    seg("MSH", 1, 1),
    seg("SCH", 1, 1),
    seg("TQ1", 0, -1),
    seg("NTE", 0, -1),
    grp("PATIENT", 0, -1, [
      seg("PID", 1, 1),
      seg("PD1", 0, 1),
      seg("PV1", 0, 1),
      seg("PV2", 0, 1),
      seg("OBX", 0, -1),
      seg("DG1", 0, -1),
    ]),
    grp("RESOURCES", 1, -1, [
      seg("RGS", 1, 1),
      grp("SERVICE", 0, -1, [
        seg("AIS", 1, 1),
        seg("NTE", 0, -1),
      ]),
      grp("GENERAL_RESOURCE", 0, -1, [
        seg("AIG", 1, 1),
        seg("NTE", 0, -1),
      ]),
      grp("LOCATION_RESOURCE", 0, -1, [
        seg("AIL", 1, 1),
        seg("NTE", 0, -1),
      ]),
      grp("PERSONNEL_RESOURCE", 0, -1, [
        seg("AIP", 1, 1),
        seg("NTE", 0, -1),
      ]),
    ]),
  ]),

  MDM_T02: grp("MDM_T02", 1, 1, [
    seg("MSH", 1, 1),
    seg("SFT", 0, -1),
    seg("UAC", 0, 1),
    seg("EVN", 1, 1),
    seg("PID", 1, 1),
    seg("PV1", 1, 1),
    grp("COMMON_ORDER", 0, -1, [
      seg("ORC", 1, 1),
      grp("TIMING", 0, -1, [
        seg("TQ1", 1, 1),
        seg("TQ2", 0, -1),
      ]),
      seg("OBR", 1, 1),
      seg("NTE", 0, -1),
    ]),
    seg("TXA", 1, 1),
    grp("OBSERVATION", 1, -1, [
      seg("OBX", 1, 1),
      seg("NTE", 0, -1),
    ]),
  ]),

  DFT_P03: grp("DFT_P03", 1, 1, [
    seg("MSH", 1, 1),
    seg("SFT", 0, -1),
    seg("UAC", 0, 1),
    seg("EVN", 1, 1),
    seg("PID", 1, 1),
    seg("PD1", 0, 1),
    seg("ROL", 0, -1),
    seg("PV1", 0, 1),
    seg("PV2", 0, 1),
    seg("ROL", 0, -1),
    seg("DB1", 0, -1),
    grp("COMMON_ORDER", 0, -1, [
      seg("ORC", 0, 1),
      grp("ORDER", 0, 1, [
        seg("OBR", 1, 1),
        seg("NTE", 0, -1),
      ]),
      grp("OBSERVATION", 0, -1, [
        seg("OBX", 1, 1),
        seg("NTE", 0, -1),
      ]),
    ]),
    grp("FINANCIAL", 1, -1, [
      seg("FT1", 1, 1),
      seg("NTE", 0, 1),
      grp("FINANCIAL_PROCEDURE", 0, -1, [
        seg("PR1", 1, 1),
        seg("ROL", 0, -1),
      ]),
    ]),
    seg("DG1", 0, -1),
    seg("DRG", 0, 1),
    seg("GT1", 0, -1),
    grp("INSURANCE", 0, -1, [
      seg("IN1", 1, 1),
      seg("IN2", 0, 1),
      seg("IN3", 0, -1),
      seg("ROL", 0, -1),
    ]),
    seg("ACC", 0, 1),
  ]),

  ACK: grp("ACK", 1, 1, [
    seg("MSH", 1, 1),
    seg("SFT", 0, -1),
    seg("UAC", 0, 1),
    seg("MSA", 1, 1),
    seg("ERR", 0, -1),
  ]),
};

/**
 * Map trigger event aliases (e.g. ADT_A04 -> ADT_A01, SIU_S14 -> SIU_S12)
 */
const MESSAGE_STRUCTURE_ALIASES: Record<string, string> = {
  ADT_A04: "ADT_A01",
  ADT_A08: "ADT_A01",
  ADT_A13: "ADT_A01",
  ADT_A14: "ADT_A05",
  ADT_A28: "ADT_A05",
  ADT_A31: "ADT_A05",
  SIU_S13: "SIU_S12",
  SIU_S14: "SIU_S12",
  SIU_S15: "SIU_S12",
  SIU_S26: "SIU_S12",
  MDM_T04: "MDM_T02",
  MDM_T08: "MDM_T02",
  MDM_T10: "MDM_T02",
  RDE_O25: "RDE_O11",
};

const COMPILED_PROGRAMS = new Map<string, Program>();
const DEFINED_GROUP_NAMES = new Map<string, Set<string>>();

function collectSchemaGroupNames(
  schema: GroupSchemaElement,
  out: Set<string> = new Set()
): Set<string> {
  out.add(schema.id);
  for (const el of schema.elements) {
    if (el.type === "group") {
      collectSchemaGroupNames(el, out);
    }
  }
  return out;
}

function getDefinedGroupNames(structureId: string): Set<string> | undefined {
  const canonicalId = MESSAGE_STRUCTURE_ALIASES[structureId] ?? structureId;
  const cached = DEFINED_GROUP_NAMES.get(canonicalId);
  if (cached) return cached;
  const schema = MESSAGE_STRUCTURE_SCHEMAS[canonicalId];
  if (!schema) return undefined;
  const names = collectSchemaGroupNames(schema);
  DEFINED_GROUP_NAMES.set(canonicalId, names);
  return names;
}

function getCompiledProgram(structureId: string): Program | undefined {
  const canonicalId = MESSAGE_STRUCTURE_ALIASES[structureId] ?? structureId;
  const cached = COMPILED_PROGRAMS.get(canonicalId);
  if (cached) return cached;
  const schema = MESSAGE_STRUCTURE_SCHEMAS[canonicalId];
  if (!schema) return undefined;
  const compiled = compileSchema(schema);
  COMPILED_PROGRAMS.set(canonicalId, compiled);
  return compiled;
}

/**
 * Determine the HL7 v2 message structure ID from MSH-9 (e.g. "ORU_R01", "ADT_A01").
 */
function resolveMessageStructureId(segments: Hl7v2SegmentObject[]): string | undefined {
  const msh = segments.find((s) => s.code === "MSH");
  if (!msh) return undefined;
  // MSH-9 is field index 8 (0-based)
  const msh9 = msh.field[8];
  const firstElem = msh9?.element?.[0];
  if (!firstElem) return undefined;

  if (firstElem.component && firstElem.component.length > 0) {
    const comp1 = firstElem.component[0]?.text;
    const comp2 = firstElem.component[1]?.text;
    const comp3 = firstElem.component[2]?.text;
    if (comp3) return comp3.replace(/ /g, "_");
    if (comp1 && comp2) return `${comp1}_${comp2}`;
    if (comp1) return comp1;
  }
  if (firstElem.text) {
    return firstElem.text.replace(/ /g, "_");
  }
  return undefined;
}

// ============================================================================
// Conversion to FHIRPath HL7 v2 Model + Positional AST (IJsonNode)
// ============================================================================

function toNodePosition(pos: SourcePosition): IJsonNodePosition {
  const startOffset = pos.start.offset;
  const stopOffset = Math.max(startOffset, pos.end.offset - 1);
  return {
    line: pos.start.line,
    column: Math.max(0, pos.start.column - 1),
    prop_start_pos: startOffset,
    prop_stop_pos: stopOffset,
    value_start_pos: startOffset,
    value_stop_pos: stopOffset,
  };
}

function setHiddenResourceType<T extends object>(obj: T, resourceType: string): T {
  Object.defineProperty(obj, "resourceType", {
    value: resourceType,
    enumerable: false,
    configurable: true,
    writable: true,
  });
  return obj;
}

function isRawSubcomponentEmpty(sub: RawSubcomponent): boolean {
  return sub.value.length === 0;
}

function isRawComponentEmpty(comp: RawComponent): boolean {
  return comp.children.every(isRawSubcomponentEmpty);
}

function isRawRepeatEmpty(rep: RawFieldRepeat): boolean {
  return rep.children.every(isRawComponentEmpty);
}

function isRawFieldEmpty(field: RawField): boolean {
  return field.children.every(isRawRepeatEmpty);
}

function trimTrailingEmpty<T>(items: T[], isEmpty: (item: T) => boolean): T[] {
  let end = items.length;
  while (end > 0 && isEmpty(items[end - 1])) {
    end--;
  }
  return items.slice(0, end);
}

function buildGroupAstNode(
  group: Hl7v2GroupObject,
  pathPrefix: string,
  segmentAstByObj: Map<Hl7v2SegmentObject, IJsonNode>,
  groupPosMap: Map<Hl7v2GroupObject, SourcePosition>
): IJsonNode {
  const pos = groupPosMap.get(group);
  const nodePos = pos ? toNodePosition(pos) : undefined;
  const children: IJsonNode[] = [
    {
      text: "name",
      Path: `${pathPrefix}.name`,
      DefinitionPath: "Group.name",
      DataType: "string",
      position: nodePos,
    },
  ];

  // Build item[1..N]
  for (let i = 0; i < group.item.length; i++) {
    const item = group.item[i];
    const itemPath = `${pathPrefix}.item[${i + 1}]`;
    if ("code" in item) {
      const segAst = segmentAstByObj.get(item);
      if (segAst) {
        children.push(cloneAstWithPrefix(segAst, itemPath));
      }
    } else {
      children.push(buildGroupAstNode(item, itemPath, segmentAstByObj, groupPosMap));
    }
  }

  // Build segment[1..N]
  for (let i = 0; i < group.segment.length; i++) {
    const seg = group.segment[i];
    const segPath = `${pathPrefix}.segment[${i + 1}]`;
    const segAst = segmentAstByObj.get(seg);
    if (segAst) {
      children.push(cloneAstWithPrefix(segAst, segPath));
    }
  }

  // Build group[1..N]
  for (let i = 0; i < group.group.length; i++) {
    const childGroup = group.group[i];
    const childGroupPath = `${pathPrefix}.group[${i + 1}]`;
    children.push(buildGroupAstNode(childGroup, childGroupPath, segmentAstByObj, groupPosMap));
  }

  return {
    text: group.name,
    Path: pathPrefix,
    DefinitionPath: "Group",
    DataType: "Group",
    position: nodePos,
    children,
  };
}

function cloneAstWithPrefix(node: IJsonNode, newPath: string): IJsonNode {
  const oldPrefix = node.Path ?? "";
  const clonedChildren = node.children?.map((c) => {
    const suffix = c.Path && oldPrefix && c.Path.startsWith(oldPrefix)
      ? c.Path.slice(oldPrefix.length)
      : "";
    return cloneAstWithPrefix(c, newPath + suffix);
  });
  return {
    ...node,
    Path: newPath,
    children: clonedChildren,
  };
}

/**
 * Parse an HL7 v2 message string into:
 * 1. `message`: The FHIRPath HL7 v2 Object Model (`Message`, `Group`, `Segment`, `Field`, `Element`, `Component`, `SubComponent`)
 * 2. `ast`: The positional `IJsonNode` tree for editor navigation and highlighting (`findNodeByPath`)
 */
export function parseHl7v2Message(input: string): {
  message: Hl7v2MessageObject;
  ast: IJsonNode;
} {
  const rawRoot = parseRawAst(input);
  const delimiters = rawRoot.delimiters;

  const messageSegments: Hl7v2SegmentObject[] = [];
  const rootAstChildren: IJsonNode[] = [];
  const segmentAstByObj = new Map<Hl7v2SegmentObject, IJsonNode>();
  const segmentPosByObj = new Map<Hl7v2SegmentObject, SourcePosition>();

  for (let sIdx = 0; sIdx < rawRoot.children.length; sIdx++) {
    const rawSeg = rawRoot.children[sIdx];
    const segOneIdx = sIdx + 1;
    const segPath = `Message.segment[${segOneIdx}]`;
    const isHeaderSeg = HEADER_SEGMENTS.has(rawSeg.name);

    const trimmedFields = trimTrailingEmpty(rawSeg.children, isRawFieldEmpty);
    const fields: Hl7v2FieldObject[] = [];
    const segAstChildren: IJsonNode[] = [
      {
        text: "code",
        Path: `${segPath}.code`,
        DefinitionPath: "Segment.code",
        DataType: "string",
        position: {
          line: rawSeg.position.start.line,
          column: Math.max(0, rawSeg.position.start.column - 1),
          prop_start_pos: rawSeg.position.start.offset,
          prop_stop_pos: Math.max(
            rawSeg.position.start.offset,
            rawSeg.position.start.offset + rawSeg.name.length - 1
          ),
        },
      },
    ];

    for (let fIdx = 0; fIdx < trimmedFields.length; fIdx++) {
      const rawField = trimmedFields[fIdx];
      const fieldOneIdx = fIdx + 1;
      const fieldPath = `${segPath}.field[${fieldOneIdx}]`;
      const fieldPos = toNodePosition(rawField.position);
      const isMshEncodingChars = isHeaderSeg && fieldOneIdx === 2;

      const trimmedRepeats = trimTrailingEmpty(rawField.children, isRawRepeatEmpty);
      const elements: Hl7v2ElementObject[] = [];
      const fieldAstChildren: IJsonNode[] = [];

      for (let rIdx = 0; rIdx < trimmedRepeats.length; rIdx++) {
        const rawRep = trimmedRepeats[rIdx];
        const repOneIdx = rIdx + 1;
        const elemPath = `${fieldPath}.element[${repOneIdx}]`;
        const elemPos = toNodePosition(rawRep.position);
        const elemAstChildren: IJsonNode[] = [];

        const trimmedComponents = trimTrailingEmpty(rawRep.children, isRawComponentEmpty);

        if (trimmedComponents.length === 0) {
          // Intermediate empty repeat (e.g. ~value)
          const emptyElem: Hl7v2ElementObject = setHiddenResourceType({}, "Element");
          elements.push(emptyElem);
          fieldAstChildren.push({
            text: "element",
            Path: elemPath,
            DefinitionPath: "Field.element",
            DataType: "Element",
            position: elemPos,
            Index: repOneIdx,
          });
          continue;
        }

        const firstComp = trimmedComponents[0];
        const firstCompSubs = trimTrailingEmpty(firstComp.children, isRawSubcomponentEmpty);
        const isSimpleElement =
          trimmedComponents.length === 1 && firstCompSubs.length <= 1;

        if (isSimpleElement) {
          const rawVal = firstCompSubs[0]?.value ?? "";
          const decodedVal = isMshEncodingChars
            ? rawVal
            : decodeHl7v2Escapes(rawVal, delimiters);
          const elemObj: Hl7v2ElementObject = setHiddenResourceType(
            {
              text: decodedVal,
              value: decodedVal,
            },
            "Element"
          );
          elements.push(elemObj);

          elemAstChildren.push(
            {
              text: "text",
              Path: `${elemPath}.text`,
              DefinitionPath: "Element.text",
              DataType: "string",
              position: elemPos,
            },
            {
              text: "value",
              Path: `${elemPath}.value`,
              DefinitionPath: "Element.value",
              DataType: "string",
              position: elemPos,
            }
          );
        } else {
          const components: Hl7v2ComponentObject[] = [];
          for (let cIdx = 0; cIdx < trimmedComponents.length; cIdx++) {
            const rawComp = trimmedComponents[cIdx];
            const compOneIdx = cIdx + 1;
            const compPath = `${elemPath}.component[${compOneIdx}]`;
            const compPos = toNodePosition(rawComp.position);
            const compAstChildren: IJsonNode[] = [];

            const trimmedSubs = trimTrailingEmpty(
              rawComp.children,
              isRawSubcomponentEmpty
            );

            if (trimmedSubs.length === 0) {
              // Intermediate empty component (e.g. 12345^^^MR)
              const emptyComp: Hl7v2ComponentObject = setHiddenResourceType(
                {},
                "Component"
              );
              components.push(emptyComp);
              elemAstChildren.push({
                text: "component",
                Path: compPath,
                DefinitionPath: "Element.component",
                DataType: "Component",
                position: compPos,
                Index: compOneIdx,
              });
              continue;
            }

            if (trimmedSubs.length === 1) {
              const rawSubVal = trimmedSubs[0].value;
              const decodedSubVal = isMshEncodingChars
                ? rawSubVal
                : decodeHl7v2Escapes(rawSubVal, delimiters);
              const compObj: Hl7v2ComponentObject = setHiddenResourceType(
                {
                  text: decodedSubVal,
                  value: decodedSubVal,
                },
                "Component"
              );
              components.push(compObj);
              compAstChildren.push(
                {
                  text: "text",
                  Path: `${compPath}.text`,
                  DefinitionPath: "Component.text",
                  DataType: "string",
                  position: compPos,
                },
                {
                  text: "value",
                  Path: `${compPath}.value`,
                  DefinitionPath: "Component.value",
                  DataType: "string",
                  position: compPos,
                }
              );
            } else {
              const subcomponents: Hl7v2SubComponentObject[] = [];
              for (let subIdx = 0; subIdx < trimmedSubs.length; subIdx++) {
                const rawSub = trimmedSubs[subIdx];
                const subOneIdx = subIdx + 1;
                const subPath = `${compPath}.subcomponent[${subOneIdx}]`;
                const subPos = toNodePosition(rawSub.position);
                if (isRawSubcomponentEmpty(rawSub)) {
                  subcomponents.push(setHiddenResourceType({}, "SubComponent"));
                  compAstChildren.push({
                    text: "subcomponent",
                    Path: subPath,
                    DefinitionPath: "Component.subcomponent",
                    DataType: "SubComponent",
                    position: subPos,
                    Index: subOneIdx,
                  });
                } else {
                  const decodedSubVal = isMshEncodingChars
                    ? rawSub.value
                    : decodeHl7v2Escapes(rawSub.value, delimiters);
                  subcomponents.push(
                    setHiddenResourceType(
                      {
                        text: decodedSubVal,
                        value: decodedSubVal,
                      },
                      "SubComponent"
                    )
                  );
                  compAstChildren.push({
                    text: "subcomponent",
                    Path: subPath,
                    DefinitionPath: "Component.subcomponent",
                    DataType: "SubComponent",
                    position: subPos,
                    Index: subOneIdx,
                    children: [
                      {
                        text: "text",
                        Path: `${subPath}.text`,
                        DefinitionPath: "SubComponent.text",
                        DataType: "string",
                        position: subPos,
                      },
                      {
                        text: "value",
                        Path: `${subPath}.value`,
                        DefinitionPath: "SubComponent.value",
                        DataType: "string",
                        position: subPos,
                      },
                    ],
                  });
                }
              }
              components.push(
                setHiddenResourceType({ subcomponent: subcomponents }, "Component")
              );
            }

            elemAstChildren.push({
              text: "component",
              Path: compPath,
              DefinitionPath: "Element.component",
              DataType: "Component",
              position: compPos,
              Index: compOneIdx,
              children: compAstChildren,
            });
          }

          elements.push(setHiddenResourceType({ component: components }, "Element"));
        }

        fieldAstChildren.push({
          text: "element",
          Path: elemPath,
          DefinitionPath: "Field.element",
          DataType: "Element",
          position: elemPos,
          Index: repOneIdx,
          children: elemAstChildren,
        });
      }

      const fieldObj: Hl7v2FieldObject =
        elements.length > 0
          ? setHiddenResourceType({ element: elements }, "Field")
          : setHiddenResourceType({}, "Field");
      fields.push(fieldObj);

      segAstChildren.push({
        text: "field",
        Path: fieldPath,
        DefinitionPath: "Segment.field",
        DataType: "Field",
        position: fieldPos,
        Index: fieldOneIdx,
        children: fieldAstChildren,
      });
    }

    const segObj: Hl7v2SegmentObject = setHiddenResourceType(
      {
        code: rawSeg.name,
        field: fields,
      },
      "Segment"
    );
    messageSegments.push(segObj);
    segmentPosByObj.set(segObj, rawSeg.position);

    const segAstNode: IJsonNode = {
      text: rawSeg.name,
      Path: segPath,
      DefinitionPath: "Message.segment",
      DataType: "Segment",
      position: toNodePosition(rawSeg.position),
      Index: segOneIdx,
      children: segAstChildren,
    };
    segmentAstByObj.set(segObj, segAstNode);
    rootAstChildren.push(segAstNode);
  }

  // Reconcile Abstract Message Syntax groups via Pike VM
  const messageObj: Hl7v2MessageObject = {
    resourceType: "Message",
    segment: messageSegments,
  };

  const structureId = resolveMessageStructureId(messageSegments);
  if (!structureId) {
    Object.defineProperty(messageObj, "__groupError", {
      value:
        "Cannot parse Abstract Message Syntax: missing or unrecognized message type in MSH-9.",
      enumerable: false,
      configurable: true,
    });
  } else {
    const program = getCompiledProgram(structureId);
    if (!program) {
      Object.defineProperty(messageObj, "__groupError", {
        value: `Cannot parse Abstract Message Syntax: unsupported message structure '${structureId}'.`,
        enumerable: false,
        configurable: true,
      });
    } else {
      const segCodes = messageSegments.map((s) => s.code);
      const vmResult = runProgram(program, segCodes);
      if (!vmResult.matched) {
        const failIdx = vmResult.failedAtIndex ?? 0;
        const badSeg = messageSegments[failIdx]?.code ?? "EOF";
        Object.defineProperty(messageObj, "__groupError", {
          value: `Cannot reconcile message with Abstract Message Syntax for '${structureId}' at segment ${failIdx + 1} (${badSeg}).`,
          enumerable: false,
          configurable: true,
        });
      } else {
        const definedGroups = getDefinedGroupNames(structureId);
        Object.defineProperty(messageObj, "__structureId", {
          value: structureId,
          enumerable: false,
          configurable: true,
        });
        Object.defineProperty(messageObj, "__definedGroups", {
          value: definedGroups,
          enumerable: false,
          configurable: true,
        });

        const rootGroups: Hl7v2GroupObject[] = [];
        const groupStack: Hl7v2GroupObject[] = [];
        const groupPosMap = new Map<Hl7v2GroupObject, SourcePosition>();

        for (const ev of vmResult.events) {
          if (ev.kind === "open-group") {
            const newGrp: Hl7v2GroupObject = setHiddenResourceType(
              {
                name: ev.name,
                item: [],
                segment: [],
                group: [],
              },
              "Group"
            );
            Object.defineProperty(newGrp, "__structureId", {
              value: structureId,
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(newGrp, "__definedGroups", {
              value: definedGroups,
              enumerable: false,
              configurable: true,
            });
            if (groupStack.length > 0) {
              const parentGrp = groupStack[groupStack.length - 1];
              parentGrp.item.push(newGrp);
              parentGrp.group.push(newGrp);
            } else {
              rootGroups.push(newGrp);
            }
            groupStack.push(newGrp);
          } else if (ev.kind === "seg") {
            const segObj = messageSegments[ev.segIdx];
            if (segObj && groupStack.length > 0) {
              const currentGrp = groupStack[groupStack.length - 1];
              currentGrp.item.push(segObj);
              currentGrp.segment.push(segObj);
            }
          } else if (ev.kind === "close-group") {
            const closedGrp = groupStack.pop();
            if (closedGrp) {
              // Compute bounding SourcePosition from first and last item
              const positions = closedGrp.item
                .map((it) =>
                  "code" in it ? segmentPosByObj.get(it) : groupPosMap.get(it)
                )
                .filter((p): p is SourcePosition => !!p);
              if (positions.length > 0) {
                groupPosMap.set(closedGrp, {
                  start: { ...positions[0].start },
                  end: { ...positions[positions.length - 1].end },
                });
              }
            }
          }
        }

        messageObj.group = rootGroups;

        for (let gIdx = 0; gIdx < rootGroups.length; gIdx++) {
          const grpObj = rootGroups[gIdx];
          const grpPath = `Message.group[${gIdx + 1}]`;
          rootAstChildren.push(
            buildGroupAstNode(grpObj, grpPath, segmentAstByObj, groupPosMap)
          );
        }
      }
    }
  }

  const ast: IJsonNode = {
    text: "Message",
    Path: "Message",
    DefinitionPath: "Message",
    DataType: "Message",
    position: toNodePosition(rawRoot.position),
    children: rootAstChildren,
  };

  return { message: messageObj, ast };
}

/**
 * Parse HL7 v2 text into an IJsonNode positional tree (for ResourceEditor navigateToContext).
 */
export function parseHl7v2(input: string): IJsonNode {
  return parseHl7v2Message(input).ast;
}

/**
 * Normalize/reformat an HL7 v2 message for the ResourceEditor reformat button.
 */
export function formatHl7v2Message(input: string): string {
  return input
    .split(/\r\n|\r|\n/)
    .map((line) => line.replace(/^[\s\x0b\x1c]+|[\s\x0b\x1c]+$/g, ""))
    .filter((line) => line.length > 0)
    .join("\n");
}

/**
 * Ace Editor custom highlight rules for HL7 v2 pipe-delimited messages.
 */
export const Hl7v2HighlightRules: Record<string, any[]> = {
  start: [
    {
      token: "keyword",
      regex: "^\\s*[A-Z][A-Z0-9]{2}(?=\\|)",
    },
    {
      token: "constant.character.escape",
      regex: "\\\\(?:[FSTREHN]|X[0-9A-Fa-f]+|\\.[a-z]+)\\\\",
    },
    {
      token: "punctuation.operator",
      regex: "\\||~|\\^|&",
    },
    {
      token: "constant.numeric",
      regex: "\\b\\d+(?:\\.\\d+)?\\b",
    },
    {
      defaultToken: "text",
    },
  ],
};

/**
 * Default sample HL7 v2 message for the FHIRPath Lab when switching to hl7v2.
 * Includes MSH, PID (with MR identifier), patient-level OBX (PATIENT_OBSERVATION),
 * PV1 (VISIT), and order-level ORC/OBR/OBX (ORDER_OBSERVATION) so all 5 examples
 * in https://hl7.org/fhirpath/en/appendices.html evaluate out of the box.
 */
export const defaultHl7v2Message = [
  "MSH|^~\\&|SendingApp|SendingFac|ReceivingApp|ReceivingFac|20240115093000||ORU^R01^ORU_R01|MSG00001|P|2.7",
  "PID|1||12345678^^^MR^MR~87654321^^^National^NI||Chalmers^Peter^James^^Mr.||19741225|M|||534 Erewhon St^^PleasantVille^Vic^3999",
  "OBX|1|ST|8302-2^Body Height^LN||185 cm||||||F",
  "PV1|1|I|4E^401^1^General Hospital||||1234^Attend^Doctor^A^^^MD||~5678^Consult^Doctor^C^^^MD",
  "ORC|RE|ORD1001|FIL2002",
  "OBR|1|ORD1001|FIL2002|24331-1^Lipid Panel^LN|||20240115080000",
  "OBX|1|NM|2093-3^Cholesterol [Mass/volume] in Serum or Plasma^LN||190|mg/dL^milligrams per deciliter^UCUM|<200|N|||F",
  "OBX|2|NM|2085-9^HDL Cholesterol^LN||55|mg/dL^milligrams per deciliter^UCUM|>40|N|||F",
].join("\n");

export const defaultHl7v2Expression =
  "Message.segment.where(code = 'PID').elements(3).where(component[4].value = 'MR').component[1].text";
