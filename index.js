var e;
e || (e = typeof Module !== 'undefined' ? Module : {});
var aa = {},
	ba;
for (ba in e) e.hasOwnProperty(ba) && (aa[ba] = e[ba]);
e.arguments = [];
e.thisProgram = "./this.program";
e.quit = function (a, b) {
	throw b;
};
e.preRun = [];
e.postRun = [];
var ca = !1,
	fa = !1,
	ha = !1,
	ia = !1;
ca = "object" === typeof window;
fa = "function" === typeof importScripts;
ha = "object" === typeof process && "function" === typeof require && !ca && !fa;
ia = !ca && !ha && !fa;
if (e.ENVIRONMENT) throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
var ja = "";

function ka(a) {
	return e.locateFile ? e.locateFile(a, ja) : ja + a
}
if (ha) {
	ja = __dirname + "/";
	var la, ma;
	e.read = function (a, b) {
		la || (la = require("fs"));
		ma || (ma = require("path"));
		a = ma.normalize(a);
		a = la.readFileSync(a);
		return b ? a : a.toString()
	};
	e.readBinary = function (a) {
		a = e.read(a, !0);
		a.buffer || (a = new Uint8Array(a));
		assert(a.buffer);
		return a
	};
	1 < process.argv.length && (e.thisProgram = process.argv[1].replace(/\\/g, "/"));
	e.arguments = process.argv.slice(2);
	"undefined" !== typeof module && (module.exports = e);
	process.on("uncaughtException", function (a) {
		if (!(a instanceof na)) throw a;
	});
	process.on("unhandledRejection",
		k);
	e.quit = function (a) {
		process.exit(a)
	};
	e.inspect = function () {
		return "[Emscripten Module object]"
	}
} else if (ia) "undefined" != typeof read && (e.read = function (a) {
	return read(a)
}), e.readBinary = function (a) {
	if ("function" === typeof readbuffer) return new Uint8Array(readbuffer(a));
	a = read(a, "binary");
	assert("object" === typeof a);
	return a
}, "undefined" != typeof scriptArgs ? e.arguments = scriptArgs : "undefined" != typeof arguments && (e.arguments = arguments), "function" === typeof quit && (e.quit = function (a) {
	quit(a)
});
else if (ca || fa) fa ?
	ja = self.location.href : document.currentScript && (ja = document.currentScript.src), ja = 0 !== ja.indexOf("blob:") ? ja.substr(0, ja.lastIndexOf("/") + 1) : "", e.read = function (a) {
		var b = new XMLHttpRequest;
		b.open("GET", a, !1);
		b.send(null);
		return b.responseText
	}, fa && (e.readBinary = function (a) {
		var b = new XMLHttpRequest;
		b.open("GET", a, !1);
		b.responseType = "arraybuffer";
		b.send(null);
		return new Uint8Array(b.response)
	}), e.readAsync = function (a, b, c) {
		var d = new XMLHttpRequest;
		d.open("GET", a, !0);
		d.responseType = "arraybuffer";
		d.onload =
			function () {
				200 == d.status || 0 == d.status && d.response ? b(d.response) : c()
			};
		d.onerror = c;
		d.send(null)
	}, e.setWindowTitle = function (a) {
		document.title = a
	};
else throw Error("environment detection error");
var oa = e.print || ("undefined" !== typeof console ? console.log.bind(console) : "undefined" !== typeof print ? print : null),
	l = e.printErr || ("undefined" !== typeof printErr ? printErr : "undefined" !== typeof console && console.warn.bind(console) || oa);
for (ba in aa) aa.hasOwnProperty(ba) && (e[ba] = aa[ba]);
aa = void 0;
assert("undefined" === typeof e.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" === typeof e.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" === typeof e.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" === typeof e.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
pa = qa = ra = function () {
	k("cannot use the stack before compiled code is ready to run, and has provided stack access")
};

function sa(a) {
	var b;
	b || (b = 16);
	return Math.ceil(a / b) * b
}

function ta(a) {
	ua || (ua = {});
	ua[a] || (ua[a] = 1, l(a))
}
var ua, va = {
		"f64-rem": function (a, b) {
			return a % b
		},
		"debugger": function () {
			debugger
		}
	},
	wa = !1;

function assert(a, b) {
	a || k("Assertion failed: " + b)
}

function xa(a, b) {
	if (0 === b || !a) return "";
	for (var c = 0, d, f = 0;;) {
		assert(a + f < m);
		d = n[a + f >> 0];
		c |= d;
		if (0 == d && !b) break;
		f++;
		if (b && f == b) break
	}
	b || (b = f);
	d = "";
	if (128 > c) {
		for (; 0 < b;) c = String.fromCharCode.apply(String, n.subarray(a, a + Math.min(b, 1024))), d = d ? d + c : c, a += 1024, b -= 1024;
		return d
	}
	return ya(n, a)
}
var za = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;

function ya(a, b) {
	for (var c = b; a[c];) ++c;
	if (16 < c - b && a.subarray && za) return za.decode(a.subarray(b, c));
	for (c = "";;) {
		var d = a[b++];
		if (!d) return c;
		if (d & 128) {
			var f = a[b++] & 63;
			if (192 == (d & 224)) c += String.fromCharCode((d & 31) << 6 | f);
			else {
				var g = a[b++] & 63;
				if (224 == (d & 240)) d = (d & 15) << 12 | f << 6 | g;
				else {
					var h = a[b++] & 63;
					if (240 == (d & 248)) d = (d & 7) << 18 | f << 12 | g << 6 | h;
					else {
						var r = a[b++] & 63;
						if (248 == (d & 252)) d = (d & 3) << 24 | f << 18 | g << 12 | h << 6 | r;
						else {
							var x = a[b++] & 63;
							d = (d & 1) << 30 | f << 24 | g << 18 | h << 12 | r << 6 | x
						}
					}
				}
				65536 > d ? c += String.fromCharCode(d) : (d -=
					65536, c += String.fromCharCode(55296 | d >> 10, 56320 | d & 1023))
			}
		} else c += String.fromCharCode(d)
	}
}

function Aa(a, b, c, d) {
	if (!(0 < d)) return 0;
	var f = c;
	d = c + d - 1;
	for (var g = 0; g < a.length; ++g) {
		var h = a.charCodeAt(g);
		if (55296 <= h && 57343 >= h) {
			var r = a.charCodeAt(++g);
			h = 65536 + ((h & 1023) << 10) | r & 1023
		}
		if (127 >= h) {
			if (c >= d) break;
			b[c++] = h
		} else {
			if (2047 >= h) {
				if (c + 1 >= d) break;
				b[c++] = 192 | h >> 6
			} else {
				if (65535 >= h) {
					if (c + 2 >= d) break;
					b[c++] = 224 | h >> 12
				} else {
					if (2097151 >= h) {
						if (c + 3 >= d) break;
						b[c++] = 240 | h >> 18
					} else {
						if (67108863 >= h) {
							if (c + 4 >= d) break;
							b[c++] = 248 | h >> 24
						} else {
							if (c + 5 >= d) break;
							b[c++] = 252 | h >> 30;
							b[c++] = 128 | h >> 24 & 63
						}
						b[c++] = 128 | h >> 18 & 63
					}
					b[c++] =
						128 | h >> 12 & 63
				}
				b[c++] = 128 | h >> 6 & 63
			}
			b[c++] = 128 | h & 63
		}
	}
	b[c] = 0;
	return c - f
}

function Ba(a, b, c) {
	assert("number" == typeof c, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
	return Aa(a, n, b, c)
}

function Ca(a) {
	for (var b = 0, c = 0; c < a.length; ++c) {
		var d = a.charCodeAt(c);
		55296 <= d && 57343 >= d && (d = 65536 + ((d & 1023) << 10) | a.charCodeAt(++c) & 1023);
		127 >= d ? ++b : b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : 2097151 >= d ? b + 4 : 67108863 >= d ? b + 5 : b + 6
	}
	return b
}
"undefined" !== typeof TextDecoder && new TextDecoder("utf-16le");

function Da(a) {
	var b = Ca(a) + 1,
		c = ra(b);
	Aa(a, Ea, c, b);
	return c
}

function Ga(a) {
	return a.replace(/__Z[\w\d_]+/g, function (a) {
		a: {
			var b = e.___cxa_demangle || e.__cxa_demangle;assert(b);
			try {
				var d = a;
				d.startsWith("__Z") && (d = d.substr(1));
				var f = Ca(d) + 1,
					g = Ha(f);
				Ba(d, g, f);
				var h = Ha(4),
					r = b(g, 0, 0, h);
				if (0 === p[h >> 2] && r) {
					var x = xa(r);
					break a
				}
			} catch (u) {} finally {
				g && Ia(g), h && Ia(h), r && Ia(r)
			}
			x = a
		}
		return a === x ? a : x + " [" + a + "]"
	})
}

function Ja() {
	a: {
		var a = Error();
		if (!a.stack) {
			try {
				throw Error(0);
			} catch (b) {
				a = b
			}
			if (!a.stack) {
				a = "(no stack trace available)";
				break a
			}
		}
		a = a.stack.toString()
	}
	e.extraStackTrace && (a += "\n" + e.extraStackTrace());
	return Ga(a)
}

function Ka(a, b) {
	0 < a % b && (a += b - a % b);
	return a
}
var buffer, Ea, n, La, Ma, p, Na, Oa, Qa;

function Ra() {
	e.HEAP8 = Ea = new Int8Array(buffer);
	e.HEAP16 = La = new Int16Array(buffer);
	e.HEAP32 = p = new Int32Array(buffer);
	e.HEAPU8 = n = new Uint8Array(buffer);
	e.HEAPU16 = Ma = new Uint16Array(buffer);
	e.HEAPU32 = Na = new Uint32Array(buffer);
	e.HEAPF32 = Oa = new Float32Array(buffer);
	e.HEAPF64 = Qa = new Float64Array(buffer)
}
var Sa, Ta, Ua, Va, Wa, Xa, Ya, Za;
Sa = Ta = Va = Wa = Xa = Ya = Za = 0;
Ua = !1;

function $a() {
	34821223 == Na[(Xa >> 2) - 1] && 2310721022 == Na[(Xa >> 2) - 2] || k("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x" + Na[(Xa >> 2) - 2].toString(16) + " " + Na[(Xa >> 2) - 1].toString(16));
	if (1668509029 !== p[0]) throw "Runtime error: The application has corrupted its heap memory area (address zero)!";
}
e.reallocBuffer || (e.reallocBuffer = function (a) {
	try {
		var b = Ea;
		var c = new ArrayBuffer(a);
		(new Int8Array(c)).set(b)
	} catch (d) {
		return !1
	}
	return ab(c) ? c : !1
});
var bb;
try {
	bb = Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get), bb(new ArrayBuffer(4))
} catch (a) {
	bb = function (b) {
		return b.byteLength
	}
}
var cb = e.TOTAL_STACK || 5242880,
	m = e.TOTAL_MEMORY || 16777216;
m < cb && l("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + m + "! (TOTAL_STACK=" + cb + ")");
assert("undefined" !== typeof Int32Array && "undefined" !== typeof Float64Array && void 0 !== Int32Array.prototype.subarray && void 0 !== Int32Array.prototype.set, "JS engine does not provide full typed array support");
e.buffer ? (buffer = e.buffer, assert(buffer.byteLength === m, "provided buffer should be " + m + " bytes, but it is " + buffer.byteLength)) : ("object" === typeof WebAssembly && "function" === typeof WebAssembly.Memory ? (assert(0 === m % 65536), e.wasmMemory = new WebAssembly.Memory({
	initial: m / 65536
}), buffer = e.wasmMemory.buffer) : buffer = new ArrayBuffer(m), assert(buffer.byteLength === m), e.buffer = buffer);
Ra();
p[0] = 1668509029;
La[1] = 25459;
if (115 !== n[2] || 99 !== n[3]) throw "Runtime error: expected the system to be little-endian!";

function db(a) {
	for (; 0 < a.length;) {
		var b = a.shift();
		if ("function" == typeof b) b();
		else {
			var c = b.uc;
			"number" === typeof c ? void 0 === b.Lc ? e.dynCall_v(c) : e.dynCall_vi(c, b.Lc) : c(void 0 === b.Lc ? null : b.Lc)
		}
	}
}
var fb = [],
	gb = [],
	hb = [],
	ib = [],
	jb = [],
	q = !1,
	t = !1;

function kb() {
	$a();
	q || (q = !0, db(gb))
}

function lb() {
	var a = e.preRun.shift();
	fb.unshift(a)
}

function mb(a, b) {
	assert(0 <= a.length, "writeArrayToMemory array must have a length (should be an array or typed array)");
	Ea.set(a, b)
}
assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var nb = 0,
	ob = null,
	pb = null,
	qb = {};

function rb() {
	nb++;
	e.monitorRunDependencies && e.monitorRunDependencies(nb);
	assert(!qb["wasm-instantiate"]);
	qb["wasm-instantiate"] = 1;
	null === ob && "undefined" !== typeof setInterval && (ob = setInterval(function () {
		if (wa) clearInterval(ob), ob = null;
		else {
			var a = !1,
				b;
			for (b in qb) a || (a = !0, l("still waiting on run dependencies:")), l("dependency: " + b);
			a && l("(end of list)")
		}
	}, 1E4))
}
e.preloadedImages = {};
e.preloadedAudios = {};

function sb(a) {
	return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,")
}
(function () {
	function a() {
		try {
			if (e.wasmBinary) return new Uint8Array(e.wasmBinary);
			if (e.readBinary) return e.readBinary(f);
			throw "both async and sync fetching of the wasm failed";
		} catch (v) {
			k(v)
		}
	}

	function b() {
		return e.wasmBinary || !ca && !fa || "function" !== typeof fetch ? new Promise(function (b) {
			b(a())
		}) : fetch(f, {
			credentials: "same-origin"
		}).then(function (a) {
			if (!a.ok) throw "failed to load wasm binary file at '" + f + "'";
			return a.arrayBuffer()
		}).catch(function () {
			return a()
		})
	}

	function c(a) {
		function c(a) {
			r = a.exports;
			if (r.memory) {
				a = r.memory;
				var b = e.buffer;
				a.byteLength < b.byteLength && l("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here");
				b = new Int8Array(b);
				(new Int8Array(a)).set(b);
				e.buffer = buffer = a;
				Ra()
			}
			e.asm = r;
			e.usingWasm = !0;
			nb--;
			e.monitorRunDependencies && e.monitorRunDependencies(nb);
			assert(qb["wasm-instantiate"]);
			delete qb["wasm-instantiate"];
			0 == nb && (null !== ob && (clearInterval(ob), ob = null), pb && (a = pb, pb = null, a()))
		}

		function d(a) {
			assert(e === x, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
			x = null;
			c(a.instance)
		}

		function g(a) {
			b().then(function (a) {
				return WebAssembly.instantiate(a, h)
			}).then(a, function (a) {
				l("failed to asynchronously prepare wasm: " + a);
				k(a)
			})
		}
		if ("object" !== typeof WebAssembly) return k("No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead."), l("no native wasm support detected"), !1;
		if (!(e.wasmMemory instanceof WebAssembly.Memory)) return l("no native wasm Memory in use"), !1;
		a.memory = e.wasmMemory;
		h.global = {
			NaN: NaN,
			Infinity: Infinity
		};
		h["global.Math"] =
			Math;
		h.env = a;
		rb();
		if (e.instantiateWasm) try {
			return e.instantiateWasm(h, c)
		} catch (Fa) {
			return l("Module.instantiateWasm callback failed with error: " + Fa), !1
		}
		var x = e;
		e.wasmBinary || "function" !== typeof WebAssembly.instantiateStreaming || sb(f) || "function" !== typeof fetch ? g(d) : WebAssembly.instantiateStreaming(fetch(f, {
			credentials: "same-origin"
		}), h).then(d, function (a) {
			l("wasm streaming compile failed: " + a);
			l("falling back to ArrayBuffer instantiation");
			g(d)
		});
		return {}
	}
	var d = "index.wast",
		f = "index.wasm",
		g = "index.temp.asm.js";
	sb(d) || (d = ka(d));
	sb(f) || (f = ka(f));
	sb(g) || (g = ka(g));
	var h = {
			global: null,
			env: null,
			asm2wasm: va,
			parent: e
		},
		r = null;
	e.asmPreload = e.asm;
	var x = e.reallocBuffer;
	e.reallocBuffer = function (a) {
		if ("asmjs" === u) var b = x(a);
		else a: {
			a = Ka(a, e.usingWasm ? 65536 : 16777216);
			var c = e.buffer.byteLength;
			if (e.usingWasm) try {
				b = -1 !== e.wasmMemory.grow((a - c) / 65536) ? e.buffer = e.wasmMemory.buffer : null;
				break a
			} catch (ea) {
				console.error("Module.reallocBuffer: Attempted to grow from " + c + " bytes to " + a + " bytes, but got error: " + ea);
				b = null;
				break a
			}
			b =
			void 0
		}
		return b
	};
	var u = "";
	e.asm = function (a, b) {
		if (!b.table) {
			a = e.wasmTableSize;
			void 0 === a && (a = 1024);
			var d = e.wasmMaxTableSize;
			b.table = "object" === typeof WebAssembly && "function" === typeof WebAssembly.Table ? void 0 !== d ? new WebAssembly.Table({
				initial: a,
				maximum: d,
				element: "anyfunc"
			}) : new WebAssembly.Table({
				initial: a,
				element: "anyfunc"
			}) : Array(a);
			e.wasmTable = b.table
		}
		b.__memory_base || (b.__memory_base = e.STATIC_BASE);
		b.__table_base || (b.__table_base = 0);
		b = c(b);
		assert(b, "no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: http://kripken.github.io/emscripten-site/docs/compiling/WebAssembly.html#binaryen-methods");
		return b
	}
})();
var tb = [function () {
	console.error("Tried to load a skin while the application is not ready yet!")
}, function () {
	var a = window.Module.GetProfileResultsAsString(),
		b = document.createElement("a");
	b.href = URL.createObjectURL(new Blob([a], {
		type: "text/plain"
	}));
	b.download = "profile_results.json";
	b.click()
}, function () {
	window.Module.OnReady ? window.Module.OnReady() : console.error("OnReady is not set.");
	console.log("LeagueModel is ready to go.")
}, function () {
	console.log("LeagueModel is unreadied.")
}];
Sa = 1024;
Ta = Sa + 41152;
gb.push({
	uc: function () {
		ub()
	}
}, {
	uc: function () {
		vb()
	}
}, {
	uc: function () {
		wb()
	}
}, {
	uc: function () {
		xb()
	}
}, {
	uc: function () {
		yb()
	}
}, {
	uc: function () {
		zb()
	}
}, {
	uc: function () {
		Ab()
	}
});
e.STATIC_BASE = Sa;
e.STATIC_BUMP = 41152;
var Bb = Ta;
Ta += 16;
assert(0 == Bb % 8);

function Cb() {
	return !!Cb.Ed
}
var w = {
	Kc: 1,
	xc: 2,
	eg: 3,
	$e: 4,
	Qc: 5,
	vd: 6,
	te: 7,
	zf: 8,
	wc: 9,
	He: 10,
	qd: 11,
	og: 11,
	Pd: 12,
	dd: 13,
	Te: 14,
	Lf: 15,
	rd: 16,
	sd: 17,
	pg: 18,
	gd: 19,
	td: 20,
	Rc: 21,
	mc: 22,
	uf: 23,
	Od: 24,
	Cc: 25,
	lg: 26,
	Ue: 27,
	Hf: 28,
	Sc: 29,
	bg: 30,
	mf: 31,
	Vf: 32,
	Qe: 33,
	Zf: 34,
	Df: 42,
	Xe: 43,
	Ie: 44,
	cf: 45,
	df: 46,
	ef: 47,
	lf: 48,
	mg: 49,
	xf: 50,
	bf: 51,
	Ne: 35,
	Af: 37,
	ze: 52,
	Ce: 53,
	qg: 54,
	vf: 55,
	De: 56,
	Ee: 57,
	Oe: 35,
	Fe: 59,
	Jf: 60,
	yf: 61,
	ig: 62,
	If: 63,
	Ef: 64,
	Ff: 65,
	ag: 66,
	Bf: 67,
	we: 68,
	fg: 69,
	Je: 70,
	Wf: 71,
	pf: 72,
	Re: 73,
	Be: 74,
	Qf: 76,
	Ae: 77,
	$f: 78,
	ff: 79,
	gf: 80,
	kf: 81,
	jf: 82,
	hf: 83,
	Kf: 38,
	ud: 39,
	qf: 36,
	ed: 40,
	Rf: 95,
	Uf: 96,
	Me: 104,
	wf: 105,
	xe: 97,
	Yf: 91,
	Of: 88,
	Gf: 92,
	cg: 108,
	Le: 111,
	ue: 98,
	Ke: 103,
	tf: 101,
	rf: 100,
	jg: 110,
	Ve: 112,
	We: 113,
	Ze: 115,
	ye: 114,
	Pe: 89,
	nf: 90,
	Xf: 93,
	dg: 94,
	ve: 99,
	sf: 102,
	af: 106,
	Mf: 107,
	kg: 109,
	ng: 87,
	Se: 122,
	gg: 116,
	Pf: 95,
	Cf: 123,
	Ye: 84,
	Sf: 75,
	Ge: 125,
	Nf: 131,
	Tf: 130,
	hg: 86
};

function Db(a) {
	e.___errno_location ? p[e.___errno_location() >> 2] = a : l("failed to set errno from JS");
	return a
}
var Eb = {
	0: "Success",
	1: "Not super-user",
	2: "No such file or directory",
	3: "No such process",
	4: "Interrupted system call",
	5: "I/O error",
	6: "No such device or address",
	7: "Arg list too long",
	8: "Exec format error",
	9: "Bad file number",
	10: "No children",
	11: "No more processes",
	12: "Not enough core",
	13: "Permission denied",
	14: "Bad address",
	15: "Block device required",
	16: "Mount device busy",
	17: "File exists",
	18: "Cross-device link",
	19: "No such device",
	20: "Not a directory",
	21: "Is a directory",
	22: "Invalid argument",
	23: "Too many open files in system",
	24: "Too many open files",
	25: "Not a typewriter",
	26: "Text file busy",
	27: "File too large",
	28: "No space left on device",
	29: "Illegal seek",
	30: "Read only file system",
	31: "Too many links",
	32: "Broken pipe",
	33: "Math arg out of domain of func",
	34: "Math result not representable",
	35: "File locking deadlock error",
	36: "File or path name too long",
	37: "No record locks available",
	38: "Function not implemented",
	39: "Directory not empty",
	40: "Too many symbolic links",
	42: "No message of desired type",
	43: "Identifier removed",
	44: "Channel number out of range",
	45: "Level 2 not synchronized",
	46: "Level 3 halted",
	47: "Level 3 reset",
	48: "Link number out of range",
	49: "Protocol driver not attached",
	50: "No CSI structure available",
	51: "Level 2 halted",
	52: "Invalid exchange",
	53: "Invalid request descriptor",
	54: "Exchange full",
	55: "No anode",
	56: "Invalid request code",
	57: "Invalid slot",
	59: "Bad font file fmt",
	60: "Device not a stream",
	61: "No data (for no delay io)",
	62: "Timer expired",
	63: "Out of streams resources",
	64: "Machine is not on the network",
	65: "Package not installed",
	66: "The object is remote",
	67: "The link has been severed",
	68: "Advertise error",
	69: "Srmount error",
	70: "Communication error on send",
	71: "Protocol error",
	72: "Multihop attempted",
	73: "Cross mount point (not really error)",
	74: "Trying to read unreadable message",
	75: "Value too large for defined data type",
	76: "Given log. name not unique",
	77: "f.d. invalid for this operation",
	78: "Remote address changed",
	79: "Can   access a needed shared lib",
	80: "Accessing a corrupted shared lib",
	81: ".lib section in a.out corrupted",
	82: "Attempting to link in too many libs",
	83: "Attempting to exec a shared library",
	84: "Illegal byte sequence",
	86: "Streams pipe error",
	87: "Too many users",
	88: "Socket operation on non-socket",
	89: "Destination address required",
	90: "Message too long",
	91: "Protocol wrong type for socket",
	92: "Protocol not available",
	93: "Unknown protocol",
	94: "Socket type not supported",
	95: "Not supported",
	96: "Protocol family not supported",
	97: "Address family not supported by protocol family",
	98: "Address already in use",
	99: "Address not available",
	100: "Network interface is not configured",
	101: "Network is unreachable",
	102: "Connection reset by network",
	103: "Connection aborted",
	104: "Connection reset by peer",
	105: "No buffer space available",
	106: "Socket is already connected",
	107: "Socket is not connected",
	108: "Can't send after socket shutdown",
	109: "Too many references",
	110: "Connection timed out",
	111: "Connection refused",
	112: "Host is down",
	113: "Host is unreachable",
	114: "Socket already connected",
	115: "Connection already in progress",
	116: "Stale file handle",
	122: "Quota exceeded",
	123: "No medium (in tape drive)",
	125: "Operation canceled",
	130: "Previous owner died",
	131: "State not recoverable"
};

function Fb(a, b) {
	for (var c = 0, d = a.length - 1; 0 <= d; d--) {
		var f = a[d];
		"." === f ? a.splice(d, 1) : ".." === f ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--)
	}
	if (b)
		for (; c; c--) a.unshift("..");
	return a
}

function Gb(a) {
	var b = "/" === a.charAt(0),
		c = "/" === a.substr(-1);
	(a = Fb(a.split("/").filter(function (a) {
		return !!a
	}), !b).join("/")) || b || (a = ".");
	a && c && (a += "/");
	return (b ? "/" : "") + a
}

function Hb(a) {
	var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
	a = b[0];
	b = b[1];
	if (!a && !b) return ".";
	b && (b = b.substr(0, b.length - 1));
	return a + b
}

function Ib(a) {
	if ("/" === a) return "/";
	var b = a.lastIndexOf("/");
	return -1 === b ? a : a.substr(b + 1)
}

function Jb() {
	var a = Array.prototype.slice.call(arguments, 0);
	return Gb(a.join("/"))
}

function Kb(a, b) {
	return Gb(a + "/" + b)
}

function Lb() {
	for (var a = "", b = !1, c = arguments.length - 1; - 1 <= c && !b; c--) {
		b = 0 <= c ? arguments[c] : "/";
		if ("string" !== typeof b) throw new TypeError("Arguments to path.resolve must be strings");
		if (!b) return "";
		a = b + "/" + a;
		b = "/" === b.charAt(0)
	}
	a = Fb(a.split("/").filter(function (a) {
		return !!a
	}), !b).join("/");
	return (b ? "/" : "") + a || "."
}
var Mb = [];

function Nb(a, b) {
	Mb[a] = {
		input: [],
		output: [],
		Fc: b
	};
	Ob(a, Pb)
}
var Pb = {
		open: function (a) {
			var b = Mb[a.node.rdev];
			if (!b) throw new z(w.gd);
			a.tty = b;
			a.seekable = !1
		},
		close: function (a) {
			a.tty.Fc.flush(a.tty)
		},
		flush: function (a) {
			a.tty.Fc.flush(a.tty)
		},
		read: function (a, b, c, d) {
			if (!a.tty || !a.tty.Fc.Dd) throw new z(w.vd);
			for (var f = 0, g = 0; g < d; g++) {
				try {
					var h = a.tty.Fc.Dd(a.tty)
				} catch (r) {
					throw new z(w.Qc);
				}
				if (void 0 === h && 0 === f) throw new z(w.qd);
				if (null === h || void 0 === h) break;
				f++;
				b[c + g] = h
			}
			f && (a.node.timestamp = Date.now());
			return f
		},
		write: function (a, b, c, d) {
			if (!a.tty || !a.tty.Fc.nd) throw new z(w.vd);
			var f = 0;
			try {
				if (0 === c && 0 === d) a.tty.Fc.flush(a.tty);
				else
					for (; f < d;) a.tty.Fc.nd(a.tty, b[c + f]), f++
			} catch (g) {
				throw new z(w.Qc);
			}
			d && (a.node.timestamp = Date.now());
			return f
		}
	},
	Rb = {
		Dd: function (a) {
			if (!a.input.length) {
				var b = null;
				if (ha) {
					var c = new Buffer(256),
						d = 0,
						f = process.stdin.fd;
					if ("win32" != process.platform) {
						var g = !1;
						try {
							f = fs.openSync("/dev/stdin", "r"), g = !0
						} catch (h) {}
					}
					try {
						d = fs.readSync(f, c, 0, 256, null)
					} catch (h) {
						if (-1 != h.toString().indexOf("EOF")) d = 0;
						else throw h;
					}
					g && fs.closeSync(f);
					0 < d ? b = c.slice(0, d).toString("utf-8") :
						b = null
				} else "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), null !== b && (b += "\n")) : "function" == typeof readline && (b = readline(), null !== b && (b += "\n"));
				if (!b) return null;
				a.input = Qb(b, !0)
			}
			return a.input.shift()
		},
		nd: function (a, b) {
			null === b || 10 === b ? (oa(ya(a.output, 0)), a.output = []) : 0 != b && a.output.push(b)
		},
		flush: function (a) {
			a.output && 0 < a.output.length && (oa(ya(a.output, 0)), a.output = [])
		}
	},
	Sb = {
		nd: function (a, b) {
			null === b || 10 === b ? (l(ya(a.output, 0)), a.output = []) : 0 != b && a.output.push(b)
		},
		flush: function (a) {
			a.output && 0 < a.output.length && (l(ya(a.output, 0)), a.output = [])
		}
	},
	B = {
		sc: null,
		pc: function () {
			return B.createNode(null, "/", 16895, 0)
		},
		createNode: function (a, b, c, d) {
			if (24576 === (c & 61440) || 4096 === (c & 61440)) throw new z(w.Kc);
			B.sc || (B.sc = {
				dir: {
					node: {
						vc: B.kc.vc,
						rc: B.kc.rc,
						lookup: B.kc.lookup,
						Nc: B.kc.Nc,
						rename: B.kc.rename,
						unlink: B.kc.unlink,
						rmdir: B.kc.rmdir,
						readdir: B.kc.readdir,
						symlink: B.kc.symlink
					},
					stream: {
						zc: B.jc.zc
					}
				},
				file: {
					node: {
						vc: B.kc.vc,
						rc: B.kc.rc
					},
					stream: {
						zc: B.jc.zc,
						read: B.jc.read,
						write: B.jc.write,
						wd: B.jc.wd,
						Hd: B.jc.Hd,
						Yc: B.jc.Yc
					}
				},
				link: {
					node: {
						vc: B.kc.vc,
						rc: B.kc.rc,
						readlink: B.kc.readlink
					},
					stream: {}
				},
				yd: {
					node: {
						vc: B.kc.vc,
						rc: B.kc.rc
					},
					stream: Tb
				}
			});
			c = Ub(a, b, c, d);
			16384 === (c.mode & 61440) ? (c.kc = B.sc.dir.node, c.jc = B.sc.dir.stream, c.ic = {}) : 32768 === (c.mode & 61440) ? (c.kc = B.sc.file.node, c.jc = B.sc.file.stream, c.lc = 0, c.ic = null) : 40960 === (c.mode & 61440) ? (c.kc = B.sc.link.node, c.jc = B.sc.link.stream) : 8192 === (c.mode & 61440) && (c.kc = B.sc.yd.node, c.jc = B.sc.yd.stream);
			c.timestamp = Date.now();
			a && (a.ic[b] = c);
			return c
		},
		Xd: function (a) {
			if (a.ic &&
				a.ic.subarray) {
				for (var b = [], c = 0; c < a.lc; ++c) b.push(a.ic[c]);
				return b
			}
			return a.ic
		},
		wg: function (a) {
			return a.ic ? a.ic.subarray ? a.ic.subarray(0, a.lc) : new Uint8Array(a.ic) : new Uint8Array
		},
		zd: function (a, b) {
			a.ic && a.ic.subarray && b > a.ic.length && (a.ic = B.Xd(a), a.lc = a.ic.length);
			if (!a.ic || a.ic.subarray) {
				var c = a.ic ? a.ic.length : 0;
				c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) | 0), 0 != c && (b = Math.max(b, 256)), c = a.ic, a.ic = new Uint8Array(b), 0 < a.lc && a.ic.set(c.subarray(0, a.lc), 0))
			} else
				for (!a.ic && 0 < b && (a.ic = []); a.ic.length < b;) a.ic.push(0)
		},
		ke: function (a, b) {
			if (a.lc != b)
				if (0 == b) a.ic = null, a.lc = 0;
				else {
					if (!a.ic || a.ic.subarray) {
						var c = a.ic;
						a.ic = new Uint8Array(new ArrayBuffer(b));
						c && a.ic.set(c.subarray(0, Math.min(b, a.lc)))
					} else if (a.ic || (a.ic = []), a.ic.length > b) a.ic.length = b;
					else
						for (; a.ic.length < b;) a.ic.push(0);
					a.lc = b
				}
		},
		kc: {
			vc: function (a) {
				var b = {};
				b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
				b.ino = a.id;
				b.mode = a.mode;
				b.nlink = 1;
				b.uid = 0;
				b.gid = 0;
				b.rdev = a.rdev;
				16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.lc : 40960 === (a.mode & 61440) ? b.size =
					a.link.length : b.size = 0;
				b.atime = new Date(a.timestamp);
				b.mtime = new Date(a.timestamp);
				b.ctime = new Date(a.timestamp);
				b.Dc = 4096;
				b.blocks = Math.ceil(b.size / b.Dc);
				return b
			},
			rc: function (a, b) {
				void 0 !== b.mode && (a.mode = b.mode);
				void 0 !== b.timestamp && (a.timestamp = b.timestamp);
				void 0 !== b.size && B.ke(a, b.size)
			},
			lookup: function () {
				throw Vb[w.xc];
			},
			Nc: function (a, b, c, d) {
				return B.createNode(a, b, c, d)
			},
			rename: function (a, b, c) {
				if (16384 === (a.mode & 61440)) {
					try {
						var d = Wb(b, c)
					} catch (g) {}
					if (d)
						for (var f in d.ic) throw new z(w.ud);
				}
				delete a.parent.ic[a.name];
				a.name = c;
				b.ic[c] = a;
				a.parent = b
			},
			unlink: function (a, b) {
				delete a.ic[b]
			},
			rmdir: function (a, b) {
				var c = Wb(a, b),
					d;
				for (d in c.ic) throw new z(w.ud);
				delete a.ic[b]
			},
			readdir: function (a) {
				var b = [".", ".."],
					c;
				for (c in a.ic) a.ic.hasOwnProperty(c) && b.push(c);
				return b
			},
			symlink: function (a, b, c) {
				a = B.createNode(a, b, 41471, 0);
				a.link = c;
				return a
			},
			readlink: function (a) {
				if (40960 !== (a.mode & 61440)) throw new z(w.mc);
				return a.link
			}
		},
		jc: {
			read: function (a, b, c, d, f) {
				var g = a.node.ic;
				if (f >= a.node.lc) return 0;
				a =
					Math.min(a.node.lc - f, d);
				assert(0 <= a);
				if (8 < a && g.subarray) b.set(g.subarray(f, f + a), c);
				else
					for (d = 0; d < a; d++) b[c + d] = g[f + d];
				return a
			},
			write: function (a, b, c, d, f, g) {
				g && ta("file packager has copied file data into memory, but in memory growth we are forced to copy it again (see --no-heap-copy)");
				g = !1;
				if (!d) return 0;
				a = a.node;
				a.timestamp = Date.now();
				if (b.subarray && (!a.ic || a.ic.subarray)) {
					if (g) return assert(0 === f, "canOwn must imply no weird position inside the file"), a.ic = b.subarray(c, c + d), a.lc = d;
					if (0 === a.lc && 0 ===
						f) return a.ic = new Uint8Array(b.subarray(c, c + d)), a.lc = d;
					if (f + d <= a.lc) return a.ic.set(b.subarray(c, c + d), f), d
				}
				B.zd(a, f + d);
				if (a.ic.subarray && b.subarray) a.ic.set(b.subarray(c, c + d), f);
				else
					for (g = 0; g < d; g++) a.ic[f + g] = b[c + g];
				a.lc = Math.max(a.lc, f + d);
				return d
			},
			zc: function (a, b, c) {
				1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.lc);
				if (0 > b) throw new z(w.mc);
				return b
			},
			wd: function (a, b, c) {
				B.zd(a.node, b + c);
				a.node.lc = Math.max(a.node.lc, b + c)
			},
			Hd: function (a, b, c, d, f, g, h) {
				if (32768 !== (a.node.mode & 61440)) throw new z(w.gd);
				c = a.node.ic;
				if (h & 2 || c.buffer !== b && c.buffer !== b.buffer) {
					if (0 < f || f + d < a.node.lc) c.subarray ? c = c.subarray(f, f + d) : c = Array.prototype.slice.call(c, f, f + d);
					a = !0;
					d = Ha(d);
					if (!d) throw new z(w.Pd);
					b.set(c, d)
				} else a = !1, d = c.byteOffset;
				return {
					Zc: d,
					Qd: a
				}
			},
			Yc: function (a, b, c, d, f) {
				if (32768 !== (a.node.mode & 61440)) throw new z(w.gd);
				if (f & 2) return 0;
				B.jc.write(a, b, 0, d, c, !1);
				return 0
			}
		}
	},
	C = {
		Wc: !1,
		me: function () {
			C.Wc = !!process.platform.match(/^win/);
			var a = process.binding("constants");
			a.fs && (a = a.fs);
			C.Ad = {
				1024: a.O_APPEND,
				64: a.O_CREAT,
				128: a.O_EXCL,
				0: a.O_RDONLY,
				2: a.O_RDWR,
				4096: a.O_SYNC,
				512: a.O_TRUNC,
				1: a.O_WRONLY
			}
		},
		xd: function (a) {
			return Buffer.oc ? Buffer.from(a) : new Buffer(a)
		},
		pc: function (a) {
			assert(ha);
			return C.createNode(null, "/", C.Cd(a.md.root), 0)
		},
		createNode: function (a, b, c) {
			if (16384 !== (c & 61440) && 32768 !== (c & 61440) && 40960 !== (c & 61440)) throw new z(w.mc);
			a = Ub(a, b, c);
			a.kc = C.kc;
			a.jc = C.jc;
			return a
		},
		Cd: function (a) {
			try {
				var b = fs.lstatSync(a);
				C.Wc && (b.mode = b.mode | (b.mode & 292) >> 2)
			} catch (c) {
				if (!c.code) throw c;
				throw new z(w[c.code]);
			}
			return b.mode
		},
		qc: function (a) {
			for (var b = []; a.parent !== a;) b.push(a.name), a = a.parent;
			b.push(a.pc.md.root);
			b.reverse();
			return Jb.apply(null, b)
		},
		Wd: function (a) {
			a &= -2656257;
			var b = 0,
				c;
			for (c in C.Ad) a & c && (b |= C.Ad[c], a ^= c);
			if (a) throw new z(w.mc);
			return b
		},
		kc: {
			vc: function (a) {
				a = C.qc(a);
				try {
					var b = fs.lstatSync(a)
				} catch (c) {
					if (!c.code) throw c;
					throw new z(w[c.code]);
				}
				C.Wc && !b.Dc && (b.Dc = 4096);
				C.Wc && !b.blocks && (b.blocks = (b.size + b.Dc - 1) / b.Dc | 0);
				return {
					dev: b.dev,
					ino: b.ino,
					mode: b.mode,
					nlink: b.nlink,
					uid: b.uid,
					gid: b.gid,
					rdev: b.rdev,
					size: b.size,
					atime: b.atime,
					mtime: b.mtime,
					ctime: b.ctime,
					Dc: b.Dc,
					blocks: b.blocks
				}
			},
			rc: function (a, b) {
				var c = C.qc(a);
				try {
					void 0 !== b.mode && (fs.chmodSync(c, b.mode), a.mode = b.mode), void 0 !== b.size && fs.truncateSync(c, b.size)
				} catch (d) {
					if (!d.code) throw d;
					throw new z(w[d.code]);
				}
			},
			lookup: function (a, b) {
				var c = Kb(C.qc(a), b);
				c = C.Cd(c);
				return C.createNode(a, b, c)
			},
			Nc: function (a, b, c, d) {
				a = C.createNode(a, b, c, d);
				b = C.qc(a);
				try {
					16384 === (a.mode & 61440) ? fs.mkdirSync(b, a.mode) : fs.writeFileSync(b, "", {
						mode: a.mode
					})
				} catch (f) {
					if (!f.code) throw f;
					throw new z(w[f.code]);
				}
				return a
			},
			rename: function (a, b, c) {
				a = C.qc(a);
				b = Kb(C.qc(b), c);
				try {
					fs.renameSync(a, b)
				} catch (d) {
					if (!d.code) throw d;
					throw new z(w[d.code]);
				}
			},
			unlink: function (a, b) {
				a = Kb(C.qc(a), b);
				try {
					fs.unlinkSync(a)
				} catch (c) {
					if (!c.code) throw c;
					throw new z(w[c.code]);
				}
			},
			rmdir: function (a, b) {
				a = Kb(C.qc(a), b);
				try {
					fs.rmdirSync(a)
				} catch (c) {
					if (!c.code) throw c;
					throw new z(w[c.code]);
				}
			},
			readdir: function (a) {
				a = C.qc(a);
				try {
					return fs.readdirSync(a)
				} catch (b) {
					if (!b.code) throw b;
					throw new z(w[b.code]);
				}
			},
			symlink: function (a,
				b, c) {
				a = Kb(C.qc(a), b);
				try {
					fs.symlinkSync(c, a)
				} catch (d) {
					if (!d.code) throw d;
					throw new z(w[d.code]);
				}
			},
			readlink: function (a) {
				var b = C.qc(a);
				try {
					return b = fs.readlinkSync(b), b = Xb.relative(Xb.resolve(a.pc.md.root), b)
				} catch (c) {
					if (!c.code) throw c;
					throw new z(w[c.code]);
				}
			}
		},
		jc: {
			open: function (a) {
				var b = C.qc(a.node);
				try {
					32768 === (a.node.mode & 61440) && (a.Oc = fs.openSync(b, C.Wd(a.flags)))
				} catch (c) {
					if (!c.code) throw c;
					throw new z(w[c.code]);
				}
			},
			close: function (a) {
				try {
					32768 === (a.node.mode & 61440) && a.Oc && fs.closeSync(a.Oc)
				} catch (b) {
					if (!b.code) throw b;
					throw new z(w[b.code]);
				}
			},
			read: function (a, b, c, d, f) {
				if (0 === d) return 0;
				try {
					return fs.readSync(a.Oc, C.xd(b.buffer), c, d, f)
				} catch (g) {
					throw new z(w[g.code]);
				}
			},
			write: function (a, b, c, d, f) {
				try {
					return fs.writeSync(a.Oc, C.xd(b.buffer), c, d, f)
				} catch (g) {
					throw new z(w[g.code]);
				}
			},
			zc: function (a, b, c) {
				if (1 === c) b += a.position;
				else if (2 === c && 32768 === (a.node.mode & 61440)) try {
					b += fs.fstatSync(a.Oc).size
				} catch (d) {
					throw new z(w[d.code]);
				}
				if (0 > b) throw new z(w.mc);
				return b
			}
		}
	};
