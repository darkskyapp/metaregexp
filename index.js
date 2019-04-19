"use strict";

function substitute(str, opts) {
  return str.replace(/%(?:%|\w+)/g, str => {
    if(str === "%%") {
      return "%";
    }

    const name = str.slice(1);
    if(!(name in opts)) {
      return str;
    }

    return substitute(opts[name], opts);
  });
}

function compile(str, flags, opts) {
  if(opts === undefined) {
    opts = flags;
    flags = undefined;
  }

  return new RegExp(substitute(str, opts), flags);
}

exports.substitute = substitute;
exports.compile = compile;
