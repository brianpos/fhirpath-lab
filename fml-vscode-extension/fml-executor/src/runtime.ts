import fhirpath, {type Model, type Options, type UserInvocationTable} from "fhirpath";
import r4 from "fhirpath/fhir-context/r4";
import r5 from "fhirpath/fhir-context/r5";
import stu3 from "fhirpath/fhir-context/stu3";
import {
    type FhirVersion, type GroupDeclaration, type Rule, type RuleSource, type RuleTarget,
    type SourcePosition, type Transform, type TransformParameter, type TypeModel,
    transformDefinitions,
} from "@fhirpath-lab/validator";
import type {
    FmlBinding, FmlExecutionFrameView, FmlExecutionOptions, FmlExecutionRequest, FmlResolveOrigin,
    FmlExecutorConfiguration, FmlTraceMessage, FmlTraceSite, PreparedFmlProgram,
} from "./contracts";
import {createTypeLookup} from "./LabRuntimeModels";
import {cloneFmlValue, isNumericValue, isObject, parseFmlJson, toEvaluationValue} from "./values";
import {expressionBindings, splitFmlPath} from "./FmlExpressions";
import {basicTransform, orderedParameters} from "./BasicTransforms";
import {labFhirPathModel} from "./LabFhirPathModels";
import {compileConceptMap, translateConceptMap, type CompiledConceptMap} from "./ConceptMaps";

export class UnsupportedFmlError extends Error {}

interface Node {
    value: unknown;
    typeName?: string;
    version: FhirVersion;
    metadata?: unknown;
    writable: boolean;
    update?: (value: unknown, metadata?: unknown) => void;
    root?: unknown;
    system?: boolean;
}

interface Property {
    name: string;
    typeName: string;
    repeating: boolean;
    choiceNames?: string[];
}

interface ReadField {
    name: string;
    metadataName: string;
    order: number;
}

type Routine = Generator<Promise<Node[]>, void, Node[]>;
type ExpressionFunction = (value: unknown, variables: Record<string, unknown>, options: Options) => unknown[] | Promise<unknown[]>;
const discardTrace = (): void => {};

export class Frame {
    public readonly local = new Map<string, Node[]>();
    /** Whether each local variable was bound by a source or a target (used to attribute resolve() calls). */
    public readonly modes = new Map<string, "source" | "target">();
    public readonly shared: SharedScope;
    public constructor(public readonly parent?: Frame, shared?: SharedScope) {
        this.shared = shared ?? parent?.shared ?? new SharedScope();
    }
    public get(name: string): Node[] {
        const value = this.local.get(name);
        if (value) return value;
        if (this.parent) return this.parent.get(name);
        throw new Error(`Unresolved mapping variable '${name}'.`);
    }
    public visible(): Map<string, Node[]> {
        const result = this.parent?.visible() ?? new Map<string, Node[]>();
        for (const [name, nodes] of this.local) result.set(name, nodes);
        return result;
    }
    public mode(name: string): "source" | "target" | undefined {
        return this.modes.get(name) ?? (this.local.has(name) ? undefined : this.parent?.mode(name));
    }
    public bind(name: string, nodes: Node[], mode?: "source" | "target"): void {
        this.local.set(name, nodes);
        if (mode) this.modes.set(name, mode); else this.modes.delete(name);
    }
    public has(name: string): boolean { return this.local.has(name) || !!this.parent?.has(name); }
}

class SharedScope {
    public readonly values = new Map<string, {parent: unknown; property: string; node: Node}>();
    public constructor(public readonly parent?: SharedScope) {}
    public get(name: string): {parent: unknown; property: string; node: Node} | undefined {
        return this.values.get(name) ?? this.parent?.get(name);
    }
}

const owners = new WeakMap<GroupDeclaration, BoundProgram>();

export class BoundProgram {
    public readonly lookup: ReturnType<typeof createTypeLookup>;
    private readonly properties = new Map<string, Property>();
    private readonly paths = new Map<string, readonly string[]>();
    private readonly readSelections = new Map<string, {
        fields: readonly ReadField[]; byName?: ReadonlyMap<string, readonly ReadField[]>;
    }>();
    private readonly expressions = new Map<string, ExpressionFunction>();
    private readonly boundExpressions = new Map<string, ReturnType<typeof expressionBindings>>();
    private readonly defaults = new Map<string, GroupDeclaration | undefined>();
    private readonly overlays = new Set<FhirVersion>();
    private readonly wrappers = new Map<string, (value: unknown) => unknown[]>();
    private readonly configuredModels: FmlExecutorConfiguration["fhirPathModels"];
    private readonly models: Partial<Record<FhirVersion, Model>>;
    private readonly sites = new WeakMap<object, FmlTraceSite>();
    public readonly calls = new WeakMap<object, GroupDeclaration>();
    public readonly parameters = new WeakMap<Transform, readonly TransformParameter[]>();
    public readonly bases = new Map<GroupDeclaration, GroupDeclaration>();
    public imports: BoundProgram[] = [];
    public readonly constants = new Map<string, {expression: string; position?: SourcePosition}>();
    public readonly conceptMaps = new Map<string, CompiledConceptMap>();
    private readonly boundGroups = new Set<GroupDeclaration>();
    private metadataBound = false;
    private readonly extensionFunctions = new WeakMap<Model, UserInvocationTable[string]>();

    public constructor(
        public readonly program: PreparedFmlProgram,
        configuration: FmlExecutorConfiguration,
    ) {
        this.lookup = createTypeLookup(program.source);
        this.configuredModels = configuration.fhirPathModels;
        this.models = {R4: r4, R5: r5, STU3: stu3, ...configuration.fhirPathModels};
        for (const group of program.analysis.model.groups) owners.set(group, this);
        for (const constant of program.analysis.model.constants) {
            if (this.constants.has(constant.name)) throw new Error(`Duplicate constant '${constant.name}'.`);
            this.constants.set(constant.name, constant);
        }
    }

    public visible(): BoundProgram[] {
        const seen = new Set<BoundProgram>();
        const visit = (bound: BoundProgram): void => {
            if (seen.has(bound)) return;
            seen.add(bound);
            bound.imports.forEach(visit);
        };
        visit(this);
        return [...seen];
    }

    public group(name: string): GroupDeclaration {
        const groups = this.visible().flatMap(bound => [...bound.program.groups.values()].filter(group => group.name === name));
        if (groups.length !== 1) throw new Error(groups.length ? `Ambiguous group '${name}'.` : `Unresolved group '${name}'.`);
        return groups[0];
    }

    public owner(group: GroupDeclaration): BoundProgram {
        const owner = owners.get(group);
        if (!owner) throw new Error(`Group '${group.name}' has no defining map.`);
        return owner;
    }

