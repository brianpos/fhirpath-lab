import antlr4, { type ParserRuleContext } from "antlr4";
import fhirpath, { type Model } from "fhirpath";
import fhirpathR4Model from "fhirpath/fhir-context/r4";
import { marked } from "marked";
import Lexer from "../fhir-liquid-parser/fhirliquidLexer";
import Parser, {
  type AssignStatementContext,
  AssignItemContext,
  BreakItemContext,
  type CaptureStatementContext,
  CaptureItemContext,
  ContinueItemContext,
  CycleItemContext,
  type CycleStatementContext,
  type ExpressionContext,
  type FilterContext,
  ForItemContext,
  type ForModifierContext,
  type ForStatementContext,
  IfItemContext,
  type IfStatementContext,
  IncludeItemContext,
  type IncludeStatementContext,
  LegacyLoopItemContext,
  type LegacyLoopStatementContext,
  type LiquidDocumentContext,
  type LoopItemContext,
  LoopAssignItemContext,
  LoopCaptureItemContext,
  LoopIfItemContext,
  type LoopIfStatementContext,
  LoopIncludeItemContext,
  LoopOutputItemContext,
  LoopTextItemContext,
  NestedForItemContext,
  NestedLegacyLoopItemContext,
  type OutputStatementContext,
  OutputItemContext,
  type TemplateItemContext,
  TextItemContext,
} from "../fhir-liquid-parser/fhirliquidParser";
import {
  validateFhirLiquidTemplate,
  type FhirLiquidIssuePosition,
  type FhirLiquidValidationOutcome,
} from "./fhir_liquid_validator";

export interface FhirLiquidDocument {
  readonly source: string;
  readonly sourceName: string;
  readonly tree: LiquidDocumentContext;
}

export interface FhirLiquidRenderContext {
  readonly resource: unknown;
  readonly variables: Readonly<Record<string, unknown>>;
}

export interface FhirLiquidEngineOptions {
  model?: Model;
  variables?: Record<string, unknown>;
  includeResolver?: (name: string) => string | undefined;
  renderValue?: (
    value: unknown,
    context: FhirLiquidRenderContext,
  ) => string | undefined;
  markdownRenderer?: (markdown: string) => string;
}

export class FhirLiquidSyntaxError extends Error {
  public constructor(
    public readonly outcome: FhirLiquidValidationOutcome,
    sourceName: string,
  ) {
    super(`FHIR Liquid syntax errors were found in ${sourceName}.`);
    this.name = "FhirLiquidSyntaxError";
  }
}

export class FhirLiquidEvaluationError extends Error {
  public constructor(
    message: string,
    public readonly position: FhirLiquidIssuePosition,
    public readonly sourceName: string,
    public readonly originalError: unknown,
  ) {
    super(message);
    this.name = "FhirLiquidEvaluationError";
  }
}

type LoopControl = "break" | "continue";

interface RenderResult {
  text: string;
  control?: LoopControl;
}

interface EvaluationState {
  readonly document: FhirLiquidDocument;
  readonly resource: unknown;
  readonly globals: Map<string, unknown>;
  readonly loopVariables: Map<string, unknown>;
  readonly cycleCursors: Map<CycleStatementContext, number>;
}

interface LoopModifiers {
  reversed: boolean;
  limit: number;
  offset: number;
}

interface ForLoopValue {
  parentLoop: unknown;
  first: boolean;
  index: number;
  index0: number;
  rindex: number;
  rindex0: number;
  last: boolean;
  length: number;
}

export class FhirLiquidEngine {
  public readonly variables: Record<string, unknown>;

  private readonly model: Model;
  private readonly includeResolver?: (name: string) => string | undefined;
  private readonly renderValue?: FhirLiquidEngineOptions["renderValue"];
  private readonly markdownRenderer: (markdown: string) => string;

  public constructor(options: FhirLiquidEngineOptions = {}) {
    this.model = options.model ?? fhirpathR4Model;
    this.variables = { ...options.variables };
    this.includeResolver = options.includeResolver;
    this.renderValue = options.renderValue;
    this.markdownRenderer = options.markdownRenderer ?? renderMarkdown;
  }

  public parse(source: string, sourceName = "FHIR Liquid template"): FhirLiquidDocument {
    const outcome = validateFhirLiquidTemplate(source);
    if (outcome) {
      throw new FhirLiquidSyntaxError(outcome, sourceName);
    }

    const chars = new antlr4.CharStream(source);
    const lexer = new Lexer(chars);
    lexer.removeErrorListeners();
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new Parser(tokens);
    parser.removeErrorListeners();

    return {
      source,
      sourceName,
      tree: parser.liquidDocument(),
    };
  }

