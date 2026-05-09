// Typed view over the HL7 FHIRPath spec JSON files (functions.json / operations.json).
//
// These shapes mirror the JSON exactly; consumers should treat the loaded data as
// read-only (the loader in ./index.ts deep-freezes everything at module load).

export interface FunctionArgumentDef {
    name: string;
    /** One of: "expression", "Expression", "collection", "value", "identifier",
     *  "type specifier", or a (pipe-delimited) type union like "Integer | Decimal". */
    type: string;
    description?: string;
    optional?: boolean;
    /** When true the function accepts any number of this argument (e.g. sort, coalesce). */
    variableArgs?: boolean;
}

export interface FunctionDef {
    /** Category as authored in the spec (e.g. "Existence", "Conversion"). */
    category: string;
    functionName: string;
    sectionNumber?: string;
    description?: string;
    arguments: FunctionArgumentDef[];
    /** Spec-declared return type. Either a System type, "collection",
     *  "value" (= same as input), or a pipe-delimited union. */
    returnType: string;
    /** What `f()` returns when applied to an empty input collection.
     *  Verbatim from the spec; "empty" / "true" / "false" / "0" / a literal value. */
    emptyInputResult?: string;
    errorOnMultipleInput?: boolean;
    /** Permitted input types; empty array means "Any". */
    inputTypes: string[];
    /** Lines like "Integer-Boolean" or "String-String". For nullary functions the
     *  left side is the input type, the right side the result type; for unary
     *  functions like substring(start) it is the same. */
    typeMapping: string[];
    exampleOfUse?: string;
}

export interface OperationDef {
    category: string;
    operationName: string;
    sectionNumber?: string;
    description?: string;
    leftArgument: string;
    rightArgument: string;
    returnType: string;
    emptyInputResult?: string;
    errorOnMultipleInput?: boolean;
    typeMapping: string[];
}

/** Decoded form of a `typeMapping` entry like "Integer-Decimal". */
export interface TypeSignature {
    /** Left side of the dash. */
    left: string;
    /** Right side of the dash. */
    right: string;
}
