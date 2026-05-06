import { UsageContext } from "fhir/r4b";

export interface FhirpathLabUseContexts {
  system?: string;
  code: string;
  display: string;
}

export interface MergedUseContextsResult {
  contexts: FhirpathLabUseContexts[];
  changed: boolean;
}

/** Compare two use contexts treating them as equal when both code and display match.
 * The system is intentionally ignored to avoid duplicate entries appearing when the
 * same logical context is published with different (or missing) system URIs. */
function sameUseContext(
  a: { system?: string; code?: string; display?: string },
  b: { system?: string; code?: string; display?: string }
): boolean {
  if (!a.code || !b.code) return false;
  if (a.code !== b.code) return false;
  if (a.display !== b.display) return false;
  return true;
}

/** Return a new array containing the initial list, plus the includeContexts (excluding any duplicates) */
export function mergeUseContexts(initial: FhirpathLabUseContexts[], includeContexts?: UsageContext[]): MergedUseContextsResult {
  if (!includeContexts) return { contexts: initial, changed: false };

  var result = false;
  var newCodings = [ ... initial];
  for (let val of includeContexts) {
    if (!val.valueCodeableConcept || !val.valueCodeableConcept.coding)
      continue;

    for (let coding of val.valueCodeableConcept.coding) {
      if (
        newCodings.filter((value) => sameUseContext(value, coding)).length === 0
      ) {
        // add this item to the orgTypes
        if (coding.code && coding.display) {
          let codingVal = {
            system: coding.system,
            code: coding.code,
            display: coding.display,
          };
          newCodings.push(codingVal);
          result = true;
          console.log(
            `New Usage Context: ${coding.system}|${coding.code} ${coding.display}`
          );
        }
      }
    }
  }
  return { contexts: newCodings, changed: result };
}

export function mergeCustomUseContexts(initial: FhirpathLabUseContexts[], includeContexts?: FhirpathLabUseContexts[]): FhirpathLabUseContexts[] {
  if (!includeContexts) return initial;

  var newCodings = [ ... initial];
  for (let coding of includeContexts) {
    if (
      newCodings.filter((value) => sameUseContext(value, coding)).length === 0
    ) {
      // add this item to the orgTypes
      if (coding.code && coding.display) {
        let codingVal = {
          system: coding.system,
          code: coding.code,
          display: coding.display,
        };
        newCodings.push(codingVal);
      }
    }
  }
  return newCodings;
}

export function loadCustomUseContexts(suffix: string, baseContexts: FhirpathLabUseContexts[]): FhirpathLabUseContexts[] {
  // check local storage for other types
  const persistentOrgTypesStr = localStorage.getItem("use-contexts-" + suffix);
  if (!persistentOrgTypesStr) return baseContexts;

  const persistentOrgTypes = JSON.parse(persistentOrgTypesStr) as {
    system?: string | undefined;
    code: string;
    display: string;
  }[];
  return mergeCustomUseContexts(baseContexts, persistentOrgTypes);
}

export function saveCustomUseContexts(suffix: string, contexts: FhirpathLabUseContexts[], excludingDefaults: FhirpathLabUseContexts[]) {
  console.log("Updating custom Use Contexts list (based on content)");

  // remove any default contexts
  const storeContexts = contexts.filter((value) => {
    return excludingDefaults?.filter((exValue) => sameUseContext(value, exValue)).length === 0;
  });

  localStorage.setItem(
    "use-contexts-" + suffix,
    JSON.stringify(storeContexts)
  );
}
