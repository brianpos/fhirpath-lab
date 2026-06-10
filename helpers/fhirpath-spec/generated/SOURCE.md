# Generated FHIRPath spec data

The `functions.json` and `operations.json` in this directory are taken verbatim
from the HL7 FHIRPath specification source repository.

Source: https://github.com/HL7/FHIRPath/tree/master
- functions.json: https://raw.githubusercontent.com/HL7/FHIRPath/master/functions.json
- operations.json: https://raw.githubusercontent.com/HL7/FHIRPath/master/operations.json

DO NOT EDIT these files by hand. Run `npm run generate:fhirpath-spec` to refresh
them from the source. Optionally pass `-- --ref <branchOrCommit>` to fetch from
a different ref (default: `master`).

The structured TS API consumed by the lab is in
`helpers/fhirpath-spec/index.ts`, which loads these JSON files at module load,
freezes them, and indexes them by name for lookup by the FHIRPath validator
visitor.