Ta += 16;
Ta += 16;
Ta += 16;
var Yb = null,
	Zb = {},
	$b = [],
	ac = 1,
	bc = null,
	cc = !0,
	dc = {},
	z = null,
	Vb = {};

function ec(a, b) {
	a = Lb("/", a);
	b = b || {};
	if (!a) return {
		path: "",
		node: null
	};
	var c = {
			Bd: !0,
			od: 0
		},
		d;
	for (d in c) void 0 === b[d] && (b[d] = c[d]);
	if (8 < b.od) throw new z(w.ed);
	a = Fb(a.split("/").filter(function (a) {
		return !!a
	}), !1);
	var f = Yb;
	c = "/";
	for (d = 0; d < a.length; d++) {
		var g = d === a.length - 1;
		if (g && b.parent) break;
		f = Wb(f, a[d]);
		c = Kb(c, a[d]);
		f.Xc && (!g || g && b.Bd) && (f = f.Xc.root);
		if (!g || b.Vc)
			for (g = 0; 40960 === (f.mode & 61440);)
				if (f = fc(c), c = Lb(Hb(c), f), f = ec(c, {
						od: b.od
					}).node, 40 < g++) throw new z(w.ed);
	}
	return {
		path: c,
		node: f
	}
}

function hc(a) {
	for (var b;;) {
		if (a === a.parent) return a = a.pc.Id, b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
		b = b ? a.name + "/" + b : a.name;
		a = a.parent
	}
}

function ic(a, b) {
	for (var c = 0, d = 0; d < b.length; d++) c = (c << 5) - c + b.charCodeAt(d) | 0;
	return (a + c >>> 0) % bc.length
}

function jc(a) {
	var b = ic(a.parent.id, a.name);
	a.de = bc[b];
	bc[b] = a
}

function Wb(a, b) {
	var c;
	if (c = (c = kc(a, "x")) ? c : a.kc.lookup ? 0 : w.dd) throw new z(c, a);
	for (c = bc[ic(a.id, b)]; c; c = c.de) {
		var d = c.name;
		if (c.parent.id === a.id && d === b) return c
	}
	return a.kc.lookup(a, b)
}

function Ub(a, b, c, d) {
	lc || (lc = function (a, b, c, d) {
		a || (a = this);
		this.parent = a;
		this.pc = a.pc;
		this.Xc = null;
		this.id = ac++;
		this.name = b;
		this.mode = c;
		this.kc = {};
		this.jc = {};
		this.rdev = d
	}, lc.prototype = {}, Object.defineProperties(lc.prototype, {
		read: {
			get: function () {
				return 365 === (this.mode & 365)
			},
			set: function (a) {
				a ? this.mode |= 365 : this.mode &= -366
			}
		},
		write: {
			get: function () {
				return 146 === (this.mode & 146)
			},
			set: function (a) {
				a ? this.mode |= 146 : this.mode &= -147
			}
		}
	}));
	a = new lc(a, b, c, d);
	jc(a);
	return a
}
var mc = {
	r: 0,
	rs: 1052672,
	"r+": 2,
	w: 577,
	wx: 705,
	xw: 705,
	"w+": 578,
	"wx+": 706,
	"xw+": 706,
	a: 1089,
	ax: 1217,
	xa: 1217,
	"a+": 1090,
	"ax+": 1218,
	"xa+": 1218
};

function nc(a) {
	var b = ["r", "w", "rw"][a & 3];
	a & 512 && (b += "w");
	return b
}

function kc(a, b) {
	if (cc) return 0;
	if (-1 === b.indexOf("r") || a.mode & 292) {
		if (-1 !== b.indexOf("w") && !(a.mode & 146) || -1 !== b.indexOf("x") && !(a.mode & 73)) return w.dd
	} else return w.dd;
	return 0
}

function oc(a, b) {
	try {
		return Wb(a, b), w.sd
	} catch (c) {}
	return kc(a, "wx")
}

function pc() {
	var a = 4096;
	for (var b = 0; b <= a; b++)
		if (!$b[b]) return b;
	throw new z(w.Od);
}

function qc(a) {
	rc || (rc = function () {}, rc.prototype = {}, Object.defineProperties(rc.prototype, {
		object: {
			get: function () {
				return this.node
			},
			set: function (a) {
				this.node = a
			}
		}
	}));
	var b = new rc,
		c;
	for (c in a) b[c] = a[c];
	a = b;
	b = pc();
	a.fd = b;
	return $b[b] = a
}
var Tb = {
	open: function (a) {
		a.jc = Zb[a.node.rdev].jc;
		a.jc.open && a.jc.open(a)
	},
	zc: function () {
		throw new z(w.Sc);
	}
};

function Ob(a, b) {
	Zb[a] = {
		jc: b
	}
}

function sc(a, b) {
	var c = "/" === b,
		d = !b;
	if (c && Yb) throw new z(w.rd);
	if (!c && !d) {
		var f = ec(b, {
			Bd: !1
		});
		b = f.path;
		f = f.node;
		if (f.Xc) throw new z(w.rd);
		if (16384 !== (f.mode & 61440)) throw new z(w.td);
	}
	b = {
		type: a,
		md: {},
		Id: b,
		ce: []
	};
	a = a.pc(b);
	a.pc = b;
	b.root = a;
	c ? Yb = a : f && (f.Xc = b, f.pc && f.pc.ce.push(b))
}

function tc(a, b, c) {
	var d = ec(a, {
		parent: !0
	}).node;
	a = Ib(a);
	if (!a || "." === a || ".." === a) throw new z(w.mc);
	var f = oc(d, a);
	if (f) throw new z(f);
	if (!d.kc.Nc) throw new z(w.Kc);
	return d.kc.Nc(d, a, b, c)
}

function uc(a) {
	tc(a, 16895, 0)
}

function vc(a, b, c) {
	"undefined" === typeof c && (c = b, b = 438);
	tc(a, b | 8192, c)
}

function wc(a, b) {
	if (!Lb(a)) throw new z(w.xc);
	var c = ec(b, {
		parent: !0
	}).node;
	if (!c) throw new z(w.xc);
	b = Ib(b);
	var d = oc(c, b);
	if (d) throw new z(d);
	if (!c.kc.symlink) throw new z(w.Kc);
	c.kc.symlink(c, b, a)
}

function fc(a) {
	a = ec(a).node;
	if (!a) throw new z(w.xc);
	if (!a.kc.readlink) throw new z(w.mc);
	return Lb(hc(a.parent), a.kc.readlink(a))
}

function xc(a, b) {
	if ("" === a) throw new z(w.xc);
	if ("string" === typeof b) {
		var c = mc[b];
		if ("undefined" === typeof c) throw Error("Unknown file open mode: " + b);
		b = c
	}
	var d = b & 64 ? ("undefined" === typeof d ? 438 : d) & 4095 | 32768 : 0;
	if ("object" === typeof a) var f = a;
	else {
		a = Gb(a);
		try {
			f = ec(a, {
				Vc: !(b & 131072)
			}).node
		} catch (h) {}
	}
	c = !1;
	if (b & 64)
		if (f) {
			if (b & 128) throw new z(w.sd);
		} else f = tc(a, d, 0), c = !0;
	if (!f) throw new z(w.xc);
	8192 === (f.mode & 61440) && (b &= -513);
	if (b & 65536 && 16384 !== (f.mode & 61440)) throw new z(w.td);
	if (!c && (d = f ? 40960 === (f.mode &
			61440) ? w.ed : 16384 === (f.mode & 61440) && ("r" !== nc(b) || b & 512) ? w.Rc : kc(f, nc(b)) : w.xc)) throw new z(d);
	if (b & 512) {
		d = f;
		var g;
		"string" === typeof d ? g = ec(d, {
			Vc: !0
		}).node : g = d;
		if (!g.kc.rc) throw new z(w.Kc);
		if (16384 === (g.mode & 61440)) throw new z(w.Rc);
		if (32768 !== (g.mode & 61440)) throw new z(w.mc);
		if (d = kc(g, "w")) throw new z(d);
		g.kc.rc(g, {
			size: 0,
			timestamp: Date.now()
		})
	}
	b &= -641;
	f = qc({
		node: f,
		path: hc(f),
		flags: b,
		seekable: !0,
		position: 0,
		jc: f.jc,
		re: [],
		error: !1
	});
	f.jc.open && f.jc.open(f);
	!e.logReadFiles || b & 1 || (yc || (yc = {}), a in yc ||
		(yc[a] = 1, console.log("FS.trackingDelegate error on read file: " + a)));
	try {
		dc.onOpenFile && (g = 0, 1 !== (b & 2097155) && (g |= 1), 0 !== (b & 2097155) && (g |= 2), dc.onOpenFile(a, g))
	} catch (h) {
		console.log("FS.trackingDelegate['onOpenFile']('" + a + "', flags) threw an exception: " + h.message)
	}
	return f
}

