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
            token: "cql_constant.string",
            regex: /'/,
            next: "cql_string",
        },
        {
            token: "cql_identifier",
            regex: /"/,
            next: "quoted_identifier",
        },
        {
            token: "cql_constant.numeric",
            regex: /\b\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/,
        },
        {
            token: "cql_constant.boolean",
            regex: /\b(?:true|false|null)\b/i,
        },
        {
            token: "cql_constant.date",
            regex: /@\d{4}(?:-\d{2}(?:-\d{2})?)?(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})?)?/,
        },
        {
            token: ["cql_keyword", "text", "cql_function"],
            regex: /\b(define)(\s+)([A-Za-z_][A-Za-z0-9_]*)\b/i,
        },
        {
            token: ["cql_keyword", "text", "entity.name.type"],
            regex: /\b(library|include|using|codesystem|valueset|code|concept|parameter|context)(\s+)([A-Za-z_][A-Za-z0-9_]*)\b/i,
        },
        {
            token: "cql_keyword",
            regex: /\b(?:aggregate|all|and|as|ascending|before|between|by|called|case|contains|default|descending|distinct|div|during|else|end|ends|except|exists|fluent|from|if|implies|in|included|includes|intersect|is|let|meets|mod|not|null|occurs|of|on|or|overlaps|per|predecessor|private|properly|public|return|same|singleton|sort|starts|successor|such|then|times|union|version|when|where|with|within|without|xor)\b/i,
        },
        {
            token: "storage.type",
            regex: /\b(?:Any|Boolean|Choice|Code|Concept|Date|DateTime|Decimal|Integer|Interval|List|Long|Quantity|Ratio|String|Time|Tuple)\b/,
        },
        {
            token: ["cql_function", "text", "cql_paren.lparen"],
            regex: /\b([A-Za-z_][A-Za-z0-9_]*)(\s*)(\()/,
        },
        {
            token: "keyword.operator",
            regex: /!=|<=|>=|~|!~|\+|-|\*|\/|=|<|>/,
        },
        {
            token: "cql_paren.lparen",
            regex: /[\[({]/,
        },
        {
            token: "cql_paren.rparen",
            regex: /[\])}]/,
        },
    ],
    cql_string: [
        {
            token: "constant.language.escape",
            regex: /\\(?:u[0-9a-fA-F]{4}|['"\\\/bfnrt])/,
        },
        {
            token: "cql_constant.string",
            regex: /'|$/,
            next: "start",
        },
        {
            defaultToken: "cql_constant.string",
        },
    ],
    quoted_identifier: [
        {
            token: "constant.language.escape",
            regex: /\\"/,
        },
        {
            token: "cql_identifier",
            regex: /"|$/,
            next: "start",
        },
        {
            defaultToken: "cql_identifier",
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
