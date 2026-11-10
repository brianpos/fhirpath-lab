import { describe, expect, test, beforeAll } from "@jest/globals";
import initSqlJs from "sql.js";
import {
  SqliteSchemaReader, createLogicalModelsFromSchema, parseCreateTableComments, readSqliteRows,
  resolveSqliteReference, sqliteTypeToFhir, parseDbReference, findTableForType, type SqliteQueryRunner,
} from "../helpers/db_logical_model_generator";

const ddl = `
CREATE TABLE patient (
  id INTEGER PRIMARY KEY, -- surrogate key
  family TEXT NOT NULL,
  /* date of birth
     (ISO) */
  birth_date DATE,
  active BOOLEAN DEFAULT 1,
  photo BLOB
);
CREATE TABLE "visit log" (
  -- The organisation hosting the visit

  visit_id INTEGER PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patient(id), -- who was seen
  clinician TEXT, -- free text, with (parens), and commas
  weight REAL,
  FOREIGN KEY (clinician) REFERENCES patient(family)
);
INSERT INTO patient VALUES (1, 'Smith', '2000-01-02', 1, x'0102');
INSERT INTO patient VALUES (2, 'O''Neil', NULL, 0, NULL);
INSERT INTO "visit log" VALUES (10, 2, 'Smith', 70.5);
`;

let runner: SqliteQueryRunner;

beforeAll(async () => {
  const SQL = await initSqlJs();
  const db = new SQL.Database();
  db.run(ddl);
  runner = {
    all(sql) {
      const stmt = db.prepare(sql);
      const rows: Record<string, unknown>[] = [];
      while (stmt.step()) rows.push(stmt.getAsObject());
      stmt.free();
      return rows;
    },
  };
});

describe("sqlite comment parsing", () => {
  test("extracts table, leading and trailing column comments", () => {
    const parsed = parseCreateTableComments(`CREATE TABLE t ( -- header
  -- table level

  -- on a
  a INT, -- trailing a
  b TEXT /* inline b */, c INT)`);
    expect(parsed.tableComments).toEqual(["header", "table level"]);
    expect(parsed.definitions.map(d => [d.leading, d.trailing])).toEqual([
      [["on a"], ["trailing a"]], [[], ["inline b"]], [[], []]]);
  });
});

describe("SqliteSchemaReader + generator", () => {
  test("reads columns, keys and comments", () => {
    const schema = new SqliteSchemaReader(runner, "clinic").readSchema();
    expect(schema.tables.map(t => t.name)).toEqual(["patient", "visit log"]);
    const patient = schema.tables[0];
    expect(patient.columns.find(c => c.name === "id")?.comment).toBe("surrogate key");
    expect(patient.columns.find(c => c.name === "birth_date")?.comment).toBe("date of birth (ISO)");
    const visit = schema.tables[1];
    expect(visit.columns.find(c => c.name === "clinician")?.comment).toBe("free text, with (parens), and commas");
    expect(visit.foreignKeys).toHaveLength(2);
  });

  test("builds a bundle with one logical model per table and Reference types", () => {
    const schema = new SqliteSchemaReader(runner, "clinic").readSchema();
    const bundle = createLogicalModelsFromSchema(schema);
    expect(bundle.entry).toHaveLength(2);
    const [patient, visit] = bundle.entry!.map(e => e.resource!);
    expect(patient.kind).toBe("logical");
    expect(visit.description).toBe("The organisation hosting the visit");
    const elements = visit.differential!.element!;
    expect(visit.name).toBe("visit_log");
    const fk = elements.find(e => e.path === "visit_log.patient_id")!;
    expect(fk.type).toEqual([{ code: "Reference", targetProfile: [patient.url] }]);
    expect(fk.definition).toBe("who was seen");
    expect(fk.min).toBe(1);
    // composite/non-PK foreign keys still map to a Reference to the table when single column
    expect(elements.find(e => e.path === "visit_log.weight")!.type).toEqual([{ code: "decimal" }]);
    const pElements = patient.differential!.element!;
    expect(pElements.find(e => e.path === "patient.photo")!.type).toEqual([{ code: "base64Binary" }]);
    expect(pElements.find(e => e.path === "patient.birth_date")!.type).toEqual([{ code: "date" }]);
    expect(pElements.find(e => e.path === "patient.active")!.type).toEqual([{ code: "boolean" }]);
  });

  test("converts rows and resolves references", () => {
    const schema = new SqliteSchemaReader(runner, "clinic").readSchema();
    const visit = schema.tables[1];
    const rows = readSqliteRows(runner, schema, visit);
    expect(rows).toEqual([{ visit_id: 10, patient_id: { reference: "patient/2" },
      clinician: { reference: "patient?family=Smith" }, weight: 70.5 }]);
    expect(resolveSqliteReference(runner, schema, "patient/2")).toEqual({ resourceType: "patient", id: 2, family: "O'Neil", active: false });
    expect(resolveSqliteReference(runner, schema, "patient?family=Smith")?.id).toBe(1);
    expect(resolveSqliteReference(runner, schema, "nothing/1")).toBeUndefined();
    expect(parseDbReference("patient/2")).toEqual({ table: "patient", value: "2" });
    expect(findTableForType(schema, "http://example.org/fhir/db/clinic/StructureDefinition/visit_log")?.name).toBe("visit log");
  });

  test("type mapping follows sqlite affinity", () => {
    expect([sqliteTypeToFhir("VARCHAR(10)"), sqliteTypeToFhir("BIGINT"), sqliteTypeToFhir("DOUBLE"), sqliteTypeToFhir("NUMERIC"), sqliteTypeToFhir("DATETIME")])
      .toEqual(["string", "integer", "decimal", "decimal", "dateTime"]);
  });
});
