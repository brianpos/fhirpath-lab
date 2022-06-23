declare module "vue2-brace-editor"

// declare interface TextHighlighter {
//     $id: string;
//     $rules: any;
// }

declare interface TextHighlightToken {
    token?: string | string[];
    regex?: RegExp | string;
    next?: string;
    consumeLineEnd?: boolean;
    defaultToken?: string;
    push?: string | string[];
}

// declare interface TextHighlightRule {
//     start: TextHighlightToken[];
//     charTypes?: TextHighlightToken[];
//     quantifiers?: TextHighlightToken[];
//     charclass?: TextHighlightToken[];
//     groups?: TextHighlightToken[];
//     xGroup?: TextHighlightToken[];
//     comment?: TextHighlightToken[];
//     no_regex?: TextHighlightToken[];
// }