  public evaluate(
    documentOrSource: FhirLiquidDocument | string,
    resource: unknown,
    variables: Record<string, unknown> = {},
  ): string {
    const document = typeof documentOrSource === "string"
      ? this.parse(documentOrSource)
      : documentOrSource;
    const state: EvaluationState = {
      document,
      resource,
      globals: new Map(Object.entries({
        ...this.variables,
        ...variables,
      })),
      loopVariables: new Map(),
      cycleCursors: new Map(),
    };

    return this.renderTemplateItems(document.tree.templateItem_list(), state);
  }

  private renderTemplateItems(
    items: TemplateItemContext[],
    state: EvaluationState,
  ): string {
    let output = "";
    for (const item of items) {
      try {
        output += this.renderTemplateItem(item, state);
      } catch (error) {
        throw evaluationError(error, item, state.document.sourceName);
      }
    }
    return output;
  }

  private renderTemplateItem(
    item: TemplateItemContext,
    state: EvaluationState,
  ): string {
    if (item instanceof TextItemContext) {
      return item.TEXT().getText();
    }
    if (item instanceof OutputItemContext) {
      return this.renderOutput(item.outputStatement(), state);
    }
    if (item instanceof IfItemContext) {
      return this.renderIf(item.ifStatement(), state);
    }
    if (item instanceof ForItemContext) {
      return this.renderFor(item.forStatement(), state);
    }
    if (item instanceof LegacyLoopItemContext) {
      return this.renderLegacyLoop(item.legacyLoopStatement(), state);
    }
    if (item instanceof AssignItemContext) {
      this.renderAssign(item.assignStatement(), state);
      return "";
    }
    if (item instanceof CaptureItemContext) {
      const result = this.renderCapture(item.captureStatement(), state);
      if (result.control) {
        throw new Error(`${result.control} cannot be used outside a loop.`);
      }
      return "";
    }
    if (item instanceof IncludeItemContext) {
      return this.renderInclude(item.includeStatement(), state);
    }

    throw new Error(`Unsupported FHIR Liquid template item: ${item.getText()}`);
  }

  private renderLoopItems(
    items: LoopItemContext[],
    state: EvaluationState,
  ): RenderResult {
    let output = "";
    for (const item of items) {
      let result: RenderResult;
      try {
        result = this.renderLoopItem(item, state);
      } catch (error) {
        throw evaluationError(error, item, state.document.sourceName);
      }
      output += result.text;
      if (result.control) {
        return { text: output, control: result.control };
      }
    }
    return { text: output };
  }

  private renderLoopItem(
    item: LoopItemContext,
    state: EvaluationState,
  ): RenderResult {
    if (item instanceof LoopTextItemContext) {
      return { text: item.TEXT().getText() };
    }
    if (item instanceof LoopOutputItemContext) {
      return { text: this.renderOutput(item.outputStatement(), state) };
    }
    if (item instanceof LoopIfItemContext) {
      return this.renderLoopIf(item.loopIfStatement(), state);
    }
    if (item instanceof NestedForItemContext) {
      return { text: this.renderFor(item.forStatement(), state) };
    }
    if (item instanceof NestedLegacyLoopItemContext) {
      return { text: this.renderLegacyLoop(item.legacyLoopStatement(), state) };
    }
    if (item instanceof LoopAssignItemContext) {
      this.renderAssign(item.assignStatement(), state);
      return { text: "" };
    }
    if (item instanceof LoopCaptureItemContext) {
      return this.renderCapture(item.captureStatement(), state);
    }
    if (item instanceof LoopIncludeItemContext) {
      return { text: this.renderInclude(item.includeStatement(), state) };
    }
    if (item instanceof BreakItemContext) {
      return { text: "", control: "break" };
    }
    if (item instanceof ContinueItemContext) {
      return { text: "", control: "continue" };
    }
    if (item instanceof CycleItemContext) {
      return { text: this.renderCycle(item.cycleStatement(), state) };
    }

    throw new Error(`Unsupported FHIR Liquid loop item: ${item.getText()}`);
  }

  private renderOutput(
    context: OutputStatementContext,
    state: EvaluationState,
  ): string {
    let output = this.valuesToString(
      this.evaluateExpression(context.expression(), state),
      state,
    );

    for (const filter of context.filter_list()) {
      output = this.applyFilter(output, filter, state);
    }
    return output;
  }

