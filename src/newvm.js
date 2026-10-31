"use strict";

const a = require("./flow");
const b = new Set(["and", "break", "do", "else", "elseif", "end", "false", "for", "function", "goto", "if", "in", "local", "nil", "not", "or", "repeat", "return", "then", "true", "until", "while"]);
class c {
  constructor() {
    this.values = new Map();
    this.array = [];
  }
}
function d(a) {
  if (typeof a === "number" && Object.is(a, -0)) return "-0";
  return `${typeof a}:${String(a)}`;
}
function e(a, b) {
  return a && a.values ? a.values.get(d(b)) : undefined;
}
function f(a, b, c) {
  if (!a || !a.values) return;
  a.values.set(d(b), c);
  if (typeof b === "number" && Number["isInteger"](b) && b > 0) {
    a.array[b - 1] = c;
  }
}
function g(a) {
  return a && a.array ? a.array.filter(a => a !== undefined) : [];
}
function h(a) {
  let b = a;
  while (b && b.kind === "Paren") b = b.expression;
  return b;
}
function i(a, b) {
  const d = h(a);
  if (!d) return {
    ok: false
  };
  switch (d.kind) {
    case "Nil":
      return {
        ok: true,
        value: null
      };
    case "True":
      return {
        ok: true,
        value: true
      };
    case "False":
      return {
        ok: true,
        value: false
      };
    case "Number":
      return {
        ok: true,
        value: d.value
      };
    case "String":
      return {
        ok: true,
        value: d.value
      };
    case "Name":
      return Object.prototype["hasOwnProperty"].call(b || {}, d.name) ? {
        ok: true,
        value: b[d.name]
      } : {
        ok: false
      };
    case "Unary":
      {
        const a = i(d.argument, b);
        if (!a.ok) return {
          ok: false
        };
        if (d.operator === "-") return {
          ok: true,
          value: -a.value
        };
        if (d.operator === "+") return {
          ok: true,
          value: +a.value
        };
        if (d.operator === "not") return {
          ok: true,
          value: !a.value
        };
        if (d.operator === "#") {
          if (a.value && a.value.array) return {
            ok: true,
            value: a.value.array.length
          };
          return {
            ok: false
          };
        }
        return {
          ok: false
        };
      }
    case "Binary":
      {
        const c = i(d.lhs, b);
        const e = i(d.rhs, b);
        if (!c.ok || !e.ok) return {
          ok: false
        };
        const f = c.value;
        const g = e.value;
        try {
          switch (d.operator) {
            case "+":
              return {
                ok: true,
                value: f + g
              };
            case "-":
              return {
                ok: true,
                value: f - g
              };
            case "*":
              return {
                ok: true,
                value: f * g
              };
            case "/":
              return {
                ok: true,
                value: f / g
              };
            case "//":
              return {
                ok: true,
                value: Math.floor(f / g)
              };
            case "%":
              return {
                ok: true,
                value: f % g
              };
            case "^":
              return {
                ok: true,
                value: f ** g
              };
            case "..":
              return {
                ok: true,
                value: String(f) + String(g)
              };
            case "==":
              return {
                ok: true,
                value: f === g
              };
            case "~=":
              return {
                ok: true,
                value: f !== g
              };
            case "<":
              return {
                ok: true,
                value: f < g
              };
            case "<=":
              return {
                ok: true,
                value: f <= g
              };
            case ">":
              return {
                ok: true,
                value: f > g
              };
            case ">=":
              return {
                ok: true,
                value: f >= g
              };
            case "and":
              return {
                ok: true,
                value: f && g
              };
            case "or":
              return {
                ok: true,
                value: f || g
              };
            default:
              return {
                ok: false
              };
          }
        } catch (a) {
          return {
            ok: false
          };
        }
      }
    case "Table":
      {
        const a = new c();
        let e = 1;
        for (const c of d.entries || []) {
          let d;
          if (c.type === "item") d = e++;else {
            const a = i(c.key, b);
            if (!a.ok) return {
              ok: false
            };
            d = a.value;
          }
          const g = i(c.value, b);
          if (!g.ok) return {
            ok: false
          };
          f(a, d, g.value);
        }
        return {
          ok: true,
          value: a
        };
      }
    default:
      return {
        ok: false
      };
  }
}
function j(a, b) {
  if (!a || typeof a !== "object") return;
  if (Array["isArray"](a)) {
    for (const c of a) j(c, b);
    return;
  }
  b(a);
  for (const [c, d] of Object.entries(a)) {
    if (c !== "scope") j(d, b);
  }
}
function k(a, b) {
  return !!a && a.kind === "Name" && a.name === b;
}
function l(a, b) {
  return {
    kind: "Index",
    base: {
      kind: "Name",
      name: a
    },
    index: {
      kind: "Number",
      value: b
    },
    dot: false
  };
}
function m(a) {
  const b = h(a);
  return b && b.kind === "Number" ? b.value : undefined;
}
function n(a) {
  let b = null;
  j(a, a => {
    if (b || a.kind !== "Function" || (a.params || []).length !== 5) return;
    const c = a.body && a.body.statements;
    if (!c || !c.some(a => a.kind === "While")) return;
    const d = c[0];
    if (!d || d.kind !== "LocalDeclaration" || (d.expressions || []).length < 2) return;
    const e = h(d.expressions[0]);
    const f = h(d.expressions[1]);
    if (!e || !f || e.kind !== "Index" || f.kind !== "Index" || !k(e.base, a.params[0]) || !k(f.base, a.params[0])) return;
    b = a;
  });
  if (!b) return null;
  const c = b.body.statements;
  const d = c[0];
  const e = m(d.expressions[0].index);
  const f = m(d.expressions[1].index);
  const g = c.find(a => a.kind === "While");
  const i = g && g.body && g.body.statements;
  if (!i || i.length < 4) return null;
  const l = i[0];
  const n = i[1] && i[1].targets && i[1].targets[0];
  const o = i[2] && i[2].targets && i[2].targets[0];
  const p = i[3];
  if (!l || l.kind !== "Assignment" || !n || n.kind !== "Name" || !o || o.kind !== "Name" || !p || p.kind !== "Assignment" || (p.targets || []).length !== 4) return null;
  const q = (p.expressions || []).map(a => m(a.index));
  if (q.some(a => a === undefined)) return null;
  return {
    function: b,
    params: b.params,
    programcounter: n.name,
    opcode: o.name,
    instruction: l.targets[0] && l.targets[0].name,
    operands: p.targets.map(a => a.name),
    operandslots: q,
    codekey: e,
    constantskey: f,
    whilenode: g
  };
}
function o(a) {
  let b = null;
  j(a, a => {
    if (b || a.kind !== "Call" || (a.args || []).length < 3) return;
    if (!a.args[0] || a.args[0].kind !== "Table") return;
    const c = i(a.args[1], {}).value;
    const d = i(a.args[2], {}).value;
    if (!Number["isFinite"](c) || !Number["isFinite"](d)) return;
    const e = i(a.args[0], {});
    if (!e.ok || !e.value || !e.value.array.length) return;
    const f = e.value.array;
    if (!f.every(a => a && a.array && a.array.every(a => a && a.array && a.array.length >= 3))) return;
    b = {
      node: a,
      shards: e.value,
      count: c,
      root: d
    };
  });
  return b;
}
function p(a) {
  const b = [null];
  for (let d = 1; d <= a.count; d += 1) b[d] = new c();
  for (const c of a.shards.array) {
    for (const a of c.array) {
      const c = e(a, 1);
      const d = e(a, 2);
      let g = e(a, 3);
      if (e(a, 4)) g = b[g];
      if (!b[c]) return null;
      f(b[c], d, g);
    }
  }
  return b[a.root] || null;
}
function q(a) {
  return a instanceof c && typeof e(a, 1) === "number";
}
function r(a, b, d) {
  if (!(a instanceof c)) return null;
  const f = [...a.values.entries()].map(([a, b]) => ({
    encoded: a,
    value: b
  }));
  const g = {};
  g.code = b.codekey;
  g.constants = b.constantskey;
  const h = e(a, g.code);
  if (!(h instanceof c) || !h.array.length || !h.array.every(q)) return null;
  const i = a => a instanceof c && e(a, g.code) instanceof c;
  const j = f.find(a => a.value instanceof c && a.value.array.length > 0 && a.value.array.every(i));
  if (j) g.children = s(j.encoded);
  const k = f.find(a => a.value instanceof c && a.value.array.length > 0 && a.value.array.every(a => {
    const b = e(a, 2);
    return a instanceof c && typeof e(a, 1) === "number" && typeof b === "boolean";
  }));
  if (k) g.params = s(k.encoded);
  const l = f.find(a => a.value instanceof c && a.value.array.length > 0 && a.value.array.every(a => {
    const b = e(a, 1);
    const d = e(a, 2);
    return a instanceof c && (b === 0 || b === 1) && typeof d === "number";
  }));
  if (l) g.captures = s(l.encoded);
  if (g.children !== undefined) {
    const b = e(a, g.children);
    const d = b instanceof c ? b.array.find(Boolean) : null;
    if (d instanceof c) {
      const a = [...d.values.entries()];
      if (g.params === undefined) {
        const b = a.find(([, a]) => a instanceof c && a.array.length > 0 && a.array.every(a => a instanceof c && typeof e(a, 1) === "number" && typeof e(a, 2) === "boolean"));
        if (b) g.params = s(b[0]);
      }
      if (g.captures === undefined) {
        const b = a.find(([, a]) => a instanceof c && a.array.length > 0 && a.array.every(a => a instanceof c && (e(a, 1) === 0 || e(a, 1) === 1) && typeof e(a, 2) === "number"));
        if (b) g.captures = s(b[0]);
      }
    }
  }
  const m = f.filter(a => typeof a.value === "number" && a.encoded !== t(g.code) && a.encoded !== t(g.constants));
  if (m.length) g.maxregister = s(m[0].encoded);
  const n = f.find(a => typeof a.value === "boolean");
  if (n) g.vararg = s(n.encoded);
  if (g.children === undefined) {
    const a = f.find(a => a.value instanceof c && a.value.array.length === 0 && s(a.encoded) !== g.constants && s(a.encoded) !== g.code);
    if (a) g.children = s(a.encoded);
  }
  if (g.params === undefined) {
    const a = f.find(a => a.value instanceof c && a.value.array.length === 0 && s(a.encoded) !== g.code && s(a.encoded) !== g.constants && s(a.encoded) !== g.children);
    if (a) g.params = s(a.encoded);
  }
  if (g.captures === undefined) {
    const a = f.find(a => a.value instanceof c && a.value.array.length === 0 && s(a.encoded) !== g.code && s(a.encoded) !== g.constants && s(a.encoded) !== g.children && s(a.encoded) !== g.params);
    if (a) g.captures = s(a.encoded);
  }
  if ([g.code, g.constants, g.children, g.params, g.captures, g.vararg].some(a => a === undefined)) return null;
  return g;
}
function s(a) {
  const b = /^number:(-?\d+(?:\.\d+)?)$/.exec(a);
  return b ? Number(b[1]) : undefined;
}
function t(a) {
  return d(a);
}
function u(a, b) {
  if (!(a instanceof c)) return null;
  const d = e(a, b.code);
  if (!(d instanceof c)) return null;
  return {
    table: a,
    code: g(d),
    constants: g(e(a, b.constants)),
    children: g(e(a, b.children)).map(a => u(a, b)).filter(Boolean),
    captures: g(e(a, b.captures)),
    params: g(e(a, b.params)),
    vararg: e(a, b.vararg) === true,
    maxregister: e(a, b.maxregister) || 0
  };
}
function v(a, b, c) {
  const d = h(a);
  return !!d && d.kind === "Index" && k(d.base, b) && (!c || k(d.index, c));
}
function w(a, b, c) {
  if (!a || a.kind !== "Assignment") return false;
  if ((a.targets || []).length !== 1 || (a.expressions || []).length !== 1) return false;
  return b(a.targets[0]) && c(a.expressions[0]);
}
function x(a, b) {
  return (a || []).some(a => a.kind === "Assignment" && b(a));
}
function y(a) {
  const b = [];
  function c(d) {
    if (!d || typeof d !== "object") return;
    if (Array["isArray"](d)) {
      d["forEach"](c);
      return;
    }
    if (d.kind === "If" && d.condition && d.condition.kind === "Binary" && d.condition.operator === "==" && k(d.condition.lhs, a.opcode) && d.condition.rhs && d.condition.rhs.kind === "Number") {
      b.push({
        id: d.condition.rhs.value,
        statements: d.body && d.body.statements || []
      });
      return;
    }
    for (const [a, b] of Object.entries(d)) if (a !== "scope") c(b);
  }
  c(a.whilenode);
  return b;
}
function z(a, b) {
  const [c, d, e, f] = b.operands;
  const g = b.params[3];
  const h = b.params[1];
  const i = b.params[2];
  const l = b.params[4];
  const n = b.temporaryvariable || "V";
  const o = b.constantsname;
  const p = b.programcounter;
  const q = (a, b) => v(a, g, b);
  const r = (a, b) => v(a, h, b);
  const s = (a, b) => v(a, i, b);
  const t = (a, c) => v(a, b.constantvariable, c);
  const u = a || [];
  const y = u.find(a => a.kind === "Assignment");
  const z = y && y.expressions && y.expressions[0];
  if (u.some(a => a.kind === "Return" && (a.expressions || []).length === 0)) return "RETURN0";
  if (x(u, a => a.targets.length === 1 && k(a.targets[0], p) && k(a.expressions[0], c))) return "JMP";
  if (w(y, a => q(a, c), a => a && a.kind === "Nil")) return "NIL";
  if (w(y, a => q(a, c), a => k(a, l))) return "VARARG";
  if (w(y, a => q(a, c), a => a && a.kind === "Table" && a.entries.length === 0)) return "TABLE";
  if (x(u, a => a.targets.length === 1 && q(a.targets[0], c) && a.expressions[0] && a.expressions[0].kind === "Table" && a.expressions[0].entries.length === 1 && k(a.expressions[0].entries[0].value, n))) return "CELL";
  if (w(y, a => q(a, c), a => t(a, d))) return "LOAD";
  if (w(y, a => q(a, c), a => a && a.kind === "Index" && k(a.base, i) && t(a.index, d))) return "GLOBAL";
  if (w(y, a => q(a, c), a => q(a, d))) return "MOVE";
  if (w(y, a => q(a, c), a => a && a.kind === "Unary" && q(a.argument, d))) {
    if (z.operator === "not") return "NOT";
    if (z.operator === "-") return "NEG";
    if (z.operator === "#") return "LEN";
  }
  if (w(y, a => q(a, c), a => a && a.kind === "Binary" && q(a.lhs, d) && q(a.rhs, e))) {
    return {
      "+": "ADD",
      "-": "SUB",
      "*": "MUL",
      "/": "DIV",
      "%": "MOD",
      "^": "POW",
      "..": "CONCAT",
      "<": "LT",
      "<=": "LE",
      ">": "GT",
      ">=": "GE",
      "==": "EQ",
      "~=": "NE"
    }[z.operator] || null;
  }
  if (w(y, a => q(a, c), a => a && a.kind === "Index" && v(a.base, g, d) && m(a.index) === 1)) return "GETCELL";
  if (w(y, a => q(a, c), a => a && a.kind === "Index" && v(a.base, h, d) && m(a.index) === 1)) return "GETUP";
  if (w(y, a => q(a, c), a => a && a.kind === "Index" && v(a.base, g, d) && v(a.index, g, e))) return "GETTABLE";
  if (w(y, a => q(a, c), a => a && a.kind === "Index" && v(a.base, g, d) && m(a.index) === undefined && k(a.index, e))) return "TAKE";
  if (x(u, a => a.targets.length === 1 && a.targets[0].kind === "Index" && v(a.targets[0].base, h, c) && m(a.targets[0].index) === 1 && a.expressions.length === 1 && q(a.expressions[0], d))) return "SETUP";
  if (x(u, a => a.targets.length === 1 && a.targets[0].kind === "Index" && v(a.targets[0].base, g, c) && m(a.targets[0].index) === 1 && q(a.expressions[0], d))) return "SETCELL";
  if (x(u, a => a.targets.length === 1 && a.targets[0].kind === "Index" && v(a.targets[0].base, g, c) && v(a.targets[0].index, g, d) && q(a.expressions[0], e))) return "SETTABLE";
  if (x(u, a => a.targets.length === 1 && a.targets[0].kind === "Index" && k(a.targets[0].base, i) && a.targets[0].index && t(a.targets[0].index, c) && q(a.expressions[0], d))) return "SETGLOBAL";
  let aa = false;
  j({
    kind: "Block",
    statements: u
  }, a => {
    if (a.kind === "Index" && k(a.base, b.params[0])) aa = true;
  });
  if (x(u, a => a.targets.length === 1 && q(a.targets[0], c) && a.expressions[0] && a.expressions[0].kind === "Call" && u.some(a => a.kind === "NumericFor") && aa)) return "CLOSURE";
  if (u.some(a => a.kind === "NumericFor" && a.body && a.body.statements && a.body.statements.some(a => a.kind === "Assignment" && a.targets && a.targets[0] && v(a.targets[0], g) && a.targets[0].index && a.targets[0].index.kind === "Index" && k(a.targets[0].index.base, c)))) return "CLEARS";
  if (u.some(a => a.kind === "GenericFor")) return "ARGS";
  if (u.some(a => a.kind === "NumericFor" && u.some(a => a.kind === "Assignment" && k(a.targets[0], n)))) return "EXPAND";
  if (u.some(a => a.kind === "If" && a.condition && a.condition.kind === "Binary" && a.condition.operator === "~=" && v(a.condition.lhs, g, f))) return "FORCHECK";
  if (u.some(a => a.kind === "CallStatement" && a.expression && a.expression.kind === "Call" && k(a.expression.base, b.errorvariable))) return "FORPREP";
  const ab = u.filter(a => a.kind === "Return");
  if (ab.length) {
    const a = ab[ab.length - 1];
    if ((a.expressions || []).length === 1 && v(a.expressions[0], g, c)) return "RETURN1";
    if ((a.expressions || []).length === 2 && a.expressions.every((a, b) => v(a, g, b ? d : c))) return "RETURN2";
    if ((a.expressions || []).length === 3 && a.expressions.every((a, b) => v(a, g, [c, d, e][b]))) return "RETURN3";
    if ((a.expressions || []).some(a => a.kind === "Call")) {
      const b = a.expressions.find(a => a.kind === "Call");
      const c = b && b.args && b.args.length === 3 && b.args[1].kind === "Number" && b.args[1].value === 1 && b.args[2].kind === "Index";
      if (c) return "RETURN";
      if (b && b.args && b.args.length === 1 && b.args[0].kind === "Call") return "TAILCALL";
      const d = b ? b.args.length : 0;
      return `TAILCALL${Math.min(3, d)}`;
    }
  }
  const ac = [];
  j({
    kind: "Block",
    statements: u
  }, a => {
    if (a.kind !== "Call" || !a.base || a.base.kind !== "Name") return;
    const c = a.base.name;
    const d = u.some(a => a.kind === "Assignment" && (a.targets || []).some(a => k(a, c)) && (a.expressions || []).some(a => a.kind === "Index" && k(a.base, g)));
    if (d || c === b.callvariable) ac.push(a);
  });
  if (ac.length) {
    const a = ac[ac.length - 1];
    const b = a.args.length === 1 && a.args[0].kind === "Call";
    if (b) return u.some(a => a.kind === "Return") ? "TAILCALL" : "CALL";
    const c = Math.min(3, a.args.length);
    return u.some(a => a.kind === "Return") ? `TAILCALL${c}` : `CALL${c}`;
  }
  if (u.some(a => a.kind === "If" && a.condition && a.condition.kind === "Unary" && a.condition.operator === "not")) return "JFALSE";
  if (u.some(a => a.kind === "If" && a.condition && a.condition.kind === "Name" && a.condition.name === b.temporaryvariable)) return "JTRUE";
  return null;
}
function aa(a) {
  const b = a.function.body.statements;
  const c = a.whilenode;
  const d = a.operands;
  const e = new Set([a.instruction, a.opcode, ...d]);
  const f = b.find(b => b.kind === "LocalDeclaration" && (b.names || []).includes(a.instruction));
  const g = f && f.names.find(a => !e.has(a));
  const h = {
    constantvariable: b[0].names[1],
    makevariable: null,
    callvariable: null,
    errorvariable: null,
    temporaryvariable: g || null
  };
  j(a.whilenode, a => {
    if (a.kind !== "Call" || !a.base || a.base.kind !== "Name") return;
    if (a.base.name === "make") h.makevariable = a.base.name;
  });
  const i = a.function;
  j(i, a => {
    if (a.kind !== "Call") return;
    if (a.base && a.base.kind === "Name" && a.base.name !== h.constantvariable) {}
  });
  return h;
}
function ab(a, b) {
  const c = aa(b);
  const d = b.whilenode.body.statements;
  const e = d[3] && d[3].targets ? d[3].targets.map(a => a.name) : [];
  const f = d.find(a => a.kind === "LocalDeclaration" && a.names && a.names.some(a => a !== b.instruction));
  const g = new Set(e);
  for (const a of f && f.names || []) g.add(a);
  let h = null;
  let i = null;
  let k = null;
  j(b.whilenode, a => {
    if (a.kind === "Call" && a.base && a.base.kind === "Name") {
      if (a.base.name === "make") i = a.base.name;
      if (a.base.name === "u" || a.base.name === "error") k = a.base.name;
    }
  });
  j(b.whilenode, a => {
    if (a.kind !== "Call" || !a.base || a.base.kind !== "Name") return;
    const c = a.base.name;
    const d = null;
    if (c !== b.opcode && c !== b.instruction && c !== b.programcounter && c !== b.params[0] && c !== b.params[1] && c !== b.params[2] && c !== b.params[3] && c !== b.params[4]) h = c;
    void d;
  });
  const l = {
    ...b,
    ...c,
    callvariable: h,
    makevariable: i,
    errorvariable: k,
    temporaryvariable: c.temporaryvariable
  };
  const m = new Map();
  for (const a of y(b)) {
    const b = z(a.statements, l);
    if (b) m.set(a.id, b);
  }
  return {
    map: m,
    info: l
  };
}
function ac(a) {
  return `"${String(a).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\0/g, "\\0")}` + '"';
}
function ad(a) {
  if (a === null || a === undefined) return "nil";
  if (a === true) return "true";
  if (a === false) return "false";
  if (typeof a === "string") return ac(a);
  if (typeof a === "number") {
    if (Number["isNaN"](a)) return "0/0";
    if (a === Infinity) return "math.huge";
    if (a === -Infinity) return "-math.huge";
    return Object.is(a, -0) ? "-0" : String(a);
  }
  return "nil";
}
function ae(a) {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(a) && !b.has(a);
}
function af(a) {
  if (typeof a === "string" && ae(a)) return a;
  return `_ENV[${ad(a)}]`;
}
function ag(a) {
  return `v${a}`;
}
function ah(a) {
  if (!(a instanceof c)) return [];
  return a.array.filter(a => typeof a === "number");
}
function ai(a) {
  const {
    root: b,
    fields: c,
    opcodemap: d
  } = a;
  const f = new Set();
  function g(b, c, h) {
    if (!b || f.has(b)) return null;
    f.add(b);
    const i = Math.max(b.maxregister || 0, ...b.code.map(a => {
      const b = e(a, 1);
      return Math.max(0, ...[2, 3, 4, 5].map(b => Number(e(a, b)) || 0));
    }));
    const j = [];
    for (let a = 1; a <= i; a += 1) j.push(ag(a));
    const k = [];
    const l = a => a ? ag(a) : "nil";
    const m = b.captures.map((a, b) => {
      const d = e(a, 1);
      const f = e(a, 2);
      let g = "nil";
      let h = false;
      if (d === 0) {
        g = c && c.parentregisters && c.parentregisters[f] ? c.parentregisters[f] : l(f);
        h = !!(c && c.parentcells && c.parentcells.has(f));
      } else if (d === 1 && c && c.upvalues && c.upvalues[f]) {
        g = c.upvalues[f].expression;
        h = c.upvalues[f].cell;
      }
      return {
        expression: `up${b + 1}`,
        source: g,
        cell: h
      };
    });
    if (!h) {
      for (const a of m) k.push(`local ${a.expression} = ${a.source}`);
    }
    if (j.length) k.push(`local ${j.join(", ")}`);
    if (!h) {
      const a = b.params.map((a, b) => ({
        register: e(a, 1),
        captured: e(a, 2) === true
      }));
      const c = a.map((a, b) => `p${b + 1}`);
      for (const [b, d] of a.entries()) {
        if (d.captured) k.push(`${ag(d.register)} = { ${c[b]} }`);else k.push(`${ag(d.register)} = ${c[b]}`);
      }
      if (b.vararg) k.push("local varargs = { ... }");
    }
    const n = a => b.constants[(Number(a) || 1) - 1];
    const o = b.children;
    const p = a => {
      const b = m[(Number(a) || 1) - 1];
      if (!b) return "nil";
      return b.cell ? `${b.expression}[1]` : b.expression;
    };
    const q = a => ah(a).map(l);
    const r = (a, b) => `${a}(${b.join(", ")})`;
    const s = new Set(b.params.filter(a => e(a, 2) === true).map(a => e(a, 1)));
    const t = new Set(["JMP", "JFALSE", "JTRUE", "FORCHECK", "FORPREP", "CLOSURE?"]);
    for (const c of b.code) {
      const b = e(c, 1);
      const f = d.get(b);
      const h = e(c, a.slots[0]);
      const j = e(c, a.slots[1]);
      const u = e(c, a.slots[2]);
      const v = e(c, a.slots[3]);
      if (!f || t.has(f)) return null;
      const w = l(h);
      const x = l(j);
      const y = l(u);
      let z = false;
      switch (f) {
        case "NIL":
        case "CLEAR":
          k.push(`${w} = nil`);
          break;
        case "LOAD":
          k.push(`${w} = ${ad(n(j))}`);
          break;
        case "MOVE":
          k.push(`${w} = ${x}`);
          break;
        case "GLOBAL":
          k.push(`${w} = ${af(n(j))}`);
          break;
        case "SETGLOBAL":
          k.push(`${af(n(h))} = ${x}`);
          break;
        case "VARARG":
          k.push(`${w} = varargs`);
          break;
        case "TABLE":
          k.push(`${w} = {}`);
          break;
        case "CELL":
          s.add(h);
          k.push(`${w} = { ${x} }`);
          break;
        case "GETCELL":
          k.push(`${w} = ${x}[1]`);
          break;
        case "SETCELL":
          k.push(`${w}[1] = ${x}`);
          break;
        case "GETUP":
          k.push(`${w} = ${p(j)}`);
          break;
        case "SETUP":
          {
            const a = m[(Number(h) || 1) - 1];
            k.push(`${a ? a.expression : "nil"}[1] = ${x}`);
            break;
          }
        case "GETTABLE":
          k.push(`${w} = ${x}[${y}]`);
          break;
        case "TAKE":
          k.push(`${w} = ${x}[${ad(u)}]`);
          break;
        case "SETTABLE":
          k.push(`${w}[${x}] = ${y}`);
          break;
        case "ADD":
        case "SUB":
        case "MUL":
        case "DIV":
        case "MOD":
        case "POW":
        case "CONCAT":
        case "LT":
        case "LE":
        case "GT":
        case "GE":
        case "EQ":
        case "NE":
          const a = {
            "ADD": "+",
            "SUB": "-",
            "MUL": "*",
            "DIV": "/",
            "MOD": "%",
            "POW": "^",
            "CONCAT": "..",
            "LT": "<",
            "LE": "<=",
            "GT": ">",
            "GE": ">=",
            "EQ": "==",
            "NE": "~="
          }[f];
          k.push(`${w} = ${x} ${a} ${y}`);
          break;
        case "NOT":
          k.push(`${w} = not ${x}`);
          break;
        case "NEG":
          k.push(`${w} = -${x}`);
          break;
        case "LEN":
          k.push(`${w} = #${x}`);
          break;
        case "CLOSURE":
          {
            const a = o[(Number(j) || 1) - 1];
            const b = {};
            for (let a = 1; a <= i; a += 1) b[a] = l(a);
            const c = g(a, {
              upvalues: m,
              parentregisters: b,
              parentcells: s
            }, false);
            if (!c) return null;
            const d = a.params.map((a, b) => `p${b + 1}`);
            const e = c.split("\n").map(a => `  ${a}`).join("\n");
            k.push(`${w} = function(${d.join(", ")})\n${e}\nend`);
            break;
          }
        case "ARGS":
          {
            const a = q(j);
            const b = Number(u) || 0;
            if (b) k.push(`${w} = { ${a.join(", ")}${a.length ? ", " : ""}unpack(${l(b)}) }`);else k.push(`${w} = { ${a.join(", ")} }`);
            break;
          }
        case "EXPAND":
          k.push(`for i = 1, #${y} do ${w}[${x} + i - 1] = ${y}[i] end`);
          break;
        case "CLEARS":
          {
            const a = ah(h);
            for (const b of a) k.push(`${l(b)} = nil`);
            break;
          }
        case "CALL":
        case "CALL0":
        case "CALL1":
        case "CALL2":
        case "CALL3":
          {
            const a = f === "CALL" ? `${x}(unpack(${y}))` : r(x, q(u));
            if (Number(v) === 0 || f === "CALL0") k.push(a);else if (Number(v) < 0) k.push(`${w} = { ${a} }`);else k.push(`${w} = ${a}`);
            break;
          }
        case "TAILCALL":
          {
            k.push(`return ${w}(unpack(${x}))`);
            z = true;
            break;
          }
        case "TAILCALL0":
        case "TAILCALL1":
        case "TAILCALL2":
        case "TAILCALL3":
          k.push(`return ${r(w, q(j))}`);
          z = true;
          break;
        case "RETURN":
          k.push(`return unpack(${w})`);
          z = true;
          break;
        case "RETURN0":
          k.push("return");
          z = true;
          break;
        case "RETURN1":
          k.push(`return ${w}`);
          z = true;
          break;
        case "RETURN2":
          k.push(`return ${w}, ${x}`);
          z = true;
          break;
        case "RETURN3":
          k.push(`return ${w}, ${x}, ${y}`);
          z = true;
          break;
        default:
          return null;
      }
      if (z) break;
    }
    return k.join("\n");
  }
  const h = g(b, {
    upvalues: []
  }, true);
  return h;
}
function aj(b) {
  if (typeof b !== "string" || b.length < 200) return null;
  let d;
  try {
    d = a.parse(b, {
      name: "new-prometheus-vm"
    });
  } catch (a) {
    return null;
  }
  const f = n(d);
  if (!f) return null;
  const g = o(d);
  if (!g) return null;
  const h = p(g);
  if (!h) return null;
  const i = e(h, 1);
  if (!(i instanceof c)) return null;
  const j = r(i, f, d);
  if (!j) return null;
  const k = u(i, j);
  if (!k || !k.code.length) return null;
  const l = ab(d, {
    ...f,
    slots: f.operandslots
  });
  if (!l.map.size) return null;
  const m = {
    root: k,
    fields: j,
    opcodemap: l.map,
    info: l.info,
    slots: f.operandslots
  };
  const q = ai(m);
  if (!q) return null;
  return {
    code: q,
    notes: ["new-vm: rebuilt scattered VM data and lowered the unflattened VM program"],
    kind: "new-prometheus-vm"
  };
}
function ak(a) {
  if (typeof a !== "string") return false;
  const b = /local\s+function\s+[A-Za-z_]\w*\s*\([^)]*\)\s*local\s+\w+\s*=\s*\{\s*\}/.test(a) && /for\s+\w+\s*=\s*1\s*,\s*#?\w+/.test(a) && /unknown VM opcode/.test(a);
  const c = /getfenv/.test(a) && /setfenv/.test(a) && /newproxy/.test(a) && /tonumber/.test(a) && /ipairs/.test(a) && /return\s*\(\s*function/.test(a);
  const d = /getfenv/.test(a) && /setfenv/.test(a) && /return\s*\(\s*function/.test(a) && /local\s+\w+\s*=\s*\{[^\n]{0,240}__len[^\n]{0,240}__index/.test(a);
  return b || c || d;
}
module.exports = {
  recover: aj,
  identify: ak
};
