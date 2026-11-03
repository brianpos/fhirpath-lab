import { Rules as FhirPathRules } from "./fhirpath_highlighter";

/**
 * Ace highlight rules for the FHIR Mapping Language: FML keywords and `///` metadata comments,
 * layered over the FHIRPath rules (used by `where`/`check`/`(expr)` fragments).
 */
const fmlKeywords =
  "map|uses|imports|conceptmap|prefix|group|extends|types|type\\+|source|target|queried|produced|alias|as|then|for|where|check|log|default|first|not_first|last|not_last|only_one|share|collate";

export const FmlHighlightRules: Record<string, any[]> = {
  ...FhirPathRules,
  start: [
    { token: "comment.doc", regex: "\\/\\/\\/.*$" },
    { token: "string", regex: '"(?:\\\\.|[^"\\\\])*"' },
    { token: "keyword", regex: `\\b(?:${fmlKeywords})\\b` },
    { token: "keyword.operator", regex: "->|=" },
    ...FhirPathRules.start,
  ],
};