    private bindMetadata(): void {
        if (this.metadataBound) return;
        const model = this.program.analysis.model;
        for (const map of model.conceptMaps) {
            const key = map.url.replace(/^#/, "");
            if (this.conceptMaps.has(key)) throw new Error(`Duplicate inline ConceptMap '${key}'.`);
            const prefixes = new Map(map.prefixes.map(prefix => [prefix.id, prefix.url]));
            if (prefixes.size !== map.prefixes.length) throw new Error(`Duplicate prefix in ConceptMap '${key}'.`);
            const groups = map.codeMaps.map(entry => {
                if (!prefixes.has(entry.source.prefix) || !prefixes.has(entry.target.prefix)) throw new Error(`Unresolved ConceptMap prefix in '${key}'.`);
                return {source: prefixes.get(entry.source.prefix), target: prefixes.get(entry.target.prefix),
                    element: [{code: entry.source.code, target: [{code: entry.target.code}]}]};
            });
            this.conceptMaps.set(key, compileConceptMap({resourceType: "ConceptMap", group: groups}));
        }
        const visiting = new Set<string>();
        const checked = new Set<string>();
        const constant = (name: string): void => {
            if (visiting.has(name)) throw new Error(`Constant cycle involving '${name}'.`);
            if (checked.has(name)) return;
            visiting.add(name);
            const declaration = this.constants.get(name);
            if (!declaration) throw new Error(`Unresolved constant '${name}'.`);
            for (const reference of expressionBindings(declaration.expression, new Set(this.constants.keys())).references) {
                if (this.constants.has(reference)) constant(reference);
                else if (!["ucum", "factory"].includes(reference)) throw new Error(`Unresolved constant '${reference}'.`);
            }
            visiting.delete(name);
            checked.add(name);
        };
        for (const name of this.constants.keys()) constant(name);
        this.metadataBound = true;
    }

    public bind(onlyGroup?: GroupDeclaration): void {
        const program = this.program;
        const model = program.analysis.model;
        this.bindMetadata();
        for (const [groupIndex, group] of model.groups.entries()) {
            if (onlyGroup && group !== onlyGroup || this.boundGroups.has(group)) continue;
            this.bindSite(group, "group", `StructureMap.group[${groupIndex}]`);
            if (group.extends) {
                const base = this.group(group.extends);
                this.bases.set(group, base);
                const seen = new Set<GroupDeclaration>([group]);
                let parent: GroupDeclaration | undefined = base;
                while (parent) {
                    if (seen.has(parent)) throw new Error(`Inheritance cycle involving '${parent.name}'.`);
                    seen.add(parent);
                    parent = parent.extends ? this.owner(parent).group(parent.extends) : undefined;
                }
            }
            const scan = (rules: Rule[], path: string): void => {
                for (const [ruleIndex, rule] of rules.entries()) {
                    const rulePath = `${path}.rule[${ruleIndex}]`;
                    this.bindSite(rule, "rule", rulePath);
                    rule.sources.forEach((source, index) => this.bindSite(source, "source", `${rulePath}.source[${index}]`));
                    for (const [index, target] of rule.targets.entries()) {
                        this.bindSite(target, "target", `${rulePath}.target[${index}]`);
                        if (target.transform && !transformDefinitions.has(target.transform.type)) throw new UnsupportedFmlError(`Unknown transform '${target.transform.type}'.`);
                        if (target.transform) this.parameters.set(target.transform, orderedParameters(target.transform));
                    }
                    for (const call of rule.dependent?.invocations ?? []) {
                        this.calls.set(call, this.group(call.name));
                    }
                    scan(rule.dependent?.rules ?? [], rulePath);
                }
            };
            scan(group.rules, `StructureMap.group[${groupIndex}]`);
            const prime = (rules: Rule[], inherited: Map<string, Node>): void => {
                for (const rule of rules) {
                    const scope = new Map(inherited);
                    let focus: Node | undefined;
                    const descend = (context: string, element?: string): Node | undefined => {
                        const [name, ...path] = this.pathParts(context);
                        let node = scope.get(name);
                        for (const part of [...path, ...(element ? this.pathParts(element) : [])]) {
                            if (!node) return undefined;
                            try {
                                const property = this.property(node, part);
                                node = {...node, typeName: property.typeName};
                            } catch (error) {
                                if (error instanceof Error && error.message.startsWith("Choice ")) return undefined;
                                throw error;
                            }
                        }
                        return node;
                    };
                    for (const source of rule.sources) {
                        focus = descend(source.context, source.element);
                        if (!focus && source.type) {
                            const parent = descend(source.context);
                            const alias = model.structures.find(structure => structure.alias === source.type);
                            if (parent) focus = {...parent, typeName: alias?.resolvedTypeName ?? source.type, version: alias?.fhirVersion ?? parent.version};
                        }
                        if (source.defaultValue && focus?.typeName && !this.isPrimitive(focus.typeName, focus.version)) {
                            throw new Error("Source default values are only permitted for primitive types.");
                        }
                        if (focus && source.variable) scope.set(source.variable, focus);
                        const names = new Set([...this.constants.keys(), ...scope.keys(), "ruleId", "callingRuleId"]);
                        for (const text of [source.condition, source.check, source.log]) {
                            if (text && focus) this.expression(text, focus, names);
                        }
                        const parent = descend(source.context);
                        if (source.defaultValue && parent) this.expression(source.defaultValue, parent, names);
                    }
                    for (const target of rule.targets) {
                        const explicit = target.transform?.type === "evaluate" && target.transform.parameters.length === 2
                            ? target.transform.parameters[0] : undefined;
                        const context = explicit?.type === "identifier" ? descend(String(explicit.value)) : focus;
                        for (const parameter of target.transform?.parameters ?? []) {
                            if (parameter.type === "expression" && context) this.expression(String(parameter.value), context,
                                new Set([...this.constants.keys(), ...scope.keys(), "ruleId", "callingRuleId"]));
                        }
                        const targetNode = target.context && descend(target.context, target.element);
                        if (target.variable && targetNode) scope.set(target.variable, targetNode);
                    }
                    prime(rule.dependent?.rules ?? [], scope);
                }
            };
            prime(group.rules, new Map(group.parameters.map(parameter =>
                [parameter.name, this.descriptor(group, parameter.name, undefined, parameter.mode === "target")])));
            this.boundGroups.add(group);
        }
    }

    public descriptor(group: GroupDeclaration, name: string, value: unknown, writable: boolean): Node {
        const input = this.program.analysis.propertyAnalysis.groupInputs.find(input =>
            input.groupName === group.name && input.inputName === name);
        return {
            value,
            root: value,
            typeName: input?.typeName ?? (isObject(value) && typeof value.resourceType === "string" ? value.resourceType : undefined),
            version: input?.fhirVersion
                ?? (writable ? this.program.analysis.model.targetModelVersion : this.program.analysis.model.sourceModelVersion)
                ?? "R4",
            writable,
            system: input?.typeName?.startsWith("System."),
        };
    }

    public property(node: Node, name: string, valueType?: string): Property {
        if (!node.typeName) throw new Error(`Cannot resolve property '${name}' without a model type.`);
        const key = `${node.version}|${node.typeName}|${name}|${valueType ?? ""}`;
        const cached = this.properties.get(key);
        if (cached) return cached;
        const find = (model: TypeModel | undefined, visited = new Set<TypeModel>()): Property | undefined => {
            if (!model || visited.has(model)) return undefined;
            visited.add(model);
            for (const element of model.Elements) {
                const base = element.ElementName.replace(/\[x\]$/, "");
                const choice = base !== element.ElementName;
                const type = element.Type.find(type => choice
                    ? name === base && (!valueType || type.TypeName === valueType)
                        || name === base + type.TypeName[0].toUpperCase() + type.TypeName.slice(1)
                    : name === element.ElementName);
                if (type) {
                    if (choice && name === base && !valueType && element.Type.length !== 1) {
                        throw new Error(`Choice '${node.typeName}.${base}' requires a concrete value type.`);
                    }
                    return {
                        name: choice && name === base ? base + type.TypeName[0].toUpperCase() + type.TypeName.slice(1) : name,
                        typeName: type.TypeName,
                        repeating: element.IsArray ?? false,
                        choiceNames: choice ? element.Type.map(type => base + type.TypeName[0].toUpperCase() + type.TypeName.slice(1)) : undefined,
                    };
                }
            }
            return model.BaseTypeName ? find(this.lookup(model.BaseTypeName, node.version), visited) : undefined;
        };
        const property = find(this.lookup(node.typeName, node.version));
        if (!property) throw new Error(`Property '${node.typeName}.${name}' was not found in ${node.version}.`);
        this.properties.set(key, property);
        return property;
    }

    public isPrimitive(typeName: string, version: FhirVersion): boolean {
        const model = this.lookup(typeName, version);
        return model?.IsPrimitive === true || (model?.Elements.find(element => element.ElementName === "value")
            ?.Type.some(type => this.lookup(type.TypeName, version)?.IsPrimitive) ?? false);
    }

    public primitiveType(typeName: string, version: FhirVersion): string | undefined {
        const model = this.lookup(typeName, version);
        return model?.IsPrimitive ? model.TypeName
            : model?.Elements.find(element => element.ElementName === "value")?.Type[0]?.TypeName;
    }

    public matchesSourceType(node: Node, type: string): boolean {
        const structure = this.program.analysis.model.structures.find(structure => structure.alias === type);
        if (structure?.fhirVersion && structure.fhirVersion !== node.version) return false;
        const expected = structure?.resolvedTypeName ?? type;
        if (!this.lookup(expected, node.version)) throw new Error(`Unknown source type filter '${type}'.`);
        return node.typeName === expected;
    }

    public matchesType(node: Node, type: string): boolean {
        if (!this.lookup(type, node.version)) throw new Error(`Unknown source type filter '${type}'.`);
        const seen = new Set<string>();
        let actual = node.typeName;
        while (actual && !seen.has(actual)) {
            if (actual === type) return true;
            seen.add(actual);
            actual = this.lookup(actual, node.version)?.BaseTypeName;
        }
        return false;
    }

    public validateValue(value: unknown, typeName: string, version: FhirVersion): void {
        if (value === undefined) return;
        const model = this.lookup(typeName, version);
        if (!model) throw new Error(`Unknown runtime type '${typeName}' in ${version}.`);
        const systemType = typeName === "integer64" ? "Long" : (model.IsPrimitive ? typeName
            : model.Elements.find(element => element.ElementName === "value")?.Type[0]?.TypeName)?.replace(/^System\./, "");
        if (!systemType || !this.isPrimitive(typeName, version)) {
            if (!isObject(value)) throw new Error(`Complex type '${typeName}' requires an object value.`);
            if (typeof value.resourceType === "string" && !this.matchesType({value, version, writable: false, typeName: value.resourceType}, typeName)) {
                throw new Error(`Resource type '${value.resourceType}' is incompatible with '${typeName}'.`);
            }
            return;
        }
        if (systemType === "Boolean" && typeof value !== "boolean") throw new Error(`Primitive '${typeName}' requires a boolean value.`);
        if (["String", "Date", "DateTime", "Time"].includes(systemType) && typeof value !== "string") {
            throw new Error(`Primitive '${typeName}' requires a string value.`);
        }
        if (["Decimal", "Integer", "Long"].includes(systemType) && !isNumericValue(value)
            && !(typeName === "integer64" && typeof value === "string" && /^-?\d+$/.test(value))) {
            throw new Error(`Primitive '${typeName}' requires a numeric value.`);
        }
        if (systemType === "Integer" || systemType === "Long") {
            const text = String(value);
            if (!/^-?\d+$/.test(text)) throw new Error(`Primitive '${typeName}' requires an integer value.`);
            const integer = BigInt(text);
            const min = typeName === "positiveInt" ? 1n : typeName === "unsignedInt" ? 0n
                : systemType === "Long" ? -(2n ** 63n) : -(2n ** 31n);
            const max = systemType === "Long" ? 2n ** 63n - 1n : 2n ** 31n - 1n;
            if (integer < min || integer > max) throw new Error(`Primitive '${typeName}' is out of range.`);
        }
    }

    public pathParts(path: string): readonly string[] {
        let parts = this.paths.get(path);
        if (!parts) {
            parts = Object.freeze(splitFmlPath(path));
            this.paths.set(path, parts);
        }
        return parts;
    }

    public read(node: Node, path: string): Node[] {
        if (!path) return [node];
        const [part, ...tail] = this.pathParts(path);
        let value = node.value;
        if (!isObject(value)) {
            const property = this.property(node, part);
            if (part === "value" && tail.length === 0) return [{...node, typeName: property.typeName, metadata: undefined, system: true}];
            value = node.metadata;
        }
        if (!isObject(value)) return [];
        const key = `${node.version}|${node.typeName}|${part}`;
        let selection = this.readSelections.get(key);
        if (!selection) {
            const model = node.typeName ? this.lookup(node.typeName, node.version) : undefined;
            const choice = model?.Elements.find(element => element.ElementName === `${part}[x]`);
            const names = choice
                ? choice.Type.map(type => part + type.TypeName[0].toUpperCase() + type.TypeName.slice(1)) : [part];
            const fields = names.map((name, order) => ({name, metadataName: `_${name}`, order}));
            const byName = choice ? new Map<string, ReadField[]>() : undefined;
            if (byName) for (const field of fields) {
                const matching = byName.get(field.name);
                if (matching) matching.push(field);
                else {
                    const matching = [field];
                    byName.set(field.name, matching);
                    byName.set(field.metadataName, matching);
                }
            }
            selection = {fields, byName};
            this.readSelections.set(key, selection);
        }
        let fields = selection.fields;
        if (selection.byName) {
            const present: ReadField[] = [];
            for (const name of Object.getOwnPropertyNames(value)) {
                const matching = selection.byName.get(name);
                if (!matching || name === matching[0].metadataName && Object.hasOwn(value, matching[0].name)) continue;
                present.push(...matching);
            }
            if (present.length > 1) present.sort((left, right) => left.order - right.order);
            fields = present;
        }
        const nodes: Node[] = [];
        for (const {name, metadataName} of fields) {
            const property = this.property(node, name);
            const data = value[name];
            const metadata = value[metadataName];
            if (!property.repeating && (Array.isArray(data) || Array.isArray(metadata))) {
                throw new Error(`Scalar source '${name}' cannot contain an array.`);
            }
            const values = Array.isArray(data) ? data : data === undefined || data === null ? [] : [data];
            const companions = Array.isArray(metadata) ? metadata : metadata === undefined || metadata === null ? [] : [metadata];
            const length = Math.max(values.length, companions.length);
            for (let index = 0; index < length; index++) {
                if (values[index] == null && companions[index] == null) continue;
                if (!node.writable && property.typeName === "integer64" && values[index] != null
                    && typeof values[index] !== "string" && typeof values[index] !== "bigint") {
                    throw new Error("FHIR JSON integer64 source values must be strings.");
                }
                const child: Node = {
                    value: values[index] ?? undefined, metadata: companions[index] ?? undefined,
                    typeName: isObject(values[index]) && typeof values[index].resourceType === "string"
                        ? values[index].resourceType : property.typeName, version: node.version, writable: node.writable,
                    root: node.root,
                    system: property.typeName.startsWith("System."),
                };
                nodes.push(...(tail.length ? this.read(child, tail.join(".")) : [child]));
            }
        }
        return nodes;
    }

    public context(frame: Frame, path: string): Node[] {
        const [name, ...parts] = this.pathParts(path);
        if (!parts.length) return frame.get(name);
        return frame.get(name).flatMap(node => this.read(node, parts.join(".")));
    }

    public expression(text: string, node: Node, names = new Set<string>()): ExpressionFunction {
        const key = `${node.version}|${node.typeName ?? ""}|${[...names].sort().join(",")}|${text}`;
        const cached = this.expressions.get(key);
        if (cached) return cached;
        const model = this.modelFor(node);
        if (!model) throw new UnsupportedFmlError(`Supply a FHIRPath runtime model for ${node.version} to evaluate expressions.`);
        const expression = this.bindExpression(text, names).text;
        const compiled: ExpressionFunction = fhirpath.compile(
            node.typeName ? {base: node.typeName, expression} : expression,
            model,
            {async: true, resolveInternalTypes: false, preciseMath: true},
        );
        this.expressions.set(key, compiled);
        return compiled;
    }

    private model(version: FhirVersion): Model | undefined {
        if (this.configuredModels?.[version]) return this.configuredModels[version];
        let model = this.models[version];
        if ((!model || Object.keys(this.program.source.customTypeModels ?? {}).length && !this.overlays.has(version)) && version !== "DSTU2") {
            model = labFhirPathModel(version, this.program.source);
            this.models[version] = model;
            this.overlays.add(version);
        }
        return model;
    }

    private modelFor(node: Node): Model | undefined {
        const model = this.model(node.version);
        if (this.configuredModels?.[node.version]) return model;
        if (model && node.typeName && !model.type2Parent[node.typeName] && !model.path2Type[node.typeName]
            && node.version !== "DSTU2" && !node.typeName.startsWith("System.")
            && this.lookup(node.typeName, node.version) && !this.isPrimitive(node.typeName, node.version)) {
            return labFhirPathModel(node.version, this.program.source);
        }
        return model;
    }

    public evaluationValue(node: Node): unknown {
        const value = toEvaluationValue(node.value);
        const model = this.modelFor(node);
        if (!model || !node.typeName || isObject(node.value) && typeof node.value.resourceType === "string") return value;
        const property = `value${node.typeName[0].toUpperCase()}${node.typeName.slice(1)}`;
        const choices = model.choiceTypePaths["Parameters.parameter.value"] ?? model.choiceTypePaths["parameters_parameter.value"];
        const choice = choices?.some(type => type.toLowerCase() === node.typeName?.toLowerCase());
        const key = node.version + "|" + node.typeName + "|" + (choice ? property : "$this");
        let select = this.wrappers.get(key);
        if (!select) {
            select = fhirpath.compile({base: choice ? "Parameters.parameter" : node.typeName, expression: choice ? "value" : "$this"},
                model, {resolveInternalTypes: false});
            this.wrappers.set(key, select);
        }
        return select(choice ? {[property]: value, [`_${property}`]: cloneFmlValue(node.metadata)} : value)[0];
    }

    public bindExpression(text: string, names: ReadonlySet<string>): ReturnType<typeof expressionBindings> {
        const key = [...names].sort().join(",") + "|" + text;
        let bound = this.boundExpressions.get(key);
        if (!bound) { bound = expressionBindings(text, names); this.boundExpressions.set(key, bound); }
        return bound;
    }

    public extensionFunction(node: Node): UserInvocationTable[string] {
        const model = this.modelFor(node);
        if (!model) throw new UnsupportedFmlError(`Supply a FHIRPath runtime model for ${node.version} to evaluate extension().`);
        let invocation = this.extensionFunctions.get(model);
        if (!invocation) {
            const select = fhirpath.compile("extension.where(url = %fmlExtensionUrl).value", model, {resolveInternalTypes: false});
            invocation = {
                arity: {1: ["String"]},
                internalStructures: true,
                fn: (nodes: unknown[], url: unknown): unknown[] => {
                    const value: unknown = fhirpath.util.valData(url);
                    if (value === undefined || value === null) return [];
                    if (typeof value !== "string") throw new Error("extension() requires a string URL.");
                    return select(nodes, {fmlExtensionUrl: value});
                },
            };
            this.extensionFunctions.set(model, invocation);
        }
        return invocation;
    }

    public create(typeName: string, version: FhirVersion): Node {
        const model = this.lookup(typeName, version);
        if (!model) throw new Error(`Cannot create unknown type '${typeName}'.`);
        if (this.isPrimitive(typeName, version)) return {value: undefined, typeName, version, writable: true};
        let base: TypeModel | undefined = model;
        const seen = new Set<TypeModel>();
        while (base?.BaseTypeName && base.TypeName !== "Resource") {
            if (seen.has(base)) throw new Error(`Model inheritance cycle at '${base.TypeName}'.`);
            seen.add(base);
            base = this.lookup(base.BaseTypeName, version);
        }
        const value = base?.TypeName === "Resource" ? {resourceType: typeName} : {};
        return {value, typeName, version, writable: true, root: value};
    }

    public defaultGroup(source: Node, target: Node, element?: string): GroupDeclaration | undefined {
        const key = `${source.version}|${source.typeName}|${target.version}|${target.typeName}|${element}`;
        if (this.defaults.has(key)) return this.defaults.get(key);
        const choice = element && target.typeName && this.lookup(target.typeName, target.version)?.Elements
            .some(property => property.ElementName === `${element}[x]`);
        const targetType = !element ? target.typeName : choice ? undefined : this.property(target, element, source.typeName).typeName;
        const open = !targetType || targetType === "Resource" || targetType === "Element";
        const matches = this.visible().flatMap(bound => [...bound.program.groups.values()].filter(group => {
            if (!group.typeMode || group.parameters.length !== 2) return false;
            const from = bound.descriptor(group, group.parameters[0].name, undefined, false);
            const to = bound.descriptor(group, group.parameters[1].name, undefined, true);
            return from.typeName === source.typeName && from.version === source.version && to.version === target.version
                && (open ? group.typeMode === "type+" : to.typeName === targetType);
        }));
        if (matches.length > 1) throw new Error(`Ambiguous default mapping for '${source.typeName}' to '${targetType ?? element}'.`);
        this.defaults.set(key, matches[0]);
        return matches[0];
    }

    public site(unit: {position?: SourcePosition; name?: string}): FmlTraceSite {
        let site = this.sites.get(unit);
        if (!site) {
            const position = unit.position;
            site = {
                name: unit.name,
                sourceName: this.program.source.sourceName ?? this.program.analysis.model.mapDeclaration?.url
                    ?? this.program.analysis.model.metadata.find(metadata => metadata.path === "url")?.value,
                span: position ? Object.freeze({
                    start: Object.freeze({line: position.startLine, column: position.startColumn}),
                    end: Object.freeze({line: position.endLine, column: position.endColumn}),
                }) : undefined,
            };
            this.sites.set(unit, site);
        }
        return site;
    }

    private bindSite(unit: {position?: SourcePosition; name?: string}, kind: NonNullable<FmlTraceSite["kind"]>, path: string): void {
        this.sites.set(unit, Object.freeze({...this.site(unit), kind, expressionPosition: path}));
    }
}

export class Invocation {
    public currentSite: FmlTraceSite = {};
    private depth = 0;
    private traceDepth = 0;
    private work = 0;
    private outputNodes = 0;
    private readonly constants = new Map<BoundProgram, Map<string, Node[]>>();
    private readonly activeConstants = new Set<object>();
    private readonly listRules = new WeakMap<object, Map<string, {first?: object; last?: object; firstCount: number; lastCount: number}>>();
    private readonly singles = new WeakMap<RuleTarget, WeakSet<object>>();
    private readonly arraySlots = new WeakMap<unknown[], Set<{index: number}>>();
    private readonly writtenArrays = new Map<unknown[], {object: Record<string, unknown>; name: string}>();
    private readonly scalarOwners = new WeakMap<object, Map<string, Node>>();
    private readonly ruleStack: Rule[] = [];
    private currentBound: BoundProgram;
    private readonly sourceRoots: Node[];

