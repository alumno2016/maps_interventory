 !(function t(e, i, n) {
  function s(a, r) {
    if (!i[a]) {
      if (!e[a]) {
        var h = "function" == typeof require && require;
        if (!r && h) return h(a, !0);
        if (o) return o(a, !0);
        var c = new Error("Cannot find module '" + a + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      var u = (i[a] = { exports: {} });
      e[a][0].call(
        u.exports,
        function(t) {
          var i = e[a][1][t];
          return s(i ? i : t);
        },
        u,
        u.exports,
        t,
        e,
        i,
        n
      );
    }
    return i[a].exports;
  }
  for (
    var o = "function" == typeof require && require, a = 0;
    a < n.length;
    a++
  )
    s(n[a]);
  return s;
})(
  {
    1: [
      function(t, e, i) {
        "use strict";
        function n(t) {
          return new s(function(e, i) {
            var n = new XMLHttpRequest();
            n.open(
              "GET",
              t,
              !0
            ), (n.responseType = "arraybuffer"), n.addEventListener(
              "load",
              function() {
                return n.status > 399 ? i(n.status) : void e(n.response);
              },
              !1
            ), n.send();
          });
        }
        var s = t("lie");
        e.exports = n;
      },
      { lie: 40 }
    ],
    2: [
      function(t, e, i) {
        "use strict";
        function n(t) {
          return new s(function(e) {
            var i = new FileReader();
            (i.onload = function() {
              e(i.result);
            }), i.readAsArrayBuffer(t);
          });
        }
        var s = t("lie"),
          o = t("./read"),
          a = t("./util").toArray;
        e.exports = function(t) {
          return new s(function(e, i) {
            function r(t) {
              return s.all([n(f[t]), n(d[t])]).then(function(t) {
                return o(t[0], t[1]);
              });
            }
            for (var h = {}, c = {}, u = 0, l = t.length; l > u; )
              ".gdbtable" === t[u].name.slice(-9) &&
              (1 === parseInt(t[u].name.slice(1, -9), 16) ||
                parseInt(t[u].name.slice(1, -9), 16) > 8)
                ? (h[parseInt(t[u].name.slice(1, -9), 16)] = t[u])
                : ".gdbtablx" === t[u].name.slice(-9) &&
                  (1 === parseInt(t[u].name.slice(1, -9), 16) ||
                    parseInt(t[u].name.slice(1, -9), 16) > 8) &&
                  (c[parseInt(t[u].name.slice(1, -9), 16)] = t[u]), u++;
            var f = a(h),
              d = a(c);
            r(0)
              .then(function(t) {
                var e = {},
                  i = 1;
                return t.forEach(function(t) {
                  "GDB_" !== t.Name.slice(0, 4) && (e[t.Name] = i++);
                }), e;
              })
              .then(function(t) {
                var e = {};
                return s
                  .all(
                    Object.keys(t).map(function(i) {
                      return r(t[i]).then(function(t) {
                        e[i] = t;
                      });
                    })
                  )
                  .then(function() {
                    return e;
                  });
              })
              .then(e, i);
          });
        };
      },
      { "./read": 9, "./util": 13, lie: 40 }
    ],
    3: [
      function(t, e, i) {
        "use strict";
        function n(t) {
          return o.fromNumber(t, !0);
        }
        function s(t, e) {
          (this.data = new DataView(t)), (this.offset = e);
        }
        var o = t("long"),
          a = o.fromNumber(127, !0);
        (s.prototype.getUint8 = function() {
          return this.data.getUint8(this.offset++);
        }), (s.prototype.varuint = function() {
          for (var t = 0, e = -7, i = 128; 128 & i; )
            (e += 7), (i = this.getUint8()), (t = a
              .and(n(i))
              .shiftLeft(e)
              .or(n(t))
              .toNumber());
          return t;
        }), (s.prototype.varint = function() {
          var t = this.getUint8(),
            e = 63 & t,
            i = 1;
          if ((64 & t && (i = -1), !(128 & t))) return e * i;
          for (var s = -1; 128 & t; )
            (s += 7), (t = this.getUint8()), (e = a
              .and(n(t))
              .shiftLeft(s)
              .or(n(e))
              .toNumber());
          return e * i;
        }), (s.prototype.getUint16 = function() {
          var t = this.data.getUint16(this.offset, !0);
          return (this.offset += 2), t;
        }), (s.prototype.getInt16 = function() {
          var t = this.data.getInt16(this.offset, !0);
          return (this.offset += 2), t;
        }), (s.prototype.getUint32 = function() {
          var t = this.data.getUint32(this.offset, !0);
          return (this.offset += 4), t;
        }), (s.prototype.getInt32 = function() {
          var t = this.data.getInt32(this.offset, !0);
          return (this.offset += 4), t;
        }), (s.prototype.getFloat32 = function() {
          var t = this.data.getFloat32(this.offset, !0);
          return (this.offset += 4), t;
        }), (s.prototype.getFloat64 = function() {
          var t = this.data.getFloat64(this.offset, !0);
          return (this.offset += 8), t;
        }), (e.exports = s);
      },
      { long: 47 }
    ],
    4: [
      function(t, e, i) {
        "use strict";
        e.exports = function(t) {
          var e = t - 25569,
            i = 864e5 * e;
          return new Date(i);
        };
      },
      {}
    ],
    5: [
      function(t, e, i) {
        "use strict";
        function n(t, e) {
          var i = { meta: { nullable: !0 } };
          return (i.meta.len = e.getUint8(t++, !0)), (i.meta.flag = e.getUint8(
            t++,
            !0
          )), 0 === (1 & i.meta.flag) &&
            (i.meta.nullable = !1), (i.offset = t), i;
        }
        function s(t, e) {
          var i = { meta: { nullable: !0 } };
          return (i.meta.len = e.getUint8(t++, !0)), (i.meta.flag = e.getUint8(
            t++,
            !0
          )), 0 === (1 & i.meta.flag) &&
            (i.meta.nullable = !1), (i.offset = ++t), i;
        }
        function o(t) {
          var e = r(t),
            i = new DataView(t, e.fdOffset),
            n = {};
          (n.size = i.getUint32(0, !0)), (n.version = i.getUint32(
            4,
            !0
          )), (n.geometry = i.getUint8(8, !0)), (n.num = i.getUint16(
            12,
            !0
          )), (n.fields = []), (n.nullableFields = 0);
          var s = 14;
          n.geometry = !1;
          for (var o, a, c, u = 0; u < n.num; ) {
            for (o = {}, o.chars = i.getUint8(s++, !0); 0 === o.chars; )
              o.chars = i.getUint8(s++, !0);
            for (o.title = "", a = 0; a < o.chars; )
              (o.title += String.fromCharCode(
                i.getUint16(s, !0)
              )), a++, (s += 2);
            if (((o.chars = i.getUint8(s++, !0)), o.chars > 0))
              for (o.alias = "", a = 0; a < o.chars; )
                (o.alias += String.fromCharCode(
                  i.getUint16(s, !0)
                )), a++, (s += 2);
            if (((o.type = i.getUint8(s++, !0)), !h[o.type]))
              throw new Error("not a real type");
            (c = h[o.type](s, i)), (s = c.offset), (o.meta = c.meta), 7 ===
              o.type && ((n.geometry = !0), (n.bbox = o.meta.extent)), o.meta
              .nullable && (n.nullableFields++, (o.nullable = !0)), (n.fields[
              u++
            ] = o);
          }
          return (n.offset = s), n;
        }
        var a = t("proj4"),
          r = t("./table"),
          h = [
            s,
            s,
            s,
            s,
            function(t, e) {
              var i = { meta: { nullable: !0 } };
              return (i.meta.len = e.getUint32(
                t,
                !0
              )), (t += 4), (i.meta.flag = e.getUint8(t++, !0)), 0 ===
                (1 & i.meta.flag) &&
                (i.meta.nullable = !1), (i.offset = ++t), i;
            },
            s,
            function(t) {
              var e = { meta: {} };
              return t++, t++, (e.meta.nullable = !1), (e.offset = t), e;
            },
            function(t, e) {
              function i(t) {
                return 0 === t;
              }
              t += 2;
              var n = { meta: { nullable: !0 } },
                s = e.getUint16(t, !0);
              t += 2;
              var o = 0;
              n.meta.wkt = "";
              for (var r; s > o; )
                (r = e.getUint8(t++, !0)), r &&
                  (n.meta.wkt += String.fromCharCode(r)), o++;
              n.meta.wkt && (n.meta.proj = a(n.meta.wkt));
              var h = e.getUint8(t++, !0);
              (n.meta.origin = []), n.meta.origin.push(
                e.getFloat64(t, !0)
              ), (t += 8), n.meta.origin.push(e.getFloat64(t, !0)), (t += 8);
              var c = e.getFloat64(t, !0);
              (t += 8), (n.meta.scale = [c, c]), 1 !== h &&
                (
                  n.meta.origin.push(e.getFloat64(t, !0)),
                  (t += 8),
                  n.meta.scale.push(e.getFloat64(t, !0)),
                  (t += 8),
                  5 !== h &&
                    (
                      n.meta.origin.push(e.getFloat64(t, !0)),
                      (t += 8),
                      n.meta.scale.push(e.getFloat64(t, !0)),
                      (t += 8)
                    )
                );
              var u = e.getFloat64(t, !0);
              if (((n.meta.tolerance = [u, u]), (t += 8), 1 !== h))
                for (
                  n.meta.tolerance.push(e.getFloat64(t, !0)), t += 8, 5 !== h &&
                    (
                      n.meta.tolerance.push(e.getFloat64(t, !0)),
                      (t += 8)
                    ), o = 4, n.meta.extent = [];
                  o--;

                )
                  n.meta.extent.push(e.getFloat64(t, !0)), (t += 8);
              for (var l, f; ; ) {
                if (
                  (
                    (l = e.getUint8(t + 1, !0)),
                    (f = [
                      e.getUint8(t, !0),
                      e.getUint8(t + 2, !0),
                      e.getUint8(t + 3, !0),
                      e.getUint8(t + 4, !0)
                    ]),
                    5 > l && l > 0 && f.every(i)
                  )
                ) {
                  (t += 5), (t += 8 * l);
                  break;
                }
                t += 8;
              }
              return (n.offset = t), n;
            },
            function(t, e) {
              var i = { meta: { nullable: !0 } };
              return t++, (i.meta.flag = e.getUint8(t++, !0)), 0 ===
                (1 & i.meta.flag) && (i.meta.nullable = !1), (i.offset = t), i;
            },
            null,
            n,
            n,
            n
          ];
        e.exports = o;
      },
      { "./table": 11, proj4: 84 }
    ],
    6: [
      function(t, e, i) {
        (function(i) {
          "use strict";
          var n = t("jszip"),
            s = t("./util").toArray,
            o = t("./read"),
            a = t("lie");
          e.exports = function(t) {
            return new a(function(e) {
              function a(t) {
                return i.browser
                  ? o(l[t].asArrayBuffer(), f[t].asArrayBuffer())
                  : o(l[t].asNodeBuffer(), f[t].asNodeBuffer());
              }
              var r = new n(t),
                h = r.file(
                  /a0{1,7}(?:[^2-8]|[190a-z]|(?:[1-9a-z]+[0-9a-z]+))\.(?:gdbtable|gdbtablx)/
                ),
                c = {},
                u = {};
              h.forEach(function(t) {
                ".gdbtable" === t.name.slice(-9) &&
                (1 === parseInt(t.name.slice(-17, -9), 16) ||
                  parseInt(t.name.slice(-17, -9), 16) > 8)
                  ? (c[parseInt(t.name.slice(-17, -9), 16)] = t)
                  : ".gdbtablx" === t.name.slice(-9) &&
                    (1 === parseInt(t.name.slice(-17, -9), 16) ||
                      parseInt(t.name.slice(-17, -9), 16) > 8) &&
                    (u[parseInt(t.name.slice(-17, -9), 16)] = t);
              });
              var l = s(c),
                f = s(u),
                d = a(0),
                p = {},
                m = 1;
              d.forEach(function(t) {
                "GDB_" !== t.Name.slice(0, 4) && (p[t.Name] = m++);
              });
              var _ = {};
              Object.keys(p).forEach(function(t) {
                _[t] = a(p[t]);
              }), e(_);
            });
          };
        }.call(this, t("_process")));
      },
      { "./read": 9, "./util": 13, _process: 19, jszip: 28, lie: 40 }
    ],
    7: [
      function(t, e, i) {
        "use strict";
        function n(t, e) {
          return !r.fromNumber(e, !0).and(t);
        }
        function s(t) {
          for (var e, i, n = 0, s = 1, o = t.length; o > s; )
            (e = i || t[0]), (i = t[s]), (n +=
              (i[0] - e[0]) * (i[1] + e[1])), s++;
          return n > 0;
        }
        function o(t, e) {
          return s(e) || !t.length ? t.push([e]) : t[t.length - 1].push(e), t;
        }
        function a(t) {
          function e(t, e) {
            return e >= this.rmin
              ? void 0
              : (
                  (this.accumulater[e] += t / this.scale[e]),
                  this.accumulater[e]
                );
          }
          (this.origin = t.origin), (this.scale =
            t.scale), (this.min = Math.min(
            this.origin.length,
            this.scale.length
          )), (this.convert = function(t, e) {
            e = e || this.origin;
            var i = this.scale,
              n = Math.min(t.length, this.min);
            return t.map(function(t, s) {
              return s >= n ? void 0 : t / i[s] + e[s];
            }, this);
          }), (this.reduceBegin = function(t) {
            var e = this.convert(t);
            (this.accumulater = e.slice()), (this.line = [e]);
          }), (this.reduce = function(t) {
            (this.rmin = Math.min(
              t.length,
              this.min,
              this.accumulater.length
            )), this.line.push(t.map(e, this));
          });
        }
        var r = t("long"),
          h = r.fromNumber(2147483648, !0),
          c = r.fromNumber(1073741824, !0),
          u = r.fromNumber(536870912, !0),
          l = {
            11: { base: "point", m: !0, z: !0 },
            10: { base: "line", m: !1, z: !0 },
            13: { base: "line", m: !0, z: !0 },
            15: { base: "polygon", m: !0, z: !0 },
            21: { base: "point", m: !0, z: !1 },
            23: { base: "line", m: !0, z: !1 },
            19: { base: "polygon", m: !1, z: !0 },
            18: { base: "mpoint", m: !0, z: !0 },
            28: { base: "mpoint", m: !0, z: !1 },
            20: { base: "mpoint", m: !1, z: !0 },
            1: { base: "point", m: !1, z: !1 },
            3: { base: "line", m: !1, z: !1 },
            5: { base: "polygon", m: !1, z: !1 },
            25: { base: "polygon", m: !0, z: !1 },
            9: { base: "point", m: !1, z: !0 },
            8: { base: "mpoint", m: !1, z: !1 }
          };
        e.exports = function(t, e) {
          function i(e) {
            var i = [];
            return i.push(t.varuint()), i.push(t.varuint()), "point" ===
              e.base &&
              (e.z && i.push(t.varuint()), e.m && i.push(t.varuint())), i;
          }
          function s(e) {
            var i = [];
            return i.push(t.varint()), i.push(t.varint()), "point" === e.base &&
              (e.z && i.push(t.varint()), e.m && i.push(t.varint())), i;
          }
          function r(t) {
            return "point" === t.base || "mpoint" === t.base
              ? r[t.base](t)
              : r.complex(t);
          }
          var f;
          f = e.meta.proj
            ? function(t) {
                return e.meta.proj.inverse(t);
              }
            : function(t) {
                return t;
              };
          var d = new a(e.meta);
          (r.point = function(t) {
            return { type: "Point", coordinates: f(d.convert(i(t))) };
          }), (r.mpoint = function(e) {
            for (
              var i = t.varuint(),
                n = [t.varuint(), t.varuint()],
                o = [t.varuint(), t.varuint()],
                a = d.convert(n).concat(d.convert(o, d.convert(n))),
                r = 1,
                h = s(e),
                c = [];
              r++ < i;

            )
              c.push(s(e));
            if (e.z)
              for (h.push(t.varint()), r = 1; i > r; )
                c[r - 1].push(t.varint()), r++;
            d.reduceBegin(h), c.forEach(function(t) {
              d.reduce(t);
            });
            var u = d.line.map(f);
            return 1 === u.length
              ? { type: "Point", coordinates: u[0] }
              : u.length > 1
                ? { bbox: a, type: "MultiPoint", coordinates: u }
                : !1;
          }), (r.complex = function(e) {
            for (
              var i,
                n = t.varuint(),
                a = n,
                r = t.varuint(),
                h = [t.varuint(), t.varuint()],
                c = [t.varuint(), t.varuint()],
                u = d.convert(h).concat(d.convert(c, d.convert(h))),
                l = 1,
                p = [];
              l++ < r;

            )
              (i = t.varuint()), (a -= i), p.push(i);
            p.push(a);
            for (var m = [], _ = [], g = -1, y = 1, v = s(e); ++g < r; ) {
              for (_[g] = []; y++ < p[g]; ) _[g].push(s(e));
              y = 0;
            }
            if (e.z)
              for (v.push(t.varint()), y = 1; ++g < r; ) {
                for (; y < p[g]; ) _[g][y].push(t.varint()), y++;
                y = 0;
              }
            d.reduceBegin(v), _.forEach(function(t) {
              t.forEach(function(t) {
                d.reduce(t);
              }), "polygon" === e.base &&
                d.line.push(d.line[0]), m.push(d.line.map(f)), (d.line = []);
            });
            var b = {};
            return "line" === e.base
              ? 1 === m.length
                ? { bbox: u, type: "LineString", coordinates: m[0] }
                : m.length > 1
                  ? { bbox: u, type: "MultiLineString", coordinates: m }
                  : !1
              : "polygon" === e.base
                ? (
                    (b.bbox = u),
                    (b.coordinates = m.reduce(o, [])),
                    1 === b.coordinates.length
                      ? (
                          (b.type = "Polygon"),
                          (b.coordinates = b.coordinates[0]),
                          b
                        )
                      : ((b.type = "MultiPolygon"), b)
                  )
                : void 0;
          });
          var p = t.varuint();
          if (!p) return null;
          var m,
            _ = p + t.offset,
            g = t.varuint();
          if (!g) return (t.offset = _), !1;
          if (l[g]) m = l[g];
          else {
            if (255 & g) return (t.offset = _), !1;
            if (n(u, g)) return (t.offset = _), !1;
            m = { base: "line", z: n(h, g), m: n(c, g) };
          }
          m = l[g];
          var y = r(m);
          return (t.offset = _), y;
        };
      },
      { long: 47 }
    ],
    8: [
      function(t, e, i) {
        (function(i) {
          "use strict";
          var n = t("./read"),
            s = t("./nodeReader"),
            o = t("./fromZip"),
            a = t("./binaryAjax");
          e.exports = function() {
            return 2 === arguments.length
              ? n(arguments[0], arguments[1])
              : "string" == typeof arguments[0]
                ? i.browser ? a(arguments[0]).then(o) : s(arguments[0])
                : i.browser && "[object FileList]" === arguments[0].toString()
                  ? s(arguments[0])
                  : o(arguments[0]);
          };
        }.call(this, t("_process")));
      },
      {
        "./binaryAjax": 1,
        "./fromZip": 6,
        "./nodeReader": 2,
        "./read": 9,
        _process: 19
      }
    ],
    9: [
      function(t, e, i) {
        (function(i) {
          "use strict";
          var n = t("./rows"),
            s = t("./util");
          e.exports = function(t, e) {
            return i.browser ||
              ((t = s.toArrayBuffer(t)), (e = s.toArrayBuffer(e))), n(t, e);
          };
        }.call(this, t("_process")));
      },
      { "./rows": 10, "./util": 13, _process: 19 }
    ],
    10: [
      function(t, e, i) {
        "use strict";
        function n(t) {
          for (var e = "", i = 16; i--; ) e += t.getUint8().toString(16);
          return e;
        }
        function s(t) {
          for (var e = "", i = 0, n = t.varuint(); n > i; )
            (e += String.fromCharCode.call(!1, t.getUint8())), i++;
          return e;
        }
        var o = t("./date"),
          a = t("./geometry"),
          r = t("./dataType"),
          h = t("./fields"),
          c = t("./tablex"),
          u = [
            function(t) {
              return t.getUint16();
            },
            function(t) {
              return t.getUint32();
            },
            function(t) {
              return t.getFloat32();
            },
            function(t) {
              return t.getFloat64();
            },
            s,
            function(t) {
              return o(t.getFloat64());
            },
            function() {},
            a,
            function(t) {
              for (var e = [], i = 0, n = t.varuint(); n > i; )
                e.push(t.getUint8()), i++;
              return new ArrayBuffer(e);
            },
            null,
            n,
            n,
            s
          ];
        e.exports = function(t, e) {
          var i = h(t),
            n = c(e),
            s = n
              .map(function(e) {
                if (!e) return null;
                var n = new DataView(t, e, 4).getUint32(0, !0);
                e += 4;
                var s = new r(t, e, n),
                  o = [],
                  a = i.nullableFields,
                  h = 0,
                  c = !1;
                if (a) for (c = !0; a > 0; ) o.push(s.getUint8()), (a -= 8);
                var l = !1,
                  f = {};
                return i.geometry &&
                  (
                    (f.type = "Feature"),
                    (f.properties = {})
                  ), i.fields.forEach(function(t) {
                  var e;
                  if (
                    !c ||
                    !t.nullable ||
                    ((e = o[h >> 3] & (1 << (h % 8))), h++, 0 === e)
                  ) {
                    var n = u[t.type](s, t);
                    if ("undefined" != typeof n)
                      if (i.geometry)
                        if (7 === t.type) {
                          if (!n) return void (l = !0);
                          (f.geometry = n), f.geometry.bbox &&
                            (
                              (f.bbox = f.geometry.bbox),
                              delete f.geometry.bbox
                            );
                        } else f.properties[t.title] = n;
                      else f[t.title] = n;
                  }
                }), l ? !1 : f;
              })
              .filter(function(t) {
                return t;
              });
          return i.geometry
            ? { type: "FeatureCollection", features: s, bbox: i.bbox }
            : s;
        };
      },
      {
        "./dataType": 3,
        "./date": 4,
        "./fields": 5,
        "./geometry": 7,
        "./tablex": 12
      }
    ],
    11: [
      function(t, e, i) {
        "use strict";
        e.exports = function(t) {
          var e = new Uint32Array(t, 0, 40);
          return { rows: e[1], fileSize: e[6], fdOffset: e[8] };
        };
      },
      {}
    ],
    12: [
      function(t, e, i) {
        "use strict";
        e.exports = function(t) {
          var e = new DataView(t),
            i = 8,
            n = [],
            s = e.getUint32(i, !0);
          i += 8;
          for (var o = 0; s > o; ) (n[o++] = e.getUint32(i, !0)), (i += 5);
          return n;
        };
      },
      {}
    ],
    13: [
      function(t, e, i) {
        "use strict";
        (i.toArrayBuffer = function(t) {
          for (
            var e = t.length, i = new Uint8Array(new ArrayBuffer(e)), n = -1;
            ++n < e;

          )
            i[n] = t[n];
          return i.buffer;
        }), (i.toArray = function(t) {
          var e = Object.keys(t);
          e.sort(function(t, e) {
            return t - e;
          });
          var i = [];
          return e.forEach(function(e) {
            i.push(t[e]);
          }), i;
        });
      },
      {}
    ],
    14: [function(t, e, i) {}, {}],
    15: [
      function(t, e, i) {
        function n() {
          return s.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function s(t) {
          return this instanceof s
            ? (
                (this.length = 0),
                (this.parent = void 0),
                "number" == typeof t
                  ? o(this, t)
                  : "string" == typeof t
                    ? a(this, t, arguments.length > 1 ? arguments[1] : "utf8")
                    : r(this, t)
              )
            : arguments.length > 1 ? new s(t, arguments[1]) : new s(t);
        }
        function o(t, e) {
          if (((t = d(t, 0 > e ? 0 : 0 | p(e))), !s.TYPED_ARRAY_SUPPORT))
            for (var i = 0; e > i; i++) t[i] = 0;
          return t;
        }
        function a(t, e, i) {
          ("string" != typeof i || "" === i) && (i = "utf8");
          var n = 0 | _(e, i);
          return (t = d(t, n)), t.write(e, i), t;
        }
        function r(t, e) {
          if (s.isBuffer(e)) return h(t, e);
          if (Y(e)) return c(t, e);
          if (null == e)
            throw new TypeError(
              "must start with number, buffer, array or string"
            );
          return "undefined" != typeof ArrayBuffer &&
          e.buffer instanceof ArrayBuffer
            ? u(t, e)
            : e.length ? l(t, e) : f(t, e);
        }
        function h(t, e) {
          var i = 0 | p(e.length);
          return (t = d(t, i)), e.copy(t, 0, 0, i), t;
        }
        function c(t, e) {
          var i = 0 | p(e.length);
          t = d(t, i);
          for (var n = 0; i > n; n += 1) t[n] = 255 & e[n];
          return t;
        }
        function u(t, e) {
          var i = 0 | p(e.length);
          t = d(t, i);
          for (var n = 0; i > n; n += 1) t[n] = 255 & e[n];
          return t;
        }
        function l(t, e) {
          var i = 0 | p(e.length);
          t = d(t, i);
          for (var n = 0; i > n; n += 1) t[n] = 255 & e[n];
          return t;
        }
        function f(t, e) {
          var i,
            n = 0;
          "Buffer" === e.type &&
            Y(e.data) &&
            ((i = e.data), (n = 0 | p(i.length))), (t = d(t, n));
          for (var s = 0; n > s; s += 1) t[s] = 255 & i[s];
          return t;
        }
        function d(t, e) {
          s.TYPED_ARRAY_SUPPORT
            ? (t = s._augment(new Uint8Array(e)))
            : ((t.length = e), (t._isBuffer = !0));
          var i = 0 !== e && e <= s.poolSize >>> 1;
          return i && (t.parent = X), t;
        }
        function p(t) {
          if (t >= n())
            throw new RangeError(
              "Attempt to allocate Buffer larger than maximum size: 0x" +
                n().toString(16) +
                " bytes"
            );
          return 0 | t;
        }
        function m(t, e) {
          if (!(this instanceof m)) return new m(t, e);
          var i = new s(t, e);
          return delete i.parent, i;
        }
        function _(t, e) {
          "string" != typeof t && (t = "" + t);
          var i = t.length;
          if (0 === i) return 0;
          for (var n = !1; ; )
            switch (e) {
              case "ascii":
              case "binary":
              case "raw":
              case "raws":
                return i;
              case "utf8":
              case "utf-8":
                return j(t).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * i;
              case "hex":
                return i >>> 1;
              case "base64":
                return F(t).length;
              default:
                if (n) return j(t).length;
                (e = ("" + e).toLowerCase()), (n = !0);
            }
        }
        function g(t, e, i) {
          var n = !1;
          if (
            (
              (e = 0 | e),
              (i = void 0 === i || i === 1 / 0 ? this.length : 0 | i),
              t || (t = "utf8"),
              0 > e && (e = 0),
              i > this.length && (i = this.length),
              e >= i
            )
          )
            return "";
          for (;;)
            switch (t) {
              case "hex":
                return A(this, e, i);
              case "utf8":
              case "utf-8":
                return E(this, e, i);
              case "ascii":
                return P(this, e, i);
              case "binary":
                return C(this, e, i);
              case "base64":
                return L(this, e, i);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return S(this, e, i);
              default:
                if (n) throw new TypeError("Unknown encoding: " + t);
                (t = (t + "").toLowerCase()), (n = !0);
            }
        }
        function y(t, e, i, n) {
          i = Number(i) || 0;
          var s = t.length - i;
          n ? ((n = Number(n)), n > s && (n = s)) : (n = s);
          var o = e.length;
          if (o % 2 !== 0) throw new Error("Invalid hex string");
          n > o / 2 && (n = o / 2);
          for (var a = 0; n > a; a++) {
            var r = parseInt(e.substr(2 * a, 2), 16);
            if (isNaN(r)) throw new Error("Invalid hex string");
            t[i + a] = r;
          }
          return a;
        }
        function v(t, e, i, n) {
          return G(j(e, t.length - i), t, i, n);
        }
        function b(t, e, i, n) {
          return G(Z(e), t, i, n);
        }
        function M(t, e, i, n) {
          return b(t, e, i, n);
        }
        function w(t, e, i, n) {
          return G(F(e), t, i, n);
        }
        function x(t, e, i, n) {
          return G(q(e, t.length - i), t, i, n);
        }
        function L(t, e, i) {
          return 0 === e && i === t.length
            ? W.fromByteArray(t)
            : W.fromByteArray(t.slice(e, i));
        }
        function E(t, e, i) {
          var n = "",
            s = "";
          i = Math.min(t.length, i);
          for (var o = e; i > o; o++)
            t[o] <= 127
              ? ((n += H(s) + String.fromCharCode(t[o])), (s = ""))
              : (s += "%" + t[o].toString(16));
          return n + H(s);
        }
        function P(t, e, i) {
          var n = "";
          i = Math.min(t.length, i);
          for (var s = e; i > s; s++) n += String.fromCharCode(127 & t[s]);
          return n;
        }
        function C(t, e, i) {
          var n = "";
          i = Math.min(t.length, i);
          for (var s = e; i > s; s++) n += String.fromCharCode(t[s]);
          return n;
        }
        function A(t, e, i) {
          var n = t.length;
          (!e || 0 > e) && (e = 0), (!i || 0 > i || i > n) && (i = n);
          for (var s = "", o = e; i > o; o++) s += R(t[o]);
          return s;
        }
        function S(t, e, i) {
          for (var n = t.slice(e, i), s = "", o = 0; o < n.length; o += 2)
            s += String.fromCharCode(n[o] + 256 * n[o + 1]);
          return s;
        }
        function T(t, e, i) {
          if (t % 1 !== 0 || 0 > t) throw new RangeError("offset is not uint");
          if (t + e > i)
            throw new RangeError("Trying to access beyond buffer length");
        }
        function I(t, e, i, n, o, a) {
          if (!s.isBuffer(t))
            throw new TypeError("buffer must be a Buffer instance");
          if (e > o || a > e) throw new RangeError("value is out of bounds");
          if (i + n > t.length) throw new RangeError("index out of range");
        }
        function D(t, e, i, n) {
          0 > e && (e = 65535 + e + 1);
          for (var s = 0, o = Math.min(t.length - i, 2); o > s; s++)
            t[i + s] =
              (e & (255 << (8 * (n ? s : 1 - s)))) >>> (8 * (n ? s : 1 - s));
        }
        function k(t, e, i, n) {
          0 > e && (e = 4294967295 + e + 1);
          for (var s = 0, o = Math.min(t.length - i, 4); o > s; s++)
            t[i + s] = (e >>> (8 * (n ? s : 3 - s))) & 255;
        }
        function U(t, e, i, n, s, o) {
          if (e > s || o > e) throw new RangeError("value is out of bounds");
          if (i + n > t.length) throw new RangeError("index out of range");
          if (0 > i) throw new RangeError("index out of range");
        }
        function B(t, e, i, n, s) {
          return s ||
            U(
              t,
              e,
              i,
              4,
              3.4028234663852886e38,
              -3.4028234663852886e38
            ), V.write(t, e, i, n, 23, 4), i + 4;
        }
        function N(t, e, i, n, s) {
          return s ||
            U(
              t,
              e,
              i,
              8,
              1.7976931348623157e308,
              -1.7976931348623157e308
            ), V.write(t, e, i, n, 52, 8), i + 8;
        }
        function O(t) {
          if (((t = z(t).replace(K, "")), t.length < 2)) return "";
          for (; t.length % 4 !== 0; ) t += "=";
          return t;
        }
        function z(t) {
          return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
        }
        function R(t) {
          return 16 > t ? "0" + t.toString(16) : t.toString(16);
        }
        function j(t, e) {
          e = e || 1 / 0;
          for (var i, n = t.length, s = null, o = [], a = 0; n > a; a++) {
            if (((i = t.charCodeAt(a)), i > 55295 && 57344 > i)) {
              if (!s) {
                if (i > 56319) {
                  (e -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                if (a + 1 === n) {
                  (e -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                s = i;
                continue;
              }
              if (56320 > i) {
                (e -= 3) > -1 && o.push(239, 191, 189), (s = i);
                continue;
              }
              (i = ((s - 55296) << 10) | (i - 56320) | 65536), (s = null);
            } else s && ((e -= 3) > -1 && o.push(239, 191, 189), (s = null));
            if (128 > i) {
              if ((e -= 1) < 0) break;
              o.push(i);
            } else if (2048 > i) {
              if ((e -= 2) < 0) break;
              o.push((i >> 6) | 192, (63 & i) | 128);
            } else if (65536 > i) {
              if ((e -= 3) < 0) break;
              o.push((i >> 12) | 224, ((i >> 6) & 63) | 128, (63 & i) | 128);
            } else {
              if (!(2097152 > i)) throw new Error("Invalid code point");
              if ((e -= 4) < 0) break;
              o.push(
                (i >> 18) | 240,
                ((i >> 12) & 63) | 128,
                ((i >> 6) & 63) | 128,
                (63 & i) | 128
              );
            }
          }
          return o;
        }
        function Z(t) {
          for (var e = [], i = 0; i < t.length; i++)
            e.push(255 & t.charCodeAt(i));
          return e;
        }
        function q(t, e) {
          for (var i, n, s, o = [], a = 0; a < t.length && !((e -= 2) < 0); a++)
            (i = t.charCodeAt(a)), (n = i >> 8), (s = i % 256), o.push(
              s
            ), o.push(n);
          return o;
        }
        function F(t) {
          return W.toByteArray(O(t));
        }
        function G(t, e, i, n) {
          for (var s = 0; n > s && !(s + i >= e.length || s >= t.length); s++)
            e[s + i] = t[s];
          return s;
        }
        function H(t) {
          try {
            return decodeURIComponent(t);
          } catch (e) {
            return String.fromCharCode(65533);
          }
        }
        var W = t("base64-js"),
          V = t("ieee754"),
          Y = t("is-array");
        (i.Buffer = s), (i.SlowBuffer = m), (i.INSPECT_MAX_BYTES = 50), (s.poolSize = 8192);
        var X = {};
        (s.TYPED_ARRAY_SUPPORT = (function() {
          function t() {}
          try {
            var e = new ArrayBuffer(0),
              i = new Uint8Array(e);
            return (i.foo = function() {
              return 42;
            }), (i.constructor = t), 42 === i.foo() &&
              i.constructor === t &&
              "function" == typeof i.subarray &&
              0 === new Uint8Array(1).subarray(1, 1).byteLength;
          } catch (n) {
            return !1;
          }
        })()), (s.isBuffer = function(t) {
          return !(null == t || !t._isBuffer);
        }), (s.compare = function(t, e) {
          if (!s.isBuffer(t) || !s.isBuffer(e))
            throw new TypeError("Arguments must be Buffers");
          if (t === e) return 0;
          for (
            var i = t.length, n = e.length, o = 0, a = Math.min(i, n);
            a > o && t[o] === e[o];

          )
            ++o;
          return o !== a && ((i = t[o]), (n = e[o])), n > i
            ? -1
            : i > n ? 1 : 0;
        }), (s.isEncoding = function(t) {
          switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "raw":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }), (s.concat = function(t, e) {
          if (!Y(t))
            throw new TypeError("list argument must be an Array of Buffers.");
          if (0 === t.length) return new s(0);
          if (1 === t.length) return t[0];
          var i;
          if (void 0 === e)
            for (e = 0, i = 0; i < t.length; i++) e += t[i].length;
          var n = new s(e),
            o = 0;
          for (i = 0; i < t.length; i++) {
            var a = t[i];
            a.copy(n, o), (o += a.length);
          }
          return n;
        }), (s.byteLength = _), (s.prototype.length = void 0), (s.prototype.parent = void 0), (s.prototype.toString = function() {
          var t = 0 | this.length;
          return 0 === t
            ? ""
            : 0 === arguments.length ? E(this, 0, t) : g.apply(this, arguments);
        }), (s.prototype.equals = function(t) {
          if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          return this === t ? !0 : 0 === s.compare(this, t);
        }), (s.prototype.inspect = function() {
          var t = "",
            e = i.INSPECT_MAX_BYTES;
          return this.length > 0 &&
            (
              (t = this.toString("hex", 0, e).match(/.{2}/g).join(" ")),
              this.length > e && (t += " ... ")
            ), "<Buffer " + t + ">";
        }), (s.prototype.compare = function(t) {
          if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          return this === t ? 0 : s.compare(this, t);
        }), (s.prototype.indexOf = function(t, e) {
          function i(t, e, i) {
            for (var n = -1, s = 0; i + s < t.length; s++)
              if (t[i + s] === e[-1 === n ? 0 : s - n]) {
                if ((-1 === n && (n = s), s - n + 1 === e.length)) return i + n;
              } else n = -1;
            return -1;
          }
          if (
            (
              e > 2147483647
                ? (e = 2147483647)
                : -2147483648 > e && (e = -2147483648),
              (e >>= 0),
              0 === this.length
            )
          )
            return -1;
          if (e >= this.length) return -1;
          if (
            (0 > e && (e = Math.max(this.length + e, 0)), "string" == typeof t)
          )
            return 0 === t.length
              ? -1
              : String.prototype.indexOf.call(this, t, e);
          if (s.isBuffer(t)) return i(this, t, e);
          if ("number" == typeof t)
            return s.TYPED_ARRAY_SUPPORT &&
            "function" === Uint8Array.prototype.indexOf
              ? Uint8Array.prototype.indexOf.call(this, t, e)
              : i(this, [t], e);
          throw new TypeError("val must be string, number or Buffer");
        }), (s.prototype.get = function(t) {
          return console.log(
            ".get() is deprecated. Access using array indexes instead."
          ), this.readUInt8(t);
        }), (s.prototype.set = function(t, e) {
          return console.log(
            ".set() is deprecated. Access using array indexes instead."
          ), this.writeUInt8(t, e);
        }), (s.prototype.write = function(t, e, i, n) {
          if (void 0 === e) (n = "utf8"), (i = this.length), (e = 0);
          else if (void 0 === i && "string" == typeof e)
            (n = e), (i = this.length), (e = 0);
          else if (isFinite(e))
            (e = 0 | e), isFinite(i)
              ? ((i = 0 | i), void 0 === n && (n = "utf8"))
              : ((n = i), (i = void 0));
          else {
            var s = n;
            (n = e), (e = 0 | i), (i = s);
          }
          var o = this.length - e;
          if (
            (
              (void 0 === i || i > o) && (i = o),
              (t.length > 0 && (0 > i || 0 > e)) || e > this.length
            )
          )
            throw new RangeError("attempt to write outside buffer bounds");
          n || (n = "utf8");
          for (var a = !1; ; )
            switch (n) {
              case "hex":
                return y(this, t, e, i);
              case "utf8":
              case "utf-8":
                return v(this, t, e, i);
              case "ascii":
                return b(this, t, e, i);
              case "binary":
                return M(this, t, e, i);
              case "base64":
                return w(this, t, e, i);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return x(this, t, e, i);
              default:
                if (a) throw new TypeError("Unknown encoding: " + n);
                (n = ("" + n).toLowerCase()), (a = !0);
            }
        }), (s.prototype.toJSON = function() {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
          };
        }), (s.prototype.slice = function(t, e) {
          var i = this.length;
          (t = ~~t), (e = void 0 === e ? i : ~~e), 0 > t
            ? ((t += i), 0 > t && (t = 0))
            : t > i && (t = i), 0 > e
            ? ((e += i), 0 > e && (e = 0))
            : e > i && (e = i), t > e && (e = t);
          var n;
          if (s.TYPED_ARRAY_SUPPORT) n = s._augment(this.subarray(t, e));
          else {
            var o = e - t;
            n = new s(o, void 0);
            for (var a = 0; o > a; a++) n[a] = this[a + t];
          }
          return n.length && (n.parent = this.parent || this), n;
        }), (s.prototype.readUIntLE = function(t, e, i) {
          (t = 0 | t), (e = 0 | e), i || T(t, e, this.length);
          for (var n = this[t], s = 1, o = 0; ++o < e && (s *= 256); )
            n += this[t + o] * s;
          return n;
        }), (s.prototype.readUIntBE = function(t, e, i) {
          (t = 0 | t), (e = 0 | e), i || T(t, e, this.length);
          for (var n = this[t + --e], s = 1; e > 0 && (s *= 256); )
            n += this[t + --e] * s;
          return n;
        }), (s.prototype.readUInt8 = function(t, e) {
          return e || T(t, 1, this.length), this[t];
        }), (s.prototype.readUInt16LE = function(t, e) {
          return e || T(t, 2, this.length), this[t] | (this[t + 1] << 8);
        }), (s.prototype.readUInt16BE = function(t, e) {
          return e || T(t, 2, this.length), (this[t] << 8) | this[t + 1];
        }), (s.prototype.readUInt32LE = function(t, e) {
          return e || T(t, 4, this.length), (this[t] |
            (this[t + 1] << 8) |
            (this[t + 2] << 16)) +
            16777216 * this[t + 3];
        }), (s.prototype.readUInt32BE = function(t, e) {
          return e || T(t, 4, this.length), 16777216 * this[t] +
            ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]);
        }), (s.prototype.readIntLE = function(t, e, i) {
          (t = 0 | t), (e = 0 | e), i || T(t, e, this.length);
          for (var n = this[t], s = 1, o = 0; ++o < e && (s *= 256); )
            n += this[t + o] * s;
          return (s *= 128), n >= s && (n -= Math.pow(2, 8 * e)), n;
        }), (s.prototype.readIntBE = function(t, e, i) {
          (t = 0 | t), (e = 0 | e), i || T(t, e, this.length);
          for (var n = e, s = 1, o = this[t + --n]; n > 0 && (s *= 256); )
            o += this[t + --n] * s;
          return (s *= 128), o >= s && (o -= Math.pow(2, 8 * e)), o;
        }), (s.prototype.readInt8 = function(t, e) {
          return e || T(t, 1, this.length), 128 & this[t]
            ? -1 * (255 - this[t] + 1)
            : this[t];
        }), (s.prototype.readInt16LE = function(t, e) {
          e || T(t, 2, this.length);
          var i = this[t] | (this[t + 1] << 8);
          return 32768 & i ? 4294901760 | i : i;
        }), (s.prototype.readInt16BE = function(t, e) {
          e || T(t, 2, this.length);
          var i = this[t + 1] | (this[t] << 8);
          return 32768 & i ? 4294901760 | i : i;
        }), (s.prototype.readInt32LE = function(t, e) {
          return e || T(t, 4, this.length), this[t] |
            (this[t + 1] << 8) |
            (this[t + 2] << 16) |
            (this[t + 3] << 24);
        }), (s.prototype.readInt32BE = function(t, e) {
          return e || T(t, 4, this.length), (this[t] << 24) |
            (this[t + 1] << 16) |
            (this[t + 2] << 8) |
            this[t + 3];
        }), (s.prototype.readFloatLE = function(t, e) {
          return e || T(t, 4, this.length), V.read(this, t, !0, 23, 4);
        }), (s.prototype.readFloatBE = function(t, e) {
          return e || T(t, 4, this.length), V.read(this, t, !1, 23, 4);
        }), (s.prototype.readDoubleLE = function(t, e) {
          return e || T(t, 8, this.length), V.read(this, t, !0, 52, 8);
        }), (s.prototype.readDoubleBE = function(t, e) {
          return e || T(t, 8, this.length), V.read(this, t, !1, 52, 8);
        }), (s.prototype.writeUIntLE = function(t, e, i, n) {
          (t = +t), (e = 0 | e), (i = 0 | i), n ||
            I(this, t, e, i, Math.pow(2, 8 * i), 0);
          var s = 1,
            o = 0;
          for (this[e] = 255 & t; ++o < i && (s *= 256); )
            this[e + o] = (t / s) & 255;
          return e + i;
        }), (s.prototype.writeUIntBE = function(t, e, i, n) {
          (t = +t), (e = 0 | e), (i = 0 | i), n ||
            I(this, t, e, i, Math.pow(2, 8 * i), 0);
          var s = i - 1,
            o = 1;
          for (this[e + s] = 255 & t; --s >= 0 && (o *= 256); )
            this[e + s] = (t / o) & 255;
          return e + i;
        }), (s.prototype.writeUInt8 = function(t, e, i) {
          return (t = +t), (e = 0 | e), i ||
            I(this, t, e, 1, 255, 0), s.TYPED_ARRAY_SUPPORT ||
            (t = Math.floor(t)), (this[e] = t), e + 1;
        }), (s.prototype.writeUInt16LE = function(t, e, i) {
          return (t = +t), (e = 0 | e), i ||
            I(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT
            ? ((this[e] = t), (this[e + 1] = t >>> 8))
            : D(this, t, e, !0), e + 2;
        }), (s.prototype.writeUInt16BE = function(t, e, i) {
          return (t = +t), (e = 0 | e), i ||
            I(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT
            ? ((this[e] = t >>> 8), (this[e + 1] = t))
            : D(this, t, e, !1), e + 2;
        }), (s.prototype.writeUInt32LE = function(t, e, i) {
          return (t = +t), (e = 0 | e), i ||
            I(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT
            ? (
                (this[e + 3] = t >>> 24),
                (this[e + 2] = t >>> 16),
                (this[e + 1] = t >>> 8),
                (this[e] = t)
              )
            : k(this, t, e, !0), e + 4;
        }), (s.prototype.writeUInt32BE = function(t, e, i) {
          return (t = +t), (e = 0 | e), i ||
            I(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT
            ? (
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = t)
              )
            : k(this, t, e, !1), e + 4;
        }), (s.prototype.writeIntLE = function(t, e, i, n) {
          if (((t = +t), (e = 0 | e), !n)) {
            var s = Math.pow(2, 8 * i - 1);
            I(this, t, e, i, s - 1, -s);
          }
          var o = 0,
            a = 1,
            r = 0 > t ? 1 : 0;
          for (this[e] = 255 & t; ++o < i && (a *= 256); )
            this[e + o] = (((t / a) >> 0) - r) & 255;
          return e + i;
        }), (s.prototype.writeIntBE = function(t, e, i, n) {
          if (((t = +t), (e = 0 | e), !n)) {
            var s = Math.pow(2, 8 * i - 1);
            I(this, t, e, i, s - 1, -s);
          }
          var o = i - 1,
            a = 1,
            r = 0 > t ? 1 : 0;
          for (this[e + o] = 255 & t; --o >= 0 && (a *= 256); )
            this[e + o] = (((t / a) >> 0) - r) & 255;
          return e + i;
        }), (s.prototype.writeInt8 = function(t, e, i) {
          return (t = +t), (e = 0 | e), i ||
            I(this, t, e, 1, 127, -128), s.TYPED_ARRAY_SUPPORT ||
            (t = Math.floor(t)), 0 > t && (t = 255 + t + 1), (this[e] = t), e +
            1;
        }), (s.prototype.writeInt16LE = function(t, e, i) {
          return (t = +t), (e = 0 | e), i ||
            I(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT
            ? ((this[e] = t), (this[e + 1] = t >>> 8))
            : D(this, t, e, !0), e + 2;
        }), (s.prototype.writeInt16BE = function(t, e, i) {
          return (t = +t), (e = 0 | e), i ||
            I(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT
            ? ((this[e] = t >>> 8), (this[e + 1] = t))
            : D(this, t, e, !1), e + 2;
        }), (s.prototype.writeInt32LE = function(t, e, i) {
          return (t = +t), (e = 0 | e), i ||
            I(this, t, e, 4, 2147483647, -2147483648), s.TYPED_ARRAY_SUPPORT
            ? (
                (this[e] = t),
                (this[e + 1] = t >>> 8),
                (this[e + 2] = t >>> 16),
                (this[e + 3] = t >>> 24)
              )
            : k(this, t, e, !0), e + 4;
        }), (s.prototype.writeInt32BE = function(t, e, i) {
          return (t = +t), (e = 0 | e), i ||
            I(this, t, e, 4, 2147483647, -2147483648), 0 > t &&
            (t = 4294967295 + t + 1), s.TYPED_ARRAY_SUPPORT
            ? (
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = t)
              )
            : k(this, t, e, !1), e + 4;
        }), (s.prototype.writeFloatLE = function(t, e, i) {
          return B(this, t, e, !0, i);
        }), (s.prototype.writeFloatBE = function(t, e, i) {
          return B(this, t, e, !1, i);
        }), (s.prototype.writeDoubleLE = function(t, e, i) {
          return N(this, t, e, !0, i);
        }), (s.prototype.writeDoubleBE = function(t, e, i) {
          return N(this, t, e, !1, i);
        }), (s.prototype.copy = function(t, e, i, n) {
          if (
            (
              i || (i = 0),
              n || 0 === n || (n = this.length),
              e >= t.length && (e = t.length),
              e || (e = 0),
              n > 0 && i > n && (n = i),
              n === i
            )
          )
            return 0;
          if (0 === t.length || 0 === this.length) return 0;
          if (0 > e) throw new RangeError("targetStart out of bounds");
          if (0 > i || i >= this.length)
            throw new RangeError("sourceStart out of bounds");
          if (0 > n) throw new RangeError("sourceEnd out of bounds");
          n > this.length && (n = this.length), t.length - e < n - i &&
            (n = t.length - e + i);
          var o = n - i;
          if (1e3 > o || !s.TYPED_ARRAY_SUPPORT)
            for (var a = 0; o > a; a++) t[a + e] = this[a + i];
          else t._set(this.subarray(i, i + o), e);
          return o;
        }), (s.prototype.fill = function(t, e, i) {
          if ((t || (t = 0), e || (e = 0), i || (i = this.length), e > i))
            throw new RangeError("end < start");
          if (i !== e && 0 !== this.length) {
            if (0 > e || e >= this.length)
              throw new RangeError("start out of bounds");
            if (0 > i || i > this.length)
              throw new RangeError("end out of bounds");
            var n;
            if ("number" == typeof t) for (n = e; i > n; n++) this[n] = t;
            else {
              var s = j(t.toString()),
                o = s.length;
              for (n = e; i > n; n++) this[n] = s[n % o];
            }
            return this;
          }
        }), (s.prototype.toArrayBuffer = function() {
          if ("undefined" != typeof Uint8Array) {
            if (s.TYPED_ARRAY_SUPPORT) return new s(this).buffer;
            for (
              var t = new Uint8Array(this.length), e = 0, i = t.length;
              i > e;
              e += 1
            )
              t[e] = this[e];
            return t.buffer;
          }
          throw new TypeError(
            "Buffer.toArrayBuffer not supported in this browser"
          );
        });
        var J = s.prototype;
        s._augment = function(t) {
          return (t.constructor = s), (t._isBuffer = !0), (t._set =
            t.set), (t.get = J.get), (t.set = J.set), (t.write =
            J.write), (t.toString = J.toString), (t.toLocaleString =
            J.toString), (t.toJSON = J.toJSON), (t.equals =
            J.equals), (t.compare = J.compare), (t.indexOf =
            J.indexOf), (t.copy = J.copy), (t.slice = J.slice), (t.readUIntLE =
            J.readUIntLE), (t.readUIntBE = J.readUIntBE), (t.readUInt8 =
            J.readUInt8), (t.readUInt16LE = J.readUInt16LE), (t.readUInt16BE =
            J.readUInt16BE), (t.readUInt32LE =
            J.readUInt32LE), (t.readUInt32BE = J.readUInt32BE), (t.readIntLE =
            J.readIntLE), (t.readIntBE = J.readIntBE), (t.readInt8 =
            J.readInt8), (t.readInt16LE = J.readInt16LE), (t.readInt16BE =
            J.readInt16BE), (t.readInt32LE = J.readInt32LE), (t.readInt32BE =
            J.readInt32BE), (t.readFloatLE = J.readFloatLE), (t.readFloatBE =
            J.readFloatBE), (t.readDoubleLE = J.readDoubleLE), (t.readDoubleBE =
            J.readDoubleBE), (t.writeUInt8 = J.writeUInt8), (t.writeUIntLE =
            J.writeUIntLE), (t.writeUIntBE = J.writeUIntBE), (t.writeUInt16LE =
            J.writeUInt16LE), (t.writeUInt16BE =
            J.writeUInt16BE), (t.writeUInt32LE =
            J.writeUInt32LE), (t.writeUInt32BE =
            J.writeUInt32BE), (t.writeIntLE = J.writeIntLE), (t.writeIntBE =
            J.writeIntBE), (t.writeInt8 = J.writeInt8), (t.writeInt16LE =
            J.writeInt16LE), (t.writeInt16BE =
            J.writeInt16BE), (t.writeInt32LE =
            J.writeInt32LE), (t.writeInt32BE =
            J.writeInt32BE), (t.writeFloatLE =
            J.writeFloatLE), (t.writeFloatBE =
            J.writeFloatBE), (t.writeDoubleLE =
            J.writeDoubleLE), (t.writeDoubleBE = J.writeDoubleBE), (t.fill =
            J.fill), (t.inspect = J.inspect), (t.toArrayBuffer =
            J.toArrayBuffer), t;
        };
        var K = /[^+\/0-9A-z\-]/g;
      },
      { "base64-js": 16, ieee754: 17, "is-array": 18 }
    ],
    16: [
      function(t, e, i) {
        var n =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        !(function(t) {
          "use strict";
          function e(t) {
            var e = t.charCodeAt(0);
            return e === a || e === l
              ? 62
              : e === r || e === f
                ? 63
                : h > e
                  ? -1
                  : h + 10 > e
                    ? e - h + 26 + 26
                    : u + 26 > e ? e - u : c + 26 > e ? e - c + 26 : void 0;
          }
          function i(t) {
            function i(t) {
              c[l++] = t;
            }
            var n, s, a, r, h, c;
            if (t.length % 4 > 0)
              throw new Error("Invalid string. Length must be a multiple of 4");
            var u = t.length;
            (h =
              "=" === t.charAt(u - 2)
                ? 2
                : "=" === t.charAt(u - 1) ? 1 : 0), (c = new o(
              3 * t.length / 4 - h
            )), (a = h > 0 ? t.length - 4 : t.length);
            var l = 0;
            for (n = 0, s = 0; a > n; n += 4, s += 3)
              (r =
                (e(t.charAt(n)) << 18) |
                (e(t.charAt(n + 1)) << 12) |
                (e(t.charAt(n + 2)) << 6) |
                e(t.charAt(n + 3))), i((16711680 & r) >> 16), i(
                (65280 & r) >> 8
              ), i(255 & r);
            return 2 === h
              ? (
                  (r = (e(t.charAt(n)) << 2) | (e(t.charAt(n + 1)) >> 4)),
                  i(255 & r)
                )
              : 1 === h &&
                (
                  (r =
                    (e(t.charAt(n)) << 10) |
                    (e(t.charAt(n + 1)) << 4) |
                    (e(t.charAt(n + 2)) >> 2)),
                  i((r >> 8) & 255),
                  i(255 & r)
                ), c;
          }
          function s(t) {
            function e(t) {
              return n.charAt(t);
            }
            function i(t) {
              return (
                e((t >> 18) & 63) +
                e((t >> 12) & 63) +
                e((t >> 6) & 63) +
                e(63 & t)
              );
            }
            var s,
              o,
              a,
              r = t.length % 3,
              h = "";
            for (s = 0, a = t.length - r; a > s; s += 3)
              (o = (t[s] << 16) + (t[s + 1] << 8) + t[s + 2]), (h += i(o));
            switch (r) {
              case 1:
                (o = t[t.length - 1]), (h += e(o >> 2)), (h += e(
                  (o << 4) & 63
                )), (h += "==");
                break;
              case 2:
                (o = (t[t.length - 2] << 8) + t[t.length - 1]), (h += e(
                  o >> 10
                )), (h += e((o >> 4) & 63)), (h += e((o << 2) & 63)), (h +=
                  "=");
            }
            return h;
          }
          var o = "undefined" != typeof Uint8Array ? Uint8Array : Array,
            a = "+".charCodeAt(0),
            r = "/".charCodeAt(0),
            h = "0".charCodeAt(0),
            c = "a".charCodeAt(0),
            u = "A".charCodeAt(0),
            l = "-".charCodeAt(0),
            f = "_".charCodeAt(0);
          (t.toByteArray = i), (t.fromByteArray = s);
        })("undefined" == typeof i ? (this.base64js = {}) : i);
      },
      {}
    ],
    17: [
      function(t, e, i) {
        (i.read = function(t, e, i, n, s) {
          var o,
            a,
            r = 8 * s - n - 1,
            h = (1 << r) - 1,
            c = h >> 1,
            u = -7,
            l = i ? s - 1 : 0,
            f = i ? -1 : 1,
            d = t[e + l];
          for (
            l += f, o = d & ((1 << -u) - 1), d >>= -u, u += r;
            u > 0;
            o = 256 * o + t[e + l], l += f, u -= 8
          );
          for (
            a = o & ((1 << -u) - 1), o >>= -u, u += n;
            u > 0;
            a = 256 * a + t[e + l], l += f, u -= 8
          );
          if (0 === o) o = 1 - c;
          else {
            if (o === h) return a ? NaN : (d ? -1 : 1) * (1 / 0);
            (a += Math.pow(2, n)), (o -= c);
          }
          return (d ? -1 : 1) * a * Math.pow(2, o - n);
        }), (i.write = function(t, e, i, n, s, o) {
          var a,
            r,
            h,
            c = 8 * o - s - 1,
            u = (1 << c) - 1,
            l = u >> 1,
            f = 23 === s ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            d = n ? 0 : o - 1,
            p = n ? 1 : -1,
            m = 0 > e || (0 === e && 0 > 1 / e) ? 1 : 0;
          for (
            e = Math.abs(e), isNaN(e) || e === 1 / 0
              ? ((r = isNaN(e) ? 1 : 0), (a = u))
              : (
                  (a = Math.floor(Math.log(e) / Math.LN2)),
                  e * (h = Math.pow(2, -a)) < 1 && (a--, (h *= 2)),
                  (e += a + l >= 1 ? f / h : f * Math.pow(2, 1 - l)),
                  e * h >= 2 && (a++, (h /= 2)),
                  a + l >= u
                    ? ((r = 0), (a = u))
                    : a + l >= 1
                      ? ((r = (e * h - 1) * Math.pow(2, s)), (a += l))
                      : ((r = e * Math.pow(2, l - 1) * Math.pow(2, s)), (a = 0))
                );
            s >= 8;
            t[i + d] = 255 & r, d += p, r /= 256, s -= 8
          );
          for (
            a = (a << s) | r, c += s;
            c > 0;
            t[i + d] = 255 & a, d += p, a /= 256, c -= 8
          );
          t[i + d - p] |= 128 * m;
        });
      },
      {}
    ],
    18: [
      function(t, e, i) {
        var n = Array.isArray,
          s = Object.prototype.toString;
        e.exports =
          n ||
          function(t) {
            return !!t && "[object Array]" == s.call(t);
          };
      },
      {}
    ],
    19: [
      function(t, e, i) {
        function n() {
          (u = !1), r.length ? (c = r.concat(c)) : (l = -1), c.length && s();
        }
        function s() {
          if (!u) {
            var t = setTimeout(n);
            u = !0;
            for (var e = c.length; e; ) {
              for (r = c, c = []; ++l < e; ) r[l].run();
              (l = -1), (e = c.length);
            }
            (r = null), (u = !1), clearTimeout(t);
          }
        }
        function o(t, e) {
          (this.fun = t), (this.array = e);
        }
        function a() {}
        var r,
          h = (e.exports = {}),
          c = [],
          u = !1,
          l = -1;
        (h.nextTick = function(t) {
          var e = new Array(arguments.length - 1);
          if (arguments.length > 1)
            for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
          c.push(new o(t, e)), 1 !== c.length || u || setTimeout(s, 0);
        }), (o.prototype.run = function() {
          this.fun.apply(null, this.array);
        }), (h.title =
          "browser"), (h.browser = !0), (h.env = {}), (h.argv = []), (h.version =
          ""), (h.versions = {}), (h.on = a), (h.addListener = a), (h.once = a), (h.off = a), (h.removeListener = a), (h.removeAllListeners = a), (h.emit = a), (h.binding = function(
          t
        ) {
          throw new Error("process.binding is not supported");
        }), (h.cwd = function() {
          return "/";
        }), (h.chdir = function(t) {
          throw new Error("process.chdir is not supported");
        }), (h.umask = function() {
          return 0;
        });
      },
      {}
    ],
    20: [
      function(t, e, i) {
        var n =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        (i.encode = function(t, e) {
          for (var i, s, o, a, r, h, c, u = "", l = 0; l < t.length; )
            (i = t.charCodeAt(l++)), (s = t.charCodeAt(l++)), (o = t.charCodeAt(
              l++
            )), (a = i >> 2), (r = ((3 & i) << 4) | (s >> 4)), (h =
              ((15 & s) << 2) | (o >> 6)), (c = 63 & o), isNaN(s)
              ? (h = c = 64)
              : isNaN(o) && (c = 64), (u =
              u + n.charAt(a) + n.charAt(r) + n.charAt(h) + n.charAt(c));
          return u;
        }), (i.decode = function(t, e) {
          var i,
            s,
            o,
            a,
            r,
            h,
            c,
            u = "",
            l = 0;
          for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < t.length; )
            (a = n.indexOf(t.charAt(l++))), (r = n.indexOf(
              t.charAt(l++)
            )), (h = n.indexOf(t.charAt(l++))), (c = n.indexOf(
              t.charAt(l++)
            )), (i = (a << 2) | (r >> 4)), (s =
              ((15 & r) << 4) | (h >> 2)), (o =
              ((3 & h) << 6) | c), (u += String.fromCharCode(i)), 64 != h &&
              (u += String.fromCharCode(s)), 64 != c &&
              (u += String.fromCharCode(o));
          return u;
        });
      },
      {}
    ],
    21: [
      function(t, e, i) {
        function n() {
          (this.compressedSize = 0), (this.uncompressedSize = 0), (this.crc32 = 0), (this.compressionMethod = null), (this.compressedContent = null);
        }
        (n.prototype = {
          getContent: function() {
            return null;
          },
          getCompressedContent: function() {
            return null;
          }
        }), (e.exports = n);
      },
      {}
    ],
    22: [
      function(t, e, i) {
        (i.STORE = {
          magic: "\x00\x00",
          compress: function(t) {
            return t;
          },
          uncompress: function(t) {
            return t;
          },
          compressInputType: null,
          uncompressInputType: null
        }), (i.DEFLATE = t("./flate"));
      },
      { "./flate": 26 }
    ],
    23: [
      function(t, e, i) {
        function n(t) {
          (this.data = null), (this.length = 0), (this.index = 0);
        }
        var s = t("./utils");
        (n.prototype = {
          checkOffset: function(t) {
            this.checkIndex(this.index + t);
          },
          checkIndex: function(t) {
            if (this.length < t || 0 > t)
              throw new Error(
                "End of data reached (data length = " +
                  this.length +
                  ", asked index = " +
                  t +
                  "). Corrupted zip ?"
              );
          },
          setIndex: function(t) {
            this.checkIndex(t), (this.index = t);
          },
          skip: function(t) {
            this.setIndex(this.index + t);
          },
          byteAt: function(t) {},
          readInt: function(t) {
            var e,
              i = 0;
            for (
              this.checkOffset(t), e = this.index + t - 1;
              e >= this.index;
              e--
            )
              i = (i << 8) + this.byteAt(e);
            return (this.index += t), i;
          },
          readString: function(t) {
            return s.transformTo("string", this.readData(t));
          },
          readData: function(t) {},
          lastIndexOfSignature: function(t) {},
          readDate: function() {
            var t = this.readInt(4);
            return new Date(
              ((t >> 25) & 127) + 1980,
              ((t >> 21) & 15) - 1,
              (t >> 16) & 31,
              (t >> 11) & 31,
              (t >> 5) & 63,
              (31 & t) << 1
            );
          }
        }), (e.exports = n);
      },
      { "./utils": 36 }
    ],
    24: [
      function(t, e, i) {
        (i.base64 = !1), (i.binary = !1), (i.dir = !1), (i.date = null), (i.compression = null);
      },
      {}
    ],
    25: [
      function(t, e, i) {
        var n = {};
        (function() {
          (function() {
            "use strict";
            function t(t, e) {
              var i = t.split("."),
                n = d;
              !(i[0] in n) && n.execScript && n.execScript("var " + i[0]);
              for (var s; i.length && (s = i.shift()); )
                i.length || e === l
                  ? (n = n[s] ? n[s] : (n[s] = {}))
                  : (n[s] = e);
            }
            function e(t, e) {
              if (
                (
                  (this.index = "number" == typeof e ? e : 0),
                  (this.d = 0),
                  (this.buffer =
                    t instanceof (p ? Uint8Array : Array)
                      ? t
                      : new (p ? Uint8Array : Array)(32768)),
                  2 * this.buffer.length <= this.index
                )
              )
                throw Error("invalid index");
              this.buffer.length <= this.index && i(this);
            }
            function i(t) {
              var e,
                i = t.buffer,
                n = i.length,
                s = new (p ? Uint8Array : Array)(n << 1);
              if (p) s.set(i);
              else for (e = 0; n > e; ++e) s[e] = i[e];
              return (t.buffer = s);
            }
            function n(t) {
              (this.buffer = new (p ? Uint16Array : Array)(
                2 * t
              )), (this.length = 0);
            }
            function s(t, e) {
              (this.e = w), (this.f = 0), (this.input =
                p && t instanceof Array
                  ? new Uint8Array(t)
                  : t), (this.c = 0), e &&
                (
                  e.lazy && (this.f = e.lazy),
                  "number" == typeof e.compressionType &&
                    (this.e = e.compressionType),
                  e.outputBuffer &&
                    (this.b =
                      p && e.outputBuffer instanceof Array
                        ? new Uint8Array(e.outputBuffer)
                        : e.outputBuffer),
                  "number" == typeof e.outputIndex && (this.c = e.outputIndex)
                ), this.b || (this.b = new (p ? Uint8Array : Array)(32768));
            }
            function o(t, e) {
              (this.length = t), (this.g = e);
            }
            function a(t, e) {
              function i(t, e) {
                var i,
                  n = t.g,
                  s = [],
                  o = 0;
                (i = E[t.length]), (s[o++] = 65535 & i), (s[o++] =
                  (i >> 16) & 255), (s[o++] = i >> 24);
                var a;
                switch (f) {
                  case 1 === n:
                    a = [0, n - 1, 0];
                    break;
                  case 2 === n:
                    a = [1, n - 2, 0];
                    break;
                  case 3 === n:
                    a = [2, n - 3, 0];
                    break;
                  case 4 === n:
                    a = [3, n - 4, 0];
                    break;
                  case 6 >= n:
                    a = [4, n - 5, 1];
                    break;
                  case 8 >= n:
                    a = [5, n - 7, 1];
                    break;
                  case 12 >= n:
                    a = [6, n - 9, 2];
                    break;
                  case 16 >= n:
                    a = [7, n - 13, 2];
                    break;
                  case 24 >= n:
                    a = [8, n - 17, 3];
                    break;
                  case 32 >= n:
                    a = [9, n - 25, 3];
                    break;
                  case 48 >= n:
                    a = [10, n - 33, 4];
                    break;
                  case 64 >= n:
                    a = [11, n - 49, 4];
                    break;
                  case 96 >= n:
                    a = [12, n - 65, 5];
                    break;
                  case 128 >= n:
                    a = [13, n - 97, 5];
                    break;
                  case 192 >= n:
                    a = [14, n - 129, 6];
                    break;
                  case 256 >= n:
                    a = [15, n - 193, 6];
                    break;
                  case 384 >= n:
                    a = [16, n - 257, 7];
                    break;
                  case 512 >= n:
                    a = [17, n - 385, 7];
                    break;
                  case 768 >= n:
                    a = [18, n - 513, 8];
                    break;
                  case 1024 >= n:
                    a = [19, n - 769, 8];
                    break;
                  case 1536 >= n:
                    a = [20, n - 1025, 9];
                    break;
                  case 2048 >= n:
                    a = [21, n - 1537, 9];
                    break;
                  case 3072 >= n:
                    a = [22, n - 2049, 10];
                    break;
                  case 4096 >= n:
                    a = [23, n - 3073, 10];
                    break;
                  case 6144 >= n:
                    a = [24, n - 4097, 11];
                    break;
                  case 8192 >= n:
                    a = [25, n - 6145, 11];
                    break;
                  case 12288 >= n:
                    a = [26, n - 8193, 12];
                    break;
                  case 16384 >= n:
                    a = [27, n - 12289, 12];
                    break;
                  case 24576 >= n:
                    a = [28, n - 16385, 13];
                    break;
                  case 32768 >= n:
                    a = [29, n - 24577, 13];
                    break;
                  default:
                    throw "invalid distance";
                }
                (i = a), (s[o++] = i[0]), (s[o++] = i[1]), (s[o++] = i[2]);
                var r, h;
                for (r = 0, h = s.length; h > r; ++r) g[y++] = s[r];
                b[s[0]]++, M[s[3]]++, (v = t.length + e - 1), (d = null);
              }
              var n,
                s,
                o,
                a,
                h,
                c,
                u,
                d,
                m,
                _ = {},
                g = p ? new Uint16Array(2 * e.length) : [],
                y = 0,
                v = 0,
                b = new (p ? Uint32Array : Array)(286),
                M = new (p ? Uint32Array : Array)(30),
                w = t.f;
              if (!p) {
                for (o = 0; 285 >= o; ) b[o++] = 0;
                for (o = 0; 29 >= o; ) M[o++] = 0;
              }
              for (b[256] = 1, n = 0, s = e.length; s > n; ++n) {
                for (o = h = 0, a = 3; a > o && n + o !== s; ++o)
                  h = (h << 8) | e[n + o];
                if ((_[h] === l && (_[h] = []), (c = _[h]), !(0 < v--))) {
                  for (; 0 < c.length && 32768 < n - c[0]; ) c.shift();
                  if (n + 3 >= s) {
                    for (d && i(d, -1), o = 0, a = s - n; a > o; ++o)
                      (m = e[n + o]), (g[y++] = m), ++b[m];
                    break;
                  }
                  0 < c.length
                    ? (
                        (u = r(e, n, c)),
                        d
                          ? d.length < u.length
                            ? ((m = e[n - 1]), (g[y++] = m), ++b[m], i(u, 0))
                            : i(d, -1)
                          : u.length < w ? (d = u) : i(u, 0)
                      )
                    : d ? i(d, -1) : ((m = e[n]), (g[y++] = m), ++b[m]);
                }
                c.push(n);
              }
              return (g[y++] = 256), b[256]++, (t.j = b), (t.i = M), p
                ? g.subarray(0, y)
                : g;
            }
            function r(t, e, i) {
              var n,
                s,
                a,
                r,
                h,
                c,
                u = 0,
                l = t.length;
              (r = 0), (c = i.length);
              t: for (; c > r; r++) {
                if (((n = i[c - r - 1]), (a = 3), u > 3)) {
                  for (h = u; h > 3; h--)
                    if (t[n + h - 1] !== t[e + h - 1]) continue t;
                  a = u;
                }
                for (; 258 > a && l > e + a && t[n + a] === t[e + a]; ) ++a;
                if ((a > u && ((s = n), (u = a)), 258 === a)) break;
              }
              return new o(u, e - s);
            }
            function h(t, e) {
              var i,
                s,
                o,
                a,
                r,
                h = t.length,
                u = new n(572),
                l = new (p ? Uint8Array : Array)(h);
              if (!p) for (a = 0; h > a; a++) l[a] = 0;
              for (a = 0; h > a; ++a) 0 < t[a] && u.push(a, t[a]);
              if (
                (
                  (i = Array(u.length / 2)),
                  (s = new (p ? Uint32Array : Array)(u.length / 2)),
                  1 === i.length
                )
              )
                return (l[u.pop().index] = 1), l;
              for (a = 0, r = u.length / 2; r > a; ++a)
                (i[a] = u.pop()), (s[a] = i[a].value);
              for (o = c(s, s.length, e), a = 0, r = i.length; r > a; ++a)
                l[i[a].index] = o[a];
              return l;
            }
            function c(t, e, i) {
              function n(t) {
                var i = d[t][m[t]];
                i === e ? (n(t + 1), n(t + 1)) : --l[i], ++m[t];
              }
              var s,
                o,
                a,
                r,
                h,
                c = new (p ? Uint16Array : Array)(i),
                u = new (p ? Uint8Array : Array)(i),
                l = new (p ? Uint8Array : Array)(e),
                f = Array(i),
                d = Array(i),
                m = Array(i),
                _ = (1 << i) - e,
                g = 1 << (i - 1);
              for (c[i - 1] = e, o = 0; i > o; ++o)
                g > _ ? (u[o] = 0) : ((u[o] = 1), (_ -= g)), (_ <<= 1), (c[
                  i - 2 - o
                ] =
                  ((c[i - 1 - o] / 2) | 0) + e);
              for (
                c[0] = u[0], f[0] = Array(c[0]), d[0] = Array(c[0]), o = 1;
                i > o;
                ++o
              )
                c[o] > 2 * c[o - 1] + u[o] && (c[o] = 2 * c[o - 1] + u[o]), (f[
                  o
                ] = Array(c[o])), (d[o] = Array(c[o]));
              for (s = 0; e > s; ++s) l[s] = i;
              for (a = 0; a < c[i - 1]; ++a)
                (f[i - 1][a] = t[a]), (d[i - 1][a] = a);
              for (s = 0; i > s; ++s) m[s] = 0;
              for (
                1 === u[i - 1] && (--l[0], ++m[i - 1]), o = i - 2;
                o >= 0;
                --o
              ) {
                for (r = s = 0, h = m[o + 1], a = 0; a < c[o]; a++)
                  (r = f[o + 1][h] + f[o + 1][h + 1]), r > t[s]
                    ? ((f[o][a] = r), (d[o][a] = e), (h += 2))
                    : ((f[o][a] = t[s]), (d[o][a] = s), ++s);
                (m[o] = 0), 1 === u[o] && n(o);
              }
              return l;
            }
            function u(t) {
              var e,
                i,
                n,
                s,
                o = new (p ? Uint16Array : Array)(t.length),
                a = [],
                r = [],
                h = 0;
              for (e = 0, i = t.length; i > e; e++) a[t[e]] = (0 | a[t[e]]) + 1;
              for (e = 1, i = 16; i >= e; e++)
                (r[e] = h), (h += 0 | a[e]), (h <<= 1);
              for (e = 0, i = t.length; i > e; e++)
                for (
                  h = r[t[e]], r[t[e]] += 1, n = o[e] = 0, s = t[e];
                  s > n;
                  n++
                )
                  (o[e] = (o[e] << 1) | (1 & h)), (h >>>= 1);
              return o;
            }
            var l = void 0,
              f = !0,
              d = this,
              p =
                "undefined" != typeof Uint8Array &&
                "undefined" != typeof Uint16Array &&
                "undefined" != typeof Uint32Array;
            (e.prototype.a = function(t, e, n) {
              var s,
                o = this.buffer,
                a = this.index,
                r = this.d,
                h = o[a];
              if (
                (
                  n &&
                    e > 1 &&
                    (t =
                      e > 8
                        ? ((b[255 & t] << 24) |
                            (b[(t >>> 8) & 255] << 16) |
                            (b[(t >>> 16) & 255] << 8) |
                            b[(t >>> 24) & 255]) >>
                          (32 - e)
                        : b[t] >> (8 - e)),
                  8 > e + r
                )
              )
                (h = (h << e) | t), (r += e);
              else
                for (s = 0; e > s; ++s)
                  (h = (h << 1) | ((t >> (e - s - 1)) & 1)), 8 === ++r &&
                    (
                      (r = 0),
                      (o[a++] = b[h]),
                      (h = 0),
                      a === o.length && (o = i(this))
                    );
              (o[a] = h), (this.buffer = o), (this.d = r), (this.index = a);
            }), (e.prototype.finish = function() {
              var t,
                e = this.buffer,
                i = this.index;
              return 0 < this.d &&
                ((e[i] <<= 8 - this.d), (e[i] = b[e[i]]), i++), p
                ? (t = e.subarray(0, i))
                : ((e.length = i), (t = e)), t;
            });
            var m,
              _ = new (p ? Uint8Array : Array)(256);
            for (m = 0; 256 > m; ++m) {
              for (var g = m, y = g, v = 7, g = g >>> 1; g; g >>>= 1)
                (y <<= 1), (y |= 1 & g), --v;
              _[m] = ((y << v) & 255) >>> 0;
            }
            var b = _;
            (n.prototype.getParent = function(t) {
              return 2 * (((t - 2) / 4) | 0);
            }), (n.prototype.push = function(t, e) {
              var i,
                n,
                s,
                o = this.buffer;
              for (
                i = this.length, o[this.length++] = e, o[this.length++] = t;
                i > 0 && ((n = this.getParent(i)), o[i] > o[n]);

              )
                (s = o[i]), (o[i] = o[n]), (o[n] = s), (s = o[i + 1]), (o[
                  i + 1
                ] =
                  o[n + 1]), (o[n + 1] = s), (i = n);
              return this.length;
            }), (n.prototype.pop = function() {
              var t,
                e,
                i,
                n,
                s,
                o = this.buffer;
              for (
                e = o[0], t = o[1], this.length -= 2, o[0] =
                  o[this.length], o[1] = o[this.length + 1], s = 0;
                ((n = 2 * s + 2), !(n >= this.length)) &&
                (
                  n + 2 < this.length && o[n + 2] > o[n] && (n += 2),
                  o[n] > o[s]
                );

              )
                (i = o[s]), (o[s] = o[n]), (o[n] = i), (i = o[s + 1]), (o[
                  s + 1
                ] =
                  o[n + 1]), (o[n + 1] = i), (s = n);
              return { index: t, value: e, length: this.length };
            });
            var M,
              w = 2,
              x = [];
            for (M = 0; 288 > M; M++)
              switch (f) {
                case 143 >= M:
                  x.push([M + 48, 8]);
                  break;
                case 255 >= M:
                  x.push([M - 144 + 400, 9]);
                  break;
                case 279 >= M:
                  x.push([M - 256 + 0, 7]);
                  break;
                case 287 >= M:
                  x.push([M - 280 + 192, 8]);
                  break;
                default:
                  throw "invalid literal: " + M;
              }
            s.prototype.h = function() {
              var t,
                i,
                n,
                s,
                o = this.input;
              switch (this.e) {
                case 0:
                  for (n = 0, s = o.length; s > n; ) {
                    (i = p
                      ? o.subarray(n, n + 65535)
                      : o.slice(n, n + 65535)), (n += i.length);
                    var r = i,
                      c = n === s,
                      d = l,
                      m = l,
                      _ = l,
                      g = l,
                      y = l,
                      v = this.b,
                      b = this.c;
                    if (p) {
                      for (
                        v = new Uint8Array(this.b.buffer);
                        v.length <= b + r.length + 5;

                      )
                        v = new Uint8Array(v.length << 1);
                      v.set(this.b);
                    }
                    if (
                      (
                        (d = c ? 1 : 0),
                        (v[b++] = 0 | d),
                        (m = r.length),
                        (_ = (~m + 65536) & 65535),
                        (v[b++] = 255 & m),
                        (v[b++] = (m >>> 8) & 255),
                        (v[b++] = 255 & _),
                        (v[b++] = (_ >>> 8) & 255),
                        p
                      )
                    )
                      v.set(r, b), (b += r.length), (v = v.subarray(0, b));
                    else {
                      for (g = 0, y = r.length; y > g; ++g) v[b++] = r[g];
                      v.length = b;
                    }
                    (this.c = b), (this.b = v);
                  }
                  break;
                case 1:
                  var M = new e(
                    p ? new Uint8Array(this.b.buffer) : this.b,
                    this.c
                  );
                  M.a(1, 1, f), M.a(1, 2, f);
                  var L,
                    E,
                    P,
                    C = a(this, o);
                  for (L = 0, E = C.length; E > L; L++)
                    if (((P = C[L]), e.prototype.a.apply(M, x[P]), P > 256))
                      M.a(C[++L], C[++L], f), M.a(C[++L], 5), M.a(
                        C[++L],
                        C[++L],
                        f
                      );
                    else if (256 === P) break;
                  (this.b = M.finish()), (this.c = this.b.length);
                  break;
                case w:
                  var A,
                    S,
                    T,
                    I,
                    D,
                    k,
                    U,
                    B,
                    N,
                    O,
                    z,
                    R,
                    j,
                    Z,
                    q,
                    F = new e(
                      p ? new Uint8Array(this.b.buffer) : this.b,
                      this.c
                    ),
                    G = [
                      16,
                      17,
                      18,
                      0,
                      8,
                      7,
                      9,
                      6,
                      10,
                      5,
                      11,
                      4,
                      12,
                      3,
                      13,
                      2,
                      14,
                      1,
                      15
                    ],
                    H = Array(19);
                  for (
                    A = w, F.a(1, 1, f), F.a(A, 2, f), S = a(this, o), k = h(
                      this.j,
                      15
                    ), U = u(k), B = h(this.i, 7), N = u(B), T = 286;
                    T > 257 && 0 === k[T - 1];
                    T--
                  );
                  for (I = 30; I > 1 && 0 === B[I - 1]; I--);
                  var W,
                    V,
                    Y,
                    X,
                    J,
                    K,
                    Q = T,
                    $ = I,
                    tt = new (p ? Uint32Array : Array)(Q + $),
                    et = new (p ? Uint32Array : Array)(316),
                    it = new (p ? Uint8Array : Array)(19);
                  for (W = V = 0; Q > W; W++) tt[V++] = k[W];
                  for (W = 0; $ > W; W++) tt[V++] = B[W];
                  if (!p) for (W = 0, X = it.length; X > W; ++W) it[W] = 0;
                  for (W = J = 0, X = tt.length; X > W; W += V) {
                    for (V = 1; X > W + V && tt[W + V] === tt[W]; ++V);
                    if (((Y = V), 0 === tt[W]))
                      if (3 > Y) for (; 0 < Y--; ) (et[J++] = 0), it[0]++;
                      else
                        for (; Y > 0; )
                          (K = 138 > Y ? Y : 138), K > Y - 3 &&
                            Y > K &&
                            (K = Y - 3), 10 >= K
                            ? ((et[J++] = 17), (et[J++] = K - 3), it[17]++)
                            : (
                                (et[J++] = 18),
                                (et[J++] = K - 11),
                                it[18]++
                              ), (Y -= K);
                    else if (((et[J++] = tt[W]), it[tt[W]]++, Y--, 3 > Y))
                      for (; 0 < Y--; ) (et[J++] = tt[W]), it[tt[W]]++;
                    else
                      for (; Y > 0; )
                        (K = 6 > Y ? Y : 6), K > Y - 3 &&
                          Y > K &&
                          (K = Y - 3), (et[J++] = 16), (et[J++] =
                          K - 3), it[16]++, (Y -= K);
                  }
                  for (
                    t = p ? et.subarray(0, J) : et.slice(0, J), O = h(
                      it,
                      7
                    ), Z = 0;
                    19 > Z;
                    Z++
                  )
                    H[Z] = O[G[Z]];
                  for (D = 19; D > 4 && 0 === H[D - 1]; D--);
                  for (
                    z = u(O), F.a(T - 257, 5, f), F.a(I - 1, 5, f), F.a(
                      D - 4,
                      4,
                      f
                    ), Z = 0;
                    D > Z;
                    Z++
                  )
                    F.a(H[Z], 3, f);
                  for (Z = 0, q = t.length; q > Z; Z++)
                    if (((R = t[Z]), F.a(z[R], O[R], f), R >= 16)) {
                      switch ((Z++, R)) {
                        case 16:
                          j = 2;
                          break;
                        case 17:
                          j = 3;
                          break;
                        case 18:
                          j = 7;
                          break;
                        default:
                          throw "invalid code: " + R;
                      }
                      F.a(t[Z], j, f);
                    }
                  var nt,
                    st,
                    ot,
                    at,
                    rt,
                    ht,
                    ct,
                    ut,
                    lt = [U, k],
                    ft = [N, B];
                  for (
                    rt = lt[0], ht = lt[1], ct = ft[0], ut = ft[1], nt = 0, st =
                      S.length;
                    st > nt;
                    ++nt
                  )
                    if (((ot = S[nt]), F.a(rt[ot], ht[ot], f), ot > 256))
                      F.a(S[++nt], S[++nt], f), (at = S[++nt]), F.a(
                        ct[at],
                        ut[at],
                        f
                      ), F.a(S[++nt], S[++nt], f);
                    else if (256 === ot) break;
                  (this.b = F.finish()), (this.c = this.b.length);
                  break;
                default:
                  throw "invalid compression type";
              }
              return this.b;
            };
            var L = (function() {
                function t(t) {
                  switch (f) {
                    case 3 === t:
                      return [257, t - 3, 0];
                    case 4 === t:
                      return [258, t - 4, 0];
                    case 5 === t:
                      return [259, t - 5, 0];
                    case 6 === t:
                      return [260, t - 6, 0];
                    case 7 === t:
                      return [261, t - 7, 0];
                    case 8 === t:
                      return [262, t - 8, 0];
                    case 9 === t:
                      return [263, t - 9, 0];
                    case 10 === t:
                      return [264, t - 10, 0];
                    case 12 >= t:
                      return [265, t - 11, 1];
                    case 14 >= t:
                      return [266, t - 13, 1];
                    case 16 >= t:
                      return [267, t - 15, 1];
                    case 18 >= t:
                      return [268, t - 17, 1];
                    case 22 >= t:
                      return [269, t - 19, 2];
                    case 26 >= t:
                      return [270, t - 23, 2];
                    case 30 >= t:
                      return [271, t - 27, 2];
                    case 34 >= t:
                      return [272, t - 31, 2];
                    case 42 >= t:
                      return [273, t - 35, 3];
                    case 50 >= t:
                      return [274, t - 43, 3];
                    case 58 >= t:
                      return [275, t - 51, 3];
                    case 66 >= t:
                      return [276, t - 59, 3];
                    case 82 >= t:
                      return [277, t - 67, 4];
                    case 98 >= t:
                      return [278, t - 83, 4];
                    case 114 >= t:
                      return [279, t - 99, 4];
                    case 130 >= t:
                      return [280, t - 115, 4];
                    case 162 >= t:
                      return [281, t - 131, 5];
                    case 194 >= t:
                      return [282, t - 163, 5];
                    case 226 >= t:
                      return [283, t - 195, 5];
                    case 257 >= t:
                      return [284, t - 227, 5];
                    case 258 === t:
                      return [285, t - 258, 0];
                    default:
                      throw "invalid length: " + t;
                  }
                }
                var e,
                  i,
                  n = [];
                for (e = 3; 258 >= e; e++)
                  (i = t(e)), (n[e] = (i[2] << 24) | (i[1] << 16) | i[0]);
                return n;
              })(),
              E = p ? new Uint32Array(L) : L;
            t("Zlib.RawDeflate", s), t(
              "Zlib.RawDeflate.prototype.compress",
              s.prototype.h
            );
            var P,
              C,
              A,
              S,
              T = { NONE: 0, FIXED: 1, DYNAMIC: w };
            if (Object.keys) P = Object.keys(T);
            else for (C in ((P = []), (A = 0), T)) P[A++] = C;
            for (A = 0, S = P.length; S > A; ++A)
              (C = P[A]), t("Zlib.RawDeflate.CompressionType." + C, T[C]);
          }.call(this));
        }.call(n), (e.exports = function(t) {
          var e = new n.Zlib.RawDeflate(t);
          return e.compress();
        }));
      },
      {}
    ],
    26: [
      function(t, e, i) {
        var n =
          "undefined" != typeof Uint8Array &&
          "undefined" != typeof Uint16Array &&
          "undefined" != typeof Uint32Array;
        (i.magic = "\b\x00"), (i.uncompress = t(
          "./inflate"
        )), (i.uncompressInputType = n
          ? "uint8array"
          : "array"), (i.compress = t("./deflate")), (i.compressInputType = n
          ? "uint8array"
          : "array");
      },
      { "./deflate": 25, "./inflate": 27 }
    ],
    27: [
      function(t, e, i) {
        var n = {};
        (function() {
          (function() {
            "use strict";
            function t(t, e) {
              var i = t.split("."),
                n = r;
              !(i[0] in n) && n.execScript && n.execScript("var " + i[0]);
              for (var s; i.length && (s = i.shift()); )
                i.length || e === a
                  ? (n = n[s] ? n[s] : (n[s] = {}))
                  : (n[s] = e);
            }
            function e(t) {
              var e,
                i,
                n,
                s,
                o,
                a,
                r,
                c,
                u,
                l = t.length,
                f = 0,
                d = Number.POSITIVE_INFINITY;
              for (c = 0; l > c; ++c)
                t[c] > f && (f = t[c]), t[c] < d && (d = t[c]);
              for (
                e = 1 << f, i = new (h ? Uint32Array : Array)(
                  e
                ), n = 1, s = 0, o = 2;
                f >= n;

              ) {
                for (c = 0; l > c; ++c)
                  if (t[c] === n) {
                    for (a = 0, r = s, u = 0; n > u; ++u)
                      (a = (a << 1) | (1 & r)), (r >>= 1);
                    for (u = a; e > u; u += o) i[u] = (n << 16) | c;
                    ++s;
                  }
                ++n, (s <<= 1), (o <<= 1);
              }
              return [i, f, d];
            }
            function i(t, e) {
              switch ((
                (this.g = []),
                (this.h = 32768),
                (this.c = this.f = this.d = this.k = 0),
                (this.input = h ? new Uint8Array(t) : t),
                (this.l = !1),
                (this.i = u),
                (this.p = !1),
                (e || !(e = {})) &&
                  (
                    e.index && (this.d = e.index),
                    e.bufferSize && (this.h = e.bufferSize),
                    e.bufferType && (this.i = e.bufferType),
                    e.resize && (this.p = e.resize)
                  ),
                this.i
              )) {
                case c:
                  (this.a = 32768), (this.b = new (h ? Uint8Array : Array)(
                    32768 + this.h + 258
                  ));
                  break;
                case u:
                  (this.a = 0), (this.b = new (h ? Uint8Array : Array)(
                    this.h
                  )), (this.e = this.u), (this.m = this.r), (this.j = this.s);
                  break;
                default:
                  throw Error("invalid inflate mode");
              }
            }
            function n(t, e) {
              for (var i, n = t.f, s = t.c, o = t.input, r = t.d; e > s; ) {
                if (((i = o[r++]), i === a))
                  throw Error("input buffer is broken");
                (n |= i << s), (s += 8);
              }
              return (i = n & ((1 << e) - 1)), (t.f = n >>> e), (t.c =
                s - e), (t.d = r), i;
            }
            function s(t, e) {
              for (
                var i,
                  n,
                  s,
                  o = t.f,
                  r = t.c,
                  h = t.input,
                  c = t.d,
                  u = e[0],
                  l = e[1];
                l > r && ((i = h[c++]), i !== a);

              )
                (o |= i << r), (r += 8);
              return (n = u[o & ((1 << l) - 1)]), (s = n >>> 16), (t.f =
                o >> s), (t.c = r - s), (t.d = c), 65535 & n;
            }
            function o(t) {
              function i(t, e, i) {
                var o, a, r, h;
                for (h = 0; t > h; )
                  switch ((o = s(this, e))) {
                    case 16:
                      for (r = 3 + n(this, 2); r--; ) i[h++] = a;
                      break;
                    case 17:
                      for (r = 3 + n(this, 3); r--; ) i[h++] = 0;
                      a = 0;
                      break;
                    case 18:
                      for (r = 11 + n(this, 7); r--; ) i[h++] = 0;
                      a = 0;
                      break;
                    default:
                      a = i[h++] = o;
                  }
                return i;
              }
              var o,
                a,
                r,
                c,
                u = n(t, 5) + 257,
                l = n(t, 5) + 1,
                f = n(t, 4) + 4,
                d = new (h ? Uint8Array : Array)(p.length);
              for (c = 0; f > c; ++c) d[p[c]] = n(t, 3);
              (o = e(d)), (a = new (h ? Uint8Array : Array)(u)), (r = new (h
                ? Uint8Array
                : Array)(l)), t.j(e(i.call(t, u, o, a)), e(i.call(t, l, o, r)));
            }
            var a = void 0,
              r = this,
              h =
                "undefined" != typeof Uint8Array &&
                "undefined" != typeof Uint16Array &&
                "undefined" != typeof Uint32Array,
              c = 0,
              u = 1;
            i.prototype.t = function() {
              for (; !this.l; ) {
                var t = n(this, 3);
                switch ((1 & t && (this.l = !0), (t >>>= 1))) {
                  case 0:
                    var e = this.input,
                      i = this.d,
                      s = this.b,
                      r = this.a,
                      l = a,
                      f = a,
                      d = a,
                      p = s.length,
                      m = a;
                    if (((this.c = this.f = 0), (l = e[i++]), l === a))
                      throw Error(
                        "invalid uncompressed block header: LEN (first byte)"
                      );
                    if (((f = l), (l = e[i++]), l === a))
                      throw Error(
                        "invalid uncompressed block header: LEN (second byte)"
                      );
                    if (((f |= l << 8), (l = e[i++]), l === a))
                      throw Error(
                        "invalid uncompressed block header: NLEN (first byte)"
                      );
                    if (((d = l), (l = e[i++]), l === a))
                      throw Error(
                        "invalid uncompressed block header: NLEN (second byte)"
                      );
                    if (((d |= l << 8), f === ~d))
                      throw Error(
                        "invalid uncompressed block header: length verify"
                      );
                    if (i + f > e.length) throw Error("input buffer is broken");
                    switch (this.i) {
                      case c:
                        for (; r + f > s.length; ) {
                          if (((m = p - r), (f -= m), h))
                            s.set(e.subarray(i, i + m), r), (r += m), (i += m);
                          else for (; m--; ) s[r++] = e[i++];
                          (this.a = r), (s = this.e()), (r = this.a);
                        }
                        break;
                      case u:
                        for (; r + f > s.length; ) s = this.e({ o: 2 });
                        break;
                      default:
                        throw Error("invalid inflate mode");
                    }
                    if (h) s.set(e.subarray(i, i + f), r), (r += f), (i += f);
                    else for (; f--; ) s[r++] = e[i++];
                    (this.d = i), (this.a = r), (this.b = s);
                    break;
                  case 1:
                    this.j(P, A);
                    break;
                  case 2:
                    o(this);
                    break;
                  default:
                    throw Error("unknown BTYPE: " + t);
                }
              }
              return this.m();
            };
            var l,
              f,
              d = [
                16,
                17,
                18,
                0,
                8,
                7,
                9,
                6,
                10,
                5,
                11,
                4,
                12,
                3,
                13,
                2,
                14,
                1,
                15
              ],
              p = h ? new Uint16Array(d) : d,
              m = [
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                13,
                15,
                17,
                19,
                23,
                27,
                31,
                35,
                43,
                51,
                59,
                67,
                83,
                99,
                115,
                131,
                163,
                195,
                227,
                258,
                258,
                258
              ],
              _ = h ? new Uint16Array(m) : m,
              g = [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                1,
                1,
                1,
                2,
                2,
                2,
                2,
                3,
                3,
                3,
                3,
                4,
                4,
                4,
                4,
                5,
                5,
                5,
                5,
                0,
                0,
                0
              ],
              y = h ? new Uint8Array(g) : g,
              v = [
                1,
                2,
                3,
                4,
                5,
                7,
                9,
                13,
                17,
                25,
                33,
                49,
                65,
                97,
                129,
                193,
                257,
                385,
                513,
                769,
                1025,
                1537,
                2049,
                3073,
                4097,
                6145,
                8193,
                12289,
                16385,
                24577
              ],
              b = h ? new Uint16Array(v) : v,
              M = [
                0,
                0,
                0,
                0,
                1,
                1,
                2,
                2,
                3,
                3,
                4,
                4,
                5,
                5,
                6,
                6,
                7,
                7,
                8,
                8,
                9,
                9,
                10,
                10,
                11,
                11,
                12,
                12,
                13,
                13
              ],
              w = h ? new Uint8Array(M) : M,
              x = new (h ? Uint8Array : Array)(288);
            for (l = 0, f = x.length; f > l; ++l)
              x[l] = 143 >= l ? 8 : 255 >= l ? 9 : 279 >= l ? 7 : 8;
            var L,
              E,
              P = e(x),
              C = new (h ? Uint8Array : Array)(30);
            for (L = 0, E = C.length; E > L; ++L) C[L] = 5;
            var A = e(C);
            (i.prototype.j = function(t, e) {
              var i = this.b,
                o = this.a;
              this.n = t;
              for (
                var a, r, h, c, u = i.length - 258;
                256 !== (a = s(this, t));

              )
                if (256 > a)
                  o >= u && ((this.a = o), (i = this.e()), (o = this.a)), (i[
                    o++
                  ] = a);
                else
                  for (
                    r = a - 257, c = _[r], 0 < y[r] &&
                      (c += n(this, y[r])), a = s(this, e), h = b[a], 0 <
                      w[a] && (h += n(this, w[a])), o >= u &&
                      ((this.a = o), (i = this.e()), (o = this.a));
                    c--;

                  )
                    i[o] = i[o++ - h];
              for (; 8 <= this.c; ) (this.c -= 8), this.d--;
              this.a = o;
            }), (i.prototype.s = function(t, e) {
              var i = this.b,
                o = this.a;
              this.n = t;
              for (var a, r, h, c, u = i.length; 256 !== (a = s(this, t)); )
                if (256 > a)
                  o >= u && ((i = this.e()), (u = i.length)), (i[o++] = a);
                else
                  for (
                    r = a - 257, c = _[r], 0 < y[r] &&
                      (c += n(this, y[r])), a = s(this, e), h = b[a], 0 <
                      w[a] && (h += n(this, w[a])), o + c > u &&
                      ((i = this.e()), (u = i.length));
                    c--;

                  )
                    i[o] = i[o++ - h];
              for (; 8 <= this.c; ) (this.c -= 8), this.d--;
              this.a = o;
            }), (i.prototype.e = function() {
              var t,
                e,
                i = new (h ? Uint8Array : Array)(this.a - 32768),
                n = this.a - 32768,
                s = this.b;
              if (h) i.set(s.subarray(32768, i.length));
              else for (t = 0, e = i.length; e > t; ++t) i[t] = s[t + 32768];
              if ((this.g.push(i), (this.k += i.length), h))
                s.set(s.subarray(n, n + 32768));
              else for (t = 0; 32768 > t; ++t) s[t] = s[n + t];
              return (this.a = 32768), s;
            }), (i.prototype.u = function(t) {
              var e,
                i,
                n,
                s,
                o = (this.input.length / this.d + 1) | 0,
                a = this.input,
                r = this.b;
              return t &&
                (
                  "number" == typeof t.o && (o = t.o),
                  "number" == typeof t.q && (o += t.q)
                ), 2 > o
                ? (
                    (i = (a.length - this.d) / this.n[2]),
                    (s = (258 * (i / 2)) | 0),
                    (n = s < r.length ? r.length + s : r.length << 1)
                  )
                : (n = r.length * o), h
                ? ((e = new Uint8Array(n)), e.set(r))
                : (e = r), (this.b = e);
            }), (i.prototype.m = function() {
              var t,
                e,
                i,
                n,
                s,
                o = 0,
                a = this.b,
                r = this.g,
                c = new (h ? Uint8Array : Array)(this.k + (this.a - 32768));
              if (0 === r.length)
                return h
                  ? this.b.subarray(32768, this.a)
                  : this.b.slice(32768, this.a);
              for (e = 0, i = r.length; i > e; ++e)
                for (t = r[e], n = 0, s = t.length; s > n; ++n) c[o++] = t[n];
              for (e = 32768, i = this.a; i > e; ++e) c[o++] = a[e];
              return (this.g = []), (this.buffer = c);
            }), (i.prototype.r = function() {
              var t,
                e = this.a;
              return h
                ? this.p
                  ? ((t = new Uint8Array(e)), t.set(this.b.subarray(0, e)))
                  : (t = this.b.subarray(0, e))
                : (
                    this.b.length > e && (this.b.length = e),
                    (t = this.b)
                  ), (this.buffer = t);
            }), t("Zlib.RawInflate", i), t(
              "Zlib.RawInflate.prototype.decompress",
              i.prototype.t
            );
            var S,
              T,
              I,
              D,
              k = { ADAPTIVE: u, BLOCK: c };
            if (Object.keys) S = Object.keys(k);
            else for (T in ((S = []), (I = 0), k)) S[I++] = T;
            for (I = 0, D = S.length; D > I; ++I)
              (T = S[I]), t("Zlib.RawInflate.BufferType." + T, k[T]);
          }.call(this));
        }.call(n), (e.exports = function(t) {
          var e = new n.Zlib.RawInflate(new Uint8Array(t));
          return e.decompress();
        }));
      },
      {}
    ],
    28: [
      function(t, e, i) {
        var n = function(t, e) {
          (this.files = {}), (this.root = ""), t && this.load(t, e);
        };
        (n.prototype = t("./object")), (n.prototype.clone = function() {
          var t = new n();
          for (var e in this) "function" != typeof this[e] && (t[e] = this[e]);
          return t;
        }), (n.prototype.load = t("./load")), (n.support = t(
          "./support"
        )), (n.utils = t("./utils")), (n.base64 = t(
          "./base64"
        )), (n.compressions = t("./compressions")), (e.exports = n);
      },
      {
        "./base64": 20,
        "./compressions": 22,
        "./load": 29,
        "./object": 31,
        "./support": 34,
        "./utils": 36
      }
    ],
    29: [
      function(t, e, i) {
        var n = t("./base64"),
          s = t("./zipEntries");
        e.exports = function(t, e) {
          var i, o, a, r;
          for (
            e = e || {}, e.base64 && (t = n.decode(t)), o = new s(t, e), i =
              o.files, a = 0;
            a < i.length;
            a++
          )
            (r = i[a]), this.file(r.fileName, r.decompressed, {
              binary: !0,
              optimizedBinaryString: !0,
              date: r.date,
              dir: r.dir
            });
          return this;
        };
      },
      { "./base64": 20, "./zipEntries": 37 }
    ],
    30: [
      function(t, e, i) {
        function n(t) {
          (this.data = t), (this.length = this.data.length), (this.index = 0);
        }
        var s = t("./uint8ArrayReader");
        (n.prototype = new s()), (n.prototype.readData = function(t) {
          this.checkOffset(t);
          var e = this.data.slice(this.index, this.index + t);
          return (this.index += t), e;
        }), (e.exports = n);
      },
      { "./uint8ArrayReader": 35 }
    ],
    31: [
      function(t, e, i) {
        (function(i) {
          var n = t("./support"),
            s = t("./utils"),
            o = t("./signature"),
            a = t("./defaults"),
            r = t("./base64"),
            h = t("./compressions"),
            c = t("./compressedObject"),
            u = function(t) {
              if (
                t._data instanceof c &&
                (
                  (t._data = t._data.getContent()),
                  (t.options.binary = !0),
                  (t.options.base64 = !1),
                  "uint8array" === s.getTypeOf(t._data)
                )
              ) {
                var e = t._data;
                (t._data = new Uint8Array(e.length)), 0 !== e.length &&
                  t._data.set(e, 0);
              }
              return t._data;
            },
            l = function(t) {
              var e = u(t),
                o = s.getTypeOf(e);
              if ("string" === o) {
                if (!t.options.binary) {
                  if (n.uint8array && "function" == typeof TextEncoder)
                    return TextEncoder("utf-8").encode(e);
                  if (n.nodebuffer) return new i(e, "utf-8");
                }
                return t.asBinary();
              }
              return e;
            },
            f = function(t) {
              var e = u(this);
              return null === e || "undefined" == typeof e
                ? ""
                : (
                    this.options.base64 && (e = r.decode(e)),
                    (e =
                      t && this.options.binary
                        ? L.utf8decode(e)
                        : s.transformTo("string", e)),
                    t || this.options.binary || (e = L.utf8encode(e)),
                    e
                  );
            },
            d = function(t, e, i) {
              (this.name = t), (this._data = e), (this.options = i);
            };
          d.prototype = {
            asText: function() {
              return f.call(this, !0);
            },
            asBinary: function() {
              return f.call(this, !1);
            },
            asNodeBuffer: function() {
              var t = l(this);
              return s.transformTo("nodebuffer", t);
            },
            asUint8Array: function() {
              var t = l(this);
              return s.transformTo("uint8array", t);
            },
            asArrayBuffer: function() {
              return this.asUint8Array().buffer;
            }
          };
          var p = function(t, e) {
              var i,
                n = "";
              for (i = 0; e > i; i++)
                (n += String.fromCharCode(255 & t)), (t >>>= 8);
              return n;
            },
            m = function() {
              var t,
                e,
                i = {};
              for (t = 0; t < arguments.length; t++)
                for (e in arguments[t])
                  arguments[t].hasOwnProperty(e) &&
                    "undefined" == typeof i[e] &&
                    (i[e] = arguments[t][e]);
              return i;
            },
            _ = function(t) {
              return (t = t || {}), t.base64 === !0 &&
                null == t.binary &&
                (t.binary = !0), (t = m(t, a)), (t.date =
                t.date || new Date()), null !== t.compression &&
                (t.compression = t.compression.toUpperCase()), t;
            },
            g = function(t, e, i) {
              var n = y(t),
                o = s.getTypeOf(e);
              if (
                (
                  n && v.call(this, n),
                  (i = _(i)),
                  i.dir || null === e || "undefined" == typeof e
                )
              )
                (i.base64 = !1), (i.binary = !1), (e = null);
              else if ("string" === o)
                i.binary &&
                  !i.base64 &&
                  i.optimizedBinaryString !== !0 &&
                  (e = s.string2binary(e));
              else {
                if (((i.base64 = !1), (i.binary = !0), !(o || e instanceof c)))
                  throw new Error(
                    "The data of '" + t + "' is in an unsupported format !"
                  );
                "arraybuffer" === o && (e = s.transformTo("uint8array", e));
              }
              return (this.files[t] = new d(t, e, i));
            },
            y = function(t) {
              "/" == t.slice(-1) && (t = t.substring(0, t.length - 1));
              var e = t.lastIndexOf("/");
              return e > 0 ? t.substring(0, e) : "";
            },
            v = function(t) {
              return "/" != t.slice(-1) && (t += "/"), this.files[t] ||
                g.call(this, t, null, { dir: !0 }), this.files[t];
            },
            b = function(t, e) {
              var i,
                n = new c();
              return t._data instanceof c
                ? (
                    (n.uncompressedSize = t._data.uncompressedSize),
                    (n.crc32 = t._data.crc32),
                    0 === n.uncompressedSize || t.options.dir
                      ? (
                          (e = h.STORE),
                          (n.compressedContent = ""),
                          (n.crc32 = 0)
                        )
                      : t._data.compressionMethod === e.magic
                        ? (n.compressedContent = t._data.getCompressedContent())
                        : (
                            (i = t._data.getContent()),
                            (n.compressedContent = e.compress(
                              s.transformTo(e.compressInputType, i)
                            ))
                          )
                  )
                : (
                    (i = l(t)),
                    (!i || 0 === i.length || t.options.dir) &&
                      ((e = h.STORE), (i = "")),
                    (n.uncompressedSize = i.length),
                    (n.crc32 = this.crc32(i)),
                    (n.compressedContent = e.compress(
                      s.transformTo(e.compressInputType, i)
                    ))
                  ), (n.compressedSize =
                n.compressedContent.length), (n.compressionMethod = e.magic), n;
            },
            M = function(t, e, i, n) {
              var s,
                a,
                r = (i.compressedContent, this.utf8encode(e.name)),
                h = r !== e.name,
                c = e.options;
              (s = c.date.getHours()), (s <<= 6), (s |= c.date.getMinutes()), (s <<= 5), (s |=
                c.date.getSeconds() / 2), (a =
                c.date.getFullYear() - 1980), (a <<= 4), (a |=
                c.date.getMonth() + 1), (a <<= 5), (a |= c.date.getDate());
              var u = "";
              (u += "\n\x00"), (u += h ? "\x00\b" : "\x00\x00"), (u +=
                i.compressionMethod), (u += p(s, 2)), (u += p(a, 2)), (u += p(
                i.crc32,
                4
              )), (u += p(i.compressedSize, 4)), (u += p(
                i.uncompressedSize,
                4
              )), (u += p(r.length, 2)), (u += "\x00\x00");
              var l = o.LOCAL_FILE_HEADER + u + r,
                f =
                  o.CENTRAL_FILE_HEADER +
                  "\x00" +
                  u +
                  "\x00\x00\x00\x00\x00\x00" +
                  (e.options.dir === !0
                    ? "\x00\x00\x00"
                    : "\x00\x00\x00\x00") +
                  p(n, 4) +
                  r;
              return { fileRecord: l, dirRecord: f, compressedObject: i };
            },
            w = function() {
              this.data = [];
            };
          w.prototype = {
            append: function(t) {
              (t = s.transformTo("string", t)), this.data.push(t);
            },
            finalize: function() {
              return this.data.join("");
            }
          };
          var x = function(t) {
            (this.data = new Uint8Array(t)), (this.index = 0);
          };
          x.prototype = {
            append: function(t) {
              0 !== t.length &&
                (
                  (t = s.transformTo("uint8array", t)),
                  this.data.set(t, this.index),
                  (this.index += t.length)
                );
            },
            finalize: function() {
              return this.data;
            }
          };
          var L = {
            load: function(t, e) {
              throw new Error(
                "Load method is not defined. Is the file jszip-load.js included ?"
              );
            },
            filter: function(t) {
              var e,
                i,
                n,
                s,
                o = [];
              for (e in this.files)
                this.files.hasOwnProperty(e) &&
                  (
                    (n = this.files[e]),
                    (s = new d(n.name, n._data, m(n.options))),
                    (i = e.slice(this.root.length, e.length)),
                    e.slice(0, this.root.length) === this.root &&
                      t(i, s) &&
                      o.push(s)
                  );
              return o;
            },
            file: function(t, e, i) {
              if (1 === arguments.length) {
                if (t instanceof RegExp) {
                  var n = t;
                  return this.filter(function(t, e) {
                    return !e.options.dir && n.test(t);
                  });
                }
                return (
                  this.filter(function(e, i) {
                    return !i.options.dir && e === t;
                  })[0] || null
                );
              }
              return (t = this.root + t), g.call(this, t, e, i), this;
            },
            folder: function(t) {
              if (!t) return this;
              if (t instanceof RegExp)
                return this.filter(function(e, i) {
                  return i.options.dir && t.test(e);
                });
              var e = this.root + t,
                i = v.call(this, e),
                n = this.clone();
              return (n.root = i.name), n;
            },
            remove: function(t) {
              t = this.root + t;
              var e = this.files[t];
              if (
                (
                  e || ("/" != t.slice(-1) && (t += "/"), (e = this.files[t])),
                  e
                )
              )
                if (e.options.dir)
                  for (
                    var i = this.filter(function(e, i) {
                        return i.name.slice(0, t.length) === t;
                      }),
                      n = 0;
                    n < i.length;
                    n++
                  )
                    delete this.files[i[n].name];
                else delete this.files[t];
              return this;
            },
            generate: function(t) {
              (t = m(t || {}, {
                base64: !0,
                compression: "STORE",
                type: "base64"
              })), s.checkSupport(t.type);
              var e,
                i,
                n = [],
                a = 0,
                c = 0;
              for (var u in this.files)
                if (this.files.hasOwnProperty(u)) {
                  var l = this.files[u],
                    f = l.options.compression || t.compression.toUpperCase(),
                    d = h[f];
                  if (!d)
                    throw new Error(f + " is not a valid compression method !");
                  var _ = b.call(this, l, d),
                    g = M.call(this, u, l, _, a);
                  (a += g.fileRecord.length + _.compressedSize), (c +=
                    g.dirRecord.length), n.push(g);
                }
              var y = "";
              switch ((
                (y =
                  o.CENTRAL_DIRECTORY_END +
                  "\x00\x00\x00\x00" +
                  p(n.length, 2) +
                  p(n.length, 2) +
                  p(c, 4) +
                  p(a, 4) +
                  "\x00\x00"),
                t.type.toLowerCase()
              )) {
                case "uint8array":
                case "arraybuffer":
                case "blob":
                case "nodebuffer":
                  e = new x(a + c + y.length);
                  break;
                case "base64":
                default:
                  e = new w(a + c + y.length);
              }
              for (i = 0; i < n.length; i++)
                e.append(n[i].fileRecord), e.append(
                  n[i].compressedObject.compressedContent
                );
              for (i = 0; i < n.length; i++) e.append(n[i].dirRecord);
              e.append(y);
              var v = e.finalize();
              switch (t.type.toLowerCase()) {
                case "uint8array":
                case "arraybuffer":
                case "nodebuffer":
                  return s.transformTo(t.type.toLowerCase(), v);
                case "blob":
                  return s.arrayBuffer2Blob(s.transformTo("arraybuffer", v));
                case "base64":
                  return t.base64 ? r.encode(v) : v;
                default:
                  return v;
              }
            },
            crc32: function(t, e) {
              if ("undefined" == typeof t || !t.length) return 0;
              var i = "string" !== s.getTypeOf(t),
                n = [
                  0,
                  1996959894,
                  3993919788,
                  2567524794,
                  124634137,
                  1886057615,
                  3915621685,
                  2657392035,
                  249268274,
                  2044508324,
                  3772115230,
                  2547177864,
                  162941995,
                  2125561021,
                  3887607047,
                  2428444049,
                  498536548,
                  1789927666,
                  4089016648,
                  2227061214,
                  450548861,
                  1843258603,
                  4107580753,
                  2211677639,
                  325883990,
                  1684777152,
                  4251122042,
                  2321926636,
                  335633487,
                  1661365465,
                  4195302755,
                  2366115317,
                  997073096,
                  1281953886,
                  3579855332,
                  2724688242,
                  1006888145,
                  1258607687,
                  3524101629,
                  2768942443,
                  901097722,
                  1119000684,
                  3686517206,
                  2898065728,
                  853044451,
                  1172266101,
                  3705015759,
                  2882616665,
                  651767980,
                  1373503546,
                  3369554304,
                  3218104598,
                  565507253,
                  1454621731,
                  3485111705,
                  3099436303,
                  671266974,
                  1594198024,
                  3322730930,
                  2970347812,
                  795835527,
                  1483230225,
                  3244367275,
                  3060149565,
                  1994146192,
                  31158534,
                  2563907772,
                  4023717930,
                  1907459465,
                  112637215,
                  2680153253,
                  3904427059,
                  2013776290,
                  251722036,
                  2517215374,
                  3775830040,
                  2137656763,
                  141376813,
                  2439277719,
                  3865271297,
                  1802195444,
                  476864866,
                  2238001368,
                  4066508878,
                  1812370925,
                  453092731,
                  2181625025,
                  4111451223,
                  1706088902,
                  314042704,
                  2344532202,
                  4240017532,
                  1658658271,
                  366619977,
                  2362670323,
                  4224994405,
                  1303535960,
                  984961486,
                  2747007092,
                  3569037538,
                  1256170817,
                  1037604311,
                  2765210733,
                  3554079995,
                  1131014506,
                  879679996,
                  2909243462,
                  3663771856,
                  1141124467,
                  855842277,
                  2852801631,
                  3708648649,
                  1342533948,
                  654459306,
                  3188396048,
                  3373015174,
                  1466479909,
                  544179635,
                  3110523913,
                  3462522015,
                  1591671054,
                  702138776,
                  2966460450,
                  3352799412,
                  1504918807,
                  783551873,
                  3082640443,
                  3233442989,
                  3988292384,
                  2596254646,
                  62317068,
                  1957810842,
                  3939845945,
                  2647816111,
                  81470997,
                  1943803523,
                  3814918930,
                  2489596804,
                  225274430,
                  2053790376,
                  3826175755,
                  2466906013,
                  167816743,
                  2097651377,
                  4027552580,
                  2265490386,
                  503444072,
                  1762050814,
                  4150417245,
                  2154129355,
                  426522225,
                  1852507879,
                  4275313526,
                  2312317920,
                  282753626,
                  1742555852,
                  4189708143,
                  2394877945,
                  397917763,
                  1622183637,
                  3604390888,
                  2714866558,
                  953729732,
                  1340076626,
                  3518719985,
                  2797360999,
                  1068828381,
                  1219638859,
                  3624741850,
                  2936675148,
                  906185462,
                  1090812512,
                  3747672003,
                  2825379669,
                  829329135,
                  1181335161,
                  3412177804,
                  3160834842,
                  628085408,
                  1382605366,
                  3423369109,
                  3138078467,
                  570562233,
                  1426400815,
                  3317316542,
                  2998733608,
                  733239954,
                  1555261956,
                  3268935591,
                  3050360625,
                  752459403,
                  1541320221,
                  2607071920,
                  3965973030,
                  1969922972,
                  40735498,
                  2617837225,
                  3943577151,
                  1913087877,
                  83908371,
                  2512341634,
                  3803740692,
                  2075208622,
                  213261112,
                  2463272603,
                  3855990285,
                  2094854071,
                  198958881,
                  2262029012,
                  4057260610,
                  1759359992,
                  534414190,
                  2176718541,
                  4139329115,
                  1873836001,
                  414664567,
                  2282248934,
                  4279200368,
                  1711684554,
                  285281116,
                  2405801727,
                  4167216745,
                  1634467795,
                  376229701,
                  2685067896,
                  3608007406,
                  1308918612,
                  956543938,
                  2808555105,
                  3495958263,
                  1231636301,
                  1047427035,
                  2932959818,
                  3654703836,
                  1088359270,
                  936918e3,
                  2847714899,
                  3736837829,
                  1202900863,
                  817233897,
                  3183342108,
                  3401237130,
                  1404277552,
                  615818150,
                  3134207493,
                  3453421203,
                  1423857449,
                  601450431,
                  3009837614,
                  3294710456,
                  1567103746,
                  711928724,
                  3020668471,
                  3272380065,
                  1510334235,
                  755167117
                ];
              "undefined" == typeof e && (e = 0);
              var o = 0,
                a = 0,
                r = 0;
              e = -1 ^ e;
              for (var h = 0, c = t.length; c > h; h++)
                (r = i ? t[h] : t.charCodeAt(h)), (a = 255 & (e ^ r)), (o =
                  n[a]), (e = (e >>> 8) ^ o);
              return -1 ^ e;
            },
            utf8encode: function(t) {
              if (n.uint8array && "function" == typeof TextEncoder) {
                var e = TextEncoder("utf-8").encode(t);
                return s.transformTo("string", e);
              }
              if (n.nodebuffer)
                return s.transformTo("string", new i(t, "utf-8"));
              for (var o = [], a = 0, r = 0; r < t.length; r++) {
                var h = t.charCodeAt(r);
                128 > h
                  ? (o[a++] = String.fromCharCode(h))
                  : h > 127 && 2048 > h
                    ? (
                        (o[a++] = String.fromCharCode((h >> 6) | 192)),
                        (o[a++] = String.fromCharCode((63 & h) | 128))
                      )
                    : (
                        (o[a++] = String.fromCharCode((h >> 12) | 224)),
                        (o[a++] = String.fromCharCode(((h >> 6) & 63) | 128)),
                        (o[a++] = String.fromCharCode((63 & h) | 128))
                      );
              }
              return o.join("");
            },
            utf8decode: function(t) {
              var e = [],
                i = 0,
                o = s.getTypeOf(t),
                a = "string" !== o,
                r = 0,
                h = 0,
                c = 0,
                u = 0;
              if (n.uint8array && "function" == typeof TextDecoder)
                return TextDecoder("utf-8").decode(
                  s.transformTo("uint8array", t)
                );
              if (n.nodebuffer)
                return s.transformTo("nodebuffer", t).toString("utf-8");
              for (; r < t.length; )
                (h = a ? t[r] : t.charCodeAt(r)), 128 > h
                  ? ((e[i++] = String.fromCharCode(h)), r++)
                  : h > 191 && 224 > h
                    ? (
                        (c = a ? t[r + 1] : t.charCodeAt(r + 1)),
                        (e[i++] = String.fromCharCode(
                          ((31 & h) << 6) | (63 & c)
                        )),
                        (r += 2)
                      )
                    : (
                        (c = a ? t[r + 1] : t.charCodeAt(r + 1)),
                        (u = a ? t[r + 2] : t.charCodeAt(r + 2)),
                        (e[i++] = String.fromCharCode(
                          ((15 & h) << 12) | ((63 & c) << 6) | (63 & u)
                        )),
                        (r += 3)
                      );
              return e.join("");
            }
          };
          e.exports = L;
        }.call(this, t("buffer").Buffer));
      },
      {
        "./base64": 20,
        "./compressedObject": 21,
        "./compressions": 22,
        "./defaults": 24,
        "./signature": 32,
        "./support": 34,
        "./utils": 36,
        buffer: 15
      }
    ],
    32: [
      function(t, e, i) {
        (i.LOCAL_FILE_HEADER = "PK"), (i.CENTRAL_FILE_HEADER =
          "PK"), (i.CENTRAL_DIRECTORY_END =
          "PK"), (i.ZIP64_CENTRAL_DIRECTORY_LOCATOR =
          "PK"), (i.ZIP64_CENTRAL_DIRECTORY_END =
          "PK"), (i.DATA_DESCRIPTOR = "PK\b");
      },
      {}
    ],
    33: [
      function(t, e, i) {
        function n(t, e) {
          (this.data = t), e ||
            (this.data = o.string2binary(
              this.data
            )), (this.length = this.data.length), (this.index = 0);
        }
        var s = t("./dataReader"),
          o = t("./utils");
        (n.prototype = new s()), (n.prototype.byteAt = function(t) {
          return this.data.charCodeAt(t);
        }), (n.prototype.lastIndexOfSignature = function(t) {
          return this.data.lastIndexOf(t);
        }), (n.prototype.readData = function(t) {
          this.checkOffset(t);
          var e = this.data.slice(this.index, this.index + t);
          return (this.index += t), e;
        }), (e.exports = n);
      },
      { "./dataReader": 23, "./utils": 36 }
    ],
    34: [
      function(t, e, i) {
        (function(t) {
          if (
            (
              (i.base64 = !0),
              (i.array = !0),
              (i.string = !0),
              (i.arraybuffer =
                "undefined" != typeof ArrayBuffer &&
                "undefined" != typeof Uint8Array),
              (i.nodebuffer = "undefined" != typeof t),
              (i.uint8array = "undefined" != typeof Uint8Array),
              "undefined" == typeof ArrayBuffer
            )
          )
            i.blob = !1;
          else {
            var e = new ArrayBuffer(0);
            try {
              i.blob = 0 === new Blob([e], { type: "application/zip" }).size;
            } catch (n) {
              try {
                var s =
                    window.BlobBuilder ||
                    window.WebKitBlobBuilder ||
                    window.MozBlobBuilder ||
                    window.MSBlobBuilder,
                  o = new s();
                o.append(e), (i.blob = 0 === o.getBlob("application/zip").size);
              } catch (n) {
                i.blob = !1;
              }
            }
          }
        }.call(this, t("buffer").Buffer));
      },
      { buffer: 15 }
    ],
    35: [
      function(t, e, i) {
        function n(t) {
          t &&
            (
              (this.data = t),
              (this.length = this.data.length),
              (this.index = 0)
            );
        }
        var s = t("./dataReader");
        (n.prototype = new s()), (n.prototype.byteAt = function(t) {
          return this.data[t];
        }), (n.prototype.lastIndexOfSignature = function(t) {
          for (
            var e = t.charCodeAt(0),
              i = t.charCodeAt(1),
              n = t.charCodeAt(2),
              s = t.charCodeAt(3),
              o = this.length - 4;
            o >= 0;
            --o
          )
            if (
              this.data[o] === e &&
              this.data[o + 1] === i &&
              this.data[o + 2] === n &&
              this.data[o + 3] === s
            )
              return o;
          return -1;
        }), (n.prototype.readData = function(t) {
          this.checkOffset(t);
          var e = this.data.subarray(this.index, this.index + t);
          return (this.index += t), e;
        }), (e.exports = n);
      },
      { "./dataReader": 23 }
    ],
    36: [
      function(t, e, i) {
        (function(e) {
          function n(t) {
            return t;
          }
          function s(t, e) {
            for (var i = 0; i < t.length; ++i) e[i] = 255 & t.charCodeAt(i);
            return e;
          }
          function o(t) {
            for (
              var e = 65536, n = [], s = t.length, o = i.getTypeOf(t), a = 0;
              s > a && e > 1;

            )
              try {
                "array" === o || "nodebuffer" === o
                  ? n.push(
                      String.fromCharCode.apply(
                        null,
                        t.slice(a, Math.max(a + e, s))
                      )
                    )
                  : n.push(
                      String.fromCharCode.apply(null, t.subarray(a, a + e))
                    ), (a += e);
              } catch (r) {
                e = Math.floor(e / 2);
              }
            return n.join("");
          }
          function a(t, e) {
            for (var i = 0; i < t.length; i++) e[i] = t[i];
            return e;
          }
          var r = t("./support"),
            h = t("./compressions");
          (i.string2binary = function(t) {
            for (var e = "", i = 0; i < t.length; i++)
              e += String.fromCharCode(255 & t.charCodeAt(i));
            return e;
          }), (i.string2Uint8Array = function(t) {
            return i.transformTo("uint8array", t);
          }), (i.uint8Array2String = function(t) {
            return i.transformTo("string", t);
          }), (i.string2Blob = function(t) {
            var e = i.transformTo("arraybuffer", t);
            return i.arrayBuffer2Blob(e);
          }), (i.arrayBuffer2Blob = function(t) {
            i.checkSupport("blob");
            try {
              return new Blob([t], { type: "application/zip" });
            } catch (e) {
              try {
                var n = new (window.BlobBuilder ||
                  window.WebKitBlobBuilder ||
                  window.MozBlobBuilder ||
                  window.MSBlobBuilder)();
                return n.append(t), n.getBlob("application/zip");
              } catch (e) {
                throw new Error("Bug : can't construct the Blob.");
              }
            }
          });
          var c = {};
          (c.string = {
            string: n,
            array: function(t) {
              return s(t, new Array(t.length));
            },
            arraybuffer: function(t) {
              return c.string.uint8array(t).buffer;
            },
            uint8array: function(t) {
              return s(t, new Uint8Array(t.length));
            },
            nodebuffer: function(t) {
              return s(t, new e(t.length));
            }
          }), (c.array = {
            string: o,
            array: n,
            arraybuffer: function(t) {
              return new Uint8Array(t).buffer;
            },
            uint8array: function(t) {
              return new Uint8Array(t);
            },
            nodebuffer: function(t) {
              return new e(t);
            }
          }), (c.arraybuffer = {
            string: function(t) {
              return o(new Uint8Array(t));
            },
            array: function(t) {
              return a(new Uint8Array(t), new Array(t.byteLength));
            },
            arraybuffer: n,
            uint8array: function(t) {
              return new Uint8Array(t);
            },
            nodebuffer: function(t) {
              return new e(new Uint8Array(t));
            }
          }), (c.uint8array = {
            string: o,
            array: function(t) {
              return a(t, new Array(t.length));
            },
            arraybuffer: function(t) {
              return t.buffer;
            },
            uint8array: n,
            nodebuffer: function(t) {
              return new e(t);
            }
          }), (c.nodebuffer = {
            string: o,
            array: function(t) {
              return a(t, new Array(t.length));
            },
            arraybuffer: function(t) {
              return c.nodebuffer.uint8array(t).buffer;
            },
            uint8array: function(t) {
              return a(t, new Uint8Array(t.length));
            },
            nodebuffer: n
          }), (i.transformTo = function(t, e) {
            if ((e || (e = ""), !t)) return e;
            i.checkSupport(t);
            var n = i.getTypeOf(e),
              s = c[n][t](e);
            return s;
          }), (i.getTypeOf = function(t) {
            return "string" == typeof t
              ? "string"
              : t instanceof Array
                ? "array"
                : r.nodebuffer && e.isBuffer(t)
                  ? "nodebuffer"
                  : r.uint8array && t instanceof Uint8Array
                    ? "uint8array"
                    : r.arraybuffer && t instanceof ArrayBuffer
                      ? "arraybuffer"
                      : void 0;
          }), (i.checkSupport = function(t) {
            var e = r[t.toLowerCase()];
            if (!e) throw new Error(t + " is not supported by this browser");
          }), (i.MAX_VALUE_16BITS = 65535), (i.MAX_VALUE_32BITS = -1), (i.pretty = function(
            t
          ) {
            var e,
              i,
              n = "";
            for (i = 0; i < (t || "").length; i++)
              (e = t.charCodeAt(i)), (n +=
                "\\x" + (16 > e ? "0" : "") + e.toString(16).toUpperCase());
            return n;
          }), (i.findCompression = function(t) {
            for (var e in h)
              if (h.hasOwnProperty(e) && h[e].magic === t) return h[e];
            return null;
          });
        }.call(this, t("buffer").Buffer));
      },
      { "./compressions": 22, "./support": 34, buffer: 15 }
    ],
    37: [
      function(t, e, i) {
        function n(t, e) {
          (this.files = []), (this.loadOptions = e), t && this.load(t);
        }
        var s = t("./stringReader"),
          o = t("./nodeBufferReader"),
          a = t("./uint8ArrayReader"),
          r = t("./utils"),
          h = t("./signature"),
          c = t("./zipEntry"),
          u = t("./support");
        (n.prototype = {
          checkSignature: function(t) {
            var e = this.reader.readString(4);
            if (e !== t)
              throw new Error(
                "Corrupted zip or bug : unexpected signature (" +
                  r.pretty(e) +
                  ", expected " +
                  r.pretty(t) +
                  ")"
              );
          },
          readBlockEndOfCentral: function() {
            (this.diskNumber = this.reader.readInt(
              2
            )), (this.diskWithCentralDirStart = this.reader.readInt(
              2
            )), (this.centralDirRecordsOnThisDisk = this.reader.readInt(
              2
            )), (this.centralDirRecords = this.reader.readInt(
              2
            )), (this.centralDirSize = this.reader.readInt(
              4
            )), (this.centralDirOffset = this.reader.readInt(
              4
            )), (this.zipCommentLength = this.reader.readInt(
              2
            )), (this.zipComment = this.reader.readString(
              this.zipCommentLength
            ));
          },
          readBlockZip64EndOfCentral: function() {
            (this.zip64EndOfCentralSize = this.reader.readInt(
              8
            )), (this.versionMadeBy = this.reader.readString(
              2
            )), (this.versionNeeded = this.reader.readInt(
              2
            )), (this.diskNumber = this.reader.readInt(
              4
            )), (this.diskWithCentralDirStart = this.reader.readInt(
              4
            )), (this.centralDirRecordsOnThisDisk = this.reader.readInt(
              8
            )), (this.centralDirRecords = this.reader.readInt(
              8
            )), (this.centralDirSize = this.reader.readInt(
              8
            )), (this.centralDirOffset = this.reader.readInt(
              8
            )), (this.zip64ExtensibleData = {});
            for (
              var t, e, i, n = this.zip64EndOfCentralSize - 44, s = 0;
              n > s;

            )
              (t = this.reader.readInt(2)), (e = this.reader.readInt(
                4
              )), (i = this.reader.readString(e)), (this.zip64ExtensibleData[
                t
              ] = { id: t, length: e, value: i });
          },
          readBlockZip64EndOfCentralLocator: function() {
            if (
              (
                (this.diskWithZip64CentralDirStart = this.reader.readInt(4)),
                (this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(
                  8
                )),
                (this.disksCount = this.reader.readInt(4)),
                this.disksCount > 1
              )
            )
              throw new Error("Multi-volumes zip are not supported");
          },
          readLocalFiles: function() {
            var t, e;
            for (t = 0; t < this.files.length; t++)
              (e = this.files[t]), this.reader.setIndex(
                e.localHeaderOffset
              ), this.checkSignature(h.LOCAL_FILE_HEADER), e.readLocalPart(
                this.reader
              ), e.handleUTF8();
          },
          readCentralDir: function() {
            var t;
            for (
              this.reader.setIndex(this.centralDirOffset);
              this.reader.readString(4) === h.CENTRAL_FILE_HEADER;

            )
              (t = new c(
                { zip64: this.zip64 },
                this.loadOptions
              )), t.readCentralPart(this.reader), this.files.push(t);
          },
          readEndOfCentral: function() {
            var t = this.reader.lastIndexOfSignature(h.CENTRAL_DIRECTORY_END);
            if (-1 === t)
              throw new Error(
                "Corrupted zip : can't find end of central directory"
              );
            if (
              (
                this.reader.setIndex(t),
                this.checkSignature(h.CENTRAL_DIRECTORY_END),
                this.readBlockEndOfCentral(),
                this.diskNumber === r.MAX_VALUE_16BITS ||
                  this.diskWithCentralDirStart === r.MAX_VALUE_16BITS ||
                  this.centralDirRecordsOnThisDisk === r.MAX_VALUE_16BITS ||
                  this.centralDirRecords === r.MAX_VALUE_16BITS ||
                  this.centralDirSize === r.MAX_VALUE_32BITS ||
                  this.centralDirOffset === r.MAX_VALUE_32BITS
              )
            ) {
              if (
                (
                  (this.zip64 = !0),
                  (t = this.reader.lastIndexOfSignature(
                    h.ZIP64_CENTRAL_DIRECTORY_LOCATOR
                  )),
                  -1 === t
                )
              )
                throw new Error(
                  "Corrupted zip : can't find the ZIP64 end of central directory locator"
                );
              this.reader.setIndex(t), this.checkSignature(
                h.ZIP64_CENTRAL_DIRECTORY_LOCATOR
              ), this.readBlockZip64EndOfCentralLocator(), this.reader.setIndex(
                this.relativeOffsetEndOfZip64CentralDir
              ), this.checkSignature(
                h.ZIP64_CENTRAL_DIRECTORY_END
              ), this.readBlockZip64EndOfCentral();
            }
          },
          prepareReader: function(t) {
            var e = r.getTypeOf(t);
            "string" !== e || u.uint8array
              ? "nodebuffer" === e
                ? (this.reader = new o(t))
                : (this.reader = new a(r.transformTo("uint8array", t)))
              : (this.reader = new s(
                  t,
                  this.loadOptions.optimizedBinaryString
                ));
          },
          load: function(t) {
            this.prepareReader(
              t
            ), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          }
        }), (e.exports = n);
      },
      {
        "./nodeBufferReader": 30,
        "./signature": 32,
        "./stringReader": 33,
        "./support": 34,
        "./uint8ArrayReader": 35,
        "./utils": 36,
        "./zipEntry": 38
      }
    ],
    38: [
      function(t, e, i) {
        function n(t, e) {
          (this.options = t), (this.loadOptions = e);
        }
        var s = t("./stringReader"),
          o = t("./utils"),
          a = t("./compressedObject"),
          r = t("./object");
        (n.prototype = {
          isEncrypted: function() {
            return 1 === (1 & this.bitFlag);
          },
          useUTF8: function() {
            return 2048 === (2048 & this.bitFlag);
          },
          prepareCompressedContent: function(t, e, i) {
            return function() {
              var n = t.index;
              t.setIndex(e);
              var s = t.readData(i);
              return t.setIndex(n), s;
            };
          },
          prepareContent: function(t, e, i, n, s) {
            return function() {
              var t = o.transformTo(
                  n.uncompressInputType,
                  this.getCompressedContent()
                ),
                e = n.uncompress(t);
              if (e.length !== s)
                throw new Error("Bug : uncompressed data size mismatch");
              return e;
            };
          },
          readLocalPart: function(t) {
            var e, i;
            if (
              (
                t.skip(22),
                (this.fileNameLength = t.readInt(2)),
                (i = t.readInt(2)),
                (this.fileName = t.readString(this.fileNameLength)),
                t.skip(i),
                -1 == this.compressedSize || -1 == this.uncompressedSize
              )
            )
              throw new Error(
                "Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize == -1 || uncompressedSize == -1)"
              );
            if (((e = o.findCompression(this.compressionMethod)), null === e))
              throw new Error(
                "Corrupted zip : compression " +
                  o.pretty(this.compressionMethod) +
                  " unknown (inner file : " +
                  this.fileName +
                  ")"
              );
            if (
              (
                (this.decompressed = new a()),
                (this.decompressed.compressedSize = this.compressedSize),
                (this.decompressed.uncompressedSize = this.uncompressedSize),
                (this.decompressed.crc32 = this.crc32),
                (this.decompressed.compressionMethod = this.compressionMethod),
                (this.decompressed.getCompressedContent = this.prepareCompressedContent(
                  t,
                  t.index,
                  this.compressedSize,
                  e
                )),
                (this.decompressed.getContent = this.prepareContent(
                  t,
                  t.index,
                  this.compressedSize,
                  e,
                  this.uncompressedSize
                )),
                this.loadOptions.checkCRC32 &&
                  (
                    (this.decompressed = o.transformTo(
                      "string",
                      this.decompressed.getContent()
                    )),
                    r.crc32(this.decompressed) !== this.crc32
                  )
              )
            )
              throw new Error("Corrupted zip : CRC32 mismatch");
          },
          readCentralPart: function(t) {
            if (
              (
                (this.versionMadeBy = t.readString(2)),
                (this.versionNeeded = t.readInt(2)),
                (this.bitFlag = t.readInt(2)),
                (this.compressionMethod = t.readString(2)),
                (this.date = t.readDate()),
                (this.crc32 = t.readInt(4)),
                (this.compressedSize = t.readInt(4)),
                (this.uncompressedSize = t.readInt(4)),
                (this.fileNameLength = t.readInt(2)),
                (this.extraFieldsLength = t.readInt(2)),
                (this.fileCommentLength = t.readInt(2)),
                (this.diskNumberStart = t.readInt(2)),
                (this.internalFileAttributes = t.readInt(2)),
                (this.externalFileAttributes = t.readInt(4)),
                (this.localHeaderOffset = t.readInt(4)),
                this.isEncrypted()
              )
            )
              throw new Error("Encrypted zip are not supported");
            (this.fileName = t.readString(
              this.fileNameLength
            )), this.readExtraFields(t), this.parseZIP64ExtraField(
              t
            ), (this.fileComment = t.readString(
              this.fileCommentLength
            )), (this.dir = 16 & this.externalFileAttributes ? !0 : !1);
          },
          parseZIP64ExtraField: function(t) {
            if (this.extraFields[1]) {
              var e = new s(this.extraFields[1].value);
              this.uncompressedSize === o.MAX_VALUE_32BITS &&
                (this.uncompressedSize = e.readInt(8)), this.compressedSize ===
                o.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this
                .localHeaderOffset === o.MAX_VALUE_32BITS &&
                (this.localHeaderOffset = e.readInt(8)), this
                .diskNumberStart === o.MAX_VALUE_32BITS &&
                (this.diskNumberStart = e.readInt(4));
            }
          },
          readExtraFields: function(t) {
            var e,
              i,
              n,
              s = t.index;
            for (
              this.extraFields = this.extraFields || {};
              t.index < s + this.extraFieldsLength;

            )
              (e = t.readInt(2)), (i = t.readInt(2)), (n = t.readString(
                i
              )), (this.extraFields[e] = { id: e, length: i, value: n });
          },
          handleUTF8: function() {
            this.useUTF8() &&
              (
                (this.fileName = r.utf8decode(this.fileName)),
                (this.fileComment = r.utf8decode(this.fileComment))
              );
          }
        }), (e.exports = n);
      },
      {
        "./compressedObject": 21,
        "./object": 31,
        "./stringReader": 33,
        "./utils": 36
      }
    ],
    39: [
      function(t, e, i) {
        !(function(t, i, n) {
          var s = t.L,
            o = {};
          (o.version = "0.6.4"), "object" == typeof e &&
          "object" == typeof e.exports
            ? (e.exports = o)
            : "function" == typeof define &&
              define.amd &&
              define(o), (o.noConflict = function() {
            return (t.L = s), this;
          }), (t.L = o), (o.Util = {
            extend: function(t) {
              var e,
                i,
                n,
                s,
                o = Array.prototype.slice.call(arguments, 1);
              for (i = 0, n = o.length; n > i; i++) {
                s = o[i] || {};
                for (e in s) s.hasOwnProperty(e) && (t[e] = s[e]);
              }
              return t;
            },
            bind: function(t, e) {
              var i =
                arguments.length > 2
                  ? Array.prototype.slice.call(arguments, 2)
                  : null;
              return function() {
                return t.apply(e, i || arguments);
              };
            },
            stamp: (function() {
              var t = 0,
                e = "_leaflet_id";
              return function(i) {
                return (i[e] = i[e] || ++t), i[e];
              };
            })(),
            invokeEach: function(t, e, i) {
              var n, s;
              if ("object" == typeof t) {
                s = Array.prototype.slice.call(arguments, 3);
                for (n in t) e.apply(i, [n, t[n]].concat(s));
                return !0;
              }
              return !1;
            },
            limitExecByInterval: function(t, e, i) {
              var n, s;
              return function o() {
                var a = arguments;
                return n
                  ? void (s = !0)
                  : (
                      (n = !0),
                      setTimeout(function() {
                        (n = !1), s && (o.apply(i, a), (s = !1));
                      }, e),
                      void t.apply(i, a)
                    );
              };
            },
            falseFn: function() {
              return !1;
            },
            formatNum: function(t, e) {
              var i = Math.pow(10, e || 5);
              return Math.round(t * i) / i;
            },
            trim: function(t) {
              return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
            },
            splitWords: function(t) {
              return o.Util.trim(t).split(/\s+/);
            },
            setOptions: function(t, e) {
              return (t.options = o.extend({}, t.options, e)), t.options;
            },
            getParamString: function(t, e, i) {
              var n = [];
              for (var s in t)
                n.push(
                  encodeURIComponent(i ? s.toUpperCase() : s) +
                    "=" +
                    encodeURIComponent(t[s])
                );
              return (e && -1 !== e.indexOf("?") ? "&" : "?") + n.join("&");
            },
            template: function(t, e) {
              return t.replace(/\{ *([\w_]+) *\}/g, function(t, i) {
                var s = e[i];
                if (s === n)
                  throw new Error("No value provided for variable " + t);
                return "function" == typeof s && (s = s(e)), s;
              });
            },
            isArray: function(t) {
              return "[object Array]" === Object.prototype.toString.call(t);
            },
            emptyImageUrl:
              "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          }), (function() {
            function e(e) {
              var i,
                n,
                s = ["webkit", "moz", "o", "ms"];
              for (i = 0; i < s.length && !n; i++) n = t[s[i] + e];
              return n;
            }
            function i(e) {
              var i = +new Date(),
                s = Math.max(0, 16 - (i - n));
              return (n = i + s), t.setTimeout(e, s);
            }
            var n = 0,
              s = t.requestAnimationFrame || e("RequestAnimationFrame") || i,
              a =
                t.cancelAnimationFrame ||
                e("CancelAnimationFrame") ||
                e("CancelRequestAnimationFrame") ||
                function(e) {
                  t.clearTimeout(e);
                };
            (o.Util.requestAnimFrame = function(e, n, a, r) {
              return (e = o.bind(e, n)), a && s === i
                ? void e()
                : s.call(t, e, r);
            }), (o.Util.cancelAnimFrame = function(e) {
              e && a.call(t, e);
            });
          })(), (o.extend = o.Util.extend), (o.bind = o.Util.bind), (o.stamp =
            o.Util.stamp), (o.setOptions =
            o.Util.setOptions), (o.Class = function() {}), (o.Class.extend = function(
            t
          ) {
            var e = function() {
                this.initialize && this.initialize.apply(this, arguments), this
                  ._initHooks && this.callInitHooks();
              },
              i = function() {};
            i.prototype = this.prototype;
            var n = new i();
            (n.constructor = e), (e.prototype = n);
            for (var s in this)
              this.hasOwnProperty(s) && "prototype" !== s && (e[s] = this[s]);
            t.statics &&
              (o.extend(e, t.statics), delete t.statics), t.includes &&
              (
                o.Util.extend.apply(null, [n].concat(t.includes)),
                delete t.includes
              ), t.options &&
              n.options &&
              (t.options = o.extend({}, n.options, t.options)), o.extend(
              n,
              t
            ), (n._initHooks = []);
            var a = this;
            return (e.__super__ = a.prototype), (n.callInitHooks = function() {
              if (!this._initHooksCalled) {
                a.prototype.callInitHooks &&
                  a.prototype.callInitHooks.call(
                    this
                  ), (this._initHooksCalled = !0);
                for (var t = 0, e = n._initHooks.length; e > t; t++)
                  n._initHooks[t].call(this);
              }
            }), e;
          }), (o.Class.include = function(t) {
            o.extend(this.prototype, t);
          }), (o.Class.mergeOptions = function(t) {
            o.extend(this.prototype.options, t);
          }), (o.Class.addInitHook = function(t) {
            var e = Array.prototype.slice.call(arguments, 1),
              i =
                "function" == typeof t
                  ? t
                  : function() {
                      this[t].apply(this, e);
                    };
            (this.prototype._initHooks =
              this.prototype._initHooks || []), this.prototype._initHooks.push(
              i
            );
          });
          var a = "_leaflet_events";
          (o.Mixin = {}), (o.Mixin.Events = {
            addEventListener: function(t, e, i) {
              if (o.Util.invokeEach(t, this.addEventListener, this, e, i))
                return this;
              var n,
                s,
                r,
                h,
                c,
                u,
                l,
                f = (this[a] = this[a] || {}),
                d = i && o.stamp(i);
              for (t = o.Util.splitWords(t), n = 0, s = t.length; s > n; n++)
                (r = { action: e, context: i || this }), (h = t[n]), i
                  ? (
                      (c = h + "_idx"),
                      (u = c + "_len"),
                      (l = f[c] = f[c] || {}),
                      l[d] || ((l[d] = []), (f[u] = (f[u] || 0) + 1)),
                      l[d].push(r)
                    )
                  : ((f[h] = f[h] || []), f[h].push(r));
              return this;
            },
            hasEventListeners: function(t) {
              var e = this[a];
              return (
                !!e &&
                ((t in e && e[t].length > 0) ||
                  (t + "_idx" in e && e[t + "_idx_len"] > 0))
              );
            },
            removeEventListener: function(t, e, i) {
              if (!this[a]) return this;
              if (!t) return this.clearAllEventListeners();
              if (o.Util.invokeEach(t, this.removeEventListener, this, e, i))
                return this;
              var n,
                s,
                r,
                h,
                c,
                u,
                l,
                f,
                d,
                p = this[a],
                m = i && o.stamp(i);
              for (t = o.Util.splitWords(t), n = 0, s = t.length; s > n; n++)
                if (
                  (
                    (r = t[n]),
                    (u = r + "_idx"),
                    (l = u + "_len"),
                    (f = p[u]),
                    e
                  )
                ) {
                  if ((h = i && f ? f[m] : p[r])) {
                    for (c = h.length - 1; c >= 0; c--)
                      h[c].action !== e ||
                        (i && h[c].context !== i) ||
                        ((d = h.splice(c, 1)), (d[0].action = o.Util.falseFn));
                    i && f && 0 === h.length && (delete f[m], p[l]--);
                  }
                } else delete p[r], delete p[u];
              return this;
            },
            clearAllEventListeners: function() {
              return delete this[a], this;
            },
            fireEvent: function(t, e) {
              if (!this.hasEventListeners(t)) return this;
              var i,
                n,
                s,
                r,
                h,
                c = o.Util.extend({}, e, { type: t, target: this }),
                u = this[a];
              if (u[t])
                for (i = u[t].slice(), n = 0, s = i.length; s > n; n++)
                  i[n].action.call(i[n].context || this, c);
              r = u[t + "_idx"];
              for (h in r)
                if ((i = r[h].slice()))
                  for (n = 0, s = i.length; s > n; n++)
                    i[n].action.call(i[n].context || this, c);
              return this;
            },
            addOneTimeEventListener: function(t, e, i) {
              if (
                o.Util.invokeEach(t, this.addOneTimeEventListener, this, e, i)
              )
                return this;
              var n = o.bind(function() {
                this.removeEventListener(t, e, i).removeEventListener(t, n, i);
              }, this);
              return this.addEventListener(t, e, i).addEventListener(t, n, i);
            }
          }), (o.Mixin.Events.on =
            o.Mixin.Events.addEventListener), (o.Mixin.Events.off =
            o.Mixin.Events.removeEventListener), (o.Mixin.Events.once =
            o.Mixin.Events.addOneTimeEventListener), (o.Mixin.Events.fire =
            o.Mixin.Events.fireEvent), (function() {
            var e = !!t.ActiveXObject,
              s = e && !t.XMLHttpRequest,
              a = e && !i.querySelector,
              r = e && !i.addEventListener,
              h = navigator.userAgent.toLowerCase(),
              c = -1 !== h.indexOf("webkit"),
              u = -1 !== h.indexOf("chrome"),
              l = -1 !== h.indexOf("phantom"),
              f = -1 !== h.indexOf("android"),
              d = -1 !== h.search("android [23]"),
              p = typeof orientation != n + "",
              m =
                t.navigator &&
                t.navigator.msPointerEnabled &&
                t.navigator.msMaxTouchPoints,
              _ =
                ("devicePixelRatio" in t && t.devicePixelRatio > 1) ||
                ("matchMedia" in t &&
                  t.matchMedia("(min-resolution:144dpi)") &&
                  t.matchMedia("(min-resolution:144dpi)").matches),
              g = i.documentElement,
              y = e && "transition" in g.style,
              v = "WebKitCSSMatrix" in t && "m11" in new t.WebKitCSSMatrix(),
              b = "MozPerspective" in g.style,
              M = "OTransition" in g.style,
              w = !t.L_DISABLE_3D && (y || v || b || M) && !l,
              x =
                !t.L_NO_TOUCH &&
                !l &&
                (function() {
                  var t = "ontouchstart";
                  if (m || t in g) return !0;
                  var e = i.createElement("div"),
                    n = !1;
                  return e.setAttribute
                    ? (
                        e.setAttribute(t, "return;"),
                        "function" == typeof e[t] && (n = !0),
                        e.removeAttribute(t),
                        (e = null),
                        n
                      )
                    : !1;
                })();
            o.Browser = {
              ie: e,
              ie6: s,
              ie7: a,
              ielt9: r,
              webkit: c,
              android: f,
              android23: d,
              chrome: u,
              ie3d: y,
              webkit3d: v,
              gecko3d: b,
              opera3d: M,
              any3d: w,
              mobile: p,
              mobileWebkit: p && c,
              mobileWebkit3d: p && v,
              mobileOpera: p && t.opera,
              touch: x,
              msTouch: m,
              retina: _
            };
          })(), (o.Point = function(t, e, i) {
            (this.x = i ? Math.round(t) : t), (this.y = i ? Math.round(e) : e);
          }), (o.Point.prototype = {
            clone: function() {
              return new o.Point(this.x, this.y);
            },
            add: function(t) {
              return this.clone()._add(o.point(t));
            },
            _add: function(t) {
              return (this.x += t.x), (this.y += t.y), this;
            },
            subtract: function(t) {
              return this.clone()._subtract(o.point(t));
            },
            _subtract: function(t) {
              return (this.x -= t.x), (this.y -= t.y), this;
            },
            divideBy: function(t) {
              return this.clone()._divideBy(t);
            },
            _divideBy: function(t) {
              return (this.x /= t), (this.y /= t), this;
            },
            multiplyBy: function(t) {
              return this.clone()._multiplyBy(t);
            },
            _multiplyBy: function(t) {
              return (this.x *= t), (this.y *= t), this;
            },
            round: function() {
              return this.clone()._round();
            },
            _round: function() {
              return (this.x = Math.round(this.x)), (this.y = Math.round(
                this.y
              )), this;
            },
            floor: function() {
              return this.clone()._floor();
            },
            _floor: function() {
              return (this.x = Math.floor(this.x)), (this.y = Math.floor(
                this.y
              )), this;
            },
            distanceTo: function(t) {
              t = o.point(t);
              var e = t.x - this.x,
                i = t.y - this.y;
              return Math.sqrt(e * e + i * i);
            },
            equals: function(t) {
              return (t = o.point(t)), t.x === this.x && t.y === this.y;
            },
            contains: function(t) {
              return (t = o.point(t)), Math.abs(t.x) <= Math.abs(this.x) &&
                Math.abs(t.y) <= Math.abs(this.y);
            },
            toString: function() {
              return (
                "Point(" +
                o.Util.formatNum(this.x) +
                ", " +
                o.Util.formatNum(this.y) +
                ")"
              );
            }
          }), (o.point = function(t, e, i) {
            return t instanceof o.Point
              ? t
              : o.Util.isArray(t)
                ? new o.Point(t[0], t[1])
                : t === n || null === t ? t : new o.Point(t, e, i);
          }), (o.Bounds = function(t, e) {
            if (t)
              for (var i = e ? [t, e] : t, n = 0, s = i.length; s > n; n++)
                this.extend(i[n]);
          }), (o.Bounds.prototype = {
            extend: function(t) {
              return (t = o.point(t)), this.min || this.max
                ? (
                    (this.min.x = Math.min(t.x, this.min.x)),
                    (this.max.x = Math.max(t.x, this.max.x)),
                    (this.min.y = Math.min(t.y, this.min.y)),
                    (this.max.y = Math.max(t.y, this.max.y))
                  )
                : ((this.min = t.clone()), (this.max = t.clone())), this;
            },
            getCenter: function(t) {
              return new o.Point(
                (this.min.x + this.max.x) / 2,
                (this.min.y + this.max.y) / 2,
                t
              );
            },
            getBottomLeft: function() {
              return new o.Point(this.min.x, this.max.y);
            },
            getTopRight: function() {
              return new o.Point(this.max.x, this.min.y);
            },
            getSize: function() {
              return this.max.subtract(this.min);
            },
            contains: function(t) {
              var e, i;
              return (t =
                "number" == typeof t[0] || t instanceof o.Point
                  ? o.point(t)
                  : o.bounds(t)), t instanceof o.Bounds
                ? ((e = t.min), (i = t.max))
                : (e = i = t), e.x >= this.min.x &&
                i.x <= this.max.x &&
                e.y >= this.min.y &&
                i.y <= this.max.y;
            },
            intersects: function(t) {
              t = o.bounds(t);
              var e = this.min,
                i = this.max,
                n = t.min,
                s = t.max,
                a = s.x >= e.x && n.x <= i.x,
                r = s.y >= e.y && n.y <= i.y;
              return a && r;
            },
            isValid: function() {
              return !(!this.min || !this.max);
            }
          }), (o.bounds = function(t, e) {
            return !t || t instanceof o.Bounds ? t : new o.Bounds(t, e);
          }), (o.Transformation = function(t, e, i, n) {
            (this._a = t), (this._b = e), (this._c = i), (this._d = n);
          }), (o.Transformation.prototype = {
            transform: function(t, e) {
              return this._transform(t.clone(), e);
            },
            _transform: function(t, e) {
              return (e = e || 1), (t.x = e * (this._a * t.x + this._b)), (t.y =
                e * (this._c * t.y + this._d)), t;
            },
            untransform: function(t, e) {
              return (e = e || 1), new o.Point(
                (t.x / e - this._b) / this._a,
                (t.y / e - this._d) / this._c
              );
            }
          }), (o.DomUtil = {
            get: function(t) {
              return "string" == typeof t ? i.getElementById(t) : t;
            },
            getStyle: function(t, e) {
              var n = t.style[e];
              if (
                (
                  !n && t.currentStyle && (n = t.currentStyle[e]),
                  (!n || "auto" === n) && i.defaultView
                )
              ) {
                var s = i.defaultView.getComputedStyle(t, null);
                n = s ? s[e] : null;
              }
              return "auto" === n ? null : n;
            },
            getViewportOffset: function(t) {
              var e,
                n = 0,
                s = 0,
                a = t,
                r = i.body,
                h = i.documentElement,
                c = o.Browser.ie7;
              do {
                if (
                  (
                    (n += a.offsetTop || 0),
                    (s += a.offsetLeft || 0),
                    (n +=
                      parseInt(o.DomUtil.getStyle(a, "borderTopWidth"), 10) ||
                      0),
                    (s +=
                      parseInt(o.DomUtil.getStyle(a, "borderLeftWidth"), 10) ||
                      0),
                    (e = o.DomUtil.getStyle(a, "position")),
                    a.offsetParent === r && "absolute" === e
                  )
                )
                  break;
                if ("fixed" === e) {
                  (n += r.scrollTop || h.scrollTop || 0), (s +=
                    r.scrollLeft || h.scrollLeft || 0);
                  break;
                }
                if ("relative" === e && !a.offsetLeft) {
                  var u = o.DomUtil.getStyle(a, "width"),
                    l = o.DomUtil.getStyle(a, "max-width"),
                    f = a.getBoundingClientRect();
                  ("none" !== u || "none" !== l) &&
                    (s += f.left + a.clientLeft), (n +=
                    f.top + (r.scrollTop || h.scrollTop || 0));
                  break;
                }
                a = a.offsetParent;
              } while (a);
              a = t;
              do {
                if (a === r) break;
                (n -= a.scrollTop || 0), (s -=
                  a.scrollLeft || 0), o.DomUtil.documentIsLtr() ||
                  (!o.Browser.webkit && !c) ||
                  (
                    (s += a.scrollWidth - a.clientWidth),
                    c &&
                      "hidden" !== o.DomUtil.getStyle(a, "overflow-y") &&
                      "hidden" !== o.DomUtil.getStyle(a, "overflow") &&
                      (s += 17)
                  ), (a = a.parentNode);
              } while (a);
              return new o.Point(s, n);
            },
            documentIsLtr: function() {
              return o.DomUtil._docIsLtrCached ||
                (
                  (o.DomUtil._docIsLtrCached = !0),
                  (o.DomUtil._docIsLtr =
                    "ltr" === o.DomUtil.getStyle(i.body, "direction"))
                ), o.DomUtil._docIsLtr;
            },
            create: function(t, e, n) {
              var s = i.createElement(t);
              return (s.className = e), n && n.appendChild(s), s;
            },
            hasClass: function(t, e) {
              return (
                t.className.length > 0 &&
                new RegExp("(^|\\s)" + e + "(\\s|$)").test(t.className)
              );
            },
            addClass: function(t, e) {
              o.DomUtil.hasClass(t, e) ||
                (t.className += (t.className ? " " : "") + e);
            },
            removeClass: function(t, e) {
              t.className = o.Util.trim(
                (" " + t.className + " ").replace(" " + e + " ", " ")
              );
            },
            setOpacity: function(t, e) {
              if ("opacity" in t.style) t.style.opacity = e;
              else if ("filter" in t.style) {
                var i = !1,
                  n = "DXImageTransform.Microsoft.Alpha";
                try {
                  i = t.filters.item(n);
                } catch (s) {
                  if (1 === e) return;
                }
                (e = Math.round(100 * e)), i
                  ? ((i.Enabled = 100 !== e), (i.Opacity = e))
                  : (t.style.filter += " progid:" + n + "(opacity=" + e + ")");
              }
            },
            testProp: function(t) {
              for (var e = i.documentElement.style, n = 0; n < t.length; n++)
                if (t[n] in e) return t[n];
              return !1;
            },
            getTranslateString: function(t) {
              var e = o.Browser.webkit3d,
                i = "translate" + (e ? "3d" : "") + "(",
                n = (e ? ",0" : "") + ")";
              return i + t.x + "px," + t.y + "px" + n;
            },
            getScaleString: function(t, e) {
              var i = o.DomUtil.getTranslateString(e.add(e.multiplyBy(-1 * t))),
                n = " scale(" + t + ") ";
              return i + n;
            },
            setPosition: function(t, e, i) {
              (t._leaflet_pos = e), !i && o.Browser.any3d
                ? (
                    (t.style[
                      o.DomUtil.TRANSFORM
                    ] = o.DomUtil.getTranslateString(e)),
                    o.Browser.mobileWebkit3d &&
                      (t.style.WebkitBackfaceVisibility = "hidden")
                  )
                : ((t.style.left = e.x + "px"), (t.style.top = e.y + "px"));
            },
            getPosition: function(t) {
              return t._leaflet_pos;
            }
          }), (o.DomUtil.TRANSFORM = o.DomUtil.testProp([
            "transform",
            "WebkitTransform",
            "OTransform",
            "MozTransform",
            "msTransform"
          ])), (o.DomUtil.TRANSITION = o.DomUtil.testProp([
            "webkitTransition",
            "transition",
            "OTransition",
            "MozTransition",
            "msTransition"
          ])), (o.DomUtil.TRANSITION_END =
            "webkitTransition" === o.DomUtil.TRANSITION ||
            "OTransition" === o.DomUtil.TRANSITION
              ? o.DomUtil.TRANSITION + "End"
              : "transitionend"), (function() {
            var e = o.DomUtil.testProp([
              "userSelect",
              "WebkitUserSelect",
              "OUserSelect",
              "MozUserSelect",
              "msUserSelect"
            ]);
            o.extend(o.DomUtil, {
              disableTextSelection: function() {
                if (
                  (
                    o.DomEvent.on(t, "selectstart", o.DomEvent.preventDefault),
                    e
                  )
                ) {
                  var n = i.documentElement.style;
                  (this._userSelect = n[e]), (n[e] = "none");
                }
              },
              enableTextSelection: function() {
                o.DomEvent.off(
                  t,
                  "selectstart",
                  o.DomEvent.preventDefault
                ), e &&
                  (
                    (i.documentElement.style[e] = this._userSelect),
                    delete this._userSelect
                  );
              },
              disableImageDrag: function() {
                o.DomEvent.on(t, "dragstart", o.DomEvent.preventDefault);
              },
              enableImageDrag: function() {
                o.DomEvent.off(t, "dragstart", o.DomEvent.preventDefault);
              }
            });
          })(), (o.LatLng = function(t, e) {
            var i = parseFloat(t),
              n = parseFloat(e);
            if (isNaN(i) || isNaN(n))
              throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
            (this.lat = i), (this.lng = n);
          }), o.extend(o.LatLng, {
            DEG_TO_RAD: Math.PI / 180,
            RAD_TO_DEG: 180 / Math.PI,
            MAX_MARGIN: 1e-9
          }), (o.LatLng.prototype = {
            equals: function(t) {
              if (!t) return !1;
              t = o.latLng(t);
              var e = Math.max(
                Math.abs(this.lat - t.lat),
                Math.abs(this.lng - t.lng)
              );
              return e <= o.LatLng.MAX_MARGIN;
            },
            toString: function(t) {
              return (
                "LatLng(" +
                o.Util.formatNum(this.lat, t) +
                ", " +
                o.Util.formatNum(this.lng, t) +
                ")"
              );
            },
            distanceTo: function(t) {
              t = o.latLng(t);
              var e = 6378137,
                i = o.LatLng.DEG_TO_RAD,
                n = (t.lat - this.lat) * i,
                s = (t.lng - this.lng) * i,
                a = this.lat * i,
                r = t.lat * i,
                h = Math.sin(n / 2),
                c = Math.sin(s / 2),
                u = h * h + c * c * Math.cos(a) * Math.cos(r);
              return 2 * e * Math.atan2(Math.sqrt(u), Math.sqrt(1 - u));
            },
            wrap: function(t, e) {
              var i = this.lng;
              return (t = t || -180), (e = e || 180), (i =
                (i + e) % (e - t) + (t > i || i === e ? e : t)), new o.LatLng(
                this.lat,
                i
              );
            }
          }), (o.latLng = function(t, e) {
            return t instanceof o.LatLng
              ? t
              : o.Util.isArray(t)
                ? new o.LatLng(t[0], t[1])
                : t === n || null === t
                  ? t
                  : "object" == typeof t && "lat" in t
                    ? new o.LatLng(t.lat, "lng" in t ? t.lng : t.lon)
                    : new o.LatLng(t, e);
          }), (o.LatLngBounds = function(t, e) {
            if (t)
              for (var i = e ? [t, e] : t, n = 0, s = i.length; s > n; n++)
                this.extend(i[n]);
          }), (o.LatLngBounds.prototype = {
            extend: function(t) {
              return t
                ? (
                    (t =
                      "number" == typeof t[0] ||
                      "string" == typeof t[0] ||
                      t instanceof o.LatLng
                        ? o.latLng(t)
                        : o.latLngBounds(t)),
                    t instanceof o.LatLng
                      ? this._southWest || this._northEast
                        ? (
                            (this._southWest.lat = Math.min(
                              t.lat,
                              this._southWest.lat
                            )),
                            (this._southWest.lng = Math.min(
                              t.lng,
                              this._southWest.lng
                            )),
                            (this._northEast.lat = Math.max(
                              t.lat,
                              this._northEast.lat
                            )),
                            (this._northEast.lng = Math.max(
                              t.lng,
                              this._northEast.lng
                            ))
                          )
                        : (
                            (this._southWest = new o.LatLng(t.lat, t.lng)),
                            (this._northEast = new o.LatLng(t.lat, t.lng))
                          )
                      : t instanceof o.LatLngBounds &&
                        (this.extend(t._southWest), this.extend(t._northEast)),
                    this
                  )
                : this;
            },
            pad: function(t) {
              var e = this._southWest,
                i = this._northEast,
                n = Math.abs(e.lat - i.lat) * t,
                s = Math.abs(e.lng - i.lng) * t;
              return new o.LatLngBounds(
                new o.LatLng(e.lat - n, e.lng - s),
                new o.LatLng(i.lat + n, i.lng + s)
              );
            },
            getCenter: function() {
              return new o.LatLng(
                (this._southWest.lat + this._northEast.lat) / 2,
                (this._southWest.lng + this._northEast.lng) / 2
              );
            },
            getSouthWest: function() {
              return this._southWest;
            },
            getNorthEast: function() {
              return this._northEast;
            },
            getNorthWest: function() {
              return new o.LatLng(this.getNorth(), this.getWest());
            },
            getSouthEast: function() {
              return new o.LatLng(this.getSouth(), this.getEast());
            },
            getWest: function() {
              return this._southWest.lng;
            },
            getSouth: function() {
              return this._southWest.lat;
            },
            getEast: function() {
              return this._northEast.lng;
            },
            getNorth: function() {
              return this._northEast.lat;
            },
            contains: function(t) {
              t =
                "number" == typeof t[0] || t instanceof o.LatLng
                  ? o.latLng(t)
                  : o.latLngBounds(t);
              var e,
                i,
                n = this._southWest,
                s = this._northEast;
              return t instanceof o.LatLngBounds
                ? ((e = t.getSouthWest()), (i = t.getNorthEast()))
                : (e = i = t), e.lat >= n.lat &&
                i.lat <= s.lat &&
                e.lng >= n.lng &&
                i.lng <= s.lng;
            },
            intersects: function(t) {
              t = o.latLngBounds(t);
              var e = this._southWest,
                i = this._northEast,
                n = t.getSouthWest(),
                s = t.getNorthEast(),
                a = s.lat >= e.lat && n.lat <= i.lat,
                r = s.lng >= e.lng && n.lng <= i.lng;
              return a && r;
            },
            toBBoxString: function() {
              return [
                this.getWest(),
                this.getSouth(),
                this.getEast(),
                this.getNorth()
              ].join(",");
            },
            equals: function(t) {
              return t
                ? (
                    (t = o.latLngBounds(t)),
                    this._southWest.equals(t.getSouthWest()) &&
                      this._northEast.equals(t.getNorthEast())
                  )
                : !1;
            },
            isValid: function() {
              return !(!this._southWest || !this._northEast);
            }
          }), (o.latLngBounds = function(t, e) {
            return !t || t instanceof o.LatLngBounds
              ? t
              : new o.LatLngBounds(t, e);
          }), (o.Projection = {}), (o.Projection.SphericalMercator = {
            MAX_LATITUDE: 85.0511287798,
            project: function(t) {
              var e = o.LatLng.DEG_TO_RAD,
                i = this.MAX_LATITUDE,
                n = Math.max(Math.min(i, t.lat), -i),
                s = t.lng * e,
                a = n * e;
              return (a = Math.log(Math.tan(Math.PI / 4 + a / 2))), new o.Point(
                s,
                a
              );
            },
            unproject: function(t) {
              var e = o.LatLng.RAD_TO_DEG,
                i = t.x * e,
                n = (2 * Math.atan(Math.exp(t.y)) - Math.PI / 2) * e;
              return new o.LatLng(n, i);
            }
          }), (o.Projection.LonLat = {
            project: function(t) {
              return new o.Point(t.lng, t.lat);
            },
            unproject: function(t) {
              return new o.LatLng(t.y, t.x);
            }
          }), (o.CRS = {
            latLngToPoint: function(t, e) {
              var i = this.projection.project(t),
                n = this.scale(e);
              return this.transformation._transform(i, n);
            },
            pointToLatLng: function(t, e) {
              var i = this.scale(e),
                n = this.transformation.untransform(t, i);
              return this.projection.unproject(n);
            },
            project: function(t) {
              return this.projection.project(t);
            },
            scale: function(t) {
              return 256 * Math.pow(2, t);
            }
          }), (o.CRS.Simple = o.extend({}, o.CRS, {
            projection: o.Projection.LonLat,
            transformation: new o.Transformation(1, 0, -1, 0),
            scale: function(t) {
              return Math.pow(2, t);
            }
          })), (o.CRS.EPSG3857 = o.extend({}, o.CRS, {
            code: "EPSG:3857",
            projection: o.Projection.SphericalMercator,
            transformation: new o.Transformation(
              0.5 / Math.PI,
              0.5,
              -0.5 / Math.PI,
              0.5
            ),
            project: function(t) {
              var e = this.projection.project(t),
                i = 6378137;
              return e.multiplyBy(i);
            }
          })), (o.CRS.EPSG900913 = o.extend({}, o.CRS.EPSG3857, {
            code: "EPSG:900913"
          })), (o.CRS.EPSG4326 = o.extend({}, o.CRS, {
            code: "EPSG:4326",
            projection: o.Projection.LonLat,
            transformation: new o.Transformation(1 / 360, 0.5, -1 / 360, 0.5)
          })), (o.Map = o.Class.extend({
            includes: o.Mixin.Events,
            options: {
              crs: o.CRS.EPSG3857,
              fadeAnimation: o.DomUtil.TRANSITION && !o.Browser.android23,
              trackResize: !0,
              markerZoomAnimation: o.DomUtil.TRANSITION && o.Browser.any3d
            },
            initialize: function(t, e) {
              (e = o.setOptions(this, e)), this._initContainer(
                t
              ), this._initLayout(), this._initEvents(), e.maxBounds &&
                this.setMaxBounds(e.maxBounds), e.center &&
                e.zoom !== n &&
                this.setView(o.latLng(e.center), e.zoom, {
                  reset: !0
                }), (this._handlers = []), (this._layers = {}), (this._zoomBoundLayers = {}), (this._tileLayersNum = 0), this.callInitHooks(), this._addLayers(
                e.layers
              );
            },
            setView: function(t, e) {
              return this._resetView(o.latLng(t), this._limitZoom(e)), this;
            },
            setZoom: function(t, e) {
              return this.setView(this.getCenter(), t, { zoom: e });
            },
            zoomIn: function(t, e) {
              return this.setZoom(this._zoom + (t || 1), e);
            },
            zoomOut: function(t, e) {
              return this.setZoom(this._zoom - (t || 1), e);
            },
            setZoomAround: function(t, e, i) {
              var n = this.getZoomScale(e),
                s = this.getSize().divideBy(2),
                a = t instanceof o.Point ? t : this.latLngToContainerPoint(t),
                r = a.subtract(s).multiplyBy(1 - 1 / n),
                h = this.containerPointToLatLng(s.add(r));
              return this.setView(h, e, { zoom: i });
            },
            fitBounds: function(t, e) {
              (e = e || {}), (t = t.getBounds
                ? t.getBounds()
                : o.latLngBounds(t));
              var i = o.point(e.paddingTopLeft || e.padding || [0, 0]),
                n = o.point(e.paddingBottomRight || e.padding || [0, 0]),
                s = this.getBoundsZoom(t, !1, i.add(n)),
                a = n.subtract(i).divideBy(2),
                r = this.project(t.getSouthWest(), s),
                h = this.project(t.getNorthEast(), s),
                c = this.unproject(r.add(h).divideBy(2).add(a), s);
              return this.setView(c, s, e);
            },
            fitWorld: function(t) {
              return this.fitBounds([[-90, -180], [90, 180]], t);
            },
            panTo: function(t, e) {
              return this.setView(t, this._zoom, { pan: e });
            },
            panBy: function(t) {
              return this.fire("movestart"), this._rawPanBy(
                o.point(t)
              ), this.fire("move"), this.fire("moveend");
            },
            setMaxBounds: function(t, e) {
              if (((t = o.latLngBounds(t)), (this.options.maxBounds = t), !t))
                return (this._boundsMinZoom = null), this.off(
                  "moveend",
                  this._panInsideMaxBounds,
                  this
                ), this;
              var i = this.getBoundsZoom(t, !0);
              return (this._boundsMinZoom = i), this._loaded &&
                (this._zoom < i
                  ? this.setView(t.getCenter(), i, e)
                  : this.panInsideBounds(t)), this.on(
                "moveend",
                this._panInsideMaxBounds,
                this
              ), this;
            },
            panInsideBounds: function(t) {
              t = o.latLngBounds(t);
              var e = this.getPixelBounds(),
                i = e.getBottomLeft(),
                n = e.getTopRight(),
                s = this.project(t.getSouthWest()),
                a = this.project(t.getNorthEast()),
                r = 0,
                h = 0;
              return n.y < a.y && (h = Math.ceil(a.y - n.y)), n.x > a.x &&
                (r = Math.floor(a.x - n.x)), i.y > s.y &&
                (h = Math.floor(s.y - i.y)), i.x < s.x &&
                (r = Math.ceil(s.x - i.x)), r || h ? this.panBy([r, h]) : this;
            },
            addLayer: function(t) {
              var e = o.stamp(t);
              return this._layers[e]
                ? this
                : (
                    (this._layers[e] = t),
                    !t.options ||
                      (isNaN(t.options.maxZoom) && isNaN(t.options.minZoom)) ||
                      (
                        (this._zoomBoundLayers[e] = t),
                        this._updateZoomLevels()
                      ),
                    this.options.zoomAnimation &&
                      o.TileLayer &&
                      t instanceof o.TileLayer &&
                      (
                        this._tileLayersNum++,
                        this._tileLayersToLoad++,
                        t.on("load", this._onTileLayerLoad, this)
                      ),
                    this._loaded && this._layerAdd(t),
                    this
                  );
            },
            removeLayer: function(t) {
              var e = o.stamp(t);
              return this._layers[e]
                ? (
                    this._loaded && t.onRemove(this),
                    delete this._layers[e],
                    this._loaded && this.fire("layerremove", { layer: t }),
                    this._zoomBoundLayers[e] &&
                      (
                        delete this._zoomBoundLayers[e],
                        this._updateZoomLevels()
                      ),
                    this.options.zoomAnimation &&
                      o.TileLayer &&
                      t instanceof o.TileLayer &&
                      (
                        this._tileLayersNum--,
                        this._tileLayersToLoad--,
                        t.off("load", this._onTileLayerLoad, this)
                      ),
                    this
                  )
                : void 0;
            },
            hasLayer: function(t) {
              return t ? o.stamp(t) in this._layers : !1;
            },
            eachLayer: function(t, e) {
              for (var i in this._layers) t.call(e, this._layers[i]);
              return this;
            },
            invalidateSize: function(t) {
              t = o.extend(
                { animate: !1, pan: !0 },
                t === !0 ? { animate: !0 } : t
              );
              var e = this.getSize();
              if (
                (
                  (this._sizeChanged = !0),
                  this.options.maxBounds &&
                    this.setMaxBounds(this.options.maxBounds),
                  !this._loaded
                )
              )
                return this;
              var i = this.getSize(),
                n = e.subtract(i).divideBy(2).round();
              return n.x || n.y
                ? (
                    t.animate && t.pan
                      ? this.panBy(n)
                      : (
                          t.pan && this._rawPanBy(n),
                          this.fire("move"),
                          clearTimeout(this._sizeTimer),
                          (this._sizeTimer = setTimeout(
                            o.bind(this.fire, this, "moveend"),
                            200
                          ))
                        ),
                    this.fire("resize", { oldSize: e, newSize: i })
                  )
                : this;
            },
            addHandler: function(t, e) {
              if (e) {
                var i = (this[t] = new e(this));
                return this._handlers.push(i), this.options[t] &&
                  i.enable(), this;
              }
            },
            remove: function() {
              return this._loaded && this.fire("unload"), this._initEvents(
                "off"
              ), delete this._container._leaflet, this._clearPanes(), this
                ._clearControlPos &&
                this._clearControlPos(), this._clearHandlers(), this;
            },
            getCenter: function() {
              return this._checkIfLoaded(), this._moved()
                ? this.layerPointToLatLng(this._getCenterLayerPoint())
                : this._initialCenter;
            },
            getZoom: function() {
              return this._zoom;
            },
            getBounds: function() {
              var t = this.getPixelBounds(),
                e = this.unproject(t.getBottomLeft()),
                i = this.unproject(t.getTopRight());
              return new o.LatLngBounds(e, i);
            },
            getMinZoom: function() {
              var t = this._layersMinZoom === n ? 0 : this._layersMinZoom,
                e = this._boundsMinZoom === n ? 0 : this._boundsMinZoom;
              return this.options.minZoom === n
                ? Math.max(t, e)
                : this.options.minZoom;
            },
            getMaxZoom: function() {
              return this.options.maxZoom === n
                ? this._layersMaxZoom === n ? 1 / 0 : this._layersMaxZoom
                : this.options.maxZoom;
            },
            getBoundsZoom: function(t, e, i) {
              t = o.latLngBounds(t);
              var n,
                s = this.getMinZoom() - (e ? 1 : 0),
                a = this.getMaxZoom(),
                r = this.getSize(),
                h = t.getNorthWest(),
                c = t.getSouthEast(),
                u = !0;
              i = o.point(i || [0, 0]);
              do
                s++, (n = this.project(c, s)
                  .subtract(this.project(h, s))
                  .add(i)), (u = e ? n.x < r.x || n.y < r.y : r.contains(n));
              while (u && a >= s);
              return u && e ? null : e ? s : s - 1;
            },
            getSize: function() {
              return (!this._size || this._sizeChanged) &&
                (
                  (this._size = new o.Point(
                    this._container.clientWidth,
                    this._container.clientHeight
                  )),
                  (this._sizeChanged = !1)
                ), this._size.clone();
            },
            getPixelBounds: function() {
              var t = this._getTopLeftPoint();
              return new o.Bounds(t, t.add(this.getSize()));
            },
            getPixelOrigin: function() {
              return this._checkIfLoaded(), this._initialTopLeftPoint;
            },
            getPanes: function() {
              return this._panes;
            },
            getContainer: function() {
              return this._container;
            },
            getZoomScale: function(t) {
              var e = this.options.crs;
              return e.scale(t) / e.scale(this._zoom);
            },
            getScaleZoom: function(t) {
              return this._zoom + Math.log(t) / Math.LN2;
            },
            project: function(t, e) {
              return (e =
                e === n ? this._zoom : e), this.options.crs.latLngToPoint(
                o.latLng(t),
                e
              );
            },
            unproject: function(t, e) {
              return (e =
                e === n ? this._zoom : e), this.options.crs.pointToLatLng(
                o.point(t),
                e
              );
            },
            layerPointToLatLng: function(t) {
              var e = o.point(t).add(this.getPixelOrigin());
              return this.unproject(e);
            },
            latLngToLayerPoint: function(t) {
              var e = this.project(o.latLng(t))._round();
              return e._subtract(this.getPixelOrigin());
            },
            containerPointToLayerPoint: function(t) {
              return o.point(t).subtract(this._getMapPanePos());
            },
            layerPointToContainerPoint: function(t) {
              return o.point(t).add(this._getMapPanePos());
            },
            containerPointToLatLng: function(t) {
              var e = this.containerPointToLayerPoint(o.point(t));
              return this.layerPointToLatLng(e);
            },
            latLngToContainerPoint: function(t) {
              return this.layerPointToContainerPoint(
                this.latLngToLayerPoint(o.latLng(t))
              );
            },
            mouseEventToContainerPoint: function(t) {
              return o.DomEvent.getMousePosition(t, this._container);
            },
            mouseEventToLayerPoint: function(t) {
              return this.containerPointToLayerPoint(
                this.mouseEventToContainerPoint(t)
              );
            },
            mouseEventToLatLng: function(t) {
              return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
            },
            _initContainer: function(t) {
              var e = (this._container = o.DomUtil.get(t));
              if (!e) throw new Error("Map container not found.");
              if (e._leaflet)
                throw new Error("Map container is already initialized.");
              e._leaflet = !0;
            },
            _initLayout: function() {
              var t = this._container;
              o.DomUtil.addClass(
                t,
                "leaflet-container" +
                  (o.Browser.touch ? " leaflet-touch" : "") +
                  (o.Browser.retina ? " leaflet-retina" : "") +
                  (this.options.fadeAnimation ? " leaflet-fade-anim" : "")
              );
              var e = o.DomUtil.getStyle(t, "position");
              "absolute" !== e &&
                "relative" !== e &&
                "fixed" !== e &&
                (t.style.position = "relative"), this._initPanes(), this
                ._initControlPos && this._initControlPos();
            },
            _initPanes: function() {
              var t = (this._panes = {});
              (this._mapPane = t.mapPane = this._createPane(
                "leaflet-map-pane",
                this._container
              )), (this._tilePane = t.tilePane = this._createPane(
                "leaflet-tile-pane",
                this._mapPane
              )), (t.objectsPane = this._createPane(
                "leaflet-objects-pane",
                this._mapPane
              )), (t.shadowPane = this._createPane(
                "leaflet-shadow-pane"
              )), (t.overlayPane = this._createPane(
                "leaflet-overlay-pane"
              )), (t.markerPane = this._createPane(
                "leaflet-marker-pane"
              )), (t.popupPane = this._createPane("leaflet-popup-pane"));
              var e = " leaflet-zoom-hide";
              this.options.markerZoomAnimation ||
                (
                  o.DomUtil.addClass(t.markerPane, e),
                  o.DomUtil.addClass(t.shadowPane, e),
                  o.DomUtil.addClass(t.popupPane, e)
                );
            },
            _createPane: function(t, e) {
              return o.DomUtil.create("div", t, e || this._panes.objectsPane);
            },
            _clearPanes: function() {
              this._container.removeChild(this._mapPane);
            },
            _addLayers: function(t) {
              t = t ? (o.Util.isArray(t) ? t : [t]) : [];
              for (var e = 0, i = t.length; i > e; e++) this.addLayer(t[e]);
            },
            _resetView: function(t, e, i, n) {
              var s = this._zoom !== e;
              n ||
                (
                  this.fire("movestart"),
                  s && this.fire("zoomstart")
                ), (this._zoom = e), (this._initialCenter = t), (this._initialTopLeftPoint = this._getNewTopLeftPoint(
                t
              )), i
                ? this._initialTopLeftPoint._add(this._getMapPanePos())
                : o.DomUtil.setPosition(
                    this._mapPane,
                    new o.Point(0, 0)
                  ), (this._tileLayersToLoad = this._tileLayersNum);
              var a = !this._loaded;
              (this._loaded = !0), a &&
                (
                  this.fire("load"),
                  this.eachLayer(this._layerAdd, this)
                ), this.fire("viewreset", { hard: !i }), this.fire(
                "move"
              ), (s || n) && this.fire("zoomend"), this.fire("moveend", {
                hard: !i
              });
            },
            _rawPanBy: function(t) {
              o.DomUtil.setPosition(
                this._mapPane,
                this._getMapPanePos().subtract(t)
              );
            },
            _getZoomSpan: function() {
              return this.getMaxZoom() - this.getMinZoom();
            },
            _updateZoomLevels: function() {
              var t,
                e = 1 / 0,
                i = -1 / 0,
                s = this._getZoomSpan();
              for (t in this._zoomBoundLayers) {
                var o = this._zoomBoundLayers[t];
                isNaN(o.options.minZoom) ||
                  (e = Math.min(e, o.options.minZoom)), isNaN(
                  o.options.maxZoom
                ) || (i = Math.max(i, o.options.maxZoom));
              }
              t === n
                ? (this._layersMaxZoom = this._layersMinZoom = n)
                : ((this._layersMaxZoom = i), (this._layersMinZoom = e)), s !==
                this._getZoomSpan() && this.fire("zoomlevelschange");
            },
            _panInsideMaxBounds: function() {
              this.panInsideBounds(this.options.maxBounds);
            },
            _checkIfLoaded: function() {
              if (!this._loaded)
                throw new Error("Set map center and zoom first.");
            },
            _initEvents: function(e) {
              if (o.DomEvent) {
                (e = e || "on"), o.DomEvent[e](
                  this._container,
                  "click",
                  this._onMouseClick,
                  this
                );
                var i,
                  n,
                  s = [
                    "dblclick",
                    "mousedown",
                    "mouseup",
                    "mouseenter",
                    "mouseleave",
                    "mousemove",
                    "contextmenu"
                  ];
                for (i = 0, n = s.length; n > i; i++)
                  o.DomEvent[e](
                    this._container,
                    s[i],
                    this._fireMouseEvent,
                    this
                  );
                this.options.trackResize &&
                  o.DomEvent[e](t, "resize", this._onResize, this);
              }
            },
            _onResize: function() {
              o.Util.cancelAnimFrame(
                this._resizeRequest
              ), (this._resizeRequest = o.Util.requestAnimFrame(
                this.invalidateSize,
                this,
                !1,
                this._container
              ));
            },
            _onMouseClick: function(t) {
              !this._loaded ||
                (!t._simulated && this.dragging && this.dragging.moved()) ||
                o.DomEvent._skipped(t) ||
                (this.fire("preclick"), this._fireMouseEvent(t));
            },
            _fireMouseEvent: function(t) {
              if (this._loaded && !o.DomEvent._skipped(t)) {
                var e = t.type;
                if (
                  (
                    (e =
                      "mouseenter" === e
                        ? "mouseover"
                        : "mouseleave" === e ? "mouseout" : e),
                    this.hasEventListeners(e)
                  )
                ) {
                  "contextmenu" === e && o.DomEvent.preventDefault(t);
                  var i = this.mouseEventToContainerPoint(t),
                    n = this.containerPointToLayerPoint(i),
                    s = this.layerPointToLatLng(n);
                  this.fire(e, {
                    latlng: s,
                    layerPoint: n,
                    containerPoint: i,
                    originalEvent: t
                  });
                }
              }
            },
            _onTileLayerLoad: function() {
              this._tileLayersToLoad--, this._tileLayersNum &&
                !this._tileLayersToLoad &&
                this.fire("tilelayersload");
            },
            _clearHandlers: function() {
              for (var t = 0, e = this._handlers.length; e > t; t++)
                this._handlers[t].disable();
            },
            whenReady: function(t, e) {
              return this._loaded
                ? t.call(e || this, this)
                : this.on("load", t, e), this;
            },
            _layerAdd: function(t) {
              t.onAdd(this), this.fire("layeradd", { layer: t });
            },
            _getMapPanePos: function() {
              return o.DomUtil.getPosition(this._mapPane);
            },
            _moved: function() {
              var t = this._getMapPanePos();
              return t && !t.equals([0, 0]);
            },
            _getTopLeftPoint: function() {
              return this.getPixelOrigin().subtract(this._getMapPanePos());
            },
            _getNewTopLeftPoint: function(t, e) {
              var i = this.getSize()._divideBy(2);
              return this.project(t, e)._subtract(i)._round();
            },
            _latLngToNewLayerPoint: function(t, e, i) {
              var n = this._getNewTopLeftPoint(i, e).add(this._getMapPanePos());
              return this.project(t, e)._subtract(n);
            },
            _getCenterLayerPoint: function() {
              return this.containerPointToLayerPoint(
                this.getSize()._divideBy(2)
              );
            },
            _getCenterOffset: function(t) {
              return this.latLngToLayerPoint(t).subtract(
                this._getCenterLayerPoint()
              );
            },
            _limitZoom: function(t) {
              var e = this.getMinZoom(),
                i = this.getMaxZoom();
              return Math.max(e, Math.min(i, t));
            }
          })), (o.map = function(t, e) {
            return new o.Map(t, e);
          }), (o.Projection.Mercator = {
            MAX_LATITUDE: 85.0840591556,
            R_MINOR: 6356752.314245179,
            R_MAJOR: 6378137,
            project: function(t) {
              var e = o.LatLng.DEG_TO_RAD,
                i = this.MAX_LATITUDE,
                n = Math.max(Math.min(i, t.lat), -i),
                s = this.R_MAJOR,
                a = this.R_MINOR,
                r = t.lng * e * s,
                h = n * e,
                c = a / s,
                u = Math.sqrt(1 - c * c),
                l = u * Math.sin(h);
              l = Math.pow((1 - l) / (1 + l), 0.5 * u);
              var f = Math.tan(0.5 * (0.5 * Math.PI - h)) / l;
              return (h = -s * Math.log(f)), new o.Point(r, h);
            },
            unproject: function(t) {
              for (
                var e,
                  i = o.LatLng.RAD_TO_DEG,
                  n = this.R_MAJOR,
                  s = this.R_MINOR,
                  a = t.x * i / n,
                  r = s / n,
                  h = Math.sqrt(1 - r * r),
                  c = Math.exp(-t.y / n),
                  u = Math.PI / 2 - 2 * Math.atan(c),
                  l = 15,
                  f = 1e-7,
                  d = l,
                  p = 0.1;
                Math.abs(p) > f && --d > 0;

              )
                (e = h * Math.sin(u)), (p =
                  Math.PI / 2 -
                  2 * Math.atan(c * Math.pow((1 - e) / (1 + e), 0.5 * h)) -
                  u), (u += p);
              return new o.LatLng(u * i, a);
            }
          }), (o.CRS.EPSG3395 = o.extend({}, o.CRS, {
            code: "EPSG:3395",
            projection: o.Projection.Mercator,
            transformation: (function() {
              var t = o.Projection.Mercator,
                e = t.R_MAJOR,
                i = t.R_MINOR;
              return new o.Transformation(
                0.5 / (Math.PI * e),
                0.5,
                -0.5 / (Math.PI * i),
                0.5
              );
            })()
          })), (o.TileLayer = o.Class.extend({
            includes: o.Mixin.Events,
            options: {
              minZoom: 0,
              maxZoom: 18,
              tileSize: 256,
              subdomains: "abc",
              errorTileUrl: "",
              attribution: "",
              zoomOffset: 0,
              opacity: 1,
              unloadInvisibleTiles: o.Browser.mobile,
              updateWhenIdle: o.Browser.mobile
            },
            initialize: function(t, e) {
              (e = o.setOptions(this, e)), e.detectRetina &&
                o.Browser.retina &&
                e.maxZoom > 0 &&
                (
                  (e.tileSize = Math.floor(e.tileSize / 2)),
                  e.zoomOffset++,
                  e.minZoom > 0 && e.minZoom--,
                  this.options.maxZoom--
                ), e.bounds &&
                (e.bounds = o.latLngBounds(e.bounds)), (this._url = t);
              var i = this.options.subdomains;
              "string" == typeof i && (this.options.subdomains = i.split(""));
            },
            onAdd: function(t) {
              (this._map = t), (this._animated =
                t._zoomAnimated), this._initContainer(), this._createTileProto(), t.on(
                { viewreset: this._reset, moveend: this._update },
                this
              ), this._animated &&
                t.on(
                  { zoomanim: this._animateZoom, zoomend: this._endZoomAnim },
                  this
                ), this.options.updateWhenIdle ||
                (
                  (this._limitedUpdate = o.Util.limitExecByInterval(
                    this._update,
                    150,
                    this
                  )),
                  t.on("move", this._limitedUpdate, this)
                ), this._reset(), this._update();
            },
            addTo: function(t) {
              return t.addLayer(this), this;
            },
            onRemove: function(t) {
              this._container.parentNode.removeChild(this._container), t.off(
                { viewreset: this._reset, moveend: this._update },
                this
              ), this._animated &&
                t.off(
                  { zoomanim: this._animateZoom, zoomend: this._endZoomAnim },
                  this
                ), this.options.updateWhenIdle ||
                t.off(
                  "move",
                  this._limitedUpdate,
                  this
                ), (this._container = null), (this._map = null);
            },
            bringToFront: function() {
              var t = this._map._panes.tilePane;
              return this._container &&
                (
                  t.appendChild(this._container),
                  this._setAutoZIndex(t, Math.max)
                ), this;
            },
            bringToBack: function() {
              var t = this._map._panes.tilePane;
              return this._container &&
                (
                  t.insertBefore(this._container, t.firstChild),
                  this._setAutoZIndex(t, Math.min)
                ), this;
            },
            getAttribution: function() {
              return this.options.attribution;
            },
            getContainer: function() {
              return this._container;
            },
            setOpacity: function(t) {
              return (this.options.opacity = t), this._map &&
                this._updateOpacity(), this;
            },
            setZIndex: function(t) {
              return (this.options.zIndex = t), this._updateZIndex(), this;
            },
            setUrl: function(t, e) {
              return (this._url = t), e || this.redraw(), this;
            },
            redraw: function() {
              return this._map &&
                (this._reset({ hard: !0 }), this._update()), this;
            },
            _updateZIndex: function() {
              this._container &&
                this.options.zIndex !== n &&
                (this._container.style.zIndex = this.options.zIndex);
            },
            _setAutoZIndex: function(t, e) {
              var i,
                n,
                s,
                o = t.children,
                a = -e(1 / 0, -1 / 0);
              for (n = 0, s = o.length; s > n; n++)
                o[n] !== this._container &&
                  (
                    (i = parseInt(o[n].style.zIndex, 10)),
                    isNaN(i) || (a = e(a, i))
                  );
              this.options.zIndex = this._container.style.zIndex =
                (isFinite(a) ? a : 0) + e(1, -1);
            },
            _updateOpacity: function() {
              var t,
                e = this._tiles;
              if (o.Browser.ielt9)
                for (t in e) o.DomUtil.setOpacity(e[t], this.options.opacity);
              else o.DomUtil.setOpacity(this._container, this.options.opacity);
            },
            _initContainer: function() {
              var t = this._map._panes.tilePane;
              if (!this._container) {
                if (
                  (
                    (this._container = o.DomUtil.create(
                      "div",
                      "leaflet-layer"
                    )),
                    this._updateZIndex(),
                    this._animated
                  )
                ) {
                  var e = "leaflet-tile-container leaflet-zoom-animated";
                  (this._bgBuffer = o.DomUtil.create(
                    "div",
                    e,
                    this._container
                  )), (this._tileContainer = o.DomUtil.create(
                    "div",
                    e,
                    this._container
                  ));
                } else this._tileContainer = this._container;
                t.appendChild(this._container), this.options.opacity < 1 &&
                  this._updateOpacity();
              }
            },
            _reset: function(t) {
              for (var e in this._tiles)
                this.fire("tileunload", { tile: this._tiles[e] });
              (this._tiles = {}), (this._tilesToLoad = 0), this.options
                .reuseTiles &&
                (this._unusedTiles = []), (this._tileContainer.innerHTML =
                ""), this._animated &&
                t &&
                t.hard &&
                this._clearBgBuffer(), this._initContainer();
            },
            _update: function() {
              if (this._map) {
                var t = this._map.getPixelBounds(),
                  e = this._map.getZoom(),
                  i = this.options.tileSize;
                if (!(e > this.options.maxZoom || e < this.options.minZoom)) {
                  var n = o.bounds(
                    t.min.divideBy(i)._floor(),
                    t.max.divideBy(i)._floor()
                  );
                  this._addTilesFromCenterOut(n), (this.options
                    .unloadInvisibleTiles ||
                    this.options.reuseTiles) &&
                    this._removeOtherTiles(n);
                }
              }
            },
            _addTilesFromCenterOut: function(t) {
              var e,
                n,
                s,
                a = [],
                r = t.getCenter();
              for (e = t.min.y; e <= t.max.y; e++)
                for (n = t.min.x; n <= t.max.x; n++)
                  (s = new o.Point(n, e)), this._tileShouldBeLoaded(s) &&
                    a.push(s);
              var h = a.length;
              if (0 !== h) {
                a.sort(function(t, e) {
                  return t.distanceTo(r) - e.distanceTo(r);
                });
                var c = i.createDocumentFragment();
                for (
                  this._tilesToLoad ||
                    this.fire("loading"), this._tilesToLoad += h, n = 0;
                  h > n;
                  n++
                )
                  this._addTile(a[n], c);
                this._tileContainer.appendChild(c);
              }
            },
            _tileShouldBeLoaded: function(t) {
              if (t.x + ":" + t.y in this._tiles) return !1;
              var e = this.options;
              if (!e.continuousWorld) {
                var i = this._getWrapTileNum();
                if ((e.noWrap && (t.x < 0 || t.x >= i)) || t.y < 0 || t.y >= i)
                  return !1;
              }
              if (e.bounds) {
                var n = e.tileSize,
                  s = t.multiplyBy(n),
                  o = s.add([n, n]),
                  a = this._map.unproject(s),
                  r = this._map.unproject(o);
                if (
                  (
                    e.continuousWorld ||
                      e.noWrap ||
                      ((a = a.wrap()), (r = r.wrap())),
                    !e.bounds.intersects([a, r])
                  )
                )
                  return !1;
              }
              return !0;
            },
            _removeOtherTiles: function(t) {
              var e, i, n, s;
              for (s in this._tiles)
                (e = s.split(":")), (i = parseInt(e[0], 10)), (n = parseInt(
                  e[1],
                  10
                )), (i < t.min.x ||
                  i > t.max.x ||
                  n < t.min.y ||
                  n > t.max.y) &&
                  this._removeTile(s);
            },
            _removeTile: function(t) {
              var e = this._tiles[t];
              this.fire("tileunload", { tile: e, url: e.src }), this.options
                .reuseTiles
                ? (
                    o.DomUtil.removeClass(e, "leaflet-tile-loaded"),
                    this._unusedTiles.push(e)
                  )
                : e.parentNode === this._tileContainer &&
                  this._tileContainer.removeChild(e), o.Browser.android ||
                ((e.onload = null), (e.src = o.Util.emptyImageUrl)), delete this
                ._tiles[t];
            },
            _addTile: function(t, e) {
              var i = this._getTilePos(t),
                n = this._getTile();
              o.DomUtil.setPosition(
                n,
                i,
                o.Browser.chrome || o.Browser.android23
              ), (this._tiles[t.x + ":" + t.y] = n), this._loadTile(
                n,
                t
              ), n.parentNode !== this._tileContainer && e.appendChild(n);
            },
            _getZoomForUrl: function() {
              var t = this.options,
                e = this._map.getZoom();
              return t.zoomReverse && (e = t.maxZoom - e), e + t.zoomOffset;
            },
            _getTilePos: function(t) {
              var e = this._map.getPixelOrigin(),
                i = this.options.tileSize;
              return t.multiplyBy(i).subtract(e);
            },
            getTileUrl: function(t) {
              return o.Util.template(
                this._url,
                o.extend(
                  { s: this._getSubdomain(t), z: t.z, x: t.x, y: t.y },
                  this.options
                )
              );
            },
            _getWrapTileNum: function() {
              return Math.pow(2, this._getZoomForUrl());
            },
            _adjustTilePoint: function(t) {
              var e = this._getWrapTileNum();
              this.options.continuousWorld ||
                this.options.noWrap ||
                (t.x = (t.x % e + e) % e), this.options.tms &&
                (t.y = e - t.y - 1), (t.z = this._getZoomForUrl());
            },
            _getSubdomain: function(t) {
              var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
              return this.options.subdomains[e];
            },
            _createTileProto: function() {
              var t = (this._tileImg = o.DomUtil.create("img", "leaflet-tile"));
              (t.style.width = t.style.height =
                this.options.tileSize + "px"), (t.galleryimg = "no");
            },
            _getTile: function() {
              if (this.options.reuseTiles && this._unusedTiles.length > 0) {
                var t = this._unusedTiles.pop();
                return this._resetTile(t), t;
              }
              return this._createTile();
            },
            _resetTile: function() {},
            _createTile: function() {
              var t = this._tileImg.cloneNode(!1);
              return (t.onselectstart = t.onmousemove = o.Util.falseFn), o
                .Browser.ielt9 &&
                this.options.opacity !== n &&
                o.DomUtil.setOpacity(t, this.options.opacity), t;
            },
            _loadTile: function(t, e) {
              (t._layer = this), (t.onload = this._tileOnLoad), (t.onerror = this._tileOnError), this._adjustTilePoint(
                e
              ), (t.src = this.getTileUrl(e));
            },
            _tileLoaded: function() {
              this._tilesToLoad--, this._tilesToLoad ||
                (
                  this.fire("load"),
                  this._animated &&
                    (
                      clearTimeout(this._clearBgBufferTimer),
                      (this._clearBgBufferTimer = setTimeout(
                        o.bind(this._clearBgBuffer, this),
                        500
                      ))
                    )
                );
            },
            _tileOnLoad: function() {
              var t = this._layer;
              this.src !== o.Util.emptyImageUrl &&
                (
                  o.DomUtil.addClass(this, "leaflet-tile-loaded"),
                  t.fire("tileload", { tile: this, url: this.src })
                ), t._tileLoaded();
            },
            _tileOnError: function() {
              var t = this._layer;
              t.fire("tileerror", { tile: this, url: this.src });
              var e = t.options.errorTileUrl;
              e && (this.src = e), t._tileLoaded();
            }
          })), (o.tileLayer = function(t, e) {
            return new o.TileLayer(t, e);
          }), (o.TileLayer.WMS = o.TileLayer.extend({
            defaultWmsParams: {
              service: "WMS",
              request: "GetMap",
              version: "1.1.1",
              layers: "",
              styles: "",
              format: "image/jpeg",
              transparent: !1
            },
            initialize: function(t, e) {
              this._url = t;
              var i = o.extend({}, this.defaultWmsParams),
                n = e.tileSize || this.options.tileSize;
              i.width = i.height =
                e.detectRetina && o.Browser.retina ? 2 * n : n;
              for (var s in e)
                this.options.hasOwnProperty(s) || "crs" === s || (i[s] = e[s]);
              (this.wmsParams = i), o.setOptions(this, e);
            },
            onAdd: function(t) {
              this._crs = this.options.crs || t.options.crs;
              var e = parseFloat(this.wmsParams.version) >= 1.3 ? "crs" : "srs";
              (this.wmsParams[
                e
              ] = this._crs.code), o.TileLayer.prototype.onAdd.call(this, t);
            },
            getTileUrl: function(t, e) {
              var i = this._map,
                n = this.options.tileSize,
                s = t.multiplyBy(n),
                a = s.add([n, n]),
                r = this._crs.project(i.unproject(s, e)),
                h = this._crs.project(i.unproject(a, e)),
                c = [r.x, h.y, h.x, r.y].join(","),
                u = o.Util.template(this._url, { s: this._getSubdomain(t) });
              return (
                u + o.Util.getParamString(this.wmsParams, u, !0) + "&BBOX=" + c
              );
            },
            setParams: function(t, e) {
              return o.extend(this.wmsParams, t), e || this.redraw(), this;
            }
          })), (o.tileLayer.wms = function(t, e) {
            return new o.TileLayer.WMS(t, e);
          }), (o.TileLayer.Canvas = o.TileLayer.extend({
            options: { async: !1 },
            initialize: function(t) {
              o.setOptions(this, t);
            },
            redraw: function() {
              this._map && (this._reset({ hard: !0 }), this._update());
              for (var t in this._tiles) this._redrawTile(this._tiles[t]);
              return this;
            },
            _redrawTile: function(t) {
              this.drawTile(t, t._tilePoint, this._map._zoom);
            },
            _createTileProto: function() {
              var t = (this._canvasProto = o.DomUtil.create(
                "canvas",
                "leaflet-tile"
              ));
              t.width = t.height = this.options.tileSize;
            },
            _createTile: function() {
              var t = this._canvasProto.cloneNode(!1);
              return (t.onselectstart = t.onmousemove = o.Util.falseFn), t;
            },
            _loadTile: function(t, e) {
              (t._layer = this), (t._tilePoint = e), this._redrawTile(t), this
                .options.async || this.tileDrawn(t);
            },
            drawTile: function() {},
            tileDrawn: function(t) {
              this._tileOnLoad.call(t);
            }
          })), (o.tileLayer.canvas = function(t) {
            return new o.TileLayer.Canvas(t);
          }), (o.ImageOverlay = o.Class.extend({
            includes: o.Mixin.Events,
            options: { opacity: 1 },
            initialize: function(t, e, i) {
              (this._url = t), (this._bounds = o.latLngBounds(e)), o.setOptions(
                this,
                i
              );
            },
            onAdd: function(t) {
              (this._map = t), this._image ||
                this._initImage(), t._panes.overlayPane.appendChild(
                this._image
              ), t.on("viewreset", this._reset, this), t.options
                .zoomAnimation &&
                o.Browser.any3d &&
                t.on("zoomanim", this._animateZoom, this), this._reset();
            },
            onRemove: function(t) {
              t.getPanes().overlayPane.removeChild(this._image), t.off(
                "viewreset",
                this._reset,
                this
              ), t.options.zoomAnimation &&
                t.off("zoomanim", this._animateZoom, this);
            },
            addTo: function(t) {
              return t.addLayer(this), this;
            },
            setOpacity: function(t) {
              return (this.options.opacity = t), this._updateOpacity(), this;
            },
            bringToFront: function() {
              return this._image &&
                this._map._panes.overlayPane.appendChild(this._image), this;
            },
            bringToBack: function() {
              var t = this._map._panes.overlayPane;
              return this._image &&
                t.insertBefore(this._image, t.firstChild), this;
            },
            _initImage: function() {
              (this._image = o.DomUtil.create(
                "img",
                "leaflet-image-layer"
              )), this._map.options.zoomAnimation && o.Browser.any3d
                ? o.DomUtil.addClass(this._image, "leaflet-zoom-animated")
                : o.DomUtil.addClass(
                    this._image,
                    "leaflet-zoom-hide"
                  ), this._updateOpacity(), o.extend(this._image, {
                galleryimg: "no",
                onselectstart: o.Util.falseFn,
                onmousemove: o.Util.falseFn,
                onload: o.bind(this._onImageLoad, this),
                src: this._url
              });
            },
            _animateZoom: function(t) {
              var e = this._map,
                i = this._image,
                n = e.getZoomScale(t.zoom),
                s = this._bounds.getNorthWest(),
                a = this._bounds.getSouthEast(),
                r = e._latLngToNewLayerPoint(s, t.zoom, t.center),
                h = e._latLngToNewLayerPoint(a, t.zoom, t.center)._subtract(r),
                c = r._add(h._multiplyBy(0.5 * (1 - 1 / n)));
              i.style[o.DomUtil.TRANSFORM] =
                o.DomUtil.getTranslateString(c) + " scale(" + n + ") ";
            },
            _reset: function() {
              var t = this._image,
                e = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
                i = this._map
                  .latLngToLayerPoint(this._bounds.getSouthEast())
                  ._subtract(e);
              o.DomUtil.setPosition(t, e), (t.style.width =
                i.x + "px"), (t.style.height = i.y + "px");
            },
            _onImageLoad: function() {
              this.fire("load");
            },
            _updateOpacity: function() {
              o.DomUtil.setOpacity(this._image, this.options.opacity);
            }
          })), (o.imageOverlay = function(t, e, i) {
            return new o.ImageOverlay(t, e, i);
          }), (o.Icon = o.Class.extend({
            options: { className: "" },
            initialize: function(t) {
              o.setOptions(this, t);
            },
            createIcon: function(t) {
              return this._createIcon("icon", t);
            },
            createShadow: function(t) {
              return this._createIcon("shadow", t);
            },
            _createIcon: function(t, e) {
              var i = this._getIconUrl(t);
              if (!i) {
                if ("icon" === t)
                  throw new Error(
                    "iconUrl not set in Icon options (see the docs)."
                  );
                return null;
              }
              var n;
              return (n =
                e && "IMG" === e.tagName
                  ? this._createImg(i, e)
                  : this._createImg(i)), this._setIconStyles(n, t), n;
            },
            _setIconStyles: function(t, e) {
              var i,
                n = this.options,
                s = o.point(n[e + "Size"]);
              (i =
                "shadow" === e
                  ? o.point(n.shadowAnchor || n.iconAnchor)
                  : o.point(n.iconAnchor)), !i &&
                s &&
                (i = s.divideBy(2, !0)), (t.className =
                "leaflet-marker-" + e + " " + n.className), i &&
                (
                  (t.style.marginLeft = -i.x + "px"),
                  (t.style.marginTop = -i.y + "px")
                ), s &&
                ((t.style.width = s.x + "px"), (t.style.height = s.y + "px"));
            },
            _createImg: function(t, e) {
              return o.Browser.ie6
                ? (
                    e || (e = i.createElement("div")),
                    (e.style.filter =
                      'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' +
                      t +
                      '")')
                  )
                : (e || (e = i.createElement("img")), (e.src = t)), e;
            },
            _getIconUrl: function(t) {
              return o.Browser.retina && this.options[t + "RetinaUrl"]
                ? this.options[t + "RetinaUrl"]
                : this.options[t + "Url"];
            }
          })), (o.icon = function(t) {
            return new o.Icon(t);
          }), (o.Icon.Default = o.Icon.extend({
            options: {
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            },
            _getIconUrl: function(t) {
              var e = t + "Url";
              if (this.options[e]) return this.options[e];
              o.Browser.retina && "icon" === t && (t += "-2x");
              var i = o.Icon.Default.imagePath;
              if (!i)
                throw new Error(
                  "Couldn't autodetect L.Icon.Default.imagePath, set it manually."
                );
              return i + "/marker-" + t + ".png";
            }
          })), (o.Icon.Default.imagePath = (function() {
            var t,
              e,
              n,
              s,
              o,
              a = i.getElementsByTagName("script"),
              r = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;
            for (t = 0, e = a.length; e > t; t++)
              if (((n = a[t].src), (s = n.match(r))))
                return (o = n.split(r)[0]), (o ? o + "/" : "") + "images";
          })()), (o.Marker = o.Class.extend({
            includes: o.Mixin.Events,
            options: {
              icon: new o.Icon.Default(),
              title: "",
              clickable: !0,
              draggable: !1,
              keyboard: !0,
              zIndexOffset: 0,
              opacity: 1,
              riseOnHover: !1,
              riseOffset: 250
            },
            initialize: function(t, e) {
              o.setOptions(this, e), (this._latlng = o.latLng(t));
            },
            onAdd: function(t) {
              (this._map = t), t.on(
                "viewreset",
                this.update,
                this
              ), this._initIcon(), this.update(), t.options.zoomAnimation &&
                t.options.markerZoomAnimation &&
                t.on("zoomanim", this._animateZoom, this);
            },
            addTo: function(t) {
              return t.addLayer(this), this;
            },
            onRemove: function(t) {
              this.dragging &&
                this.dragging.disable(), this._removeIcon(), this._removeShadow(), this.fire(
                "remove"
              ), t.off(
                { viewreset: this.update, zoomanim: this._animateZoom },
                this
              ), (this._map = null);
            },
            getLatLng: function() {
              return this._latlng;
            },
            setLatLng: function(t) {
              return (this._latlng = o.latLng(
                t
              )), this.update(), this.fire("move", { latlng: this._latlng });
            },
            setZIndexOffset: function(t) {
              return (this.options.zIndexOffset = t), this.update(), this;
            },
            setIcon: function(t) {
              return (this.options.icon = t), this._map &&
                (this._initIcon(), this.update()), this;
            },
            update: function() {
              if (this._icon) {
                var t = this._map.latLngToLayerPoint(this._latlng).round();
                this._setPos(t);
              }
              return this;
            },
            _initIcon: function() {
              var t = this.options,
                e = this._map,
                i = e.options.zoomAnimation && e.options.markerZoomAnimation,
                n = i ? "leaflet-zoom-animated" : "leaflet-zoom-hide",
                s = t.icon.createIcon(this._icon),
                a = !1;
              s !== this._icon &&
                (
                  this._icon && this._removeIcon(),
                  (a = !0),
                  t.title && (s.title = t.title)
                ), o.DomUtil.addClass(s, n), t.keyboard &&
                (s.tabIndex =
                  "0"), (this._icon = s), this._initInteraction(), t.riseOnHover &&
                o.DomEvent
                  .on(s, "mouseover", this._bringToFront, this)
                  .on(s, "mouseout", this._resetZIndex, this);
              var r = t.icon.createShadow(this._shadow),
                h = !1;
              r !== this._shadow && (this._removeShadow(), (h = !0)), r &&
                o.DomUtil.addClass(r, n), (this._shadow = r), t.opacity < 1 &&
                this._updateOpacity();
              var c = this._map._panes;
              a && c.markerPane.appendChild(this._icon), r &&
                h &&
                c.shadowPane.appendChild(this._shadow);
            },
            _removeIcon: function() {
              this.options.riseOnHover &&
                o.DomEvent
                  .off(this._icon, "mouseover", this._bringToFront)
                  .off(
                    this._icon,
                    "mouseout",
                    this._resetZIndex
                  ), this._map._panes.markerPane.removeChild(
                this._icon
              ), (this._icon = null);
            },
            _removeShadow: function() {
              this._shadow &&
                this._map._panes.shadowPane.removeChild(
                  this._shadow
                ), (this._shadow = null);
            },
            _setPos: function(t) {
              o.DomUtil.setPosition(this._icon, t), this._shadow &&
                o.DomUtil.setPosition(this._shadow, t), (this._zIndex =
                t.y + this.options.zIndexOffset), this._resetZIndex();
            },
            _updateZIndex: function(t) {
              this._icon.style.zIndex = this._zIndex + t;
            },
            _animateZoom: function(t) {
              var e = this._map._latLngToNewLayerPoint(
                this._latlng,
                t.zoom,
                t.center
              );
              this._setPos(e);
            },
            _initInteraction: function() {
              if (this.options.clickable) {
                var t = this._icon,
                  e = [
                    "dblclick",
                    "mousedown",
                    "mouseover",
                    "mouseout",
                    "contextmenu"
                  ];
                o.DomUtil.addClass(t, "leaflet-clickable"), o.DomEvent.on(
                  t,
                  "click",
                  this._onMouseClick,
                  this
                ), o.DomEvent.on(t, "keypress", this._onKeyPress, this);
                for (var i = 0; i < e.length; i++)
                  o.DomEvent.on(t, e[i], this._fireMouseEvent, this);
                o.Handler.MarkerDrag &&
                  (
                    (this.dragging = new o.Handler.MarkerDrag(this)),
                    this.options.draggable && this.dragging.enable()
                  );
              }
            },
            _onMouseClick: function(t) {
              var e = this.dragging && this.dragging.moved();
              (this.hasEventListeners(t.type) || e) &&
                o.DomEvent.stopPropagation(t), e ||
                (((this.dragging && this.dragging._enabled) ||
                  !this._map.dragging ||
                  !this._map.dragging.moved()) &&
                  this.fire(t.type, {
                    originalEvent: t,
                    latlng: this._latlng
                  }));
            },
            _onKeyPress: function(t) {
              13 === t.keyCode &&
                this.fire("click", { originalEvent: t, latlng: this._latlng });
            },
            _fireMouseEvent: function(t) {
              this.fire(t.type, {
                originalEvent: t,
                latlng: this._latlng
              }), "contextmenu" === t.type &&
                this.hasEventListeners(t.type) &&
                o.DomEvent.preventDefault(t), "mousedown" !== t.type
                ? o.DomEvent.stopPropagation(t)
                : o.DomEvent.preventDefault(t);
            },
            setOpacity: function(t) {
              return (this.options.opacity = t), this._map &&
                this._updateOpacity(), this;
            },
            _updateOpacity: function() {
              o.DomUtil.setOpacity(this._icon, this.options.opacity), this
                ._shadow &&
                o.DomUtil.setOpacity(this._shadow, this.options.opacity);
            },
            _bringToFront: function() {
              this._updateZIndex(this.options.riseOffset);
            },
            _resetZIndex: function() {
              this._updateZIndex(0);
            }
          })), (o.marker = function(t, e) {
            return new o.Marker(t, e);
          }), (o.DivIcon = o.Icon.extend({
            options: {
              iconSize: [12, 12],
              className: "leaflet-div-icon",
              html: !1
            },
            createIcon: function(t) {
              var e = t && "DIV" === t.tagName ? t : i.createElement("div"),
                n = this.options;
              return (e.innerHTML = n.html !== !1 ? n.html : ""), n.bgPos &&
                (e.style.backgroundPosition =
                  -n.bgPos.x + "px " + -n.bgPos.y + "px"), this._setIconStyles(
                e,
                "icon"
              ), e;
            },
            createShadow: function() {
              return null;
            }
          })), (o.divIcon = function(t) {
            return new o.DivIcon(t);
          }), o.Map.mergeOptions({
            closePopupOnClick: !0
          }), (o.Popup = o.Class.extend({
            includes: o.Mixin.Events,
            options: {
              minWidth: 50,
              maxWidth: 300,
              maxHeight: null,
              autoPan: !0,
              closeButton: !0,
              offset: [0, 7],
              autoPanPadding: [5, 5],
              keepInView: !1,
              className: "",
              zoomAnimation: !0
            },
            initialize: function(t, e) {
              o.setOptions(this, t), (this._source = e), (this._animated =
                o.Browser.any3d &&
                this.options.zoomAnimation), (this._isOpen = !1);
            },
            onAdd: function(t) {
              (this._map = t), this._container ||
                this._initLayout(), this._updateContent();
              var e = t.options.fadeAnimation;
              e &&
                o.DomUtil.setOpacity(
                  this._container,
                  0
                ), t._panes.popupPane.appendChild(this._container), t.on(
                this._getEvents(),
                this
              ), this._update(), e &&
                o.DomUtil.setOpacity(this._container, 1), this.fire(
                "open"
              ), t.fire("popupopen", { popup: this }), this._source &&
                this._source.fire("popupopen", { popup: this });
            },
            addTo: function(t) {
              return t.addLayer(this), this;
            },
            openOn: function(t) {
              return t.openPopup(this), this;
            },
            onRemove: function(t) {
              t._panes.popupPane.removeChild(this._container), o.Util.falseFn(
                this._container.offsetWidth
              ), t.off(this._getEvents(), this), t.options.fadeAnimation &&
                o.DomUtil.setOpacity(
                  this._container,
                  0
                ), (this._map = null), this.fire(
                "close"
              ), t.fire("popupclose", { popup: this }), this._source &&
                this._source.fire("popupclose", { popup: this });
            },
            setLatLng: function(t) {
              return (this._latlng = o.latLng(t)), this._update(), this;
            },
            setContent: function(t) {
              return (this._content = t), this._update(), this;
            },
            _getEvents: function() {
              var t = { viewreset: this._updatePosition };
              return this._animated &&
                (t.zoomanim = this._zoomAnimation), ("closeOnClick" in
              this.options
                ? this.options.closeOnClick
                : this._map.options.closePopupOnClick) &&
                (t.preclick = this._close), this.options.keepInView &&
                (t.moveend = this._adjustPan), t;
            },
            _close: function() {
              this._map && this._map.closePopup(this);
            },
            _initLayout: function() {
              var t,
                e = "leaflet-popup",
                i =
                  e +
                  " " +
                  this.options.className +
                  " leaflet-zoom-" +
                  (this._animated ? "animated" : "hide"),
                n = (this._container = o.DomUtil.create("div", i));
              this.options.closeButton &&
                (
                  (t = this._closeButton = o.DomUtil.create(
                    "a",
                    e + "-close-button",
                    n
                  )),
                  (t.href = "#close"),
                  (t.innerHTML = "&#215;"),
                  o.DomEvent.disableClickPropagation(t),
                  o.DomEvent.on(t, "click", this._onCloseButtonClick, this)
                );
              var s = (this._wrapper = o.DomUtil.create(
                "div",
                e + "-content-wrapper",
                n
              ));
              o.DomEvent.disableClickPropagation(
                s
              ), (this._contentNode = o.DomUtil.create(
                "div",
                e + "-content",
                s
              )), o.DomEvent.on(
                this._contentNode,
                "mousewheel",
                o.DomEvent.stopPropagation
              ), o.DomEvent.on(
                this._contentNode,
                "MozMousePixelScroll",
                o.DomEvent.stopPropagation
              ), o.DomEvent.on(
                s,
                "contextmenu",
                o.DomEvent.stopPropagation
              ), (this._tipContainer = o.DomUtil.create(
                "div",
                e + "-tip-container",
                n
              )), (this._tip = o.DomUtil.create(
                "div",
                e + "-tip",
                this._tipContainer
              ));
            },
            _update: function() {
              this._map &&
                (
                  (this._container.style.visibility = "hidden"),
                  this._updateContent(),
                  this._updateLayout(),
                  this._updatePosition(),
                  (this._container.style.visibility = ""),
                  this._adjustPan()
                );
            },
            _updateContent: function() {
              if (this._content) {
                if ("string" == typeof this._content)
                  this._contentNode.innerHTML = this._content;
                else {
                  for (; this._contentNode.hasChildNodes(); )
                    this._contentNode.removeChild(this._contentNode.firstChild);
                  this._contentNode.appendChild(this._content);
                }
                this.fire("contentupdate");
              }
            },
            _updateLayout: function() {
              var t = this._contentNode,
                e = t.style;
              (e.width = ""), (e.whiteSpace = "nowrap");
              var i = t.offsetWidth;
              (i = Math.min(i, this.options.maxWidth)), (i = Math.max(
                i,
                this.options.minWidth
              )), (e.width = i + 1 + "px"), (e.whiteSpace = ""), (e.height =
                "");
              var n = t.offsetHeight,
                s = this.options.maxHeight,
                a = "leaflet-popup-scrolled";
              s && n > s
                ? ((e.height = s + "px"), o.DomUtil.addClass(t, a))
                : o.DomUtil.removeClass(
                    t,
                    a
                  ), (this._containerWidth = this._container.offsetWidth);
            },
            _updatePosition: function() {
              if (this._map) {
                var t = this._map.latLngToLayerPoint(this._latlng),
                  e = this._animated,
                  i = o.point(this.options.offset);
                e &&
                  o.DomUtil.setPosition(
                    this._container,
                    t
                  ), (this._containerBottom =
                  -i.y - (e ? 0 : t.y)), (this._containerLeft =
                  -Math.round(this._containerWidth / 2) +
                  i.x +
                  (e ? 0 : t.x)), (this._container.style.bottom =
                  this._containerBottom + "px"), (this._container.style.left =
                  this._containerLeft + "px");
              }
            },
            _zoomAnimation: function(t) {
              var e = this._map._latLngToNewLayerPoint(
                this._latlng,
                t.zoom,
                t.center
              );
              o.DomUtil.setPosition(this._container, e);
            },
            _adjustPan: function() {
              if (this.options.autoPan) {
                var t = this._map,
                  e = this._container.offsetHeight,
                  i = this._containerWidth,
                  n = new o.Point(
                    this._containerLeft,
                    -e - this._containerBottom
                  );
                this._animated &&
                  n._add(o.DomUtil.getPosition(this._container));
                var s = t.layerPointToContainerPoint(n),
                  a = o.point(this.options.autoPanPadding),
                  r = t.getSize(),
                  h = 0,
                  c = 0;
                s.x + i > r.x && (h = s.x + i - r.x + a.x), s.x - h < 0 &&
                  (h = s.x - a.x), s.y + e > r.y &&
                  (c = s.y + e - r.y + a.y), s.y - c < 0 &&
                  (c = s.y - a.y), (h || c) &&
                  t.fire("autopanstart").panBy([h, c]);
              }
            },
            _onCloseButtonClick: function(t) {
              this._close(), o.DomEvent.stop(t);
            }
          })), (o.popup = function(t, e) {
            return new o.Popup(t, e);
          }), o.Map.include({
            openPopup: function(t, e, i) {
              if ((this.closePopup(), !(t instanceof o.Popup))) {
                var n = t;
                t = new o.Popup(i).setLatLng(e).setContent(n);
              }
              return (t._isOpen = !0), (this._popup = t), this.addLayer(t);
            },
            closePopup: function(t) {
              return (t && t !== this._popup) ||
                ((t = this._popup), (this._popup = null)), t &&
                (this.removeLayer(t), (t._isOpen = !1)), this;
            }
          }), o.Marker.include({
            openPopup: function() {
              return this._popup &&
                this._map &&
                !this._map.hasLayer(this._popup) &&
                (
                  this._popup.setLatLng(this._latlng),
                  this._map.openPopup(this._popup)
                ), this;
            },
            closePopup: function() {
              return this._popup && this._popup._close(), this;
            },
            togglePopup: function() {
              return this._popup &&
                (this._popup._isOpen
                  ? this.closePopup()
                  : this.openPopup()), this;
            },
            bindPopup: function(t, e) {
              var i = o.point(this.options.icon.options.popupAnchor || [0, 0]);
              return (i = i.add(o.Popup.prototype.options.offset)), e &&
                e.offset &&
                (i = i.add(e.offset)), (e = o.extend({ offset: i }, e)), this
                ._popup ||
                this.on("click", this.togglePopup, this)
                  .on("remove", this.closePopup, this)
                  .on("move", this._movePopup, this), t instanceof o.Popup
                ? (o.setOptions(t, e), (this._popup = t))
                : (this._popup = new o.Popup(e, this).setContent(t)), this;
            },
            setPopupContent: function(t) {
              return this._popup && this._popup.setContent(t), this;
            },
            unbindPopup: function() {
              return this._popup &&
                (
                  (this._popup = null),
                  this.off("click", this.togglePopup)
                    .off("remove", this.closePopup)
                    .off("move", this._movePopup)
                ), this;
            },
            _movePopup: function(t) {
              this._popup.setLatLng(t.latlng);
            }
          }), (o.LayerGroup = o.Class.extend({
            initialize: function(t) {
              this._layers = {};
              var e, i;
              if (t) for (e = 0, i = t.length; i > e; e++) this.addLayer(t[e]);
            },
            addLayer: function(t) {
              var e = this.getLayerId(t);
              return (this._layers[e] = t), this._map &&
                this._map.addLayer(t), this;
            },
            removeLayer: function(t) {
              var e = t in this._layers ? t : this.getLayerId(t);
              return this._map &&
                this._layers[e] &&
                this._map.removeLayer(this._layers[e]), delete this._layers[
                e
              ], this;
            },
            hasLayer: function(t) {
              return t
                ? t in this._layers || this.getLayerId(t) in this._layers
                : !1;
            },
            clearLayers: function() {
              return this.eachLayer(this.removeLayer, this), this;
            },
            invoke: function(t) {
              var e,
                i,
                n = Array.prototype.slice.call(arguments, 1);
              for (e in this._layers)
                (i = this._layers[e]), i[t] && i[t].apply(i, n);
              return this;
            },
            onAdd: function(t) {
              (this._map = t), this.eachLayer(t.addLayer, t);
            },
            onRemove: function(t) {
              this.eachLayer(t.removeLayer, t), (this._map = null);
            },
            addTo: function(t) {
              return t.addLayer(this), this;
            },
            eachLayer: function(t, e) {
              for (var i in this._layers) t.call(e, this._layers[i]);
              return this;
            },
            getLayer: function(t) {
              return this._layers[t];
            },
            getLayers: function() {
              var t = [];
              for (var e in this._layers) t.push(this._layers[e]);
              return t;
            },
            setZIndex: function(t) {
              return this.invoke("setZIndex", t);
            },
            getLayerId: function(t) {
              return o.stamp(t);
            }
          })), (o.layerGroup = function(t) {
            return new o.LayerGroup(t);
          }), (o.FeatureGroup = o.LayerGroup.extend({
            includes: o.Mixin.Events,
            statics: {
              EVENTS:
                "click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose"
            },
            addLayer: function(t) {
              return this.hasLayer(t)
                ? this
                : (
                    t.on(o.FeatureGroup.EVENTS, this._propagateEvent, this),
                    o.LayerGroup.prototype.addLayer.call(this, t),
                    this._popupContent &&
                      t.bindPopup &&
                      t.bindPopup(this._popupContent, this._popupOptions),
                    this.fire("layeradd", { layer: t })
                  );
            },
            removeLayer: function(t) {
              return this.hasLayer(t)
                ? (
                    t in this._layers && (t = this._layers[t]),
                    t.off(o.FeatureGroup.EVENTS, this._propagateEvent, this),
                    o.LayerGroup.prototype.removeLayer.call(this, t),
                    this._popupContent && this.invoke("unbindPopup"),
                    this.fire("layerremove", { layer: t })
                  )
                : this;
            },
            bindPopup: function(t, e) {
              return (this._popupContent = t), (this._popupOptions = e), this.invoke(
                "bindPopup",
                t,
                e
              );
            },
            setStyle: function(t) {
              return this.invoke("setStyle", t);
            },
            bringToFront: function() {
              return this.invoke("bringToFront");
            },
            bringToBack: function() {
              return this.invoke("bringToBack");
            },
            getBounds: function() {
              var t = new o.LatLngBounds();
              return this.eachLayer(function(e) {
                t.extend(e instanceof o.Marker ? e.getLatLng() : e.getBounds());
              }), t;
            },
            _propagateEvent: function(t) {
              t.layer || (t.layer = t.target), (t.target = this), this.fire(
                t.type,
                t
              );
            }
          })), (o.featureGroup = function(t) {
            return new o.FeatureGroup(t);
          }), (o.Path = o.Class.extend({
            includes: [o.Mixin.Events],
            statics: {
              CLIP_PADDING: (function() {
                var e = o.Browser.mobile ? 1280 : 2e3,
                  i = (e / Math.max(t.outerWidth, t.outerHeight) - 1) / 2;
                return Math.max(0, Math.min(0.5, i));
              })()
            },
            options: {
              stroke: !0,
              color: "#0033ff",
              dashArray: null,
              weight: 5,
              opacity: 0.5,
              fill: !1,
              fillColor: null,
              fillOpacity: 0.2,
              clickable: !0
            },
            initialize: function(t) {
              o.setOptions(this, t);
            },
            onAdd: function(t) {
              (this._map = t), this._container ||
                (
                  this._initElements(),
                  this._initEvents()
                ), this.projectLatlngs(), this._updatePath(), this._container &&
                this._map._pathRoot.appendChild(this._container), this.fire(
                "add"
              ), t.on(
                { viewreset: this.projectLatlngs, moveend: this._updatePath },
                this
              );
            },
            addTo: function(t) {
              return t.addLayer(this), this;
            },
            onRemove: function(t) {
              t._pathRoot.removeChild(this._container), this.fire(
                "remove"
              ), (this._map = null), o.Browser.vml &&
                (
                  (this._container = null),
                  (this._stroke = null),
                  (this._fill = null)
                ), t.off(
                { viewreset: this.projectLatlngs, moveend: this._updatePath },
                this
              );
            },
            projectLatlngs: function() {},
            setStyle: function(t) {
              return o.setOptions(this, t), this._container &&
                this._updateStyle(), this;
            },
            redraw: function() {
              return this._map &&
                (this.projectLatlngs(), this._updatePath()), this;
            }
          })), o.Map.include({
            _updatePathViewport: function() {
              var t = o.Path.CLIP_PADDING,
                e = this.getSize(),
                i = o.DomUtil.getPosition(this._mapPane),
                n = i.multiplyBy(-1)._subtract(e.multiplyBy(t)._round()),
                s = n.add(e.multiplyBy(1 + 2 * t)._round());
              this._pathViewport = new o.Bounds(n, s);
            }
          }), (o.Path.SVG_NS =
            "http://www.w3.org/2000/svg"), (o.Browser.svg = !(
            !i.createElementNS ||
            !i.createElementNS(o.Path.SVG_NS, "svg").createSVGRect
          )), (o.Path = o.Path.extend({
            statics: { SVG: o.Browser.svg },
            bringToFront: function() {
              var t = this._map._pathRoot,
                e = this._container;
              return e && t.lastChild !== e && t.appendChild(e), this;
            },
            bringToBack: function() {
              var t = this._map._pathRoot,
                e = this._container,
                i = t.firstChild;
              return e && i !== e && t.insertBefore(e, i), this;
            },
            getPathString: function() {},
            _createElement: function(t) {
              return i.createElementNS(o.Path.SVG_NS, t);
            },
            _initElements: function() {
              this._map._initPathRoot(), this._initPath(), this._initStyle();
            },
            _initPath: function() {
              (this._container = this._createElement(
                "g"
              )), (this._path = this._createElement(
                "path"
              )), this._container.appendChild(this._path);
            },
            _initStyle: function() {
              this.options.stroke &&
                (
                  this._path.setAttribute("stroke-linejoin", "round"),
                  this._path.setAttribute("stroke-linecap", "round")
                ), this.options.fill &&
                this._path.setAttribute("fill-rule", "evenodd"), this.options
                .pointerEvents &&
                this._path.setAttribute(
                  "pointer-events",
                  this.options.pointerEvents
                ), this.options.clickable ||
                this.options.pointerEvents ||
                this._path.setAttribute(
                  "pointer-events",
                  "none"
                ), this._updateStyle();
            },
            _updateStyle: function() {
              this.options.stroke
                ? (
                    this._path.setAttribute("stroke", this.options.color),
                    this._path.setAttribute(
                      "stroke-opacity",
                      this.options.opacity
                    ),
                    this._path.setAttribute(
                      "stroke-width",
                      this.options.weight
                    ),
                    this.options.dashArray
                      ? this._path.setAttribute(
                          "stroke-dasharray",
                          this.options.dashArray
                        )
                      : this._path.removeAttribute("stroke-dasharray")
                  )
                : this._path.setAttribute("stroke", "none"), this.options.fill
                ? (
                    this._path.setAttribute(
                      "fill",
                      this.options.fillColor || this.options.color
                    ),
                    this._path.setAttribute(
                      "fill-opacity",
                      this.options.fillOpacity
                    )
                  )
                : this._path.setAttribute("fill", "none");
            },
            _updatePath: function() {
              var t = this.getPathString();
              t || (t = "M0 0"), this._path.setAttribute("d", t);
            },
            _initEvents: function() {
              if (this.options.clickable) {
                (o.Browser.svg || !o.Browser.vml) &&
                  this._path.setAttribute(
                    "class",
                    "leaflet-clickable"
                  ), o.DomEvent.on(
                  this._container,
                  "click",
                  this._onMouseClick,
                  this
                );
                for (
                  var t = [
                      "dblclick",
                      "mousedown",
                      "mouseover",
                      "mouseout",
                      "mousemove",
                      "contextmenu"
                    ],
                    e = 0;
                  e < t.length;
                  e++
                )
                  o.DomEvent.on(
                    this._container,
                    t[e],
                    this._fireMouseEvent,
                    this
                  );
              }
            },
            _onMouseClick: function(t) {
              (this._map.dragging && this._map.dragging.moved()) ||
                this._fireMouseEvent(t);
            },
            _fireMouseEvent: function(t) {
              if (this.hasEventListeners(t.type)) {
                var e = this._map,
                  i = e.mouseEventToContainerPoint(t),
                  n = e.containerPointToLayerPoint(i),
                  s = e.layerPointToLatLng(n);
                this.fire(t.type, {
                  latlng: s,
                  layerPoint: n,
                  containerPoint: i,
                  originalEvent: t
                }), "contextmenu" === t.type &&
                  o.DomEvent.preventDefault(t), "mousemove" !== t.type &&
                  o.DomEvent.stopPropagation(t);
              }
            }
          })), o.Map.include({
            _initPathRoot: function() {
              this._pathRoot ||
                (
                  (this._pathRoot = o.Path.prototype._createElement("svg")),
                  this._panes.overlayPane.appendChild(this._pathRoot),
                  this.options.zoomAnimation && o.Browser.any3d
                    ? (
                        this._pathRoot.setAttribute(
                          "class",
                          " leaflet-zoom-animated"
                        ),
                        this.on({
                          zoomanim: this._animatePathZoom,
                          zoomend: this._endPathZoom
                        })
                      )
                    : this._pathRoot.setAttribute(
                        "class",
                        " leaflet-zoom-hide"
                      ),
                  this.on("moveend", this._updateSvgViewport),
                  this._updateSvgViewport()
                );
            },
            _animatePathZoom: function(t) {
              var e = this.getZoomScale(t.zoom),
                i = this._getCenterOffset(t.center)
                  ._multiplyBy(-e)
                  ._add(this._pathViewport.min);
              (this._pathRoot.style[o.DomUtil.TRANSFORM] =
                o.DomUtil.getTranslateString(i) +
                " scale(" +
                e +
                ") "), (this._pathZooming = !0);
            },
            _endPathZoom: function() {
              this._pathZooming = !1;
            },
            _updateSvgViewport: function() {
              if (!this._pathZooming) {
                this._updatePathViewport();
                var t = this._pathViewport,
                  e = t.min,
                  i = t.max,
                  n = i.x - e.x,
                  s = i.y - e.y,
                  a = this._pathRoot,
                  r = this._panes.overlayPane;
                o.Browser.mobileWebkit &&
                  r.removeChild(a), o.DomUtil.setPosition(a, e), a.setAttribute(
                  "width",
                  n
                ), a.setAttribute("height", s), a.setAttribute(
                  "viewBox",
                  [e.x, e.y, n, s].join(" ")
                ), o.Browser.mobileWebkit && r.appendChild(a);
              }
            }
          }), o.Path.include({
            bindPopup: function(t, e) {
              return t instanceof o.Popup
                ? (this._popup = t)
                : (
                    (!this._popup || e) && (this._popup = new o.Popup(e, this)),
                    this._popup.setContent(t)
                  ), this._popupHandlersAdded ||
                (
                  this.on("click", this._openPopup, this).on(
                    "remove",
                    this.closePopup,
                    this
                  ),
                  (this._popupHandlersAdded = !0)
                ), this;
            },
            unbindPopup: function() {
              return this._popup &&
                (
                  (this._popup = null),
                  this.off("click", this._openPopup).off(
                    "remove",
                    this.closePopup
                  ),
                  (this._popupHandlersAdded = !1)
                ), this;
            },
            openPopup: function(t) {
              return this._popup &&
                (
                  (t =
                    t ||
                    this._latlng ||
                    this._latlngs[Math.floor(this._latlngs.length / 2)]),
                  this._openPopup({ latlng: t })
                ), this;
            },
            closePopup: function() {
              return this._popup && this._popup._close(), this;
            },
            _openPopup: function(t) {
              this._popup.setLatLng(t.latlng), this._map.openPopup(this._popup);
            }
          }), (o.Browser.vml =
            !o.Browser.svg &&
            (function() {
              try {
                var t = i.createElement("div");
                t.innerHTML = '<v:shape adj="1"/>';
                var e = t.firstChild;
                return (e.style.behavior = "url(#default#VML)"), e &&
                  "object" == typeof e.adj;
              } catch (n) {
                return !1;
              }
            })()), (o.Path =
            o.Browser.svg || !o.Browser.vml
              ? o.Path
              : o.Path.extend({
                  statics: { VML: !0, CLIP_PADDING: 0.02 },
                  _createElement: (function() {
                    try {
                      return i.namespaces.add(
                        "lvml",
                        "urn:schemas-microsoft-com:vml"
                      ), function(t) {
                        return i.createElement("<lvml:" + t + ' class="lvml">');
                      };
                    } catch (t) {
                      return function(t) {
                        return i.createElement(
                          "<" +
                            t +
                            ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">'
                        );
                      };
                    }
                  })(),
                  _initPath: function() {
                    var t = (this._container = this._createElement("shape"));
                    o.DomUtil.addClass(t, "leaflet-vml-shape"), this.options
                      .clickable &&
                      o.DomUtil.addClass(t, "leaflet-clickable"), (t.coordsize =
                      "1 1"), (this._path = this._createElement(
                      "path"
                    )), t.appendChild(
                      this._path
                    ), this._map._pathRoot.appendChild(t);
                  },
                  _initStyle: function() {
                    this._updateStyle();
                  },
                  _updateStyle: function() {
                    var t = this._stroke,
                      e = this._fill,
                      i = this.options,
                      n = this._container;
                    (n.stroked = i.stroke), (n.filled = i.fill), i.stroke
                      ? (
                          t ||
                            (
                              (t = this._stroke = this._createElement(
                                "stroke"
                              )),
                              (t.endcap = "round"),
                              n.appendChild(t)
                            ),
                          (t.weight = i.weight + "px"),
                          (t.color = i.color),
                          (t.opacity = i.opacity),
                          (t.dashStyle = i.dashArray
                            ? i.dashArray instanceof Array
                              ? i.dashArray.join(" ")
                              : i.dashArray.replace(/( *, *)/g, " ")
                            : "")
                        )
                      : t && (n.removeChild(t), (this._stroke = null)), i.fill
                      ? (
                          e ||
                            (
                              (e = this._fill = this._createElement("fill")),
                              n.appendChild(e)
                            ),
                          (e.color = i.fillColor || i.color),
                          (e.opacity = i.fillOpacity)
                        )
                      : e && (n.removeChild(e), (this._fill = null));
                  },
                  _updatePath: function() {
                    var t = this._container.style;
                    (t.display = "none"), (this._path.v =
                      this.getPathString() + " "), (t.display = "");
                  }
                })), o.Map.include(
            o.Browser.svg || !o.Browser.vml
              ? {}
              : {
                  _initPathRoot: function() {
                    if (!this._pathRoot) {
                      var t = (this._pathRoot = i.createElement("div"));
                      (t.className =
                        "leaflet-vml-container"), this._panes.overlayPane.appendChild(
                        t
                      ), this.on(
                        "moveend",
                        this._updatePathViewport
                      ), this._updatePathViewport();
                    }
                  }
                }
          ), (o.Browser.canvas = (function() {
            return !!i.createElement("canvas").getContext;
          })()), (o.Path =
            (o.Path.SVG && !t.L_PREFER_CANVAS) || !o.Browser.canvas
              ? o.Path
              : o.Path.extend({
                  statics: { CANVAS: !0, SVG: !1 },
                  redraw: function() {
                    return this._map &&
                      (this.projectLatlngs(), this._requestUpdate()), this;
                  },
                  setStyle: function(t) {
                    return o.setOptions(this, t), this._map &&
                      (this._updateStyle(), this._requestUpdate()), this;
                  },
                  onRemove: function(t) {
                    t
                      .off("viewreset", this.projectLatlngs, this)
                      .off("moveend", this._updatePath, this), this.options
                      .clickable &&
                      (
                        this._map.off("click", this._onClick, this),
                        this._map.off("mousemove", this._onMouseMove, this)
                      ), this._requestUpdate(), (this._map = null);
                  },
                  _requestUpdate: function() {
                    this._map &&
                      !o.Path._updateRequest &&
                      (o.Path._updateRequest = o.Util.requestAnimFrame(
                        this._fireMapMoveEnd,
                        this._map
                      ));
                  },
                  _fireMapMoveEnd: function() {
                    (o.Path._updateRequest = null), this.fire("moveend");
                  },
                  _initElements: function() {
                    this._map._initPathRoot(), (this._ctx = this._map._canvasCtx);
                  },
                  _updateStyle: function() {
                    var t = this.options;
                    t.stroke &&
                      (
                        (this._ctx.lineWidth = t.weight),
                        (this._ctx.strokeStyle = t.color)
                      ), t.fill &&
                      (this._ctx.fillStyle = t.fillColor || t.color);
                  },
                  _drawPath: function() {
                    var t, e, i, n, s, a;
                    for (
                      this._ctx.beginPath(), t = 0, i = this._parts.length;
                      i > t;
                      t++
                    ) {
                      for (e = 0, n = this._parts[t].length; n > e; e++)
                        (s = this._parts[t][e]), (a =
                          (0 === e ? "move" : "line") + "To"), this._ctx[a](
                          s.x,
                          s.y
                        );
                      this instanceof o.Polygon && this._ctx.closePath();
                    }
                  },
                  _checkIfEmpty: function() {
                    return !this._parts.length;
                  },
                  _updatePath: function() {
                    if (!this._checkIfEmpty()) {
                      var t = this._ctx,
                        e = this.options;
                      this._drawPath(), t.save(), this._updateStyle(), e.fill &&
                        ((t.globalAlpha = e.fillOpacity), t.fill()), e.stroke &&
                        ((t.globalAlpha = e.opacity), t.stroke()), t.restore();
                    }
                  },
                  _initEvents: function() {
                    this.options.clickable &&
                      (
                        this._map.on("mousemove", this._onMouseMove, this),
                        this._map.on("click", this._onClick, this)
                      );
                  },
                  _onClick: function(t) {
                    this._containsPoint(t.layerPoint) && this.fire("click", t);
                  },
                  _onMouseMove: function(t) {
                    this._map &&
                      !this._map._animatingZoom &&
                      (this._containsPoint(t.layerPoint)
                        ? (
                            (this._ctx.canvas.style.cursor = "pointer"),
                            (this._mouseInside = !0),
                            this.fire("mouseover", t)
                          )
                        : this._mouseInside &&
                          (
                            (this._ctx.canvas.style.cursor = ""),
                            (this._mouseInside = !1),
                            this.fire("mouseout", t)
                          ));
                  }
                })), o.Map.include(
            (o.Path.SVG && !t.L_PREFER_CANVAS) || !o.Browser.canvas
              ? {}
              : {
                  _initPathRoot: function() {
                    var t,
                      e = this._pathRoot;
                    e ||
                      (
                        (e = this._pathRoot = i.createElement("canvas")),
                        (e.style.position = "absolute"),
                        (t = this._canvasCtx = e.getContext("2d")),
                        (t.lineCap = "round"),
                        (t.lineJoin = "round"),
                        this._panes.overlayPane.appendChild(e),
                        this.options.zoomAnimation &&
                          (
                            (this._pathRoot.className =
                              "leaflet-zoom-animated"),
                            this.on("zoomanim", this._animatePathZoom),
                            this.on("zoomend", this._endPathZoom)
                          ),
                        this.on("moveend", this._updateCanvasViewport),
                        this._updateCanvasViewport()
                      );
                  },
                  _updateCanvasViewport: function() {
                    if (!this._pathZooming) {
                      this._updatePathViewport();
                      var t = this._pathViewport,
                        e = t.min,
                        i = t.max.subtract(e),
                        n = this._pathRoot;
                      o.DomUtil.setPosition(n, e), (n.width = i.x), (n.height =
                        i.y), n.getContext("2d").translate(-e.x, -e.y);
                    }
                  }
                }
          ), (o.LineUtil = {
            simplify: function(t, e) {
              if (!e || !t.length) return t.slice();
              var i = e * e;
              return (t = this._reducePoints(t, i)), (t = this._simplifyDP(
                t,
                i
              ));
            },
            pointToSegmentDistance: function(t, e, i) {
              return Math.sqrt(this._sqClosestPointOnSegment(t, e, i, !0));
            },
            closestPointOnSegment: function(t, e, i) {
              return this._sqClosestPointOnSegment(t, e, i);
            },
            _simplifyDP: function(t, e) {
              var i = t.length,
                s = typeof Uint8Array != n + "" ? Uint8Array : Array,
                o = new s(i);
              (o[0] = o[i - 1] = 1), this._simplifyDPStep(t, o, e, 0, i - 1);
              var a,
                r = [];
              for (a = 0; i > a; a++) o[a] && r.push(t[a]);
              return r;
            },
            _simplifyDPStep: function(t, e, i, n, s) {
              var o,
                a,
                r,
                h = 0;
              for (a = n + 1; s - 1 >= a; a++)
                (r = this._sqClosestPointOnSegment(t[a], t[n], t[s], !0)), r >
                  h && ((o = a), (h = r));
              h > i &&
                (
                  (e[o] = 1),
                  this._simplifyDPStep(t, e, i, n, o),
                  this._simplifyDPStep(t, e, i, o, s)
                );
            },
            _reducePoints: function(t, e) {
              for (var i = [t[0]], n = 1, s = 0, o = t.length; o > n; n++)
                this._sqDist(t[n], t[s]) > e && (i.push(t[n]), (s = n));
              return o - 1 > s && i.push(t[o - 1]), i;
            },
            clipSegment: function(t, e, i, n) {
              var s,
                o,
                a,
                r = n ? this._lastCode : this._getBitCode(t, i),
                h = this._getBitCode(e, i);
              for (this._lastCode = h; ; ) {
                if (!(r | h)) return [t, e];
                if (r & h) return !1;
                (s = r || h), (o = this._getEdgeIntersection(
                  t,
                  e,
                  s,
                  i
                )), (a = this._getBitCode(o, i)), s === r
                  ? ((t = o), (r = a))
                  : ((e = o), (h = a));
              }
            },
            _getEdgeIntersection: function(t, e, i, n) {
              var s = e.x - t.x,
                a = e.y - t.y,
                r = n.min,
                h = n.max;
              return 8 & i
                ? new o.Point(t.x + s * (h.y - t.y) / a, h.y)
                : 4 & i
                  ? new o.Point(t.x + s * (r.y - t.y) / a, r.y)
                  : 2 & i
                    ? new o.Point(h.x, t.y + a * (h.x - t.x) / s)
                    : 1 & i
                      ? new o.Point(r.x, t.y + a * (r.x - t.x) / s)
                      : void 0;
            },
            _getBitCode: function(t, e) {
              var i = 0;
              return t.x < e.min.x ? (i |= 1) : t.x > e.max.x && (i |= 2), t.y <
              e.min.y
                ? (i |= 4)
                : t.y > e.max.y && (i |= 8), i;
            },
            _sqDist: function(t, e) {
              var i = e.x - t.x,
                n = e.y - t.y;
              return i * i + n * n;
            },
            _sqClosestPointOnSegment: function(t, e, i, n) {
              var s,
                a = e.x,
                r = e.y,
                h = i.x - a,
                c = i.y - r,
                u = h * h + c * c;
              return u > 0 &&
                (
                  (s = ((t.x - a) * h + (t.y - r) * c) / u),
                  s > 1
                    ? ((a = i.x), (r = i.y))
                    : s > 0 && ((a += h * s), (r += c * s))
                ), (h = t.x - a), (c = t.y - r), n
                ? h * h + c * c
                : new o.Point(a, r);
            }
          }), (o.Polyline = o.Path.extend({
            initialize: function(t, e) {
              o.Path.prototype.initialize.call(
                this,
                e
              ), (this._latlngs = this._convertLatLngs(t));
            },
            options: { smoothFactor: 1, noClip: !1 },
            projectLatlngs: function() {
              this._originalPoints = [];
              for (var t = 0, e = this._latlngs.length; e > t; t++)
                this._originalPoints[t] = this._map.latLngToLayerPoint(
                  this._latlngs[t]
                );
            },
            getPathString: function() {
              for (var t = 0, e = this._parts.length, i = ""; e > t; t++)
                i += this._getPathPartStr(this._parts[t]);
              return i;
            },
            getLatLngs: function() {
              return this._latlngs;
            },
            setLatLngs: function(t) {
              return (this._latlngs = this._convertLatLngs(t)), this.redraw();
            },
            addLatLng: function(t) {
              return this._latlngs.push(o.latLng(t)), this.redraw();
            },
            spliceLatLngs: function() {
              var t = [].splice.apply(this._latlngs, arguments);
              return this._convertLatLngs(this._latlngs, !0), this.redraw(), t;
            },
            closestLayerPoint: function(t) {
              for (
                var e,
                  i,
                  n = 1 / 0,
                  s = this._parts,
                  a = null,
                  r = 0,
                  h = s.length;
                h > r;
                r++
              )
                for (var c = s[r], u = 1, l = c.length; l > u; u++) {
                  (e = c[u - 1]), (i = c[u]);
                  var f = o.LineUtil._sqClosestPointOnSegment(t, e, i, !0);
                  n > f &&
                    (
                      (n = f),
                      (a = o.LineUtil._sqClosestPointOnSegment(t, e, i))
                    );
                }
              return a && (a.distance = Math.sqrt(n)), a;
            },
            getBounds: function() {
              return new o.LatLngBounds(this.getLatLngs());
            },
            _convertLatLngs: function(t, e) {
              var i,
                n,
                s = e ? t : [];
              for (i = 0, n = t.length; n > i; i++) {
                if (o.Util.isArray(t[i]) && "number" != typeof t[i][0]) return;
                s[i] = o.latLng(t[i]);
              }
              return s;
            },
            _initEvents: function() {
              o.Path.prototype._initEvents.call(this);
            },
            _getPathPartStr: function(t) {
              for (
                var e, i = o.Path.VML, n = 0, s = t.length, a = "";
                s > n;
                n++
              )
                (e = t[n]), i && e._round(), (a +=
                  (n ? "L" : "M") + e.x + " " + e.y);
              return a;
            },
            _clipPoints: function() {
              var t,
                e,
                i,
                n = this._originalPoints,
                s = n.length;
              if (this.options.noClip) return void (this._parts = [n]);
              this._parts = [];
              var a = this._parts,
                r = this._map._pathViewport,
                h = o.LineUtil;
              for (t = 0, e = 0; s - 1 > t; t++)
                (i = h.clipSegment(n[t], n[t + 1], r, t)), i &&
                  (
                    (a[e] = a[e] || []),
                    a[e].push(i[0]),
                    (i[1] !== n[t + 1] || t === s - 2) && (a[e].push(i[1]), e++)
                  );
            },
            _simplifyPoints: function() {
              for (
                var t = this._parts, e = o.LineUtil, i = 0, n = t.length;
                n > i;
                i++
              )
                t[i] = e.simplify(t[i], this.options.smoothFactor);
            },
            _updatePath: function() {
              this._map &&
                (
                  this._clipPoints(),
                  this._simplifyPoints(),
                  o.Path.prototype._updatePath.call(this)
                );
            }
          })), (o.polyline = function(t, e) {
            return new o.Polyline(t, e);
          }), (o.PolyUtil = {}), (o.PolyUtil.clipPolygon = function(t, e) {
            var i,
              n,
              s,
              a,
              r,
              h,
              c,
              u,
              l,
              f = [1, 4, 2, 8],
              d = o.LineUtil;
            for (n = 0, c = t.length; c > n; n++)
              t[n]._code = d._getBitCode(t[n], e);
            for (a = 0; 4 > a; a++) {
              for (
                u = f[a], i = [], n = 0, c = t.length, s = c - 1;
                c > n;
                s = n++
              )
                (r = t[n]), (h = t[s]), r._code & u
                  ? h._code & u ||
                    (
                      (l = d._getEdgeIntersection(h, r, u, e)),
                      (l._code = d._getBitCode(l, e)),
                      i.push(l)
                    )
                  : (
                      h._code & u &&
                        (
                          (l = d._getEdgeIntersection(h, r, u, e)),
                          (l._code = d._getBitCode(l, e)),
                          i.push(l)
                        ),
                      i.push(r)
                    );
              t = i;
            }
            return t;
          }), (o.Polygon = o.Polyline.extend({
            options: { fill: !0 },
            initialize: function(t, e) {
              var i, n, s;
              if (
                (
                  o.Polyline.prototype.initialize.call(this, t, e),
                  t && o.Util.isArray(t[0]) && "number" != typeof t[0][0]
                )
              )
                for (
                  this._latlngs = this._convertLatLngs(
                    t[0]
                  ), this._holes = t.slice(1), i = 0, n = this._holes.length;
                  n > i;
                  i++
                )
                  (s = this._holes[i] = this._convertLatLngs(
                    this._holes[i]
                  )), s[0].equals(s[s.length - 1]) && s.pop();
              (t = this._latlngs), t.length >= 2 &&
                t[0].equals(t[t.length - 1]) &&
                t.pop();
            },
            projectLatlngs: function() {
              if (
                (
                  o.Polyline.prototype.projectLatlngs.call(this),
                  (this._holePoints = []),
                  this._holes
                )
              ) {
                var t, e, i, n;
                for (t = 0, i = this._holes.length; i > t; t++)
                  for (
                    this._holePoints[t] = [], e = 0, n = this._holes[t].length;
                    n > e;
                    e++
                  )
                    this._holePoints[t][e] = this._map.latLngToLayerPoint(
                      this._holes[t][e]
                    );
              }
            },
            _clipPoints: function() {
              var t = this._originalPoints,
                e = [];
              if (
                (
                  (this._parts = [t].concat(this._holePoints)),
                  !this.options.noClip
                )
              ) {
                for (var i = 0, n = this._parts.length; n > i; i++) {
                  var s = o.PolyUtil.clipPolygon(
                    this._parts[i],
                    this._map._pathViewport
                  );
                  s.length && e.push(s);
                }
                this._parts = e;
              }
            },
            _getPathPartStr: function(t) {
              var e = o.Polyline.prototype._getPathPartStr.call(this, t);
              return e + (o.Browser.svg ? "z" : "x");
            }
          })), (o.polygon = function(t, e) {
            return new o.Polygon(t, e);
          }), (function() {
            function t(t) {
              return o.FeatureGroup.extend({
                initialize: function(t, e) {
                  (this._layers = {}), (this._options = e), this.setLatLngs(t);
                },
                setLatLngs: function(e) {
                  var i = 0,
                    n = e.length;
                  for (
                    this.eachLayer(function(t) {
                      n > i ? t.setLatLngs(e[i++]) : this.removeLayer(t);
                    }, this);
                    n > i;

                  )
                    this.addLayer(new t(e[i++], this._options));
                  return this;
                },
                getLatLngs: function() {
                  var t = [];
                  return this.eachLayer(function(e) {
                    t.push(e.getLatLngs());
                  }), t;
                }
              });
            }
            (o.MultiPolyline = t(o.Polyline)), (o.MultiPolygon = t(
              o.Polygon
            )), (o.multiPolyline = function(t, e) {
              return new o.MultiPolyline(t, e);
            }), (o.multiPolygon = function(t, e) {
              return new o.MultiPolygon(t, e);
            });
          })(), (o.Rectangle = o.Polygon.extend({
            initialize: function(t, e) {
              o.Polygon.prototype.initialize.call(
                this,
                this._boundsToLatLngs(t),
                e
              );
            },
            setBounds: function(t) {
              this.setLatLngs(this._boundsToLatLngs(t));
            },
            _boundsToLatLngs: function(t) {
              return (t = o.latLngBounds(t)), [
                t.getSouthWest(),
                t.getNorthWest(),
                t.getNorthEast(),
                t.getSouthEast()
              ];
            }
          })), (o.rectangle = function(t, e) {
            return new o.Rectangle(t, e);
          }), (o.Circle = o.Path.extend({
            initialize: function(t, e, i) {
              o.Path.prototype.initialize.call(
                this,
                i
              ), (this._latlng = o.latLng(t)), (this._mRadius = e);
            },
            options: { fill: !0 },
            setLatLng: function(t) {
              return (this._latlng = o.latLng(t)), this.redraw();
            },
            setRadius: function(t) {
              return (this._mRadius = t), this.redraw();
            },
            projectLatlngs: function() {
              var t = this._getLngRadius(),
                e = this._latlng,
                i = this._map.latLngToLayerPoint([e.lat, e.lng - t]);
              (this._point = this._map.latLngToLayerPoint(
                e
              )), (this._radius = Math.max(this._point.x - i.x, 1));
            },
            getBounds: function() {
              var t = this._getLngRadius(),
                e = 360 * (this._mRadius / 40075017),
                i = this._latlng;
              return new o.LatLngBounds(
                [i.lat - e, i.lng - t],
                [i.lat + e, i.lng + t]
              );
            },
            getLatLng: function() {
              return this._latlng;
            },
            getPathString: function() {
              var t = this._point,
                e = this._radius;
              return this._checkIfEmpty()
                ? ""
                : o.Browser.svg
                  ? "M" +
                    t.x +
                    "," +
                    (t.y - e) +
                    "A" +
                    e +
                    "," +
                    e +
                    ",0,1,1," +
                    (t.x - 0.1) +
                    "," +
                    (t.y - e) +
                    " z"
                  : (
                      t._round(),
                      (e = Math.round(e)),
                      "AL " +
                        t.x +
                        "," +
                        t.y +
                        " " +
                        e +
                        "," +
                        e +
                        " 0,23592600"
                    );
            },
            getRadius: function() {
              return this._mRadius;
            },
            _getLatRadius: function() {
              return 360 * (this._mRadius / 40075017);
            },
            _getLngRadius: function() {
              return (
                this._getLatRadius() /
                Math.cos(o.LatLng.DEG_TO_RAD * this._latlng.lat)
              );
            },
            _checkIfEmpty: function() {
              if (!this._map) return !1;
              var t = this._map._pathViewport,
                e = this._radius,
                i = this._point;
              return (
                i.x - e > t.max.x ||
                i.y - e > t.max.y ||
                i.x + e < t.min.x ||
                i.y + e < t.min.y
              );
            }
          })), (o.circle = function(t, e, i) {
            return new o.Circle(t, e, i);
          }), (o.CircleMarker = o.Circle.extend({
            options: { radius: 10, weight: 2 },
            initialize: function(t, e) {
              o.Circle.prototype.initialize.call(
                this,
                t,
                null,
                e
              ), (this._radius = this.options.radius);
            },
            projectLatlngs: function() {
              this._point = this._map.latLngToLayerPoint(this._latlng);
            },
            _updateStyle: function() {
              o.Circle.prototype._updateStyle.call(this), this.setRadius(
                this.options.radius
              );
            },
            setRadius: function(t) {
              return (this.options.radius = this._radius = t), this.redraw();
            }
          })), (o.circleMarker = function(t, e) {
            return new o.CircleMarker(t, e);
          }), o.Polyline.include(
            o.Path.CANVAS
              ? {
                  _containsPoint: function(t, e) {
                    var i,
                      n,
                      s,
                      a,
                      r,
                      h,
                      c,
                      u = this.options.weight / 2;
                    for (
                      o.Browser.touch && (u += 10), i = 0, a = this._parts
                        .length;
                      a > i;
                      i++
                    )
                      for (
                        c = this._parts[i], n = 0, r = c.length, s = r - 1;
                        r > n;
                        s = n++
                      )
                        if (
                          (e || 0 !== n) &&
                          (
                            (h = o.LineUtil.pointToSegmentDistance(
                              t,
                              c[s],
                              c[n]
                            )),
                            u >= h
                          )
                        )
                          return !0;
                    return !1;
                  }
                }
              : {}
          ), o.Polygon.include(
            o.Path.CANVAS
              ? {
                  _containsPoint: function(t) {
                    var e,
                      i,
                      n,
                      s,
                      a,
                      r,
                      h,
                      c,
                      u = !1;
                    if (o.Polyline.prototype._containsPoint.call(this, t, !0))
                      return !0;
                    for (s = 0, h = this._parts.length; h > s; s++)
                      for (
                        e = this._parts[s], a = 0, c = e.length, r = c - 1;
                        c > a;
                        r = a++
                      )
                        (i = e[a]), (n = e[r]), i.y > t.y != n.y > t.y &&
                          t.x < (n.x - i.x) * (t.y - i.y) / (n.y - i.y) + i.x &&
                          (u = !u);
                    return u;
                  }
                }
              : {}
          ), o.Circle.include(
            o.Path.CANVAS
              ? {
                  _drawPath: function() {
                    var t = this._point;
                    this._ctx.beginPath(), this._ctx.arc(
                      t.x,
                      t.y,
                      this._radius,
                      0,
                      2 * Math.PI,
                      !1
                    );
                  },
                  _containsPoint: function(t) {
                    var e = this._point,
                      i = this.options.stroke ? this.options.weight / 2 : 0;
                    return t.distanceTo(e) <= this._radius + i;
                  }
                }
              : {}
          ), o.CircleMarker.include(
            o.Path.CANVAS
              ? {
                  _updateStyle: function() {
                    o.Path.prototype._updateStyle.call(this);
                  }
                }
              : {}
          ), (o.GeoJSON = o.FeatureGroup.extend({
            initialize: function(t, e) {
              o.setOptions(this, e), (this._layers = {}), t && this.addData(t);
            },
            addData: function(t) {
              var e,
                i,
                n,
                s = o.Util.isArray(t) ? t : t.features;
              if (s) {
                for (e = 0, i = s.length; i > e; e++)
                  (n = s[e]), (n.geometries ||
                    n.geometry ||
                    n.features ||
                    n.coordinates) &&
                    this.addData(s[e]);
                return this;
              }
              var a = this.options;
              if (!a.filter || a.filter(t)) {
                var r = o.GeoJSON.geometryToLayer(
                  t,
                  a.pointToLayer,
                  a.coordsToLatLng
                );
                return (r.feature = o.GeoJSON.asFeature(t)), (r.defaultOptions =
                  r.options), this.resetStyle(r), a.onEachFeature &&
                  a.onEachFeature(t, r), this.addLayer(r);
              }
            },
            resetStyle: function(t) {
              var e = this.options.style;
              e &&
                (
                  o.Util.extend(t.options, t.defaultOptions),
                  this._setLayerStyle(t, e)
                );
            },
            setStyle: function(t) {
              this.eachLayer(function(e) {
                this._setLayerStyle(e, t);
              }, this);
            },
            _setLayerStyle: function(t, e) {
              "function" == typeof e && (e = e(t.feature)), t.setStyle &&
                t.setStyle(e);
            }
          })), o.extend(o.GeoJSON, {
            geometryToLayer: function(t, e, i) {
              var n,
                s,
                a,
                r,
                h,
                c = "Feature" === t.type ? t.geometry : t,
                u = c.coordinates,
                l = [];
              switch (((i = i || this.coordsToLatLng), c.type)) {
                case "Point":
                  return (n = i(u)), e ? e(t, n) : new o.Marker(n);
                case "MultiPoint":
                  for (a = 0, r = u.length; r > a; a++)
                    (n = i(u[a])), (h = e ? e(t, n) : new o.Marker(n)), l.push(
                      h
                    );
                  return new o.FeatureGroup(l);
                case "LineString":
                  return (s = this.coordsToLatLngs(u, 0, i)), new o.Polyline(s);
                case "Polygon":
                  return (s = this.coordsToLatLngs(u, 1, i)), new o.Polygon(s);
                case "MultiLineString":
                  return (s = this.coordsToLatLngs(
                    u,
                    1,
                    i
                  )), new o.MultiPolyline(s);
                case "MultiPolygon":
                  return (s = this.coordsToLatLngs(
                    u,
                    2,
                    i
                  )), new o.MultiPolygon(s);
                case "GeometryCollection":
                  for (a = 0, r = c.geometries.length; r > a; a++)
                    (h = this.geometryToLayer(
                      {
                        geometry: c.geometries[a],
                        type: "Feature",
                        properties: t.properties
                      },
                      e,
                      i
                    )), l.push(h);
                  return new o.FeatureGroup(l);
                default:
                  throw new Error("Invalid GeoJSON object.");
              }
            },
            coordsToLatLng: function(t) {
              return new o.LatLng(t[1], t[0]);
            },
            coordsToLatLngs: function(t, e, i) {
              var n,
                s,
                o,
                a = [];
              for (s = 0, o = t.length; o > s; s++)
                (n = e
                  ? this.coordsToLatLngs(t[s], e - 1, i)
                  : (i || this.coordsToLatLng)(t[s])), a.push(n);
              return a;
            },
            latLngToCoords: function(t) {
              return [t.lng, t.lat];
            },
            latLngsToCoords: function(t) {
              for (var e = [], i = 0, n = t.length; n > i; i++)
                e.push(o.GeoJSON.latLngToCoords(t[i]));
              return e;
            },
            getFeature: function(t, e) {
              return t.feature
                ? o.extend({}, t.feature, { geometry: e })
                : o.GeoJSON.asFeature(e);
            },
            asFeature: function(t) {
              return "Feature" === t.type
                ? t
                : { type: "Feature", properties: {}, geometry: t };
            }
          });
          var r = {
            toGeoJSON: function() {
              return o.GeoJSON.getFeature(this, {
                type: "Point",
                coordinates: o.GeoJSON.latLngToCoords(this.getLatLng())
              });
            }
          };
          o.Marker.include(r), o.Circle.include(r), o.CircleMarker.include(
            r
          ), o.Polyline.include({
            toGeoJSON: function() {
              return o.GeoJSON.getFeature(this, {
                type: "LineString",
                coordinates: o.GeoJSON.latLngsToCoords(this.getLatLngs())
              });
            }
          }), o.Polygon.include({
            toGeoJSON: function() {
              var t,
                e,
                i,
                n = [o.GeoJSON.latLngsToCoords(this.getLatLngs())];
              if ((n[0].push(n[0][0]), this._holes))
                for (t = 0, e = this._holes.length; e > t; t++)
                  (i = o.GeoJSON.latLngsToCoords(this._holes[t])), i.push(
                    i[0]
                  ), n.push(i);
              return o.GeoJSON.getFeature(this, {
                type: "Polygon",
                coordinates: n
              });
            }
          }), (function() {
            function t(t, e) {
              t.include({
                toGeoJSON: function() {
                  var t = [];
                  return this.eachLayer(function(e) {
                    t.push(e.toGeoJSON().geometry.coordinates);
                  }), o.GeoJSON.getFeature(this, { type: e, coordinates: t });
                }
              });
            }
            t(o.MultiPolyline, "MultiLineString"), t(
              o.MultiPolygon,
              "MultiPolygon"
            );
          })(), o.LayerGroup.include({
            toGeoJSON: function() {
              var t = [];
              return this.eachLayer(function(e) {
                e.toGeoJSON && t.push(o.GeoJSON.asFeature(e.toGeoJSON()));
              }), { type: "FeatureCollection", features: t };
            }
          }), (o.geoJson = function(t, e) {
            return new o.GeoJSON(t, e);
          }), (o.DomEvent = {
            addListener: function(t, e, i, n) {
              var s,
                a,
                r,
                h = o.stamp(i),
                c = "_leaflet_" + e + h;
              return t[c]
                ? this
                : (
                    (s = function(e) {
                      return i.call(n || t, e || o.DomEvent._getEvent());
                    }),
                    o.Browser.msTouch && 0 === e.indexOf("touch")
                      ? this.addMsTouchListener(t, e, s, h)
                      : (
                          o.Browser.touch &&
                            "dblclick" === e &&
                            this.addDoubleTapListener &&
                            this.addDoubleTapListener(t, s, h),
                          "addEventListener" in t
                            ? "mousewheel" === e
                              ? (
                                  t.addEventListener("DOMMouseScroll", s, !1),
                                  t.addEventListener(e, s, !1)
                                )
                              : "mouseenter" === e || "mouseleave" === e
                                ? (
                                    (a = s),
                                    (r =
                                      "mouseenter" === e
                                        ? "mouseover"
                                        : "mouseout"),
                                    (s = function(e) {
                                      return o.DomEvent._checkMouse(t, e)
                                        ? a(e)
                                        : void 0;
                                    }),
                                    t.addEventListener(r, s, !1)
                                  )
                                : "click" === e && o.Browser.android
                                  ? (
                                      (a = s),
                                      (s = function(t) {
                                        return o.DomEvent._filterClick(t, a);
                                      }),
                                      t.addEventListener(e, s, !1)
                                    )
                                  : t.addEventListener(e, s, !1)
                            : "attachEvent" in t && t.attachEvent("on" + e, s),
                          (t[c] = s),
                          this
                        )
                  );
            },
            removeListener: function(t, e, i) {
              var n = o.stamp(i),
                s = "_leaflet_" + e + n,
                a = t[s];
              return a
                ? (
                    o.Browser.msTouch && 0 === e.indexOf("touch")
                      ? this.removeMsTouchListener(t, e, n)
                      : o.Browser.touch &&
                        "dblclick" === e &&
                        this.removeDoubleTapListener
                        ? this.removeDoubleTapListener(t, n)
                        : "removeEventListener" in t
                          ? "mousewheel" === e
                            ? (
                                t.removeEventListener("DOMMouseScroll", a, !1),
                                t.removeEventListener(e, a, !1)
                              )
                            : "mouseenter" === e || "mouseleave" === e
                              ? t.removeEventListener(
                                  "mouseenter" === e ? "mouseover" : "mouseout",
                                  a,
                                  !1
                                )
                              : t.removeEventListener(e, a, !1)
                          : "detachEvent" in t && t.detachEvent("on" + e, a),
                    (t[s] = null),
                    this
                  )
                : this;
            },
            stopPropagation: function(t) {
              return t.stopPropagation
                ? t.stopPropagation()
                : (t.cancelBubble = !0), this;
            },
            disableClickPropagation: function(t) {
              for (
                var e = o.DomEvent.stopPropagation,
                  i = o.Draggable.START.length - 1;
                i >= 0;
                i--
              )
                o.DomEvent.addListener(t, o.Draggable.START[i], e);
              return o.DomEvent
                .addListener(t, "click", o.DomEvent._fakeStop)
                .addListener(t, "dblclick", e);
            },
            preventDefault: function(t) {
              return t.preventDefault
                ? t.preventDefault()
                : (t.returnValue = !1), this;
            },
            stop: function(t) {
              return o.DomEvent.preventDefault(t).stopPropagation(t);
            },
            getMousePosition: function(t, e) {
              var n = o.Browser.ie7,
                s = i.body,
                a = i.documentElement,
                r = t.pageX ? t.pageX - s.scrollLeft - a.scrollLeft : t.clientX,
                h = t.pageY ? t.pageY - s.scrollTop - a.scrollTop : t.clientY,
                c = new o.Point(r, h),
                u = e.getBoundingClientRect(),
                l = u.left - e.clientLeft,
                f = u.top - e.clientTop;
              return o.DomUtil.documentIsLtr() ||
                (!o.Browser.webkit && !n) ||
                (
                  (l += e.scrollWidth - e.clientWidth),
                  n &&
                    "hidden" !== o.DomUtil.getStyle(e, "overflow-y") &&
                    "hidden" !== o.DomUtil.getStyle(e, "overflow") &&
                    (l += 17)
                ), c._subtract(new o.Point(l, f));
            },
            getWheelDelta: function(t) {
              var e = 0;
              return t.wheelDelta && (e = t.wheelDelta / 120), t.detail &&
                (e = -t.detail / 3), e;
            },
            _skipEvents: {},
            _fakeStop: function(t) {
              o.DomEvent._skipEvents[t.type] = !0;
            },
            _skipped: function(t) {
              var e = this._skipEvents[t.type];
              return (this._skipEvents[t.type] = !1), e;
            },
            _checkMouse: function(t, e) {
              var i = e.relatedTarget;
              if (!i) return !0;
              try {
                for (; i && i !== t; ) i = i.parentNode;
              } catch (n) {
                return !1;
              }
              return i !== t;
            },
            _getEvent: function() {
              var e = t.event;
              if (!e)
                for (
                  var i = arguments.callee.caller;
                  i && ((e = i.arguments[0]), !e || t.Event !== e.constructor);

                )
                  i = i.caller;
              return e;
            },
            _filterClick: function(t, e) {
              var i = t.timeStamp || t.originalEvent.timeStamp,
                n = o.DomEvent._lastClick && i - o.DomEvent._lastClick;
              return (n && n > 100 && 1e3 > n) ||
              (t.target._simulatedClick && !t._simulated)
                ? void o.DomEvent.stop(t)
                : ((o.DomEvent._lastClick = i), e(t));
            }
          }), (o.DomEvent.on = o.DomEvent.addListener), (o.DomEvent.off =
            o.DomEvent.removeListener), (o.Draggable = o.Class.extend({
            includes: o.Mixin.Events,
            statics: {
              START: o.Browser.touch
                ? ["touchstart", "mousedown"]
                : ["mousedown"],
              END: {
                mousedown: "mouseup",
                touchstart: "touchend",
                MSPointerDown: "touchend"
              },
              MOVE: {
                mousedown: "mousemove",
                touchstart: "touchmove",
                MSPointerDown: "touchmove"
              }
            },
            initialize: function(t, e) {
              (this._element = t), (this._dragStartTarget = e || t);
            },
            enable: function() {
              if (!this._enabled) {
                for (var t = o.Draggable.START.length - 1; t >= 0; t--)
                  o.DomEvent.on(
                    this._dragStartTarget,
                    o.Draggable.START[t],
                    this._onDown,
                    this
                  );
                this._enabled = !0;
              }
            },
            disable: function() {
              if (this._enabled) {
                for (var t = o.Draggable.START.length - 1; t >= 0; t--)
                  o.DomEvent.off(
                    this._dragStartTarget,
                    o.Draggable.START[t],
                    this._onDown,
                    this
                  );
                (this._enabled = !1), (this._moved = !1);
              }
            },
            _onDown: function(t) {
              if (
                !t.shiftKey &&
                (1 === t.which || 1 === t.button || t.touches) &&
                (o.DomEvent.stopPropagation(t), !o.Draggable._disabled)
              ) {
                o.DomUtil.disableImageDrag(), o.DomUtil.disableTextSelection();
                var e = t.touches ? t.touches[0] : t,
                  n = e.target;
                o.Browser.touch &&
                  "a" === n.tagName.toLowerCase() &&
                  o.DomUtil.addClass(
                    n,
                    "leaflet-active"
                  ), (this._moved = !1), this._moving ||
                  (
                    (this._startPoint = new o.Point(e.clientX, e.clientY)),
                    (this._startPos = this._newPos = o.DomUtil.getPosition(
                      this._element
                    )),
                    o.DomEvent
                      .on(i, o.Draggable.MOVE[t.type], this._onMove, this)
                      .on(i, o.Draggable.END[t.type], this._onUp, this)
                  );
              }
            },
            _onMove: function(t) {
              if (!(t.touches && t.touches.length > 1)) {
                var e = t.touches && 1 === t.touches.length ? t.touches[0] : t,
                  n = new o.Point(e.clientX, e.clientY),
                  s = n.subtract(this._startPoint);
                (s.x || s.y) &&
                  (
                    o.DomEvent.preventDefault(t),
                    this._moved ||
                      (
                        this.fire("dragstart"),
                        (this._moved = !0),
                        (this._startPos = o.DomUtil
                          .getPosition(this._element)
                          .subtract(s)),
                        o.Browser.touch ||
                          o.DomUtil.addClass(i.body, "leaflet-dragging")
                      ),
                    (this._newPos = this._startPos.add(s)),
                    (this._moving = !0),
                    o.Util.cancelAnimFrame(this._animRequest),
                    (this._animRequest = o.Util.requestAnimFrame(
                      this._updatePosition,
                      this,
                      !0,
                      this._dragStartTarget
                    ))
                  );
              }
            },
            _updatePosition: function() {
              this.fire("predrag"), o.DomUtil.setPosition(
                this._element,
                this._newPos
              ), this.fire("drag");
            },
            _onUp: function() {
              o.Browser.touch ||
                o.DomUtil.removeClass(i.body, "leaflet-dragging");
              for (var t in o.Draggable.MOVE)
                o.DomEvent
                  .off(i, o.Draggable.MOVE[t], this._onMove)
                  .off(i, o.Draggable.END[t], this._onUp);
              o.DomUtil.enableImageDrag(), o.DomUtil.enableTextSelection(), this
                ._moved &&
                (
                  o.Util.cancelAnimFrame(this._animRequest),
                  this.fire("dragend")
                ), (this._moving = !1);
            }
          })), (o.Handler = o.Class.extend({
            initialize: function(t) {
              this._map = t;
            },
            enable: function() {
              this._enabled || ((this._enabled = !0), this.addHooks());
            },
            disable: function() {
              this._enabled && ((this._enabled = !1), this.removeHooks());
            },
            enabled: function() {
              return !!this._enabled;
            }
          })), o.Map.mergeOptions({
            dragging: !0,
            inertia: !o.Browser.android23,
            inertiaDeceleration: 3400,
            inertiaMaxSpeed: 1 / 0,
            inertiaThreshold: o.Browser.touch ? 32 : 18,
            easeLinearity: 0.25,
            worldCopyJump: !1
          }), (o.Map.Drag = o.Handler.extend({
            addHooks: function() {
              if (!this._draggable) {
                var t = this._map;
                (this._draggable = new o.Draggable(
                  t._mapPane,
                  t._container
                )), this._draggable.on(
                  {
                    dragstart: this._onDragStart,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                  },
                  this
                ), t.options.worldCopyJump &&
                  (
                    this._draggable.on("predrag", this._onPreDrag, this),
                    t.on("viewreset", this._onViewReset, this),
                    this._onViewReset()
                  );
              }
              this._draggable.enable();
            },
            removeHooks: function() {
              this._draggable.disable();
            },
            moved: function() {
              return this._draggable && this._draggable._moved;
            },
            _onDragStart: function() {
              var t = this._map;
              t._panAnim && t._panAnim.stop(), t
                .fire("movestart")
                .fire("dragstart"), t.options.inertia &&
                ((this._positions = []), (this._times = []));
            },
            _onDrag: function() {
              if (this._map.options.inertia) {
                var t = (this._lastTime = +new Date()),
                  e = (this._lastPos = this._draggable._newPos);
                this._positions.push(e), this._times.push(t), t -
                  this._times[0] >
                  200 && (this._positions.shift(), this._times.shift());
              }
              this._map.fire("move").fire("drag");
            },
            _onViewReset: function() {
              var t = this._map.getSize()._divideBy(2),
                e = this._map.latLngToLayerPoint([0, 0]);
              (this._initialWorldOffset = e.subtract(
                t
              ).x), (this._worldWidth = this._map.project([0, 180]).x);
            },
            _onPreDrag: function() {
              var t = this._worldWidth,
                e = Math.round(t / 2),
                i = this._initialWorldOffset,
                n = this._draggable._newPos.x,
                s = (n - e + i) % t + e - i,
                o = (n + e + i) % t - e - i,
                a = Math.abs(s + i) < Math.abs(o + i) ? s : o;
              this._draggable._newPos.x = a;
            },
            _onDragEnd: function() {
              var t = this._map,
                e = t.options,
                i = +new Date() - this._lastTime,
                n = !e.inertia || i > e.inertiaThreshold || !this._positions[0];
              if ((t.fire("dragend"), n)) t.fire("moveend");
              else {
                var s = this._lastPos.subtract(this._positions[0]),
                  a = (this._lastTime + i - this._times[0]) / 1e3,
                  r = e.easeLinearity,
                  h = s.multiplyBy(r / a),
                  c = h.distanceTo([0, 0]),
                  u = Math.min(e.inertiaMaxSpeed, c),
                  l = h.multiplyBy(u / c),
                  f = u / (e.inertiaDeceleration * r),
                  d = l.multiplyBy(-f / 2).round();
                d.x && d.y
                  ? o.Util.requestAnimFrame(function() {
                      t.panBy(d, {
                        duration: f,
                        easeLinearity: r,
                        noMoveStart: !0
                      });
                    })
                  : t.fire("moveend");
              }
            }
          })), o.Map.addInitHook(
            "addHandler",
            "dragging",
            o.Map.Drag
          ), o.Map.mergeOptions({
            doubleClickZoom: !0
          }), (o.Map.DoubleClickZoom = o.Handler.extend({
            addHooks: function() {
              this._map.on("dblclick", this._onDoubleClick);
            },
            removeHooks: function() {
              this._map.off("dblclick", this._onDoubleClick);
            },
            _onDoubleClick: function(t) {
              this.setZoomAround(t.containerPoint, this._zoom + 1);
            }
          })), o.Map.addInitHook(
            "addHandler",
            "doubleClickZoom",
            o.Map.DoubleClickZoom
          ), o.Map.mergeOptions({
            scrollWheelZoom: !0
          }), (o.Map.ScrollWheelZoom = o.Handler.extend({
            addHooks: function() {
              o.DomEvent.on(
                this._map._container,
                "mousewheel",
                this._onWheelScroll,
                this
              ), o.DomEvent.on(
                this._map._container,
                "MozMousePixelScroll",
                o.DomEvent.preventDefault
              ), (this._delta = 0);
            },
            removeHooks: function() {
              o.DomEvent.off(
                this._map._container,
                "mousewheel",
                this._onWheelScroll
              ), o.DomEvent.off(
                this._map._container,
                "MozMousePixelScroll",
                o.DomEvent.preventDefault
              );
            },
            _onWheelScroll: function(t) {
              var e = o.DomEvent.getWheelDelta(t);
              (this._delta += e), (this._lastMousePos = this._map.mouseEventToContainerPoint(
                t
              )), this._startTime || (this._startTime = +new Date());
              var i = Math.max(40 - (+new Date() - this._startTime), 0);
              clearTimeout(this._timer), (this._timer = setTimeout(
                o.bind(this._performZoom, this),
                i
              )), o.DomEvent.preventDefault(t), o.DomEvent.stopPropagation(t);
            },
            _performZoom: function() {
              var t = this._map,
                e = this._delta,
                i = t.getZoom();
              (e = e > 0 ? Math.ceil(e) : Math.floor(e)), (e = Math.max(
                Math.min(e, 4),
                -4
              )), (e =
                t._limitZoom(i + e) -
                i), (this._delta = 0), (this._startTime = null), e &&
                t.setZoomAround(this._lastMousePos, i + e);
            }
          })), o.Map.addInitHook(
            "addHandler",
            "scrollWheelZoom",
            o.Map.ScrollWheelZoom
          ), o.extend(o.DomEvent, {
            _touchstart: o.Browser.msTouch ? "MSPointerDown" : "touchstart",
            _touchend: o.Browser.msTouch ? "MSPointerUp" : "touchend",
            addDoubleTapListener: function(t, e, n) {
              function s(t) {
                var e;
                if (
                  (
                    o.Browser.msTouch
                      ? (p.push(t.pointerId), (e = p.length))
                      : (e = t.touches.length),
                    !(e > 1)
                  )
                ) {
                  var i = Date.now(),
                    n = i - (r || i);
                  (h = t.touches ? t.touches[0] : t), (c =
                    n > 0 && u >= n), (r = i);
                }
              }
              function a(t) {
                if (o.Browser.msTouch) {
                  var i = p.indexOf(t.pointerId);
                  if (-1 === i) return;
                  p.splice(i, 1);
                }
                if (c) {
                  if (o.Browser.msTouch) {
                    var n,
                      s = {};
                    for (var a in h)
                      (n = h[a]), (s[a] =
                        "function" == typeof n ? n.bind(h) : n);
                    h = s;
                  }
                  (h.type = "dblclick"), e(h), (r = null);
                }
              }
              var r,
                h,
                c = !1,
                u = 250,
                l = "_leaflet_",
                f = this._touchstart,
                d = this._touchend,
                p = [];
              (t[l + f + n] = s), (t[l + d + n] = a);
              var m = o.Browser.msTouch ? i.documentElement : t;
              return t.addEventListener(f, s, !1), m.addEventListener(
                d,
                a,
                !1
              ), o.Browser.msTouch &&
                m.addEventListener("MSPointerCancel", a, !1), this;
            },
            removeDoubleTapListener: function(t, e) {
              var n = "_leaflet_";
              return t.removeEventListener(
                this._touchstart,
                t[n + this._touchstart + e],
                !1
              ), (o.Browser.msTouch
                ? i.documentElement
                : t).removeEventListener(
                this._touchend,
                t[n + this._touchend + e],
                !1
              ), o.Browser.msTouch &&
                i.documentElement.removeEventListener(
                  "MSPointerCancel",
                  t[n + this._touchend + e],
                  !1
                ), this;
            }
          }), o.extend(o.DomEvent, {
            _msTouches: [],
            _msDocumentListener: !1,
            addMsTouchListener: function(t, e, i, n) {
              switch (e) {
                case "touchstart":
                  return this.addMsTouchListenerStart(t, e, i, n);
                case "touchend":
                  return this.addMsTouchListenerEnd(t, e, i, n);
                case "touchmove":
                  return this.addMsTouchListenerMove(t, e, i, n);
                default:
                  throw "Unknown touch event type";
              }
            },
            addMsTouchListenerStart: function(t, e, n, s) {
              var o = "_leaflet_",
                a = this._msTouches,
                r = function(t) {
                  for (var e = !1, i = 0; i < a.length; i++)
                    if (a[i].pointerId === t.pointerId) {
                      e = !0;
                      break;
                    }
                  e || a.push(t), (t.touches = a.slice()), (t.changedTouches = [
                    t
                  ]), n(t);
                };
              if (
                (
                  (t[o + "touchstart" + s] = r),
                  t.addEventListener("MSPointerDown", r, !1),
                  !this._msDocumentListener
                )
              ) {
                var h = function(t) {
                  for (var e = 0; e < a.length; e++)
                    if (a[e].pointerId === t.pointerId) {
                      a.splice(e, 1);
                      break;
                    }
                };
                i.documentElement.addEventListener(
                  "MSPointerUp",
                  h,
                  !1
                ), i.documentElement.addEventListener(
                  "MSPointerCancel",
                  h,
                  !1
                ), (this._msDocumentListener = !0);
              }
              return this;
            },
            addMsTouchListenerMove: function(t, e, i, n) {
              function s(t) {
                if (
                  t.pointerType !== t.MSPOINTER_TYPE_MOUSE ||
                  0 !== t.buttons
                ) {
                  for (var e = 0; e < a.length; e++)
                    if (a[e].pointerId === t.pointerId) {
                      a[e] = t;
                      break;
                    }
                  (t.touches = a.slice()), (t.changedTouches = [t]), i(t);
                }
              }
              var o = "_leaflet_",
                a = this._msTouches;
              return (t[o + "touchmove" + n] = s), t.addEventListener(
                "MSPointerMove",
                s,
                !1
              ), this;
            },
            addMsTouchListenerEnd: function(t, e, i, n) {
              var s = "_leaflet_",
                o = this._msTouches,
                a = function(t) {
                  for (var e = 0; e < o.length; e++)
                    if (o[e].pointerId === t.pointerId) {
                      o.splice(e, 1);
                      break;
                    }
                  (t.touches = o.slice()), (t.changedTouches = [t]), i(t);
                };
              return (t[s + "touchend" + n] = a), t.addEventListener(
                "MSPointerUp",
                a,
                !1
              ), t.addEventListener("MSPointerCancel", a, !1), this;
            },
            removeMsTouchListener: function(t, e, i) {
              var n = "_leaflet_",
                s = t[n + e + i];
              switch (e) {
                case "touchstart":
                  t.removeEventListener("MSPointerDown", s, !1);
                  break;
                case "touchmove":
                  t.removeEventListener("MSPointerMove", s, !1);
                  break;
                case "touchend":
                  t.removeEventListener(
                    "MSPointerUp",
                    s,
                    !1
                  ), t.removeEventListener("MSPointerCancel", s, !1);
              }
              return this;
            }
          }), o.Map.mergeOptions({
            touchZoom: o.Browser.touch && !o.Browser.android23
          }), (o.Map.TouchZoom = o.Handler.extend({
            addHooks: function() {
              o.DomEvent.on(
                this._map._container,
                "touchstart",
                this._onTouchStart,
                this
              );
            },
            removeHooks: function() {
              o.DomEvent.off(
                this._map._container,
                "touchstart",
                this._onTouchStart,
                this
              );
            },
            _onTouchStart: function(t) {
              var e = this._map;
              if (
                t.touches &&
                2 === t.touches.length &&
                !e._animatingZoom &&
                !this._zooming
              ) {
                var n = e.mouseEventToLayerPoint(t.touches[0]),
                  s = e.mouseEventToLayerPoint(t.touches[1]),
                  a = e._getCenterLayerPoint();
                (this._startCenter = n
                  .add(s)
                  ._divideBy(2)), (this._startDist = n.distanceTo(
                  s
                )), (this._moved = !1), (this._zooming = !0), (this._centerOffset = a.subtract(
                  this._startCenter
                )), e._panAnim && e._panAnim.stop(), o.DomEvent
                  .on(i, "touchmove", this._onTouchMove, this)
                  .on(
                    i,
                    "touchend",
                    this._onTouchEnd,
                    this
                  ), o.DomEvent.preventDefault(t);
              }
            },
            _onTouchMove: function(t) {
              var e = this._map;
              if (t.touches && 2 === t.touches.length && this._zooming) {
                var i = e.mouseEventToLayerPoint(t.touches[0]),
                  n = e.mouseEventToLayerPoint(t.touches[1]);
                (this._scale =
                  i.distanceTo(n) / this._startDist), (this._delta = i
                  ._add(n)
                  ._divideBy(2)
                  ._subtract(this._startCenter)), 1 !== this._scale &&
                  (
                    this._moved ||
                      (
                        o.DomUtil.addClass(e._mapPane, "leaflet-touching"),
                        e.fire("movestart").fire("zoomstart"),
                        (this._moved = !0)
                      ),
                    o.Util.cancelAnimFrame(this._animRequest),
                    (this._animRequest = o.Util.requestAnimFrame(
                      this._updateOnMove,
                      this,
                      !0,
                      this._map._container
                    )),
                    o.DomEvent.preventDefault(t)
                  );
              }
            },
            _updateOnMove: function() {
              var t = this._map,
                e = this._getScaleOrigin(),
                i = t.layerPointToLatLng(e),
                n = t.getScaleZoom(this._scale);
              t._animateZoom(i, n, this._startCenter, this._scale, this._delta);
            },
            _onTouchEnd: function() {
              if (!this._moved || !this._zooming)
                return void (this._zooming = !1);
              var t = this._map;
              (this._zooming = !1), o.DomUtil.removeClass(
                t._mapPane,
                "leaflet-touching"
              ), o.Util.cancelAnimFrame(this._animRequest), o.DomEvent
                .off(i, "touchmove", this._onTouchMove)
                .off(i, "touchend", this._onTouchEnd);
              var e = this._getScaleOrigin(),
                n = t.layerPointToLatLng(e),
                s = t.getZoom(),
                a = t.getScaleZoom(this._scale) - s,
                r = a > 0 ? Math.ceil(a) : Math.floor(a),
                h = t._limitZoom(s + r),
                c = t.getZoomScale(h) / this._scale;
              t._animateZoom(n, h, e, c);
            },
            _getScaleOrigin: function() {
              var t = this._centerOffset
                .subtract(this._delta)
                .divideBy(this._scale);
              return this._startCenter.add(t);
            }
          })), o.Map.addInitHook(
            "addHandler",
            "touchZoom",
            o.Map.TouchZoom
          ), o.Map.mergeOptions({
            tap: !0,
            tapTolerance: 15
          }), (o.Map.Tap = o.Handler.extend({
            addHooks: function() {
              o.DomEvent.on(
                this._map._container,
                "touchstart",
                this._onDown,
                this
              );
            },
            removeHooks: function() {
              o.DomEvent.off(
                this._map._container,
                "touchstart",
                this._onDown,
                this
              );
            },
            _onDown: function(t) {
              if (t.touches) {
                if (
                  (
                    o.DomEvent.preventDefault(t),
                    (this._fireClick = !0),
                    t.touches.length > 1
                  )
                )
                  return (this._fireClick = !1), void clearTimeout(
                    this._holdTimeout
                  );
                var e = t.touches[0],
                  n = e.target;
                (this._startPos = this._newPos = new o.Point(
                  e.clientX,
                  e.clientY
                )), "a" === n.tagName.toLowerCase() &&
                  o.DomUtil.addClass(
                    n,
                    "leaflet-active"
                  ), (this._holdTimeout = setTimeout(
                  o.bind(function() {
                    this._isTapValid() &&
                      (
                        (this._fireClick = !1),
                        this._onUp(),
                        this._simulateEvent("contextmenu", e)
                      );
                  }, this),
                  1e3
                )), o.DomEvent
                  .on(i, "touchmove", this._onMove, this)
                  .on(i, "touchend", this._onUp, this);
              }
            },
            _onUp: function(t) {
              if (
                (
                  clearTimeout(this._holdTimeout),
                  o.DomEvent
                    .off(i, "touchmove", this._onMove, this)
                    .off(i, "touchend", this._onUp, this),
                  this._fireClick && t && t.changedTouches
                )
              ) {
                var e = t.changedTouches[0],
                  n = e.target;
                "a" === n.tagName.toLowerCase() &&
                  o.DomUtil.removeClass(
                    n,
                    "leaflet-active"
                  ), this._isTapValid() && this._simulateEvent("click", e);
              }
            },
            _isTapValid: function() {
              return (
                this._newPos.distanceTo(this._startPos) <=
                this._map.options.tapTolerance
              );
            },
            _onMove: function(t) {
              var e = t.touches[0];
              this._newPos = new o.Point(e.clientX, e.clientY);
            },
            _simulateEvent: function(e, n) {
              var s = i.createEvent("MouseEvents");
              (s._simulated = !0), (n.target._simulatedClick = !0), s.initMouseEvent(
                e,
                !0,
                !0,
                t,
                1,
                n.screenX,
                n.screenY,
                n.clientX,
                n.clientY,
                !1,
                !1,
                !1,
                !1,
                0,
                null
              ), n.target.dispatchEvent(s);
            }
          })), o.Browser.touch &&
            !o.Browser.msTouch &&
            o.Map.addInitHook(
              "addHandler",
              "tap",
              o.Map.Tap
            ), o.Map.mergeOptions({
            boxZoom: !0
          }), (o.Map.BoxZoom = o.Handler.extend({
            initialize: function(t) {
              (this._map = t), (this._container = t._container), (this._pane =
                t._panes.overlayPane);
            },
            addHooks: function() {
              o.DomEvent.on(
                this._container,
                "mousedown",
                this._onMouseDown,
                this
              );
            },
            removeHooks: function() {
              o.DomEvent.off(this._container, "mousedown", this._onMouseDown);
            },
            _onMouseDown: function(t) {
              return !t.shiftKey || (1 !== t.which && 1 !== t.button)
                ? !1
                : (
                    o.DomUtil.disableTextSelection(),
                    o.DomUtil.disableImageDrag(),
                    (this._startLayerPoint = this._map.mouseEventToLayerPoint(
                      t
                    )),
                    (this._box = o.DomUtil.create(
                      "div",
                      "leaflet-zoom-box",
                      this._pane
                    )),
                    o.DomUtil.setPosition(this._box, this._startLayerPoint),
                    (this._container.style.cursor = "crosshair"),
                    o.DomEvent
                      .on(i, "mousemove", this._onMouseMove, this)
                      .on(i, "mouseup", this._onMouseUp, this)
                      .on(i, "keydown", this._onKeyDown, this),
                    void this._map.fire("boxzoomstart")
                  );
            },
            _onMouseMove: function(t) {
              var e = this._startLayerPoint,
                i = this._box,
                n = this._map.mouseEventToLayerPoint(t),
                s = n.subtract(e),
                a = new o.Point(Math.min(n.x, e.x), Math.min(n.y, e.y));
              o.DomUtil.setPosition(i, a), (i.style.width =
                Math.max(0, Math.abs(s.x) - 4) + "px"), (i.style.height =
                Math.max(0, Math.abs(s.y) - 4) + "px");
            },
            _finish: function() {
              this._pane.removeChild(this._box), (this._container.style.cursor =
                ""), o.DomUtil.enableTextSelection(), o.DomUtil.enableImageDrag(), o.DomEvent
                .off(i, "mousemove", this._onMouseMove)
                .off(i, "mouseup", this._onMouseUp)
                .off(i, "keydown", this._onKeyDown);
            },
            _onMouseUp: function(t) {
              this._finish();
              var e = this._map,
                i = e.mouseEventToLayerPoint(t);
              if (!this._startLayerPoint.equals(i)) {
                var n = new o.LatLngBounds(
                  e.layerPointToLatLng(this._startLayerPoint),
                  e.layerPointToLatLng(i)
                );
                e.fitBounds(n), e.fire("boxzoomend", { boxZoomBounds: n });
              }
            },
            _onKeyDown: function(t) {
              27 === t.keyCode && this._finish();
            }
          })), o.Map.addInitHook(
            "addHandler",
            "boxZoom",
            o.Map.BoxZoom
          ), o.Map.mergeOptions({
            keyboard: !0,
            keyboardPanOffset: 80,
            keyboardZoomOffset: 1
          }), (o.Map.Keyboard = o.Handler.extend({
            keyCodes: {
              left: [37],
              right: [39],
              down: [40],
              up: [38],
              zoomIn: [187, 107, 61],
              zoomOut: [189, 109, 173]
            },
            initialize: function(t) {
              (this._map = t), this._setPanOffset(
                t.options.keyboardPanOffset
              ), this._setZoomOffset(t.options.keyboardZoomOffset);
            },
            addHooks: function() {
              var t = this._map._container;
              -1 === t.tabIndex && (t.tabIndex = "0"), o.DomEvent
                .on(t, "focus", this._onFocus, this)
                .on(t, "blur", this._onBlur, this)
                .on(t, "mousedown", this._onMouseDown, this), this._map
                .on("focus", this._addHooks, this)
                .on("blur", this._removeHooks, this);
            },
            removeHooks: function() {
              this._removeHooks();
              var t = this._map._container;
              o.DomEvent
                .off(t, "focus", this._onFocus, this)
                .off(t, "blur", this._onBlur, this)
                .off(t, "mousedown", this._onMouseDown, this), this._map
                .off("focus", this._addHooks, this)
                .off("blur", this._removeHooks, this);
            },
            _onMouseDown: function() {
              if (!this._focused) {
                var e = i.body,
                  n = i.documentElement,
                  s = e.scrollTop || n.scrollTop,
                  o = e.scrollLeft || n.scrollLeft;
                this._map._container.focus(), t.scrollTo(o, s);
              }
            },
            _onFocus: function() {
              (this._focused = !0), this._map.fire("focus");
            },
            _onBlur: function() {
              (this._focused = !1), this._map.fire("blur");
            },
            _setPanOffset: function(t) {
              var e,
                i,
                n = (this._panKeys = {}),
                s = this.keyCodes;
              for (e = 0, i = s.left.length; i > e; e++)
                n[s.left[e]] = [-1 * t, 0];
              for (e = 0, i = s.right.length; i > e; e++)
                n[s.right[e]] = [t, 0];
              for (e = 0, i = s.down.length; i > e; e++) n[s.down[e]] = [0, t];
              for (e = 0, i = s.up.length; i > e; e++) n[s.up[e]] = [0, -1 * t];
            },
            _setZoomOffset: function(t) {
              var e,
                i,
                n = (this._zoomKeys = {}),
                s = this.keyCodes;
              for (e = 0, i = s.zoomIn.length; i > e; e++) n[s.zoomIn[e]] = t;
              for (e = 0, i = s.zoomOut.length; i > e; e++)
                n[s.zoomOut[e]] = -t;
            },
            _addHooks: function() {
              o.DomEvent.on(i, "keydown", this._onKeyDown, this);
            },
            _removeHooks: function() {
              o.DomEvent.off(i, "keydown", this._onKeyDown, this);
            },
            _onKeyDown: function(t) {
              var e = t.keyCode,
                i = this._map;
              if (e in this._panKeys) {
                if (i._panAnim && i._panAnim._inProgress) return;
                i.panBy(this._panKeys[e]), i.options.maxBounds &&
                  i.panInsideBounds(i.options.maxBounds);
              } else {
                if (!(e in this._zoomKeys)) return;
                i.setZoom(i.getZoom() + this._zoomKeys[e]);
              }
              o.DomEvent.stop(t);
            }
          })), o.Map.addInitHook(
            "addHandler",
            "keyboard",
            o.Map.Keyboard
          ), (o.Handler.MarkerDrag = o.Handler.extend({
            initialize: function(t) {
              this._marker = t;
            },
            addHooks: function() {
              var t = this._marker._icon;
              this._draggable ||
                (this._draggable = new o.Draggable(t, t)), this._draggable
                .on("dragstart", this._onDragStart, this)
                .on("drag", this._onDrag, this)
                .on("dragend", this._onDragEnd, this), this._draggable.enable();
            },
            removeHooks: function() {
              this._draggable
                .off("dragstart", this._onDragStart, this)
                .off("drag", this._onDrag, this)
                .off(
                  "dragend",
                  this._onDragEnd,
                  this
                ), this._draggable.disable();
            },
            moved: function() {
              return this._draggable && this._draggable._moved;
            },
            _onDragStart: function() {
              this._marker.closePopup().fire("movestart").fire("dragstart");
            },
            _onDrag: function() {
              var t = this._marker,
                e = t._shadow,
                i = o.DomUtil.getPosition(t._icon),
                n = t._map.layerPointToLatLng(i);
              e &&
                o.DomUtil.setPosition(e, i), (t._latlng = n), t
                .fire("move", { latlng: n })
                .fire("drag");
            },
            _onDragEnd: function() {
              this._marker.fire("moveend").fire("dragend");
            }
          })), (o.Control = o.Class.extend({
            options: { position: "topright" },
            initialize: function(t) {
              o.setOptions(this, t);
            },
            getPosition: function() {
              return this.options.position;
            },
            setPosition: function(t) {
              var e = this._map;
              return e &&
                e.removeControl(this), (this.options.position = t), e &&
                e.addControl(this), this;
            },
            getContainer: function() {
              return this._container;
            },
            addTo: function(t) {
              this._map = t;
              var e = (this._container = this.onAdd(t)),
                i = this.getPosition(),
                n = t._controlCorners[i];
              return o.DomUtil.addClass(e, "leaflet-control"), -1 !==
              i.indexOf("bottom")
                ? n.insertBefore(e, n.firstChild)
                : n.appendChild(e), this;
            },
            removeFrom: function(t) {
              var e = this.getPosition(),
                i = t._controlCorners[e];
              return i.removeChild(this._container), (this._map = null), this
                .onRemove && this.onRemove(t), this;
            }
          })), (o.control = function(t) {
            return new o.Control(t);
          }), o.Map.include({
            addControl: function(t) {
              return t.addTo(this), this;
            },
            removeControl: function(t) {
              return t.removeFrom(this), this;
            },
            _initControlPos: function() {
              function t(t, s) {
                var a = i + t + " " + i + s;
                e[t + s] = o.DomUtil.create("div", a, n);
              }
              var e = (this._controlCorners = {}),
                i = "leaflet-",
                n = (this._controlContainer = o.DomUtil.create(
                  "div",
                  i + "control-container",
                  this._container
                ));
              t("top", "left"), t("top", "right"), t("bottom", "left"), t(
                "bottom",
                "right"
              );
            },
            _clearControlPos: function() {
              this._container.removeChild(this._controlContainer);
            }
          }), (o.Control.Zoom = o.Control.extend({
            options: { position: "topleft" },
            onAdd: function(t) {
              var e = "leaflet-control-zoom",
                i = o.DomUtil.create("div", e + " leaflet-bar");
              return (this._map = t), (this._zoomInButton = this._createButton(
                "+",
                "Zoom in",
                e + "-in",
                i,
                this._zoomIn,
                this
              )), (this._zoomOutButton = this._createButton(
                "-",
                "Zoom out",
                e + "-out",
                i,
                this._zoomOut,
                this
              )), t.on(
                "zoomend zoomlevelschange",
                this._updateDisabled,
                this
              ), i;
            },
            onRemove: function(t) {
              t.off("zoomend zoomlevelschange", this._updateDisabled, this);
            },
            _zoomIn: function(t) {
              this._map.zoomIn(t.shiftKey ? 3 : 1);
            },
            _zoomOut: function(t) {
              this._map.zoomOut(t.shiftKey ? 3 : 1);
            },
            _createButton: function(t, e, i, n, s, a) {
              var r = o.DomUtil.create("a", i, n);
              (r.innerHTML = t), (r.href = "#"), (r.title = e);
              var h = o.DomEvent.stopPropagation;
              return o.DomEvent
                .on(r, "click", h)
                .on(r, "mousedown", h)
                .on(r, "dblclick", h)
                .on(r, "click", o.DomEvent.preventDefault)
                .on(r, "click", s, a), r;
            },
            _updateDisabled: function() {
              var t = this._map,
                e = "leaflet-disabled";
              o.DomUtil.removeClass(
                this._zoomInButton,
                e
              ), o.DomUtil.removeClass(this._zoomOutButton, e), t._zoom ===
                t.getMinZoom() &&
                o.DomUtil.addClass(this._zoomOutButton, e), t._zoom ===
                t.getMaxZoom() && o.DomUtil.addClass(this._zoomInButton, e);
            }
          })), o.Map.mergeOptions({
            zoomControl: !0
          }), o.Map.addInitHook(function() {
            this.options.zoomControl &&
              (
                (this.zoomControl = new o.Control.Zoom()),
                this.addControl(this.zoomControl)
              );
          }), (o.control.zoom = function(t) {
            return new o.Control.Zoom(t);
          }), (o.Control.Attribution = o.Control.extend({
            options: {
              position: "bottomright",
              prefix:
                '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
            },
            initialize: function(t) {
              o.setOptions(this, t), (this._attributions = {});
            },
            onAdd: function(t) {
              return (this._container = o.DomUtil.create(
                "div",
                "leaflet-control-attribution"
              )), o.DomEvent.disableClickPropagation(this._container), t
                .on("layeradd", this._onLayerAdd, this)
                .on(
                  "layerremove",
                  this._onLayerRemove,
                  this
                ), this._update(), this._container;
            },
            onRemove: function(t) {
              t
                .off("layeradd", this._onLayerAdd)
                .off("layerremove", this._onLayerRemove);
            },
            setPrefix: function(t) {
              return (this.options.prefix = t), this._update(), this;
            },
            addAttribution: function(t) {
              return t
                ? (
                    this._attributions[t] || (this._attributions[t] = 0),
                    this._attributions[t]++,
                    this._update(),
                    this
                  )
                : void 0;
            },
            removeAttribution: function(t) {
              return t
                ? (
                    this._attributions[t] &&
                      (this._attributions[t]--, this._update()),
                    this
                  )
                : void 0;
            },
            _update: function() {
              if (this._map) {
                var t = [];
                for (var e in this._attributions)
                  this._attributions[e] && t.push(e);
                var i = [];
                this.options.prefix && i.push(this.options.prefix), t.length &&
                  i.push(t.join(", ")), (this._container.innerHTML = i.join(
                  " | "
                ));
              }
            },
            _onLayerAdd: function(t) {
              t.layer.getAttribution &&
                this.addAttribution(t.layer.getAttribution());
            },
            _onLayerRemove: function(t) {
              t.layer.getAttribution &&
                this.removeAttribution(t.layer.getAttribution());
            }
          })), o.Map.mergeOptions({
            attributionControl: !0
          }), o.Map.addInitHook(function() {
            this.options.attributionControl &&
              (this.attributionControl = new o.Control.Attribution().addTo(
                this
              ));
          }), (o.control.attribution = function(t) {
            return new o.Control.Attribution(t);
          }), (o.Control.Scale = o.Control.extend({
            options: {
              position: "bottomleft",
              maxWidth: 100,
              metric: !0,
              imperial: !0,
              updateWhenIdle: !1
            },
            onAdd: function(t) {
              this._map = t;
              var e = "leaflet-control-scale",
                i = o.DomUtil.create("div", e),
                n = this.options;
              return this._addScales(n, e, i), t.on(
                n.updateWhenIdle ? "moveend" : "move",
                this._update,
                this
              ), t.whenReady(this._update, this), i;
            },
            onRemove: function(t) {
              t.off(
                this.options.updateWhenIdle ? "moveend" : "move",
                this._update,
                this
              );
            },
            _addScales: function(t, e, i) {
              t.metric &&
                (this._mScale = o.DomUtil.create(
                  "div",
                  e + "-line",
                  i
                )), t.imperial &&
                (this._iScale = o.DomUtil.create("div", e + "-line", i));
            },
            _update: function() {
              var t = this._map.getBounds(),
                e = t.getCenter().lat,
                i = 6378137 * Math.PI * Math.cos(e * Math.PI / 180),
                n = i * (t.getNorthEast().lng - t.getSouthWest().lng) / 180,
                s = this._map.getSize(),
                o = this.options,
                a = 0;
              s.x > 0 && (a = n * (o.maxWidth / s.x)), this._updateScales(o, a);
            },
            _updateScales: function(t, e) {
              t.metric && e && this._updateMetric(e), t.imperial &&
                e &&
                this._updateImperial(e);
            },
            _updateMetric: function(t) {
              var e = this._getRoundNum(t);
              (this._mScale.style.width =
                this._getScaleWidth(e / t) + "px"), (this._mScale.innerHTML =
                1e3 > e ? e + " m" : e / 1e3 + " km");
            },
            _updateImperial: function(t) {
              var e,
                i,
                n,
                s = 3.2808399 * t,
                o = this._iScale;
              s > 5280
                ? (
                    (e = s / 5280),
                    (i = this._getRoundNum(e)),
                    (o.style.width = this._getScaleWidth(i / e) + "px"),
                    (o.innerHTML = i + " mi")
                  )
                : (
                    (n = this._getRoundNum(s)),
                    (o.style.width = this._getScaleWidth(n / s) + "px"),
                    (o.innerHTML = n + " ft")
                  );
            },
            _getScaleWidth: function(t) {
              return Math.round(this.options.maxWidth * t) - 10;
            },
            _getRoundNum: function(t) {
              var e = Math.pow(10, (Math.floor(t) + "").length - 1),
                i = t / e;
              return (i =
                i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1), e * i;
            }
          })), (o.control.scale = function(t) {
            return new o.Control.Scale(t);
          }), (o.Control.Layers = o.Control.extend({
            options: { collapsed: !0, position: "topright", autoZIndex: !0 },
            initialize: function(t, e, i) {
              o.setOptions(
                this,
                i
              ), (this._layers = {}), (this._lastZIndex = 0), (this._handlingClick = !1);
              for (var n in t) this._addLayer(t[n], n);
              for (n in e) this._addLayer(e[n], n, !0);
            },
            onAdd: function(t) {
              return this._initLayout(), this._update(), t
                .on("layeradd", this._onLayerChange, this)
                .on("layerremove", this._onLayerChange, this), this._container;
            },
            onRemove: function(t) {
              t
                .off("layeradd", this._onLayerChange)
                .off("layerremove", this._onLayerChange);
            },
            addBaseLayer: function(t, e) {
              return this._addLayer(t, e), this._update(), this;
            },
            addOverlay: function(t, e) {
              return this._addLayer(t, e, !0), this._update(), this;
            },
            removeLayer: function(t) {
              var e = o.stamp(t);
              return delete this._layers[e], this._update(), this;
            },
            _initLayout: function() {
              var t = "leaflet-control-layers",
                e = (this._container = o.DomUtil.create("div", t));
              e.setAttribute("aria-haspopup", !0), o.Browser.touch
                ? o.DomEvent.on(e, "click", o.DomEvent.stopPropagation)
                : (
                    o.DomEvent.disableClickPropagation(e),
                    o.DomEvent.on(e, "mousewheel", o.DomEvent.stopPropagation)
                  );
              var i = (this._form = o.DomUtil.create("form", t + "-list"));
              if (this.options.collapsed) {
                o.Browser.android ||
                  o.DomEvent
                    .on(e, "mouseover", this._expand, this)
                    .on(e, "mouseout", this._collapse, this);
                var n = (this._layersLink = o.DomUtil.create(
                  "a",
                  t + "-toggle",
                  e
                ));
                (n.href = "#"), (n.title = "Layers"), o.Browser.touch
                  ? o.DomEvent
                      .on(n, "click", o.DomEvent.stop)
                      .on(n, "click", this._expand, this)
                  : o.DomEvent.on(n, "focus", this._expand, this), this._map.on(
                  "click",
                  this._collapse,
                  this
                );
              } else this._expand();
              (this._baseLayersList = o.DomUtil.create(
                "div",
                t + "-base",
                i
              )), (this._separator = o.DomUtil.create(
                "div",
                t + "-separator",
                i
              )), (this._overlaysList = o.DomUtil.create(
                "div",
                t + "-overlays",
                i
              )), e.appendChild(i);
            },
            _addLayer: function(t, e, i) {
              var n = o.stamp(t);
              (this._layers[n] = { layer: t, name: e, overlay: i }), this
                .options.autoZIndex &&
                t.setZIndex &&
                (this._lastZIndex++, t.setZIndex(this._lastZIndex));
            },
            _update: function() {
              if (this._container) {
                (this._baseLayersList.innerHTML =
                  ""), (this._overlaysList.innerHTML = "");
                var t,
                  e,
                  i = !1,
                  n = !1;
                for (t in this._layers)
                  (e = this._layers[t]), this._addItem(e), (n =
                    n || e.overlay), (i = i || !e.overlay);
                this._separator.style.display = n && i ? "" : "none";
              }
            },
            _onLayerChange: function(t) {
              var e = this._layers[o.stamp(t.layer)];
              if (e) {
                this._handlingClick || this._update();
                var i = e.overlay
                  ? "layeradd" === t.type ? "overlayadd" : "overlayremove"
                  : "layeradd" === t.type ? "baselayerchange" : null;
                i && this._map.fire(i, e);
              }
            },
            _createRadioElement: function(t, e) {
              var n =
                '<input type="radio" class="leaflet-control-layers-selector" name="' +
                t +
                '"';
              e && (n += ' checked="checked"'), (n += "/>");
              var s = i.createElement("div");
              return (s.innerHTML = n), s.firstChild;
            },
            _addItem: function(t) {
              var e,
                n = i.createElement("label"),
                s = this._map.hasLayer(t.layer);
              t.overlay
                ? (
                    (e = i.createElement("input")),
                    (e.type = "checkbox"),
                    (e.className = "leaflet-control-layers-selector"),
                    (e.defaultChecked = s)
                  )
                : (e = this._createRadioElement(
                    "leaflet-base-layers",
                    s
                  )), (e.layerId = o.stamp(t.layer)), o.DomEvent.on(
                e,
                "click",
                this._onInputClick,
                this
              );
              var a = i.createElement("span");
              (a.innerHTML = " " + t.name), n.appendChild(e), n.appendChild(a);
              var r = t.overlay ? this._overlaysList : this._baseLayersList;
              return r.appendChild(n), n;
            },
            _onInputClick: function() {
              var t,
                e,
                i,
                n = this._form.getElementsByTagName("input"),
                s = n.length;
              for (this._handlingClick = !0, t = 0; s > t; t++)
                (e = n[t]), (i = this._layers[e.layerId]), e.checked &&
                !this._map.hasLayer(i.layer)
                  ? this._map.addLayer(i.layer)
                  : !e.checked &&
                    this._map.hasLayer(i.layer) &&
                    this._map.removeLayer(i.layer);
              this._handlingClick = !1;
            },
            _expand: function() {
              o.DomUtil.addClass(
                this._container,
                "leaflet-control-layers-expanded"
              );
            },
            _collapse: function() {
              this._container.className = this._container.className.replace(
                " leaflet-control-layers-expanded",
                ""
              );
            }
          })), (o.control.layers = function(t, e, i) {
            return new o.Control.Layers(t, e, i);
          }), (o.PosAnimation = o.Class.extend({
            includes: o.Mixin.Events,
            run: function(t, e, i, n) {
              this.stop(), (this._el = t), (this._inProgress = !0), (this._newPos = e), this.fire(
                "start"
              ), (t.style[o.DomUtil.TRANSITION] =
                "all " +
                (i || 0.25) +
                "s cubic-bezier(0,0," +
                (n || 0.5) +
                ",1)"), o.DomEvent.on(
                t,
                o.DomUtil.TRANSITION_END,
                this._onTransitionEnd,
                this
              ), o.DomUtil.setPosition(t, e), o.Util.falseFn(
                t.offsetWidth
              ), (this._stepTimer = setInterval(
                o.bind(this._onStep, this),
                50
              ));
            },
            stop: function() {
              this._inProgress &&
                (
                  o.DomUtil.setPosition(this._el, this._getPos()),
                  this._onTransitionEnd(),
                  o.Util.falseFn(this._el.offsetWidth)
                );
            },
            _onStep: function() {
              var t = this._getPos();
              return t
                ? ((this._el._leaflet_pos = t), void this.fire("step"))
                : void this._onTransitionEnd();
            },
            _transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,
            _getPos: function() {
              var e,
                i,
                n,
                s = this._el,
                a = t.getComputedStyle(s);
              if (o.Browser.any3d) {
                if (((n = a[o.DomUtil.TRANSFORM].match(this._transformRe)), !n))
                  return;
                (e = parseFloat(n[1])), (i = parseFloat(n[2]));
              } else (e = parseFloat(a.left)), (i = parseFloat(a.top));
              return new o.Point(e, i, !0);
            },
            _onTransitionEnd: function() {
              o.DomEvent.off(
                this._el,
                o.DomUtil.TRANSITION_END,
                this._onTransitionEnd,
                this
              ), this._inProgress &&
                (
                  (this._inProgress = !1),
                  (this._el.style[o.DomUtil.TRANSITION] = ""),
                  (this._el._leaflet_pos = this._newPos),
                  clearInterval(this._stepTimer),
                  this.fire("step").fire("end")
                );
            }
          })), o.Map.include({
            setView: function(t, e, i) {
              if (
                (
                  (e = this._limitZoom(e)),
                  (t = o.latLng(t)),
                  (i = i || {}),
                  this._panAnim && this._panAnim.stop(),
                  this._loaded && !i.reset && i !== !0
                )
              ) {
                i.animate !== n &&
                  (
                    (i.zoom = o.extend({ animate: i.animate }, i.zoom)),
                    (i.pan = o.extend({ animate: i.animate }, i.pan))
                  );
                var s =
                  this._zoom !== e
                    ? this._tryAnimatedZoom &&
                      this._tryAnimatedZoom(t, e, i.zoom)
                    : this._tryAnimatedPan(t, i.pan);
                if (s) return clearTimeout(this._sizeTimer), this;
              }
              return this._resetView(t, e), this;
            },
            panBy: function(t, e) {
              if (((t = o.point(t).round()), (e = e || {}), !t.x && !t.y))
                return this;
              if (
                (
                  this._panAnim ||
                    (
                      (this._panAnim = new o.PosAnimation()),
                      this._panAnim.on(
                        {
                          step: this._onPanTransitionStep,
                          end: this._onPanTransitionEnd
                        },
                        this
                      )
                    ),
                  e.noMoveStart || this.fire("movestart"),
                  e.animate !== !1
                )
              ) {
                o.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
                var i = this._getMapPanePos().subtract(t);
                this._panAnim.run(
                  this._mapPane,
                  i,
                  e.duration || 0.25,
                  e.easeLinearity
                );
              } else this._rawPanBy(t), this.fire("move").fire("moveend");
              return this;
            },
            _onPanTransitionStep: function() {
              this.fire("move");
            },
            _onPanTransitionEnd: function() {
              o.DomUtil.removeClass(
                this._mapPane,
                "leaflet-pan-anim"
              ), this.fire("moveend");
            },
            _tryAnimatedPan: function(t, e) {
              var i = this._getCenterOffset(t)._floor();
              return (e && e.animate) === !0 || this.getSize().contains(i)
                ? (this.panBy(i, e), !0)
                : !1;
            }
          }), (o.PosAnimation = o.DomUtil.TRANSITION
            ? o.PosAnimation
            : o.PosAnimation.extend({
                run: function(t, e, i, n) {
                  this.stop(), (this._el = t), (this._inProgress = !0), (this._duration =
                    i || 0.25), (this._easeOutPower =
                    1 /
                    Math.max(
                      n || 0.5,
                      0.2
                    )), (this._startPos = o.DomUtil.getPosition(
                    t
                  )), (this._offset = e.subtract(
                    this._startPos
                  )), (this._startTime = +new Date()), this.fire(
                    "start"
                  ), this._animate();
                },
                stop: function() {
                  this._inProgress && (this._step(), this._complete());
                },
                _animate: function() {
                  (this._animId = o.Util.requestAnimFrame(
                    this._animate,
                    this
                  )), this._step();
                },
                _step: function() {
                  var t = +new Date() - this._startTime,
                    e = 1e3 * this._duration;
                  e > t
                    ? this._runFrame(this._easeOut(t / e))
                    : (this._runFrame(1), this._complete());
                },
                _runFrame: function(t) {
                  var e = this._startPos.add(this._offset.multiplyBy(t));
                  o.DomUtil.setPosition(this._el, e), this.fire("step");
                },
                _complete: function() {
                  o.Util.cancelAnimFrame(
                    this._animId
                  ), (this._inProgress = !1), this.fire("end");
                },
                _easeOut: function(t) {
                  return 1 - Math.pow(1 - t, this._easeOutPower);
                }
              })), o.Map.mergeOptions({
            zoomAnimation: !0,
            zoomAnimationThreshold: 4
          }), o.DomUtil.TRANSITION &&
            o.Map.addInitHook(function() {
              (this._zoomAnimated =
                this.options.zoomAnimation &&
                o.DomUtil.TRANSITION &&
                o.Browser.any3d &&
                !o.Browser.android23 &&
                !o.Browser
                  .mobileOpera), this._zoomAnimated && o.DomEvent.on(this._mapPane, o.DomUtil.TRANSITION_END, this._catchTransitionEnd, this);
            }), o.Map.include(
            o.DomUtil.TRANSITION
              ? {
                  _catchTransitionEnd: function() {
                    this._animatingZoom && this._onZoomTransitionEnd();
                  },
                  _nothingToAnimate: function() {
                    return !this._container.getElementsByClassName(
                      "leaflet-zoom-animated"
                    ).length;
                  },
                  _tryAnimatedZoom: function(t, e, i) {
                    if (this._animatingZoom) return !0;
                    if (
                      (
                        (i = i || {}),
                        !this._zoomAnimated ||
                          i.animate === !1 ||
                          this._nothingToAnimate() ||
                          Math.abs(e - this._zoom) >
                            this.options.zoomAnimationThreshold
                      )
                    )
                      return !1;
                    var n = this.getZoomScale(e),
                      s = this._getCenterOffset(t)._divideBy(1 - 1 / n),
                      o = this._getCenterLayerPoint()._add(s);
                    return i.animate === !0 || this.getSize().contains(s)
                      ? (
                          this.fire("movestart").fire("zoomstart"),
                          this._animateZoom(t, e, o, n, null, !0),
                          !0
                        )
                      : !1;
                  },
                  _animateZoom: function(t, e, i, n, s, a) {
                    (this._animatingZoom = !0), o.DomUtil.addClass(
                      this._mapPane,
                      "leaflet-zoom-anim"
                    ), (this._animateToCenter = t), (this._animateToZoom = e), o.Draggable &&
                      (o.Draggable._disabled = !0), this.fire("zoomanim", {
                      center: t,
                      zoom: e,
                      origin: i,
                      scale: n,
                      delta: s,
                      backwards: a
                    });
                  },
                  _onZoomTransitionEnd: function() {
                    (this._animatingZoom = !1), o.DomUtil.removeClass(
                      this._mapPane,
                      "leaflet-zoom-anim"
                    ), this._resetView(
                      this._animateToCenter,
                      this._animateToZoom,
                      !0,
                      !0
                    ), o.Draggable && (o.Draggable._disabled = !1);
                  }
                }
              : {}
          ), o.TileLayer.include({
            _animateZoom: function(t) {
              this._animating ||
                ((this._animating = !0), this._prepareBgBuffer());
              var e = this._bgBuffer,
                i = o.DomUtil.TRANSFORM,
                n = t.delta
                  ? o.DomUtil.getTranslateString(t.delta)
                  : e.style[i],
                s = o.DomUtil.getScaleString(t.scale, t.origin);
              e.style[i] = t.backwards ? s + " " + n : n + " " + s;
            },
            _endZoomAnim: function() {
              var t = this._tileContainer,
                e = this._bgBuffer;
              (t.style.visibility = ""), t.parentNode.appendChild(
                t
              ), o.Util.falseFn(e.offsetWidth), (this._animating = !1);
            },
            _clearBgBuffer: function() {
              var t = this._map;
              !t ||
                t._animatingZoom ||
                t.touchZoom._zooming ||
                (
                  (this._bgBuffer.innerHTML = ""),
                  (this._bgBuffer.style[o.DomUtil.TRANSFORM] = "")
                );
            },
            _prepareBgBuffer: function() {
              var t = this._tileContainer,
                e = this._bgBuffer,
                i = this._getLoadedTilesPercentage(e),
                n = this._getLoadedTilesPercentage(t);
              return e && i > 0.5 && 0.5 > n
                ? (
                    (t.style.visibility = "hidden"),
                    void this._stopLoadingImages(t)
                  )
                : (
                    (e.style.visibility = "hidden"),
                    (e.style[o.DomUtil.TRANSFORM] = ""),
                    (this._tileContainer = e),
                    (e = this._bgBuffer = t),
                    this._stopLoadingImages(e),
                    void clearTimeout(this._clearBgBufferTimer)
                  );
            },
            _getLoadedTilesPercentage: function(t) {
              var e,
                i,
                n = t.getElementsByTagName("img"),
                s = 0;
              for (e = 0, i = n.length; i > e; e++) n[e].complete && s++;
              return s / i;
            },
            _stopLoadingImages: function(t) {
              var e,
                i,
                n,
                s = Array.prototype.slice.call(t.getElementsByTagName("img"));
              for (e = 0, i = s.length; i > e; e++)
                (n = s[e]), n.complete ||
                  (
                    (n.onload = o.Util.falseFn),
                    (n.onerror = o.Util.falseFn),
                    (n.src = o.Util.emptyImageUrl),
                    n.parentNode.removeChild(n)
                  );
            }
          }), o.Map.include({
            _defaultLocateOptions: {
              watch: !1,
              setView: !1,
              maxZoom: 1 / 0,
              timeout: 1e4,
              maximumAge: 0,
              enableHighAccuracy: !1
            },
            locate: function(t) {
              if (
                (
                  (t = this._locateOptions = o.extend(
                    this._defaultLocateOptions,
                    t
                  )),
                  !navigator.geolocation
                )
              )
                return this._handleGeolocationError({
                  code: 0,
                  message: "Geolocation not supported."
                }), this;
              var e = o.bind(this._handleGeolocationResponse, this),
                i = o.bind(this._handleGeolocationError, this);
              return t.watch
                ? (this._locationWatchId = navigator.geolocation.watchPosition(
                    e,
                    i,
                    t
                  ))
                : navigator.geolocation.getCurrentPosition(e, i, t), this;
            },
            stopLocate: function() {
              return navigator.geolocation &&
                navigator.geolocation.clearWatch(this._locationWatchId), this
                ._locateOptions && (this._locateOptions.setView = !1), this;
            },
            _handleGeolocationError: function(t) {
              var e = t.code,
                i =
                  t.message ||
                  (1 === e
                    ? "permission denied"
                    : 2 === e ? "position unavailable" : "timeout");
              this._locateOptions.setView &&
                !this._loaded &&
                this.fitWorld(), this.fire("locationerror", {
                code: e,
                message: "Geolocation error: " + i + "."
              });
            },
            _handleGeolocationResponse: function(t) {
              var e = t.coords.latitude,
                i = t.coords.longitude,
                n = new o.LatLng(e, i),
                s = 180 * t.coords.accuracy / 40075017,
                a = s / Math.cos(o.LatLng.DEG_TO_RAD * e),
                r = o.latLngBounds([e - s, i - a], [e + s, i + a]),
                h = this._locateOptions;
              if (h.setView) {
                var c = Math.min(this.getBoundsZoom(r), h.maxZoom);
                this.setView(n, c);
              }
              var u = { latlng: n, bounds: r };
              for (var l in t.coords)
                "number" == typeof t.coords[l] && (u[l] = t.coords[l]);
              this.fire("locationfound", u);
            }
          });
        })(window, document);
      },
      {}
    ],
    40: [
      function(t, e, i) {
        "use strict";
        function n() {}
        function s(t) {
          if ("function" != typeof t)
            throw new TypeError("resolver must be a function");
          (this.state = y), (this.queue = []), (this.outcome = void 0), t !==
            n && h(this, t);
        }
        function o(t, e, i) {
          (this.promise = t), "function" == typeof e &&
            (
              (this.onFulfilled = e),
              (this.callFulfilled = this.otherCallFulfilled)
            ), "function" == typeof i &&
            (
              (this.onRejected = i),
              (this.callRejected = this.otherCallRejected)
            );
        }
        function a(t, e, i) {
          p(function() {
            var n;
            try {
              n = e(i);
            } catch (s) {
              return m.reject(t, s);
            }
            n === t
              ? m.reject(t, new TypeError("Cannot resolve promise with itself"))
              : m.resolve(t, n);
          });
        }
        function r(t) {
          var e = t && t.then;
          return t && "object" == typeof t && "function" == typeof e
            ? function() {
                e.apply(t, arguments);
              }
            : void 0;
        }
        function h(t, e) {
          function i(e) {
            o || ((o = !0), m.reject(t, e));
          }
          function n(e) {
            o || ((o = !0), m.resolve(t, e));
          }
          function s() {
            e(n, i);
          }
          var o = !1,
            a = c(s);
          "error" === a.status && i(a.value);
        }
        function c(t, e) {
          var i = {};
          try {
            (i.value = t(e)), (i.status = "success");
          } catch (n) {
            (i.status = "error"), (i.value = n);
          }
          return i;
        }
        function u(t) {
          return t instanceof this ? t : m.resolve(new this(n), t);
        }
        function l(t) {
          var e = new this(n);
          return m.reject(e, t);
        }
        function f(t) {
          function e(t, e) {
            function n(t) {
              (a[e] = t), ++r !== s || o || ((o = !0), m.resolve(c, a));
            }
            i.resolve(t).then(n, function(t) {
              o || ((o = !0), m.reject(c, t));
            });
          }
          var i = this;
          if ("[object Array]" !== Object.prototype.toString.call(t))
            return this.reject(new TypeError("must be an array"));
          var s = t.length,
            o = !1;
          if (!s) return this.resolve([]);
          for (var a = new Array(s), r = 0, h = -1, c = new this(n); ++h < s; )
            e(t[h], h);
          return c;
        }
        function d(t) {
          function e(t) {
            i.resolve(t).then(
              function(t) {
                o || ((o = !0), m.resolve(r, t));
              },
              function(t) {
                o || ((o = !0), m.reject(r, t));
              }
            );
          }
          var i = this;
          if ("[object Array]" !== Object.prototype.toString.call(t))
            return this.reject(new TypeError("must be an array"));
          var s = t.length,
            o = !1;
          if (!s) return this.resolve([]);
          for (var a = -1, r = new this(n); ++a < s; ) e(t[a]);
          return r;
        }
        var p = t("immediate"),
          m = {},
          _ = ["REJECTED"],
          g = ["FULFILLED"],
          y = ["PENDING"];
        (e.exports = i = s), (s.prototype["catch"] = function(t) {
          return this.then(null, t);
        }), (s.prototype.then = function(t, e) {
          if (
            ("function" != typeof t && this.state === g) ||
            ("function" != typeof e && this.state === _)
          )
            return this;
          var i = new this.constructor(n);
          if (this.state !== y) {
            var s = this.state === g ? t : e;
            a(i, s, this.outcome);
          } else this.queue.push(new o(i, t, e));
          return i;
        }), (o.prototype.callFulfilled = function(t) {
          m.resolve(this.promise, t);
        }), (o.prototype.otherCallFulfilled = function(t) {
          a(this.promise, this.onFulfilled, t);
        }), (o.prototype.callRejected = function(t) {
          m.reject(this.promise, t);
        }), (o.prototype.otherCallRejected = function(t) {
          a(this.promise, this.onRejected, t);
        }), (m.resolve = function(t, e) {
          var i = c(r, e);
          if ("error" === i.status) return m.reject(t, i.value);
          var n = i.value;
          if (n) h(t, n);
          else {
            (t.state = g), (t.outcome = e);
            for (var s = -1, o = t.queue.length; ++s < o; )
              t.queue[s].callFulfilled(e);
          }
          return t;
        }), (m.reject = function(t, e) {
          (t.state = _), (t.outcome = e);
          for (var i = -1, n = t.queue.length; ++i < n; )
            t.queue[i].callRejected(e);
          return t;
        }), (i.resolve = u), (i.reject = l), (i.all = f), (i.race = d);
      },
      { immediate: 41 }
    ],
    41: [
      function(t, e, i) {
        "use strict";
        function n() {
          o = !0;
          for (var t, e, i = h.length; i; ) {
            for (e = h, h = [], t = -1; ++t < i; ) e[t]();
            i = h.length;
          }
          o = !1;
        }
        function s(t) {
          1 !== h.push(t) || o || a();
        }
        for (
          var o,
            a,
            r = [
              t("./nextTick"),
              t("./mutation.js"),
              t("./messageChannel"),
              t("./stateChange"),
              t("./timeout")
            ],
            h = [],
            c = -1,
            u = r.length;
          ++c < u;

        )
          if (r[c] && r[c].test && r[c].test()) {
            a = r[c].install(n);
            break;
          }
        e.exports = s;
      },
      {
        "./messageChannel": 42,
        "./mutation.js": 43,
        "./nextTick": 14,
        "./stateChange": 44,
        "./timeout": 45
      }
    ],
    42: [
      function(t, e, i) {
        (function(t) {
          "use strict";
          (i.test = function() {
            return t.setImmediate ? !1 : "undefined" != typeof t.MessageChannel;
          }), (i.install = function(e) {
            var i = new t.MessageChannel();
            return (i.port1.onmessage = e), function() {
              i.port2.postMessage(0);
            };
          });
        }.call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
              ? self
              : "undefined" != typeof window ? window : {}
        ));
      },
      {}
    ],
    43: [
      function(t, e, i) {
        (function(t) {
          "use strict";
          var e = t.MutationObserver || t.WebKitMutationObserver;
          (i.test = function() {
            return e;
          }), (i.install = function(i) {
            var n = 0,
              s = new e(i),
              o = t.document.createTextNode("");
            return s.observe(o, { characterData: !0 }), function() {
              o.data = n = ++n % 2;
            };
          });
        }.call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
              ? self
              : "undefined" != typeof window ? window : {}
        ));
      },
      {}
    ],
    44: [
      function(t, e, i) {
        (function(t) {
          "use strict";
          (i.test = function() {
            return (
              "document" in t &&
              "onreadystatechange" in t.document.createElement("script")
            );
          }), (i.install = function(e) {
            return function() {
              var i = t.document.createElement("script");
              return (i.onreadystatechange = function() {
                e(), (i.onreadystatechange = null), i.parentNode.removeChild(
                  i
                ), (i = null);
              }), t.document.documentElement.appendChild(i), e;
            };
          });
        }.call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
              ? self
              : "undefined" != typeof window ? window : {}
        ));
      },
      {}
    ],
    45: [
      function(t, e, i) {
        "use strict";
        (i.test = function() {
          return !0;
        }), (i.install = function(t) {
          return function() {
            setTimeout(t, 0);
          };
        });
      },
      {}
    ],
    46: [
      function(t, e, i) {
        !(function(t) {
          "use strict";
          var i = function(t, e, i) {
              t &&
                "object" == typeof t &&
                ((e = t.high), (i = t.unsigned), (t = t.low)), (this.low =
                0 | t), (this.high = 0 | e), (this.unsigned = !!i);
            },
            n = {},
            s = {};
          (i.fromInt = function(t, e) {
            var o, a;
            return e
              ? (
                  (t >>>= 0),
                  t >= 0 && 256 > t && (a = s[t])
                    ? a
                    : (
                        (o = new i(t, 0 > (0 | t) ? -1 : 0, !0)),
                        t >= 0 && 256 > t && (s[t] = o),
                        o
                      )
                )
              : (
                  (t = 0 | t),
                  t >= -128 && 128 > t && (a = n[t])
                    ? a
                    : (
                        (o = new i(t, 0 > t ? -1 : 0, !1)),
                        t >= -128 && 128 > t && (n[t] = o),
                        o
                      )
                );
          }), (i.fromNumber = function(t, e) {
            return (e = !!e), isNaN(t) || !isFinite(t)
              ? i.ZERO
              : !e && -h >= t
                ? i.MIN_SIGNED_VALUE
                : e && 0 >= t
                  ? i.MIN_UNSIGNED_VALUE
                  : !e && t + 1 >= h
                    ? i.MAX_SIGNED_VALUE
                    : e && t >= r
                      ? i.MAX_UNSIGNED_VALUE
                      : 0 > t
                        ? i.fromNumber(-t, !1).negate()
                        : new i((t % a) | 0, (t / a) | 0, e);
          }), (i.fromBits = function(t, e, n) {
            return new i(t, e, n);
          }), (i.from28Bits = function(t, e, n, s) {
            return i.fromBits(t | (e << 28), (e >>> 4) | (n << 24), s);
          }), (i.fromString = function(t, e, n) {
            if (0 == t.length)
              throw new Error("number format error: empty string");
            if (
              "NaN" === t ||
              "Infinity" === t ||
              "+Infinity" === t ||
              "-Infinity" === t
            )
              return i.ZERO;
            if (
              (
                "number" == typeof e && ((n = e), (e = !1)),
                (n = n || 10),
                2 > n || n > 36
              )
            )
              throw new Error("radix out of range: " + n);
            if ("-" == t.charAt(0))
              return i.fromString(t.substring(1), e, n).negate();
            if (t.indexOf("-") >= 0)
              throw new Error(
                'number format error: interior "-" character: ' + t
              );
            for (
              var s = i.fromNumber(Math.pow(n, 8)), o = i.ZERO, a = 0;
              a < t.length;
              a += 8
            ) {
              var r = Math.min(8, t.length - a),
                h = parseInt(t.substring(a, a + r), n);
              if (8 > r) {
                var c = i.fromNumber(Math.pow(n, r));
                o = o.multiply(c).add(i.fromNumber(h));
              } else (o = o.multiply(s)), (o = o.add(i.fromNumber(h)));
            }
            return (o.unsigned = e), o;
          });
          var o = 65536,
            a = o * o,
            r = a * a,
            h = r / 2,
            c = i.fromInt(1 << 24);
          (i.ZERO = i.fromInt(0)), (i.UZERO = i.fromInt(
            0,
            !0
          )), (i.ONE = i.fromInt(1)), (i.UONE = i.fromInt(
            1,
            !0
          )), (i.NEG_ONE = i.fromInt(-1)), (i.MAX_SIGNED_VALUE = i.fromBits(
            -1,
            2147483647,
            !1
          )), (i.MAX_UNSIGNED_VALUE = i.fromBits(-1, -1, !0)), (i.MAX_VALUE =
            i.MAX_SIGNED_VALUE), (i.MIN_SIGNED_VALUE = i.fromBits(
            0,
            -2147483648,
            !1
          )), (i.MIN_UNSIGNED_VALUE = i.fromBits(0, 0, !0)), (i.MIN_VALUE =
            i.MIN_SIGNED_VALUE), (i.prototype.toInt = function() {
            return this.unsigned ? this.low >>> 0 : this.low;
          }), (i.prototype.toNumber = function() {
            return this.unsigned
              ? (this.high >>> 0) * a + (this.low >>> 0)
              : this.high * a + (this.low >>> 0);
          }), (i.prototype.toString = function(t) {
            if (((t = t || 10), 2 > t || t > 36))
              throw new Error("radix out of range: " + t);
            if (this.isZero()) return "0";
            var e;
            if (this.isNegative()) {
              if (this.equals(i.MIN_SIGNED_VALUE)) {
                var n = i.fromNumber(t),
                  s = this.div(n);
                return (e = s.multiply(n).subtract(this)), s.toString(t) +
                  e.toInt().toString(t);
              }
              return "-" + this.negate().toString(t);
            }
            var o = i.fromNumber(Math.pow(t, 6));
            e = this;
            for (var a = ""; ; ) {
              var r = e.div(o),
                h = e.subtract(r.multiply(o)).toInt(),
                c = h.toString(t);
              if (((e = r), e.isZero())) return c + a;
              for (; c.length < 6; ) c = "0" + c;
              a = "" + c + a;
            }
          }), (i.prototype.getHighBits = function() {
            return this.high;
          }), (i.prototype.getHighBitsUnsigned = function() {
            return this.high >>> 0;
          }), (i.prototype.getLowBits = function() {
            return this.low;
          }), (i.prototype.getLowBitsUnsigned = function() {
            return this.low >>> 0;
          }), (i.prototype.getNumBitsAbs = function() {
            if (this.isNegative())
              return this.equals(i.MIN_SIGNED_VALUE)
                ? 64
                : this.negate().getNumBitsAbs();
            for (
              var t = 0 != this.high ? this.high : this.low, e = 31;
              e > 0 && 0 == (t & (1 << e));
              e--
            );
            return 0 != this.high ? e + 33 : e + 1;
          }), (i.prototype.isZero = function() {
            return 0 == this.high && 0 == this.low;
          }), (i.prototype.isNegative = function() {
            return !this.unsigned && this.high < 0;
          }), (i.prototype.isOdd = function() {
            return 1 == (1 & this.low);
          }), (i.prototype.isEven = function() {
            return 0 == (1 & this.low);
          }), (i.prototype.equals = function(t) {
            return this.unsigned != t.unsigned &&
            this.high >>> 31 != t.high >>> 31
              ? !1
              : this.high == t.high && this.low == t.low;
          }), (i.prototype.notEquals = function(t) {
            return !this.equals(t);
          }), (i.prototype.lessThan = function(t) {
            return this.compare(t) < 0;
          }), (i.prototype.lessThanOrEqual = function(t) {
            return this.compare(t) <= 0;
          }), (i.prototype.greaterThan = function(t) {
            return this.compare(t) > 0;
          }), (i.prototype.greaterThanOrEqual = function(t) {
            return this.compare(t) >= 0;
          }), (i.prototype.compare = function(t) {
            if (this.equals(t)) return 0;
            var e = this.isNegative(),
              i = t.isNegative();
            return e && !i
              ? -1
              : !e && i
                ? 1
                : this.unsigned
                  ? t.high >>> 0 > this.high >>> 0 ||
                    (t.high == this.high && t.low >>> 0 > this.low >>> 0)
                    ? -1
                    : 1
                  : this.subtract(t).isNegative() ? -1 : 1;
          }), (i.prototype.negate = function() {
            return !this.unsigned && this.equals(i.MIN_SIGNED_VALUE)
              ? i.MIN_SIGNED_VALUE
              : this.not().add(i.ONE);
          }), (i.prototype.add = function(t) {
            var e = this.high >>> 16,
              n = 65535 & this.high,
              s = this.low >>> 16,
              o = 65535 & this.low,
              a = t.high >>> 16,
              r = 65535 & t.high,
              h = t.low >>> 16,
              c = 65535 & t.low,
              u = 0,
              l = 0,
              f = 0,
              d = 0;
            return (d += o + c), (f += d >>> 16), (d &= 65535), (f +=
              s + h), (l += f >>> 16), (f &= 65535), (l += n + r), (u +=
              l >>> 16), (l &= 65535), (u += e + a), (u &= 65535), i.fromBits(
              (f << 16) | d,
              (u << 16) | l,
              this.unsigned
            );
          }), (i.prototype.subtract = function(t) {
            return this.add(t.negate());
          }), (i.prototype.multiply = function(t) {
            if (this.isZero()) return i.ZERO;
            if (t.isZero()) return i.ZERO;
            if (this.equals(i.MIN_VALUE))
              return t.isOdd() ? i.MIN_VALUE : i.ZERO;
            if (t.equals(i.MIN_VALUE))
              return this.isOdd() ? i.MIN_VALUE : i.ZERO;
            if (this.isNegative())
              return t.isNegative()
                ? this.negate().multiply(t.negate())
                : this.negate().multiply(t).negate();
            if (t.isNegative()) return this.multiply(t.negate()).negate();
            if (this.lessThan(c) && t.lessThan(c))
              return i.fromNumber(
                this.toNumber() * t.toNumber(),
                this.unsigned
              );
            var e = this.high >>> 16,
              n = 65535 & this.high,
              s = this.low >>> 16,
              o = 65535 & this.low,
              a = t.high >>> 16,
              r = 65535 & t.high,
              h = t.low >>> 16,
              u = 65535 & t.low,
              l = 0,
              f = 0,
              d = 0,
              p = 0;
            return (p += o * u), (d += p >>> 16), (p &= 65535), (d +=
              s * u), (f += d >>> 16), (d &= 65535), (d += o * h), (f +=
              d >>> 16), (d &= 65535), (f += n * u), (l +=
              f >>> 16), (f &= 65535), (f += s * h), (l +=
              f >>> 16), (f &= 65535), (f += o * r), (l +=
              f >>> 16), (f &= 65535), (l +=
              e * u + n * h + s * r + o * a), (l &= 65535), i.fromBits(
              (d << 16) | p,
              (l << 16) | f,
              this.unsigned
            );
          }), (i.prototype.div = function(t) {
            if (t.isZero()) throw new Error("division by zero");
            if (this.isZero()) return this.unsigned ? i.UZERO : i.ZERO;
            var e, n, s;
            if (this.equals(i.MIN_SIGNED_VALUE)) {
              if (t.equals(i.ONE) || t.equals(i.NEG_ONE))
                return i.MIN_SIGNED_VALUE;
              if (t.equals(i.MIN_SIGNED_VALUE)) return i.ONE;
              var o = this.shiftRight(1);
              return (e = o.div(t).shiftLeft(1)), e.equals(i.ZERO)
                ? t.isNegative() ? i.ONE : i.NEG_ONE
                : ((n = this.subtract(t.multiply(e))), (s = e.add(n.div(t))));
            }
            if (t.equals(i.MIN_SIGNED_VALUE))
              return this.unsigned ? i.UZERO : i.ZERO;
            if (this.isNegative())
              return t.isNegative()
                ? this.negate().div(t.negate())
                : this.negate().div(t).negate();
            if (t.isNegative()) return this.div(t.negate()).negate();
            for (s = i.ZERO, n = this; n.greaterThanOrEqual(t); ) {
              e = Math.max(1, Math.floor(n.toNumber() / t.toNumber()));
              for (
                var a = Math.ceil(Math.log(e) / Math.LN2),
                  r = 48 >= a ? 1 : Math.pow(2, a - 48),
                  h = i.fromNumber(e, this.unsigned),
                  c = h.multiply(t);
                c.isNegative() || c.greaterThan(n);

              )
                (e -= r), (h = i.fromNumber(e, this.unsigned)), (c = h.multiply(
                  t
                ));
              h.isZero() && (h = i.ONE), (s = s.add(h)), (n = n.subtract(c));
            }
            return s;
          }), (i.prototype.modulo = function(t) {
            return this.subtract(this.div(t).multiply(t));
          }), (i.prototype.not = function() {
            return i.fromBits(~this.low, ~this.high, this.unsigned);
          }), (i.prototype.and = function(t) {
            return i.fromBits(
              this.low & t.low,
              this.high & t.high,
              this.unsigned
            );
          }), (i.prototype.or = function(t) {
            return i.fromBits(
              this.low | t.low,
              this.high | t.high,
              this.unsigned
            );
          }), (i.prototype.xor = function(t) {
            return i.fromBits(
              this.low ^ t.low,
              this.high ^ t.high,
              this.unsigned
            );
          }), (i.prototype.shiftLeft = function(t) {
            if (((t &= 63), 0 == t)) return this;
            var e = this.low;
            if (32 > t) {
              var n = this.high;
              return i.fromBits(
                e << t,
                (n << t) | (e >>> (32 - t)),
                this.unsigned
              );
            }
            return i.fromBits(0, e << (t - 32), this.unsigned);
          }), (i.prototype.shiftRight = function(t) {
            if (((t &= 63), 0 == t)) return this;
            var e = this.high;
            if (32 > t) {
              var n = this.low;
              return i.fromBits(
                (n >>> t) | (e << (32 - t)),
                e >> t,
                this.unsigned
              );
            }
            return i.fromBits(e >> (t - 32), e >= 0 ? 0 : -1, this.unsigned);
          }), (i.prototype.shiftRightUnsigned = function(t) {
            if (((t &= 63), 0 == t)) return this;
            var e = this.high;
            if (32 > t) {
              var n = this.low;
              return i.fromBits(
                (n >>> t) | (e << (32 - t)),
                e >>> t,
                this.unsigned
              );
            }
            return 32 == t
              ? i.fromBits(e, 0, this.unsigned)
              : i.fromBits(e >>> (t - 32), 0, this.unsigned);
          }), (i.prototype.toSigned = function() {
            var t = this.clone();
            return (t.unsigned = !1), t;
          }), (i.prototype.toUnsigned = function() {
            var t = this.clone();
            return (t.unsigned = !0), t;
          }), (i.prototype.clone = function() {
            return new i(this.low, this.high, this.unsigned);
          }), "undefined" != typeof e && e.exports
            ? (e.exports = i)
            : "undefined" != typeof define && define.amd
              ? define("Math/Long", [], function() {
                  return i;
                })
              : (t.dcodeIO || (t.dcodeIO = {}), (t.dcodeIO.Long = i));
        })(this);
      },
      {}
    ],
    47: [
      function(t, e, i) {
        e.exports = t("./dist/Long.js");
      },
      { "./dist/Long.js": 46 }
    ],
    48: [
      function(t, e, i) {
        function n(t, e, i) {
          if (!(this instanceof n)) return new n(t, e, i);
          if (Array.isArray(t))
            (this.x = t[0]), (this.y = t[1]), (this.z = t[2] || 0);
          else if ("object" == typeof t)
            (this.x = t.x), (this.y = t.y), (this.z = t.z || 0);
          else if ("string" == typeof t && "undefined" == typeof e) {
            var s = t.split(",");
            (this.x = parseFloat(s[0], 10)), (this.y = parseFloat(
              s[1],
              10
            )), (this.z = parseFloat(s[2], 10) || 0);
          } else (this.x = t), (this.y = e), (this.z = i || 0);
          console.warn(
            "proj4.Point will be removed in version 3, use proj4.toPoint"
          );
        }
        var s = t("mgrs");
        (n.fromMGRS = function(t) {
          return new n(s.toPoint(t));
        }), (n.prototype.toMGRS = function(t) {
          return s.forward([this.x, this.y], t);
        }), (e.exports = n);
      },
      { mgrs: 115 }
    ],
    49: [
      function(t, e, i) {
        function n(t, e) {
          if (!(this instanceof n)) return new n(t);
          e =
            e ||
            function(t) {
              if (t) throw t;
            };
          var i = s(t);
          if ("object" != typeof i) return void e(t);
          var a = r(i),
            h = n.projections.get(a.projName);
          h ? (o(this, a), o(this, h), this.init(), e(null, this)) : e(t);
        }
        var s = t("./parseCode"),
          o = t("./extend"),
          a = t("./projections"),
          r = t("./deriveConstants");
        (n.projections = a), n.projections.start(), (e.exports = n);
      },
      {
        "./deriveConstants": 80,
        "./extend": 81,
        "./parseCode": 85,
        "./projections": 87
      }
    ],
    50: [
      function(t, e, i) {
        e.exports = function(t, e, i) {
          var n,
            s,
            o,
            a = i.x,
            r = i.y,
            h = i.z || 0;
          for (o = 0; 3 > o; o++)
            if (!e || 2 !== o || void 0 !== i.z)
              switch ((
                0 === o
                  ? ((n = a), (s = "x"))
                  : 1 === o ? ((n = r), (s = "y")) : ((n = h), (s = "z")),
                t.axis[o]
              )) {
                case "e":
                  i[s] = n;
                  break;
                case "w":
                  i[s] = -n;
                  break;
                case "n":
                  i[s] = n;
                  break;
                case "s":
                  i[s] = -n;
                  break;
                case "u":
                  void 0 !== i[s] && (i.z = n);
                  break;
                case "d":
                  void 0 !== i[s] && (i.z = -n);
                  break;
                default:
                  return null;
              }
          return i;
        };
      },
      {}
    ],
    51: [
      function(t, e, i) {
        var n = Math.PI / 2,
          s = t("./sign");
        e.exports = function(t) {
          return Math.abs(t) < n ? t : t - s(t) * Math.PI;
        };
      },
      { "./sign": 68 }
    ],
    52: [
      function(t, e, i) {
        var n = 2 * Math.PI,
          s = 3.14159265359,
          o = t("./sign");
        e.exports = function(t) {
          return Math.abs(t) <= s ? t : t - o(t) * n;
        };
      },
      { "./sign": 68 }
    ],
    53: [
      function(t, e, i) {
        e.exports = function(t) {
          return Math.abs(t) > 1 && (t = t > 1 ? 1 : -1), Math.asin(t);
        };
      },
      {}
    ],
    54: [
      function(t, e, i) {
        e.exports = function(t) {
          return 1 - 0.25 * t * (1 + t / 16 * (3 + 1.25 * t));
        };
      },
      {}
    ],
    55: [
      function(t, e, i) {
        e.exports = function(t) {
          return 0.375 * t * (1 + 0.25 * t * (1 + 0.46875 * t));
        };
      },
      {}
    ],
    56: [
      function(t, e, i) {
        e.exports = function(t) {
          return 0.05859375 * t * t * (1 + 0.75 * t);
        };
      },
      {}
    ],
    57: [
      function(t, e, i) {
        e.exports = function(t) {
          return t * t * t * (35 / 3072);
        };
      },
      {}
    ],
    58: [
      function(t, e, i) {
        e.exports = function(t, e, i) {
          var n = e * i;
          return t / Math.sqrt(1 - n * n);
        };
      },
      {}
    ],
    59: [
      function(t, e, i) {
        e.exports = function(t, e, i, n, s) {
          var o, a;
          o = t / e;
          for (var r = 0; 15 > r; r++)
            if (
              (
                (a =
                  (t -
                    (e * o -
                      i * Math.sin(2 * o) +
                      n * Math.sin(4 * o) -
                      s * Math.sin(6 * o))) /
                  (e -
                    2 * i * Math.cos(2 * o) +
                    4 * n * Math.cos(4 * o) -
                    6 * s * Math.cos(6 * o))),
                (o += a),
                Math.abs(a) <= 1e-10
              )
            )
              return o;
          return NaN;
        };
      },
      {}
    ],
    60: [
      function(t, e, i) {
        var n = Math.PI / 2;
        e.exports = function(t, e) {
          var i = 1 - (1 - t * t) / (2 * t) * Math.log((1 - t) / (1 + t));
          if (Math.abs(Math.abs(e) - i) < 1e-6) return 0 > e ? -1 * n : n;
          for (var s, o, a, r, h = Math.asin(0.5 * e), c = 0; 30 > c; c++)
            if (
              (
                (o = Math.sin(h)),
                (a = Math.cos(h)),
                (r = t * o),
                (s =
                  Math.pow(1 - r * r, 2) /
                  (2 * a) *
                  (e / (1 - t * t) -
                    o / (1 - r * r) +
                    0.5 / t * Math.log((1 - r) / (1 + r)))),
                (h += s),
                Math.abs(s) <= 1e-10
              )
            )
              return h;
          return NaN;
        };
      },
      {}
    ],
    61: [
      function(t, e, i) {
        e.exports = function(t, e, i, n, s) {
          return (
            t * s -
            e * Math.sin(2 * s) +
            i * Math.sin(4 * s) -
            n * Math.sin(6 * s)
          );
        };
      },
      {}
    ],
    62: [
      function(t, e, i) {
        e.exports = function(t, e, i) {
          var n = t * e;
          return i / Math.sqrt(1 - n * n);
        };
      },
      {}
    ],
    63: [
      function(t, e, i) {
        var n = Math.PI / 2;
        e.exports = function(t, e) {
          for (
            var i, s, o = 0.5 * t, a = n - 2 * Math.atan(e), r = 0;
            15 >= r;
            r++
          )
            if (
              (
                (i = t * Math.sin(a)),
                (s = n - 2 * Math.atan(e * Math.pow((1 - i) / (1 + i), o)) - a),
                (a += s),
                Math.abs(s) <= 1e-10
              )
            )
              return a;
          return -9999;
        };
      },
      {}
    ],
    64: [
      function(t, e, i) {
        var n = 1,
          s = 0.25,
          o = 0.046875,
          a = 0.01953125,
          r = 0.01068115234375,
          h = 0.75,
          c = 0.46875,
          u = 0.013020833333333334,
          l = 0.007120768229166667,
          f = 0.3645833333333333,
          d = 0.005696614583333333,
          p = 0.3076171875;
        e.exports = function(t) {
          var e = [];
          (e[0] = n - t * (s + t * (o + t * (a + t * r)))), (e[1] =
            t * (h - t * (o + t * (a + t * r))));
          var i = t * t;
          return (e[2] = i * (c - t * (u + t * l))), (i *= t), (e[3] =
            i * (f - t * d)), (e[4] = i * t * p), e;
        };
      },
      {}
    ],
    65: [
      function(t, e, i) {
        var n = t("./pj_mlfn"),
          s = 1e-10,
          o = 20;
        e.exports = function(t, e, i) {
          for (var a = 1 / (1 - e), r = t, h = o; h; --h) {
            var c = Math.sin(r),
              u = 1 - e * c * c;
            if (
              (
                (u = (n(r, c, Math.cos(r), i) - t) * (u * Math.sqrt(u)) * a),
                (r -= u),
                Math.abs(u) < s
              )
            )
              return r;
          }
          return r;
        };
      },
      { "./pj_mlfn": 66 }
    ],
    66: [
      function(t, e, i) {
        e.exports = function(t, e, i, n) {
          return (i *= e), (e *= e), n[0] * t -
            i * (n[1] + e * (n[2] + e * (n[3] + e * n[4])));
        };
      },
      {}
    ],
    67: [
      function(t, e, i) {
        e.exports = function(t, e) {
          var i;
          return t > 1e-7
            ? (
                (i = t * e),
                (1 - t * t) *
                  (e / (1 - i * i) - 0.5 / t * Math.log((1 - i) / (1 + i)))
              )
            : 2 * e;
        };
      },
      {}
    ],
    68: [
      function(t, e, i) {
        e.exports = function(t) {
          return 0 > t ? -1 : 1;
        };
      },
      {}
    ],
    69: [
      function(t, e, i) {
        e.exports = function(t, e) {
          return Math.pow((1 - t) / (1 + t), e);
        };
      },
      {}
    ],
    70: [
      function(t, e, i) {
        e.exports = function(t) {
          var e = { x: t[0], y: t[1] };
          return t.length > 2 && (e.z = t[2]), t.length > 3 && (e.m = t[3]), e;
        };
      },
      {}
    ],
    71: [
      function(t, e, i) {
        var n = Math.PI / 2;
        e.exports = function(t, e, i) {
          var s = t * i,
            o = 0.5 * t;
          return (s = Math.pow((1 - s) / (1 + s), o)), Math.tan(0.5 * (n - e)) /
            s;
        };
      },
      {}
    ],
    72: [
      function(t, e, i) {
        (i.wgs84 = {
          towgs84: "0,0,0",
          ellipse: "WGS84",
          datumName: "WGS84"
        }), (i.ch1903 = {
          towgs84: "674.374,15.056,405.346",
          ellipse: "bessel",
          datumName: "swiss"
        }), (i.ggrs87 = {
          towgs84: "-199.87,74.79,246.62",
          ellipse: "GRS80",
          datumName: "Greek_Geodetic_Reference_System_1987"
        }), (i.nad83 = {
          towgs84: "0,0,0",
          ellipse: "GRS80",
          datumName: "North_American_Datum_1983"
        }), (i.nad27 = {
          nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
          ellipse: "clrk66",
          datumName: "North_American_Datum_1927"
        }), (i.potsdam = {
          towgs84: "606.0,23.0,413.0",
          ellipse: "bessel",
          datumName: "Potsdam Rauenberg 1950 DHDN"
        }), (i.carthage = {
          towgs84: "-263.0,6.0,431.0",
          ellipse: "clark80",
          datumName: "Carthage 1934 Tunisia"
        }), (i.hermannskogel = {
          towgs84: "653.0,-212.0,449.0",
          ellipse: "bessel",
          datumName: "Hermannskogel"
        }), (i.ire65 = {
          towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
          ellipse: "mod_airy",
          datumName: "Ireland 1965"
        }), (i.rassadiran = {
          towgs84: "-133.63,-157.5,-158.62",
          ellipse: "intl",
          datumName: "Rassadiran"
        }), (i.nzgd49 = {
          towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
          ellipse: "intl",
          datumName: "New Zealand Geodetic Datum 1949"
        }), (i.osgb36 = {
          towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
          ellipse: "airy",
          datumName: "Airy 1830"
        }), (i.s_jtsk = {
          towgs84: "589,76,480",
          ellipse: "bessel",
          datumName: "S-JTSK (Ferro)"
        }), (i.beduaram = {
          towgs84: "-106,-87,188",
          ellipse: "clrk80",
          datumName: "Beduaram"
        }), (i.gunung_segara = {
          towgs84: "-403,684,41",
          ellipse: "bessel",
          datumName: "Gunung Segara Jakarta"
        }), (i.rnb72 = {
          towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
          ellipse: "intl",
          datumName: "Reseau National Belge 1972"
        });
      },
      {}
    ],
    73: [
      function(t, e, i) {
        (i.MERIT = {
          a: 6378137,
          rf: 298.257,
          ellipseName: "MERIT 1983"
        }), (i.SGS85 = {
          a: 6378136,
          rf: 298.257,
          ellipseName: "Soviet Geodetic System 85"
        }), (i.GRS80 = {
          a: 6378137,
          rf: 298.257222101,
          ellipseName: "GRS 1980(IUGG, 1980)"
        }), (i.IAU76 = {
          a: 6378140,
          rf: 298.257,
          ellipseName: "IAU 1976"
        }), (i.airy = {
          a: 6377563.396,
          b: 6356256.91,
          ellipseName: "Airy 1830"
        }), (i.APL4 = {
          a: 6378137,
          rf: 298.25,
          ellipseName: "Appl. Physics. 1965"
        }), (i.NWL9D = {
          a: 6378145,
          rf: 298.25,
          ellipseName: "Naval Weapons Lab., 1965"
        }), (i.mod_airy = {
          a: 6377340.189,
          b: 6356034.446,
          ellipseName: "Modified Airy"
        }), (i.andrae = {
          a: 6377104.43,
          rf: 300,
          ellipseName: "Andrae 1876 (Den., Iclnd.)"
        }), (i.aust_SA = {
          a: 6378160,
          rf: 298.25,
          ellipseName: "Australian Natl & S. Amer. 1969"
        }), (i.GRS67 = {
          a: 6378160,
          rf: 298.247167427,
          ellipseName: "GRS 67(IUGG 1967)"
        }), (i.bessel = {
          a: 6377397.155,
          rf: 299.1528128,
          ellipseName: "Bessel 1841"
        }), (i.bess_nam = {
          a: 6377483.865,
          rf: 299.1528128,
          ellipseName: "Bessel 1841 (Namibia)"
        }), (i.clrk66 = {
          a: 6378206.4,
          b: 6356583.8,
          ellipseName: "Clarke 1866"
        }), (i.clrk80 = {
          a: 6378249.145,
          rf: 293.4663,
          ellipseName: "Clarke 1880 mod."
        }), (i.clrk58 = {
          a: 6378293.645208759,
          rf: 294.2606763692654,
          ellipseName: "Clarke 1858"
        }), (i.CPM = {
          a: 6375738.7,
          rf: 334.29,
          ellipseName: "Comm. des Poids et Mesures 1799"
        }), (i.delmbr = {
          a: 6376428,
          rf: 311.5,
          ellipseName: "Delambre 1810 (Belgium)"
        }), (i.engelis = {
          a: 6378136.05,
          rf: 298.2566,
          ellipseName: "Engelis 1985"
        }), (i.evrst30 = {
          a: 6377276.345,
          rf: 300.8017,
          ellipseName: "Everest 1830"
        }), (i.evrst48 = {
          a: 6377304.063,
          rf: 300.8017,
          ellipseName: "Everest 1948"
        }), (i.evrst56 = {
          a: 6377301.243,
          rf: 300.8017,
          ellipseName: "Everest 1956"
        }), (i.evrst69 = {
          a: 6377295.664,
          rf: 300.8017,
          ellipseName: "Everest 1969"
        }), (i.evrstSS = {
          a: 6377298.556,
          rf: 300.8017,
          ellipseName: "Everest (Sabah & Sarawak)"
        }), (i.fschr60 = {
          a: 6378166,
          rf: 298.3,
          ellipseName: "Fischer (Mercury Datum) 1960"
        }), (i.fschr60m = {
          a: 6378155,
          rf: 298.3,
          ellipseName: "Fischer 1960"
        }), (i.fschr68 = {
          a: 6378150,
          rf: 298.3,
          ellipseName: "Fischer 1968"
        }), (i.helmert = {
          a: 6378200,
          rf: 298.3,
          ellipseName: "Helmert 1906"
        }), (i.hough = {
          a: 6378270,
          rf: 297,
          ellipseName: "Hough"
        }), (i.intl = {
          a: 6378388,
          rf: 297,
          ellipseName: "International 1909 (Hayford)"
        }), (i.kaula = {
          a: 6378163,
          rf: 298.24,
          ellipseName: "Kaula 1961"
        }), (i.lerch = {
          a: 6378139,
          rf: 298.257,
          ellipseName: "Lerch 1979"
        }), (i.mprts = {
          a: 6397300,
          rf: 191,
          ellipseName: "Maupertius 1738"
        }), (i.new_intl = {
          a: 6378157.5,
          b: 6356772.2,
          ellipseName: "New International 1967"
        }), (i.plessis = {
          a: 6376523,
          rf: 6355863,
          ellipseName: "Plessis 1817 (France)"
        }), (i.krass = {
          a: 6378245,
          rf: 298.3,
          ellipseName: "Krassovsky, 1942"
        }), (i.SEasia = {
          a: 6378155,
          b: 6356773.3205,
          ellipseName: "Southeast Asia"
        }), (i.walbeck = {
          a: 6376896,
          b: 6355834.8467,
          ellipseName: "Walbeck"
        }), (i.WGS60 = {
          a: 6378165,
          rf: 298.3,
          ellipseName: "WGS 60"
        }), (i.WGS66 = {
          a: 6378145,
          rf: 298.25,
          ellipseName: "WGS 66"
        }), (i.WGS7 = {
          a: 6378135,
          rf: 298.26,
          ellipseName: "WGS 72"
        }), (i.WGS84 = {
          a: 6378137,
          rf: 298.257223563,
          ellipseName: "WGS 84"
        }), (i.sphere = {
          a: 6370997,
          b: 6370997,
          ellipseName: "Normal Sphere (r=6370997)"
        });
      },
      {}
    ],
    74: [
      function(t, e, i) {
        (i.greenwich = 0), (i.lisbon = -9.131906111111), (i.paris = 2.337229166667), (i.bogota = -74.080916666667), (i.madrid = -3.687938888889), (i.rome = 12.452333333333), (i.bern = 7.439583333333), (i.jakarta = 106.807719444444), (i.ferro = -17.666666666667), (i.brussels = 4.367975), (i.stockholm = 18.058277777778), (i.athens = 23.7163375), (i.oslo = 10.722916666667);
      },
      {}
    ],
    75: [
      function(t, e, i) {
        (i.ft = { to_meter: 0.3048 }), (i["us-ft"] = { to_meter: 1200 / 3937 });
      },
      {}
    ],
    76: [
      function(t, e, i) {
        function n(t, e, i) {
          var n;
          return Array.isArray(i)
            ? ((n = r(t, e, i)), 3 === i.length ? [n.x, n.y, n.z] : [n.x, n.y])
            : r(t, e, i);
        }
        function s(t) {
          return t instanceof a ? t : t.oProj ? t.oProj : a(t);
        }
        function o(t, e, i) {
          t = s(t);
          var o,
            a = !1;
          return "undefined" == typeof e
            ? ((e = t), (t = h), (a = !0))
            : ("undefined" != typeof e.x || Array.isArray(e)) &&
              ((i = e), (e = t), (t = h), (a = !0)), (e = s(e)), i
            ? n(t, e, i)
            : (
                (o = {
                  forward: function(i) {
                    return n(t, e, i);
                  },
                  inverse: function(i) {
                    return n(e, t, i);
                  }
                }),
                a && (o.oProj = e),
                o
              );
        }
        var a = t("./Proj"),
          r = t("./transform"),
          h = a("WGS84");
        e.exports = o;
      },
      { "./Proj": 49, "./transform": 113 }
    ],
    77: [
      function(t, e, i) {
        var n = Math.PI / 2,
          s = 1,
          o = 2,
          a = 3,
          r = 4,
          h = 5,
          c = 484813681109536e-20,
          u = 1.0026,
          l = 0.3826834323650898,
          f = function(t) {
            if (!(this instanceof f)) return new f(t);
            if (((this.datum_type = r), t)) {
              if (
                (
                  t.datumCode &&
                    "none" === t.datumCode &&
                    (this.datum_type = h),
                  t.datum_params
                )
              ) {
                for (var e = 0; e < t.datum_params.length; e++)
                  t.datum_params[e] = parseFloat(t.datum_params[e]);
                (0 !== t.datum_params[0] ||
                  0 !== t.datum_params[1] ||
                  0 !== t.datum_params[2]) &&
                  (this.datum_type = s), t.datum_params.length > 3 &&
                  (0 !== t.datum_params[3] ||
                    0 !== t.datum_params[4] ||
                    0 !== t.datum_params[5] ||
                    0 !== t.datum_params[6]) &&
                  (
                    (this.datum_type = o),
                    (t.datum_params[3] *= c),
                    (t.datum_params[4] *= c),
                    (t.datum_params[5] *= c),
                    (t.datum_params[6] = t.datum_params[6] / 1e6 + 1)
                  );
              }
              (this.datum_type = t.grids ? a : this.datum_type), (this.a =
                t.a), (this.b = t.b), (this.es = t.es), (this.ep2 =
                t.ep2), (this.datum_params = t.datum_params), this
                .datum_type === a && (this.grids = t.grids);
            }
          };
        (f.prototype = {
          compare_datums: function(t) {
            return this.datum_type !== t.datum_type
              ? !1
              : this.a !== t.a || Math.abs(this.es - t.es) > 5e-11
                ? !1
                : this.datum_type === s
                  ? this.datum_params[0] === t.datum_params[0] &&
                    this.datum_params[1] === t.datum_params[1] &&
                    this.datum_params[2] === t.datum_params[2]
                  : this.datum_type === o
                    ? this.datum_params[0] === t.datum_params[0] &&
                      this.datum_params[1] === t.datum_params[1] &&
                      this.datum_params[2] === t.datum_params[2] &&
                      this.datum_params[3] === t.datum_params[3] &&
                      this.datum_params[4] === t.datum_params[4] &&
                      this.datum_params[5] === t.datum_params[5] &&
                      this.datum_params[6] === t.datum_params[6]
                    : this.datum_type === a || t.datum_type === a
                      ? this.nadgrids === t.nadgrids
                      : !0;
          },
          geodetic_to_geocentric: function(t) {
            var e,
              i,
              s,
              o,
              a,
              r,
              h,
              c = t.x,
              u = t.y,
              l = t.z ? t.z : 0,
              f = 0;
            if (-n > u && u > -1.001 * n) u = -n;
            else if (u > n && 1.001 * n > u) u = n;
            else if (-n > u || u > n) return null;
            return c > Math.PI && (c -= 2 * Math.PI), (a = Math.sin(
              u
            )), (h = Math.cos(u)), (r = a * a), (o =
              this.a / Math.sqrt(1 - this.es * r)), (e =
              (o + l) * h * Math.cos(c)), (i = (o + l) * h * Math.sin(c)), (s =
              (o * (1 - this.es) + l) * a), (t.x = e), (t.y = i), (t.z = s), f;
          },
          geocentric_to_geodetic: function(t) {
            var e,
              i,
              s,
              o,
              a,
              r,
              h,
              c,
              u,
              l,
              f,
              d,
              p,
              m,
              _,
              g,
              y,
              v = 1e-12,
              b = v * v,
              M = 30,
              w = t.x,
              x = t.y,
              L = t.z ? t.z : 0;
            if (
              (
                (p = !1),
                (e = Math.sqrt(w * w + x * x)),
                (i = Math.sqrt(w * w + x * x + L * L)),
                e / this.a < v
              )
            ) {
              if (((p = !0), (_ = 0), i / this.a < v))
                return (g = n), void (y = -this.b);
            } else _ = Math.atan2(x, w);
            (s = L / i), (o = e / i), (a =
              1 / Math.sqrt(1 - this.es * (2 - this.es) * o * o)), (c =
              o * (1 - this.es) * a), (u = s * a), (m = 0);
            do
              m++, (h = this.a / Math.sqrt(1 - this.es * u * u)), (y =
                e * c + L * u - h * (1 - this.es * u * u)), (r =
                this.es * h / (h + y)), (a =
                1 / Math.sqrt(1 - r * (2 - r) * o * o)), (l =
                o * (1 - r) * a), (f = s * a), (d =
                f * c - l * u), (c = l), (u = f);
            while (d * d > b && M > m);
            return (g = Math.atan(
              f / Math.abs(l)
            )), (t.x = _), (t.y = g), (t.z = y), t;
          },
          geocentric_to_geodetic_noniter: function(t) {
            var e,
              i,
              s,
              o,
              a,
              r,
              h,
              c,
              f,
              d,
              p,
              m,
              _,
              g,
              y,
              v,
              b,
              M = t.x,
              w = t.y,
              x = t.z ? t.z : 0;
            if (
              (
                (M = parseFloat(M)),
                (w = parseFloat(w)),
                (x = parseFloat(x)),
                (b = !1),
                0 !== M
              )
            )
              e = Math.atan2(w, M);
            else if (w > 0) e = n;
            else if (0 > w) e = -n;
            else if (((b = !0), (e = 0), x > 0)) i = n;
            else {
              if (!(0 > x)) return (i = n), void (s = -this.b);
              i = -n;
            }
            return (a = M * M + w * w), (o = Math.sqrt(a)), (r =
              x * u), (c = Math.sqrt(r * r + a)), (d = r / c), (m = o / c), (p =
              d * d * d), (h = x + this.b * this.ep2 * p), (v =
              o - this.a * this.es * m * m * m), (f = Math.sqrt(
              h * h + v * v
            )), (_ = h / f), (g = v / f), (y =
              this.a / Math.sqrt(1 - this.es * _ * _)), (s =
              g >= l
                ? o / g - y
                : -l >= g ? o / -g - y : x / _ + y * (this.es - 1)), b === !1 &&
              (i = Math.atan(_ / g)), (t.x = e), (t.y = i), (t.z = s), t;
          },
          geocentric_to_wgs84: function(t) {
            if (this.datum_type === s)
              (t.x += this.datum_params[0]), (t.y += this.datum_params[1]), (t.z += this.datum_params[2]);
            else if (this.datum_type === o) {
              var e = this.datum_params[0],
                i = this.datum_params[1],
                n = this.datum_params[2],
                a = this.datum_params[3],
                r = this.datum_params[4],
                h = this.datum_params[5],
                c = this.datum_params[6],
                u = c * (t.x - h * t.y + r * t.z) + e,
                l = c * (h * t.x + t.y - a * t.z) + i,
                f = c * (-r * t.x + a * t.y + t.z) + n;
              (t.x = u), (t.y = l), (t.z = f);
            }
          },
          geocentric_from_wgs84: function(t) {
            if (this.datum_type === s)
              (t.x -= this.datum_params[0]), (t.y -= this.datum_params[1]), (t.z -= this.datum_params[2]);
            else if (this.datum_type === o) {
              var e = this.datum_params[0],
                i = this.datum_params[1],
                n = this.datum_params[2],
                a = this.datum_params[3],
                r = this.datum_params[4],
                h = this.datum_params[5],
                c = this.datum_params[6],
                u = (t.x - e) / c,
                l = (t.y - i) / c,
                f = (t.z - n) / c;
              (t.x = u + h * l - r * f), (t.y = -h * u + l + a * f), (t.z =
                r * u - a * l + f);
            }
          }
        }), (e.exports = f);
      },
      {}
    ],
    78: [
      function(t, e, i) {
        var n = 1,
          s = 2,
          o = 3,
          a = 5,
          r = 6378137,
          h = 0.006694379990141316;
        e.exports = function(t, e, i) {
          function c(t) {
            return t === n || t === s;
          }
          var u, l, f;
          if (t.compare_datums(e)) return i;
          if (t.datum_type === a || e.datum_type === a) return i;
          var d = t.a,
            p = t.es,
            m = e.a,
            _ = e.es,
            g = t.datum_type;
          if (g === o)
            if (0 === this.apply_gridshift(t, 0, i)) (t.a = r), (t.es = h);
            else {
              if (!t.datum_params) return (t.a = d), (t.es = t.es), i;
              for (u = 1, l = 0, f = t.datum_params.length; f > l; l++)
                u *= t.datum_params[l];
              if (0 === u) return (t.a = d), (t.es = t.es), i;
              g = t.datum_params.length > 3 ? s : n;
            }
          return e.datum_type === o && ((e.a = r), (e.es = h)), (t.es !==
            e.es ||
            t.a !== e.a ||
            c(g) ||
            c(e.datum_type)) &&
            (
              t.geodetic_to_geocentric(i),
              c(t.datum_type) && t.geocentric_to_wgs84(i),
              c(e.datum_type) && e.geocentric_from_wgs84(i),
              e.geocentric_to_geodetic(i)
            ), e.datum_type === o &&
            this.apply_gridshift(
              e,
              1,
              i
            ), (t.a = d), (t.es = p), (e.a = m), (e.es = _), i;
        };
      },
      {}
    ],
    79: [
      function(t, e, i) {
        function n(t) {
          var e = this;
          if (2 === arguments.length) {
            var i = arguments[1];
            "string" == typeof i
              ? "+" === i.charAt(0)
                ? (n[t] = o(arguments[1]))
                : (n[t] = a(arguments[1]))
              : (n[t] = i);
          } else if (1 === arguments.length) {
            if (Array.isArray(t))
              return t.map(function(t) {
                Array.isArray(t) ? n.apply(e, t) : n(t);
              });
            if ("string" == typeof t) {
              if (t in n) return n[t];
            } else
              "EPSG" in t
                ? (n["EPSG:" + t.EPSG] = t)
                : "ESRI" in t
                  ? (n["ESRI:" + t.ESRI] = t)
                  : "IAU2000" in t
                    ? (n["IAU2000:" + t.IAU2000] = t)
                    : console.log(t);
            return;
          }
        }
        var s = t("./global"),
          o = t("./projString"),
          a = t("./wkt");
        s(n), (e.exports = n);
      },
      { "./global": 82, "./projString": 86, "./wkt": 114 }
    ],
    80: [
      function(t, e, i) {
        var n = t("./constants/Datum"),
          s = t("./constants/Ellipsoid"),
          o = t("./extend"),
          a = t("./datum"),
          r = 1e-10,
          h = 0.16666666666666666,
          c = 0.04722222222222222,
          u = 0.022156084656084655;
        e.exports = function(t) {
          if (t.datumCode && "none" !== t.datumCode) {
            var e = n[t.datumCode];
            e &&
              (
                (t.datum_params = e.towgs84 ? e.towgs84.split(",") : null),
                (t.ellps = e.ellipse),
                (t.datumName = e.datumName ? e.datumName : t.datumCode)
              );
          }
          if (!t.a) {
            var i = s[t.ellps] ? s[t.ellps] : s.WGS84;
            o(t, i);
          }
          return t.rf && !t.b && (t.b = (1 - 1 / t.rf) * t.a), (0 === t.rf ||
            Math.abs(t.a - t.b) < r) &&
            ((t.sphere = !0), (t.b = t.a)), (t.a2 = t.a * t.a), (t.b2 =
            t.b * t.b), (t.es = (t.a2 - t.b2) / t.a2), (t.e = Math.sqrt(
            t.es
          )), t.R_A &&
            (
              (t.a *= 1 - t.es * (h + t.es * (c + t.es * u))),
              (t.a2 = t.a * t.a),
              (t.b2 = t.b * t.b),
              (t.es = 0)
            ), (t.ep2 = (t.a2 - t.b2) / t.b2), t.k0 || (t.k0 = 1), t.axis ||
            (t.axis = "enu"), t.datum || (t.datum = a(t)), t;
        };
      },
      {
        "./constants/Datum": 72,
        "./constants/Ellipsoid": 73,
        "./datum": 77,
        "./extend": 81
      }
    ],
    81: [
      function(t, e, i) {
        e.exports = function(t, e) {
          t = t || {};
          var i, n;
          if (!e) return t;
          for (n in e) (i = e[n]), void 0 !== i && (t[n] = i);
          return t;
        };
      },
      {}
    ],
    82: [
      function(t, e, i) {
        e.exports = function(t) {
          t(
            "EPSG:4326",
            "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"
          ), t(
            "EPSG:4269",
            "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"
          ), t(
            "EPSG:3857",
            "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"
          ), (t.WGS84 = t["EPSG:4326"]), (t["EPSG:3785"] =
            t["EPSG:3857"]), (t.GOOGLE = t["EPSG:3857"]), (t["EPSG:900913"] =
            t["EPSG:3857"]), (t["EPSG:102113"] = t["EPSG:3857"]);
        };
      },
      {}
    ],
    83: [
      function(t, e, i) {
        var n = [
          t("./projections/tmerc"),
          t("./projections/utm"),
          t("./projections/sterea"),
          t("./projections/stere"),
          t("./projections/somerc"),
          t("./projections/omerc"),
          t("./projections/lcc"),
          t("./projections/krovak"),
          t("./projections/cass"),
          t("./projections/laea"),
          t("./projections/aea"),
          t("./projections/gnom"),
          t("./projections/cea"),
          t("./projections/eqc"),
          t("./projections/poly"),
          t("./projections/nzmg"),
          t("./projections/mill"),
          t("./projections/sinu"),
          t("./projections/moll"),
          t("./projections/eqdc"),
          t("./projections/vandg"),
          t("./projections/aeqd")
        ];
        e.exports = function(t) {
          n.forEach(function(e) {
            t.Proj.projections.add(e);
          });
        };
      },
      {
        "./projections/aea": 88,
        "./projections/aeqd": 89,
        "./projections/cass": 90,
        "./projections/cea": 91,
        "./projections/eqc": 92,
        "./projections/eqdc": 93,
        "./projections/gnom": 95,
        "./projections/krovak": 96,
        "./projections/laea": 97,
        "./projections/lcc": 98,
        "./projections/mill": 101,
        "./projections/moll": 102,
        "./projections/nzmg": 103,
        "./projections/omerc": 104,
        "./projections/poly": 105,
        "./projections/sinu": 106,
        "./projections/somerc": 107,
        "./projections/stere": 108,
        "./projections/sterea": 109,
        "./projections/tmerc": 110,
        "./projections/utm": 111,
        "./projections/vandg": 112
      }
    ],
    84: [
      function(t, e, i) {
        var n = t("./core");
        (n.defaultDatum = "WGS84"), (n.Proj = t(
          "./Proj"
        )), (n.WGS84 = new n.Proj("WGS84")), (n.Point = t(
          "./Point"
        )), (n.toPoint = t("./common/toPoint")), (n.defs = t(
          "./defs"
        )), (n.transform = t("./transform")), (n.mgrs = t(
          "mgrs"
        )), (n.version = t("../package.json").version), t(
          "./includedProjections"
        )(n), (e.exports = n);
      },
      {
        "../package.json": 116,
        "./Point": 48,
        "./Proj": 49,
        "./common/toPoint": 70,
        "./core": 76,
        "./defs": 79,
        "./includedProjections": 83,
        "./transform": 113,
        mgrs: 115
      }
    ],
    85: [
      function(t, e, i) {
        function n(t) {
          return "string" == typeof t;
        }
        function s(t) {
          return t in h;
        }
        function o(t) {
          var e = ["GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS"];
          return e.reduce(function(e, i) {
            return e + 1 + t.indexOf(i);
          }, 0);
        }
        function a(t) {
          return "+" === t[0];
        }
        function r(t) {
          return n(t) ? (s(t) ? h[t] : o(t) ? c(t) : a(t) ? u(t) : void 0) : t;
        }
        var h = t("./defs"),
          c = t("./wkt"),
          u = t("./projString");
        e.exports = r;
      },
      { "./defs": 79, "./projString": 86, "./wkt": 114 }
    ],
    86: [
      function(t, e, i) {
        var n = 0.017453292519943295,
          s = t("./constants/PrimeMeridian"),
          o = t("./constants/units");
        e.exports = function(t) {
          var e = {},
            i = {};
          t
            .split("+")
            .map(function(t) {
              return t.trim();
            })
            .filter(function(t) {
              return t;
            })
            .forEach(function(t) {
              var e = t.split("=");
              e.push(!0), (i[e[0].toLowerCase()] = e[1]);
            });
          var a,
            r,
            h,
            c = {
              proj: "projName",
              datum: "datumCode",
              rf: function(t) {
                e.rf = parseFloat(t);
              },
              lat_0: function(t) {
                e.lat0 = t * n;
              },
              lat_1: function(t) {
                e.lat1 = t * n;
              },
              lat_2: function(t) {
                e.lat2 = t * n;
              },
              lat_ts: function(t) {
                e.lat_ts = t * n;
              },
              lon_0: function(t) {
                e.long0 = t * n;
              },
              lon_1: function(t) {
                e.long1 = t * n;
              },
              lon_2: function(t) {
                e.long2 = t * n;
              },
              alpha: function(t) {
                e.alpha = parseFloat(t) * n;
              },
              lonc: function(t) {
                e.longc = t * n;
              },
              x_0: function(t) {
                e.x0 = parseFloat(t);
              },
              y_0: function(t) {
                e.y0 = parseFloat(t);
              },
              k_0: function(t) {
                e.k0 = parseFloat(t);
              },
              k: function(t) {
                e.k0 = parseFloat(t);
              },
              a: function(t) {
                e.a = parseFloat(t);
              },
              b: function(t) {
                e.b = parseFloat(t);
              },
              r_a: function() {
                e.R_A = !0;
              },
              zone: function(t) {
                e.zone = parseInt(t, 10);
              },
              south: function() {
                e.utmSouth = !0;
              },
              towgs84: function(t) {
                e.datum_params = t.split(",").map(function(t) {
                  return parseFloat(t);
                });
              },
              to_meter: function(t) {
                e.to_meter = parseFloat(t);
              },
              units: function(t) {
                (e.units = t), o[t] && (e.to_meter = o[t].to_meter);
              },
              from_greenwich: function(t) {
                e.from_greenwich = t * n;
              },
              pm: function(t) {
                e.from_greenwich = (s[t] ? s[t] : parseFloat(t)) * n;
              },
              nadgrids: function(t) {
                "@null" === t ? (e.datumCode = "none") : (e.nadgrids = t);
              },
              axis: function(t) {
                var i = "ewnsud";
                3 === t.length &&
                  -1 !== i.indexOf(t.substr(0, 1)) &&
                  -1 !== i.indexOf(t.substr(1, 1)) &&
                  -1 !== i.indexOf(t.substr(2, 1)) &&
                  (e.axis = t);
              }
            };
          for (a in i)
            (r = i[a]), a in c
              ? ((h = c[a]), "function" == typeof h ? h(r) : (e[h] = r))
              : (e[a] = r);
          return "string" == typeof e.datumCode &&
            "WGS84" !== e.datumCode &&
            (e.datumCode = e.datumCode.toLowerCase()), e;
        };
      },
      { "./constants/PrimeMeridian": 74, "./constants/units": 75 }
    ],
    87: [
      function(t, e, i) {
        function n(t, e) {
          var i = a.length;
          return t.names
            ? (
                (a[i] = t),
                t.names.forEach(function(t) {
                  o[t.toLowerCase()] = i;
                }),
                this
              )
            : (console.log(e), !0);
        }
        var s = [t("./projections/merc"), t("./projections/longlat")],
          o = {},
          a = [];
        (i.add = n), (i.get = function(t) {
          if (!t) return !1;
          var e = t.toLowerCase();
          return "undefined" != typeof o[e] && a[o[e]] ? a[o[e]] : void 0;
        }), (i.start = function() {
          s.forEach(n);
        });
      },
      { "./projections/longlat": 99, "./projections/merc": 100 }
    ],
    88: [
      function(t, e, i) {
        var n = 1e-10,
          s = t("../common/msfnz"),
          o = t("../common/qsfnz"),
          a = t("../common/adjust_lon"),
          r = t("../common/asinz");
        (i.init = function() {
          Math.abs(this.lat1 + this.lat2) < n ||
            (
              (this.temp = this.b / this.a),
              (this.es = 1 - Math.pow(this.temp, 2)),
              (this.e3 = Math.sqrt(this.es)),
              (this.sin_po = Math.sin(this.lat1)),
              (this.cos_po = Math.cos(this.lat1)),
              (this.t1 = this.sin_po),
              (this.con = this.sin_po),
              (this.ms1 = s(this.e3, this.sin_po, this.cos_po)),
              (this.qs1 = o(this.e3, this.sin_po, this.cos_po)),
              (this.sin_po = Math.sin(this.lat2)),
              (this.cos_po = Math.cos(this.lat2)),
              (this.t2 = this.sin_po),
              (this.ms2 = s(this.e3, this.sin_po, this.cos_po)),
              (this.qs2 = o(this.e3, this.sin_po, this.cos_po)),
              (this.sin_po = Math.sin(this.lat0)),
              (this.cos_po = Math.cos(this.lat0)),
              (this.t3 = this.sin_po),
              (this.qs0 = o(this.e3, this.sin_po, this.cos_po)),
              Math.abs(this.lat1 - this.lat2) > n
                ? (this.ns0 =
                    (this.ms1 * this.ms1 - this.ms2 * this.ms2) /
                    (this.qs2 - this.qs1))
                : (this.ns0 = this.con),
              (this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1),
              (this.rh =
                this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0)
            );
        }), (i.forward = function(t) {
          var e = t.x,
            i = t.y;
          (this.sin_phi = Math.sin(i)), (this.cos_phi = Math.cos(i));
          var n = o(this.e3, this.sin_phi, this.cos_phi),
            s = this.a * Math.sqrt(this.c - this.ns0 * n) / this.ns0,
            r = this.ns0 * a(e - this.long0),
            h = s * Math.sin(r) + this.x0,
            c = this.rh - s * Math.cos(r) + this.y0;
          return (t.x = h), (t.y = c), t;
        }), (i.inverse = function(t) {
          var e, i, n, s, o, r;
          return (t.x -= this.x0), (t.y = this.rh - t.y + this.y0), this.ns0 >=
          0
            ? ((e = Math.sqrt(t.x * t.x + t.y * t.y)), (n = 1))
            : (
                (e = -Math.sqrt(t.x * t.x + t.y * t.y)),
                (n = -1)
              ), (s = 0), 0 !== e && (s = Math.atan2(n * t.x, n * t.y)), (n =
            e * this.ns0 / this.a), this.sphere
            ? (r = Math.asin((this.c - n * n) / (2 * this.ns0)))
            : (
                (i = (this.c - n * n) / this.ns0),
                (r = this.phi1z(this.e3, i))
              ), (o = a(s / this.ns0 + this.long0)), (t.x = o), (t.y = r), t;
        }), (i.phi1z = function(t, e) {
          var i,
            s,
            o,
            a,
            h,
            c = r(0.5 * e);
          if (n > t) return c;
          for (var u = t * t, l = 1; 25 >= l; l++)
            if (
              (
                (i = Math.sin(c)),
                (s = Math.cos(c)),
                (o = t * i),
                (a = 1 - o * o),
                (h =
                  0.5 *
                  a *
                  a /
                  s *
                  (e / (1 - u) -
                    i / a +
                    0.5 / t * Math.log((1 - o) / (1 + o)))),
                (c += h),
                Math.abs(h) <= 1e-7
              )
            )
              return c;
          return null;
        }), (i.names = ["Albers_Conic_Equal_Area", "Albers", "aea"]);
      },
      {
        "../common/adjust_lon": 52,
        "../common/asinz": 53,
        "../common/msfnz": 62,
        "../common/qsfnz": 67
      }
    ],
    89: [
      function(t, e, i) {
        var n = t("../common/adjust_lon"),
          s = Math.PI / 2,
          o = 1e-10,
          a = t("../common/mlfn"),
          r = t("../common/e0fn"),
          h = t("../common/e1fn"),
          c = t("../common/e2fn"),
          u = t("../common/e3fn"),
          l = t("../common/gN"),
          f = t("../common/asinz"),
          d = t("../common/imlfn");
        (i.init = function() {
          (this.sin_p12 = Math.sin(this.lat0)), (this.cos_p12 = Math.cos(
            this.lat0
          ));
        }), (i.forward = function(t) {
          var e,
            i,
            f,
            d,
            p,
            m,
            _,
            g,
            y,
            v,
            b,
            M,
            w,
            x,
            L,
            E,
            P,
            C,
            A,
            S,
            T,
            I,
            D,
            k = t.x,
            U = t.y,
            B = Math.sin(t.y),
            N = Math.cos(t.y),
            O = n(k - this.long0);
          return this.sphere
            ? Math.abs(this.sin_p12 - 1) <= o
              ? (
                  (t.x = this.x0 + this.a * (s - U) * Math.sin(O)),
                  (t.y = this.y0 - this.a * (s - U) * Math.cos(O)),
                  t
                )
              : Math.abs(this.sin_p12 + 1) <= o
                ? (
                    (t.x = this.x0 + this.a * (s + U) * Math.sin(O)),
                    (t.y = this.y0 + this.a * (s + U) * Math.cos(O)),
                    t
                  )
                : (
                    (C = this.sin_p12 * B + this.cos_p12 * N * Math.cos(O)),
                    (E = Math.acos(C)),
                    (P = E / Math.sin(E)),
                    (t.x = this.x0 + this.a * P * N * Math.sin(O)),
                    (t.y =
                      this.y0 +
                      this.a *
                        P *
                        (this.cos_p12 * B - this.sin_p12 * N * Math.cos(O))),
                    t
                  )
            : (
                (e = r(this.es)),
                (i = h(this.es)),
                (f = c(this.es)),
                (d = u(this.es)),
                Math.abs(this.sin_p12 - 1) <= o
                  ? (
                      (p = this.a * a(e, i, f, d, s)),
                      (m = this.a * a(e, i, f, d, U)),
                      (t.x = this.x0 + (p - m) * Math.sin(O)),
                      (t.y = this.y0 - (p - m) * Math.cos(O)),
                      t
                    )
                  : Math.abs(this.sin_p12 + 1) <= o
                    ? (
                        (p = this.a * a(e, i, f, d, s)),
                        (m = this.a * a(e, i, f, d, U)),
                        (t.x = this.x0 + (p + m) * Math.sin(O)),
                        (t.y = this.y0 + (p + m) * Math.cos(O)),
                        t
                      )
                    : (
                        (_ = B / N),
                        (g = l(this.a, this.e, this.sin_p12)),
                        (y = l(this.a, this.e, B)),
                        (v = Math.atan(
                          (1 - this.es) * _ +
                            this.es * g * this.sin_p12 / (y * N)
                        )),
                        (b = Math.atan2(
                          Math.sin(O),
                          this.cos_p12 * Math.tan(v) -
                            this.sin_p12 * Math.cos(O)
                        )),
                        (A =
                          0 === b
                            ? Math.asin(
                                this.cos_p12 * Math.sin(v) -
                                  this.sin_p12 * Math.cos(v)
                              )
                            : Math.abs(Math.abs(b) - Math.PI) <= o
                              ? -Math.asin(
                                  this.cos_p12 * Math.sin(v) -
                                    this.sin_p12 * Math.cos(v)
                                )
                              : Math.asin(
                                  Math.sin(O) * Math.cos(v) / Math.sin(b)
                                )),
                        (M = this.e * this.sin_p12 / Math.sqrt(1 - this.es)),
                        (w =
                          this.e *
                          this.cos_p12 *
                          Math.cos(b) /
                          Math.sqrt(1 - this.es)),
                        (x = M * w),
                        (L = w * w),
                        (S = A * A),
                        (T = S * A),
                        (I = T * A),
                        (D = I * A),
                        (E =
                          g *
                          A *
                          (1 -
                            S * L * (1 - L) / 6 +
                            T / 8 * x * (1 - 2 * L) +
                            I /
                              120 *
                              (L * (4 - 7 * L) - 3 * M * M * (1 - 7 * L)) -
                            D / 48 * x)),
                        (t.x = this.x0 + E * Math.sin(b)),
                        (t.y = this.y0 + E * Math.cos(b)),
                        t
                      )
              );
        }), (i.inverse = function(t) {
          (t.x -= this.x0), (t.y -= this.y0);
          var e,
            i,
            p,
            m,
            _,
            g,
            y,
            v,
            b,
            M,
            w,
            x,
            L,
            E,
            P,
            C,
            A,
            S,
            T,
            I,
            D,
            k,
            U;
          if (this.sphere) {
            if (((e = Math.sqrt(t.x * t.x + t.y * t.y)), e > 2 * s * this.a))
              return;
            return (i = e / this.a), (p = Math.sin(i)), (m = Math.cos(
              i
            )), (_ = this.long0), Math.abs(e) <= o
              ? (g = this.lat0)
              : (
                  (g = f(m * this.sin_p12 + t.y * p * this.cos_p12 / e)),
                  (y = Math.abs(this.lat0) - s),
                  (_ = n(
                    Math.abs(y) <= o
                      ? this.lat0 >= 0
                        ? this.long0 + Math.atan2(t.x, -t.y)
                        : this.long0 - Math.atan2(-t.x, t.y)
                      : this.long0 +
                        Math.atan2(
                          t.x * p,
                          e * this.cos_p12 * m - t.y * this.sin_p12 * p
                        )
                  ))
                ), (t.x = _), (t.y = g), t;
          }
          return (v = r(this.es)), (b = h(this.es)), (M = c(this.es)), (w = u(
            this.es
          )), Math.abs(this.sin_p12 - 1) <= o
            ? (
                (x = this.a * a(v, b, M, w, s)),
                (e = Math.sqrt(t.x * t.x + t.y * t.y)),
                (L = x - e),
                (g = d(L / this.a, v, b, M, w)),
                (_ = n(this.long0 + Math.atan2(t.x, -1 * t.y))),
                (t.x = _),
                (t.y = g),
                t
              )
            : Math.abs(this.sin_p12 + 1) <= o
              ? (
                  (x = this.a * a(v, b, M, w, s)),
                  (e = Math.sqrt(t.x * t.x + t.y * t.y)),
                  (L = e - x),
                  (g = d(L / this.a, v, b, M, w)),
                  (_ = n(this.long0 + Math.atan2(t.x, t.y))),
                  (t.x = _),
                  (t.y = g),
                  t
                )
              : (
                  (e = Math.sqrt(t.x * t.x + t.y * t.y)),
                  (C = Math.atan2(t.x, t.y)),
                  (E = l(this.a, this.e, this.sin_p12)),
                  (A = Math.cos(C)),
                  (S = this.e * this.cos_p12 * A),
                  (T = -S * S / (1 - this.es)),
                  (I =
                    3 *
                    this.es *
                    (1 - T) *
                    this.sin_p12 *
                    this.cos_p12 *
                    A /
                    (1 - this.es)),
                  (D = e / E),
                  (k =
                    D -
                    T * (1 + T) * Math.pow(D, 3) / 6 -
                    I * (1 + 3 * T) * Math.pow(D, 4) / 24),
                  (U = 1 - T * k * k / 2 - D * k * k * k / 6),
                  (P = Math.asin(
                    this.sin_p12 * Math.cos(k) + this.cos_p12 * Math.sin(k) * A
                  )),
                  (_ = n(
                    this.long0 +
                      Math.asin(Math.sin(C) * Math.sin(k) / Math.cos(P))
                  )),
                  (g = Math.atan(
                    (1 - this.es * U * this.sin_p12 / Math.sin(P)) *
                      Math.tan(P) /
                      (1 - this.es)
                  )),
                  (t.x = _),
                  (t.y = g),
                  t
                );
        }), (i.names = ["Azimuthal_Equidistant", "aeqd"]);
      },
      {
        "../common/adjust_lon": 52,
        "../common/asinz": 53,
        "../common/e0fn": 54,
        "../common/e1fn": 55,
        "../common/e2fn": 56,
        "../common/e3fn": 57,
        "../common/gN": 58,
        "../common/imlfn": 59,
        "../common/mlfn": 61
      }
    ],
    90: [
      function(t, e, i) {
        var n = t("../common/mlfn"),
          s = t("../common/e0fn"),
          o = t("../common/e1fn"),
          a = t("../common/e2fn"),
          r = t("../common/e3fn"),
          h = t("../common/gN"),
          c = t("../common/adjust_lon"),
          u = t("../common/adjust_lat"),
          l = t("../common/imlfn"),
          f = Math.PI / 2,
          d = 1e-10;
        (i.init = function() {
          this.sphere ||
            (
              (this.e0 = s(this.es)),
              (this.e1 = o(this.es)),
              (this.e2 = a(this.es)),
              (this.e3 = r(this.es)),
              (this.ml0 =
                this.a * n(this.e0, this.e1, this.e2, this.e3, this.lat0))
            );
        }), (i.forward = function(t) {
          var e,
            i,
            s = t.x,
            o = t.y;
          if (((s = c(s - this.long0)), this.sphere))
            (e = this.a * Math.asin(Math.cos(o) * Math.sin(s))), (i =
              this.a * (Math.atan2(Math.tan(o), Math.cos(s)) - this.lat0));
          else {
            var a = Math.sin(o),
              r = Math.cos(o),
              u = h(this.a, this.e, a),
              l = Math.tan(o) * Math.tan(o),
              f = s * Math.cos(o),
              d = f * f,
              p = this.es * r * r / (1 - this.es),
              m = this.a * n(this.e0, this.e1, this.e2, this.e3, o);
            (e =
              u * f * (1 - d * l * (1 / 6 - (8 - l + 8 * p) * d / 120))), (i =
              m - this.ml0 + u * a / r * d * (0.5 + (5 - l + 6 * p) * d / 24));
          }
          return (t.x = e + this.x0), (t.y = i + this.y0), t;
        }), (i.inverse = function(t) {
          (t.x -= this.x0), (t.y -= this.y0);
          var e,
            i,
            n = t.x / this.a,
            s = t.y / this.a;
          if (this.sphere) {
            var o = s + this.lat0;
            (e = Math.asin(Math.sin(o) * Math.cos(n))), (i = Math.atan2(
              Math.tan(n),
              Math.cos(o)
            ));
          } else {
            var a = this.ml0 / this.a + s,
              r = l(a, this.e0, this.e1, this.e2, this.e3);
            if (Math.abs(Math.abs(r) - f) <= d)
              return (t.x = this.long0), (t.y = f), 0 > s && (t.y *= -1), t;
            var p = h(this.a, this.e, Math.sin(r)),
              m = p * p * p / this.a / this.a * (1 - this.es),
              _ = Math.pow(Math.tan(r), 2),
              g = n * this.a / p,
              y = g * g;
            (e =
              r -
              p *
                Math.tan(r) /
                m *
                g *
                g *
                (0.5 - (1 + 3 * _) * g * g / 24)), (i =
              g * (1 - y * (_ / 3 + (1 + 3 * _) * _ * y / 15)) / Math.cos(r));
          }
          return (t.x = c(i + this.long0)), (t.y = u(e)), t;
        }), (i.names = ["Cassini", "Cassini_Soldner", "cass"]);
      },
      {
        "../common/adjust_lat": 51,
        "../common/adjust_lon": 52,
        "../common/e0fn": 54,
        "../common/e1fn": 55,
        "../common/e2fn": 56,
        "../common/e3fn": 57,
        "../common/gN": 58,
        "../common/imlfn": 59,
        "../common/mlfn": 61
      }
    ],
    91: [
      function(t, e, i) {
        var n = t("../common/adjust_lon"),
          s = t("../common/qsfnz"),
          o = t("../common/msfnz"),
          a = t("../common/iqsfnz");
        (i.init = function() {
          this.sphere ||
            (this.k0 = o(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)));
        }), (i.forward = function(t) {
          var e,
            i,
            o = t.x,
            a = t.y,
            r = n(o - this.long0);
          if (this.sphere)
            (e = this.x0 + this.a * r * Math.cos(this.lat_ts)), (i =
              this.y0 + this.a * Math.sin(a) / Math.cos(this.lat_ts));
          else {
            var h = s(this.e, Math.sin(a));
            (e = this.x0 + this.a * this.k0 * r), (i =
              this.y0 + this.a * h * 0.5 / this.k0);
          }
          return (t.x = e), (t.y = i), t;
        }), (i.inverse = function(t) {
          (t.x -= this.x0), (t.y -= this.y0);
          var e, i;
          return this.sphere
            ? (
                (e = n(this.long0 + t.x / this.a / Math.cos(this.lat_ts))),
                (i = Math.asin(t.y / this.a * Math.cos(this.lat_ts)))
              )
            : (
                (i = a(this.e, 2 * t.y * this.k0 / this.a)),
                (e = n(this.long0 + t.x / (this.a * this.k0)))
              ), (t.x = e), (t.y = i), t;
        }), (i.names = ["cea"]);
      },
      {
        "../common/adjust_lon": 52,
        "../common/iqsfnz": 60,
        "../common/msfnz": 62,
        "../common/qsfnz": 67
      }
    ],
    92: [
      function(t, e, i) {
        var n = t("../common/adjust_lon"),
          s = t("../common/adjust_lat");
        (i.init = function() {
          (this.x0 = this.x0 || 0), (this.y0 = this.y0 || 0), (this.lat0 =
            this.lat0 || 0), (this.long0 = this.long0 || 0), (this.lat_ts =
            this.lat_ts || 0), (this.title =
            this.title ||
            "Equidistant Cylindrical (Plate Carre)"), (this.rc = Math.cos(
            this.lat_ts
          ));
        }), (i.forward = function(t) {
          var e = t.x,
            i = t.y,
            o = n(e - this.long0),
            a = s(i - this.lat0);
          return (t.x = this.x0 + this.a * o * this.rc), (t.y =
            this.y0 + this.a * a), t;
        }), (i.inverse = function(t) {
          var e = t.x,
            i = t.y;
          return (t.x = n(
            this.long0 + (e - this.x0) / (this.a * this.rc)
          )), (t.y = s(this.lat0 + (i - this.y0) / this.a)), t;
        }), (i.names = ["Equirectangular", "Equidistant_Cylindrical", "eqc"]);
      },
      { "../common/adjust_lat": 51, "../common/adjust_lon": 52 }
    ],
    93: [
      function(t, e, i) {
        var n = t("../common/e0fn"),
          s = t("../common/e1fn"),
          o = t("../common/e2fn"),
          a = t("../common/e3fn"),
          r = t("../common/msfnz"),
          h = t("../common/mlfn"),
          c = t("../common/adjust_lon"),
          u = t("../common/adjust_lat"),
          l = t("../common/imlfn"),
          f = 1e-10;
        (i.init = function() {
          Math.abs(this.lat1 + this.lat2) < f ||
            (
              (this.lat2 = this.lat2 || this.lat1),
              (this.temp = this.b / this.a),
              (this.es = 1 - Math.pow(this.temp, 2)),
              (this.e = Math.sqrt(this.es)),
              (this.e0 = n(this.es)),
              (this.e1 = s(this.es)),
              (this.e2 = o(this.es)),
              (this.e3 = a(this.es)),
              (this.sinphi = Math.sin(this.lat1)),
              (this.cosphi = Math.cos(this.lat1)),
              (this.ms1 = r(this.e, this.sinphi, this.cosphi)),
              (this.ml1 = h(this.e0, this.e1, this.e2, this.e3, this.lat1)),
              Math.abs(this.lat1 - this.lat2) < f
                ? (this.ns = this.sinphi)
                : (
                    (this.sinphi = Math.sin(this.lat2)),
                    (this.cosphi = Math.cos(this.lat2)),
                    (this.ms2 = r(this.e, this.sinphi, this.cosphi)),
                    (this.ml2 = h(
                      this.e0,
                      this.e1,
                      this.e2,
                      this.e3,
                      this.lat2
                    )),
                    (this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1))
                  ),
              (this.g = this.ml1 + this.ms1 / this.ns),
              (this.ml0 = h(this.e0, this.e1, this.e2, this.e3, this.lat0)),
              (this.rh = this.a * (this.g - this.ml0))
            );
        }), (i.forward = function(t) {
          var e,
            i = t.x,
            n = t.y;
          if (this.sphere) e = this.a * (this.g - n);
          else {
            var s = h(this.e0, this.e1, this.e2, this.e3, n);
            e = this.a * (this.g - s);
          }
          var o = this.ns * c(i - this.long0),
            a = this.x0 + e * Math.sin(o),
            r = this.y0 + this.rh - e * Math.cos(o);
          return (t.x = a), (t.y = r), t;
        }), (i.inverse = function(t) {
          (t.x -= this.x0), (t.y = this.rh - t.y + this.y0);
          var e, i, n, s;
          this.ns >= 0
            ? ((i = Math.sqrt(t.x * t.x + t.y * t.y)), (e = 1))
            : ((i = -Math.sqrt(t.x * t.x + t.y * t.y)), (e = -1));
          var o = 0;
          if ((0 !== i && (o = Math.atan2(e * t.x, e * t.y)), this.sphere))
            return (s = c(this.long0 + o / this.ns)), (n = u(
              this.g - i / this.a
            )), (t.x = s), (t.y = n), t;
          var a = this.g - i / this.a;
          return (n = l(a, this.e0, this.e1, this.e2, this.e3)), (s = c(
            this.long0 + o / this.ns
          )), (t.x = s), (t.y = n), t;
        }), (i.names = ["Equidistant_Conic", "eqdc"]);
      },
      {
        "../common/adjust_lat": 51,
        "../common/adjust_lon": 52,
        "../common/e0fn": 54,
        "../common/e1fn": 55,
        "../common/e2fn": 56,
        "../common/e3fn": 57,
        "../common/imlfn": 59,
        "../common/mlfn": 61,
        "../common/msfnz": 62
      }
    ],
    94: [
      function(t, e, i) {
        var n = Math.PI / 4,
          s = t("../common/srat"),
          o = Math.PI / 2,
          a = 20;
        (i.init = function() {
          var t = Math.sin(this.lat0),
            e = Math.cos(this.lat0);
          (e *= e), (this.rc =
            Math.sqrt(1 - this.es) /
            (1 - this.es * t * t)), (this.C = Math.sqrt(
            1 + this.es * e * e / (1 - this.es)
          )), (this.phic0 = Math.asin(t / this.C)), (this.ratexp =
            0.5 * this.C * this.e), (this.K =
            Math.tan(0.5 * this.phic0 + n) /
            (Math.pow(Math.tan(0.5 * this.lat0 + n), this.C) *
              s(this.e * t, this.ratexp)));
        }), (i.forward = function(t) {
          var e = t.x,
            i = t.y;
          return (t.y =
            2 *
              Math.atan(
                this.K *
                  Math.pow(Math.tan(0.5 * i + n), this.C) *
                  s(this.e * Math.sin(i), this.ratexp)
              ) -
            o), (t.x = this.C * e), t;
        }), (i.inverse = function(t) {
          for (
            var e = 1e-14,
              i = t.x / this.C,
              r = t.y,
              h = Math.pow(Math.tan(0.5 * r + n) / this.K, 1 / this.C),
              c = a;
            c > 0 &&
            (
              (r =
                2 * Math.atan(h * s(this.e * Math.sin(t.y), -0.5 * this.e)) -
                o),
              !(Math.abs(r - t.y) < e)
            );
            --c
          )
            t.y = r;
          return c ? ((t.x = i), (t.y = r), t) : null;
        }), (i.names = ["gauss"]);
      },
      { "../common/srat": 69 }
    ],
    95: [
      function(t, e, i) {
        var n = t("../common/adjust_lon"),
          s = 1e-10,
          o = t("../common/asinz");
        (i.init = function() {
          (this.sin_p14 = Math.sin(this.lat0)), (this.cos_p14 = Math.cos(
            this.lat0
          )), (this.infinity_dist = 1e3 * this.a), (this.rc = 1);
        }), (i.forward = function(t) {
          var e,
            i,
            o,
            a,
            r,
            h,
            c,
            u,
            l = t.x,
            f = t.y;
          return (o = n(l - this.long0)), (e = Math.sin(f)), (i = Math.cos(
            f
          )), (a = Math.cos(o)), (h =
            this.sin_p14 * e + this.cos_p14 * i * a), (r = 1), h > 0 ||
          Math.abs(h) <= s
            ? (
                (c = this.x0 + this.a * r * i * Math.sin(o) / h),
                (u =
                  this.y0 +
                  this.a * r * (this.cos_p14 * e - this.sin_p14 * i * a) / h)
              )
            : (
                (c = this.x0 + this.infinity_dist * i * Math.sin(o)),
                (u =
                  this.y0 +
                  this.infinity_dist *
                    (this.cos_p14 * e - this.sin_p14 * i * a))
              ), (t.x = c), (t.y = u), t;
        }), (i.inverse = function(t) {
          var e, i, s, a, r, h;
          return (t.x = (t.x - this.x0) / this.a), (t.y =
            (t.y - this.y0) /
            this.a), (t.x /= this.k0), (t.y /= this.k0), (e = Math.sqrt(
            t.x * t.x + t.y * t.y
          ))
            ? (
                (a = Math.atan2(e, this.rc)),
                (i = Math.sin(a)),
                (s = Math.cos(a)),
                (h = o(s * this.sin_p14 + t.y * i * this.cos_p14 / e)),
                (r = Math.atan2(
                  t.x * i,
                  e * this.cos_p14 * s - t.y * this.sin_p14 * i
                )),
                (r = n(this.long0 + r))
              )
            : ((h = this.phic0), (r = 0)), (t.x = r), (t.y = h), t;
        }), (i.names = ["gnom"]);
      },
      { "../common/adjust_lon": 52, "../common/asinz": 53 }
    ],
    96: [
      function(t, e, i) {
        var n = t("../common/adjust_lon");
        (i.init = function() {
          (this.a = 6377397.155), (this.es = 0.006674372230614), (this.e = Math.sqrt(
            this.es
          )), this.lat0 || (this.lat0 = 0.863937979737193), this.long0 ||
            (this.long0 = 0.4334234309119251), this.k0 ||
            (this.k0 = 0.9999), (this.s45 = 0.785398163397448), (this.s90 =
            2 *
            this
              .s45), (this.fi0 = this.lat0), (this.e2 = this.es), (this.e = Math.sqrt(
            this.e2
          )), (this.alfa = Math.sqrt(
            1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2)
          )), (this.uq = 1.04216856380474), (this.u0 = Math.asin(
            Math.sin(this.fi0) / this.alfa
          )), (this.g = Math.pow(
            (1 + this.e * Math.sin(this.fi0)) /
              (1 - this.e * Math.sin(this.fi0)),
            this.alfa * this.e / 2
          )), (this.k =
            Math.tan(this.u0 / 2 + this.s45) /
            Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) *
            this.g), (this.k1 = this.k0), (this.n0 =
            this.a *
            Math.sqrt(1 - this.e2) /
            (1 -
              this.e2 *
                Math.pow(
                  Math.sin(this.fi0),
                  2
                ))), (this.s0 = 1.37008346281555), (this.n = Math.sin(
            this.s0
          )), (this.ro0 = this.k1 * this.n0 / Math.tan(this.s0)), (this.ad =
            this.s90 - this.uq);
        }), (i.forward = function(t) {
          var e,
            i,
            s,
            o,
            a,
            r,
            h,
            c = t.x,
            u = t.y,
            l = n(c - this.long0);
          return (e = Math.pow(
            (1 + this.e * Math.sin(u)) / (1 - this.e * Math.sin(u)),
            this.alfa * this.e / 2
          )), (i =
            2 *
            (Math.atan(
              this.k * Math.pow(Math.tan(u / 2 + this.s45), this.alfa) / e
            ) -
              this.s45)), (s = -l * this.alfa), (o = Math.asin(
            Math.cos(this.ad) * Math.sin(i) +
              Math.sin(this.ad) * Math.cos(i) * Math.cos(s)
          )), (a = Math.asin(Math.cos(i) * Math.sin(s) / Math.cos(o))), (r =
            this.n * a), (h =
            this.ro0 *
            Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) /
            Math.pow(Math.tan(o / 2 + this.s45), this.n)), (t.y =
            h * Math.cos(r) / 1), (t.x = h * Math.sin(r) / 1), this.czech ||
            ((t.y *= -1), (t.x *= -1)), t;
        }), (i.inverse = function(t) {
          var e,
            i,
            n,
            s,
            o,
            a,
            r,
            h,
            c = t.x;
          (t.x = t.y), (t.y = c), this.czech ||
            ((t.y *= -1), (t.x *= -1)), (a = Math.sqrt(
            t.x * t.x + t.y * t.y
          )), (o = Math.atan2(t.y, t.x)), (s = o / Math.sin(this.s0)), (n =
            2 *
            (Math.atan(
              Math.pow(this.ro0 / a, 1 / this.n) *
                Math.tan(this.s0 / 2 + this.s45)
            ) -
              this.s45)), (e = Math.asin(
            Math.cos(this.ad) * Math.sin(n) -
              Math.sin(this.ad) * Math.cos(n) * Math.cos(s)
          )), (i = Math.asin(Math.cos(n) * Math.sin(s) / Math.cos(e))), (t.x =
            this.long0 - i / this.alfa), (r = e), (h = 0);
          var u = 0;
          do
            (t.y =
              2 *
              (Math.atan(
                Math.pow(this.k, -1 / this.alfa) *
                  Math.pow(Math.tan(e / 2 + this.s45), 1 / this.alfa) *
                  Math.pow(
                    (1 + this.e * Math.sin(r)) / (1 - this.e * Math.sin(r)),
                    this.e / 2
                  )
              ) -
                this.s45)), Math.abs(r - t.y) < 1e-10 && (h = 1), (r =
              t.y), (u += 1);
          while (0 === h && 15 > u);
          return u >= 15 ? null : t;
        }), (i.names = ["Krovak", "krovak"]);
      },
      { "../common/adjust_lon": 52 }
    ],
    97: [
      function(t, e, i) {
        var n = Math.PI / 2,
          s = Math.PI / 4,
          o = 1e-10,
          a = t("../common/qsfnz"),
          r = t("../common/adjust_lon");
        (i.S_POLE = 1), (i.N_POLE = 2), (i.EQUIT = 3), (i.OBLIQ = 4), (i.init = function() {
          var t = Math.abs(this.lat0);
          if (
            (
              Math.abs(t - n) < o
                ? (this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE)
                : Math.abs(t) < o
                  ? (this.mode = this.EQUIT)
                  : (this.mode = this.OBLIQ),
              this.es > 0
            )
          ) {
            var e;
            switch ((
              (this.qp = a(this.e, 1)),
              (this.mmf = 0.5 / (1 - this.es)),
              (this.apa = this.authset(this.es)),
              this.mode
            )) {
              case this.N_POLE:
                this.dd = 1;
                break;
              case this.S_POLE:
                this.dd = 1;
                break;
              case this.EQUIT:
                (this.rq = Math.sqrt(0.5 * this.qp)), (this.dd =
                  1 / this.rq), (this.xmf = 1), (this.ymf = 0.5 * this.qp);
                break;
              case this.OBLIQ:
                (this.rq = Math.sqrt(0.5 * this.qp)), (e = Math.sin(
                  this.lat0
                )), (this.sinb1 =
                  a(this.e, e) / this.qp), (this.cosb1 = Math.sqrt(
                  1 - this.sinb1 * this.sinb1
                )), (this.dd =
                  Math.cos(this.lat0) /
                  (Math.sqrt(1 - this.es * e * e) *
                    this.rq *
                    this.cosb1)), (this.ymf =
                  (this.xmf = this.rq) / this.dd), (this.xmf *= this.dd);
            }
          } else
            this.mode === this.OBLIQ &&
              (
                (this.sinph0 = Math.sin(this.lat0)),
                (this.cosph0 = Math.cos(this.lat0))
              );
        }), (i.forward = function(t) {
          var e,
            i,
            h,
            c,
            u,
            l,
            f,
            d,
            p,
            m,
            _ = t.x,
            g = t.y;
          if (((_ = r(_ - this.long0)), this.sphere)) {
            if (
              (
                (u = Math.sin(g)),
                (m = Math.cos(g)),
                (h = Math.cos(_)),
                this.mode === this.OBLIQ || this.mode === this.EQUIT
              )
            ) {
              if (
                (
                  (i =
                    this.mode === this.EQUIT
                      ? 1 + m * h
                      : 1 + this.sinph0 * u + this.cosph0 * m * h),
                  o >= i
                )
              )
                return null;
              (i = Math.sqrt(2 / i)), (e = i * m * Math.sin(_)), (i *=
                this.mode === this.EQUIT
                  ? u
                  : this.cosph0 * u - this.sinph0 * m * h);
            } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
              if (
                (
                  this.mode === this.N_POLE && (h = -h),
                  Math.abs(g + this.phi0) < o
                )
              )
                return null;
              (i = s - 0.5 * g), (i =
                2 *
                (this.mode === this.S_POLE ? Math.cos(i) : Math.sin(i))), (e =
                i * Math.sin(_)), (i *= h);
            }
          } else {
            switch ((
              (f = 0),
              (d = 0),
              (p = 0),
              (h = Math.cos(_)),
              (c = Math.sin(_)),
              (u = Math.sin(g)),
              (l = a(this.e, u)),
              (this.mode === this.OBLIQ || this.mode === this.EQUIT) &&
                ((f = l / this.qp), (d = Math.sqrt(1 - f * f))),
              this.mode
            )) {
              case this.OBLIQ:
                p = 1 + this.sinb1 * f + this.cosb1 * d * h;
                break;
              case this.EQUIT:
                p = 1 + d * h;
                break;
              case this.N_POLE:
                (p = n + g), (l = this.qp - l);
                break;
              case this.S_POLE:
                (p = g - n), (l = this.qp + l);
            }
            if (Math.abs(p) < o) return null;
            switch (this.mode) {
              case this.OBLIQ:
              case this.EQUIT:
                (p = Math.sqrt(2 / p)), (i =
                  this.mode === this.OBLIQ
                    ? this.ymf * p * (this.cosb1 * f - this.sinb1 * d * h)
                    : (p = Math.sqrt(2 / (1 + d * h))) * f * this.ymf), (e =
                  this.xmf * p * d * c);
                break;
              case this.N_POLE:
              case this.S_POLE:
                l >= 0
                  ? (
                      (e = (p = Math.sqrt(l)) * c),
                      (i = h * (this.mode === this.S_POLE ? p : -p))
                    )
                  : (e = i = 0);
            }
          }
          return (t.x = this.a * e + this.x0), (t.y = this.a * i + this.y0), t;
        }), (i.inverse = function(t) {
          (t.x -= this.x0), (t.y -= this.y0);
          var e,
            i,
            s,
            a,
            h,
            c,
            u,
            l = t.x / this.a,
            f = t.y / this.a;
          if (this.sphere) {
            var d,
              p = 0,
              m = 0;
            if (((d = Math.sqrt(l * l + f * f)), (i = 0.5 * d), i > 1))
              return null;
            switch ((
              (i = 2 * Math.asin(i)),
              (this.mode === this.OBLIQ || this.mode === this.EQUIT) &&
                ((m = Math.sin(i)), (p = Math.cos(i))),
              this.mode
            )) {
              case this.EQUIT:
                (i =
                  Math.abs(d) <= o ? 0 : Math.asin(f * m / d)), (l *= m), (f =
                  p * d);
                break;
              case this.OBLIQ:
                (i =
                  Math.abs(d) <= o
                    ? this.phi0
                    : Math.asin(
                        p * this.sinph0 + f * m * this.cosph0 / d
                      )), (l *= m * this.cosph0), (f =
                  (p - Math.sin(i) * this.sinph0) * d);
                break;
              case this.N_POLE:
                (f = -f), (i = n - i);
                break;
              case this.S_POLE:
                i -= n;
            }
            e =
              0 !== f || (this.mode !== this.EQUIT && this.mode !== this.OBLIQ)
                ? Math.atan2(l, f)
                : 0;
          } else {
            if (
              ((u = 0), this.mode === this.OBLIQ || this.mode === this.EQUIT)
            ) {
              if (
                (
                  (l /= this.dd),
                  (f *= this.dd),
                  (c = Math.sqrt(l * l + f * f)),
                  o > c
                )
              )
                return (t.x = 0), (t.y = this.phi0), t;
              (a = 2 * Math.asin(0.5 * c / this.rq)), (s = Math.cos(
                a
              )), (l *= a = Math.sin(a)), this.mode === this.OBLIQ
                ? (
                    (u = s * this.sinb1 + f * a * this.cosb1 / c),
                    (h = this.qp * u),
                    (f = c * this.cosb1 * s - f * this.sinb1 * a)
                  )
                : ((u = f * a / c), (h = this.qp * u), (f = c * s));
            } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
              if (
                (this.mode === this.N_POLE && (f = -f), (h = l * l + f * f), !h)
              )
                return (t.x = 0), (t.y = this.phi0), t;
              (u = 1 - h / this.qp), this.mode === this.S_POLE && (u = -u);
            }
            (e = Math.atan2(l, f)), (i = this.authlat(Math.asin(u), this.apa));
          }
          return (t.x = r(this.long0 + e)), (t.y = i), t;
        }), (i.P00 = 0.3333333333333333), (i.P01 = 0.17222222222222222), (i.P02 = 0.10257936507936508), (i.P10 = 0.06388888888888888), (i.P11 = 0.0664021164021164), (i.P20 = 0.016415012942191543), (i.authset = function(
          t
        ) {
          var e,
            i = [];
          return (i[0] = t * this.P00), (e = t * t), (i[0] +=
            e * this.P01), (i[1] = e * this.P10), (e *= t), (i[0] +=
            e * this.P02), (i[1] += e * this.P11), (i[2] = e * this.P20), i;
        }), (i.authlat = function(t, e) {
          var i = t + t;
          return (
            t +
            e[0] * Math.sin(i) +
            e[1] * Math.sin(i + i) +
            e[2] * Math.sin(i + i + i)
          );
        }), (i.names = [
          "Lambert Azimuthal Equal Area",
          "Lambert_Azimuthal_Equal_Area",
          "laea"
        ]);
      },
      { "../common/adjust_lon": 52, "../common/qsfnz": 67 }
    ],
    98: [
      function(t, e, i) {
        var n = 1e-10,
          s = t("../common/msfnz"),
          o = t("../common/tsfnz"),
          a = Math.PI / 2,
          r = t("../common/sign"),
          h = t("../common/adjust_lon"),
          c = t("../common/phi2z");
        (i.init = function() {
          if (
            (
              this.lat2 || (this.lat2 = this.lat1),
              this.k0 || (this.k0 = 1),
              (this.x0 = this.x0 || 0),
              (this.y0 = this.y0 || 0),
              !(Math.abs(this.lat1 + this.lat2) < n)
            )
          ) {
            var t = this.b / this.a;
            this.e = Math.sqrt(1 - t * t);
            var e = Math.sin(this.lat1),
              i = Math.cos(this.lat1),
              a = s(this.e, e, i),
              r = o(this.e, this.lat1, e),
              h = Math.sin(this.lat2),
              c = Math.cos(this.lat2),
              u = s(this.e, h, c),
              l = o(this.e, this.lat2, h),
              f = o(this.e, this.lat0, Math.sin(this.lat0));
            Math.abs(this.lat1 - this.lat2) > n
              ? (this.ns = Math.log(a / u) / Math.log(r / l))
              : (this.ns = e), isNaN(this.ns) && (this.ns = e), (this.f0 =
              a / (this.ns * Math.pow(r, this.ns))), (this.rh =
              this.a * this.f0 * Math.pow(f, this.ns)), this.title ||
              (this.title = "Lambert Conformal Conic");
          }
        }), (i.forward = function(t) {
          var e = t.x,
            i = t.y;
          Math.abs(2 * Math.abs(i) - Math.PI) <= n && (i = r(i) * (a - 2 * n));
          var s,
            c,
            u = Math.abs(Math.abs(i) - a);
          if (u > n)
            (s = o(this.e, i, Math.sin(i))), (c =
              this.a * this.f0 * Math.pow(s, this.ns));
          else {
            if (((u = i * this.ns), 0 >= u)) return null;
            c = 0;
          }
          var l = this.ns * h(e - this.long0);
          return (t.x = this.k0 * (c * Math.sin(l)) + this.x0), (t.y =
            this.k0 * (this.rh - c * Math.cos(l)) + this.y0), t;
        }), (i.inverse = function(t) {
          var e,
            i,
            n,
            s,
            o,
            r = (t.x - this.x0) / this.k0,
            u = this.rh - (t.y - this.y0) / this.k0;
          this.ns > 0
            ? ((e = Math.sqrt(r * r + u * u)), (i = 1))
            : ((e = -Math.sqrt(r * r + u * u)), (i = -1));
          var l = 0;
          if (
            (0 !== e && (l = Math.atan2(i * r, i * u)), 0 !== e || this.ns > 0)
          ) {
            if (
              (
                (i = 1 / this.ns),
                (n = Math.pow(e / (this.a * this.f0), i)),
                (s = c(this.e, n)),
                -9999 === s
              )
            )
              return null;
          } else s = -a;
          return (o = h(l / this.ns + this.long0)), (t.x = o), (t.y = s), t;
        }), (i.names = [
          "Lambert Tangential Conformal Conic Projection",
          "Lambert_Conformal_Conic",
          "Lambert_Conformal_Conic_2SP",
          "lcc"
        ]);
      },
      {
        "../common/adjust_lon": 52,
        "../common/msfnz": 62,
        "../common/phi2z": 63,
        "../common/sign": 68,
        "../common/tsfnz": 71
      }
    ],
    99: [
      function(t, e, i) {
        function n(t) {
          return t;
        }
        (i.init = function() {}), (i.forward = n), (i.inverse = n), (i.names = [
          "longlat",
          "identity"
        ]);
      },
      {}
    ],
    100: [
      function(t, e, i) {
        var n = t("../common/msfnz"),
          s = Math.PI / 2,
          o = 1e-10,
          a = 57.29577951308232,
          r = t("../common/adjust_lon"),
          h = Math.PI / 4,
          c = t("../common/tsfnz"),
          u = t("../common/phi2z");
        (i.init = function() {
          var t = this.b / this.a;
          (this.es = 1 - t * t), "x0" in this || (this.x0 = 0), "y0" in this ||
            (this.y0 = 0), (this.e = Math.sqrt(this.es)), this.lat_ts
            ? this.sphere
              ? (this.k0 = Math.cos(this.lat_ts))
              : (this.k0 = n(
                  this.e,
                  Math.sin(this.lat_ts),
                  Math.cos(this.lat_ts)
                ))
            : this.k0 || (this.k ? (this.k0 = this.k) : (this.k0 = 1));
        }), (i.forward = function(t) {
          var e = t.x,
            i = t.y;
          if (i * a > 90 && -90 > i * a && e * a > 180 && -180 > e * a)
            return null;
          var n, u;
          if (Math.abs(Math.abs(i) - s) <= o) return null;
          if (this.sphere)
            (n = this.x0 + this.a * this.k0 * r(e - this.long0)), (u =
              this.y0 + this.a * this.k0 * Math.log(Math.tan(h + 0.5 * i)));
          else {
            var l = Math.sin(i),
              f = c(this.e, i, l);
            (n = this.x0 + this.a * this.k0 * r(e - this.long0)), (u =
              this.y0 - this.a * this.k0 * Math.log(f));
          }
          return (t.x = n), (t.y = u), t;
        }), (i.inverse = function(t) {
          var e,
            i,
            n = t.x - this.x0,
            o = t.y - this.y0;
          if (this.sphere)
            i = s - 2 * Math.atan(Math.exp(-o / (this.a * this.k0)));
          else {
            var a = Math.exp(-o / (this.a * this.k0));
            if (((i = u(this.e, a)), -9999 === i)) return null;
          }
          return (e = r(
            this.long0 + n / (this.a * this.k0)
          )), (t.x = e), (t.y = i), t;
        }), (i.names = [
          "Mercator",
          "Popular Visualisation Pseudo Mercator",
          "Mercator_1SP",
          "Mercator_Auxiliary_Sphere",
          "merc"
        ]);
      },
      {
        "../common/adjust_lon": 52,
        "../common/msfnz": 62,
        "../common/phi2z": 63,
        "../common/tsfnz": 71
      }
    ],
    101: [
      function(t, e, i) {
        var n = t("../common/adjust_lon");
        (i.init = function() {}), (i.forward = function(t) {
          var e = t.x,
            i = t.y,
            s = n(e - this.long0),
            o = this.x0 + this.a * s,
            a =
              this.y0 +
              this.a * Math.log(Math.tan(Math.PI / 4 + i / 2.5)) * 1.25;
          return (t.x = o), (t.y = a), t;
        }), (i.inverse = function(t) {
          (t.x -= this.x0), (t.y -= this.y0);
          var e = n(this.long0 + t.x / this.a),
            i = 2.5 * (Math.atan(Math.exp(0.8 * t.y / this.a)) - Math.PI / 4);
          return (t.x = e), (t.y = i), t;
        }), (i.names = ["Miller_Cylindrical", "mill"]);
      },
      { "../common/adjust_lon": 52 }
    ],
    102: [
      function(t, e, i) {
        var n = t("../common/adjust_lon"),
          s = 1e-10;
        (i.init = function() {}), (i.forward = function(t) {
          for (
            var e = t.x,
              i = t.y,
              o = n(e - this.long0),
              a = i,
              r = Math.PI * Math.sin(i),
              h = 0;
            !0;
            h++
          ) {
            var c = -(a + Math.sin(a) - r) / (1 + Math.cos(a));
            if (((a += c), Math.abs(c) < s)) break;
          }
          (a /= 2), Math.PI / 2 - Math.abs(i) < s && (o = 0);
          var u = 0.900316316158 * this.a * o * Math.cos(a) + this.x0,
            l = 1.4142135623731 * this.a * Math.sin(a) + this.y0;
          return (t.x = u), (t.y = l), t;
        }), (i.inverse = function(t) {
          var e, i;
          (t.x -= this.x0), (t.y -= this.y0), (i =
            t.y / (1.4142135623731 * this.a)), Math.abs(i) > 0.999999999999 &&
            (i = 0.999999999999), (e = Math.asin(i));
          var s = n(this.long0 + t.x / (0.900316316158 * this.a * Math.cos(e)));
          s < -Math.PI && (s = -Math.PI), s > Math.PI && (s = Math.PI), (i =
            (2 * e + Math.sin(2 * e)) / Math.PI), Math.abs(i) > 1 && (i = 1);
          var o = Math.asin(i);
          return (t.x = s), (t.y = o), t;
        }), (i.names = ["Mollweide", "moll"]);
      },
      { "../common/adjust_lon": 52 }
    ],
    103: [
      function(t, e, i) {
        var n = 484813681109536e-20;
        (i.iterations = 1), (i.init = function() {
          (this.A = []), (this.A[1] = 0.6399175073), (this.A[2] = -0.1358797613), (this.A[3] = 0.063294409), (this.A[4] = -0.02526853), (this.A[5] = 0.0117879), (this.A[6] = -0.0055161), (this.A[7] = 0.0026906), (this.A[8] = -0.001333), (this.A[9] = 67e-5), (this.A[10] = -34e-5), (this.B_re = []), (this.B_im = []), (this.B_re[1] = 0.7557853228), (this.B_im[1] = 0), (this.B_re[2] = 0.249204646), (this.B_im[2] = 0.003371507), (this.B_re[3] = -0.001541739), (this.B_im[3] = 0.04105856), (this.B_re[4] = -0.10162907), (this.B_im[4] = 0.01727609), (this.B_re[5] = -0.26623489), (this.B_im[5] = -0.36249218), (this.B_re[6] = -0.6870983), (this.B_im[6] = -1.1651967), (this.C_re = []), (this.C_im = []), (this.C_re[1] = 1.3231270439), (this.C_im[1] = 0), (this.C_re[2] = -0.577245789), (this.C_im[2] = -0.007809598), (this.C_re[3] = 0.508307513), (this.C_im[3] = -0.112208952), (this.C_re[4] = -0.15094762), (this.C_im[4] = 0.18200602), (this.C_re[5] = 1.01418179), (this.C_im[5] = 1.64497696), (this.C_re[6] = 1.9660549), (this.C_im[6] = 2.5127645), (this.D = []), (this.D[1] = 1.5627014243), (this.D[2] = 0.5185406398), (this.D[3] = -0.03333098), (this.D[4] = -0.1052906), (this.D[5] = -0.0368594), (this.D[6] = 0.007317), (this.D[7] = 0.0122), (this.D[8] = 0.00394), (this.D[9] = -0.0013);
        }), (i.forward = function(t) {
          var e,
            i = t.x,
            s = t.y,
            o = s - this.lat0,
            a = i - this.long0,
            r = o / n * 1e-5,
            h = a,
            c = 1,
            u = 0;
          for (e = 1; 10 >= e; e++) (c *= r), (u += this.A[e] * c);
          var l,
            f,
            d = u,
            p = h,
            m = 1,
            _ = 0,
            g = 0,
            y = 0;
          for (e = 1; 6 >= e; e++)
            (l = m * d - _ * p), (f = _ * d + m * p), (m = l), (_ = f), (g =
              g + this.B_re[e] * m - this.B_im[e] * _), (y =
              y + this.B_im[e] * m + this.B_re[e] * _);
          return (t.x = y * this.a + this.x0), (t.y = g * this.a + this.y0), t;
        }), (i.inverse = function(t) {
          var e,
            i,
            s,
            o = t.x,
            a = t.y,
            r = o - this.x0,
            h = a - this.y0,
            c = h / this.a,
            u = r / this.a,
            l = 1,
            f = 0,
            d = 0,
            p = 0;
          for (e = 1; 6 >= e; e++)
            (i = l * c - f * u), (s = f * c + l * u), (l = i), (f = s), (d =
              d + this.C_re[e] * l - this.C_im[e] * f), (p =
              p + this.C_im[e] * l + this.C_re[e] * f);
          for (var m = 0; m < this.iterations; m++) {
            var _,
              g,
              y = d,
              v = p,
              b = c,
              M = u;
            for (e = 2; 6 >= e; e++)
              (_ = y * d - v * p), (g = v * d + y * p), (y = _), (v = g), (b +=
                (e - 1) * (this.B_re[e] * y - this.B_im[e] * v)), (M +=
                (e - 1) * (this.B_im[e] * y + this.B_re[e] * v));
            (y = 1), (v = 0);
            var w = this.B_re[1],
              x = this.B_im[1];
            for (e = 2; 6 >= e; e++)
              (_ = y * d - v * p), (g = v * d + y * p), (y = _), (v = g), (w +=
                e * (this.B_re[e] * y - this.B_im[e] * v)), (x +=
                e * (this.B_im[e] * y + this.B_re[e] * v));
            var L = w * w + x * x;
            (d = (b * w + M * x) / L), (p = (M * w - b * x) / L);
          }
          var E = d,
            P = p,
            C = 1,
            A = 0;
          for (e = 1; 9 >= e; e++) (C *= E), (A += this.D[e] * C);
          var S = this.lat0 + A * n * 1e5,
            T = this.long0 + P;
          return (t.x = T), (t.y = S), t;
        }), (i.names = ["New_Zealand_Map_Grid", "nzmg"]);
      },
      {}
    ],
    104: [
      function(t, e, i) {
        var n = t("../common/tsfnz"),
          s = t("../common/adjust_lon"),
          o = t("../common/phi2z"),
          a = Math.PI / 2,
          r = Math.PI / 4,
          h = 1e-10;
        (i.init = function() {
          (this.no_off = this.no_off || !1), (this.no_rot =
            this.no_rot || !1), isNaN(this.k0) && (this.k0 = 1);
          var t = Math.sin(this.lat0),
            e = Math.cos(this.lat0),
            i = this.e * t;
          (this.bl = Math.sqrt(
            1 + this.es / (1 - this.es) * Math.pow(e, 4)
          )), (this.al =
            this.a * this.bl * this.k0 * Math.sqrt(1 - this.es) / (1 - i * i));
          var o = n(this.e, this.lat0, t),
            a = this.bl / e * Math.sqrt((1 - this.es) / (1 - i * i));
          1 > a * a && (a = 1);
          var r, h;
          if (isNaN(this.longc)) {
            var c = n(this.e, this.lat1, Math.sin(this.lat1)),
              u = n(this.e, this.lat2, Math.sin(this.lat2));
            this.lat0 >= 0
              ? (this.el = (a + Math.sqrt(a * a - 1)) * Math.pow(o, this.bl))
              : (this.el = (a - Math.sqrt(a * a - 1)) * Math.pow(o, this.bl));
            var l = Math.pow(c, this.bl),
              f = Math.pow(u, this.bl);
            (r = this.el / l), (h = 0.5 * (r - 1 / r));
            var d = (this.el * this.el - f * l) / (this.el * this.el + f * l),
              p = (f - l) / (f + l),
              m = s(this.long1 - this.long2);
            (this.long0 =
              0.5 * (this.long1 + this.long2) -
              Math.atan(d * Math.tan(0.5 * this.bl * m) / p) /
                this.bl), (this.long0 = s(this.long0));
            var _ = s(this.long1 - this.long0);
            (this.gamma0 = Math.atan(
              Math.sin(this.bl * _) / h
            )), (this.alpha = Math.asin(a * Math.sin(this.gamma0)));
          } else
            (r =
              this.lat0 >= 0
                ? a + Math.sqrt(a * a - 1)
                : a - Math.sqrt(a * a - 1)), (this.el =
              r * Math.pow(o, this.bl)), (h =
              0.5 * (r - 1 / r)), (this.gamma0 = Math.asin(
              Math.sin(this.alpha) / a
            )), (this.long0 =
              this.longc - Math.asin(h * Math.tan(this.gamma0)) / this.bl);
          this.no_off
            ? (this.uc = 0)
            : this.lat0 >= 0
              ? (this.uc =
                  this.al /
                  this.bl *
                  Math.atan2(Math.sqrt(a * a - 1), Math.cos(this.alpha)))
              : (this.uc =
                  -1 *
                  this.al /
                  this.bl *
                  Math.atan2(Math.sqrt(a * a - 1), Math.cos(this.alpha)));
        }), (i.forward = function(t) {
          var e,
            i,
            o,
            c = t.x,
            u = t.y,
            l = s(c - this.long0);
          if (Math.abs(Math.abs(u) - a) <= h)
            (o = u > 0 ? -1 : 1), (i =
              this.al /
              this.bl *
              Math.log(Math.tan(r + o * this.gamma0 * 0.5))), (e =
              -1 * o * a * this.al / this.bl);
          else {
            var f = n(this.e, u, Math.sin(u)),
              d = this.el / Math.pow(f, this.bl),
              p = 0.5 * (d - 1 / d),
              m = 0.5 * (d + 1 / d),
              _ = Math.sin(this.bl * l),
              g = (p * Math.sin(this.gamma0) - _ * Math.cos(this.gamma0)) / m;
            (i =
              Math.abs(Math.abs(g) - 1) <= h
                ? Number.POSITIVE_INFINITY
                : 0.5 * this.al * Math.log((1 - g) / (1 + g)) / this.bl), (e =
              Math.abs(Math.cos(this.bl * l)) <= h
                ? this.al * this.bl * l
                : this.al *
                  Math.atan2(
                    p * Math.cos(this.gamma0) + _ * Math.sin(this.gamma0),
                    Math.cos(this.bl * l)
                  ) /
                  this.bl);
          }
          return this.no_rot
            ? ((t.x = this.x0 + e), (t.y = this.y0 + i))
            : (
                (e -= this.uc),
                (t.x =
                  this.x0 +
                  i * Math.cos(this.alpha) +
                  e * Math.sin(this.alpha)),
                (t.y =
                  this.y0 + e * Math.cos(this.alpha) - i * Math.sin(this.alpha))
              ), t;
        }), (i.inverse = function(t) {
          var e, i;
          this.no_rot
            ? ((i = t.y - this.y0), (e = t.x - this.x0))
            : (
                (i =
                  (t.x - this.x0) * Math.cos(this.alpha) -
                  (t.y - this.y0) * Math.sin(this.alpha)),
                (e =
                  (t.y - this.y0) * Math.cos(this.alpha) +
                  (t.x - this.x0) * Math.sin(this.alpha)),
                (e += this.uc)
              );
          var n = Math.exp(-1 * this.bl * i / this.al),
            r = 0.5 * (n - 1 / n),
            c = 0.5 * (n + 1 / n),
            u = Math.sin(this.bl * e / this.al),
            l = (u * Math.cos(this.gamma0) + r * Math.sin(this.gamma0)) / c,
            f = Math.pow(this.el / Math.sqrt((1 + l) / (1 - l)), 1 / this.bl);
          return Math.abs(l - 1) < h
            ? ((t.x = this.long0), (t.y = a))
            : Math.abs(l + 1) < h
              ? ((t.x = this.long0), (t.y = -1 * a))
              : (
                  (t.y = o(this.e, f)),
                  (t.x = s(
                    this.long0 -
                      Math.atan2(
                        r * Math.cos(this.gamma0) - u * Math.sin(this.gamma0),
                        Math.cos(this.bl * e / this.al)
                      ) /
                        this.bl
                  ))
                ), t;
        }), (i.names = [
          "Hotine_Oblique_Mercator",
          "Hotine Oblique Mercator",
          "Hotine_Oblique_Mercator_Azimuth_Natural_Origin",
          "Hotine_Oblique_Mercator_Azimuth_Center",
          "omerc"
        ]);
      },
      {
        "../common/adjust_lon": 52,
        "../common/phi2z": 63,
        "../common/tsfnz": 71
      }
    ],
    105: [
      function(t, e, i) {
        var n = t("../common/e0fn"),
          s = t("../common/e1fn"),
          o = t("../common/e2fn"),
          a = t("../common/e3fn"),
          r = t("../common/adjust_lon"),
          h = t("../common/adjust_lat"),
          c = t("../common/mlfn"),
          u = 1e-10,
          l = t("../common/gN"),
          f = 20;
        (i.init = function() {
          (this.temp = this.b / this.a), (this.es =
            1 - Math.pow(this.temp, 2)), (this.e = Math.sqrt(
            this.es
          )), (this.e0 = n(this.es)), (this.e1 = s(this.es)), (this.e2 = o(
            this.es
          )), (this.e3 = a(this.es)), (this.ml0 =
            this.a * c(this.e0, this.e1, this.e2, this.e3, this.lat0));
        }), (i.forward = function(t) {
          var e,
            i,
            n,
            s = t.x,
            o = t.y,
            a = r(s - this.long0);
          if (((n = a * Math.sin(o)), this.sphere))
            Math.abs(o) <= u
              ? ((e = this.a * a), (i = -1 * this.a * this.lat0))
              : (
                  (e = this.a * Math.sin(n) / Math.tan(o)),
                  (i =
                    this.a *
                    (h(o - this.lat0) + (1 - Math.cos(n)) / Math.tan(o)))
                );
          else if (Math.abs(o) <= u) (e = this.a * a), (i = -1 * this.ml0);
          else {
            var f = l(this.a, this.e, Math.sin(o)) / Math.tan(o);
            (e = f * Math.sin(n)), (i =
              this.a * c(this.e0, this.e1, this.e2, this.e3, o) -
              this.ml0 +
              f * (1 - Math.cos(n)));
          }
          return (t.x = e + this.x0), (t.y = i + this.y0), t;
        }), (i.inverse = function(t) {
          var e, i, n, s, o, a, h, l, d;
          if (((n = t.x - this.x0), (s = t.y - this.y0), this.sphere))
            if (Math.abs(s + this.a * this.lat0) <= u)
              (e = r(n / this.a + this.long0)), (i = 0);
            else {
              (a = this.lat0 + s / this.a), (h =
                n * n / this.a / this.a + a * a), (l = a);
              var p;
              for (o = f; o; --o)
                if (
                  (
                    (p = Math.tan(l)),
                    (d =
                      -1 *
                      (a * (l * p + 1) - l - 0.5 * (l * l + h) * p) /
                      ((l - a) / p - 1)),
                    (l += d),
                    Math.abs(d) <= u
                  )
                ) {
                  i = l;
                  break;
                }
              e = r(
                this.long0 + Math.asin(n * Math.tan(l) / this.a) / Math.sin(i)
              );
            }
          else if (Math.abs(s + this.ml0) <= u)
            (i = 0), (e = r(this.long0 + n / this.a));
          else {
            (a = (this.ml0 + s) / this.a), (h =
              n * n / this.a / this.a + a * a), (l = a);
            var m, _, g, y, v;
            for (o = f; o; --o)
              if (
                (
                  (v = this.e * Math.sin(l)),
                  (m = Math.sqrt(1 - v * v) * Math.tan(l)),
                  (_ = this.a * c(this.e0, this.e1, this.e2, this.e3, l)),
                  (g =
                    this.e0 -
                    2 * this.e1 * Math.cos(2 * l) +
                    4 * this.e2 * Math.cos(4 * l) -
                    6 * this.e3 * Math.cos(6 * l)),
                  (y = _ / this.a),
                  (d =
                    (a * (m * y + 1) - y - 0.5 * m * (y * y + h)) /
                    (this.es *
                      Math.sin(2 * l) *
                      (y * y + h - 2 * a * y) /
                      (4 * m) +
                      (a - y) * (m * g - 2 / Math.sin(2 * l)) -
                      g)),
                  (l -= d),
                  Math.abs(d) <= u
                )
              ) {
                i = l;
                break;
              }
            (m =
              Math.sqrt(1 - this.es * Math.pow(Math.sin(i), 2)) *
              Math.tan(i)), (e = r(
              this.long0 + Math.asin(n * m / this.a) / Math.sin(i)
            ));
          }
          return (t.x = e), (t.y = i), t;
        }), (i.names = ["Polyconic", "poly"]);
      },
      {
        "../common/adjust_lat": 51,
        "../common/adjust_lon": 52,
        "../common/e0fn": 54,
        "../common/e1fn": 55,
        "../common/e2fn": 56,
        "../common/e3fn": 57,
        "../common/gN": 58,
        "../common/mlfn": 61
      }
    ],
    106: [
      function(t, e, i) {
        var n = t("../common/adjust_lon"),
          s = t("../common/adjust_lat"),
          o = t("../common/pj_enfn"),
          a = 20,
          r = t("../common/pj_mlfn"),
          h = t("../common/pj_inv_mlfn"),
          c = Math.PI / 2,
          u = 1e-10,
          l = t("../common/asinz");
        (i.init = function() {
          this.sphere
            ? (
                (this.n = 1),
                (this.m = 0),
                (this.es = 0),
                (this.C_y = Math.sqrt((this.m + 1) / this.n)),
                (this.C_x = this.C_y / (this.m + 1))
              )
            : (this.en = o(this.es));
        }), (i.forward = function(t) {
          var e,
            i,
            s = t.x,
            o = t.y;
          if (((s = n(s - this.long0)), this.sphere)) {
            if (this.m)
              for (var h = this.n * Math.sin(o), c = a; c; --c) {
                var l = (this.m * o + Math.sin(o) - h) / (this.m + Math.cos(o));
                if (((o -= l), Math.abs(l) < u)) break;
              }
            else o = 1 !== this.n ? Math.asin(this.n * Math.sin(o)) : o;
            (e = this.a * this.C_x * s * (this.m + Math.cos(o))), (i =
              this.a * this.C_y * o);
          } else {
            var f = Math.sin(o),
              d = Math.cos(o);
            (i = this.a * r(o, f, d, this.en)), (e =
              this.a * s * d / Math.sqrt(1 - this.es * f * f));
          }
          return (t.x = e), (t.y = i), t;
        }), (i.inverse = function(t) {
          var e, i, o, a;
          return (t.x -= this.x0), (o = t.x / this.a), (t.y -= this.y0), (e =
            t.y / this.a), this.sphere
            ? (
                (e /= this.C_y),
                (o /= this.C_x * (this.m + Math.cos(e))),
                this.m
                  ? (e = l((this.m * e + Math.sin(e)) / this.n))
                  : 1 !== this.n && (e = l(Math.sin(e) / this.n)),
                (o = n(o + this.long0)),
                (e = s(e))
              )
            : (
                (e = h(t.y / this.a, this.es, this.en)),
                (a = Math.abs(e)),
                c > a
                  ? (
                      (a = Math.sin(e)),
                      (i =
                        this.long0 +
                        t.x *
                          Math.sqrt(1 - this.es * a * a) /
                          (this.a * Math.cos(e))),
                      (o = n(i))
                    )
                  : c > a - u && (o = this.long0)
              ), (t.x = o), (t.y = e), t;
        }), (i.names = ["Sinusoidal", "sinu"]);
      },
      {
        "../common/adjust_lat": 51,
        "../common/adjust_lon": 52,
        "../common/asinz": 53,
        "../common/pj_enfn": 64,
        "../common/pj_inv_mlfn": 65,
        "../common/pj_mlfn": 66
      }
    ],
    107: [
      function(t, e, i) {
        (i.init = function() {
          var t = this.lat0;
          this.lambda0 = this.long0;
          var e = Math.sin(t),
            i = this.a,
            n = this.rf,
            s = 1 / n,
            o = 2 * s - Math.pow(s, 2),
            a = (this.e = Math.sqrt(o));
          (this.R =
            this.k0 *
            i *
            Math.sqrt(1 - o) /
            (1 - o * Math.pow(e, 2))), (this.alpha = Math.sqrt(
            1 + o / (1 - o) * Math.pow(Math.cos(t), 4)
          )), (this.b0 = Math.asin(e / this.alpha));
          var r = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)),
            h = Math.log(Math.tan(Math.PI / 4 + t / 2)),
            c = Math.log((1 + a * e) / (1 - a * e));
          this.K = r - this.alpha * h + this.alpha * a / 2 * c;
        }), (i.forward = function(t) {
          var e = Math.log(Math.tan(Math.PI / 4 - t.y / 2)),
            i =
              this.e /
              2 *
              Math.log(
                (1 + this.e * Math.sin(t.y)) / (1 - this.e * Math.sin(t.y))
              ),
            n = -this.alpha * (e + i) + this.K,
            s = 2 * (Math.atan(Math.exp(n)) - Math.PI / 4),
            o = this.alpha * (t.x - this.lambda0),
            a = Math.atan(
              Math.sin(o) /
                (Math.sin(this.b0) * Math.tan(s) +
                  Math.cos(this.b0) * Math.cos(o))
            ),
            r = Math.asin(
              Math.cos(this.b0) * Math.sin(s) -
                Math.sin(this.b0) * Math.cos(s) * Math.cos(o)
            );
          return (t.y =
            this.R / 2 * Math.log((1 + Math.sin(r)) / (1 - Math.sin(r))) +
            this.y0), (t.x = this.R * a + this.x0), t;
        }), (i.inverse = function(t) {
          for (
            var e = t.x - this.x0,
              i = t.y - this.y0,
              n = e / this.R,
              s = 2 * (Math.atan(Math.exp(i / this.R)) - Math.PI / 4),
              o = Math.asin(
                Math.cos(this.b0) * Math.sin(s) +
                  Math.sin(this.b0) * Math.cos(s) * Math.cos(n)
              ),
              a = Math.atan(
                Math.sin(n) /
                  (Math.cos(this.b0) * Math.cos(n) -
                    Math.sin(this.b0) * Math.tan(s))
              ),
              r = this.lambda0 + a / this.alpha,
              h = 0,
              c = o,
              u = -1e3,
              l = 0;
            Math.abs(c - u) > 1e-7;

          ) {
            if (++l > 20) return;
            (h =
              1 /
                this.alpha *
                (Math.log(Math.tan(Math.PI / 4 + o / 2)) - this.K) +
              this.e *
                Math.log(
                  Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(c)) / 2)
                )), (u = c), (c = 2 * Math.atan(Math.exp(h)) - Math.PI / 2);
          }
          return (t.x = r), (t.y = c), t;
        }), (i.names = ["somerc"]);
      },
      {}
    ],
    108: [
      function(t, e, i) {
        var n = Math.PI / 2,
          s = 1e-10,
          o = t("../common/sign"),
          a = t("../common/msfnz"),
          r = t("../common/tsfnz"),
          h = t("../common/phi2z"),
          c = t("../common/adjust_lon");
        (i.ssfn_ = function(t, e, i) {
          return (e *= i), Math.tan(0.5 * (n + t)) *
            Math.pow((1 - e) / (1 + e), 0.5 * i);
        }), (i.init = function() {
          (this.coslat0 = Math.cos(this.lat0)), (this.sinlat0 = Math.sin(
            this.lat0
          )), this.sphere
            ? 1 === this.k0 &&
              !isNaN(this.lat_ts) &&
              Math.abs(this.coslat0) <= s &&
              (this.k0 = 0.5 * (1 + o(this.lat0) * Math.sin(this.lat_ts)))
            : (
                Math.abs(this.coslat0) <= s &&
                  (this.lat0 > 0 ? (this.con = 1) : (this.con = -1)),
                (this.cons = Math.sqrt(
                  Math.pow(1 + this.e, 1 + this.e) *
                    Math.pow(1 - this.e, 1 - this.e)
                )),
                1 === this.k0 &&
                  !isNaN(this.lat_ts) &&
                  Math.abs(this.coslat0) <= s &&
                  (this.k0 =
                    0.5 *
                    this.cons *
                    a(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) /
                    r(
                      this.e,
                      this.con * this.lat_ts,
                      this.con * Math.sin(this.lat_ts)
                    )),
                (this.ms1 = a(this.e, this.sinlat0, this.coslat0)),
                (this.X0 =
                  2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) -
                  n),
                (this.cosX0 = Math.cos(this.X0)),
                (this.sinX0 = Math.sin(this.X0))
              );
        }), (i.forward = function(t) {
          var e,
            i,
            o,
            a,
            h,
            u,
            l = t.x,
            f = t.y,
            d = Math.sin(f),
            p = Math.cos(f),
            m = c(l - this.long0);
          return Math.abs(Math.abs(l - this.long0) - Math.PI) <= s &&
          Math.abs(f + this.lat0) <= s
            ? ((t.x = NaN), (t.y = NaN), t)
            : this.sphere
              ? (
                  (e =
                    2 *
                    this.k0 /
                    (1 + this.sinlat0 * d + this.coslat0 * p * Math.cos(m))),
                  (t.x = this.a * e * p * Math.sin(m) + this.x0),
                  (t.y =
                    this.a *
                      e *
                      (this.coslat0 * d - this.sinlat0 * p * Math.cos(m)) +
                    this.y0),
                  t
                )
              : (
                  (i = 2 * Math.atan(this.ssfn_(f, d, this.e)) - n),
                  (a = Math.cos(i)),
                  (o = Math.sin(i)),
                  Math.abs(this.coslat0) <= s
                    ? (
                        (h = r(this.e, f * this.con, this.con * d)),
                        (u = 2 * this.a * this.k0 * h / this.cons),
                        (t.x = this.x0 + u * Math.sin(l - this.long0)),
                        (t.y =
                          this.y0 - this.con * u * Math.cos(l - this.long0)),
                        t
                      )
                    : (
                        Math.abs(this.sinlat0) < s
                          ? (
                              (e =
                                2 * this.a * this.k0 / (1 + a * Math.cos(m))),
                              (t.y = e * o)
                            )
                          : (
                              (e =
                                2 *
                                this.a *
                                this.k0 *
                                this.ms1 /
                                (this.cosX0 *
                                  (1 +
                                    this.sinX0 * o +
                                    this.cosX0 * a * Math.cos(m)))),
                              (t.y =
                                e *
                                  (this.cosX0 * o -
                                    this.sinX0 * a * Math.cos(m)) +
                                this.y0)
                            ),
                        (t.x = e * a * Math.sin(m) + this.x0),
                        t
                      )
                );
        }), (i.inverse = function(t) {
          (t.x -= this.x0), (t.y -= this.y0);
          var e,
            i,
            o,
            a,
            r,
            u = Math.sqrt(t.x * t.x + t.y * t.y);
          if (this.sphere) {
            var l = 2 * Math.atan(u / (0.5 * this.a * this.k0));
            return (e = this.long0), (i = this.lat0), s >= u
              ? ((t.x = e), (t.y = i), t)
              : (
                  (i = Math.asin(
                    Math.cos(l) * this.sinlat0 +
                      t.y * Math.sin(l) * this.coslat0 / u
                  )),
                  (e = c(
                    Math.abs(this.coslat0) < s
                      ? this.lat0 > 0
                        ? this.long0 + Math.atan2(t.x, -1 * t.y)
                        : this.long0 + Math.atan2(t.x, t.y)
                      : this.long0 +
                        Math.atan2(
                          t.x * Math.sin(l),
                          u * this.coslat0 * Math.cos(l) -
                            t.y * this.sinlat0 * Math.sin(l)
                        )
                  )),
                  (t.x = e),
                  (t.y = i),
                  t
                );
          }
          if (Math.abs(this.coslat0) <= s) {
            if (s >= u)
              return (i = this.lat0), (e = this.long0), (t.x = e), (t.y = i), t;
            (t.x *= this.con), (t.y *= this.con), (o =
              u * this.cons / (2 * this.a * this.k0)), (i =
              this.con * h(this.e, o)), (e =
              this.con * c(this.con * this.long0 + Math.atan2(t.x, -1 * t.y)));
          } else
            (a =
              2 *
              Math.atan(
                u * this.cosX0 / (2 * this.a * this.k0 * this.ms1)
              )), (e = this.long0), s >= u
              ? (r = this.X0)
              : (
                  (r = Math.asin(
                    Math.cos(a) * this.sinX0 +
                      t.y * Math.sin(a) * this.cosX0 / u
                  )),
                  (e = c(
                    this.long0 +
                      Math.atan2(
                        t.x * Math.sin(a),
                        u * this.cosX0 * Math.cos(a) -
                          t.y * this.sinX0 * Math.sin(a)
                      )
                  ))
                ), (i = -1 * h(this.e, Math.tan(0.5 * (n + r))));
          return (t.x = e), (t.y = i), t;
        }), (i.names = [
          "stere",
          "Stereographic_South_Pole",
          "Polar Stereographic (variant B)"
        ]);
      },
      {
        "../common/adjust_lon": 52,
        "../common/msfnz": 62,
        "../common/phi2z": 63,
        "../common/sign": 68,
        "../common/tsfnz": 71
      }
    ],
    109: [
      function(t, e, i) {
        var n = t("./gauss"),
          s = t("../common/adjust_lon");
        (i.init = function() {
          n.init.apply(this), this.rc &&
            (
              (this.sinc0 = Math.sin(this.phic0)),
              (this.cosc0 = Math.cos(this.phic0)),
              (this.R2 = 2 * this.rc),
              this.title || (this.title = "Oblique Stereographic Alternative")
            );
        }), (i.forward = function(t) {
          var e, i, o, a;
          return (t.x = s(t.x - this.long0)), n.forward.apply(this, [
            t
          ]), (e = Math.sin(t.y)), (i = Math.cos(t.y)), (o = Math.cos(
            t.x
          )), (a =
            this.k0 *
            this.R2 /
            (1 + this.sinc0 * e + this.cosc0 * i * o)), (t.x =
            a * i * Math.sin(t.x)), (t.y =
            a * (this.cosc0 * e - this.sinc0 * i * o)), (t.x =
            this.a * t.x + this.x0), (t.y = this.a * t.y + this.y0), t;
        }), (i.inverse = function(t) {
          var e, i, o, a, r;
          if (
            (
              (t.x = (t.x - this.x0) / this.a),
              (t.y = (t.y - this.y0) / this.a),
              (t.x /= this.k0),
              (t.y /= this.k0),
              (r = Math.sqrt(t.x * t.x + t.y * t.y))
            )
          ) {
            var h = 2 * Math.atan2(r, this.R2);
            (e = Math.sin(h)), (i = Math.cos(h)), (a = Math.asin(
              i * this.sinc0 + t.y * e * this.cosc0 / r
            )), (o = Math.atan2(
              t.x * e,
              r * this.cosc0 * i - t.y * this.sinc0 * e
            ));
          } else (a = this.phic0), (o = 0);
          return (t.x = o), (t.y = a), n.inverse.apply(this, [t]), (t.x = s(
            t.x + this.long0
          )), t;
        }), (i.names = [
          "Stereographic_North_Pole",
          "Oblique_Stereographic",
          "Polar_Stereographic",
          "sterea",
          "Oblique Stereographic Alternative"
        ]);
      },
      { "../common/adjust_lon": 52, "./gauss": 94 }
    ],
    110: [
      function(t, e, i) {
        var n = t("../common/e0fn"),
          s = t("../common/e1fn"),
          o = t("../common/e2fn"),
          a = t("../common/e3fn"),
          r = t("../common/mlfn"),
          h = t("../common/adjust_lon"),
          c = Math.PI / 2,
          u = 1e-10,
          l = t("../common/sign"),
          f = t("../common/asinz");
        (i.init = function() {
          (this.e0 = n(this.es)), (this.e1 = s(this.es)), (this.e2 = o(
            this.es
          )), (this.e3 = a(this.es)), (this.ml0 =
            this.a * r(this.e0, this.e1, this.e2, this.e3, this.lat0));
        }), (i.forward = function(t) {
          var e,
            i,
            n,
            s = t.x,
            o = t.y,
            a = h(s - this.long0),
            c = Math.sin(o),
            u = Math.cos(o);
          if (this.sphere) {
            var l = u * Math.sin(a);
            if (Math.abs(Math.abs(l) - 1) < 1e-10) return 93;
            (i =
              0.5 *
              this.a *
              this.k0 *
              Math.log((1 + l) / (1 - l))), (e = Math.acos(
              u * Math.cos(a) / Math.sqrt(1 - l * l)
            )), 0 > o && (e = -e), (n = this.a * this.k0 * (e - this.lat0));
          } else {
            var f = u * a,
              d = Math.pow(f, 2),
              p = this.ep2 * Math.pow(u, 2),
              m = Math.tan(o),
              _ = Math.pow(m, 2);
            e = 1 - this.es * Math.pow(c, 2);
            var g = this.a / Math.sqrt(e),
              y = this.a * r(this.e0, this.e1, this.e2, this.e3, o);
            (i =
              this.k0 *
                g *
                f *
                (1 +
                  d /
                    6 *
                    (1 -
                      _ +
                      p +
                      d /
                        20 *
                        (5 -
                          18 * _ +
                          Math.pow(_, 2) +
                          72 * p -
                          58 * this.ep2))) +
              this.x0), (n =
              this.k0 *
                (y -
                  this.ml0 +
                  g *
                    m *
                    (d *
                      (0.5 +
                        d /
                          24 *
                          (5 -
                            _ +
                            9 * p +
                            4 * Math.pow(p, 2) +
                            d /
                              30 *
                              (61 -
                                58 * _ +
                                Math.pow(_, 2) +
                                600 * p -
                                330 * this.ep2))))) +
              this.y0);
          }
          return (t.x = i), (t.y = n), t;
        }), (i.inverse = function(t) {
          var e,
            i,
            n,
            s,
            o,
            a,
            r = 6;
          if (this.sphere) {
            var d = Math.exp(t.x / (this.a * this.k0)),
              p = 0.5 * (d - 1 / d),
              m = this.lat0 + t.y / (this.a * this.k0),
              _ = Math.cos(m);
            (e = Math.sqrt((1 - _ * _) / (1 + p * p))), (o = f(e)), 0 > m &&
              (o = -o), (a =
              0 === p && 0 === _
                ? this.long0
                : h(Math.atan2(p, _) + this.long0));
          } else {
            var g = t.x - this.x0,
              y = t.y - this.y0;
            for (
              e = (this.ml0 + y / this.k0) / this.a, i = e, s = 0;
              !0 &&
              (
                (n =
                  (e +
                    this.e1 * Math.sin(2 * i) -
                    this.e2 * Math.sin(4 * i) +
                    this.e3 * Math.sin(6 * i)) /
                    this.e0 -
                  i),
                (i += n),
                !(Math.abs(n) <= u)
              );
              s++
            )
              if (s >= r) return 95;
            if (Math.abs(i) < c) {
              var v = Math.sin(i),
                b = Math.cos(i),
                M = Math.tan(i),
                w = this.ep2 * Math.pow(b, 2),
                x = Math.pow(w, 2),
                L = Math.pow(M, 2),
                E = Math.pow(L, 2);
              e = 1 - this.es * Math.pow(v, 2);
              var P = this.a / Math.sqrt(e),
                C = P * (1 - this.es) / e,
                A = g / (P * this.k0),
                S = Math.pow(A, 2);
              (o =
                i -
                P *
                  M *
                  S /
                  C *
                  (0.5 -
                    S /
                      24 *
                      (5 +
                        3 * L +
                        10 * w -
                        4 * x -
                        9 * this.ep2 -
                        S /
                          30 *
                          (61 +
                            90 * L +
                            298 * w +
                            45 * E -
                            252 * this.ep2 -
                            3 * x)))), (a = h(
                this.long0 +
                  A *
                    (1 -
                      S /
                        6 *
                        (1 +
                          2 * L +
                          w -
                          S /
                            20 *
                            (5 -
                              2 * w +
                              28 * L -
                              3 * x +
                              8 * this.ep2 +
                              24 * E))) /
                    b
              ));
            } else (o = c * l(y)), (a = this.long0);
          }
          return (t.x = a), (t.y = o), t;
        }), (i.names = ["Transverse_Mercator", "Transverse Mercator", "tmerc"]);
      },
      {
        "../common/adjust_lon": 52,
        "../common/asinz": 53,
        "../common/e0fn": 54,
        "../common/e1fn": 55,
        "../common/e2fn": 56,
        "../common/e3fn": 57,
        "../common/mlfn": 61,
        "../common/sign": 68
      }
    ],
    111: [
      function(t, e, i) {
        var n = 0.017453292519943295,
          s = t("./tmerc");
        (i.dependsOn = "tmerc"), (i.init = function() {
          this.zone &&
            (
              (this.lat0 = 0),
              (this.long0 = (6 * Math.abs(this.zone) - 183) * n),
              (this.x0 = 5e5),
              (this.y0 = this.utmSouth ? 1e7 : 0),
              (this.k0 = 0.9996),
              s.init.apply(this),
              (this.forward = s.forward),
              (this.inverse = s.inverse)
            );
        }), (i.names = ["Universal Transverse Mercator System", "utm"]);
      },
      { "./tmerc": 110 }
    ],
    112: [
      function(t, e, i) {
        var n = t("../common/adjust_lon"),
          s = Math.PI / 2,
          o = 1e-10,
          a = t("../common/asinz");
        (i.init = function() {
          this.R = this.a;
        }), (i.forward = function(t) {
          var e,
            i,
            r = t.x,
            h = t.y,
            c = n(r - this.long0);
          Math.abs(h) <= o && ((e = this.x0 + this.R * c), (i = this.y0));
          var u = a(2 * Math.abs(h / Math.PI));
          (Math.abs(c) <= o || Math.abs(Math.abs(h) - s) <= o) &&
            (
              (e = this.x0),
              (i =
                h >= 0
                  ? this.y0 + Math.PI * this.R * Math.tan(0.5 * u)
                  : this.y0 + Math.PI * this.R * -Math.tan(0.5 * u))
            );
          var l = 0.5 * Math.abs(Math.PI / c - c / Math.PI),
            f = l * l,
            d = Math.sin(u),
            p = Math.cos(u),
            m = p / (d + p - 1),
            _ = m * m,
            g = m * (2 / d - 1),
            y = g * g,
            v =
              Math.PI *
              this.R *
              (l * (m - y) +
                Math.sqrt(f * (m - y) * (m - y) - (y + f) * (_ - y))) /
              (y + f);
          0 > c && (v = -v), (e = this.x0 + v);
          var b = f + m;
          return (v =
            Math.PI *
            this.R *
            (g * b - l * Math.sqrt((y + f) * (f + 1) - b * b)) /
            (y + f)), (i =
            h >= 0 ? this.y0 + v : this.y0 - v), (t.x = e), (t.y = i), t;
        }), (i.inverse = function(t) {
          var e, i, s, a, r, h, c, u, l, f, d, p, m;
          return (t.x -= this.x0), (t.y -= this.y0), (d =
            Math.PI * this.R), (s = t.x / d), (a = t.y / d), (r =
            s * s + a * a), (h = -Math.abs(a) * (1 + r)), (c =
            h - 2 * a * a + s * s), (u = -2 * h + 1 + 2 * a * a + r * r), (m =
            a * a / u +
            (2 * c * c * c / u / u / u - 9 * h * c / u / u) / 27), (l =
            (h - c * c / 3 / u) / u), (f = 2 * Math.sqrt(-l / 3)), (d =
            3 * m / l / f), Math.abs(d) > 1 && (d = d >= 0 ? 1 : -1), (p =
            Math.acos(d) / 3), (i =
            t.y >= 0
              ? (-f * Math.cos(p + Math.PI / 3) - c / 3 / u) * Math.PI
              : -(-f * Math.cos(p + Math.PI / 3) - c / 3 / u) * Math.PI), (e =
            Math.abs(s) < o
              ? this.long0
              : n(
                  this.long0 +
                    Math.PI *
                      (r - 1 + Math.sqrt(1 + 2 * (s * s - a * a) + r * r)) /
                      2 /
                      s
                )), (t.x = e), (t.y = i), t;
        }), (i.names = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"]);
      },
      { "../common/adjust_lon": 52, "../common/asinz": 53 }
    ],
    113: [
      function(t, e, i) {
        var n = 0.017453292519943295,
          s = 57.29577951308232,
          o = 1,
          a = 2,
          r = t("./datum_transform"),
          h = t("./adjust_axis"),
          c = t("./Proj"),
          u = t("./common/toPoint");
        e.exports = function l(t, e, i) {
          function f(t, e) {
            return (
              (t.datum.datum_type === o || t.datum.datum_type === a) &&
              "WGS84" !== e.datumCode
            );
          }
          var d;
          return Array.isArray(i) && (i = u(i)), t.datum &&
            e.datum &&
            (f(t, e) || f(e, t)) &&
            ((d = new c("WGS84")), l(t, d, i), (t = d)), "enu" !== t.axis &&
            h(t, !1, i), "longlat" === t.projName
            ? ((i.x *= n), (i.y *= n))
            : (
                t.to_meter && ((i.x *= t.to_meter), (i.y *= t.to_meter)),
                t.inverse(i)
              ), t.from_greenwich && (i.x += t.from_greenwich), (i = r(
            t.datum,
            e.datum,
            i
          )), e.from_greenwich && (i.x -= e.from_greenwich), "longlat" ===
          e.projName
            ? ((i.x *= s), (i.y *= s))
            : (
                e.forward(i),
                e.to_meter && ((i.x /= e.to_meter), (i.y /= e.to_meter))
              ), "enu" !== e.axis && h(e, !0, i), i;
        };
      },
      {
        "./Proj": 49,
        "./adjust_axis": 50,
        "./common/toPoint": 70,
        "./datum_transform": 78
      }
    ],
    114: [
      function(t, e, i) {
        function n(t, e, i) {
          t[e] = i
            .map(function(t) {
              var e = {};
              return s(t, e), e;
            })
            .reduce(function(t, e) {
              return c(t, e);
            }, {});
        }
        function s(t, e) {
          var i;
          return Array.isArray(t)
            ? (
                (i = t.shift()),
                "PARAMETER" === i && (i = t.shift()),
                1 === t.length
                  ? Array.isArray(t[0])
                    ? ((e[i] = {}), s(t[0], e[i]))
                    : (e[i] = t[0])
                  : t.length
                    ? "TOWGS84" === i
                      ? (e[i] = t)
                      : (
                          (e[i] = {}),
                          ["UNIT", "PRIMEM", "VERT_DATUM"].indexOf(i) > -1
                            ? (
                                (e[i] = {
                                  name: t[0].toLowerCase(),
                                  convert: t[1]
                                }),
                                3 === t.length && (e[i].auth = t[2])
                              )
                            : "SPHEROID" === i
                              ? (
                                  (e[i] = { name: t[0], a: t[1], rf: t[2] }),
                                  4 === t.length && (e[i].auth = t[3])
                                )
                              : [
                                  "GEOGCS",
                                  "GEOCCS",
                                  "DATUM",
                                  "VERT_CS",
                                  "COMPD_CS",
                                  "LOCAL_CS",
                                  "FITTED_CS",
                                  "LOCAL_DATUM"
                                ].indexOf(i) > -1
                                ? ((t[0] = ["name", t[0]]), n(e, i, t))
                                : t.every(function(t) {
                                    return Array.isArray(t);
                                  })
                                  ? n(e, i, t)
                                  : s(t, e[i])
                        )
                    : (e[i] = !0),
                void 0
              )
            : void (e[t] = !0);
        }
        function o(t, e) {
          var i = e[0],
            n = e[1];
          !(i in t) &&
            n in t &&
            ((t[i] = t[n]), 3 === e.length && (t[i] = e[2](t[i])));
        }
        function a(t) {
          return t * h;
        }
        function r(t) {
          function e(e) {
            var i = t.to_meter || 1;
            return parseFloat(e, 10) * i;
          }
          "GEOGCS" === t.type
            ? (t.projName = "longlat")
            : "LOCAL_CS" === t.type
              ? ((t.projName = "identity"), (t.local = !0))
              : "object" == typeof t.PROJECTION
                ? (t.projName = Object.keys(t.PROJECTION)[0])
                : (t.projName = t.PROJECTION), t.UNIT &&
            (
              (t.units = t.UNIT.name.toLowerCase()),
              "metre" === t.units && (t.units = "meter"),
              t.UNIT.convert && (t.to_meter = parseFloat(t.UNIT.convert, 10))
            ), t.GEOGCS &&
            (
              t.GEOGCS.DATUM
                ? (t.datumCode = t.GEOGCS.DATUM.name.toLowerCase())
                : (t.datumCode = t.GEOGCS.name.toLowerCase()),
              "d_" === t.datumCode.slice(0, 2) &&
                (t.datumCode = t.datumCode.slice(2)),
              ("new_zealand_geodetic_datum_1949" === t.datumCode ||
                "new_zealand_1949" === t.datumCode) &&
                (t.datumCode = "nzgd49"),
              "wgs_1984" === t.datumCode &&
                (
                  "Mercator_Auxiliary_Sphere" === t.PROJECTION &&
                    (t.sphere = !0),
                  (t.datumCode = "wgs84")
                ),
              "_ferro" === t.datumCode.slice(-6) &&
                (t.datumCode = t.datumCode.slice(0, -6)),
              "_jakarta" === t.datumCode.slice(-8) &&
                (t.datumCode = t.datumCode.slice(0, -8)),
              ~t.datumCode.indexOf("belge") && (t.datumCode = "rnb72"),
              t.GEOGCS.DATUM &&
                t.GEOGCS.DATUM.SPHEROID &&
                (
                  (t.ellps = t.GEOGCS.DATUM.SPHEROID.name
                    .replace("_19", "")
                    .replace(/[Cc]larke\_18/, "clrk")),
                  "international" === t.ellps.toLowerCase().slice(0, 13) &&
                    (t.ellps = "intl"),
                  (t.a = t.GEOGCS.DATUM.SPHEROID.a),
                  (t.rf = parseFloat(t.GEOGCS.DATUM.SPHEROID.rf, 10))
                ),
              ~t.datumCode.indexOf("osgb_1936") && (t.datumCode = "osgb36")
            ), t.b && !isFinite(t.b) && (t.b = t.a);
          var i = function(e) {
              return o(t, e);
            },
            n = [
              ["standard_parallel_1", "Standard_Parallel_1"],
              ["standard_parallel_2", "Standard_Parallel_2"],
              ["false_easting", "False_Easting"],
              ["false_northing", "False_Northing"],
              ["central_meridian", "Central_Meridian"],
              ["latitude_of_origin", "Latitude_Of_Origin"],
              ["latitude_of_origin", "Central_Parallel"],
              ["scale_factor", "Scale_Factor"],
              ["k0", "scale_factor"],
              ["latitude_of_center", "Latitude_of_center"],
              ["lat0", "latitude_of_center", a],
              ["longitude_of_center", "Longitude_Of_Center"],
              ["longc", "longitude_of_center", a],
              ["x0", "false_easting", e],
              ["y0", "false_northing", e],
              ["long0", "central_meridian", a],
              ["lat0", "latitude_of_origin", a],
              ["lat0", "standard_parallel_1", a],
              ["lat1", "standard_parallel_1", a],
              ["lat2", "standard_parallel_2", a],
              ["alpha", "azimuth", a],
              ["srsCode", "name"]
            ];
          n.forEach(i), t.long0 ||
            !t.longc ||
            ("Albers_Conic_Equal_Area" !== t.projName &&
              "Lambert_Azimuthal_Equal_Area" !== t.projName) ||
            (t.long0 = t.longc), t.lat_ts ||
            !t.lat1 ||
            ("Stereographic_South_Pole" !== t.projName &&
              "Polar Stereographic (variant B)" !== t.projName) ||
            ((t.lat0 = a(t.lat1 > 0 ? 90 : -90)), (t.lat_ts = t.lat1));
        }
        var h = 0.017453292519943295,
          c = t("./extend");
        e.exports = function(t, e) {
          var i = JSON.parse(
              ("," + t)
                .replace(/\s*\,\s*([A-Z_0-9]+?)(\[)/g, ',["$1",')
                .slice(1)
                .replace(/\s*\,\s*([A-Z_0-9]+?)\]/g, ',"$1"]')
                .replace(/,\["VERTCS".+/, "")
            ),
            n = i.shift(),
            o = i.shift();
          i.unshift(["name", o]), i.unshift(["type", n]), i.unshift("output");
          var a = {};
          return s(i, a), r(a.output), c(e, a.output);
        };
      },
      { "./extend": 81 }
    ],
    115: [
      function(t, e, i) {
        function n(t) {
          return t * (Math.PI / 180);
        }
        function s(t) {
          return 180 * (t / Math.PI);
        }
        function o(t) {
          var e,
            i,
            s,
            o,
            a,
            h,
            c,
            u,
            l,
            f = t.lat,
            d = t.lon,
            p = 6378137,
            m = 0.00669438,
            _ = 0.9996,
            g = n(f),
            y = n(d);
          (l = Math.floor((d + 180) / 6) + 1), 180 === d && (l = 60), f >= 56 &&
            64 > f &&
            d >= 3 &&
            12 > d &&
            (l = 32), f >= 72 &&
            84 > f &&
            (d >= 0 && 9 > d
              ? (l = 31)
              : d >= 9 && 21 > d
                ? (l = 33)
                : d >= 21 && 33 > d
                  ? (l = 35)
                  : d >= 33 && 42 > d && (l = 37)), (e =
            6 * (l - 1) - 180 + 3), (u = n(e)), (i = m / (1 - m)), (s =
            p / Math.sqrt(1 - m * Math.sin(g) * Math.sin(g))), (o =
            Math.tan(g) * Math.tan(g)), (a =
            i * Math.cos(g) * Math.cos(g)), (h = Math.cos(g) * (y - u)), (c =
            p *
            ((1 - m / 4 - 3 * m * m / 64 - 5 * m * m * m / 256) * g -
              (3 * m / 8 + 3 * m * m / 32 + 45 * m * m * m / 1024) *
                Math.sin(2 * g) +
              (15 * m * m / 256 + 45 * m * m * m / 1024) * Math.sin(4 * g) -
              35 * m * m * m / 3072 * Math.sin(6 * g)));
          var v =
              _ *
                s *
                (h +
                  (1 - o + a) * h * h * h / 6 +
                  (5 - 18 * o + o * o + 72 * a - 58 * i) *
                    h *
                    h *
                    h *
                    h *
                    h /
                    120) +
              5e5,
            b =
              _ *
              (c +
                s *
                  Math.tan(g) *
                  (h * h / 2 +
                    (5 - o + 9 * a + 4 * a * a) * h * h * h * h / 24 +
                    (61 - 58 * o + o * o + 600 * a - 330 * i) *
                      h *
                      h *
                      h *
                      h *
                      h *
                      h /
                      720));
          return 0 > f && (b += 1e7), {
            northing: Math.round(b),
            easting: Math.round(v),
            zoneNumber: l,
            zoneLetter: r(f)
          };
        }
        function a(t) {
          var e = t.northing,
            i = t.easting,
            n = t.zoneLetter,
            o = t.zoneNumber;
          if (0 > o || o > 60) return null;
          var r,
            h,
            c,
            u,
            l,
            f,
            d,
            p,
            m,
            _,
            g = 0.9996,
            y = 6378137,
            v = 0.00669438,
            b = (1 - Math.sqrt(1 - v)) / (1 + Math.sqrt(1 - v)),
            M = i - 5e5,
            w = e;
          "N" > n && (w -= 1e7), (p = 6 * (o - 1) - 180 + 3), (r =
            v / (1 - v)), (d = w / g), (m =
            d / (y * (1 - v / 4 - 3 * v * v / 64 - 5 * v * v * v / 256))), (_ =
            m +
            (3 * b / 2 - 27 * b * b * b / 32) * Math.sin(2 * m) +
            (21 * b * b / 16 - 55 * b * b * b * b / 32) * Math.sin(4 * m) +
            151 * b * b * b / 96 * Math.sin(6 * m)), (h =
            y / Math.sqrt(1 - v * Math.sin(_) * Math.sin(_))), (c =
            Math.tan(_) * Math.tan(_)), (u =
            r * Math.cos(_) * Math.cos(_)), (l =
            y *
            (1 - v) /
            Math.pow(1 - v * Math.sin(_) * Math.sin(_), 1.5)), (f =
            M / (h * g));
          var x =
            _ -
            h *
              Math.tan(_) /
              l *
              (f * f / 2 -
                (5 + 3 * c + 10 * u - 4 * u * u - 9 * r) * f * f * f * f / 24 +
                (61 + 90 * c + 298 * u + 45 * c * c - 252 * r - 3 * u * u) *
                  f *
                  f *
                  f *
                  f *
                  f *
                  f /
                  720);
          x = s(x);
          var L =
            (f -
              (1 + 2 * c + u) * f * f * f / 6 +
              (5 - 2 * u + 28 * c - 3 * u * u + 8 * r + 24 * c * c) *
                f *
                f *
                f *
                f *
                f /
                120) /
            Math.cos(_);
          L = p + s(L);
          var E;
          if (t.accuracy) {
            var P = a({
              northing: t.northing + t.accuracy,
              easting: t.easting + t.accuracy,
              zoneLetter: t.zoneLetter,
              zoneNumber: t.zoneNumber
            });
            E = { top: P.lat, right: P.lon, bottom: x, left: L };
          } else E = { lat: x, lon: L };
          return E;
        }
        function r(t) {
          var e = "Z";
          return 84 >= t && t >= 72
            ? (e = "X")
            : 72 > t && t >= 64
              ? (e = "W")
              : 64 > t && t >= 56
                ? (e = "V")
                : 56 > t && t >= 48
                  ? (e = "U")
                  : 48 > t && t >= 40
                    ? (e = "T")
                    : 40 > t && t >= 32
                      ? (e = "S")
                      : 32 > t && t >= 24
                        ? (e = "R")
                        : 24 > t && t >= 16
                          ? (e = "Q")
                          : 16 > t && t >= 8
                            ? (e = "P")
                            : 8 > t && t >= 0
                              ? (e = "N")
                              : 0 > t && t >= -8
                                ? (e = "M")
                                : -8 > t && t >= -16
                                  ? (e = "L")
                                  : -16 > t && t >= -24
                                    ? (e = "K")
                                    : -24 > t && t >= -32
                                      ? (e = "J")
                                      : -32 > t && t >= -40
                                        ? (e = "H")
                                        : -40 > t && t >= -48
                                          ? (e = "G")
                                          : -48 > t && t >= -56
                                            ? (e = "F")
                                            : -56 > t && t >= -64
                                              ? (e = "E")
                                              : -64 > t && t >= -72
                                                ? (e = "D")
                                                : -72 > t &&
                                                  t >= -80 &&
                                                  (e = "C"), e;
        }
        function h(t, e) {
          var i = "" + t.easting,
            n = "" + t.northing;
          return (
            t.zoneNumber +
            t.zoneLetter +
            c(t.easting, t.northing, t.zoneNumber) +
            i.substr(i.length - 5, e) +
            n.substr(n.length - 5, e)
          );
        }
        function c(t, e, i) {
          var n = u(i),
            s = Math.floor(t / 1e5),
            o = Math.floor(e / 1e5) % 20;
          return l(s, o, n);
        }
        function u(t) {
          var e = t % _;
          return 0 === e && (e = _), e;
        }
        function l(t, e, i) {
          var n = i - 1,
            s = g.charCodeAt(n),
            o = y.charCodeAt(n),
            a = s + t - 1,
            r = o + e,
            h = !1;
          a > x && ((a = a - x + v - 1), (h = !0)), (a === b ||
            (b > s && a > b) ||
            ((a > b || b > s) && h)) &&
            a++, (a === M || (M > s && a > M) || ((a > M || M > s) && h)) &&
            (a++, a === b && a++), a > x && (a = a - x + v - 1), r > w
            ? ((r = r - w + v - 1), (h = !0))
            : (h = !1), (r === b ||
            (b > o && r > b) ||
            ((r > b || b > o) && h)) &&
            r++, (r === M || (M > o && r > M) || ((r > M || M > o) && h)) &&
            (r++, r === b && r++), r > w && (r = r - w + v - 1);
          var c = String.fromCharCode(a) + String.fromCharCode(r);
          return c;
        }
        function f(t) {
          if (t && 0 === t.length) throw "MGRSPoint coverting from nothing";
          for (
            var e, i = t.length, n = null, s = "", o = 0;
            !/[A-Z]/.test((e = t.charAt(o)));

          ) {
            if (o >= 2) throw "MGRSPoint bad conversion from: " + t;
            (s += e), o++;
          }
          var a = parseInt(s, 10);
          if (0 === o || o + 3 > i) throw "MGRSPoint bad conversion from: " + t;
          var r = t.charAt(o++);
          if (
            "A" >= r ||
            "B" === r ||
            "Y" === r ||
            r >= "Z" ||
            "I" === r ||
            "O" === r
          )
            throw "MGRSPoint zone letter " + r + " not handled: " + t;
          n = t.substring(o, (o += 2));
          for (
            var h = u(a), c = d(n.charAt(0), h), l = p(n.charAt(1), h);
            l < m(r);

          )
            l += 2e6;
          var f = i - o;
          if (f % 2 !== 0)
            throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" +
              t;
          var _,
            g,
            y,
            v,
            b,
            M = f / 2,
            w = 0,
            x = 0;
          return M > 0 &&
            (
              (_ = 1e5 / Math.pow(10, M)),
              (g = t.substring(o, o + M)),
              (w = parseFloat(g) * _),
              (y = t.substring(o + M)),
              (x = parseFloat(y) * _)
            ), (v = w + c), (b = x + l), {
            easting: v,
            northing: b,
            zoneLetter: r,
            zoneNumber: a,
            accuracy: _
          };
        }
        function d(t, e) {
          for (
            var i = g.charCodeAt(e - 1), n = 1e5, s = !1;
            i !== t.charCodeAt(0);

          ) {
            if ((i++, i === b && i++, i === M && i++, i > x)) {
              if (s) throw "Bad character: " + t;
              (i = v), (s = !0);
            }
            n += 1e5;
          }
          return n;
        }
        function p(t, e) {
          if (t > "V") throw "MGRSPoint given invalid Northing " + t;
          for (
            var i = y.charCodeAt(e - 1), n = 0, s = !1;
            i !== t.charCodeAt(0);

          ) {
            if ((i++, i === b && i++, i === M && i++, i > w)) {
              if (s) throw "Bad character: " + t;
              (i = v), (s = !0);
            }
            n += 1e5;
          }
          return n;
        }
        function m(t) {
          var e;
          switch (t) {
            case "C":
              e = 11e5;
              break;
            case "D":
              e = 2e6;
              break;
            case "E":
              e = 28e5;
              break;
            case "F":
              e = 37e5;
              break;
            case "G":
              e = 46e5;
              break;
            case "H":
              e = 55e5;
              break;
            case "J":
              e = 64e5;
              break;
            case "K":
              e = 73e5;
              break;
            case "L":
              e = 82e5;
              break;
            case "M":
              e = 91e5;
              break;
            case "N":
              e = 0;
              break;
            case "P":
              e = 8e5;
              break;
            case "Q":
              e = 17e5;
              break;
            case "R":
              e = 26e5;
              break;
            case "S":
              e = 35e5;
              break;
            case "T":
              e = 44e5;
              break;
            case "U":
              e = 53e5;
              break;
            case "V":
              e = 62e5;
              break;
            case "W":
              e = 7e6;
              break;
            case "X":
              e = 79e5;
              break;
            default:
              e = -1;
          }
          if (e >= 0) return e;
          throw "Invalid zone letter: " + t;
        }
        var _ = 6,
          g = "AJSAJS",
          y = "AFAFAF",
          v = 65,
          b = 73,
          M = 79,
          w = 86,
          x = 90;
        (i.forward = function(t, e) {
          return (e = e || 5), h(o({ lat: t[1], lon: t[0] }), e);
        }), (i.inverse = function(t) {
          var e = a(f(t.toUpperCase()));
          return [e.left, e.bottom, e.right, e.top];
        }), (i.toPoint = function(t) {
          var e = i.inverse(t);
          return [(e[2] + e[0]) / 2, (e[3] + e[1]) / 2];
        });
      },
      {}
    ],
    116: [
      function(t, e, i) {
        e.exports = {
          name: "proj4",
          version: "2.3.6",
          description:
            "Proj4js is a JavaScript library to transform point coordinates from one coordinate system to another, including datum transformations.",
          main: "lib/index.js",
          directories: { test: "test", doc: "docs" },
          scripts: {
            test:
              "./node_modules/istanbul/lib/cli.js test ./node_modules/mocha/bin/_mocha test/test.js"
          },
          repository: {
            type: "git",
            url: "git://github.com/proj4js/proj4js.git"
          },
          author: "",
          license: "MIT",
          jam: {
            main: "dist/proj4.js",
            include: ["dist/proj4.js", "README.md", "AUTHORS", "LICENSE.md"]
          },
          devDependencies: {
            "grunt-cli": "~0.1.13",
            grunt: "~0.4.2",
            "grunt-contrib-connect": "~0.6.0",
            "grunt-contrib-jshint": "~0.8.0",
            chai: "~1.8.1",
            mocha: "~1.17.1",
            "grunt-mocha-phantomjs": "~0.4.0",
            browserify: "~3.24.5",
            "grunt-browserify": "~1.3.0",
            "grunt-contrib-uglify": "~0.3.2",
            curl: "git://github.com/cujojs/curl.git",
            istanbul: "~0.2.4",
            tin: "~0.4.0"
          },
          dependencies: { mgrs: "0.0.0" },
          contributors: [
            { name: "Mike Adair", email: "madair@dmsolutions.ca" },
            { name: "Richard Greenwood", email: "rich@greenwoodmap.com" },
            { name: "Calvin Metcalf", email: "calvin.metcalf@gmail.com" },
            { name: "Richard Marsden", url: "http://www.winwaed.com" },
            { name: "T. Mittan" },
            { name: "D. Steinwand" },
            { name: "S. Nelson" }
          ],
          gitHead: "dcdd1c0aa8a70a08f078a4b73781b9d1701134c6",
          bugs: { url: "https://github.com/proj4js/proj4js/issues" },
          homepage: "https://github.com/proj4js/proj4js",
          _id: "proj4@2.3.6",
          _shasum: "b02b320a318a5c1f427dbb70b962840fb649f092",
          _from: "proj4@>=2.3.6 <3.0.0",
          _npmVersion: "1.4.28",
          _npmUser: { name: "ahocevar", email: "andreas.hocevar@gmail.com" },
          maintainers: [
            { name: "cwmma", email: "calvin.metcalf@gmail.com" },
            { name: "ahocevar", email: "andreas.hocevar@gmail.com" }
          ],
          dist: {
            shasum: "b02b320a318a5c1f427dbb70b962840fb649f092",
            tarball: "http://registry.npmjs.org/proj4/-/proj4-2.3.6.tgz"
          },
          _resolved: "https://registry.npmjs.org/proj4/-/proj4-2.3.6.tgz",
          readme: "ERROR: No README data found!"
        };
      },
      {}
    ],
    117: [
      function(t, e, i) {
        e.exports = {
          YlGn: {
            3: ["#f7fcb9", "#addd8e", "#31a354"],
            4: ["#ffffcc", "#c2e699", "#78c679", "#238443"],
            5: ["#ffffcc", "#c2e699", "#78c679", "#31a354", "#006837"],
            6: [
              "#ffffcc",
              "#d9f0a3",
              "#addd8e",
              "#78c679",
              "#31a354",
              "#006837"
            ],
            7: [
              "#ffffcc",
              "#d9f0a3",
              "#addd8e",
              "#78c679",
              "#41ab5d",
              "#238443",
              "#005a32"
            ],
            8: [
              "#ffffe5",
              "#f7fcb9",
              "#d9f0a3",
              "#addd8e",
              "#78c679",
              "#41ab5d",
              "#238443",
              "#005a32"
            ],
            9: [
              "#ffffe5",
              "#f7fcb9",
              "#d9f0a3",
              "#addd8e",
              "#78c679",
              "#41ab5d",
              "#238443",
              "#006837",
              "#004529"
            ]
          },
          YlGnBu: {
            3: ["#edf8b1", "#7fcdbb", "#2c7fb8"],
            4: ["#ffffcc", "#a1dab4", "#41b6c4", "#225ea8"],
            5: ["#ffffcc", "#a1dab4", "#41b6c4", "#2c7fb8", "#253494"],
            6: [
              "#ffffcc",
              "#c7e9b4",
              "#7fcdbb",
              "#41b6c4",
              "#2c7fb8",
              "#253494"
            ],
            7: [
              "#ffffcc",
              "#c7e9b4",
              "#7fcdbb",
              "#41b6c4",
              "#1d91c0",
              "#225ea8",
              "#0c2c84"
            ],
            8: [
              "#ffffd9",
              "#edf8b1",
              "#c7e9b4",
              "#7fcdbb",
              "#41b6c4",
              "#1d91c0",
              "#225ea8",
              "#0c2c84"
            ],
            9: [
              "#ffffd9",
              "#edf8b1",
              "#c7e9b4",
              "#7fcdbb",
              "#41b6c4",
              "#1d91c0",
              "#225ea8",
              "#253494",
              "#081d58"
            ]
          },
          GnBu: {
            3: ["#e0f3db", "#a8ddb5", "#43a2ca"],
            4: ["#f0f9e8", "#bae4bc", "#7bccc4", "#2b8cbe"],
            5: ["#f0f9e8", "#bae4bc", "#7bccc4", "#43a2ca", "#0868ac"],
            6: [
              "#f0f9e8",
              "#ccebc5",
              "#a8ddb5",
              "#7bccc4",
              "#43a2ca",
              "#0868ac"
            ],
            7: [
              "#f0f9e8",
              "#ccebc5",
              "#a8ddb5",
              "#7bccc4",
              "#4eb3d3",
              "#2b8cbe",
              "#08589e"
            ],
            8: [
              "#f7fcf0",
              "#e0f3db",
              "#ccebc5",
              "#a8ddb5",
              "#7bccc4",
              "#4eb3d3",
              "#2b8cbe",
              "#08589e"
            ],
            9: [
              "#f7fcf0",
              "#e0f3db",
              "#ccebc5",
              "#a8ddb5",
              "#7bccc4",
              "#4eb3d3",
              "#2b8cbe",
              "#0868ac",
              "#084081"
            ]
          },
          BuGn: {
            3: ["#e5f5f9", "#99d8c9", "#2ca25f"],
            4: ["#edf8fb", "#b2e2e2", "#66c2a4", "#238b45"],
            5: ["#edf8fb", "#b2e2e2", "#66c2a4", "#2ca25f", "#006d2c"],
            6: [
              "#edf8fb",
              "#ccece6",
              "#99d8c9",
              "#66c2a4",
              "#2ca25f",
              "#006d2c"
            ],
            7: [
              "#edf8fb",
              "#ccece6",
              "#99d8c9",
              "#66c2a4",
              "#41ae76",
              "#238b45",
              "#005824"
            ],
            8: [
              "#f7fcfd",
              "#e5f5f9",
              "#ccece6",
              "#99d8c9",
              "#66c2a4",
              "#41ae76",
              "#238b45",
              "#005824"
            ],
            9: [
              "#f7fcfd",
              "#e5f5f9",
              "#ccece6",
              "#99d8c9",
              "#66c2a4",
              "#41ae76",
              "#238b45",
              "#006d2c",
              "#00441b"
            ]
          },
          PuBuGn: {
            3: ["#ece2f0", "#a6bddb", "#1c9099"],
            4: ["#f6eff7", "#bdc9e1", "#67a9cf", "#02818a"],
            5: ["#f6eff7", "#bdc9e1", "#67a9cf", "#1c9099", "#016c59"],
            6: [
              "#f6eff7",
              "#d0d1e6",
              "#a6bddb",
              "#67a9cf",
              "#1c9099",
              "#016c59"
            ],
            7: [
              "#f6eff7",
              "#d0d1e6",
              "#a6bddb",
              "#67a9cf",
              "#3690c0",
              "#02818a",
              "#016450"
            ],
            8: [
              "#fff7fb",
              "#ece2f0",
              "#d0d1e6",
              "#a6bddb",
              "#67a9cf",
              "#3690c0",
              "#02818a",
              "#016450"
            ],
            9: [
              "#fff7fb",
              "#ece2f0",
              "#d0d1e6",
              "#a6bddb",
              "#67a9cf",
              "#3690c0",
              "#02818a",
              "#016c59",
              "#014636"
            ]
          },
          PuBu: {
            3: ["#ece7f2", "#a6bddb", "#2b8cbe"],
            4: ["#f1eef6", "#bdc9e1", "#74a9cf", "#0570b0"],
            5: ["#f1eef6", "#bdc9e1", "#74a9cf", "#2b8cbe", "#045a8d"],
            6: [
              "#f1eef6",
              "#d0d1e6",
              "#a6bddb",
              "#74a9cf",
              "#2b8cbe",
              "#045a8d"
            ],
            7: [
              "#f1eef6",
              "#d0d1e6",
              "#a6bddb",
              "#74a9cf",
              "#3690c0",
              "#0570b0",
              "#034e7b"
            ],
            8: [
              "#fff7fb",
              "#ece7f2",
              "#d0d1e6",
              "#a6bddb",
              "#74a9cf",
              "#3690c0",
              "#0570b0",
              "#034e7b"
            ],
            9: [
              "#fff7fb",
              "#ece7f2",
              "#d0d1e6",
              "#a6bddb",
              "#74a9cf",
              "#3690c0",
              "#0570b0",
              "#045a8d",
              "#023858"
            ]
          },
          BuPu: {
            3: ["#e0ecf4", "#9ebcda", "#8856a7"],
            4: ["#edf8fb", "#b3cde3", "#8c96c6", "#88419d"],
            5: ["#edf8fb", "#b3cde3", "#8c96c6", "#8856a7", "#810f7c"],
            6: [
              "#edf8fb",
              "#bfd3e6",
              "#9ebcda",
              "#8c96c6",
              "#8856a7",
              "#810f7c"
            ],
            7: [
              "#edf8fb",
              "#bfd3e6",
              "#9ebcda",
              "#8c96c6",
              "#8c6bb1",
              "#88419d",
              "#6e016b"
            ],
            8: [
              "#f7fcfd",
              "#e0ecf4",
              "#bfd3e6",
              "#9ebcda",
              "#8c96c6",
              "#8c6bb1",
              "#88419d",
              "#6e016b"
            ],
            9: [
              "#f7fcfd",
              "#e0ecf4",
              "#bfd3e6",
              "#9ebcda",
              "#8c96c6",
              "#8c6bb1",
              "#88419d",
              "#810f7c",
              "#4d004b"
            ]
          },
          RdPu: {
            3: ["#fde0dd", "#fa9fb5", "#c51b8a"],
            4: ["#feebe2", "#fbb4b9", "#f768a1", "#ae017e"],
            5: ["#feebe2", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177"],
            6: [
              "#feebe2",
              "#fcc5c0",
              "#fa9fb5",
              "#f768a1",
              "#c51b8a",
              "#7a0177"
            ],
            7: [
              "#feebe2",
              "#fcc5c0",
              "#fa9fb5",
              "#f768a1",
              "#dd3497",
              "#ae017e",
              "#7a0177"
            ],
            8: [
              "#fff7f3",
              "#fde0dd",
              "#fcc5c0",
              "#fa9fb5",
              "#f768a1",
              "#dd3497",
              "#ae017e",
              "#7a0177"
            ],
            9: [
              "#fff7f3",
              "#fde0dd",
              "#fcc5c0",
              "#fa9fb5",
              "#f768a1",
              "#dd3497",
              "#ae017e",
              "#7a0177",
              "#49006a"
            ]
          },
          PuRd: {
            3: ["#e7e1ef", "#c994c7", "#dd1c77"],
            4: ["#f1eef6", "#d7b5d8", "#df65b0", "#ce1256"],
            5: ["#f1eef6", "#d7b5d8", "#df65b0", "#dd1c77", "#980043"],
            6: [
              "#f1eef6",
              "#d4b9da",
              "#c994c7",
              "#df65b0",
              "#dd1c77",
              "#980043"
            ],
            7: [
              "#f1eef6",
              "#d4b9da",
              "#c994c7",
              "#df65b0",
              "#e7298a",
              "#ce1256",
              "#91003f"
            ],
            8: [
              "#f7f4f9",
              "#e7e1ef",
              "#d4b9da",
              "#c994c7",
              "#df65b0",
              "#e7298a",
              "#ce1256",
              "#91003f"
            ],
            9: [
              "#f7f4f9",
              "#e7e1ef",
              "#d4b9da",
              "#c994c7",
              "#df65b0",
              "#e7298a",
              "#ce1256",
              "#980043",
              "#67001f"
            ]
          },
          OrRd: {
            3: ["#fee8c8", "#fdbb84", "#e34a33"],
            4: ["#fef0d9", "#fdcc8a", "#fc8d59", "#d7301f"],
            5: ["#fef0d9", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000"],
            6: [
              "#fef0d9",
              "#fdd49e",
              "#fdbb84",
              "#fc8d59",
              "#e34a33",
              "#b30000"
            ],
            7: [
              "#fef0d9",
              "#fdd49e",
              "#fdbb84",
              "#fc8d59",
              "#ef6548",
              "#d7301f",
              "#990000"
            ],
            8: [
              "#fff7ec",
              "#fee8c8",
              "#fdd49e",
              "#fdbb84",
              "#fc8d59",
              "#ef6548",
              "#d7301f",
              "#990000"
            ],
            9: [
              "#fff7ec",
              "#fee8c8",
              "#fdd49e",
              "#fdbb84",
              "#fc8d59",
              "#ef6548",
              "#d7301f",
              "#b30000",
              "#7f0000"
            ]
          },
          YlOrRd: {
            3: ["#ffeda0", "#feb24c", "#f03b20"],
            4: ["#ffffb2", "#fecc5c", "#fd8d3c", "#e31a1c"],
            5: ["#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"],
            6: [
              "#ffffb2",
              "#fed976",
              "#feb24c",
              "#fd8d3c",
              "#f03b20",
              "#bd0026"
            ],
            7: [
              "#ffffb2",
              "#fed976",
              "#feb24c",
              "#fd8d3c",
              "#fc4e2a",
              "#e31a1c",
              "#b10026"
            ],
            8: [
              "#ffffcc",
              "#ffeda0",
              "#fed976",
              "#feb24c",
              "#fd8d3c",
              "#fc4e2a",
              "#e31a1c",
              "#b10026"
            ],
            9: [
              "#ffffcc",
              "#ffeda0",
              "#fed976",
              "#feb24c",
              "#fd8d3c",
              "#fc4e2a",
              "#e31a1c",
              "#bd0026",
              "#800026"
            ]
          },
          YlOrBr: {
            3: ["#fff7bc", "#fec44f", "#d95f0e"],
            4: ["#ffffd4", "#fed98e", "#fe9929", "#cc4c02"],
            5: ["#ffffd4", "#fed98e", "#fe9929", "#d95f0e", "#993404"],
            6: [
              "#ffffd4",
              "#fee391",
              "#fec44f",
              "#fe9929",
              "#d95f0e",
              "#993404"
            ],
            7: [
              "#ffffd4",
              "#fee391",
              "#fec44f",
              "#fe9929",
              "#ec7014",
              "#cc4c02",
              "#8c2d04"
            ],
            8: [
              "#ffffe5",
              "#fff7bc",
              "#fee391",
              "#fec44f",
              "#fe9929",
              "#ec7014",
              "#cc4c02",
              "#8c2d04"
            ],
            9: [
              "#ffffe5",
              "#fff7bc",
              "#fee391",
              "#fec44f",
              "#fe9929",
              "#ec7014",
              "#cc4c02",
              "#993404",
              "#662506"
            ]
          },
          Purples: {
            3: ["#efedf5", "#bcbddc", "#756bb1"],
            4: ["#f2f0f7", "#cbc9e2", "#9e9ac8", "#6a51a3"],
            5: ["#f2f0f7", "#cbc9e2", "#9e9ac8", "#756bb1", "#54278f"],
            6: [
              "#f2f0f7",
              "#dadaeb",
              "#bcbddc",
              "#9e9ac8",
              "#756bb1",
              "#54278f"
            ],
            7: [
              "#f2f0f7",
              "#dadaeb",
              "#bcbddc",
              "#9e9ac8",
              "#807dba",
              "#6a51a3",
              "#4a1486"
            ],
            8: [
              "#fcfbfd",
              "#efedf5",
              "#dadaeb",
              "#bcbddc",
              "#9e9ac8",
              "#807dba",
              "#6a51a3",
              "#4a1486"
            ],
            9: [
              "#fcfbfd",
              "#efedf5",
              "#dadaeb",
              "#bcbddc",
              "#9e9ac8",
              "#807dba",
              "#6a51a3",
              "#54278f",
              "#3f007d"
            ]
          },
          Blues: {
            3: ["#deebf7", "#9ecae1", "#3182bd"],
            4: ["#eff3ff", "#bdd7e7", "#6baed6", "#2171b5"],
            5: ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"],
            6: [
              "#eff3ff",
              "#c6dbef",
              "#9ecae1",
              "#6baed6",
              "#3182bd",
              "#08519c"
            ],
            7: [
              "#eff3ff",
              "#c6dbef",
              "#9ecae1",
              "#6baed6",
              "#4292c6",
              "#2171b5",
              "#084594"
            ],
            8: [
              "#f7fbff",
              "#deebf7",
              "#c6dbef",
              "#9ecae1",
              "#6baed6",
              "#4292c6",
              "#2171b5",
              "#084594"
            ],
            9: [
              "#f7fbff",
              "#deebf7",
              "#c6dbef",
              "#9ecae1",
              "#6baed6",
              "#4292c6",
              "#2171b5",
              "#08519c",
              "#08306b"
            ]
          },
          Greens: {
            3: ["#e5f5e0", "#a1d99b", "#31a354"],
            4: ["#edf8e9", "#bae4b3", "#74c476", "#238b45"],
            5: ["#edf8e9", "#bae4b3", "#74c476", "#31a354", "#006d2c"],
            6: [
              "#edf8e9",
              "#c7e9c0",
              "#a1d99b",
              "#74c476",
              "#31a354",
              "#006d2c"
            ],
            7: [
              "#edf8e9",
              "#c7e9c0",
              "#a1d99b",
              "#74c476",
              "#41ab5d",
              "#238b45",
              "#005a32"
            ],
            8: [
              "#f7fcf5",
              "#e5f5e0",
              "#c7e9c0",
              "#a1d99b",
              "#74c476",
              "#41ab5d",
              "#238b45",
              "#005a32"
            ],
            9: [
              "#f7fcf5",
              "#e5f5e0",
              "#c7e9c0",
              "#a1d99b",
              "#74c476",
              "#41ab5d",
              "#238b45",
              "#006d2c",
              "#00441b"
            ]
          },
          Oranges: {
            3: ["#fee6ce", "#fdae6b", "#e6550d"],
            4: ["#feedde", "#fdbe85", "#fd8d3c", "#d94701"],
            5: ["#feedde", "#fdbe85", "#fd8d3c", "#e6550d", "#a63603"],
            6: [
              "#feedde",
              "#fdd0a2",
              "#fdae6b",
              "#fd8d3c",
              "#e6550d",
              "#a63603"
            ],
            7: [
              "#feedde",
              "#fdd0a2",
              "#fdae6b",
              "#fd8d3c",
              "#f16913",
              "#d94801",
              "#8c2d04"
            ],
            8: [
              "#fff5eb",
              "#fee6ce",
              "#fdd0a2",
              "#fdae6b",
              "#fd8d3c",
              "#f16913",
              "#d94801",
              "#8c2d04"
            ],
            9: [
              "#fff5eb",
              "#fee6ce",
              "#fdd0a2",
              "#fdae6b",
              "#fd8d3c",
              "#f16913",
              "#d94801",
              "#a63603",
              "#7f2704"
            ]
          },
          Reds: {
            3: ["#fee0d2", "#fc9272", "#de2d26"],
            4: ["#fee5d9", "#fcae91", "#fb6a4a", "#cb181d"],
            5: ["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"],
            6: [
              "#fee5d9",
              "#fcbba1",
              "#fc9272",
              "#fb6a4a",
              "#de2d26",
              "#a50f15"
            ],
            7: [
              "#fee5d9",
              "#fcbba1",
              "#fc9272",
              "#fb6a4a",
              "#ef3b2c",
              "#cb181d",
              "#99000d"
            ],
            8: [
              "#fff5f0",
              "#fee0d2",
              "#fcbba1",
              "#fc9272",
              "#fb6a4a",
              "#ef3b2c",
              "#cb181d",
              "#99000d"
            ],
            9: [
              "#fff5f0",
              "#fee0d2",
              "#fcbba1",
              "#fc9272",
              "#fb6a4a",
              "#ef3b2c",
              "#cb181d",
              "#a50f15",
              "#67000d"
            ]
          },
          Greys: {
            3: ["#f0f0f0", "#bdbdbd", "#636363"],
            4: ["#f7f7f7", "#cccccc", "#969696", "#525252"],
            5: ["#f7f7f7", "#cccccc", "#969696", "#636363", "#252525"],
            6: [
              "#f7f7f7",
              "#d9d9d9",
              "#bdbdbd",
              "#969696",
              "#636363",
              "#252525"
            ],
            7: [
              "#f7f7f7",
              "#d9d9d9",
              "#bdbdbd",
              "#969696",
              "#737373",
              "#525252",
              "#252525"
            ],
            8: [
              "#ffffff",
              "#f0f0f0",
              "#d9d9d9",
              "#bdbdbd",
              "#969696",
              "#737373",
              "#525252",
              "#252525"
            ],
            9: [
              "#ffffff",
              "#f0f0f0",
              "#d9d9d9",
              "#bdbdbd",
              "#969696",
              "#737373",
              "#525252",
              "#252525",
              "#000000"
            ]
          },
          PuOr: {
            3: ["#f1a340", "#f7f7f7", "#998ec3"],
            4: ["#e66101", "#fdb863", "#b2abd2", "#5e3c99"],
            5: ["#e66101", "#fdb863", "#f7f7f7", "#b2abd2", "#5e3c99"],
            6: [
              "#b35806",
              "#f1a340",
              "#fee0b6",
              "#d8daeb",
              "#998ec3",
              "#542788"
            ],
            7: [
              "#b35806",
              "#f1a340",
              "#fee0b6",
              "#f7f7f7",
              "#d8daeb",
              "#998ec3",
              "#542788"
            ],
            8: [
              "#b35806",
              "#e08214",
              "#fdb863",
              "#fee0b6",
              "#d8daeb",
              "#b2abd2",
              "#8073ac",
              "#542788"
            ],
            9: [
              "#b35806",
              "#e08214",
              "#fdb863",
              "#fee0b6",
              "#f7f7f7",
              "#d8daeb",
              "#b2abd2",
              "#8073ac",
              "#542788"
            ],
            10: [
              "#7f3b08",
              "#b35806",
              "#e08214",
              "#fdb863",
              "#fee0b6",
              "#d8daeb",
              "#b2abd2",
              "#8073ac",
              "#542788",
              "#2d004b"
            ],
            11: [
              "#7f3b08",
              "#b35806",
              "#e08214",
              "#fdb863",
              "#fee0b6",
              "#f7f7f7",
              "#d8daeb",
              "#b2abd2",
              "#8073ac",
              "#542788",
              "#2d004b"
            ]
          },
          BrBG: {
            3: ["#d8b365", "#f5f5f5", "#5ab4ac"],
            4: ["#a6611a", "#dfc27d", "#80cdc1", "#018571"],
            5: ["#a6611a", "#dfc27d", "#f5f5f5", "#80cdc1", "#018571"],
            6: [
              "#8c510a",
              "#d8b365",
              "#f6e8c3",
              "#c7eae5",
              "#5ab4ac",
              "#01665e"
            ],
            7: [
              "#8c510a",
              "#d8b365",
              "#f6e8c3",
              "#f5f5f5",
              "#c7eae5",
              "#5ab4ac",
              "#01665e"
            ],
            8: [
              "#8c510a",
              "#bf812d",
              "#dfc27d",
              "#f6e8c3",
              "#c7eae5",
              "#80cdc1",
              "#35978f",
              "#01665e"
            ],
            9: [
              "#8c510a",
              "#bf812d",
              "#dfc27d",
              "#f6e8c3",
              "#f5f5f5",
              "#c7eae5",
              "#80cdc1",
              "#35978f",
              "#01665e"
            ],
            10: [
              "#543005",
              "#8c510a",
              "#bf812d",
              "#dfc27d",
              "#f6e8c3",
              "#c7eae5",
              "#80cdc1",
              "#35978f",
              "#01665e",
              "#003c30"
            ],
            11: [
              "#543005",
              "#8c510a",
              "#bf812d",
              "#dfc27d",
              "#f6e8c3",
              "#f5f5f5",
              "#c7eae5",
              "#80cdc1",
              "#35978f",
              "#01665e",
              "#003c30"
            ]
          },
          PRGn: {
            3: ["#af8dc3", "#f7f7f7", "#7fbf7b"],
            4: ["#7b3294", "#c2a5cf", "#a6dba0", "#008837"],
            5: ["#7b3294", "#c2a5cf", "#f7f7f7", "#a6dba0", "#008837"],
            6: [
              "#762a83",
              "#af8dc3",
              "#e7d4e8",
              "#d9f0d3",
              "#7fbf7b",
              "#1b7837"
            ],
            7: [
              "#762a83",
              "#af8dc3",
              "#e7d4e8",
              "#f7f7f7",
              "#d9f0d3",
              "#7fbf7b",
              "#1b7837"
            ],
            8: [
              "#762a83",
              "#9970ab",
              "#c2a5cf",
              "#e7d4e8",
              "#d9f0d3",
              "#a6dba0",
              "#5aae61",
              "#1b7837"
            ],
            9: [
              "#762a83",
              "#9970ab",
              "#c2a5cf",
              "#e7d4e8",
              "#f7f7f7",
              "#d9f0d3",
              "#a6dba0",
              "#5aae61",
              "#1b7837"
            ],
            10: [
              "#40004b",
              "#762a83",
              "#9970ab",
              "#c2a5cf",
              "#e7d4e8",
              "#d9f0d3",
              "#a6dba0",
              "#5aae61",
              "#1b7837",
              "#00441b"
            ],
            11: [
              "#40004b",
              "#762a83",
              "#9970ab",
              "#c2a5cf",
              "#e7d4e8",
              "#f7f7f7",
              "#d9f0d3",
              "#a6dba0",
              "#5aae61",
              "#1b7837",
              "#00441b"
            ]
          },
          PiYG: {
            3: ["#e9a3c9", "#f7f7f7", "#a1d76a"],
            4: ["#d01c8b", "#f1b6da", "#b8e186", "#4dac26"],
            5: ["#d01c8b", "#f1b6da", "#f7f7f7", "#b8e186", "#4dac26"],
            6: [
              "#c51b7d",
              "#e9a3c9",
              "#fde0ef",
              "#e6f5d0",
              "#a1d76a",
              "#4d9221"
            ],
            7: [
              "#c51b7d",
              "#e9a3c9",
              "#fde0ef",
              "#f7f7f7",
              "#e6f5d0",
              "#a1d76a",
              "#4d9221"
            ],
            8: [
              "#c51b7d",
              "#de77ae",
              "#f1b6da",
              "#fde0ef",
              "#e6f5d0",
              "#b8e186",
              "#7fbc41",
              "#4d9221"
            ],
            9: [
              "#c51b7d",
              "#de77ae",
              "#f1b6da",
              "#fde0ef",
              "#f7f7f7",
              "#e6f5d0",
              "#b8e186",
              "#7fbc41",
              "#4d9221"
            ],
            10: [
              "#8e0152",
              "#c51b7d",
              "#de77ae",
              "#f1b6da",
              "#fde0ef",
              "#e6f5d0",
              "#b8e186",
              "#7fbc41",
              "#4d9221",
              "#276419"
            ],
            11: [
              "#8e0152",
              "#c51b7d",
              "#de77ae",
              "#f1b6da",
              "#fde0ef",
              "#f7f7f7",
              "#e6f5d0",
              "#b8e186",
              "#7fbc41",
              "#4d9221",
              "#276419"
            ]
          },
          RdBu: {
            3: ["#ef8a62", "#f7f7f7", "#67a9cf"],
            4: ["#ca0020", "#f4a582", "#92c5de", "#0571b0"],
            5: ["#ca0020", "#f4a582", "#f7f7f7", "#92c5de", "#0571b0"],
            6: [
              "#b2182b",
              "#ef8a62",
              "#fddbc7",
              "#d1e5f0",
              "#67a9cf",
              "#2166ac"
            ],
            7: [
              "#b2182b",
              "#ef8a62",
              "#fddbc7",
              "#f7f7f7",
              "#d1e5f0",
              "#67a9cf",
              "#2166ac"
            ],
            8: [
              "#b2182b",
              "#d6604d",
              "#f4a582",
              "#fddbc7",
              "#d1e5f0",
              "#92c5de",
              "#4393c3",
              "#2166ac"
            ],
            9: [
              "#b2182b",
              "#d6604d",
              "#f4a582",
              "#fddbc7",
              "#f7f7f7",
              "#d1e5f0",
              "#92c5de",
              "#4393c3",
              "#2166ac"
            ],
            10: [
              "#67001f",
              "#b2182b",
              "#d6604d",
              "#f4a582",
              "#fddbc7",
              "#d1e5f0",
              "#92c5de",
              "#4393c3",
              "#2166ac",
              "#053061"
            ],
            11: [
              "#67001f",
              "#b2182b",
              "#d6604d",
              "#f4a582",
              "#fddbc7",
              "#f7f7f7",
              "#d1e5f0",
              "#92c5de",
              "#4393c3",
              "#2166ac",
              "#053061"
            ]
          },
          RdGy: {
            3: ["#ef8a62", "#ffffff", "#999999"],
            4: ["#ca0020", "#f4a582", "#bababa", "#404040"],
            5: ["#ca0020", "#f4a582", "#ffffff", "#bababa", "#404040"],
            6: [
              "#b2182b",
              "#ef8a62",
              "#fddbc7",
              "#e0e0e0",
              "#999999",
              "#4d4d4d"
            ],
            7: [
              "#b2182b",
              "#ef8a62",
              "#fddbc7",
              "#ffffff",
              "#e0e0e0",
              "#999999",
              "#4d4d4d"
            ],
            8: [
              "#b2182b",
              "#d6604d",
              "#f4a582",
              "#fddbc7",
              "#e0e0e0",
              "#bababa",
              "#878787",
              "#4d4d4d"
            ],
            9: [
              "#b2182b",
              "#d6604d",
              "#f4a582",
              "#fddbc7",
              "#ffffff",
              "#e0e0e0",
              "#bababa",
              "#878787",
              "#4d4d4d"
            ],
            10: [
              "#67001f",
              "#b2182b",
              "#d6604d",
              "#f4a582",
              "#fddbc7",
              "#e0e0e0",
              "#bababa",
              "#878787",
              "#4d4d4d",
              "#1a1a1a"
            ],
            11: [
              "#67001f",
              "#b2182b",
              "#d6604d",
              "#f4a582",
              "#fddbc7",
              "#ffffff",
              "#e0e0e0",
              "#bababa",
              "#878787",
              "#4d4d4d",
              "#1a1a1a"
            ]
          },
          RdYlBu: {
            3: ["#fc8d59", "#ffffbf", "#91bfdb"],
            4: ["#d7191c", "#fdae61", "#abd9e9", "#2c7bb6"],
            5: ["#d7191c", "#fdae61", "#ffffbf", "#abd9e9", "#2c7bb6"],
            6: [
              "#d73027",
              "#fc8d59",
              "#fee090",
              "#e0f3f8",
              "#91bfdb",
              "#4575b4"
            ],
            7: [
              "#d73027",
              "#fc8d59",
              "#fee090",
              "#ffffbf",
              "#e0f3f8",
              "#91bfdb",
              "#4575b4"
            ],
            8: [
              "#d73027",
              "#f46d43",
              "#fdae61",
              "#fee090",
              "#e0f3f8",
              "#abd9e9",
              "#74add1",
              "#4575b4"
            ],
            9: [
              "#d73027",
              "#f46d43",
              "#fdae61",
              "#fee090",
              "#ffffbf",
              "#e0f3f8",
              "#abd9e9",
              "#74add1",
              "#4575b4"
            ],
            10: [
              "#a50026",
              "#d73027",
              "#f46d43",
              "#fdae61",
              "#fee090",
              "#e0f3f8",
              "#abd9e9",
              "#74add1",
              "#4575b4",
              "#313695"
            ],
            11: [
              "#a50026",
              "#d73027",
              "#f46d43",
              "#fdae61",
              "#fee090",
              "#ffffbf",
              "#e0f3f8",
              "#abd9e9",
              "#74add1",
              "#4575b4",
              "#313695"
            ]
          },
          Spectral: {
            3: ["#fc8d59", "#ffffbf", "#99d594"],
            4: ["#d7191c", "#fdae61", "#abdda4", "#2b83ba"],
            5: ["#d7191c", "#fdae61", "#ffffbf", "#abdda4", "#2b83ba"],
            6: [
              "#d53e4f",
              "#fc8d59",
              "#fee08b",
              "#e6f598",
              "#99d594",
              "#3288bd"
            ],
            7: [
              "#d53e4f",
              "#fc8d59",
              "#fee08b",
              "#ffffbf",
              "#e6f598",
              "#99d594",
              "#3288bd"
            ],
            8: [
              "#d53e4f",
              "#f46d43",
              "#fdae61",
              "#fee08b",
              "#e6f598",
              "#abdda4",
              "#66c2a5",
              "#3288bd"
            ],
            9: [
              "#d53e4f",
              "#f46d43",
              "#fdae61",
              "#fee08b",
              "#ffffbf",
              "#e6f598",
              "#abdda4",
              "#66c2a5",
              "#3288bd"
            ],
            10: [
              "#9e0142",
              "#d53e4f",
              "#f46d43",
              "#fdae61",
              "#fee08b",
              "#e6f598",
              "#abdda4",
              "#66c2a5",
              "#3288bd",
              "#5e4fa2"
            ],
            11: [
              "#9e0142",
              "#d53e4f",
              "#f46d43",
              "#fdae61",
              "#fee08b",
              "#ffffbf",
              "#e6f598",
              "#abdda4",
              "#66c2a5",
              "#3288bd",
              "#5e4fa2"
            ]
          },
          RdYlGn: {
            3: ["#fc8d59", "#ffffbf", "#91cf60"],
            4: ["#d7191c", "#fdae61", "#a6d96a", "#1a9641"],
            5: ["#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641"],
            6: [
              "#d73027",
              "#fc8d59",
              "#fee08b",
              "#d9ef8b",
              "#91cf60",
              "#1a9850"
            ],
            7: [
              "#d73027",
              "#fc8d59",
              "#fee08b",
              "#ffffbf",
              "#d9ef8b",
              "#91cf60",
              "#1a9850"
            ],
            8: [
              "#d73027",
              "#f46d43",
              "#fdae61",
              "#fee08b",
              "#d9ef8b",
              "#a6d96a",
              "#66bd63",
              "#1a9850"
            ],
            9: [
              "#d73027",
              "#f46d43",
              "#fdae61",
              "#fee08b",
              "#ffffbf",
              "#d9ef8b",
              "#a6d96a",
              "#66bd63",
              "#1a9850"
            ],
            10: [
              "#a50026",
              "#d73027",
              "#f46d43",
              "#fdae61",
              "#fee08b",
              "#d9ef8b",
              "#a6d96a",
              "#66bd63",
              "#1a9850",
              "#006837"
            ],
            11: [
              "#a50026",
              "#d73027",
              "#f46d43",
              "#fdae61",
              "#fee08b",
              "#ffffbf",
              "#d9ef8b",
              "#a6d96a",
              "#66bd63",
              "#1a9850",
              "#006837"
            ]
          }
        };
      },
      {}
    ],
    118: [
      function(t, e, i) {
        e.exports = function(t) {
          var e = (function() {
            var t = window.documentMode;
            return "onhashchange" in window && (void 0 === t || t > 7);
          })();
          (t.Hash = function(e) {
            (this.onHashChange = t.Util.bind(this.onHashChange, this)), e &&
              this.init(e);
          }), (t.Hash.parseHash = function(e) {
            0 === e.indexOf("#") && (e = e.substr(1));
            var i = e.split("/");
            if (3 == i.length) {
              var n = parseInt(i[0], 10),
                s = parseFloat(i[1]),
                o = parseFloat(i[2]);
              return isNaN(n) || isNaN(s) || isNaN(o)
                ? !1
                : { center: new t.LatLng(s, o), zoom: n };
            }
            return !1;
          }), (t.Hash.formatHash = function(t) {
            var e = t.getCenter(),
              i = t.getZoom(),
              n = Math.max(0, Math.ceil(Math.log(i) / Math.LN2));
            return "#" + [i, e.lat.toFixed(n), e.lng.toFixed(n)].join("/");
          }), (t.Hash.prototype = {
            map: null,
            lastHash: null,
            parseHash: t.Hash.parseHash,
            formatHash: t.Hash.formatHash,
            init: function(t) {
              (this.map = t), (this.lastHash = null), this.onHashChange(), this
                .isListening || this.startListening();
            },
            remove: function() {
              this.changeTimeout && clearTimeout(this.changeTimeout), this
                .isListening && this.stopListening(), (this.map = null);
            },
            onMapMove: function() {
              if (this.movingMap || !this.map._loaded) return !1;
              var t = this.formatHash(this.map);
              this.lastHash != t && (location.replace(t), (this.lastHash = t));
            },
            movingMap: !1,
            update: function() {
              var t = location.hash;
              if (t !== this.lastHash) {
                var e = this.parseHash(t);
                e
                  ? (
                      (this.movingMap = !0),
                      this.map.setView(e.center, e.zoom),
                      (this.movingMap = !1)
                    )
                  : this.onMapMove(this.map);
              }
            },
            changeDefer: 100,
            changeTimeout: null,
            onHashChange: function() {
              if (!this.changeTimeout) {
                var t = this;
                this.changeTimeout = setTimeout(function() {
                  t.update(), (t.changeTimeout = null);
                }, this.changeDefer);
              }
            },
            isListening: !1,
            hashChangeInterval: null,
            startListening: function() {
              this.map.on("moveend", this.onMapMove, this), e
                ? t.DomEvent.addListener(
                    window,
                    "hashchange",
                    this.onHashChange
                  )
                : (
                    clearInterval(this.hashChangeInterval),
                    (this.hashChangeInterval = setInterval(
                      this.onHashChange,
                      50
                    ))
                  ), (this.isListening = !0);
            },
            stopListening: function() {
              this.map.off("moveend", this.onMapMove, this), e
                ? t.DomEvent.removeListener(
                    window,
                    "hashchange",
                    this.onHashChange
                  )
                : clearInterval(
                    this.hashChangeInterval
                  ), (this.isListening = !1);
            }
          }), (t.hash = function(e) {
            return new t.Hash(e);
          }), (t.Map.prototype.addHash = function() {
            this._hash = t.hash(this);
          }), (t.Map.prototype.removeHash = function() {
            this._hash.remove();
          });
        };
      },
      {}
    ],
    119: [
      function(t, e, i) {
        e.exports = function(e) {
          t("./leaflet.hash")(
            e
          ), (e.Control.Layers.prototype._addItem = function(t) {
            var i,
              n = document.createElement("label"),
              s = this._map.hasLayer(t.layer);
            t.overlay
              ? (
                  (i = document.createElement("input")),
                  (i.type = "checkbox"),
                  (i.className = "leaflet-control-layers-selector"),
                  (i.defaultChecked = s)
                )
              : (i = this._createRadioElement(
                  "leaflet-base-layers",
                  s
                )), (i.layerId = e.stamp(t.layer)), e.DomEvent.on(
              i,
              "click",
              this._onInputClick,
              this
            );
            var o = document.createElement("span");
            (o.innerHTML = " " + t.name), n.appendChild(i), n.appendChild(
              o
            ), (n.className = t.overlay ? "checkbox" : "radio");
            var a = t.overlay ? this._overlaysList : this._baseLayersList;
            return a.appendChild(n), n;
          });
          var i = e.map("map", { zoomControl: !1 });
          location.hash || i.setView([6.25239070882758, -75.57365707863067], 10), i.addHash();
          var n = e.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
              attribution:
                'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
            }
          );
          return n.addTo(i), i;
        };
      },
      { "./leaflet.hash": 118 }
    ],
    120: [
      function(t, e, i) {
        function n(t) {
          return h.Spectral[11][
            Math.abs(
              JSON.stringify(t).split("").reduce(function(t, e) {
                return (t = (t << 5) - t + e.charCodeAt(0)), t & t;
              }, 0)
            ) % 11
          ];
        }
        function s() {
          var t = o.DomUtil.create("form", "bgroup");
          t.id = "dropzone";
          var e = o.DomUtil.create("div", "btn-group", t),
            i = o.DomUtil.create("button", "btn  btn-inverse span3", e);
          (i.type = "button"), (i.innerHTML =
            "select a zipped .GDB"), o.DomEvent.addListener(
            i,
            "click",
            function() {
              c.click();
            }
          );
          var n = o.DomUtil.create("button", "btn  btn-inverse span3", e);
          return (n.type = "button"), (n.innerHTML =
            "upload the files in a .GDB folder"), o.DomEvent.addListener(
            n,
            "click",
            function() {
              u.click();
            }
          ), t;
        }
        var o = t("leaflet"),
          a = t("./mapSetup")(o),
          r = t("../lib/index"),
          h = t("./colorbrewer"),
          c = document.getElementById("upload"),
          u = document.getElementById("uploadDir");
        c.addEventListener("change", function() {
          var t = c.files[0],
            e = new FileReader();
          (e.onload = function() {
            r(e.result).then(function(t) {
              for (var e in t) l.addOverlay(o.geoJson(t[e], f).addTo(a), e);
            });
          }), e.readAsArrayBuffer(t);
        }), u.addEventListener("change", function() {
          r(u.files).then(function(t) {
            for (var e in t) l.addOverlay(o.geoJson(t[e], f).addTo(a), e);
          });
        });
        var l = o.control.layers({}, {}, { collapsed: !1 }).addTo(a),
          f = {
            onEachFeature: function(t, e) {
              t.properties &&
                e.bindPopup(
                  Object.keys(t.properties)
                    .map(function(e) {
                      return e + ": " + t.properties[e];
                    })
                    .join("<br />"),
                  { maxHeight: 200 }
                );
            },
            style: function(t) {
              return { opacity: 1, fillOpacity: 0.7, radius: 6, color: n(t) };
            },
            pointToLayer: function(t, e) {
              return o.circleMarker(e, {
                opacity: 1,
                fillOpacity: 0.7,
                color: n(t)
              });
            }
          },
          d = o.Control.extend({ options: { position: "topleft" }, onAdd: s });
        a.addControl(new d());
      },
      {
        "../lib/index": 8,
        "./colorbrewer": 117,
        "./mapSetup": 119,
        leaflet: 39
      }
    ]
  },
  {},
  [120]
);
