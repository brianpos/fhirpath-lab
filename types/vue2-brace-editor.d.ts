declare module "vue2-brace-editor"

declare interface TextHighlightRule {
    start: TextHighlightToken[];
    charTypes?: TextHighlightToken[];
    quantifiers?: TextHighlightToken[];
    charclass?: TextHighlightToken[];
    groups?: TextHighlightToken[];
    xGroup?: TextHighlightToken[];
    comment?: TextHighlightToken[];
    no_regex?: TextHighlightToken[];
}