    public constructor(
        bound: BoundProgram,
        private readonly request: FmlExecutionRequest,
        private readonly options: FmlExecutionOptions,
    ) {
        this.currentBound = bound;
        this.sourceRoots = request.sources.map(binding => ({
            value: binding.value, typeName: binding.typeName, version: binding.fhirVersion ?? "R4", writable: false,
        }));
    }

    public get bound(): BoundProgram { return this.currentBound; }

    private *constant(name: string): Generator<Promise<Node[]>, Node[], Node[]> {
        let values = this.constants.get(this.bound);
        if (!values) { values = new Map(); this.constants.set(this.bound, values); }
        const cached = values.get(name);
        if (cached) return cached;
        const declaration = this.bound.constants.get(name);
        if (!declaration) throw new Error(`Unresolved mapping variable '${name}'.`);
        if (this.activeConstants.has(declaration)) throw new Error(`Constant cycle involving '${name}'.`);
        this.activeConstants.add(declaration);
        const nodes = yield* this.evaluate(declaration.expression, {
            value: {}, version: this.bound.program.analysis.model.sourceModelVersion ?? "R4", writable: false,
        }, new Frame(), true);
        this.activeConstants.delete(declaration);
        values.set(name, nodes);
        return nodes;
    }

    private *context(frame: Frame, path: string): Generator<Promise<Node[]>, Node[], Node[]> {
        const [name, ...parts] = this.bound.pathParts(path);
        const builtin = name === "ruleId" ? this.ruleStack.at(-1)?.name ?? ""
            : name === "callingRuleId" ? this.ruleStack.at(-2)?.name ?? "" : undefined;
        const nodes = frame.has(name) ? frame.get(name) : !this.bound.constants.has(name) && builtin !== undefined
            ? [this.literal(builtin)] : yield* this.constant(name);
        if (!parts.length) return nodes;
        return nodes.flatMap(node => this.bound.read(node, parts.map(part => part.includes(".") ? `\`${part}\`` : part).join(".")));
    }