function zc(a) {
	if (null === a.fd) throw new z(w.wc);
	a.kd && (a.kd = null);
	try {
		a.jc.close && a.jc.close(a)
	} catch (b) {
		throw b;
	} finally {
		$b[a.fd] = null
	}
	a.fd = null
}

function Ac(a, b, c) {
	if (null === a.fd) throw new z(w.wc);
	if (!a.seekable || !a.jc.zc) throw new z(w.Sc);
	a.position = a.jc.zc(a, b, c);
	a.re = []
}

function Bc() {
	z || (z = function (a, b) {
		this.node = b;
		this.le = function (a) {
			this.Ec = a;
			for (var b in w)
				if (w[b] === a) {
					this.code = b;
					break
				}
		};
		this.le(a);
		this.message = Eb[a];
		this.stack && Object.defineProperty(this, "stack", {
			value: Error().stack,
			writable: !0
		});
		this.stack && (this.stack = Ga(this.stack))
	}, z.prototype = Error(), z.prototype.constructor = z, [w.xc].forEach(function (a) {
		Vb[a] = new z(a);
		Vb[a].stack = "<generic error, no stack>"
	}))
}
var Cc;

function Dc(a, b) {
	var c = 0;
	a && (c |= 365);
	b && (c |= 146);
	return c
}

function Ec(a, b, c) {
	a = Kb("/dev", a);
	var d = Dc(!!b, !!c);
	Fc || (Fc = 64);
	var f = Fc++ << 8 | 0;
	Ob(f, {
		open: function (a) {
			a.seekable = !1
		},
		close: function () {
			c && c.buffer && c.buffer.length && c(10)
		},
		read: function (a, c, d, f) {
			for (var g = 0, h = 0; h < f; h++) {
				try {
					var r = b()
				} catch (da) {
					throw new z(w.Qc);
				}
				if (void 0 === r && 0 === g) throw new z(w.qd);
				if (null === r || void 0 === r) break;
				g++;
				c[d + h] = r
			}
			g && (a.node.timestamp = Date.now());
			return g
		},
		write: function (a, b, d, f) {
			for (var g = 0; g < f; g++) try {
				c(b[d + g])
			} catch (v) {
				throw new z(w.Qc);
			}
			f && (a.node.timestamp = Date.now());
			return g
		}
	});
	vc(a, d, f)
}
var Fc, FS = {},
	lc, rc, yc, Gc = {},
	Hc = 0;

function Ic() {
	Hc += 4;
	return p[Hc - 4 >> 2]
}

function Jc() {
	var a = $b[Ic()];
	if (!a) throw new z(w.wc);
	return a
}

function Kc(a) {
	switch (a) {
		case 1:
			return 0;
		case 2:
			return 1;
		case 4:
			return 2;
		case 8:
			return 3;
		default:
			throw new TypeError("Unknown type size: " + a);
	}
}
var Lc = void 0;

function Mc(a) {
	for (var b = ""; n[a];) b += Lc[n[a++]];
	return b
}
var Nc = {},
	Oc = {},
	Pc = {};

function Qc(a) {
	if (void 0 === a) return "_unknown";
	a = a.replace(/[^a-zA-Z0-9_]/g, "$");
	var b = a.charCodeAt(0);
	return 48 <= b && 57 >= b ? "_" + a : a
}

function Rc(a, b) {
	a = Qc(a);
	return (new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'))(b)
}

function Sc(a) {
	var b = Error,
		c = Rc(a, function (b) {
			this.name = a;
			this.message = b;
			b = Error(b).stack;
			void 0 !== b && (this.stack = this.toString() + "\n" + b.replace(/^Error(:[^\n]*)?\n/, ""))
		});
	c.prototype = Object.create(b.prototype);
	c.prototype.constructor = c;
	c.prototype.toString = function () {
		return void 0 === this.message ? this.name : this.name + ": " + this.message
	};
	return c
}
var Tc = void 0;

function Uc(a) {
	throw new Tc(a);
}
var Vc = void 0;

function Wc(a, b) {
	var c = [];

	function d(a) {
		a = b(a);
		if (a.length !== c.length) throw new Vc("Mismatched type converter count");
		for (var d = 0; d < c.length; ++d) Xc(c[d], a[d])
	}
	c.forEach(function (b) {
		Pc[b] = a
	});
	var f = Array(a.length),
		g = [],
		h = 0;
	a.forEach(function (a, b) {
		Oc.hasOwnProperty(a) ? f[b] = Oc[a] : (g.push(a), Nc.hasOwnProperty(a) || (Nc[a] = []), Nc[a].push(function () {
			f[b] = Oc[a];
			++h;
			h === g.length && d(f)
		}))
	});
	0 === g.length && d(f)
}

function Xc(a, b, c) {
	c = c || {};
	if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
	var d = b.name;
	a || Uc('type "' + d + '" must have a positive integer typeid pointer');
	if (Oc.hasOwnProperty(a)) {
		if (c.Zd) return;
		Uc("Cannot register type '" + d + "' twice")
	}
	Oc[a] = b;
	delete Pc[a];
	Nc.hasOwnProperty(a) && (b = Nc[a], delete Nc[a], b.forEach(function (a) {
		a()
	}))
}
var Yc = [],
	Zc = [{}, {
		value: void 0
	}, {
		value: null
	}, {
		value: !0
	}, {
		value: !1
	}];

function $c(a) {
	switch (a) {
		case void 0:
			return 1;
		case null:
			return 2;
		case !0:
			return 3;
		case !1:
			return 4;
		default:
			var b = Yc.length ? Yc.pop() : Zc.length;
			Zc[b] = {
				je: 1,
				value: a
			};
			return b
	}
}

function ad(a) {
	return this.fromWireType(Na[a >> 2])
}

function bd(a) {
	if (null === a) return "null";
	var b = typeof a;
	return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a
}

function cd(a, b) {
	switch (b) {
		case 2:
			return function (a) {
				return this.fromWireType(Oa[a >> 2])
			};
		case 3:
			return function (a) {
				return this.fromWireType(Qa[a >> 3])
			};
		default:
			throw new TypeError("Unknown float type: " + a);
	}
}

function dd(a) {
	var b = Function;
	if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
	var c = Rc(b.name || "unknownFunctionName", function () {});
	c.prototype = b.prototype;
	c = new c;
	a = b.apply(c, a);
	return a instanceof Object ? a : c
}

function ed(a) {
	for (; a.length;) {
		var b = a.pop();
		a.pop()(b)
	}
}

function fd(a, b) {
	var c = e;
	if (void 0 === c[a].tc) {
		var d = c[a];
		c[a] = function () {
			c[a].tc.hasOwnProperty(arguments.length) || Uc("Function '" + b + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c[a].tc + ")!");
			return c[a].tc[arguments.length].apply(this, arguments)
		};
		c[a].tc = [];
		c[a].tc[d.Rd] = d
	}
}

function gd(a, b, c) {
	e.hasOwnProperty(a) ? ((void 0 === c || void 0 !== e[a].tc && void 0 !== e[a].tc[c]) && Uc("Cannot register public name '" + a + "' twice"), fd(a, a), e.hasOwnProperty(c) && Uc("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), e[a].tc[c] = b) : (e[a] = b, void 0 !== c && (e[a].Dg = c))
}

function hd(a, b) {
	for (var c = [], d = 0; d < a; d++) c.push(p[(b >> 2) + d]);
	return c
}

function id(a, b) {
	a = Mc(a);
	if (void 0 !== e["FUNCTION_TABLE_" + a]) var c = e["FUNCTION_TABLE_" + a][b];
	else if ("undefined" !== typeof FUNCTION_TABLE) c = FUNCTION_TABLE[b];
	else {
		c = e["dynCall_" + a];
		void 0 === c && (c = e["dynCall_" + a.replace(/f/g, "d")], void 0 === c && Uc("No dynCall invoker for signature: " + a));
		for (var d = [], f = 1; f < a.length; ++f) d.push("a" + f);
		f = "return function " + ("dynCall_" + a + "_" + b) + "(" + d.join(", ") + ") {\n";
		f += "    return dynCall(rawFunction" + (d.length ? ", " : "") + d.join(", ") + ");\n";
		c = (new Function("dynCall", "rawFunction",
			f + "};\n"))(c, b)
	}
	"function" !== typeof c && Uc("unknown function pointer with signature " + a + ": " + b);
	return c
}
var jd = void 0;

function kd(a) {
	a = ld(a);
	var b = Mc(a);
	Ia(a);
	return b
}

function md(a, b) {
	function c(a) {
		f[a] || Oc[a] || (Pc[a] ? Pc[a].forEach(c) : (d.push(a), f[a] = !0))
	}
	var d = [],
		f = {};
	b.forEach(c);
	throw new jd(a + ": " + d.map(kd).join([", "]));
}

function nd(a, b, c) {
	switch (b) {
		case 0:
			return c ? function (a) {
				return Ea[a]
			} : function (a) {
				return n[a]
			};
		case 1:
			return c ? function (a) {
				return La[a >> 1]
			} : function (a) {
				return Ma[a >> 1]
			};
		case 2:
			return c ? function (a) {
				return p[a >> 2]
			} : function (a) {
				return Na[a >> 2]
			};
		default:
			throw new TypeError("Unknown integer type: " + a);
	}
}

function od(a, b) {
	pd = a;
	qd = b;
	if (!rd) console.error("emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.");
	else if (0 == a) sd = function () {
		var a = Math.max(0, td + b - ud()) | 0;
		setTimeout(vd, a)
	}, wd = "timeout";
	else if (1 == a) sd = function () {
		xd(vd)
	}, wd = "rAF";
	else if (2 == a) {
		if ("undefined" === typeof setImmediate) {
			var c = [];
			addEventListener("message", function (a) {
				if ("setimmediate" === a.data || "setimmediate" === a.data.target) a.stopPropagation(),
					c.shift()()
			}, !0);
			setImmediate = function (a) {
				c.push(a);
				fa ? (void 0 === e.setImmediates && (e.setImmediates = []), e.setImmediates.push(a), postMessage({
					target: "setimmediate"
				})) : postMessage("setimmediate", "*")
			}
		}
		sd = function () {
			setImmediate(vd)
		};
		wd = "immediate"
	}
}

function ud() {
	k()
}

function yd(a, b, c, d, f) {
	e.noExitRuntime = !0;
	assert(!rd, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
	rd = a;
	zd = d;
	var g = "undefined" !== typeof d ? function () {
		e.dynCall_vi(a, d)
	} : function () {
		e.dynCall_v(a)
	};
	var h = Ad;
	vd = function () {
		if (!wa)
			if (0 < Bd.length) {
				var a = Date.now(),
					b = Bd.shift();
				b.uc(b.Lc);
				if (Cd) {
					var c = Cd,
						d = 0 == c % 1 ? c - 1 : Math.floor(c);
					Cd = b.tg ? d : (8 * c + (d + .5)) / 9
				}
				console.log('main loop blocker "' +
					b.name + '" took ' + (Date.now() - a) + " ms");
				e.setStatus && (a = e.statusMessage || "Please wait...", b = Cd, c = Dd.vg, b ? b < c ? e.setStatus(a + " (" + (c - b) + "/" + c + ")") : e.setStatus(a) : e.setStatus(""));
				h < Ad || setTimeout(vd, 0)
			} else if (!(h < Ad))
			if (Ed = Ed + 1 | 0, 1 == pd && 1 < qd && 0 != Ed % qd) sd();
			else {
				0 == pd && (td = ud());
				if (D)
					for (a = D.Jc, D.Jc = D.Pc, D.Pc = a, a = D.Ac, D.Ac = D.$c, D.$c = a, a = Fd[2097152], b = 0; b <= a; ++b) D.Ac[b] = 0;
				"timeout" === wd && e.Mc && (l("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"),
					wd = "");
				a: if (!(wa || e.preMainLoop && !1 === e.preMainLoop())) {
					try {
						g()
					} catch (A) {
						if (A instanceof na) break a;
						A && "object" === typeof A && A.stack && l("exception thrown: " + [A, A.stack]);
						throw A;
					}
					e.postMainLoop && e.postMainLoop()
				}
				$a();
				h < Ad || ("object" === typeof SDL && SDL.audio && SDL.audio.ie && SDL.audio.ie(), sd())
			}
	};
	f || (b && 0 < b ? od(0, 1E3 / b) : od(1, 1), sd());
	if (c) throw "SimulateInfiniteLoop";
}
var sd = null,
	wd = "",
	Ad = 0,
	rd = null,
	zd = 0,
	pd = 0,
	qd = 0,
	Ed = 0,
	Bd = [],
	Dd = {},
	td, vd, Cd, Gd = !1,
	Hd = !1,
	Id = [];

function Jd() {
	function a() {
		Hd = document.pointerLockElement === e.canvas || document.mozPointerLockElement === e.canvas || document.webkitPointerLockElement === e.canvas || document.msPointerLockElement === e.canvas
	}
	e.preloadPlugins || (e.preloadPlugins = []);
	if (!Kd) {
		Kd = !0;
		try {
			Ld = !0
		} catch (c) {
			Ld = !1, console.log("warning: no blob constructor, cannot create blobs with mimetypes")
		}
		Md = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : Ld ? null : console.log("warning: no BlobBuilder");
		Nd = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : void 0;
		e.Jd || "undefined" !== typeof Nd || (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."), e.Jd = !0);
		e.preloadPlugins.push({
			canHandle: function (a) {
				return !e.Jd && /\.(jpg|jpeg|png|bmp)$/i.test(a)
			},
			handle: function (a, b, f, g) {
				var c = null;
				if (Ld) try {
					c = new Blob([a], {
						type: Od(b)
					}), c.size !== a.length && (c = new Blob([(new Uint8Array(a)).buffer], {
						type: Od(b)
					}))
				} catch (u) {
					ta("Blob constructor present but fails: " +
						u + "; falling back to blob builder")
				}
				c || (c = new Md, c.append((new Uint8Array(a)).buffer), c = c.getBlob());
				var d = Nd.createObjectURL(c);
				assert("string" == typeof d, "createObjectURL must return a url as a string");
				var x = new Image;
				x.onload = function () {
					assert(x.complete, "Image " + b + " could not be decoded");
					var c = document.createElement("canvas");
					c.width = x.width;
					c.height = x.height;
					c.getContext("2d").drawImage(x, 0, 0);
					e.preloadedImages[b] = c;
					Nd.revokeObjectURL(d);
					f && f(a)
				};
				x.onerror = function () {
					console.log("Image " + d +
						" could not be decoded");
					g && g()
				};
				x.src = d
			}
		});
		e.preloadPlugins.push({
			canHandle: function (a) {
				return !e.Cg && a.substr(-4) in {
					".ogg": 1,
					".wav": 1,
					".mp3": 1
				}
			},
			handle: function (a, b, f, g) {
				function c(c) {
					x || (x = !0, e.preloadedAudios[b] = c, f && f(a))
				}

				function d() {
					x || (x = !0, e.preloadedAudios[b] = new Audio, g && g())
				}
				var x = !1;
				if (Ld) {
					try {
						var u = new Blob([a], {
							type: Od(b)
						})
					} catch (A) {
						return d()
					}
					u = Nd.createObjectURL(u);
					assert("string" == typeof u, "createObjectURL must return a url as a string");
					var v = new Audio;
					v.addEventListener("canplaythrough",
						function () {
							c(v)
						}, !1);
					v.onerror = function () {
						if (!x) {
							console.log("warning: browser could not fully decode audio " + b + ", trying slower base64 approach");
							for (var d = "", f = 0, g = 0, h = 0; h < a.length; h++)
								for (f = f << 8 | a[h], g += 8; 6 <= g;) {
									var r = f >> g - 6 & 63;
									g -= 6;
									d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [r]
								}
							2 == g ? (d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(f & 3) << 4], d += "==") : 4 == g && (d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(f & 15) << 2], d += "=");
							v.src =
								"data:audio/x-" + b.substr(-3) + ";base64," + d;
							c(v)
						}
					};
					v.src = u;
					Pd(function () {
						c(v)
					})
				} else return d()
			}
		});
		var b = e.canvas;
		b && (b.requestPointerLock = b.requestPointerLock || b.mozRequestPointerLock || b.webkitRequestPointerLock || b.msRequestPointerLock || function () {}, b.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || function () {}, b.exitPointerLock = b.exitPointerLock.bind(document), document.addEventListener("pointerlockchange", a, !1), document.addEventListener("mozpointerlockchange",
			a, !1), document.addEventListener("webkitpointerlockchange", a, !1), document.addEventListener("mspointerlockchange", a, !1), e.elementPointerLock && b.addEventListener("click", function (a) {
			!Hd && e.canvas.requestPointerLock && (e.canvas.requestPointerLock(), a.preventDefault())
		}, !1))
	}
}

function Qd(a, b, c, d) {
	if (b && e.Mc && a == e.canvas) return e.Mc;
	if (b) {
		var f = {
			antialias: !1,
			alpha: !1
		};
		if (d)
			for (var g in d) f[g] = d[g];
		if (f = Rd(a, f)) var h = Sd[f].GLctx
	} else h = a.getContext("2d");
	if (!h) return null;
	c && (b || assert("undefined" === typeof GLctx, "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"), e.Mc = h, b && Td(f), e.Gg = b, Id.forEach(function (a) {
		a()
	}), Jd());
	return h
}
var Ud = !1,
	Vd = void 0,
	Wd = void 0;

function Xd(a, b, c) {
	function d() {
		Gd = !1;
		var a = f.parentNode;
		(document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === a ? (f.exitFullscreen = document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || function () {}, f.exitFullscreen = f.exitFullscreen.bind(document), Vd && f.requestPointerLock(), Gd = !0, Wd ? ("undefined" != typeof SDL &&
			(p[SDL.screen >> 2] = Na[SDL.screen >> 2] | 8388608), Yd(e.canvas), Zd()) : Yd(f)) : (a.parentNode.insertBefore(f, a), a.parentNode.removeChild(a), Wd ? ("undefined" != typeof SDL && (p[SDL.screen >> 2] = Na[SDL.screen >> 2] & -8388609), Yd(e.canvas), Zd()) : Yd(f));
		if (e.onFullScreen) e.onFullScreen(Gd);
		if (e.onFullscreen) e.onFullscreen(Gd)
	}
	Vd = a;
	Wd = b;
	$d = c;
	"undefined" === typeof Vd && (Vd = !0);
	"undefined" === typeof Wd && (Wd = !1);
	"undefined" === typeof $d && ($d = null);
	var f = e.canvas;
	Ud || (Ud = !0, document.addEventListener("fullscreenchange", d, !1), document.addEventListener("mozfullscreenchange",
		d, !1), document.addEventListener("webkitfullscreenchange", d, !1), document.addEventListener("MSFullscreenChange", d, !1));
	var g = document.createElement("div");
	f.parentNode.insertBefore(g, f);
	g.appendChild(f);
	g.requestFullscreen = g.requestFullscreen || g.mozRequestFullScreen || g.msRequestFullscreen || (g.webkitRequestFullscreen ? function () {
		g.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
	} : null) || (g.webkitRequestFullScreen ? function () {
		g.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
	} : null);
	c ? g.requestFullscreen({
			Hg: c
		}) :
		g.requestFullscreen()
}

function ae(a, b, c) {
	l("Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead.");
	ae = function (a, b, c) {
		return Xd(a, b, c)
	};
	return Xd(a, b, c)
}
var be = 0;

function ce(a) {
	var b = Date.now();
	if (0 === be) be = b + 1E3 / 60;
	else
		for (; b + 2 >= be;) be += 1E3 / 60;
	setTimeout(a, Math.max(be - b, 0))
}

function xd(a) {
	"undefined" === typeof window ? ce(a) : (window.requestAnimationFrame || (window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || ce), window.requestAnimationFrame(a))
}

function Pd(a) {
	e.noExitRuntime = !0;
	setTimeout(function () {
		wa || a()
	}, 1E4)
}

function Od(a) {
	return {
		jpg: "image/jpeg",
		jpeg: "image/jpeg",
		png: "image/png",
		bmp: "image/bmp",
		ogg: "audio/ogg",
		wav: "audio/wav",
		mp3: "audio/mpeg"
	}[a.substr(a.lastIndexOf(".") + 1)]
}

function de(a, b, c) {
	e.readAsync(a, function (c) {
		assert(c, 'Loading data file "' + a + '" failed (no arrayBuffer).');
		b(new Uint8Array(c))
	}, function () {
		if (c) c();
		else throw 'Loading data file "' + a + '" failed.';
	})
}
var ee = [];

function Zd() {
	var a = e.canvas;
	ee.forEach(function (b) {
		b(a.width, a.height)
	})
}

function Yd(a, b, c) {
	b && c ? (a.se = b, a.Yd = c) : (b = a.se, c = a.Yd);
	var d = b,
		f = c;
	e.forcedAspectRatio && 0 < e.forcedAspectRatio && (d / f < e.forcedAspectRatio ? d = Math.round(f * e.forcedAspectRatio) : f = Math.round(d / e.forcedAspectRatio));
	if ((document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === a.parentNode && "undefined" != typeof screen) {
		var g = Math.min(screen.width / d, screen.height / f);
		d = Math.round(d * g);
		f = Math.round(f *
			g)
	}
	Wd ? (a.width != d && (a.width = d), a.height != f && (a.height = f), "undefined" != typeof a.style && (a.style.removeProperty("width"), a.style.removeProperty("height"))) : (a.width != b && (a.width = b), a.height != c && (a.height = c), "undefined" != typeof a.style && (d != b || f != c ? (a.style.setProperty("width", d + "px", "important"), a.style.setProperty("height", f + "px", "important")) : (a.style.removeProperty("width"), a.style.removeProperty("height"))))
}
var Kd, Ld, Md, Nd, $d, fe = 0,
	ge = 0,
	he = 0,
	ie = 0,
	je = null,
	ke = null,
	le = !1;

function me() {
	++ie
}

function ne() {
	--ie
}

function pe() {
	for (var a = qe.length - 1; 0 <= a; --a) re(a);
	qe = [];
	se = [];
	window.removeEventListener("gamepadconnected", me);
	window.removeEventListener("gamepaddisconnected", ne)
}

function te(a) {
	return a ? ("number" == typeof a && (a = xa(a)), "#window" == a ? window : "#document" == a ? document : "#screen" == a ? window.screen : "#canvas" == a ? e.canvas : "string" == typeof a ? document.getElementById(a) : a) : window
}
var se = [];

function ue() {
	if (ve && we.Tc)
		for (var a = 0; a < se.length; ++a) {
			var b = se[a];
			se.splice(a, 1);
			--a;
			b.Eg.apply(this, b.sg)
		}
}
var ve = 0,
	we = null,
	qe = [];

function re(a) {
	var b = qe[a];
	b.target.removeEventListener(b.Hc, b.Vd, b.cd);
	qe.splice(a, 1)
}

function xe(a) {
	function b(b) {
		++ve;
		we = a;
		ue();
		a.ld(b);
		ue();
		--ve
	}
	if (a.hd) a.Vd = b, a.target.addEventListener(a.Hc, b, a.cd), qe.push(a), le || (ib.push(pe), le = !0);
	else
		for (var c = 0; c < qe.length; ++c) qe[c].target == a.target && qe[c].Hc == a.Hc && re(c--)
}

function ye(a, b, c) {
	Qa[a >> 3] = window.performance && window.performance.now ? window.performance.now() : Date.now();
	p[a + 8 >> 2] = b.screenX;
	p[a + 12 >> 2] = b.screenY;
	p[a + 16 >> 2] = b.clientX;
	p[a + 20 >> 2] = b.clientY;
	p[a + 24 >> 2] = b.ctrlKey;
	p[a + 28 >> 2] = b.shiftKey;
	p[a + 32 >> 2] = b.altKey;
	p[a + 36 >> 2] = b.metaKey;
	La[a + 40 >> 1] = b.button;
	La[a + 42 >> 1] = b.buttons;
	p[a + 44 >> 2] = b.movementX || b.mozMovementX || b.webkitMovementX || b.screenX - je;
	p[a + 48 >> 2] = b.movementY || b.mozMovementY || b.webkitMovementY || b.screenY - ke;
	if (e.canvas) {
		var d = e.canvas.getBoundingClientRect();
		p[a + 60 >> 2] = b.clientX - d.left;
		p[a + 64 >> 2] = b.clientY - d.top
	} else p[a + 60 >> 2] = 0, p[a + 64 >> 2] = 0;
	c ? (d = c.getBoundingClientRect ? c.getBoundingClientRect() : {
		left: 0,
		top: 0
	}, p[a + 52 >> 2] = b.clientX - d.left, p[a + 56 >> 2] = b.clientY - d.top) : (p[a + 52 >> 2] = 0, p[a + 56 >> 2] = 0);
	"wheel" !== b.type && "mousewheel" !== b.type && (je = b.screenX, ke = b.screenY)
}

function ze(a, b, c, d, f, g) {
	fe || (fe = Ha(72));
	a = te(a);
	c = {
		target: a,
		Tc: "mousemove" != g && "mouseenter" != g && "mouseleave" != g,
		Hc: g,
		hd: d,
		ld: function (c) {
			c = c || window.event;
			ye(fe, c, a);
			e.dynCall_iiii(d, f, fe, b) && c.preventDefault()
		},
		cd: c
	};
	(-1 !== navigator.userAgent.indexOf("MSIE") || 0 < navigator.appVersion.indexOf("Trident/")) && "mousedown" == g && (c.Tc = !1);
	xe(c)
}

function Ae(a, b, c, d, f) {
	function g(c) {
		c = c || window.event;
		ye(ge, c, a);
		Qa[ge + 72 >> 3] = c.wheelDeltaX || 0;
		Qa[ge + 80 >> 3] = -(c.wheelDeltaY ? c.wheelDeltaY : c.wheelDelta);
		Qa[ge + 88 >> 3] = 0;
		p[ge + 96 >> 2] = 0;
		e.dynCall_iiii(d, 9, ge, b) && c.preventDefault()
	}

	function h(c) {
		c = c || window.event;
		var f = ge;
		ye(f, c, a);
		Qa[f + 72 >> 3] = c.deltaX;
		Qa[f + 80 >> 3] = c.deltaY;
		Qa[f + 88 >> 3] = c.deltaZ;
		p[f + 96 >> 2] = c.deltaMode;
		e.dynCall_iiii(d, 9, f, b) && c.preventDefault()
	}
	ge || (ge = Ha(104));
	a = te(a);
	xe({
		target: a,
		Tc: !0,
		Hc: f,
		hd: d,
		ld: "wheel" == f ? h : g,
		cd: c
	})
}

function Be(a, b, c, d, f, g) {
	he || (he = Ha(1684));
	a = te(a);
	xe({
		target: a,
		Tc: "touchstart" == g || "touchend" == g,
		Hc: g,
		hd: d,
		ld: function (c) {
			c = c || window.event;
			for (var g = {}, h = 0; h < c.touches.length; ++h) {
				var u = c.touches[h];
				g[u.identifier] = u
			}
			for (h = 0; h < c.changedTouches.length; ++h) u = c.changedTouches[h], g[u.identifier] = u, u.Ud = !0;
			for (h = 0; h < c.targetTouches.length; ++h) u = c.targetTouches[h], g[u.identifier].ee = !0;
			var v = u = he;
			p[v + 4 >> 2] = c.ctrlKey;
			p[v + 8 >> 2] = c.shiftKey;
			p[v + 12 >> 2] = c.altKey;
			p[v + 16 >> 2] = c.metaKey;
			v += 20;
			var A = e.canvas ? e.canvas.getBoundingClientRect() :
				void 0,
				da = a.getBoundingClientRect ? a.getBoundingClientRect() : {
					left: 0,
					top: 0
				},
				ea = 0;
			for (h in g) {
				var y = g[h];
				p[v >> 2] = y.identifier;
				p[v + 4 >> 2] = y.screenX;
				p[v + 8 >> 2] = y.screenY;
				p[v + 12 >> 2] = y.clientX;
				p[v + 16 >> 2] = y.clientY;
				p[v + 20 >> 2] = y.pageX;
				p[v + 24 >> 2] = y.pageY;
				p[v + 28 >> 2] = y.Ud;
				p[v + 32 >> 2] = y.ee;
				A ? (p[v + 44 >> 2] = y.clientX - A.left, p[v + 48 >> 2] = y.clientY - A.top) : (p[v + 44 >> 2] = 0, p[v + 48 >> 2] = 0);
				p[v + 36 >> 2] = y.clientX - da.left;
				p[v + 40 >> 2] = y.clientY - da.top;
				v += 52;
				if (32 <= ++ea) break
			}
			p[u >> 2] = ea;
			e.dynCall_iiii(d, f, u, b) && c.preventDefault()
		},
		cd: c
	})
}
var Ce = 1,
	De = 0,
	Ee = [],
	Fe = [],
	Ge = [],
	He = [],
	Ie = [],
	Sd = [],
	D = null,
	Je = {},
	Ke = 0,
	Le = 0,
	Me = [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
	Ne = {},
	Oe = [],
	Pe = 4;

function Qe(a) {
	De || (De = a)
}

function Re(a) {
	for (var b = Ce++, c = a.length; c < b; c++) a[c] = null;
	return b
}
var Se = null,
	Te = [0],
	Fd = null;

function Rd(a, b) {
	function c() {}
	"undefined" === typeof b.majorVersion && "undefined" === typeof b.minorVersion && (b.majorVersion = 1, b.minorVersion = 0);
	try {
		a.addEventListener("webglcontextcreationerror", c, !1);
		try {
			if (1 == b.majorVersion && 0 == b.minorVersion) var d = a.getContext("webgl", b) || a.getContext("experimental-webgl", b);
			else if (2 == b.majorVersion && 0 == b.minorVersion) d = a.getContext("webgl2", b);
			else throw "Unsupported WebGL context version " + majorVersion + "." + minorVersion + "!";
		} finally {
			a.removeEventListener("webglcontextcreationerror",
				c, !1)
		}
		if (!d) throw ":(";
	} catch (f) {
		return 0
	}
	return d ? Ue(d, b) : 0
}

function Ue(a, b) {
	var c = Re(Sd),
		d = {
			handle: c,
			attributes: b,
			version: b.majorVersion,
			GLctx: a
		};
	a.canvas && (a.canvas.rg = d);
	Sd[c] = d;
	("undefined" === typeof b.enableExtensionsByDefault || b.enableExtensionsByDefault) && Ve(d);
	d.Gd = d.GLctx.getParameter(d.GLctx.MAX_VERTEX_ATTRIBS);
	d.Uc = [];
	for (a = 0; a < d.Gd; a++) d.Uc[a] = {
		enabled: !1,
		jd: !1,
		size: 0,
		type: 0,
		Kd: 0,
		pd: 0,
		Zc: 0,
		Nd: null
	};
	a = Fd[2097152];
	d.Ac = [];
	d.$c = [];
	d.Ac.length = d.$c.length = a + 1;
	d.Jc = [];
	d.Pc = [];
	d.Jc.length = d.Pc.length = a + 1;
	d.Ic = [];
	d.Ic.length = a + 1;
	for (b = 0; b <= a; ++b) {
		d.Ic[b] =
			null;
		d.Ac[b] = d.$c[b] = 0;
		d.Jc[b] = [];
		d.Pc[b] = [];
		var f = d.Jc[b],
			g = d.Pc[b];
		f.length = g.length = 64;
		for (var h = 0; 64 > h; ++h) f[h] = g[h] = null
	}
	return c
}

function Td(a) {
	if (!a) return GLctx = e.Mc = D = null, !0;
	a = Sd[a];
	if (!a) return !1;
	GLctx = e.Mc = a.GLctx;
	D = a;
	return !0
}

function Ve(a) {
	a || (a = D);
	if (!a.$d) {
		a.$d = !0;
		var b = a.GLctx;
		if (2 > a.version) {
			var c = b.getExtension("ANGLE_instanced_arrays");
			c && (b.vertexAttribDivisor = function (a, b) {
				c.vertexAttribDivisorANGLE(a, b)
			}, b.drawArraysInstanced = function (a, b, d, f) {
				c.drawArraysInstancedANGLE(a, b, d, f)
			}, b.drawElementsInstanced = function (a, b, d, f, g) {
				c.drawElementsInstancedANGLE(a, b, d, f, g)
			});
			var d = b.getExtension("OES_vertex_array_object");
			d && (b.createVertexArray = function () {
					return d.createVertexArrayOES()
				}, b.deleteVertexArray = function (a) {
					d.deleteVertexArrayOES(a)
				},
				b.bindVertexArray = function (a) {
					d.bindVertexArrayOES(a)
				}, b.isVertexArray = function (a) {
					return d.isVertexArrayOES(a)
				});
			var f = b.getExtension("WEBGL_draw_buffers");
			f && (b.drawBuffers = function (a, b) {
				f.drawBuffersWEBGL(a, b)
			})
		}
		b.ug = b.getExtension("EXT_disjoint_timer_query");
		var g = "OES_texture_float OES_texture_half_float OES_standard_derivatives OES_vertex_array_object WEBGL_compressed_texture_s3tc WEBGL_depth_texture OES_element_index_uint EXT_texture_filter_anisotropic EXT_frag_depth WEBGL_draw_buffers ANGLE_instanced_arrays OES_texture_float_linear OES_texture_half_float_linear EXT_blend_minmax EXT_shader_texture_lod WEBGL_compressed_texture_pvrtc EXT_color_buffer_half_float WEBGL_color_buffer_float EXT_sRGB WEBGL_compressed_texture_etc1 EXT_disjoint_timer_query WEBGL_compressed_texture_etc WEBGL_compressed_texture_astc EXT_color_buffer_float WEBGL_compressed_texture_s3tc_srgb EXT_disjoint_timer_query_webgl2".split(" ");
		(a = b.getSupportedExtensions()) && 0 < a.length && b.getSupportedExtensions().forEach(function (a) {
			-1 != g.indexOf(a) && b.getExtension(a)
		})
	}
}
var We, Xe = {};

function Ye(a) {
	if (0 === a) return 0;
	a = xa(a);
	if (!Xe.hasOwnProperty(a)) return 0;
	Ye.oc && Ia(Ye.oc);
	a = Xe[a];
	var b = Ca(a) + 1,
		c = Ha(b);
	c && Aa(a, Ea, c, b);
	Ye.oc = c;
	return Ye.oc
}

function _glDrawElements(a, b, c, d) {
	if (!Le) {
		var f = 1 * Me[c - 5120] * b;
		var g = Fd[f];
		var h = D.Ic[g];
		h ? g = h : (h = GLctx.getParameter(GLctx.ELEMENT_ARRAY_BUFFER_BINDING), D.Ic[g] = GLctx.createBuffer(), GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, D.Ic[g]), GLctx.bufferData(GLctx.ELEMENT_ARRAY_BUFFER, 1 << g, GLctx.DYNAMIC_DRAW), GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, h), g = D.Ic[g]);
		GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, g);
		GLctx.bufferSubData(GLctx.ELEMENT_ARRAY_BUFFER, 0, n.subarray(d, d + f));
		d = 0
	}
	We = !1;
	for (f = 0; f < D.Gd; ++f)
		if (g =
			D.Uc[f], g.jd && g.enabled) {
			We = !0;
			h = g.pd;
			h = 0 < h ? b * h : g.size * Me[g.type - 5120] * b;
			var r = Fd[h];
			var x = D.Jc[r],
				u = D.Ac[r];
			D.Ac[r] = D.Ac[r] + 1 & 63;
			var v = x[u];
			v ? r = v : (v = GLctx.getParameter(GLctx.ARRAY_BUFFER_BINDING), x[u] = GLctx.createBuffer(), GLctx.bindBuffer(GLctx.ARRAY_BUFFER, x[u]), GLctx.bufferData(GLctx.ARRAY_BUFFER, 1 << r, GLctx.DYNAMIC_DRAW), GLctx.bindBuffer(GLctx.ARRAY_BUFFER, v), r = x[u]);
			GLctx.bindBuffer(GLctx.ARRAY_BUFFER, r);
			GLctx.bufferSubData(GLctx.ARRAY_BUFFER, 0, n.subarray(g.Zc, g.Zc + h));
			g.Nd.call(GLctx, f, g.size,
				g.type, g.Kd, g.pd, 0)
		}
	GLctx.drawElements(a, b, c, d);
	We && GLctx.bindBuffer(GLctx.ARRAY_BUFFER, Ee[Ke]);
	Le || GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, null)
}

function Ze(a, b, c, d, f) {
	switch (b) {
		case 6406:
		case 6409:
		case 6402:
			b = 1;
			break;
		case 6410:
			b = 2;
			break;
		case 6407:
		case 35904:
			b = 3;
			break;
		case 6408:
		case 35906:
			b = 4;
			break;
		default:
			return Qe(1280), null
	}
	switch (a) {
		case 5121:
			var g = 1 * b;
			break;
		case 5123:
		case 36193:
			g = 2 * b;
			break;
		case 5125:
		case 5126:
			g = 4 * b;
			break;
		case 34042:
			g = 4;
			break;
		case 33635:
		case 32819:
		case 32820:
			g = 2;
			break;
		default:
			return Qe(1280), null
	}
	b = Pe;
	c *= g;
	b *= Math.floor((c + b - 1) / b);
	d = 0 >= d ? 0 : (d - 1) * b + c;
	switch (a) {
		case 5121:
			return n.subarray(f, f + d);
		case 5126:
			return Oa.subarray(f >>
				2, f + d >> 2);
		case 5125:
		case 34042:
			return Na.subarray(f >> 2, f + d >> 2);
		case 5123:
		case 33635:
		case 32819:
		case 32820:
		case 36193:
			return Ma.subarray(f >> 1, f + d >> 1);
		default:
			return Qe(1280), null
	}
}

function $e() {
	$e.oc || ($e.oc = []);
	$e.oc.push(pa());
	return $e.oc.length - 1
}
var af = {},
	bf = 1;

function cf(a, b) {
	cf.oc || (cf.oc = {});
	a in cf.oc || (e.dynCall_v(b), cf.oc[a] = 1)
}

function df(a) {
	return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
}

function ef(a, b) {
	for (var c = 0, d = 0; d <= b; c += a[d++]);
	return c
}
var ff = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	gf = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function hf(a, b) {
	for (a = new Date(a.getTime()); 0 < b;) {
		var c = a.getMonth(),
			d = (df(a.getFullYear()) ? ff : gf)[c];
		if (b > d - a.getDate()) b -= d - a.getDate() + 1, a.setDate(1), 11 > c ? a.setMonth(c + 1) : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1));
		else {
			a.setDate(a.getDate() + b);
			break
		}
	}
	return a
}

