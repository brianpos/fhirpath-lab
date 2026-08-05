import fhirpath from "fhirpath";
import r6Model from "../models/r6";

describe("R6 FHIRPath runtime model", () => {
    test("evaluates ballot5 properties with their declared type", () => {
        const account = {
            resourceType: "Account",
            guarantor: [{rank: 2}],
        };

        expect(fhirpath.evaluate(account, "guarantor.rank.type().name", {}, r6Model))
            .toEqual(["positiveInt"]);
        expect(fhirpath.evaluate(account, "guarantor.rank is positiveInt", {}, r6Model))
            .toEqual([true]);
    });
});