    public *run(): Routine {
        this.check();
        const sourceObjects = new WeakSet<object>();
        const visit = (value: unknown, checkSource: boolean, seen = new WeakSet<object>(), active = new WeakSet<object>()): void => {
            if (value === null || typeof value !== "object") return;
            if (active.has(value)) throw new Error("Cyclic input/target data is not supported.");
            if (seen.has(value)) return;
            seen.add(value);
            active.add(value);
            this.check();
            if (checkSource && sourceObjects.has(value)) throw new Error("Inputs and mutable targets must not share objects.");
            if (!checkSource) sourceObjects.add(value);
            for (const child of Object.values(value)) visit(child, checkSource, seen, active);
            active.delete(value);
        };
        this.request.sources.forEach(binding => visit(binding.value, false));
        this.request.targets.forEach(binding => visit(binding.value, true));
        const group = this.request.entryGroup
            ? this.bound.program.groups.get(this.request.entryGroup)
            : this.bound.program.analysis.model.groups[0];
        if (!group) throw new Error(`Entry group '${this.request.entryGroup ?? "(default)"}' was not found.`);
        for (const [mode, bindings] of [["source", this.request.sources], ["target", this.request.targets]] as const) {
            const names = new Set<string>();
            for (const binding of bindings) {
                if (names.has(binding.name)) throw new Error(`Duplicate ${mode} binding '${binding.name}'.`);
                names.add(binding.name);
                if (!group.parameters.some(parameter => parameter.name === binding.name && parameter.mode === mode)) {
                    throw new Error(`Unknown ${mode} binding '${binding.name}' for group '${group.name}'.`);
                }
            }
        }
        const frame = new Frame();
        for (const parameter of group.parameters) {
            const bindings = parameter.mode === "source" ? this.request.sources : this.request.targets;
            const binding = bindings.find(binding => binding.name === parameter.name);
            if (!binding) throw new Error(`Missing ${parameter.mode} binding '${parameter.name}'.`);
            if (parameter.mode === "target" && this.sourceRoots.some(source => source.value === binding.value)) {
                throw new Error("An input root cannot also be a mutable target.");
            }
            const node = this.bound.descriptor(group, parameter.name, binding.value, parameter.mode === "target");
            if (parameter.mode === "target" && !isObject(binding.value)) throw new Error(`Mutable target '${parameter.name}' requires an object.`);
            if (binding.value === undefined || binding.value === null) throw new Error(`Missing value for ${parameter.mode} binding '${parameter.name}'.`);
            const resolved = {...node, typeName: binding.typeName ?? node.typeName, version: binding.fhirVersion ?? node.version};
            if (node.typeName && resolved.typeName && (!this.bound.matchesType(resolved, node.typeName) || resolved.version !== node.version)) {
                throw new Error(`Binding '${parameter.name}' is incompatible with its declared type/model.`);
            }
            if (resolved.typeName) this.bound.validateValue(binding.value, resolved.typeName, resolved.version);
            if (isObject(binding.value) && typeof binding.value.resourceType === "string") resolved.typeName = binding.value.resourceType;
            frame.bind(parameter.name, [resolved], parameter.mode);
        }
        yield* this.group(group, frame);
        for (const [array, {object, name}] of this.writtenArrays) {
            const companions = object[`_${name}`];
            for (let index = array.length - 1; index >= 0; index--) {
                if (array[index] == null && (!Array.isArray(companions) || companions[index] == null)) {
                    array.splice(index, 1);
                    if (Array.isArray(companions)) companions.splice(index, 1);
                }
            }
            if (array.length === 0) delete object[name];
            if (Array.isArray(companions) && companions.every(item => item == null)) delete object[`_${name}`];
        }
    }

    private check(): void {
        this.options.signal?.throwIfAborted();
        if (this.depth > (this.options.limits?.maxDepth ?? 128)) throw new Error("FML recursion limit exceeded.");
        if (++this.work > (this.options.limits?.maxWork ?? 1_000_000)) throw new Error("FML work limit exceeded.");
    }

    /** "rules" and "coverage" detail record rule-level events only (no source/target events). */
    private get leanTrace(): boolean {
        return this.options.traceDetail === "rules" || this.options.traceDetail === "coverage";
    }

