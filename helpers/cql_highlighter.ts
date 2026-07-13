export const CqlHighlightRules: Record<string, TextHighlightToken[]> = {
    start: [
        {
            token: "comment",
            regex: "\\/\\/.*$",
        },
        {
            token: "comment.start",
            regex: "\\/\\*",
            next: "comment",
        },
        {
            token: "string",
            regex: /'/,
            next: "cql_string",
        },
        {
            token: "variable",
            regex: /"/,
            next: "quoted_identifier",
        },
        {
            token: "constant.numeric",
            regex: /\b\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/,
        },
        {
            token: "constant.language.boolean",
            regex: /\b(?:true|false|null)\b/i,
        },
        {
            token: "constant.language.date",
            regex: /@\d{4}(?:-\d{2}(?:-\d{2})?)?(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})?)?/,
        },
        {
            token: ["keyword", "text", "entity.name.function"],
            regex: /\b(define)(\s+)([A-Za-z_][A-Za-z0-9_]*)\b/i,
        },
        {
            token: ["keyword", "text", "entity.name.type"],
            regex: /\b(library|include|using|codesystem|valueset|code|concept|parameter|context)(\s+)([A-Za-z_][A-Za-z0-9_]*)\b/i,
        },
        {
            token: "keyword",
            regex: /\b(?:aggregate|all|and|as|ascending|before|between|by|called|case|contains|default|descending|distinct|div|during|else|end|ends|except|exists|fluent|from|if|implies|in|included|includes|intersect|is|let|meets|mod|not|null|occurs|of|on|or|overlaps|per|predecessor|private|properly|public|return|same|singleton|sort|starts|successor|such|then|times|union|version|when|where|with|within|without|xor)\b/i,
        },
        {
            token: "storage.type",
            regex: /\b(?:Any|Boolean|Choice|Code|Concept|Date|DateTime|Decimal|Integer|Interval|List|Long|Quantity|Ratio|String|Time|Tuple)\b/,
        },
        {
            token: ["support.function", "text", "paren.lparen"],
            regex: /\b([A-Za-z_][A-Za-z0-9_]*)(\s*)(\()/,
        },
        {
            token: "keyword.operator",
            regex: /!=|<=|>=|~|!~|\+|-|\*|\/|=|<|>/,
        },
        {
            token: "paren.lparen",
            regex: /[\[({]/,
        },
        {
            token: "paren.rparen",
            regex: /[\])}]/,
        },
    ],
    cql_string: [
        {
            token: "constant.language.escape",
            regex: /\\(?:u[0-9a-fA-F]{4}|['"\\\/bfnrt])/,
        },
        {
            token: "string",
            regex: /'|$/,
            next: "start",
        },
        {
            defaultToken: "string",
        },
    ],
    quoted_identifier: [
        {
            token: "constant.language.escape",
            regex: /\\"/,
        },
        {
            token: "variable",
            regex: /"|$/,
            next: "start",
        },
        {
            defaultToken: "variable",
        },
    ],
    comment: [
        {
            token: "comment.end",
            regex: "\\*\\/",
            next: "start",
        },
        {
            defaultToken: "comment",
        },
    ],
};
