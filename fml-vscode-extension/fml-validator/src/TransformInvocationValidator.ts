import {ParseTreeWalker, Token} from "antlr4ng";
import {FmlDiagnostic} from "./contracts";
import {mappingListener} from "./generated/mappingListener";
import {
    BooleanLiteralContext,
    DateLiteralContext,
    DateTimeLiteralContext,
    LongNumberLiteralContext,
    NullLiteralContext,
    NumberLiteralContext,
    QuantityLiteralContext,
    QuotedStringLiteralContext,
    StringLiteralContext,
    StructureMapContext,
    TimeLiteralContext,
    TransformInvocationContext,
    TransformParamContext,
    mappingParser,
} from "./generated/mappingParser";
import {
    TransformDefinition,
    TransformParameterDefinition,
    TransformParameterType,
    TransformSignature,
    transformDefinitions,
} from "./transformSignatures";

type ActualParameterType =
    | "boolean"
    | "date"
    | "datetime"
    | "decimal"
    | "expression"
    | "identifier"
    | "integer"
    | "null"
    | "quantity"
    | "string"
    | "time";

interface ActualParameter {
    name?: string;
    type: ActualParameterType;
    text: string;
    literalValue?: string;
    token: Token | null;
}

interface SignatureIssue {
    message: string;
    parameter?: ActualParameter;
}

class TransformListener extends mappingListener {
    public constructor(
        private readonly diagnostics: FmlDiagnostic[],
        private readonly sourceName?: string,
    ) {
        super();
    }

    public override enterTransformInvocation = (context: TransformInvocationContext): void => {
        this.validateInvocation(context);
    };

    private validateInvocation(context: TransformInvocationContext): void {
        const nameContext = context.identifier();
        const transformName = nameContext.getText();
        const parameters = context.transformParamList()?.transformParam().map(parameterContext => {
            return this.readParameter(parameterContext);
        }) ?? [];

        let hasInvalidExpressionParameter = false;
        for (const actual of parameters) {
            if (actual.type === "expression" && transformName !== "evaluate") {
                hasInvalidExpressionParameter = true;
                this.addDiagnostic(
                    "error",
                    `FHIRPath expression parameters are only permitted for the 'evaluate' transform.`,
                    actual.token,
                    actual.text,
                );
            }
        }

        const definition = transformDefinitions.get(transformName);
        if (!definition) {
            this.addDiagnostic(
                "warning",
                `Unknown transform '${transformName}'. It may be a custom or newer transform.`,
                nameContext.start,
                transformName,
            );
            return;
        }

        if (hasInvalidExpressionParameter) {
            return;
        }

        this.validateKnownTransform(definition, parameters, context.start);
    }

    private validateKnownTransform(
        definition: TransformDefinition,
        parameters: ActualParameter[],
        invocationToken: Token | null,
    ): void {
        const candidates = definition.signatures.filter(candidate => {
            return this.acceptsParameterCount(candidate, parameters.length);
        });

        if (candidates.length === 0) {
            const signatures = definition.signatures.map(candidate => {
                return this.formatSignature(definition.name, candidate);
            }).join(" or ");
            this.addDiagnostic(
                "error",
                `Transform '${definition.name}' expects ${signatures}; received ${parameters.length} parameter(s).`,
                invocationToken,
                definition.name,
            );
            return;
        }

        const evaluated = candidates.map(candidate => this.validateSignature(definition.name, candidate, parameters));
        const bestMatch = evaluated.reduce((best, current) => {
            return current.length < best.length ? current : best;
        });

        for (const issue of bestMatch) {
            this.addDiagnostic(
                "error",
                issue.message,
                issue.parameter?.token ?? invocationToken,
                issue.parameter?.text ?? definition.name,
            );
        }
    }

    private validateSignature(
        transformName: string,
        signature: TransformSignature,
        actualParameters: ActualParameter[],
    ): SignatureIssue[] {
        const issues: SignatureIssue[] = [];
        const assigned = new Map<number, ActualParameter[]>();
        let nextPosition = 0;

        for (const actual of actualParameters) {
            if (actual.name) {
                const parameterIndex = signature.parameters.findIndex(expected => expected.name === actual.name);
                if (parameterIndex < 0) {
                    issues.push({
                        message: `Transform '${transformName}' has no parameter named '${actual.name}'.`,
                        parameter: actual,
                    });
                    continue;
                }

                const existing = assigned.get(parameterIndex) ?? [];
                if (existing.length > 0 && !signature.parameters[parameterIndex].variadic) {
                    issues.push({
                        message: `Transform '${transformName}' parameter '${actual.name}' is supplied more than once.`,
                        parameter: actual,
                    });
                    continue;
                }
                assigned.set(parameterIndex, [...existing, actual]);
                continue;
            }

            while (
                nextPosition < signature.parameters.length
                && assigned.has(nextPosition)
                && !signature.parameters[nextPosition].variadic
            ) {
                nextPosition++;
            }

            const expectedIndex = Math.min(nextPosition, signature.parameters.length - 1);
            const expected = signature.parameters[expectedIndex];
            if (!expected || (nextPosition >= signature.parameters.length && !expected.variadic)) {
                issues.push({
                    message: `Transform '${transformName}' received too many positional parameters.`,
                    parameter: actual,
                });
                continue;
            }

            const existing = assigned.get(expectedIndex) ?? [];
            assigned.set(expectedIndex, [...existing, actual]);
            if (!expected.variadic) {
                nextPosition++;
            }
        }

        signature.parameters.forEach((expected, index) => {
            const actuals = assigned.get(index) ?? [];
            if (actuals.length === 0 && !expected.optional) {
                issues.push({
                    message: `Transform '${transformName}' requires parameter '${expected.name}'.`,
                });
                return;
            }

            for (const actual of actuals) {
                if (!this.isCompatibleType(expected.type, actual.type)) {
                    issues.push({
                        message: `Transform '${transformName}' parameter '${expected.name}' must be ${expected.type}; received ${actual.type}.`,
                        parameter: actual,
                    });
                    continue;
                }

                if (
                    expected.allowedValues
                    && actual.literalValue !== undefined
                    && !expected.allowedValues.includes(actual.literalValue)
                ) {
                    issues.push({
                        message: `Transform '${transformName}' parameter '${expected.name}' must be one of: ${expected.allowedValues.join(", ")}.`,
                        parameter: actual,
                    });
                }
            }
        });

        return issues;
    }