    private emit(phase: "enter" | "step" | "exit", unit: {position?: SourcePosition; name?: string}, frame: Frame,
        messages?: readonly FmlTraceMessage[]): void {
        this.currentSite = this.bound.site(unit);
        this.options.signal?.throwIfAborted();
        const observer = this.options.trace;
        if (!observer?.recording) return;
        if (this.leanTrace
            && (this.currentSite.kind === "source" || this.currentSite.kind === "target")) return;
        try {
            observer.onEvent(phase, this.currentSite, this.frameView(frame), messages);
        } catch (error) {
            throw new Error(`Trace observer failed: ${error instanceof Error ? error.message : String(error)}`, {cause: error});
        }
        this.options.signal?.throwIfAborted();
    }

    private frameView(frame: Frame): FmlExecutionFrameView {
        const invocation = this;
        const bound = this.bound;
        const depth = this.traceDepth;
        return {
            depth,
            get bindings() {
                // Inspect only constants already evaluated by this invocation; recording must not force lazy work.
                const visible = new Map(invocation.constants.get(bound));
                for (const [name, nodes] of frame.visible()) visible.set(name, nodes);
                return new Map([...visible].map(([name, nodes]) =>
                    [name, nodes.map(node => invocation.binding(name, node))]));
            },
        };
    }

    private log(name: string, values: readonly unknown[], frame: Frame): void {
        const trace = this.options.trace;
        if (!this.options.log && !(trace?.recording && trace.onMessage)) return;
        const data = values.map(value => isObject(value) && "data" in value && typeof value.getTypeInfo === "function"
            ? value.data : isNumericValue(value) ? value : fhirpath.resolveInternalTypes(value));
        if (this.options.log) {
            try { this.options.log(name, data.map(value => cloneFmlValue(value))); }
            catch (error) { throw new Error(`Log host service failed: ${String(error)}`, {cause: error}); }
        }
        if (trace?.recording && trace.onMessage) {
            try { trace.onMessage(name, data, this.currentSite, this.frameView(frame)); }
            catch (error) { throw new Error(`Trace message observer failed: ${String(error)}`, {cause: error}); }
        }
    }

    private binding(name: string, node: Node): FmlBinding {
        return {name, value: node.value, typeName: node.typeName, fhirVersion: node.version,
            primitiveMetadata: node.metadata, mode: node.writable ? "target" : "source"};
    }

    private *group(group: GroupDeclaration, frame: Frame): Routine {
        const previous = this.currentBound;
        this.currentBound = this.bound.owner(group);
        this.currentSite = this.bound.site(group);
        this.check();
        this.bound.bind(group);
        for (const parameter of group.parameters) {
            const descriptor = this.bound.descriptor(group, parameter.name, undefined, parameter.mode === "target");
            const nodes = frame.get(parameter.name).map(node => {
                if (node.system && descriptor.typeName) {
                    this.bound.validateValue(node.value, descriptor.typeName, descriptor.version);
                    return {...node, typeName: descriptor.typeName, version: descriptor.version, system: false};
                }
                return node;
            });
            frame.bind(parameter.name, nodes, parameter.mode);
            for (const node of nodes) {
                if (descriptor.typeName && node.typeName && (!this.bound.matchesType(node, descriptor.typeName) || node.version !== descriptor.version)) {
                    throw new Error(`Group '${group.name}' received an incompatible '${parameter.name}' type/model binding.`);
                }
            }
        }
        this.emit("enter", group, frame);
        this.depth++;
        this.traceDepth++;
        const base = this.bound.bases.get(group);
        if (base) {
            const inherited = new Frame();
            for (const parameter of base.parameters) inherited.bind(parameter.name, frame.get(parameter.name), parameter.mode);
            yield* this.group(base, inherited);
        }
        for (const rule of group.rules) yield* this.rule(rule, frame);
        this.depth--;
        this.traceDepth--;
        this.emit("exit", group, frame);
        this.currentBound = previous;
    }

    private *rule(rule: Rule, parent: Frame): Routine {
        this.currentSite = this.bound.site(rule);
        this.check();
        if (rule.identityFields) {
            for (const field of rule.identityFields) {
                yield* this.rule({...rule, identityFields: undefined,
                    sources: rule.sources.map(source => ({...source, element: field.name})),
                    targets: rule.targets.map(target => ({...target, element: field.name}))}, parent);
            }
            return;
        }
        const match = function*(this: Invocation, index: number, frame: Frame, matched: Node[]): Routine {
            if (index < rule.sources.length) {
                const source = rule.sources[index];
                this.currentSite = this.bound.site(source);
                const traceSource = this.options.trace?.recording && !this.leanTrace;
                if (traceSource) {
                    this.emit("enter", source, frame);
                    this.traceDepth++;
                }
                const sourceContexts = yield* this.context(frame, source.context);
                let values = sourceContexts.flatMap(node => this.bound.read(node, source.element ?? ""));
                const readCount = values.length;
                const sourceType = source.type;
                if (sourceType) {
                    values = values.filter(node => this.bound.matchesSourceType(node, sourceType));
                    if (traceSource && this.options.trace?.recording) {
                        this.emitSourceSelection("step", source, frame, values,
                            [{name: "type", text: [`${sourceType}: ${values.length} match(es)`]}]);
                    }
                }
                if (source.min !== undefined && values.length < source.min || typeof source.max === "number" && values.length > source.max) {
                    throw new Error(`Source '${source.context}.${source.element ?? ""}' violates its cardinality.`);
                }
                if (values.length === 0 && source.defaultValue) {
                    const context = sourceContexts[0];
                    if (!context) throw new Error(`Source context '${source.context}' is empty.`);
                    values = yield* this.evaluate(source.defaultValue, context, frame);
                    values = values.map(value => {
                        const alias = this.bound.program.analysis.model.structures.find(structure => structure.alias === source.type);
                        const type = source.element ? this.bound.property(context, source.element, alias?.resolvedTypeName ?? source.type ?? value.typeName).typeName
                            : context.typeName;
                        if (!type || !this.bound.isPrimitive(type, context.version)) throw new Error("Source default values are only permitted for primitive types.");
                        this.bound.validateValue(value.value, type, context.version);
                        return {...value, typeName: type, version: context.version, root: context.root, system: false};
                    });
                    if (traceSource && this.options.trace?.recording) {
                        this.emitSourceSelection("step", source, frame, values, [{name: "default", text: ["Applied source default"]}]);
                    }
                }
                const candidates: {value: Node; frame: Frame}[] = [];
                for (const value of values) {
                    this.check();
                    const child = new Frame(frame);
                    if (source.variable) child.bind(source.variable, [value], "source");
                    if (source.condition) {
                        const matches = this.boolean(yield* this.evaluate(source.condition, value, child));
                        if (traceSource && this.options.trace?.recording) {
                            this.emit("step", source, child, [{name: "where", text: [String(matches)]}]);
                        }
                        if (!matches) continue;
                    }
                    if (source.check) {
                        const valid = this.boolean(yield* this.evaluate(source.check, value, child));
                        if (traceSource && this.options.trace?.recording) {
                            this.emit("step", source, child, [{name: "check", text: [String(valid)]}]);
                        }
                        if (!valid) throw new Error("FML check failed.");
                    }
                    if (source.log) {
                        const logged = yield* this.evaluate(source.log, value, child);
                        if (logged.length) this.log(rule.name ?? "", logged.map(node => node.value), child);
                    }
                    candidates.push({value, frame: child});
                }
                if (source.listMode === "only_one" && candidates.length > 1) throw new Error("only_one allows at most one source item.");
                const selected = source.listMode === "first" ? candidates.slice(0, 1)
                    : source.listMode === "last" ? candidates.slice(-1)
                    : source.listMode === "not_first" ? candidates.slice(1)
                    : source.listMode === "not_last" ? candidates.slice(0, -1) : candidates;
                if (source.listMode && traceSource && this.options.trace?.recording) {
                    this.emitSourceSelection("step", source, frame, selected.map(candidate => candidate.value),
                        [{name: source.listMode, text: [`${selected.length} selected`]}]);
                }
                if (selected.length === 0 && this.options.traceDetail === "coverage") {
                    this.emit("step", rule, frame, [{name: "coverage",
                        text: [readCount === 0 ? "no-source-values" : "filtered"]}]);
                }
                if (traceSource) {
                    this.traceDepth--;
                    if (this.options.trace?.recording) {
                        this.emitSourceSelection("exit", source, frame, selected.map(candidate => candidate.value));
                    }
                }
                for (const {value, frame: child} of selected) {
                    yield* match.call(this, index + 1, child, [...matched, value]);
                }
                return;
            }
            this.emit("enter", rule, frame);
            this.depth++;
            this.traceDepth++;
            for (const target of rule.targets) yield* this.target(target, frame, matched, rule);
            const block = new Frame(frame, new SharedScope(frame.shared));
            for (const child of rule.dependent?.rules ?? []) yield* this.rule(child, block);
            for (const call of rule.dependent?.invocations ?? []) {
                const callee = this.bound.calls.get(call);
                if (!callee) throw new Error(`Unbound group '${call.name}'.`);
                if (callee.parameters.length !== call.parameters.length) throw new Error(`Invalid argument count for '${call.name}'.`);
                const argumentsFrame = new Frame();
                const callContext = matched.at(-1);
                if (!callContext) throw new Error("A group invocation requires a source context.");
                for (const [index, parameter] of callee.parameters.entries()) {
                    const argument = call.parameters[index];
                    const nodes = yield* this.argument(argument, frame, callContext);
                    if (parameter.mode === "target" && (nodes.length !== 1 || nodes.some(node => !node.writable))) {
                        throw new Error(`Group target '${parameter.name}' requires a writable target argument.`);
                    }
                    argumentsFrame.bind(parameter.name, nodes.map(node =>
                        parameter.mode === "source" ? {...node, writable: false} : node), parameter.mode);
                }
                yield* this.group(callee, argumentsFrame);
            }
            this.depth--;
            this.traceDepth--;
            this.emit("exit", rule, frame);
        };
        this.ruleStack.push(rule);
        try { yield* match.call(this, 0, new Frame(parent), []); }
        finally { this.ruleStack.pop(); }
    }

