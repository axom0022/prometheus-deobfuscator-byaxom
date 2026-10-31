"use strict";

var a = (a, b) => () => {
  try {
    return b || a((b = {
      exports: {}
    }).exports, b), b.exports;
  } catch (a) {
    throw b = 0, a;
  }
};
var b = a((a, b) => {
  "use strict";

  var c = {
      "Eof": "Eof",
      "Name": "Name",
      "Keyword": "Keyword",
      "Number": "Number",
      "String": "String",
      "Symbol": "Symbol"
    },
    d = new Set(["and", "break", "do", "else", "elseif", "end", "false", "for", "function", "goto", "if", "in", "local", "nil", "not", "or", "repeat", "return", "then", "true", "until", "while", "continue"]),
    e = ["...", "..=", "==", "~=", "<=", ">=", "..", "::", "->", "//", "<<", ">>", "+=", "-=", "*=", "/=", "%=", "^=", "+", "-", "*", "/", "%", "^", "#", "=", "<", ">", "(", ")", "{", "}", "[", "]", ";", ":", ",", ".", "?", "|", "&", "~"];
  b.exports = {
    "TokenKind": c,
    "KEYWORDS": d,
    "SYMBOLS": e
  };
});
var c = a((a, b) => {
  "use strict";

  var c = a => a >= "0" && a <= "9",
    d = a => a >= "0" && a <= "9" || a >= "a" && a <= "f" || a >= "A" && a <= "F",
    e = a => a >= "a" && a <= "z",
    f = a => a >= "A" && a <= "Z",
    g = a => e(a) || f(a) || a === "_",
    h = a => g(a) || c(a),
    i = a => a === " " || a === "\t" || a === "\r" || a === `\n` || a === "\v" || a === "\f",
    j = a => a === `\n` || a === "\r",
    k = {
      a: "",
      b: "\b",
      f: "\f",
      n: `\n`,
      r: "\r",
      t: "\t",
      v: "\v",
      "\\": "\\",
      '"': '"',
      "'": "'"
    };
  function l(a) {
    let b = a.slice(2),
      c = b.search(/[pP]/),
      d = c === -1 ? b : b.slice(0, c),
      e = c === -1 ? void 0 : b.slice(c + 1),
      f = d["indexOf"]("."),
      g = f === -1 ? d : d.slice(0, f),
      h = f === -1 ? "" : d.slice(f + 1),
      i = g ? parseInt(g, 16) : 0;
    for (let a = 0; a < h.length; a += 1) i += parseInt(h[a], 16) / 16 ** (a + 1);
    return e !== void 0 && e !== "" && (i *= 2 ** Number(e)), i;
  }
  function m(a) {
    return a < 128 ? String["fromCharCode"](a) : a < 2048 ? String["fromCharCode"](192 | a >> 6, 128 | a & 63) : a < 65536 ? String["fromCharCode"](224 | a >> 12, 128 | a >> 6 & 63, 128 | a & 63) : String["fromCharCode"](240 | a >> 18, 128 | a >> 12 & 63, 128 | a >> 6 & 63, 128 | a & 63);
  }
  b.exports = {
    m: c,
    "Me": d,
    bt: e,
    mt: f,
    wt: g,
    yt: h,
    hn: i,
    "A": j,
    "ESCAPES": k,
    vt: l,
    "utf8Encode": m
  };
});
var d = a((a, d) => {
  "use strict";

  var {
      "TokenKind": e,
      "KEYWORDS": f,
      "SYMBOLS": g
    } = b(),
    h = c(),
    i = class extends Error {
      constructor(a, b, c) {
        super(`${a} (line ${b}, col ${c})`), this.name = "LuaSyntaxError", this.line = b, this.column = c;
      }
    },
    j = class {
      constructor(a) {
        this.src = a, this.len = a.length, this.pos = 0, this.line = 1, this.$e = 0;
      }
      error(a) {
        throw new i(a, this.line, this.pos - this.$e + 1);
      }
      peek(a = 0) {
        let b = this.pos + a;
        return b < this.len ? this.src[b] : "";
      }
      newline() {
        let a = this.src[this.pos];
        this.pos += 1;
        let b = this.src[this.pos];
        (b === `\n` || b === "\r") && b !== a && (this.pos += 1), this.line += 1, this.$e = this.pos;
      }
      xt() {
        for (;;) {
          let a = this.peek();
          if (a === "") return;
          if (h["A"](a)) {
            this.newline();
            continue;
          }
          if (h.hn(a)) {
            this.pos += 1;
            continue;
          }
          if (a === "-" && this.peek(1) === "-") {
            this.pos += 2;
            let a = this.gn();
            if (a !== null) {
              this.pn(a);
              continue;
            }
            for (; this.pos < this.len && !h["A"](this.src[this.pos]);) this.pos += 1;
            continue;
          }
          return;
        }
      }
      gn() {
        if (this.peek() !== "[") return null;
        let a = this.pos + 1,
          b = 0;
        for (; a < this.len && this.src[a] === "=";) b += 1, a += 1;
        return this.src[a] !== "[" ? null : (this.pos = a + 1, b);
      }
      pn(a) {
        h["A"](this.peek()) && this.newline();
        let b = `]${"=".repeat(a)}]`,
          c = "";
        for (;;) {
          if (this.pos >= this.len && this.error("unterminated long string/comment"), this.src["startsWith"](b, this.pos)) return this.pos += b.length, c;
          let a = this.src[this.pos];
          if (h["A"](a)) {
            this.newline(), c += `\n`;
            continue;
          }
          c += a, this.pos += 1;
        }
      }
      "St"(a) {
        this.pos += 1;
        let b = "";
        for (;;) {
          this.pos >= this.len && this.error("unterminated string");
          let c = this.src[this.pos];
          if (c === a) return this.pos += 1, b;
          if (h["A"](c) && this.error("unterminated string"), c !== "\\") {
            b += c, this.pos += 1;
            continue;
          }
          this.pos += 1, b += this["Nt"]();
        }
      }
      "Nt"() {
        let a = this.peek();
        if (a === "" && this.error("unterminated escape sequence"), h["A"](a)) return this.newline(), `\n`;
        if (Object.prototype["hasOwnProperty"].call(h["ESCAPES"], a)) return this.pos += 1, h["ESCAPES"][a];
        if (a === "x" || a === "X") {
          this.pos += 1;
          let a = "";
          for (; a.length < 2 && h["Me"](this.peek());) a += this.src[this.pos], this.pos += 1;
          return a.length === 0 && this.error("hex digit expected"), String["fromCharCode"](parseInt(a, 16));
        }
        if (a === "z") {
          for (this.pos += 1; this.pos < this.len && h.hn(this.src[this.pos]);) h["A"](this.src[this.pos]) ? this.newline() : this.pos += 1;
          return "";
        }
        if (a === "u") {
          this.pos += 1, this.peek() !== "{" && this.error("expected '{' after \\u"), this.pos += 1;
          let a = "";
          for (; h["Me"](this.peek());) a += this.src[this.pos], this.pos += 1;
          return this.peek() !== "}" && this.error("expected '}'"), this.pos += 1, h["utf8Encode"](parseInt(a, 16));
        }
        if (h.m(a)) {
          let a = "";
          for (; a.length < 3 && h.m(this.peek());) a += this.src[this.pos], this.pos += 1;
          let b = parseInt(a, 10);
          return b > 255 && this.error("decimal escape out of range"), String["fromCharCode"](b);
        }
        return this.error(`invalid escape '\\${a}'`);
      }
      "Ct"() {
        let a = this.pos;
        if (this.peek() === "0" && (this.peek(1) === "x" || this.peek(1) === "X")) {
          for (this.pos += 2; h["Me"](this.peek()) || this.peek() === ".";) this.pos += 1;
          if (this.peek() === "p" || this.peek() === "P") for (this.pos += 1, (this.peek() === "+" || this.peek() === "-") && (this.pos += 1); h.m(this.peek());) this.pos += 1;
          let b = this.src.slice(a, this.pos);
          return {
            text: b,
            value: h.vt(b)
          };
        }
        if (this.peek() === "0" && (this.peek(1) === "b" || this.peek(1) === "B")) {
          for (this.pos += 2; this.peek() === "0" || this.peek() === "1";) this.pos += 1;
          let b = this.src.slice(a, this.pos);
          return {
            text: b,
            value: parseInt(b.slice(2), 2)
          };
        }
        for (; h.m(this.peek());) this.pos += 1;
        if (this.peek() === ".") for (this.pos += 1; h.m(this.peek());) this.pos += 1;
        if (this.peek() === "e" || this.peek() === "E") for (this.pos += 1, (this.peek() === "+" || this.peek() === "-") && (this.pos += 1); h.m(this.peek());) this.pos += 1;
        let b = this.src.slice(a, this.pos),
          c = Number(b);
        return Number["isNaN"](c) && this.error(`malformed number '${b}'`), {
          text: b,
          value: c
        };
      }
      next() {
        this.xt();
        let a = this.line,
          b = this.pos - this.$e + 1,
          c = this.pos;
        if (this.pos >= this.len) return {
          kind: e["Eof"],
          value: null,
          line: a,
          column: b,
          offset: c
        };
        let d = this.src[this.pos];
        if (h.wt(d)) {
          let d = this.pos;
          for (; d < this.len && h.yt(this.src[d]);) d += 1;
          let g = this.src.slice(this.pos, d);
          return this.pos = d, {
            kind: f.has(g) ? e["Keyword"] : e["Name"],
            value: g,
            line: a,
            column: b,
            offset: c
          };
        }
        if (h.m(d) || d === "." && h.m(this.peek(1))) {
          let d = this["Ct"]();
          return {
            kind: e["Number"],
            value: d.value,
            text: d.text,
            line: a,
            column: b,
            offset: c
          };
        }
        if (d === '"' || d === "'") return {
          kind: e["String"],
          value: this["St"](d),
          line: a,
          column: b,
          offset: c
        };
        if (d === "[") {
          let d = this.gn();
          if (d !== null) {
            let f = this.pn(d);
            return {
              kind: e["String"],
              value: f,
              long: !0,
              level: d,
              line: a,
              column: b,
              offset: c
            };
          }
        }
        for (let d = 0; d < g.length; d += 1) {
          let f = g[d];
          if (this.src["startsWith"](f, this.pos)) return this.pos += f.length, {
            kind: e["Symbol"],
            value: f,
            line: a,
            column: b,
            offset: c
          };
        }
        return this.error(`unexpected char '${d}'`);
      }
      tokenize() {
        let a = [];
        for (;;) {
          let b = this.next();
          if (a.push(b), b.kind === e["Eof"]) return a;
        }
      }
    };
  function k(a) {
    return new j(a).tokenize();
  }
  d.exports = {
    "Lexer": j,
    tokenize: k,
    "LuaSyntaxError": i,
    "TokenKind": e
  };
});
var e = a((a, b) => {
  "use strict";

  var c = {
      "Chunk": "Chunk",
      "Block": "Block",
      "LocalDeclaration": "LocalDeclaration",
      "LocalFunction": "LocalFunction",
      "FunctionDeclaration": "FunctionDeclaration",
      "Assignment": "Assignment",
      "CallStatement": "CallStatement",
      "Return": "Return",
      "Break": "Break",
      "Continue": "Continue",
      "Do": "Do",
      "While": "While",
      "Repeat": "Repeat",
      "If": "If",
      "NumericFor": "NumericFor",
      "GenericFor": "GenericFor",
      "Goto": "Goto",
      "Label": "Label",
      "Nil": "Nil",
      "True": "True",
      "False": "False",
      "Number": "Number",
      "String": "String",
      "Vararg": "Vararg",
      "Function": "Function",
      "Table": "Table",
      "Binary": "Binary",
      "Unary": "Unary",
      "Index": "Index",
      "Call": "Call",
      "MethodCall": "MethodCall",
      "Name": "Name",
      "Paren": "Paren"
    },
    d = new Set([c["Nil"], c["True"], c["False"], c["Number"], c["String"], c["Vararg"], c["Function"], c["Table"], c["Binary"], c["Unary"], c["Index"], c["Call"], c["MethodCall"], c["Name"], c["Paren"]]),
    e = new Set([c["Nil"], c["True"], c["False"], c["Number"], c["String"]]),
    f = new Set([c["Name"], c["Index"]]),
    g = new Set([c["Call"], c["MethodCall"], c["Vararg"]]),
    h = (a = []) => ({
      kind: c["Block"],
      statements: a
    }),
    i = a => ({
      kind: c["Chunk"],
      body: a || h()
    }),
    j = () => ({
      kind: c["Nil"]
    }),
    k = a => ({
      kind: a ? c["True"] : c["False"]
    }),
    l = a => ({
      kind: c["Number"],
      value: a
    }),
    m = a => ({
      kind: c["String"],
      value: a
    }),
    n = () => ({
      kind: c["Vararg"]
    }),
    o = a => ({
      kind: c["Name"],
      name: a
    }),
    p = a => ({
      kind: c["Paren"],
      expression: a
    }),
    q = (a, b, d) => ({
      kind: c["Binary"],
      operator: a,
      lhs: b,
      rhs: d
    }),
    r = (a, b) => ({
      kind: c["Unary"],
      operator: a,
      argument: b
    }),
    s = (a, b, d = !1) => ({
      kind: c["Index"],
      base: a,
      index: b,
      dot: d
    }),
    t = (a, b = []) => ({
      kind: c["Call"],
      base: a,
      args: b
    }),
    u = (a, b, d = []) => ({
      kind: c["MethodCall"],
      base: a,
      method: b,
      args: d
    }),
    v = (a = []) => ({
      kind: c["Table"],
      entries: a
    }),
    w = (a, b, d = !1) => ({
      kind: c["Function"],
      params: a,
      body: b || h(),
      w: d
    }),
    x = (a, b = []) => ({
      kind: c["LocalDeclaration"],
      names: a,
      expressions: b
    }),
    y = (a, b) => ({
      kind: c["Assignment"],
      targets: a,
      expressions: b
    }),
    z = a => ({
      kind: c["CallStatement"],
      expression: a
    }),
    aa = (a = []) => ({
      kind: c["Return"],
      expressions: a
    }),
    ab = () => ({
      kind: c["Break"]
    }),
    ac = a => ({
      kind: c["Do"],
      body: a
    }),
    ad = (a, b) => ({
      kind: c["While"],
      condition: a,
      body: b
    }),
    ae = (a, b) => ({
      kind: c["Repeat"],
      body: a,
      condition: b
    }),
    af = (a, b, d = [], e = null) => ({
      kind: c["If"],
      condition: a,
      body: b,
      s: d,
      e: e
    }),
    ag = (a, b, d, e, f) => ({
      kind: c["NumericFor"],
      variable: a,
      start: b,
      limit: d,
      step: e,
      body: f
    }),
    ah = (a, b, d) => ({
      kind: c["GenericFor"],
      variables: a,
      expressions: b,
      body: d
    }),
    ai = a => {
      let b = a;
      for (; b && b.kind === c["Paren"];) b = b.expression;
      return b;
    },
    aj = a => !!a && e.has(a.kind),
    ak = a => !!a && g.has(a.kind),
    al = a => !!a && d.has(a.kind);
  b.exports = {
    "Kind": c,
    "LITERALS": e,
    "ASSIGNABLE": f,
    "Y": aj,
    unparen: ai,
    d: ak,
    kn: al,
    block: h,
    chunk: i,
    nil: j,
    boolean: k,
    number: l,
    string: m,
    vararg: n,
    name: o,
    paren: p,
    binary: q,
    unary: r,
    index: s,
    call: t,
    "Le": u,
    table: v,
    func: w,
    "R": x,
    assignment: y,
    "X": z,
    "I": aa,
    "Ee": ab,
    "N": ac,
    ae: ad,
    bn: ae,
    "Z": af,
    mn: ag,
    wn: ah
  };
});
var f = a((a, c) => {
  "use strict";

  var {
      tokenize: f,
      "LuaSyntaxError": g
    } = d(),
    {
      "TokenKind": h
    } = b(),
    i = e(),
    {
      "Kind": j
    } = i,
    k = {
      or: [1, 1],
      and: [2, 2],
      "<": [3, 3],
      ">": [3, 3],
      "<=": [3, 3],
      ">=": [3, 3],
      "~=": [3, 3],
      "==": [3, 3],
      "|": [4, 4],
      "~": [5, 5],
      "&": [6, 6],
      "<<": [7, 7],
      ">>": [7, 7],
      "..": [9, 8],
      "+": [10, 10],
      "-": [10, 10],
      "*": [11, 11],
      "/": [11, 11],
      "//": [11, 11],
      "%": [11, 11],
      "^": [14, 13]
    },
    l = 12,
    m = new Set(["-", "not", "#", "~"]),
    n = {
      "+=": "+",
      "-=": "-",
      "*=": "*",
      "/=": "/",
      "%=": "%",
      "^=": "^",
      "..=": ".."
    },
    o = new Set(["end", "else", "elseif", "until"]),
    p = class {
      constructor(a) {
        this.tokens = f(a), this.index = 0;
      }
      get token() {
        return this.tokens[this.index];
      }
      peek(a = 1) {
        let b = this.index + a;
        return b < this.tokens.length ? this.tokens[b] : this.tokens[this.tokens.length - 1];
      }
      advance() {
        let a = this.tokens[this.index];
        return this.index < this.tokens.length - 1 && (this.index += 1), a;
      }
      error(a, b = this.token) {
        throw new g(a, b.line, b.column);
      }
      at(a) {
        let b = this.token;
        return (b.kind === h["Symbol"] || b.kind === h["Keyword"]) && b.value === a;
      }
      accept(a) {
        return this.at(a) ? (this.advance(), !0) : !1;
      }
      expect(a) {
        return this.at(a) || this.error(`expected '${a}', got '${q(this.token)}'`), this.advance();
      }
      g() {
        return this.token.kind !== h["Name"] && this.error(`expected identifier, got '${q(this.token)}'`), this.advance().value;
      }
      "Ft"() {
        let a = this.k();
        return this.token.kind !== h["Eof"] && this.error(`expected EOF, got '${q(this.token)}'`), i.chunk(a);
      }
      k() {
        let a = [];
        for (; this.token.kind !== h["Eof"] && !(this.token.kind === h["Keyword"] && o.has(this.token.value));) if (!this.accept(";")) {
          if (this.token.kind === h["Keyword"] && this.token.value === "return") {
            a.push(this.qt()), this.accept(";");
            break;
          }
          a.push(this["Mt"]());
        }
        return i.block(a);
      }
      qt() {
        this.expect("return");
        let a = this.$t() || this.at(";") ? [] : this["J"]();
        return i["I"](a);
      }
      $t() {
        let a = this.token;
        return a.kind === h["Eof"] ? !0 : a.kind === h["Keyword"] && o.has(a.value);
      }
      "Mt"() {
        let a = this.token;
        if (a.kind === h["Keyword"]) switch (a.value) {
          case "local":
            return this["Lt"]();
          case "if":
            return this["Et"]();
          case "while":
            return this["At"]();
          case "do":
            {
              this.advance();
              let a = this.k();
              return this.expect("end"), i["N"](a);
            }
          case "for":
            return this["It"]();
          case "repeat":
            return this["Ot"]();
          case "function":
            return this["Tt"]();
          case "break":
            return this.advance(), i["Ee"]();
          case "continue":
            return this.advance(), {
              kind: j["Continue"]
            };
          case "goto":
            return this.advance(), {
              kind: j["Goto"],
              label: this.g()
            };
          default:
            break;
        }
        if (this.at("::")) {
          this.advance();
          let a = this.g();
          return this.expect("::"), {
            kind: j["Label"],
            name: a
          };
        }
        return this["_t"]();
      }
      "Lt"() {
        if (this.expect("local"), this.accept("function")) {
          let a = this.g(),
            b = this["Ae"]();
          return {
            kind: j["LocalFunction"],
            name: a,
            body: b
          };
        }
        let a = [this["Q"]()];
        for (; this.accept(",");) a.push(this["Q"]());
        let b = this.accept("=") ? this["J"]() : [];
        return i["R"](a, b);
      }
      "Q"() {
        let a = this.g();
        return this.at("<") ? (this.advance(), this.g(), this.expect(">")) : this.at(":") && (this.advance(), this["Ie"]()), a;
      }
      "Ie"() {
        let a = 0;
        for (;;) {
          let b = this.token;
          if (b.kind === h["Eof"]) return;
          if (b.kind === h["Symbol"]) {
            if (b.value === "(" || b.value === "{" || b.value === "<") a += 1;else if (b.value === ")" || b.value === "}" || b.value === ">") {
              if (a === 0) return;
              a -= 1;
            } else if (a === 0 && (b.value === "," || b.value === "=" || b.value === ";")) return;
          } else if (b.kind === h["Keyword"] && a === 0 && b.value !== "nil") return;
          this.advance();
        }
      }
      "Et"() {
        this.expect("if");
        let a = this.u();
        this.expect("then");
        let b = this.k(),
          c = [],
          d = null;
        for (;;) {
          if (this.accept("elseif")) {
            let a = this.u();
            this.expect("then"), c.push({
              condition: a,
              body: this.k()
            });
            continue;
          }
          this.accept("else") && (d = this.k());
          break;
        }
        return this.expect("end"), i["Z"](a, b, c, d);
      }
      "At"() {
        this.expect("while");
        let a = this.u();
        this.expect("do");
        let b = this.k();
        return this.expect("end"), i.ae(a, b);
      }
      "Ot"() {
        this.expect("repeat");
        let a = this.k();
        return this.expect("until"), i.bn(a, this.u());
      }
      "It"() {
        this.expect("for");
        let a = this["Q"]();
        if (this.accept("=")) {
          let b = this.u();
          this.expect(",");
          let c = this.u(),
            d = this.accept(",") ? this.u() : null;
          this.expect("do");
          let e = this.k();
          return this.expect("end"), i.mn(a, b, c, d, e);
        }
        let b = [a];
        for (; this.accept(",");) b.push(this["Q"]());
        this.expect("in");
        let c = this["J"]();
        this.expect("do");
        let d = this.k();
        return this.expect("end"), i.wn(b, c, d);
      }
      "Tt"() {
        this.expect("function");
        let a = i.name(this.g()),
          b = !1;
        for (;;) {
          if (this.accept(".")) {
            a = i.index(a, i.string(this.g()));
            continue;
          }
          this.accept(":") && (a = i.index(a, i.string(this.g())), b = !0);
          break;
        }
        let c = this["Ae"](b);
        return {
          kind: j["FunctionDeclaration"],
          target: a,
          ee: b,
          body: c
        };
      }
      "Ae"(a = !1) {
        this.at("<") && this["Bt"](), this.expect("(");
        let b = a ? ["self"] : [],
          c = !1;
        if (!this.at(")")) do {
          if (this.accept("...")) {
            c = !0, this.accept(":") && this["Ie"]();
            break;
          }
          b.push(this["Q"]());
        } while (this.accept(","));
        this.expect(")"), this.accept(":") && this["Ie"]();
        let d = this.k();
        return this.expect("end"), i.func(b, d, c);
      }
      "Bt"() {
        this.expect("<");
        let a = 1;
        for (; a > 0 && this.token.kind !== h["Eof"];) this.at("<") ? a += 1 : this.at(">") && (a -= 1), this.advance();
      }
      "_t"() {
        let a = this["Oe"]();
        if (this.at("=") || this.at(",")) {
          let b = [a];
          for (; this.accept(",");) b.push(this["Oe"]());
          this.expect("=");
          let c = this["J"]();
          for (let a of b) i["ASSIGNABLE"].has(a.kind) || this.error("invalid assignment target");
          return i.assignment(b, c);
        }
        let b = this.token.kind === h["Symbol"] ? n[this.token.value] : void 0;
        if (b) {
          this.advance();
          let c = this.u();
          return i.assignment([a], [i.binary(b, a, c)]);
        }
        return a.kind !== j["Call"] && a.kind !== j["MethodCall"] && this.error("unexpected expression statement"), i["X"](a);
      }
      "J"() {
        let a = [this.u()];
        for (; this.accept(",");) a.push(this.u());
        return a;
      }
      u(a = 0) {
        let b,
          c = this.token;
        if (c.kind === h["Symbol"] && m.has(c.value) || c.kind === h["Keyword"] && c.value === "not") {
          let a = this.advance().value;
          b = i.unary(a, this.u(l));
        } else b = this["Rt"]();
        for (;;) {
          let c = this.token;
          if (!((c.kind === h["Symbol"] || c.kind === h["Keyword"]) && Object.prototype["hasOwnProperty"].call(k, c.value))) break;
          let [d, e] = k[c.value];
          if (d <= a) break;
          this.advance(), b = i.binary(c.value, b, this.u(e));
        }
        return b;
      }
      "Rt"() {
        let a = this.token;
        switch (a.kind) {
          case h["Number"]:
            return this.advance(), i.number(a.value);
          case h["String"]:
            return this.advance(), i.string(a.value);
          case h["Keyword"]:
            if (a.value === "nil") return this.advance(), i.nil();
            if (a.value === "true") return this.advance(), i.boolean(!0);
            if (a.value === "false") return this.advance(), i.boolean(!1);
            if (a.value === "function") return this.advance(), this["Ae"]();
            break;
          case h["Symbol"]:
            if (a.value === "...") return this.advance(), i.vararg();
            if (a.value === "{") return this.yn();
            break;
          default:
            break;
        }
        return this["Oe"]();
      }
      "Dt"() {
        if (this.accept("(")) {
          let a = this.u();
          return this.expect(")"), i.paren(a);
        }
        return this.token.kind === h["Name"] ? i.name(this.advance().value) : this.error(`unexpected token '${q(this.token)}'`);
      }
      "Oe"() {
        let a = this["Dt"]();
        for (;;) {
          if (this.accept(".")) {
            a = i.index(a, i.string(this.g()), !0);
            continue;
          }
          if (this.accept("[")) {
            let b = this.u();
            this.expect("]"), a = i.index(a, b);
            continue;
          }
          if (this.at(":") && this.peek().kind === h["Name"]) {
            this.advance();
            let b = this.g();
            a = i["Le"](a, b, this.vn());
            continue;
          }
          if (this.at("(") || this.at("{") || this.token.kind === h["String"]) {
            a = i.call(a, this.vn());
            continue;
          }
          return a;
        }
      }
      vn() {
        if (this.token.kind === h["String"]) return [i.string(this.advance().value)];
        if (this.at("{")) return [this.yn()];
        if (this.expect("("), this.accept(")")) return [];
        let a = this["J"]();
        return this.expect(")"), a;
      }
      yn() {
        this.expect("{");
        let a = [];
        for (; !this.at("}");) {
          if (this.accept("[")) {
            let b = this.u();
            this.expect("]"), this.expect("="), a.push({
              type: "key",
              key: b,
              value: this.u()
            });
          } else if (this.token.kind === h["Name"] && this.peek().kind === h["Symbol"] && this.peek().value === "=") {
            let b = i.string(this.advance().value);
            this.advance(), a.push({
              type: "key",
              key: b,
              value: this.u()
            });
          } else a.push({
            type: "item",
            value: this.u()
          });
          if (!this.accept(",") && !this.accept(";")) break;
        }
        return this.expect("}"), i.table(a);
      }
    };
  function q(a) {
    return a.kind === h["Eof"] ? "<eof>" : a.kind === h["String"] ? `"${a.value}"` : String(a.value);
  }
  function r(a) {
    return new p(a)["Ft"]();
  }
  c.exports = {
    parse: r,
    "LuaSyntaxError": g
  };
});
var g = a((a, c) => {
  "use strict";

  var {
      "Kind": d
    } = e(),
    {
      "KEYWORDS": f
    } = b(),
    g = {
      or: [1, "left"],
      and: [2, "left"],
      "<": [3, "left"],
      ">": [3, "left"],
      "<=": [3, "left"],
      ">=": [3, "left"],
      "~=": [3, "left"],
      "==": [3, "left"],
      "|": [4, "left"],
      "~": [5, "left"],
      "&": [6, "left"],
      "<<": [7, "left"],
      ">>": [7, "left"],
      "..": [8, "right"],
      "+": [9, "left"],
      "-": [9, "left"],
      "*": [10, "left"],
      "/": [10, "left"],
      "//": [10, "left"],
      "%": [10, "left"],
      "^": [12, "right"]
    },
    h = 11,
    i = 100,
    j = new Set([d["Name"], d["Index"], d["Call"], d["MethodCall"], d["Paren"]]),
    k = /[A-Za-z_]/,
    l = /[A-Za-z0-9_]/;
  function m(a) {
    if (typeof a != "string" || a.length === 0 || !k.test(a[0])) return !1;
    for (let b = 1; b < a.length; b += 1) if (!l.test(a[b])) return !1;
    return !f.has(a);
  }
  function n(a) {
    return typeof a != "number" ? String(a) : Number["isNaN"](a) ? "(0 / 0)" : a === 1 / 0 ? "math.huge" : a === -1 / 0 ? "-math.huge" : Object.is(a, -0) ? "0" : (Number["isInteger"](a) && Math.abs(a) < 1e15, String(a));
  }
  var o = {
      "\n": "\\n",
      "\r": "\\r",
      "\t": "\\t",
      "\\": "\\\\",
      '"': '\\"'
    },
    p = new Set([160, 173, 8232, 8233, 65279]);
  function q(a, b) {
    let c = a["charCodeAt"](b),
      d = a["charCodeAt"](b + 1),
      e = c => {
        for (let d = 1; d <= c; d += 1) {
          let c = a["charCodeAt"](b + d);
          if (!(c >= 128 && c <= 191)) return !1;
        }
        return !0;
      },
      f = 0,
      g = 0;
    if (c >= 194 && c <= 223 && e(1)) f = 2, g = (c & 31) << 6 | d & 63;else if (c >= 224 && c <= 239 && e(2)) {
      if (f = 3, g = (c & 15) << 12 | (d & 63) << 6 | a["charCodeAt"](b + 2) & 63, g < 2048 || g >= 55296 && g <= 57343) return 0;
    } else if (c >= 240 && c <= 244 && e(3)) {
      if (f = 4, g = (c & 7) << 18 | (d & 63) << 12 | (a["charCodeAt"](b + 2) & 63) << 6 | a["charCodeAt"](b + 3) & 63, g < 65536 || g > 1114111) return 0;
    } else return 0;
    return g <= 159 || p.has(g) ? 0 : f;
  }
  function r(a) {
    let b = '"';
    for (let c = 0; c < a.length; c += 1) {
      let d = a[c],
        e = o[d];
      if (e !== void 0) {
        b += e;
        continue;
      }
      let f = a["charCodeAt"](c);
      if (f >= 32 && f <= 126) {
        b += d;
        continue;
      }
      if (f >= 194 && f <= 244) {
        let d = q(a, c);
        if (d) {
          b += a.slice(c, c + d), c += d - 1;
          continue;
        }
      }
      let g = a[c + 1],
        h = g !== void 0 && g >= "0" && g <= "9";
      b += `\\${h ? String(f)["padStart"](3, "0") : String(f)}`;
    }
    return `${b}"`;
  }
  function s(a) {
    if (!a.includes(`\n`) || a.includes("]]") || a["startsWith"](`\n`) || a["endsWith"]("]")) return !1;
    for (let b = 0; b < a.length; b += 1) {
      let c = a["charCodeAt"](b);
      if (!(c >= 32 && c <= 126 || c === 10 || c === 9)) return !1;
    }
    return !0;
  }
  function t(a) {
    return s(a) ? `[[\n${a}]]` : r(a);
  }
  c.exports = {
    "BINARY": g,
    "UNARY_PREC": h,
    "ATOM_PREC": i,
    "PREFIXES": j,
    y: m,
    "Pt": n,
    jt: t
  };
});
var h = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    d = 4,
    f = 4;
  function g(a) {
    let b = a;
    for (let a = 0; a < 1e3 && b; a += 1) switch (b.kind) {
      case c["Name"]:
        return b.name;
      case c["Paren"]:
        b = b.expression;
        break;
      case c["Index"]:
        b = b.base;
        break;
      case c["Call"]:
      case c["MethodCall"]:
        b = b.base;
        break;
      default:
        return null;
    }
    return null;
  }
  function h(a) {
    if (!a) return null;
    switch (a.kind) {
      case c["LocalDeclaration"]:
        return (a.names || [])[0] || null;
      case c["LocalFunction"]:
        return a.name || null;
      case c["FunctionDeclaration"]:
        return g(a.target);
      case c["Assignment"]:
        return g((a.targets || [])[0]);
      case c["CallStatement"]:
        return g(a.expression);
      default:
        return null;
    }
  }
  function i(a) {
    let b = [],
      c = [],
      d = -1,
      e = null;
    return (a || [])["forEach"]((a, f) => {
      let g = h(a);
      (f === 0 || g === null || e === null || g !== e) && (d += 1, c.push(0)), b.push(d), c[d] += 1, e = g;
    }), {
      index: b,
      sizes: c,
      count: b.length
    };
  }
  function j(a, b, c, e) {
    if (!b) return !1;
    if (c || e) return !0;
    if (a.count < d) return !1;
    let f = a.index[b],
      g = a.index[b - 1];
    return f === g ? !1 : a.sizes[f] >= 2 || a.sizes[g] >= 2;
  }
  function k(a) {
    let b = 0;
    for (let c of a) c.type === "key" && (b += 1);
    return b >= f;
  }
  b.exports = {
    ai: g,
    groups: i,
    record: k,
    separates: j
  };
});
var i = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    d = g(),
    f = h(),
    i = {
      indent: "  ",
      ne: 96
    },
    j = new Set(["do", "then", "else", "repeat"]),
    k = new Set(["and", "or"]);
  function l(a) {
    let b = a["trimEnd"]();
    if (!b) return "";
    let c = a => a >= "a" && a <= "z" || a >= "A" && a <= "Z" || a >= "0" && a <= "9" || a === "_",
      d = b.length;
    if (!c(b[d - 1])) return b[d - 1];
    let e = d;
    for (; e > 0 && c(b[e - 1]);) e -= 1;
    return b.slice(e, d);
  }
  var m = class a {
    constructor(a = {}) {
      this.options = {
        ...i,
        ...a
      }, this.lines = [], this.depth = 0, this.tail = "", this.column = 0, this.tight = !1;
    }
    push(a) {
      this.lines.push(a === "" ? "" : this.options.indent.repeat(this.depth) + a), a !== "" && (this.tail = l(a));
    }
    continues() {
      return this.lines.length ? !(j.has(this.tail) || this.tail === ";" || this.tail === ":") : !1;
    }
    blank() {
      this.lines.length && this.lines[this.lines.length - 1] !== "" && this.lines.push("");
    }
    indented(a) {
      this.depth += 1, a(), this.depth -= 1;
    }
    from(a, b) {
      let c = this.column;
      this.column = a;
      let d = b();
      return this.column = c, d;
    }
    after(a, b) {
      return a + this.from(this.zt(a), b);
    }
    packed(a) {
      let b = this.tight;
      this.tight = !0;
      let c = a();
      return this.tight = b, c;
    }
    zt(a) {
      return this.column + a.length;
    }
    wrap(a, b) {
      let c = a + b.join(", ");
      if (this.fits(c)) return c;
      let d = this.options.indent.repeat(this.depth + 1),
        e = [],
        f = a["trimEnd"](),
        g = this.column;
      for (let a = 0; a < b.length; a += 1) {
        let c = a === b.length - 1 ? b[a] : `${b[a]},`,
          h = f ? `${f} ${c}` : c;
        g + h.length <= this.options.ne ? f = h : (e.push(f), f = c, g = d.length);
      }
      return e.push(f), e.join(`\n${d}`);
    }
    fits(a) {
      return !a.includes(`\n`) && this.column + a.length <= this.options.ne;
    }
    inner() {
      let b = new a(this.options);
      return b.tight = this.tight, b.depth = this.depth + 1, b.column = this.options.indent.length * b.depth, b;
    }
    "toString"() {
      return `${this.lines.join(`\n`).replace(/\s+$/, "")}\n`;
    }
    block(a) {
      if (!a || !a.statements) return;
      let b = a.statements,
        c = f.groups(b),
        d = !1;
      for (let a = 0; a < b.length; a += 1) {
        let e = this.lines.length;
        this.statement(b[a]);
        let g = this.lines.length - e,
          h = g > 1 || g === 1 && this.lines[e]["indexOf"](`\n`) >= 0;
        f.separates(c, a, h, d) && this.lines.splice(e, 0, ""), d = h;
      }
    }
    statement(a) {
      switch (this.column = this.options.indent.length * this.depth, a.kind) {
        case c["LocalDeclaration"]:
          {
            let b = a.names.join(", ");
            !a.expressions || a.expressions.length === 0 ? this.push(this.wrap("local ", a.names)) : this.push(this.after(`local ${b} = `, () => this["F"](a.expressions)));
            return;
          }
        case c["LocalFunction"]:
          this.xn(`local function ${a.name}`, a.body);
          return;
        case c["FunctionDeclaration"]:
          {
            let b = this["Gt"](a.target, a.ee);
            this.xn(`function ${b}`, a.body, a.ee);
            return;
          }
        case c["Assignment"]:
          {
            let b = this.after(`${this["F"](a.targets)} = `, () => this["F"](a.expressions));
            this.push(b["startsWith"]("(") && this.continues() ? `;${b}` : b);
            return;
          }
        case c["CallStatement"]:
          {
            let b = this.expression(a.expression);
            this.push(b["startsWith"]("(") && this.continues() ? `;${b}` : b);
            return;
          }
        case c["Return"]:
          !a.expressions || a.expressions.length === 0 ? this.push("return") : this.push(this.after("return ", () => this["F"](a.expressions)));
          return;
        case c["Break"]:
          this.push("break");
          return;
        case c["Continue"]:
          this.push("continue");
          return;
        case c["Goto"]:
          this.push(`goto ${a.label}`);
          return;
        case c["Label"]:
          this.push(`::${a.name}::`);
          return;
        case c["Do"]:
          this.push("do"), this.indented(() => this.block(a.body)), this.push("end");
          return;
        case c["While"]:
          this.push(`${this.after("while ", () => this.expression(a.condition))} do`), this.indented(() => this.block(a.body)), this.push("end");
          return;
        case c["Repeat"]:
          this.push("repeat"), this.indented(() => this.block(a.body)), this.push(this.after("until ", () => this.expression(a.condition)));
          return;
        case c["If"]:
          this["Z"](a);
          return;
        case c["NumericFor"]:
          {
            let b = [a.start, a.limit];
            a.step && b.push(a.step), this.push(`${this.after(`for ${a.variable} = `, () => this["F"](b))} do`), this.indented(() => this.block(a.body)), this.push("end");
            return;
          }
        case c["GenericFor"]:
          this.push(`${this.after(`for ${a.variables.join(", ")} in `, () => this["F"](a.expressions))} do`), this.indented(() => this.block(a.body)), this.push("end");
          return;
        default:
          this.push(`--[[ unsupported statement ${a.kind} ]]`);
      }
    }
    "Z"(a) {
      this.push(`${this.after("if ", () => this.expression(a.condition))} then`), this.indented(() => this.block(a.body));
      for (let b of a.s || []) this.push(`${this.after("elseif ", () => this.expression(b.condition))} then`), this.indented(() => this.block(b.body));
      a.e && (this.push("else"), this.indented(() => this.block(a.e))), this.push("end");
    }
    "Gt"(a, b) {
      if (a.kind !== c["Index"]) return this.expression(a);
      let e = a.index;
      return b && e.kind === c["String"] && d.y(e.value) ? `${this.expression(a.base)}:${e.value}` : this.expression(a);
    }
    xn(a, b, c = !1) {
      let d = (b.params || []).slice();
      c && d[0] === "self" && d.shift(), b.w && d.push("..."), this.push(`${a}(${d.join(", ")})`), this.indented(() => this.block(b.body)), this.push("end");
    }
    "F"(a) {
      return a.map(a => this.expression(a)).join(", ");
    }
    static ce(a) {
      let b = a.expression;
      return !!b && (b.kind === c["Call"] || b.kind === c["MethodCall"] || b.kind === c["Vararg"]);
    }
    static "Sn"(b) {
      if (b.kind === c["Paren"]) return a.ce(b) ? d["ATOM_PREC"] : a["Sn"](b.expression || b);
      if (b.kind === c["Binary"]) {
        let a = d["BINARY"][b.operator];
        return a ? a[0] : 0;
      }
      return b.kind === c["Unary"] ? d["UNARY_PREC"] : d["ATOM_PREC"];
    }
    expression(b) {
      if (!b) return "nil";
      switch (b.kind) {
        case c["Nil"]:
          return "nil";
        case c["True"]:
          return "true";
        case c["False"]:
          return "false";
        case c["Vararg"]:
          return "...";
        case c["Number"]:
          return d["Pt"](b.value);
        case c["String"]:
          return d.jt(b.value);
        case c["Name"]:
          return b.name;
        case c["Function"]:
          return this.te(b);
        case c["Table"]:
          return this["Kt"](b);
        case c["Binary"]:
          return this["Ut"](b);
        case c["Unary"]:
          return this["Wt"](b);
        case c["Index"]:
          return this["Vt"](b);
        case c["Call"]:
          {
            let a = this.prefix(b.base);
            return a + this.from(this.column + a.length, () => this.arguments(b.args));
          }
        case c["MethodCall"]:
          {
            let a = `${this.prefix(b.base)}:${b.method}`;
            return a + this.from(this.column + a.length, () => this.arguments(b.args));
          }
        case c["Paren"]:
          return a.ce(b) ? `(${this.expression(b.expression)})` : this.expression(b.expression);
        default:
          return `--[[ ${b.kind} ]]nil`;
      }
    }
    operand(b, d, e, f) {
      let g = this.expression(b),
        h = a["Sn"](b),
        i = b;
      for (; i.kind === c["Paren"] && !a.ce(i);) i = i.expression;
      let j = h < d;
      return h === d && i.kind === c["Binary"] && !k.has(i.operator) && (e === "left" && f === "right" && (j = !0), e === "right" && f === "left" && (j = !0)), j ? `(${g})` : g;
    }
    "Ut"(a) {
      let b = d["BINARY"][a.operator] || [0, "left"],
        [c, e] = b,
        f = [];
      this.chain(a, a.operator, e, f);
      let g = this.packed(() => this.operands(this, f, c, e).join(` ${a.operator} `));
      return this.tight || g.includes(`\n`) || this.fits(g) ? g : this.spread(f, a.operator, c, e);
    }
    chain(b, d, e, f) {
      let g = b;
      for (; g.kind === c["Paren"] && !a.ce(g);) g = g.expression;
      if (g.kind !== c["Binary"] || g.operator !== d) {
        f.push(b);
        return;
      }
      let h = k.has(d);
      h || e === "left" ? this.chain(g.lhs, d, e, f) : f.push(g.lhs), h || e === "right" ? this.chain(g.rhs, d, e, f) : f.push(g.rhs);
    }
    operands(a, b, c, d, e) {
      let f = b.length - 1,
        g = d === "right" ? a => a !== f : a => a === 0;
      return b.map((b, f) => {
        let h = g(f) ? "left" : "right",
          i = () => a.operand(b, c, h, d);
        return e ? a.from(e(f), i) : i();
      });
    }
    spread(a, b, c, d) {
      let e = this.inner(),
        f = this.options.indent.repeat(e.depth),
        g = `${b} `,
        h = this.operands(e, a, c, d, a => a === 0 ? this.column : f.length + g.length).map((a, b) => b === 0 ? a : `${g}${a}`),
        i = h.some(a => a.includes(`\n`)),
        j = [],
        k = h[0],
        l = this.column;
      for (let a = 1; a < h.length; a += 1) {
        let b = `${k} ${h[a]}`;
        !i && l + b.length <= this.options.ne ? k = b : (j.push(k), k = h[a], l = f.length);
      }
      return j.push(k), j.join(`\n${f}`);
    }
    "Wt"(a) {
      let b = this.operand(a.argument, d["UNARY_PREC"], "right", "right");
      if (a.operator === "not") return `not ${b}`;
      let c = a.operator === "-" && b["startsWith"]("-") ? " " : "";
      return `${a.operator}${c}${b}`;
    }
    prefix(a) {
      if (a.kind === c["Paren"]) {
        let b = a.expression;
        return b && (b.kind === c["Name"] || b.kind === c["Index"]) ? this.prefix(b) : `(${this.expression(b)})`;
      }
      let b = this.expression(a);
      return d["PREFIXES"].has(a.kind) ? b : `(${b})`;
    }
    "Vt"(a) {
      let b = a.index;
      return b && b.kind === c["String"] && d.y(b.value) ? `${this.prefix(a.base)}.${b.value}` : `${this.prefix(a.base)}[${this.expression(b)}]`;
    }
    arguments(a) {
      let b = a || [];
      if (!b.length) return "()";
      let c = `(${this["F"](b)})`;
      if (b.length < 2 || c.includes(`\n`) || this.fits(c)) return c;
      let d = this.hug(b);
      if (d) return d;
      let e = this.inner(),
        f = this.options.indent.repeat(e.depth),
        g = b.map(a => ({
          text: e.expression(a),
          alone: !1
        })),
        h = this.options.indent.repeat(this.depth);
      return `(\n${this.filled(g, f, "").join(`\n`)}\n${h})`;
    }
    hug(a) {
      let b = a[a.length - 1];
      if (b.kind !== c["Table"] && b.kind !== c["Function"]) return null;
      let d = `(${this["F"](a.slice(0, -1))}, `,
        e = this.column + d.length;
      return d.includes(`\n`) || e > this.options.ne ? null : `${d}${this.from(e, () => this.expression(b))})`;
    }
    te(a) {
      let b = (a.params || []).slice();
      a.w && b.push("...");
      let c = `function(${b.join(", ")})`,
        d = this.inner();
      if (d.block(a.body), d.lines.length < 2) {
        let a = d.lines.length ? d.lines[0].trim() : "",
          b = a ? `${c} ${a} end` : `${c} end`;
        if (this.fits(b)) return b;
      }
      let e = this.options.indent.repeat(this.depth),
        f = d.lines.length ? `\n${d.lines.join(`\n`)}` : "";
      return `${c}${f}\n${e}end`;
    }
    filled(a, b, c = ",") {
      let d = [],
        e = "",
        f = () => {
          e && d.push(e), e = "";
        };
      return a["forEach"]((g, h) => {
        let i = h === a.length - 1 ? c : ",",
          j = `${b}${g.text}${i}`,
          k = e ? `${e} ${g.text}${i}` : j;
        g.alone ? (f(), d.push(j)) : e && k.length > this.options.ne ? (f(), e = j) : e = k;
      }), f(), d;
    }
    "Kt"(a) {
      let b = a.entries || [];
      if (b.length === 0) return "{}";
      let c = `{ ${b.map(a => this["Nn"](a, !1)).join(", ")} }`;
      if (!f.record(b) && this.fits(c)) return c;
      let d = this.inner(),
        e = b.map(a => {
          let b = d["Nn"](a, !0);
          return {
            text: b,
            alone: a.type === "key" || b.includes(`\n`)
          };
        }),
        g = this.options.indent.repeat(d.depth),
        h = this.options.indent.repeat(this.depth);
      return `{\n${this.filled(e, g).join(`\n`)}\n${h}}`;
    }
    "Nn"(a) {
      if (a.type === "key") {
        let b = a.key,
          e = b.kind === c["String"] && d.y(b.value) ? `${b.value} = ` : `[${this.expression(b)}] = `;
        return this.after(e, () => this.expression(a.value));
      }
      return this.expression(a.value);
    }
  };
  function n(a, b) {
    let d = new m(b);
    if (!a) return "";
    if (a.kind === c["Chunk"]) d.block(a.body);else if (a.kind === c["Block"]) d.block(a);else {
      if (a.kind && e().kn(a)) return d.expression(a);
      d.statement(a);
    }
    return d["toString"]();
  }
  b.exports = {
    unparse: n
  };
});
var j = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    d = 0,
    f = class {
      constructor(a, b, c = {}) {
        d += 1, this.id = d, this.name = a, this.kind = b, this.declaration = c.declaration || null, this.l = c.l || 0, this.reads = [], this.writes = [], this.initializer = c.initializer || null, this.captured = !1;
      }
      get ci() {
        return this.writes.length + (this.initializer ? 1 : 0);
      }
      get fi() {
        return this.writes.length === 0;
      }
    },
    g = class {
      constructor(a, b) {
        this.parent = a, this.l = b, this.bindings = new Map();
      }
      declare(a, b, c) {
        let d = new f(a, b, {
          ...c,
          l: this.l
        });
        return this.bindings.set(a, d), d;
      }
      lookup(a) {
        let b = this;
        for (; b;) {
          let c = b.bindings.get(a);
          if (c) return c;
          b = b.parent;
        }
        return null;
      }
    },
    h = class {
      constructor() {
        this.globals = new Map(), this["Cn"] = [], this.l = 0;
      }
      global(a) {
        let b = this.globals.get(a);
        return b || (b = new f(a, "global", {}), this.globals.set(a, b), this["Cn"].push(b)), b;
      }
      declare(a, b, c, d) {
        let e = a.declare(b, c, d);
        return this["Cn"].push(e), e;
      }
      reference(a, b, c) {
        let d = a.lookup(b.name) || this.global(b.name);
        return b.binding = d, d.l !== void 0 && d.kind !== "global" && d.l < this.l && (d.captured = !0), c === "write" ? d.writes.push(b) : d.reads.push(b), d;
      }
      block(a, b) {
        let c = new g(b, this.l);
        a.scope = c;
        for (let b of a.statements) this.statement(b, c);
        return c;
      }
      statement(a, b) {
        switch (a.kind) {
          case c["LocalDeclaration"]:
            {
              for (let c of a.expressions) this.expression(c, b);
              a.bindings = a.names.map(c => this.declare(b, c, "local", {
                declaration: a,
                initializer: a
              }));
              return;
            }
          case c["LocalFunction"]:
            {
              let c = this.declare(b, a.name, "local", {
                declaration: a,
                initializer: a
              });
              a.binding = c, this.te(a.body, b);
              return;
            }
          case c["FunctionDeclaration"]:
            this.expression(a.target, b, "write"), this.te(a.body, b);
            return;
          case c["Assignment"]:
            for (let c of a.expressions) this.expression(c, b);
            for (let c of a.targets) this.expression(c, b, "write");
            return;
          case c["CallStatement"]:
            this.expression(a.expression, b);
            return;
          case c["Return"]:
            for (let c of a.expressions) this.expression(c, b);
            return;
          case c["Break"]:
          case c["Continue"]:
          case c["Goto"]:
          case c["Label"]:
            return;
          case c["Do"]:
            this.block(a.body, b);
            return;
          case c["While"]:
            this.expression(a.condition, b), this.block(a.body, b);
            return;
          case c["Repeat"]:
            {
              let c = new g(b, this.l);
              a.body.scope = c;
              for (let b of a.body.statements) this.statement(b, c);
              this.expression(a.condition, c);
              return;
            }
          case c["If"]:
            {
              this.expression(a.condition, b), this.block(a.body, b);
              for (let c of a.s || []) this.expression(c.condition, b), this.block(c.body, b);
              a.e && this.block(a.e, b);
              return;
            }
          case c["NumericFor"]:
            {
              this.expression(a.start, b), this.expression(a.limit, b), a.step && this.expression(a.step, b);
              let c = new g(b, this.l);
              a.binding = this.declare(c, a.variable, "local", {
                declaration: a
              }), a.body.scope = c;
              for (let b of a.body.statements) this.statement(b, c);
              return;
            }
          case c["GenericFor"]:
            {
              for (let c of a.expressions) this.expression(c, b);
              let c = new g(b, this.l);
              a.bindings = a.variables.map(b => this.declare(c, b, "local", {
                declaration: a
              })), a.body.scope = c;
              for (let b of a.body.statements) this.statement(b, c);
              return;
            }
          default:
            throw new Error(`unsupported statement: ${a.kind}`);
        }
      }
      te(a, b) {
        this.l += 1;
        let c = new g(b, this.l);
        a.bindings = (a.params || []).map(b => this.declare(c, b, "param", {
          declaration: a
        })), a.body.scope = c;
        for (let b of a.body.statements) this.statement(b, c);
        this.l -= 1;
      }
      expression(a, b, d = "read") {
        if (a) switch (a.kind) {
          case c["Name"]:
            this.reference(b, a, d);
            return;
          case c["Index"]:
            this.expression(a.base, b), this.expression(a.index, b);
            return;
          case c["Call"]:
            this.expression(a.base, b);
            for (let c of a.args) this.expression(c, b);
            return;
          case c["MethodCall"]:
            this.expression(a.base, b);
            for (let c of a.args) this.expression(c, b);
            return;
          case c["Function"]:
            this.te(a, b);
            return;
          case c["Table"]:
            for (let c of a.entries) c.key && this.expression(c.key, b), this.expression(c.value, b);
            return;
          case c["Binary"]:
            this.expression(a.lhs, b), this.expression(a.rhs, b);
            return;
          case c["Unary"]:
            this.expression(a.argument, b);
            return;
          case c["Paren"]:
            this.expression(a.expression, b);
            return;
          default:
            return;
        }
      }
    };
  function i(a) {
    let b = new h(),
      d = new g(null, 0);
    b["Te"] = d;
    let e = a.kind === c["Chunk"] ? a.body : a;
    return b.block(e, d), b;
  }
  function j(a) {
    return !a || a.kind !== c["Name"] ? !1 : !a.binding || a.binding.kind === "global";
  }
  function k(a) {
    return !!a && a.kind !== "global";
  }
  b.exports = {
    resolve: i,
    "Scope": g,
    "D": j,
    c: k
  };
});
var k = a((a, b) => {
  "use strict";

  var {
    "Kind": c
  } = e();
  function d(a) {
    if (!a || !a.statements.length) return null;
    let b = a.statements[a.statements.length - 1];
    if (b.kind !== c["Return"] || b.expressions.length !== 1) return null;
    let d = b.expressions[0];
    if (!d || d.kind !== c["Call"]) return null;
    let e = d.base;
    for (; e && e.kind === c["Paren"];) e = e.expression;
    if (!e || e.kind !== c["Function"] || (e.params || []).length !== 0) return null;
    for (let a of d.args) if (a.kind !== c["Vararg"]) return null;
    return d.args.length > 1 ? null : e;
  }
  function f(a) {
    let b = 0;
    for (;;) {
      let c = a.chunk.body,
        e = d(c);
      if (!e || (c.statements.splice(c.statements.length - 1, 1, ...e.body.statements), b += 1, b > 64)) break;
    }
    b && (a.note(`removed ${b} WrapInFunction layer(s)`, b), a.bump("unwrap.layers", b));
  }
  b.exports = {
    name: "01-wrap",
    run: f,
    "Ht": d
  };
});
var l = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    d = {
      [c["Chunk"]]: {
        body: "node"
      },
      [c["Block"]]: {
        statements: "list"
      },
      [c["LocalDeclaration"]]: {
        expressions: "list"
      },
      [c["LocalFunction"]]: {
        body: "node"
      },
      [c["FunctionDeclaration"]]: {
        target: "node",
        body: "node"
      },
      [c["Assignment"]]: {
        targets: "list",
        expressions: "list"
      },
      [c["CallStatement"]]: {
        expression: "node"
      },
      [c["Return"]]: {
        expressions: "list"
      },
      [c["Break"]]: {},
      [c["Continue"]]: {},
      [c["Goto"]]: {},
      [c["Label"]]: {},
      [c["Do"]]: {
        body: "node"
      },
      [c["While"]]: {
        condition: "node",
        body: "node"
      },
      [c["Repeat"]]: {
        body: "node",
        condition: "node"
      },
      [c["If"]]: {
        condition: "node",
        body: "node",
        s: "clauses",
        e: "node"
      },
      [c["NumericFor"]]: {
        start: "node",
        limit: "node",
        step: "node",
        body: "node"
      },
      [c["GenericFor"]]: {
        expressions: "list",
        body: "node"
      },
      [c["Nil"]]: {},
      [c["True"]]: {},
      [c["False"]]: {},
      [c["Number"]]: {},
      [c["String"]]: {},
      [c["Vararg"]]: {},
      [c["Name"]]: {},
      [c["Function"]]: {
        body: "node"
      },
      [c["Table"]]: {
        entries: "entries"
      },
      [c["Binary"]]: {
        lhs: "node",
        rhs: "node"
      },
      [c["Unary"]]: {
        argument: "node"
      },
      [c["Index"]]: {
        base: "node",
        index: "node"
      },
      [c["Call"]]: {
        base: "node",
        args: "list"
      },
      [c["MethodCall"]]: {
        base: "node",
        args: "list"
      },
      [c["Paren"]]: {
        expression: "node"
      }
    },
    f = {};
  for (let a of Object.keys(d)) f[a] = Object.entries(d[a]);
  var g = [];
  function h(a) {
    let b = a ? f[a.kind] : null;
    if (!b || b.length === 0) return g;
    let c = [];
    for (let d = 0; d < b.length; d += 1) {
      let e = b[d][0],
        f = a[e];
      if (f == null) continue;
      let g = b[d][1];
      if (g === "node") c.push({
        parent: a,
        key: e,
        index: null,
        node: f
      });else if (g === "list") for (let b = 0; b < f.length; b += 1) c.push({
        parent: a,
        key: e,
        index: b,
        node: f[b]
      });else if (g === "clauses") for (let a = 0; a < f.length; a += 1) {
        let b = f[a];
        c.push({
          parent: b,
          key: "condition",
          index: null,
          node: b.condition
        }), c.push({
          parent: b,
          key: "body",
          index: null,
          node: b.body
        });
      } else for (let a = 0; a < f.length; a += 1) {
        let b = f[a];
        b.key && c.push({
          parent: b,
          key: "key",
          index: null,
          node: b.key
        }), c.push({
          parent: b,
          key: "value",
          index: null,
          node: b.value
        });
      }
    }
    return c;
  }
  function i(a) {
    let b = a ? f[a.kind] : null;
    if (!b || b.length === 0) return g;
    let c = [];
    for (let d = 0; d < b.length; d += 1) {
      let e = a[b[d][0]];
      if (e == null) continue;
      let f = b[d][1];
      if (f === "node") c.push(e);else if (f === "list") for (let a = 0; a < e.length; a += 1) c.push(e[a]);else if (f === "clauses") for (let a = 0; a < e.length; a += 1) c.push(e[a].condition), c.push(e[a].body);else for (let a = 0; a < e.length; a += 1) e[a].key && c.push(e[a].key), c.push(e[a].value);
    }
    return c;
  }
  function j(a) {
    return a.enter && a.enter.length > 1 || a.leave && a.leave.length > 1;
  }
  function k(a, b) {
    if (!a || !a.kind || b.enter && b.enter(a) === !1) return;
    let c = i(a);
    for (let a = 0; a < c.length; a += 1) k(c[a], b);
    b.leave(a);
  }
  function l(a, b) {
    if (b.leave) {
      k(a, b);
      return;
    }
    let c = b.enter;
    if (!c) return;
    let d = [a],
      e = 1;
    for (; e > 0;) {
      e -= 1;
      let a = d[e];
      if (!a || !a.kind || c(a) === !1) continue;
      let b = f[a.kind];
      if (b) for (let c = b.length - 1; c >= 0; c -= 1) {
        let f = a[b[c][0]];
        if (f == null) continue;
        let g = b[c][1];
        if (g === "node") d[e] = f, e += 1;else if (g === "list") for (let a = f.length - 1; a >= 0; a -= 1) d[e] = f[a], e += 1;else if (g === "clauses") for (let a = f.length - 1; a >= 0; a -= 1) d[e] = f[a].body, e += 1, d[e] = f[a].condition, e += 1;else for (let a = f.length - 1; a >= 0; a -= 1) d[e] = f[a].value, e += 1, f[a].key && (d[e] = f[a].key, e += 1);
      }
    }
  }
  function m(a, b) {
    let d = [a],
      e = [null],
      g = 1;
    for (; g > 0;) {
      g -= 1;
      let a = d[g],
        h = e[g];
      if (!a || !a.kind) continue;
      if (b(a, h), a.kind === c["Block"]) {
        let b = a.statements,
          c = h ? h.depth + 1 : 1;
        for (let f = b.length - 1; f >= 0; f -= 1) d[g] = b[f], e[g] = {
          block: a,
          at: f,
          up: h,
          depth: c
        }, g += 1;
        continue;
      }
      let i = f[a.kind];
      if (i) for (let b = i.length - 1; b >= 0; b -= 1) {
        let c = a[i[b][0]];
        if (c == null) continue;
        let f = i[b][1];
        if (f === "node") d[g] = c, e[g] = h, g += 1;else if (f === "list") for (let a = c.length - 1; a >= 0; a -= 1) d[g] = c[a], e[g] = h, g += 1;else if (f === "clauses") for (let a = c.length - 1; a >= 0; a -= 1) d[g] = c[a].body, e[g] = h, g += 1, d[g] = c[a].condition, e[g] = h, g += 1;else for (let a = c.length - 1; a >= 0; a -= 1) d[g] = c[a].value, e[g] = h, g += 1, c[a].key && (d[g] = c[a].key, e[g] = h, g += 1);
      }
    }
  }
  function n(a, b, c = null) {
    if (c === null && !j(b)) {
      l(a, b);
      return;
    }
    if (!a || !a.kind || b.enter && b.enter(a, c) === !1) return;
    let d = h(a);
    for (let a = 0; a < d.length; a += 1) n(d[a].node, b, d[a]);
    b.leave && b.leave(a, c);
  }
  function o(a, b) {
    if (!a || !a.kind) return a;
    let c = h(a);
    for (let a = 0; a < c.length; a += 1) {
      let d = c[a],
        e = o(d.node, b);
      e !== d.node && (d.index === null ? d.parent[d.key] = e : d.parent[d.key][d.index] = e);
    }
    let d = b(a);
    return d === void 0 ? a : d;
  }
  function p(a, b) {
    let c = [];
    return n(a, {
      enter(a) {
        b(a) && c.push(a);
      }
    }), c;
  }
  b.exports = {
    "CHILDREN": d,
    children: h,
    framed: m,
    walk: n,
    transform: o,
    collect: p
  };
});
var m = a((a, b) => {
  "use strict";

  var {
      "Kind": c,
      unparen: d
    } = e(),
    {
      walk: f,
      children: g,
      collect: h
    } = l(),
    i = a => !!a && a.kind === c["Name"],
    j = a => {
      let b = d(a);
      return i(b) && b.binding || null;
    };
  function k(a) {
    let b = new Map();
    return f(a, {
      enter(a, c) {
        c && b.set(a, c.parent);
      }
    }), b;
  }
  function m(a) {
    let b = new Map(),
      d = new Map(),
      e = (a, c) => {
        if (!a) return;
        let e = b.get(a) || [];
        e.push(c || null), b.set(a, e);
        let f = c ? j(c) : null;
        if (!f) return;
        let g = d.get(f) || [];
        g.push(a), d.set(f, g);
      };
    return f(a, {
      enter(a) {
        if (a.kind === c["Assignment"]) {
          let b = a.targets || [],
            c = a.expressions || [],
            d = b.length === c.length;
          b["forEach"]((a, b) => {
            e(j(a), d ? c[b] : null);
          });
        } else if (a.kind === c["LocalDeclaration"]) {
          let b = a.expressions || [];
          if (!b.length) return;
          let c = b.length === (a.names || []).length;
          (a.bindings || [])["forEach"]((a, d) => {
            e(a, c ? b[d] : null);
          });
        } else if (a.kind === c["LocalFunction"]) e(a.binding, a.body);else if (a.kind === c["NumericFor"]) e(a.binding, null);else if (a.kind === c["GenericFor"]) for (let b of a.bindings || []) e(b, null);
      }
    }), {
      writes: b,
      moves: d
    };
  }
  function n(a, b) {
    if (!b || !a) return null;
    b.carriers || (b.carriers = new Map());
    let c = b.carriers.get(a);
    if (c) return c;
    let d = new Set([a]),
      e = [a];
    for (; e.length;) {
      let a = e.pop();
      for (let c of b.moves.get(a) || []) d.has(c) || (d.add(c), e.push(c));
    }
    return b.carriers.set(a, d), d;
  }
  function o(a, b, c) {
    if (!a) return !1;
    if (a === b) return !0;
    let d = n(b, c);
    return !!d && d.has(a);
  }
  function p(a, b, c) {
    return o(j(a), b, c);
  }
  function q(a, b) {
    return a ? c => o(j(c), a, b) : () => !1;
  }
  function r(a, b) {
    let c = [...a].filter(Boolean);
    return c.length ? a => {
      let d = j(a);
      return d ? c.some(a => o(d, a, b)) : !1;
    } : () => !1;
  }
  function s(a, b, c, e = new Set()) {
    let f = d(a);
    if (!f) return !1;
    if (f.kind === b) return !0;
    let g = j(f);
    if (!g || !c || e.has(g)) return !1;
    e.add(g);
    for (let a of c.writes.get(g) || []) if (a && s(a, b, c, e)) return !0;
    return !1;
  }
  function t(a, b) {
    let c = a;
    for (let a = 0; b && c && a < 8 && (c.reads || []).length === 1; a += 1) {
      let a = b.moves.get(c) || [];
      if (a.length !== 1) break;
      let d = b.writes.get(a[0]) || [];
      if (d.length !== 1 || !d[0]) break;
      c = a[0];
    }
    return c;
  }
  function u(a, b) {
    let c = a;
    for (let a = 0; b && c && a < 8; a += 1) {
      let a = b.writes.get(c) || [];
      if (a.length !== 1 || !a[0]) break;
      let d = j(a[0]);
      if (!d || d === c) break;
      c = d;
    }
    return c;
  }
  var v = [["env", ["getfenv", "_ENV", "getfenv2"]], ["unpack", ["unpack"]], ["newproxy", ["newproxy"]], ["setmetatable", ["setmetatable"]], ["getmetatable", ["getmetatable"]], ["select", ["select"]]];
  function w(a) {
    let b = new Set();
    return f(a, {
      enter(a) {
        a.kind === c["Name"] && a.binding && a.binding.kind === "global" && b.add(a.binding.name);
      }
    }), b;
  }
  function x(a) {
    let b = d(a);
    if (!b) return null;
    if (b.kind === c["Table"]) return "varargs";
    let e = w(b);
    for (let [a, b] of v) for (let c of b) if (e.has(c)) return a;
    return e.has("table") ? "unpack" : null;
  }
  function y(a, b) {
    let c = x(a);
    if (c) return c;
    let e = j(d(a));
    if (!e || !b) return null;
    let f = new Set([e]),
      g = [e];
    for (; g.length;) {
      let a = g.shift(),
        c = b.writes.get(a) || [];
      for (let a = c.length - 1; a >= 0; a -= 1) {
        let b = c[a];
        if (!b) continue;
        let d = x(b);
        if (d) return d;
        let e = j(b);
        e && !f.has(e) && (f.add(e), g.push(e));
      }
    }
    return null;
  }
  function z(a) {
    if (!a || !a.w) return !1;
    let b = !1;
    return f(a.body, {
      enter(a) {
        if (b || a.kind === c["Function"]) return !1;
        a.kind === c["Vararg"] && (b = !0);
      }
    }), b;
  }
  function aa(a) {
    let b = d(a);
    return !b || b.kind !== c["Table"] ? !1 : (b.entries || []).some(a => !a.key && a.value && d(a.value).kind === c["Vararg"]);
  }
  function ab(a, b) {
    if (!a || a.kind !== c["Function"] || z(a) || !a.params || a.params.length !== 4 || !a.bindings) return null;
    let e = a.body.statements;
    if (e.length < 2) return null;
    let f = new Set([a.bindings[0]]);
    for (let c of b && b.moves.get(a.bindings[0]) || []) f.add(c);
    let g = -1;
    for (let a = 0; a < e.length; a += 1) {
      let b = e[a];
      if (b.kind === c["While"] && f.has(j(b.condition))) {
        g = a;
        break;
      }
    }
    if (g < 0) return null;
    let h = j(e[g].condition),
      i = new Set(),
      k = [],
      l = null;
    for (let a = 0; a < g; a += 1) {
      let b = e[a];
      if (b.kind === c["LocalDeclaration"] && b.bindings) {
        let a = b.expressions || [];
        for (let e = 0; e < b.bindings.length; e += 1) {
          let f = b.bindings[e];
          i.add(f);
          let g = d(a[e]);
          g && g.kind === c["Table"] ? l = f : k.push(f);
        }
        continue;
      }
      if (b.kind === c["Assignment"]) {
        let a = b.targets || [],
          e = b.expressions || [];
        if (a.length !== e.length) return null;
        for (let b = 0; b < a.length; b += 1) {
          let f = j(a[b]);
          if (!f || !i.has(f)) return null;
          let g = d(e[b]);
          g && g.kind === c["Table"] && (l = f);
        }
        continue;
      }
      return null;
    }
    let m = e[e.length - 1];
    if (!m || m.kind !== c["Return"] || m.expressions.length !== 1) return null;
    let n = d(m.expressions[0]);
    if (!n || n.kind !== c["Call"] || n.args.length !== 1) return null;
    let o = j(n.base),
      p = j(n.args[0]);
    if (!o || !p) return null;
    let q = t(a.bindings[1], b),
      r = t(a.bindings[2], b),
      s = t(a.bindings[3], b),
      u = new Set([l, q, r, s]);
    return {
      fn: a,
      dispatch: e[g],
      registers: k.filter(a => !u.has(a)),
      spill: l,
      "Fn": o,
      "Yt": p,
      pos: h,
      args: q,
      upvals: r,
      qn: s
    };
  }
  function ac(a, b, e) {
    if (!a || a.kind !== c["Function"] || z(a) || !a.params || a.params.length !== 2 || !a.bindings) return null;
    let [g, h] = a.bindings,
      i = null;
    if (f(a.body, {
      enter(a) {
        if (a.kind !== c["Function"]) return;
        let f = a.body.statements,
          j = f[f.length - 1];
        if (!j || j.kind !== c["Return"] || j.expressions.length !== 1) return;
        let k = d(j.expressions[0]);
        if (!(!k || k.kind !== c["Call"] || k.args.length !== 4) && p(k.base, b, e) && p(k.args[0], g, e) && p(k.args[2], h, e) && s(k.args[1], c["Table"], e)) return i = {
          inner: a,
          table: k.args[1],
          di: k.args[3]
        }, !1;
      }
    }), !i) return null;
    let k = null;
    return f(a.body, {
      enter(a) {
        if (k) return !1;
        a.kind !== c["Call"] || a.args.length !== 1 || p(a.args[0], h, e) && (k = j(a.base));
      }
    }), {
      fn: a,
      arity: (i.inner.params || []).length,
      vararg: aa(i.table),
      "_e": k
    };
  }
  function ad(a) {
    if (!a || a.kind !== c["Function"] || z(a) || (a.params || []).length !== 0) return null;
    let b = a.body.statements;
    if (b.length !== 3) return null;
    let [e, f, g] = b;
    if (e.kind !== c["Assignment"] || e.targets.length !== 1) return null;
    let h = j(e.targets[0]);
    if (!h) return null;
    let i = d(e.expressions[0]);
    if (!i || i.kind !== c["Binary"] || i.operator !== "+" || ![j(i.lhs), j(i.rhs)].includes(h) || f.kind !== c["Assignment"] || f.targets.length !== 1) return null;
    let k = d(f.targets[0]);
    if (!k || k.kind !== c["Index"] || j(k.index) !== h) return null;
    let l = j(k.base);
    return !l || g.kind !== c["Return"] || j(g.expressions[0]) !== h ? null : {
      counter: h,
      refs: l
    };
  }
  function ae(a, b, e) {
    let g = [];
    f(a, {
      enter(a) {
        if (a.kind === c["Assignment"] && a.expressions.every(a => d(a).kind === c["Nil"])) for (let b of a.targets || []) {
          let a = d(b);
          if (!a || a.kind !== c["Index"]) continue;
          let f = u(j(a.base), e),
            h = j(a.index);
          f && h && g.push({
            base: f,
            key: h
          });
        }
      }
    });
    let h = new Set();
    for (let a of g) a.base === b && h.add(a.key);
    for (let a of g) if (a.base !== b && h.has(a.key)) return a.base;
    return null;
  }
  function af(a, b, e) {
    let g = new Set();
    for (let h of a) {
      let a = !1;
      if (f(h.body, {
        enter(e) {
          if (e.kind === c["Assignment"]) for (let f of e.targets || []) {
            let e = d(f);
            e && e.kind === c["Index"] && b(e.base) && (a = !0);
          }
        }
      }), !a) continue;
      let i = ah(h, e);
      i && g.add(i);
    }
    return g;
  }
  function ag(a, b) {
    let d = a,
      e = b.get(d);
    for (; e && e.kind === c["Paren"];) d = e, e = b.get(d);
    return {
      node: d,
      parent: e
    };
  }
  function ah(a, b) {
    let {
      node: d,
      parent: e
    } = ag(a, b);
    if (!e) return null;
    if (e.kind === c["Assignment"]) {
      let a = e.expressions["indexOf"](d);
      return a < 0 ? null : j(e.targets[a]);
    }
    if (e.kind === c["LocalDeclaration"]) {
      let a = e.expressions["indexOf"](d);
      return a < 0 || !e.bindings ? null : e.bindings[a] || null;
    }
    return e.kind === c["LocalFunction"] && e.binding || null;
  }
  function ai(a, b) {
    let d = b.get(a);
    for (; d;) {
      if (d.kind === c["Function"]) return d;
      d = b.get(d);
    }
    return null;
  }
  function aj(a) {
    let b = new Set();
    return f(a, {
      enter(a) {
        b.add(a);
      }
    }), b;
  }
  function ak(a, b) {
    let d = [];
    return f(a, {
      enter(e) {
        if (e === b) return !1;
        e.kind === c["Function"] && e !== a && d.push(e);
      }
    }), d;
  }
  function al(a, b) {
    let d = a,
      e = b.get(d);
    for (; e && e.kind !== c["Block"];) d = e, e = b.get(d);
    if (!e) return null;
    let f = e.statements["indexOf"](d);
    return f < 0 ? null : {
      block: e,
      index: f
    };
  }
  function am(a, b, c, d) {
    if (!a || !b || a.block !== b.block || b.index <= a.index) return !1;
    for (let e of c && c.writes || []) {
      let c = al(e, d);
      if (!(!c || c.block !== a.block) && c.index > a.index && c.index < b.index) return !1;
    }
    return !0;
  }
  function an(a, b, e) {
    let f = null;
    for (let g of a.reads || []) {
      let {
        node: h,
        parent: i
      } = ag(g, e);
      if (!i || i.kind !== c["Call"] || d(i.base) !== h) continue;
      let j = al(g, e);
      am(b, j, a, e) && (!f || j.index < f.index) && (f = {
        call: i,
        index: j.index
      });
    }
    return f ? f.call : null;
  }
  function ao(a, b) {
    let c = [],
      d = new Set([a]),
      e = [a];
    for (; e.length && c.length < 16;) {
      let a = e.pop();
      for (let f of b && b.moves.get(a) || []) d.has(f) || (d.add(f), (b.writes.get(f) || []).length === 1 && (c.push(f), e.push(f)));
    }
    return c;
  }
  function ap(a, b, c) {
    let d = b && b.writes.get(a) || [];
    return d.length !== 1 || !d[0] ? null : al(d[0], c);
  }
  function aq(a, b, e) {
    let {
      parent: f
    } = ag(a, b);
    if (f && f.kind === c["Call"] && d(f.base) === a) return f;
    let g = ah(a, b);
    if (!g) return null;
    let h = al(a, b);
    if (!h) return null;
    let i = an(g, h, b);
    if (i) return i;
    for (let a of ao(g, e)) {
      let c = ap(a, e, b),
        d = c ? an(a, c, b) : null;
      if (d) return d;
    }
    return null;
  }
  function ar(a) {
    let b = new Map();
    return f(a, {
      enter(a) {
        if (a.kind !== c["Index"]) return;
        let d = j(a.base);
        d && b.set(d, (b.get(d) || 0) + 1);
      }
    }), b;
  }
  function as(a, b) {
    let c = new Set([a.spill, a.pos, a.args, a.upvals, a.qn, ...a.registers, ...(a.fn.bindings || [])]),
      d = null,
      e = 0;
    for (let [f, g] of ar(a.fn)) c.has(f) || b.has(f) || g > e && (d = f, e = g);
    return d;
  }
  function at(a, b, e) {
    let g = ai(a.fn, b);
    if (!g) return {
      ok: !1,
      reason: "container is not wrapped"
    };
    let h = aq(g, b, e);
    if (!h) return {
      ok: !1,
      reason: "wrapper is not invoked"
    };
    let i = ah(a.fn, b);
    if (!i) return {
      ok: !1,
      reason: "container is not bound to a name"
    };
    let k = {};
    for (let a = 0; a < h.args.length; a += 1) {
      let b = y(h.args[a], e),
        c = (g.bindings || [])[a];
      b && c && !k[b] && (k[b] = t(c, e));
    }
    !k.unpack && a["Fn"] && (k.unpack = a["Fn"]);
    let l = ak(g, a.fn),
      m = new Map(),
      n = new Set(),
      p = null,
      s = null;
    for (let a of l) {
      let c = ac(a, i, e);
      if (c) {
        n.add(a);
        let d = ah(a, b);
        d && (m.set(d, c), c["_e"] && (s = c["_e"]));
        continue;
      }
      if (!p) {
        let c = ad(a);
        c && (p = {
          alloc: ah(a, b),
          counter: c.counter,
          refs: c.refs,
          table: ae(g, c.refs, e)
        });
      }
    }
    if (m.size === 0) return {
      ok: !1,
      reason: "no closure creator"
    };
    p && (p["Xt"] = q(p.alloc, e), p["Zt"] = q(p.table, e), p["Mn"] = q(p.refs, e), p.helpers = af(l.filter(a => !n.has(a)), p["Mn"], b), p["Jt"] = r(p.helpers, e)), a["Qt"] = q(a.upvals, e);
    let u = a => {
      let b = j(a);
      if (!b) return null;
      let c = m.get(b);
      if (c) return c;
      for (let [a, c] of m) if (o(b, a, e)) return c;
      return null;
    };
    if (!k.env) {
      let b = new Set([...Object.values(k), ...m.keys(), s, p && p.alloc, p && p.counter, p && p.refs, p && p.table]);
      k.env = as(a, b);
    }
    if (!k.env) return {
      ok: !1,
      reason: "no environment argument"
    };
    let v = null,
      w = aj(a.fn);
    return f(g, {
      enter(a) {
        if (v || w.has(a)) return !1;
        if (a.kind !== c["Call"]) return;
        let b = d(a.base);
        if (!b || b.kind !== c["Call"]) return;
        let e = j(b.base),
          f = u(b.base);
        if (!f) return;
        let g = d(b.args[0]);
        if (!(!g || g.kind !== c["Number"])) return v = {
          "O": g.value,
          gi: e,
          vararg: f.vararg,
          arity: f.arity,
          er: b.args[1] || null,
          call: a
        }, !1;
      }
    }), v ? {
      ok: !0,
      vm: {
        wrapper: g,
        fe: h,
        container: a,
        nr: i,
        roles: k,
        creators: m,
        "T": u,
        upvalues: p,
        "_e": s,
        entry: v
      }
    } : {
      ok: !1,
      reason: "no entry closure"
    };
  }
  function au(a) {
    let b = k(a),
      d = m(a),
      e = [],
      f = [];
    for (let g of h(a, a => a.kind === c["Function"])) {
      let a = ab(g, d);
      if (!a) continue;
      let c = at(a, b, d);
      c.ok ? e.push(c.vm) : f.push({
        fn: g,
        reason: c.reason
      });
    }
    return {
      instances: e,
      rejected: f,
      parents: b
    };
  }
  b.exports = {
    unparen: d,
    de: j,
    tr: k,
    carries: p,
    detect: au
  };
});
var n = a((a, b) => {
  "use strict";

  var c = 0,
    d = [],
    e = {
      meta: !0
    };
  function f() {
    return c += 1, c;
  }
  function g(a, b, c) {
    for (let f = 0; f < d.length; f += 1) {
      let g = d[f];
      if (g.writes && g.writes.add(b), a <= g.since && (g.escaped = !0, g.older && g.last !== b && (g.last = b, g.older.add(b))), g.slots && c !== void 0) {
        let a = g.slots.get(b);
        a || (a = new Map(), g.slots.set(b, a)), a.has(c) || a.set(c, c === e ? b.metatable : b.map.get(c));
      }
      !g.saved || g.saved.has(b) || (b && b.map ? g.tables.add(b) : b && g.saved.set(b, b.value));
    }
  }
  function h(a) {
    for (let [b, c] of a.saved) b.value = c;
    for (let [b, c] of a.slots) for (let [a, d] of c) a === e ? b.metatable = d : d === void 0 ? b.map.delete(a) : b.map.set(a, d);
    a.saved.clear(), a.slots.clear();
  }
  function i(a) {
    for (let [b, c] of a.saved) b.value = c;
    a.saved.clear(), a.slots.clear();
  }
  function j(a) {
    let b = {
      since: c,
      escaped: !1,
      value: void 0,
      saved: new Map(),
      tables: new Set(),
      slots: new Map()
    };
    d.push(b);
    try {
      b.value = a();
    } catch (a) {
      throw d.pop(), h(b), a;
    }
    return d.pop(), b;
  }
  function k(a) {
    let b = {
      since: c,
      escaped: !1,
      older: new Set(),
      last: null
    };
    d.push(b);
    try {
      return {
        value: a(),
        escaped: b.escaped,
        older: b.older
      };
    } finally {
      d.pop();
    }
  }
  function l(a) {
    let b = {
      since: -1,
      escaped: !1,
      writes: new Set()
    };
    d.push(b);
    try {
      return {
        value: a(),
        writes: b.writes
      };
    } finally {
      d.pop();
    }
  }
  b.exports = {
    "META": e,
    fresh: f,
    touch: g,
    attempt: j,
    undo: h,
    commit: i,
    record: l,
    witness: k
  };
});
var o = a((a, b) => {
  "use strict";

  var c = n(),
    d = class extends Error {
      constructor(a, b) {
        super(typeof a == "string" ? a : "(error object)"), this.name = "LuaError", this.value = a, this.pi = b;
      }
    },
    e = class a {
      constructor() {
        this.map = new Map(), this.metatable = void 0, this.stamp = c.fresh();
      }
      static from(b) {
        let c = new a();
        for (let a = 0; a < b.length; a += 1) c.set(a + 1, b[a]);
        return c;
      }
      static ki(b) {
        let c = new a();
        for (let [a, d] of b) c.set(a, d);
        return c;
      }
      get(a) {
        return typeof a == "number" && Object.is(a, -0) ? this.map.get(0) : this.map.get(a);
      }
      set(a, b) {
        let d = typeof a == "number" && Object.is(a, -0) ? 0 : a;
        c.touch(this.stamp, this, d), b === void 0 ? this.map.delete(d) : this.map.set(d, b);
      }
      $n(a) {
        c.touch(this.stamp, this, c["META"]), this.metatable = a;
      }
      length() {
        let a = 0;
        for (; this.map.get(a + 1) !== void 0;) a += 1;
        return a;
      }
      rr() {
        let a = [],
          b = this.length();
        for (let c = 1; c <= b; c += 1) a.push(this.map.get(c));
        return a;
      }
      keys() {
        return [...this.map.keys()];
      }
    },
    f = class {
      constructor(a, b, c) {
        this.node = a, this.closure = b, this.name = c || null;
      }
    },
    g = a => typeof a == "function" || a instanceof f;
  function h(a) {
    if (a == null) return "nil";
    switch (typeof a) {
      case "boolean":
        return "boolean";
      case "number":
        return "number";
      case "string":
        return "string";
      case "function":
        return "function";
      default:
        break;
    }
    return a instanceof e ? "table" : a instanceof f ? "function" : "userdata";
  }
  var i = a => a != null && a !== !1;
  function j(a, b = 14) {
    if (Number["isNaN"](a)) return "nan";
    if (a === 1 / 0) return "inf";
    if (a === -1 / 0) return "-inf";
    if (a === 0) return Object.is(a, -0) ? "-0" : "0";
    let c = Math.floor(Math.log10(Math.abs(a)));
    if (c < -4 || c >= b) {
      let d = (a / 10 ** c).bi(b);
      d.includes(".") && (d = d.replace(/0+$/, "").replace(/\.$/, ""));
      let e = c < 0 ? "-" : "+",
        f = String(Math.abs(c))["padStart"](2, "0");
      return `${d}e${e}${f}`;
    }
    let d = a["Ln"](Math.max(0, b - 1 - c));
    return d.includes(".") && (d = d.replace(/0+$/, "").replace(/\.$/, "")), d;
  }
  function k(a) {
    return Number["isInteger"](a) && Math.abs(a) < 1e15 ? String(a) : j(a);
  }
  function l(a) {
    let b = a.replace(/^[\s\f]+|[\s\f]+$/g, "");
    if (b === "") return;
    if (/^[-+]?0[xX][0-9a-fA-F]+$/.test(b)) {
      let a = b[0] === "-",
        c = b.replace(/^[-+]/, ""),
        d = parseInt(c.slice(2), 16);
      return a ? -d : d;
    }
    if (!/^[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/.test(b)) return;
    let c = Number(b);
    return Number["isNaN"](c) ? void 0 : c;
  }
  function m(a) {
    if (typeof a == "number") return a;
    if (typeof a == "string") return l(a);
  }
  b.exports = {
    "LuaError": d,
    "LuaTable": e,
    "LuaFunction": f,
    "_": g,
    he: h,
    truthy: i,
    sr: j,
    re: k,
    o: m
  };
});
var p = a((a, b) => {
  "use strict";

  var c = o(),
    {
      "LuaError": d,
      "LuaTable": e,
      he: f,
      truthy: g,
      o: h
    } = c,
    i = {
      "+": "__add",
      "-": "__sub",
      "*": "__mul",
      "/": "__div",
      "%": "__mod",
      "^": "__pow",
      "..": "__concat"
    };
  function j(a, b) {
    throw new d(`cannot perform ${a} on ${f(b)}`);
  }
  function k(a, b, c, d) {
    let e = i[b],
      f = a.metamethod(c, e) || a.metamethod(d, e);
    if (f) return a.call(f, [c, d])[0];
    let g = h(c) === void 0 ? c : d;
    return j(`arithmetic (${b})`, g);
  }
  function l(a, b, c, e) {
    let f = h(c),
      g = h(e);
    if (f === void 0 || g === void 0) return k(a, b, c, e);
    switch (b) {
      case "+":
        return f + g;
      case "-":
        return f - g;
      case "*":
        return f * g;
      case "/":
        return f / g;
      case "%":
        return f - Math.floor(f / g) * g;
      case "^":
        return f ** g;
      case "//":
        return Math.floor(f / g);
      default:
        throw new d(`unknown operator '${b}'`);
    }
  }
  function m(a, b) {
    let c = h(b);
    if (c !== void 0) return -c;
    let d = a.metamethod(b, "__unm");
    return d ? a.call(d, [b, b])[0] : j("arithmetic (-)", b);
  }
  function n(a, b) {
    if (typeof b == "string") return b.length;
    let c = a.metamethod(b, "__len");
    return c ? a.call(c, [b])[0] : b instanceof e ? b.length() : j("get length of", b);
  }
  function p(a, b, c) {
    let d = typeof b == "string" || typeof b == "number";
    if (d && (typeof c == "string" || typeof c == "number")) return q(b) + q(c);
    let e = a.metamethod(b, "__concat") || a.metamethod(c, "__concat");
    return e ? a.call(e, [b, c])[0] : j("concatenation", d ? c : b);
  }
  function q(a) {
    return typeof a == "number" ? c.re(a) : a;
  }
  function r(a, b) {
    return a == null ? b == null : a === b;
  }
  function s(a, b, c) {
    if (r(b, c)) return !0;
    if (f(b) !== f(c) || !(b instanceof e) && f(b) !== "userdata") return !1;
    let d = a.metamethod(b, "__eq") || a.metamethod(c, "__eq");
    return d ? g(a.call(d, [b, c])[0]) : !1;
  }
  function t(a, b, c) {
    if (typeof b == "number" && typeof c == "number" || typeof b == "string" && typeof c == "string") return b < c;
    let e = a.metamethod(b, "__lt") || a.metamethod(c, "__lt");
    if (e) return g(a.call(e, [b, c])[0]);
    throw new d(`cannot compare ${f(b)} with ${f(c)}`);
  }
  function u(a, b, c) {
    if (typeof b == "number" && typeof c == "number" || typeof b == "string" && typeof c == "string") return b <= c;
    let e = a.metamethod(b, "__le") || a.metamethod(c, "__le");
    if (e) return g(a.call(e, [b, c])[0]);
    let h = a.metamethod(b, "__lt") || a.metamethod(c, "__lt");
    if (h) return !g(a.call(h, [c, b])[0]);
    throw new d(`cannot compare ${f(b)} with ${f(c)}`);
  }
  function v(a, b, d) {
    if (b instanceof e) {
      let e = b.get(d);
      if (e != null) return e;
      let f = a.metamethod(b, "__index");
      return f ? c["_"](f) ? a.call(f, [b, d])[0] : v(a, f, d) : void 0;
    }
    let f = a.metamethod(b, "__index");
    return f ? c["_"](f) ? a.call(f, [b, d])[0] : v(a, f, d) : j(`index (key '${q(d)}')`, b);
  }
  function w(a, b, f, g) {
    if (b instanceof e) {
      if (b.get(f) === void 0) {
        let d = a.metamethod(b, "__newindex");
        if (d) {
          if (c["_"](d)) {
            a.call(d, [b, f, g]);
            return;
          }
          w(a, d, f, g);
          return;
        }
      }
      if (f == null) throw new d("table index is nil");
      if (typeof f == "number" && Number["isNaN"](f)) throw new d("table index is NaN");
      b.set(f, g);
      return;
    }
    let h = a.metamethod(b, "__newindex");
    if (!h) {
      j(`index (key '${q(f)}')`, b);
      return;
    }
    c["_"](h) ? a.call(h, [b, f, g]) : w(a, h, f, g);
  }
  function x(a, b) {
    let d = a.metamethod(b, "__tostring");
    if (d) return a.call(d, [b])[0];
    let e = f(b);
    switch (e) {
      case "nil":
        return "nil";
      case "boolean":
        return b ? "true" : "false";
      case "number":
        return c.re(b);
      case "string":
        return b;
      default:
        return `${e}: 0x${a["En"](b)}`;
    }
  }
  b.exports = {
    arith: l,
    "Be": m,
    length: n,
    concat: p,
    equals: s,
    ir: r,
    q: t,
    "P": u,
    index: v,
    "Re": w,
    tostring: x,
    stringify: q
  };
});
var q = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    d = e(),
    f = p(),
    g = o(),
    h = {
      metamethod: () => {},
      call() {
        throw new Error("pure eval: calls not allowed");
      },
      "En": () => "0"
    },
    i = Symbol("none");
  function j(a) {
    if (!a) return i;
    switch (a.kind) {
      case c["Nil"]:
        return;
      case c["True"]:
        return !0;
      case c["False"]:
        return !1;
      case c["Number"]:
        return a.value;
      case c["String"]:
        return a.value;
      case c["Paren"]:
        return j(a.expression);
      default:
        return i;
    }
  }
  var k = a => j(a) !== i;
  function l(a) {
    if (!a) return null;
    if (a.kind === c["Paren"]) return l(a.expression);
    if (a.kind === c["Table"] || a.kind === c["Function"]) return !0;
    let b = j(a);
    return b === i ? null : b !== void 0 && b !== !1;
  }
  function m(a) {
    return a == null ? d.nil() : a === !0 ? d.boolean(!0) : a === !1 ? d.boolean(!1) : typeof a == "number" ? d.number(a) : typeof a == "string" ? d.string(a) : null;
  }
  function n(a, b, c) {
    let d = j(b),
      e = j(c);
    if (d === i || e === i) return null;
    try {
      switch (a) {
        case "and":
          return m(g.truthy(d) ? e : d);
        case "or":
          return m(g.truthy(d) ? d : e);
        case "..":
          return typeof d != "string" && typeof d != "number" || typeof e != "string" && typeof e != "number" ? null : m(f.concat(h, d, e));
        case "==":
          return m(f.equals(h, d, e));
        case "~=":
          return m(!f.equals(h, d, e));
        case "<":
          return m(f.q(h, d, e));
        case ">":
          return m(f.q(h, e, d));
        case "<=":
          return m(f["P"](h, d, e));
        case ">=":
          return m(f["P"](h, e, d));
        default:
          return typeof d == "boolean" || typeof e == "boolean" || d === void 0 || e === void 0 ? null : m(f.arith(h, a, d, e));
      }
    } catch {
      return null;
    }
  }
  function q(a, b) {
    let c = j(b);
    if (c === i) return null;
    try {
      switch (a) {
        case "-":
          return typeof c == "boolean" || c === void 0 ? null : m(f["Be"](h, c));
        case "not":
          return m(!g.truthy(c));
        case "#":
          return null;
        default:
          return null;
      }
    } catch {
      return null;
    }
  }
  b.exports = {
    "An": m,
    j: k,
    truthiness: l,
    ur: n,
    lr: q
  };
});
var r = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    {
      transform: d
    } = l(),
    f = q(),
    g = new Set(["+", "-", "*", "/", "%", "^", ".."]),
    h = new Set(["-"]),
    i = new Set([...g, "==", "~=", "<", "<=", ">", ">=", "and", "or"]),
    j = new Set([...h, "not"]);
  function k(a, b = {}) {
    let e = b.binary || g,
      i = b.unary || h,
      j = 0;
    return d(a, a => {
      if (a.kind === c["Binary"]) {
        if (!e.has(a.operator)) return a;
        let b = f.ur(a.operator, a.lhs, a.rhs);
        return b ? (j += 1, b) : a;
      }
      if (a.kind === c["Unary"]) {
        if (!i.has(a.operator)) return a;
        let b = f.lr(a.operator, a.argument);
        return b ? (j += 1, b) : a;
      }
      if (a.kind === c["Paren"]) {
        let b = a.expression;
        return b && f.j(b) ? (j += 1, b) : a;
      }
      return a;
    }), j;
  }
  function m(a) {
    let b = k(a.chunk);
    b && (a.note(`folded ${b} constant expression(s)`, b), a.bump("fold.count", b));
  }
  b.exports = {
    name: "02-fold",
    run: m,
    ar: k,
    "BINARY": i,
    "LOGIC": j
  };
});
var s = a((a, b) => {
  "use strict";

  var {
      "LuaError": c
    } = o(),
    d = "%",
    e = 32,
    f = -1,
    g = -2,
    h = a => a >= 48 && a <= 57,
    i = a => a >= 65 && a <= 90 || a >= 97 && a <= 122,
    j = a => a >= 97 && a <= 122,
    k = a => a >= 65 && a <= 90,
    l = a => a === 32 || a >= 9 && a <= 13,
    m = a => a < 32 || a === 127,
    n = a => a >= 33 && a <= 47 || a >= 58 && a <= 64 || a >= 91 && a <= 96 || a >= 123 && a <= 126,
    p = a => h(a) || a >= 97 && a <= 102 || a >= 65 && a <= 70;
  function q(a, b) {
    let c;
    switch (b["toLowerCase"]()) {
      case "a":
        c = i(a);
        break;
      case "c":
        c = m(a);
        break;
      case "d":
        c = h(a);
        break;
      case "l":
        c = j(a);
        break;
      case "p":
        c = n(a);
        break;
      case "s":
        c = l(a);
        break;
      case "u":
        c = k(a);
        break;
      case "w":
        c = i(a) || h(a);
        break;
      case "x":
        c = p(a);
        break;
      case "z":
        c = a === 0;
        break;
      default:
        return b["charCodeAt"](0) === a;
    }
    return b >= "A" && b <= "Z" ? !c : c;
  }
  var r = class {
    constructor(a, b) {
      this.src = a, this.pattern = b, this.level = 0, this.se = new Array(e).fill(0), this["M"] = new Array(e).fill(0), this.depth = 0;
    }
    error(a) {
      throw new c(a);
    }
    "In"(a) {
      let b = this.pattern,
        c = b[a];
      if (a += 1, c === d) return a >= b.length && this.error("pattern ends with '%'"), a + 1;
      if (c === "[") {
        b[a] === "^" && (a += 1);
        do {
          a >= b.length && this.error("missing ']' in pattern");
          let c = b[a];
          a += 1, c === d && (a >= b.length && this.error("pattern ends with '%'"), a += 1);
        } while (b[a] !== "]");
        return a + 1;
      }
      return a;
    }
    "De"(a, b, c) {
      let e = this.pattern,
        f = !1;
      for (b += 1, e[b] === "^" && (f = !0, b += 1); b < c;) if (e[b] === d) {
        if (b += 1, q(a, e[b])) return !f;
        b += 1;
      } else if (e[b + 1] === "-" && b + 2 < c) {
        if (e["charCodeAt"](b) <= a && a <= e["charCodeAt"](b + 2)) return !f;
        b += 3;
      } else {
        if (e["charCodeAt"](b) === a) return !f;
        b += 1;
      }
      return f;
    }
    "Pe"(a, b, c) {
      if (a >= this.src.length) return !1;
      let e = this.src["charCodeAt"](a),
        f = this.pattern[b];
      return f === "." ? !0 : f === d ? q(e, this.pattern[b + 1]) : f === "[" ? this["De"](e, b, c - 1) : this.pattern["charCodeAt"](b) === e;
    }
    cr(a, b) {
      if (b + 1 >= this.pattern.length && this.error("missing '%b' arguments"), this.src[a] !== this.pattern[b]) return -1;
      let c = this.pattern[b],
        d = this.pattern[b + 1],
        e = 1,
        f = a + 1;
      for (; f < this.src.length;) {
        let a = this.src[f];
        if (a === d) {
          if (e -= 1, e === 0) return f + 1;
        } else a === c && (e += 1);
        f += 1;
      }
      return -1;
    }
    "On"(a, b, c) {
      let d = 0;
      for (; this["Pe"](a + d, b, c);) d += 1;
      for (; d >= 0;) {
        let b = this.match(a + d, c + 1);
        if (b !== -1) return b;
        d -= 1;
      }
      return -1;
    }
    fr(a, b, c) {
      for (;;) {
        let d = this.match(a, c + 1);
        if (d !== -1) return d;
        if (this["Pe"](a, b, c)) a += 1;else return -1;
      }
    }
    "Tn"(a, b, c) {
      let d = this.level;
      d >= maxcaptures && this.error("too many captures"), this.se[d] = a, this["M"][d] = c, this.level = d + 1;
      let e = this.match(a, b);
      return e === -1 && (this.level -= 1), e;
    }
    dr(a, b) {
      let c = this.hr();
      this["M"][c] = a - this.se[c];
      let d = this.match(a, b);
      return d === -1 && (this["M"][c] = capunfinished), d;
    }
    hr() {
      for (let a = this.level - 1; a >= 0; a -= 1) if (this["M"][a] === capunfinished) return a;
      return this.error("invalid capture");
    }
    gr(a, b) {
      let c = b - 49;
      (c < 0 || c >= this.level || this["M"][c] === capunfinished) && this.error(`invalid capture index %${c + 1}`);
      let d = this["M"][c],
        e = this.src.substr(this.se[c], d);
      return this.src.substr(a, d) === e ? a + d : -1;
    }
    match(a, b) {
      this.depth += 1, this.depth > 220 && this.error("pattern too complex");
      try {
        return this.pr(a, b);
      } finally {
        this.depth -= 1;
      }
    }
    pr(a, b) {
      let c = this.pattern;
      for (;;) {
        if (b >= c.length) return a;
        switch (c[b]) {
          case "(":
            return c[b + 1] === ")" ? this["Tn"](a, b + 2, g) : this["Tn"](a, b + 1, f);
          case ")":
            return this.dr(a, b + 1);
          case "$":
            if (b + 1 === c.length) return a === this.src.length ? a : -1;
            break;
          case d:
            switch (c[b + 1]) {
              case "b":
                {
                  let c = this.cr(a, b + 2);
                  if (c === -1) return -1;
                  a = c, b += 4;
                  continue;
                }
              case "f":
                {
                  b += 2, c[b] !== "[" && this.error("expected '[' after '%f'");
                  let d = this["In"](b),
                    e = a === 0 ? 0 : this.src["charCodeAt"](a - 1),
                    f = a < this.src.length ? this.src["charCodeAt"](a) : 0;
                  if (!this["De"](e, b, d - 1) && this["De"](f, b, d - 1)) {
                    b = d;
                    continue;
                  }
                  return -1;
                }
              default:
                if (h(c["charCodeAt"](b + 1))) {
                  let d = this.gr(a, c["charCodeAt"](b + 1));
                  if (d === -1) return -1;
                  a = d, b += 2;
                  continue;
                }
                break;
            }
            break;
          default:
            break;
        }
        let e = this["In"](b),
          i = this["Pe"](a, b, e),
          j = e < c.length ? c[e] : "";
        if (j === "?") {
          if (i) {
            let b = this.match(a + 1, e + 1);
            if (b !== -1) return b;
          }
          b = e + 1;
          continue;
        }
        if (j === "+") return i ? this["On"](a + 1, b, e) : -1;
        if (j === "*") return this["On"](a, b, e);
        if (j === "-") return this.fr(a, b, e);
        if (!i) return -1;
        a += 1, b = e;
      }
    }
    captures(a, b, c = !0) {
      if (this.level === 0 && c) return [this.src.slice(a, b)];
      let d = [];
      for (let a = 0; a < this.level; a += 1) this["M"][a] === g ? d.push(this.se[a] + 1) : d.push(this.src.substr(this.se[a], this["M"][a]));
      return d;
    }
  };
  function s(a, b, c = 0) {
    let d = b[0] === "^",
      e = d ? 1 : 0,
      f = c;
    do {
      let c = new r(a, b);
      c.level = 0;
      let d = c.match(f, e);
      if (d !== -1) return {
        start: f,
        end: d,
        captures: c.captures(f, d),
        matcher: c
      };
      f += 1;
    } while (f <= a.length && !d);
    return null;
  }
  b.exports = {
    find: s,
    "Matcher": r
  };
});
var t = a((a, b) => {
  "use strict";

  var c = o(),
    d = p(),
    e = s(),
    {
      "LuaError": f,
      "LuaTable": g,
      he: h
    } = c,
    i = (a, b, c, d) => {
      throw new f(`${b}: arg #${a} expected ${c}, got ${h(d)}`);
    };
  function j(a, b, d) {
    let e = a[b];
    return typeof e == "string" ? e : typeof e == "number" ? c.re(e) : i(b + 1, d, "string", e);
  }
  function k(a, b, d) {
    let e = c.o(a[b]);
    return e === void 0 ? i(b + 1, d, "number", a[b]) : e;
  }
  function l(a, b, d) {
    if (a[b] === void 0 || a[b] === null) return d;
    let e = c.o(a[b]);
    return e === void 0 ? d : e;
  }
  function m(a, b) {
    return a >= 0 ? a : -a > b ? 0 : b + a + 1;
  }
  function n(a, b, e) {
    let g = b[b.length - 1],
      h = b.slice(1, -1),
      i = /^([-+ #0]*)(\d*)(?:\.(\d+))?$/.exec(h) || ["", "", "", void 0],
      [, j, l, m] = i,
      n = l ? Number(l) : 0,
      o = m === void 0 ? void 0 : Number(m),
      p;
    switch (g) {
      case "d":
      case "i":
        {
          let a = Math.trunc(k([e], 0, "format"));
          p = String(Math.abs(a)), o !== void 0 && (p = p["padStart"](o, "0")), a < 0 ? p = `-${p}` : j.includes("+") && (p = `+${p}`);
          break;
        }
      case "u":
        p = String(Math.trunc(Math.abs(k([e], 0, "format"))));
        break;
      case "c":
        p = String["fromCharCode"](k([e], 0, "format"));
        break;
      case "x":
      case "X":
        {
          let a = Math.trunc(k([e], 0, "format"));
          p = (a < 0 ? a >>> 0 : a)["toString"](16), o !== void 0 && (p = p["padStart"](o, "0")), g === "X" && (p = p["toUpperCase"]()), j.includes("#") && (p = `0${g}${p}`);
          break;
        }
      case "o":
        p = Math.trunc(k([e], 0, "format"))["toString"](8);
        break;
      case "f":
      case "F":
        p = k([e], 0, "format")["Ln"](o === void 0 ? 6 : o);
        break;
      case "e":
      case "E":
        {
          p = k([e], 0, "format").mi(o === void 0 ? 6 : o), p = p.replace(/e([-+])(\d)$/, "e$10$2"), g === "E" && (p = p["toUpperCase"]());
          break;
        }
      case "g":
      case "G":
        {
          p = c.sr(k([e], 0, "format"), o === void 0 ? 6 : o), g === "G" && (p = p["toUpperCase"]());
          break;
        }
      case "s":
        {
          p = d.tostring(a, e), o !== void 0 && (p = p.slice(0, o));
          break;
        }
      case "q":
        {
          let b = typeof e == "string" ? e : d.tostring(a, e),
            c = '"';
          for (let a = 0; a < b.length; a += 1) {
            let d = b[a],
              e = b["charCodeAt"](a);
            d === '"' || d === "\\" || d === `\n` ? c += `\\${d === `\n` ? "n" : d}` : e === 0 ? c += "\\0" : e < 32 || e === 127 ? c += `\\${e}` : c += d;
          }
          p = `${c}"`;
          break;
        }
      default:
        throw new f(`format: invalid option '%${g}'`);
    }
    return n > p.length && (p = j.includes("-") ? p["padEnd"](n, " ") : p["padStart"](n, j.includes("0") && "dioxXufFeEgG".includes(g) ? "0" : " ")), p;
  }
  function q(a, b) {
    let c = j(b, 0, "format"),
      d = "",
      e = 1,
      f = 0;
    for (; f < c.length;) {
      let g = c[f];
      if (g !== "%") {
        d += g, f += 1;
        continue;
      }
      if (c[f + 1] === "%") {
        d += "%", f += 2;
        continue;
      }
      let h = f + 1;
      for (; h < c.length && "-+ #0".includes(c[h]);) h += 1;
      for (; h < c.length && c[h] >= "0" && c[h] <= "9";) h += 1;
      if (c[h] === ".") for (h += 1; h < c.length && c[h] >= "0" && c[h] <= "9";) h += 1;
      let i = c.slice(f, h + 1);
      d += n(a, i, b[e]), e += 1, f = h + 1;
    }
    return [d];
  }
  function r(a, b, d) {
    let e = "";
    for (let g = 0; g < a.length; g += 1) {
      let h = a[g];
      if (h !== "%") {
        e += h;
        continue;
      }
      let i = a[g + 1];
      if (g += 1, i === "%") {
        e += "%";
        continue;
      }
      if (i >= "0" && i <= "9") {
        if (i === "0") e += b;else {
          let a = d[Number(i) - 1];
          e += typeof a == "number" ? c.re(a) : a;
        }
        continue;
      }
      throw new f("gsub: invalid '%' in replacement");
    }
    return e;
  }
  function t(a, b) {
    let d = j(b, 0, "gsub"),
      h = j(b, 1, "gsub"),
      i = b[2],
      k = l(b, 3, 1 / 0),
      m = "",
      n = 0,
      o = 0,
      p = h[0] === "^";
    for (; o < k;) {
      let b = new e["Matcher"](d, h),
        j = b.match(n, p ? 1 : 0);
      if (j !== -1) {
        o += 1;
        let e = d.slice(n, j),
          h = b.captures(n, j),
          k;
        if (typeof i == "string" || typeof i == "number") k = r(String(i), e, h);else if (i instanceof g) k = i.get(h[0]);else if (c["_"](i)) k = a.call(i, h)[0];else throw new f("gsub: invalid replacement type");
        if (k == null || k === !1) m += e;else if (typeof k == "number") m += c.re(k);else if (typeof k == "string") m += k;else throw new f("gsub: invalid replacement value");
        j > n ? n = j : (n < d.length && (m += d[n]), n += 1);
      } else n < d.length && (m += d[n]), n += 1;
      if (n > d.length || p) break;
    }
    return m += d.slice(Math.min(n, d.length)), [m, o];
  }
  function u(a, b, d) {
    let f = j(b, 0, "find"),
      g = j(b, 1, "find"),
      h = m(l(b, 2, 1), f.length),
      i = c.truthy(b[3]),
      k = Math.max(0, h - 1);
    if (k > f.length) return [void 0];
    if (!d && i) {
      let a = f["indexOf"](g, k);
      return a === -1 ? [void 0] : [a + 1, a + g.length];
    }
    let n = e.find(f, g, k);
    return n ? d ? n.captures : [n.start + 1, n.end, ...n.matcher.captures(n.start, n.end, !1)] : [void 0];
  }
  function v(a, b) {
    let c = j(b, 0, "gmatch"),
      d = j(b, 1, "gmatch"),
      f = 0;
    return [() => {
      for (; f <= c.length;) {
        let a = new e["Matcher"](c, d),
          b = a.match(f, 0);
        if (b !== -1) {
          let c = a.captures(f, b);
          return f = b > f ? b : f + 1, c;
        }
        f += 1;
      }
      return [void 0];
    }];
  }
  function w(a) {
    let b = new g(),
      c = (a, c) => b.set(a, c);
    c("len", (a, b) => [j(b, 0, "len").length]), c("sub", (a, b) => {
      let c = j(b, 0, "sub"),
        d = m(l(b, 1, 1), c.length),
        e = m(l(b, 2, -1), c.length);
      return d < 1 && (d = 1), e > c.length && (e = c.length), [d > e ? "" : c.slice(d - 1, e)];
    }), c("upper", (a, b) => [j(b, 0, "upper")["toUpperCase"]()]), c("lower", (a, b) => [j(b, 0, "lower")["toLowerCase"]()]), c("reverse", (a, b) => [[...j(b, 0, "reverse")].reverse().join("")]), c("rep", (a, b) => {
      let c = j(b, 0, "rep"),
        d = Math.floor(k(b, 1, "rep")),
        e = b[2] === void 0 ? "" : j(b, 2, "rep");
      return d <= 0 ? [""] : [new Array(d).fill(c).join(e)];
    }), c("byte", (a, b) => {
      let c = j(b, 0, "byte"),
        d = m(l(b, 1, 1), c.length),
        e = m(l(b, 2, d), c.length);
      d < 1 && (d = 1), e > c.length && (e = c.length);
      let f = [];
      for (let a = d; a <= e; a += 1) f.push(c["charCodeAt"](a - 1));
      return f;
    }), c("char", (a, b) => {
      let c = "";
      for (let a = 0; a < b.length; a += 1) c += String["fromCharCode"](Math.floor(k(b, a, "char")) & 255);
      return [c];
    }), c("format", q), c("gsub", t), c("find", (a, b) => u(a, b, !1)), c("match", (a, b) => u(a, b, !0)), c("gmatch", v), a.globals.set("string", b);
    let d = new g();
    return d.set("__index", b), a.je = d, b;
  }
  b.exports = {
    install: w,
    $: k
  };
});
var u = a((a, b) => {
  "use strict";

  var c = o(),
    d = p(),
    e = t(),
    {
      "LuaError": f,
      "LuaTable": g,
      "LuaFunction": h,
      he: i,
      truthy: j
    } = c;
  function k(a) {
    let b = a.globals;
    b.set("_VERSION", "Lua 5.1"), b.set("_G", b), b.set("print", (a, b) => {
      let c = b.map(b => d.tostring(a, b));
      return a.output.push(c.join("\t")), [];
    }), b.set("type", (a, b) => [i(b[0])]), b.set("tostring", (a, b) => [d.tostring(a, b[0])]), b.set("tonumber", (a, b) => {
      if (b[1] === void 0 || b[1] === null) return [c.o(b[0])];
      let d = Math.floor(c.o(b[1])),
        e = typeof b[0] == "string" ? b[0].trim() : void 0;
      if (e === void 0) return [void 0];
      let f = parseInt(e, d);
      return [Number["isNaN"](f) ? void 0 : f];
    }), b.set("rawget", (a, b) => [b[0] instanceof g ? b[0].get(b[1]) : void 0]), b.set("rawset", (a, b) => (b[0] instanceof g && b[0].set(b[1], b[2]), [b[0]])), b.set("rawequal", (a, b) => [d.ir(b[0], b[1])]), b.set("rawlen", (a, b) => [d.length(a, b[0])]), b.set("setmetatable", (a, b) => {
      if (!(b[0] instanceof g)) throw new f("setmetatable: expected table");
      return b[0].$n(b[1] === void 0 || b[1] === null ? void 0 : b[1]), [b[0]];
    }), b.set("getmetatable", (a, b) => {
      let c = b[0],
        d = c instanceof g ? c.metatable : typeof c == "string" ? a.je : c && c["__metatable"];
      if (!d) return [void 0];
      let e = d.get("__metatable");
      return [e === void 0 ? d : e];
    }), b.set("assert", (a, b) => {
      if (!j(b[0])) throw new f(b[1] === void 0 ? "assertion failed!" : b[1]);
      return b;
    }), b.set("error", (a, b) => {
      let d = b[0],
        e = b[1] === void 0 ? 1 : c.o(b[1]);
      throw typeof d == "string" && e !== 0 ? new f(`deobf:0: ${d}`) : new f(d);
    }), b.set("select", (a, b) => {
      let d = b[0],
        e = b.slice(1);
      if (d === "#") return [e.length];
      let f = Math.floor(c.o(d));
      return f < 0 ? e.slice(e.length + f) : e.slice(f - 1);
    }), b.set("unpack", (a, b) => {
      let d = b[0];
      if (!(d instanceof g)) return [];
      let e = b[1] === void 0 ? 1 : Math.floor(c.o(b[1])),
        f = b[2] === void 0 ? d.length() : Math.floor(c.o(b[2])),
        h = [];
      for (let a = e; a <= f; a += 1) h.push(d.get(a));
      return h;
    }), b.set("next", (a, b) => l(b[0], b[1])), b.set("pairs", (a, c) => {
      let d = c[0],
        e = a.metamethod(d, "__pairs");
      return e ? a.call(e, [d]) : [b.get("next"), d, void 0];
    }), b.set("ipairs", (a, b) => {
      let e = b[0];
      return [(a, b) => {
        let e = Math.floor(c.o(b[1])) + 1,
          f = d.index(a, b[0], e);
        return f == null ? [void 0] : [e, f];
      }, e, 0];
    }), b.set("pcall", (a, b) => {
      let c = b[0];
      try {
        return [!0, ...a.call(c, b.slice(1))];
      } catch (b) {
        if (b && b.sandbox || b && b.name === "LuaLimitError") throw b;
        return a.swallows = (a.swallows || 0) + 1, b instanceof f ? [!1, b.value] : [!1, String(b && b.message ? b.message : b)];
      }
    }), b.set("xpcall", (a, b) => {
      let [c, d] = b;
      try {
        return [!0, ...a.call(c, b.slice(2))];
      } catch (b) {
        if (b && b.sandbox || !(b instanceof f) && b && b.name === "LuaLimitError") throw b;
        a.swallows = (a.swallows || 0) + 1;
        let c = b instanceof f ? b.value : String(b.message || b);
        return [!1, ...a.call(d, [c])];
      }
    }), b.set("getfenv", a => [a.globals]), b.set("setfenv", (a, b) => [b[0]]), b.set("collectgarbage", () => [0]), b.set("require", () => []), b.set("newproxy", (a, b) => {
      let c = {
        userdata: !0,
        "__metatable": void 0
      };
      return j(b[0]) && (c["__metatable"] = new g()), [c];
    });
  }
  function l(a, b) {
    if (!(a instanceof g)) throw new f("next: expected table");
    let c = a.keys();
    if (b == null) return c.length === 0 ? [void 0] : [c[0], a.get(c[0])];
    let d = c["indexOf"](typeof b == "number" && Object.is(b, -0) ? 0 : b);
    if (d === -1 || d === c.length - 1) return [void 0];
    let e = c[d + 1];
    return [e, a.get(e)];
  }
  function m(a) {
    let b = new g();
    b.set("insert", (a, b) => {
      let d = b[0];
      if (!(d instanceof g)) throw new f("table.insert: expected table");
      if (b.length <= 2) return d.set(d.length() + 1, b[1]), [];
      let e = Math.floor(c.o(b[1])),
        h = d.length();
      for (let a = h; a >= e; a -= 1) d.set(a + 1, d.get(a));
      return d.set(e, b[2]), [];
    }), b.set("remove", (a, b) => {
      let d = b[0];
      if (!(d instanceof g)) throw new f("table.remove: expected table");
      let e = d.length(),
        h = b[1] === void 0 ? e : Math.floor(c.o(b[1]));
      if (e === 0) return [void 0];
      let i = d.get(h);
      for (let a = h; a < e; a += 1) d.set(a, d.get(a + 1));
      return d.set(e, void 0), [i];
    }), b.set("concat", (a, b) => {
      let e = b[0],
        g = b[1] === void 0 ? "" : d.stringify(b[1]),
        h = b[2] === void 0 ? 1 : Math.floor(c.o(b[2])),
        i = b[3] === void 0 ? e.length() : Math.floor(c.o(b[3])),
        j = [];
      for (let a = h; a <= i; a += 1) {
        let b = e.get(a);
        if (typeof b != "string" && typeof b != "number") throw new f(`table.concat: invalid value at index ${a}`);
        j.push(d.stringify(b));
      }
      return [j.join(g)];
    }), b.set("unpack", a.globals.get("unpack")), b.set("pack", (a, b) => {
      let c = g.from(b);
      return c.set("n", b.length), [c];
    }), b.set("sort", (a, b) => {
      let c = b[0],
        e = b[1],
        f = c.rr(),
        g = e ? (b, c) => j(a.call(e, [b, c])[0]) ? -1 : j(a.call(e, [c, b])[0]) ? 1 : 0 : (b, c) => d.q(a, b, c) ? -1 : d.q(a, c, b) ? 1 : 0;
      f.sort(g);
      for (let a = 0; a < f.length; a += 1) c.set(a + 1, f[a]);
      return [];
    }), b.set("getn", (a, b) => [b[0].length()]), a.globals.set("table", b);
  }
  function n(a) {
    let b = new g(),
      d = a => (b, c) => [a(e.$(c, 0, "math"))];
    b.set("floor", d(Math.floor)), b.set("ceil", d(Math.ceil)), b.set("abs", d(Math.abs)), b.set("sqrt", d(Math.sqrt)), b.set("sin", d(Math.sin)), b.set("cos", d(Math.cos)), b.set("tan", d(Math.tan)), b.set("asin", d(Math.asin)), b.set("acos", d(Math.acos)), b.set("atan", d(Math.atan)), b.set("exp", d(Math.exp)), b.set("log", (a, b) => {
      let c = e.$(b, 0, "log");
      return b[1] === void 0 ? [Math.log(c)] : [Math.log(c) / Math.log(e.$(b, 1, "log"))];
    }), b.set("log10", d(Math.log10)), b.set("pow", (a, b) => [e.$(b, 0, "pow") ** e.$(b, 1, "pow")]), b.set("fmod", (a, b) => {
      let c = e.$(b, 0, "fmod"),
        d = e.$(b, 1, "fmod");
      return [c % d];
    }), b.set("modf", (a, b) => {
      let c = e.$(b, 0, "modf"),
        d = c >= 0 ? Math.floor(c) : Math.ceil(c);
      return [d, c - d];
    }), b.set("max", (a, b) => [Math.max(...b.map(a => c.o(a)))]), b.set("min", (a, b) => [Math.min(...b.map(a => c.o(a)))]), b.set("huge", 1 / 0), b.set("pi", Math["PI"]), b.set("random", (a, b) => {
      let d = a.random();
      if (b.length === 0) return [d];
      let e = b.length === 1 ? 1 : Math.floor(c.o(b[0])),
        f = b.length === 1 ? Math.floor(c.o(b[0])) : Math.floor(c.o(b[1]));
      return [e + Math.floor(d * (f - e + 1))];
    }), b.set("randomseed", (a, b) => (a.kr(c.o(b[0]) || 0), [])), a.globals.set("math", b);
  }
  function q(a) {
    let b = new g();
    b.set("time", () => [16e8]), b.set("clock", a => [a.steps / 1e6]), b.set("date", (a, b) => [typeof b[0] == "string" ? b[0] : "Mon Jan  1 00:00:00 2020"]), b.set("getenv", () => [void 0]), b.set("exit", () => {
      throw new f("os.exit called");
    }), a.globals.set("os", b);
    let e = new g();
    e.set("getinfo", (a, b) => {
      let c = new g();
      return c.set("currentline", 1), c.set("source", "@deobf"), c.set("short_src", "deobf"), c.set("what", "Lua"), c.set("func", b[0]), c.set("linedefined", 1), [c];
    }), e.set("sethook", () => []), e.set("gethook", () => [void 0]), e.set("traceback", (a, b) => [typeof b[0] == "string" ? b[0] : "stack traceback:"]), e.set("getlocal", () => [void 0]), e.set("getupvalue", () => [void 0]), e.set("setupvalue", () => [void 0]), e.set("getmetatable", (a, b) => [b[0] instanceof g ? b[0].metatable : void 0]), e.set("setmetatable", (a, b) => (b[0] instanceof g && b[0].$n(b[1]), [b[0]])), a.globals.set("debug", e);
    let h = new g();
    h.set("write", (a, b) => (a.output.push(b.map(a => d.stringify(a)).join("")), [])), h.set("read", () => [void 0]), a.globals.set("io", h);
    let i = new g();
    i.set("create", (a, b) => [b[0]]), i.set("wrap", (a, b) => [b[0]]), i.set("resume", (a, b) => [!0, ...a.call(b[0], b.slice(1))]), i.set("yield", () => []), i.set("status", () => ["dead"]), a.globals.set("coroutine", i);
    let j = new g(),
      k = a => Math.trunc(c.o(a)) | 0;
    j.set("band", (a, b) => [b.map(k).reduce((a, b) => a & b)]), j.set("bor", (a, b) => [b.map(k).reduce((a, b) => a | b)]), j.set("bxor", (a, b) => [b.map(k).reduce((a, b) => a ^ b)]), j.set("bnot", (a, b) => [~k(b[0])]), j.set("lshift", (a, b) => [k(b[0]) << k(b[1])]), j.set("rshift", (a, b) => [k(b[0]) >>> k(b[1])]), j.set("arshift", (a, b) => [k(b[0]) >> k(b[1])]), j.set("tobit", (a, b) => [k(b[0])]), a.globals.set("bit", j), a.globals.set("bit32", j);
  }
  function r(a) {
    let b = 625341585;
    a.kr = a => {
      b = Math.floor(a) >>> 0 || 1;
    }, a.random = () => (b ^= b << 13, b >>>= 0, b ^= b >>> 17, b ^= b << 5, b >>>= 0, b / 4294967296);
  }
  function s(a) {
    r(a), k(a), e.install(a), m(a), n(a), q(a);
  }
  b.exports = {
    install: s
  };
});
var v = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    d = o(),
    f = p(),
    g = n(),
    {
      "LuaError": h,
      "LuaTable": i,
      "LuaFunction": j,
      he: k,
      truthy: l
    } = d,
    m = {
      signal: "break"
    },
    q = {
      signal: "continue"
    },
    r = class extends Error {
      constructor(a) {
        super(a), this.name = "LuaLimitError";
      }
    },
    s = class {
      constructor(a) {
        this.parent = a, this.cells = new Map();
      }
      declare(a, b) {
        let c = {
          value: b,
          stamp: g.fresh()
        };
        return this.cells.set(a, c), c;
      }
      lookup(a) {
        let b = this;
        for (; b;) {
          let c = b.cells.get(a);
          if (c) return c;
          b = b.parent;
        }
        return null;
      }
    },
    t = class a {
      constructor(a = {}) {
        this.x = a.x === void 0 ? 2e7 : a.x, this.ze = 0, this.lenient = a.lenient === !0, this.ge = a.ge || 200, this.steps = 0, this.addresses = new WeakMap(), this["_n"] = 4096, this.je = void 0, this.globals = new i(), this.output = [], u().install(this);
      }
      "En"(a) {
        let b = this.addresses.get(a);
        return b === void 0 && (this["_n"] += 48, b = this["_n"]["toString"](16), this.addresses.set(a, b)), b;
      }
      metamethod(a, b) {
        let c;
        if (a instanceof i ? c = a.metatable : typeof a == "string" ? c = this.je : a && a["__metatable"] && (c = a["__metatable"]), !!c) return c.get(b);
      }
      tick(a = 1) {
        if (this.steps += a, this.x && this.steps > this.x) throw new r(`step limit exceeded (${this.x})`);
      }
      call(a, b) {
        if (typeof a == "function") return this.tick(), a(this, b) || [];
        if (!(a instanceof j)) {
          let c = this.metamethod(a, "__call");
          if (c) return this.call(c, [a, ...b]);
          if (this.lenient && a == null) return [];
          throw new h(`cannot call ${k(a)}`);
        }
        if (this.ze >= this.ge) throw new h("stack overflow");
        this.ze += 1;
        try {
          return this.invoke(a, b);
        } finally {
          this.ze -= 1;
        }
      }
      invoke(a, b) {
        let c = a.node,
          d = new s(a.closure),
          e = c.params || [];
        for (let a = 0; a < e.length; a += 1) d.declare(e[a], b[a]);
        let f = {
          varargs: c.w ? b.slice(e.length) : []
        };
        d.frame = f;
        let g = this.z(c.body, d);
        return g && g.signal === "return" ? g.values : [];
      }
      wi(a, b = []) {
        let d = new j({
          kind: c["Function"],
          params: [],
          body: a.kind === c["Chunk"] ? a.body : a,
          w: !0
        }, this["Te"](), "main chunk");
        return this.call(d, b);
      }
      "Te"() {
        return this.root || (this.root = new s(null), this.root.frame = {
          varargs: []
        }), this.root;
      }
      z(a, b) {
        let c = new s(b);
        return c.frame = b.frame, this.pe(a.statements, c);
      }
      pe(a, b) {
        let d = 0;
        for (; d < a.length;) {
          let e = this["Bn"](a[d], b);
          if (e) {
            if (e.signal === "goto") {
              let b = a["findIndex"](a => a.kind === c["Label"] && a.name === e.label);
              if (b !== -1) {
                d = b + 1;
                continue;
              }
            }
            return e;
          }
          d += 1;
        }
      }
      "Bn"(a, b) {
        switch (this.tick(), a.kind) {
          case c["LocalDeclaration"]:
            {
              let c = this["G"](a.expressions, b, a.names.length);
              for (let d = 0; d < a.names.length; d += 1) b.declare(a.names[d], c[d]);
              return;
            }
          case c["LocalFunction"]:
            {
              let c = b.declare(a.name, void 0);
              c.value = new j(a.body, b, a.name);
              return;
            }
          case c["FunctionDeclaration"]:
            {
              let c = new j(a.body, b, "declared");
              this.assign(a.target, c, b);
              return;
            }
          case c["Assignment"]:
            {
              let c = this["G"](a.expressions, b, a.targets.length),
                d = a.targets.map(a => this.br(a, b));
              for (let a = d.length - 1; a >= 0; a -= 1) this.store(d[a], c[a]);
              return;
            }
          case c["CallStatement"]:
            this.ie(a.expression, b);
            return;
          case c["Return"]:
            return {
              signal: "return",
              values: this["G"](a.expressions, b, -1)
            };
          case c["Break"]:
            return m;
          case c["Continue"]:
            return q;
          case c["Goto"]:
            return {
              signal: "goto",
              label: a.label
            };
          case c["Label"]:
            return;
          case c["Do"]:
            return this.z(a.body, b);
          case c["If"]:
            return this.mr(a, b);
          case c["While"]:
            return this.wr(a, b);
          case c["Repeat"]:
            return this.yr(a, b);
          case c["NumericFor"]:
            return this.vr(a, b);
          case c["GenericFor"]:
            return this.xr(a, b);
          default:
            throw new h(`unsupported statement: ${a.kind}`);
        }
      }
      mr(a, b) {
        if (l(this.eval(a.condition, b))) return this.z(a.body, b);
        for (let c of a.s || []) if (l(this.eval(c.condition, b))) return this.z(c.body, b);
        if (a.e) return this.z(a.e, b);
      }
      static ke(a) {
        return a ? a === m ? "stop" : a === q ? null : a : null;
      }
      wr(b, c) {
        for (;;) {
          if (this.tick(), !l(this.eval(b.condition, c))) return;
          let d = a.ke(this.z(b.body, c));
          if (d === "stop") return;
          if (d) return d;
        }
      }
      yr(b, c) {
        for (;;) {
          this.tick();
          let d = new s(c);
          d.frame = c.frame;
          let e = this.pe(b.body.statements, d),
            f = a.ke(e);
          if (f === "stop") return;
          if (f) return f;
          if (l(this.eval(b.condition, d))) return;
        }
      }
      vr(b, c) {
        let e = d.o(this.eval(b.start, c)),
          f = d.o(this.eval(b.limit, c)),
          g = b.step ? d.o(this.eval(b.step, c)) : 1;
        if (e === void 0 || f === void 0 || g === void 0) throw new h("'for' bounds must be numbers");
        for (let d = e; g > 0 ? d <= f : d >= f; d += g) {
          this.tick();
          let e = new s(c);
          e.frame = c.frame, e.declare(b.variable, d);
          let f = a.ke(this.pe(b.body.statements, e));
          if (f === "stop") return;
          if (f) return f;
        }
      }
      xr(b, c) {
        let d = this["G"](b.expressions, c, 3),
          [e, f, g] = d;
        for (;;) {
          this.tick();
          let d = this.call(e, [f, g]);
          if (d[0] === void 0 || d[0] === null) return;
          g = d[0];
          let h = new s(c);
          h.frame = c.frame;
          for (let a = 0; a < b.variables.length; a += 1) h.declare(b.variables[a], d[a]);
          let i = a.ke(this.pe(b.body.statements, h));
          if (i === "stop") return;
          if (i) return i;
        }
      }
      br(a, b) {
        if (a.kind === c["Name"]) {
          let c = b.lookup(a.name);
          return c ? {
            cell: c
          } : {
            base: this.globals,
            key: a.name
          };
        }
        if (a.kind === c["Index"]) return {
          base: this.eval(a.base, b),
          key: this.eval(a.index, b)
        };
        throw new h("invalid assignment target");
      }
      store(a, b) {
        if (a.cell) {
          g.touch(a.cell.stamp, a.cell), a.cell.value = b;
          return;
        }
        f["Re"](this, a.base, a.key, b);
      }
      assign(a, b, d) {
        if (a.kind === c["Name"]) {
          let c = d.lookup(a.name);
          if (c) {
            g.touch(c.stamp, c), c.value = b;
            return;
          }
          f["Re"](this, this.globals, a.name, b);
          return;
        }
        if (a.kind === c["Index"]) {
          let c = this.eval(a.base, d);
          f["Re"](this, c, this.eval(a.index, d), b);
          return;
        }
        throw new h("invalid assignment target");
      }
      "G"(a, b, c) {
        let d = [];
        if (a) for (let c = 0; c < a.length; c += 1) if (c === a.length - 1) {
          let e = this.ie(a[c], b);
          for (let a of e) d.push(a);
        } else d.push(this.eval(a[c], b));
        if (c >= 0) {
          for (; d.length < c;) d.push(void 0);
          d.length = c;
        }
        return d;
      }
      ie(a, b) {
        switch (a.kind) {
          case c["Call"]:
            {
              let c = this.eval(a.base, b);
              return this.call(c, this["G"](a.args, b, -1));
            }
          case c["MethodCall"]:
            {
              let c = this.eval(a.base, b),
                d = f.index(this, c, a.method);
              return this.call(d, [c, ...this["G"](a.args, b, -1)]);
            }
          case c["Vararg"]:
            return (b.frame ? b.frame.varargs : []).slice();
          default:
            return [this.eval(a, b)];
        }
      }
      eval(a, b) {
        switch (this.tick(), a.kind) {
          case c["Nil"]:
            return;
          case c["True"]:
            return !0;
          case c["False"]:
            return !1;
          case c["Number"]:
            return a.value;
          case c["String"]:
            return a.value;
          case c["Vararg"]:
            return this.ie(a, b)[0];
          case c["Name"]:
            {
              let c = b.lookup(a.name);
              return c ? c.value : f.index(this, this.globals, a.name);
            }
          case c["Paren"]:
            return this.eval(a.expression, b);
          case c["Function"]:
            return new j(a, b, null);
          case c["Index"]:
            return f.index(this, this.eval(a.base, b), this.eval(a.index, b));
          case c["Call"]:
          case c["MethodCall"]:
            return this.ie(a, b)[0];
          case c["Table"]:
            return this["Sr"](a, b);
          case c["Unary"]:
            return this["Nr"](a, b);
          case c["Binary"]:
            return this["Cr"](a, b);
          default:
            throw new h(`unsupported expression: ${a.kind}`);
        }
      }
      "Sr"(a, b) {
        let c = new i(),
          d = 1,
          e = a.entries || [];
        for (let a = 0; a < e.length; a += 1) {
          let f = e[a];
          if (f.type === "key") {
            c.set(this.eval(f.key, b), this.eval(f.value, b));
            continue;
          }
          if (a === e.length - 1) for (let a of this.ie(f.value, b)) c.set(d, a), d += 1;else c.set(d, this.eval(f.value, b)), d += 1;
        }
        return c;
      }
      "Nr"(a, b) {
        let c = this.eval(a.argument, b);
        switch (a.operator) {
          case "-":
            return f["Be"](this, c);
          case "not":
            return !l(c);
          case "#":
            return f.length(this, c);
          default:
            throw new h(`unknown unary operator '${a.operator}'`);
        }
      }
      "Cr"(a, b) {
        let c = a.operator;
        if (c === "and") {
          let c = this.eval(a.lhs, b);
          return l(c) ? this.eval(a.rhs, b) : c;
        }
        if (c === "or") {
          let c = this.eval(a.lhs, b);
          return l(c) ? c : this.eval(a.rhs, b);
        }
        let d = this.eval(a.lhs, b),
          e = this.eval(a.rhs, b);
        switch (c) {
          case "..":
            return f.concat(this, d, e);
          case "==":
            return f.equals(this, d, e);
          case "~=":
            return !f.equals(this, d, e);
          case "<":
            return f.q(this, d, e);
          case ">":
            return f.q(this, e, d);
          case "<=":
            return f["P"](this, d, e);
          case ">=":
            return f["P"](this, e, d);
          default:
            return f.arith(this, c, d, e);
        }
      }
    };
  b.exports = {
    "Interpreter": t,
    "Scope": s,
    "LuaLimitError": r
  };
});
var w = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    {
      walk: d
    } = l();
  function f(a) {
    let b = new Set();
    return d(a, {
      enter: a => {
        for (let c of a.bindings || []) c && b.add(c);
        a.binding && (a.kind === c["LocalFunction"] || a.kind === c["NumericFor"]) && b.add(a.binding);
      }
    }), b;
  }
  function g(a) {
    let b = a;
    for (; b && b.kind === c["Paren"];) b = b.expression;
    return b && b.kind === c["Function"] ? b : null;
  }
  var h = class {
    constructor(a, b, c) {
      this["K"] = b, this["U"] = c, this.carriers = new Map(), this.direct = new Map(), this.mentions = new Map(), this.resolved = new Map(), this.oe = new Map(), this.collect(a);
    }
    collect(a) {
      let b = (a, b) => {
        !a || !b || (this.carriers.has(a) || this.carriers.set(a, new Set()), this.carriers.get(a).add(b));
      };
      d(a, {
        enter: a => {
          if (a.kind === c["LocalFunction"]) b(a.binding, a.body);else if (a.kind === c["FunctionDeclaration"]) a.target && a.target.kind === c["Name"] && b(a.target.binding, a.body);else if (a.kind === c["LocalDeclaration"] || a.kind === c["Assignment"]) {
            let d = a.kind === c["LocalDeclaration"] ? a.bindings || [] : null;
            (a.expressions || [])["forEach"]((e, f) => {
              let h = g(e);
              if (!h) return;
              if (d) {
                b(d[f], h);
                return;
              }
              let i = (a.targets || [])[f];
              i && i.kind === c["Name"] && b(i.binding, h);
            });
          }
          a.kind === c["Function"] && this.summarise(a);
        }
      });
    }
    summarise(a) {
      let b = f(a),
        c = a => {
          let c = new Set();
          for (let d of a) b.has(d) || c.add(d);
          return c;
        };
      this.direct.set(a, c(this["K"](a.body, !0))), this.mentions.set(a, c(this["U"](a.body)));
    }
    close() {
      if (!this.closed) {
        this.closed = !0;
        for (let [a, b] of this.direct) this.resolved.set(a, new Set(b));
        for (let [a, b] of this.mentions) this.oe.set(a, new Set(b));
        for (let a = !0; a;) {
          a = !1;
          for (let [b, c] of this.mentions) {
            let d = this.resolved.get(b),
              e = this.oe.get(b);
            for (let b of c) for (let c of this.carriers.get(b) || []) {
              for (let b of this.resolved.get(c) || []) d.has(b) || (d.add(b), a = !0);
              for (let b of this.oe.get(c) || []) e.has(b) || (e.add(b), a = !0);
            }
          }
        }
      }
    }
    "Fr"(a) {
      this.close();
      let b = this.oe.get(a);
      if (!b) return new Set();
      let c = this.resolved.get(a) || new Set(),
        d = new Set();
      for (let a of b) c.has(a) || d.add(a);
      return d;
    }
    qr(a) {
      return this.close(), this.oe.get(a) || new Set();
    }
    "Rn"(a) {
      return this.carriers.get(a) || new Set();
    }
    "Dn"(a) {
      return this.close(), this.resolved.get(a) || new Set();
    }
    of(a) {
      let b = new Set(this["K"](a, !1));
      for (let c of this["U"](a)) for (let a of this.carriers.get(c) || []) for (let c of this["Dn"](a)) b.add(c);
      return b;
    }
  };
  b.exports = {
    "Writes": h,
    "Mr": f
  };
});
var x = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    {
      framed: d
    } = l(),
    f = class {
      constructor(a) {
        this.paths = new Map(), this.labelled = new Set(), d(a, (a, b) => {
          if (a.kind !== c["Block"]) {
            this.paths.set(a, b);
            return;
          }
          a.statements.some(a => a.kind === c["Label"]) && this.labelled.add(a);
        });
      }
      path(a) {
        return this.paths.get(a) || null;
      }
      precedes(a, b) {
        let c = this.path(a),
          d = this.path(b);
        if (!c || !d) return !1;
        let e = c,
          f = d;
        for (; e.depth > f.depth;) e = e.up;
        for (; f.depth > e.depth;) f = f.up;
        if (e === f) return !1;
        for (; e.up !== f.up;) e = e.up, f = f.up;
        return !(e !== c || e.block !== f.block || e.at >= f.at || this.labelled.has(e.block) && this.$r(e.block, e.at, f.at));
      }
      $r(a, b, d) {
        let e = a.statements;
        for (let a = b + 1; a <= d && a < e.length; a += 1) if (e[a].kind === c["Label"]) return !0;
        return !1;
      }
    };
  b.exports = {
    "Positions": f
  };
});
var y = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    {
      walk: d
    } = l(),
    f = new Set(["error"]),
    g = new Set([c["True"], c["Number"], c["String"], c["Table"], c["Function"]]);
  function h(a) {
    return a ? a.kind === c["Paren"] ? h(a.expression) : g.has(a.kind) : !1;
  }
  function i(a) {
    let b = a;
    for (; b && b.kind === c["Paren"];) b = b.expression;
    return b;
  }
  function j(a) {
    let b = !1;
    return d(a, {
      enter(a) {
        if (b || a.kind === c["Function"]) return !1;
        if (a.kind === c["While"] || a.kind === c["Repeat"] || a.kind === c["NumericFor"] || a.kind === c["GenericFor"]) {
          let e = !1;
          return d(a.body, {
            enter(a) {
              if (a.kind === c["Function"]) return !1;
              (a.kind === c["Return"] || a.kind === c["Goto"]) && (e = !0);
            }
          }), e && (b = !0), !1;
        }
        (a.kind === c["Break"] || a.kind === c["Return"] || a.kind === c["Goto"]) && (b = !0);
      }
    }), b;
  }
  function k(a, b) {
    let d = i(a);
    if (!d || d.kind !== c["Call"]) return !1;
    let e = i(d.base);
    return e ? e.kind === c["Name"] && !e.binding && f.has(e.name) ? !0 : e.kind === c["Function"] ? n(e.body, b + 1) : !1 : !1;
  }
  function m(a, b = 0) {
    if (!a || b > 48) return !1;
    switch (a.kind) {
      case c["While"]:
        return h(a.condition) && !j(a.body);
      case c["Repeat"]:
        return n(a.body, b + 1) || a.condition && a.condition.kind === c["False"] && !j(a.body);
      case c["Do"]:
        return n(a.body, b + 1);
      case c["Return"]:
        return (a.expressions || []).length === 1 && k(a.expressions[0], b);
      case c["CallStatement"]:
        return k(a.expression, b);
      case c["If"]:
        {
          if (!a.e || !n(a.body, b + 1)) return !1;
          for (let c of a.s || []) if (!n(c.body, b + 1)) return !1;
          return n(a.e, b + 1);
        }
      default:
        return !1;
    }
  }
  function n(a, b = 0) {
    return !a || b > 48 ? !1 : (a.statements || []).some(a => m(a, b + 1));
  }
  function o(a) {
    let b = new Map(),
      e = new Set(),
      f = (a, c, d, f) => {
        if (!(!a || a.kind === "global" || e.has(a))) {
          if (b.has(a) || a.writes.length !== (f ? 1 : 0)) {
            e.add(a), b.delete(a);
            return;
          }
          b.set(a, {
            list: c,
            index: d
          });
        }
      };
    return d(a, {
      enter(a) {
        if (a.kind === c["LocalDeclaration"]) {
          let b = a.bindings || [],
            c = a.expressions || [];
          b.length === c.length && b["forEach"]((a, b) => f(a, c, b, !1));
          return;
        }
        if (a.kind === c["LocalFunction"] && a.binding) {
          f(a.binding, [a.body], 0, !1);
          return;
        }
        if (a.kind === c["Assignment"]) {
          let b = a.targets || [],
            d = a.expressions || [];
          b.length === d.length && b["forEach"]((a, b) => {
            let e = i(a);
            e && e.kind === c["Name"] && f(e.binding, d, b, !0);
          });
        }
      }
    }), b;
  }
  function p(a) {
    let b = new Map();
    for (let d of a.keys()) {
      let e = d,
        f = new Set([d]);
      for (;;) {
        let b = i(q(a, e));
        if (!b || b.kind !== c["Name"] || !b.binding || f.has(b.binding)) break;
        f.add(b.binding), e = b.binding;
      }
      e !== d && b.set(d, e);
    }
    return b;
  }
  function q(a, b) {
    let c = b ? a.get(b) : null;
    return c ? c.list[c.index] : null;
  }
  b.exports = {
    "W": o,
    "Ge": q,
    "Pn": p,
    jn: h,
    bare: i,
    "Lr": j,
    diverges: m,
    zn: n
  };
});
var z = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    {
      walk: d,
      children: f
    } = l(),
    {
      "Interpreter": g
    } = v(),
    h = o(),
    i = p(),
    k = n(),
    m = q(),
    {
      "Writes": r,
      "Mr": s
    } = w(),
    {
      "Positions": t
    } = x(),
    {
      c: u
    } = j(),
    {
      "W": z,
      "Ge": aa,
      "Pn": ab
    } = y(),
    ac = new Set(["string", "table", "math", "bit", "bit32", "utf8", "type", "tostring", "tonumber", "select", "unpack", "ipairs", "pairs", "next", "rawget", "rawset", "rawequal", "rawlen", "setmetatable", "getmetatable", "assert", "pcall", "_VERSION", "_ENV"]);
  function ad(a) {
    let b = new h["LuaTable"]();
    for (let c of ac) {
      let d = a.globals.get(c);
      d !== void 0 && b.set(c, d);
    }
    let c = new h["LuaTable"]();
    return c.set("__index", (a, b) => {
      let c = new h["LuaError"](`unknown global '${String(b[1])}'`);
      throw c.sandbox = !0, c;
    }), b.metatable = c, b;
  }
  var ae = a => a === void 0 || typeof a == "boolean" || typeof a == "number" || typeof a == "string",
    af = 2e4;
  function ag(a, b, e) {
    let f = new Set(),
      g = a => {
        let b = a;
        for (; b && b.kind === c["Paren"];) b = b.expression;
        if (!b) return;
        if (b.kind === c["Name"]) {
          b.binding && f.add(b.binding);
          return;
        }
        let d = b;
        for (; d && (d.kind === c["Index"] || d.kind === c["Paren"]);) d = d.base || d.expression;
        if (!d || d.kind !== c["Name"] || !d.binding) return;
        f.add(d.binding);
        let g = e ? e.get(d.binding) : void 0;
        g && f.add(g);
      };
    return d(a, {
      enter: d => {
        if (d !== a && d.kind === c["Function"] && !b) return !1;
        if (d.kind === c["Assignment"]) (d.targets || [])["forEach"](g);else if (d.kind === c["LocalDeclaration"] || d.kind === c["GenericFor"] || d.kind === c["Function"]) for (let a of d.bindings || []) a && f.add(a);else (d.kind === c["LocalFunction"] || d.kind === c["NumericFor"]) && d.binding && f.add(d.binding);
      }
    }), f;
  }
  function ah(a, b = !0) {
    let d = new Set(),
      e = new Set(),
      g = (a, b) => {
        !a || d.has(a) || e.has(a) || (b ? e.add(a) : d.add(a));
      },
      h = d => {
        if (!(!d || typeof d != "object")) {
          switch (d.kind) {
            case c["Name"]:
              g(d.binding, !1);
              return;
            case c["Assignment"]:
              (d.expressions || [])["forEach"](h);
              for (let a of d.targets || []) {
                let b = a;
                for (; b && b.kind === c["Paren"];) b = b.expression;
                b && (b.kind === c["Name"] ? g(b.binding, !0) : h(b));
              }
              return;
            case c["LocalDeclaration"]:
              (d.expressions || [])["forEach"](h);
              for (let a of d.bindings || []) g(a, !0);
              return;
            case c["NumericFor"]:
              h(d.start), h(d.limit), h(d.step), g(d.binding, !0), h(d.body);
              return;
            case c["GenericFor"]:
              (d.expressions || [])["forEach"](h);
              for (let a of d.bindings || []) g(a, !0);
              h(d.body);
              return;
            case c["Function"]:
              if (d !== a && !b) return;
              for (let a of d.bindings || []) g(a, !0);
              h(d.body);
              return;
            case c["LocalFunction"]:
              g(d.binding, !0);
              break;
            default:
              break;
          }
          for (let a of f(d)) h(a.node);
        }
      };
    return h(a), d;
  }
  var ai = class {
    constructor(a, b = {}) {
      this.chunk = a, this.options = b, this.rt = new g({
        x: b.x || 4e7
      }), this.scope = this.rt["Te"](), this.values = new Map(), this.declared = new Set(), this.declarations = [], this.failures = [], this.be = new Set(), this.mutated = new Map(), this.skipped = [], this.unfoldable = new Set(), this.cells = new Map(), this.tainted = new Set(), this["Ke"] = new Map(), this.point = 0, this.me = null, this.dirty = null, this.depth = 0, this.live = !1, this.copying = !1, this.impure = new Set(), this.caches = new Set(), this.positions = null, this.holders = null, this.parents = null, this["W"] = z(a), this.copies = ab(this["W"]), this.reading = new Set(), this.summary = new r(a, (a, b) => ag(a, b, this.copies), ah);
      let c = this.rt.globals.get("table");
      if (c) for (let a of ["insert", "remove", "sort"]) {
        let b = c.get(a);
        b && this.impure.add(b);
      }
      for (let a of ["rawset", "setmetatable", "collectgarbage"]) {
        let b = this.rt.globals.get(a);
        b && this.impure.add(b);
      }
      this.rt.globals.set("_ENV", ad(this.rt));
    }
    "Gn"(a) {
      if (!a || typeof a != "object") return !1;
      if (a.kind === c["Vararg"]) return !0;
      if (a.kind === c["Function"]) return !1;
      for (let b of f(a)) if (this["Gn"](b.node)) return !0;
      return !1;
    }
    "Er"(a) {
      if (this["Gn"](a)) return !1;
      let b = s(a),
        e = !0;
      return d(a, {
        enter: a => {
          if (!e) return !1;
          if (a.kind !== c["Name"]) return;
          let d = a.binding;
          if (!d) return e = !1, !1;
          if (d.kind === "global") {
            ac.has(d.name) || (e = !1);
            return;
          }
          if (!this.declared.has(d) && !b.has(d)) return e = !1, !1;
        }
      }), e;
    }
    "Ar"(a) {
      if (a.kind === c["LocalDeclaration"] && a.bindings) for (let b = 0; b < a.bindings.length; b += 1) this.note(a.bindings[b], a.names[b]);else a.kind === c["LocalFunction"] && a.binding && this.note(a.binding, a.name);
    }
    note(a, b) {
      if (!a) return;
      this.declarations.push({
        binding: a,
        name: b
      }), this.declared.add(a);
      let c = this.scope.lookup(b);
      c && this.cells.set(a, c);
    }
    "Ir"() {
      let a = new Map();
      for (let {
        binding: b,
        name: c
      } of this.declarations) {
        let d = this.scope.lookup(c);
        if (!d) continue;
        let e = a.get(c);
        e && this.unfoldable.add(e), a.set(c, b), this.values.set(b, {
          value: d.value
        });
      }
    }
    prepare(a) {
      let b = this.chunk.body.statements;
      this["Or"](b), this.live = !!a;
      for (let d = 0; d < b.length; d += 1) {
        let e = b[d];
        if (this.point = d, a && (this.depth = 0, this.dirty = null, this.me = new Set([...ag(e, !0), ...this["Kn"](e)]), a(e, d)), e.kind === c["Return"]) break;
        if (!this["Er"](e)) {
          this.skipped.push(e), this["Ue"](e);
          continue;
        }
        try {
          let a = this.rt.swallows || 0,
            b = k.witness(() => this.rt["Bn"](e, this.scope));
          if ((this.rt.swallows || 0) !== a) {
            this.skipped.push(e), this["Ue"](e);
            continue;
          }
          if (this.be.add(e), b.older.size && this.mutated.set(e, b.older), this["Ar"](e), this["Tr"](e), b.value) break;
        } catch (a) {
          this.skipped.push(e), this.be.delete(e), this.failures.push({
            statement: e,
            error: a
          }), this["Ue"](e);
          continue;
        }
      }
      return this.live = !1, this["Ir"](), this["_r"](), this["Br"](), this;
    }
    "Or"(a) {
      a["forEach"]((a, b) => {
        for (let c of ag(a, !0)) this["Ke"].set(c, b);
      });
    }
    "Ue"(a) {
      for (let b of this["Kn"](a)) this.tainted.add(b);
    }
    "Kn"(a) {
      let b = this.summary.of(a);
      for (let c of ah(a)) {
        let a = this.cells.get(c),
          d = a ? a.value : void 0;
        if (!(!(d instanceof h["LuaFunction"]) || !d.node)) for (let a of this.summary["Dn"](d.node)) b.add(a);
      }
      return b;
    }
    "Tr"(a) {
      let b = ag(a, !1);
      if (!b.size) return;
      let c = !1;
      for (let b of ah(a, !1)) if (this.tainted.has(b)) {
        c = !0;
        break;
      }
      for (let a of b) c ? this.tainted.add(a) : this.tainted.delete(a);
    }
    usable(a) {
      return !a || this.tainted.has(a) || this.me && this.me.has(a) ? !1 : this.depth === 0 ? !0 : (this["Ke"].has(a) ? this["Ke"].get(a) : -1) < this.point;
    }
    "_r"() {
      for (let [a] of this.values) for (let b of a.writes) if (!this.we(b)) {
        this.unfoldable.add(a);
        break;
      }
      let a = new Set();
      d(this.chunk, {
        enter: b => {
          if (b.kind === c["Assignment"]) for (let d of b.targets) {
            if (d.kind !== c["Index"]) continue;
            let e = d.base;
            for (; e && e.kind === c["Index"];) e = e.base;
            e && e.kind === c["Name"] && e.binding && !this.we(b) && a.add(e.binding);
          }
        }
      });
      for (let b of a) this.unfoldable.add(b);
      for (let [a, b] of this.values) if (!ae(b.value)) for (let b of a.reads) {
        if (this.we(b)) continue;
        let d = this["Un"](b);
        if (!(d && (d.kind === c["Index"] && d.base === b || (d.kind === c["Call"] || d.kind === c["MethodCall"]) && d.base === b))) {
          this.unfoldable.add(a);
          break;
        }
      }
    }
    "Un"(a) {
      if (!this.parents) {
        let a = new Map(),
          b = [this.chunk];
        for (; b.length;) {
          let c = b.pop();
          for (let d of f(c)) a.set(d.node, c), b.push(d.node);
        }
        this.parents = a;
      }
      return this.parents.get(a);
    }
    we(a) {
      for (let b = a; b; b = this["Un"](b)) if (this.be.has(b)) return !0;
      return !1;
    }
    lookup(a) {
      if (!(!a || this.unfoldable.has(a) || this.tainted.has(a))) return this.values.get(a);
    }
    "Wn"(a, b) {
      if (!a || a.kind === "global") return {
        ok: !1
      };
      if (this.reading.has(a) || this.unfoldable.has(a)) return {
        ok: !1
      };
      if (this.tainted.has(a)) return {
        ok: !1
      };
      let d = aa(this["W"], a);
      if (!d) return {
        ok: !1
      };
      if (!(m.j(d) && (a.writes || []).length === 0) && d.kind !== c["Function"] && d.kind !== c["Name"]) return {
        ok: !1
      };
      this.reading.add(a);
      try {
        return this.evaluate(d, b + 1);
      } finally {
        this.reading.delete(a);
      }
    }
    "Vn"(a, b, c) {
      if (b.ok || !this.copying) return b;
      let d = a.binding;
      if (!d || this.reading.has(d)) return b;
      let e = this.ye(a);
      if (!e) return b;
      this.reading.add(d);
      try {
        return this.evaluate(e, c + 1);
      } finally {
        this.reading.delete(d);
      }
    }
    evaluate(a, b = 0) {
      if (!a || b > 64) return {
        ok: !1
      };
      switch (a.kind) {
        case c["Nil"]:
          return {
            ok: !0,
            value: void 0
          };
        case c["True"]:
          return {
            ok: !0,
            value: !0
          };
        case c["False"]:
          return {
            ok: !0,
            value: !1
          };
        case c["Number"]:
          return {
            ok: !0,
            value: a.value
          };
        case c["String"]:
          return {
            ok: !0,
            value: a.value
          };
        case c["Paren"]:
          return this.evaluate(a.expression, b + 1);
        case c["Function"]:
          return this.protect(() => this.rt.eval(a, this.scope));
        case c["Name"]:
          {
            if (a.binding && a.binding.kind === "global") return ac.has(a.binding.name) ? {
              ok: !0,
              value: this.rt.globals.get(a.binding.name)
            } : {
              ok: !1
            };
            if (this.live) {
              let c = this.cells.get(a.binding);
              return c && this.usable(a.binding) ? {
                ok: !0,
                value: c.value
              } : this["Vn"](a, this["Wn"](a.binding, b), b);
            }
            let c = this.lookup(a.binding);
            return c ? {
              ok: !0,
              value: c.value
            } : this["Vn"](a, this["Wn"](a.binding, b), b);
          }
        case c["Table"]:
          {
            let c = new h["LuaTable"](),
              d = a.entries || [],
              e = 1;
            for (let a = 0; a < d.length; a += 1) {
              let f = d[a];
              if (f.type === "key") {
                let a = this.evaluate(f.key, b + 1),
                  d = this.evaluate(f.value, b + 1);
                if (!a.ok || !d.ok || a.value === void 0) return {
                  ok: !1
                };
                if (!this.protect(() => c.set(a.value, d.value)).ok) return {
                  ok: !1
                };
                continue;
              }
              let g = this.evaluate(f.value, b + 1);
              if (!g.ok) return {
                ok: !1
              };
              let h = a === d.length - 1 && g.values ? g.values : [g.value];
              for (let a of h) c.set(e, a), e += 1;
            }
            return {
              ok: !0,
              value: c
            };
          }
        case c["Index"]:
          {
            if (this["Hn"](a.base)) return {
              ok: !1
            };
            let c = this.evaluate(a.base, b + 1),
              d = this.evaluate(a.index, b + 1);
            return !c.ok || !d.ok ? {
              ok: !1
            } : c.value instanceof h["LuaTable"] ? this["Yn"](c.value) ? {
              ok: !1
            } : this.protect(() => i.index(this.rt, c.value, d.value)) : {
              ok: !1
            };
          }
        case c["Binary"]:
          {
            if (a.operator === "and" || a.operator === "or") {
              let c = this.evaluate(a.lhs, b + 1);
              return c.ok ? (a.operator === "and" ? h.truthy(c.value) : !h.truthy(c.value)) ? this.evaluate(a.rhs, b + 1) : c : {
                ok: !1
              };
            }
            let c = this.evaluate(a.lhs, b + 1),
              d = this.evaluate(a.rhs, b + 1);
            return !c.ok || !d.ok ? {
              ok: !1
            } : this.protect(() => this["Rr"](a.operator, c.value, d.value));
          }
        case c["Unary"]:
          {
            let c = this.evaluate(a.argument, b + 1);
            return c.ok ? this.protect(() => a.operator === "-" ? i["Be"](this.rt, c.value) : a.operator === "not" ? !h.truthy(c.value) : i.length(this.rt, c.value)) : {
              ok: !1
            };
          }
        case c["Call"]:
          {
            let c = this.evaluate(a.base, b + 1);
            if (!c.ok || !h["_"](c.value)) return {
              ok: !1
            };
            if (this["We"](c.value)) return {
              ok: !1
            };
            let d = this["Xn"](a.args, b + 1);
            return d.ok ? this["Ve"](c.value, d.values) : {
              ok: !1
            };
          }
        case c["MethodCall"]:
          {
            if (this["Hn"](a.base)) return {
              ok: !1
            };
            let c = this.evaluate(a.base, b + 1);
            if (!c.ok || this["Yn"](c.value)) return {
              ok: !1
            };
            let d = this["Xn"](a.args, b + 1);
            if (!d.ok) return {
              ok: !1
            };
            let e = this.protect(() => i.index(this.rt, c.value, a.method));
            return !e.ok || !h["_"](e.value) ? {
              ok: !1
            } : this["We"](e.value) ? {
              ok: !1
            } : this["Ve"](e.value, [c.value, ...d.values]);
          }
        default:
          return {
            ok: !1
          };
      }
    }
    "Rr"(a, b, c) {
      switch (a) {
        case "..":
          return i.concat(this.rt, b, c);
        case "==":
          return i.equals(this.rt, b, c);
        case "~=":
          return !i.equals(this.rt, b, c);
        case "<":
          return i.q(this.rt, b, c);
        case ">":
          return i.q(this.rt, c, b);
        case "<=":
          return i["P"](this.rt, b, c);
        case ">=":
          return i["P"](this.rt, c, b);
        default:
          return i.arith(this.rt, a, b, c);
      }
    }
    "Xn"(a, b) {
      let c = a || [],
        d = [];
      for (let a = 0; a < c.length; a += 1) {
        let e = this.evaluate(c[a], b);
        if (!e.ok) return {
          ok: !1
        };
        a === c.length - 1 && e.values ? d.push(...e.values) : d.push(e.value);
      }
      return {
        ok: !0,
        values: d
      };
    }
    "Ve"(a, b) {
      if (this.impure.has(a)) return {
        ok: !1
      };
      let c = k.record(() => this["Dr"](a, b));
      if (c.value.ok) for (let a of c.writes) a instanceof h["LuaTable"] && this.caches.add(a);
      return c.value;
    }
    "Dr"(a, b) {
      let c = this.rt.swallows || 0,
        d = k.attempt(() => this.protect(() => this.rt.call(a, b))),
        e = d.value;
      if (!e.ok || (this.rt.swallows || 0) !== c) return k.undo(d), {
        ok: !1
      };
      let f = k.attempt(() => this.protect(() => this.rt.call(a, b))),
        g = f.value;
      k.undo(f);
      let h = g.ok && !f.escaped && e.value.length === g.value.length,
        i = (a, b) => a === b || Number["isNaN"](a) && Number["isNaN"](b);
      for (let a = 0; h && a < e.value.length; a += 1) (!ae(e.value[a]) || !i(e.value[a], g.value[a])) && (h = !1);
      return h ? (k.commit(d), {
        ok: !0,
        value: e.value[0],
        values: e.value
      }) : (k.undo(d), {
        ok: !1
      });
    }
    "Yn"(a) {
      return !!this.dirty && this.dirty.has(a);
    }
    "Hn"(a) {
      if (!this.dirty) return !1;
      let b = a;
      for (; b && b.kind === c["Paren"];) b = b.expression;
      return !!b && b.kind === c["Name"] && this.dirty.has(b.binding);
    }
    "We"(a) {
      if (!(a instanceof h["LuaFunction"]) || !a.node) return !1;
      for (let b of this.summary["Fr"](a.node)) if (!this.usable(b) || this.dirty && this.dirty.has(b)) return !0;
      return !1;
    }
    protect(a) {
      let b = this.rt.steps;
      try {
        return {
          ok: !0,
          value: a()
        };
      } catch {
        return this.rt.steps = b, {
          ok: !1
        };
      }
    }
    "Zn"(a) {
      let b = this.copying;
      this.copying = !0;
      try {
        let b = a;
        for (let a = 0; a <= 8; a += 1) {
          let a = this.evaluate(b);
          if (a.ok) return a;
          let c = this.ye(b);
          if (!c) return {
            ok: !1
          };
          b = c;
        }
        return {
          ok: !1
        };
      } finally {
        this.copying = b;
      }
    }
    ye(a) {
      let b = a;
      for (; b && b.kind === c["Paren"];) b = b.expression;
      if (!b || b.kind !== c["Name"]) return null;
      let d = b.binding;
      if (!d || !u(d) || (d.writes || []).length > 1) return null;
      let e = this["Pr"]().get(d);
      return !e || (this.positions || (this.positions = new t(this.chunk)), !this.positions.precedes(e.statement, b)) ? null : e.value;
    }
    "Pr"() {
      if (this.holders) return this.holders;
      let a = new Map(),
        b = (b, c, d) => {
          !b || !c || (a.has(b) ? a.set(b, null) : a.set(b, {
            value: c,
            statement: d
          }));
        };
      return d(this.chunk, {
        enter: a => {
          if (a.kind === c["LocalDeclaration"]) {
            let c = a.expressions || [];
            c.length === (a.names || []).length && (a.bindings || [])["forEach"]((d, e) => b(d, c[e], a));
          } else if (a.kind === c["Assignment"]) {
            let d = a.targets || [],
              e = a.expressions || [];
            d.length === e.length && d["forEach"]((d, f) => {
              d.kind === c["Name"] && b(d.binding, e[f], a);
            });
          }
        }
      }), this.holders = a, a;
    }
    "Br"() {
      this.depth = 0, this.me = null, this.dirty = null;
      let a = 0,
        b = new Set();
      return d(this.chunk, {
        enter: d => {
          if (a >= af) return !1;
          if (d.kind !== c["Call"]) return;
          let e = d.args || [];
          if (!e.length || !e.every(a => m.j(a) || a.kind === c["Name"])) return;
          let f = this.jr(d.base);
          if (!f || this["We"](f)) return;
          a += 1;
          let g = k.record(() => {
            let a = [];
            for (let b of e) {
              let c = this["Zn"](b);
              if (!c.ok) return {
                ok: !1
              };
              a.push(c.value);
            }
            return this["Ve"](f, a);
          });
          for (let a of g.writes) b.add(a);
          if (g.value.ok) for (let a of g.writes) a instanceof h["LuaTable"] && this.caches.add(a);
        }
      }), this.distrust(b), a;
    }
    distrust(a) {
      let b = new Map();
      for (let [a, c] of this.cells) b.set(c, a);
      for (let c of a) {
        let a = b.get(c);
        a && this.tainted.add(a);
      }
      for (let [b, c] of this.values) a.has(c.value) && !this.caches.has(c.value) && this.unfoldable.add(b);
    }
    "Jn"(a, b) {
      let d = a;
      for (let a = 0; a <= 8 && d; a += 1) {
        for (; d && d.kind === c["Paren"];) d = d.expression;
        if (!d) return null;
        let a = this.evaluate(d);
        if (a.ok) return b(a.value, null) ? a.value : null;
        if (d.kind !== c["Name"] || !u(d.binding)) return null;
        let e = this.values.get(d.binding);
        if (e && b(e.value, d.binding)) return e.value;
        d = this.ye(d);
      }
      return null;
    }
    jr(a) {
      return this["Jn"](a, (a, b) => a instanceof h["LuaFunction"] && !!a.node && (!b || (b.writes || []).every(a => this.we(a))));
    }
    zr(a) {
      return this["Jn"](a, a => this["Qn"](a));
    }
    "Qn"(a, b = 0) {
      if (!(a instanceof h["LuaTable"]) || b > 8) return !1;
      if (this.caches.has(a)) return !0;
      let c = a.metatable;
      return c ? this["Qn"](c.get("__index"), b + 1) : !1;
    }
    "Gr"(a) {
      if (!this.caches.size || !a || a.kind !== c["Index"]) return null;
      let b = this["Zn"](a.index);
      if (!b.ok || b.value === void 0) return null;
      let d = this.zr(a.base);
      if (!d) return null;
      let e = this.protect(() => i.index(this.rt, d, b.value));
      return !e.ok || !ae(e.value) || e.value === void 0 ? null : m["An"](e.value);
    }
    "Kr"(a, b = !1) {
      if (m.j(a)) return null;
      let c = this.evaluate(a);
      return !c.ok || !ae(c.value) || c.value === void 0 || b && c.values && c.values.length !== 1 ? null : m["An"](c.value);
    }
  };
  b.exports = {
    "Evaluator": ai,
    "K": ag,
    "U": ah
  };
});
var aa = a((a, b) => {
  "use strict";

  var {
      "Kind": c,
      kn: d
    } = e(),
    {
      children: f,
      collect: g,
      walk: h,
      transform: i
    } = l(),
    {
      "Evaluator": k,
      "U": m,
      "K": n
    } = z(),
    {
      c: p,
      "D": r
    } = j(),
    s = q(),
    {
      "Pn": t,
      "W": u,
      "Ge": v
    } = y(),
    {
      "Writes": x
    } = w(),
    {
      "LuaTable": aa,
      "LuaFunction": ab
    } = o();
  function ac(a, b, d, e) {
    let f = new Set(),
      g = !1,
      i = a => {
        if (!a) return;
        if (!p(a)) {
          g = !0;
          return;
        }
        f.add(a);
        let b = e.get(a);
        b && f.add(b);
      };
    h(a, {
      enter(d) {
        b.set(d, a), d.kind === c["FunctionDeclaration"] && (g = !0);
      }
    });
    for (let b of n(a, !0, e)) i(b);
    for (let b of d.of(a)) i(b);
    for (let b of m(a)) p(b) && i(b);
    return g ? null : f;
  }
  function ad(a, b, c) {
    for (let d of a.reads || []) if (!b.has(c.get(d))) return !0;
    return !1;
  }
  function ae(a, b, c) {
    let d = [a.rt.globals];
    for (let [e, f] of a.values) f && ad(e, b, c) && d.push(f.value);
    let e = new Set();
    for (; d.length;) {
      let a = d.pop();
      if (!(!(a instanceof aa) || e.has(a))) {
        e.add(a);
        for (let [b, c] of a.map) d.push(b), d.push(c);
        a.metatable && d.push(a.metatable);
      }
    }
    return e;
  }
  function af(a, b, c, d, e) {
    for (let f of a) {
      if (f instanceof aa) {
        if (b.has(f)) return !0;
        continue;
      }
      let a = c.get(f);
      if (!a || ad(a, d, e)) return !0;
    }
    return !1;
  }
  function ag(a, b, c) {
    for (let d = 0; d < b.size && a.size; d += 1) {
      let d = !1;
      for (let e of a) {
        let f = !1;
        for (let d of b.get(e)) if (d && (f = ad(d, a, c)), f) break;
        f && (a.delete(e), d = !0);
      }
      if (!d) break;
    }
  }
  function ah(a, b, c, d) {
    if (!a.mutated.size) return;
    let e = new Map();
    for (let [b, c] of a.cells) e.set(c, b);
    for (let f = 0; f < c.size && b.size; f += 1) {
      let f = ae(a, b, d),
        g = !1;
      for (let c of b) {
        let h = a.mutated.get(c);
        !h || !af(h, f, e, b, d) || (b.delete(c), g = !0);
      }
      if (!g) break;
      ag(b, c, d);
    }
  }
  function ai(a, b) {
    let c = b.be;
    if (!c.size) return 0;
    let d = t(u(a.chunk)),
      e = new x(a.chunk, (a, b) => n(a, b, d), m),
      f = new Map(),
      g = new Map();
    for (let a of c) {
      let b = ac(a, f, e, d);
      b && g.set(a, b);
    }
    let h = new Set(g.keys());
    if (ag(h, g, f), ah(b, h, g, f), !h.size) return 0;
    let i = a.chunk.body,
      j = i.statements.length;
    return i.statements = i.statements.filter(a => !h.has(a)), j - i.statements.length;
  }
  function aj(a) {
    let b = new Set();
    if (a.kind === c["CallStatement"] && b.add(a.expression), a.kind === c["Assignment"]) for (let c of a.targets) b.add(c);
    return a.kind === c["FunctionDeclaration"] && b.add(a.target), b;
  }
  function ak(a) {
    let b = new Set(),
      d = a => a && a.length ? a[a.length - 1] : null,
      e = a => {
        a && b.add(a);
      };
    if (a.kind === c["Call"] || a.kind === c["MethodCall"]) e(d(a.args));else if (a.kind === c["Return"]) e(d(a.expressions));else if (a.kind === c["LocalDeclaration"] || a.kind === c["Assignment"]) e(d(a.expressions));else if (a.kind === c["GenericFor"]) e(d(a.expressions));else if (a.kind === c["Table"]) {
      let b = d(a.entries);
      b && b.type === "item" && e(b.value);
    }
    return b;
  }
  function al(a) {
    let b = a;
    for (;;) {
      if (!b) return null;
      if (b.kind === c["Paren"]) {
        b = b.expression;
        continue;
      }
      if (b.kind === c["Index"]) {
        b = b.base;
        continue;
      }
      return b.kind === c["Name"] ? b : null;
    }
  }
  function am(a) {
    return a ? s.j(a) ? !0 : a.kind === c["Paren"] ? am(a.expression) : a.kind !== c["Table"] ? !1 : (a.entries || []).every(a => a.type === "item" ? am(a.value) : a.type === "key" ? s.j(a.key) && am(a.value) : !1) : !1;
  }
  function an(a) {
    if (ap(a)) return !0;
    let b = al(a);
    return !!b && !r(b);
  }
  function ao(a) {
    let b = a;
    for (; b && b.kind === c["Paren"];) b = b.expression;
    return b;
  }
  function ap(a) {
    let b = ao(a);
    return !!b && (b.kind === c["Function"] || b.kind === c["Table"]);
  }
  function aq(a, b) {
    if (!a) return;
    let c = a.evaluate(b);
    return c && c.ok ? c.value : void 0;
  }
  function ar(a, b, d = new Set()) {
    let e = ao(a);
    return !e || d.has(e) ? !1 : (d.add(e), e.kind === c["Function"] || e.kind === c["Table"] ? !0 : e.kind === c["Name"] ? r(e) ? !1 : ar(v(b, e.binding), b, d) : e.kind === c["Index"] ? ar(e.base, b, d) : !1);
  }
  function as(a, b, c) {
    return ar(a, c.values) ? !0 : aq(c.evaluator, a) instanceof b;
  }
  function at(a, b) {
    let c = aq(b.evaluator, a.base);
    if (!(c instanceof aa)) return !1;
    let d = aq(b.evaluator, a.index);
    return d == null ? !1 : au(c, d, new Set());
  }
  function au(a, b, c) {
    let d = a;
    for (; d instanceof aa && !c.has(d);) {
      if (c.add(d), d.get(b) !== void 0) return !0;
      let a = d.metatable;
      d = a instanceof aa ? a.get("__index") : void 0;
    }
    return !1;
  }
  function av(a, b) {
    return a.kind === c["Index"] ? a.index && a.index.kind === c["String"] || !an(a.base) || !as(a.base, aa, b) ? !1 : at(a, b) : a.kind === c["Call"] ? !an(a.base) || !as(a.base, ab, b) ? !1 : (a.args || []).every(a => am(a)) : !1;
  }
  var aw = new Set([c["While"], c["Repeat"], c["NumericFor"], c["GenericFor"]]);
  function ax(a, b) {
    let d = new Set(),
      e = b => {
        let e = ao(b);
        if (!e) return;
        if (e.kind === c["Name"]) {
          if (!e.binding) return;
          let b = a.cells.get(e.binding);
          b && b.value instanceof aa && (d.add(e.binding), d.add(b.value));
          return;
        }
        let f = aq(a, b);
        f instanceof aa && d.add(f);
      };
    return h(b, {
      enter: a => {
        a.kind === c["Call"] ? (a.args || [])["forEach"](e) : a.kind === c["MethodCall"] && (e(a.base), (a.args || [])["forEach"](e));
      }
    }), d;
  }
  function ay(a, b, e = {}) {
    let g = e.skip || new Set(),
      h = {
        evaluator: a,
        values: e.values || new Map()
      },
      i = e.yi === !0,
      j = {
        folded: 0,
        strings: 0
      },
      k = b => {
        let e = a.dirty;
        if (aw.has(b.kind)) {
          let c = ax(a, b);
          c.size && (a.dirty = e ? new Set([...e, ...c]) : c);
        }
        let l = aj(b),
          m = ak(b);
        for (let e of f(b)) {
          let b = e.node;
          if (!b || g.has(b)) continue;
          if (d(b) && !l.has(b) && (i || av(b, h))) {
            let d = a["Kr"](b, m.has(b));
            if (d) {
              e.index === null ? e.parent[e.key] = d : e.parent[e.key][e.index] = d, j.folded += 1, d.kind === c["String"] && (j.strings += 1);
              continue;
            }
          }
          let f = b.kind === c["Function"];
          f && (a.depth += 1), k(b), f && (a.depth -= 1);
        }
        a.dirty = e;
      };
    return k(b), j;
  }
  function az(a) {
    let b = new Set();
    return h(a, {
      enter(a) {
        if (a.kind === c["Assignment"]) for (let c of a.targets || []) b.add(c);else a.kind === c["FunctionDeclaration"] && a.target && b.add(a.target);
      }
    }), b;
  }
  function ba(a, b, d) {
    let e = {
        folded: 0,
        strings: 0
      },
      f = az(b);
    return i(b, b => {
      if (f.has(b)) return b;
      let g = a["Gr"](b);
      return g ? (e.folded += 1, g.kind === c["String"] && (e.strings += 1, d && (e.strings % 25 === 0 || e.strings === 1) && d["V"]("progress", {
        step: "03-strings",
        strings: e.strings,
        folded: e.folded
      })), g) : b;
    }), e;
  }
  function bb(a) {
    a.resolve();
    let b = {
        folded: 0,
        strings: 0
      },
      c = new k(a.chunk, a.options),
      d = u(a.chunk);
    c.prepare(e => {
      let f = ay(c, e, {
        values: d
      });
      b.folded += f.folded, b.strings += f.strings, b.strings > 0 && (b.strings % 25 === 0 || b.folded % 50 === 0) && a["V"]("progress", {
        step: "03-strings",
        strings: b.strings,
        folded: b.folded
      });
    });
    let e = ba(c, a.chunk, a);
    b.folded += e.folded, b.strings += e.strings, a.evaluator = c, a["V"]("progress", {
      step: "03-strings",
      strings: b.strings,
      folded: b.folded
    }), b.folded && (a.note(`resolved ${b.folded} hidden constant(s), ${b.strings} string(s)`, b.folded), a.bump("decrypt.constants", b.folded), a.bump("decrypt.strings", b.strings)), c.skipped.length && a.bump("decrypt.skippedStatements", c.skipped.length), a.resolve();
    let f = ai(a, c);
    f && (a.note(`removed the ${f}-statement decoder prelude`, f), a.bump("decrypt.preludeRemoved", f), a.resolve());
  }
  b.exports = {
    name: "03-str",
    run: bb,
    "Evaluator": k,
    "C": s
  };
});
var ab = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    {
      unparen: d,
      de: f
    } = m(),
    g = {
      "<": ">",
      ">": "<",
      "<=": ">=",
      ">=": "<="
    };
  function h(a, b) {
    let e = d(a);
    if (!e || e.kind !== c["Binary"] || !g[e.operator]) return null;
    let h = e.operator,
      i = d(e.lhs),
      j = d(e.rhs);
    if (f(i) !== b) {
      if (f(j) !== b) return null;
      h = g[h];
      let a = i;
      i = j, j = a;
    }
    return !j || j.kind !== c["Number"] ? null : h === "<" ? {
      lo: null,
      hi: j.value
    } : h === "<=" ? {
      lo: null,
      hi: j.value + 1
    } : h === ">" ? {
      lo: j.value + 1,
      hi: null
    } : {
      lo: j.value,
      hi: null
    };
  }
  function i(a) {
    let b = [],
      d = a.container.pos,
      e = (a, f, g) => {
        let i = a.statements;
        if (i.length === 1 && i[0].kind === c["If"] && i[0].e) {
          let a = i[0],
            b = [{
              condition: a.condition,
              body: a.body
            }].concat(a.s || []),
            c = b.map(a => h(a.condition, d));
          if (c.every(Boolean)) {
            let d = f,
              h = g;
            for (let a = 0; a < b.length; a += 1) c[a].hi !== null ? (e(b[a].body, d, Math.min(h, c[a].hi)), d = Math.max(d, c[a].hi)) : (e(b[a].body, Math.max(d, c[a].lo), h), h = Math.min(h, c[a].lo));
            e(a.e, d, h);
            return;
          }
        }
        b.push({
          lo: f,
          hi: g,
          statements: i,
          id: null,
          index: b.length
        });
      };
    return e(a.container.dispatch.body, -1 / 0, 1 / 0), b;
  }
  function j(a, b) {
    let c = new Map(),
      d = [];
    for (let e of b) {
      let b = a.find(a => e >= a.lo && e < a.hi);
      if (!b) {
        d.push({
          id: e,
          reason: "outside every interval"
        });
        continue;
      }
      if (b.id !== null) {
        d.push({
          id: e,
          reason: `interval already taken by ${b.id}`
        });
        continue;
      }
      b.id = e, c.set(e, b);
    }
    let e = a.filter(a => a.id === null);
    return {
      "He": c,
      dead: e,
      conflicts: d
    };
  }
  b.exports = {
    "Ur": i,
    "Wr": j
  };
});
var ac = a((a, b) => {
  "use strict";

  var {
      "Kind": c,
      d: d
    } = e(),
    {
      "CHILDREN": f
    } = l(),
    {
      unparen: g,
      de: h
    } = m(),
    i = "VmRef",
    j = "VmLive",
    k = (a, b) => ({
      kind: i,
      index: a,
      slot: b
    }),
    n = a => ({
      kind: j,
      reg: a
    });
  function o(a, b) {
    let c = f[a.kind],
      d = {
        ...a
      };
    if (!c) return d;
    for (let e of Object.keys(c)) {
      let f = c[e],
        g = a[e];
      g != null && (f === "node" ? d[e] = b(g) : f === "list" ? d[e] = g.map(b) : f === "clauses" ? d[e] = g.map(a => ({
        ...a,
        condition: b(a.condition),
        body: b(a.body)
      })) : f === "entries" && (d[e] = g.map(a => ({
        ...a,
        key: a.key ? b(a.key) : a.key,
        value: b(a.value)
      }))));
    }
    return d;
  }
  function p(a) {
    return a["Ye"] || (a["Ye"] = new Set(a.container.registers), a["Ye"].add(a.container.pos), a["Xe"] = `r${a.container.pos.id}`, a["Vr"] = `r${a.container["Yt"].id}`), a["Ye"];
  }
  function q(a, b) {
    let d = g(b);
    if (!d) return null;
    if (d.kind === c["Name"]) {
      let b = d.binding;
      return b && p(a).has(b) ? `r${b.id}` : null;
    }
    if (d.kind === c["Index"] && a.container.spill) {
      if (h(d.base) !== a.container.spill) return null;
      let b = g(d.index);
      return b && b.kind === c["Number"] ? `s${b.value}` : null;
    }
    return null;
  }
  function r(a, b) {
    let c = h(b);
    if (!c) return !1;
    let {
      args: d,
      upvals: e,
      qn: f
    } = a.container;
    return c === d || c === e || c === f;
  }
  function s(a, b) {
    return b.targets.length === 1 && r(a, b.targets[0]);
  }
  function t(a) {
    if (!a || typeof a != "object") return !1;
    if (a.kind === c["Call"] || a.kind === c["MethodCall"]) return !0;
    let b = f[a.kind];
    if (!b) return !1;
    for (let c of Object.keys(b)) {
      let d = b[c],
        e = a[c];
      if (e != null) {
        if (d === "node") {
          if (t(e)) return !0;
        } else if (d === "list") {
          for (let a of e) if (t(a)) return !0;
        } else if (d === "clauses") {
          for (let a of e) if (t(a.condition) || t(a.body)) return !0;
        } else if (d === "entries") {
          for (let a of e) if (a.key && t(a.key) || t(a.value)) return !0;
        }
      }
    }
    return !1;
  }
  function u(a) {
    if (!a || typeof a != "object") return !1;
    if (a.kind === c["Call"] || a.kind === c["MethodCall"] || a.kind === c["Index"]) return !0;
    let b = f[a.kind];
    if (!b) return !1;
    for (let c of Object.keys(b)) {
      let d = b[c],
        e = a[c];
      if (e != null) {
        if (d === "node") {
          if (u(e)) return !0;
        } else if (d === "list") {
          for (let a of e) if (u(a)) return !0;
        } else if (d === "clauses") {
          for (let a of e) if (u(a.condition) || u(a.body)) return !0;
        } else if (d === "entries") {
          for (let a of e) if (a.key && u(a.key) || u(a.value)) return !0;
        }
      }
    }
    return !1;
  }
  function v(a, b) {
    p(a);
    let e = [],
      f = new Map(),
      h = new Set(),
      i = new Set(),
      j = [],
      l = a => {
        let b = f.get(a);
        return b ? k(b.index, b.slot) : (i.has(a) || h.add(a), n(a));
      },
      m = b => {
        if (!b || typeof b != "object") return b;
        let e = q(a, b);
        if (e) return l(e);
        if (b.kind === c["Paren"]) {
          let a = m(b.expression);
          return d(g(b)) && a && typeof a == "object" && (a.truncated = !0), a;
        }
        return o(b, m);
      };
    for (let d of b.statements) {
      if (d.kind === c["CallStatement"]) {
        e.push({
          index: e.length,
          targets: [],
          exprs: [m(d.expression)],
          ordered: !0,
          source: d
        });
        continue;
      }
      if (d.kind !== c["Assignment"]) {
        j.push(d);
        continue;
      }
      if (s(a, d)) continue;
      let b = d.expressions.map(m),
        h = d.targets.map(b => {
          let d = q(a, b);
          if (d) return {
            reg: d,
            node: null
          };
          let e = g(b);
          return e.kind === c["Index"] ? {
            reg: null,
            node: {
              ...e,
              base: m(e.base),
              index: m(e.index)
            }
          } : {
            reg: null,
            node: {
              ...e
            }
          };
        }),
        k = h.length > 1 && b.length === h.length ? h.map((a, c) => ({
          targets: [a],
          exprs: [b[c]],
          at: c
        })) : [{
          targets: h,
          exprs: b,
          at: -1
        }];
      for (let b of k) {
        if (b.at >= 0 && r(a, d.targets[b.at]) && !u(b.exprs[0])) continue;
        let c = e.length;
        e.push({
          index: c,
          targets: b.targets,
          exprs: b.exprs,
          ordered: b.exprs.some(u) || b.targets.some(a => a.node !== null),
          source: d
        });
        for (let a = 0; a < b.targets.length; a += 1) {
          let {
            reg: d
          } = b.targets[a];
          d && (f.set(d, {
            index: c,
            slot: a
          }), i.add(d));
        }
      }
    }
    return {
      leaf: b,
      statements: e,
      ue: h,
      written: i,
      unsupported: j,
      exit: f.get(a["Xe"]) || null
    };
  }
  function w(a, b) {
    return a ? a.exprs.length === a.targets.length ? a.exprs[b] || null : a.targets.length === 1 && a.exprs[0] || null : null;
  }
  function x(a, b) {
    return !b || b.kind !== i ? null : w(a.statements[b.index], b.slot);
  }
  function y(a, b, c = 0) {
    let d = b,
      e = c;
    for (; d && d.kind === i && e < 256;) {
      let b = x(a, d);
      if (!b) return d;
      d = b, e += 1;
    }
    return d;
  }
  function z(a, b, d = 0) {
    if (d > 64) return {
      kind: "unknown"
    };
    let e = y(a, b, d);
    if (!e) return {
      kind: "return"
    };
    if (e.kind === c["Number"]) return {
      kind: "goto",
      target: e.value
    };
    if (e.kind === c["Nil"]) return {
      kind: "return"
    };
    if (e.kind === c["Index"]) return {
      kind: "return"
    };
    if (e.kind === c["Binary"] && e.operator === "or") {
      let b = z(a, e.lhs, d + 1),
        c = z(a, e.rhs, d + 1);
      return b.kind !== "guarded" ? {
        kind: "unknown"
      } : c.kind === "goto" ? {
        kind: "branch",
        condition: b.condition,
        "B": b.target,
        h: c.target
      } : c.kind === "return" ? {
        kind: "branch",
        condition: b.condition,
        "B": b.target,
        h: null
      } : {
        kind: "unknown"
      };
    }
    if (e.kind === c["Binary"] && e.operator === "and") {
      let b = z(a, e.rhs, d + 1);
      return b.kind !== "goto" ? {
        kind: "unknown"
      } : {
        kind: "guarded",
        condition: e.lhs,
        target: b.target
      };
    }
    return {
      kind: "unknown"
    };
  }
  function aa(a) {
    if (!a.exit) return {
      kind: "unknown",
      index: null
    };
    let b = a.statements[a.exit.index],
      c = w(b, a.exit.slot);
    if (!c) return {
      kind: "unknown",
      index: null
    };
    let d = z(a, c);
    return d.kind === "guarded" ? {
      kind: "branch",
      condition: d.condition,
      "B": d.target,
      h: null,
      index: a.exit.index
    } : {
      ...d,
      index: a.exit.index
    };
  }
  b.exports = {
    "REF": i,
    "LIVE": j,
    live: n,
    "Hr": o,
    "Yr": t,
    "Xr": v,
    definition: x,
    peel: y,
    terminator: aa
  };
});
var ad = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    {
      walk: d
    } = l(),
    {
      unparen: f,
      de: g
    } = m(),
    {
      "Ur": h,
      "Wr": i
    } = ab(),
    {
      "Xr": j,
      terminator: k
    } = ac();
  function n(a) {
    let b = new Map();
    return d(a.container.fn, {
      enter: d => {
        if (d.kind !== c["Call"]) return;
        let e = a["T"] ? a["T"](d.base) : a.creators.get(g(d.base));
        if (!e) return;
        let h = f(d.args[0]);
        if (!h || h.kind !== c["Number"]) return;
        let i = b.get(h.value),
          j = {
            "O": h.value,
            creator: e,
            arity: e.arity,
            vararg: e.vararg,
            er: d.args[1] || null,
            call: d
          };
        i ? i.push(j) : b.set(h.value, [j]);
      }
    }), b;
  }
  function o(a) {
    return a.kind === "goto" ? [a.target] : a.kind === "branch" ? a.h === null ? [a["B"]] : [a["B"], a.h] : [];
  }
  function p(a) {
    let b = h(a),
      c = b.map(b => {
        let c = j(a, b);
        return c.terminator = k(c), c;
      }),
      d = n(a),
      e = new Set([a.entry["O"]]);
    for (let a of d.keys()) e.add(a);
    for (let a of c) for (let b of o(a.terminator)) e.add(b);
    let f = i(b, [...e].sort((a, b) => a - b)),
      g = new Map();
    for (let a of c) a.leaf.id !== null && (a.id = a.leaf.id, a.successors = [], a.predecessors = [], g.set(a.id, a));
    let l = [];
    for (let a of g.values()) for (let b of o(a.terminator)) {
      let c = g.get(b);
      if (!c) {
        l.push({
          from: a.id,
          to: b
        });
        continue;
      }
      a.successors.push(c), c.predecessors.push(a);
    }
    return {
      vm: a,
      blocks: g,
      sites: d,
      dead: f.dead,
      conflicts: f.conflicts,
      missing: l,
      unsupported: c.filter(a => a.unsupported.length),
      unknown: [...g.values()].filter(a => a.terminator.kind === "unknown")
    };
  }
  function q(a, b, c) {
    let d = new Set(),
      e = [],
      f = a.blocks.get(b);
    if (!f) return {
      seen: d,
      order: e
    };
    let g = [f];
    for (d.add(f.id); g.length;) {
      let a = g.shift();
      e.push(a);
      for (let e of a.successors) d.has(e.id) || c.has(e.id) && e.id !== b || (d.add(e.id), g.push(e));
    }
    return {
      seen: d,
      order: e
    };
  }
  function r(a, b) {
    let c = new Set(),
      d = [],
      e = [{
        block: a,
        index: 0
      }];
    for (c.add(a.id); e.length;) {
      let a = e[e.length - 1];
      if (a.index < a.block.successors.length) {
        let d = a.block.successors[a.index];
        a.index += 1, !c.has(d.id) && b.has(d.id) && (c.add(d.id), e.push({
          block: d,
          index: 0
        }));
        continue;
      }
      d.push(a.block), e.pop();
    }
    return d.reverse();
  }
  function s(a, b) {
    if (a.size !== b.size) return !1;
    for (let c of a) if (!b.has(c)) return !1;
    return !0;
  }
  function t(a, b) {
    for (let c of a.blocks) c.use = new Set([...c.ue].filter(a => a !== b)), c.def = new Set([...c.written].filter(a => a !== b)), c["Ze"] = new Set(c.use), c.ve = new Set();
    let c = [...a.blocks].reverse();
    for (let b = 0; b < 1e4; b += 1) {
      let b = !1;
      for (let d of c) {
        let c = new Set();
        for (let b of d.successors) if (a.members.has(b.id)) for (let a of b["Ze"]) c.add(a);
        let e = new Set(d.use);
        for (let a of c) d.def.has(a) || e.add(a);
        (!s(c, d.ve) || !s(e, d["Ze"])) && (b = !0), d.ve = c, d["Ze"] = e;
      }
      if (!b) break;
    }
  }
  function u(a) {
    let b = p(a),
      c = new Set([a.entry["O"], ...b.sites.keys()]),
      d = [];
    d.push({
      id: a.entry["O"],
      kind: "main",
      arity: a.entry.arity,
      vararg: a.entry.vararg,
      site: null
    });
    for (let [c, e] of b.sites) {
      if (c === a.entry["O"]) continue;
      let b = e[0];
      d.push({
        id: c,
        kind: "closure",
        arity: b.arity,
        vararg: b.vararg,
        site: b,
        sites: e
      });
    }
    let e = [],
      f = new Map(),
      g = [];
    for (let h of d) {
      let d = b.blocks.get(h.id);
      if (!d) {
        b.missing.push({
          from: null,
          to: h.id
        });
        continue;
      }
      let {
          seen: i
        } = q(b, h.id, c),
        j = {
          ...h,
          entry: d,
          members: i,
          blocks: r(d, i)
        };
      for (let a of i) {
        let b = f.get(a);
        if (b !== void 0 && b !== h.id) {
          g.push({
            block: a,
            functions: [b, h.id]
          });
          continue;
        }
        f.set(a, h.id);
      }
      t(j, a["Xe"]), e.push(j);
    }
    let h = [...b.blocks.keys()].filter(a => !f.has(a));
    return {
      ...b,
      functions: e,
      owner: f,
      shared: g,
      orphans: h
    };
  }
  b.exports = {
    "Zr": r,
    "Jr": u
  };
});
var ae = a((a, b) => {
  "use strict";

  var c = class {
      constructor() {
        this.parent = new Map();
      }
      find(a) {
        let b = a;
        for (; this.parent.has(b) && this.parent.get(b) !== b;) b = this.parent.get(b);
        let c = a;
        for (; this.parent.has(c) && this.parent.get(c) !== c;) {
          let a = this.parent.get(c);
          this.parent.set(c, b), c = a;
        }
        return this.parent.has(a) || this.parent.set(a, b), b;
      }
      union(a, b) {
        let c = this.find(a),
          d = this.find(b);
        c !== d && this.parent.set(d, c);
      }
    },
    d = (a, b) => `E${a.id}|${b}`,
    e = (a, b, c) => `D${a.id}|${b}.${c}`;
  function f(a) {
    let b = new Map(),
      c = new Map();
    for (let d of a.blocks) b.set(d, new Set(d.ue)), c.set(d, new Set());
    let d = [...a.blocks].reverse();
    for (let e = 0; e < 1e4; e += 1) {
      let e = !1;
      for (let f of d) {
        let d = c.get(f),
          g = b.get(f);
        for (let c of f.successors) if (a.members.has(c.id)) for (let a of b.get(c) || []) d.has(a) || (d.add(a), e = !0);
        for (let a of d) f.written.has(a) || g.has(a) || (g.add(a), e = !0);
      }
      if (!e) break;
    }
    return {
      ue: b,
      "Qr": c
    };
  }
  function g(a, b) {
    let c = a.statements;
    for (let d = c.length - 1; d >= 0; d -= 1) {
      let f = c[d].targets;
      for (let c = f.length - 1; c >= 0; c -= 1) if (f[c].reg === b) return e(a, d, c);
    }
    return d(a, b);
  }
  function h(a) {
    let b = new c(),
      {
        ue: e
      } = f(a);
    for (let c of a.blocks) for (let f of e.get(c) || []) {
      let e = d(c, f);
      b.find(e);
      for (let d of c.predecessors) a.members.has(d.id) && b.union(e, g(d, f));
    }
    return b;
  }
  b.exports = {
    es: h,
    et: d,
    ns: e,
    liveness: f
  };
});
var af = a((a, b) => {
  "use strict";

  function c(a, b) {
    let c = new Set([a]),
      d = [],
      e = [{
        node: a,
        successors: b(a),
        index: 0
      }];
    for (; e.length;) {
      let a = e[e.length - 1];
      if (a.index < a.successors.length) {
        let d = a.successors[a.index];
        if (a.index += 1, c.has(d)) continue;
        c.add(d), e.push({
          node: d,
          successors: b(d),
          index: 0
        });
        continue;
      }
      d.push(a.node), e.pop();
    }
    return d.reverse();
  }
  function d(a, b, d) {
    let e = c(a, b),
      f = new Map();
    e["forEach"]((a, b) => f.set(a, b));
    let g = new Map([[a, a]]),
      h = (a, b) => {
        let c = a,
          d = b;
        for (; c !== d;) {
          for (; f.get(c) > f.get(d);) c = g.get(c);
          for (; f.get(d) > f.get(c);) d = g.get(d);
        }
        return c;
      };
    for (let b = 0; b < 1e4; b += 1) {
      let b = !1;
      for (let c of e) {
        if (c === a) continue;
        let e = null;
        for (let a of d(c)) !f.has(a) || !g.has(a) || (e = e === null ? a : h(a, e));
        e && g.get(c) !== e && (g.set(c, e), b = !0);
      }
      if (!b) break;
    }
    return {
      idom: g,
      order: e,
      index: f
    };
  }
  function e(a, b, c) {
    let d = c;
    for (let c = 0; c < 1e5; c += 1) {
      if (d === b) return !0;
      let c = a.get(d);
      if (!c || c === d) return !1;
      d = c;
    }
    return !1;
  }
  b.exports = {
    "Zr": c,
    dominators: d,
    dominates: e
  };
});
var ag = a((a, b) => {
  "use strict";

  var {
      dominators: c,
      dominates: d
    } = af(),
    e = {
      id: "EXIT"
    };
  function f(a, b) {
    let c = a.terminator;
    return c.kind === "return" || c.kind === "unknown" || c.kind === "branch" && c.h === null ? !0 : a.successors.filter(a => b.has(a.id)).length === 0;
  }
  function g(a) {
    let b = new Map([[e, []]]),
      c = new Map([[e, []]]);
    for (let d of a.blocks) b.set(d, []), c.has(d) || c.set(d, []);
    let d = (a, d) => {
      b.get(a).push(d), c.get(d).push(a);
    };
    for (let b of a.blocks) {
      for (let c of b.successors) a.members.has(c.id) && d(b, c);
      f(b, a.members) && d(b, e);
    }
    return {
      succ: b,
      pred: c
    };
  }
  function h(a, b, c) {
    let f = new Map();
    for (let g of a.blocks) for (let a of c.get(g)) {
      if (a === e || !d(b, a, g)) continue;
      let c = f.get(a);
      c || (c = {
        header: a,
        latches: [],
        members: new Set([a]),
        follow: null,
        exits: []
      }, f.set(a, c)), c.latches.push(g);
    }
    for (let b of f.values()) {
      let d = [...b.latches];
      for (let a of b.latches) b.members.add(a);
      for (; d.length;) {
        let c = d.pop();
        if (c !== b.header) for (let e of c.predecessors) a.members.has(e.id) && (b.members.has(e) || (b.members.add(e), d.push(e)));
      }
      let f = new Set();
      for (let a of b.members) for (let d of c.get(a)) d === e || b.members.has(d) || (f.add(d), b.exits.push({
        from: a,
        to: d
      }));
      f.size === 1 ? [b.follow] = [...f] : b.candidates = [...f];
    }
    return f;
  }
  function i(a) {
    let {
        succ: b,
        pred: f
      } = g(a),
      i = c(a.entry, a => b.get(a) || [], a => f.get(a) || []),
      j = c(e, a => f.get(a) || [], a => b.get(a) || []),
      k = h(a, i.idom, b),
      l = i.index,
      m = [],
      n = new Set(),
      o = new Set();
    for (let a of k.values()) {
      if (a.follow || !a.candidates || !a.candidates.length) continue;
      let c = [...a.candidates].sort((a, b) => (l.get(a) || 0) - (l.get(b) || 0)),
        e = c.find(b => d(j.idom, b, a.header)) || c.find(c => (b.get(a.header) || []).includes(c));
      a.follow = e || c[0], e || m.push({
        kind: "multiple-loop-exits",
        header: a.header.id,
        exits: c.map(a => a.id)
      });
    }
    let p = new Map(a.blocks.map(a => [a.id, a])),
      q = b => {
        let c = p.get(b);
        return c && a.members.has(b) ? c : null;
      },
      r = (a, b) => b === a.follow || b === e ? !1 : a.members.has(b) ? !0 : d(i.idom, a.header, b) ? !a.follow || !d(i.idom, a.follow, b) : !1,
      s = (a, b) => {
        let c = b.loops.length - 1;
        for (let d = c; d >= 0; d -= 1) {
          let e = b.loops[d];
          if (a === e.header) return d === c ? {
            kind: "continue",
            loop: e
          } : null;
          if (a === e.follow) return d === c ? {
            kind: "break",
            loop: e
          } : null;
        }
        return null;
      },
      t = (a, b) => {
        let c = s(a, b);
        return c || (n.add(a.id), {
          kind: "goto",
          target: a.id
        });
      },
      u = (a, b, c, d) => {
        let f = [],
          g = a;
        for (let a = 0; g && a < 1e5 && g !== b; a += 1) {
          if (!(d && a === 0)) {
            let a = s(g, c);
            if (a) {
              f.push(a);
              break;
            }
          }
          if (o.has(g)) {
            f.push(t(g, c));
            break;
          }
          let h = k.get(g);
          if (h && !c.loops.includes(h)) {
            f.push(x(h, c)), g = h.follow;
            continue;
          }
          o.add(g), f.push({
            kind: "block",
            block: g
          });
          let i = g.terminator;
          if (i.kind === "return" || i.kind === "unknown") {
            f.push({
              kind: i.kind === "return" ? "return" : "raw",
              block: g
            });
            break;
          }
          if (i.kind === "goto") {
            let a = q(i.target);
            if (!a) {
              m.push({
                kind: "missing-target",
                from: g.id,
                to: i.target
              });
              break;
            }
            if (a === b) break;
            let d = k.get(a),
              e = t(a, c);
            if (e.kind === "goto" && !o.has(a) && (!d || !c.loops.includes(d))) {
              n.delete(a.id), g = a;
              continue;
            }
            f.push(e);
            break;
          }
          if (i.kind === "branch") {
            let a = j.idom.get(g),
              d = a && a !== e && a !== g ? a : null,
              h = c.loops[c.loops.length - 1];
            if (d && h && !r(h, d) && (d = null), f.push(w(g, i, d, c)), !d || d === b || o.has(d)) break;
            g = d;
            continue;
          }
          break;
        }
        return {
          kind: "seq",
          items: f
        };
      },
      v = a => !a || !a.items || a.items.length === 0,
      w = (a, b, c, d) => {
        let e = q(b["B"]),
          f = b.h === null ? null : q(b.h),
          g = e ? u(e, c, d) : {
            kind: "seq",
            items: []
          },
          h = f ? u(f, c, d) : {
            kind: "seq",
            items: [{
              kind: "return",
              block: a
            }]
          };
        return v(g) && !v(h) ? {
          kind: "if",
          block: a,
          condition: b.condition,
          negate: !0,
          then: h,
          else: null
        } : {
          kind: "if",
          block: a,
          condition: b.condition,
          negate: !1,
          then: g,
          else: v(h) ? null : h
        };
      },
      x = (a, b) => {
        let c = {
            ...b,
            loops: [...b.loops, a]
          },
          d = a.header,
          e = d.terminator;
        if (e.kind === "branch") {
          let b = q(e["B"]),
            f = e.h === null ? null : q(e.h),
            g = b && a.members.has(b),
            h = f && a.members.has(f),
            i = b => b === a.follow || b === null && a.follow === null;
          if (g && !h && i(f)) return o.add(d), {
            kind: "while",
            loop: a,
            header: d,
            condition: e.condition,
            negate: !1,
            body: u(b, d, c, !0),
            nt: f === null
          };
          if (h && !g && i(b)) return o.add(d), {
            kind: "while",
            loop: a,
            header: d,
            condition: e.condition,
            negate: !0,
            body: u(f, d, c, !0),
            nt: !1
          };
        }
        if (a.latches.length === 1 && a.latches[0] !== d) {
          let b = a.latches[0],
            e = b.terminator;
          if (e.kind === "branch") {
            let f = q(e["B"]),
              g = e.h === null ? null : q(e.h),
              h = g === d && f === a.follow,
              i = f === d && g === a.follow;
            if (h || i) {
              o.add(b);
              let f = u(d, b, c, !0);
              return {
                kind: "repeat",
                loop: a,
                latch: b,
                condition: e.condition,
                negate: i,
                body: f
              };
            }
          }
        }
        return m.push({
          kind: "unstructured-loop",
          header: d.id
        }), {
          kind: "loop",
          loop: a,
          header: d,
          body: u(d, null, c, !0)
        };
      },
      y = u(a.entry, null, {
        loops: []
      }),
      z = new Map(a.blocks.map((a, b) => [a, b])),
      aa = [];
    for (let a = 0; a < 1e4; a += 1) {
      let a = null,
        b = 1 / 0;
      for (let c of n) {
        let d = p.get(c);
        if (!d || o.has(d)) continue;
        let e = z.has(d) ? z.get(d) : 1 / 0;
        e < b && (b = e, a = d);
      }
      if (!a) break;
      aa.push({
        kind: "labelled",
        id: a.id,
        region: u(a, null, {
          loops: []
        })
      });
    }
    aa.length && y.items.push(...aa);
    let ab = a.blocks.filter(a => !o.has(a));
    for (let a of ab) m.push({
      kind: "unplaced-block",
      block: a.id
    });
    return {
      fn: a,
      region: y,
      labels: n,
      loops: k,
      warnings: m,
      unplaced: ab,
      dom: i,
      vi: j
    };
  }
  b.exports = {
    ts: i
  };
});
var ah = a((a, b) => {
  "use strict";

  var c = e(),
    {
      "Kind": d
    } = c,
    {
      y: f
    } = g(),
    {
      walk: h,
      transform: i
    } = l(),
    {
      es: j,
      et: k,
      ns: n,
      liveness: o
    } = ae(),
    {
      de: p,
      unparen: q
    } = m(),
    {
      "REF": r,
      "LIVE": s,
      "Hr": t,
      definition: u,
      peel: v,
      "Yr": w
    } = ac(),
    {
      ts: x
    } = ag(),
    y = (a, b) => !!b && p(a) === b,
    z = a => a.container["Qt"] || (b => y(b, a.container.upvals)),
    aa = a => a.upvalues && a.upvalues["Xt"] || (b => !!a.upvalues && y(b, a.upvalues.alloc)),
    ab = a => a.upvalues && a.upvalues["Zt"] || (b => !!a.upvalues && y(b, a.upvalues.table)),
    ad = a => a.upvalues && a.upvalues["Mn"] || (b => !!a.upvalues && y(b, a.upvalues.refs));
  function af(a) {
    return i(a, a => {
      if (a.kind !== d["Call"] || (a.args || []).length !== 1 || !a.base || a.base.kind !== d["Name"] || a.base.name !== "unpack") return a;
      let b = ar(a.args[0]);
      return b && b.length === 1 ? b[0] : a;
    });
  }
  function ah(a) {
    for (; a.length && a[a.length - 1].kind === d["Continue"];) a.pop();
    let b = a[a.length - 1];
    if (!b || b.kind !== d["If"]) return a;
    ah(b.body.statements);
    for (let a of b.s || []) ah(a.body.statements);
    return b.e && (ah(b.e.statements), b.e.statements.length || (b.e = null)), a;
  }
  function ai(a) {
    return typeof a == "string" && (a["startsWith"]("alloc:") || a["startsWith"]("param:"));
  }
  function aj(a, b, c) {
    if (!a || a.kind !== d["Index"] || !b(c(a.base))) return null;
    let e = q(c(a.index));
    return e && e.kind === d["Number"] ? e.value : null;
  }
  function ak(a, b) {
    let c = null,
      d = a => {
        !a || typeof a != "object" || b(a, c) !== !1 && (a.kind === r || a.kind === s || t(a, a => (d(a), a)));
      };
    for (let b of a.blocks) {
      c = b;
      for (let a of b.statements) {
        for (let b of a.exprs) d(b);
        for (let b of a.targets) b.node && d(b.node);
      }
    }
  }
  function al(a, b) {
    let c = 0,
      e = !1,
      f = a.container.args;
    return ak(b, (a, b) => {
      if (a.kind === d["Index"] && y(a.base, f)) {
        let e = q(v(b, a.index));
        if (e && e.kind === d["Number"] && Number["isInteger"](e.value) && e.value > 0) return c = Math.max(c, e.value), !1;
      }
      a.kind === d["Name"] && p(a) === f && (e = !0);
    }), {
      arity: c,
      rs: e
    };
  }
  function am(a, b) {
    if (!(!a || typeof a != "object")) {
      if (a.kind === r) {
        b.push(a);
        return;
      }
      a.kind !== s && t(a, a => (am(a, b), a));
    }
  }
  function an(a, b) {
    if (!(!a || typeof a != "object")) {
      if (a.kind === s) {
        b.add(a.reg);
        return;
      }
      a.kind !== r && t(a, a => (an(a, b), a));
    }
  }
  var ao = Symbol("top");
  function ap(a) {
    if (!a || typeof a != "object") return a;
    let b = t(a, ap);
    return delete b.binding, delete b.bindings, b;
  }
  function aq(a) {
    return !!a && a.kind === d["Call"] && a.base && a.base.kind === d["Name"] && a.base.name === "unpack" && (a.args || []).length === 1;
  }
  function ar(a) {
    if (!a) return null;
    if (a.kind === d["Paren"]) {
      let b = q(a);
      return c.d(b) ? null : ar(b);
    }
    let b = a;
    if (b.kind === d["Table"]) {
      let a = b.entries || [];
      if (!a.every(a => a.type === "item")) return null;
      let c = a.map(a => a.value);
      if (c.length === 1 && aq(c[0])) {
        let a = ar(c[0]);
        if (a) return a;
      }
      return c;
    }
    return aq(b) ? ar(b.args[0]) : null;
  }
  var as = (a, b) => b ? a && a.kind === d["Unary"] && a.operator === "not" ? a.argument : c.unary("not", a) : a;
  function at(a, b) {
    let c = z(a),
      e = aa(a),
      f = (a, b, f, g) => {
        if (!b) return ao;
        if (b.kind === r) return g.get(`${b.index}.${b.slot}`) || ao;
        if (b.kind === s) return f.get(b.reg) || ao;
        let h = b => v(a, b),
          i = aj(b, c, h);
        return i !== null ? `param:${i}` : b.kind === d["Call"] && e(h(b.base)) ? `alloc:${a.id}:${b.ss}` : ao;
      };
    for (let a of b.blocks) a.statements["forEach"]((b, c) => {
      for (let f of b.exprs) f && f.kind === d["Call"] && e(v(a, f.base)) && (f.ss = c);
    });
    let g = new Map(),
      h = new Map();
    for (let a of b.blocks) g.set(a, new Map()), h.set(a, new Map());
    let {
        ue: i,
        "Qr": j
      } = o(b),
      k = new Set(),
      l = (a, b) => {
        let c = new Map();
        for (let d of b) {
          let b = a.get(d);
          b !== void 0 && c.set(d, b);
        }
        return c;
      },
      m = a => {
        let b = new Map(g.get(a)),
          c = new Map();
        return a.statements["forEach"]((d, e) => {
          let g = d.targets.length === 1 && d.exprs.length === 1;
          d.targets["forEach"]((h, i) => {
            let j = g ? f(a, d.exprs[0], b, c) : ao;
            c.set(`${e}.${i}`, j), h.reg && b.set(h.reg, j);
          });
        }), a["Je"] = c, l(b, j.get(a) || k);
      },
      n = (a, b) => {
        let c = i.get(a) || k,
          d = new Map();
        for (let e of a.predecessors) {
          if (!b.members.has(e.id)) continue;
          let a = h.get(e);
          if (!(!a || !a.size)) for (let b of c) {
            let c = a.get(b);
            c !== void 0 && (d.has(b) ? d.get(b) !== c && d.set(b, ao) : d.set(b, c));
          }
        }
        return d;
      };
    for (let a = 0; a < 1e3; a += 1) {
      let a = !1;
      for (let c of b.blocks) {
        let d = c === b.entry ? new Map() : n(c, b),
          e = g.get(c),
          f = e.size !== d.size;
        if (!f) {
          for (let [a, b] of d) if (e.get(a) !== b) {
            f = !0;
            break;
          }
        }
        f && (g.set(c, d), a = !0);
        let i = m(c),
          j = h.get(c),
          k = j.size !== i.size;
        if (!k) {
          for (let [a, b] of i) if (j.get(a) !== b) {
            k = !0;
            break;
          }
        }
        k && (h.set(c, i), a = !0);
      }
      if (!a) break;
    }
    for (let a of b.blocks) a.os = g.get(a);
    return {
      xi: g,
      "Si": h,
      us: f
    };
  }
  var au = class {
    constructor(a, b, c = {}) {
      this.vm = a, this.cfg = b, this.options = c, this.warnings = [], this.counter = c.counter || 0, this["He"] = new Map(b.functions.map(a => [a.id, a])), this.ls = new Set(a.wrapper && a.wrapper.bindings ? a.wrapper.bindings : []), this.as = new Set(Object.keys(a.roles).map(b => a.roles[b])), this.cs = new Map(Object.keys(a.roles).map(b => [a.roles[b], b])), this.tt = ab(a), this.fs = ad(a), this.ds = a.upvalues && a.upvalues["Jt"] || (() => !1), this.active = new Set();
    }
    fresh(a) {
      return this.counter += 1, `${a}${this.counter}`;
    }
    warn(a, b) {
      this.warnings.push({
        kind: a,
        ...b
      });
    }
    "T"(a) {
      if (!a) return null;
      if (this.vm["T"]) return this.vm["T"](a);
      let b = p(a);
      return b && this.vm.creators.get(b) || null;
    }
    hs(a, b) {
      if (!b || b.kind !== d["Call"]) return !1;
      let c = v(a, b.base),
        e = p(c);
      return !(!e || !this.ls.has(e) && !this.ds(c) || this.as.has(e) || this["T"](c) || e === this.vm.nr);
    }
    gs(a, b, c) {
      return a["Je"] ? a["Je"].get(`${b}.${c}`) : ao;
    }
    ps(a, b, c) {
      for (let c of b.targets) if (c.node && this.fs(v(a, c.node.base))) return !0;
      return b.exprs.length === 1 && this.hs(a, b.exprs[0]) ? b.targets.every(a => a.reg !== null) : !!(b.targets.length && !b.ordered && b.targets.every((b, d) => b.reg && ai(this.gs(a, c, d))));
    }
    "Qe"(a, b) {
      let c = a.en.get(b);
      return c || (c = this.fresh("v"), a.en.set(b, c)), a.used.add(c), c;
    }
    nn(a, b) {
      if (b === ao || b === void 0 || b === null) return null;
      let c = a.cells.get(b);
      if (c) return a.used.add(c), c;
      if (typeof b != "string" || !b["startsWith"]("alloc:")) return null;
      let d = this.fresh("u");
      return a.cells.set(b, d), a.st.set(d, b), a.used.add(d), d;
    }
    it(a) {
      let b = a.params.map(a => ({
        type: "item",
        value: c.name(a)
      }));
      return b.push({
        type: "item",
        value: c.vararg()
      }), c.table(b);
    }
    ks(a) {
      if (a === "varargs") {
        let a = this.options.varargs;
        return a ? ap(a) : c.table([{
          type: "item",
          value: c.vararg()
        }]);
      }
      return a === "env" ? c.name("_ENV") : c.name(a);
    }
    bs(a, b, e) {
      let g = this.vm,
        h = g.container;
      if (a.kind === d["Index"]) {
        let i = v(b.block, a.base);
        if (this.tt(i)) {
          let d = this.nn(b, b.xe(a.index));
          if (d) return c.name(d);
        }
        let j = y(i, g.roles.env),
          k = y(i, h.args);
        if (j || k) {
          let g = q(e(a.index));
          return j ? g && g.kind === d["String"] && f(g.value) ? c.name(g.value) : c.index(c.name("_ENV"), g) : g && g.kind === d["Number"] && Number["isInteger"](g.value) && g.value >= 1 && g.value <= b.params.length ? c.name(b.params[g.value - 1]) : c.index(this.it(b), g);
        }
      }
      if (a.kind === d["Call"] && this["T"](v(b.block, a.base))) {
        let c = this.ms(a, b);
        if (c) return c;
      }
      if (a.kind === d["Name"]) {
        let c = p(a);
        if (c && c === h.args) return this.it(b);
        let d = c ? this.cs.get(c) : null;
        if (d) return this.ks(d);
      }
      return t(a, e);
    }
    ms(a, b) {
      let c = a.args || [],
        e = q(v(b.block, c[0]));
      if (!e || e.kind !== d["Number"]) return null;
      let f = this["He"].get(e.value);
      return f ? this.ot(f, this.ws(c[1], b), b.depth + 1) : (this.warn("missing-closure", {
        id: e.value,
        block: b.block.id
      }), null);
    }
    ws(a, b) {
      let c = a;
      for (let a = 0; a < 64 && c && c.kind === r; a += 1) c = u(b.block, c);
      let e = c ? q(c) : null;
      return !e || e.kind !== d["Table"] ? (a && this.warn("opaque-upvalues", {
        block: b.block.id
      }), []) : (e.entries || []).map((a, c) => {
        if (a.type !== "item") return null;
        let d = b.xe(a.value),
          e = this.nn(b, d);
        return e || this.warn("opaque-upvalue", {
          block: b.block.id,
          slot: c + 1,
          token: String(d)
        }), e;
      });
    }
    "H"(a, b) {
      let c = b.emitters.get(a);
      if (c) return c;
      let d = {
        block: a,
        statements: [],
        condition: null,
        returns: null
      };
      return b.emitters.set(a, d), this.ys(d, a, b), d;
    }
    ys(a, b, d) {
      let e = this.vm,
        f = b.statements,
        g = b.terminator,
        h = (a, b) => `${a}.${b}`,
        i = a => d.webs.find(k(b, a)),
        j = (a, c) => d.webs.find(n(b, a, c));
      d.block = b;
      let l = new Map();
      f["forEach"]((a, b) => a.targets["forEach"](a => {
        a.reg && (l.has(a.reg) || l.set(a.reg, []), l.get(a.reg).push(b));
      }));
      let m = a => {
          let b = l.get(a);
          return b ? b[b.length - 1] : -1;
        },
        o = new Map(),
        p = a => {
          let b = o.get(a);
          if (b) return b;
          b = [];
          for (let c of f[a].exprs) am(c, b);
          for (let c of f[a].targets) c.node && am(c.node, b);
          return o.set(a, b), b;
        },
        q = a => {
          let b = new Set();
          for (let c of f[a].exprs) an(c, b);
          for (let c of f[a].targets) c.node && an(c.node, b);
          return b;
        },
        t = [];
      g.kind === "branch" && am(g.condition, t);
      let v = new Set(t.map(a => a.index)),
        x = new Set(),
        y = g.index === null || g.index === void 0 ? [] : [g.index];
      for (; y.length;) {
        let a = y.pop();
        if (!x.has(a)) {
          x.add(a);
          for (let b of p(a)) {
            if (v.has(b.index)) continue;
            let a = f[b.index].targets[b.slot];
            a && a.reg === e["Xe"] && y.push(b.index);
          }
        }
      }
      f["forEach"]((a, c) => {
        this.ps(b, a, c) && x.add(c);
      });
      let z = null;
      if (g.kind === "return" || g.kind === "unknown" || g.kind === "branch" && g.h === null) {
        let a = (l.get(e["Vr"]) || []).filter(a => !x.has(a)),
          b = a.length ? a[a.length - 1] : null;
        if (b !== null) {
          let a = t.some(a => a.index === b);
          for (let c = b + 1; !a && c < f.length; c += 1) a = p(c).some(a => a.index === b);
          a || (z = b, x.add(b));
        }
      }
      let aa = z === null ? [] : p(z),
        ab = [];
      for (let a = 0; a < f.length; a += 1) x.has(a) || ab.push(a);
      let ac = a => {
          let c = new Set(),
            d = new Map(),
            e = new Map();
          for (let g = 0; g <= f.length + 1; g += 1) {
            d.clear(), e.clear();
            let g = (a, b) => {
              for (let c of a) {
                let a = h(c.index, c.slot);
                d.set(a, (d.get(a) || 0) + 1), e.set(a, b);
              }
            };
            for (let a of ab) c.has(a) || g(p(a), a);
            g(aa, f.length), g(t, f.length);
            let i = !1;
            for (let e of ab) c.has(e) || this.vs(b, f[e], e, d, a, m) || (c.add(e), i = !0);
            if (!i) break;
          }
          let g = new Set();
          for (let e of ab) {
            if (c.has(e)) continue;
            let i = f[e].targets.length > 1;
            f[e].targets["forEach"]((c, f) => {
              if (!c.reg) return;
              let j = h(e, f),
                k = b.ve.has(c.reg) && m(c.reg) === e;
              (i || k || a.has(j) || (d.get(j) || 0) !== 1) && g.add(j);
            });
          }
          return {
            drop: c,
            counts: d,
            host: e,
            materialized: g
          };
        },
        ad = a => {
          let {
              drop: b,
              host: c,
              materialized: d
            } = a,
            e = a => {
              let e = a;
              for (let a = 0; a < 512; a += 1) {
                let a = c.get(e);
                if (a === void 0 || a >= f.length || b.has(a)) return f.length;
                let g = f[a].targets[0];
                if (f[a].targets.length !== 1 || !g || !g.reg) return a;
                let i = h(a, 0);
                if (d.has(i)) return a;
                e = i;
              }
              return f.length;
            },
            g = new Set();
          for (let a of ab) {
            if (b.has(a) || f[a].targets.length !== 1) continue;
            let c = h(a, 0);
            if (d.has(c) || !f[a].targets[0].reg) continue;
            let i = e(c);
            for (let d of q(a)) for (let e of l.get(d) || []) e > a && e < i && !b.has(e) && !x.has(e) && g.add(c);
          }
          return g;
        },
        ae = a => {
          let {
              drop: e,
              counts: k,
              materialized: l
            } = a,
            m = this.warnings.length,
            n = [],
            o = [],
            p = null,
            q = new Map(),
            t = a => {
              if (q.has(a)) return q.get(a);
              let b = f[a],
                c = "read";
              return b.targets.some(a => a.node !== null) ? c = "store" : b.exprs.some(w) && (c = "call"), q.set(a, c), c;
            },
            v = -1,
            y = -1,
            aa = -1,
            ac = a => {
              let b = t(a),
                c = aa;
              b === "store" ? c = v : b === "call" && (c = y), a < c && (p === null && (p = {
                small: a,
                large: c
              }), o.push({
                small: a,
                large: c
              })), a > v && (v = a), b !== "read" && a > y && (y = a), b === "store" && a > aa && (aa = a);
            },
            ad = a => {
              if (!a || typeof a != "object") return a;
              if (a.kind === s) return c.name(this["Qe"](d, i(a.reg)));
              if (a.kind === r) {
                let g = h(a.index, a.slot);
                if (l.has(g)) return c.name(this["Qe"](d, j(a.index, a.slot)));
                if (x.has(a.index) || e.has(a.index)) return this.warn("dangling-value", {
                  block: b.id,
                  at: a.index
                }), c.nil();
                let i = ad(u(b, a));
                return f[a.index].ordered && ac(a.index), c.d(i) ? c.paren(i) : i;
              }
              let g = this.bs(a, d, ad);
              return a.truncated && c.d(g) ? c.paren(g) : g;
            },
            ae = ab.filter(a => {
              if (e.has(a)) return !1;
              let b = f[a];
              return b.targets.some(a => !a.reg) || b.targets.some((b, c) => l.has(h(a, c))) ? !0 : b.targets.every((b, c) => (k.get(h(a, c)) || 0) === 0);
            });
          for (let a of ae) n.push(...this.xs(a, f[a], d, {
            render: ad,
            note: ac,
            block: b
          }));
          let af = g.kind === "branch" ? ad(g.condition) : null,
            ag = z === null ? null : ad(f[z].exprs[0]);
          return {
            out: n,
            condition: af,
            returns: ag,
            violation: p,
            violations: o,
            warnings: this.warnings.splice(m)
          };
        },
        af = new Set(),
        ag = null,
        ah = ab.length + 16;
      for (let a = 0; a < ah; a += 1) {
        let a = ac(af),
          b = ad(a),
          c = !1;
        for (let a of b) af.has(a) || (af.add(a), c = !0);
        if (c) continue;
        if (ag = ae(a), !ag.violation) break;
        let d = b => !a.drop.has(b) && !a.materialized.has(h(b, 0)),
          e = a => {
            for (let b = 0; b < f[a].targets.length; b += 1) af.add(h(a, b));
          },
          g = !1;
        for (let {
          small: a,
          large: b
        } of ag.violations) d(a) ? (e(a), g = !0) : d(b) && (e(b), g = !0);
        if (!g) break;
      }
      if (ag || (ag = ae(ac(af))), ag.violation) {
        let {
          small: a,
          large: c
        } = ag.violation;
        this.warn("evaluation-order", {
          block: b.id,
          small: a,
          large: c
        });
      }
      this.warnings.push(...ag.warnings), a.statements = ag.out, a.condition = () => ag.condition || c.nil(), a.returns = () => {
        let a = ag.returns;
        if (!a) return c["I"]([]);
        let b = ar(a);
        return b ? c["I"](b) : c["I"]([c.call(c.name("unpack"), [a])]);
      };
    }
    xs(a, b, d, e) {
      let f = this.vm,
        {
          render: g,
          note: h,
          block: i
        } = e,
        j = b.targets.length === 1 ? b.targets[0] : null;
      if (j && j.node && this.tt(v(i, j.node.base))) {
        let e = this.nn(d, d.xe(j.node.index));
        if (e) {
          let d = g(b.exprs[0]);
          return b.ordered && h(a), [c.assignment([c.name(e)], [d])];
        }
      }
      let k = b.targets.map((b, e) => b.reg ? c.name(this["Qe"](d, d.webs.find(n(i, a, e)))) : g(b.node)),
        l = b.exprs.map(g);
      return k.length === 1 && l.length === 1 && (l[0] = c.unparen(l[0])), b.ordered && h(a), k.length ? [c.assignment(k, l)] : l.length ? [c["X"](l[0])] : [];
    }
    vs(a, b, c, d, e, f) {
      return b.ordered ? !0 : b.targets.some((b, g) => !b.reg || e.has(`${c}.${g}`) || a.ve.has(b.reg) && f(b.reg) === c ? !0 : (d.get(`${c}.${g}`) || 0) > 0);
    }
    "Se"(a, b) {
      if (!a) return [];
      let c = a.id;
      return !b.structured.labels.has(c) || b.labelled.has(c) ? [] : (b.labelled.add(c), [{
        kind: d["Label"],
        name: `L${c}`
      }]);
    }
    "L"(a, b) {
      let e = [];
      if (!a || !a.items) return e;
      for (let f of a.items) if (f.kind === "block") e.push(...this["Se"](f.block, b)), e.push(...this["H"](f.block, b).statements);else if (f.kind === "return") e.push(this["H"](f.block, b).returns());else if (f.kind === "raw") this.warn("unknown-exit", {
        block: f.block.id
      }), e.push(c["I"]([]));else if (f.kind === "if") {
        let a = this["H"](f.block, b);
        e.push(c["Z"](as(a.condition(), f.negate), c.block(this["L"](f.then, b)), [], f.else ? c.block(this["L"](f.else, b)) : null));
      } else if (f.kind === "while") e.push(...this["Se"](f.loop && f.loop.header, b)), e.push(...this["Ss"](f, b));else if (f.kind === "repeat") {
        e.push(...this["Se"](f.loop && f.loop.header, b));
        let a = this["H"](f.latch, b),
          d = [...this["L"](f.body, b), ...a.statements];
        e.push(c.bn(c.block(ah(d)), as(a.condition(), f.negate)));
      } else f.kind === "loop" ? (e.push(...this["Se"](f.loop && f.loop.header, b)), e.push(c.ae(c.boolean(!0), c.block(ah(this["L"](f.body, b)))))) : f.kind === "break" ? e.push(c["Ee"]()) : f.kind === "continue" ? e.push({
        kind: d["Continue"]
      }) : f.kind === "goto" ? e.push({
        kind: d["Goto"],
        label: `L${f.target}`
      }) : f.kind === "labelled" ? (b.labelled.add(f.id), e.push({
        kind: d["Label"],
        name: `L${f.id}`
      }), e.push(...this["L"](f.region, b))) : f.kind === "seq" ? e.push(...this["L"](f, b)) : this.warn("unhandled-region", {
        kind: f.kind
      });
      return e;
    }
    "Ss"(a, b) {
      let d = this["H"](a.header, b),
        e = as(d.condition(), a.negate),
        f = this["L"](a.body, b),
        g = [];
      return d.statements.length === 0 ? g.push(c.ae(e, c.block(ah(f)))) : g.push(c.ae(c.boolean(!0), c.block(ah([...d.statements, c["Z"](as(e, !0), c.block([c["Ee"]()]), [], null), ...f])))), a.nt && g.push(d.returns()), g;
    }
    ot(a, b, e) {
      if (e > 200 || this.active.has(a)) return this.warn("recursive-closure", {
        id: a.id
      }), c.func([], c.block([]), !1);
      this.active.add(a);
      let f = al(this.vm, a),
        g = at(this.vm, a),
        i = x(a);
      for (let b of i.warnings) this.warn(b.kind, {
        ...b,
        fn: a.id
      });
      let k = [];
      for (let a = 1; a <= f.arity; a += 1) k.push(this.fresh("a"));
      let l = new Set();
      for (let a of i.loops.values()) for (let b of a.members) l.add(b.id);
      let m = {
        fn: a,
        depth: e,
        params: k,
        structured: i,
        "Ns": l,
        labelled: new Set(),
        webs: j(a),
        en: new Map(),
        cells: new Map(),
        st: new Map(),
        used: new Set(),
        emitters: new Map(),
        block: a.entry,
        "Cs": g.us,
        xe: null
      };
      m.xe = a => m["Cs"](m.block, a, m.block.os, m.block["Je"]), b["forEach"]((a, b) => {
        a && m.cells.set(`param:${b + 1}`, a);
      });
      for (let b of a.blocks) this["H"](b, m);
      let n = this["Fs"](m, a),
        o = this["L"](i.region, m),
        p = new Set();
      h(c.block(o), {
        enter(a) {
          a.kind === d["Name"] && p.add(a.name);
        }
      });
      let q = [...m.en.values()].filter(a => p.has(a)),
        r = n.filter(a => p.has(a));
      return (q.length || r.length) && o.unshift(c["R"]([...q, ...r], [])), this.active.delete(a), c.func(k, c.block(o), !!a.vararg || f.rs);
    }
    "Fs"(a, b) {
      let d = [],
        e = new Map(b.blocks.map(a => [String(a.id), a]));
      for (let [b, f] of a.st) {
        if (!a.used.has(b)) continue;
        let g = e.get(f.split(":")[1]),
          h = g ? a.emitters.get(g) : null;
        g && h && a["Ns"].has(g.id) ? h.statements.unshift(c["R"]([b], [])) : d.push(b);
      }
      return d;
    }
    lift() {
      let a = this["He"].get(this.vm.entry["O"]);
      if (!a) return this.warn("missing-entry", {
        id: this.vm.entry["O"]
      }), {
        body: c.block([]),
        params: [],
        w: !1,
        warnings: this.warnings,
        counter: 0
      };
      let b = this.ot(a, [], 0);
      return {
        body: af(b.body),
        params: b.params,
        w: b.w,
        warnings: this.warnings,
        counter: this.counter
      };
    }
  };
  function av(a, b, c = {}) {
    return new au(a, b, c).lift();
  }
  b.exports = {
    ut: ar,
    tn: av
  };
});
var ai = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    {
      "D": d
    } = j(),
    {
      transform: f,
      walk: g
    } = l(),
    {
      diverges: h,
      zn: i,
      bare: k
    } = y(),
    m = q();
  function n(a) {
    if (!a) return !0;
    let b = k(a);
    if (!b) return !0;
    switch (b.kind) {
      case c["Name"]:
      case c["Nil"]:
      case c["True"]:
      case c["False"]:
      case c["Number"]:
      case c["String"]:
      case c["Vararg"]:
        return !0;
      case c["Unary"]:
        return n(b.argument);
      case c["Binary"]:
        return n(b.lhs) && n(b.rhs);
      default:
        return !1;
    }
  }
  function o(a) {
    return {
      kind: c["Do"],
      body: a,
      qs: !0
    };
  }
  function p(a, b) {
    let c = [{
        condition: a.condition,
        body: a.body
      }, ...(a.s || []).map(a => ({
        ...a
      }))],
      d = a.e;
    if (!d || !c.every(a => n(a.condition))) return null;
    let e = c.map(a => i(a.body)),
      f = i(d);
    if (e.filter(a => !a).length + (f ? 0 : 1) !== 1) return null;
    if (b.guards += 1, !f) return o(d);
    let g = e["indexOf"](!1);
    return o(c[g].body);
  }
  function r(a) {
    if (a.kind !== c["CallStatement"]) return !1;
    let b = k(a.expression);
    if (!b || b.kind !== c["MethodCall"] || b.method !== "gsub") return !1;
    let e = k(b.base);
    if (!e || e.kind !== c["String"]) return !1;
    let f = b.args || [];
    if (f.length !== 2) return !1;
    let g = k(f[0]);
    if (!g || g.kind !== c["String"]) return !1;
    let h = k(f[1]);
    if (!h || h.kind !== c["Function"]) return !1;
    let i = h.body && h.body.statements || [];
    if (i.length !== 1 || i[0].kind !== c["Assignment"]) return !1;
    let j = i[0].targets || [];
    return j.length === 1 && d(j[0]);
  }
  function s(a) {
    if (a.kind !== c["If"] || (a.s || []).length) return !1;
    let b = a.body && a.body.statements || [];
    if (b.length !== 1 || b[0].kind !== c["Return"] || (b[0].expressions || []).length) return !1;
    let e = k(a.condition);
    if (!e || e.kind !== c["Binary"] || e.operator !== "~=") return !1;
    let f = [k(e.lhs), k(e.rhs)],
      g = f.find(a => d(a)),
      h = f.find(a => a && a.kind === c["String"]);
    return !!g && !!h;
  }
  function t(a, b) {
    let d = [{
        condition: a.condition,
        body: a.body
      }, ...(a.s || []).map(a => ({
        ...a
      }))],
      e = [],
      f = null;
    for (let a of d) {
      let b = m.truthiness(a.condition);
      if (b !== !1) {
        if (b === !0) {
          f = a;
          break;
        }
        e.push(a);
      }
    }
    let g = f ? f.body : a.e;
    return !(d.length - e.length - (f ? 1 : 0)) && !f ? null : (b.constants += 1, e.length ? {
      kind: c["If"],
      condition: e[0].condition,
      body: e[0].body,
      s: e.slice(1),
      e: g
    } : o(g || {
      kind: c["Block"],
      statements: []
    }));
  }
  function u(a) {
    let b = 0;
    return g(a, {
      enter(a) {
        if (a.kind !== c["Block"]) return;
        let d = [];
        for (let e of a.statements) e.kind === c["Do"] && e.qs ? (b += 1, d.push(...(e.body && e.body.statements || []))) : d.push(e);
        a.statements = d;
      }
    }), b;
  }
  function v(a, b, d) {
    if (a.kind !== c["If"] || a.s && a.s.length > 0 || a.e && a.e.statements && a.e.statements.length > 0 && !i(a.e)) return !1;
    let e = k(a.condition);
    if (!e || e.kind !== c["Name"]) return !1;
    let f = e.name,
      h = e.binding,
      j = b.slice(0, d),
      l = !1,
      n = !1;
    for (let a of j) g(a, {
      enter(a) {
        if (a.kind === c["String"] && typeof a.value == "string" && /tamper/i.test(a.value) && (l = !0), a.kind === c["Call"] && a.base && a.base.kind === c["Name"] && a.base.name === "error" && a.args && a.args.length && a.args[0].kind === c["String"] && /tamper/i.test(a.args[0].value) && (l = !0), a.kind === c["Assignment"]) for (let b = 0; b < (a.targets || []).length; b += 1) {
          let d = k(a.targets[b]);
          if (d && d.kind === c["Name"] && (d.name === f || h && d.binding === h)) {
            let d = (a.expressions || [])[b];
            d && (d.kind === c["True"] || m.truthiness(d) === !0) && (n = !0);
          }
        }
      }
    });
    return l && n;
  }
  function w(a, b) {
    let d = [];
    for (let e = 0; e < a.statements.length; e += 1) {
      let f = a.statements[e];
      if (v(f, a.statements, e)) {
        b.guards += 1;
        let a = f.body && f.body.statements || [];
        d.push(...a);
        continue;
      }
      if (f.kind === c["Repeat"] && !(f.body.statements || []).length && n(f.condition)) {
        b.loops += 1;
        continue;
      }
      if (f.kind === c["While"] && m.truthiness(f.condition) === !1) {
        b.loops += 1;
        continue;
      }
      if (r(f)) {
        b.watermarks += 1;
        continue;
      }
      if (s(f)) {
        b.watermarks += 1, f.e && d.push(o(f.e));
        continue;
      }
      d.push(f);
    }
    a.statements = d;
  }
  function x(a, b) {
    g(a, {
      enter(a) {
        if (a.kind === c["Block"]) for (let d = 0; d < a.statements.length; d += 1) {
          let e = a.statements[d];
          if ((e.kind === c["Return"] || e.kind === c["Break"] || h(e)) && d + 1 < a.statements.length) {
            b.unreachable += a.statements.length - d - 1, a.statements.length = d + 1;
            break;
          }
        }
      }
    });
  }
  function z(a) {
    let b = {
      guards: 0,
      constants: 0,
      loops: 0,
      watermarks: 0,
      unreachable: 0
    };
    for (let d = 0; d < 16; d += 1) {
      let d = {
        ...b
      };
      if (a.resolve(), f(a.chunk, a => {
        if (a.kind !== c["If"]) return a;
        let d = t(a, b);
        if (d) return d;
        let e = p(a, b);
        return e || a;
      }), u(a.chunk), g(a.chunk, {
        enter(a) {
          a.kind === c["Block"] && w(a, b);
        }
      }), x(a.chunk, b), !Object.keys(b).some(a => b[a] !== d[a])) break;
    }
    let d = b.guards + b.constants + b.loops + b.watermarks;
    d && a.note(`resolved ${b.guards} integrity guard(s), ${b.constants} constant branch(es), dropped ${b.loops} dead loop(s) and ${b.watermarks} watermark(s)`, d);
    for (let c of Object.keys(b)) b[c] && a.bump(`guards.${c}`, b[c]);
  }
  b.exports = {
    name: "05-if",
    run: z
  };
});
var aj = a((a, b) => {
  "use strict";

  var c = e(),
    {
      "Kind": d
    } = c,
    {
      walk: f,
      transform: h,
      collect: i
    } = l(),
    {
      jn: j,
      bare: k
    } = y(),
    {
      y: m
    } = g();
  function n(a, b) {
    let c = k(a),
      e = k(b);
    return !c || !e || c.kind !== e.kind ? !1 : c.kind === d["Name"] ? c.binding ? c.binding === e.binding : c.name === e.name : c.kind === d["Number"] || c.kind === d["String"] ? c.value === e.value : c.kind === d["Nil"] || c.kind === d["True"] || c.kind === d["False"];
  }
  function o(a) {
    let b = k(a);
    return b && b.kind === d["Name"] ? b : null;
  }
  function p(a) {
    if (!a || a.kind !== d["Assignment"]) return null;
    let b = a.targets || [],
      c = a.expressions || [];
    if (b.length !== 1 || c.length !== 1) return null;
    let e = o(b[0]),
      f = k(c[0]);
    return !e || !f || f.kind !== d["Binary"] || f.operator !== "+" || !n(f.lhs, e) ? null : {
      counter: e,
      step: f.rhs
    };
  }
  function q(a, b) {
    let e = k(a);
    if (!e || e.kind !== d["Binary"] || e.operator !== "and") return null;
    let f = [k(e.lhs), k(e.rhs)],
      g = f.find(a => a && a.kind === d["Binary"] && (a.operator === ">=" || a.operator === "<=")),
      h = f.find(a => a !== g);
    if (!g || !h) return null;
    let i = !1,
      j = h;
    if (j.kind === d["Unary"] && j.operator === "not" && (i = !0, j = k(j.argument)), !j) return null;
    let l = g.operator,
      m = g.lhs,
      o = g.rhs;
    if (b && !n(m, b)) {
      if (!n(o, b)) return null;
      m = g.rhs, o = g.lhs, l = l === ">=" ? "<=" : ">=";
    }
    let p = l === ">=";
    if (j.kind === d["True"] || j.kind === d["False"]) {
      let a = j.kind === d["True"] ? !i : i;
      return {
        descending: p,
        "S": c.boolean(p ? a : !a),
        counter: m,
        limit: o
      };
    }
    return j.kind !== d["Name"] || p === i ? null : {
      descending: p,
      "S": j,
      counter: m,
      limit: o
    };
  }
  function r(a, b) {
    let c = k(a);
    if (!c || c.kind !== d["Binary"] || c.operator !== "or") return null;
    let e = q(c.lhs, b),
      f = q(c.rhs, b);
    return !e || !f || e.descending === f.descending || !n(e["S"], f["S"]) || !n(e.counter, f.counter) || !n(e.limit, f.limit) ? null : {
      counter: e.counter,
      limit: e.limit,
      "S": e["S"]
    };
  }
  function s(a, b) {
    if (!a || a.kind !== d["If"] || (a.s || []).length || a.e) return null;
    let c = a.body && a.body.statements || [];
    if (c.length !== 1 || c[0].kind !== d["Break"]) return null;
    let e = k(a.condition);
    return !e || e.kind !== d["Unary"] || e.operator !== "not" ? null : r(e.argument, b);
  }
  function t(a) {
    let b = new Set(),
      c = a => {
        let c = k(a);
        c && c.kind === d["Name"] && c.binding && b.add(c.binding);
      };
    return f(a, {
      enter(a) {
        if (a.kind === d["Assignment"]) (a.targets || [])["forEach"](c);else if (a.kind === d["LocalDeclaration"]) for (let c of a.bindings || []) b.add(c);else if (a.kind === d["NumericFor"]) b.add(a.binding);else if (a.kind === d["GenericFor"]) for (let c of a.bindings || []) b.add(c);
      }
    }), b;
  }
  function u(a, b) {
    let c = !1;
    return f(a, {
      enter(a) {
        a.kind === d["Name"] && a.binding === b && (c = !0);
      }
    }), c;
  }
  function v(a, b, e, f) {
    let g = (a, b) => {
      let e = k(a);
      if (!e) return null;
      if (e.kind === d["Binary"] && e.operator === "-" && n(e.rhs, f)) return {
        start: e.lhs,
        index: b
      };
      let g = k(f);
      return e.kind === d["Number"] && g && g.kind === d["Number"] ? {
        start: c.number(e.value + g.value),
        index: b
      } : null;
    };
    for (let c = b - 1; c >= 0; c -= 1) {
      let b = a[c];
      if (b.kind === d["LocalDeclaration"]) {
        let a = b.bindings || [],
          d = b.expressions || [],
          f = a["indexOf"](e.binding);
        if (f < 0) continue;
        return d.length !== a.length ? null : g(d[f], c);
      }
      if (b.kind !== d["Assignment"]) {
        if (t(b).has(e.binding)) return null;
        continue;
      }
      let f = b.targets || [],
        h = b.expressions || [];
      if (f.some(a => n(a, e))) return f.length !== 1 || h.length !== 1 ? null : g(h[0], c);
    }
    return null;
  }
  function w(a, b) {
    let e = a.statements[b];
    if (!e || e.kind !== d["While"] || !j(e.condition)) return !1;
    let f = e.body && e.body.statements || [];
    if (f.length < 2) return !1;
    let g = p(f[0]);
    if (!g) return !1;
    let h = s(f[1], g.counter);
    if (!h || !n(h.counter, g.counter) || !g.counter.binding) return !1;
    let i = c.block(f.slice(2)),
      l = t(i);
    for (let a of [g.counter, g.step, h.limit, h["S"]]) {
      let b = o(a);
      if (b && b.binding && l.has(b.binding)) return !1;
    }
    if (h["S"].binding && u(i, h["S"].binding)) return !1;
    let m = k(h["S"]),
      q = k(g.step);
    if (m && (m.kind === d["True"] || m.kind === d["False"]) && q && q.kind === d["Number"] && q.value < 0 != (m.kind === d["True"])) return !1;
    let r = v(a.statements, b, g.counter, g.step);
    if (!r) return !1;
    let w = g.counter,
      x = i.statements;
    for (let a = 0; a < x.length; a += 1) {
      let b = ac(x[a]);
      if (!b || !n(b.value, g.counter)) continue;
      if (b.target.binding === g.counter.binding) break;
      let d = c.block(x.slice(0, a)),
        e = c.block(x.slice(a + 1));
      if (u(d, g.counter.binding) || u(e, g.counter.binding) || u(d, b.target.binding) || t(d).has(b.target.binding)) break;
      w = b.target, i.statements = x.slice(0, a).concat(x.slice(a + 1));
      break;
    }
    for (let c of new Set([g.counter.binding, w.binding])) for (let d = b + 1; d < a.statements.length; d += 1) {
      let b = a.statements[d];
      if (u(b, c)) return !1;
      if (t(b).has(c)) break;
    }
    return a.statements[b] = c.mn(w.name, r.start, h.limit, g.step, i), !0;
  }
  function x(a, b, c) {
    for (let d = b - 1; d >= 0; d -= 1) if (t(a[d]).has(c)) return d;
    return -1;
  }
  function z(a, b) {
    return !a || (a.expressions || []).length !== 1 ? null : a.kind === d["LocalDeclaration"] ? (a.names || []).length !== 1 || (a.bindings || [])[0] !== b.binding ? null : {
      holder: a,
      value: a.expressions[0],
      declared: !0
    } : a.kind !== d["Assignment"] || (a.targets || []).length !== 1 || !n(a.targets[0], b) ? null : {
      holder: a,
      value: a.expressions[0],
      declared: !1
    };
  }
  function aa(a, b) {
    let e = a.statements,
      f = e[b];
    if (!f || f.kind !== d["If"] || (f.s || []).length || f.e) return !1;
    let g = f.body && f.body.statements || [];
    if (g.length !== 1) return !1;
    let h = g[0];
    if (!h || h.kind !== d["Assignment"] || (h.targets || []).length !== 1 || (h.expressions || []).length !== 1) return !1;
    let i = o(h.targets[0]);
    if (!i || !i.binding) return !1;
    let j = k(h.expressions[0]);
    if (!j || j.kind === d["Vararg"] || u(j, i.binding)) return !1;
    let l = k(f.condition),
      m = "and";
    l && l.kind === d["Unary"] && l.operator === "not" && (l = k(l.argument), m = "or");
    let p = o(l);
    if (!p || !p.binding || p.binding === i.binding) return !1;
    let q = x(e, b, i.binding);
    if (q < 0) return !1;
    let r = z(e[q], i);
    if (!r || !n(r.value, p)) return !1;
    for (let a = q + 1; a < b; a += 1) if (t(e[a]).has(p.binding)) return !1;
    let s = c.binary(m, c.name(p.name), j);
    return r.declared ? q !== b - 1 ? !1 : (r.holder.expressions = [s], e[b] = c["N"](c.block([])), !0) : (e[b] = c.assignment([c.name(i.name)], [s]), !0);
  }
  function ab(a) {
    if (a.kind !== d["Call"]) return null;
    let b = a.args || [];
    if (!b.length) return null;
    let e = k(a.base);
    if (!e || e.kind !== d["Index"]) return null;
    let f = k(e.index);
    return !f || f.kind !== d["String"] || !m(f.value) || !n(e.base, b[0]) ? null : c["Le"](e.base, f.value, b.slice(1));
  }
  function ac(a) {
    if (!a || a.kind !== d["Assignment"]) return null;
    let b = a.targets || [],
      c = a.expressions || [];
    if (b.length !== 1 || c.length !== 1) return null;
    let e = o(b[0]);
    return !e || !e.binding ? null : {
      target: e,
      value: c[0]
    };
  }
  function ad(a) {
    let b = k(a);
    return !b || b.kind !== d["Number"] || !Number["isInteger"](b.value) || b.value < 1 ? null : b.value;
  }
  function ae(a) {
    let b = o(a);
    if (b) return b.binding ? b : null;
    let d = k(a);
    return c["Y"](d) ? d : null;
  }
  function af(a) {
    let b = new Map(),
      c = new Map(),
      e = new Set(),
      g = (a, b, c) => {
        if (!b) return;
        let d = a.get(b);
        d ? d.push(c) : a.set(b, [c]);
      };
    f(a, {
      enter(a) {
        if (a.kind === d["Assignment"]) for (let b of a.targets || []) {
          let f = k(b);
          f && f.kind === d["Name"] && (e.add(f), g(c, f.binding, a));
        } else if (a.kind === d["LocalDeclaration"]) {
          if ((a.expressions || []).length) for (let b of a.bindings || []) g(c, b, a);
        } else if (a.kind === d["NumericFor"]) g(c, a.binding, a);else if (a.kind === d["GenericFor"]) for (let b of a.bindings || []) g(c, b, a);else a.kind === d["Name"] && g(b, a.binding, a);
      }
    });
    for (let [a, c] of b) b.set(a, c.filter(a => !e.has(a)));
    return {
      reads: b,
      writes: c
    };
  }
  function ag(a, b) {
    let c = 0,
      e = new Set();
    return f(a, {
      enter(a) {
        if (a.kind === d["Assignment"]) for (let b of a.targets || []) {
          let a = k(b);
          a && a.kind === d["Name"] && e.add(a);
        }
        a.kind === d["Name"] && a.binding === b && !e.has(a) && (c += 1);
      }
    }), c;
  }
  function ah(a, b) {
    let c = 0;
    return f(a, {
      enter(a) {
        if (a.kind === d["Assignment"]) for (let e of a.targets || []) {
          let a = k(e);
          a && a.kind === d["Name"] && a.binding === b && (c += 1);
        } else if (a.kind === d["LocalDeclaration"] && (a.expressions || []).length) for (let d of a.bindings || []) d === b && (c += 1);else if (a.kind === d["NumericFor"]) a.binding === b && (c += 1);else if (a.kind === d["GenericFor"]) for (let d of a.bindings || []) d === b && (c += 1);
      }
    }), c;
  }
  function ai(a, b, e) {
    let f = a.statements,
      g = ac(f[b]);
    if (!g) return !1;
    let h = k(g.value);
    if (!h || h.kind !== d["Table"]) return !1;
    let i = h.entries || [];
    if (i.length !== 1 || i[0].type === "key") return !1;
    let j = i[0].value;
    if (!j || j.kind !== d["Call"] && j.kind !== d["MethodCall"]) return !1;
    let l = g.target.binding;
    if ((e.writes.get(l) || []).length !== 1) return !1;
    let m = [];
    for (let a = b + 1; a < f.length; a += 1) {
      let b = ac(f[a]);
      if (!b) continue;
      let c = k(b.value);
      if (!c || c.kind !== d["Index"]) continue;
      let e = o(c.base);
      if (!e || e.binding !== l) continue;
      let g = ad(c.index);
      if (g === null) return !1;
      m.push({
        at: a,
        key: g,
        target: b.target,
        binding: b.target.binding
      });
    }
    if (!m.length || ag(a, l) !== m.length || (e.reads.get(l) || []).length !== m.length) return !1;
    let n = new Set(m.map(a => a.key));
    if (n.size !== m.length) return !1;
    for (let a = 1; a <= m.length; a += 1) if (!n.has(a)) return !1;
    let p = new Set(m.map(a => a.binding));
    if (p.size !== m.length || p.has(l)) return !1;
    let q = new Set(m.map(a => a.at));
    for (let a = b + 1; a < m[m.length - 1].at; a += 1) {
      if (q.has(a)) continue;
      let b = t(f[a]);
      if (b.has(l)) return !1;
      for (let c of p) if (b.has(c) || u(f[a], c)) return !1;
    }
    let r = m.slice().sort((a, b) => a.key - b.key);
    f[b] = c.assignment(r.map(a => a.target), [j]);
    for (let a of m) f[a.at] = c["N"](c.block([]));
    return !0;
  }
  function aj(a) {
    if (!a || a.kind !== d["Assignment"]) return null;
    let b = a.targets || [],
      c = a.expressions || [];
    if (!b.length || b.length > 2 || c.length !== 1) return null;
    let e = c[0];
    if (!e || e.kind !== d["Call"]) return null;
    let f = e.args || [];
    if (f.length !== 2) return null;
    let g = o(b[0]);
    if (!g || !g.binding || !n(f[1], g)) return null;
    let h = b.length === 2 ? o(b[1]) : null;
    if (b.length === 2 && (!h || !h.binding)) return null;
    let i = ae(e.base),
      j = ae(f[0]);
    return !i || !j ? null : {
      ctrl: g,
      second: h,
      iterator: i,
      state: j
    };
  }
  function ak(a, b) {
    if (!a || a.kind !== d["If"] || (a.s || []).length || a.e) return !1;
    let c = a.body && a.body.statements || [];
    if (c.length !== 1 || c[0].kind !== d["Break"]) return !1;
    let e = k(a.condition);
    if (!e) return !1;
    if (e.kind === d["Unary"] && e.operator === "not") return n(e.argument, b);
    if (e.kind === d["Binary"] && e.operator === "==") {
      let a = k(e.rhs);
      return !!a && a.kind === d["Nil"] && n(e.lhs, b);
    }
    return !1;
  }
  function al(a, b, e, f, g) {
    if (e.length !== 3 || e.some(a => !a) || new Set(e).size !== 3) return null;
    let h = x(a, b, e[2]);
    if (h < 0) return null;
    let i = a[h];
    if (!i || i.kind !== d["Assignment"]) return null;
    let j = i.targets || [],
      k = i.expressions || [];
    if (j.length !== 3 || k.length !== 1) return null;
    let l = k[0];
    if (!l || l.kind !== d["Call"] && l.kind !== d["MethodCall"]) return null;
    let m = j.map(o);
    if (m.some(a => !a || !a.binding)) return null;
    for (let a = 0; a < 3; a += 1) if (m[a].binding !== e[a]) return null;
    for (let a of e) {
      let b = (g.reads.get(a) || []).length;
      if (!b || b !== ag(f, a) || (g.writes.get(a) || []).length - ah(f, a) !== 1) return null;
    }
    return a[h] = c["N"](c.block([])), l;
  }
  function am(a, b, e) {
    let f = a.statements,
      g = f[b];
    if (!g || g.kind !== d["While"] || !j(g.condition)) return !1;
    let h = g.body && g.body.statements || [];
    if (h.length < 2) return !1;
    let i = aj(h[0]);
    if (!i || !ak(h[1], i.ctrl)) return !1;
    let k = 2,
      l = i.ctrl,
      m = ac(h[2]);
    m && n(m.value, i.ctrl) && m.target.binding !== i.ctrl.binding && (l = m.target, k = 3);
    let o = c.block(h.slice(k)),
      p = t(o);
    for (let a of [i.iterator, i.state]) if (a.binding && p.has(a.binding)) return !1;
    if (p.has(i.ctrl.binding) || l !== i.ctrl && u(o, i.ctrl.binding) || i.second && i.second.binding === i.ctrl.binding) return !1;
    let q = [i.ctrl.binding, l.binding];
    i.second && q.push(i.second.binding);
    for (let a of q) for (let c = b + 1; c < f.length; c += 1) {
      if (u(f[c], a)) return !1;
      if (t(f[c]).has(a)) break;
    }
    let r = [l.name];
    i.second && r.push(i.second.name);
    let s = [i.iterator.binding, i.state.binding, i.ctrl.binding],
      v = al(f, b, s, g, e),
      w = v ? [v] : [i.iterator, i.state, c.name(i.ctrl.name)];
    return f[b] = c.wn(r, w, o), !0;
  }
  function an(a, b, e) {
    let f = a.statements,
      g = ac(f[b]);
    if (!g) return !1;
    let i = k(g.value);
    if (!i || i.kind !== d["Table"]) return !1;
    let j = i.entries || [];
    if (j.length !== 1 || j[0].type === "key") return !1;
    let l = j[0].value;
    if (!l || l.kind !== d["Call"] && l.kind !== d["MethodCall"]) return !1;
    let m = g.target.binding;
    if ((e.writes.get(m) || []).length !== 1 || (e.reads.get(m) || []).length !== 1) return !1;
    let n = -1,
      o = null;
    for (let a = b + 1; a < f.length; a += 1) {
      let b = as(f[a], m);
      if (b) {
        n = a, o = b;
        break;
      }
    }
    if (!o || ag(f[n], m) !== 1) return !1;
    let p = aq(l);
    for (let a = b + 1; a < n; a += 1) {
      if (!ar(f[a])) return !1;
      for (let b of t(f[a])) if (p.has(b)) return !1;
    }
    let q = !1;
    return f[n] = h(f[n], a => q || a !== o ? a : (q = !0, l)), q ? (f[b] = c["N"](c.block([])), !0) : !1;
  }
  function ao(a, b) {
    let c = k(a);
    if (!c) return !1;
    if (c.kind === d["Name"]) return c.name !== b ? !1 : !c.binding || c.binding.kind === "global";
    if (c.kind !== d["Index"]) return !1;
    let e = k(c.index);
    if (!e || e.kind !== d["String"] || e.value !== b) return !1;
    let f = k(c.base);
    return !f || f.kind !== d["Name"] || f.binding && f.binding.kind !== "global" ? !1 : f.name === "_ENV" || f.name === "_G";
  }
  function ap(a) {
    if (ao(a, "unpack")) return !0;
    let b = k(a);
    if (!b || b.kind !== d["Index"]) return !1;
    let c = k(b.index);
    return !c || c.kind !== d["String"] || c.value !== "unpack" ? !1 : ao(b.base, "table");
  }
  function aq(a) {
    let b = new Set();
    return f(a, {
      enter(a) {
        a.kind === d["Name"] && a.binding && b.add(a.binding);
      }
    }), b;
  }
  function ar(a) {
    if (!a) return !1;
    if (a.kind === d["Do"]) return !(a.body && a.body.statements || []).length;
    if (a.kind !== d["Assignment"]) return !1;
    for (let b of a.targets || []) {
      let a = k(b);
      if (!a || a.kind !== d["Name"] || !a.binding) return !1;
    }
    for (let b of a.expressions || []) {
      let a = k(b);
      if (!a) return !1;
      if (!(a.kind === d["Function"] || c["Y"](a)) && !(a.kind === d["Name"] && a.binding)) return !1;
    }
    return !0;
  }
  function as(a, b) {
    let c = null,
      e = !1;
    return f(a, {
      enter(a) {
        if (a.kind !== d["Call"] || !ap(a.base)) return;
        let f = a.args || [];
        if (f.length !== 1) return;
        let g = o(f[0]);
        !g || g.binding !== b || (c && (e = !0), c = a);
      }
    }), e ? null : c;
  }
  function at(a, b, c) {
    let e = a.statements[b];
    if (!e || e.kind !== d["GenericFor"]) return !1;
    let f = e.expressions || [];
    if (f.length !== 3) return !1;
    let g = f.map(o);
    if (g.some(a => !a || !a.binding)) return !1;
    let h = g.map(a => a.binding),
      i = al(a.statements, b, h, e, c);
    return i ? (e.expressions = [i], !0) : !1;
  }
  function au(a) {
    if (!a) return null;
    if (a.kind === d["NumericFor"]) return ["start", "limit", "step"].map(b => ({
      read: () => a[b],
      write: c => {
        a[b] = c;
      },
      last: !1
    }));
    if (a.kind === d["GenericFor"]) {
      let b = (a.expressions || []).length;
      return (a.expressions || []).map((c, d) => ({
        read: () => a.expressions[d],
        write: b => {
          a.expressions[d] = b;
        },
        last: d === b - 1
      }));
    }
    return null;
  }
  function av(a, b) {
    for (let c = b - 1; c >= 0; c -= 1) {
      let b = a[c];
      if (b.kind !== d["Do"] || (b.body && b.body.statements || []).length) return c;
    }
    return -1;
  }
  function aw(a, b, d) {
    let e = a.statements,
      f = e[b],
      g = au(f);
    if (!g) return !1;
    let h = !1;
    for (let a = 0; a < g.length; a += 1) {
      let a = av(e, b);
      if (a < 0) break;
      let i = ac(e[a]);
      if (!i) break;
      let j = i.target.binding;
      if ((d.reads.get(j) || []).length !== 1 || ag(f, j) !== 1 || (d.writes.get(j) || []).length !== 1 || ah(f, j) !== 0) break;
      let l = g.find(a => {
        let b = o(a.read());
        return !!b && b.binding === j;
      });
      if (!l || l.last && c.d(k(i.value))) break;
      l.write(i.value), e[a] = c["N"](c.block([])), h = !0;
    }
    return h;
  }
  function ax(a) {
    if (Array["isArray"](a)) return a.map(ax);
    if (!a || typeof a != "object") return a;
    let b = {};
    for (let c of Object.keys(a)) c === "binding" || c === "bindings" || c === "declaration" ? b[c] = a[c] : b[c] = ax(a[c]);
    return b;
  }
  function ay(a) {
    if (!a) return null;
    let b = k(a);
    if (!b || b.kind !== d["Table"]) return null;
    let c = b.entries || [];
    if (!c.length) return null;
    let e = [];
    for (let a of c) {
      if (a.type !== "item") return null;
      e.push(a.value);
    }
    return e;
  }
  function az(a) {
    if (!a || a.kind !== d["Call"] || !ap(a.base)) return null;
    let b = a.args || [];
    return b.length === 1 ? b[0] : null;
  }
  function ba(a) {
    if (!a || a.kind !== d["Call"] || !ao(a.base, "select")) return null;
    let b = a.args || [];
    if (b.length !== 2) return null;
    let c = k(b[0]);
    return !c || c.kind !== d["Number"] || !Number["isInteger"](c.value) || c.value < 1 ? null : {
      skip: c.value - 1,
      values: b[1]
    };
  }
  function bb(a) {
    let b = k(a);
    return b ? b.kind === d["Name"] || c["Y"](b) : !1;
  }
  function bc(a) {
    if (!a || !a.length || !c.d(a[a.length - 1])) return !1;
    for (let b = 0; b < a.length - 1; b += 1) if (!bb(a[b])) return !1;
    return !0;
  }
  function bd(a) {
    let b = az(a);
    if (b) {
      let a = ay(b);
      return !a || a.length !== 1 || !bc(a) ? null : a[0];
    }
    let d = ba(a);
    if (!d) return null;
    if (!d.skip) return c.d(d.values) ? d.values : null;
    let e = ay(az(d.values));
    return !e || !bc(e) || e.length !== d.skip + 1 ? null : e[e.length - 1];
  }
  function be(a) {
    if (!a || a.length !== 1) return !1;
    let b = k(a[0]);
    return !!b && b.kind === d["Vararg"];
  }
  function bf(a, b) {
    let c = new Map(),
      e = [a];
    return f(a, {
      enter(a) {
        b.has(a) && c.set(a, e[e.length - 1]), a.kind === d["Function"] && e.push(a);
      },
      leave(a) {
        a.kind === d["Function"] && e.pop();
      }
    }), c;
  }
  function bg(a, b, e, f) {
    let g = ac(b[e]);
    if (!g) return !1;
    let j = g.target.binding;
    if (!j) return !1;
    let l = k(g.value),
      m = ay(l);
    if (!be(m)) return !1;
    let n = f.writes.get(j) || [];
    if (n.length !== 1 || n[0] !== b[e]) return !1;
    let o = f.reads.get(j) || [];
    if (!o.length) return !1;
    let p = i(a, a => {
      let b = k(az(a));
      return !!b && b.kind === d["Name"] && b.binding === j;
    });
    if (p.length !== o.length) return !1;
    let q = bf(a, new Set([b[e]].concat(p))),
      r = q.get(b[e]);
    if (!r) return !1;
    for (let a of p) if (q.get(a) !== r) return !1;
    return h(a, a => p["indexOf"](a) < 0 ? a : c.call(a.base, [ax(l)])), b[e] = c["N"](c.block([])), !0;
  }
  function bh(a, b) {
    let c = 0;
    f(a.chunk, {
      enter(a) {
        if (a.kind === d["Block"]) {
          for (let b = 0; b < a.statements.length; b += 1) aa(a, b) && (c += 1);
          for (let b = 0; b < a.statements.length; b += 1) w(a, b) && (c += 1);
        }
      }
    });
    let e = af(a.chunk);
    f(a.chunk, {
      enter(a) {
        if (a.kind === d["Block"]) {
          for (let b = 0; b < a.statements.length; b += 1) an(a, b, e) && (c += 1);
          for (let b = 0; b < a.statements.length; b += 1) ai(a, b, e) && (c += 1);
        }
      }
    });
    let g = af(a.chunk);
    f(a.chunk, {
      enter(a) {
        if (a.kind === d["Block"]) {
          for (let b = 0; b < a.statements.length; b += 1) am(a, b, g) && (c += 1);
          for (let b = 0; b < a.statements.length; b += 1) aw(a, b, g) && (c += 1);
          for (let b = 0; b < a.statements.length; b += 1) at(a, b, g) && (c += 1);
        }
      }
    });
    let i = af(a.chunk),
      j = [];
    f(a.chunk, {
      enter(a) {
        if (a.kind === d["Block"]) for (let b = 0; b < a.statements.length; b += 1) j.push([a.statements, b]);
      }
    });
    for (let [b, d] of j) bg(a.chunk, b, d, i) && (c += 1);
    return h(a.chunk, a => {
      let b = bd(a);
      if (b) return c += 1, b;
      let d = ab(a);
      return d ? (c += 1, d) : a;
    }), b && (b.idioms += c), c;
  }
  b.exports = {
    run: bh,
    usage: af,
    movable: ar
  };
});
var ak = a((a, b) => {
  "use strict";

  var {
      "Kind": c,
      unparen: d
    } = e(),
    {
      walk: f,
      children: g,
      collect: h
    } = l(),
    {
      "D": i,
      c: k
    } = j(),
    {
      "Positions": m
    } = x(),
    n = new Set(["pcall", "xpcall", "select", "type", "tostring", "tonumber", "unpack", "rawequal", "rawget", "rawset", "rawlen", "setmetatable", "getmetatable", "newproxy", "next", "ipairs", "pairs", "loadstring", "load", "gcinfo", "collectgarbage", "getfenv"]),
    o = new Set(["math", "string", "table", "debug", "os", "coroutine", "bit", "bit32", "utf8", "jit"]),
    p = 96,
    q = null,
    r = new Set(["coroutine.yield", "coroutine.resume", "coroutine.wrap", "coroutine.close", "os.exit", "os.remove", "os.rename", "os.execute", "os.setlocale", "os.tmpname", "debug.setupvalue", "debug.setlocal", "debug.upvaluejoin", "debug.setmetatable", "debug.setfenv", "debug.debug"]);
  function s(a, b) {
    return !b || b.kind !== c["String"] ? !1 : r.has(`${a.name}.${b.value}`);
  }
  var t = new Set(["error", "assert", "print", "pcall_", "os_exit"]);
  function u(a) {
    let b = new Map(),
      d = (a, c, d, e) => {
        if (!a) return;
        let f = b.get(a);
        f || (f = {
          count: 0,
          bare: 0,
          valued: []
        }, b.set(a, f)), f.count += 1, c ? f.valued.push({
          expr: c,
          at: d
        }) : e && (f.bare += 1);
      },
      e = new Map(),
      g = (a, b) => {
        for (let d of h(a, a => a.kind === c["Name"])) {
          if (!d.binding) continue;
          let a = e.get(d.binding);
          a || e.set(d.binding, a = []), a.push(b || null);
        }
      },
      i = new Map(),
      j = (a, b) => {
        a && i.set(a, b.filter(Boolean));
      },
      k = (a, b, c, e) => {
        let f = b || [];
        for (let b = 0; b < f.length; b += 1) {
          let g = c.length === f.length;
          d(f[b], g ? c[b] : null, a, e);
        }
      };
    f(a, {
      enter(a) {
        if (a.kind === c["LocalDeclaration"]) {
          let b = a.expressions || [];
          k(a, a.bindings, b, !b.length);
        } else if (a.kind === c["LocalFunction"]) d(a.binding, a.body, a, !1);else if (a.kind === c["Assignment"]) {
          let b = a.targets || [],
            e = a.expressions || [];
          for (let f = 0; f < b.length; f += 1) {
            let h = b[f];
            if (!h) continue;
            let i = b.length === e.length;
            if (h.kind !== c["Name"]) {
              g(h, i ? e[f] : null);
              continue;
            }
            d(h.binding, i ? e[f] : null, a, !1);
          }
        } else if (a.kind === c["NumericFor"]) d(a.binding, null, a, !1), j(a.binding, [a.start, a.limit, a.step]);else if (a.kind === c["GenericFor"]) {
          k(a, a.bindings, [], !1);
          for (let b of a.bindings || []) j(b, a.expressions || []);
        } else a.kind === c["Function"] && k(a, a.bindings, [], !1);
      }
    });
    let l = new Map(),
      n = new Map(),
      o = null;
    for (let [c, d] of b) {
      if (!d.valued.length || d.bare + d.valued.length !== d.count) continue;
      n.set(c, d.valued.map(a => a.expr));
      let b = c.reads || [];
      d.bare && b.length && (o || (o = new m(a)), !d.valued.some(a => b.every(b => o.precedes(a.at, b)))) || l.set(c, d.valued.map(a => a.expr));
    }
    for (let [a, c] of b) (c.count !== 1 || c.valued.length) && i.delete(a);
    return {
      values: l,
      derived: i,
      callees: n,
      filled: e
    };
  }
  function v(a, b, d = new Set(), e = 0) {
    if (!a || typeof a != "object" || e > p) return !1;
    switch (a.kind) {
      case c["Nil"]:
      case c["True"]:
      case c["False"]:
      case c["Number"]:
      case c["String"]:
        return !0;
      case c["Function"]:
        {
          let c = () => new Set(a.bindings || []);
          if (q) {
            let d = b.loose.get(a);
            if (d) {
              for (let a of d.cells) q.add(a);
              return d.ok;
            }
            let f = new Set(),
              g = q;
            b.loose.set(a, {
              ok: !1,
              cells: f
            }), q = f;
            let h = ao(a.body, b, new Set(), e + 1, c());
            q = g, b.loose.set(a, {
              ok: h,
              cells: f
            });
            for (let a of f) q.add(a);
            return h;
          }
          let d = b.functions.get(a);
          if (d !== void 0) return d;
          b.functions.set(a, !1);
          let f = ao(a.body, b, new Set(), e + 1, c());
          return b.functions.set(a, f), f;
        }
      case c["Vararg"]:
        return !1;
      case c["Name"]:
        {
          if (t.has(a.name)) return !1;
          if (i(a)) return n.has(a.name) || o.has(a.name);
          let c = a.binding;
          if (!c || !k(c)) return !1;
          if (d.has(c)) return !0;
          d.add(c);
          let f = b["Ms"](c);
          if (!f || !f.every(a => v(a, b, new Set(d), e + 1))) return !1;
          let g = b.$s(c);
          return !g || g.every(a => !!a && v(a, b, new Set(d), e + 1));
        }
      case c["Paren"]:
        return v(a.expression, b, d, e + 1);
      case c["Unary"]:
        return v(a.argument, b, d, e + 1);
      case c["Binary"]:
        return v(a.lhs, b, d, e + 1) && v(a.rhs, b, new Set(d), e + 1);
      case c["Index"]:
        return i(a.base) && s(a.base, a.index) ? !1 : v(a.base, b, d, e + 1) && v(a.index, b, new Set(d), e + 1);
      case c["Table"]:
        return (a.entries || []).every(a => (!a.key || v(a.key, b, new Set(d), e + 1)) && v(a.value, b, new Set(d), e + 1));
      case c["Call"]:
      case c["MethodCall"]:
        return (a.kind === c["Call"] ? z(a.base, b, new Set(), e + 1) : v(a.base, b, new Set(d), e + 1)) && (a.args || []).every(a => v(a, b, new Set(d), e + 1));
      default:
        return !1;
    }
  }
  var w = class {
    constructor(a) {
      let b = u(a);
      this.values = b.values, this.derived = b.derived, this.callees = b.callees, this.filled = b.filled, this.functions = new Map(), this.loose = new Map();
    }
    lt(a) {
      return a && this.values.get(a) || null;
    }
    ct(a) {
      return a && this.callees.get(a) || null;
    }
    $s(a) {
      return a && this.filled.get(a) || null;
    }
    "Ms"(a) {
      return a && (this.values.get(a) || this.derived.get(a)) || null;
    }
    "Ni"(a) {
      return v(a, this, new Set(), 0);
    }
  };
  function y(a, b, d = new Set(), e = 0) {
    if (!a || e > p) return !1;
    switch (a.kind) {
      case c["Nil"]:
      case c["True"]:
      case c["False"]:
      case c["Number"]:
      case c["String"]:
        return !0;
      case c["Table"]:
        return !0;
      case c["Name"]:
        {
          if (i(a)) return o.has(a.name);
          let c = a.binding;
          if (!c || d.has(c)) return !1;
          d.add(c);
          let f = b.ct(c);
          return !!f && f.length > 0 && f.every(a => y(a, b, new Set(d), e + 1));
        }
      case c["Paren"]:
        return y(a.expression, b, d, e + 1);
      default:
        return !1;
    }
  }
  function z(a, b, d = new Set(), e = 0) {
    if (!a || e > p) return !1;
    if (a.kind === c["Paren"]) return z(a.expression, b, d, e + 1);
    if (a.kind === c["Name"]) {
      if (t.has(a.name)) return !1;
      if (i(a)) return n.has(a.name);
      let c = a.binding;
      if (!c) return n.has(a.name);
      if (d.has(c)) return !1;
      d.add(c);
      let f = (b.ct(c) || []).filter(a => !y(a, b, new Set(), e + 1));
      return f.length > 0 && f.every(a => z(a, b, new Set(d), e + 1));
    }
    if (a.kind === c["Index"]) {
      let d = a.base,
        f = a.index;
      return i(d) ? !o.has(d.name) || s(d, f) ? !1 : !f || f.kind === c["String"] : v(d, b, new Set(), e + 1) && (!f || v(f, b, new Set(), e + 1));
    }
    if (a.kind === c["Function"]) return v(a, b, new Set(), e + 1);
    if (a.kind === c["Binary"] && (a.operator === "or" || a.operator === "and")) {
      let c = [a.lhs, a.rhs].filter(a => !y(a, b, new Set(), e + 1));
      return c.length > 0 && c.every(a => z(a, b, d, e + 1));
    }
    return v(a, b, new Set(), e + 1);
  }
  function aa(a, b) {
    let c = new Set(),
      d = q;
    q = c;
    try {
      return ac(a, b) ? c : null;
    } finally {
      q = d;
    }
  }
  function ab(a, b) {
    let c = new Set(),
      d = q;
    q = c;
    try {
      return am(a, b, !1) ? c : null;
    } finally {
      q = d;
    }
  }
  function ac(a, b, d = new Set(), e = 0) {
    if (!a || typeof a != "object") return !0;
    if (e > p) return !1;
    switch (a.kind) {
      case c["Nil"]:
      case c["True"]:
      case c["False"]:
      case c["Number"]:
      case c["String"]:
      case c["Vararg"]:
      case c["Name"]:
        return !0;
      case c["Function"]:
        return !0;
      case c["Paren"]:
        return ac(a.expression, b, d, e + 1);
      case c["Unary"]:
        return ac(a.argument, b, d, e + 1);
      case c["Binary"]:
        return ac(a.lhs, b, d, e + 1) && ac(a.rhs, b, d, e + 1);
      case c["Index"]:
        return ac(a.base, b, d, e + 1) && ac(a.index, b, d, e + 1);
      case c["Table"]:
        return (a.entries || []).every(a => (!a.key || ac(a.key, b, d, e + 1)) && ac(a.value, b, d, e + 1));
      case c["Call"]:
        return z(a.base, b, new Set(d), e + 1) && (a.args || []).every(a => ac(a, b, d, e + 1));
      case c["MethodCall"]:
        return v(a.base, b, new Set(), e + 1) && (a.args || []).every(a => v(a, b, new Set(), e + 1));
      default:
        return !1;
    }
  }
  function ad(a, b) {
    let d = [],
      e = a => {
        let e = a;
        for (; e && k(e);) {
          if (d.includes(e)) return;
          d.push(e);
          let a = b ? b.lt(e) : null,
            f = a && a.length === 1 ? a[0] : null;
          for (; f && f.kind === c["Paren"];) f = f.expression;
          e = f && f.kind === c["Name"] ? f.binding : null;
        }
      },
      f = a => {
        if (!(!a || !a.kind || a.kind === c["Function"])) {
          if (a.kind === c["Name"]) {
            e(a.binding);
            return;
          }
          for (let b of g(a)) f(b.node);
        }
      };
    return f(a), d;
  }
  function ae(a, b) {
    let d = !1;
    return f(a, {
      enter(a) {
        if (d || a.kind === c["Function"]) return !1;
        if (a.kind !== c["Call"] && a.kind !== c["MethodCall"]) return;
        let e = [];
        (a.kind === c["MethodCall"] || a.base && a.base.kind !== c["Name"]) && e.push(...ad(a.base, b));
        for (let c of a.args || []) e.push(...ad(c, b));
        e.some(a => (a.reads || []).length) && (d = !0);
      }
    }), d;
  }
  function af(a, b) {
    return ac(a, b) && !ae(a, b);
  }
  var ag = new Set(["load", "loadstring", "loadfile", "dofile", "require"]);
  function ah(a, b) {
    let d = new Set(),
      e = new Set();
    f(a, {
      enter(a) {
        if (d.add(a), a.kind !== c["Call"] || !b || !z(a.base, b)) return;
        let f = h(a.base, a => a.kind === c["Name"]);
        if (!f.some(a => ag.has(a.name))) for (let a of f) e.add(a);
      }
    });
    let g = !0;
    return f(a, {
      enter(a) {
        if (a.kind !== c["Name"] || e.has(a)) return;
        let b = a.binding;
        (!b || !k(b) || !b.declaration || !d.has(b.declaration)) && (g = !1);
      }
    }), g;
  }
  function ai(a, b, e = 0) {
    let f = d(a);
    if (!f || e > p) return !1;
    switch (f.kind) {
      case c["Nil"]:
      case c["True"]:
      case c["False"]:
      case c["Number"]:
      case c["String"]:
        return !0;
      case c["Function"]:
        return ah(f, b);
      case c["Table"]:
        return (f.entries || []).every(a => ai(a.value, b, e + 1) && (a.type !== "key" || ai(a.key, b, e + 1)));
      default:
        return !1;
    }
  }
  function aj(a, b) {
    return !a || a.kind !== c["Call"] ? !1 : (a.args || []).every(a => ai(a, b));
  }
  function ak(a, b, e = 0) {
    let f = d(a);
    if (!f || e > p) return !1;
    if (f.kind === c["Table"] || ai(f, b, e)) return !0;
    if (f.kind !== c["Call"]) return !1;
    let g = d(f.base);
    if (!g || g.kind !== c["Name"] || !i(g) || g.name !== "setmetatable") return !1;
    let h = f.args || [];
    if (h.length !== 2 || !ak(h[0], b, e + 1)) return !1;
    let j = d(h[1]);
    return !j || j.kind !== c["Table"] ? !1 : (j.entries || []).every(a => a.type === "key" && a.key && a.key.kind === c["String"] && a.key.value !== "__newindex");
  }
  function al(a, b, e, f, g) {
    if (!a || !k(a) || f.has(a) || g > p || (f.add(a), !e(a))) return !1;
    let h = b ? b.lt(a) : null;
    return !h || !h.length ? !1 : h.every(a => {
      let h = d(a);
      return h && h.kind === c["Name"] && h.binding ? al(h.binding, b, e, f, g + 1) : ak(a, b, g + 1);
    });
  }
  function am(a, b, e, f = 0) {
    if (!a || f > p) return !1;
    let g = a => !!e && !!e.has && e.has(a),
      h = a => !a.captured || g(a) ? !0 : q ? (q.add(a), !0) : !1;
    if (a.kind === c["Name"]) {
      let b = a.binding;
      return !b || !k(b) ? !1 : h(b);
    }
    if (a.kind === c["Index"]) {
      let e = d(a.base);
      return !e || e.kind !== c["Name"] ? !1 : al(e.binding, b, h, new Set(), f + 1);
    }
    return !1;
  }
  function an(a, b) {
    if (a.kind === c["LocalDeclaration"]) for (let c of a.bindings || []) b.add(c);else if (a.kind === c["LocalFunction"]) b.add(a.binding);else if (a.kind === c["NumericFor"]) b.add(a.binding);else if (a.kind === c["GenericFor"]) for (let c of a.bindings || []) b.add(c);
  }
  function ao(a, b, c = new Set(), d = 0, e = !1) {
    if (!a || d > p) return !1;
    let f = e instanceof Set ? new Set(e) : e;
    return (a.statements || []).every(a => {
      let e = ap(a, b, c, d + 1, f);
      return f instanceof Set && an(a, f), e;
    });
  }
  function ap(a, b, d = new Set(), e = 0, f = !1) {
    if (!a || e > p) return !1;
    let g = a => ao(a, b, d, e + 1, f),
      h = a => ac(a, b, d, e + 1);
    switch (a.kind) {
      case c["LocalDeclaration"]:
        return (a.expressions || []).every(h);
      case c["Assignment"]:
        return (a.targets || []).every(a => am(a, b, f)) && (a.expressions || []).every(h);
      case c["LocalFunction"]:
      case c["Label"]:
        return !0;
      case c["Return"]:
        return f && (a.expressions || []).every(h);
      case c["Break"]:
      case c["Continue"]:
        return f;
      case c["CallStatement"]:
        return h(a.expression);
      case c["Do"]:
        return g(a.body);
      case c["While"]:
      case c["Repeat"]:
        return h(a.condition) && g(a.body);
      case c["NumericFor"]:
        return h(a.start) && h(a.limit) && h(a.step) && g(a.body);
      case c["GenericFor"]:
        return (a.expressions || []).every(h) && g(a.body);
      case c["If"]:
        return h(a.condition) && g(a.body) && (a.s || []).every(a => h(a.condition) && g(a.body)) && (!a.e || g(a.e));
      default:
        return !1;
    }
  }
  b.exports = {
    "TABLES": o,
    "LOADERS": ag,
    "Facts": w,
    "Ls": ac,
    "E": af,
    sealed: ah,
    "Es": aj,
    "As": ad,
    ft: aa,
    "Is": ab
  };
});
var al = a((a, b) => {
  "use strict";

  var c = e(),
    {
      "Kind": d
    } = c,
    {
      walk: f
    } = l(),
    {
      "Lr": g
    } = y(),
    {
      "U": h,
      "K": i
    } = z(),
    k = ak(),
    {
      c: m
    } = j();
  function n(a, b) {
    let c = h(a),
      d = new Set(c);
    for (let a of c) for (let c of b["Rn"](a)) for (let a of b.qr(c)) d.add(a);
    return d;
  }
  function o(a, b) {
    let c = !1;
    return f(a, {
      enter(a) {
        if (c) return !1;
        if (a.kind === d["MethodCall"]) return c = !0, !1;
        if (a.kind !== d["Call"]) return;
        let e = a.base;
        for (; e && e.kind === d["Paren"];) e = e.expression;
        if (!e || e.kind !== d["Name"]) return c = !0, !1;
        let f = e.binding;
        if (!f) return c = !0, !1;
        if (b["Rn"](f).size) return;
        let g = (f.writes || []).length > 0;
        (m(f) || g) && (c = !0);
      }
    }), c;
  }
  function p(a) {
    let b = new Set();
    if (a.kind !== d["Assignment"]) return b;
    for (let c of a.targets || []) {
      let a = c;
      for (; a && a.kind === d["Paren"];) a = a.expression;
      a && a.kind === d["Name"] && a.binding && b.add(a.binding);
    }
    return b;
  }
  function q(a, b) {
    let c = [],
      d = [],
      e = [];
    for (let f of a.statements) c.push(n(f, b)), d.push(p(f)), e.push(g(f) || o(f, b));
    return {
      reads: c,
      kills: d,
      walls: e
    };
  }
  function r(a, b, c) {
    if (!m(a)) return !1;
    for (let d = b + 1; d < c.reads.length; d += 1) {
      if (c.reads[d].has(a) || c.walls[d]) return !1;
      if (c.kills[d].has(a)) return !0;
    }
    return !1;
  }
  function s(a) {
    let b = a;
    for (; b && b.kind === d["Paren"];) b = b.expression;
    return !b || b.kind !== d["Name"] ? null : b.binding || null;
  }
  function t(a, b, e) {
    let f = a.targets || [],
      g = a.expressions || [],
      h = f.length === g.length;
    if (b.every(a => a)) return g.every(a => k["E"](a, e)) ? {
      statements: [],
      removed: f.length
    } : g.length === 1 && (g[0].kind === d["Call"] || g[0].kind === d["MethodCall"]) ? {
      statements: [c["X"](g[0])],
      removed: f.length
    } : null;
    if (!h) return null;
    let i = [],
      j = 0;
    for (let a = 0; a < f.length; a += 1) b[a] && k["E"](g[a], e) ? j += 1 : i.push(a);
    return j ? (a.targets = i.map(a => f[a]), a.expressions = i.map(a => g[a]), {
      statements: [a],
      removed: j
    }) : null;
  }
  function u(a) {
    return a.statements.some(a => a.kind === d["Label"]);
  }
  function v(a, b, c) {
    let e = 0;
    return f(a, {
      enter(a) {
        if (a.kind !== d["Block"] || u(a)) return;
        let f = q(a, b),
          g = [];
        for (let b = 0; b < a.statements.length; b += 1) {
          let h = a.statements[b];
          if (h.kind !== d["Assignment"]) {
            g.push(h);
            continue;
          }
          let i = (h.targets || []).map(a => {
            let c = s(a);
            return !!c && r(c, b, f);
          });
          if (!i.some(a => a)) {
            g.push(h);
            continue;
          }
          let j = t(h, i, c);
          if (!j) {
            g.push(h);
            continue;
          }
          e += j.removed, g.push(...j.statements);
        }
        a.statements = g;
      }
    }), e;
  }
  function w(a) {
    return !a || a.kind !== d["LocalDeclaration"] ? [] : (a.expressions || []).length ? [] : (a.bindings || []).filter(Boolean);
  }
  function x(a, b, c) {
    let d = a.statements || [];
    for (let a = 0; a < c; a += 1) if (w(d[a]).includes(b)) {
      for (let e = a + 1; e < c; e += 1) if (i(d[e], !0).has(b)) return !1;
      return !0;
    }
    return !1;
  }
  function aa(a) {
    let b = 0;
    return f(a, {
      enter(a) {
        if (a.kind !== d["Block"] || u(a)) return;
        let c = [];
        a.statements["forEach"]((e, f) => {
          let g = e.kind === d["Assignment"] ? e.targets || [] : [],
            h = e.expressions || [];
          if (!g.length || g.length !== h.length) {
            c.push(e);
            return;
          }
          let i = new Set(),
            j = [];
          for (let c = 0; c < g.length; c += 1) {
            let e = s(g[c]),
              k = e && m(e) && !i.has(e) && h[c].kind === d["Nil"] && x(a, e, f);
            e && i.add(e), k ? b += 1 : j.push(c);
          }
          if (j.length === g.length) {
            c.push(e);
            return;
          }
          j.length && (e.targets = j.map(a => g[a]), e.expressions = j.map(a => h[a]), c.push(e));
        }), a.statements = c;
      }
    }), b;
  }
  function ab(a) {
    return !a || a.kind !== d["Name"] || !a.binding || !m(a.binding) ? !1 : !(a.binding.reads || []).length;
  }
  function ac(a) {
    let b = 0;
    return f(a, {
      enter(a) {
        a.kind === d["Block"] && (a.statements = a.statements.map(a => {
          if (a.kind !== d["Assignment"]) return a;
          let e = a.targets || [],
            f = a.expressions || [];
          if (!e.length || f.length !== 1 || !e.every(ab)) return a;
          let g = c.unparen(f[0]);
          return g.kind !== d["Call"] && g.kind !== d["MethodCall"] ? a : (b += 1, c["X"](g));
        }));
      }
    }), b;
  }
  b.exports = {
    "Os": v,
    "Ts": aa,
    discharge: ac
  };
});
var am = a((a, b) => {
  "use strict";

  var c = e(),
    {
      "Kind": d
    } = c,
    {
      tr: f
    } = m(),
    {
      detect: g
    } = m(),
    {
      "Jr": h
    } = ad(),
    {
      tn: i,
      ut: j
    } = ah(),
    k = r(),
    n = aa(),
    o = ai(),
    p = aj(),
    {
      discharge: q
    } = al(),
    {
      walk: s
    } = l();
  function t(a) {
    let b = a.wrapper && a.wrapper.bindings || [],
      c = a.roles.varargs ? b["indexOf"](a.roles.varargs) : -1;
    return c < 0 ? null : a.fe.args[c] || null;
  }
  var u = new Set([d["Name"], d["Number"], d["String"], d["Nil"], d["True"], d["False"]]);
  function v(a) {
    if (a.kind === d["Assignment"]) {
      if (a.targets.length !== 1 || a.expressions.length !== 1) return null;
      let b = a.targets[0],
        e = c.unparen(a.expressions[0]);
      return b.kind !== d["Name"] || e.kind !== d["Name"] ? null : {
        target: b.binding,
        source: e.binding,
        write: b
      };
    }
    if (a.kind === d["LocalDeclaration"]) {
      if (a.names.length !== 1 || a.expressions.length !== 1) return null;
      let b = c.unparen(a.expressions[0]);
      return b.kind !== d["Name"] ? null : {
        target: (a.bindings || [])[0],
        source: b.binding,
        write: null
      };
    }
    return null;
  }
  function w(a) {
    let b = new Map(),
      d = a.wrapper;
    if (!d || !d.body) return b;
    let e = a.fe.args || [],
      f = e.length ? c.unparen(e[e.length - 1]) : null,
      g = f ? c.d(f) : !1;
    (d.bindings || [])["forEach"]((a, d) => {
      if (!a || d >= e.length || g && d === e.length - 1) return;
      let f = c.unparen(e[d]);
      u.has(f.kind) && b.set(a, f);
    });
    for (let a = 0; a < 8; a += 1) {
      let a = 0;
      for (let c of d.body.statements) {
        let d = v(c);
        if (!d || !d.target || b.has(d.target)) continue;
        let e = b.get(d.source);
        if (!e) continue;
        let f = d.target.writes || [];
        (d.write ? f.length === 1 && f[0] === d.write : !f.length) && (b.set(d.target, e), a += 1);
      }
      if (!a) break;
    }
    return b;
  }
  function x(a, b) {
    for (let b of Object.keys(a)) delete a[b];
    Object.assign(a, b.kind === d["Name"] ? c.name(b.name) : {
      ...b
    });
  }
  function y(a) {
    let b = null;
    for (let c of a.wrapper && a.wrapper.bindings || []) {
      if (!c) continue;
      let a = c.l;
      b = b === null ? a : Math.max(b, a);
    }
    return b;
  }
  function z(a, b, c) {
    let e = w(b),
      f = y(b),
      g = new Map();
    s(c.body, {
      enter(a) {
        if (a.kind !== d["Name"] || !a.binding || a.binding.kind === "global") return;
        let b = g.get(a.binding);
        b ? b.push(a) : g.set(a.binding, [a]);
      }
    });
    let h = 0;
    for (let [b, c] of g) {
      let d = e.get(b);
      if (d) {
        for (let a of c) x(a, d);
        h += c.length;
        continue;
      }
      f === null || b.l < f || (a.warn(`lift: carried-local ${b.name}`), a.bump("lift.carried-local"));
    }
    return h;
  }
  function ab(a, b) {
    let c = a;
    for (let a = 0; a < 16; a += 1) {
      let a = b.get(c);
      if (!a) return null;
      if (a.kind === d["Return"]) return a.expressions.length === 1 && a.expressions[0] === c ? a : null;
      if (a.kind === d["Paren"]) {
        c = a;
        continue;
      }
      if (a.kind === d["Table"]) {
        let b = a.entries || [];
        if (b.length !== 1 || b[0].type !== "item" || b[0].value !== c) return null;
        c = a;
        continue;
      }
      if (a.kind === d["Call"] && a.base && a.base.kind === d["Name"] && (a.args || []).length === 1 && a.args[0] === c) {
        c = a;
        continue;
      }
      return null;
    }
    return null;
  }
  function ac(a, b, c) {
    let d = a.get(b);
    if (!d || !Array["isArray"](d.statements)) return !1;
    let e = d.statements["indexOf"](b);
    return e < 0 ? !1 : (d.statements.splice(e, 1, ...c), !0);
  }
  function ae(a, b, d) {
    let e = f(a),
      g = ab(b.fe, e);
    if (g && ac(e, g, d.body.statements)) return "inline";
    let h = b.fe;
    return h.base = c.paren(c.func([], d.body, !0)), h.args = [c.vararg()], "closure";
  }
  function af(a, b, c) {
    let d = h(b),
      e = i(b, d, {
        counter: c,
        varargs: t(b)
      });
    for (let b of e.warnings) a.warn(`lift: ${b.kind} ${JSON.stringify(b)}`), a.bump(`lift.${b.kind}`);
    let f = z(a, b, e);
    f && a.bump("devirtualize.reseated", f);
    let g = ae(a.chunk, b, e);
    return a.bump(`devirtualize.${g}`), a.bump("devirtualize.blocks", d.blocks.size), a.bump("devirtualize.functions", d.functions.length), e.counter;
  }
  function ag(a) {
    let b = 0,
      c = 0;
    for (let d = 0; d < 32; d += 1) {
      a.resolve();
      let d = g(a.chunk);
      for (let b of d.rejected) a.bump(`devirtualize.rejected.${b.reason}`);
      if (!d.instances.length) break;
      for (let e of d.instances) b = af(a, e, b), c += 1, a["V"]("progress", {
        step: "04-devirt",
        layers: c,
        blocks: a.stats["devirtualize.blocks"] || 0,
        functions: a.stats["devirtualize.functions"] || 0
      });
      a.resolve(), k.run(a), o.run(a), a.resolve(), n.run(a), a.resolve(), p.run(a);
    }
    if (c) {
      a.resolve();
      let b = q(a.chunk);
      b && (a.bump("devirtualize.discharged", b), a.resolve()), a.note(`devirtualized ${c} VM layer(s)`, c), a.bump("devirtualize.layers", c);
    }
  }
  b.exports = {
    name: "04-lift",
    run: ag,
    ut: j
  };
});
var an = a((a, b) => {
  "use strict";

  var c = e(),
    {
      "Kind": d
    } = c,
    {
      transform: f,
      walk: g
    } = l(),
    {
      bare: h,
      "W": i,
      "Ge": k
    } = y(),
    {
      "D": m
    } = j(),
    {
      "Interpreter": p,
      "Scope": q
    } = v(),
    {
      "LuaTable": r
    } = o(),
    s = n(),
    t = {
      "__add": "+",
      "__sub": "-",
      "__mul": "*",
      "__div": "/",
      "__pow": "^",
      "__concat": ".."
    };
  function u(a) {
    if (!a || a.type !== "key") return null;
    let b = h(a.key);
    return b && b.kind === d["String"] ? b.value : null;
  }
  function w(a, b, c) {
    let e = h(a),
      f = new Set();
    for (let a = 0; e && a < 8; a += 1) {
      if (e.kind === d["Function"]) return e;
      let a = c ? al(e, c, "getKey") || am(e, c) : null;
      if (a) {
        e = h(ap(a));
        continue;
      }
      if (e.kind !== d["Name"] || !e.binding || f.has(e.binding)) return null;
      f.add(e.binding), e = h(ad(b, e.binding));
    }
    return null;
  }
  var x = "\0proxy-held",
    z = "\0proxy-given";
  function aa(a, b, c) {
    let d = w(a, c);
    if (!d || (d.params || []).length !== 2) return null;
    let e = new p({
        x: 2e4,
        ge: 16,
        lenient: !0
      }),
      f = new r();
    f.set(b, x);
    let g;
    try {
      let a = e.eval(d, new q(null));
      g = e.call(a, [f, z]);
    } catch {
      return null;
    }
    let h = f.get(b),
      i = g.length ? g[0] : void 0;
    return h === z && i === void 0 && g.length <= 1 ? "set" : h === x && i === x && g.length === 1 ? "get" : null;
  }
  function ab(a, b, c) {
    let e = h(a);
    if (!e || e.kind !== d["Call"]) return null;
    let f = h(e.base),
      g = e.args || [];
    if (g.length !== 2) return null;
    let i = f && f.kind === d["Name"] && f.binding && b.has(f.binding),
      j = m(f) && f.name === "setmetatable";
    if (!i && !j) return null;
    let k = h(g[0]),
      l = h(g[1]);
    if (!k || k.kind !== d["Table"] || !l || l.kind !== d["Table"]) return null;
    let n = k.entries || [],
      o = l.entries || [];
    if (n.length !== 1 || o.length !== 2) return null;
    let p = u(n[0]);
    if (!p) return null;
    let q = {};
    for (let a of o) {
      let b = u(a);
      if (!b || b !== "__index" && !t[b]) return null;
      let d = aa(a.value, p, c);
      if (!d || q[d]) return null;
      q[d] = b;
    }
    return !q.set || !q.get ? null : {
      field: p,
      "Ci": q.set,
      "Fi": q.get,
      init: n[0].value,
      at: n[0]
    };
  }
  var ac = i,
    ad = k;
  function ae(a) {
    let b = new Set();
    for (let c of a.keys()) {
      let d = h(ad(a, c));
      d && m(d) && d.name === "setmetatable" && b.add(c);
    }
    let c = !0;
    for (; c;) {
      c = !1;
      for (let e of a.keys()) {
        if (b.has(e)) continue;
        let f = h(ad(a, e));
        !f || f.kind !== d["Name"] || !f.binding || b.has(f.binding) && (b.add(e), c = !0);
      }
    }
    return b;
  }
  function af(a) {
    if (!a || (a.params || []).length) return !1;
    let b = new p({
      x: 2e4,
      ge: 16
    });
    try {
      let c = b.eval(a, new q(null)),
        d = s.record(() => b.call(c, []));
      return d.value.length === 0 && d.writes.size === 0;
    } catch {
      return !1;
    }
  }
  function ag(a, b) {
    let c = new Set(),
      d = new Map();
    for (let e of a.keys()) {
      let f = w(ad(a, e), a, b);
      f && (d.has(f) || d.set(f, af(f)), d.get(f) && c.add(e));
    }
    return c;
  }
  function ah(a, b, c) {
    let d = new Map();
    for (let e of a.keys()) {
      let f = a.get(e),
        g = ab(f.list[f.index], b, a);
      g && (d.set(e, Object.assign({
        name: e.name
      }, g)), f.list[f.index] = g.init, c.locals += 1);
    }
    return d;
  }
  function ai(a, b) {
    let c = !0;
    for (; c;) {
      c = !1;
      for (let e of a.keys()) {
        if (b.has(e)) continue;
        let f = h(ad(a, e));
        if (!f || f.kind !== d["Name"] || !f.binding) continue;
        let g = b.get(f.binding);
        g && (b.set(e, g), c = !0);
      }
    }
  }
  function aj(a, b, c, e) {
    let f = new Map();
    return g(a, {
      enter(a) {
        if (a.kind !== d["Call"]) return;
        let g = ab(a, b, c);
        g && (f.set(a, g), e.locals += 1);
      }
    }), f;
  }
  function ak(a, b) {
    let c = h(a);
    if (!c) return null;
    let e = b.inline.get(c);
    if (e) return {
      proxy: e,
      via: null
    };
    let f = c.kind === d["Name"] ? c.binding : null;
    if (!f) return null;
    let g = b.proxies.get(f);
    return g ? {
      proxy: g,
      via: f
    } : null;
  }
  function al(a, b, c) {
    if (!a) return null;
    if (a.kind === d["Index"]) {
      let d = ak(a.base, b);
      return !d || d.proxy[c] !== "__index" ? null : {
        proxy: d.proxy,
        via: d.via,
        value: a.index
      };
    }
    if (a.kind === d["Binary"]) {
      let d = ak(a.lhs, b);
      if (d && t[d.proxy[c]] === a.operator) return {
        proxy: d.proxy,
        via: d.via,
        value: a.rhs
      };
    }
    return null;
  }
  function am(a, b) {
    if (!a || a.kind !== d["Index"]) return null;
    let c = ak(a.base, b);
    if (!c) return null;
    let e = h(a.index);
    return !e || e.kind !== d["String"] || e.value !== c.proxy.field ? null : c;
  }
  function an(a, b) {
    let c = new Set();
    return g(a, {
      enter(a) {
        let e = al(a, b, "setKey");
        if (e && c.add(e.proxy), a.kind === d["Assignment"]) for (let e of a.targets || []) {
          let a = h(e);
          if (!a || a.kind !== d["Index"]) continue;
          let f = ak(a.base, b);
          f && c.add(f.proxy);
        }
      }
    }), c;
  }
  function ao(a, b) {
    return a.via && !b.written.has(a.proxy) ? a.via.name : a.proxy.name;
  }
  function ap(a) {
    return a.proxy.at ? a.proxy.at.value : a.proxy.init;
  }
  function aq(a, b) {
    let d = ao(a, b);
    return d ? c.name(d) : ap(a);
  }
  function ar(a, b, e, f) {
    if (a.kind !== d["CallStatement"]) return null;
    let g = h(a.expression);
    if (!g || g.kind !== d["Call"]) return null;
    let i = h(g.base),
      j = al(i, b, "getKey"),
      k = j ? j.proxy.binding : i.kind === d["Name"] ? i.binding : null;
    if (!(j && !j.proxy.name ? af(h(j.proxy.init)) : !!k && e.has(k))) return null;
    let l = g.args || [];
    if (!l.length) return null;
    let m = al(h(l[0]), b, "setKey");
    if (!m) return null;
    let n = ao(m, b);
    return n ? (f.assignments += 1, c.assignment([c.name(n)], [m.value, ...l.slice(1)])) : null;
  }
  function as(a, b, e) {
    a.kind === d["Assignment"] && (a.targets = (a.targets || []).map(a => {
      let f = h(a);
      if (!f || f.kind !== d["Index"]) return a;
      let g = ak(f.base, b);
      if (!g) return a;
      let i = ao(g, b);
      if (!i) return a;
      let j = h(f.index);
      return !j || j.kind !== d["String"] || j.value !== g.proxy.field ? a : (e.targets += 1, c.name(i));
    }));
  }
  function at(a) {
    let b = {
      locals: 0,
      reads: 0,
      assignments: 0,
      targets: 0
    };
    a.resolve();
    let c = ac(a.chunk),
      e = ae(c);
    if (!e.size) return;
    let h = ah(c, e, b);
    for (let [a, b] of h) b.binding = b.binding || a;
    ai(c, h);
    let i = aj(a.chunk, e, c, b);
    if (!h.size && !i.size) return;
    let j = {
      proxies: h,
      inline: i,
      written: new Set()
    };
    j.written = an(a.chunk, j);
    let k = ag(c, j);
    g(a.chunk, {
      enter(a) {
        a.kind === d["Block"] && (a.statements = a.statements.map(a => {
          let c = ar(a, j, k, b);
          return c || (as(a, j, b), a);
        }));
      }
    }), f(a.chunk, a => {
      let c = al(a, j, "getKey");
      if (c) return b.reads += 1, aq(c, j);
      let d = am(a, j);
      return d ? (b.reads += 1, aq(d, j)) : a;
    }), a.resolve();
    let l = b.locals + b.reads + b.assignments + b.targets;
    l && a.note(`unproxied ${b.locals} local(s): ${b.reads} read(s), ${b.assignments} assignment(s)`, l);
    for (let c of Object.keys(b)) b[c] && a.bump(`unproxy.${c}`, b[c]);
  }
  b.exports = {
    name: "06-proxy",
    run: at
  };
});
var ao = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    {
      children: d
    } = l(),
    f = ak(),
    {
      "As": g
    } = f,
    {
      c: h
    } = j();
  function i(a) {
    let b = [],
      d = (a, c) => {
        a && b.push({
          block: a,
          role: c
        });
      };
    switch (a.kind) {
      case c["Do"]:
        d(a.body, "plain");
        break;
      case c["While"]:
      case c["NumericFor"]:
      case c["GenericFor"]:
        d(a.body, "loop");
        break;
      case c["Repeat"]:
        d(a.body, "loop");
        break;
      case c["If"]:
        d(a.body, "plain");
        for (let b of a.s || []) d(b.body, "plain");
        d(a.e, "plain");
        break;
      case c["LocalFunction"]:
      case c["FunctionDeclaration"]:
        d(a.body && a.body.body, "function");
        break;
      default:
        break;
    }
    return b;
  }
  var k = class {
    constructor(a, b = null) {
      this.facts = b, this.holder = new Map(), this.owner = new Map(), this.role = new Map(), this.rn = new Map(), this.declarer = new Map(), this.mutations = new Map(), this.reads = new Set(), this.blocks = [];
      let d = a.kind === c["Chunk"] ? a.body : a;
      this.enter(d, "chunk"), this["_s"]();
    }
    "_s"() {
      let a = new Set();
      for (let b of this.rn.keys()) if (!(b.kind !== c["Name"] || !b.binding || a.has(b.binding))) {
        a.add(b.binding);
        for (let a of b.binding.reads || []) this.reads.add(a);
      }
    }
    enter(a, b) {
      if (!(!a || !a.statements)) {
        this.blocks.push(a), this.role.set(a, b);
        for (let b of a.statements) this.holder.set(b, a), this.declare(b), this.charge(b), this.claim(b, b);
      }
    }
    charge(a) {
      let b = b => {
          this.mutations.has(b) || this.mutations.set(b, []), this.mutations.get(b).push(a);
        },
        d = a => {
          for (let c of g(a, this.facts)) b(c);
        };
      for (let b of a.targets || []) b && b.kind !== c["Name"] && d(b);
      for (let e of this.own(a)) {
        if (e.kind !== c["Call"] && e.kind !== c["MethodCall"]) continue;
        (e.kind === c["MethodCall"] || e.base && e.base.kind !== c["Name"]) && d(e.base);
        for (let a of e.args || []) d(a);
        if (!this.facts) continue;
        let a = f.ft(e, this.facts);
        if (a) for (let c of a) b(c);
      }
    }
    declare(a) {
      let b = b => {
        b && this.declarer.set(b, a);
      };
      a.kind === c["LocalDeclaration"] ? (a.bindings || [])["forEach"](b) : a.kind === c["LocalFunction"] || a.kind === c["NumericFor"] ? b(a.binding) : a.kind === c["GenericFor"] && (a.bindings || [])["forEach"](b);
    }
    claim(a, b) {
      this.rn.set(a, b);
      for (let e of d(a)) {
        let a = e.node;
        if (!(!a || !a.kind)) if (a.kind === c["Block"]) {
          this.owner.set(a, b);
          let d = e.parent && e.parent.kind === c["Function"] ? "function" : (i(b).find(b => b.block === a) || {}).role || "plain";
          this.enter(a, d);
        } else {
          if (a.kind === c["Function"]) for (let c of a.bindings || []) this.declarer.set(c, b);
          this.claim(a, b);
        }
      }
    }
    *own(a) {
      let b = [a];
      for (; b.length;) {
        let a = b.pop();
        yield a;
        for (let e of d(a)) e.node && e.node.kind && e.node.kind !== c["Block"] && b.push(e.node);
      }
    }
  };
  function m(a) {
    switch (a.kind) {
      case c["LocalDeclaration"]:
      case c["Return"]:
      case c["GenericFor"]:
        return a.expressions || [];
      case c["Assignment"]:
        return a.expressions || [];
      case c["CallStatement"]:
        return [a.expression];
      case c["While"]:
      case c["Repeat"]:
        return [a.condition];
      case c["NumericFor"]:
        return [a.start, a.limit, a.step];
      case c["If"]:
        return [a.condition, ...(a.s || []).map(a => a.condition)];
      default:
        return [];
    }
  }
  function n(a, b) {
    let c = b;
    for (let b = 0; b < 1e3; b += 1) {
      let b = a.holder.get(c);
      if (!b) return !1;
      let d = b.statements || [];
      if (d[d.length - 1] !== c) return !1;
      let e = a.role.get(b);
      if (e === "function") return !0;
      if (e !== "plain") return !1;
      let f = a.owner.get(b);
      if (!f || f === c) return !1;
      c = f;
    }
    return !1;
  }
  function o(a, b) {
    let d = [],
      e = a => {
        let b = a && a.statements || [],
          f = b[b.length - 1];
        if (f) {
          if (f.kind === c["Return"]) {
            d.push(f);
            return;
          }
          if (!(f.kind !== c["If"] && f.kind !== c["Do"])) for (let a of i(f)) e(a.block);
        }
      };
    return e(b), d;
  }
  function p(a, b) {
    let d = [];
    for (let e of a.blocks) e.statements["forEach"](e => {
      switch (e.kind) {
        case c["Goto"]:
        case c["Label"]:
        case c["FunctionDeclaration"]:
          d.push(e);
          return;
        case c["Return"]:
          if (!n(a, e)) {
            d.push(e);
            return;
          }
          break;
        case c["Break"]:
        case c["Continue"]:
          return;
        default:
          break;
      }
      if (e.kind === c["Assignment"] && (e.targets || []).some(a => !f["Is"](a, b))) {
        d.push(e);
        return;
      }
      for (let a of m(e)) if (a && !f.ft(a, b)) {
        d.push(e);
        return;
      }
      for (let a of e.targets || []) a && a.kind === c["Index"] && !f["Ls"](a, b) && d.push(e);
    });
    return d;
  }
  function q(a, b) {
    let d = new Set();
    for (let e of a.own(b)) e.kind !== c["Name"] || !e.binding || h(e.binding) && a.reads.has(e) && d.add(e.binding);
    return d;
  }
  function r(a, b) {
    let d = new k(a, b),
      e = new Set(),
      f = new Set(),
      g = [],
      j = a => {
        !a || e.has(a) || (e.add(a), g.push(a));
      },
      l = a => {
        if (!(!a || f.has(a) || !h(a))) {
          f.add(a);
          for (let b of a.writes || []) j(d.rn.get(b));
          for (let b of d.mutations.get(a) || []) j(b);
          j(d.declarer.get(a));
        }
      },
      m = a => {
        for (let b of a.statements) if ((b.kind === c["Break"] || b.kind === c["Continue"]) && j(b), b.kind === c["If"] || b.kind === c["Do"]) for (let a of i(b)) m(a.block);
      };
    for (let a of p(d, b)) j(a);
    for (; g.length;) {
      let a = g.pop();
      for (let b of q(d, a)) l(b);
      let b = d.holder.get(a);
      for (; b;) {
        let a = d.owner.get(b);
        if (!a) break;
        j(a), b = d.holder.get(a);
      }
      for (let b of i(a)) b.role === "loop" && m(b.block);
      for (let b of d.own(a)) {
        if (b.kind !== c["Function"]) continue;
        let a = b.body;
        if (!(!a || !a.statements.length)) for (let b of o(d, a)) j(b);
      }
    }
    let n = 0;
    for (let a of d.blocks) {
      let b = a.statements.length;
      a.statements = a.statements.filter(a => e.has(a)), n += b - a.statements.length;
    }
    return n;
  }
  b.exports = {
    dt: r,
    seeds: p
  };
});
var ap = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    d = e(),
    {
      walk: f,
      transform: h
    } = l(),
    i = ak(),
    {
      y: k
    } = g(),
    {
      "D": m,
      c: n
    } = j(),
    o = aj(),
    {
      "Writes": p
    } = w(),
    {
      "K": s,
      "U": t
    } = z(),
    {
      "Os": u,
      "Ts": v
    } = al(),
    {
      dt: y
    } = ao(),
    {
      "Positions": aa
    } = x(),
    ab = r(),
    ac = ai(),
    ad = q();
  function ae(a, b, d) {
    let e = 0;
    return h(a, a => {
      if (a.kind !== c["Binary"] || a.operator !== "and" && a.operator !== "or") return a;
      let f = ad.truthiness(a.lhs);
      if (f === null) return a;
      let g = a.operator === "and" ? !f : f,
        h = g ? a.rhs : a.lhs;
      return i["E"](h, b) ? (d.decided += 1, e += 1, g ? a.lhs : a.rhs) : a;
    }), e;
  }
  function af(a) {
    let b = new Set();
    return f(a, {
      enter(a) {
        b.add(a);
      }
    }), b;
  }
  function ag(a, b) {
    let c = a.reads || [];
    if (!c.length) return !0;
    let d = af(b);
    return c.every(a => d.has(a));
  }
  function ah(a, b) {
    return n(a) ? (a.reads || []).length ? b ? ag(a, b) : !1 : !0 : !1;
  }
  function am(a, b, e) {
    let g = 0;
    return f(a, {
      enter(a) {
        if (a.kind !== c["Block"]) return;
        let e = [];
        for (let f of a.statements) {
          if (f.kind === c["LocalFunction"]) {
            if (ah(f.binding, f)) {
              g += 1;
              continue;
            }
          } else if (f.kind === c["LocalDeclaration"]) {
            let a = f.bindings || [],
              c = f.names || [],
              d = f.expressions || [],
              e = d.length === c.length,
              h = [];
            for (let f = 0; f < c.length; f += 1) !((a[f] && a[f].writes || []).length > 0) && ah(a[f], e ? d[f] : null) && (!e || i["E"](d[f], b)) ? g += 1 : h.push(f);
            if (!h.length && (!d.length || d.every(a => i["E"](a, b)))) continue;
            h.length !== c.length && e ? (f.names = h.map(a => c[a]), f.bindings = h.map(b => a[b]), f.expressions = h.map(a => d[a])) : h.length !== c.length && !d.length && (f.names = h.map(a => c[a]), f.bindings = h.map(b => a[b]));
          } else if (f.kind === c["Assignment"]) {
            let a = f.targets || [],
              h = f.expressions || [];
            if (a.length === 1 && h.length === 1 && a[0].kind === c["Name"] && h[0].kind === c["Name"] && a[0].binding && a[0].binding === h[0].binding) {
              g += 1;
              continue;
            }
            let j = a => a.kind === c["Name"] && ah(a.binding, null);
            if (a.every(j) && h.every(a => i["E"](a, b))) {
              g += a.length;
              continue;
            }
            let k = h.length === 1 ? d.unparen(h[0]) : null;
            if (a.every(j) && k && (k.kind === c["Call"] || k.kind === c["MethodCall"])) {
              g += a.length, e.push(d["X"](k));
              continue;
            }
            if (a.length === h.length && a.some(j) && a.some(a => !j(a))) {
              let c = [];
              for (let d = 0; d < a.length; d += 1) j(a[d]) && i["E"](h[d], b) ? g += 1 : c.push(d);
              f.targets = c.map(b => a[b]), f.expressions = c.map(a => h[a]);
            }
          } else if (f.kind === c["CallStatement"]) {
            if (i["Es"](f.expression, b) && i["E"](f.expression, b)) {
              g += 1;
              continue;
            }
          } else if (f.kind === c["Do"] && !(f.body && f.body.statements || []).length) {
            g += 1;
            continue;
          }
          e.push(f);
        }
        a.statements = e;
      }
    }), e.eliminated += g, g;
  }
  function an(a, b) {
    let e = 0;
    return f(a, {
      enter(a) {
        if (a.kind === c["Block"]) for (let b = 0; b + 1 < a.statements.length; b += 1) {
          let g = a.statements[b];
          if (g.kind !== c["LocalDeclaration"] || (g.expressions || []).length) continue;
          let h = a.statements[b + 1];
          if (!h || h.kind !== c["Assignment"]) continue;
          let i = h.targets || [],
            j = h.expressions || [];
          if (!i.length || i.length !== j.length) continue;
          let k = new Set(g.bindings || []);
          if (!i.every(a => a.kind === c["Name"] && k.has(a.binding))) continue;
          let l = !1;
          for (let a of j) f(a, {
            enter(a) {
              a.kind === c["Name"] && k.has(a.binding) && (l = !0);
            }
          });
          if (l) continue;
          let m = new Set(i.map(a => a.binding)),
            n = [],
            o = [];
          (g.bindings || [])["forEach"]((a, b) => {
            m.has(a) || (n.push(g.names[b]), o.push(a));
          });
          let p = d["R"](i.map(a => a.name), j);
          p.bindings = i.map(a => a.binding);
          let q = n.length ? [p, Object.assign(g, {
            names: n,
            bindings: o
          })] : [p];
          a.statements.splice(b, 2, ...q), e += 1, b -= 1;
        }
      }
    }), b.merged += e, e;
  }
  function ap(a, b) {
    let e = 0;
    return h(a, a => {
      if (a.kind !== c["Paren"]) return a;
      let b = a.expression;
      return !b || d.d(b) ? a : b.kind === c["Name"] || b.kind === c["Paren"] || d["Y"](b) || b.kind === c["Table"] || b.kind === c["Index"] ? (e += 1, b) : a;
    }), b.parens += e, e;
  }
  function aq(a) {
    let b = new Set();
    return f(a, {
      enter(a) {
        (a.kind === c["Index"] || a.kind === c["Call"] || a.kind === c["MethodCall"]) && b.add(a.base);
      }
    }), b;
  }
  function ar(a, b) {
    let e = new Map();
    f(a, {
      enter(a) {
        let b = (a, b, c, d) => {
          if (!n(a)) return;
          let f = e.get(a);
          f || (f = {
            count: 0,
            bare: 0,
            valued: 0,
            value: null,
            at: null
          }, e.set(a, f)), f.count += 1, b ? (f.valued += 1, f.value = b, f.at = c) : d && (f.bare += 1);
        };
        if (a.kind === c["LocalDeclaration"]) {
          let c = a.expressions || [],
            d = c.length === (a.names || []).length;
          (a.bindings || [])["forEach"]((e, f) => {
            b(e, d ? c[f] : null, a, !c.length);
          });
        } else if (a.kind === c["Assignment"]) {
          let d = a.targets || [],
            e = a.expressions || [],
            f = d.length === e.length;
          d["forEach"]((d, g) => {
            d.kind === c["Name"] && b(d.binding, f ? e[g] : null, a, !1);
          });
        } else if (a.kind === c["LocalFunction"]) b(a.binding, null, a, !1);else if (a.kind === c["NumericFor"]) b(a.binding, null, a, !1);else if (a.kind === c["GenericFor"] || a.kind === c["Function"]) for (let c of a.bindings || []) b(c, null, a, !1);
      }
    });
    let g = new Map(),
      i = null,
      j = null,
      k = new Map();
    for (let [a, b] of e) {
      if (!b.value || b.valued !== 1 || b.bare !== b.count - 1) continue;
      let e = d.unparen(b.value);
      e.kind === c["Name"] && (!n(e.binding) || e.binding === a || k.set(e, a));
    }
    let l = (a, b) => {
      let c = [];
      for (let d of a.reads || []) {
        let a = k.get(d);
        a && !b.has(a) ? (b.add(a), c.push(...l(a, b))) : c.push(d);
      }
      return c;
    };
    for (let [b, f] of e) {
      if (!f.value || f.valued !== 1 || !d["Y"](f.value) || f.value.kind === c["Vararg"]) continue;
      let e = b.reads || [];
      if (!e.length || f.count !== 1 && (f.bare !== f.count - 1 || (i || (i = new aa(a)), !e.every(a => i.precedes(f.at, a))))) continue;
      let h = l(b, new Set([b]));
      h.length > 1 && (j || (j = aq(a)), h.some(a => j.has(a))) || g.set(b, f.value);
    }
    if (!g.size) return 0;
    let m = new Set();
    for (let a of g.keys()) for (let b of a.writes || []) m.add(b);
    let o = 0;
    return h(a, a => {
      if (a.kind !== c["Name"] || !a.binding || m.has(a)) return a;
      let b = g.get(a.binding);
      return b ? (o += 1, {
        ...b
      }) : a;
    }), b.propagated += o, o;
  }
  function as(a, b) {
    let e = new Set();
    f(a, {
      enter(a) {
        n(a.binding) && e.add(a.name);
      }
    });
    let g = 0;
    return h(a, a => {
      if (a.kind !== c["Index"]) return a;
      let b = a.base;
      if (!m(b) || b.name !== "_ENV") return a;
      let f = a.index;
      return !f || f.kind !== c["String"] || !k(f.value) || e.has(f.value) ? a : (g += 1, d.name(f.value));
    }), b.globals += g, g;
  }
  function at(a, b) {
    let d = 0;
    return f(a, {
      enter(a) {
        a.kind === c["NumericFor"] && a.step && a.step.kind === c["Number"] && a.step.value === 1 && (a.step = null, d += 1);
      }
    }), b.loops += d, d;
  }
  function au(a) {
    let b = {
      eliminated: 0,
      merged: 0,
      parens: 0,
      idioms: 0,
      propagated: 0,
      loops: 0,
      globals: 0,
      stores: 0,
      decided: 0,
      unwanted: 0
    };
    for (let c = 0; c < 24; c += 1) {
      a.resolve();
      let c = 0;
      c += o.run(a, b), a.resolve(), c += ar(a.chunk, b), a.resolve(), c += as(a.chunk, b), a.resolve();
      let d = new i["Facts"](a.chunk),
        e = ab.ar(a.chunk, {
          binary: ab["BINARY"],
          unary: ab["LOGIC"]
        });
      b.decided += e, c += e, c += ae(a.chunk, d, b), a.resolve();
      let f = a.stats["guards.constants"] || 0;
      ac.run(a), c += (a.stats["guards.constants"] || 0) - f, a.resolve(), c += am(a.chunk, d, b), a.resolve();
      let g = u(a.chunk, new p(a.chunk, s, t), new i["Facts"](a.chunk));
      b.stores += g, c += g, a.resolve();
      let h = v(a.chunk);
      b.stores += h, c += h, a.resolve();
      let j = y(a.chunk, new i["Facts"](a.chunk));
      b.unwanted += j, c += j, a.resolve(), c += an(a.chunk, b), c += ap(a.chunk, b);
      let k = a.stats["fold.count"] || 0;
      if (ab.run(a), c += (a.stats["fold.count"] || 0) - k, !c) break;
    }
    at(a.chunk, b), a.resolve();
    let c = Object.values(b).reduce((a, b) => a + b, 0);
    c && a.note(`removed ${b.eliminated + b.stores} dead write(s), ${b.unwanted} unwanted statement(s), merged ${b.merged} declaration(s), rebuilt ${b.idioms} idiom(s)`, c);
    for (let c of Object.keys(b)) b[c] && a.bump(`simplify.${c}`, b[c]);
  }
  b.exports = {
    name: "07-opt",
    run: au,
    eliminate: am,
    "Bs": an,
    ht: ap
  };
});
var aq = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    {
      walk: d
    } = l(),
    {
      y: f
    } = g(),
    {
      "D": h
    } = j(),
    i = ["i", "j", "k", "m", "n"];
  function k(a) {
    let b = new Set(["and", "break", "do", "else", "elseif", "end", "false", "for", "function", "goto", "if", "in", "local", "nil", "not", "or", "repeat", "return", "then", "true", "until", "while", "self", "_ENV"]);
    return d(a, {
      enter(a) {
        h(a) && b.add(a.name);
      }
    }), b;
  }
  function m(a) {
    let b = {
      p: 0,
      f: 0,
      v: 0,
      i: 0
    };
    return c => {
      for (let d = 0; d < 1e5; d += 1) {
        b[c] += 1;
        let d = b[c],
          e = c === "i" && d <= i.length ? i[d - 1] : `${c}${d}`;
        if (!a.has(e) && f(e)) return a.add(e), e;
      }
      throw new Error("rename: name pool exhausted");
    };
  }
  function n(a) {
    let b = new Map(),
      e = (a, d) => {
        if (!a || a.kind !== c["Name"] || !a.binding) return;
        let e = b.get(a.binding) || {
          functions: 0,
          other: 0
        };
        d && d.kind === c["Function"] ? e.functions += 1 : e.other += 1, b.set(a.binding, e);
      };
    d(a, {
      enter(a) {
        if (a.kind === c["FunctionDeclaration"]) e(a.target, a.body);else if (a.kind === c["Assignment"]) {
          let b = a.expressions || [],
            c = a.targets || [],
            d = b.length === c.length;
          c["forEach"]((a, c) => e(a, d ? b[c] : null));
        }
      }
    });
    let f = new Set();
    for (let [a, c] of b) c.functions && !c.other && f.add(a);
    return f;
  }
  function o(a) {
    let b = new Map(),
      e = n(a),
      f = (a, c) => {
        !a || b.has(a) || b.set(a, c);
      };
    return d(a, {
      enter(a) {
        if (a.kind === c["Function"]) (a.bindings || [])["forEach"]((b, c) => {
          (a.params || [])[c] !== "self" && f(b, "p");
        });else if (a.kind === c["LocalFunction"]) f(a.binding, "f");else if (a.kind === c["NumericFor"]) f(a.binding, "i");else if (a.kind === c["GenericFor"]) (a.bindings || [])["forEach"](a => f(a, "v"));else if (a.kind === c["LocalDeclaration"]) {
          let b = a.expressions || [],
            d = b.length === (a.names || []).length;
          (a.bindings || [])["forEach"]((a, g) => {
            let h = d ? b[g] : null,
              i = h && h.kind === c["Function"] || e.has(a);
            f(a, i ? "f" : "v");
          });
        }
      }
    }), b;
  }
  function p(a, b) {
    let c = new Map();
    for (let [d, e] of o(a)) c.set(d, b(e));
    return c;
  }
  function q(a, b) {
    let e = 0,
      f = (a, c) => {
        if (!(!a || !c)) for (let d = 0; d < c.length && d < a.length; d += 1) {
          let e = b.get(c[d]);
          e && (a[d] = e);
        }
      };
    return d(a, {
      enter(a) {
        if (a.kind === c["Function"]) f(a.params, a.bindings);else if (a.kind === c["LocalDeclaration"]) f(a.names, a.bindings);else if (a.kind === c["GenericFor"]) f(a.variables, a.bindings);else if (a.kind === c["LocalFunction"]) {
          let c = b.get(a.binding);
          c && (a.name = c);
        } else if (a.kind === c["NumericFor"]) {
          let c = b.get(a.binding);
          c && (a.variable = c);
        } else if (a.kind === c["Name"] && a.binding) {
          let c = b.get(a.binding);
          c && a.name !== c && (a.name = c, e += 1);
        }
      }
    }), e;
  }
  function r(a) {
    a.resolve();
    let b = k(a.chunk),
      c = p(a.chunk, m(b));
    if (!c.size) return;
    let d = q(a.chunk, c);
    a.resolve(), a.note(`renamed ${c.size} local(s)`, c.size), a.bump("rename.bindings", c.size), a.bump("rename.mentions", d);
  }
  b.exports = {
    name: "08-vars",
    run: r,
    reserved: k,
    namer: m,
    categories: o,
    plan: p,
    apply: q
  };
});
var ar = a((a, b) => {
  "use strict";

  var c = e(),
    {
      "Kind": d
    } = c,
    {
      walk: f,
      transform: g,
      collect: h
    } = l(),
    {
      c: i
    } = j(),
    {
      bare: k
    } = y(),
    m = "GetService";
  function n(a) {
    if (!a || a.kind !== d["MethodCall"] || a.method !== m) return null;
    let b = a.args || [];
    if (b.length !== 1) return null;
    let c = k(b[0]);
    if (!c || c.kind !== d["String"]) return null;
    let e = k(a.base);
    return !e || e.kind !== d["Name"] || i(e.binding) ? null : c.value;
  }
  var o = a => n(k(a)) !== null;
  function p(a) {
    if (!a || a.kind !== d["LocalDeclaration"] || (a.names || []).length !== 1 || (a.expressions || []).length !== 1) return null;
    let b = n(k(a.expressions[0]));
    return b === null ? null : {
      service: b,
      name: a.names[0],
      initializer: k(a.expressions[0])
    };
  }
  function q(a) {
    let b = 0;
    for (; b < a.length && p(a[b]);) b += 1;
    return b;
  }
  function r(a) {
    let b = new Set();
    return f(a, {
      enter(a) {
        a.kind === d["Name"] && b.add(a.name);
        for (let c of ["names", "params", "variables"]) for (let d of a[c] || []) b.add(d);
        (a.kind === d["LocalFunction"] || a.kind === d["NumericFor"]) && b.add(a.name || a.variable);
      }
    }), b;
  }
  function s(a) {
    let b = a.body ? a.body.statements : null;
    if (!b) return 0;
    let e = h(a, a => n(a) !== null);
    if (!e.length) return 0;
    let i = new Map();
    for (let a of e) {
      let b = n(a),
        c = i.get(b);
      c || i.set(b, c = []), c.push(a);
    }
    let j = q(b),
      l = new Map();
    for (let a = 0; a < j; a += 1) {
      let c = p(b[a]);
      l.has(c.service) || l.set(c.service, c);
    }
    let o = a => {
      let b = l.get(a),
        c = i.get(a);
      return !!b && c.length === 1 && c[0] === b.initializer;
    };
    if ([...i.keys()].every(o)) return 0;
    let s = r(a),
      t = () => {
        let a = 0;
        for (;;) {
          a += 1;
          let b = `service${a}`;
          if (!s.has(b)) return s.add(b), b;
        }
      },
      u = [],
      v = new Map();
    for (let [a, b] of i) {
      let d = l.get(a);
      if (!d) {
        let e = k(b[0].base).name;
        d = {
          service: a,
          name: t(),
          initializer: null
        }, u.push(c["R"]([d.name], [c["Le"](c.name(e), m, [c.string(a)])])), l.set(a, d);
      }
      for (let a of b) a !== d.initializer && v.set(a, c.name(d.name));
    }
    let w = new Set();
    f(a, {
      enter(a) {
        if (a.kind === d["Block"]) for (let b of a.statements) {
          if (b.kind !== d["CallStatement"]) continue;
          let a = k(b.expression);
          v.has(a) && (v.delete(a), w.add(b));
        }
      }
    });
    let x = v.size + u.length + w.size;
    if (!x) return 0;
    if (g(a, a => v.get(a) || a), w.size && f(a, {
      enter(a) {
        if (a.kind === d["Block"]) for (let b = a.statements.length - 1; b >= 0; b -= 1) w.has(a.statements[b]) && a.statements.splice(b, 1);
      }
    }), u.length) {
      let b = a.body.statements;
      b.splice(q(b), 0, ...u);
    }
    return x;
  }
  b.exports = {
    gather: s,
    "Rs": o
  };
});
var as = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    {
      walk: d,
      collect: f
    } = l(),
    {
      bare: g
    } = y();
  function h(a) {
    if (!a) return !0;
    switch (a.kind) {
      case c["Nil"]:
      case c["True"]:
      case c["False"]:
      case c["Number"]:
      case c["String"]:
      case c["Vararg"]:
      case c["Name"]:
      case c["Function"]:
        return !0;
      case c["Paren"]:
        return h(a.expression);
      case c["Table"]:
        return (a.entries || []).every(a => (a.type !== "key" || h(a.key)) && h(a.value));
      default:
        return !1;
    }
  }
  function i(a, b) {
    return f(a, a => a === b).length > 0;
  }
  function j(a) {
    let b = new Set();
    return d(a, {
      enter(a) {
        if (a.kind === c["Assignment"]) for (let d of a.targets || []) {
          let a = g(d);
          a && a.kind === c["Index"] && b.add(a);
        }
      }
    }), b;
  }
  function k(a, b) {
    let e = j(a),
      f = [],
      g = [],
      h = !1;
    return d(a, {
      enter(a) {
        if (h) return !1;
        if (a === b) {
          h = !0;
          for (let a of g) {
            let b = f["indexOf"](a);
            b >= 0 && f.splice(b, 1);
          }
          return !1;
        }
        if (e.has(a) || f.push(a), a.kind === c["Function"] && !i(a, b)) return !1;
        g.push(a);
      },
      leave(a) {
        !h && g[g.length - 1] === a && g.pop();
      }
    }), h ? f : null;
  }
  function m(a, b) {
    let c = k(a, b);
    return c ? c.every(a => h(a)) : !1;
  }
  function n(a) {
    let b = new Set(),
      e = new Set();
    return d(a, {
      enter(a) {
        if (a.kind === c["Assignment"]) for (let b of a.targets || []) {
          let a = g(b);
          a && a.kind === c["Name"] && e.add(a);
        }
        a.kind === c["Name"] && a.binding && !e.has(a) && b.add(a.binding);
      }
    }), b;
  }
  function o(a) {
    let b = new Map(),
      e = new Set(),
      f = (a, c) => {
        !a || e.has(a) || (e.add(a), b.set(c, (b.get(c) || 0) + 1));
      };
    return d(a, {
      enter(a) {
        a.kind === c["Function"] ? (a.bindings || [])["forEach"]((b, c) => f(b, (a.params || [])[c])) : a.kind === c["LocalDeclaration"] ? (a.bindings || [])["forEach"]((b, c) => f(b, (a.names || [])[c])) : a.kind === c["LocalFunction"] ? f(a.binding, a.name) : a.kind === c["NumericFor"] ? f(a.binding, a.variable) : a.kind === c["GenericFor"] && (a.bindings || [])["forEach"]((b, c) => f(b, (a.variables || [])[c]));
      }
    }), b;
  }
  function p(a, b) {
    return a.get(b) === 1;
  }
  function q(a) {
    if (!a || a.kind !== c["Assignment"]) return null;
    let b = a.targets || [],
      d = a.expressions || [];
    if (b.length !== 1 || d.length !== 1) return null;
    let e = g(b[0]);
    return !e || e.kind !== c["Name"] || !e.binding ? null : {
      target: e,
      value: d[0]
    };
  }
  function r(a) {
    if (!a || a.kind !== c["LocalDeclaration"]) return null;
    let b = a.names || [],
      d = a.expressions || [];
    if (b.length !== 1 || d.length !== 1) return null;
    let e = (a.bindings || [])[0];
    return e ? {
      binding: e,
      name: b[0],
      value: d[0]
    } : null;
  }
  function s(a) {
    return !a || a.kind !== c["Do"] ? !1 : !(a.body && a.body.statements || []).length;
  }
  b.exports = {
    quiet: h,
    "Ds": m,
    "Ps": n,
    gt: o,
    unshadowed: p,
    js: q,
    sn: r,
    zs: s
  };
});
var at = a((a, b) => {
  "use strict";

  var {
      "Kind": c,
      d: d
    } = e(),
    {
      walk: f,
      transform: g,
      collect: h,
      children: i
    } = l(),
    {
      "Positions": k
    } = x(),
    {
      c: m
    } = j(),
    {
      bare: n
    } = y(),
    o = ar(),
    p = as();
  function q(a) {
    if (!a) return null;
    let b = a.declaration;
    return b ? b.kind === c["LocalDeclaration"] ? "after" : b.kind === c["LocalFunction"] ? "from" : "inside" : null;
  }
  function r(a, b, c) {
    let d = q(b);
    if (!d) return !1;
    let e = a.path(b.declaration),
      f = a.path(c);
    if (!e || !f || f.depth < e.depth) return !1;
    let g = f;
    for (; g.depth > e.depth;) g = g.up;
    return g.up !== e.up || g.block !== e.block ? !1 : d === "after" ? g.at > e.at : d === "from" ? g.at >= e.at : g.at === e.at && f.depth > e.depth;
  }
  function s(a) {
    let b = new Map(),
      d = a => {
        let c = b.get(a);
        return c || (c = {
          valued: 0,
          opaque: 0,
          empty: 0,
          value: null,
          at: null
        }, b.set(a, c)), c;
      };
    return f(a, {
      enter(a) {
        if (a.kind === c["LocalDeclaration"]) {
          let b = a.expressions || [],
            c = b.length === (a.names || []).length;
          (a.bindings || [])["forEach"]((e, f) => {
            if (!m(e)) return;
            let g = d(e);
            b.length ? c ? (g.valued += 1, g.value = b[f], g.at = a) : g.opaque += 1 : g.empty += 1;
          });
        } else if (a.kind === c["Assignment"]) {
          let b = a.targets || [],
            e = a.expressions || [],
            f = b.length === e.length;
          b["forEach"]((b, g) => {
            let h = n(b);
            if (!h || h.kind !== c["Name"] || !m(h.binding)) return;
            let i = d(h.binding);
            f ? (i.valued += 1, i.value = e[g], i.at = a) : i.opaque += 1;
          });
        } else if (a.kind === c["LocalFunction"]) {
          let b = d(a.binding);
          b.valued += 1, b.value = null, b.at = a;
        } else if (a.kind === c["FunctionDeclaration"]) {
          let b = n(a.target);
          if (b && b.kind === c["Name"] && m(b.binding)) {
            let c = d(b.binding);
            c.valued += 1, c.value = null, c.at = a;
          }
        } else if (a.kind === c["NumericFor"] || a.kind === c["GenericFor"] || a.kind === c["Function"]) for (let b of a.bindings || []) m(b) && (d(b).opaque += 1);
      }
    }), b;
  }
  function t(a) {
    return a && a.reads || [];
  }
  function u(a) {
    let b = new Map();
    return f(a, {
      enter(a) {
        for (let c of i(a)) b.set(c.node, a);
      }
    }), b;
  }
  function v(a, b) {
    let d = b,
      e = a.get(d);
    for (; e && e.kind !== c["Block"];) d = e, e = a.get(d);
    return e ? d : null;
  }
  function w(a, b) {
    if (!a) return null;
    if (a.kind === c["LocalFunction"]) return a.body === b ? a.binding : null;
    let d = a.expressions || [];
    if (d.length !== 1 || n(d[0]) !== b) return null;
    if (a.kind === c["LocalDeclaration"]) return (a.names || []).length === 1 ? (a.bindings || [])[0] : null;
    if (a.kind !== c["Assignment"]) return null;
    let e = a.targets || [];
    if (e.length !== 1) return null;
    let f = n(e[0]);
    return f && f.kind === c["Name"] ? f.binding : null;
  }
  function z(a, b) {
    let d = new Set();
    for (let e of a && a.expressions || []) {
      let a = n(e);
      a && a.kind === c["Name"] && a.binding === b && d.add(a);
    }
    return d;
  }
  function aa(a, b, d, e) {
    if (!m(b) || b.declaration !== d) return !1;
    let f = a.path(d),
      g = a.path(e);
    if (!f || !g || f.depth !== g.depth || f.up !== g.up) return !1;
    let i = f.block;
    if (i !== g.block) return !1;
    let j = f.at,
      k = g.at;
    if (j >= k) return !1;
    let l = i.statements || [];
    if (l.some(a => a.kind === c["Label"])) return !1;
    let n = z(e, b);
    for (let a = j + 1; a <= k; a += 1) {
      let d = h(l[a], a => a.kind === c["Name"] && a.binding === b);
      if (a === k ? d.some(a => !n.has(a)) : d.length) return !1;
    }
    return !0;
  }
  function ab(a, b, d, e) {
    let f = b.path(e);
    if (!f) return !1;
    let g = f.block,
      h = a.get(d);
    for (; h;) {
      if (h.kind === c["Function"]) {
        let c = v(a, h),
          d = c ? b.path(c) : null;
        if (d && d.depth === f.depth && d.block === g) {
          let a = w(c, h);
          return !!a && aa(b, a, c, e);
        }
      }
      h = a.get(h);
    }
    return !1;
  }
  function ac(a, b, c, d) {
    if (!c || c.valued !== 1 || c.opaque) return !1;
    let e = t(b);
    return e.length ? c.empty ? e.every(b => b === c.at || a.precedes(c.at, b) || d && ab(d, a, b, c.at)) : !0 : !1;
  }
  function ad(a, b) {
    let d = a.get(b);
    for (; d;) {
      if (d.kind === c["Function"]) return d;
      d = a.get(d);
    }
    return null;
  }
  function ae(a, b) {
    let d = new Set(),
      e = b;
    for (; e;) (e.kind === c["While"] || e.kind === c["Repeat"] || e.kind === c["NumericFor"] || e.kind === c["GenericFor"]) && d.add(e), e = a.get(e);
    return d;
  }
  function af(a, b, d, e) {
    let f = ae(a, e),
      g = (d.writes || []).slice(),
      h = d.declaration;
    h && (h.kind === c["NumericFor"] || h.kind === c["GenericFor"]) && g.push(h);
    for (let c of g) {
      for (let b of ae(a, c)) if (f.has(b)) return !0;
      if (c !== e && !b.precedes(c, e)) return !0;
    }
    return !1;
  }
  function ag(a) {
    let b = new k(a),
      d = u(a),
      e = s(a),
      h = p.gt(a),
      i = new Map();
    for (let [a, f] of e) {
      if (!ac(b, a, f, d)) continue;
      let g = n(f.value);
      if (!g || g.kind !== c["Name"]) continue;
      let j = g.binding;
      if (!m(j) || j === a || !p.unshadowed(h, j.name)) continue;
      let k = e.get(j);
      if (k && k.valued > 1 || k && k.opaque > 1 || k && k.valued === 1 && k.at !== f.at && !b.precedes(k.at, f.at)) continue;
      let l = t(a);
      l.every(a => r(b, j, a)) && (l.some(a => ad(d, a) !== ad(d, f.at)) && af(d, b, j, f.at) || i.set(a, j));
    }
    if (!i.size) return 0;
    let j = a => {
        let b = a;
        for (let a = 0; a < 1e3 && i.has(b); a += 1) b = i.get(b);
        return b;
      },
      l = 0,
      o = new Set();
    return f(a, {
      enter(a) {
        if (a.kind === c["Assignment"]) for (let b of a.targets || []) {
          let a = n(b);
          a && a.kind === c["Name"] && o.add(a);
        }
      }
    }), g(a, a => {
      if (a.kind !== c["Name"] || !a.binding || o.has(a) || !i.has(a.binding)) return a;
      let b = j(a.binding);
      return b === a.binding ? a : (l += 1, {
        kind: c["Name"],
        name: b.name,
        binding: b
      });
    }), l;
  }
  function ah(a, b) {
    for (let c = b + 1; c < a.length; c += 1) if (!p.zs(a[c])) return c;
    return -1;
  }
  function ai(a, b) {
    let c = null;
    return f(a, {
      enter(a, d) {
        a === b && d && (c = d.parent);
      }
    }), c;
  }
  function aj(a, b) {
    let d = ai(a, b);
    return !d || !d.kind ? !1 : d.kind === c["Unary"] || d.kind === c["Binary"] || d.kind === c["Index"] ? !0 : d.kind === c["Call"] || d.kind === c["MethodCall"] ? n(d.base) === b || d.base === b : !1;
  }
  function ak(a) {
    if (!a || a.kind !== c["LocalFunction"]) return null;
    let b = a.binding;
    return !b || !a.body || h(a.body, b => b.kind === c["Name"] && b.name === a.name).length ? null : {
      binding: b,
      name: a.name,
      value: a.body
    };
  }
  function al(a, b) {
    let d = !1,
      e = a => {
        if (!(d || !a || !a.kind || a.kind === c["Block"])) {
          if (a === b) {
            d = !0;
            return;
          }
          for (let b of i(a)) e(b.node);
        }
      };
    return e(a), d;
  }
  function am(a, b) {
    let e = a.statements,
      f = p.js(e[b]) || p.sn(e[b]) || ak(e[b]);
    if (!f) return !1;
    let i = f.binding || f.target.binding;
    if (!m(i) || o["Rs"](f.value)) return !1;
    let j = t(i);
    if (j.length !== 1) return !1;
    let k = ah(e, b);
    if (k < 0) return !1;
    let l = j[0],
      q = e[k];
    if (q.kind === c["While"] || q.kind === c["Repeat"] || q.kind === c["Assignment"] && (q.targets || []).some(a => h(a, a => a === l).length) || !al(q, l) || !p["Ds"](q, l)) return !1;
    let r = n(f.value);
    if (r && (r.kind === c["Table"] || r.kind === c["Function"]) && aj(q, l)) return !1;
    let s = d(n(f.value)) ? {
      kind: c["Paren"],
      expression: f.value
    } : f.value;
    return g(q, a => a === l ? s : a), e[b] = {
      kind: c["Do"],
      body: {
        kind: c["Block"],
        statements: []
      }
    }, !0;
  }
  function an(a) {
    let b = 0;
    return f(a, {
      enter(a) {
        if (a.kind === c["Block"]) for (let c = 0; c < a.statements.length; c += 1) am(a, c) && (b += 1);
      }
    }), b;
  }
  b.exports = {
    qi: q,
    on: r,
    "Gs": u,
    sealed: aa,
    rewritten: af,
    propagate: ag,
    "Ks": ak,
    "Mi": ai,
    "Us": aj,
    "Ws": an
  };
});
var au = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    {
      walk: d,
      collect: f
    } = l(),
    {
      y: h
    } = g(),
    {
      c: i
    } = j(),
    {
      bare: k
    } = y(),
    {
      "Positions": m
    } = x(),
    {
      on: n
    } = at(),
    o = as();
  function p(a) {
    return (a.statements || []).some(a => a.kind === c["Label"]);
  }
  function q(a, b) {
    return f(a, a => a.kind === c["Name"] && a.binding === b);
  }
  function r(a, b) {
    let e = new Map();
    return (a.statements || [])["forEach"]((a, f) => {
      d(a, {
        enter(a) {
          if (b && a.kind === c["Function"]) return !1;
          if (a.kind !== c["Name"] || !a.binding) return;
          let d = e.get(a.binding);
          d ? d[d.length - 1].at === f ? d[d.length - 1].nodes.push(a) : d.push({
            at: f,
            nodes: [a]
          }) : e.set(a.binding, [{
            at: f,
            nodes: [a]
          }]);
        }
      });
    }), e;
  }
  function s(a, b) {
    let c = a && a.get(b);
    if (c) return c;
    let d = r(b, !0);
    return a && a.set(b, d), d;
  }
  function t(a, b, c) {
    for (let d of a.get(b) || []) if (d.at > c) return d;
    return null;
  }
  function u(a) {
    let b = a.statements || [],
      d = new Map();
    if (p(a)) return d;
    let e = null;
    return b["forEach"]((f, g) => {
      f.kind === c["LocalDeclaration"] && ((f.expressions || []).length || (f.bindings || [])["forEach"]((h, j) => {
        if (!i(h)) return;
        e || (e = r(a));
        let l = t(e, h, g);
        if (!l) return;
        let m = b[l.at];
        if (m.kind !== c["Assignment"]) return;
        let n = (m.targets || []).map(a => k(a)),
          o = l.nodes.filter(a => n["indexOf"](a) >= 0);
        if (o.length !== l.nodes.length || o.length !== 1) return;
        let p = d.get(l.at);
        p || (p = [], d.set(l.at, p)), p.push({
          binding: h,
          declaration: f,
          slot: j,
          target: o[0]
        });
      }));
    }), d;
  }
  function v(a, b, c) {
    a.declaration = b, a.initializer = b;
    let d = a.writes["indexOf"](c);
    d >= 0 && a.writes.splice(d, 1);
  }
  function w(a) {
    let b = 0;
    return d(a, {
      enter(a) {
        if (a.kind !== c["Block"]) return;
        let d = u(a);
        for (let [e, f] of d) {
          let d = a.statements[e],
            g = (d.targets || []).map(a => k(a));
          if (g.length !== f.length) continue;
          let h = g.map(a => f.find(b => b.target === a));
          if (h.some(a => !a)) continue;
          let i = {
            kind: c["LocalDeclaration"],
            names: h.map(a => a.binding.name),
            expressions: d.expressions || [],
            bindings: h.map(a => a.binding)
          };
          a.statements[e] = i;
          for (let a of h) {
            let c = a.declaration.names || [],
              d = c["indexOf"](a.binding.name);
            d >= 0 && (c.splice(d, 1), (a.declaration.bindings || []).splice(d, 1)), v(a.binding, i, a.target), b += 1;
          }
        }
      }
    }), b;
  }
  function z(a) {
    let b = a.statements || [],
      d = new Map();
    if (p(a)) return d;
    let e = null;
    return b["forEach"]((f, g) => {
      f.kind === c["LocalDeclaration"] && ((f.expressions || []).length || (f.bindings || [])["forEach"](c => {
        if (!i(c)) return;
        e || (e = r(a));
        let h = t(e, c, g);
        if (!h || h.at === g + 1) return;
        for (let a = g + 1; a < h.at; a += 1) if (!al(b[a], c.name)) return;
        let j = d.get(h.at);
        j || (j = [], d.set(h.at, j)), j.push({
          binding: c,
          declaration: f
        });
      }));
    }), d;
  }
  function aa(a) {
    let b = 0;
    return d(a, {
      enter(a) {
        if (a.kind !== c["Block"]) return;
        let d = z(a);
        if (!d.size) return;
        let e = [];
        a.statements["forEach"]((a, f) => {
          let g = d.get(f);
          if (g && g.length) {
            let a = {
              kind: c["LocalDeclaration"],
              names: g.map(a => a.binding.name),
              expressions: [],
              bindings: g.map(a => a.binding)
            };
            for (let c of g) {
              let d = c.declaration.names || [],
                e = d["indexOf"](c.binding.name);
              e >= 0 && (d.splice(e, 1), (c.declaration.bindings || []).splice(e, 1)), c.binding.declaration = a, c.binding.initializer = a, b += 1;
            }
            e.push(a);
          }
          e.push(a);
        }), a.statements = e;
      }
    }), b;
  }
  function ab(a, b) {
    let e = new Set(b),
      f = [],
      g = null;
    return d(a, {
      enter(a) {
        if (a.kind === c["Block"] && f.push(a), !!e.has(a)) if (!g) g = [...f];else {
          let a = 0;
          for (; a < g.length && g[a] === f[a];) a += 1;
          g.length = a;
        }
      },
      leave(a) {
        a.kind === c["Block"] && f.pop();
      }
    }), g && g.length ? g[g.length - 1] : null;
  }
  function ac(a) {
    let b = new Set();
    return d(a, {
      enter(a) {
        if (a.kind === c["Function"]) return !1;
        a.kind === c["Block"] && b.add(a);
      }
    }), b;
  }
  function ad(a) {
    let b = new Map(),
      e = [];
    return d(a, {
      enter(a) {
        if (a.kind === c["Block"]) e.push(a);else if (a.kind === c["Name"] && a.binding) {
          let c = b.get(a.binding);
          if (!c) b.set(a.binding, {
            nodes: [a],
            path: e.slice()
          });else {
            c.nodes.push(a);
            let b = 0;
            for (; b < c.path.length && c.path[b] === e[b];) b += 1;
            c.path.length = b;
          }
        }
      },
      leave(a) {
        a.kind === c["Block"] && e.pop();
      }
    }), b;
  }
  function ae(a, b, d) {
    let e = a.statements || [],
      f = [];
    if (p(a) || !e.some(a => a.kind === c["LocalDeclaration"] && !(a.expressions || []).length)) return f;
    let g = null;
    return e["forEach"](e => {
      e.kind === c["LocalDeclaration"] && ((e.expressions || []).length || (e.bindings || [])["forEach"](h => {
        if (!i(h)) return;
        let j = b ? b.get(h) : null,
          l = j ? j.nodes : q(a, h);
        if (!l.length) return;
        let m = j ? j.path[j.path.length - 1] : ab(a, l);
        if (g || (g = ac(a)), !m || m === a || !g.has(m) || p(m)) return;
        let n = s(d, m).get(h) || [],
          o = 0;
        for (let a of n) o += a.nodes.length;
        if (o !== l.length) return;
        let r = n[0];
        if (!r) return;
        let t = (m.statements || [])[r.at];
        if (!t || t.kind !== c["Assignment"]) return;
        let u = (t.targets || []).map(a => k(a)),
          v = r.nodes.filter(a => u["indexOf"](a) >= 0);
        v.length !== 1 || v.length !== r.nodes.length || f.push({
          binding: h,
          declaration: e,
          target: m,
          at: r.at
        });
      }));
    }), f;
  }
  function af(a) {
    let b = [],
      e = ad(a),
      f = new Map();
    if (d(a, {
      enter(a) {
        a.kind === c["Block"] && b.push(...ae(a, e, f));
      }
    }), !b.length) return 0;
    let g = new Map();
    for (let a of b) {
      let b = g.get(a.target);
      b || (b = new Map(), g.set(a.target, b));
      let c = b.get(a.at);
      c || (c = [], b.set(a.at, c)), c.push(a);
    }
    let h = 0;
    for (let [a, b] of g) for (let d of [...b.keys()].sort((a, b) => b - a)) {
      let e = b.get(d),
        f = {
          kind: c["LocalDeclaration"],
          names: e.map(a => a.binding.name),
          expressions: [],
          bindings: e.map(a => a.binding)
        };
      for (let a of e) {
        let b = a.declaration.names || [],
          c = b["indexOf"](a.binding.name);
        c >= 0 && (b.splice(c, 1), (a.declaration.bindings || []).splice(c, 1)), a.binding.declaration = f, a.binding.initializer = f, h += 1;
      }
      a.statements.splice(d, 0, f);
    }
    return h;
  }
  function ag(a) {
    return a.kind === c["LocalFunction"] ? !0 : a.kind === c["LocalDeclaration"] ? (a.expressions || []).every(a => o.quiet(a)) : a.kind !== c["Assignment"] ? !1 : (a.targets || []).every(a => {
      let b = k(a);
      return b && b.kind === c["Name"] && i(b.binding);
    }) && (a.expressions || []).every(a => o.quiet(a));
  }
  function ah(a, b) {
    return f(a, a => a.kind === c["Assignment"] && (a.targets || []).some(a => {
      let d = k(a);
      return d && d.kind === c["Name"] && b.has(d.binding);
    })).length > 0;
  }
  function ai(a, b) {
    let d = a.statements || [],
      e = [];
    if (p(a)) return e;
    let g = null;
    return d["forEach"]((h, j) => {
      h.kind === c["LocalDeclaration"] && ((h.expressions || []).length || (h.bindings || [])["forEach"](l => {
        if (!i(l)) return;
        g || (g = r(a, !0));
        let m = t(g, l, j);
        if (!m) return;
        let p = m.at,
          q = d[p];
        if (q.kind !== c["Assignment"] || (q.targets || []).length !== 1 || (q.expressions || []).length !== 1) return;
        let s = k(q.targets[0]);
        if (!s || s.kind !== c["Name"] || s.binding !== l || m.nodes.length !== 1) return;
        let u = q.expressions[0];
        if (!o.quiet(u)) return;
        let v = f(u, a => a.kind === c["Name"]);
        if (!v.every(a => i(a.binding) && n(b, a.binding, h))) return;
        let w = new Set(v.map(a => a.binding));
        for (let a = j + 1; a < p; a += 1) if (!ag(d[a]) || ah(d[a], w)) return;
        e.push({
          binding: l,
          declaration: h,
          store: q,
          value: u,
          block: a
        });
      }));
    }), e;
  }
  function aj(a) {
    let b = new m(a),
      e = [];
    if (d(a, {
      enter(a) {
        a.kind === c["Block"] && e.push(...ai(a, b));
      }
    }), !e.length) return 0;
    let f = new Map();
    for (let a of e) f.has(a.block) || f.set(a.block, []), f.get(a.block).push(a);
    let g = 0;
    for (let [a, b] of f) {
      let d = new Set(b.map(a => a.store)),
        e = new Map();
      for (let a of b) {
        let b = {
            kind: c["LocalDeclaration"],
            names: [a.binding.name],
            expressions: [a.value],
            bindings: [a.binding]
          },
          d = a.declaration.names || [],
          f = d["indexOf"](a.binding.name);
        f >= 0 && (d.splice(f, 1), (a.declaration.bindings || []).splice(f, 1)), v(a.binding, b, k(a.store.targets[0])), e.has(a.declaration) || e.set(a.declaration, []), e.get(a.declaration).push(b), g += 1;
      }
      let f = [];
      for (let b of a.statements || []) {
        let a = e.get(b);
        a && f.push(...a), d.has(b) || f.push(b);
      }
      a.statements = f;
    }
    return g;
  }
  function ak(a) {
    let b = 0;
    return d(a, {
      enter(a) {
        if (a.kind !== c["Block"]) return;
        let d = a.statements.filter(a => {
          let d = a.kind === c["LocalDeclaration"] && !(a.names || []).length;
          return d && (b += 1), !d;
        });
        a.statements = d;
      }
    }), b;
  }
  function al(a, b) {
    return !f(a, a => a.kind === c["Name"] && a.name === b).length;
  }
  function am(a) {
    let b = 0;
    return d(a, {
      enter(a) {
        if (a.kind !== c["Block"] || p(a)) return;
        let d = a.statements,
          e = null;
        d["forEach"]((f, g) => {
          if (f.kind === c["LocalDeclaration"] && !(f.expressions || []).length) for (let j of [...(f.bindings || [])]) {
            if (!i(j) || !h(j.name)) continue;
            e || (e = r(a));
            let l = t(e, j, g);
            if (!l) continue;
            let m = d[l.at];
            if (m.kind !== c["Assignment"] || (m.targets || []).length !== 1 || (m.expressions || []).length !== 1 || k(m.targets[0]) !== l.nodes[0]) continue;
            let n = k(m.expressions[0]);
            if (!n || n.kind !== c["Function"] || q(n.body, j).length !== l.nodes.length - 1) continue;
            let o = !0;
            for (let a = g + 1; a < l.at; a += 1) al(d[a], j.name) || (o = !1);
            if (!o) continue;
            let p = {
              kind: c["LocalFunction"],
              name: j.name,
              body: n,
              binding: j
            };
            d[l.at] = p;
            let s = f.names || [],
              u = s["indexOf"](j.name);
            u >= 0 && (s.splice(u, 1), (f.bindings || []).splice(u, 1)), v(j, p, l.nodes[0]), b += 1;
          }
        });
      }
    }), b;
  }
  function an(a) {
    let b = 0;
    return d(a, {
      enter(a) {
        a.kind === c["Block"] && a.statements["forEach"]((d, e) => {
          let f = o.sn(d);
          if (!f) return;
          let g = k(f.value);
          if (!g || g.kind !== c["Function"] || !h(f.name) || !al(g.body, f.name)) return;
          let i = {
            kind: c["LocalFunction"],
            name: f.name,
            body: g,
            binding: f.binding
          };
          f.binding.declaration = i, f.binding.initializer = i, a.statements[e] = i, b += 1;
        });
      }
    }), b;
  }
  function ao(a) {
    let b = 0;
    return d(a, {
      enter(a) {
        a.kind === c["Block"] && a.statements["forEach"]((d, e) => {
          if (d.kind !== c["Assignment"]) return;
          let f = d.targets || [],
            g = d.expressions || [];
          if (f.length !== 1 || g.length !== 1) return;
          let i = k(f[0]),
            j = k(g[0]);
          !i || i.kind !== c["Name"] || !j || j.kind !== c["Function"] || h(i.name) && (a.statements[e] = {
            kind: c["FunctionDeclaration"],
            target: i,
            ee: !1,
            body: j
          }, b += 1);
        });
      }
    }), b;
  }
  function ap(a) {
    let b = new Set();
    return d(a, {
      enter(a) {
        a.kind === c["MethodCall"] && b.add(a.method);
      }
    }), b;
  }
  function aq(a) {
    if (!a || a.kind !== c["Index"]) return null;
    let b = k(a.index);
    return !b || b.kind !== c["String"] || !h(b.value) ? null : b.value;
  }
  function ar(a) {
    let b = a;
    for (; b && b.kind === c["Index"];) {
      if (!aq(b)) return !1;
      b = k(b.base);
    }
    return !!b && b.kind === c["Name"];
  }
  function au(a) {
    let b = ap(a),
      e = 0;
    return d(a, {
      enter(a) {
        a.kind === c["Block"] && a.statements["forEach"]((d, f) => {
          if (d.kind !== c["Assignment"]) return;
          let g = d.targets || [],
            h = d.expressions || [];
          if (g.length !== 1 || h.length !== 1) return;
          let i = k(g[0]),
            j = k(h[0]);
          if (!j || j.kind !== c["Function"]) return;
          let l = aq(i);
          if (!l || !ar(i)) return;
          let m = j.params || [],
            n = b.has(l) && m.length > 0 && al(j.body, "self");
          if (n) {
            let a = (j.bindings || [])[0];
            if (a) {
              for (let b of q(j.body, a)) b.name = "self";
              a.name = "self";
            }
            m[0] = "self";
          }
          a.statements[f] = {
            kind: c["FunctionDeclaration"],
            target: i,
            ee: n,
            body: j
          }, e += 1;
        });
      }
    }), e;
  }
  b.exports = {
    "Vs": p,
    mentions: q,
    sink: w,
    slide: aa,
    "Hs": af,
    harmless: ag,
    fill: aj,
    "Ys": ak,
    "Xs": am,
    "Zs": an,
    "Js": ao,
    "Qs": au
  };
});
var av = a((a, b) => {
  "use strict";

  var {
      "Kind": c,
      unparen: d
    } = e(),
    {
      walk: f,
      collect: g
    } = l(),
    {
      c: h
    } = j(),
    {
      "Positions": i
    } = x(),
    {
      on: k
    } = at(),
    {
      "Vs": m
    } = au();
  function n(a) {
    let b = new Set();
    return f(a, {
      enter(a) {
        if (a.kind === c["Name"]) b.add(a.name);else if (a.kind === c["LocalFunction"]) b.add(a.name);else if (a.kind === c["NumericFor"]) b.add(a.variable);else if (a.kind === c["LocalDeclaration"]) for (let c of a.names || []) b.add(c);else if (a.kind === c["GenericFor"]) for (let c of a.variables || []) b.add(c);else if (a.kind === c["Function"]) for (let c of a.params || []) b.add(c);
      }
    }), b;
  }
  function o(a, b = "f") {
    for (let c = 1;; c += 1) {
      let d = `${b}${c}`;
      if (!a.has(d)) return a.add(d), d;
    }
  }
  function p(a, b, d) {
    let e = new Set(g(a, () => !0));
    for (let f of g(a, a => a.kind === c["Name"])) {
      let a = f.binding;
      if (h(a) && !(!a.declaration || e.has(a.declaration)) && !k(b, a, d)) return !1;
    }
    return !0;
  }
  function q(a, b) {
    let e = [];
    return f(a, {
      enter(a) {
        if (a.kind !== c["Call"]) return;
        let f = d(a.base);
        if (!f || f.kind !== c["Function"]) return;
        let g = b.path(a);
        if (!g) return;
        let {
            block: h,
            at: i
          } = g,
          j = (h.statements || [])[i];
        !j || m(h) || p(f, b, j) && e.push({
          block: h,
          host: j,
          call: a,
          fn: f
        });
      }
    }), e;
  }
  function r(a) {
    let b = new i(a),
      d = q(a, b);
    if (!d.length) return 0;
    let e = n(a),
      f = new Map();
    for (let a of d) {
      f.has(a.block) || f.set(a.block, new Map());
      let b = f.get(a.block);
      b.has(a.host) || b.set(a.host, []);
      let d = o(e);
      b.get(a.host).push({
        kind: c["LocalFunction"],
        name: d,
        body: a.fn
      }), a.call.base = {
        kind: c["Name"],
        name: d
      };
    }
    let g = 0;
    for (let [a, b] of f) {
      let c = [];
      for (let d of a.statements || []) {
        let a = b.get(d);
        a && (c.push(...a), g += a.length), c.push(d);
      }
      a.statements = c;
    }
    return g;
  }
  b.exports = {
    spoken: n,
    fresh: o,
    carries: p,
    ei: r
  };
});
var aw = a((a, b) => {
  "use strict";

  var {
      "Kind": c,
      d: d
    } = e(),
    {
      walk: f,
      transform: g
    } = l(),
    {
      c: h
    } = j(),
    {
      "Gs": i
    } = at(),
    {
      spoken: k,
      fresh: m
    } = av(),
    n = 8;
  function o(a) {
    if (!a || a.kind !== c["Number"]) return 0;
    let b = a.value;
    return typeof b != "number" || !Number["isInteger"](b) || b < 1 ? 0 : b;
  }
  function p(a) {
    if (!a || a.kind !== c["Table"]) return null;
    let b = a.entries || [];
    if (b.length !== 1 || b[0].type !== "item") return null;
    let e = b[0].value;
    return d(e) ? e : null;
  }
  function q(a, b) {
    let d = new Map();
    for (let e of b.reads || []) {
      let b = a.get(e);
      if (!b || b.kind !== c["Index"] || b.base !== e) return null;
      let f = o(b.index);
      if (!f || f > n) return null;
      let g = a.get(b);
      if (g && g.kind === c["Assignment"] && (g.targets || [])["indexOf"](b) >= 0) return null;
      d.set(b, f);
    }
    return d.size ? d : null;
  }
  function r(a, b) {
    let d = [];
    return f(a, {
      enter(a) {
        if (a.kind !== c["LocalDeclaration"] || (a.names || []).length !== 1 || (a.expressions || []).length !== 1) return;
        let e = p(a.expressions[0]);
        if (!e) return;
        let f = (a.bindings || [])[0];
        if (!h(f) || (f.writes || []).length) return;
        let g = q(b, f);
        if (!g) return;
        let i = new Set(g.values()),
          j = Math.max(...i);
        i.size === j && d.push({
          declaration: a,
          call: e,
          reads: g,
          highest: j
        });
      }
    }), d;
  }
  function s(a) {
    let b = i(a),
      d = r(a, b);
    if (!d.length) return 0;
    let e = k(a),
      f = new Map(),
      h = 0;
    for (let a of d) {
      let b = [a.declaration.names[0]];
      for (let c = 2; c <= a.highest; c += 1) b.push(m(e, "v"));
      for (let [d, e] of a.reads) f.set(d, {
        kind: c["Name"],
        name: b[e - 1]
      });
      a.declaration.names = b, a.declaration.bindings = [], a.declaration.expressions = [a.call], h += 1;
    }
    return g(a, a => f.get(a) || a), h;
  }
  b.exports = {
    packed: r,
    ni: s
  };
});
var ax = a((a, b) => {
  "use strict";

  var {
      "Kind": c,
      d: d
    } = e(),
    {
      walk: f
    } = l();
  function g(a) {
    let b = a && a.statements || [],
      d = b[b.length - 1];
    return !!d && d.kind === c["Return"] && !(d.expressions || []).length;
  }
  function h(a) {
    let b = 0,
      d = a => {
        g(a) && (a.statements.pop(), b += 1);
      };
    return f(a, {
      enter(a) {
        (a.kind === c["Chunk"] || a.kind === c["Function"]) && d(a.body);
      }
    }), b;
  }
  function i(a) {
    let b = a && a.statements || [];
    if (b.length !== 1) return null;
    let d = b[0];
    return d && d.kind === c["If"] ? d : null;
  }
  function j(a) {
    let b = 0;
    return f(a, {
      enter(a) {
        if (a.kind === c["If"]) for (let c = 0; c < 1e3; c += 1) {
          let c = i(a.e);
          if (!c) break;
          a.s = (a.s || []).concat([{
            condition: c.condition,
            body: c.body
          }], c.s || []), a.e = c.e || null, b += 1;
        }
      }
    }), b;
  }
  function k(a) {
    return a && a.kind === c["Paren"] && d(a.expression);
  }
  function m(a, b) {
    return k(a[b]) ? (a[b] = a[b].expression, 1) : 0;
  }
  function n(a, b) {
    let c = 0;
    for (let d = 0; d < b && d < (a || []).length; d += 1) k(a[d]) && (a[d] = a[d].expression, c += 1);
    return c;
  }
  function o(a, b) {
    let c = (a || []).length;
    return c ? b !== null && b - c + 1 <= 1 ? c : c - 1 : 0;
  }
  function p(a) {
    let b = 0;
    return f(a, {
      enter(a) {
        switch (a.kind) {
          case c["Index"]:
            b += m(a, "base") + m(a, "index");
            break;
          case c["Call"]:
          case c["MethodCall"]:
            b += m(a, "base"), b += n(a.args, o(a.args, null));
            break;
          case c["Binary"]:
            b += m(a, "lhs") + m(a, "rhs");
            break;
          case c["Unary"]:
            b += m(a, "argument");
            break;
          case c["Paren"]:
            b += m(a, "expression");
            break;
          case c["Table"]:
            (a.entries || [])["forEach"]((c, d) => {
              c.type === "key" && (b += m(c, "key")), (!(d === a.entries.length - 1) || c.type === "key") && (b += m(c, "value"));
            });
            break;
          case c["If"]:
            b += m(a, "condition");
            for (let c of a.s || []) b += m(c, "condition");
            break;
          case c["While"]:
          case c["Repeat"]:
            b += m(a, "condition");
            break;
          case c["NumericFor"]:
            b += m(a, "start") + m(a, "limit") + m(a, "step");
            break;
          case c["Return"]:
            b += n(a.expressions, o(a.expressions, null));
            break;
          case c["GenericFor"]:
            b += n(a.expressions, o(a.expressions, 3));
            break;
          case c["LocalDeclaration"]:
            b += n(a.expressions, o(a.expressions, (a.names || []).length));
            break;
          case c["Assignment"]:
            b += n(a.expressions, o(a.expressions, (a.targets || []).length));
            break;
          default:
            break;
        }
      }
    }), b;
  }
  function q(a) {
    return (a && a.statements || []).every(a => a.kind !== c["Label"] && a.kind !== c["LocalDeclaration"] && a.kind !== c["LocalFunction"]);
  }
  function r(a) {
    let b = 0;
    return f(a, {
      enter(a) {
        if (a.kind !== c["Block"]) return;
        let d = [];
        for (let e of a.statements) {
          let a = e.kind === c["Do"] ? e.body : null;
          if (a && q(a)) {
            for (let b of a.statements || []) d.push(b);
            b += 1;
          } else d.push(e);
        }
        a.statements = d;
      }
    }), b;
  }
  var s = new Set([c["Return"], c["Break"], c["Continue"]]);
  function t(a) {
    let b = a && a.statements || [],
      c = b[b.length - 1];
    return !!c && s.has(c.kind);
  }
  function u(a) {
    let b = 0;
    return f(a, {
      enter(a) {
        if (a.kind !== c["Block"]) return;
        let d = a.statements;
        for (let a = 0; a < d.length; a += 1) {
          let e = d[a];
          if (!e || e.kind !== c["If"] || !t(e.body) || (e.s || []).length) continue;
          let f = e.e;
          !f || !q(f) || i(f) || (e.e = null, d.splice(a + 1, 0, ...(f.statements || [])), b += 1);
        }
      }
    }), b;
  }
  function v(a) {
    let b = 0;
    return f(a, {
      enter(a) {
        a.kind !== c["If"] || !a.e || (a.e.statements || []).length || (a.e = null, b += 1);
      }
    }), b;
  }
  b.exports = {
    "EXITS": s,
    ti: u,
    ri: h,
    si: v,
    ii: j,
    ht: p,
    flatten: r
  };
});
var ay = a((a, b) => {
  "use strict";

  var c = e(),
    {
      "Kind": d
    } = e(),
    {
      walk: f,
      collect: g
    } = l(),
    {
      diverges: h,
      zn: i
    } = y(),
    j = new Set([d["While"], d["Repeat"], d["NumericFor"], d["GenericFor"]]),
    k = new Set([d["Return"], d["Break"], d["Continue"]]);
  function m(a) {
    let b = [];
    return f(a, {
      enter(a) {
        (a.kind === d["Chunk"] || a.kind === d["Function"]) && b.push(a.body);
      }
    }), b;
  }
  function n(a) {
    let b = new Map(),
      c = new Map(),
      e = new Map(),
      f = [],
      g = {
        kind: "leave"
      },
      h = (a, g) => {
        let i = a && a.statements || [];
        for (let a = 0; a < i.length; a += 1) {
          let j = i[a],
            k = a + 1;
          for (; k < i.length && i[k].kind === d["Label"];) k += 1;
          let l = k < i.length ? {
            kind: "statement",
            node: i[k]
          } : g;
          if (b.set(j, l), c.set(j, i), j.kind === d["Label"] ? e.set(j.name, j) : j.kind === d["Goto"] && f.push(j), j.kind === d["If"]) {
            h(j.body, l);
            for (let a of j.s || []) h(a.body, l);
            j.e && h(j.e, l);
          } else j.kind === d["Do"] ? h(j.body, l) : new Set(["While", "Repeat", "NumericFor", "GenericFor"]).has(j.kind) && h(j.body, {
            kind: "loop",
            node: j
          });
        }
      };
    return h(a, g), {
      after: b,
      holder: c,
      labels: e,
      gotos: f
    };
  }
  function o(a, b) {
    return !a || !b ? !1 : a === b ? !0 : a.kind !== b.kind ? !1 : a.node === b.node;
  }
  function p(a, b) {
    let c = a["indexOf"](b);
    return c < 0 ? !1 : (a.splice(c, 1), !0);
  }
  function q(a, b, c) {
    let d = a["indexOf"](b);
    return d < 0 ? !1 : (a[d] = c, !0);
  }
  function r(a, b) {
    let c = a["indexOf"](b);
    if (c <= 0) return !1;
    let e = a[c - 1];
    return e.kind === d["Label"] ? !1 : e.kind === d["Goto"] ? !0 : new Set(["Return", "Break", "Continue"]).has(e.kind) || h(e);
  }
  function s(a) {
    if (Array["isArray"](a)) return a.map(s);
    if (!a || typeof a != "object") return a;
    let b = {};
    for (let c of Object.keys(a)) c === "binding" || c === "bindings" || (b[c] = s(a[c]));
    return b;
  }
  function t(a, b) {
    let c = !1;
    return f(a, {
      enter(a) {
        a === b && (c = !0);
      }
    }), c;
  }
  function u(a, b) {
    if (a.kind === d["LocalDeclaration"]) for (let c of a.bindings || []) c && b.add(c);else a.kind === d["LocalFunction"] && a.binding && b.add(a.binding);
  }
  function v(a, b) {
    if (a.kind === d["NumericFor"] && a.binding) b.add(a.binding);else if (a.kind === d["GenericFor"]) for (let c of a.bindings || []) c && b.add(c);
  }
  function w(a) {
    if (a.kind === d["If"]) {
      let b = [a.body];
      for (let c of a.s || []) b.push(c.body);
      return a.e && b.push(a.e), b;
    }
    return a.kind === d["Do"] || new Set(["While", "Repeat", "NumericFor", "GenericFor"]).has(a.kind) ? [a.body] : [];
  }
  function x(a, b) {
    let c = new Set(),
      d = a => {
        for (let e of a.statements || []) {
          if (e === b) return !0;
          if (t(e, b)) {
            v(e, c);
            for (let a of w(e)) if (a && t(a, b)) return d(a);
            return !1;
          }
          u(e, c);
        }
        return !1;
      };
    return d(a) ? c : null;
  }
  function z(a) {
    let b = new Set();
    for (let c of a) f(c, {
      enter(a) {
        if (u(a, b), v(a, b), a.kind === d["Function"]) for (let c of a.bindings || []) c && b.add(c);
      }
    });
    return b;
  }
  function aa(a, b = 0) {
    let c = a && a.statements || [];
    if (!c.length || b > 48) return !1;
    let e = c[c.length - 1];
    if (e.kind === d["Return"]) return !0;
    if (e.kind === d["Do"]) return aa(e.body, b + 1);
    if (e.kind === d["If"]) {
      if (!e.e || !aa(e.body, b + 1)) return !1;
      for (let a of e.s || []) if (!aa(a.body, b + 1)) return !1;
      return aa(e.e, b + 1);
    }
    return i(a, b + 1);
  }
  function ab(a, b) {
    let c = a["indexOf"](b);
    if (c < 0) return null;
    let e = a.slice(c + 1);
    if (!e.length || e.length > tailstatements || !aa({
      kind: d["Block"],
      statements: e
    })) return null;
    let f = 0;
    for (let a of e) for (let b of g(a, () => !0)) {
      if (b.kind === d["Goto"] || b.kind === d["Label"] || b.kind === d["Break"] || b.kind === d["Continue"]) return null;
      f += 1;
    }
    return f > tailnodes ? null : e;
  }
  function ac(a, b, c) {
    let e = x(a, b);
    if (!e) return !1;
    let g = z(c),
      h = new Set();
    for (let a of c) f(a, {
      enter(a) {
        a.kind === d["Name"] && a.binding && h.add(a.binding);
      }
    });
    let i = new Set();
    for (let b of a.statements || []) f(b, {
      enter(a) {
        u(a, i), v(a, i);
      }
    });
    for (let a of h) if (!(g.has(a) || e.has(a)) && i.has(a)) return !1;
    return !0;
  }
  function ad(a) {
    if (!a || a.kind !== d["Return"]) return null;
    let b = a.expressions || [];
    return b.every(a => {
      let b = c.unparen(a);
      return b.kind === d["Name"] || c["LITERALS"].has(b.kind);
    }) ? c["I"](b.map(a => s(a))) : null;
  }
  function ae(a) {
    let b = a && a.statements || [];
    return b.length ? b[b.length - 1] : null;
  }
  function af(a) {
    let b = ae(a);
    return b && (new Set(["Return", "Break", "Continue"]).has(b.kind) || b.kind === d["Goto"]) ? !0 : aa(a);
  }
  function ag(a, b) {
    let c = ae(a);
    return c && c.kind === d["Goto"] && c.label === b ? c : null;
  }
  function ah(a) {
    let b = new Set();
    for (let c of a) if (c.kind === d["LocalDeclaration"]) for (let a of c.names || []) b.add(a);else c.kind === d["LocalFunction"] && c.name && b.add(c.name);
    return b;
  }
  function ai(a) {
    let b = new Set();
    for (let c of a) f(c, {
      enter(a) {
        a.kind === d["Name"] && a.binding && b.add(a.binding);
      }
    });
    return b;
  }
  function aj(a) {
    let b = new Map(),
      c = new Map(),
      e = a => {
        for (let b of a && a.statements || []) c.set(b, a);
      };
    return e(a), f(a, {
      enter(a) {
        if (a.kind === d["Function"]) return !1;
        for (let c of w(a)) c && (b.set(c, a), e(c));
      }
    }), {
      owners: b,
      blocks: c
    };
  }
  function ak(a, b, c, e) {
    let f = new Set(),
      g = e.get(a),
      h = a;
    for (let i = 0; i < 64; i += 1) {
      let i = c.get(g);
      if (!i) return null;
      let j = e.get(i);
      if (!j) return null;
      let k = j.statements || [];
      if (k[k.length - 1] !== i) return null;
      if (i.kind === d["If"]) {
        if (!i.e) return null;
        for (let b of w(i)) {
          if (b === g) continue;
          let c = ag(b, a.name);
          if (c) {
            f.add(c);
            continue;
          }
          if (!af(b)) return null;
        }
      } else if (i.kind !== d["Do"]) return null;
      if (h = i, g = j, f.size === b) return {
        seat: i,
        list: k,
        dropping: f
      };
    }
    return null;
  }
  function al(a, b, c, e) {
    let f = (e.get(a) || {}).statements || [],
      h = f["indexOf"](a);
    if (h < 0) return !1;
    let i = f.slice(h + 1);
    if (!i.length) return !1;
    let j = b.filter(b => b.label === a.name);
    if (!j.length) return !1;
    let k = ak(a, j.length, c, e);
    if (!k) return !1;
    for (let a of j) if (!k.dropping.has(a)) return !1;
    let l = new Set(),
      m = new Set();
    for (let a of i) {
      for (let b of g(a, a => a.kind === d["Label"])) l.add(b.name), m.add(b);
      for (let b of g(a, a => a.kind === d["Goto"])) m.add(b);
    }
    for (let a of b) if (!(m.has(a) || k.dropping.has(a)) && l.has(a.label)) return !1;
    let n = g(k.seat, a => a.kind === d["Label"]).filter(b => !m.has(b) && b !== a);
    for (let a of m) if (a.kind === d["Goto"] && n.some(b => b.name === a.label)) return !1;
    let o = z(i),
      p = z([k.seat]);
    for (let a of o) p.delete(a);
    for (let a of ai(i)) if (!o.has(a) && p.has(a)) return !1;
    let q = k.list["indexOf"](k.seat);
    if (q < 0) return !1;
    let r = ah(i);
    if (r.size) {
      for (let a = q + 1; a < k.list.length; a += 1) for (let b of g(k.list[a], a => a.kind === d["Name"])) if (r.has(b.name)) return !1;
    }
    f.splice(h, i.length + 1);
    for (let a of k.dropping) {
      let b = (e.get(a) || {}).statements;
      b && b.splice(b["indexOf"](a), 1);
    }
    return k.list.splice(q + 1, 0, ...i), !0;
  }
  function am(a) {
    let b = 0;
    for (let c of m(a)) for (let a = 0; a < 64; a += 1) {
      let {
        gotos: a
      } = n(c);
      if (!a.length) break;
      let {
          owners: e,
          blocks: f
        } = aj(c),
        h = !1;
      for (let b of g(c, a => a.kind === d["Label"])) if (f.has(b) && al(b, a, e, f)) {
        h = !0;
        break;
      }
      if (!h) break;
      b += 1;
    }
    return b;
  }
  function an(a) {
    let b = 0;
    for (let e of m(a)) {
      let {
        after: a,
        holder: g,
        labels: h,
        gotos: i
      } = n(e);
      if (!i.length && !h.size) continue;
      for (let d of i) {
        let f = g.get(d);
        if (!f) continue;
        if (r(f, d)) {
          p(f, d) && (b += 1);
          continue;
        }
        let i = h.get(d.label);
        if (!i) continue;
        let j = a.get(i);
        if (o(j, a.get(d))) {
          p(f, d) && (b += 1);
          continue;
        }
        if (j && j.kind === "leave") {
          q(f, d, c["I"]([])) && (b += 1);
          continue;
        }
        if (j && j.kind === "statement") {
          let a = ad(j.node);
          if (a && ac(e, d, [j.node]) && q(f, d, a)) {
            b += 1;
            continue;
          }
          let c = ab(g.get(i) || [], i);
          if (!c || !ac(e, d, c)) continue;
          let h = f["indexOf"](d);
          if (h < 0) continue;
          f.splice(h, 1, ...c.map(s)), b += 1;
        }
      }
      let j = new Set();
      f(e, {
        enter(a) {
          if (a.kind === d["Function"]) return !1;
          a.kind === d["Goto"] && j.add(a.label);
        }
      });
      for (let [a, c] of h) {
        if (j.has(a)) continue;
        let d = g.get(c);
        d && p(d, c) && (b += 1);
      }
    }
    return b;
  }
  b.exports = {
    ye: s,
    leaves: aa,
    on: x,
    movable: ac,
    survey: n,
    same: o,
    unreachable: r,
    stops: af,
    pull: am,
    clean: an
  };
});
var az = a((a, b) => {
  "use strict";

  var {
      "Kind": c,
      unparen: d,
      d: f
    } = e(),
    {
      walk: g
    } = l(),
    {
      c: h
    } = j(),
    {
      "TABLES": i
    } = ak(),
    {
      jn: k
    } = y(),
    m = {
      ipairs: [null, null, {
        kind: c["Number"],
        value: 0
      }],
      pairs: [null, null, {
        kind: c["Nil"]
      }],
      gmatch: [null],
      gfind: [null],
      lines: [null]
    },
    n = 3;
  function o(a) {
    return !a || a.kind !== c["Name"] ? !1 : !a.binding || !h(a.binding);
  }
  function p(a) {
    if (!a || a.kind !== c["Call"]) return null;
    let b = d(a.base);
    if (!b) return null;
    if (o(b)) return b.name;
    if (b.kind !== c["Index"]) return null;
    let e = d(b.base);
    if (!o(e) || !i.has(e.name)) return null;
    let f = b.index;
    return !f || f.kind !== c["String"] ? null : f.value;
  }
  function q(a, b) {
    let e = d(a);
    return !e || !b || e.kind !== b.kind ? !1 : e.kind !== c["Number"] ? !0 : e.value === b.value;
  }
  function r(a, b, d) {
    let e = a.expressions || [];
    if (e.length < d || e.length > n) return !1;
    if (e.length === n && d === n) return !0;
    let f = m[p(b)];
    if (!f) return !1;
    for (let a = d; a < n; a += 1) {
      let b = a < f.length ? f[a] : {
        kind: c["Nil"]
      };
      if (!b) return !1;
      if (a < e.length) {
        if (!q(e[a], b)) return !1;
      } else if (b.kind !== c["Nil"]) return !1;
    }
    return !0;
  }
  function s(a, b) {
    let c = a.bindings || [],
      e = a.names || [];
    if (!c.length || c.length !== e.length) return !1;
    let f = b.expressions || [];
    return f.length < c.length ? !1 : c.every((a, b) => {
      if (!a || !h(a) || (a.writes || []).length) return !1;
      let c = a.reads || [];
      return c.length !== 1 ? !1 : d(f[b]) === c[0];
    });
  }
  function t(a) {
    if (!a || a.kind !== c["LocalDeclaration"]) return null;
    let b = a.expressions || [];
    if (b.length !== 1) return null;
    let e = d(b[0]);
    return f(e) ? e : null;
  }
  function u(a) {
    let b = [];
    return g(a, {
      enter(a) {
        if (a.kind !== c["Block"]) return;
        let d = a.statements || [];
        d["forEach"]((e, f) => {
          let g = d[f + 1];
          if (!g || g.kind !== c["GenericFor"]) return;
          let h = t(e);
          h && s(e, g) && r(g, h, (e.bindings || []).length) && b.push({
            block: a,
            declaration: e,
            loop: g,
            call: h
          });
        });
      }
    }), b;
  }
  function v(a) {
    let b = u(a);
    if (!b.length) return 0;
    let c = new Set();
    for (let a of b) a.loop.expressions = [a.call], c.add(a.declaration);
    for (let a of b) a.block.statements = a.block.statements.filter(a => !c.has(a));
    return b.length;
  }
  function w(a) {
    return a && a.kind === c["Unary"] && a.operator === "not" ? a.argument : {
      kind: c["Unary"],
      operator: "not",
      argument: a
    };
  }
  function x(a) {
    if ((a.s || []).length) return null;
    let b = a => {
      let b = a && a.statements || [];
      return b.length === 1 && b[0].kind === c["Break"];
    };
    return a.e ? b(a.e) && !b(a.body) ? {
      condition: a.condition,
      body: a.body
    } : b(a.body) && !b(a.e) ? {
      condition: w(a.condition),
      body: a.e
    } : null : null;
  }
  function z(a) {
    let b = 0;
    return g(a, {
      enter(a) {
        if (a.kind !== c["While"] || !k(a.condition)) return;
        let d = a.body && a.body.statements || [];
        if (d.length !== 1 || d[0].kind !== c["If"]) return;
        let e = x(d[0]);
        e && (a.condition = e.condition, a.body = e.body, b += 1);
      }
    }), b;
  }
  b.exports = {
    oi: v,
    negated: w,
    ui: z
  };
});
var ba = a((a, b) => {
  "use strict";

  var {
      "Kind": c
    } = e(),
    {
      walk: d,
      transform: f
    } = l(),
    {
      c: g
    } = j(),
    {
      bare: h
    } = y(),
    i = at(),
    k = as();
  function m(a) {
    let b = i["Ks"](a);
    if (b) return b;
    let d = k.sn(a);
    if (!d) return null;
    let e = h(d.value);
    return !e || e.kind !== c["Function"] ? null : {
      binding: d.binding,
      name: d.name,
      value: e
    };
  }
  function n(a) {
    let b = new Set(),
      e = a => {
        a && b.add(a);
      };
    return d(a, {
      enter(a) {
        for (let b of a.bindings || []) e(b);
        (a.kind === c["LocalFunction"] || a.kind === c["NumericFor"]) && e(a.binding);
      }
    }), b;
  }
  function o(a, b) {
    let c = n(a);
    for (let d of k["Ps"](a)) {
      if (c.has(d)) continue;
      let a = d.name;
      if (!a || (g(d) ? !k.unshadowed(b, a) : b.has(a))) return !1;
    }
    return !0;
  }
  function p(a) {
    let b = new Map();
    return a.statements["forEach"]((a, e) => {
      let f = 0;
      d(a, {
        enter(a) {
          if (a.kind === c["Block"]) f += 1;else if (a.kind === c["Name"] && a.binding) {
            let c = b.get(a.binding);
            c ? c.count += 1 : b.set(a.binding, {
              count: 1,
              node: a,
              at: e,
              direct: f === 0
            });
          }
        },
        leave(a) {
          a.kind === c["Block"] && (f -= 1);
        }
      });
    }), b;
  }
  function q(a, b, d, e, g) {
    let h = a.statements,
      j = e.get(d.binding);
    if (!j || j.count !== 1 || !j.direct || j.at <= b) return !1;
    let k = j.node;
    if (h.some(a => a.kind === c["Label"])) return !1;
    let l = h[j.at];
    return l.kind === c["While"] || l.kind === c["Repeat"] || i["Us"](l, k) || !o(d.value, g) ? !1 : (f(l, a => a === k ? d.value : a), h[b] = {
      kind: c["Do"],
      body: {
        kind: c["Block"],
        statements: []
      }
    }, !0);
  }
  function r(a) {
    let b = 0,
      e = k.gt(a);
    return d(a, {
      enter(a) {
        if (a.kind !== c["Block"]) return;
        let d = null;
        for (let c = 0; c < a.statements.length; c += 1) {
          let f = m(a.statements[c]);
          !f || !g(f.binding) || (d || (d = p(a)), q(a, c, f, d, e) && (b += 1));
        }
      }
    }), b;
  }
  b.exports = {
    li: r
  };
});
var bb = a((a, b) => {
  "use strict";

  var c = ak(),
    {
      dt: d
    } = ao(),
    e = aj(),
    f = ap(),
    g = at(),
    h = av(),
    i = aw(),
    j = au(),
    k = ar(),
    l = ax(),
    m = ay(),
    n = az(),
    o = ba(),
    p = 8,
    q = [["named", a => h.ei(a)], ["tuples", a => i.ni(a)], ["services", a => k.gather(a)], ["copies", a => g.propagate(a)], ["temporaries", a => g["Ws"](a)], ["declarations", a => j.sink(a)], ["filled", a => j.fill(a)], ["pushed", a => j["Hs"](a)], ["moved", a => j.slide(a)], ["husks", a => j["Ys"](a)], ["functions", a => j["Zs"](a)], ["recursions", a => j["Xs"](a)], ["assigned", a => j["Js"](a)], ["methods", a => j["Qs"](a)], ["callbacks", a => o.li(a)], ["iterators", a => n.oi(a)], ["tests", a => n.ui(a)], ["jumps", a => m.clean(a)], ["tails", a => m.pull(a)], ["returns", a => l.ri(a)], ["otherwise", a => l.si(a)], ["guards", a => l.ti(a)], ["branches", a => l.ii(a)], ["parens", a => l.ht(a)], ["blocks", a => l.flatten(a)]];
  function r(a, b) {
    let g = 0;
    g += e.run(a, b), a.resolve(), g += f.eliminate(a.chunk, new c["Facts"](a.chunk), b), a.resolve();
    let h = d(a.chunk, new c["Facts"](a.chunk));
    return b.unwanted += h, g += h, a.resolve(), g += f["Bs"](a.chunk, b), a.resolve(), g;
  }
  function s(a) {
    let b = {
      eliminated: 0,
      merged: 0,
      idioms: 0,
      unwanted: 0
    };
    for (let [a] of q) b[a] = 0;
    a.resolve();
    for (let c = 0; c < p; c += 1) {
      let c = 0;
      for (let [d, e] of q) {
        let f = e(a.chunk);
        f && (b[d] += f, c += f, a.resolve());
      }
      if (c += r(a, b), !c) break;
    }
    let c = q.reduce((a, [c]) => a + b[c], 0);
    c && a.note(`put back ${b.copies + b.temporaries} value(s), ${b.declarations + b.filled} declaration(s), ${b.named + b.functions + b.assigned + b.methods} function form(s)`, c);
    for (let c of Object.keys(b)) b[c] && a.bump(`beautify.${c}`, b[c]);
  }
  b.exports = {
    name: "09-fmt",
    run: s,
    "PASSES": q
  };
});
var bc = a((a, b) => {
  "use strict";

  var {
      "Kind": d
    } = e(),
    {
      walk: f,
      collect: h
    } = l(),
    {
      y: i
    } = g(),
    {
      c: k
    } = j(),
    {
      m: m,
      bt: n,
      mt: o
    } = c(),
    {
      bare: p
    } = y();
  function q(a) {
    let b = [],
      c = 0;
    for (; c < a.length;) {
      let d = a[c];
      if (!o(d) && !n(d) && !m(d)) {
        c += 1;
        continue;
      }
      let e = c;
      if (o(d)) {
        for (; e < a.length && o(a[e]);) e += 1;
        let b = e - c;
        if (b >= 3 && e < a.length && n(a[e])) e -= 1;else if (b === 1) for (; e < a.length && (n(a[e]) || m(a[e]));) e += 1;else if (e < a.length && n(a[e])) for (; e < a.length && (n(a[e]) || m(a[e]));) e += 1;
      } else for (; e < a.length && (n(a[e]) || m(a[e]));) e += 1;
      b.push(a.slice(c, e)), c = e;
    }
    return b;
  }
  function r(a) {
    let b = q(String(a || ""));
    if (!b.length) return null;
    let c = b[0]["toLowerCase"](),
      d = b.slice(1).map(a => a === a["toUpperCase"]() && a.length > 1 ? a : a[0]["toUpperCase"]() + a.slice(1)),
      e = c + d.join("");
    return i(e) ? e : null;
  }
  function s(a) {
    let b = a.length;
    for (; b > 1 && m(a[b - 1]);) b -= 1;
    return a.slice(0, b);
  }
  function t(a) {
    let b = p(a);
    return !b || b.kind !== d["String"] ? null : r(b.value);
  }
  function u(a) {
    if (!a || a.kind !== d["Index"]) return null;
    let b = p(a.index);
    return !b || b.kind !== d["String"] ? null : b.value;
  }
  var v = ["Create", "New", "Make", "Build"];
  function w(a) {
    let b = String(a || "");
    for (let a of v) if (!(b.length <= a.length) && b.slice(0, a.length) === a && o(b[a.length])) return b.slice(a.length);
    return null;
  }
  function x(a) {
    let b = p(a);
    if (!b || b.kind !== d["Table"]) return null;
    for (let a of ["Title", "Name"]) for (let c of b.entries || []) {
      if (c.type !== "key") continue;
      let b = p(c.key);
      if (!b || b.kind !== d["String"] || b.value !== a) continue;
      let e = p(c.value);
      if (e && e.kind === d["String"]) return e.value;
    }
    return null;
  }
  var z = 2;
  function aa(a) {
    let b = (a || [])[0];
    if (!b) return null;
    let c = p(b),
      e = c && c.kind === d["String"] ? c.value : x(b);
    if (!e) return null;
    let f = q(String(e));
    return !f.length || f.length > z ? null : f.join(" ");
  }
  function ab(a) {
    if (!a || a.type !== "key") return null;
    let b = p(a.key);
    return b && b.kind === d["String"] ? b.value : null;
  }
  var ac = new Set(["Callback", "OnCallback", "OnChanged", "OnChange", "OnClick", "OnToggle", "OnFocusLost"]),
    ad = ["Title", "Name", "Flag"];
  function ae(a) {
    for (let b of ad) for (let c of a.entries || []) {
      if (ab(c) !== b) continue;
      let a = p(c.value);
      if (!a || a.kind !== d["String"]) continue;
      let e = q(a.value);
      if (!(!e.length || e.length > z)) return e.join(" ");
    }
    return null;
  }
  function af(a) {
    let b = [];
    return f(a, {
      enter(a) {
        if (a.kind === d["Table"]) for (let c of a.entries || []) {
          if (!ac.has(ab(c))) continue;
          let e = p(c.value);
          !e || e.kind !== d["Function"] || b.push({
            word: ae(a),
            fn: e
          });
        }
      }
    }), b;
  }
  function ag(a) {
    let b = new Set();
    f(a, {
      enter(a) {
        for (let c of a.bindings || []) b.add(c);
        (a.kind === d["LocalFunction"] || a.kind === d["NumericFor"]) && b.add(a.binding);
      }
    });
    let c = new Set(h(a, a => a.kind === d["Name"])),
      e = new Set();
    for (let a of c) {
      let d = a.binding;
      if (!d || !k(d) || b.has(d)) continue;
      let f = d.writes || [];
      !f.length || !f.every(a => c.has(a)) || e.add(d);
    }
    return e.size === 1 ? [...e][0] : null;
  }
  var ah = new Set(["loadstring", "load"]),
    ai = new Set(["raw", "main", "master", "latest", "download", "releases", "release", "blob", "refs", "heads", "tags", "archive", "files", "file", "lua", "init", "source", "dl", "api", "v1", "v2"]);
  function aj(a) {
    let b = String(a).split("?")[0].split("#")[0],
      c = b["indexOf"]("://"),
      d = (c < 0 ? b : b.slice(c + 3)).split("/").filter(a => a.length > 0);
    for (let a = d.length - 1; a >= 1; a -= 1) {
      let b = d[a].split(".")[0];
      if (!b || ai.has(b["toLowerCase"]())) continue;
      let c = r(b);
      if (c) return c;
    }
    return null;
  }
  function ak(a) {
    if (a.kind !== d["Call"] || (a.args || []).length) return null;
    let b = p(a.base);
    if (!b || b.kind !== d["Call"]) return null;
    let c = p(b.base);
    if (!c || c.kind !== d["Name"] || k(c.binding) || !ah.has(c.name)) return null;
    let e = null;
    return f(b, {
      enter(a) {
        e === null && a.kind === d["String"] && a.value["indexOf"]("://") >= 0 && (e = a.value);
      }
    }), e === null ? null : aj(e);
  }
  var al = {
    and: ["rhs", "lhs"],
    or: ["lhs", "rhs"]
  };
  function am(a) {
    let b = p(a);
    if (!b) return null;
    if (b.kind === d["Binary"]) {
      let a = al[b.operator];
      if (!a) return null;
      for (let c of a) {
        let a = am(b[c]);
        if (a) return a;
      }
      return null;
    }
    if (b.kind === d["Call"] || b.kind === d["MethodCall"]) {
      let a = b.args || [],
        c = ak(b);
      if (c) return c;
      let e = b.kind === d["MethodCall"] ? w(b.method) : null,
        f = aa(a);
      if (e) {
        let a = r(f === null ? e : `${f} ${e}`);
        if (a) return a;
      }
      if (a.length === 1) {
        let b = t(a[0]);
        if (b) return b;
      }
      if (b.kind === d["MethodCall"]) {
        if (f !== null && x(a[0]) !== null) {
          let a = r(`${f} ${b.method}`);
          if (a) return a;
        }
        return r(b.method);
      }
      let g = p(b.base),
        h = g && g.kind === d["Index"] ? p(g.base) : null;
      return h && h.kind === d["Name"] && !k(h.binding) ? r(s(h.name)) : null;
    }
    if (b.kind === d["Index"]) {
      let a = u(b);
      return a ? r(a) : null;
    }
    return b.kind === d["Name"] && !k(b.binding) ? r(b.name) : null;
  }
  var an = {
    "InputBegan": "input",
    "InputChanged": "input",
    "InputEnded": "input",
    "PlayerAdded": "player",
    "PlayerRemoving": "player",
    "CharacterAdded": "character",
    "CharacterRemoving": "character",
    "ChildAdded": "child",
    "ChildRemoved": "child",
    "DescendantAdded": "descendant",
    "DescendantRemoving": "descendant",
    "Touched": "part",
    "TouchEnded": "part",
    "Chatted": "message",
    "Heartbeat": "delta",
    "Stepped": "delta",
    "RenderStepped": "delta",
    "PromptButtonHoldBegan": "player"
  };
  function ao(a) {
    return !a || a.kind !== d["MethodCall"] || a.method !== "Connect" ? null : u(p(a.base));
  }
  var ap = {
    ipairs: ["index", "value"],
    pairs: ["key", "value"],
    next: ["key", "value"],
    gmatch: ["match"],
    gfind: ["match"],
    lines: ["line"]
  };
  function aq(a) {
    let b = p((a || [])[0]);
    if (!b) return null;
    if (b.kind === d["MethodCall"]) return b.method;
    if (b.kind === d["Call"]) {
      let a = p(b.base);
      return a ? a.kind === d["Name"] ? k(a.binding) ? null : a.name : u(a) : null;
    }
    return b.kind === d["Name"] && !k(b.binding) ? b.name : null;
  }
  var ar = {
    "__index": ["object", "key"],
    "__newindex": ["object", "key", "value"],
    "__call": ["object"],
    "__tostring": ["object"],
    "__len": ["object"],
    "__unm": ["object"],
    "__gc": ["object"],
    "__close": ["object"],
    "__add": ["lhs", "rhs"],
    "__sub": ["lhs", "rhs"],
    "__mul": ["lhs", "rhs"],
    "__div": ["lhs", "rhs"],
    "__idiv": ["lhs", "rhs"],
    "__mod": ["lhs", "rhs"],
    "__pow": ["lhs", "rhs"],
    "__concat": ["lhs", "rhs"],
    "__eq": ["lhs", "rhs"],
    "__lt": ["lhs", "rhs"],
    "__le": ["lhs", "rhs"]
  };
  function as(a) {
    let b = [],
      c = (a, c) => {
        let e = p(a),
          f = p(c);
        !e || e.kind !== d["String"] || !f || f.kind !== d["Function"] || b.push([e.value, f]);
      };
    return f(a, {
      enter(a) {
        if (a.kind === d["Table"]) for (let b of a.entries || []) b.type === "key" && c(b.key, b.value);else if (a.kind === d["Assignment"]) {
          let b = a.expressions || [];
          if (b.length !== (a.targets || []).length) return;
          a.targets["forEach"]((a, e) => {
            let f = p(a);
            f && f.kind === d["Index"] && c(f.index, b[e]);
          });
        } else if (a.kind === d["FunctionDeclaration"] && !a.ee) {
          let b = p(a.target);
          b && b.kind === d["Index"] && c(b.index, a.body);
        }
      }
    }), b;
  }
  function at(a) {
    let b = new Map(),
      c = new Set(),
      e = new Map(),
      g = (a, b, c) => {
        let d = a.get(b);
        d ? d.push(c) : a.set(b, [c]);
      };
    return f(a, {
      enter(a) {
        if (a.kind === d["Table"]) for (let c of a.entries || []) c.type === "key" && b.set(p(c.value), p(c.key));else if (a.kind === d["Call"]) {
          let b = p(a.base);
          b && c.add(b);
        } else if (a.kind === d["Assignment"]) {
          let c = a.expressions || [],
            f = a.targets || [],
            h = c.length === f.length;
          f["forEach"]((a, f) => {
            let i = h ? p(c[f]) : null;
            if (a.kind === d["Name"] && a.binding && g(e, a.binding, i), !h) return;
            let j = p(a);
            j && j.kind === d["Index"] && b.set(i, p(j.index));
          });
        }
      }
    }), {
      fields: b,
      called: c,
      steps: e
    };
  }
  function au(a, b, c) {
    let e = b && b.reads || [];
    if (!e.length) return null;
    let {
        fields: f
      } = c || at(a),
      g = new Set(),
      h = 0;
    for (let a of e) {
      let b = f.get(a);
      b !== void 0 && (b && b.kind === d["String"] && g.add(b.value), h += 1);
    }
    return h !== e.length || g.size !== 1 ? null : r([...g][0]);
  }
  function av(a, b, c) {
    let d = b && b.reads || [];
    if (!d.length) return !1;
    let {
        called: e
      } = c || at(a),
      f = 0;
    for (let a of d) e.has(a) && (f += 1);
    return f === d.length;
  }
  var aw = {
    "+": ["count", "total"],
    "..": [null, "text"]
  };
  function ax(a) {
    let b = p(a);
    return b ? b.kind === d["Number"] && b.value === 0 ? "+" : b.kind === d["String"] && b.value === "" ? ".." : null : null;
  }
  function ay(a, b, c, e) {
    let [f, g] = aw[c],
      h = (e || at(a)).steps.get(b) || [],
      i = 0,
      j = 0,
      k = 0;
    for (let a of h) {
      if (!a || a.kind !== d["Binary"] || a.operator !== c) {
        k += 1;
        continue;
      }
      let e = p(a.lhs),
        f = p(a.rhs),
        g = e && e.kind === d["Name"] && e.binding === b ? f : f && f.kind === d["Name"] && f.binding === b ? e : null;
      if (!g) {
        k += 1;
        continue;
      }
      i += 1, g.kind === d["Number"] && g.value === 1 && (j += 1);
    }
    return !i || k ? null : j === i ? f : g;
  }
  function az(a) {
    let b = new Map(),
      c = (a, c) => {
        !c || !a || !k(a) || b.has(a) || b.set(a, c);
      },
      e = new Map();
    f(a, {
      enter(a) {
        if (a.kind !== d["Assignment"]) return;
        let b = a.targets || [],
          c = a.expressions || [];
        b.length === c.length && b["forEach"]((a, b) => {
          let f = p(a);
          if (u(f) !== "Name") return;
          let g = p(f.base);
          if (!g || g.kind !== d["Name"] || !k(g.binding)) return;
          let h = t(c[b]);
          h && !e.has(g.binding) && e.set(g.binding, h);
        });
      }
    });
    for (let [a, b] of e) c(a, b);
    f(a, {
      enter(a) {
        if (a.kind === d["LocalDeclaration"]) {
          let b = a.expressions || [];
          if (b.length !== (a.names || []).length) return;
          (a.bindings || [])["forEach"]((a, d) => {
            c(a, am(b[d]));
          });
        } else if (a.kind === d["Assignment"]) {
          let b = a.targets || [],
            e = a.expressions || [];
          if (b.length !== e.length) return;
          b["forEach"]((a, b) => {
            let f = p(a);
            !f || f.kind !== d["Name"] || c(f.binding, am(e[b]));
          });
        } else if (a.kind === d["GenericFor"]) {
          let b = ap[aq(a.expressions)] || [];
          (a.bindings || [])["forEach"]((a, d) => c(a, b[d]));
        } else if (a.kind === d["MethodCall"]) {
          let b = ao(a),
            e = b && an[b];
          if (!e) return;
          for (let b of a.args || []) {
            let a = p(b);
            !a || a.kind !== d["Function"] || (a.params || [])[0] !== "self" && c((a.bindings || [])[0], e);
          }
        }
      }
    });
    for (let {
      word: b,
      fn: d
    } of af(a)) {
      (d.params || [])[0] !== "self" && c((d.bindings || [])[0], "value");
      let a = b === null ? null : r(b);
      a && c(ag(d), a);
    }
    for (let [b, d] of as(a)) {
      let a = ar[b];
      a && (d.bindings || [])["forEach"]((b, d) => c(b, a[d]));
    }
    let g = new Map();
    f(a, {
      enter(a) {
        if (a.kind === d["LocalDeclaration"]) {
          let b = a.expressions || [];
          if (b.length !== (a.names || []).length) return;
          (a.bindings || [])["forEach"]((a, c) => {
            let d = ax(b[c]);
            d && k(a) && g.set(a, d);
          });
        }
      }
    });
    let h = [];
    f(a, {
      enter(a) {
        let c = a.kind === d["Function"];
        if (!(!c && a.kind !== d["LocalDeclaration"])) for (let d of a.bindings || []) d && k(d) && !b.has(d) && h.push([d, c]);
      }
    });
    let i = h.length ? at(a) : null;
    for (let [b, d] of h) {
      let e = au(a, b, i);
      if (e) {
        c(b, e);
        continue;
      }
      if (d && av(a, b, i)) {
        c(b, "fn");
        continue;
      }
      let f = g.get(b);
      f && c(b, ay(a, b, f, i));
    }
    return b;
  }
  function ba(a) {
    return b => {
      if (!a.has(b) && i(b)) return a.add(b), b;
      for (let c = 2; c < 1e5; c += 1) {
        let d = `${b}${c}`;
        if (!a.has(d) && i(d)) return a.add(d), d;
      }
      throw new Error("names: candidate pool exhausted");
    };
  }
  b.exports = {
    spelled: t,
    $i: u,
    et: ab,
    suggest: az,
    allocator: ba
  };
});
var bd = a((a, b) => {
  "use strict";

  var c = aq(),
    d = bc();
  function e(a, b, e) {
    let f = new Set(e),
      g = c.namer(e),
      h = d.allocator(e),
      i = new Map(),
      j = 0;
    for (let [d, e] of c.categories(a)) {
      let a = b.get(d);
      a && !f.has(a) ? (i.set(d, h(a)), j += 1) : i.set(d, g(e));
    }
    return {
      chosen: i,
      described: j
    };
  }
  function f(a) {
    a.resolve();
    let b = d.suggest(a.chunk),
      f = c.reserved(a.chunk),
      {
        chosen: g,
        described: h
      } = e(a.chunk, b, f);
    if (!g.size) return;
    let i = c.apply(a.chunk, g);
    a.resolve(), a.note(`named ${h} local(s) from the code`, h), a.bump("name.described", h), a.bump("name.bindings", g.size), a.bump("name.mentions", i);
  }
  b.exports = {
    name: "10-name",
    run: f,
    plan: e
  };
});
var be = a((a, b) => {
  "use strict";

  var {
      "Kind": c,
      block: d,
      "N": f,
      "R": g,
      assignment: h,
      name: i
    } = e(),
    {
      walk: j
    } = l(),
    k = 180,
    m = 24,
    n = 12;
  function o(a) {
    return a.kind === c["LocalDeclaration"] ? a.names.length : a.kind === c["LocalFunction"] ? 1 : 0;
  }
  function p(a) {
    return a.kind === c["LocalDeclaration"] ? a.bindings || [] : a.kind === c["LocalFunction"] && a.binding ? [a.binding] : [];
  }
  function q(a) {
    switch (a.kind) {
      case c["Do"]:
      case c["While"]:
        return [{
          body: a.body,
          extra: 0
        }];
      case c["Repeat"]:
        return [{
          body: a.body,
          extra: 0,
          sealed: !0
        }];
      case c["NumericFor"]:
        return [{
          body: a.body,
          extra: 4
        }];
      case c["GenericFor"]:
        return [{
          body: a.body,
          extra: a.variables.length + 3
        }];
      case c["If"]:
        {
          let b = [{
            body: a.body,
            extra: 0
          }];
          for (let c of a.s || []) b.push({
            body: c.body,
            extra: 0
          });
          return a.e && b.push({
            body: a.e,
            extra: 0
          }), b;
        }
      default:
        return [];
    }
  }
  function r(a, b) {
    let c = [],
      d = b,
      e = (a, b, f) => {
        let g = b,
          h = 0;
        for (let b of a.statements) {
          g += o(b), h += o(b), g > d && (d = g);
          for (let a of q(b)) e(a.body, g + a.extra, a.sealed);
        }
        c.push({
          block: a,
          base: b,
          direct: h,
          sealed: f
        });
      };
    return e(a, b, !1), {
      peak: d,
      blocks: c
    };
  }
  function s(a) {
    let b = [a];
    for (; b.length;) {
      let a = b.pop();
      if (!(!a || typeof a != "object")) {
        if (Array["isArray"](a)) {
          for (let c of a) b.push(c);
          continue;
        }
        if (a.kind !== c["Function"]) {
          if (a.kind === c["Label"] || a.kind === c["Goto"]) return !0;
          for (let c of Object.keys(a)) c === "binding" || c === "bindings" || b.push(a[c]);
        }
      }
    }
    return !1;
  }
  function t(a) {
    let b = new Map();
    return a.statements["forEach"]((a, c) => {
      j(a, {
        enter(a) {
          b.has(a) || b.set(a, c);
        }
      });
    }), b;
  }
  function u(a, b) {
    let c = a.statements.length - 1,
      d = new Map();
    return a.statements["forEach"]((a, e) => {
      let f = p(a);
      if (!f.length) return;
      let g = e;
      for (let a of f) for (let d of a.reads.concat(a.writes)) {
        let a = b.get(d);
        a === void 0 ? g = c : a > g && (g = a);
      }
      d.set(e, g);
    }), d;
  }
  function v(a) {
    let b = new Map(),
      d = (a, c) => {
        let d = b.get(a);
        d || (d = new Set(), b.set(a, d)), d.add(c);
      };
    for (let b of a.statements) for (let a of p(b)) d(a.name, a.id);
    j(a, {
      enter(a) {
        if (a.kind === c["Name"] && a.binding && d(a.name, a.binding.id), a.kind === c["LocalDeclaration"]) for (let b of a.bindings || []) d(b.name, b.id);
        if (a.kind === c["LocalFunction"] && a.binding && d(a.binding.name, a.binding.id), a.kind === c["Function"]) for (let b of a.bindings || []) d(b.name, b.id);
        if (a.kind === c["GenericFor"]) for (let b of a.bindings || []) d(b.name, b.id);
        a.kind === c["NumericFor"] && a.binding && d(a.binding.name, a.binding.id);
      }
    });
    let e = new Set();
    for (let [a, c] of b) c.size > 1 && e.add(a);
    return e;
  }
  function w(a, b, c, d) {
    let e = new Set(a);
    for (let a = 0; a < d; a += 1) {
      let a = !1,
        f = d;
      for (let g = d - 1; g >= 0; g -= 1) {
        if (e.has(g)) {
          f = g;
          continue;
        }
        if (c.has(g)) continue;
        let d = b.get(g);
        d !== void 0 && d >= f && (e.add(g), f = g, a = !0);
      }
      if (!a) break;
    }
    return e;
  }
  function x(a, b, c, d) {
    let e = a.statements.length,
      f = [],
      g = 0,
      h = -1,
      i = 0,
      j = a => {
        i && a > g && f.push([g, a]), g = a + 1, h = a, i = 0;
      };
    for (let f = 0; f < e; f += 1) {
      if (c.has(f)) {
        j(f - 1), g = f + 1, h = f, i = 0;
        continue;
      }
      if (!d.has(f)) {
        let c = b.get(f);
        c !== void 0 && (c > h && (h = c), i += o(a.statements[f]));
      }
      f >= h && f - g + 1 >= n && j(f);
    }
    return j(e - 1), f;
  }
  function y(a, b) {
    if (b.has(a) || (b.add(a), a.statements.length < n * 2) || s(a)) return 0;
    let e = t(a),
      j = u(a, e);
    if (!j.size) return 0;
    let k = v(a),
      l = new Set(),
      o = new Set();
    for (let [b, d] of j) {
      if (d - b <= m) continue;
      let e = a.statements[b];
      if (e.kind !== c["LocalDeclaration"] || e.names.some(a => k.has(a))) {
        o.add(b);
        continue;
      }
      l.add(b);
    }
    let p = w(o, j, l, a.statements.length);
    for (let a of p) l.delete(a);
    let q = x(a, j, p, l);
    if (!q.length) return 0;
    let r = [],
      y = new Map();
    for (let b of l) {
      let c = a.statements[b];
      for (let a of c.names) r.push(a);
      y.set(b, c.expressions.length ? h(c.names.map(a => i(a)), c.expressions) : null);
    }
    let z = [];
    r.length && z.push(g(r));
    let aa = (b, c) => {
        let d = y.has(c) ? y.get(c) : a.statements[c];
        d && b.push(d);
      },
      ab = 0;
    for (let [a, b] of q) {
      for (; ab < a;) aa(z, ab), ab += 1;
      let c = [];
      for (; ab <= b;) aa(c, ab), ab += 1;
      c.length && z.push(f(d(c)));
    }
    for (; ab < a.statements.length;) aa(z, ab), ab += 1;
    return a.statements = z, q.length;
  }
  function z(a, b, d = k) {
    let e = 0,
      f = [{
        body: a.body,
        base: 0
      }];
    j(a, {
      enter(a) {
        a.kind === c["Function"] && f.push({
          body: a.body,
          base: (a.params || []).length
        });
      }
    });
    let g = new Set();
    for (let a of f) for (let c = 0; c < 16; c += 1) {
      let c = r(a.body, a.base);
      if (c.peak <= d) break;
      let f = c.blocks.filter(a => !a.sealed && a.direct > 0 && !g.has(a.block)).sort((a, b) => b.direct - a.direct)[0];
      if (!f) break;
      let h = y(f.block, g);
      h && (e += h, b());
    }
    return e;
  }
  b.exports = {
    fit: z,
    survey: r,
    "LIMIT": k
  };
});
var bf = a((a, b) => {
  "use strict";

  var c = be();
  function d(a) {
    a.resolve();
    let b = c.fit(a.chunk, () => a.resolve());
    b && (a.note(`narrowed ${b} scope(s) to fit the local limit`, b), a.bump("scope.narrowed", b));
  }
  b.exports = {
    name: "11-scope",
    run: d
  };
});
var bg = a((a, b) => {
  "use strict";

  var {
      resolve: c
    } = j(),
    {
      unparse: d
    } = i(),
    {
      "Ht": e
    } = k(),
    {
      detect: f
    } = m(),
    g = class {
      constructor(a, b = {}) {
        this.chunk = a, this.options = b, this.notes = [], this.stats = {}, this.warnings = [], this.step = null, this.resolved = null;
      }
      note(a, b) {
        this.notes.push({
          step: this.step,
          message: a,
          count: b
        });
      }
      warn(a) {
        this.warnings.push({
          step: this.step,
          message: a
        });
      }
      bump(a, b = 1) {
        this.stats[a] = (this.stats[a] || 0) + b;
      }
      resolve() {
        return this.resolved = c(this.chunk), this.resolved;
      }
      "V"(a, b = {}) {
        if (typeof this.options.pt == "function") try {
          this.options.pt(a, {
            step: this.step,
            ...b,
            stats: this.stats
          });
        } catch {}
      }
      source() {
        return d(this.chunk, this.options.print);
      }
    },
    h = [k(), r(), aa(), am(), ai(), an(), ap(), aq(), bb(), bd(), bf()],
    l = ["03-str", "06-proxy", "07-opt"],
    n = ["08-vars", "09-fmt", "10-name", "11-scope"],
    o = 4,
    p = 8;
  function q(a, b, c, d, e) {
    a.step = b.name, a["V"]("start", {
      step: b.name,
      pass: d,
      layer: e
    });
    let f = Date.now();
    try {
      b.run(a);
    } catch (b) {
      if (c.strict) throw b;
      a.warn(`step failed: ${b.message}`), c.verbose && console.error(b.stack);
    }
    if (a.bump(`time.${b.name}`, Date.now() - f), a["V"]("end", {
      step: b.name,
      pass: d,
      layer: e
    }), c.trace) {
      let f = require("fs"),
        g = require("path");
      f["mkdirSync"](c.trace, {
        recursive: !0
      });
      let h = e > 1 ? `.layer${e}` : "",
        i = d > 1 ? `.pass${d}` : "";
      f["writeFileSync"](g.join(c.trace, `${b.name}${h}${i}.lua`), a.source(), "latin1");
    }
  }
  function s(a, b, c, d) {
    let e = new Set(["03-str", "06-proxy"]);
    for (let f = 2; f <= o; f += 1) {
      let g = a.notes.length,
        h = !1;
      for (let g of b) {
        let b = a.notes.length;
        q(a, g, c, f, d), e.has(g.name) && a.notes.length > b && (h = !0);
      }
      if (a.notes.length === g || !h) return;
    }
  }
  function t(a) {
    if (e(a.chunk.body)) return !0;
    a.resolve();
    try {
      return f(a.chunk).instances.length > 0;
    } catch {
      return !1;
    }
  }
  function u(a, b = {}) {
    let c = new g(a, b),
      d = b.only ? new Set(b.only) : null,
      e = b.skip ? new Set(b.skip) : new Set(),
      f = h.filter(a => (!d || d.has(a.name)) && !e.has(a.name)),
      i = f.filter(a => !n.includes(a.name)),
      j = f.filter(a => n.includes(a.name)),
      k = l.map(a => i.find(b => b.name === a)).filter(Boolean),
      m = k.length ? Math.max(...k.map(a => i["indexOf"](a))) : -1;
    for (let a = 1; a <= p && i.length; a += 1) {
      let d = c.notes.length;
      for (let d = 0; d < i.length; d += 1) q(c, i[d], b, 1, a), d === m && s(c, k, b, a);
      if (c.notes.length === d || !t(c)) break;
      c.bump("layers.stacked");
    }
    for (let a of j) q(c, a, b, 1, 1);
    return c.step = null, c;
  }
  b.exports = {
    "Context": g,
    "STEPS": h,
    run: u
  };
});
var bh = a((a, b) => {
  "use strict";

  var {
      "Lexer": c,
      "TokenKind": f,
      "LuaSyntaxError": g
    } = d(),
    {
      "Kind": h
    } = e(),
    {
      walk: i,
      collect: j
    } = l(),
    k = a => a !== void 0 && a !== "" && (a >= "a" && a <= "z" || a >= "A" && a <= "Z" || a >= "0" && a <= "9" || a === "_"),
    m = a => a >= "0" && a <= "9",
    n = "\\",
    o = `\n`,
    p = "\r",
    q = "\t",
    r = new Set(["n", "r", "t", "a", "b", "v", '"', "'"]),
    s = new Set([7, 8, 9, 10, 11, 13, 32, 34, 39, 45, 126]),
    t = new Set([" ", "-", "~"]),
    u = new Set([n, "n", "r", '"', "'"]),
    v = new Set([n, '"', "'"]),
    w = [{
      literal: a => t.has(a),
      named: r,
      numeric: a => !s.has(a)
    }, {
      literal: a => {
        let b = a["charCodeAt"](0);
        return b >= 32 && b <= 126 && !v.has(a);
      },
      named: u,
      numeric: a => a < 32 ? a !== 10 && a !== 13 : a > 126
    }];
  function x(a, b, c) {
    let d = a.length - 1,
      e = 1;
    for (; e < d;) {
      let d = a[e];
      if (d !== n) {
        if (!b.literal(d)) return {
          at: e,
          message: `unescaped ${z(d)} in string`
        };
        c["Ne"] += 1, e += 1;
        continue;
      }
      let f = a[e + 1];
      if (b.named.has(f)) {
        c["Ce"] += 1, e += 2;
        continue;
      }
      if (!m(f)) return {
        at: e,
        message: `invalid escape \\${f}`
      };
      if (!m(a[e + 2]) || !m(a[e + 3])) return {
        at: e,
        message: "short decimal escape"
      };
      let g = Number(a.slice(e + 1, e + 4));
      if (g > 255) return {
        at: e,
        message: `decimal escape > 255 (\\${a.slice(e + 1, e + 4)})`
      };
      if (!b.numeric(g)) return {
        at: e,
        message: `redundant byte escape \\${a.slice(e + 1, e + 4)}`
      };
      c.le += 1, e += 4;
    }
    return null;
  }
  function y(a, b, c) {
    if (a[0] !== '"') {
      b(a["startsWith"]("[") ? "bracket string" : "single-quoted string");
      return;
    }
    let d = null;
    for (let b of w) {
      let e = {
          "Ne": 0,
          "Ce": 0,
          le: 0
        },
        f = x(a, b, e);
      if (f) {
        (!d || f.at > d.at) && (d = f);
        continue;
      }
      c["Ne"] += e["Ne"], c["Ce"] += e["Ce"], c.le += e.le, e.le > 0 && (c.un += 1);
      return;
    }
    b(d.message);
  }
  function z(a) {
    if (a === void 0) return "EOF";
    let b = a["charCodeAt"](0);
    return b < 32 || b > 126 ? `byte ${b}` : `'${a}'`;
  }
  function aa(a, b, c, d) {
    let e = a["toLowerCase"]();
    if (e["startsWith"]("0x")) {
      a !== e && a !== a["toUpperCase"]() && (d["Fe"] += 1);
      return;
    }
    if (e["startsWith"]("0b")) {
      c("binary literal");
      return;
    }
    if (a !== e) {
      c(`uppercase in number ${a}`);
      return;
    }
    if (a["endsWith"](".")) {
      c(`trailing decimal point in ${a}`);
      return;
    }
    if (a.length > 1 && a[0] === "0" && m(a[1])) {
      c(`zero-padded number ${a}`);
      return;
    }
    a["startsWith"]("0.") && !(b && b.kind === f["Symbol"] && b.value === "-") && c(`leading zero in ${a}`);
  }
  var ab = 12;
  function ac(a, b, c, d, e) {
    if (a === "") return;
    if (a !== " ") {
      a.includes("--") ? e("comment") : a.includes(o) || a.includes(p) ? e("newline") : a.includes(q) ? e("tab character") : e("excess whitespace");
      return;
    }
    let f = b[b.length - 1],
      g = d[0];
    k(f) || k(g) || e(`unexpected space between ${z(f)} and ${z(g)}`);
  }
  function ad(a) {
    let b = [],
      d = a => {
        b.length < ab && b.push(a);
      },
      e = {
        tokens: 0,
        strings: 0,
        numbers: 0,
        ln: 0,
        qe: 0,
        un: 0,
        "Fe": 0,
        "Ce": 0,
        le: 0,
        "Ne": 0,
        banner: 0
      },
      h = new c(a),
      i = [],
      j = null,
      k = "",
      l = 0,
      m = null;
    for (;;) {
      let c;
      try {
        c = h.next();
      } catch (a) {
        if (!(a instanceof g)) throw a;
        return d(`lexer error: ${a.message}`), {
          violations: b,
          counts: e,
          truncated: !0
        };
      }
      let n = c.kind === f["Eof"] ? "" : a.slice(c.offset, h.pos),
        o = a.slice(l, c.offset);
      if (j === null || c.kind === f["Eof"] ? e.banner += o.length : ac(o, k, c, n, d), m) {
        if (!(c.kind === f["Symbol"] && c.value === "(")) {
          let a = m.frame;
          a && a.ch === "{" ? (e.ln += 1, a.semi = !0, a.comma && !a.mixed && (a.mixed = !0, e.qe += 1)) : d("unexpected ';'");
        }
        m = null;
      }
      if (c.kind === f["Eof"]) break;
      if (e.tokens += 1, c.kind === f["String"]) e.strings += 1, y(n, d, e);else if (c.kind === f["Number"]) e.numbers += 1, aa(c.text, j, d, e);else if (c.kind === f["Symbol"]) {
        if (c.value === "(" || c.value === "[" || c.value === "{") i.push({
          ch: c.value,
          comma: !1,
          semi: !1,
          mixed: !1
        });else if (c.value === ")" || c.value === "]" || c.value === "}") i.pop();else if (c.value === ";") m = {
          frame: i[i.length - 1] || null
        };else if (c.value === ",") {
          let a = i[i.length - 1];
          a && a.ch === "{" && (a.comma = !0, a.semi && !a.mixed && (a.mixed = !0, e.qe += 1));
        }
      }
      if (b.length >= ab) return {
        violations: b,
        counts: e,
        truncated: !0
      };
      j = c, k = n, l = h.pos;
    }
    return {
      violations: b,
      counts: e,
      truncated: !1
    };
  }
  function ae(a) {
    let b = [new Set()],
      c = new Set(),
      d = 0,
      e = 0,
      f = 0,
      g = 0,
      j = a => a >= "a" && a <= "z" || a >= "A" && a <= "Z",
      k = a => {
        if (!(typeof a != "string" || a.length === 0)) {
          d += 1, j(a[0]) && (e += 1), a.length <= 2 && (f += 1), a.length === 1 && c.add(a);
          for (let c = 0; c < b.length; c += 1) if (b[c].has(a)) {
            g += 1;
            break;
          }
          b[b.length - 1].add(a);
        }
      },
      l = new Set([h["Function"], h["Block"], h["NumericFor"], h["GenericFor"], h["Repeat"]]);
    return i(a, {
      enter: a => {
        switch (l.has(a.kind) && b.push(new Set()), a.kind) {
          case h["Function"]:
            for (let b of a.params || []) k(b);
            break;
          case h["LocalDeclaration"]:
            for (let b of a.names || []) k(b);
            break;
          case h["LocalFunction"]:
            k(a.name);
            break;
          case h["NumericFor"]:
            k(a.variable);
            break;
          case h["GenericFor"]:
            for (let b of a.variables || []) k(b);
            break;
          default:
            break;
        }
      },
      leave: a => {
        l.has(a.kind) && b.pop();
      }
    }), {
      declared: d,
      kt: e,
      short: f,
      shadowed: g,
      breadth: c.size
    };
  }
  var af = a => {
      let b = a;
      for (; b && b.kind === h["Paren"];) b = b.expression;
      return b;
    },
    ag = (a, b) => !!a && a.kind === h["Number"] && a.value === b;
  function ah(a) {
    if (a.kind !== h["Return"] || a.expressions.length !== 1) return !1;
    let b = af(a.expressions[0]);
    if (!b || b.kind !== h["Call"] || b.args.length !== 1 || af(b.args[0]).kind !== h["Vararg"]) return !1;
    let c = af(b.base);
    return !c || c.kind !== h["Function"] ? !1 : c.w === !0 && (c.params || []).length === 0;
  }
  function ai(a) {
    if (a.kind !== h["GenericFor"] || a.expressions.length !== 1 || (a.variables || []).length !== 2) return !1;
    let b = af(a.expressions[0]);
    if (!b || b.kind !== h["Call"] || b.args.length !== 1) return !1;
    let c = af(b.base);
    if (!c || c.kind !== h["Name"] || c.name !== "ipairs") return !1;
    let d = af(b.args[0]);
    if (!d || d.kind !== h["Table"] || d.entries.length !== 3) return !1;
    for (let a of d.entries) {
      if (a.key) return !1;
      let b = af(a.value);
      if (!b || b.kind !== h["Table"] || b.entries.length !== 2 || b.entries[0].key || b.entries[1].key) return !1;
    }
    let e = a.body ? a.body.statements : [];
    if (e.length !== 1 || e[0].kind !== h["While"]) return !1;
    let f = e[0].body ? e[0].body.statements : [];
    return f.length !== 1 || f[0].kind !== h["Assignment"] ? !1 : f[0].targets.length === 4 && f[0].expressions.length === 4;
  }
  var aj = new Set(["__add", "__sub", "__index", "__mul", "__div", "__pow", "__concat"]);
  function ak(a) {
    if (a.kind !== h["Table"] || a.entries.length !== 3) return !1;
    for (let b of a.entries) {
      let a = b.key;
      if (!a || a.kind !== h["String"] || !aj.has(a.value)) return !1;
    }
    return !0;
  }
  var al = 35184372088832,
    am = 257,
    an = new Set(["<", ">", "<=", ">="]);
  function ao(a) {
    let b = af(a.condition);
    return !b || b.kind !== h["Name"] ? null : {
      name: b.name,
      ifs: 0,
      assigns: !1,
      compares: !1
    };
  }
  var ap = a => a.ifs >= 2 && a.assigns && a.compares;
  function aq(a) {
    let b = {
        wrapper: !1,
        rotate: !1,
        proxy: !1,
        dispatcher: !1,
        an: !1,
        cn: !1,
        dn: !1,
        stepless: !1
      },
      c = [];
    return i(a, {
      enter: a => {
        switch (a.kind) {
          case h["While"]:
            c.push(ao(a));
            break;
          case h["If"]:
            for (let a of c) a && (a.ifs += 1);
            break;
          case h["Assignment"]:
            for (let b of c) if (!(!b || b.assigns)) for (let c of a.targets) {
              let a = af(c);
              a && a.kind === h["Name"] && a.name === b.name && (b.assigns = !0);
            }
            break;
          case h["Binary"]:
            if (an.has(a.operator)) {
              let b = af(a.lhs),
                d = af(a.rhs);
              for (let a of c) !a || a.compares || (b && b.kind === h["Name"] && b.name === a.name || d && d.kind === h["Name"] && d.name === a.name) && (a.compares = !0);
            }
            break;
          case h["Return"]:
            !b.wrapper && ah(a) && (b.wrapper = !0);
            break;
          case h["Number"]:
            a.value === al ? b.an = !0 : a.value === am && (b.cn = !0);
            break;
          case h["Table"]:
            !b.proxy && ak(a) && (b.proxy = !0);
            break;
          case h["GenericFor"]:
            !b.rotate && ai(a) && (b.rotate = !0);
            break;
          case h["NumericFor"]:
            a.step ? ag(af(a.step), 1) && (b.dn = !0) : b.stepless = !0;
            break;
          default:
            break;
        }
      },
      leave: a => {
        if (a.kind !== h["While"]) return;
        let d = c.pop();
        d && ap(d) && (b.dispatcher = !0);
      }
    }), b;
  }
  var ar = {
      declared: 0,
      kt: 0,
      short: 0,
      shadowed: 0,
      breadth: 0
    },
    as = {
      wrapper: !1,
      rotate: !1,
      proxy: !1,
      dispatcher: !1,
      an: !1,
      cn: !1,
      dn: !1,
      stepless: !1
    };
  function at(a, b, c) {
    let d = [],
      e = (a, b) => d.push({
        weight: a,
        label: b
      }),
      f = a.counts;
    return c.dispatcher && e(2, "a register machine dispatch loop"), c.an && c.cn && e(2, "the string cipher's 2^45 modulus and 257 prime"), c.rotate && e(2, "the constant table's rotation loop"), f.un > 0 && e(2, `${f.un} string(s) carrying numeric escapes for printable text`), f["Fe"] > 0 && e(f["Fe"] > 1 ? 2 : 1, `${f["Fe"]} hexadecimal number(s) in mixed case`), c.wrapper && e(1, "the vararg wrapper around the whole program"), f.qe > 0 ? e(1, `${f.qe} table(s) separated by both ',' and ';'`) : f.ln > 0 && e(1, `${f.ln} table entries separated by ';'`), c.proxy && e(1, "a three metamethod proxy metatable"), c.dn && e(1, "a numeric for loop with its default step written out"), b.breadth >= 12 && e(1, `${b.breadth} distinct single letter local names`), b.shadowed > 0 && e(1, `${b.shadowed} local name(s) shadowing a name already in scope`), b.declared >= 2 && b.short === b.declared && b.kt === b.declared && e(1, `${b.declared} local names, all one or two letters`), d;
  }
  function au(a) {
    return a >= 2e3 ? 4 : a >= 300 ? 2 : 1;
  }
  function av(a, b) {
    let c = a.trim(),
      d = ad(c),
      e = b ? ae(b) : ar,
      f = b ? aq(b) : as,
      g = at(d, e, f),
      h = g.reduce((a, b) => a + b.weight, 0),
      i = au(d.counts.tokens),
      j = d.violations.slice();
    return !j.length && f.stepless && j.push("for loop without step"), !j.length && h < i && j.push("insufficient Prometheus signatures" + (g.length ? ` (${g.map(a => a.label).join(", ")})` : "")), {
      prometheus: j.length === 0,
      reasons: j,
      evidence: g,
      weight: h,
      required: i,
      names: e,
      shapes: f,
      counts: d.counts
    };
  }
  b.exports = {
    identify: av
  };
});
var bi = a((a, b) => {
  "use strict";

  var {
      parse: c
    } = f(),
    {
      unparse: d
    } = i(),
    {
      "Context": g,
      "STEPS": h,
      run: j
    } = bg(),
    {
      identify: k
    } = bh(),
    l = class extends Error {
      constructor(a) {
        super(`unsupported Prometheus payload: ${a.reasons.join("; ")}`), this.name = "NotPrometheusError", this.report = a;
      }
    };
  function n(a, b = {}) {
    let d = b.name || "chunk",
      e = null,
      f = null;
    try {
      e = c(a, {
        name: d
      });
    } catch (a) {
      f = a;
    }
    let g = null;
    if (b.detect !== !1 && (g = k(a, e), !g.prometheus && !bl(a))) throw new l(g);
    if (f) throw f;
    let h = j(e, b);
    return {
      code: h.source(),
      chunk: e,
      notes: h.notes,
      warnings: h.warnings,
      stats: h.stats,
      context: h,
      detected: g
    };
  }
  b.exports = {
    deobfuscate: n,
    "NotPrometheusError": l,
    identify: k,
    parse: c,
    unparse: d,
    run: j,
    "Context": g,
    "STEPS": h,
    ast: e(),
    detect: m().detect,
    tn: ah().tn
  };
});
const bj = bi();
const bk = bj.identify;
function bl(a) {
  if (typeof a !== "string") return false;
  const b = /local\s+function\s+[A-Za-z_]\w*\s*\([^)]*\)\s*local\s+\w+\s*=\s*\{\s*\}/.test(a) && /unknown VM opcode/.test(a) && /\[[ ]*4[ ]*\]/.test(a);
  const c = /getfenv/.test(a) && /setfenv/.test(a) && /newproxy/.test(a) && /tonumber/.test(a) && /ipairs/.test(a) && /return\s*\(\s*function/.test(a);
  const d = /getfenv/.test(a) && /setfenv/.test(a) && /return\s*\(\s*function/.test(a) && /local\s+\w+\s*=\s*\{[^\n]{0,240}__len[^\n]{0,240}__index/.test(a);
  return b || c || d;
}
bj.identify = function (a, b) {
  let c = bk(a, b);
  if (!c.prometheus && bl(a)) {
    c = {
      ...c,
      prometheus: true,
      reasons: [],
      evidence: (c.evidence || []).concat([{
        weight: 4,
        label: "new Prometheus VM data/rebuild dispatcher"
      }]),
      weight: Math.max(c.weight || 0, 4),
      required: c.required || 1
    };
  }
  return c;
};
module.exports = bj;
