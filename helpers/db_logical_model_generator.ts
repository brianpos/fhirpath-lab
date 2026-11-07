/**
 * Database -> FHIR Logical Model generator.
 *
 * Reads the schema of a relational database and produces a Bundle of FHIR
 * logical models (one StructureDefinition per table) so the data can be mapped
 * to FHIR with FML. See docs/database-logical-models.md for the design.
 *
 * The code is split in three layers so other databases can be added later:
 *  1. `DbSchema` - a neutral description of tables/columns/foreign keys/comments
 *  2. `DbSchemaReader` implementations (currently `SqliteSchemaReader`)
 *  3. `createLogicalModelsFromSchema` - turns a `DbSchema` into the Bundle, and
 *     `rowToInstance` converts rows into JSON that conforms to those models.
 */

import type * as fhir4b from "fhir/r4b";

export type DbDialect = "sqlite" | "postgres" | "azuresql";

export interface DbColumn {
  name: string;
  /** Declared database type, exactly as the database reports it */
  dataType: string;
  nullable: boolean;
  /** 1-based position within the primary key, when part of it */
  primaryKeyPosition?: number;
  defaultValue?: string;
  comment?: string;
}

export interface DbForeignKey {
  columns: string[];
  referencedTable: string;
  /** Empty/omitted means "the primary key of the referenced table" */
  referencedColumns: string[];
}

export interface DbTable {
  name: string;
  comment?: string;
  columns: DbColumn[];
  foreignKeys: DbForeignKey[];
}

export interface DbSchema {
  /** Used to build canonical urls and the model descriptions */
  name: string;
  dialect: DbDialect;
  tables: DbTable[];
}

export interface DbSchemaReader {
  readSchema(): DbSchema | Promise<DbSchema>;
}

// ---------------------------------------------------------------------------
// Naming helpers (shared by the generator and the row converter)
// ---------------------------------------------------------------------------

/** FHIR element names and type names must be simple identifiers */
export function toFhirName(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9_]/g, "_");
  return /^[0-9]/.test(cleaned) ? `_${cleaned}` : cleaned || "_";
}

const DEFAULT_BASE_URL = "http://example.org/fhir/db";

export interface DbLogicalModelOptions {
  /** Canonical prefix; model urls are `{baseUrl}/{schema.name}/StructureDefinition/{table}` */
  baseUrl?: string;
  publisher?: string;
  status?: "draft" | "active" | "retired" | "unknown";
  version?: string;
}