function jf(a, b, c, d) {
	function f(a, b, c) {
		for (a = "number" === typeof a ? a.toString() : a || ""; a.length < b;) a = c[0] + a;
		return a
	}

	function g(a, b) {
		return f(a, b, "0")
	}

	function h(a, b) {
		function c(a) {
			return 0 > a ? -1 : 0 < a ? 1 : 0
		}
		var d;
		0 === (d = c(a.getFullYear() - b.getFullYear())) && 0 === (d = c(a.getMonth() - b.getMonth())) && (d = c(a.getDate() - b.getDate()));
		return d
	}

	function r(a) {
		switch (a.getDay()) {
			case 0:
				return new Date(a.getFullYear() - 1, 11, 29);
			case 1:
				return a;
			case 2:
				return new Date(a.getFullYear(), 0, 3);
			case 3:
				return new Date(a.getFullYear(),
					0, 2);
			case 4:
				return new Date(a.getFullYear(), 0, 1);
			case 5:
				return new Date(a.getFullYear() - 1, 11, 31);
			case 6:
				return new Date(a.getFullYear() - 1, 11, 30)
		}
	}

	function x(a) {
		a = hf(new Date(a.nc + 1900, 0, 1), a.bd);
		var b = r(new Date(a.getFullYear() + 1, 0, 4));
		return 0 >= h(r(new Date(a.getFullYear(), 0, 4)), a) ? 0 >= h(b, a) ? a.getFullYear() + 1 : a.getFullYear() : a.getFullYear() - 1
	}
	var u = p[d + 40 >> 2];
	d = {
		pe: p[d >> 2],
		oe: p[d + 4 >> 2],
		ad: p[d + 8 >> 2],
		Gc: p[d + 12 >> 2],
		Bc: p[d + 16 >> 2],
		nc: p[d + 20 >> 2],
		Ld: p[d + 24 >> 2],
		bd: p[d + 28 >> 2],
		Fg: p[d + 32 >> 2],
		ne: p[d + 36 >> 2],
		qe: u ? xa(u) : ""
	};
	c = xa(c);
	u = {
		"%c": "%a %b %d %H:%M:%S %Y",
		"%D": "%m/%d/%y",
		"%F": "%Y-%m-%d",
		"%h": "%b",
		"%r": "%I:%M:%S %p",
		"%R": "%H:%M",
		"%T": "%H:%M:%S",
		"%x": "%m/%d/%y",
		"%X": "%H:%M:%S"
	};
	for (var v in u) c = c.replace(new RegExp(v, "g"), u[v]);
	var A = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
		da = "January February March April May June July August September October November December".split(" ");
	u = {
		"%a": function (a) {
			return A[a.Ld].substring(0, 3)
		},
		"%A": function (a) {
			return A[a.Ld]
		},
		"%b": function (a) {
			return da[a.Bc].substring(0,
				3)
		},
		"%B": function (a) {
			return da[a.Bc]
		},
		"%C": function (a) {
			return g((a.nc + 1900) / 100 | 0, 2)
		},
		"%d": function (a) {
			return g(a.Gc, 2)
		},
		"%e": function (a) {
			return f(a.Gc, 2, " ")
		},
		"%g": function (a) {
			return x(a).toString().substring(2)
		},
		"%G": function (a) {
			return x(a)
		},
		"%H": function (a) {
			return g(a.ad, 2)
		},
		"%I": function (a) {
			a = a.ad;
			0 == a ? a = 12 : 12 < a && (a -= 12);
			return g(a, 2)
		},
		"%j": function (a) {
			return g(a.Gc + ef(df(a.nc + 1900) ? ff : gf, a.Bc - 1), 3)
		},
		"%m": function (a) {
			return g(a.Bc + 1, 2)
		},
		"%M": function (a) {
			return g(a.oe, 2)
		},
		"%n": function () {
			return "\n"
		},
		"%p": function (a) {
			return 0 <= a.ad && 12 > a.ad ? "AM" : "PM"
		},
		"%S": function (a) {
			return g(a.pe, 2)
		},
		"%t": function () {
			return "\t"
		},
		"%u": function (a) {
			return (new Date(a.nc + 1900, a.Bc + 1, a.Gc, 0, 0, 0, 0)).getDay() || 7
		},
		"%U": function (a) {
			var b = new Date(a.nc + 1900, 0, 1),
				c = 0 === b.getDay() ? b : hf(b, 7 - b.getDay());
			a = new Date(a.nc + 1900, a.Bc, a.Gc);
			return 0 > h(c, a) ? g(Math.ceil((31 - c.getDate() + (ef(df(a.getFullYear()) ? ff : gf, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === h(c, b) ? "01" : "00"
		},
		"%V": function (a) {
			var b = r(new Date(a.nc + 1900, 0, 4)),
				c = r(new Date(a.nc +
					1901, 0, 4)),
				d = hf(new Date(a.nc + 1900, 0, 1), a.bd);
			return 0 > h(d, b) ? "53" : 0 >= h(c, d) ? "01" : g(Math.ceil((b.getFullYear() < a.nc + 1900 ? a.bd + 32 - b.getDate() : a.bd + 1 - b.getDate()) / 7), 2)
		},
		"%w": function (a) {
			return (new Date(a.nc + 1900, a.Bc + 1, a.Gc, 0, 0, 0, 0)).getDay()
		},
		"%W": function (a) {
			var b = new Date(a.nc, 0, 1),
				c = 1 === b.getDay() ? b : hf(b, 0 === b.getDay() ? 1 : 7 - b.getDay() + 1);
			a = new Date(a.nc + 1900, a.Bc, a.Gc);
			return 0 > h(c, a) ? g(Math.ceil((31 - c.getDate() + (ef(df(a.getFullYear()) ? ff : gf, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === h(c, b) ? "01" :
				"00"
		},
		"%y": function (a) {
			return (a.nc + 1900).toString().substring(2)
		},
		"%Y": function (a) {
			return a.nc + 1900
		},
		"%z": function (a) {
			a = a.ne;
			var b = 0 <= a;
			a = Math.abs(a) / 60;
			return (b ? "+" : "-") + String("0000" + (a / 60 * 100 + a % 60)).slice(-4)
		},
		"%Z": function (a) {
			return a.qe
		},
		"%%": function () {
			return "%"
		}
	};
	for (v in u) 0 <= c.indexOf(v) && (c = c.replace(new RegExp(v, "g"), u[v](d)));
	v = Qb(c, !1);
	if (v.length > b) return 0;
	mb(v, a);
	return v.length - 1
}
Bc();
bc = Array(4096);
sc(B, "/");
uc("/tmp");
uc("/home");
uc("/home/web_user");
(function () {
	uc("/dev");
	Ob(259, {
		read: function () {
			return 0
		},
		write: function (a, b, f, g) {
			return g
		}
	});
	vc("/dev/null", 259);
	Nb(1280, Rb);
	Nb(1536, Sb);
	vc("/dev/tty", 1280);
	vc("/dev/tty1", 1536);
	if ("undefined" !== typeof crypto) {
		var a = new Uint8Array(1);
		var b = function () {
			crypto.getRandomValues(a);
			return a[0]
		}
	} else ha ? b = function () {
		return require("crypto").randomBytes(1)[0]
	} : b = function () {
		k("random_device")
	};
	Ec("random", b);
	Ec("urandom", b);
	uc("/dev/shm");
	uc("/dev/shm/tmp")
})();
uc("/proc");
uc("/proc/self");
uc("/proc/self/fd");
sc({
	pc: function () {
		var a = Ub("/proc/self", "fd", 16895, 73);
		a.kc = {
			lookup: function (a, c) {
				var b = $b[+c];
				if (!b) throw new z(w.wc);
				a = {
					parent: null,
					pc: {
						Id: "fake"
					},
					kc: {
						readlink: function () {
							return b.path
						}
					}
				};
				return a.parent = a
			}
		};
		return a
	}
}, "/proc/self/fd");
gb.unshift(function () {
	if (!e.noFSInit && !Cc) {
		assert(!Cc, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
		Cc = !0;
		Bc();
		e.stdin = e.stdin;
		e.stdout = e.stdout;
		e.stderr = e.stderr;
		e.stdin ? Ec("stdin", e.stdin) : wc("/dev/tty", "/dev/stdin");
		e.stdout ? Ec("stdout", null, e.stdout) : wc("/dev/tty", "/dev/stdout");
		e.stderr ? Ec("stderr", null, e.stderr) : wc("/dev/tty1", "/dev/stderr");
		var a = xc("/dev/stdin",
			"r");
		assert(0 === a.fd, "invalid handle for stdin (" + a.fd + ")");
		a = xc("/dev/stdout", "w");
		assert(1 === a.fd, "invalid handle for stdout (" + a.fd + ")");
		a = xc("/dev/stderr", "w");
		assert(2 === a.fd, "invalid handle for stderr (" + a.fd + ")")
	}
});
hb.push(function () {
	cc = !1
});
ib.push(function () {
	Cc = !1;
	var a = e._fflush;
	a && a(0);
	for (a = 0; a < $b.length; a++) {
		var b = $b[a];
		b && zc(b)
	}
});
gb.unshift(function () {});
ib.push(function () {});
if (ha) {
	var fs = require("fs"),
		Xb = require("path");
	C.me()
}
for (var kf = Array(256), lf = 0; 256 > lf; ++lf) kf[lf] = String.fromCharCode(lf);
Lc = kf;
Tc = e.BindingError = Sc("BindingError");
Vc = e.InternalError = Sc("InternalError");
e.count_emval_handles = function () {
	for (var a = 0, b = 5; b < Zc.length; ++b) void 0 !== Zc[b] && ++a;
	return a
};
e.get_first_emval = function () {
	for (var a = 5; a < Zc.length; ++a)
		if (void 0 !== Zc[a]) return Zc[a];
	return null
};
jd = e.UnboundTypeError = Sc("UnboundTypeError");
e.requestFullScreen = function (a, b, c) {
	l("Module.requestFullScreen is deprecated. Please call Module.requestFullscreen instead.");
	e.requestFullScreen = e.requestFullscreen;
	ae(a, b, c)
};
e.requestFullscreen = function (a, b, c) {
	Xd(a, b, c)
};
e.requestAnimationFrame = function (a) {
	xd(a)
};
e.setCanvasSize = function (a, b, c) {
	Yd(e.canvas, a, b);
	c || Zd()
};
e.pauseMainLoop = function () {
	sd = null;
	Ad++
};
e.resumeMainLoop = function () {
	Ad++;
	var a = pd,
		b = qd,
		c = rd;
	rd = null;
	yd(c, 0, !1, zd, !0);
	od(a, b);
	sd()
};
e.getUserMedia = function () {
	window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia);
	window.getUserMedia(void 0)
};
e.createContext = function (a, b, c, d) {
	return Qd(a, b, c, d)
};
ha ? ud = function () {
	var a = process.hrtime();
	return 1E3 * a[0] + a[1] / 1E6
} : "undefined" !== typeof dateNow ? ud = dateNow : "object" === typeof self && self.performance && "function" === typeof self.performance.now ? ud = function () {
	return self.performance.now()
} : "object" === typeof performance && "function" === typeof performance.now ? ud = function () {
	return performance.now()
} : ud = Date.now;
if ("undefined" !== typeof window) {
	window.addEventListener("gamepadconnected", me);
	window.addEventListener("gamepaddisconnected", ne);
	var mf = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : null;
	mf && (ie = mf.length)
}
var GLctx;
Fd = new Uint8Array(2097153);
var nf = 0,
	of = 1;
Fd[0] = 0;
for (var pf = 1; 2097152 >= pf; ++pf) pf > of && ( of <<= 1, ++nf), Fd[pf] = nf;
Se = new Float32Array(256);
for (var qf = 0; 256 > qf; qf++) Te[qf] = Se.subarray(0, qf + 1);
for (qf = 0; 32 > qf; qf++) Oe.push(Array(qf));
assert(!Ua);
var rf = Ta;
Ta = Ta + 4 + 15 & -16;
assert(Ta < m, "not enough memory for static allocation - increase TOTAL_MEMORY");
Za = rf;
Va = Wa = sa(Ta);
Xa = Va + cb;
Ya = sa(Xa);
p[Za >> 2] = Ya;
Ua = !0;
assert(Ya < m, "TOTAL_MEMORY not big enough for stack");

function Qb(a, b) {
	var c = Array(Ca(a) + 1);
	a = Aa(a, c, 0, c.length);
	b && (c.length = a);
	return c
}
var E = ["0", "__Z3cosf", "__Z3sinf", "0"],
	F = "0 __ZZN11Application4InitEvEN3__58__invokeEv __Z7IsReadyv __Z17GetAvailableSkinsv __Z22GetAvailableAnimationsv 0 0 0".split(" "),
	G = "0 __ZNK11UpdateEvent7GetNameEv __ZNK16PointerMoveEvent7GetNameEv __ZNK12MouseUpEvent7GetNameEv __ZNK14MouseDownEvent7GetNameEv __ZNK14PointerUpEvent7GetNameEv __ZNK16PointerDownEvent7GetNameEv __ZNK16MouseScrollEvent7GetNameEv ___stdio_close __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE4syncEv __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE9showmanycEv __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE9underflowEv __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE5uflowEv __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE4syncEv __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE9showmanycEv __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE9underflowEv __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE5uflowEv __ZNSt3__211__stdoutbufIwE4syncEv __ZNSt3__211__stdoutbufIcE4syncEv __ZNSt3__210__stdinbufIwE9underflowEv __ZNSt3__210__stdinbufIwE5uflowEv __ZNSt3__210__stdinbufIcE9underflowEv __ZNSt3__210__stdinbufIcE5uflowEv __ZNKSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE13do_date_orderEv __ZNKSt3__220__time_get_c_storageIcE7__weeksEv __ZNKSt3__220__time_get_c_storageIcE8__monthsEv __ZNKSt3__220__time_get_c_storageIcE7__am_pmEv __ZNKSt3__220__time_get_c_storageIcE3__cEv __ZNKSt3__220__time_get_c_storageIcE3__rEv __ZNKSt3__220__time_get_c_storageIcE3__xEv __ZNKSt3__220__time_get_c_storageIcE3__XEv __ZNKSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE13do_date_orderEv __ZNKSt3__220__time_get_c_storageIwE7__weeksEv __ZNKSt3__220__time_get_c_storageIwE8__monthsEv __ZNKSt3__220__time_get_c_storageIwE7__am_pmEv __ZNKSt3__220__time_get_c_storageIwE3__cEv __ZNKSt3__220__time_get_c_storageIwE3__rEv __ZNKSt3__220__time_get_c_storageIwE3__xEv __ZNKSt3__220__time_get_c_storageIwE3__XEv __ZNKSt3__210moneypunctIcLb0EE16do_decimal_pointEv __ZNKSt3__210moneypunctIcLb0EE16do_thousands_sepEv __ZNKSt3__210moneypunctIcLb0EE14do_frac_digitsEv __ZNKSt3__210moneypunctIcLb1EE16do_decimal_pointEv __ZNKSt3__210moneypunctIcLb1EE16do_thousands_sepEv __ZNKSt3__210moneypunctIcLb1EE14do_frac_digitsEv __ZNKSt3__210moneypunctIwLb0EE16do_decimal_pointEv __ZNKSt3__210moneypunctIwLb0EE16do_thousands_sepEv __ZNKSt3__210moneypunctIwLb0EE14do_frac_digitsEv __ZNKSt3__210moneypunctIwLb1EE16do_decimal_pointEv __ZNKSt3__210moneypunctIwLb1EE16do_thousands_sepEv __ZNKSt3__210moneypunctIwLb1EE14do_frac_digitsEv __ZNKSt3__27codecvtIDic11__mbstate_tE11do_encodingEv __ZNKSt3__27codecvtIDic11__mbstate_tE16do_always_noconvEv __ZNKSt3__27codecvtIDic11__mbstate_tE13do_max_lengthEv __ZNKSt3__27codecvtIwc11__mbstate_tE11do_encodingEv __ZNKSt3__27codecvtIwc11__mbstate_tE16do_always_noconvEv __ZNKSt3__27codecvtIwc11__mbstate_tE13do_max_lengthEv __ZNKSt3__28numpunctIcE16do_decimal_pointEv __ZNKSt3__28numpunctIcE16do_thousands_sepEv __ZNKSt3__28numpunctIwE16do_decimal_pointEv __ZNKSt3__28numpunctIwE16do_thousands_sepEv __ZNKSt3__27codecvtIcc11__mbstate_tE11do_encodingEv __ZNKSt3__27codecvtIcc11__mbstate_tE16do_always_noconvEv __ZNKSt3__27codecvtIcc11__mbstate_tE13do_max_lengthEv __ZNKSt3__27codecvtIDsc11__mbstate_tE11do_encodingEv __ZNKSt3__27codecvtIDsc11__mbstate_tE16do_always_noconvEv __ZNKSt3__27codecvtIDsc11__mbstate_tE13do_max_lengthEv __ZNKSt11logic_error4whatEv __ZNKSt13runtime_error4whatEv __ZNSt3__214__thread_proxyINS_5tupleIJNS_10unique_ptrINS_15__thread_structENS_14default_deleteIS3_EEEEZN11EventThreadC1EvE3__0EEEEEPvSA_ __ZN10emscripten8internal7InvokerIbJEE6invokeEPFbvE __ZN10emscripten8internal7InvokerImJEE6invokeEPFmvE __ZN10emscripten8internal7InvokerINSt3__26vectorINS2_12basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEENS7_IS9_EEEEJEE6invokeEPFSB_vE __ZN10emscripten8internal7InvokerINSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEEJEE6invokeEPFS8_vE 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0".split(" "),
	H =
	"0 __ZNKSt3__219__shared_weak_count13__get_deleterERKSt9type_info __ZNK6League16HashValueStorage8GetChildERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE __ZNK6League16HashValueStorage8GetChildEm __ZNK6League18StringValueStorage8GetChildERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE __ZNK6League18StringValueStorage8GetChildEm __ZNK6League18MatrixValueStorage8GetChildERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE __ZNK6League18MatrixValueStorage8GetChildEm __ZNK6League17ArrayValueStorage8GetChildERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE __ZNK6League17ArrayValueStorage8GetChildEm __ZNK6League15MapValueStorage8GetChildERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE __ZNK6League15MapValueStorage8GetChildEm __ZNK6League21ContainerValueStorage8GetChildERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE __ZNK6League18StructValueStorage8GetChildERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EiLNS1_9qualifierE0EEEitLi3EE8GetChildERKNSt3__212basic_stringIcNS6_11char_traitsIcEENS6_9allocatorIcEEEE __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EiLNS1_9qualifierE0EEEitLi3EE8GetChildEm __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EfLNS1_9qualifierE0EEEffLi4EE8GetChildERKNSt3__212basic_stringIcNS6_11char_traitsIcEENS6_9allocatorIcEEEE __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EfLNS1_9qualifierE0EEEffLi4EE8GetChildEm __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EfLNS1_9qualifierE0EEEffLi3EE8GetChildERKNSt3__212basic_stringIcNS6_11char_traitsIcEENS6_9allocatorIcEEEE __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EfLNS1_9qualifierE0EEEffLi3EE8GetChildEm __ZNK6League24NumberVectorValueStorageIN3glm3vecILi2EfLNS1_9qualifierE0EEEffLi2EE8GetChildERKNSt3__212basic_stringIcNS6_11char_traitsIcEENS6_9allocatorIcEEEE __ZNK6League24NumberVectorValueStorageIN3glm3vecILi2EfLNS1_9qualifierE0EEEffLi2EE8GetChildEm __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EiLNS1_9qualifierE0EEEihLi4EE8GetChildERKNSt3__212basic_stringIcNS6_11char_traitsIcEENS6_9allocatorIcEEEE __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EiLNS1_9qualifierE0EEEihLi4EE8GetChildEm __ZNK6League18NumberValueStorageIfE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIfE8GetChildEm __ZNK6League18NumberValueStorageIyE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIyE8GetChildEm __ZNK6League18NumberValueStorageIxE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIxE8GetChildEm __ZNK6League18NumberValueStorageIiE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIiE8GetChildEm __ZNK6League18NumberValueStorageIjE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIjE8GetChildEm __ZNK6League18NumberValueStorageItE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageItE8GetChildEm __ZNK6League18NumberValueStorageIsE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIsE8GetChildEm __ZNK6League18NumberValueStorageIhE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIhE8GetChildEm __ZNK6League18NumberValueStorageIaE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIaE8GetChildEm __ZNK6League18NumberValueStorageIbE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIbE8GetChildEm __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE9pbackfailEi __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE8overflowEi __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE9pbackfailEj __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE8overflowEj __ZNSt3__211__stdoutbufIwE8overflowEj __ZNSt3__211__stdoutbufIcE8overflowEi __ZNSt3__210__stdinbufIwE9pbackfailEj __ZNSt3__210__stdinbufIcE9pbackfailEi __ZNKSt3__25ctypeIcE10do_toupperEc __ZNKSt3__25ctypeIcE10do_tolowerEc __ZNKSt3__25ctypeIcE8do_widenEc __ZNKSt3__25ctypeIwE10do_toupperEw __ZNKSt3__25ctypeIwE10do_tolowerEw __ZNKSt3__25ctypeIwE8do_widenEc __ZZ13PrepareEventsRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEER15ApplicationMeshRNS_6vectorIN6League4Skin4MeshENS3_ISD_EEEEPKNSB_16BaseValueStorageEEN3__68__invokeERSI_Pv __ZZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_ENK3__9clERN6League3BinEPvENUlRKNSA_16BaseValueStorageESD_E_8__invokeESG_SD_ __ZZZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_ENK3__9clERN6League3BinEPvENKUlS8_S8_P15ApplicationMeshRNSA_4SkinESD_E_clES8_S8_SF_SH_SD_ENUlRKNSA_16BaseValueStorageESD_E_8__invokeESL_SD_ __ZZZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_ENK3__9clERN6League3BinEPvENKUlS8_S8_P15ApplicationMeshRNSA_4SkinESD_E_clES8_S8_SF_SH_SD_ENUlRKNSA_16BaseValueStorageESD_E0_8__invokeESL_SD_ __ZZZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_ENK3__9clERN6League3BinEPvENKUlS8_S8_P15ApplicationMeshRNSA_4SkinESD_E_clES8_S8_SF_SH_SD_ENUlRKNSA_16BaseValueStorageESD_E1_8__invokeESL_SD_ __ZZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_ENK4__10clERN6League3BinEPvENUlRKNSA_16BaseValueStorageESD_E_8__invokeESG_SD_ __ZN10emscripten8internal7InvokerINSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEEJmEE6invokeEPFS8_mEm 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0".split(" "),
	I = "0 ___stdio_write ___stdio_seek ___stdio_read ___stdout_write _sn_write __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6setbufEPcl __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6xsgetnEPcl __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6xsputnEPKcl __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE6setbufEPwl __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE6xsgetnEPwl __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE6xsputnEPKwl __ZNSt3__211__stdoutbufIwE6xsputnEPKwl __ZNSt3__211__stdoutbufIcE6xsputnEPKcl __ZNKSt3__27collateIcE7do_hashEPKcS3_ __ZNKSt3__27collateIwE7do_hashEPKwS3_ __ZNKSt3__28messagesIcE7do_openERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEERKNS_6localeE __ZNKSt3__28messagesIwE7do_openERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEERKNS_6localeE __ZNKSt3__25ctypeIcE10do_toupperEPcPKc __ZNKSt3__25ctypeIcE10do_tolowerEPcPKc __ZNKSt3__25ctypeIcE9do_narrowEcc __ZNKSt3__25ctypeIwE5do_isEtw __ZNKSt3__25ctypeIwE10do_toupperEPwPKw __ZNKSt3__25ctypeIwE10do_tolowerEPwPKw __ZNKSt3__25ctypeIwE9do_narrowEwc __ZNK10__cxxabiv117__class_type_info9can_catchEPKNS_16__shim_type_infoERPv __ZNK10__cxxabiv123__fundamental_type_info9can_catchEPKNS_16__shim_type_infoERPv __Z11OnMouseMoveiPK20EmscriptenMouseEventPv __Z15OnTouchCallbackiPK20EmscriptenTouchEventPv __ZZN16EmscriptenWindowC1ERKN10BaseWindow14WindowSettingsEEN3__08__invokeEiPK20EmscriptenWheelEventPv _do_read 0".split(" "),
	J = "0 __ZNKSt3__25ctypeIcE8do_widenEPKcS3_Pc __ZNKSt3__25ctypeIwE5do_isEPKwS3_Pt __ZNKSt3__25ctypeIwE10do_scan_isEtPKwS3_ __ZNKSt3__25ctypeIwE11do_scan_notEtPKwS3_ __ZNKSt3__25ctypeIwE8do_widenEPKcS3_Pw 0 0".split(" "),
	K = "0 __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcd __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEce __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwd __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwe 0 0 0".split(" "),
	L = "0 __ZNKSt3__27collateIcE10do_compareEPKcS3_S3_S3_ __ZNKSt3__27collateIwE10do_compareEPKwS3_S3_S3_ __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcb __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcl __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcm __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcPKv __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwb __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwl __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwm __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwPKv __ZNKSt3__27codecvtIDic11__mbstate_tE10do_unshiftERS1_PcS4_RS4_ __ZNKSt3__27codecvtIDic11__mbstate_tE9do_lengthERS1_PKcS5_m __ZNKSt3__27codecvtIwc11__mbstate_tE10do_unshiftERS1_PcS4_RS4_ __ZNKSt3__27codecvtIwc11__mbstate_tE9do_lengthERS1_PKcS5_m __ZNKSt3__25ctypeIcE9do_narrowEPKcS3_cPc __ZNKSt3__25ctypeIwE9do_narrowEPKwS3_cPc __ZNKSt3__27codecvtIcc11__mbstate_tE10do_unshiftERS1_PcS4_RS4_ __ZNKSt3__27codecvtIcc11__mbstate_tE9do_lengthERS1_PKcS5_m __ZNKSt3__27codecvtIDsc11__mbstate_tE10do_unshiftERS1_PcS4_RS4_ __ZNKSt3__27codecvtIDsc11__mbstate_tE9do_lengthERS1_PKcS5_m __ZL23stbi__resample_row_hv_2PhS_S_ii __ZL14resample_row_1PhS_S_ii __ZL22stbi__resample_row_v_2PhS_S_ii __ZL22stbi__resample_row_h_2PhS_S_ii __ZL26stbi__resample_row_genericPhS_S_ii 0 0 0 0 0 0".split(" "),
	M = ["0", "__ZNKSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_bRNS_8ios_baseEce", "__ZNKSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_bRNS_8ios_baseEwe", "0"],
	N = "0 __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRb __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRl __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRx __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRt __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjS8_ __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRm __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRy __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRf __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRd __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRe __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRPv __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRb __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRl __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRx __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRt __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjS8_ __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRm __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRy __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRf __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRd __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRe __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRPv __ZNKSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE11do_get_timeES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE11do_get_dateES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE14do_get_weekdayES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE16do_get_monthnameES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE11do_get_yearES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE11do_get_timeES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE11do_get_dateES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE14do_get_weekdayES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE16do_get_monthnameES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE11do_get_yearES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_bRNS_8ios_baseEcRKNS_12basic_stringIcS3_NS_9allocatorIcEEEE __ZNKSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_bRNS_8ios_baseEwRKNS_12basic_stringIwS3_NS_9allocatorIwEEEE 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0".split(" "),
	O = "0 __ZNKSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcPK2tmcc __ZNKSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwPK2tmcc __ZNKSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_bRNS_8ios_baseERjRe __ZNKSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_bRNS_8ios_baseERjRNS_12basic_stringIcS3_NS_9allocatorIcEEEE __ZNKSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_bRNS_8ios_baseERjRe __ZNKSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_bRNS_8ios_baseERjRNS_12basic_stringIwS3_NS_9allocatorIwEEEE 0".split(" "),
	P = "0 __ZNKSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjP2tmcc __ZNKSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjP2tmcc __ZNKSt3__27codecvtIDic11__mbstate_tE6do_outERS1_PKDiS5_RS5_PcS7_RS7_ __ZNKSt3__27codecvtIDic11__mbstate_tE5do_inERS1_PKcS5_RS5_PDiS7_RS7_ __ZNKSt3__27codecvtIwc11__mbstate_tE6do_outERS1_PKwS5_RS5_PcS7_RS7_ __ZNKSt3__27codecvtIwc11__mbstate_tE5do_inERS1_PKcS5_RS5_PwS7_RS7_ __ZNKSt3__27codecvtIcc11__mbstate_tE6do_outERS1_PKcS5_RS5_PcS7_RS7_ __ZNKSt3__27codecvtIcc11__mbstate_tE5do_inERS1_PKcS5_RS5_PcS7_RS7_ __ZNKSt3__27codecvtIDsc11__mbstate_tE6do_outERS1_PKDsS5_RS5_PcS7_RS7_ __ZNKSt3__27codecvtIDsc11__mbstate_tE5do_inERS1_PKcS5_RS5_PDsS7_RS7_ 0 0 0 0 0".split(" "),
	Q = "0 __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcx __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcy __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwx __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwy 0 0 0".split(" "),
	R = "0 ___cxa_pure_virtual __ZL25default_terminate_handlerv __ZZ4mainEN4__168__invokeEv __ZN12EventHandler7CleanUpEv __ZZN10FileSystem7GetFileERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEEEN3__08__invokeEv __Z4Loopv __ZZN8Profiler3GetEvEN3__08__invokeEv __Z17GetProfileResultsv __ZN10__cxxabiv112_GLOBAL__N_110construct_Ev 0 0 0 0 0 0".split(" "),
	S = "0 __ZN5EventD2Ev __ZN11UpdateEventD0Ev __ZNSt3__220__shared_ptr_emplaceIN6League8SkeletonENS_9allocatorIS2_EEED2Ev __ZNSt3__220__shared_ptr_emplaceIN6League8SkeletonENS_9allocatorIS2_EEED0Ev __ZNSt3__220__shared_ptr_emplaceIN6League8SkeletonENS_9allocatorIS2_EEE16__on_zero_sharedEv __ZNSt3__220__shared_ptr_emplaceIN6League8SkeletonENS_9allocatorIS2_EEE21__on_zero_shared_weakEv __ZN18BaseShaderVariableD2Ev __ZN14ShaderVariableIN3glm3matILi4ELi4EfLNS0_9qualifierE0EEEED0Ev __ZN14ShaderVariableIN3glm3matILi4ELi4EfLNS0_9qualifierE0EEEE6UpdateEv __ZN18BaseShaderVariableD0Ev __ZN14ShaderVariableI7TextureED2Ev __ZN14ShaderVariableI7TextureED0Ev __ZN14ShaderVariableI7TextureE6UpdateEv __ZN14ShaderVariableINSt3__26vectorIN3glm3matILi4ELi4EfLNS2_9qualifierE0EEENS0_9allocatorIS5_EEEEED2Ev __ZN14ShaderVariableINSt3__26vectorIN3glm3matILi4ELi4EfLNS2_9qualifierE0EEENS0_9allocatorIS5_EEEEED0Ev __ZN14ShaderVariableINSt3__26vectorIN3glm3matILi4ELi4EfLNS2_9qualifierE0EEENS0_9allocatorIS5_EEEEE6UpdateEv __ZN15ApplicationMesh22SwapMeshAnimationEventD2Ev __ZN15ApplicationMesh22SwapMeshAnimationEventD0Ev __ZN15ApplicationMesh22SwapMeshAnimationEvent5ResetEv __ZN15ApplicationMesh14AnimationEventD2Ev __ZN15ApplicationMesh14AnimationEventD0Ev __ZN5EventD0Ev __ZN6League16BaseValueStorageD2Ev __ZN6League16HashValueStorageD0Ev __ZN6League18StringValueStorageD2Ev __ZN6League18StringValueStorageD0Ev __ZN6League18MatrixValueStorageD0Ev __ZN6League17ArrayValueStorageD2Ev __ZN6League17ArrayValueStorageD0Ev __ZN6League15MapValueStorageD2Ev __ZN6League15MapValueStorageD0Ev __ZN6League16BaseValueStorageD0Ev __ZN6League21ContainerValueStorageD0Ev __ZN6League18StructValueStorageD0Ev __ZN6League24NumberVectorValueStorageIN3glm3vecILi3EiLNS1_9qualifierE0EEEitLi3EED0Ev __ZN6League24NumberVectorValueStorageIN3glm3vecILi4EfLNS1_9qualifierE0EEEffLi4EED0Ev __ZN6League24NumberVectorValueStorageIN3glm3vecILi3EfLNS1_9qualifierE0EEEffLi3EED0Ev __ZN6League24NumberVectorValueStorageIN3glm3vecILi2EfLNS1_9qualifierE0EEEffLi2EED0Ev __ZN6League24NumberVectorValueStorageIN3glm3vecILi4EiLNS1_9qualifierE0EEEihLi4EED0Ev __ZN6League18NumberValueStorageIfED0Ev __ZN6League18NumberValueStorageIyED0Ev __ZN6League18NumberValueStorageIxED0Ev __ZN6League18NumberValueStorageIiED0Ev __ZN6League18NumberValueStorageIjED0Ev __ZN6League18NumberValueStorageItED0Ev __ZN6League18NumberValueStorageIsED0Ev __ZN6League18NumberValueStorageIhED0Ev __ZN6League18NumberValueStorageIaED0Ev __ZN6League18NumberValueStorageIbED0Ev __ZN16PointerMoveEventD0Ev __ZN12MouseUpEventD0Ev __ZN14MouseDownEventD0Ev __ZN14PointerUpEventD0Ev __ZN16PointerDownEventD0Ev __ZN16MouseScrollEventD0Ev __ZNSt3__28ios_baseD2Ev __ZNSt3__28ios_baseD0Ev __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEED2Ev __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEED0Ev __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEED2Ev __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEED0Ev __ZNSt3__213basic_istreamIcNS_11char_traitsIcEEED1Ev __ZNSt3__213basic_istreamIcNS_11char_traitsIcEEED0Ev __ZTv0_n12_NSt3__213basic_istreamIcNS_11char_traitsIcEEED1Ev __ZTv0_n12_NSt3__213basic_istreamIcNS_11char_traitsIcEEED0Ev __ZNSt3__213basic_istreamIwNS_11char_traitsIwEEED1Ev __ZNSt3__213basic_istreamIwNS_11char_traitsIwEEED0Ev __ZTv0_n12_NSt3__213basic_istreamIwNS_11char_traitsIwEEED1Ev __ZTv0_n12_NSt3__213basic_istreamIwNS_11char_traitsIwEEED0Ev __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEED1Ev __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEED0Ev __ZTv0_n12_NSt3__213basic_ostreamIcNS_11char_traitsIcEEED1Ev __ZTv0_n12_NSt3__213basic_ostreamIcNS_11char_traitsIcEEED0Ev __ZNSt3__213basic_ostreamIwNS_11char_traitsIwEEED1Ev __ZNSt3__213basic_ostreamIwNS_11char_traitsIwEEED0Ev __ZTv0_n12_NSt3__213basic_ostreamIwNS_11char_traitsIwEEED1Ev __ZTv0_n12_NSt3__213basic_ostreamIwNS_11char_traitsIwEEED0Ev __ZNSt3__211__stdoutbufIwED0Ev __ZNSt3__211__stdoutbufIcED0Ev __ZNSt3__210__stdinbufIwED0Ev __ZNSt3__210__stdinbufIcED0Ev __ZNSt3__27collateIcED2Ev __ZNSt3__27collateIcED0Ev __ZNSt3__26locale5facet16__on_zero_sharedEv __ZNSt3__27collateIwED2Ev __ZNSt3__27collateIwED0Ev __ZNSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEED2Ev __ZNSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEED0Ev __ZNSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEED2Ev __ZNSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEED0Ev __ZNSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEED2Ev __ZNSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEED0Ev __ZNSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEED2Ev __ZNSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEED0Ev __ZNSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEED2Ev __ZNSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEED0Ev __ZNSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEED2Ev __ZNSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEED0Ev __ZNSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEED2Ev __ZNSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEED0Ev __ZNSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEED2Ev __ZNSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEED0Ev __ZNSt3__210moneypunctIcLb0EED2Ev __ZNSt3__210moneypunctIcLb0EED0Ev __ZNSt3__210moneypunctIcLb1EED2Ev __ZNSt3__210moneypunctIcLb1EED0Ev __ZNSt3__210moneypunctIwLb0EED2Ev __ZNSt3__210moneypunctIwLb0EED0Ev __ZNSt3__210moneypunctIwLb1EED2Ev __ZNSt3__210moneypunctIwLb1EED0Ev __ZNSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEED2Ev __ZNSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEED0Ev __ZNSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEED2Ev __ZNSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEED0Ev __ZNSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEED2Ev __ZNSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEED0Ev __ZNSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEED2Ev __ZNSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEED0Ev __ZNSt3__28messagesIcED2Ev __ZNSt3__28messagesIcED0Ev __ZNSt3__28messagesIwED2Ev __ZNSt3__28messagesIwED0Ev __ZNSt3__26locale5facetD2Ev __ZNSt3__216__narrow_to_utf8ILm32EED0Ev __ZNSt3__217__widen_from_utf8ILm32EED0Ev __ZNSt3__27codecvtIwc11__mbstate_tED2Ev __ZNSt3__27codecvtIwc11__mbstate_tED0Ev __ZNSt3__26locale5__impD2Ev __ZNSt3__26locale5__impD0Ev __ZNSt3__25ctypeIcED2Ev __ZNSt3__25ctypeIcED0Ev __ZNSt3__28numpunctIcED2Ev __ZNSt3__28numpunctIcED0Ev __ZNSt3__28numpunctIwED2Ev __ZNSt3__28numpunctIwED0Ev __ZNSt3__26locale5facetD0Ev __ZNSt3__25ctypeIwED0Ev __ZNSt3__27codecvtIcc11__mbstate_tED0Ev __ZNSt3__27codecvtIDsc11__mbstate_tED0Ev __ZNSt3__27codecvtIDic11__mbstate_tED0Ev __ZN10__cxxabiv116__shim_type_infoD2Ev __ZN10__cxxabiv117__class_type_infoD0Ev __ZNK10__cxxabiv116__shim_type_info5noop1Ev __ZNK10__cxxabiv116__shim_type_info5noop2Ev __ZN10__cxxabiv120__si_class_type_infoD0Ev __ZNSt11logic_errorD2Ev __ZNSt11logic_errorD0Ev __ZNSt13runtime_errorD2Ev __ZNSt13runtime_errorD0Ev __ZNSt12length_errorD0Ev __ZNSt14overflow_errorD0Ev __ZN10__cxxabiv123__fundamental_type_infoD0Ev __ZN10__cxxabiv121__vmi_class_type_infoD0Ev __ZN14EmscriptenFile12OnLoadFailedEPv __Z17GetAnimationArrayv __Z25GetProfileResultsAsStringv __ZN10emscripten8internal7InvokerIvJEE6invokeEPFvvE __ZNSt3__26locale2id6__initEv __ZNSt3__217__call_once_proxyINS_5tupleIJONS_12_GLOBAL__N_111__fake_bindEEEEEEvPv __ZNSt3__212__do_nothingEPv _free __ZNSt3__221__thread_specific_ptrINS_15__thread_structEE16__at_thread_exitEPv __ZN10__cxxabiv112_GLOBAL__N_19destruct_EPv 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0".split(" "),
	T = ["0", "__ZN15ApplicationMesh22SwapMeshAnimationEvent6UpdateEf"],
	U = "0 __ZNK6League16HashValueStorage10DebugPrintEv __ZNK6League18StringValueStorage10DebugPrintEv __ZNK6League18MatrixValueStorage10DebugPrintEv __ZNK6League17ArrayValueStorage10DebugPrintEv __ZNK6League15MapValueStorage10DebugPrintEv __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EiLNS1_9qualifierE0EEEitLi3EE10DebugPrintEv __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EfLNS1_9qualifierE0EEEffLi4EE10DebugPrintEv __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EfLNS1_9qualifierE0EEEffLi3EE10DebugPrintEv __ZNK6League24NumberVectorValueStorageIN3glm3vecILi2EfLNS1_9qualifierE0EEEffLi2EE10DebugPrintEv __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EiLNS1_9qualifierE0EEEihLi4EE10DebugPrintEv __ZNK6League18NumberValueStorageIfE10DebugPrintEv __ZNK6League18NumberValueStorageIyE10DebugPrintEv __ZNK6League18NumberValueStorageIxE10DebugPrintEv __ZNK6League18NumberValueStorageIiE10DebugPrintEv __ZNK6League18NumberValueStorageIjE10DebugPrintEv __ZNK6League18NumberValueStorageItE10DebugPrintEv __ZNK6League18NumberValueStorageIsE10DebugPrintEv __ZNK6League18NumberValueStorageIhE10DebugPrintEv __ZNK6League18NumberValueStorageIaE10DebugPrintEv __ZNK6League18NumberValueStorageIbE10DebugPrintEv __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE5imbueERKNS_6localeE __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE5imbueERKNS_6localeE __ZNSt3__211__stdoutbufIwE5imbueERKNS_6localeE __ZNSt3__211__stdoutbufIcE5imbueERKNS_6localeE __ZNSt3__210__stdinbufIwE5imbueERKNS_6localeE __ZNSt3__210__stdinbufIcE5imbueERKNS_6localeE __ZNKSt3__210moneypunctIcLb0EE11do_groupingEv __ZNKSt3__210moneypunctIcLb0EE14do_curr_symbolEv __ZNKSt3__210moneypunctIcLb0EE16do_positive_signEv __ZNKSt3__210moneypunctIcLb0EE16do_negative_signEv __ZNKSt3__210moneypunctIcLb0EE13do_pos_formatEv __ZNKSt3__210moneypunctIcLb0EE13do_neg_formatEv __ZNKSt3__210moneypunctIcLb1EE11do_groupingEv __ZNKSt3__210moneypunctIcLb1EE14do_curr_symbolEv __ZNKSt3__210moneypunctIcLb1EE16do_positive_signEv __ZNKSt3__210moneypunctIcLb1EE16do_negative_signEv __ZNKSt3__210moneypunctIcLb1EE13do_pos_formatEv __ZNKSt3__210moneypunctIcLb1EE13do_neg_formatEv __ZNKSt3__210moneypunctIwLb0EE11do_groupingEv __ZNKSt3__210moneypunctIwLb0EE14do_curr_symbolEv __ZNKSt3__210moneypunctIwLb0EE16do_positive_signEv __ZNKSt3__210moneypunctIwLb0EE16do_negative_signEv __ZNKSt3__210moneypunctIwLb0EE13do_pos_formatEv __ZNKSt3__210moneypunctIwLb0EE13do_neg_formatEv __ZNKSt3__210moneypunctIwLb1EE11do_groupingEv __ZNKSt3__210moneypunctIwLb1EE14do_curr_symbolEv __ZNKSt3__210moneypunctIwLb1EE16do_positive_signEv __ZNKSt3__210moneypunctIwLb1EE16do_negative_signEv __ZNKSt3__210moneypunctIwLb1EE13do_pos_formatEv __ZNKSt3__210moneypunctIwLb1EE13do_neg_formatEv __ZNKSt3__28messagesIcE8do_closeEl __ZNKSt3__28messagesIwE8do_closeEl __ZNKSt3__28numpunctIcE11do_groupingEv __ZNKSt3__28numpunctIcE11do_truenameEv __ZNKSt3__28numpunctIcE12do_falsenameEv __ZNKSt3__28numpunctIwE11do_groupingEv __ZNKSt3__28numpunctIwE11do_truenameEv __ZNKSt3__28numpunctIwE12do_falsenameEv __ZZN11Application4InitEvEN3__08__invokeEPK14MouseDownEventPv __ZZN11Application4InitEvEN3__18__invokeEPK12MouseUpEventPv __ZZN11Application4InitEvEN3__28__invokeEPK14PointerUpEventPv __ZZN11Application4InitEvEN3__38__invokeEPK16MouseScrollEventPv __ZZN11Application4InitEvEN3__48__invokeEPK16PointerMoveEventPv __ZZN11Application11LoadShadersEvEN4__148__invokeEP6ShaderPv __ZZN11Application11LoadShadersEvEN4__158__invokeEP6ShaderPv __ZZ21OnSkinAndAnimationBinR12SkinLoadDataEN3__78__invokeERN6League9AnimationEPv __ZZN11Application13LoadAnimationER15ApplicationMeshRKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEEPFvRN6League9AnimationEPvESE_EN4__138__invokeESD_SE_ __ZZN11Application8LoadMeshERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_PFvS8_S8_P15ApplicationMeshRN6League4SkinEPvESE_EN4__118__invokeESD_SE_ __ZZN11Application8LoadMeshERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_PFvS8_S8_P15ApplicationMeshRN6League4SkinEPvESE_EN4__128__invokeERNSB_8SkeletonESE_ __ZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_EN3__98__invokeERN6League3BinEPv __ZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_EN4__108__invokeERN6League3BinEPv __ZZN15ApplicationMesh7SubMesh10SetTextureERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEEEN3__08__invokeER7TexturePv __Z8LoadSkinRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEES5_ __Z8LoadMeshRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEES7_ __Z11GetSkinNamem __Z16GetAnimationNamem __Z13PlayAnimationRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEES5_ __ZZ13PlayAnimationRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEES5_EN3__08__invokeERN6League9AnimationEPv 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0".split(" "),
	V = "0 __ZN6League16HashValueStorage17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18StringValueStorage17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18MatrixValueStorage17FetchDataFromFileEP14EmscriptenFileRm __ZN6League17ArrayValueStorage17FetchDataFromFileEP14EmscriptenFileRm __ZN6League15MapValueStorage17FetchDataFromFileEP14EmscriptenFileRm __ZN6League21ContainerValueStorage17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18StructValueStorage17FetchDataFromFileEP14EmscriptenFileRm __ZN6League24NumberVectorValueStorageIN3glm3vecILi3EiLNS1_9qualifierE0EEEitLi3EE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League24NumberVectorValueStorageIN3glm3vecILi4EfLNS1_9qualifierE0EEEffLi4EE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League24NumberVectorValueStorageIN3glm3vecILi3EfLNS1_9qualifierE0EEEffLi3EE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League24NumberVectorValueStorageIN3glm3vecILi2EfLNS1_9qualifierE0EEEffLi2EE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League24NumberVectorValueStorageIN3glm3vecILi4EiLNS1_9qualifierE0EEEihLi4EE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIfE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIyE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIxE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIiE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIjE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageItE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIsE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIhE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIaE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIbE17FetchDataFromFileEP14EmscriptenFileRm __ZN14EmscriptenFile6OnLoadEPvS0_i __ZZN6League9Animation4LoadERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEEPFvRS0_PvESB_EN3__08__invokeEP14EmscriptenFile13FileLoadStateSB_ __ZZN6League3Bin4LoadERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEEPFvRS0_PvESB_EN3__08__invokeEP14EmscriptenFile13FileLoadStateSB_ __ZZN6League8Skeleton4LoadERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEEPFvRS0_PvESB_EN3__08__invokeEP14EmscriptenFile13FileLoadStateSB_ __ZZN6League4Skin4LoadERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEEPFvRS0_PvESB_EN3__08__invokeEP14EmscriptenFile13FileLoadStateSB_ __ZL16stbi__idct_blockPhiPs __ZZN6Shader4LoadERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEEPFvPS_PvESA_EN3__08__invokeEP14EmscriptenFile13FileLoadStateSA_ __ZZN7Texture4LoadERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEEPFvRS_PvESA_EN3__08__invokeEP14EmscriptenFile13FileLoadStateSA_ __ZN10emscripten8internal7InvokerIvJRKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEES8_EE6invokeEPFvSA_S8_EPNS0_11BindingTypeIS8_EUt_ESH_ __ZN10emscripten8internal7InvokerIvJRKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEESA_EE6invokeEPFvSA_SA_EPNS0_11BindingTypeIS8_EUt_ESH_ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0".split(" "),
	W = "0 __ZNK6League16HashValueStorage9GetAsJSONEbb __ZNK6League16HashValueStorage4FindEPFbRKNS_16BaseValueStorageEPvES4_ __ZNK6League18StringValueStorage9GetAsJSONEbb __ZNK6League18StringValueStorage4FindEPFbRKNS_16BaseValueStorageEPvES4_ __ZNK6League18MatrixValueStorage9GetAsJSONEbb __ZNK6League18MatrixValueStorage4FindEPFbRKNS_16BaseValueStorageEPvES4_ __ZNK6League17ArrayValueStorage9GetAsJSONEbb __ZNK6League17ArrayValueStorage4FindEPFbRKNS_16BaseValueStorageEPvES4_ __ZNK6League15MapValueStorage9GetAsJSONEbb __ZNK6League15MapValueStorage4FindEPFbRKNS_16BaseValueStorageEPvES4_ __ZNK6League18StructValueStorage9GetAsJSONEbb __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EiLNS1_9qualifierE0EEEitLi3EE9GetAsJSONEbb __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EiLNS1_9qualifierE0EEEitLi3EE4FindEPFbRKNS_16BaseValueStorageEPvES9_ __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EfLNS1_9qualifierE0EEEffLi4EE9GetAsJSONEbb __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EfLNS1_9qualifierE0EEEffLi4EE4FindEPFbRKNS_16BaseValueStorageEPvES9_ __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EfLNS1_9qualifierE0EEEffLi3EE9GetAsJSONEbb __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EfLNS1_9qualifierE0EEEffLi3EE4FindEPFbRKNS_16BaseValueStorageEPvES9_ __ZNK6League24NumberVectorValueStorageIN3glm3vecILi2EfLNS1_9qualifierE0EEEffLi2EE9GetAsJSONEbb __ZNK6League24NumberVectorValueStorageIN3glm3vecILi2EfLNS1_9qualifierE0EEEffLi2EE4FindEPFbRKNS_16BaseValueStorageEPvES9_ __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EiLNS1_9qualifierE0EEEihLi4EE9GetAsJSONEbb __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EiLNS1_9qualifierE0EEEihLi4EE4FindEPFbRKNS_16BaseValueStorageEPvES9_ __ZNK6League18NumberValueStorageIfE9GetAsJSONEbb __ZNK6League18NumberValueStorageIfE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIyE9GetAsJSONEbb __ZNK6League18NumberValueStorageIyE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIxE9GetAsJSONEbb __ZNK6League18NumberValueStorageIxE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIiE9GetAsJSONEbb __ZNK6League18NumberValueStorageIiE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIjE9GetAsJSONEbb __ZNK6League18NumberValueStorageIjE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageItE9GetAsJSONEbb __ZNK6League18NumberValueStorageItE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIsE9GetAsJSONEbb __ZNK6League18NumberValueStorageIsE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIhE9GetAsJSONEbb __ZNK6League18NumberValueStorageIhE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIaE9GetAsJSONEbb __ZNK6League18NumberValueStorageIaE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIbE9GetAsJSONEbb __ZNK6League18NumberValueStorageIbE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE7seekposENS_4fposI11__mbstate_tEEj __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE7seekposENS_4fposI11__mbstate_tEEj __ZNKSt3__27collateIcE12do_transformEPKcS3_ __ZNKSt3__27collateIwE12do_transformEPKwS3_ __ZNK10__cxxabiv117__class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi __ZNK10__cxxabiv120__si_class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi __ZNK10__cxxabiv121__vmi_class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0".split(" "),
	X = "0 __ZNK10__cxxabiv117__class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib __ZNK10__cxxabiv120__si_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib __ZNK10__cxxabiv121__vmi_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib __ZZN11Application8LoadMeshERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_EN3__88__invokeES8_S8_P15ApplicationMeshRN6League4SkinEPv __ZZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_ENK3__9clERN6League3BinEPvENUlS8_S8_P15ApplicationMeshRNSA_4SkinESD_E_8__invokeES8_S8_SF_SH_SD_ 0 0".split(" "),
	Y = "0 __ZNKSt3__28messagesIcE6do_getEliiRKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE __ZNKSt3__28messagesIwE6do_getEliiRKNS_12basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEE __ZNK10__cxxabiv117__class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib __ZNK10__cxxabiv120__si_class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib __ZNK10__cxxabiv121__vmi_class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib __ZL22stbi__YCbCr_to_RGB_rowPhPKhS1_S1_ii 0".split(" "),
	sf = ["0", "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE7seekoffExNS_8ios_base7seekdirEj", "__ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE7seekoffExNS_8ios_base7seekdirEj", "0"];
e.wasmTableSize = 998;
e.wasmMaxTableSize = 998;
e.Sd = {};
e.Td = {
	kb: function () {
		assert(p[Za >> 2] > m);
		var a = e.usingWasm ? 65536 : 16777216,
			b = 2147483648 - a;
		if (p[Za >> 2] > b) return l("Cannot enlarge memory, asked to go up to " + p[Za >> 2] + " bytes, but the limit is " + b + " bytes!"), !1;
		var c = m;
		for (m = Math.max(m, 16777216); m < p[Za >> 2];) 536870912 >= m ? m = Ka(2 * m, a) : (m = Math.min(Ka((3 * m + 2147483648) / 4, a), b), m === c && ta("Cannot ask for more memory since we reached the practical limit in browsers (which is just below 2GB), so the request would have failed. Requesting only " + m));
		a = e.reallocBuffer(m);
		if (!a || a.byteLength != m) return l("Failed to grow the heap from " + c + " bytes to " + m + " bytes, not enough memory!"), a && l("Expected to get back a buffer of size " + m + " bytes, but instead got back a buffer of size " + a.byteLength), m = c, !1;
		e.buffer = buffer = a;
		Ra();
		e.usingWasm || l("Warning: Enlarging memory arrays, this is not fast! " + [c, m]);
		return !0
	},
	jb: function () {
		return m
	},
	Za: function () {
		k("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + m + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")
	},
	d: function (a) {
		k("Stack overflow! Attempted to allocate " + a + " bytes on the stack, but stack has only " + (Xa - pa() + a) + " bytes available!")
	},
	V: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'ff'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: vif: " + T[a] + "  i: " + F[a] + "  v: " + R[a] + "  ii: " + G[a] + "  vi: " + S[a] + "  iii: " + H[a] + "  vii: " + U[a] + "  iiii: " + I[a] + "  viii: " + V[a] + "  iiiii: " + J[a] + "  viiii: " + W[a] + "  iiiiid: " + K[a] + "  iiiiii: " + L[a] + "  iiiiij: " + Q[a] + "  viiiii: " + X[a] + "  viijii: " + sf[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  viiiiii: " + Y[a] + "  iiiiiiii: " + O[a] + "  iiiiiiiii: " + P[a] + "  ");
		k(a)
	},
	C: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'i'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: ii: " + G[a] + "  iii: " + H[a] + "  iiii: " + I[a] + "  iiiii: " + J[a] + "  iiiiid: " + K[a] + "  iiiiii: " + L[a] + "  iiiiij: " + Q[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  iiiiiiii: " + O[a] + "  iiiiiiiii: " + P[a] + "  vi: " + S[a] + "  v: " + R[a] + "  vif: " + T[a] + "  vii: " + U[a] + "  ff: " + E[a] + "  viii: " + V[a] + "  viiii: " + W[a] + "  viiiii: " + X[a] + "  viijii: " + sf[a] + "  viiiiii: " + Y[a] + "  ");
		k(a)
	},
	h: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: i: " + F[a] + "  iii: " + H[a] + "  iiii: " + I[a] + "  iiiii: " + J[a] + "  iiiiid: " + K[a] + "  iiiiii: " + L[a] + "  iiiiij: " + Q[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  iiiiiiii: " + O[a] + "  iiiiiiiii: " + P[a] + "  vii: " + U[a] + "  vi: " + S[a] + "  viii: " + V[a] + "  vif: " + T[a] + "  v: " + R[a] + "  ff: " + E[a] + "  viiii: " + W[a] + "  viiiii: " + X[a] + "  viijii: " + sf[a] + "  viiiiii: " + Y[a] + "  ");
		k(a)
	},
	g: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: ii: " + G[a] + "  iiii: " + I[a] + "  i: " + F[a] + "  iiiii: " + J[a] + "  iiiiid: " + K[a] + "  iiiiii: " + L[a] + "  iiiiij: " + Q[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  iiiiiiii: " + O[a] + "  iiiiiiiii: " + P[a] + "  viii: " + V[a] + "  vii: " + U[a] + "  vi: " + S[a] + "  viiii: " + W[a] + "  vif: " + T[a] + "  viiiii: " + X[a] + "  viijii: " + sf[a] + "  ff: " + E[a] + "  v: " + R[a] + "  viiiiii: " + Y[a] + "  ");
		k(a)
	},
	R: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iii: " + H[a] + "  ii: " + G[a] + "  iiiii: " + J[a] + "  i: " + F[a] + "  iiiiid: " + K[a] + "  iiiiii: " + L[a] + "  iiiiij: " + Q[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  iiiiiiii: " + O[a] + "  iiiiiiiii: " + P[a] + "  viii: " + V[a] + "  viiii: " + W[a] + "  vii: " + U[a] + "  vi: " + S[a] + "  viiiii: " + X[a] + "  viijii: " + sf[a] + "  vif: " + T[a] + "  viiiiii: " + Y[a] + "  ff: " + E[a] + "  v: " + R[a] + "  ");
		k(a)
	},
	G: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + I[a] + "  iii: " + H[a] + "  ii: " + G[a] + "  iiiiid: " + K[a] + "  iiiiii: " + L[a] + "  iiiiij: " + Q[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  i: " + F[a] + "  iiiiiiii: " + O[a] + "  iiiiiiiii: " + P[a] + "  viiii: " + W[a] + "  viii: " + V[a] + "  viiiii: " + X[a] + "  vii: " + U[a] + "  vi: " + S[a] + "  viijii: " + sf[a] + "  viiiiii: " + Y[a] + "  vif: " + T[a] + "  ff: " + E[a] + "  v: " + R[a] + "  ");
		k(a)
	},
	E: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiiid'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + I[a] + "  iiiii: " + J[a] + "  iii: " + H[a] + "  ii: " + G[a] + "  i: " + F[a] + "  viiii: " + W[a] + "  viii: " + V[a] + "  iiiiii: " + L[a] + "  iiiiij: " + Q[a] + "  viiiii: " + X[a] + "  vii: " + U[a] + "  iiiiiid: " + M[a] + "  viijii: " + sf[a] + "  vi: " + S[a] + "  iiiiiii: " + N[a] + "  viiiiii: " + Y[a] + "  vif: " + T[a] + "  iiiiiiii: " + O[a] + "  ff: " + E[a] + "  iiiiiiiii: " + P[a] + "  v: " + R[a] + "  ");
		k(a)
	},
	v: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + I[a] + "  iiiii: " + J[a] + "  iii: " + H[a] + "  ii: " + G[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  iiiiiiii: " + O[a] + "  i: " + F[a] + "  iiiiiiiii: " + P[a] + "  viiii: " + W[a] + "  viii: " + V[a] + "  iiiiid: " + K[a] + "  iiiiij: " + Q[a] + "  viiiii: " + X[a] + "  vii: " + U[a] + "  viiiiii: " + Y[a] + "  viijii: " + sf[a] + "  vi: " + S[a] + "  vif: " + T[a] + "  ff: " + E[a] + "  v: " + R[a] + "  ");
		k(a)
	},
	aa: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiiiid'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + I[a] + "  iiiii: " + J[a] + "  iiiiii: " + L[a] + "  iii: " + H[a] + "  ii: " + G[a] + "  i: " + F[a] + "  iiiiid: " + K[a] + "  viiii: " + W[a] + "  viii: " + V[a] + "  iiiiij: " + Q[a] + "  viiiii: " + X[a] + "  iiiiiii: " + N[a] + "  viiiiii: " + Y[a] + "  vii: " + U[a] + "  viijii: " + sf[a] + "  vi: " + S[a] + "  iiiiiiii: " + O[a] + "  vif: " + T[a] + "  ff: " + E[a] + "  iiiiiiiii: " + P[a] + "  v: " + R[a] + "  ");
		k(a)
	},
	l: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + I[a] + "  iiiii: " + J[a] + "  iiiiii: " + L[a] + "  iii: " + H[a] + "  ii: " + G[a] + "  iiiiiiii: " + O[a] + "  iiiiiiiii: " + P[a] + "  i: " + F[a] + "  viiii: " + W[a] + "  viii: " + V[a] + "  iiiiid: " + K[a] + "  iiiiij: " + Q[a] + "  viiiii: " + X[a] + "  iiiiiid: " + M[a] + "  viiiiii: " + Y[a] + "  vii: " + U[a] + "  viijii: " + sf[a] + "  vi: " + S[a] + "  vif: " + T[a] + "  ff: " + E[a] + "  v: " + R[a] + "  ");
		k(a)
	},
	$: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + I[a] + "  iiiii: " + J[a] + "  iiiiii: " + L[a] + "  iii: " + H[a] + "  iiiiiii: " + N[a] + "  ii: " + G[a] + "  iiiiiiiii: " + P[a] + "  i: " + F[a] + "  viiii: " + W[a] + "  viii: " + V[a] + "  iiiiid: " + K[a] + "  iiiiij: " + Q[a] + "  viiiii: " + X[a] + "  iiiiiid: " + M[a] + "  viiiiii: " + Y[a] + "  vii: " + U[a] + "  viijii: " + sf[a] + "  vi: " + S[a] + "  vif: " + T[a] + "  ff: " + E[a] + "  v: " + R[a] + "  ");
		k(a)
	},
	x: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + I[a] + "  iiiii: " + J[a] + "  iiiiii: " + L[a] + "  iii: " + H[a] + "  iiiiiii: " + N[a] + "  iiiiiiii: " + O[a] + "  ii: " + G[a] + "  i: " + F[a] + "  viiii: " + W[a] + "  viii: " + V[a] + "  iiiiid: " + K[a] + "  iiiiij: " + Q[a] + "  viiiii: " + X[a] + "  iiiiiid: " + M[a] + "  viiiiii: " + Y[a] + "  vii: " + U[a] + "  viijii: " + sf[a] + "  vi: " + S[a] + "  vif: " + T[a] + "  ff: " + E[a] + "  v: " + R[a] + "  ");
		k(a)
	},
	D: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiiij'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + I[a] + "  iiiii: " + J[a] + "  iii: " + H[a] + "  ii: " + G[a] + "  i: " + F[a] + "  viiii: " + W[a] + "  viii: " + V[a] + "  iiiiid: " + K[a] + "  iiiiii: " + L[a] + "  viiiii: " + X[a] + "  vii: " + U[a] + "  vi: " + S[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  viiiiii: " + Y[a] + "  vif: " + T[a] + "  viijii: " + sf[a] + "  iiiiiiii: " + O[a] + "  ff: " + E[a] + "  iiiiiiiii: " + P[a] + "  v: " + R[a] + "  ");
		k(a)
	},
	u: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'v'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: vi: " + S[a] + "  vif: " + T[a] + "  vii: " + U[a] + "  viii: " + V[a] + "  viiii: " + W[a] + "  viiiii: " + X[a] + "  viijii: " + sf[a] + "  viiiiii: " + Y[a] + "  i: " + F[a] + "  ff: " + E[a] + "  ii: " + G[a] + "  iii: " + H[a] + "  iiii: " + I[a] + "  iiiii: " + J[a] + "  iiiiid: " + K[a] + "  iiiiii: " + L[a] + "  iiiiij: " + Q[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  iiiiiiii: " + O[a] + "  iiiiiiiii: " + P[a] + "  ");
		k(a)
	},
	f: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'vi'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: v: " + R[a] + "  vif: " + T[a] + "  vii: " + U[a] + "  viii: " + V[a] + "  viiii: " + W[a] + "  viiiii: " + X[a] + "  viijii: " + sf[a] + "  viiiiii: " + Y[a] + "  i: " + F[a] + "  ii: " + G[a] + "  iii: " + H[a] + "  ff: " + E[a] + "  iiii: " + I[a] + "  iiiii: " + J[a] + "  iiiiid: " + K[a] + "  iiiiii: " + L[a] + "  iiiiij: " + Q[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  iiiiiiii: " + O[a] + "  iiiiiiiii: " + P[a] + "  ");
		k(a)
	},
	_a: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'vif'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: vi: " + S[a] + "  v: " + R[a] + "  vii: " + U[a] + "  i: " + F[a] + "  ii: " + G[a] + "  ff: " + E[a] + "  viii: " + V[a] + "  iii: " + H[a] + "  viiii: " + W[a] + "  iiii: " + I[a] + "  viiiii: " + X[a] + "  viijii: " + sf[a] + "  iiiii: " + J[a] + "  viiiiii: " + Y[a] + "  iiiiid: " + K[a] + "  iiiiii: " + L[a] + "  iiiiij: " + Q[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  iiiiiiii: " + O[a] + "  iiiiiiiii: " + P[a] + "  ");
		k(a)
	},
	i: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'vii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: vi: " + S[a] + "  viii: " + V[a] + "  v: " + R[a] + "  viiii: " + W[a] + "  viiiii: " + X[a] + "  viijii: " + sf[a] + "  viiiiii: " + Y[a] + "  ii: " + G[a] + "  iii: " + H[a] + "  vif: " + T[a] + "  i: " + F[a] + "  iiii: " + I[a] + "  iiiii: " + J[a] + "  ff: " + E[a] + "  iiiiid: " + K[a] + "  iiiiii: " + L[a] + "  iiiiij: " + Q[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  iiiiiiii: " + O[a] + "  iiiiiiiii: " + P[a] + "  ");
		k(a)
	},
	k: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'viii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: vii: " + U[a] + "  vi: " + S[a] + "  viiii: " + W[a] + "  v: " + R[a] + "  viiiii: " + X[a] + "  viiiiii: " + Y[a] + "  iii: " + H[a] + "  ii: " + G[a] + "  iiii: " + I[a] + "  vif: " + T[a] + "  iiiii: " + J[a] + "  i: " + F[a] + "  viijii: " + sf[a] + "  iiiiid: " + K[a] + "  iiiiii: " + L[a] + "  iiiiij: " + Q[a] + "  ff: " + E[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  iiiiiiii: " + O[a] + "  iiiiiiiii: " + P[a] + "  ");
		k(a)
	},
	o: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'viiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: viii: " + V[a] + "  vii: " + U[a] + "  vi: " + S[a] + "  viiiii: " + X[a] + "  viiiiii: " + Y[a] + "  v: " + R[a] + "  iiii: " + I[a] + "  iii: " + H[a] + "  ii: " + G[a] + "  iiiii: " + J[a] + "  viijii: " + sf[a] + "  vif: " + T[a] + "  iiiiid: " + K[a] + "  iiiiii: " + L[a] + "  iiiiij: " + Q[a] + "  i: " + F[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  ff: " + E[a] + "  iiiiiiii: " + O[a] + "  iiiiiiiii: " + P[a] + "  ");
		k(a)
	},
	K: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'viiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: viii: " + V[a] + "  viiii: " + W[a] + "  vii: " + U[a] + "  vi: " + S[a] + "  viiiiii: " + Y[a] + "  v: " + R[a] + "  iiii: " + I[a] + "  iiiii: " + J[a] + "  iii: " + H[a] + "  ii: " + G[a] + "  iiiiii: " + L[a] + "  viijii: " + sf[a] + "  iiiiid: " + K[a] + "  iiiiij: " + Q[a] + "  vif: " + T[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  i: " + F[a] + "  iiiiiiii: " + O[a] + "  ff: " + E[a] + "  iiiiiiiii: " + P[a] + "  ");
		k(a)
	},
	_: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'viiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: viii: " + V[a] + "  viiii: " + W[a] + "  viiiii: " + X[a] + "  vii: " + U[a] + "  vi: " + S[a] + "  v: " + R[a] + "  iiii: " + I[a] + "  iiiii: " + J[a] + "  iiiiii: " + L[a] + "  iii: " + H[a] + "  ii: " + G[a] + "  viijii: " + sf[a] + "  iiiiid: " + K[a] + "  iiiiij: " + Q[a] + "  iiiiiii: " + N[a] + "  iiiiiid: " + M[a] + "  vif: " + T[a] + "  iiiiiiii: " + O[a] + "  i: " + F[a] + "  ff: " + E[a] + "  iiiiiiiii: " + P[a] + "  ");
		k(a)
	},
	Z: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'viijii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: vii: " + U[a] + "  vi: " + S[a] + "  v: " + R[a] + "  viii: " + V[a] + "  viiii: " + W[a] + "  iiii: " + I[a] + "  iii: " + H[a] + "  ii: " + G[a] + "  iiiii: " + J[a] + "  viiiii: " + X[a] + "  vif: " + T[a] + "  iiiiii: " + L[a] + "  iiiiid: " + K[a] + "  viiiiii: " + Y[a] + "  iiiiij: " + Q[a] + "  i: " + F[a] + "  iiiiiid: " + M[a] + "  iiiiiii: " + N[a] + "  ff: " + E[a] + "  iiiiiiii: " + O[a] + "  iiiiiiiii: " + P[a] + "  ");
		k(a)
	},
	j: function (a, b, c, d) {
		k("Assertion failed: " + xa(a) + ", at: " + [b ? xa(b) : "unknown filename",
			c, d ? xa(d) : "unknown function"
		])
	},
	n: function (a) {
		return Ha(a)
	},
	Ya: function () {
		wa = !0;
		throw "Pure virtual function called!";
	},
	m: function (a) {
		"uncaught_exception" in Cb ? Cb.Ed++ : Cb.Ed = 1;
		throw a + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
	},
	Y: function () {},
	Xa: function () {
		Db(w.Kc);
		return -1
	},
	X: Db,
	Wa: function (a, b) {
		Hc = b;
		try {
			var c = Jc();
			Ic();
			var d = Ic(),
				f = Ic(),
				g = Ic();
			Ac(c, d, g);
			p[f >> 2] = c.position;
			c.kd && 0 ===
				d && 0 === g && (c.kd = null);
			return 0
		} catch (h) {
			return "undefined" !== typeof FS && h instanceof z || k(h), -h.Ec
		}
	},
	Va: function (a, b) {
		Hc = b;
		try {
			var c = Jc(),
				d = Ic();
			a: {
				var f = Ic();
				for (b = a = 0; b < f; b++) {
					var g = p[d + (8 * b + 4) >> 2],
						h = c,
						r = p[d + 8 * b >> 2],
						x = g,
						u = void 0,
						v = Ea;
					if (0 > x || 0 > u) throw new z(w.mc);
					if (null === h.fd) throw new z(w.wc);
					if (1 === (h.flags & 2097155)) throw new z(w.wc);
					if (16384 === (h.node.mode & 61440)) throw new z(w.Rc);
					if (!h.jc.read) throw new z(w.mc);
					var A = "undefined" !== typeof u;
					if (!A) u = h.position;
					else if (!h.seekable) throw new z(w.Sc);
					var da = h.jc.read(h, v, r, x, u);
					A || (h.position += da);
					var ea = da;
					if (0 > ea) {
						var y = -1;
						break a
					}
					a += ea;
					if (ea < g) break
				}
				y = a
			}
			return y
		} catch (Fa) {
			return "undefined" !== typeof FS && Fa instanceof z || k(Fa), -Fa.Ec
		}
	},
	W: function (a, b) {
		Hc = b;
		try {
			var c = Jc(),
				d = Ic();
			a: {
				var f = Ic();
				for (b = a = 0; b < f; b++) {
					var g = c,
						h = p[d + 8 * b >> 2],
						r = p[d + (8 * b + 4) >> 2],
						x = Ea,
						u = void 0;
					if (0 > r || 0 > u) throw new z(w.mc);
					if (null === g.fd) throw new z(w.wc);
					if (0 === (g.flags & 2097155)) throw new z(w.wc);
					if (16384 === (g.node.mode & 61440)) throw new z(w.Rc);
					if (!g.jc.write) throw new z(w.mc);
					g.flags & 1024 && Ac(g, 0, 2);
					var v = "undefined" !== typeof u;
					if (!v) u = g.position;
					else if (!g.seekable) throw new z(w.Sc);
					var A = g.jc.write(g, x, h, r, u, void 0);
					v || (g.position += A);
					try {
						if (g.path && dc.onWriteToFile) dc.onWriteToFile(g.path)
					} catch (y) {
						console.log("FS.trackingDelegate['onWriteToFile']('" + path + "') threw an exception: " + y.message)
					}
					var da = A;
					if (0 > da) {
						var ea = -1;
						break a
					}
					a += da
				}
				ea = a
			}
			return ea
		} catch (y) {
			return "undefined" !== typeof FS && y instanceof z || k(y), -y.Ec
		}
	},
	Ua: function (a, b) {
		Hc = b;
		try {
			var c = Jc(),
				d = Ic();
			switch (d) {
				case 21509:
				case 21505:
					return c.tty ?
						0 : -w.Cc;
				case 21510:
				case 21511:
				case 21512:
				case 21506:
				case 21507:
				case 21508:
					return c.tty ? 0 : -w.Cc;
				case 21519:
					if (!c.tty) return -w.Cc;
					var f = Ic();
					return p[f >> 2] = 0;
				case 21520:
					return c.tty ? -w.mc : -w.Cc;
				case 21531:
					a = f = Ic();
					if (!c.jc.ae) throw new z(w.Cc);
					return c.jc.ae(c, d, a);
				case 21523:
					return c.tty ? 0 : -w.Cc;
				case 21524:
					return c.tty ? 0 : -w.Cc;
				default:
					k("bad ioctl syscall " + d)
			}
		} catch (g) {
			return "undefined" !== typeof FS && g instanceof z || k(g), -g.Ec
		}
	},
	Ta: function (a, b) {
		Hc = b;
		try {
			var c = Jc();
			zc(c);
			return 0
		} catch (d) {
			return "undefined" !==
				typeof FS && d instanceof z || k(d), -d.Ec
		}
	},
	Sa: function (a, b) {
		Hc = b;
		try {
			var c = Ic(),
				d = Ic(),
				f = Gc[c];
			if (!f) return 0;
			if (d === f.yg) {
				var g = $b[f.fd],
					h = f.flags,
					r = new Uint8Array(n.subarray(c, c + d));
				g && g.jc.Yc && g.jc.Yc(g, r, 0, d, h);
				Gc[c] = null;
				f.Qd && Ia(f.zg)
			}
			return 0
		} catch (x) {
			return "undefined" !== typeof FS && x instanceof z || k(x), -x.Ec
		}
	},
	J: function () {},
	Ra: function (a, b, c, d, f) {
		var g = Kc(c);
		b = Mc(b);
		Xc(a, {
			name: b,
			fromWireType: function (a) {
				return !!a
			},
			toWireType: function (a, b) {
				return b ? d : f
			},
			argPackAdvance: 8,
			readValueFromPointer: function (a) {
				if (1 ===
					c) var d = Ea;
				else if (2 === c) d = La;
				else if (4 === c) d = p;
				else throw new TypeError("Unknown boolean type size: " + b);
				return this.fromWireType(d[a >> g])
			},
			yc: null
		})
	},
	Qa: function (a, b) {
		b = Mc(b);
		Xc(a, {
			name: b,
			fromWireType: function (a) {
				var b = Zc[a].value;
				4 < a && 0 === --Zc[a].je && (Zc[a] = void 0, Yc.push(a));
				return b
			},
			toWireType: function (a, b) {
				return $c(b)
			},
			argPackAdvance: 8,
			readValueFromPointer: ad,
			yc: null
		})
	},
	U: function (a, b, c) {
		c = Kc(c);
		b = Mc(b);
		Xc(a, {
			name: b,
			fromWireType: function (a) {
				return a
			},
			toWireType: function (a, b) {
				if ("number" !==
					typeof b && "boolean" !== typeof b) throw new TypeError('Cannot convert "' + bd(b) + '" to ' + this.name);
				return b
			},
			argPackAdvance: 8,
			readValueFromPointer: cd(b, c),
			yc: null
		})
	},
	r: function (a, b, c, d, f, g) {
		var h = hd(b, c);
		a = Mc(a);
		f = id(d, f);
		gd(a, function () {
			md("Cannot call " + a + " due to unbound types", h)
		}, b - 1);
		Wc(h, function (c) {
			var d = [c[0], null].concat(c.slice(1)),
				h = c = a,
				r = f,
				A = d.length;
			2 > A && Uc("argTypes array size mismatch! Must at least get return value and 'this' types!");
			for (var da = null !== d[1] && !1, ea = !1, y = 1; y < d.length; ++y)
				if (null !==
					d[y] && void 0 === d[y].yc) {
					ea = !0;
					break
				}
			var Fa = "void" !== d[0].name,
				Pa = "",
				eb = "";
			for (y = 0; y < A - 2; ++y) Pa += (0 !== y ? ", " : "") + "arg" + y, eb += (0 !== y ? ", " : "") + "arg" + y + "Wired";
			h = "return function " + Qc(h) + "(" + Pa + ") {\nif (arguments.length !== " + (A - 2) + ") {\nthrowBindingError('function " + h + " called with ' + arguments.length + ' arguments, expected " + (A - 2) + " args!');\n}\n";
			ea && (h += "var destructors = [];\n");
			var oe = ea ? "destructors" : "null";
			Pa = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
			r = [Uc,
				r, g, ed, d[0], d[1]
			];
			da && (h += "var thisWired = classParam.toWireType(" + oe + ", this);\n");
			for (y = 0; y < A - 2; ++y) h += "var arg" + y + "Wired = argType" + y + ".toWireType(" + oe + ", arg" + y + "); // " + d[y + 2].name + "\n", Pa.push("argType" + y), r.push(d[y + 2]);
			da && (eb = "thisWired" + (0 < eb.length ? ", " : "") + eb);
			h += (Fa ? "var rv = " : "") + "invoker(fn" + (0 < eb.length ? ", " : "") + eb + ");\n";
			if (ea) h += "runDestructors(destructors);\n";
			else
				for (y = da ? 1 : 2; y < d.length; ++y) A = 1 === y ? "thisWired" : "arg" + (y - 2) + "Wired", null !== d[y].yc && (h += A + "_dtor(" + A + "); // " + d[y].name +
					"\n", Pa.push(A + "_dtor"), r.push(d[y].yc));
			Fa && (h += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
			Pa.push(h + "}\n");
			d = dd(Pa).apply(null, r);
			y = b - 1;
			if (!e.hasOwnProperty(c)) throw new Vc("Replacing nonexistant public symbol");
			void 0 !== e[c].tc && void 0 !== y ? e[c].tc[y] = d : (e[c] = d, e[c].Rd = y);
			return []
		})
	},
	q: function (a, b, c, d, f) {
		function g(a) {
			return a
		}
		b = Mc(b); - 1 === f && (f = 4294967295);
		var h = Kc(c);
		if (0 === d) {
			var r = 32 - 8 * c;
			g = function (a) {
				return a << r >>> r
			}
		}
		var x = -1 != b.indexOf("unsigned");
		Xc(a, {
			name: b,
			fromWireType: g,
			toWireType: function (a,
				c) {
				if ("number" !== typeof c && "boolean" !== typeof c) throw new TypeError('Cannot convert "' + bd(c) + '" to ' + this.name);
				if (c < d || c > f) throw new TypeError('Passing a number "' + bd(c) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + f + "]!");
				return x ? c >>> 0 : c | 0
			},
			argPackAdvance: 8,
			readValueFromPointer: nd(b, h, 0 !== d),
			yc: null
		})
	},
	p: function (a, b, c) {
		function d(a) {
			a >>= 2;
			var b = Na;
			return new f(b.buffer, b[a + 1], b[a])
		}
		var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array,
			Uint32Array, Float32Array, Float64Array
		][b];
		c = Mc(c);
		Xc(a, {
			name: c,
			fromWireType: d,
			argPackAdvance: 8,
			readValueFromPointer: d
		}, {
			Zd: !0
		})
	},
	T: function (a, b) {
		b = Mc(b);
		var c = "std::string" === b;
		Xc(a, {
			name: b,
			fromWireType: function (a) {
				var b = Na[a >> 2];
				if (c) {
					var d = n[a + 4 + b],
						h = 0;
					0 != d && (h = d, n[a + 4 + b] = 0);
					var r = a + 4;
					for (d = 0; d <= b; ++d) {
						var x = a + 4 + d;
						if (0 == n[x]) {
							r = ya(n, r);
							if (void 0 === u) var u = r;
							else u += String.fromCharCode(0), u += r;
							r = x + 1
						}
					}
					0 != h && (n[a + 4 + b] = h)
				} else {
					u = Array(b);
					for (d = 0; d < b; ++d) u[d] = String.fromCharCode(n[a + 4 + d]);
					u = u.join("")
				}
				Ia(a);
				return u
			},
			toWireType: function (a, b) {
				b instanceof ArrayBuffer && (b = new Uint8Array(b));
				var d = "string" === typeof b;
				d || b instanceof Uint8Array || b instanceof Uint8ClampedArray || b instanceof Int8Array || Uc("Cannot pass non-string to std::string");
				var f = (c && d ? function () {
						return Ca(b)
					} : function () {
						return b.length
					})(),
					r = Ha(4 + f + 1);
				Na[r >> 2] = f;
				if (c && d) Ba(b, r + 4, f + 1);
				else if (d)
					for (d = 0; d < f; ++d) {
						var x = b.charCodeAt(d);
						255 < x && (Ia(r), Uc("String has UTF-16 code units that do not fit in 8 bits"));
						n[r + 4 + d] = x
					} else
						for (d = 0; d <
							f; ++d) n[r + 4 + d] = b[d];
				null !== a && a.push(Ia, r);
				return r
			},
			argPackAdvance: 8,
			readValueFromPointer: ad,
			yc: function (a) {
				Ia(a)
			}
		})
	},
	Pa: function (a, b, c) {
		c = Mc(c);
		if (2 === b) {
			var d = function () {
				return Ma
			};
			var f = 1
		} else 4 === b && (d = function () {
			return Na
		}, f = 2);
		Xc(a, {
			name: c,
			fromWireType: function (a) {
				for (var b = d(), c = Na[a >> 2], g = Array(c), u = a + 4 >> f, v = 0; v < c; ++v) g[v] = String.fromCharCode(b[u + v]);
				Ia(a);
				return g.join("")
			},
			toWireType: function (a, c) {
				var g = d(),
					h = c.length,
					u = Ha(4 + h * b);
				Na[u >> 2] = h;
				for (var v = u + 4 >> f, A = 0; A < h; ++A) g[v + A] = c.charCodeAt(A);
				null !== a && a.push(Ia, u);
				return u
			},
			argPackAdvance: 8,
			readValueFromPointer: ad,
			yc: function (a) {
				Ia(a)
			}
		})
	},
	Oa: function (a, b) {
		b = Mc(b);
		Xc(a, {
			xg: !0,
			name: b,
			argPackAdvance: 0,
			fromWireType: function () {},
			toWireType: function () {}
		})
	},
	e: function () {
		e.abort()
	},
	B: function (a, b) {
		ta("atexit() called, but EXIT_RUNTIME is not set, so atexits() will not be called. set EXIT_RUNTIME to 1 (see the FAQ)");
		ib.unshift({
			uc: a,
			Lc: b
		})
	},
	A: function (a) {
		return tb[a]()
	},
	Na: function (a, b, c, d) {
		de(xa(a), function (a) {
			var d = Ha(a.length);
			n.set(a, d);
			e.dynCall_viii(c, b, d, a.length);
			Ia(d)
		}, function () {
			d && e.dynCall_vi(d, b)
		})
	},
	Ma: function () {
		sd = null;
		Ad++;
		rd = null
	},
	La: ud,
	Ka: function (a, b, c) {
		n.set(n.subarray(b, b + c), a);
		return a
	},
	Ja: function (a, b, c) {
		a = a ? te(a) : e.canvas;
		if (!a) return -4;
		a.width = b;
		a.height = c;
		return 0
	},
	Ia: yd,
	Ha: function (a, b, c, d) {
		ze(a, b, c, d, 5, "mousedown");
		return 0
	},
	Ga: function (a, b, c, d) {
		ze(a, b, c, d, 8, "mousemove");
		return 0
	},
	Fa: function (a, b, c, d) {
		ze(a, b, c, d, 6, "mouseup");
		return 0
	},
	Ea: function (a, b, c, d) {
		Be(a, b, c, d, 25, "touchcancel");
		return 0
	},
	Da: function (a,
		b, c, d) {
		Be(a, b, c, d, 23, "touchend");
		return 0
	},
	Ca: function (a, b, c, d) {
		Be(a, b, c, d, 24, "touchmove");
		return 0
	},
	Ba: function (a, b, c, d) {
		Be(a, b, c, d, 22, "touchstart");
		return 0
	},
	Aa: function (a, b, c, d) {
		a = te(a);
		return "undefined" !== typeof a.onwheel ? (Ae(a, b, c, d, "wheel"), 0) : "undefined" !== typeof a.onmousewheel ? (Ae(a, b, c, d, "mousewheel"), 0) : -1
	},
	za: function (a, b) {
		var c = {};
		c.alpha = !!p[b >> 2];
		c.depth = !!p[b + 4 >> 2];
		c.stencil = !!p[b + 8 >> 2];
		c.antialias = !!p[b + 12 >> 2];
		c.premultipliedAlpha = !!p[b + 16 >> 2];
		c.preserveDrawingBuffer = !!p[b + 20 >> 2];
		c.preferLowPowerToHighPerformance = !!p[b + 24 >> 2];
		c.failIfMajorPerformanceCaveat = !!p[b + 28 >> 2];
		c.majorVersion = p[b + 32 >> 2];
		c.minorVersion = p[b + 36 >> 2];
		c.enableExtensionsByDefault = p[b + 40 >> 2];
		c.explicitSwapControl = p[b + 44 >> 2];
		c.renderViaOffscreenBackBuffer = p[b + 48 >> 2];
		a = (a = xa(a)) && "#canvas" !== a || !e.canvas ? Je[a] || te(a) : e.canvas.id ? Je[e.canvas.id] || te(e.canvas.id) : e.canvas;
		return !a || c.explicitSwapControl ? 0 : Rd(a, c)
	},
	ya: function (a) {
		p[a >> 2] = 1;
		p[a + 4 >> 2] = 1;
		p[a + 8 >> 2] = 0;
		p[a + 12 >> 2] = 1;
		p[a + 16 >> 2] = 1;
		p[a + 20 >> 2] = 0;
		p[a + 24 >>
			2] = 0;
		p[a + 28 >> 2] = 0;
		p[a + 32 >> 2] = 1;
		p[a + 36 >> 2] = 0;
		p[a + 40 >> 2] = 1;
		p[a + 44 >> 2] = 0;
		p[a + 48 >> 2] = 0
	},
	xa: function (a) {
		return Td(a) ? 0 : -5
	},
	z: Ye,
	wa: function (a) {
		GLctx.activeTexture(a)
	},
	va: function (a, b) {
		GLctx.attachShader(Fe[a], Ie[b])
	},
	w: function (a, b) {
		var c = b ? Ee[b] : null;
		a == GLctx.ARRAY_BUFFER ? Ke = b : a == GLctx.ELEMENT_ARRAY_BUFFER && (Le = b);
		GLctx.bindBuffer(a, c)
	},
	I: function (a, b) {
		GLctx.bindTexture(a, b ? Ge[b] : null)
	},
	S: function (a, b, c, d) {
		c ? GLctx.bufferData(a, n.subarray(c, c + b), d) : GLctx.bufferData(a, b, d)
	},
	ua: function (a) {
		GLctx.clear(a)
	},
	ta: function (a, b, c, d) {
		GLctx.clearColor(a, b, c, d)
	},
	sa: function (a) {
		GLctx.compileShader(Ie[a])
	},
	ra: function (a, b, c, d, f, g, h, r) {
		GLctx.compressedTexImage2D(a, b, c, d, f, g, r ? n.subarray(r, r + h) : null)
	},
	qa: function () {
		var a = Re(Fe),
			b = GLctx.createProgram();
		b.name = a;
		Fe[a] = b;
		return a
	},
	Q: function (a) {
		var b = Re(Ie);
		Ie[b] = GLctx.createShader(a);
		return b
	},
	pa: function (a, b) {
		for (var c = 0; c < a; c++) {
			var d = p[b + 4 * c >> 2],
				f = Ee[d];
			f && (GLctx.deleteBuffer(f), f.name = 0, Ee[d] = null, d == Ke && (Ke = 0), d == Le && (Le = 0))
		}
	},
	oa: function (a) {
		if (a) {
			var b = Fe[a];
			b ? (GLctx.deleteProgram(b), b.name = 0, Fe[a] = null, Ne[a] = null) : Qe(1281)
		}
	},
	na: function (a) {
		if (a) {
			var b = Ie[a];
			b ? (GLctx.deleteShader(b), Ie[a] = null) : Qe(1281)
		}
	},
	ma: function (a) {
		GLctx.depthFunc(a)
	},
	la: _glDrawElements,
	P: function (a) {
		GLctx.enable(a)
	},
	H: function (a) {
		var b = D.Uc[a];
		assert(b, a);
		b.enabled = !0;
		GLctx.enableVertexAttribArray(a)
	},
	O: function (a, b) {
		for (var c = 0; c < a; c++) {
			var d = GLctx.createBuffer();
			if (!d) {
				for (Qe(1282); c < a;) p[b + 4 * c++ >> 2] = 0;
				break
			}
			var f = Re(Ee);
			d.name = f;
			Ee[f] = d;
			p[b + 4 * c >> 2] = f
		}
	},
	N: function (a, b) {
		for (var c =
				0; c < a; c++) {
			var d = GLctx.createTexture();
			if (!d) {
				for (Qe(1282); c < a;) p[b + 4 * c++ >> 2] = 0;
				break
			}
			var f = Re(Ge);
			d.name = f;
			Ge[f] = d;
			p[b + 4 * c >> 2] = f
		}
	},
	ka: function (a, b) {
		return GLctx.getAttribLocation(Fe[a], xa(b))
	},
	ja: function (a, b, c, d) {
		a = GLctx.getShaderInfoLog(Ie[a]);
		null === a && (a = "(unknown error)");
		0 < b && d ? (b = Ba(a, d, b), c && (p[c >> 2] = b)) : c && (p[c >> 2] = 0)
	},
	M: function (a, b, c) {
		c ? 35716 == b ? (a = GLctx.getShaderInfoLog(Ie[a]), null === a && (a = "(unknown error)"), p[c >> 2] = a.length + 1) : 35720 == b ? (a = GLctx.getShaderSource(Ie[a]), p[c >> 2] = null ===
			a || 0 == a.length ? 0 : a.length + 1) : p[c >> 2] = GLctx.getShaderParameter(Ie[a], b) : Qe(1281)
	},
	F: function (a, b) {
		b = xa(b);
		var c = 0;
		if (-1 !== b.indexOf("]", b.length - 1)) {
			var d = b.lastIndexOf("["),
				f = b.slice(d + 1, -1);
			if (0 < f.length && (c = parseInt(f), 0 > c)) return -1;
			b = b.slice(0, d)
		}
		a = Ne[a];
		return a ? (b = a.Md[b]) && c < b[0] ? b[1] + c : -1 : -1
	},
	ia: function (a) {
		GLctx.linkProgram(Fe[a]);
		Ne[a] = null;
		var b = Fe[a];
		Ne[a] = {
			Md: {},
			Fd: 0,
			Ag: -1,
			Bg: -1
		};
		a = Ne[a];
		for (var c = a.Md, d = GLctx.getProgramParameter(b, GLctx.ACTIVE_UNIFORMS), f = 0; f < d; ++f) {
			var g = GLctx.getActiveUniform(b,
					f),
				h = g.name;
			a.Fd = Math.max(a.Fd, h.length + 1); - 1 !== h.indexOf("]", h.length - 1) && (h = h.slice(0, h.lastIndexOf("[")));
			var r = GLctx.getUniformLocation(b, h);
			if (null != r) {
				var x = Re(He);
				c[h] = [g.size, x];
				He[x] = r;
				for (var u = 1; u < g.size; ++u) r = GLctx.getUniformLocation(b, h + "[" + u + "]"), x = Re(He), He[x] = r
			}
		}
	},
	ha: function (a, b) {
		3333 == a || 3317 == a && (Pe = b);
		GLctx.pixelStorei(a, b)
	},
	ga: function (a, b, c, d) {
		for (var f = "", g = 0; g < b; ++g) {
			if (d) {
				var h = p[d + 4 * g >> 2];
				h = 0 > h ? xa(p[c + 4 * g >> 2]) : xa(p[c + 4 * g >> 2], h)
			} else h = xa(p[c + 4 * g >> 2]);
			f += h
		}
		GLctx.shaderSource(Ie[a],
			f)
	},
	fa: function (a, b, c, d, f, g, h, r, x) {
		var u = null;
		x && (u = Ze(r, h, d, f, x));
		GLctx.texImage2D(a, b, c, d, f, g, h, r, u)
	},
	y: function (a, b, c) {
		GLctx.texParameteri(a, b, c)
	},
	ea: function (a, b) {
		GLctx.uniform1i(He[a], b)
	},
	da: function (a, b, c, d) {
		if (256 >= 16 * b) {
			var f = Te[16 * b - 1];
			for (var g = 0; g < 16 * b; g += 16) f[g] = Oa[d + 4 * g >> 2], f[g + 1] = Oa[d + (4 * g + 4) >> 2], f[g + 2] = Oa[d + (4 * g + 8) >> 2], f[g + 3] = Oa[d + (4 * g + 12) >> 2], f[g + 4] = Oa[d + (4 * g + 16) >> 2], f[g + 5] = Oa[d + (4 * g + 20) >> 2], f[g + 6] = Oa[d + (4 * g + 24) >> 2], f[g + 7] = Oa[d + (4 * g + 28) >> 2], f[g + 8] = Oa[d + (4 * g + 32) >> 2], f[g + 9] = Oa[d + (4 *
				g + 36) >> 2], f[g + 10] = Oa[d + (4 * g + 40) >> 2], f[g + 11] = Oa[d + (4 * g + 44) >> 2], f[g + 12] = Oa[d + (4 * g + 48) >> 2], f[g + 13] = Oa[d + (4 * g + 52) >> 2], f[g + 14] = Oa[d + (4 * g + 56) >> 2], f[g + 15] = Oa[d + (4 * g + 60) >> 2]
		} else f = Oa.subarray(d >> 2, d + 64 * b >> 2);
		GLctx.uniformMatrix4fv(He[a], !!c, f)
	},
	ib: function (a) {
		GLctx.useProgram(a ? Fe[a] : null)
	},
	L: function (a, b, c, d, f, g) {
		var h = D.Uc[a];
		assert(h, a);
		Ke ? (h.jd = !1, GLctx.vertexAttribPointer(a, b, c, !!d, f, g)) : (h.size = b, h.type = c, h.Kd = d, h.pd = f, h.Zc = g, h.jd = !0, h.Nd = function (a, b, c, d, f, g) {
			this.vertexAttribPointer(a, b, c, d, f, g)
		})
	},
	hb: function (a, b, c, d) {
		GLctx.viewport(a, b, c, d)
	},
	t: function (a) {
		var b = $e.oc[a];
		$e.oc.splice(a, 1);
		qa(b)
	},
	s: $e,
	gb: function () {
		k("trap!")
	},
	fb: function () {
		return 0
	},
	eb: function () {
		return 11
	},
	db: function () {},
	cb: function (a) {
		return af[a] || 0
	},
	bb: function () {},
	ca: function (a) {
		if (0 == a) return w.mc;
		p[a >> 2] = bf;
		af[bf] = 0;
		bf++;
		return 0
	},
	ab: cf,
	ba: function (a, b) {
		if (!(a in af)) return w.mc;
		af[a] = b;
		return 0
	},
	$a: function (a, b, c, d) {
		return jf(a, b, c, d)
	},
	a: Za,
	b: Wa,
	c: Xa
};
var Z = e.asm(e.Sd, e.Td, buffer),
	tf = Z.__GLOBAL__I_000101;
