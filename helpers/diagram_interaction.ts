/**
 * Apply a transient highlight to all SVG elements that share any of the
 * supplied connection ids (as recorded in their `data-conn-id-list`
 * attribute). The highlight is removed after `durationMs` milliseconds.
 *
 * Used by the page-level click handler to flash matching rows, ports
 * and connector paths/lines when the user clicks a row or connector in
 * the structure-map diagram SVG.
 */
export function highlightDiagramConnection(
  root: Element,
  connIds: number[],
  durationMs: number = 1500
): void {
  if (connIds.length === 0) return;
  const idSet = new Set(connIds.map((n) => String(n)));
  const matched: Element[] = [];
  const all = root.querySelectorAll("[data-conn-id-list]");
  all.forEach((el) => {
    const list = el.getAttribute("data-conn-id-list");
    if (!list) return;
    const ids = list.split(",");
    if (!ids.some((id) => idSet.has(id))) return;
    const tag = el.tagName.toLowerCase();
    if (tag === "rect" && el.getAttribute("fill") === "transparent") {
      // Row overlay — paint background
      el.classList.add("sm-row-highlight");
      matched.push(el);
    } else if (tag === "path") {
      el.classList.add("sm-conn-highlight");
      matched.push(el);
    } else if (tag === "line") {
      el.classList.add("sm-conn-highlight");
      matched.push(el);
    } else if (tag === "circle" || tag === "rect") {
      // Connector port markers
      el.classList.add("sm-port-highlight");
      matched.push(el);
    }
  });
  if (matched.length === 0) return;
  setTimeout(() => {
    for (const el of matched) {
      el.classList.remove("sm-row-highlight");
      el.classList.remove("sm-conn-highlight");
      el.classList.remove("sm-port-highlight");
    }
  }, durationMs);
}

/**
 * Walk up from `target` to find the nearest ancestor (or itself) carrying
 * a `data-conn-id-list` attribute and return the parsed list of ids.
 * Returns an empty array when no ancestor carries the attribute.
 */
export function findConnectionIdsForClick(target: EventTarget | null): number[] {
  let el = target as Element | null;
  while (el) {
    const list = el.getAttribute?.("data-conn-id-list");
    if (list) {
      return list
        .split(",")
        .map((s) => parseInt(s, 10))
        .filter((n) => !isNaN(n));
    }
    el = el.parentElement;
  }
  return [];
}