export function modelUrl(schema: Pick<DbSchema, "name">, table: string, options?: DbLogicalModelOptions): string {
  const base = (options?.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
  return `${base}/${encodeURIComponent(schema.name)}/StructureDefinition/${toFhirName(table)}`;
}

// ---------------------------------------------------------------------------
// Type mapping
// ---------------------------------------------------------------------------

/**
 * Maps a SQLite declared type to a FHIR type. Well known names (BOOLEAN, DATE...)
 * are honoured first, then SQLite's own affinity rules (https://sqlite.org/datatype3.html).
 */
export function sqliteTypeToFhir(declared: string): string {
  const t = declared.toUpperCase();
  if (/BOOL/.test(t)) return "boolean";
  if (/DATETIME|TIMESTAMP/.test(t)) return "dateTime";
  if (/^DATE\b|^DATE$/.test(t)) return "date";
  if (/^TIME\b|^TIME$/.test(t)) return "time";
  if (/INT/.test(t)) return "integer";
  if (/CHAR|CLOB|TEXT/.test(t)) return "string";
  if (t === "") return "string";
  if (/BLOB/.test(t)) return "base64Binary";
  if (/REAL|FLOA|DOUB/.test(t)) return "decimal";
  return "decimal";
}

const typeMappers: Record<DbDialect, (declared: string) => string> = {
  sqlite: sqliteTypeToFhir,
  // Placeholders until the Postgres / Azure SQL readers are added
  postgres: sqliteTypeToFhir,
  azuresql: sqliteTypeToFhir,
};

// ---------------------------------------------------------------------------
// SQLite reader
// ---------------------------------------------------------------------------

/** The minimum a host must supply to read SQLite: run SQL, get rows back as objects */
export interface SqliteQueryRunner {
  all(sql: string): Record<string, unknown>[];
}

const quoteIdent = (name: string) => `"${name.replace(/"/g, '""')}"`;

interface CommentedDefinition {
  text: string;
  leading: string[];
  trailing: string[];
}

/**
 * SQLite keeps no comment metadata, but it stores the original CREATE TABLE text,
 * including comments. This extracts them:
 *  - comments on the header (before the first `(`), or a comment block after the `(`
 *    that is followed by a blank line, describe the table
 *  - comments on the lines above a column, or after it on the same line, describe the column
 */
export function parseCreateTableComments(sql: string): { tableComments: string[]; definitions: CommentedDefinition[] } {
  const tableComments: string[] = [];
  const definitions: CommentedDefinition[] = [];
  let i = 0;
  let line = 0;

  const readComment = (): string | undefined => {
    if (sql.startsWith("--", i)) {
      const end = sql.indexOf("\n", i);
      const stop = end < 0 ? sql.length : end;
      const text = sql.slice(i + 2, stop).trim();
      i = stop;
      return text;
    }
    if (sql.startsWith("/*", i)) {
      const end = sql.indexOf("*/", i + 2);
      const stop = end < 0 ? sql.length : end;
      const raw = sql.slice(i + 2, stop);
      line += (raw.match(/\n/g) ?? []).length;
      i = end < 0 ? sql.length : end + 2;
      return raw.split("\n").map(l => l.replace(/^\s*\*+\s?/, "").trim()).filter(Boolean).join(" ");
    }
    return undefined;
  };
  const skipQuoted = (): string => {
    const open = sql[i];
    const close = open === "[" ? "]" : open;
    let out = open;
    i++;
    while (i < sql.length) {
      out += sql[i];
      if (sql[i] === close) {
        if (sql[i + 1] === close && open !== "[") { out += sql[++i]; } else { i++; break; }
      }
      i++;
    }
    return out;
  };

  // Header: everything up to the opening parenthesis
  while (i < sql.length && sql[i] !== "(") {
    const comment = readComment();
    if (comment !== undefined) { if (comment) tableComments.push(comment); continue; }
    if (`"'\`[`.includes(sql[i])) { skipQuoted(); continue; }
    if (sql[i] === "\n") line++;
    i++;
  }
  i++;

  let depth = 1;
  let current: CommentedDefinition = { text: "", leading: [], trailing: [] };
  let started = false;
  let pending: string[] = [];
  let blankAfterPending = false;
  let sawBreak = false;
  let previous: CommentedDefinition | undefined;
  let previousEndLine = -1;

  const finish = () => {
    if (started) {
      definitions.push(current);
      previous = current;
    }
    current = { text: "", leading: [], trailing: [] };
    started = false;
  };

  while (i < sql.length && depth > 0) {
    const commentLine = line;
    const comment = readComment();
    if (comment !== undefined) {
      if (!comment) continue;
      if (started) current.trailing.push(comment);
      else if (previous && commentLine === previousEndLine) previous.trailing.push(comment);
      else {
        if (blankAfterPending && definitions.length === 0) { tableComments.push(...pending); pending = []; }
        pending.push(comment);
        blankAfterPending = false;
        sawBreak = false;
      }
      continue;
    }
    const ch = sql[i];
    if (ch === "\n") {
      line++;
      if (!started && pending.length) {
        if (sawBreak) blankAfterPending = true;
        sawBreak = true;
      }
      current.text += started ? " " : "";
      i++;
      continue;
    }
    if (/\s/.test(ch)) { if (started) current.text += ch; i++; continue; }
    if (!started) {
      started = true;
      if (blankAfterPending && definitions.length === 0 && pending.length) tableComments.push(...pending);
      else current.leading.push(...pending);
      pending = [];
      blankAfterPending = false;
      sawBreak = false;
    }
    if (`"'\`[`.includes(ch)) { current.text += skipQuoted(); continue; }
    if (ch === "(") depth++;
    if (ch === ")") {
      depth--;
      if (depth === 0) { finish(); break; }
    }
    if (ch === "," && depth === 1) {
      finish();
      previousEndLine = line;
      i++;
      continue;
    }
    current.text += ch;
    i++;
  }
  return { tableComments, definitions };
}

/** First identifier of a column/constraint definition, unquoted */
function leadingIdentifier(text: string): { name: string; quoted: boolean } {
  const m = /^\s*(?:"((?:[^"]|"")+)"|`((?:[^`]|``)+)`|\[([^\]]+)\]|'((?:[^']|'')+)'|([^\s(]+))/.exec(text);
  if (!m) return { name: "", quoted: false };
  const raw = m[1] ?? m[2] ?? m[3] ?? m[4];
  if (raw !== undefined) return { name: raw.replace(/""/g, '"').replace(/``/g, "`").replace(/''/g, "'"), quoted: true };
  return { name: m[5], quoted: false };
}

