(function() {
  "use strict";

  var MetaRegExp = require("../");

  describe("MetaRegExp", function() {
    describe("compile", function() {
    });

    describe("substitute", function() {
      it("should replace sigiled expressions with matching properties", function() {
        expect(MetaRegExp.substitute("%foo %bar", {"foo": "baz"})).toEqual("baz %bar");
      });

      it("should not substitute escaped percent signs", function() {
        expect(MetaRegExp.substitute("%%foo", {"foo": "baz"})).toEqual("%foo");
      });

      it("should correctly replace a closer-to-real-world example", function() {
        expect(MetaRegExp.substitute(
          "^%station %timestamp(?: %annotation)?",
          {
            "station": "([A-Z0-9]{4})",
            "timestamp": "(\d\d)(\d\d)(\d\d)Z",
            "annotation": "(AUTO|COR|CC[A-Z])"
          }
        )).toEqual(
          "^([A-Z0-9]{4}) (\d\d)(\d\d)(\d\d)Z(?: (AUTO|COR|CC[A-Z]))?"
        );
      });
    });
  });
}());