Z.__GLOBAL__I_000101 = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return tf.apply(null, arguments)
};
var uf = Z.__GLOBAL__sub_I_bin_valuestorage_cpp;
Z.__GLOBAL__sub_I_bin_valuestorage_cpp = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return uf.apply(null, arguments)
};
var vf = Z.__GLOBAL__sub_I_bind_cpp;
Z.__GLOBAL__sub_I_bind_cpp = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return vf.apply(null, arguments)
};
var wf = Z.__GLOBAL__sub_I_event_cpp;
Z.__GLOBAL__sub_I_event_cpp = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return wf.apply(null, arguments)
};
var xf = Z.__GLOBAL__sub_I_event_handler_cpp;
Z.__GLOBAL__sub_I_event_handler_cpp = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return xf.apply(null, arguments)
};
var yf = Z.__GLOBAL__sub_I_iostream_cpp;
Z.__GLOBAL__sub_I_iostream_cpp = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return yf.apply(null, arguments)
};
var zf = Z.__GLOBAL__sub_I_web_interface_cpp;
Z.__GLOBAL__sub_I_web_interface_cpp = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return zf.apply(null, arguments)
};
var Af = Z.___cxa_can_catch;
Z.___cxa_can_catch = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Af.apply(null, arguments)
};
var Bf = Z.___cxa_demangle;
Z.___cxa_demangle = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Bf.apply(null, arguments)
};
var Cf = Z.___cxa_is_pointer_type;
Z.___cxa_is_pointer_type = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Cf.apply(null, arguments)
};
var Df = Z.___errno_location;
Z.___errno_location = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Df.apply(null, arguments)
};
var Ef = Z.___getTypeName;
Z.___getTypeName = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Ef.apply(null, arguments)
};
var Ff = Z._fflush;
Z._fflush = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Ff.apply(null, arguments)
};
var Gf = Z._free;
Z._free = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Gf.apply(null, arguments)
};
var Hf = Z._llvm_bswap_i32;
Z._llvm_bswap_i32 = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Hf.apply(null, arguments)
};
var If = Z._main;
Z._main = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return If.apply(null, arguments)
};
var Jf = Z._malloc;
Z._malloc = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Jf.apply(null, arguments)
};
var Kf = Z._memmove;
Z._memmove = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Kf.apply(null, arguments)
};
var Lf = Z._pthread_cond_broadcast;
Z._pthread_cond_broadcast = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Lf.apply(null, arguments)
};
var Mf = Z._pthread_mutex_lock;
Z._pthread_mutex_lock = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Mf.apply(null, arguments)
};
var Nf = Z._pthread_mutex_unlock;
Z._pthread_mutex_unlock = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Nf.apply(null, arguments)
};
var Of = Z._sbrk;
Z._sbrk = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Of.apply(null, arguments)
};
var Pf = Z.establishStackSpace;
Z.establishStackSpace = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Pf.apply(null, arguments)
};
var Qf = Z.getTempRet0;
Z.getTempRet0 = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Qf.apply(null, arguments)
};
var Rf = Z.setTempRet0;
Z.setTempRet0 = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Rf.apply(null, arguments)
};
var Sf = Z.setThrew;
Z.setThrew = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Sf.apply(null, arguments)
};
var Tf = Z.stackAlloc;
Z.stackAlloc = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Tf.apply(null, arguments)
};
var Uf = Z.stackRestore;
Z.stackRestore = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Uf.apply(null, arguments)
};
var Vf = Z.stackSave;
Z.stackSave = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Vf.apply(null, arguments)
};
e.asm = Z;
var ub = e.__GLOBAL__I_000101 = function () {
		assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.lb.apply(null, arguments)
	},
	xb = e.__GLOBAL__sub_I_bin_valuestorage_cpp = function () {
		assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.mb.apply(null, arguments)
	},
	zb = e.__GLOBAL__sub_I_bind_cpp = function () {
		assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.nb.apply(null, arguments)
	},
	vb = e.__GLOBAL__sub_I_event_cpp = function () {
		assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.ob.apply(null, arguments)
	},
	wb = e.__GLOBAL__sub_I_event_handler_cpp = function () {
		assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.pb.apply(null, arguments)
	},
	Ab = e.__GLOBAL__sub_I_iostream_cpp = function () {
		assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.qb.apply(null, arguments)
	},
	yb = e.__GLOBAL__sub_I_web_interface_cpp = function () {
		assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.rb.apply(null, arguments)
	};
