import { validateFhirLiquidTemplate } from "../helpers/fhir_liquid_validator";

describe("validateFhirLiquidTemplate", () => {
  it("accepts Liquid controls with imported FHIRPath expressions", () => {
    const template = `Patient: {{ Patient.name.where(use = 'official').first().family || upcase }}
{% assign heading = "Identifiers" %}
{% if Patient.identifier.exists() %}
{{ heading }}
{% for identifier in Patient.identifier limit: 2 %}
- {{ identifier.system }}: {{ identifier.value }}
{% else %}
No identifiers
{% endfor %}
{% endif %}`;

    expect(validateFhirLiquidTemplate(template)).toBeUndefined();
  });

  it("keeps quoted HTML around output expressions as template text", () => {
    const template = `<tr id="{{ i.key }}" >
<td>{{ i.key }}</td>
<td>
{% for ref in i.reference %}
{% assign rel_url = ref.extension('http://hl7.org/fhir/StructureDefinition/narrativeLink').value.toString() %}
{% if rel_url %}
<span style="color: grey;">link</span>
{% endif %}
{% endfor %}
</td>
</tr>`;

    expect(validateFhirLiquidTemplate(template)).toBeUndefined();
  });

  it("accepts plain text and an empty template", () => {
    expect(validateFhirLiquidTemplate("Plain template text")).toBeUndefined();
    expect(validateFhirLiquidTemplate("")).toBeUndefined();
  });

  it("returns located OperationOutcome issues for malformed templates", () => {
    const outcome = validateFhirLiquidTemplate("Heading\n{{ Patient.name");

    expect(outcome?.resourceType).toBe("OperationOutcome");
    expect(outcome?.issue.length).toBeGreaterThan(0);
    expect(outcome?.issue[0]).toMatchObject({
      severity: "error",
      code: "invalid",
      details: {
        coding: [{
          system: "http://fhirpath-lab.com/CodeSystem/validator-codes",
          code: "syntax",
        }],
      },
    });
    expect(outcome?.issue[0].details?.text).toBeTruthy();
    expect(outcome?.issue[0].location?.[0]).toMatch(/^@2:\d+$/);
    expect(outcome?.issue[0].expression).toEqual(outcome?.issue[0].location);
    expect(outcome?.issue[0].__position).toEqual({
      line: 2,
      column: expect.any(Number),
      length: 0,
    });
  });

  it("reports an unterminated control block", () => {
    const outcome = validateFhirLiquidTemplate(
      "{% if Patient.active %}Active",
    );

    expect(outcome?.issue.length).toBeGreaterThan(0);
    expect(outcome?.issue.every(issue => issue.severity === "error")).toBe(true);
  });
});
