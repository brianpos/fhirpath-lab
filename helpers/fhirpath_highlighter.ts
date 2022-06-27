
import ace from "ace-builds";

export function setCustomHighlightRules(editor: ace.Ace.Editor, rules: Record<string, any[]>): void {
  var modeFhir: ace.Ace.SyntaxMode = editor.session.getMode();
  (modeFhir as any).$highlightRules.addRules(rules);
  editor.session.getUseWorker();
  (editor.session as any).$mode.$tokenizer = null;
  let tokenizer = modeFhir.getTokenizer();
  (editor.session as any).bgTokenizer.setTokenizer(tokenizer);
  // force re-highlight whole document
  (editor.session as any).bgTokenizer.start(0);

  // cast as any to ignore the undefined typing error message
  (editor.commands as any).bindKey("Tab", undefined);
  (editor.commands as any).bindKey("Shift-Tab", undefined);
}

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
      token: "constant.fhir_quantity", // quantity (with string unit)
      regex: /\b\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b\s+'/,
      next: "fhir_qstring"
    }, {
      token: "constant.fhir_quantity", // quantity
      regex: /\b\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b\s+(years|months|weeks|days|hours|minutes|seconds|milliseconds|year|month|week|day|hour|minute|second|millisecond)\b/
    }, {
      token: "constant.numeric", // float
      regex: /\b\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
    }, {
      token: "constant.fhir_time", // time only
      regex: /@T[0-9][0-9]:[0-9][0-9](:[0-9][0-9])?(\.[0-9]+)?/
    }, {
      token: "constant.fhir_datetime", // datetime
      regex: /@[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]T[0-9][0-9]:[0-9][0-9](:[0-9][0-9])?(\.[0-9]+)?(Z|[+\-][0-9][0-9]:[0-9][0-9])/
    }, {
      token: "constant.fhir_date", // date
      regex: /@[0-9][0-9][0-9][0-9](-[0-9][0-9](-[0-9][0-9])?)?/
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
      token: ["fhir_function.existence", "text", "fhir_paren.lparen"], // section 5.1 http://hl7.org/fhirpath/#existence
      regex: /\b(empty|exists|all|allTrue|anyTrue|allFalse|anyFalse|subsetOf|supersetOf|count|distinct|isDistinct)\b(\s*)(\()/
    }, {
      token: ["fhir_function.filtering", "text", "fhir_paren.lparen"], // section 5.2 http://hl7.org/fhirpath/#filtering-and-projection
      regex: /\b(where|select|repeat|ofType)\b(\s*)(\()/
    }, {
      token: ["fhir_function.subsetting", "text", "fhir_paren.lparen"], // section 5.3 http://hl7.org/fhirpath/#subsetting
      regex: /\b(single|first|last|tail|skip|take|intersect|exclude)\b(\s*)(\()/
    }, {
      token: ["fhir_function.combining", "text", "fhir_paren.lparen"], // section 5.4
      regex: /\b(union|combine)\b(\s*)(\()/
    }, {
      token: ["fhir_function.conversion", "text", "fhir_paren.lparen"], // section 5.5
      regex: /\b(iif|toBoolean|convertsToBoolean|toInteger|convertsToInteger|toDate|convertsToDate|toDateTime|convertsToDateTime|toDecimal|convertsToDecimal|toQuantity|convertsToQuantity|toString|convertsToString|toTime|convertsToTime)\b(\s*)(\()/
    }, {
      token: ["fhir_function.strings", "text", "fhir_paren.lparen"], // section 5.6
      regex: /\b(indexOf|substring|startsWith|endsWith|contains|upper|lower|replace|matches|replaceMatches|length|toChars|split|join|encode|decode)\b(\s*)(\()/
    }, {
      token: ["fhir_function.math", "text", "fhir_paren.lparen"], // section 5.7
      regex: /\b(abs|ceiling|exp|floor|ln|log|power|round|sqrt|truncate)\b(\s*)(\()/
    }, {
      token: ["fhir_function.treenav", "text", "fhir_paren.lparen"], // section 5.8
      regex: /\b(children|descendants)\b(\s*)(\()/
    }, {
      token: ["fhir_function.utility", "text", "fhir_paren.lparen"], // section 5.9 (not is in section 6.5)
      regex: /\b(trace|now|timeOfDay|today|not)\b(\s*)(\()/
    }, {
      token: ["fhir_function.types", "text", "fhir_paren.lparen"], // section 6.3
      regex: /\b(as|is)\b(\s*)(\()/
    }, {
      token: "fhir_keyword", // section 6.3/6.4/6.5
      regex: /\b(as|is|in|contains|and|or|xor|implies)\b/
    }, {
      token: "fhir_keyword.this",
      regex: /(\$this)\b/
    }, {
      token: "fhir_keyword.index", // section 6.3/6.4/6.5
      regex: /(\$index)\b/
    }, {
      token: "fhir_keyword.total", // section 6.3/6.4/6.5
      regex: /(\$total)\b/
    }, {
      token: "fhir_keyword.math", // section 6.6
      regex: /\b(div|mod)\b/
    }, {
      token: "fhir_function.aggregates", // section 7
      regex: "aggregate"
    }, {
      token: "fhir_variable",
      regex: /(%\w+)\b/
    }, {
      token: "fhir_variable",
      regex: /(%`)\b/,
      next: "fhir_variable"
    }, {
      token: "fhir_nav",
      regex: /\./
    }, {
      token: "fhir_identifier",
      regex: /\w+/
    }, {
      token: "text",
      regex: "\\s+"
    }
  ],
  "fhir_qstring": [
    {
      token: "constant.language.escape",
      regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/fnrt])|(?:\\')/
    }, {
      token: "constant.fhir_quantity",
      regex: /'|$/,
      next: "start"
    }, {
      defaultToken: "constant.fhir_quantity"
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
      defaultToken: "fhir_identifier"
    }
  ],
  "fhir_variable": [
    {
      token: "constant.language.escape",
      regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/fnrt])|(?:\\`)/
    }, {
      token: "fhir_variable",
      regex: '`|$',
      next: "start"
    }, {
      defaultToken: "fhir_variable"
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
