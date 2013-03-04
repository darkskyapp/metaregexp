var MetaRegExp;

(function() {
  "use strict";

  MetaRegExp = {
    compile: function(str, flags, opts) {
      if(opts === undefined) {
        opts  = flags;
        flags = undefined;
      }

      return new RegExp(MetaRegExp.substitute(str, opts), flags);
    },
    substitute: function(str, opts) {
      return str.replace(/%(?:%|\w+)/g, function(str) {
        if(str === "%%")
          return "%";

        var name = str.slice(1);

        return opts.hasOwnProperty(name) ?
          MetaRegExp.substitute(opts[name], opts) :
          str;
      });
    }
  };

  if(typeof module !== "undefined")
    module.exports = MetaRegExp;
}());