    private boolean(nodes: Node[]): boolean {
        if (nodes.length === 0) return false;
        if (nodes.length !== 1 || typeof nodes[0].value !== "boolean") throw new Error("FHIRPath predicate must return a single boolean.");
        return nodes[0].value;
    }

    private emitSourceSelection(phase: "step" | "exit", source: RuleSource, frame: Frame, values: Node[],
        messages?: readonly FmlTraceMessage[]): void {
        if (!this.options.trace?.recording || this.leanTrace) return;
        const snapshot = new Frame(frame);
        if (source.variable) snapshot.bind(source.variable, values, "source");
        this.emit(phase, source, snapshot, messages);
    }

    private *evaluate(text: string, context: Node, frame: Frame, constant = false): Generator<Promise<Node[]>, Node[], Node[]> {
        this.check();
        const names = new Set([...this.bound.constants.keys(), ...frame.visible().keys(), "ruleId", "callingRuleId"]);
        const binding = this.bound.bindExpression(text, names);
        const references = binding.references;
        const lexical = new Frame(frame);
        for (const name of references) {
            if (!lexical.has(name) && this.bound.constants.has(name)) lexical.local.set(name, yield* this.constant(name));
        }
        const environment: Record<string, unknown> = {};
        for (const name of references) {
            if (lexical.has(name)) {
                environment[binding.variables.get(name) ?? name] = lexical.get(name).map(node => this.bound.evaluationValue(node));
            }
        }
        if (!constant && (references.includes("resource") && !lexical.has("resource")
            || references.includes("rootResource") && !lexical.has("rootResource"))) {
            const root = toEvaluationValue(context.root ?? this.sourceRoots[0]?.value);
            if (!lexical.has("resource")) environment.resource = root;
            if (!lexical.has("rootResource")) environment.rootResource = root;
        }
        if (!lexical.has("ruleId")) environment.ruleId = this.ruleStack.at(-1)?.name ?? "";
        if (!lexical.has("callingRuleId")) environment.callingRuleId = this.ruleStack.at(-2)?.name ?? "";
        const traceFn = this.options.log || this.options.trace?.recording && this.options.trace.onMessage
            ? (values: unknown[], label: string) => this.log(label, values, frame) : discardTrace;
        const result = this.bound.expression(text, context, names)(
            this.bound.evaluationValue(context), environment,
            {...this.options.fhirPath, signal: this.options.signal,
                userInvocationTable: {extension: this.bound.extensionFunction(context), resolve: {arity: {0: []}, fn: (values: unknown[]) => {
                    const origin = this.resolveOrigin(text, context, frame, references);
                    return Promise.all(values.map(value => this.resolve(value, origin))).then(values => values.filter(value => value !== undefined));
                }}},
                traceFn},
        );
        const convert = (values: unknown[]): Node[] => values.map(value => {
            if (isObject(value) && "data" in value && typeof value.getTypeInfo === "function") {
                const primitive = value.convertData instanceof Function ? value.convertData() : value.data;
                return {value: isNumericValue(primitive) ? primitive : value.data, metadata: value._data ?? undefined, typeName: typeof value.fhirNodeDataType === "string"
                    ? value.fhirNodeDataType : undefined, version: context.version, writable: false, root: context.root,
                    system: typeof value.fhirNodeDataType === "string" && value.fhirNodeDataType.startsWith("System.")};
            }
            const typeName = fhirpath.types([value])[0]?.replace(/^(FHIR|System)\./, "");
            const type = ({String: "string", Boolean: "boolean", Integer: "integer", Long: "integer64", Decimal: "decimal",
                Date: "date", DateTime: "dateTime", Time: "time"} as Record<string, string>)[typeName ?? ""] ?? typeName;
            if (typeName === "Quantity" && isObject(value) && isNumericValue(value.value) && typeof value.unit === "string") {
                const ucum = value.unit.startsWith("'") && value.unit.endsWith("'");
                const unit = ucum ? value.unit.slice(1, -1) : value.unit;
                return {value: {value: cloneFmlValue(value.value), unit, ...(ucum ? {system: "http://unitsofmeasure.org", code: unit} : {})},
                    typeName: "Quantity", version: context.version, writable: false, system: true};
            }
            return {value: isNumericValue(value) ? value : fhirpath.resolveInternalTypes(value), typeName: type,
                version: context.version, writable: false, system: true};
        });
        return result instanceof Promise ? yield result.then(convert) : convert(result);
    }

    /** Describes where a resolve() call came from so the host can pick the source or target server. */
    private resolveOrigin(expression: string, context: Node, frame: Frame, references: readonly string[]): FmlResolveOrigin {
        const variables = [...new Set(references)].filter(name => frame.has(name))
            .map(name => ({name, mode: frame.mode(name)}))
            .filter((entry): entry is {name: string; mode: "source" | "target"} => entry.mode !== undefined);
        let mode: "source" | "target" | undefined;
        let variable: string | undefined;
        if (isObject(context.value)) {
            for (const [name, nodes] of frame.visible()) {
                if (nodes.some(node => node.value === context.value) && frame.mode(name)) {
                    variable = name;
                    mode = frame.mode(name);
                }
            }
        }
        mode ??= context.root !== undefined && this.sourceRoots.some(root => root.value === context.root) ? "source"
            : context.root !== undefined && this.request.targets.some(binding => binding.value === context.root) ? "target"
            : variables[0]?.mode;
        return {mode: mode ?? "unknown", variable, expression, variables, site: this.currentSite,
            rule: this.ruleStack.at(-1)?.name};
    }

