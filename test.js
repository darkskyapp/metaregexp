"use strict";
const expect = require("chai").expect;
const MetaRegExp = require("./");

describe("MetaRegExp", () => {
  describe("substitute", () => {
    it("should replace sigiled expressions with matching properties", () => {
      expect(MetaRegExp.substitute("%foo %bar", {"foo": "baz"})).to.equal("baz %bar");
    });

    it("should not substitute escaped percent signs", () => {
      expect(MetaRegExp.substitute("%%foo", {"foo": "baz"})).to.equal("%foo");
    });

    it("should correctly replace a closer-to-real-world example", () => {
      expect(MetaRegExp.substitute(
        "^%station %timestamp(?: %annotation)?",
        {
          "station": "([A-Z0-9]{4})",
          "timestamp": "(\\d\\d)(\\d\\d)(\\d\\d)Z",
          "annotation": "(AUTO|COR|CC[A-Z])",
        }
      )).to.equal(
        "^([A-Z0-9]{4}) (\\d\\d)(\\d\\d)(\\d\\d)Z(?: (AUTO|COR|CC[A-Z]))?"
      );
    });
  });

  describe("compile", () => {
    it("should compile a regex for use", () => {
      const regex = MetaRegExp.compile("^%year-%month-%day", {
        "year": "%digit{4}",
        "month": "%digit{2}",
        "day": "%digit{2}",
        "digit": "[0-9]",
      });

      expect(regex).to.be.an.instanceof(RegExp);
      expect(regex.test("hello world")).to.be.false;
      expect(regex.test("2012-04-17")).to.be.true;
    });

    it("should allow one to pass along flags", () => {
      const regex = MetaRegExp.compile("^%uppercase%letter*$", "gu", {
        "uppercase": "\\p{Lu}",
        "letter": "\\p{L}",
      });

      expect(regex).to.be.an.instanceof(RegExp);
      expect(regex.test("hello")).to.be.false;
      expect(regex.test("Æsop")).to.be.true;
    });
  });
});
