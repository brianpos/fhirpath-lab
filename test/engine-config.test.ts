/**
 * Tests for the layered engine configuration merge logic
 * (applyEngineOverrides) and the earlyAdopter visibility flag.
 *
 * applyEngineOverrides is a pure function: it takes a baseline record + config
 * and returns a new merged record without mutating the baseline.
 */
import { describe, expect, test } from "@jest/globals";
import { registeredEngines, applyEngineOverrides, type IFhirPathEngineDetails } from "../types/fhirpath_test_engine";

// Use the compiled baseline directly — it's never mutated
const baseline = registeredEngines;

describe("applyEngineOverrides", () => {
  test("returns a copy of the baseline when config has no engines or enabledEngines", () => {
    const result = applyEngineOverrides(baseline, { dotnet_server_r4b: "https://example.com" });
    expect(Object.keys(result)).toEqual(Object.keys(baseline));
    // Verify it's a new object, not the same reference
    expect(result).not.toBe(baseline);
  });

  test("does not mutate the baseline", () => {
    const originalDesc = baseline["fhirpath.js"].description;
    const result = applyEngineOverrides(baseline, {
      engines: { "fhirpath.js": { description: "Patched!" } },
    });
    expect(result["fhirpath.js"].description).toBe("Patched!");
    expect(baseline["fhirpath.js"].description).toBe(originalDesc);
  });

  test("overrides fields on an existing engine", () => {
    const result = applyEngineOverrides(baseline, {
      engines: {
        "fhirpath.js": {
          description: "Patched!",
          earlyAdopter: true,
        },
      },
    });
    expect(result["fhirpath.js"].description).toBe("Patched!");
    expect(result["fhirpath.js"].earlyAdopter).toBe(true);
    // Un-specified fields remain unchanged
    expect(result["fhirpath.js"].name).toBe("fhirpath.js");
    expect(result["fhirpath.js"].supportsAST).toBe(true);
  });

  test("adds a new engine when all required fields are provided", () => {
    const result = applyEngineOverrides(baseline, {
      engines: {
        "Custom (R4)": {
          name: "Custom",
          legacyName: "Custom (R4)",
          fhirVersion: "R4",
          appInsightsEngineName: "Custom",
          publisher: "Test Publisher",
          description: "A custom engine",
          supportsAST: false,
          external: true,
          configSetting: "custom_r4",
        },
      },
      custom_r4: "https://custom.example.com/$fhirpath",
    });
    expect(result["Custom (R4)"]).toBeDefined();
    expect(result["Custom (R4)"].name).toBe("Custom");
    expect(result["Custom (R4)"].configSetting).toBe("custom_r4");
    // Baseline is unaffected
    expect(baseline["Custom (R4)"]).toBeUndefined();
  });

  test("skips a new engine that is missing required fields", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const result = applyEngineOverrides(baseline, {
      engines: {
        "Incomplete Engine": {
          name: "Incomplete",
        },
      },
    });
    expect(result["Incomplete Engine"]).toBeUndefined();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test("new engines from config are appended after baseline engines", () => {
    const result = applyEngineOverrides(baseline, {
      engines: {
        "Custom (R4)": {
          name: "Custom",
          legacyName: "Custom (R4)",
          fhirVersion: "R4",
          appInsightsEngineName: "Custom",
          publisher: "Test",
          description: "A custom engine",
          supportsAST: false,
        },
      },
    });
    const keys = Object.keys(result);
    const baselineKeys = Object.keys(baseline);
    // All baseline keys appear first, in their original order
    expect(keys.slice(0, baselineKeys.length)).toEqual(baselineKeys);
    // New engine is appended at the end
    expect(keys[keys.length - 1]).toBe("Custom (R4)");
  });

  test("enabledEngines filters the result and preserves array order", () => {
    const result = applyEngineOverrides(baseline, {
      enabledEngines: [".NET SDK", "fhirpath.js"],
    });
    // Order must match the enabledEngines array, not insertion order
    expect(Object.keys(result)).toEqual([".NET SDK", "fhirpath.js"]);
    // Baseline still has all engines
    expect(Object.keys(baseline).length).toBeGreaterThan(2);
  });

  test("enabledEngines warns and skips unknown keys", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const result = applyEngineOverrides(baseline, {
      enabledEngines: ["fhirpath.js", "nonexistent-engine"],
    });
    expect(Object.keys(result)).toEqual(["fhirpath.js"]);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("nonexistent-engine"));
    warnSpy.mockRestore();
  });

  test("engines + enabledEngines: result order follows enabledEngines array", () => {
    const result = applyEngineOverrides(baseline, {
      engines: {
        "Brand New (R4)": {
          name: "BrandNew",
          legacyName: "Brand New (R4)",
          fhirVersion: "R4",
          appInsightsEngineName: "BrandNew",
          publisher: "Test",
          description: "Brand new engine",
          supportsAST: true,
        },
      },
      enabledEngines: ["Brand New (R4)", "fhirpath.js"],
    });
    // Order follows enabledEngines, not registration order
    expect(Object.keys(result)).toEqual(["Brand New (R4)", "fhirpath.js"]);
    expect(result["Brand New (R4)"].name).toBe("BrandNew");
  });
});

describe("earlyAdopter flag", () => {
  test("earlyAdopter is undefined by default for existing engines", () => {
    expect(baseline["fhirpath.js"].earlyAdopter).toBeUndefined();
    expect(baseline[".NET SDK"].earlyAdopter).toBeUndefined();
  });

  test("earlyAdopter can be set via config override", () => {
    const result = applyEngineOverrides(baseline, {
      engines: {
        ".NET SDK": { earlyAdopter: true },
      },
    });
    expect(result[".NET SDK"].earlyAdopter).toBe(true);
    // Other engines unchanged
    expect(result["fhirpath.js"].earlyAdopter).toBeUndefined();
    // Baseline unchanged
    expect(baseline[".NET SDK"].earlyAdopter).toBeUndefined();
  });

  test("earlyAdopter filtering logic works correctly", () => {
    const engines = applyEngineOverrides(baseline, {
      engines: {
        "fhirpath.js": { earlyAdopter: true },
      },
    });

    const showAdvanced = false;
    const filtered = Object.values(engines)
      .filter(e => e.fhirVersion === "R4" && (!e.earlyAdopter || showAdvanced));

    // fhirpath.js (R4) should be excluded because earlyAdopter=true and advanced=false
    expect(filtered.find(e => e.legacyName === "fhirpath.js")).toBeUndefined();
    // .NET SDK (R4) should be included because earlyAdopter is not set
    expect(filtered.find(e => e.legacyName === ".NET (firely)")).toBeDefined();

    // With showAdvanced=true, earlyAdopter engines should appear
    const filteredAdv = Object.values(engines)
      .filter(e => e.fhirVersion === "R4" && (!e.earlyAdopter || true));
    expect(filteredAdv.find(e => e.legacyName === "fhirpath.js")).toBeDefined();
  });
});