    private async resolve(value: unknown, origin: FmlResolveOrigin): Promise<unknown | undefined> {
        if (isObject(value) && "data" in value && typeof value.getTypeInfo === "function") value = value.data;
        const reference = typeof value === "string" ? value : isObject(value) && typeof value.reference === "string" ? value.reference : undefined;
        if (!reference) throw new Error("resolve requires a reference string.");
        if (this.options.resolve) {
            const resource = await this.options.resolve(reference, this.options.signal, origin);
            if (resource === undefined) return undefined;
            if (!isObject(resource) || typeof resource.resourceType !== "string") throw new Error("The resolve host service did not return a resource.");
            return toEvaluationValue(resource);
        }
        if (reference.startsWith("#")) {
            const root = this.sourceRoots[0]?.value;
            return isObject(root) && Array.isArray(root.contained)
                ? root.contained.find(resource => isObject(resource) && resource.id === reference.slice(1)) : undefined;
        }
        if (!/^https?:\/\//.test(reference)) throw new Error("A resolve host service is required for relative or canonical references.");
        const url = new URL(reference);
        const headers = Object.entries(this.options.fhirPath?.httpHeaders ?? {}).find(([base]) => {
            const server = new URL(base);
            const path = server.pathname.replace(/\/$/, "");
            return url.origin === server.origin && (url.pathname === path || url.pathname.startsWith(path + "/"));
        })?.[1];
        const response = await fetch(reference, {headers: {Accept: "application/fhir+json", ...headers}, signal: this.options.signal});
        if (response.status === 404 || response.status === 410) return undefined;
        if (!response.ok) throw new Error(`FHIRPath resolve returned HTTP ${response.status}.`);
        const resource = parseFmlJson(await response.text());
        if (!isObject(resource) || typeof resource.resourceType !== "string") throw new Error("FHIRPath resolve did not return a resource.");
        if (resource.resourceType === "OperationOutcome" && Array.isArray(resource.issue)
            && resource.issue.some(issue => isObject(issue) && ["error", "fatal"].includes(String(issue.severity)))) {
            throw new Error("FHIRPath resolve returned an error OperationOutcome.");
        }
        return toEvaluationValue(resource);
    }

    private literal(value: unknown, position?: SourcePosition): Node {
        const raw = position && this.bound.program.source.sourceText.slice(position.startIndex, position.endIndex);
        const exact = typeof value === "number" && raw ? parseFmlJson(raw) : value;
        return {value: exact, typeName: typeof value === "string" ? "string" : typeof value === "boolean" ? "boolean"
            : raw && /^\d+$/.test(raw) ? "integer" : "decimal",
            version: this.bound.program.analysis.model.targetModelVersion ?? "R4", writable: false, system: true};
    }

    private *argument(parameter: Pick<TransformParameter, "type" | "value" | "position">,
        frame: Frame, context: Node): Generator<Promise<Node[]>, Node[], Node[]> {
        if (parameter.type === "identifier") return yield* this.context(frame, String(parameter.value));
        if (parameter.type === "expression") return yield* this.evaluate(String(parameter.value), context, frame);
        const raw = parameter.position && this.bound.program.source.sourceText.slice(parameter.position.startIndex, parameter.position.endIndex);
        if (raw && (raw.startsWith("@") || raw === "{}" || /^\d+L$/.test(raw) || /^\d+(?:\.\d+)?\s+(?:'|[A-Za-z])/.test(raw))) {
            return yield* this.evaluate(raw, context, frame);
        }
        return [this.literal(parameter.value, parameter.position)];
    }

    private *transform(transform: Transform, frame: Frame, context: Node, targetContext: Node): Generator<Promise<Node[]>, Node[], Node[]> {
        const parameters = this.bound.parameters.get(transform);
        if (!parameters) throw new Error("The transform was not bound during preparation.");
        const definition = transformDefinitions.get(transform.type);
        if (!definition || !(transform.type === "evaluate" && !transform.isInvocation && parameters.length === 1)
            && !definition.signatures.some(signature => {
                const required = signature.parameters.filter(parameter => !parameter.optional && !parameter.variadic).length;
                return parameters.length >= required && (signature.parameters.some(parameter => parameter.variadic)
                    || parameters.length <= signature.parameters.length);
            })) {
            throw new Error(`Invalid argument count for transform '${transform.type}'.`);
        }
        if (transform.type === "evaluate") {
            const focus = parameters.length === 2 ? yield* this.argument(parameters[0], frame, context) : [context];
            const expression = parameters.at(-1);
            if (!expression) throw new Error("evaluate requires an expression.");
            const output: Node[] = [];
            const text = expression.type === "literal" && expression.position
                ? this.bound.program.source.sourceText.slice(expression.position.startIndex, expression.position.endIndex) : String(expression.value);
            for (const node of focus) output.push(...yield* this.evaluate(text, node, frame));
            return output;
        }
        const args: Node[][] = [];
        for (const argument of parameters) args.push(yield* this.argument(argument, frame, context));
        if (args.some(argument => argument.length === 0) && transform.type !== "append") return [];
        const singleton = (index: number): Node => {
            if (args[index]?.length !== 1) throw new Error(`${transform.type} argument ${index + 1} requires a singleton.`);
            return args[index][0];
        };
        const string = (index: number): string => {
            const value = singleton(index).value;
            if (typeof value !== "string") throw new Error(`${transform.type} argument ${index + 1} requires a string.`);
            return value;
        };
        if (transform.type === "copy") return args[0] ?? [];
        if (transform.type === "cast" && args[0]?.length) {
            const type = parameters.length === 2 ? string(1).replace(/^FHIR\./, "") : targetContext.typeName;
            if (!type) throw new Error("cast requires an explicit or unambiguous target type.");
            const value = singleton(0);
            if (value.typeName && this.bound.primitiveType(value.typeName, value.version) !== this.bound.primitiveType(type, targetContext.version)) {
                throw new UnsupportedFmlError(`Nontrivial cast from '${value.typeName}' to '${type}' is unsupported pending specification clarification.`);
            }
            this.bound.validateValue(value.value, type, targetContext.version);
            if (isObject(value.value) && value.typeName && !this.bound.matchesType(value, type)) {
                throw new UnsupportedFmlError(`Nontrivial cast from '${value.typeName}' to '${type}' is unsupported pending specification clarification.`);
            }
            return [{...value, typeName: type, version: targetContext.version}];
        }
        if (transform.type === "create") {
            const typeName = string(0);
            const structure = this.bound.program.analysis.model.structures.find(structure => structure.alias === typeName);
            return [this.bound.create(structure?.resolvedTypeName ?? typeName, structure?.fhirVersion ?? targetContext.version)];
        }
        if (transform.type === "append") {
            if (args.some(arg => arg.length > 1)) throw new Error("append arguments must be singletons.");
            return [{...context, value: args.map(arg => arg[0]?.value ?? "").join(""), metadata: undefined, typeName: "string", writable: false, system: true}];
        }
        if (transform.type === "truncate") {
            const text = string(0);
            const rawLength = singleton(1).value;
            const length = Number(String(rawLength));
            if (!isNumericValue(rawLength) || !Number.isSafeInteger(length) || length < 0) throw new Error("Invalid truncate integer length.");
            return [{...context, value: text.slice(0, length), metadata: undefined, typeName: "string", writable: false, system: true}];
        }
        if (transform.type === "translate") {
            const source = singleton(0);
            const canonical = string(1);
            const output = string(2);
            const allowed = definition.signatures[0].parameters[2].allowedValues;
            if (!allowed?.includes(output)) throw new Error(`Invalid translate output type '${output}'.`);
            if (canonical.startsWith("#")) {
                const map = this.bound.conceptMaps.get(canonical.slice(1));
                if (!map) throw new Error(`Unresolved inline ConceptMap '${canonical}'.`);
                return translateConceptMap(map, this.binding("source", source), output).map(binding => ({
                    value: binding.value, typeName: binding.typeName, version: targetContext.version, writable: false,
                }));
            }
            if (!this.options.translate) throw new Error("The translate host service is required.");
            const bindings = yield this.options.translate(
                this.binding("source", {...source, value: cloneFmlValue(source.value), metadata: cloneFmlValue(source.metadata)}),
                canonical, output, this.options.signal,
            ).then(bindings => bindings.map(binding => {
                if (!binding || binding.value === undefined && binding.primitiveMetadata === undefined) {
                    throw new Error("The translate host service returned a binding with no value or primitive metadata; return [] for an empty result.");
                }
                return {
                    value: binding.value, metadata: binding.primitiveMetadata, typeName: binding.typeName,
                    version: binding.fhirVersion ?? targetContext.version, writable: false,
                };
            }));
            return bindings;
        }
        if ((transform.type === "reference" || transform.type === "pointer") && this.options.reference) {
            const reference = this.options.reference(this.binding("resource", singleton(0)));
            if (typeof reference !== "string" || !reference.length) throw new Error("The reference host service must return a reference string.");
            return [{value: reference, typeName: "string", version: targetContext.version, writable: false, system: true}];
        }
        return basicTransform(transform.type, args.map(nodes => nodes.map(node => node.value)), targetContext.typeName, this.options)
            .map(value => ({...value, version: targetContext.version, writable: false,
                system: this.bound.isPrimitive(value.typeName, targetContext.version)}));
    }

    private allocate(): void {
        if (++this.outputNodes > (this.options.limits?.maxOutputNodes ?? 1_000_000)) throw new Error("FML output node limit exceeded.");
    }

    private write(parent: Node, property: Property, values: Node[], target?: RuleTarget): Node[] {
        if (!parent.writable) throw new Error("Target context must be a writable object.");
        if (!property.repeating && values.length > 1) throw new Error(`Scalar target '${property.name}' received multiple values.`);
        if (values.some(value => !value.system && value.version !== parent.version)) {
            throw new Error("Cross-version element assignment requires a mapping or a version-independent transform result.");
        }
        if (parent.typeName && this.bound.isPrimitive(parent.typeName, parent.version)) {
            if (property.name === "value") {
                if (values.length !== 1) return [];
                this.bound.validateValue(values[0].value, parent.typeName, parent.version);
                parent.value = cloneFmlValue(values[0].value, () => this.allocate());
                if (parent.typeName === "integer64" && parent.value !== undefined) parent.value = String(parent.value);
                parent.update?.(parent.value, parent.metadata);
                return [parent];
            }
            parent.metadata ??= {};
            const result = this.write({...parent, value: parent.metadata, typeName: "Element"}, property, values, target);
            parent.update?.(parent.value, parent.metadata);
            return result;
        }
        if (!isObject(parent.value)) throw new Error("Target context must be a writable object.");
        if (["__proto__", "constructor", "prototype"].includes(property.name)) throw new Error(`Unsafe target property '${property.name}'.`);
        const object = parent.value;
        const attached: Node[] = [];
        for (const value of values) {
            if (this.bound.isPrimitive(property.typeName, parent.version) && isObject(value.value)) {
                throw new Error(`Primitive target '${property.name}' received a complex value.`);
            }
            this.bound.validateValue(value.value, property.typeName, parent.version);
            if (value.writable) this.allocate();
            const copy: Node = {...value, value: value.writable ? value.value : cloneFmlValue(value.value, () => this.allocate()),
                metadata: cloneFmlValue(value.metadata, () => this.allocate()),
                typeName: isObject(value.value) && typeof value.value.resourceType === "string"
                    ? value.value.resourceType : property.typeName, version: parent.version, writable: true};
            copy.root = isObject(copy.value) && typeof copy.value.resourceType === "string" ? copy.value : parent.root;
            if (property.typeName === "integer64" && copy.value !== undefined) {
                const integer = String(copy.value);
                if (!/^-?\d+$/.test(integer)) throw new Error("integer64 requires an integer value.");
                if (BigInt(integer) < -(2n ** 63n) || BigInt(integer) >= 2n ** 63n) throw new Error("integer64 value is out of range.");
                copy.value = integer;
            }
            for (const alternative of property.choiceNames ?? []) {
                if (alternative !== property.name) {
                    delete object[alternative]; delete object[`_${alternative}`];
                    this.scalarOwners.get(object)?.delete(alternative);
                }
            }
            if (property.repeating) {
                const data = object[property.name];
                if (data !== undefined && !Array.isArray(data)) throw new Error(`Repeating target '${property.name}' is not an array.`);
                const array = Array.isArray(data) ? data : [];
                object[property.name] = array;
                this.writtenArrays.set(array, {object, name: property.name});
                const metadataName = `_${property.name}`;
                const existingMetadata = object[metadataName];
                if (existingMetadata !== undefined && !Array.isArray(existingMetadata)) throw new Error(`Primitive metadata '${metadataName}' is not an array.`);
                let companions = Array.isArray(existingMetadata) ? existingMetadata : undefined;
                if (copy.metadata !== undefined && !companions) {
                    companions = Array(array.length).fill(null);
                    object[metadataName] = companions;
                }
                let modes = this.listRules.get(object);
                if (!modes) { modes = new Map(); this.listRules.set(object, modes); }
                let mode = modes.get(property.name);
                if (!mode) { mode = {lastCount: 0, firstCount: 0}; modes.set(property.name, mode); }
                modes.set(property.name, mode);
                if (target?.listMode === "single") {
                    let parents = this.singles.get(target);
                    if (!parents) { parents = new WeakSet(); this.singles.set(target, parents); }
                    if (parents.has(object)) throw new Error("single target produced multiple instances.");
                    parents.add(object);
                }
                if (target?.listMode === "first" && mode.first && mode.first !== target) throw new Error("Multiple first rules target the same list.");
                if (target?.listMode === "last" && mode.last && mode.last !== target) throw new Error("Multiple last rules target the same list.");
                const index = target?.listMode === "first" ? mode.firstCount++ : target?.listMode === "last"
                    ? array.length : array.length - mode.lastCount;
                if (target?.listMode === "first") mode.first = target;
                if (target?.listMode === "last") { mode.last = target; mode.lastCount++; }
                let slots = this.arraySlots.get(array);
                if (!slots) { slots = new Set(); this.arraySlots.set(array, slots); }
                if (index < array.length) {
                    for (const slot of slots) if (slot.index >= index) slot.index++;
                }
                const slot = {index};
                slots.add(slot);
                if (index === array.length) {
                    array.push(copy.value ?? null);
                    if (companions) companions.push(copy.metadata ?? null);
                } else {
                    array.splice(index, 0, copy.value ?? null);
                    if (companions) companions.splice(index, 0, copy.metadata ?? null);
                }
                copy.update = (data, metadata) => {
                    const actual = slot.index;
                    copy.value = data; copy.metadata = metadata;
                    array[actual] = data ?? null;
                    if (metadata !== undefined && !companions) { companions = Array(array.length).fill(null); object[metadataName] = companions; }
                    if (companions) companions[actual] = metadata ?? null;
                };
            } else {
                let owners = this.scalarOwners.get(object);
                if (!owners) { owners = new Map(); this.scalarOwners.set(object, owners); }
                owners.set(property.name, copy);
                const owner = owners;
                if (copy.value !== undefined) object[property.name] = copy.value;
                else delete object[property.name];
                if (copy.metadata !== undefined) object[`_${property.name}`] = copy.metadata;
                else delete object[`_${property.name}`];
                copy.update = (data, metadata) => {
                    copy.value = data; copy.metadata = metadata;
                    if (owner.get(property.name) !== copy) return;
                    if (data !== undefined) object[property.name] = data; else delete object[property.name];
                    if (metadata !== undefined) object[`_${property.name}`] = metadata; else delete object[`_${property.name}`];
                };
            }
            attached.push(copy);
        }
        return attached;
    }

    private *target(target: RuleTarget, frame: Frame, matched: Node[], rule: Rule): Routine {
        this.check();
        this.currentSite = this.bound.site(target);
        const traceTarget = this.options.trace?.recording && !this.leanTrace;
        if (traceTarget) {
            this.emit("enter", target, frame);
            this.traceDepth++;
        }
        const contexts = target.context ? yield* this.context(frame, target.context) : [];
        const context = contexts[0] ?? matched[0];
        if (!context) throw new Error("A target requires an evaluation context.");
        let values: Node[] = [];
        if (target.element) {
            const parts = this.bound.pathParts(target.element);
            let parents = contexts;
            for (const part of parts.slice(0, -1)) {
                parents = parents.flatMap(parent => {
                    const property = this.bound.property(parent, part);
                    const existing = property.repeating ? [] : this.bound.read(parent, part);
                    if (existing.length) return existing;
                    return this.write(parent, property, [this.bound.create(property.typeName, parent.version)]);
                });
            }
            const result: Node[] = [];
            for (const parent of parents) {
                const element = parts[parts.length - 1];
                const shared = target.listMode === "share" && target.listRuleId ? frame.shared.get(target.listRuleId) : undefined;
                if (shared) {
                    if (shared.parent !== parent.value || shared.property !== element) throw new Error(`Shared target '${target.listRuleId}' has conflicting contexts.`);
                    result.push(shared.node);
                    continue;
                }
                const implicit = !target.transform && !target.variable && !rule.dependent;
                const selected = implicit && matched.length === 1 ? this.bound.defaultGroup(matched[0], parent, element) : undefined;
                if (selected) {
                    const owner = this.bound.owner(selected);
                    const descriptor = owner.descriptor(selected, selected.parameters[1].name, undefined, true);
                    if (!descriptor.typeName) throw new Error("Default mapping target type is unresolved.");
                    values = [owner.create(descriptor.typeName, descriptor.version)];
                } else if (target.transform) {
                    let targetType: string | undefined;
                    try { targetType = this.bound.property(parent, element).typeName; }
                    catch (error) { if (!(error instanceof Error) || !error.message.startsWith("Choice ")) throw error; }
                    values = yield* this.transform(target.transform, frame, matched.at(-1) ?? context, {...parent, typeName: targetType});
                } else if (implicit) {
                    if (matched.length !== 1) throw new Error("An implicit target value requires one matched source.");
                    values = [matched[0]];
                } else {
                    const property = this.bound.property(parent, element);
                    values = [this.bound.create(property.typeName, parent.version)];
                }
                if (target.listMode === "single" && values.length !== 1) throw new Error("single target requires one instance.");
                if (values.length > 1 && !this.bound.property(parent, element, values[0].typeName).repeating) {
                    throw new Error(`Scalar target '${element}' received multiple values.`);
                }
                for (const value of values) {
                    const property = this.bound.property(parent, element, value.typeName);
                    const attached = this.write(parent, property, [value], target);
                    result.push(...attached);
                    if (target.listMode === "share" && target.listRuleId && attached[0]) {
                        frame.shared.values.set(target.listRuleId, {parent: parent.value, property: element, node: attached[0]});
                    }
                    if (selected && attached[0]) {
                        const argumentsFrame = new Frame();
                        argumentsFrame.local.set(selected.parameters[0].name, [matched[0]]);
                        argumentsFrame.local.set(selected.parameters[1].name, attached);
                        yield* this.group(selected, argumentsFrame);
                    }
                }
            }
            values = result;
        } else if (target.context) {
            values = contexts;
            if (target.transform || !rule.dependent && !target.variable) {
                const replacements = target.transform
                    ? yield* this.transform(target.transform, frame, matched.at(-1) ?? context, context) : matched;
                if (replacements.length > 1) throw new Error("A target root cannot receive multiple values.");
                const replacement = replacements[0];
                if (replacement) for (const root of contexts) {
                    const selected = target.transform ? undefined : this.bound.defaultGroup(replacement, root);
                    if (selected) {
                        const argumentsFrame = new Frame();
                        argumentsFrame.local.set(selected.parameters[0].name, [replacement]);
                        argumentsFrame.local.set(selected.parameters[1].name, [root]);
                        yield* this.group(selected, argumentsFrame);
                    } else {
                        if (!root.writable || !isObject(root.value) || !isObject(replacement.value)) {
                            throw new Error("Root copying requires writable complex target and complex source values.");
                        }
                        if (root.typeName) this.bound.validateValue(replacement.value, root.typeName, root.version);
                        const names = new Set(Object.keys(replacement.value).filter(name => name !== "resourceType")
                            .map(name => name.startsWith("_") ? name.slice(1) : name));
                        for (const name of names) {
                            const children = this.bound.read(replacement, name);
                            if (!children.length) continue;
                            const property = this.bound.property(root, name, children[0].typeName);
                            this.write(root, property, children);
                        }
                    }
                }
            }
        } else if (target.transform) values = yield* this.transform(target.transform, frame, matched.at(-1) ?? context, {
            ...context, typeName: undefined,
            version: this.bound.program.analysis.model.targetModelVersion ?? context.version,
        });
        if (target.variable) frame.bind(target.variable, values, "target");
        if (traceTarget) {
            this.traceDepth--;
            this.emit("exit", target, frame);
        }
    }
}