const CONSTRAINT_KEYWORDS = new Set(["PRIMARY", "FOREIGN", "UNIQUE", "CHECK", "CONSTRAINT"]);

export class SqliteSchemaReader implements DbSchemaReader {
  constructor(private readonly runner: SqliteQueryRunner, private readonly databaseName = "sqlite") {}

  readSchema(): DbSchema {
    const tableRows = this.runner.all(
      "SELECT name, sql FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name");
    const tables: DbTable[] = tableRows.map(row => {
      const name = String(row.name);
      const info = this.runner.all(`PRAGMA table_info(${quoteIdent(name)})`);
      const parsed = typeof row.sql === "string" ? parseCreateTableComments(row.sql) : { tableComments: [], definitions: [] };
      const columnComments = new Map<string, string>();
      for (const def of parsed.definitions) {
        const id = leadingIdentifier(def.text);
        if (!id.name || (!id.quoted && CONSTRAINT_KEYWORDS.has(id.name.toUpperCase()))) continue;
        const text = [...def.leading, ...def.trailing].join(" ").trim();
        if (text) columnComments.set(id.name.toLowerCase(), text);
      }
      const columns: DbColumn[] = info.map(c => ({
        name: String(c.name),
        dataType: String(c.type ?? ""),
        nullable: Number(c.notnull) === 0 && Number(c.pk) === 0,
        primaryKeyPosition: Number(c.pk) > 0 ? Number(c.pk) : undefined,
        defaultValue: c.dflt_value == null ? undefined : String(c.dflt_value),
        comment: columnComments.get(String(c.name).toLowerCase()),
      }));
      const fkRows = this.runner.all(`PRAGMA foreign_key_list(${quoteIdent(name)})`);
      const byId = new Map<number, Record<string, unknown>[]>();
      for (const fk of fkRows) byId.set(Number(fk.id), [...byId.get(Number(fk.id)) ?? [], fk]);
      const foreignKeys: DbForeignKey[] = [...byId.values()].map(parts => {
        parts.sort((a, b) => Number(a.seq) - Number(b.seq));
        return {
          columns: parts.map(p => String(p.from)),
          referencedTable: String(parts[0].table),
          referencedColumns: parts.every(p => p.to != null) ? parts.map(p => String(p.to)) : [],
        };
      });
      return { name, comment: parsed.tableComments.join(" ").trim() || undefined, columns, foreignKeys };
    });
    return { name: this.databaseName, dialect: "sqlite", tables };
  }
}

// ---------------------------------------------------------------------------
// Logical model generation
// ---------------------------------------------------------------------------

const SQL_IDENTITY = "sql";

function primaryKeyColumns(table: DbTable): string[] {
  return table.columns.filter(c => c.primaryKeyPosition)
    .sort((a, b) => a.primaryKeyPosition! - b.primaryKeyPosition!).map(c => c.name);
}

/** A single-column foreign key is the only shape that maps to a FHIR Reference */
function singleColumnForeignKey(table: DbTable, column: string): DbForeignKey | undefined {
  return table.foreignKeys.find(fk => fk.columns.length === 1 && fk.columns[0] === column);
}