  private applyFilter(
    input: string,
    filter: FilterContext,
    state: EvaluationState,
  ): string {
    const filterName = filter.filterName().getText();
    switch (filterName) {
      case "prepend": {
        const expression = filter.expression();
        if (!expression) {
          throw new Error("The prepend filter requires an expression.");
        }
        return this.valuesToString(
          this.evaluateExpression(expression, state),
          state,
        ) + input;
      }
      case "markdownify":
        return this.markdownRenderer(input);
      case "upcase":
        return input.toUpperCase();
      case "downcase":
        return input.toLowerCase();
      default:
        throw new Error(`Unknown FHIR Liquid filter: ${filterName}`);
    }
  }

  private renderIf(
    context: IfStatementContext,
    state: EvaluationState,
  ): string {
    const items = this.selectConditionalBranch(
      context.expression_list(),
      context.templateItem_list(),
      context.ELSIF_list().map(node => node.symbol.tokenIndex),
      context.ELSE()?.symbol.tokenIndex,
      context.ENDIF().symbol.tokenIndex,
      state,
    );
    return this.renderTemplateItems(items, state);
  }

  private renderLoopIf(
    context: LoopIfStatementContext,
    state: EvaluationState,
  ): RenderResult {
    const items = this.selectConditionalBranch(
      context.expression_list(),
      context.loopItem_list(),
      context.ELSIF_list().map(node => node.symbol.tokenIndex),
      context.ELSE()?.symbol.tokenIndex,
      context.ENDIF().symbol.tokenIndex,
      state,
    );
    return this.renderLoopItems(items, state);
  }

  private selectConditionalBranch<TItem extends ParserRuleContext>(
    conditions: ExpressionContext[],
    items: TItem[],
    elsifIndices: number[],
    elseIndex: number | undefined,
    endIndex: number,
    state: EvaluationState,
  ): TItem[] {
    const firstBoundary = elsifIndices[0] ?? elseIndex ?? endIndex;
    if (this.evaluateBoolean(conditions[0], state)) {
      return itemsBetween(items, -1, firstBoundary);
    }

    for (let index = 0; index < elsifIndices.length; index++) {
      if (this.evaluateBoolean(conditions[index + 1], state)) {
        const nextBoundary = elsifIndices[index + 1] ?? elseIndex ?? endIndex;
        return itemsBetween(items, elsifIndices[index], nextBoundary);
      }
    }

    return elseIndex === undefined
      ? []
      : itemsBetween(items, elseIndex, endIndex);
  }

  private renderFor(
    context: ForStatementContext,
    state: EvaluationState,
  ): string {
    return this.renderForValues(
      context.variableName().getText(),
      context.expression(),
      context.forModifier_list(),
      context.loopItem_list(),
      context.templateItem_list(),
      state,
    );
  }

  private renderLegacyLoop(
    context: LegacyLoopStatementContext,
    state: EvaluationState,
  ): string {
    return this.renderForValues(
      context.variableName().getText(),
      context.expression(),
      context.forModifier_list(),
      undefined,
      context.templateItem_list(),
      state,
    );
  }

  private renderForValues(
    variableName: string,
    expression: ExpressionContext,
    modifierContexts: ForModifierContext[],
    loopItems: LoopItemContext[] | undefined,
    templateItems: TemplateItemContext[],
    state: EvaluationState,
  ): string {
    if (variableName === "include") {
      throw new Error("The variable name 'include' is reserved.");
    }
    if (state.globals.has(variableName)) {
      throw new Error(`The variable '${variableName}' is already assigned.`);
    }

    const evaluated = [...this.evaluateExpression(expression, state)];
    if (evaluated.length === 0) {
      return loopItems
        ? this.renderTemplateItems(templateItems, state)
        : "";
    }

    const modifiers = readLoopModifiers(modifierContexts);
    if (modifiers.reversed) {
      evaluated.reverse();
    }

    const loopState: EvaluationState = {
      ...state,
      loopVariables: new Map(state.loopVariables),
    };
    const hadParentLoop = state.globals.has("forLoop");
    const parentLoop = state.globals.get("forLoop");
    let output = "";
    let index = 0;

    for (const value of evaluated) {
      if (modifiers.offset >= 0 && index < modifiers.offset) {
        index++;
        continue;
      }
      if (modifiers.limit >= 0 && index === modifiers.limit) {
        break;
      }

      state.globals.set(
        "forLoop",
        createForLoopValue(
          evaluated.length,
          index,
          modifiers.offset,
          modifiers.limit,
          parentLoop,
        ),
      );
      loopState.loopVariables.set(variableName, value);

      if (loopItems) {
        const result = this.renderLoopItems(loopItems, loopState);
        output += result.text;
        if (result.control === "break") break;
        if (result.control === "continue") {
          index++;
          continue;
        }
      } else {
        output += this.renderTemplateItems(templateItems, loopState);
      }
      index++;
    }

    if (hadParentLoop) {
      state.globals.set("forLoop", parentLoop);
    } else {
      state.globals.delete("forLoop");
    }
    return output;
  }

