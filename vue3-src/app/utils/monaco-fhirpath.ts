/**
 * Monaco Monarch language definition for FHIRPath / FHIR Mapping Language (FML).
 *
 * Ported from `helpers/fhirpath_highlighter.ts` (Ace highlight rules) so that the
 * vue3-src Monaco-based ResourceEditor highlights FML maps and FHIRPath expressions
 * with the same token semantics as the legacy Ace editor.
 *
 * Language id: `fhirpath`
 * Theme rules below are merged into the default Monaco "vs" theme via
 * `monaco.editor.defineTheme` so the FHIRPath tokens render with sensible colours
 * even though they are not part of Monaco's built-in token palette.
 */
import type * as monacoType from 'monaco-editor/esm/vs/editor/editor.api'

let registered = false

export function setupFhirPathLanguage(monaco: typeof monacoType): void {
  if (registered) return
  registered = true

  monaco.languages.register({ id: 'fhirpath' })

  monaco.languages.setLanguageConfiguration('fhirpath', {
    comments: { lineComment: '//', blockComment: ['/*', '*/'] },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'", notIn: ['string'] },
      { open: '`', close: '`', notIn: ['string'] }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'" },
      { open: '`', close: '`' }
    ]
  })

  // Monarch tokenizer ported from helpers/fhirpath_highlighter.ts
  monaco.languages.setMonarchTokensProvider('fhirpath', {
    defaultToken: '',
    tokenPostfix: '.fhirpath',

    existence: ['empty', 'exists', 'all', 'allTrue', 'anyTrue', 'allFalse', 'anyFalse', 'subsetOf', 'supersetOf', 'count', 'distinct', 'isDistinct'],
    filtering: ['where', 'select', 'repeat', 'ofType'],
    subsetting: ['single', 'first', 'last', 'tail', 'skip', 'take', 'intersect', 'exclude'],
    combining: ['union', 'combine'],
    conversion: ['iif', 'toBoolean', 'convertsToBoolean', 'toInteger', 'convertsToInteger', 'toDate', 'convertsToDate', 'toDateTime', 'convertsToDateTime', 'toDecimal', 'convertsToDecimal', 'toQuantity', 'convertsToQuantity', 'toString', 'convertsToString', 'toTime', 'convertsToTime'],
    strings: ['indexOf', 'substring', 'startsWith', 'endsWith', 'contains', 'upper', 'lower', 'replace', 'matches', 'replaceMatches', 'length', 'toChars', 'split', 'join', 'encode', 'decode'],
    math: ['abs', 'ceiling', 'exp', 'floor', 'ln', 'log', 'power', 'round', 'sqrt', 'truncate'],
    treenav: ['children', 'descendants'],
    utility: ['trace', 'now', 'timeOfDay', 'today', 'not'],
    types: ['as', 'is'],
    keywords: ['as', 'is', 'in', 'contains', 'and', 'or', 'xor', 'implies'],
    mathKeywords: ['div', 'mod'],
    units: ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds', 'year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'],

    tokenizer: {
      root: [
        // Strings (single-quoted)
        [/'/, { token: 'string.quote', next: '@fhirString' }],
        // Backtick identifiers
        [/`/, { token: 'identifier.quote', next: '@bstring' }],

        // Numbers / quantities / temporals (order matters: most specific first)
        [/0[xX][0-9a-fA-F]+\b/, 'number.hex'],
        [/\b\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b\s+'/, { token: 'number.quantity', next: '@fhirQString' }],
        [/\b\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b\s+(?:years|months|weeks|days|hours|minutes|seconds|milliseconds|year|month|week|day|hour|minute|second|millisecond)\b/, 'number.quantity'],
        [/\b\d+L\b/, 'number'],
        [/\b\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/, 'number.float'],
        // Use a character class for the leading `@` so Monaco's Monarch tokenizer
        // does not treat `@T`/`@[`... as an attribute reference (which produces
        // "language definition does not contain attribute 'T'" errors).
        [/[@]T[0-9][0-9]:[0-9][0-9](?::[0-9][0-9])?(?:\.[0-9]+)?/, 'string.time'],
        [/[@][0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}(?::[0-9][0-9])?(?:\.[0-9]+)?(?:Z|[+\-][0-9]{2}:[0-9]{2})/, 'string.datetime'],
        [/[@][0-9]{4}(?:-[0-9]{2}(?:-[0-9]{2})?)?/, 'string.date'],

        // Boolean literals
        [/\b(?:true|false)\b/, 'constant.language'],

        // Comments
        [/\/\/.*$/, 'comment'],
        [/\/\*/, { token: 'comment', next: '@blockComment' }],

        // Function names followed by `(`
        [/\b(empty|exists|all|allTrue|anyTrue|allFalse|anyFalse|subsetOf|supersetOf|count|distinct|isDistinct)\b(?=\s*\()/, 'support.function.existence'],
        [/\b(where|select|repeat|ofType)\b(?=\s*\()/, 'support.function.filtering'],
        [/\b(single|first|last|tail|skip|take|intersect|exclude)\b(?=\s*\()/, 'support.function.subsetting'],
        [/\b(union|combine)\b(?=\s*\()/, 'support.function.combining'],
        [/\b(iif|toBoolean|convertsToBoolean|toInteger|convertsToInteger|toDate|convertsToDate|toDateTime|convertsToDateTime|toDecimal|convertsToDecimal|toQuantity|convertsToQuantity|toString|convertsToString|toTime|convertsToTime)\b(?=\s*\()/, 'support.function.conversion'],
        [/\b(indexOf|substring|startsWith|endsWith|contains|upper|lower|replace|matches|replaceMatches|length|toChars|split|join|encode|decode)\b(?=\s*\()/, 'support.function.strings'],
        [/\b(abs|ceiling|exp|floor|ln|log|power|round|sqrt|truncate)\b(?=\s*\()/, 'support.function.math'],
        [/\b(children|descendants)\b(?=\s*\()/, 'support.function.treenav'],
        [/\b(trace|now|timeOfDay|today|not)\b(?=\s*\()/, 'support.function.utility'],
        [/\b(as|is)\b(?=\s*\()/, 'support.function.types'],
        [/\baggregate\b/, 'support.function.aggregates'],

        // Keywords
        [/\b(?:as|is|in|contains|and|or|xor|implies)\b/, 'keyword'],
        [/\$this\b/, 'variable.language.this'],
        [/\$index\b/, 'variable.language.index'],
        [/\$total\b/, 'variable.language.total'],
        [/\b(?:div|mod)\b/, 'keyword.operator.math'],

        // External constants  (%foo or %`escaped name`)
        [/%`/, { token: 'variable.parameter', next: '@fhirVariable' }],
        [/%\w+/, 'variable.parameter'],

        // Operators / punctuation
        [/[!=<>~]+|[+\-*|]/, 'operator'],
        [/[,]/, 'delimiter'],
        [/\./, 'delimiter.dot'],
        [/[(){}[\]]/, '@brackets'],

        // Identifiers
        [/[A-Za-z_][A-Za-z0-9_]*/, 'identifier'],

        // Whitespace
        [/\s+/, 'white']
      ],

      fhirString: [
        [/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\/fnrt'])/, 'string.escape'],
        [/'/, { token: 'string.quote', next: '@pop' }],
        [/./, 'string']
      ],

      fhirQString: [
        [/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\/fnrt'])/, 'string.escape'],
        [/'/, { token: 'number.quantity', next: '@pop' }],
        [/./, 'number.quantity']
      ],

      bstring: [
        [/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\/fnrt`])/, 'string.escape'],
        [/`/, { token: 'identifier.quote', next: '@pop' }],
        [/./, 'identifier']
      ],

      fhirVariable: [
        [/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\/fnrt`])/, 'string.escape'],
        [/`/, { token: 'variable.parameter', next: '@pop' }],
        [/./, 'variable.parameter']
      ],

      blockComment: [
        [/\*\//, { token: 'comment', next: '@pop' }],
        [/./, 'comment']
      ]
    }
  } as monacoType.languages.IMonarchLanguage)

  // Provide colours for the custom token classes (Monaco "vs" theme has no defaults
  // for `support.function.*`, `number.quantity`, etc.).
  monaco.editor.defineTheme('fhirpath-lab', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'support.function.existence', foreground: '795E26', fontStyle: 'bold' },
      { token: 'support.function.filtering', foreground: '795E26', fontStyle: 'bold' },
      { token: 'support.function.subsetting', foreground: '795E26' },
      { token: 'support.function.combining', foreground: '795E26' },
      { token: 'support.function.conversion', foreground: '267F99' },
      { token: 'support.function.strings', foreground: '795E26' },
      { token: 'support.function.math', foreground: '795E26' },
      { token: 'support.function.treenav', foreground: '795E26' },
      { token: 'support.function.utility', foreground: '795E26' },
      { token: 'support.function.types', foreground: 'AF00DB' },
      { token: 'support.function.aggregates', foreground: '795E26' },
      { token: 'variable.language.this', foreground: '0070C1', fontStyle: 'italic' },
      { token: 'variable.language.index', foreground: '0070C1', fontStyle: 'italic' },
      { token: 'variable.language.total', foreground: '0070C1', fontStyle: 'italic' },
      { token: 'variable.parameter', foreground: '001080' },
      { token: 'keyword.operator.math', foreground: 'AF00DB' },
      { token: 'number.quantity', foreground: '098658' },
      { token: 'string.time', foreground: '098658' },
      { token: 'string.date', foreground: '098658' },
      { token: 'string.datetime', foreground: '098658' },
      { token: 'delimiter.dot', foreground: '000000' }
    ],
    colors: {}
  })
}
