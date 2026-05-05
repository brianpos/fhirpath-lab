# Generated FHIRPath spec data

The `functions.json` and `operations.json` in this directory are taken verbatim
from the HL7 FHIRPath specification source repository.

Source: https://github.com/HL7/FHIRPath/tree/BP-2026-03-quantity-preview
- functions.json: https://raw.githubusercontent.com/HL7/FHIRPath/BP-2026-03-quantity-preview/functions.json
- operations.json: https://raw.githubusercontent.com/HL7/FHIRPath/BP-2026-03-quantity-preview/operations.json

DO NOT EDIT these files by hand. Run `npm run generate:fhirpath-spec` to refresh
them from the source. Optionally pass `-- --ref <branchOrCommit>` to fetch from
a different ref (default: `BP-2026-03-quantity-preview`).

The structured TS API consumed by the lab is in
`helpers/fhirpath-spec/index.ts`, which loads these JSON files at module load,
freezes them, and indexes them by name for lookup by the FHIRPath validator
visitor.
