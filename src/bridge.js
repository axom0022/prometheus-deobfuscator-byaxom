"use strict";

const {
  key: a,
  simple: b
} = require("./base");
const {
  deobfuscate: c
} = require("./flow");
const {
  recover: d,
  identify: e
} = require("./newvm");
const {
  normalize: f
} = require("./name");
function g(a) {
  let b = "";
  let c = 0;
  while (c < a.length) {
    const d = a[c];
    const e = a[c + 1];
    if (d === "-" && e === "-") {
      const d = a["indexOf"]("\n", c + 2);
      const e = d < 0 ? a.length : d;
      b += a.slice(c, e);
      c = e;
      continue;
    }
    if (d === '"' || d === "'") {
      const e = d;
      let f = c + 1;
      while (f < a.length) {
        if (a[f] === "\\") {
          f += 2;
          continue;
        }
        if (a[f] === e) {
          f += 1;
          break;
        }
        f += 1;
      }
      b += a.slice(c, f);
      c = f;
      continue;
    }
    if (d === "[" && e === "[") {
      const d = a["indexOf"]("]]", c + 2);
      const e = d < 0 ? a.length : d + 2;
      b += a.slice(c, e);
      c = e;
      continue;
    }
    if (/[A-Za-z_]/.test(d)) {
      let d = c + 1;
      while (d < a.length && /[A-Za-z0-9_]/.test(a[d])) d += 1;
      const e = a.slice(c, d);
      b += /^p\d+$/.test(e) ? `fp${e.slice(1)}` : e;
      c = d;
      continue;
    }
    b += d;
    c += 1;
  }
  return b;
}
class h {
  constructor() {
    this.cache = new Map();
  }
  ask(h, i) {
    const j = a(h + JSON.stringify(i || {}));
    if (this.cache.has(j)) return Promise.resolve(this.cache.get(j));
    const k = b(h);
    let l = k;
    let m = false;
    try {
      const a = d(h);
      if (a && a.code) {
        l = a.code;
        m = true;
      } else {
        l = c(h, {
          detect: true,
          name: "chunk",
          x: 2e6
        }).code;
        m = true;
      }
    } catch (a) {
      if (k === null || e(h)) {
        try {
          l = c(h, {
            detect: false,
            name: "chunk",
            x: 2e6
          }).code;
          m = true;
        } catch (a) {
          l = h;
        }
      }
    }
    l = f(m ? g(l) : l);
    this.cache.set(j, l);
    return Promise.resolve(l);
  }
  close() {
    this.cache.clear();
  }
}
module.exports = {
  bridge: h,
  roles: g
};
