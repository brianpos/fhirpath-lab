/**
 * Cross-version canonical support for FML diagramming.
 *
 * FHIR cross-version maps reference structures using version-qualified
 * canonical URLs of the form:
 *
 *   http://hl7.org/fhir/<major>.<minor>/StructureDefinition/<Type>
 *
 * The version segment (e.g. `4.3`, `5.0`) identifies the FHIR release
 * that owns the StructureDefinition. To resolve such a structure against
 * an existing per-version model catalogue (which is keyed on the plain
 * `http://hl7.org/fhir/StructureDefinition/<Type>` canonical) the version
 * segment must be parsed out and the URL normalised back to the
 * version-neutral canonical form.
 */

import type { StructureDeclaration } from "./fml_models";

/**
 * Recognised FHIR releases. Maps to the major.minor segment that may
 * appear in a cross-version canonical URL.
 */
export type FhirVersion = 'DSTU2' | 'STU3' | 'R4' | 'R4B' | 'R5' | 'R6';

/**
 * Mapping from `<major>.<minor>` URL segment to FHIR release identifier.
 * See https://www.hl7.org/fhir/versions.html#versioning.
 */
const VERSION_SEGMENT_TO_FHIR: Record<string, FhirVersion> = {
  '1.0': 'DSTU2',
  '3.0': 'STU3',
  '4.0': 'R4',
  '4.3': 'R4B',
  '5.0': 'R5',
  '6.0': 'R6',
};

/**
 * Pattern matching `http(s)://hl7.org/fhir/<major>.<minor>/<rest>` where
 * `<rest>` is captured so the URL can be rebuilt without the version
 * segment.
 */
const CROSS_VERSION_URL_RE =
  /^(https?:\/\/hl7\.org\/fhir)\/(\d+\.\d+)\/(.+)$/;

/**
 * Result of parsing a (possibly version-qualified) canonical URL.
 */
export interface ParsedCanonical {
  /** The original input URL (unchanged). */
  original: string;

  /**
   * The version-neutral canonical that should be used to look the
   * structure up in a model catalogue. If the input URL did not contain
   * a recognisable FHIR version segment this is identical to `original`.
   */
  canonical: string;

  /**
   * The detected FHIR release, or `undefined` if the URL did not carry a
   * recognisable version segment (plain canonical, logical model URL,
   * non-hl7.org URL, ...).
   */
  version?: FhirVersion;
}

/**
 * Parse a canonical URL and detect any embedded FHIR version segment.
 *
 * Examples:
 *   parseCanonicalVersion("http://hl7.org/fhir/4.3/StructureDefinition/Citation")
 *     => { canonical: "http://hl7.org/fhir/StructureDefinition/Citation",
 *          version: "R4B" }
 *
 *   parseCanonicalVersion("http://hl7.org/fhir/StructureDefinition/Patient")
 *     => { canonical: "http://hl7.org/fhir/StructureDefinition/Patient",
 *          version: undefined }
 *
 *   parseCanonicalVersion("http://example.org/fhir/StructureDefinition/MyLogical")
 *     => { canonical: "http://example.org/fhir/StructureDefinition/MyLogical",
 *          version: undefined }
 */
export function parseCanonicalVersion(url: string): ParsedCanonical {
  if (!url) {
    return { original: url, canonical: url };
  }

  const m = CROSS_VERSION_URL_RE.exec(url);
  if (!m) {
    return { original: url, canonical: url };
  }

  const [, prefix, segment, rest] = m;
  const version = VERSION_SEGMENT_TO_FHIR[segment];
  if (!version) {
    // hl7.org/fhir/<x.y>/... but `<x.y>` is not a recognised release, so
    // leave the URL untouched.
    return { original: url, canonical: url };
  }

  return {
    original: url,
    canonical: `${prefix}/${rest}`,
    version,
  };
}

/**
 * Roles a `uses` declaration may take in an FML map.
 */
export type StructureRole = 'source' | 'queried' | 'target' | 'produced';

/**
 * The auto-detected source/target FHIR model versions for an FML map.
 *
 * Each value is `undefined` when no `uses` declaration of that role
 * carried a recognised version segment; callers should fall back to
 * their global default (or a user override) in that case.
 */
export interface DetectedModelVersions {
  /** Version of the first `uses ... as source` (or `as queried`) that has a version segment. */
  sourceModelVersion?: FhirVersion;
  /** Version of the first `uses ... as target` (or `as produced`) that has a version segment. */
  targetModelVersion?: FhirVersion;
}

/**
 * Inspect a list of `uses` (structure) declarations and pick the
 * source/target model versions to use when diagramming.
 *
 * Per the plan:
 *   - `sourceModelVersion` = version of the first `uses ... as source`
 *     declaration with a version segment.
 *   - `targetModelVersion` = same rule for `uses ... as target`.
 *   - `queried` follows `source`, `produced` follows `target` (only used
 *     as a fallback if no explicit `source`/`target` declaration carried
 *     a version segment).
 */
export function selectModelVersions(
  structures: StructureDeclaration[]
): DetectedModelVersions {
  let source: FhirVersion | undefined;
  let queried: FhirVersion | undefined;
  let target: FhirVersion | undefined;
  let produced: FhirVersion | undefined;

  for (const s of structures) {
    const v = s.fhirVersion ?? parseCanonicalVersion(s.url).version;
    if (!v) continue;
    switch (s.mode) {
      case 'source':
        if (!source) source = v;
        break;
      case 'queried':
        if (!queried) queried = v;
        break;
      case 'target':
        if (!target) target = v;
        break;
      case 'produced':
        if (!produced) produced = v;
        break;
    }
  }

  return {
    sourceModelVersion: source ?? queried,
    targetModelVersion: target ?? produced,
  };
}