    private readParameter(context: TransformParamContext): ActualParameter {
        const value = context.transformParamValue();
        const literal = value.literal();
        const name = context.transformParamName()?.getText();
        const text = value.getText();
        const token = value.start;

        const expression = value.fpExpression();
        if (
            expression
            && expression.start === expression.stop
            && (
                expression.start?.type === mappingParser.IDENTIFIER
                || expression.start?.type === mappingParser.DELIMITEDIDENTIFIER
            )
        ) {
            return {name, type: "identifier", text, token};
        }
        if (expression) {
            return {name, type: "expression", text, token};
        }
        if (value.ID()) {
            return {name, type: "identifier", text, token};
        }
        if (literal instanceof StringLiteralContext || literal instanceof QuotedStringLiteralContext) {
            return {name, type: "string", text, literalValue: text.slice(1, -1), token};
        }
        if (literal instanceof NumberLiteralContext) {
            return {name, type: literal.INTEGER() ? "integer" : "decimal", text, token};
        }
        if (literal instanceof LongNumberLiteralContext) {
            return {name, type: "integer", text, token};
        }
        if (literal instanceof BooleanLiteralContext) {
            return {name, type: "boolean", text, token};
        }
        if (literal instanceof DateLiteralContext) {
            return {name, type: "date", text, token};
        }
        if (literal instanceof DateTimeLiteralContext) {
            return {name, type: "datetime", text, token};
        }
        if (literal instanceof TimeLiteralContext) {
            return {name, type: "time", text, token};
        }
        if (literal instanceof QuantityLiteralContext) {
            return {name, type: "quantity", text, token};
        }
        if (literal instanceof NullLiteralContext) {
            return {name, type: "null", text, token};
        }

        return {name, type: "identifier", text, token};
    }

    private acceptsParameterCount(signature: TransformSignature, count: number): boolean {
        const requiredCount = signature.parameters.filter(parameterDefinition => {
            return !parameterDefinition.optional;
        }).length;
        const hasVariadicParameter = signature.parameters.some(parameterDefinition => parameterDefinition.variadic);
        return count >= requiredCount && (hasVariadicParameter || count <= signature.parameters.length);
    }

    private isCompatibleType(expected: TransformParameterType, actual: ActualParameterType): boolean {
        if (actual === "identifier") {
            return true;
        }
        switch (expected) {
            case "any":
                return actual !== "expression";
            case "canonical":
            case "string":
                return actual === "string";
            case "integer":
                return actual === "integer";
            case "decimal":
                return actual === "decimal" || actual === "integer";
            case "expression":
                return actual === "expression";
        }
    }

    private formatSignature(name: string, signature: TransformSignature): string {
        const parameters = signature.parameters.map(parameterDefinition => {
            return this.formatParameter(parameterDefinition);
        }).join(", ");
        return `${name}(${parameters})`;
    }

    private formatParameter(parameterDefinition: TransformParameterDefinition): string {
        const value = `${parameterDefinition.name}: ${parameterDefinition.type}`;
        if (parameterDefinition.variadic) {
            return `${value}, ...`;
        }
        return parameterDefinition.optional ? `[${value}]` : value;
    }

    private addDiagnostic(
        severity: FmlDiagnostic["severity"],
        message: string,
        token: Token | null,
        offendingText: string,
    ): void {
        this.diagnostics.push({
            severity,
            message,
            line: token?.line ?? 1,
            column: token?.column ?? 0,
            sourceName: this.sourceName,
            offendingText,
        });
    }
}

export class TransformInvocationValidator {
    public validate(tree: StructureMapContext, sourceName?: string): FmlDiagnostic[] {
        const diagnostics: FmlDiagnostic[] = [];
        ParseTreeWalker.DEFAULT.walk(new TransformListener(diagnostics, sourceName), tree);
        return diagnostics;
    }
}
