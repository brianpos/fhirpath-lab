const HTML_ELEMENT_PATTERN = /<(?:a|abbr|address|article|aside|audio|b|blockquote|body|br|button|canvas|caption|code|col|colgroup|data|dd|del|details|dfn|dialog|div|dl|dt|em|fieldset|figcaption|figure|footer|form|h[1-6]|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|label|legend|li|link|main|map|mark|menu|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|picture|pre|progress|q|rp|rt|ruby|s|samp|script|search|section|select|slot|small|source|span|strong|style|sub|summary|sup|table|tbody|td|template|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr)(?:\s|\/?>)/i;

export function isHtmlOutput(value: string): boolean {
  const content = value.trim();
  if (!content) return false;
  return /<!doctype\s+html(?:\s|>)/i.test(content)
    || HTML_ELEMENT_PATTERN.test(content);
}