  private renderAssign(
    context: AssignStatementContext,
    state: EvaluationState,
  ): void {
    const variableName = context.variableName().getText();
    const values = this.evaluateExpression(context.expression(), state);
    if (values.length === 0) {
      state.globals.delete(variableName);
      return;
    }
    if (values.length > 1) {
      throw new Error(`Assignment to '${variableName}' returned multiple values.`);
    }
    state.globals.set(variableName, values[0]);
  }

  private renderCapture(
    context: CaptureStatementContext,
    state: EvaluationState,
  ): RenderResult {
    const result = this.renderLoopItems(context.loopItem_list(), state);
    if (!result.control) {
      state.globals.set(context.variableName().getText(), result.text);
    }
    return { text: "", control: result.control };
  }

  private renderCycle(
    context: CycleStatementContext,
    state: EvaluationState,
  ): string {
    const values = context.DOUBLE_QUOTED_STRING_list()
      .map(node => decodeDoubleQuotedString(node.getText()));
    const cursor = state.cycleCursors.get(context) ?? 0;
    state.cycleCursors.set(context, (cursor + 1) % values.length);
    return values[cursor];
  }

  private renderInclude(
    context: IncludeStatementContext,
    state: EvaluationState,
  ): string {
    const includeName = context.includeName().getText();
    if (!this.includeResolver) {
      throw new Error("FHIR Liquid includes are not supported by this engine.");
    }
    const source = this.includeResolver(includeName);
    if (source === undefined) {
      throw new Error(`The FHIR Liquid include '${includeName}' could not be resolved.`);
    }

    const includeVariables: Record<string, unknown> = {};
    for (const parameter of context.includeParameter_list()) {
      includeVariables[parameter.variableName().getText()] =
        this.evaluateExpression(parameter.expression(), state);
    }

    const childState: EvaluationState = {
      ...state,
      document: this.parse(source, `FHIR Liquid include '${includeName}'`),
      loopVariables: new Map(state.loopVariables),
    };
    childState.loopVariables.set("include", includeVariables);
    return this.renderTemplateItems(
      childState.document.tree.templateItem_list(),
      childState,
    );
  }

  private evaluateBoolean(
    expression: ExpressionContext,
    state: EvaluationState,
  ): boolean {
    const values = this.evaluateExpression(expression, state);
    if (values.length === 0) return false;
    if (values.length !== 1 || typeof values[0] !== "boolean") {
      throw new Error(
        `FHIR Liquid condition '${this.expressionText(expression, state)}' `
        + "must evaluate to a single boolean value.",
      );
    }
    return values[0];
  }

  private evaluateExpression(
    expression: ExpressionContext,
    state: EvaluationState,
  ): unknown[] {
    const variables = variablesFromState(state);
    const evaluationResource = isRecord(state.resource)
      ? { ...state.resource, ...variables }
      : state.resource;
    const expressionText = normalizeDoubleQuotedStrings(
      this.expressionText(expression, state),
    );

    return fhirpath.evaluate(
      evaluationResource,
      expressionText,
      variables,
      this.model,
      { async: false },
    );
  }

  private expressionText(
    expression: ExpressionContext,
    state: EvaluationState,
  ): string {
    return sourceText(state.document.source, expression);
  }

  private valuesToString(
    values: unknown[],
    state: EvaluationState,
  ): string {
    const context: FhirLiquidRenderContext = {
      resource: state.resource,
      variables: variablesFromState(state),
    };
    const rendered: string[] = [];
    for (const value of values) {
      if (value === null || value === undefined) continue;
      const custom = this.renderValue?.(value, context);
      rendered.push(custom ?? defaultValueToString(value));
    }
    return rendered.join(", ");
  }
}

export function evaluateFhirLiquid(
  source: string,
  resource: unknown,
  options: FhirLiquidEngineOptions = {},
  variables: Record<string, unknown> = {},
): string {
  return new FhirLiquidEngine(options).evaluate(source, resource, variables);
}

function variablesFromState(state: EvaluationState): Record<string, unknown> {
  return {
    ...Object.fromEntries(state.globals),
    ...Object.fromEntries(state.loopVariables),
  };
}

function itemsBetween<TItem extends ParserRuleContext>(
  items: TItem[],
  startExclusive: number,
  endExclusive: number,
): TItem[] {
  return items.filter(item => (
    item.start.tokenIndex > startExclusive
    && item.start.tokenIndex < endExclusive
  ));
}

