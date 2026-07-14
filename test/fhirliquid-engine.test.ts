import {
  evaluateFhirLiquid,
  FhirLiquidEngine,
  FhirLiquidEvaluationError,
  FhirLiquidSyntaxError,
} from "../helpers/fhirliquid-engine";

const patient = {
  resourceType: "Patient",
  id: "example",
  active: true,
  name: [
    { family: "Chalmers", given: ["Peter", "James"] },
    { family: "Smith", given: ["Jane"] },
    { family: "Jones", given: ["Alex"] },
  ],
};

describe("FhirLiquidEngine", () => {
  it("renders FHIRPath output and Liquid filters", () => {
    const engine = new FhirLiquidEngine();

    expect(engine.evaluate(
      "Hello {{ Patient.name.first().given.join(' ') || upcase }}!",
      patient,
    )).toBe("Hello PETER JAMES!");
    expect(engine.evaluate(
      "{{ Patient.name.first().family || prepend: \"Dr. \" }}",
      patient,
    )).toBe("Dr. Chalmers");
  });

  it("selects if, elsif, and else branches", () => {
    const engine = new FhirLiquidEngine();
    const template = "{% if Patient.active = false %}Inactive"
      + "{% elsif Patient.active %}Active"
      + "{% else %}Unknown{% endif %}";

    expect(engine.evaluate(template, patient)).toBe("Active");
    expect(engine.evaluate(template, { ...patient, active: false })).toBe("Inactive");
    expect(engine.evaluate(template, { ...patient, active: undefined })).toBe("Unknown");
  });

  it("supports assignment and captured output", () => {
    const template = "{% assign label = \"Patient\" %}"
      + "{% capture summary %}{{ label }}: {{ Patient.id }}{% endcapture %}"
      + "{{ summary || downcase }}";

    expect(evaluateFhirLiquid(template, patient)).toBe("patient: example");
  });

  it("supports loop variables, metadata, cycle, continue, and break", () => {
    const template = "{% for name in Patient.name %}"
      + "{% if forLoop.index = 2 %}{% continue %}{% endif %}"
      + "{{ forLoop.index }}={{ name.family }}{% cycle \",\", \";\" %}"
      + "{% if forLoop.index = 3 %}{% break %}{% endif %}"
      + "{% endfor %}";

    expect(evaluateFhirLiquid(template, patient)).toBe("1=Chalmers,3=Jones;");
  });

  it("applies loop modifiers and renders the empty branch", () => {
    expect(evaluateFhirLiquid(
      "{% for name in Patient.name reversed offset: 1 limit: 2 %}"
      + "{{ name.family }}{% endfor %}",
      patient,
    )).toBe("Smith");

    expect(evaluateFhirLiquid(
      "{% for telecom in Patient.telecom %}value{% else %}none{% endfor %}",
      patient,
    )).toBe("none");
  });

  it("resolves includes with evaluated parameters", () => {
    const engine = new FhirLiquidEngine({
      includeResolver: name => name === "card"
        ? "<strong>{{ include.value }}</strong>"
        : undefined,
    });

    expect(engine.evaluate(
      "{% include card value=Patient.id %}",
      patient,
    )).toBe("<strong>example</strong>");
  });

  it("renders Markdown filter output", () => {
    expect(evaluateFhirLiquid(
      "{{ '**Important**' || markdownify }}",
      patient,
    )).toContain("<strong>Important</strong>");
  });

  it("rejects invalid templates and multi-value assignments", () => {
    const engine = new FhirLiquidEngine();

    expect(() => engine.parse("{{ Patient.name"))
      .toThrow(FhirLiquidSyntaxError);
    expect(() => engine.evaluate(
      "{% assign names = Patient.name %}",
      patient,
    )).toThrow("returned multiple values");
  });

  it("reports the template location of evaluation failures", () => {
    const engine = new FhirLiquidEngine();

    try {
      engine.evaluate(
        "Patient details:\n{{ Patient.name.unknownFunction() }}",
        patient,
      );
      throw new Error("Expected template evaluation to fail.");
    } catch (error) {
      expect(error).toBeInstanceOf(FhirLiquidEvaluationError);
      expect((error as FhirLiquidEvaluationError).position).toEqual({
        line: 2,
        column: 1,
        length: 2,
      });
    }
  });
});