e.___cxa_can_catch = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.sb.apply(null, arguments)
};
e.___cxa_demangle = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.tb.apply(null, arguments)
};
e.___cxa_is_pointer_type = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.ub.apply(null, arguments)
};
e.___errno_location = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.vb.apply(null, arguments)
};
var ld = e.___getTypeName = function () {
		assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.wb.apply(null, arguments)
	},
	ab = e._emscripten_replace_memory = function () {
		assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm._emscripten_replace_memory.apply(null,
			arguments)
	};
e._fflush = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.xb.apply(null, arguments)
};
var Ia = e._free = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.yb.apply(null, arguments)
};
e._llvm_bswap_i32 = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.zb.apply(null, arguments)
};
e._main = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Ab.apply(null, arguments)
};
var Ha = e._malloc = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Bb.apply(null, arguments)
};
e._memmove = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Cb.apply(null, arguments)
};
e._pthread_cond_broadcast = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Db.apply(null, arguments)
};
e._pthread_mutex_lock = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Eb.apply(null, arguments)
};
e._pthread_mutex_unlock = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Fb.apply(null, arguments)
};
e._sbrk = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Gb.apply(null, arguments)
};
e.establishStackSpace = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.bc.apply(null, arguments)
};
e.getTempRet0 = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.cc.apply(null, arguments)
};
e.setTempRet0 = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.dc.apply(null, arguments)
};
e.setThrew = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.ec.apply(null, arguments)
};
var ra = e.stackAlloc = function () {
		assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.fc.apply(null, arguments)
	},
	qa = e.stackRestore = function () {
		assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.gc.apply(null, arguments)
	},
	pa = e.stackSave = function () {
		assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.hc.apply(null, arguments)
	};
