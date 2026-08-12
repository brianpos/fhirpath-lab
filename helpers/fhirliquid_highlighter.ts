import { Rules as FhirPathHighlightRules } from "./fhirpath_highlighter";

type HighlightRule = TextHighlightToken & { next?: string };

const STATE_PREFIX = "liquid_fhirpath_";
const TAG_STATE = `${STATE_PREFIX}start`;

function namespaceRule(rule: TextHighlightToken): HighlightRule {
  const namespaced = { ...rule } as HighlightRule;
  if (namespaced.next) {
    namespaced.next = namespaced.next === "start"
      ? TAG_STATE
      : `${STATE_PREFIX}${namespaced.next}`;
  }
  return namespaced;
}

const namespacedFhirPathRules = Object.fromEntries(
  Object.entries(FhirPathHighlightRules).map(([state, rules]) => [
    `${STATE_PREFIX}${state}`,
    rules.map(namespaceRule),
  ]),
) as Record<string, HighlightRule[]>;

export const FhirLiquidHighlightRules: Record<string, HighlightRule[]> = {
  ...namespacedFhirPathRules,
  start: [
    {
      token: "liquid_token",
      regex: /\{\{|\{%/,
      next: TAG_STATE,
    },
    {
      defaultToken: "liquid_template",
    },
  ],
  [TAG_STATE]: [
    {
      token: "liquid_token",
      regex: /\}\}|%\}/,
      next: "start",
    },
    {
      token: "liquid_token",
      regex: /\b(?:if|elsif|else|endif|for|endfor|loop|endloop|reversed|limit|offset|assign|capture|endcapture|include|break|continue|cycle)\b/,
    },
    {
      token: "liquid_token",
      regex: /\|\||\b(?:prepend|markdownify|upcase|downcase)\b/,
    },
    ...FhirPathHighlightRules.start.map(namespaceRule),
  ],
};
