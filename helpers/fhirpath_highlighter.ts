
export const Rules: Record<string, TextHighlightToken[]> = {
    "start": [
      {
        token: "variable", // single line
        regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'
      }, {
        token: "fhir_string", // single line
        regex: /'/,
        next: "fhir_string"
      }, {
        token: "bstring", // single line
        regex: '`',
        next: "bstring"
      }, {
        token: "constant.numeric", // hex
        regex: "0[xX][0-9a-fA-F]+\\b"
      }, {
        token: "constant.numeric", // float
        regex: /\b[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
      }, {
        token: "constant.language.boolean",
        regex: /\b(?:true|false)\b/
      }, {
        token: "text", // single quoted strings are not allowed
        regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
      }, {
        token: "comment", // comments are not allowed, but who cares?
        regex: "\\/\\/.*$"
      }, {
        token: "comment.start", // comments are not allowed, but who cares?
        regex: "\\/\\*",
        next: "comment"
      }, {
        token: "fhir_paren.lparen",
        regex: "[[({]"
      }, {
        token: "fhir_paren.rparen",
        regex: "[\\])}]"
      }, {
        token: "punctuation.operator",
        regex: /[,]/
      }, {
        token: "fhir_function.existence", // section 5.1 http://hl7.org/fhirpath/#existence
        regex: /\b(empty|exists|all|allTrue|anyTrue|allFalse|anyFalse|subsetOf|supersetOf|count|distinct|isDistinct)\b/
      }, {
        token: "fhir_function.filtering", // section 5.2 http://hl7.org/fhirpath/#filtering-and-projection
        regex: /\b(where|select|repeat|ofType)\b/
      }, {
        token: "fhir_function.subsetting", // section 5.3 http://hl7.org/fhirpath/#subsetting
        regex: /\b(single|first|last|tail|skip|take|intersect|exclude)\b/
      }, {
        token: "fhir_function.combining", // section 5.4
        regex: /\b(union|combine)\b/
      }, {
        token: "fhir_function.conversion", // section 5.5
        regex: /\b(iif|toBoolean|convertsToBoolean|toInteger|convertsToInteger|toDate|convertsToDate|toDateTime|convertsToDateTime|toDecimal|convertsToDecimal|toQuantity|convertsToQuantity|toString|convertsToString|toTime|convertsToTime)\b/
      }, {
        token: "fhir_function.strings", // section 5.6
        regex: /\b(indexOf|substring|startsWith|endsWith|contains|upper|lower|replace|matches|replaceMatches|length|toChars|split|join|encode|decode)\b/
      }, {
        token: "fhir_function.math", // section 5.7
        regex: /\b(abs|ceiling|exp|floor|ln|log|power|round|sqrt|truncate)\b/
      }, {
        token: "fhir_function.treenav", // section 5.8
        regex: /\b(children|descendants)\b/
      }, {
        token: "fhir_function.utility", // section 5.9 (not is in section 6.5)
        regex: /\b(trace|now|timeOfDay|today|not)\b/
      }, {
        token: "fhir_keyword", // section 6.3/6.4/6.5
        regex: /\b(as|is|in|contains|and|or|xor|implies)\b/
      }, {
        token: "fhir_keyword.math", // section 6.6
        regex: /\b(div|mod)\b/
      }, {
        token: "fhir_function.aggregates", // section 7
        regex: "aggregate"
      }, {
        token: "fhir_variable",
        regex: /\b(%\\w+)\b/
      }, {
        token: "text",
        regex: "\\s+"
      }
    ],
    "fhir_string": [
      {
        token: "constant.language.escape",
        regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/fnrt])|(?:\\')/
      }, {
        token: "fhir_string",
        regex: /'|$/,
        next: "start"
      }, {
        defaultToken: "fhir_string"
      }
    ],
    "bstring": [
      {
        token: "constant.language.escape",
        regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/fnrt])|(?:\\`)/
      }, {
        token: "bstring",
        regex: '`|$',
        next: "start"
      }, {
        defaultToken: "bstring"
      }
    ],
    "comment": [
      {
        token: "comment.end", // comments are not allowed, but who cares?
        regex: "\\*\\/",
        next: "start"
      }, {
        defaultToken: "comment"
      }
    ]
  };
  