export function createLogicalModelsFromSchema(schema: DbSchema, options: DbLogicalModelOptions = {}): fhir4b.Bundle<fhir4b.StructureDefinition> {
  const mapType = typeMappers[schema.dialect];
  const tableNames = new Set(schema.tables.map(t => t.name));
  const entries: fhir4b.BundleEntry<fhir4b.StructureDefinition>[] = schema.tables.map(table => {
    const typeName = toFhirName(table.name);
    const url = modelUrl(schema, table.name, options);
    const pk = primaryKeyColumns(table);
    const elements: fhir4b.ElementDefinition[] = [{
      id: typeName,
      path: typeName,
      ...(table.comment ? { short: firstLine(table.comment), definition: table.comment } : {}),
      mapping: [{ identity: SQL_IDENTITY, map: table.name }],
    }];
    for (const column of table.columns) {
      const path = `${typeName}.${toFhirName(column.name)}`;
      const fk = singleColumnForeignKey(table, column.name);
      const target = fk && tableNames.has(fk.referencedTable) ? fk : undefined;
      const notes: string[] = [`Database type: ${column.dataType || "(none)"}`];
      if (pk.includes(column.name)) notes.push(pk.length > 1 ? `Part of the primary key (${pk.join(", ")})` : "Primary key");
      if (column.defaultValue !== undefined) notes.push(`Default: ${column.defaultValue}`);
      for (const fkey of table.foreignKeys) {
        if (fkey.columns.includes(column.name) && fkey !== target) {
          notes.push(`Foreign key (${fkey.columns.join(", ")}) -> ${fkey.referencedTable}`
            + (fkey.referencedColumns.length ? `(${fkey.referencedColumns.join(", ")})` : ""));
        }
      }
      if (target) {
        notes.push(`Foreign key -> ${target.referencedTable}`
          + (target.referencedColumns.length ? `.${target.referencedColumns.join(", ")}` : ""));
      }
      const element: fhir4b.ElementDefinition = {
        id: path,
        path,
        short: column.comment ? firstLine(column.comment) : column.name,
        ...(column.comment ? { definition: column.comment } : {}),
        comment: notes.join("; "),
        min: column.nullable ? 0 : 1,
        max: "1",
        type: target
          ? [{ code: "Reference", targetProfile: [modelUrl(schema, target.referencedTable, options)] }]
          : [{ code: mapType(column.dataType) }],
        mapping: [{ identity: SQL_IDENTITY, map: `${table.name}.${column.name}` }],
      };
      elements.push(element);
    }
    const sd: fhir4b.StructureDefinition = {
      resourceType: "StructureDefinition",
      url,
      name: typeName,
      title: table.name,
      status: options.status ?? "draft",
      ...(options.version ? { version: options.version } : {}),
      ...(options.publisher ? { publisher: options.publisher } : {}),
      description: table.comment ?? `Logical model of the "${table.name}" table in the ${schema.dialect} database "${schema.name}"`,
      kind: "logical",
      abstract: false,
      type: url,
      baseDefinition: "http://hl7.org/fhir/StructureDefinition/Base",
      derivation: "specialization",
      mapping: [{ identity: SQL_IDENTITY, name: `${schema.dialect} database ${schema.name}` }],
      differential: { element: elements },
    };
    return { fullUrl: url, resource: sd };
  });
  return { resourceType: "Bundle", type: "collection", entry: entries };
}

function firstLine(text: string): string {
  const line = text.split(/\r?\n/)[0].trim();
  return line.length > 120 ? `${line.slice(0, 117)}...` : line;
}

// ---------------------------------------------------------------------------
// Row -> instance conversion and references
// ---------------------------------------------------------------------------

/** Reference text used for a foreign key value, resolvable with `parseDbReference` */
export function formatDbReference(table: string, column: string | undefined, pkColumn: string | undefined, value: unknown): string {
  const text = encodeURIComponent(String(value));
  return !column || column === pkColumn ? `${toFhirName(table)}/${text}` : `${toFhirName(table)}?${encodeURIComponent(column)}=${text}`;
}

export interface DbReference {
  table: string;
  /** Undefined means the table's primary key */
  column?: string;
  value: string;
}

