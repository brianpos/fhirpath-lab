// This custom model definition provides a simple base framework for a generic cut-down version of the FHIR core structure models.
// There will be a full set of these for each version of FHIR code generated into json file(s) and imported into the app as needed.
// All TypeModel/ElementModel/ElementTypeModel instances and the dictionaries that index them are intended to be
// generated, read-only, and immutable at runtime. Consumers must not mutate them; cache any derived data in a
// separate WeakMap keyed off the model object instead.
//
// Conventions:
// - BackboneElements (and other contentReference targets) are promoted to their own TypeModel entries rather than being
//   represented inline. The synthetic TypeName uses the form `<parentType>_<childPath>` in lower_snake style relative to
//   its parent, e.g. `questionnaire_item`, `questionnaire_item_enableWhen`, `bundle_entry`. Recursive structures
//   (e.g. `Questionnaire.item.item`) are expressed by an ElementTypeModel.TypeName referring back to the same synthetic
//   type, so no explicit contentReference field is required on ElementModel.
//
// - Choice elements keep the `[x]` suffix in ElementName (e.g. `value[x]`) and list every permitted concrete type in
//   the Type[] collection. Validators expand `valueQuantity`, `valueString`, etc. by matching the suffix against the
//   Type[] entries.
//
// - Models are looked up via an external dictionary keyed by canonical URL (including the FHIR version), since multiple
//   FHIR versions may be loaded concurrently. TypeName is unique within a single version's dictionary but not across
//   versions, so the canonical URL is the authoritative identifier. A secondary per-version index by TypeName is fine
//   for resolving local ElementTypeModel.TypeName references within that same version's dictionary.
//
// - Primitive handling uses two layers, mirroring how HL7 itself models primitives:
//     1. The FHIR primitive datatype (lowercase TypeName: `string`, `boolean`, `dateTime`, ...) is a complex type
//        with `id`, `extension`, and a `value` element. It can carry extensions and be navigated like any other
//        complex type. IsPrimitive is NOT set on these entries.
//     2. The underlying system/native value type (TypeName: `String`, `Boolean`, `Integer`, `Decimal`, `DateTime`,
//        `Date`, `Time`, `Quantity`) is what the `.value` element points at. These have no children and IsPrimitive
//        IS set. They correspond to FHIRPath's `System.*` types and use the canonical URLs published by HL7
//        (`http://hl7.org/fhirpath/System.String`, `System.Boolean`, etc.).
//   Transforms that operate on the value space only (truncate/append/cast/raw literal copy) are gated on IsPrimitive.
//   Transforms that navigate `.extension` / `.id` are legal on the FHIR primitive container but not on the system type.
//
// - System.* types are version-independent and defined in a single shared source module. Each per-version dictionary
//   imports those same instances by reference and re-indexes them under their canonical URLs, so identity is
//   preserved across versions (useful for memoising validation results via WeakMap). The shared set is limited to
//   the explicitly enumerated `System.*` types; FHIR primitives like `string` are still version-specific.
//
// - Stage 1 scope: core FHIR types only. No profiling, slicing, discriminators, fixed/pattern values, or terminology
//   bindings. TargetProfile is retained on ElementTypeModel solely to allow Reference target-resource-type resolution.
//   Logical models are expected to fit this same shape (root TypeModel with a canonical URL, BackboneElement-style
//   nested groups using the same `parenttype_childpath` synthetic naming).

export interface TypeModel {
    TypeName: string;
    BaseTypeName?: string;
    Elements: ElementModel[];
    /** Canonical URL for runtime logical models. Core generated models omit this metadata. */
    CanonicalUrl?: string;
    /** StructureDefinition.version for runtime logical models. */
    Version?: string;
    /** True only for system/native primitive types (System.String, System.Boolean, ...). The FHIR primitive
     *  containers (`string`, `boolean`, ...) are complex types and do NOT set this flag. */
    IsPrimitive?: boolean;
}

export interface ElementModel {
    /** Element name as defined in the source structure. Choice elements retain the `[x]` suffix (e.g. `value[x]`)
     *  and list every permitted concrete type in Type[]. */
    ElementName: string;
    Type: ElementTypeModel[];
    IsArray?: boolean;
    Required?: boolean;
}

export interface ElementTypeModel {
    /** References another TypeModel by its TypeName within the same per-version dictionary. For BackboneElements
     *  and contentReference targets this is the synthetic `<parenttype>_<childpath>` name. */
    TypeName: string;
    /** Only meaningful when TypeName === "Reference"; lists the canonical URLs of allowed target resource types. */
    TargetProfile?: string[];
}
