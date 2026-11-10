# Database logical models and mapping database rows to FHIR

Code: `helpers/db_logical_model_generator.ts`
UI: `vue3-src/app/pages/fml.vue` (Models tab database button, toolbar "run over database" button)
Tests: `test/db-logical-model-generator.test.ts`, `fml-debug-service/src/test/FmlLocalDebugService.test.ts`

## Goal

Read the schema of a relational database and emit a FHIR `Bundle` of logical
models (`StructureDefinition`, `kind = logical`), one per table, so the rows can
be used as the source of an FML map. The map's primary table is then scanned,
the map is run once per row, and the results are collected into an output
`Bundle`.

SQLite is implemented. The design keeps Azure SQL and PostgreSQL in mind (see
[Adding another database](#adding-another-database)).

## Layers

1. **`DbSchema`** - a database-neutral description: tables, columns
   (name, declared type, nullability, primary key position, default, comment)
   and foreign keys (columns, referenced table, referenced columns).
2. **`DbSchemaReader`** - turns a live database into a `DbSchema`.
   `SqliteSchemaReader` takes a `SqliteQueryRunner` (`all(sql) => rows`), so the
   helper has no dependency on a SQLite engine. The page supplies a small
   adapter over [sql.js](https://sql.js.org) (SQLite compiled to WebAssembly,
   loaded lazily so it only costs bandwidth when used); the unit tests use the
   same library under Node.
3. **`createLogicalModelsFromSchema`** - `DbSchema` -> `Bundle` of
   `StructureDefinition`. Pure and synchronous.
4. **Instance helpers** - `rowToInstance`, `readSqliteRows`,
   `resolveSqliteReference` convert rows to JSON that conforms to the generated
   models and look rows up by reference.

## Generated models

| Database | Logical model |
| --- | --- |
| table `t` | `StructureDefinition` with `url = {baseUrl}/{database}/StructureDefinition/{t}`, `name = t`, `type = url`, `kind = logical`, `baseDefinition = Base`. Same shape as the other generated logical models (differential only) |
| column | element `t.column`, cardinality `0..1` (or `1..1` when `NOT NULL` or part of the primary key) |
| column comment | `short` (first line) and `definition` (full text) |
| table comment | `description`, and `short`/`definition` of the root element |
| type, default, key info | `ElementDefinition.comment` ("Database type: ...; Primary key; Default: ..."), so it is visible in the model but does not interfere with typing |
| origin | `mapping` with identity `sql` (`table` / `table.column`) |
| single-column foreign key | type `Reference` with `targetProfile` = the referenced table's model url |
| multi-column foreign key | columns keep their primitive types; the key is described in the element `comment` (a FHIR Reference cannot express a composite key) |

`baseUrl` (default `http://example.org/fhir/db`), `publisher`, `version` and
`status` are options. Names that are not valid FHIR identifiers are sanitised
by `toFhirName` (non `[A-Za-z0-9_]` characters become `_`). The same function
is used for rows, so JSON keys always match the model. The original names are
preserved in the `sql` mapping.

### Type mapping (SQLite)

Well-known declared names are honoured first, then SQLite's affinity rules
(<https://sqlite.org/datatype3.html>):

`BOOL*` -> `boolean`, `DATETIME`/`TIMESTAMP` -> `dateTime`, `DATE` -> `date`,
`TIME` -> `time`, contains `INT` -> `integer`, `CHAR`/`CLOB`/`TEXT` -> `string`,
no declared type -> `string`, `BLOB` -> `base64Binary`, `REAL`/`FLOA`/`DOUB` ->
`decimal`, anything else (NUMERIC) -> `decimal`. Dialect specific mappers live
in `typeMappers`.

### Comments

SQLite has no comment metadata, but `sqlite_master.sql` retains the original
`CREATE TABLE` text including comments. `parseCreateTableComments` scans it
with a small tokenizer that understands quoted identifiers/strings, nesting and
both comment styles (`-- ...`, `/* ... */`):

* a comment on the same line after a column (before or after the comma) belongs to that column;
* comment lines directly above a column belong to that column;
* comments in the header (before the `(`), or a comment block after the `(` that is followed by a blank line, describe the table;
* comments before the `CREATE TABLE` keyword are **not** stored by SQLite and cannot be read.

Other databases have real comment metadata (`COMMENT ON` in PostgreSQL,
`MS_Description` extended properties in Azure SQL), which map to the same
`DbTable.comment` / `DbColumn.comment` fields.

## Foreign keys, references and `resolve()`

A foreign-key value is not a FHIR reference, so `rowToInstance` converts it:

```json
{ "visit_id": 10, "patient_id": { "reference": "patient/2" } }
```

The reference text is `{table}/{key}` when it targets the table's single-column
primary key, or `{table}?{column}={value}` for any other referenced column.
`parseDbReference` reads both forms and `resolveSqliteReference` runs the
lookup and returns the row with `resourceType` set to the model name (the FML
engine requires resolved objects to carry one). With that, a map can follow a
foreign key:

```
src -> tgt.code as c, c.text = evaluate(src, %src.patient_id.resolve().family) "family";
```

### Typing of `resolve()`

`helpers/fhirpath_visitor.ts` types `resolve()` by the Reference's target
profiles when the Reference is reached through an element (e.g.
`%src.patient_id.resolve()`), so properties of the logical model are known.
When a Reference value is reached some other way (e.g. a variable bound with
`src.patient_id as p`) the target profiles are not known and the result is typed
as `Resource`; navigate from the owning element instead.

## Running a map over a table

On the FML test page:

1. **Models tab -> database button** picks a `.sqlite`/`.sqlite3`/`.db` file,
   reads the schema and puts the generated Bundle in the Models editor. The
   database stays open in memory for the page session (nothing is uploaded).
2. Write a map whose source `uses` the table's model url (or just its name):
   `uses "http://example.org/fhir/db/clinic/StructureDefinition/visit" alias V as source`.
3. The toolbar **database-run button** finds the first source structure that
   matches a table (the *primary table*), reads its rows, runs the local
   JavaScript engine once per row, and puts a `collection` Bundle in the Output
   tab. If an individual run returns a `Bundle` its entries are merged, otherwise
   the resource becomes an entry. Per-row errors and warnings are collected in
   the outcome, prefixed with the table and row number, and processing continues.

Considerations:

* Rows are capped at 10,000 per run (a warning is shown) to keep the page responsive.
* The map is parsed, analysed and prepared once via
  `FmlLocalDebugService.executeParametersBatch`, which then executes it per row.
  If preparation fails a single result carrying the diagnostics is returned.
* Per-row traces are disabled (`localTrace: false`). Use a single-row input and
  the normal Run button to debug.
* BLOBs become base64 strings, bigints become numbers, `NULL` columns are omitted.

## `resolve` in the FML engine and the origin parameter

The FML engine already evaluated FHIRPath `resolve()` through a host service.
`FmlExecutionOptions.resolve` is now `(reference, signal, origin)`:

```ts
interface FmlResolveOrigin {
  mode: "source" | "target" | "unknown"; // where the focus came from
  variable?: string;                      // mapping variable holding the focus
  expression: string;                     // the FHIRPath text being evaluated
  variables: { name: string; mode: "source" | "target" }[]; // variables it references
  site: FmlTraceSite;                     // source name + span of the rule element
  rule?: string;                          // rule name
}
```

`mode` is derived from how each variable was bound: group parameters use their
declared `source`/`target` mode, `src.x as v` variables are source, and
`tgt.x as v` variables are target (tracked in `Frame.modes`). The focus is
attributed to the variable whose value is the focus object, falling back to the
root of the focus, then to the first referenced variable. A host can therefore
resolve from the source server for source data and from the target server for
target data, and report errors against the map location. In the test page,
`mode === "target"` skips the database and only fetches absolute http(s) urls.

## Adding another database

Implement `DbSchemaReader` for the new database (Azure SQL: `INFORMATION_SCHEMA`
/ `sys.*` plus `MS_Description`; PostgreSQL: `information_schema` /
`pg_catalog` plus `pg_description`), add its type mapper to `typeMappers`, and
add a row reader/reference resolver next to `readSqliteRows` /
`resolveSqliteReference`. Those queries are asynchronous for networked
databases, so `DbSchemaReader.readSchema` already allows a `Promise`; the row
helpers will need the same treatment. Browsers cannot talk to those servers
directly, so they need a server-side component, which is out of scope for the
first iteration. The generator, naming, reference format and instance
conversion are database-neutral and are reused unchanged.