export function parseDbReference(reference: string): DbReference | undefined {
  const m = /^([A-Za-z0-9_]+)(?:\/([^/?]+)|\?([^=&]+)=(.*))$/.exec(reference);
  if (!m) return undefined;
  return m[2] !== undefined
    ? { table: m[1], value: decodeURIComponent(m[2]) }
    : { table: m[1], column: decodeURIComponent(m[3]), value: decodeURIComponent(m[4]) };
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

export interface RowConversionOptions {
  /** Adds `resourceType` (the model name); required for objects handed to FHIRPath `resolve()` */
  includeResourceType?: boolean;
}

/** Converts a database row into JSON that conforms to the logical model generated for the table */
export function rowToInstance(schema: DbSchema, table: DbTable, row: Record<string, unknown>,
  options: RowConversionOptions = {}): Record<string, unknown> {
  const mapType = typeMappers[schema.dialect];
  const instance: Record<string, unknown> = options.includeResourceType ? { resourceType: toFhirName(table.name) } : {};
  for (const column of table.columns) {
    let value = row[column.name];
    if (value === null || value === undefined) continue;
    const fk = singleColumnForeignKey(table, column.name);
    const target = fk && schema.tables.find(t => t.name === fk.referencedTable);
    if (fk && target) {
      const referenced = fk.referencedColumns[0] ?? primaryKeyColumns(target)[0];
      const pk = primaryKeyColumns(target);
      value = { reference: formatDbReference(target.name, referenced, pk.length === 1 ? pk[0] : undefined, value) };
    } else if (value instanceof Uint8Array) {
      value = toBase64(value);
    } else if (mapType(column.dataType) === "boolean") {
      value = typeof value === "string" ? !/^(0|false|f|no|n)$/i.test(value) : Boolean(value);
    } else if (typeof value === "bigint") {
      value = Number(value);
    }
    instance[toFhirName(column.name)] = value;
  }
  return instance;
}

/** Finds the table whose logical model the given canonical url / type name refers to */
export function findTableForType(schema: DbSchema, typeNameOrUrl: string, options?: DbLogicalModelOptions): DbTable | undefined {
  const name = typeNameOrUrl.split("/").pop() ?? typeNameOrUrl;
  return schema.tables.find(t => modelUrl(schema, t.name, options) === typeNameOrUrl)
    ?? schema.tables.find(t => toFhirName(t.name) === name)
    ?? schema.tables.find(t => t.name.toLowerCase() === name.toLowerCase());
}

/**
 * Looks up the row a `DbReference` points at (SQLite). Returns an instance that
 * includes `resourceType`, or undefined when the table/row does not exist.
 */
export function resolveSqliteReference(runner: SqliteQueryRunner, schema: DbSchema, reference: string): Record<string, unknown> | undefined {
  const ref = parseDbReference(reference);
  const table = ref && schema.tables.find(t => toFhirName(t.name) === ref.table);
  if (!ref || !table) return undefined;
  const pk = primaryKeyColumns(table);
  const keyColumn = ref.column ?? (pk.length === 1 ? pk[0] : undefined);
  const column = keyColumn && table.columns.find(c => toFhirName(c.name) === toFhirName(keyColumn));
  if (!column) return undefined;
  const literal = /^-?\d+(\.\d+)?$/.test(ref.value) && isNumericColumn(column) ? ref.value : `'${ref.value.replace(/'/g, "''")}'`;
  const rows = runner.all(`SELECT * FROM ${quoteIdent(table.name)} WHERE ${quoteIdent(column.name)} = ${literal} LIMIT 1`);
  return rows.length ? rowToInstance(schema, table, rows[0], { includeResourceType: true }) : undefined;
}

function isNumericColumn(column: DbColumn): boolean {
  const type = sqliteTypeToFhir(column.dataType);
  return type === "integer" || type === "decimal";
}

/** Reads up to `limit` rows of a table, converted to logical model instances */
export function readSqliteRows(runner: SqliteQueryRunner, schema: DbSchema, table: DbTable, limit?: number): Record<string, unknown>[] {
  const sql = `SELECT * FROM ${quoteIdent(table.name)}${limit ? ` LIMIT ${Math.floor(limit)}` : ""}`;
  return runner.all(sql).map(row => rowToInstance(schema, table, row));
}