e.dynCall_ff = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Hb.apply(null, arguments)
};
e.dynCall_i = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Ib.apply(null, arguments)
};
e.dynCall_ii = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Jb.apply(null, arguments)
};
e.dynCall_iii = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Kb.apply(null, arguments)
};
e.dynCall_iiii = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Lb.apply(null, arguments)
};
e.dynCall_iiiii = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Mb.apply(null, arguments)
};
e.dynCall_iiiiid = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Nb.apply(null, arguments)
};
e.dynCall_iiiiii = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Ob.apply(null, arguments)
};
e.dynCall_iiiiiid = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Pb.apply(null, arguments)
};
e.dynCall_iiiiiii = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Qb.apply(null, arguments)
};
e.dynCall_iiiiiiii = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Rb.apply(null, arguments)
};
e.dynCall_iiiiiiiii = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Sb.apply(null, arguments)
};
e.dynCall_iiiiij = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Tb.apply(null, arguments)
};
e.dynCall_v = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Ub.apply(null, arguments)
};
e.dynCall_vi = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Vb.apply(null, arguments)
};
e.dynCall_vif = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Wb.apply(null, arguments)
};
e.dynCall_vii = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Xb.apply(null, arguments)
};
e.dynCall_viii = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Yb.apply(null, arguments)
};
e.dynCall_viiii = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Zb.apply(null, arguments)
};
e.dynCall_viiiii = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm._b.apply(null, arguments)
};
e.dynCall_viiiiii = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.$b.apply(null, arguments)
};
e.dynCall_viijii = function () {
	assert(q, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.ac.apply(null, arguments)
};
e.asm = Z;
e.intArrayFromString || (e.intArrayFromString = function () {
	k("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.intArrayToString || (e.intArrayToString = function () {
	k("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.ccall || (e.ccall = function () {
	k("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.cwrap || (e.cwrap = function () {
	k("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.setValue || (e.setValue = function () {
	k("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.getValue || (e.getValue = function () {
	k("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.allocate || (e.allocate = function () {
	k("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.getMemory || (e.getMemory = function () {
	k("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
e.Pointer_stringify || (e.Pointer_stringify = function () {
	k("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.AsciiToString || (e.AsciiToString = function () {
	k("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.stringToAscii || (e.stringToAscii = function () {
	k("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.UTF8ArrayToString || (e.UTF8ArrayToString = function () {
	k("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.UTF8ToString || (e.UTF8ToString = function () {
	k("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.stringToUTF8Array || (e.stringToUTF8Array = function () {
	k("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.stringToUTF8 || (e.stringToUTF8 = function () {
	k("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.lengthBytesUTF8 || (e.lengthBytesUTF8 = function () {
	k("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.UTF16ToString || (e.UTF16ToString = function () {
	k("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.stringToUTF16 || (e.stringToUTF16 = function () {
	k("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.lengthBytesUTF16 || (e.lengthBytesUTF16 = function () {
	k("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.UTF32ToString || (e.UTF32ToString = function () {
	k("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.stringToUTF32 || (e.stringToUTF32 = function () {
	k("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.lengthBytesUTF32 || (e.lengthBytesUTF32 = function () {
	k("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.allocateUTF8 || (e.allocateUTF8 = function () {
	k("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.stackTrace || (e.stackTrace = function () {
	k("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.addOnPreRun || (e.addOnPreRun = function () {
	k("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.addOnInit || (e.addOnInit = function () {
	k("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.addOnPreMain || (e.addOnPreMain = function () {
	k("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.addOnExit || (e.addOnExit = function () {
	k("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.addOnPostRun || (e.addOnPostRun = function () {
	k("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.writeStringToMemory || (e.writeStringToMemory = function () {
	k("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.writeArrayToMemory || (e.writeArrayToMemory = function () {
	k("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.writeAsciiToMemory || (e.writeAsciiToMemory = function () {
	k("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.addRunDependency || (e.addRunDependency = function () {
	k("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
e.removeRunDependency || (e.removeRunDependency = function () {
	k("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
e.ENV || (e.ENV = function () {
	k("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.FS || (e.FS = function () {
	k("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.FS_createFolder || (e.FS_createFolder = function () {
	k("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
e.FS_createPath || (e.FS_createPath = function () {
	k("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
e.FS_createDataFile || (e.FS_createDataFile = function () {
	k("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
e.FS_createPreloadedFile || (e.FS_createPreloadedFile = function () {
	k("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
e.FS_createLazyFile || (e.FS_createLazyFile = function () {
	k("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
e.FS_createLink || (e.FS_createLink = function () {
	k("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
e.FS_createDevice || (e.FS_createDevice = function () {
	k("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
e.FS_unlink || (e.FS_unlink = function () {
	k("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
});
e.GL || (e.GL = function () {
	k("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.staticAlloc || (e.staticAlloc = function () {
	k("'staticAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.dynamicAlloc || (e.dynamicAlloc = function () {
	k("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.warnOnce || (e.warnOnce = function () {
	k("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.loadDynamicLibrary || (e.loadDynamicLibrary = function () {
	k("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.loadWebAssemblyModule || (e.loadWebAssemblyModule = function () {
	k("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.getLEB || (e.getLEB = function () {
	k("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.getFunctionTables || (e.getFunctionTables = function () {
	k("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.alignFunctionTables || (e.alignFunctionTables = function () {
	k("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.registerFunctions || (e.registerFunctions = function () {
	k("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.addFunction || (e.addFunction = function () {
	k("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.removeFunction || (e.removeFunction = function () {
	k("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.getFuncWrapper || (e.getFuncWrapper = function () {
	k("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.prettyPrint || (e.prettyPrint = function () {
	k("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.makeBigInt || (e.makeBigInt = function () {
	k("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.dynCall || (e.dynCall = function () {
	k("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.getCompilerSetting || (e.getCompilerSetting = function () {
	k("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.stackSave || (e.stackSave = function () {
	k("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.stackRestore || (e.stackRestore = function () {
	k("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.stackAlloc || (e.stackAlloc = function () {
	k("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.establishStackSpace || (e.establishStackSpace = function () {
	k("'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.print || (e.print = function () {
	k("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.printErr || (e.printErr = function () {
	k("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
});
e.ALLOC_NORMAL || Object.defineProperty(e, "ALLOC_NORMAL", {
	get: function () {
		k("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
	}
});
e.ALLOC_STACK || Object.defineProperty(e, "ALLOC_STACK", {
	get: function () {
		k("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
	}
});
e.ALLOC_STATIC || Object.defineProperty(e, "ALLOC_STATIC", {
	get: function () {
		k("'ALLOC_STATIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
	}
});
e.ALLOC_DYNAMIC || Object.defineProperty(e, "ALLOC_DYNAMIC", {
	get: function () {
		k("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
	}
});
e.ALLOC_NONE || Object.defineProperty(e, "ALLOC_NONE", {
	get: function () {
		k("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
	}
});

function na(a) {
	this.name = "ExitStatus";
	this.message = "Program terminated with exit(" + a + ")";
	this.status = a
}
na.prototype = Error();
na.prototype.constructor = na;
pb = function Wf() {
	e.calledRun || Xf();
	e.calledRun || (pb = Wf)
};
e.callMain = function (a) {
	assert(0 == nb, "cannot call main when async dependencies remain! (listen on __ATMAIN__)");
	assert(0 == fb.length, "cannot call main when preRun functions remain to be called");
	a = a || [];
	kb();
	var b = a.length + 1,
		c = ra(4 * (b + 1));
	p[c >> 2] = Da(e.thisProgram);
	for (var d = 1; d < b; d++) p[(c >> 2) + d] = Da(a[d - 1]);
	p[(c >> 2) + b] = 0;
	try {
		var f = e._main(b, c, 0);
		Yf();
		if (!e.noExitRuntime || 0 !== f) {
			if (!e.noExitRuntime && (wa = !0, Wa = void 0, $a(), db(ib), t = !0, e.onExit)) e.onExit(f);
			e.quit(f, new na(f))
		}
	} catch (g) {
		g instanceof na ||
			("SimulateInfiniteLoop" == g ? e.noExitRuntime = !0 : ((a = g) && "object" === typeof g && g.stack && (a = [g, g.stack]), l("exception thrown: " + a), e.quit(1, g)))
	} finally {}
};

function Xf(a) {
	function b() {
		if (!e.calledRun && (e.calledRun = !0, !wa)) {
			kb();
			$a();
			db(hb);
			if (e.onRuntimeInitialized) e.onRuntimeInitialized();
			e._main && Zf && e.callMain(a);
			$a();
			if (e.postRun)
				for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length;) {
					var b = e.postRun.shift();
					jb.unshift(b)
				}
			db(jb)
		}
	}
	a = a || e.arguments;
	if (!(0 < nb)) {
		assert(0 == (Xa & 3));
		Na[(Xa >> 2) - 1] = 34821223;
		Na[(Xa >> 2) - 2] = 2310721022;
		if (e.preRun)
			for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length;) lb();
		db(fb);
		0 < nb || e.calledRun ||
			(e.setStatus ? (e.setStatus("Running..."), setTimeout(function () {
				setTimeout(function () {
					e.setStatus("")
				}, 1);
				b()
			}, 1)) : b(), $a())
	}
}
e.run = Xf;

function Yf() {
	var a = oa,
		b = l,
		c = !1;
	oa = l = function () {
		c = !0
	};
	try {
		var d = e._fflush;
		d && d(0);
		["stdout", "stderr"].forEach(function (a) {
			a = "/dev/" + a;
			try {
				var b = ec(a, {
					Vc: !0
				});
				a = b.path
			} catch (r) {}
			var d = {
				be: !1,
				exists: !1,
				error: 0,
				name: null,
				path: null,
				object: null,
				fe: !1,
				he: null,
				ge: null
			};
			try {
				b = ec(a, {
					parent: !0
				}), d.fe = !0, d.he = b.path, d.ge = b.node, d.name = Ib(a), b = ec(a, {
					Vc: !0
				}), d.exists = !0, d.path = b.path, d.object = b.node, d.name = b.node.name, d.be = "/" === b.path
			} catch (r) {
				d.error = r.Ec
			}
			d && (b = Mb[d.object.rdev]) && b.output && b.output.length &&
				(c = !0)
		})
	} catch (f) {}
	oa = a;
	l = b;
	c && ta("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.")
}
var $f = [];

function k(a) {
	if (e.onAbort) e.onAbort(a);
	void 0 !== a ? (oa(a), l(a), a = JSON.stringify(a)) : a = "";
	wa = !0;
	var b = "abort(" + a + ") at " + Ja() + "";
	$f && $f.forEach(function (c) {
		b = c(b, a)
	});
	throw b;
}
e.abort = k;
if (e.preInit)
	for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length;) e.preInit.pop()();
var Zf = !0;
e.noInitialRun && (Zf = !1);
e.noExitRuntime = !0;
Xf();