function readLoopModifiers(contexts: ForModifierContext[]): LoopModifiers {
  const modifiers: LoopModifiers = {
    reversed: false,
    limit: -1,
    offset: -1,
  };
  for (const context of contexts) {
    if (context.REVERSED()) {
      modifiers.reversed = true;
    } else if (context.LIMIT()) {
      modifiers.limit = Number.parseInt(context.INTEGER().getText(), 10);
    } else if (context.OFFSET()) {
      modifiers.offset = Number.parseInt(context.INTEGER().getText(), 10);
    }
  }
  return modifiers;
}

function createForLoopValue(
  size: number,
  index: number,
  configuredOffset: number,
  configuredLimit: number,
  parentLoop: unknown,
): ForLoopValue {
  const offset = configuredOffset === -1 ? 0 : configuredOffset;
  const limit = configuredLimit === -1 ? size : configuredLimit;
  return {
    parentLoop,
    first: index === offset,
    index: index + 1 - offset,
    index0: index - offset,
    rindex: (limit - offset) - 1 - index,
    rindex0: (limit - offset) - index,
    last: index === (limit - offset) - 1,
    length: limit - offset,
  };
}

function sourceText(source: string, context: ParserRuleContext): string {
  const start = context.start.start;
  const stop = context.stop?.stop ?? context.start.stop;
  return source.slice(start, stop + 1);
}

function evaluationError(
  error: unknown,
  context: ParserRuleContext,
  sourceName: string,
): Error {
  if (
    error instanceof FhirLiquidEvaluationError
    || error instanceof FhirLiquidSyntaxError
  ) {
    return error;
  }

  const message = error instanceof Error ? error.message : String(error);
  return new FhirLiquidEvaluationError(
    message,
    {
      line: context.start.line,
      column: context.start.column + 1,
      length: Math.max(1, context.start.stop - context.start.start + 1),
    },
    sourceName,
    error,
  );
}

function normalizeDoubleQuotedStrings(expression: string): string {
  let normalized = "";
  let index = 0;
  while (index < expression.length) {
    const current = expression[index];
    if (current === "'" || current === "`") {
      const end = findQuotedEnd(expression, index, current);
      normalized += expression.slice(index, end + 1);
      index = end + 1;
    } else if (current === "\"") {
      const end = findQuotedEnd(expression, index, current);
      normalized += encodeFhirPathString(
        decodeDoubleQuotedString(expression.slice(index, end + 1)),
      );
      index = end + 1;
    } else {
      normalized += current;
      index++;
    }
  }
  return normalized;
}

function findQuotedEnd(
  value: string,
  start: number,
  quote: string,
): number {
  let index = start + 1;
  while (index < value.length) {
    if (value[index] === "\\") {
      index += value[index + 1] === "u" ? 6 : 2;
    } else if (value[index] === quote) {
      return index;
    } else {
      index++;
    }
  }
  throw new Error("Unterminated quoted value in FHIR Liquid expression.");
}

function decodeDoubleQuotedString(value: string): string {
  let decoded = "";
  for (let index = 1; index < value.length - 1; index++) {
    const current = value[index];
    if (current !== "\\") {
      decoded += current;
      continue;
    }

    const escaped = value[++index];
    if (escaped === "u") {
      decoded += String.fromCodePoint(
        Number.parseInt(value.slice(index + 1, index + 5), 16),
      );
      index += 4;
      continue;
    }

    const replacements: Record<string, string> = {
      "`": "`",
      "\"": "\"",
      "'": "'",
      "\\": "\\",
      "/": "/",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "\t",
    };
    decoded += replacements[escaped] ?? escaped;
  }
  return decoded;
}

function encodeFhirPathString(value: string): string {
  return "'" + value
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'")
    .replaceAll("\f", "\\f")
    .replaceAll("\n", "\\n")
    .replaceAll("\r", "\\r")
    .replaceAll("\t", "\\t")
    + "'";
}

function defaultValueToString(value: unknown): string {
  const resolved = fhirpath.resolveInternalTypes(value);
  if (typeof resolved === "string") return resolved;
  if (
    typeof resolved === "number"
    || typeof resolved === "boolean"
    || typeof resolved === "bigint"
  ) {
    return String(resolved);
  }
  if (Array.isArray(resolved)) {
    return resolved.map(defaultValueToString).join(", ");
  }
  const json = JSON.stringify(resolved);
  return json ?? String(resolved);
}

function renderMarkdown(value: string): string {
  const result = marked.parse(value);
  if (typeof result !== "string") {
    throw new Error("Asynchronous Markdown rendering is not supported.");
  }
  return result;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
