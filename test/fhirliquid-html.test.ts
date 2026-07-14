import { isHtmlOutput } from "../helpers/fhirliquid_html";

describe("isHtmlOutput", () => {
  it("recognizes HTML documents and fragments", () => {
    expect(isHtmlOutput("<!doctype html><html><body>Content</body></html>")).toBe(true);
    expect(isHtmlOutput("<div xmlns=\"http://www.w3.org/1999/xhtml\"><p>Content</p></div>"))
      .toBe(true);
  });

  it("does not treat plain text or FHIR XML as HTML", () => {
    expect(isHtmlOutput("Rendered text only")).toBe(false);
    expect(isHtmlOutput("<Patient xmlns=\"http://hl7.org/fhir\"><id value=\"example\"/></Patient>"))
      .toBe(false);
  });
});
