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
	da = !1,
	ea = !1,
	ia = !1;
ca = "object" === typeof window;
da = "function" === typeof importScripts;
ea = "object" === typeof process && "function" === typeof require && !ca && !da;
ia = !ca && !ea && !da;
if (e.ENVIRONMENT) throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
var ja = "";

function ka(a) {
	return e.locateFile ? e.locateFile(a, ja) : ja + a
}
if (ea) {
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
else if (ca || da) da ?
	ja = self.location.href : document.currentScript && (ja = document.currentScript.src), ja = 0 !== ja.indexOf("blob:") ? ja.substr(0, ja.lastIndexOf("/") + 1) : "", e.read = function (a) {
		var b = new XMLHttpRequest;
		b.open("GET", a, !1);
		b.send(null);
		return b.responseText
	}, da && (e.readBinary = function (a) {
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
						var q = a[b++] & 63;
						if (248 == (d & 252)) d = (d & 3) << 24 | f << 18 | g << 12 | h << 6 | q;
						else {
							var x = a[b++] & 63;
							d = (d & 1) << 30 | f << 24 | g << 18 | h << 12 | q << 6 | x
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
			var q = a.charCodeAt(++g);
			h = 65536 + ((h & 1023) << 10) | q & 1023
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

function Fa(a) {
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
					q = b(g, 0, 0, h);
				if (0 === p[h >> 2] && q) {
					var x = xa(q);
					break a
				}
			} catch (u) {} finally {
				g && Ia(g), h && Ia(h), q && Ia(q)
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
	return Fa(a)
}

function Ka(a, b) {
	0 < a % b && (a += b - a % b);
	return a
}
var buffer, Ea, n, La, Ma, p, Na, Oa, Pa;

function Ra() {
	e.HEAP8 = Ea = new Int8Array(buffer);
	e.HEAP16 = La = new Int16Array(buffer);
	e.HEAP32 = p = new Int32Array(buffer);
	e.HEAPU8 = n = new Uint8Array(buffer);
	e.HEAPU16 = Ma = new Uint16Array(buffer);
	e.HEAPU32 = Na = new Uint32Array(buffer);
	e.HEAPF32 = Oa = new Float32Array(buffer);
	e.HEAPF64 = Pa = new Float64Array(buffer)
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
			var c = b.zc;
			"number" === typeof c ? void 0 === b.Pc ? e.dynCall_v(c) : e.dynCall_vi(c, b.Pc) : c(void 0 === b.Pc ? null : b.Pc)
		}
	}
}
var eb = [],
	gb = [],
	hb = [],
	ib = [],
	jb = [],
	r = !1,
	t = !1;

function kb() {
	$a();
	r || (r = !0, db(gb))
}

function lb() {
	var a = e.preRun.shift();
	eb.unshift(a)
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
		} catch (w) {
			k(w)
		}
	}

	function b() {
		return e.wasmBinary || !ca && !da || "function" !== typeof fetch ? new Promise(function (b) {
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
			q = a.exports;
			if (q.memory) {
				a = q.memory;
				var b = e.buffer;
				a.byteLength < b.byteLength && l("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here");
				b = new Int8Array(b);
				(new Int8Array(a)).set(b);
				e.buffer = buffer = a;
				Ra()
			}
			e.asm = q;
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
		} catch (Ga) {
			return l("Module.instantiateWasm callback failed with error: " + Ga), !1
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
		q = null;
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
			} catch (ha) {
				console.error("Module.reallocBuffer: Attempted to grow from " + c + " bytes to " + a + " bytes, but got error: " + ha);
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
Ta = Sa + 41552;
gb.push({
	zc: function () {
		ub()
	}
}, {
	zc: function () {
		vb()
	}
}, {
	zc: function () {
		wb()
	}
}, {
	zc: function () {
		xb()
	}
}, {
	zc: function () {
		yb()
	}
}, {
	zc: function () {
		zb()
	}
}, {
	zc: function () {
		Ab()
	}
});
e.STATIC_BASE = Sa;
e.STATIC_BUMP = 41552;
var Bb = Ta;
Ta += 16;
assert(0 == Bb % 8);
var v = {
	Oc: 1,
	Cc: 2,
	ig: 3,
	df: 4,
	Uc: 5,
	zd: 6,
	xe: 7,
	Df: 8,
	Bc: 9,
	Le: 10,
	ud: 11,
	sg: 11,
	Td: 12,
	jd: 13,
	Xe: 14,
	Pf: 15,
	vd: 16,
	wd: 17,
	tg: 18,
	ld: 19,
	xd: 20,
	Vc: 21,
	qc: 22,
	yf: 23,
	Sd: 24,
	Hc: 25,
	pg: 26,
	Ye: 27,
	Lf: 28,
	Wc: 29,
	fg: 30,
	rf: 31,
	Zf: 32,
	Ue: 33,
	cg: 34,
	Hf: 42,
	af: 43,
	Me: 44,
	gf: 45,
	hf: 46,
	jf: 47,
	qf: 48,
	qg: 49,
	Bf: 50,
	ff: 51,
	Re: 35,
	Ef: 37,
	De: 52,
	Ge: 53,
	ug: 54,
	zf: 55,
	He: 56,
	Ie: 57,
	Se: 35,
	Je: 59,
	Nf: 60,
	Cf: 61,
	mg: 62,
	Mf: 63,
	If: 64,
	Jf: 65,
	eg: 66,
	Ff: 67,
	Ae: 68,
	jg: 69,
	Ne: 70,
	$f: 71,
	tf: 72,
	Ve: 73,
	Fe: 74,
	Uf: 76,
	Ee: 77,
	dg: 78,
	kf: 79,
	lf: 80,
	pf: 81,
	nf: 82,
	mf: 83,
	Of: 38,
	yd: 39,
	uf: 36,
	kd: 40,
	Vf: 95,
	Yf: 96,
	Qe: 104,
	Af: 105,
	Be: 97,
	bg: 91,
	Sf: 88,
	Kf: 92,
	gg: 108,
	Pe: 111,
	ye: 98,
	Oe: 103,
	xf: 101,
	vf: 100,
	ng: 110,
	Ze: 112,
	$e: 113,
	cf: 115,
	Ce: 114,
	Te: 89,
	sf: 90,
	ag: 93,
	hg: 94,
	ze: 99,
	wf: 102,
	ef: 106,
	Qf: 107,
	og: 109,
	rg: 87,
	We: 122,
	kg: 116,
	Tf: 95,
	Gf: 123,
	bf: 84,
	Wf: 75,
	Ke: 125,
	Rf: 131,
	Xf: 130,
	lg: 86
};

function Cb(a) {
	e.___errno_location ? p[e.___errno_location() >> 2] = a : l("failed to set errno from JS");
	return a
}
var Db = {
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

function Eb(a, b) {
	for (var c = 0, d = a.length - 1; 0 <= d; d--) {
		var f = a[d];
		"." === f ? a.splice(d, 1) : ".." === f ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--)
	}
	if (b)
		for (; c; c--) a.unshift("..");
	return a
}

function Fb(a) {
	var b = "/" === a.charAt(0),
		c = "/" === a.substr(-1);
	(a = Eb(a.split("/").filter(function (a) {
		return !!a
	}), !b).join("/")) || b || (a = ".");
	a && c && (a += "/");
	return (b ? "/" : "") + a
}

function Gb(a) {
	var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
	a = b[0];
	b = b[1];
	if (!a && !b) return ".";
	b && (b = b.substr(0, b.length - 1));
	return a + b
}

function Hb(a) {
	if ("/" === a) return "/";
	var b = a.lastIndexOf("/");
	return -1 === b ? a : a.substr(b + 1)
}

function Ib() {
	var a = Array.prototype.slice.call(arguments, 0);
	return Fb(a.join("/"))
}

function Jb(a, b) {
	return Fb(a + "/" + b)
}

function Kb() {
	for (var a = "", b = !1, c = arguments.length - 1; - 1 <= c && !b; c--) {
		b = 0 <= c ? arguments[c] : "/";
		if ("string" !== typeof b) throw new TypeError("Arguments to path.resolve must be strings");
		if (!b) return "";
		a = b + "/" + a;
		b = "/" === b.charAt(0)
	}
	a = Eb(a.split("/").filter(function (a) {
		return !!a
	}), !b).join("/");
	return (b ? "/" : "") + a || "."
}
var Lb = [];

function Mb(a, b) {
	Lb[a] = {
		input: [],
		output: [],
		Jc: b
	};
	Nb(a, Ob)
}
var Ob = {
		open: function (a) {
			var b = Lb[a.node.rdev];
			if (!b) throw new z(v.ld);
			a.tty = b;
			a.seekable = !1
		},
		close: function (a) {
			a.tty.Jc.flush(a.tty)
		},
		flush: function (a) {
			a.tty.Jc.flush(a.tty)
		},
		read: function (a, b, c, d) {
			if (!a.tty || !a.tty.Jc.Hd) throw new z(v.zd);
			for (var f = 0, g = 0; g < d; g++) {
				try {
					var h = a.tty.Jc.Hd(a.tty)
				} catch (q) {
					throw new z(v.Uc);
				}
				if (void 0 === h && 0 === f) throw new z(v.ud);
				if (null === h || void 0 === h) break;
				f++;
				b[c + g] = h
			}
			f && (a.node.timestamp = Date.now());
			return f
		},
		write: function (a, b, c, d) {
			if (!a.tty || !a.tty.Jc.rd) throw new z(v.zd);
			var f = 0;
			try {
				if (0 === c && 0 === d) a.tty.Jc.flush(a.tty);
				else
					for (; f < d;) a.tty.Jc.rd(a.tty, b[c + f]), f++
			} catch (g) {
				throw new z(v.Uc);
			}
			d && (a.node.timestamp = Date.now());
			return f
		}
	},
	Qb = {
		Hd: function (a) {
			if (!a.input.length) {
				var b = null;
				if (ea) {
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
				a.input = Pb(b, !0)
			}
			return a.input.shift()
		},
		rd: function (a, b) {
			null === b || 10 === b ? (oa(ya(a.output, 0)), a.output = []) : 0 != b && a.output.push(b)
		},
		flush: function (a) {
			a.output && 0 < a.output.length && (oa(ya(a.output, 0)), a.output = [])
		}
	},
	Rb = {
		rd: function (a, b) {
			null === b || 10 === b ? (l(ya(a.output, 0)), a.output = []) : 0 != b && a.output.push(b)
		},
		flush: function (a) {
			a.output && 0 < a.output.length && (l(ya(a.output, 0)), a.output = [])
		}
	},
	B = {
		wc: null,
		tc: function () {
			return B.createNode(null, "/", 16895, 0)
		},
		createNode: function (a, b, c, d) {
			if (24576 === (c & 61440) || 4096 === (c & 61440)) throw new z(v.Oc);
			B.wc || (B.wc = {
				dir: {
					node: {
						Ac: B.oc.Ac,
						vc: B.oc.vc,
						lookup: B.oc.lookup,
						Rc: B.oc.Rc,
						rename: B.oc.rename,
						unlink: B.oc.unlink,
						rmdir: B.oc.rmdir,
						readdir: B.oc.readdir,
						symlink: B.oc.symlink
					},
					stream: {
						Ec: B.nc.Ec
					}
				},
				file: {
					node: {
						Ac: B.oc.Ac,
						vc: B.oc.vc
					},
					stream: {
						Ec: B.nc.Ec,
						read: B.nc.read,
						write: B.nc.write,
						Ad: B.nc.Ad,
						Kd: B.nc.Kd,
						bd: B.nc.bd
					}
				},
				link: {
					node: {
						Ac: B.oc.Ac,
						vc: B.oc.vc,
						readlink: B.oc.readlink
					},
					stream: {}
				},
				Cd: {
					node: {
						Ac: B.oc.Ac,
						vc: B.oc.vc
					},
					stream: Sb
				}
			});
			c = Tb(a, b, c, d);
			16384 === (c.mode & 61440) ? (c.oc = B.wc.dir.node, c.nc = B.wc.dir.stream, c.mc = {}) : 32768 === (c.mode & 61440) ? (c.oc = B.wc.file.node, c.nc = B.wc.file.stream, c.pc = 0, c.mc = null) : 40960 === (c.mode & 61440) ? (c.oc = B.wc.link.node, c.nc = B.wc.link.stream) : 8192 === (c.mode & 61440) && (c.oc = B.wc.Cd.node, c.nc = B.wc.Cd.stream);
			c.timestamp = Date.now();
			a && (a.mc[b] = c);
			return c
		},
		ae: function (a) {
			if (a.mc &&
				a.mc.subarray) {
				for (var b = [], c = 0; c < a.pc; ++c) b.push(a.mc[c]);
				return b
			}
			return a.mc
		},
		Ag: function (a) {
			return a.mc ? a.mc.subarray ? a.mc.subarray(0, a.pc) : new Uint8Array(a.mc) : new Uint8Array
		},
		Dd: function (a, b) {
			a.mc && a.mc.subarray && b > a.mc.length && (a.mc = B.ae(a), a.pc = a.mc.length);
			if (!a.mc || a.mc.subarray) {
				var c = a.mc ? a.mc.length : 0;
				c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) | 0), 0 != c && (b = Math.max(b, 256)), c = a.mc, a.mc = new Uint8Array(b), 0 < a.pc && a.mc.set(c.subarray(0, a.pc), 0))
			} else
				for (!a.mc && 0 < b && (a.mc = []); a.mc.length < b;) a.mc.push(0)
		},
		oe: function (a, b) {
			if (a.pc != b)
				if (0 == b) a.mc = null, a.pc = 0;
				else {
					if (!a.mc || a.mc.subarray) {
						var c = a.mc;
						a.mc = new Uint8Array(new ArrayBuffer(b));
						c && a.mc.set(c.subarray(0, Math.min(b, a.pc)))
					} else if (a.mc || (a.mc = []), a.mc.length > b) a.mc.length = b;
					else
						for (; a.mc.length < b;) a.mc.push(0);
					a.pc = b
				}
		},
		oc: {
			Ac: function (a) {
				var b = {};
				b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
				b.ino = a.id;
				b.mode = a.mode;
				b.nlink = 1;
				b.uid = 0;
				b.gid = 0;
				b.rdev = a.rdev;
				16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.pc : 40960 === (a.mode & 61440) ? b.size =
					a.link.length : b.size = 0;
				b.atime = new Date(a.timestamp);
				b.mtime = new Date(a.timestamp);
				b.ctime = new Date(a.timestamp);
				b.Ic = 4096;
				b.blocks = Math.ceil(b.size / b.Ic);
				return b
			},
			vc: function (a, b) {
				void 0 !== b.mode && (a.mode = b.mode);
				void 0 !== b.timestamp && (a.timestamp = b.timestamp);
				void 0 !== b.size && B.oe(a, b.size)
			},
			lookup: function () {
				throw Ub[v.Cc];
			},
			Rc: function (a, b, c, d) {
				return B.createNode(a, b, c, d)
			},
			rename: function (a, b, c) {
				if (16384 === (a.mode & 61440)) {
					try {
						var d = Vb(b, c)
					} catch (g) {}
					if (d)
						for (var f in d.mc) throw new z(v.yd);
				}
				delete a.parent.mc[a.name];
				a.name = c;
				b.mc[c] = a;
				a.parent = b
			},
			unlink: function (a, b) {
				delete a.mc[b]
			},
			rmdir: function (a, b) {
				var c = Vb(a, b),
					d;
				for (d in c.mc) throw new z(v.yd);
				delete a.mc[b]
			},
			readdir: function (a) {
				var b = [".", ".."],
					c;
				for (c in a.mc) a.mc.hasOwnProperty(c) && b.push(c);
				return b
			},
			symlink: function (a, b, c) {
				a = B.createNode(a, b, 41471, 0);
				a.link = c;
				return a
			},
			readlink: function (a) {
				if (40960 !== (a.mode & 61440)) throw new z(v.qc);
				return a.link
			}
		},
		nc: {
			read: function (a, b, c, d, f) {
				var g = a.node.mc;
				if (f >= a.node.pc) return 0;
				a =
					Math.min(a.node.pc - f, d);
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
				if (b.subarray && (!a.mc || a.mc.subarray)) {
					if (g) return assert(0 === f, "canOwn must imply no weird position inside the file"), a.mc = b.subarray(c, c + d), a.pc = d;
					if (0 === a.pc && 0 ===
						f) return a.mc = new Uint8Array(b.subarray(c, c + d)), a.pc = d;
					if (f + d <= a.pc) return a.mc.set(b.subarray(c, c + d), f), d
				}
				B.Dd(a, f + d);
				if (a.mc.subarray && b.subarray) a.mc.set(b.subarray(c, c + d), f);
				else
					for (g = 0; g < d; g++) a.mc[f + g] = b[c + g];
				a.pc = Math.max(a.pc, f + d);
				return d
			},
			Ec: function (a, b, c) {
				1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.pc);
				if (0 > b) throw new z(v.qc);
				return b
			},
			Ad: function (a, b, c) {
				B.Dd(a.node, b + c);
				a.node.pc = Math.max(a.node.pc, b + c)
			},
			Kd: function (a, b, c, d, f, g, h) {
				if (32768 !== (a.node.mode & 61440)) throw new z(v.ld);
				c = a.node.mc;
				if (h & 2 || c.buffer !== b && c.buffer !== b.buffer) {
					if (0 < f || f + d < a.node.pc) c.subarray ? c = c.subarray(f, f + d) : c = Array.prototype.slice.call(c, f, f + d);
					a = !0;
					d = Ha(d);
					if (!d) throw new z(v.Td);
					b.set(c, d)
				} else a = !1, d = c.byteOffset;
				return {
					cd: d,
					Ud: a
				}
			},
			bd: function (a, b, c, d, f) {
				if (32768 !== (a.node.mode & 61440)) throw new z(v.ld);
				if (f & 2) return 0;
				B.nc.write(a, b, 0, d, c, !1);
				return 0
			}
		}
	},
	C = {
		$c: !1,
		qe: function () {
			C.$c = !!process.platform.match(/^win/);
			var a = process.binding("constants");
			a.fs && (a = a.fs);
			C.Ed = {
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
		Bd: function (a) {
			return Buffer.sc ? Buffer.from(a) : new Buffer(a)
		},
		tc: function (a) {
			assert(ea);
			return C.createNode(null, "/", C.Gd(a.qd.root), 0)
		},
		createNode: function (a, b, c) {
			if (16384 !== (c & 61440) && 32768 !== (c & 61440) && 40960 !== (c & 61440)) throw new z(v.qc);
			a = Tb(a, b, c);
			a.oc = C.oc;
			a.nc = C.nc;
			return a
		},
		Gd: function (a) {
			try {
				var b = fs.lstatSync(a);
				C.$c && (b.mode = b.mode | (b.mode & 292) >> 2)
			} catch (c) {
				if (!c.code) throw c;
				throw new z(v[c.code]);
			}
			return b.mode
		},
		uc: function (a) {
			for (var b = []; a.parent !== a;) b.push(a.name), a = a.parent;
			b.push(a.tc.qd.root);
			b.reverse();
			return Ib.apply(null, b)
		},
		$d: function (a) {
			a &= -2656257;
			var b = 0,
				c;
			for (c in C.Ed) a & c && (b |= C.Ed[c], a ^= c);
			if (a) throw new z(v.qc);
			return b
		},
		oc: {
			Ac: function (a) {
				a = C.uc(a);
				try {
					var b = fs.lstatSync(a)
				} catch (c) {
					if (!c.code) throw c;
					throw new z(v[c.code]);
				}
				C.$c && !b.Ic && (b.Ic = 4096);
				C.$c && !b.blocks && (b.blocks = (b.size + b.Ic - 1) / b.Ic | 0);
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
					Ic: b.Ic,
					blocks: b.blocks
				}
			},
			vc: function (a, b) {
				var c = C.uc(a);
				try {
					void 0 !== b.mode && (fs.chmodSync(c, b.mode), a.mode = b.mode), void 0 !== b.size && fs.truncateSync(c, b.size)
				} catch (d) {
					if (!d.code) throw d;
					throw new z(v[d.code]);
				}
			},
			lookup: function (a, b) {
				var c = Jb(C.uc(a), b);
				c = C.Gd(c);
				return C.createNode(a, b, c)
			},
			Rc: function (a, b, c, d) {
				a = C.createNode(a, b, c, d);
				b = C.uc(a);
				try {
					16384 === (a.mode & 61440) ? fs.mkdirSync(b, a.mode) : fs.writeFileSync(b, "", {
						mode: a.mode
					})
				} catch (f) {
					if (!f.code) throw f;
					throw new z(v[f.code]);
				}
				return a
			},
			rename: function (a, b, c) {
				a = C.uc(a);
				b = Jb(C.uc(b), c);
				try {
					fs.renameSync(a, b)
				} catch (d) {
					if (!d.code) throw d;
					throw new z(v[d.code]);
				}
			},
			unlink: function (a, b) {
				a = Jb(C.uc(a), b);
				try {
					fs.unlinkSync(a)
				} catch (c) {
					if (!c.code) throw c;
					throw new z(v[c.code]);
				}
			},
			rmdir: function (a, b) {
				a = Jb(C.uc(a), b);
				try {
					fs.rmdirSync(a)
				} catch (c) {
					if (!c.code) throw c;
					throw new z(v[c.code]);
				}
			},
			readdir: function (a) {
				a = C.uc(a);
				try {
					return fs.readdirSync(a)
				} catch (b) {
					if (!b.code) throw b;
					throw new z(v[b.code]);
				}
			},
			symlink: function (a,
				b, c) {
				a = Jb(C.uc(a), b);
				try {
					fs.symlinkSync(c, a)
				} catch (d) {
					if (!d.code) throw d;
					throw new z(v[d.code]);
				}
			},
			readlink: function (a) {
				var b = C.uc(a);
				try {
					return b = fs.readlinkSync(b), b = Wb.relative(Wb.resolve(a.tc.qd.root), b)
				} catch (c) {
					if (!c.code) throw c;
					throw new z(v[c.code]);
				}
			}
		},
		nc: {
			open: function (a) {
				var b = C.uc(a.node);
				try {
					32768 === (a.node.mode & 61440) && (a.Sc = fs.openSync(b, C.$d(a.flags)))
				} catch (c) {
					if (!c.code) throw c;
					throw new z(v[c.code]);
				}
			},
			close: function (a) {
				try {
					32768 === (a.node.mode & 61440) && a.Sc && fs.closeSync(a.Sc)
				} catch (b) {
					if (!b.code) throw b;
					throw new z(v[b.code]);
				}
			},
			read: function (a, b, c, d, f) {
				if (0 === d) return 0;
				try {
					return fs.readSync(a.Sc, C.Bd(b.buffer), c, d, f)
				} catch (g) {
					throw new z(v[g.code]);
				}
			},
			write: function (a, b, c, d, f) {
				try {
					return fs.writeSync(a.Sc, C.Bd(b.buffer), c, d, f)
				} catch (g) {
					throw new z(v[g.code]);
				}
			},
			Ec: function (a, b, c) {
				if (1 === c) b += a.position;
				else if (2 === c && 32768 === (a.node.mode & 61440)) try {
					b += fs.fstatSync(a.Sc).size
				} catch (d) {
					throw new z(v[d.code]);
				}
				if (0 > b) throw new z(v.qc);
				return b
			}
		}
	};
Ta += 16;
Ta += 16;
Ta += 16;
var Xb = null,
	Yb = {},
	Zb = [],
	$b = 1,
	ac = null,
	bc = !0,
	cc = {},
	z = null,
	Ub = {};

function dc(a, b) {
	a = Kb("/", a);
	b = b || {};
	if (!a) return {
		path: "",
		node: null
	};
	var c = {
			Fd: !0,
			sd: 0
		},
		d;
	for (d in c) void 0 === b[d] && (b[d] = c[d]);
	if (8 < b.sd) throw new z(v.kd);
	a = Eb(a.split("/").filter(function (a) {
		return !!a
	}), !1);
	var f = Xb;
	c = "/";
	for (d = 0; d < a.length; d++) {
		var g = d === a.length - 1;
		if (g && b.parent) break;
		f = Vb(f, a[d]);
		c = Jb(c, a[d]);
		f.ad && (!g || g && b.Fd) && (f = f.ad.root);
		if (!g || b.Zc)
			for (g = 0; 40960 === (f.mode & 61440);)
				if (f = ec(c), c = Kb(Gb(c), f), f = dc(c, {
						sd: b.sd
					}).node, 40 < g++) throw new z(v.kd);
	}
	return {
		path: c,
		node: f
	}
}

function fc(a) {
	for (var b;;) {
		if (a === a.parent) return a = a.tc.Ld, b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
		b = b ? a.name + "/" + b : a.name;
		a = a.parent
	}
}

function hc(a, b) {
	for (var c = 0, d = 0; d < b.length; d++) c = (c << 5) - c + b.charCodeAt(d) | 0;
	return (a + c >>> 0) % ac.length
}

function ic(a) {
	var b = hc(a.parent.id, a.name);
	a.he = ac[b];
	ac[b] = a
}

function Vb(a, b) {
	var c;
	if (c = (c = jc(a, "x")) ? c : a.oc.lookup ? 0 : v.jd) throw new z(c, a);
	for (c = ac[hc(a.id, b)]; c; c = c.he) {
		var d = c.name;
		if (c.parent.id === a.id && d === b) return c
	}
	return a.oc.lookup(a, b)
}

function Tb(a, b, c, d) {
	kc || (kc = function (a, b, c, d) {
		a || (a = this);
		this.parent = a;
		this.tc = a.tc;
		this.ad = null;
		this.id = $b++;
		this.name = b;
		this.mode = c;
		this.oc = {};
		this.nc = {};
		this.rdev = d
	}, kc.prototype = {}, Object.defineProperties(kc.prototype, {
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
	a = new kc(a, b, c, d);
	ic(a);
	return a
}
var lc = {
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

function mc(a) {
	var b = ["r", "w", "rw"][a & 3];
	a & 512 && (b += "w");
	return b
}

function jc(a, b) {
	if (bc) return 0;
	if (-1 === b.indexOf("r") || a.mode & 292) {
		if (-1 !== b.indexOf("w") && !(a.mode & 146) || -1 !== b.indexOf("x") && !(a.mode & 73)) return v.jd
	} else return v.jd;
	return 0
}

function nc(a, b) {
	try {
		return Vb(a, b), v.wd
	} catch (c) {}
	return jc(a, "wx")
}

function oc(a) {
	var b = 4096;
	for (a = a || 0; a <= b; a++)
		if (!Zb[a]) return a;
	throw new z(v.Sd);
}

function pc(a, b) {
	qc || (qc = function () {}, qc.prototype = {}, Object.defineProperties(qc.prototype, {
		object: {
			get: function () {
				return this.node
			},
			set: function (a) {
				this.node = a
			}
		}
	}));
	var c = new qc,
		d;
	for (d in a) c[d] = a[d];
	a = c;
	b = oc(b);
	a.fd = b;
	return Zb[b] = a
}
var Sb = {
	open: function (a) {
		a.nc = Yb[a.node.rdev].nc;
		a.nc.open && a.nc.open(a)
	},
	Ec: function () {
		throw new z(v.Wc);
	}
};

function Nb(a, b) {
	Yb[a] = {
		nc: b
	}
}

function rc(a, b) {
	var c = "/" === b,
		d = !b;
	if (c && Xb) throw new z(v.vd);
	if (!c && !d) {
		var f = dc(b, {
			Fd: !1
		});
		b = f.path;
		f = f.node;
		if (f.ad) throw new z(v.vd);
		if (16384 !== (f.mode & 61440)) throw new z(v.xd);
	}
	b = {
		type: a,
		qd: {},
		Ld: b,
		ge: []
	};
	a = a.tc(b);
	a.tc = b;
	b.root = a;
	c ? Xb = a : f && (f.ad = b, f.tc && f.tc.ge.push(b))
}

function sc(a, b, c) {
	var d = dc(a, {
		parent: !0
	}).node;
	a = Hb(a);
	if (!a || "." === a || ".." === a) throw new z(v.qc);
	var f = nc(d, a);
	if (f) throw new z(f);
	if (!d.oc.Rc) throw new z(v.Oc);
	return d.oc.Rc(d, a, b, c)
}

function tc(a) {
	sc(a, 16895, 0)
}

function uc(a, b, c) {
	"undefined" === typeof c && (c = b, b = 438);
	sc(a, b | 8192, c)
}

function vc(a, b) {
	if (!Kb(a)) throw new z(v.Cc);
	var c = dc(b, {
		parent: !0
	}).node;
	if (!c) throw new z(v.Cc);
	b = Hb(b);
	var d = nc(c, b);
	if (d) throw new z(d);
	if (!c.oc.symlink) throw new z(v.Oc);
	c.oc.symlink(c, b, a)
}

function ec(a) {
	a = dc(a).node;
	if (!a) throw new z(v.Cc);
	if (!a.oc.readlink) throw new z(v.qc);
	return Kb(fc(a.parent), a.oc.readlink(a))
}

function wc(a, b, c, d) {
	if ("" === a) throw new z(v.Cc);
	if ("string" === typeof b) {
		var f = lc[b];
		if ("undefined" === typeof f) throw Error("Unknown file open mode: " + b);
		b = f
	}
	c = b & 64 ? ("undefined" === typeof c ? 438 : c) & 4095 | 32768 : 0;
	if ("object" === typeof a) var g = a;
	else {
		a = Fb(a);
		try {
			g = dc(a, {
				Zc: !(b & 131072)
			}).node
		} catch (q) {}
	}
	f = !1;
	if (b & 64)
		if (g) {
			if (b & 128) throw new z(v.wd);
		} else g = sc(a, c, 0), f = !0;
	if (!g) throw new z(v.Cc);
	8192 === (g.mode & 61440) && (b &= -513);
	if (b & 65536 && 16384 !== (g.mode & 61440)) throw new z(v.xd);
	if (!f && (c = g ? 40960 === (g.mode &
			61440) ? v.kd : 16384 === (g.mode & 61440) && ("r" !== mc(b) || b & 512) ? v.Vc : jc(g, mc(b)) : v.Cc)) throw new z(c);
	if (b & 512) {
		c = g;
		var h;
		"string" === typeof c ? h = dc(c, {
			Zc: !0
		}).node : h = c;
		if (!h.oc.vc) throw new z(v.Oc);
		if (16384 === (h.mode & 61440)) throw new z(v.Vc);
		if (32768 !== (h.mode & 61440)) throw new z(v.qc);
		if (c = jc(h, "w")) throw new z(c);
		h.oc.vc(h, {
			size: 0,
			timestamp: Date.now()
		})
	}
	b &= -641;
	d = pc({
		node: g,
		path: fc(g),
		flags: b,
		seekable: !0,
		position: 0,
		nc: g.nc,
		ve: [],
		error: !1
	}, d);
	d.nc.open && d.nc.open(d);
	!e.logReadFiles || b & 1 || (xc || (xc = {}), a in
		xc || (xc[a] = 1, console.log("FS.trackingDelegate error on read file: " + a)));
	try {
		cc.onOpenFile && (g = 0, 1 !== (b & 2097155) && (g |= 1), 0 !== (b & 2097155) && (g |= 2), cc.onOpenFile(a, g))
	} catch (q) {
		console.log("FS.trackingDelegate['onOpenFile']('" + a + "', flags) threw an exception: " + q.message)
	}
	return d
}

function yc(a) {
	if (null === a.fd) throw new z(v.Bc);
	a.od && (a.od = null);
	try {
		a.nc.close && a.nc.close(a)
	} catch (b) {
		throw b;
	} finally {
		Zb[a.fd] = null
	}
	a.fd = null
}

function zc(a, b, c) {
	if (null === a.fd) throw new z(v.Bc);
	if (!a.seekable || !a.nc.Ec) throw new z(v.Wc);
	a.position = a.nc.Ec(a, b, c);
	a.ve = []
}

function Ac() {
	z || (z = function (a, b) {
		this.node = b;
		this.pe = function (a) {
			this.yc = a;
			for (var b in v)
				if (v[b] === a) {
					this.code = b;
					break
				}
		};
		this.pe(a);
		this.message = Db[a];
		this.stack && Object.defineProperty(this, "stack", {
			value: Error().stack,
			writable: !0
		});
		this.stack && (this.stack = Fa(this.stack))
	}, z.prototype = Error(), z.prototype.constructor = z, [v.Cc].forEach(function (a) {
		Ub[a] = new z(a);
		Ub[a].stack = "<generic error, no stack>"
	}))
}
var Bc;

function Cc(a, b) {
	var c = 0;
	a && (c |= 365);
	b && (c |= 146);
	return c
}

function Dc(a, b, c) {
	a = Jb("/dev", a);
	var d = Cc(!!b, !!c);
	Ec || (Ec = 64);
	var f = Ec++ << 8 | 0;
	Nb(f, {
		open: function (a) {
			a.seekable = !1
		},
		close: function () {
			c && c.buffer && c.buffer.length && c(10)
		},
		read: function (a, c, d, f) {
			for (var g = 0, h = 0; h < f; h++) {
				try {
					var q = b()
				} catch (fa) {
					throw new z(v.Uc);
				}
				if (void 0 === q && 0 === g) throw new z(v.ud);
				if (null === q || void 0 === q) break;
				g++;
				c[d + h] = q
			}
			g && (a.node.timestamp = Date.now());
			return g
		},
		write: function (a, b, d, f) {
			for (var g = 0; g < f; g++) try {
				c(b[d + g])
			} catch (w) {
				throw new z(v.Uc);
			}
			f && (a.node.timestamp = Date.now());
			return g
		}
	});
	uc(a, d, f)
}
var Ec, FS = {},
	kc, qc, xc, Fc = {},
	Gc = 0;

function D() {
	Gc += 4;
	return p[Gc - 4 >> 2]
}

function Hc() {
	var a = Zb[D()];
	if (!a) throw new z(v.Bc);
	return a
}

function Ic(a) {
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
var Jc = void 0;

function Kc(a) {
	for (var b = ""; n[a];) b += Jc[n[a++]];
	return b
}
var Lc = {},
	Mc = {},
	Nc = {};

function Oc(a) {
	if (void 0 === a) return "_unknown";
	a = a.replace(/[^a-zA-Z0-9_]/g, "$");
	var b = a.charCodeAt(0);
	return 48 <= b && 57 >= b ? "_" + a : a
}

function Pc(a, b) {
	a = Oc(a);
	return (new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'))(b)
}

function Qc(a) {
	var b = Error,
		c = Pc(a, function (b) {
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
var Rc = void 0;

function Sc(a) {
	throw new Rc(a);
}
var Tc = void 0;

function Uc(a, b) {
	var c = [];

	function d(a) {
		a = b(a);
		if (a.length !== c.length) throw new Tc("Mismatched type converter count");
		for (var d = 0; d < c.length; ++d) Vc(c[d], a[d])
	}
	c.forEach(function (b) {
		Nc[b] = a
	});
	var f = Array(a.length),
		g = [],
		h = 0;
	a.forEach(function (a, b) {
		Mc.hasOwnProperty(a) ? f[b] = Mc[a] : (g.push(a), Lc.hasOwnProperty(a) || (Lc[a] = []), Lc[a].push(function () {
			f[b] = Mc[a];
			++h;
			h === g.length && d(f)
		}))
	});
	0 === g.length && d(f)
}

function Vc(a, b, c) {
	c = c || {};
	if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
	var d = b.name;
	a || Sc('type "' + d + '" must have a positive integer typeid pointer');
	if (Mc.hasOwnProperty(a)) {
		if (c.ce) return;
		Sc("Cannot register type '" + d + "' twice")
	}
	Mc[a] = b;
	delete Nc[a];
	Lc.hasOwnProperty(a) && (b = Lc[a], delete Lc[a], b.forEach(function (a) {
		a()
	}))
}
var Wc = [],
	Xc = [{}, {
		value: void 0
	}, {
		value: null
	}, {
		value: !0
	}, {
		value: !1
	}];

function Yc(a) {
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
			var b = Wc.length ? Wc.pop() : Xc.length;
			Xc[b] = {
				ne: 1,
				value: a
			};
			return b
	}
}

function Zc(a) {
	return this.fromWireType(Na[a >> 2])
}

function $c(a) {
	if (null === a) return "null";
	var b = typeof a;
	return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a
}

function ad(a, b) {
	switch (b) {
		case 2:
			return function (a) {
				return this.fromWireType(Oa[a >> 2])
			};
		case 3:
			return function (a) {
				return this.fromWireType(Pa[a >> 3])
			};
		default:
			throw new TypeError("Unknown float type: " + a);
	}
}

function bd(a) {
	var b = Function;
	if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
	var c = Pc(b.name || "unknownFunctionName", function () {});
	c.prototype = b.prototype;
	c = new c;
	a = b.apply(c, a);
	return a instanceof Object ? a : c
}

function cd(a) {
	for (; a.length;) {
		var b = a.pop();
		a.pop()(b)
	}
}

function dd(a, b) {
	var c = e;
	if (void 0 === c[a].xc) {
		var d = c[a];
		c[a] = function () {
			c[a].xc.hasOwnProperty(arguments.length) || Sc("Function '" + b + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c[a].xc + ")!");
			return c[a].xc[arguments.length].apply(this, arguments)
		};
		c[a].xc = [];
		c[a].xc[d.Vd] = d
	}
}

function ed(a, b, c) {
	e.hasOwnProperty(a) ? ((void 0 === c || void 0 !== e[a].xc && void 0 !== e[a].xc[c]) && Sc("Cannot register public name '" + a + "' twice"), dd(a, a), e.hasOwnProperty(c) && Sc("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), e[a].xc[c] = b) : (e[a] = b, void 0 !== c && (e[a].Hg = c))
}

function fd(a, b) {
	for (var c = [], d = 0; d < a; d++) c.push(p[(b >> 2) + d]);
	return c
}

function gd(a, b) {
	a = Kc(a);
	if (void 0 !== e["FUNCTION_TABLE_" + a]) var c = e["FUNCTION_TABLE_" + a][b];
	else if ("undefined" !== typeof FUNCTION_TABLE) c = FUNCTION_TABLE[b];
	else {
		c = e["dynCall_" + a];
		void 0 === c && (c = e["dynCall_" + a.replace(/f/g, "d")], void 0 === c && Sc("No dynCall invoker for signature: " + a));
		for (var d = [], f = 1; f < a.length; ++f) d.push("a" + f);
		f = "return function " + ("dynCall_" + a + "_" + b) + "(" + d.join(", ") + ") {\n";
		f += "    return dynCall(rawFunction" + (d.length ? ", " : "") + d.join(", ") + ");\n";
		c = (new Function("dynCall", "rawFunction",
			f + "};\n"))(c, b)
	}
	"function" !== typeof c && Sc("unknown function pointer with signature " + a + ": " + b);
	return c
}
var hd = void 0;

function id(a) {
	a = jd(a);
	var b = Kc(a);
	Ia(a);
	return b
}

function kd(a, b) {
	function c(a) {
		f[a] || Mc[a] || (Nc[a] ? Nc[a].forEach(c) : (d.push(a), f[a] = !0))
	}
	var d = [],
		f = {};
	b.forEach(c);
	throw new hd(a + ": " + d.map(id).join([", "]));
}

function ld(a, b, c) {
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

function md(a, b) {
	nd = a;
	od = b;
	if (!pd) console.error("emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.");
	else if (0 == a) qd = function () {
		var a = Math.max(0, rd + b - sd()) | 0;
		setTimeout(td, a)
	}, ud = "timeout";
	else if (1 == a) qd = function () {
		vd(td)
	}, ud = "rAF";
	else if (2 == a) {
		if ("undefined" === typeof setImmediate) {
			var c = [];
			addEventListener("message", function (a) {
				if ("setimmediate" === a.data || "setimmediate" === a.data.target) a.stopPropagation(),
					c.shift()()
			}, !0);
			setImmediate = function (a) {
				c.push(a);
				da ? (void 0 === e.setImmediates && (e.setImmediates = []), e.setImmediates.push(a), postMessage({
					target: "setimmediate"
				})) : postMessage("setimmediate", "*")
			}
		}
		qd = function () {
			setImmediate(td)
		};
		ud = "immediate"
	}
}

function sd() {
	k()
}

function wd(a, b, c, d, f) {
	e.noExitRuntime = !0;
	assert(!pd, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
	pd = a;
	xd = d;
	var g = "undefined" !== typeof d ? function () {
		e.dynCall_vi(a, d)
	} : function () {
		e.dynCall_v(a)
	};
	var h = yd;
	td = function () {
		if (!wa)
			if (0 < zd.length) {
				var a = Date.now(),
					b = zd.shift();
				b.zc(b.Pc);
				if (Ad) {
					var c = Ad,
						d = 0 == c % 1 ? c - 1 : Math.floor(c);
					Ad = b.xg ? d : (8 * c + (d + .5)) / 9
				}
				console.log('main loop blocker "' +
					b.name + '" took ' + (Date.now() - a) + " ms");
				e.setStatus && (a = e.statusMessage || "Please wait...", b = Ad, c = Bd.zg, b ? b < c ? e.setStatus(a + " (" + (c - b) + "/" + c + ")") : e.setStatus(a) : e.setStatus(""));
				h < yd || setTimeout(td, 0)
			} else if (!(h < yd))
			if (Cd = Cd + 1 | 0, 1 == nd && 1 < od && 0 != Cd % od) qd();
			else {
				0 == nd && (rd = sd());
				if (E)
					for (a = E.Nc, E.Nc = E.Tc, E.Tc = a, a = E.Fc, E.Fc = E.dd, E.dd = a, a = Dd[2097152], b = 0; b <= a; ++b) E.Fc[b] = 0;
				"timeout" === ud && e.Qc && (l("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"),
					ud = "");
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
				h < yd || ("object" === typeof SDL && SDL.audio && SDL.audio.me && SDL.audio.me(), qd())
			}
	};
	f || (b && 0 < b ? md(0, 1E3 / b) : md(1, 1), qd());
	if (c) throw "SimulateInfiniteLoop";
}
var qd = null,
	ud = "",
	yd = 0,
	pd = null,
	xd = 0,
	nd = 0,
	od = 0,
	Cd = 0,
	zd = [],
	Bd = {},
	rd, td, Ad, Ed = !1,
	Fd = !1,
	Gd = [];

function Hd() {
	function a() {
		Fd = document.pointerLockElement === e.canvas || document.mozPointerLockElement === e.canvas || document.webkitPointerLockElement === e.canvas || document.msPointerLockElement === e.canvas
	}
	e.preloadPlugins || (e.preloadPlugins = []);
	if (!Id) {
		Id = !0;
		try {
			Jd = !0
		} catch (c) {
			Jd = !1, console.log("warning: no blob constructor, cannot create blobs with mimetypes")
		}
		Kd = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : Jd ? null : console.log("warning: no BlobBuilder");
		Ld = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : void 0;
		e.Nd || "undefined" !== typeof Ld || (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."), e.Nd = !0);
		e.preloadPlugins.push({
			canHandle: function (a) {
				return !e.Nd && /\.(jpg|jpeg|png|bmp)$/i.test(a)
			},
			handle: function (a, b, f, g) {
				var c = null;
				if (Jd) try {
					c = new Blob([a], {
						type: Md(b)
					}), c.size !== a.length && (c = new Blob([(new Uint8Array(a)).buffer], {
						type: Md(b)
					}))
				} catch (u) {
					ta("Blob constructor present but fails: " +
						u + "; falling back to blob builder")
				}
				c || (c = new Kd, c.append((new Uint8Array(a)).buffer), c = c.getBlob());
				var d = Ld.createObjectURL(c);
				assert("string" == typeof d, "createObjectURL must return a url as a string");
				var x = new Image;
				x.onload = function () {
					assert(x.complete, "Image " + b + " could not be decoded");
					var c = document.createElement("canvas");
					c.width = x.width;
					c.height = x.height;
					c.getContext("2d").drawImage(x, 0, 0);
					e.preloadedImages[b] = c;
					Ld.revokeObjectURL(d);
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
				return !e.Gg && a.substr(-4) in {
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
				if (Jd) {
					try {
						var u = new Blob([a], {
							type: Md(b)
						})
					} catch (A) {
						return d()
					}
					u = Ld.createObjectURL(u);
					assert("string" == typeof u, "createObjectURL must return a url as a string");
					var w = new Audio;
					w.addEventListener("canplaythrough",
						function () {
							c(w)
						}, !1);
					w.onerror = function () {
						if (!x) {
							console.log("warning: browser could not fully decode audio " + b + ", trying slower base64 approach");
							for (var d = "", g = 0, f = 0, h = 0; h < a.length; h++)
								for (g = g << 8 | a[h], f += 8; 6 <= f;) {
									var q = g >> f - 6 & 63;
									f -= 6;
									d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [q]
								}
							2 == f ? (d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(g & 3) << 4], d += "==") : 4 == f && (d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(g & 15) << 2], d += "=");
							w.src =
								"data:audio/x-" + b.substr(-3) + ";base64," + d;
							c(w)
						}
					};
					w.src = u;
					Nd(function () {
						c(w)
					})
				} else return d()
			}
		});
		var b = e.canvas;
		b && (b.requestPointerLock = b.requestPointerLock || b.mozRequestPointerLock || b.webkitRequestPointerLock || b.msRequestPointerLock || function () {}, b.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || function () {}, b.exitPointerLock = b.exitPointerLock.bind(document), document.addEventListener("pointerlockchange", a, !1), document.addEventListener("mozpointerlockchange",
			a, !1), document.addEventListener("webkitpointerlockchange", a, !1), document.addEventListener("mspointerlockchange", a, !1), e.elementPointerLock && b.addEventListener("click", function (a) {
			!Fd && e.canvas.requestPointerLock && (e.canvas.requestPointerLock(), a.preventDefault())
		}, !1))
	}
}

function Od(a, b, c, d) {
	if (b && e.Qc && a == e.canvas) return e.Qc;
	if (b) {
		var f = {
			antialias: !1,
			alpha: !1
		};
		if (d)
			for (var g in d) f[g] = d[g];
		if (f = Pd(a, f)) var h = Qd[f].GLctx
	} else h = a.getContext("2d");
	if (!h) return null;
	c && (b || assert("undefined" === typeof GLctx, "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"), e.Qc = h, b && Rd(f), e.Kg = b, Gd.forEach(function (a) {
		a()
	}), Hd());
	return h
}
var Sd = !1,
	Td = void 0,
	Ud = void 0;

function Vd(a, b, c) {
	function d() {
		Ed = !1;
		var a = f.parentNode;
		(document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === a ? (f.exitFullscreen = document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || function () {}, f.exitFullscreen = f.exitFullscreen.bind(document), Td && f.requestPointerLock(), Ed = !0, Ud ? ("undefined" != typeof SDL &&
			(p[SDL.screen >> 2] = Na[SDL.screen >> 2] | 8388608), Wd(e.canvas), Xd()) : Wd(f)) : (a.parentNode.insertBefore(f, a), a.parentNode.removeChild(a), Ud ? ("undefined" != typeof SDL && (p[SDL.screen >> 2] = Na[SDL.screen >> 2] & -8388609), Wd(e.canvas), Xd()) : Wd(f));
		if (e.onFullScreen) e.onFullScreen(Ed);
		if (e.onFullscreen) e.onFullscreen(Ed)
	}
	Td = a;
	Ud = b;
	Yd = c;
	"undefined" === typeof Td && (Td = !0);
	"undefined" === typeof Ud && (Ud = !1);
	"undefined" === typeof Yd && (Yd = null);
	var f = e.canvas;
	Sd || (Sd = !0, document.addEventListener("fullscreenchange", d, !1), document.addEventListener("mozfullscreenchange",
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
			Lg: c
		}) :
		g.requestFullscreen()
}

function Zd(a, b, c) {
	l("Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead.");
	Zd = function (a, b, c) {
		return Vd(a, b, c)
	};
	return Vd(a, b, c)
}
var $d = 0;

function ae(a) {
	var b = Date.now();
	if (0 === $d) $d = b + 1E3 / 60;
	else
		for (; b + 2 >= $d;) $d += 1E3 / 60;
	setTimeout(a, Math.max($d - b, 0))
}

function vd(a) {
	"undefined" === typeof window ? ae(a) : (window.requestAnimationFrame || (window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || ae), window.requestAnimationFrame(a))
}

function Nd(a) {
	e.noExitRuntime = !0;
	setTimeout(function () {
		wa || a()
	}, 1E4)
}

function Md(a) {
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

function be(a, b, c) {
	e.readAsync(a, function (c) {
		assert(c, 'Loading data file "' + a + '" failed (no arrayBuffer).');
		b(new Uint8Array(c))
	}, function () {
		if (c) c();
		else throw 'Loading data file "' + a + '" failed.';
	})
}
var ce = [];

function Xd() {
	var a = e.canvas;
	ce.forEach(function (b) {
		b(a.width, a.height)
	})
}

function Wd(a, b, c) {
	b && c ? (a.we = b, a.be = c) : (b = a.we, c = a.be);
	var d = b,
		f = c;
	e.forcedAspectRatio && 0 < e.forcedAspectRatio && (d / f < e.forcedAspectRatio ? d = Math.round(f * e.forcedAspectRatio) : f = Math.round(d / e.forcedAspectRatio));
	if ((document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === a.parentNode && "undefined" != typeof screen) {
		var g = Math.min(screen.width / d, screen.height / f);
		d = Math.round(d * g);
		f = Math.round(f *
			g)
	}
	Ud ? (a.width != d && (a.width = d), a.height != f && (a.height = f), "undefined" != typeof a.style && (a.style.removeProperty("width"), a.style.removeProperty("height"))) : (a.width != b && (a.width = b), a.height != c && (a.height = c), "undefined" != typeof a.style && (d != b || f != c ? (a.style.setProperty("width", d + "px", "important"), a.style.setProperty("height", f + "px", "important")) : (a.style.removeProperty("width"), a.style.removeProperty("height"))))
}
var Id, Jd, Kd, Ld, Yd, de = 0,
	ee = 0,
	fe = 0,
	ge = 0,
	he = null,
	ie = null,
	je = !1;

function ke() {
	++ge
}

function le() {
	--ge
}

function me() {
	for (var a = ne.length - 1; 0 <= a; --a) pe(a);
	ne = [];
	qe = [];
	window.removeEventListener("gamepadconnected", ke);
	window.removeEventListener("gamepaddisconnected", le)
}

function re(a) {
	return a ? ("number" == typeof a && (a = xa(a)), "#window" == a ? window : "#document" == a ? document : "#screen" == a ? window.screen : "#canvas" == a ? e.canvas : "string" == typeof a ? document.getElementById(a) : a) : window
}
var qe = [];

function se() {
	if (te && ue.Xc)
		for (var a = 0; a < qe.length; ++a) {
			var b = qe[a];
			qe.splice(a, 1);
			--a;
			b.Ig.apply(this, b.wg)
		}
}
var te = 0,
	ue = null,
	ne = [];

function pe(a) {
	var b = ne[a];
	b.target.removeEventListener(b.Lc, b.Zd, b.hd);
	ne.splice(a, 1)
}

function ve(a) {
	function b(b) {
		++te;
		ue = a;
		se();
		a.pd(b);
		se();
		--te
	}
	if (a.md) a.Zd = b, a.target.addEventListener(a.Lc, b, a.hd), ne.push(a), je || (ib.push(me), je = !0);
	else
		for (var c = 0; c < ne.length; ++c) ne[c].target == a.target && ne[c].Lc == a.Lc && pe(c--)
}

function we(a, b, c) {
	Pa[a >> 3] = window.performance && window.performance.now ? window.performance.now() : Date.now();
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
	p[a + 44 >> 2] = b.movementX || b.mozMovementX || b.webkitMovementX || b.screenX - he;
	p[a + 48 >> 2] = b.movementY || b.mozMovementY || b.webkitMovementY || b.screenY - ie;
	if (e.canvas) {
		var d = e.canvas.getBoundingClientRect();
		p[a + 60 >> 2] = b.clientX - d.left;
		p[a + 64 >> 2] = b.clientY - d.top
	} else p[a + 60 >> 2] = 0, p[a + 64 >> 2] = 0;
	c ? (d = c.getBoundingClientRect ? c.getBoundingClientRect() : {
		left: 0,
		top: 0
	}, p[a + 52 >> 2] = b.clientX - d.left, p[a + 56 >> 2] = b.clientY - d.top) : (p[a + 52 >> 2] = 0, p[a + 56 >> 2] = 0);
	"wheel" !== b.type && "mousewheel" !== b.type && (he = b.screenX, ie = b.screenY)
}

function xe(a, b, c, d, f, g) {
	de || (de = Ha(72));
	a = re(a);
	c = {
		target: a,
		Xc: "mousemove" != g && "mouseenter" != g && "mouseleave" != g,
		Lc: g,
		md: d,
		pd: function (c) {
			c = c || window.event;
			we(de, c, a);
			e.dynCall_iiii(d, f, de, b) && c.preventDefault()
		},
		hd: c
	};
	(-1 !== navigator.userAgent.indexOf("MSIE") || 0 < navigator.appVersion.indexOf("Trident/")) && "mousedown" == g && (c.Xc = !1);
	ve(c)
}

function ye(a, b, c, d, f) {
	function g(c) {
		c = c || window.event;
		we(ee, c, a);
		Pa[ee + 72 >> 3] = c.wheelDeltaX || 0;
		Pa[ee + 80 >> 3] = -(c.wheelDeltaY ? c.wheelDeltaY : c.wheelDelta);
		Pa[ee + 88 >> 3] = 0;
		p[ee + 96 >> 2] = 0;
		e.dynCall_iiii(d, 9, ee, b) && c.preventDefault()
	}

	function h(c) {
		c = c || window.event;
		var g = ee;
		we(g, c, a);
		Pa[g + 72 >> 3] = c.deltaX;
		Pa[g + 80 >> 3] = c.deltaY;
		Pa[g + 88 >> 3] = c.deltaZ;
		p[g + 96 >> 2] = c.deltaMode;
		e.dynCall_iiii(d, 9, g, b) && c.preventDefault()
	}
	ee || (ee = Ha(104));
	a = re(a);
	ve({
		target: a,
		Xc: !0,
		Lc: f,
		md: d,
		pd: "wheel" == f ? h : g,
		hd: c
	})
}

function ze(a, b, c, d, f, g) {
	fe || (fe = Ha(1684));
	a = re(a);
	ve({
		target: a,
		Xc: "touchstart" == g || "touchend" == g,
		Lc: g,
		md: d,
		pd: function (c) {
			c = c || window.event;
			for (var g = {}, h = 0; h < c.touches.length; ++h) {
				var u = c.touches[h];
				g[u.identifier] = u
			}
			for (h = 0; h < c.changedTouches.length; ++h) u = c.changedTouches[h], g[u.identifier] = u, u.Yd = !0;
			for (h = 0; h < c.targetTouches.length; ++h) u = c.targetTouches[h], g[u.identifier].ie = !0;
			var w = u = fe;
			p[w + 4 >> 2] = c.ctrlKey;
			p[w + 8 >> 2] = c.shiftKey;
			p[w + 12 >> 2] = c.altKey;
			p[w + 16 >> 2] = c.metaKey;
			w += 20;
			var A = e.canvas ? e.canvas.getBoundingClientRect() :
				void 0,
				fa = a.getBoundingClientRect ? a.getBoundingClientRect() : {
					left: 0,
					top: 0
				},
				ha = 0;
			for (h in g) {
				var y = g[h];
				p[w >> 2] = y.identifier;
				p[w + 4 >> 2] = y.screenX;
				p[w + 8 >> 2] = y.screenY;
				p[w + 12 >> 2] = y.clientX;
				p[w + 16 >> 2] = y.clientY;
				p[w + 20 >> 2] = y.pageX;
				p[w + 24 >> 2] = y.pageY;
				p[w + 28 >> 2] = y.Yd;
				p[w + 32 >> 2] = y.ie;
				A ? (p[w + 44 >> 2] = y.clientX - A.left, p[w + 48 >> 2] = y.clientY - A.top) : (p[w + 44 >> 2] = 0, p[w + 48 >> 2] = 0);
				p[w + 36 >> 2] = y.clientX - fa.left;
				p[w + 40 >> 2] = y.clientY - fa.top;
				w += 52;
				if (32 <= ++ha) break
			}
			p[u >> 2] = ha;
			e.dynCall_iiii(d, f, u, b) && c.preventDefault()
		},
		hd: c
	})
}
var Ae = 1,
	Be = 0,
	Ce = [],
	De = [],
	Ee = [],
	Fe = [],
	Ge = [],
	Qd = [],
	E = null,
	He = {},
	Ie = 0,
	Je = 0,
	Ke = [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
	Le = {},
	Me = [],
	Ne = 4;

function Oe(a) {
	Be || (Be = a)
}

function Pe(a) {
	for (var b = Ae++, c = a.length; c < b; c++) a[c] = null;
	return b
}
var Qe = null,
	Re = [0],
	Dd = null;

function Pd(a, b) {
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
	return d ? Se(d, b) : 0
}

function Se(a, b) {
	var c = Pe(Qd),
		d = {
			handle: c,
			attributes: b,
			version: b.majorVersion,
			GLctx: a
		};
	a.canvas && (a.canvas.vg = d);
	Qd[c] = d;
	("undefined" === typeof b.enableExtensionsByDefault || b.enableExtensionsByDefault) && Te(d);
	d.Jd = d.GLctx.getParameter(d.GLctx.MAX_VERTEX_ATTRIBS);
	d.Yc = [];
	for (a = 0; a < d.Jd; a++) d.Yc[a] = {
		enabled: !1,
		nd: !1,
		size: 0,
		type: 0,
		Od: 0,
		td: 0,
		cd: 0,
		Rd: null
	};
	a = Dd[2097152];
	d.Fc = [];
	d.dd = [];
	d.Fc.length = d.dd.length = a + 1;
	d.Nc = [];
	d.Tc = [];
	d.Nc.length = d.Tc.length = a + 1;
	d.Mc = [];
	d.Mc.length = a + 1;
	for (b = 0; b <= a; ++b) {
		d.Mc[b] =
			null;
		d.Fc[b] = d.dd[b] = 0;
		d.Nc[b] = [];
		d.Tc[b] = [];
		var f = d.Nc[b],
			g = d.Tc[b];
		f.length = g.length = 64;
		for (var h = 0; 64 > h; ++h) f[h] = g[h] = null
	}
	return c
}

function Rd(a) {
	if (!a) return GLctx = e.Qc = E = null, !0;
	a = Qd[a];
	if (!a) return !1;
	GLctx = e.Qc = a.GLctx;
	E = a;
	return !0
}

function Te(a) {
	a || (a = E);
	if (!a.de) {
		a.de = !0;
		var b = a.GLctx;
		if (2 > a.version) {
			var c = b.getExtension("ANGLE_instanced_arrays");
			c && (b.vertexAttribDivisor = function (a, b) {
				c.vertexAttribDivisorANGLE(a, b)
			}, b.drawArraysInstanced = function (a, b, d, g) {
				c.drawArraysInstancedANGLE(a, b, d, g)
			}, b.drawElementsInstanced = function (a, b, d, g, f) {
				c.drawElementsInstancedANGLE(a, b, d, g, f)
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
		b.yg = b.getExtension("EXT_disjoint_timer_query");
		var g = "OES_texture_float OES_texture_half_float OES_standard_derivatives OES_vertex_array_object WEBGL_compressed_texture_s3tc WEBGL_depth_texture OES_element_index_uint EXT_texture_filter_anisotropic EXT_frag_depth WEBGL_draw_buffers ANGLE_instanced_arrays OES_texture_float_linear OES_texture_half_float_linear EXT_blend_minmax EXT_shader_texture_lod WEBGL_compressed_texture_pvrtc EXT_color_buffer_half_float WEBGL_color_buffer_float EXT_sRGB WEBGL_compressed_texture_etc1 EXT_disjoint_timer_query WEBGL_compressed_texture_etc WEBGL_compressed_texture_astc EXT_color_buffer_float WEBGL_compressed_texture_s3tc_srgb EXT_disjoint_timer_query_webgl2".split(" ");
		(a = b.getSupportedExtensions()) && 0 < a.length && b.getSupportedExtensions().forEach(function (a) {
			-1 != g.indexOf(a) && b.getExtension(a)
		})
	}
}
var Ue, Ve = {};

function We(a) {
	if (0 === a) return 0;
	a = xa(a);
	if (!Ve.hasOwnProperty(a)) return 0;
	We.sc && Ia(We.sc);
	a = Ve[a];
	var b = Ca(a) + 1,
		c = Ha(b);
	c && Aa(a, Ea, c, b);
	We.sc = c;
	return We.sc
}

function _glDrawElements(a, b, c, d) {
	if (!Je) {
		var f = 1 * Ke[c - 5120] * b;
		var g = Dd[f];
		var h = E.Mc[g];
		h ? g = h : (h = GLctx.getParameter(GLctx.ELEMENT_ARRAY_BUFFER_BINDING), E.Mc[g] = GLctx.createBuffer(), GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, E.Mc[g]), GLctx.bufferData(GLctx.ELEMENT_ARRAY_BUFFER, 1 << g, GLctx.DYNAMIC_DRAW), GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, h), g = E.Mc[g]);
		GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, g);
		GLctx.bufferSubData(GLctx.ELEMENT_ARRAY_BUFFER, 0, n.subarray(d, d + f));
		d = 0
	}
	Ue = !1;
	for (f = 0; f < E.Jd; ++f)
		if (g =
			E.Yc[f], g.nd && g.enabled) {
			Ue = !0;
			h = g.td;
			h = 0 < h ? b * h : g.size * Ke[g.type - 5120] * b;
			var q = Dd[h];
			var x = E.Nc[q],
				u = E.Fc[q];
			E.Fc[q] = E.Fc[q] + 1 & 63;
			var w = x[u];
			w ? q = w : (w = GLctx.getParameter(GLctx.ARRAY_BUFFER_BINDING), x[u] = GLctx.createBuffer(), GLctx.bindBuffer(GLctx.ARRAY_BUFFER, x[u]), GLctx.bufferData(GLctx.ARRAY_BUFFER, 1 << q, GLctx.DYNAMIC_DRAW), GLctx.bindBuffer(GLctx.ARRAY_BUFFER, w), q = x[u]);
			GLctx.bindBuffer(GLctx.ARRAY_BUFFER, q);
			GLctx.bufferSubData(GLctx.ARRAY_BUFFER, 0, n.subarray(g.cd, g.cd + h));
			g.Rd.call(GLctx, f, g.size,
				g.type, g.Od, g.td, 0)
		}
	GLctx.drawElements(a, b, c, d);
	Ue && GLctx.bindBuffer(GLctx.ARRAY_BUFFER, Ce[Ie]);
	Je || GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, null)
}

function Xe(a, b, c, d, f) {
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
			return Oe(1280), null
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
			return Oe(1280), null
	}
	b = Ne;
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
			return Oe(1280), null
	}
}

function Ye() {
	Ye.sc || (Ye.sc = []);
	Ye.sc.push(pa());
	return Ye.sc.length - 1
}
var Ze = {},
	$e = 1;

function af(a, b) {
	af.sc || (af.sc = {});
	a in af.sc || (e.dynCall_v(b), af.sc[a] = 1)
}

function bf(a) {
	return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
}

function cf(a, b) {
	for (var c = 0, d = 0; d <= b; c += a[d++]);
	return c
}
var df = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	ef = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function ff(a, b) {
	for (a = new Date(a.getTime()); 0 < b;) {
		var c = a.getMonth(),
			d = (bf(a.getFullYear()) ? df : ef)[c];
		if (b > d - a.getDate()) b -= d - a.getDate() + 1, a.setDate(1), 11 > c ? a.setMonth(c + 1) : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1));
		else {
			a.setDate(a.getDate() + b);
			break
		}
	}
	return a
}

function gf(a, b, c, d) {
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

	function q(a) {
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
		a = ff(new Date(a.rc + 1900, 0, 1), a.gd);
		var b = q(new Date(a.getFullYear() + 1, 0, 4));
		return 0 >= h(q(new Date(a.getFullYear(), 0, 4)), a) ? 0 >= h(b, a) ? a.getFullYear() + 1 : a.getFullYear() : a.getFullYear() - 1
	}
	var u = p[d + 40 >> 2];
	d = {
		te: p[d >> 2],
		se: p[d + 4 >> 2],
		ed: p[d + 8 >> 2],
		Kc: p[d + 12 >> 2],
		Gc: p[d + 16 >> 2],
		rc: p[d + 20 >> 2],
		Pd: p[d + 24 >> 2],
		gd: p[d + 28 >> 2],
		Jg: p[d + 32 >> 2],
		re: p[d + 36 >> 2],
		ue: u ? xa(u) : ""
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
	for (var w in u) c = c.replace(new RegExp(w, "g"), u[w]);
	var A = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
		fa = "January February March April May June July August September October November December".split(" ");
	u = {
		"%a": function (a) {
			return A[a.Pd].substring(0, 3)
		},
		"%A": function (a) {
			return A[a.Pd]
		},
		"%b": function (a) {
			return fa[a.Gc].substring(0,
				3)
		},
		"%B": function (a) {
			return fa[a.Gc]
		},
		"%C": function (a) {
			return g((a.rc + 1900) / 100 | 0, 2)
		},
		"%d": function (a) {
			return g(a.Kc, 2)
		},
		"%e": function (a) {
			return f(a.Kc, 2, " ")
		},
		"%g": function (a) {
			return x(a).toString().substring(2)
		},
		"%G": function (a) {
			return x(a)
		},
		"%H": function (a) {
			return g(a.ed, 2)
		},
		"%I": function (a) {
			a = a.ed;
			0 == a ? a = 12 : 12 < a && (a -= 12);
			return g(a, 2)
		},
		"%j": function (a) {
			return g(a.Kc + cf(bf(a.rc + 1900) ? df : ef, a.Gc - 1), 3)
		},
		"%m": function (a) {
			return g(a.Gc + 1, 2)
		},
		"%M": function (a) {
			return g(a.se, 2)
		},
		"%n": function () {
			return "\n"
		},
		"%p": function (a) {
			return 0 <= a.ed && 12 > a.ed ? "AM" : "PM"
		},
		"%S": function (a) {
			return g(a.te, 2)
		},
		"%t": function () {
			return "\t"
		},
		"%u": function (a) {
			return (new Date(a.rc + 1900, a.Gc + 1, a.Kc, 0, 0, 0, 0)).getDay() || 7
		},
		"%U": function (a) {
			var b = new Date(a.rc + 1900, 0, 1),
				c = 0 === b.getDay() ? b : ff(b, 7 - b.getDay());
			a = new Date(a.rc + 1900, a.Gc, a.Kc);
			return 0 > h(c, a) ? g(Math.ceil((31 - c.getDate() + (cf(bf(a.getFullYear()) ? df : ef, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === h(c, b) ? "01" : "00"
		},
		"%V": function (a) {
			var b = q(new Date(a.rc + 1900, 0, 4)),
				c = q(new Date(a.rc +
					1901, 0, 4)),
				d = ff(new Date(a.rc + 1900, 0, 1), a.gd);
			return 0 > h(d, b) ? "53" : 0 >= h(c, d) ? "01" : g(Math.ceil((b.getFullYear() < a.rc + 1900 ? a.gd + 32 - b.getDate() : a.gd + 1 - b.getDate()) / 7), 2)
		},
		"%w": function (a) {
			return (new Date(a.rc + 1900, a.Gc + 1, a.Kc, 0, 0, 0, 0)).getDay()
		},
		"%W": function (a) {
			var b = new Date(a.rc, 0, 1),
				c = 1 === b.getDay() ? b : ff(b, 0 === b.getDay() ? 1 : 7 - b.getDay() + 1);
			a = new Date(a.rc + 1900, a.Gc, a.Kc);
			return 0 > h(c, a) ? g(Math.ceil((31 - c.getDate() + (cf(bf(a.getFullYear()) ? df : ef, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === h(c, b) ? "01" :
				"00"
		},
		"%y": function (a) {
			return (a.rc + 1900).toString().substring(2)
		},
		"%Y": function (a) {
			return a.rc + 1900
		},
		"%z": function (a) {
			a = a.re;
			var b = 0 <= a;
			a = Math.abs(a) / 60;
			return (b ? "+" : "-") + String("0000" + (a / 60 * 100 + a % 60)).slice(-4)
		},
		"%Z": function (a) {
			return a.ue
		},
		"%%": function () {
			return "%"
		}
	};
	for (w in u) 0 <= c.indexOf(w) && (c = c.replace(new RegExp(w, "g"), u[w](d)));
	w = Pb(c, !1);
	if (w.length > b) return 0;
	mb(w, a);
	return w.length - 1
}
Ac();
ac = Array(4096);
rc(B, "/");
tc("/tmp");
tc("/home");
tc("/home/web_user");
(function () {
	tc("/dev");
	Nb(259, {
		read: function () {
			return 0
		},
		write: function (a, b, f, g) {
			return g
		}
	});
	uc("/dev/null", 259);
	Mb(1280, Qb);
	Mb(1536, Rb);
	uc("/dev/tty", 1280);
	uc("/dev/tty1", 1536);
	if ("undefined" !== typeof crypto) {
		var a = new Uint8Array(1);
		var b = function () {
			crypto.getRandomValues(a);
			return a[0]
		}
	} else ea ? b = function () {
		return require("crypto").randomBytes(1)[0]
	} : b = function () {
		k("random_device")
	};
	Dc("random", b);
	Dc("urandom", b);
	tc("/dev/shm");
	tc("/dev/shm/tmp")
})();
tc("/proc");
tc("/proc/self");
tc("/proc/self/fd");
rc({
	tc: function () {
		var a = Tb("/proc/self", "fd", 16895, 73);
		a.oc = {
			lookup: function (a, c) {
				var b = Zb[+c];
				if (!b) throw new z(v.Bc);
				a = {
					parent: null,
					tc: {
						Ld: "fake"
					},
					oc: {
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
	if (!e.noFSInit && !Bc) {
		assert(!Bc, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
		Bc = !0;
		Ac();
		e.stdin = e.stdin;
		e.stdout = e.stdout;
		e.stderr = e.stderr;
		e.stdin ? Dc("stdin", e.stdin) : vc("/dev/tty", "/dev/stdin");
		e.stdout ? Dc("stdout", null, e.stdout) : vc("/dev/tty", "/dev/stdout");
		e.stderr ? Dc("stderr", null, e.stderr) : vc("/dev/tty1", "/dev/stderr");
		var a = wc("/dev/stdin",
			"r");
		assert(0 === a.fd, "invalid handle for stdin (" + a.fd + ")");
		a = wc("/dev/stdout", "w");
		assert(1 === a.fd, "invalid handle for stdout (" + a.fd + ")");
		a = wc("/dev/stderr", "w");
		assert(2 === a.fd, "invalid handle for stderr (" + a.fd + ")")
	}
});
hb.push(function () {
	bc = !1
});
ib.push(function () {
	Bc = !1;
	var a = e._fflush;
	a && a(0);
	for (a = 0; a < Zb.length; a++) {
		var b = Zb[a];
		b && yc(b)
	}
});
gb.unshift(function () {});
ib.push(function () {});
if (ea) {
	var fs = require("fs"),
		Wb = require("path");
	C.qe()
}
for (var hf = Array(256), jf = 0; 256 > jf; ++jf) hf[jf] = String.fromCharCode(jf);
Jc = hf;
Rc = e.BindingError = Qc("BindingError");
Tc = e.InternalError = Qc("InternalError");
e.count_emval_handles = function () {
	for (var a = 0, b = 5; b < Xc.length; ++b) void 0 !== Xc[b] && ++a;
	return a
};
e.get_first_emval = function () {
	for (var a = 5; a < Xc.length; ++a)
		if (void 0 !== Xc[a]) return Xc[a];
	return null
};
hd = e.UnboundTypeError = Qc("UnboundTypeError");
e.requestFullScreen = function (a, b, c) {
	l("Module.requestFullScreen is deprecated. Please call Module.requestFullscreen instead.");
	e.requestFullScreen = e.requestFullscreen;
	Zd(a, b, c)
};
e.requestFullscreen = function (a, b, c) {
	Vd(a, b, c)
};
e.requestAnimationFrame = function (a) {
	vd(a)
};
e.setCanvasSize = function (a, b, c) {
	Wd(e.canvas, a, b);
	c || Xd()
};
e.pauseMainLoop = function () {
	qd = null;
	yd++
};
e.resumeMainLoop = function () {
	yd++;
	var a = nd,
		b = od,
		c = pd;
	pd = null;
	wd(c, 0, !1, xd, !0);
	md(a, b);
	qd()
};
e.getUserMedia = function () {
	window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia);
	window.getUserMedia(void 0)
};
e.createContext = function (a, b, c, d) {
	return Od(a, b, c, d)
};
ea ? sd = function () {
	var a = process.hrtime();
	return 1E3 * a[0] + a[1] / 1E6
} : "undefined" !== typeof dateNow ? sd = dateNow : "object" === typeof self && self.performance && "function" === typeof self.performance.now ? sd = function () {
	return self.performance.now()
} : "object" === typeof performance && "function" === typeof performance.now ? sd = function () {
	return performance.now()
} : sd = Date.now;
if ("undefined" !== typeof window) {
	window.addEventListener("gamepadconnected", ke);
	window.addEventListener("gamepaddisconnected", le);
	var kf = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : null;
	kf && (ge = kf.length)
}
var GLctx;
Dd = new Uint8Array(2097153);
var lf = 0,
	mf = 1;
Dd[0] = 0;
for (var nf = 1; 2097152 >= nf; ++nf) nf > mf && (mf <<= 1, ++lf), Dd[nf] = lf;
Qe = new Float32Array(256);
for (var of = 0; 256 > of ; of ++) Re[ of ] = Qe.subarray(0, of +1);
for ( of = 0; 32 > of ; of ++) Me.push(Array( of ));
assert(!Ua);
var pf = Ta;
Ta = Ta + 4 + 15 & -16;
assert(Ta < m, "not enough memory for static allocation - increase TOTAL_MEMORY");
Za = pf;
Va = Wa = sa(Ta);
Xa = Va + cb;
Ya = sa(Xa);
p[Za >> 2] = Ya;
Ua = !0;
assert(Ya < m, "TOTAL_MEMORY not big enough for stack");

function Pb(a, b) {
	var c = Array(Ca(a) + 1);
	a = Aa(a, c, 0, c.length);
	b && (c.length = a);
	return c
}
var F = ["0", "__Z3cosf", "__Z3sinf", "0"],
	G = "0 __ZZN11Application4InitEvEN3__58__invokeEv __Z7IsReadyv __Z17GetAvailableSkinsv __Z22GetAvailableAnimationsv 0 0 0".split(" "),
	H = "0 __ZNK11UpdateEvent7GetNameEv __ZNSt3__213basic_filebufIcNS_11char_traitsIcEEE4syncEv __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE9showmanycEv __ZNSt3__213basic_filebufIcNS_11char_traitsIcEEE9underflowEv __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE5uflowEv __ZNK16PointerMoveEvent7GetNameEv __ZNK12MouseUpEvent7GetNameEv __ZNK14MouseDownEvent7GetNameEv __ZNK14PointerUpEvent7GetNameEv __ZNK16PointerDownEvent7GetNameEv __ZNK16MouseScrollEvent7GetNameEv ___stdio_close __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE4syncEv __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE9underflowEv __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE4syncEv __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE9showmanycEv __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE9underflowEv __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE5uflowEv __ZNSt3__211__stdoutbufIwE4syncEv __ZNSt3__211__stdoutbufIcE4syncEv __ZNSt3__210__stdinbufIwE9underflowEv __ZNSt3__210__stdinbufIwE5uflowEv __ZNSt3__210__stdinbufIcE9underflowEv __ZNSt3__210__stdinbufIcE5uflowEv __ZNKSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE13do_date_orderEv __ZNKSt3__220__time_get_c_storageIcE7__weeksEv __ZNKSt3__220__time_get_c_storageIcE8__monthsEv __ZNKSt3__220__time_get_c_storageIcE7__am_pmEv __ZNKSt3__220__time_get_c_storageIcE3__cEv __ZNKSt3__220__time_get_c_storageIcE3__rEv __ZNKSt3__220__time_get_c_storageIcE3__xEv __ZNKSt3__220__time_get_c_storageIcE3__XEv __ZNKSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE13do_date_orderEv __ZNKSt3__220__time_get_c_storageIwE7__weeksEv __ZNKSt3__220__time_get_c_storageIwE8__monthsEv __ZNKSt3__220__time_get_c_storageIwE7__am_pmEv __ZNKSt3__220__time_get_c_storageIwE3__cEv __ZNKSt3__220__time_get_c_storageIwE3__rEv __ZNKSt3__220__time_get_c_storageIwE3__xEv __ZNKSt3__220__time_get_c_storageIwE3__XEv __ZNKSt3__210moneypunctIcLb0EE16do_decimal_pointEv __ZNKSt3__210moneypunctIcLb0EE16do_thousands_sepEv __ZNKSt3__210moneypunctIcLb0EE14do_frac_digitsEv __ZNKSt3__210moneypunctIcLb1EE16do_decimal_pointEv __ZNKSt3__210moneypunctIcLb1EE16do_thousands_sepEv __ZNKSt3__210moneypunctIcLb1EE14do_frac_digitsEv __ZNKSt3__210moneypunctIwLb0EE16do_decimal_pointEv __ZNKSt3__210moneypunctIwLb0EE16do_thousands_sepEv __ZNKSt3__210moneypunctIwLb0EE14do_frac_digitsEv __ZNKSt3__210moneypunctIwLb1EE16do_decimal_pointEv __ZNKSt3__210moneypunctIwLb1EE16do_thousands_sepEv __ZNKSt3__210moneypunctIwLb1EE14do_frac_digitsEv __ZNKSt3__27codecvtIDic11__mbstate_tE11do_encodingEv __ZNKSt3__27codecvtIDic11__mbstate_tE16do_always_noconvEv __ZNKSt3__27codecvtIDic11__mbstate_tE13do_max_lengthEv __ZNKSt3__27codecvtIwc11__mbstate_tE11do_encodingEv __ZNKSt3__27codecvtIwc11__mbstate_tE16do_always_noconvEv __ZNKSt3__27codecvtIwc11__mbstate_tE13do_max_lengthEv __ZNKSt3__28numpunctIcE16do_decimal_pointEv __ZNKSt3__28numpunctIcE16do_thousands_sepEv __ZNKSt3__28numpunctIwE16do_decimal_pointEv __ZNKSt3__28numpunctIwE16do_thousands_sepEv __ZNKSt3__27codecvtIcc11__mbstate_tE11do_encodingEv __ZNKSt3__27codecvtIcc11__mbstate_tE16do_always_noconvEv __ZNKSt3__27codecvtIcc11__mbstate_tE13do_max_lengthEv __ZNKSt3__27codecvtIDsc11__mbstate_tE11do_encodingEv __ZNKSt3__27codecvtIDsc11__mbstate_tE16do_always_noconvEv __ZNKSt3__27codecvtIDsc11__mbstate_tE13do_max_lengthEv __ZNKSt11logic_error4whatEv __ZNKSt13runtime_error4whatEv __ZNKSt8bad_cast4whatEv __ZNSt3__214__thread_proxyINS_5tupleIJNS_10unique_ptrINS_15__thread_structENS_14default_deleteIS3_EEEEZN11EventThreadC1EvE3__0EEEEEPvSA_ __ZN10emscripten8internal7InvokerIbJEE6invokeEPFbvE __ZN10emscripten8internal7InvokerImJEE6invokeEPFmvE __ZN10emscripten8internal7InvokerINSt3__26vectorINS2_12basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEENS7_IS9_EEEEJEE6invokeEPFSB_vE __ZN10emscripten8internal7InvokerINSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEEJEE6invokeEPFS8_vE 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0".split(" "),
	I =
	"0 __ZNKSt3__219__shared_weak_count13__get_deleterERKSt9type_info __ZNSt3__213basic_filebufIcNS_11char_traitsIcEEE9pbackfailEi __ZNSt3__213basic_filebufIcNS_11char_traitsIcEEE8overflowEi __ZNK6League16HashValueStorage8GetChildERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE __ZNK6League16HashValueStorage8GetChildEm __ZNK6League18StringValueStorage8GetChildERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE __ZNK6League18StringValueStorage8GetChildEm __ZNK6League18MatrixValueStorage8GetChildERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE __ZNK6League18MatrixValueStorage8GetChildEm __ZNK6League17ArrayValueStorage8GetChildERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE __ZNK6League17ArrayValueStorage8GetChildEm __ZNK6League15MapValueStorage8GetChildERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE __ZNK6League15MapValueStorage8GetChildEm __ZNK6League21ContainerValueStorage8GetChildERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE __ZNK6League18StructValueStorage8GetChildERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EiLNS1_9qualifierE0EEEitLi3EE8GetChildERKNSt3__212basic_stringIcNS6_11char_traitsIcEENS6_9allocatorIcEEEE __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EiLNS1_9qualifierE0EEEitLi3EE8GetChildEm __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EfLNS1_9qualifierE0EEEffLi4EE8GetChildERKNSt3__212basic_stringIcNS6_11char_traitsIcEENS6_9allocatorIcEEEE __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EfLNS1_9qualifierE0EEEffLi4EE8GetChildEm __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EfLNS1_9qualifierE0EEEffLi3EE8GetChildERKNSt3__212basic_stringIcNS6_11char_traitsIcEENS6_9allocatorIcEEEE __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EfLNS1_9qualifierE0EEEffLi3EE8GetChildEm __ZNK6League24NumberVectorValueStorageIN3glm3vecILi2EfLNS1_9qualifierE0EEEffLi2EE8GetChildERKNSt3__212basic_stringIcNS6_11char_traitsIcEENS6_9allocatorIcEEEE __ZNK6League24NumberVectorValueStorageIN3glm3vecILi2EfLNS1_9qualifierE0EEEffLi2EE8GetChildEm __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EiLNS1_9qualifierE0EEEihLi4EE8GetChildERKNSt3__212basic_stringIcNS6_11char_traitsIcEENS6_9allocatorIcEEEE __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EiLNS1_9qualifierE0EEEihLi4EE8GetChildEm __ZNK6League18NumberValueStorageIfE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIfE8GetChildEm __ZNK6League18NumberValueStorageIyE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIyE8GetChildEm __ZNK6League18NumberValueStorageIxE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIxE8GetChildEm __ZNK6League18NumberValueStorageIiE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIiE8GetChildEm __ZNK6League18NumberValueStorageIjE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIjE8GetChildEm __ZNK6League18NumberValueStorageItE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageItE8GetChildEm __ZNK6League18NumberValueStorageIsE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIsE8GetChildEm __ZNK6League18NumberValueStorageIhE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIhE8GetChildEm __ZNK6League18NumberValueStorageIaE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIaE8GetChildEm __ZNK6League18NumberValueStorageIbE8GetChildERKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE __ZNK6League18NumberValueStorageIbE8GetChildEm __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE9pbackfailEi __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE8overflowEi __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE9pbackfailEj __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE8overflowEj __ZNSt3__211__stdoutbufIwE8overflowEj __ZNSt3__211__stdoutbufIcE8overflowEi __ZNSt3__210__stdinbufIwE9pbackfailEj __ZNSt3__210__stdinbufIcE9pbackfailEi __ZNKSt3__25ctypeIcE10do_toupperEc __ZNKSt3__25ctypeIcE10do_tolowerEc __ZNKSt3__25ctypeIcE8do_widenEc __ZNKSt3__25ctypeIwE10do_toupperEw __ZNKSt3__25ctypeIwE10do_tolowerEw __ZNKSt3__25ctypeIwE8do_widenEc __ZZ13PrepareEventsRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEER15ApplicationMeshRNS_6vectorIN6League4Skin4MeshENS3_ISD_EEEEPKNSB_16BaseValueStorageEEN3__68__invokeERSI_Pv __ZZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_ENK3__9clERN6League3BinEPvENUlRKNSA_16BaseValueStorageESD_E_8__invokeESG_SD_ __ZZZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_ENK3__9clERN6League3BinEPvENKUlS8_S8_P15ApplicationMeshRNSA_4SkinESD_E_clES8_S8_SF_SH_SD_ENUlRKNSA_16BaseValueStorageESD_E_8__invokeESL_SD_ __ZZZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_ENK3__9clERN6League3BinEPvENKUlS8_S8_P15ApplicationMeshRNSA_4SkinESD_E_clES8_S8_SF_SH_SD_ENUlRKNSA_16BaseValueStorageESD_E0_8__invokeESL_SD_ __ZZZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_ENK3__9clERN6League3BinEPvENKUlS8_S8_P15ApplicationMeshRNSA_4SkinESD_E_clES8_S8_SF_SH_SD_ENUlRKNSA_16BaseValueStorageESD_E1_8__invokeESL_SD_ __ZZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_ENK4__10clERN6League3BinEPvENUlRKNSA_16BaseValueStorageESD_E_8__invokeESG_SD_ __ZN10emscripten8internal7InvokerINSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEEJmEE6invokeEPFS8_mEm 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0".split(" "),
	J = "0 __ZNSt3__213basic_filebufIcNS_11char_traitsIcEEE6setbufEPcl __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6xsgetnEPcl __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6xsputnEPKcl ___stdio_write ___stdio_seek ___stdio_read ___stdout_write _sn_write __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE6setbufEPcl __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE6setbufEPwl __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE6xsgetnEPwl __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE6xsputnEPKwl __ZNSt3__211__stdoutbufIwE6xsputnEPKwl __ZNSt3__211__stdoutbufIcE6xsputnEPKcl __ZNKSt3__27collateIcE7do_hashEPKcS3_ __ZNKSt3__27collateIwE7do_hashEPKwS3_ __ZNKSt3__28messagesIcE7do_openERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEERKNS_6localeE __ZNKSt3__28messagesIwE7do_openERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEERKNS_6localeE __ZNKSt3__25ctypeIcE10do_toupperEPcPKc __ZNKSt3__25ctypeIcE10do_tolowerEPcPKc __ZNKSt3__25ctypeIcE9do_narrowEcc __ZNKSt3__25ctypeIwE5do_isEtw __ZNKSt3__25ctypeIwE10do_toupperEPwPKw __ZNKSt3__25ctypeIwE10do_tolowerEPwPKw __ZNKSt3__25ctypeIwE9do_narrowEwc __ZNK10__cxxabiv117__class_type_info9can_catchEPKNS_16__shim_type_infoERPv __ZNK10__cxxabiv123__fundamental_type_info9can_catchEPKNS_16__shim_type_infoERPv __Z11OnMouseMoveiPK20EmscriptenMouseEventPv __Z15OnTouchCallbackiPK20EmscriptenTouchEventPv __ZZN16EmscriptenWindowC1ERKN10BaseWindow14WindowSettingsEEN3__08__invokeEiPK20EmscriptenWheelEventPv _do_read".split(" "),
	K = "0 __ZNKSt3__25ctypeIcE8do_widenEPKcS3_Pc __ZNKSt3__25ctypeIwE5do_isEPKwS3_Pt __ZNKSt3__25ctypeIwE10do_scan_isEtPKwS3_ __ZNKSt3__25ctypeIwE11do_scan_notEtPKwS3_ __ZNKSt3__25ctypeIwE8do_widenEPKcS3_Pw 0 0".split(" "),
	L = "0 __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcd __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEce __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwd __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwe 0 0 0".split(" "),
	M = "0 __ZNKSt3__27collateIcE10do_compareEPKcS3_S3_S3_ __ZNKSt3__27collateIwE10do_compareEPKwS3_S3_S3_ __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcb __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcl __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcm __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcPKv __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwb __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwl __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwm __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwPKv __ZNKSt3__27codecvtIDic11__mbstate_tE10do_unshiftERS1_PcS4_RS4_ __ZNKSt3__27codecvtIDic11__mbstate_tE9do_lengthERS1_PKcS5_m __ZNKSt3__27codecvtIwc11__mbstate_tE10do_unshiftERS1_PcS4_RS4_ __ZNKSt3__27codecvtIwc11__mbstate_tE9do_lengthERS1_PKcS5_m __ZNKSt3__25ctypeIcE9do_narrowEPKcS3_cPc __ZNKSt3__25ctypeIwE9do_narrowEPKwS3_cPc __ZNKSt3__27codecvtIcc11__mbstate_tE10do_unshiftERS1_PcS4_RS4_ __ZNKSt3__27codecvtIcc11__mbstate_tE9do_lengthERS1_PKcS5_m __ZNKSt3__27codecvtIDsc11__mbstate_tE10do_unshiftERS1_PcS4_RS4_ __ZNKSt3__27codecvtIDsc11__mbstate_tE9do_lengthERS1_PKcS5_m __ZL23stbi__resample_row_hv_2PhS_S_ii __ZL14resample_row_1PhS_S_ii __ZL22stbi__resample_row_v_2PhS_S_ii __ZL22stbi__resample_row_h_2PhS_S_ii __ZL26stbi__resample_row_genericPhS_S_ii 0 0 0 0 0 0".split(" "),
	N = ["0", "__ZNKSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_bRNS_8ios_baseEce", "__ZNKSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_bRNS_8ios_baseEwe", "0"],
	O = "0 __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRb __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRl __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRx __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRt __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjS8_ __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRm __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRy __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRf __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRd __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRe __ZNKSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjRPv __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRb __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRl __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRx __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRt __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjS8_ __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRm __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRy __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRf __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRd __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRe __ZNKSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjRPv __ZNKSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE11do_get_timeES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE11do_get_dateES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE14do_get_weekdayES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE16do_get_monthnameES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE11do_get_yearES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE11do_get_timeES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE11do_get_dateES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE14do_get_weekdayES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE16do_get_monthnameES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE11do_get_yearES4_S4_RNS_8ios_baseERjP2tm __ZNKSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_bRNS_8ios_baseEcRKNS_12basic_stringIcS3_NS_9allocatorIcEEEE __ZNKSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_bRNS_8ios_baseEwRKNS_12basic_stringIwS3_NS_9allocatorIwEEEE 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0".split(" "),
	P = "0 __ZNKSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcPK2tmcc __ZNKSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwPK2tmcc __ZNKSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_bRNS_8ios_baseERjRe __ZNKSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_bRNS_8ios_baseERjRNS_12basic_stringIcS3_NS_9allocatorIcEEEE __ZNKSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_bRNS_8ios_baseERjRe __ZNKSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_bRNS_8ios_baseERjRNS_12basic_stringIwS3_NS_9allocatorIwEEEE 0".split(" "),
	Q = "0 __ZNKSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_getES4_S4_RNS_8ios_baseERjP2tmcc __ZNKSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_getES4_S4_RNS_8ios_baseERjP2tmcc __ZNKSt3__27codecvtIDic11__mbstate_tE6do_outERS1_PKDiS5_RS5_PcS7_RS7_ __ZNKSt3__27codecvtIDic11__mbstate_tE5do_inERS1_PKcS5_RS5_PDiS7_RS7_ __ZNKSt3__27codecvtIwc11__mbstate_tE6do_outERS1_PKwS5_RS5_PcS7_RS7_ __ZNKSt3__27codecvtIwc11__mbstate_tE5do_inERS1_PKcS5_RS5_PwS7_RS7_ __ZNKSt3__27codecvtIcc11__mbstate_tE6do_outERS1_PKcS5_RS5_PcS7_RS7_ __ZNKSt3__27codecvtIcc11__mbstate_tE5do_inERS1_PKcS5_RS5_PcS7_RS7_ __ZNKSt3__27codecvtIDsc11__mbstate_tE6do_outERS1_PKDsS5_RS5_PcS7_RS7_ __ZNKSt3__27codecvtIDsc11__mbstate_tE5do_inERS1_PKcS5_RS5_PDsS7_RS7_ 0 0 0 0 0".split(" "),
	R = "0 __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcx __ZNKSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE6do_putES4_RNS_8ios_baseEcy __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwx __ZNKSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE6do_putES4_RNS_8ios_baseEwy 0 0 0".split(" "),
	S = "0 ___cxa_pure_virtual __ZL25default_terminate_handlerv __ZZ4mainEN4__168__invokeEv __ZN12EventHandler7CleanUpEv __ZZN10FileSystem7GetFileERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEEEN3__08__invokeEv __Z4Loopv __ZZN8Profiler3GetEvEN3__08__invokeEv __Z17GetProfileResultsv __ZN10__cxxabiv112_GLOBAL__N_110construct_Ev 0 0 0 0 0 0".split(" "),
	T = "0 __ZN5EventD2Ev __ZN11UpdateEventD0Ev __ZNSt3__220__shared_ptr_emplaceIN6League8SkeletonENS_9allocatorIS2_EEED2Ev __ZNSt3__220__shared_ptr_emplaceIN6League8SkeletonENS_9allocatorIS2_EEED0Ev __ZNSt3__220__shared_ptr_emplaceIN6League8SkeletonENS_9allocatorIS2_EEE16__on_zero_sharedEv __ZNSt3__220__shared_ptr_emplaceIN6League8SkeletonENS_9allocatorIS2_EEE21__on_zero_shared_weakEv __ZN18BaseShaderVariableD2Ev __ZN14ShaderVariableIN3glm3matILi4ELi4EfLNS0_9qualifierE0EEEED0Ev __ZN14ShaderVariableIN3glm3matILi4ELi4EfLNS0_9qualifierE0EEEE6UpdateEv __ZN18BaseShaderVariableD0Ev __ZN14ShaderVariableI7TextureED2Ev __ZN14ShaderVariableI7TextureED0Ev __ZN14ShaderVariableI7TextureE6UpdateEv __ZN14ShaderVariableINSt3__26vectorIN3glm3matILi4ELi4EfLNS2_9qualifierE0EEENS0_9allocatorIS5_EEEEED2Ev __ZN14ShaderVariableINSt3__26vectorIN3glm3matILi4ELi4EfLNS2_9qualifierE0EEENS0_9allocatorIS5_EEEEED0Ev __ZN14ShaderVariableINSt3__26vectorIN3glm3matILi4ELi4EfLNS2_9qualifierE0EEENS0_9allocatorIS5_EEEEE6UpdateEv __ZN15ApplicationMesh22SwapMeshAnimationEventD2Ev __ZN15ApplicationMesh22SwapMeshAnimationEventD0Ev __ZN15ApplicationMesh22SwapMeshAnimationEvent5ResetEv __ZN15ApplicationMesh14AnimationEventD2Ev __ZN15ApplicationMesh14AnimationEventD0Ev __ZN5EventD0Ev __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEED1Ev __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEED0Ev __ZTv0_n12_NSt3__213basic_ostreamIcNS_11char_traitsIcEEED1Ev __ZTv0_n12_NSt3__213basic_ostreamIcNS_11char_traitsIcEEED0Ev __ZNSt3__214basic_ofstreamIcNS_11char_traitsIcEEED1Ev __ZNSt3__214basic_ofstreamIcNS_11char_traitsIcEEED0Ev __ZTv0_n12_NSt3__214basic_ofstreamIcNS_11char_traitsIcEEED1Ev __ZTv0_n12_NSt3__214basic_ofstreamIcNS_11char_traitsIcEEED0Ev __ZNSt3__213basic_filebufIcNS_11char_traitsIcEEED2Ev __ZNSt3__213basic_filebufIcNS_11char_traitsIcEEED0Ev __ZN6League16BaseValueStorageD2Ev __ZN6League16HashValueStorageD0Ev __ZN6League18StringValueStorageD2Ev __ZN6League18StringValueStorageD0Ev __ZN6League18MatrixValueStorageD0Ev __ZN6League17ArrayValueStorageD2Ev __ZN6League17ArrayValueStorageD0Ev __ZN6League15MapValueStorageD2Ev __ZN6League15MapValueStorageD0Ev __ZN6League16BaseValueStorageD0Ev __ZN6League21ContainerValueStorageD0Ev __ZN6League18StructValueStorageD0Ev __ZN6League24NumberVectorValueStorageIN3glm3vecILi3EiLNS1_9qualifierE0EEEitLi3EED0Ev __ZN6League24NumberVectorValueStorageIN3glm3vecILi4EfLNS1_9qualifierE0EEEffLi4EED0Ev __ZN6League24NumberVectorValueStorageIN3glm3vecILi3EfLNS1_9qualifierE0EEEffLi3EED0Ev __ZN6League24NumberVectorValueStorageIN3glm3vecILi2EfLNS1_9qualifierE0EEEffLi2EED0Ev __ZN6League24NumberVectorValueStorageIN3glm3vecILi4EiLNS1_9qualifierE0EEEihLi4EED0Ev __ZN6League18NumberValueStorageIfED0Ev __ZN6League18NumberValueStorageIyED0Ev __ZN6League18NumberValueStorageIxED0Ev __ZN6League18NumberValueStorageIiED0Ev __ZN6League18NumberValueStorageIjED0Ev __ZN6League18NumberValueStorageItED0Ev __ZN6League18NumberValueStorageIsED0Ev __ZN6League18NumberValueStorageIhED0Ev __ZN6League18NumberValueStorageIaED0Ev __ZN6League18NumberValueStorageIbED0Ev __ZN16PointerMoveEventD0Ev __ZN12MouseUpEventD0Ev __ZN14MouseDownEventD0Ev __ZN14PointerUpEventD0Ev __ZN16PointerDownEventD0Ev __ZN16MouseScrollEventD0Ev __ZNSt3__28ios_baseD2Ev __ZNSt3__28ios_baseD0Ev __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEED2Ev __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEED0Ev __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEED2Ev __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEED0Ev __ZNSt3__213basic_istreamIcNS_11char_traitsIcEEED1Ev __ZNSt3__213basic_istreamIcNS_11char_traitsIcEEED0Ev __ZTv0_n12_NSt3__213basic_istreamIcNS_11char_traitsIcEEED1Ev __ZTv0_n12_NSt3__213basic_istreamIcNS_11char_traitsIcEEED0Ev __ZNSt3__213basic_istreamIwNS_11char_traitsIwEEED1Ev __ZNSt3__213basic_istreamIwNS_11char_traitsIwEEED0Ev __ZTv0_n12_NSt3__213basic_istreamIwNS_11char_traitsIwEEED1Ev __ZTv0_n12_NSt3__213basic_istreamIwNS_11char_traitsIwEEED0Ev __ZNSt3__213basic_ostreamIwNS_11char_traitsIwEEED1Ev __ZNSt3__213basic_ostreamIwNS_11char_traitsIwEEED0Ev __ZTv0_n12_NSt3__213basic_ostreamIwNS_11char_traitsIwEEED1Ev __ZTv0_n12_NSt3__213basic_ostreamIwNS_11char_traitsIwEEED0Ev __ZNSt3__211__stdoutbufIwED0Ev __ZNSt3__211__stdoutbufIcED0Ev __ZNSt3__210__stdinbufIwED0Ev __ZNSt3__210__stdinbufIcED0Ev __ZNSt3__27collateIcED2Ev __ZNSt3__27collateIcED0Ev __ZNSt3__26locale5facet16__on_zero_sharedEv __ZNSt3__27collateIwED2Ev __ZNSt3__27collateIwED0Ev __ZNSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEED2Ev __ZNSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEED0Ev __ZNSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEED2Ev __ZNSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEED0Ev __ZNSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEED2Ev __ZNSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEED0Ev __ZNSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEED2Ev __ZNSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEED0Ev __ZNSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEED2Ev __ZNSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEED0Ev __ZNSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEED2Ev __ZNSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEED0Ev __ZNSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEED2Ev __ZNSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEED0Ev __ZNSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEED2Ev __ZNSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEED0Ev __ZNSt3__210moneypunctIcLb0EED2Ev __ZNSt3__210moneypunctIcLb0EED0Ev __ZNSt3__210moneypunctIcLb1EED2Ev __ZNSt3__210moneypunctIcLb1EED0Ev __ZNSt3__210moneypunctIwLb0EED2Ev __ZNSt3__210moneypunctIwLb0EED0Ev __ZNSt3__210moneypunctIwLb1EED2Ev __ZNSt3__210moneypunctIwLb1EED0Ev __ZNSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEED2Ev __ZNSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEED0Ev __ZNSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEED2Ev __ZNSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEED0Ev __ZNSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEED2Ev __ZNSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEED0Ev __ZNSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEED2Ev __ZNSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEED0Ev __ZNSt3__28messagesIcED2Ev __ZNSt3__28messagesIcED0Ev __ZNSt3__28messagesIwED2Ev __ZNSt3__28messagesIwED0Ev __ZNSt3__26locale5facetD2Ev __ZNSt3__216__narrow_to_utf8ILm32EED0Ev __ZNSt3__217__widen_from_utf8ILm32EED0Ev __ZNSt3__27codecvtIwc11__mbstate_tED2Ev __ZNSt3__27codecvtIwc11__mbstate_tED0Ev __ZNSt3__26locale5__impD2Ev __ZNSt3__26locale5__impD0Ev __ZNSt3__25ctypeIcED2Ev __ZNSt3__25ctypeIcED0Ev __ZNSt3__28numpunctIcED2Ev __ZNSt3__28numpunctIcED0Ev __ZNSt3__28numpunctIwED2Ev __ZNSt3__28numpunctIwED0Ev __ZNSt3__26locale5facetD0Ev __ZNSt3__25ctypeIwED0Ev __ZNSt3__27codecvtIcc11__mbstate_tED0Ev __ZNSt3__27codecvtIDsc11__mbstate_tED0Ev __ZNSt3__27codecvtIDic11__mbstate_tED0Ev __ZN10__cxxabiv116__shim_type_infoD2Ev __ZN10__cxxabiv117__class_type_infoD0Ev __ZNK10__cxxabiv116__shim_type_info5noop1Ev __ZNK10__cxxabiv116__shim_type_info5noop2Ev __ZN10__cxxabiv120__si_class_type_infoD0Ev __ZNSt11logic_errorD2Ev __ZNSt11logic_errorD0Ev __ZNSt13runtime_errorD2Ev __ZNSt13runtime_errorD0Ev __ZNSt12length_errorD0Ev __ZNSt14overflow_errorD0Ev __ZNSt8bad_castD2Ev __ZNSt8bad_castD0Ev __ZN10__cxxabiv123__fundamental_type_infoD0Ev __ZN10__cxxabiv121__vmi_class_type_infoD0Ev __ZN14EmscriptenFile12OnLoadFailedEPv __Z17GetAnimationArrayv __Z25GetProfileResultsAsStringv __ZN10emscripten8internal7InvokerIvJEE6invokeEPFvvE __ZNSt3__26locale2id6__initEv __ZNSt3__217__call_once_proxyINS_5tupleIJONS_12_GLOBAL__N_111__fake_bindEEEEEEvPv __ZNSt3__212__do_nothingEPv _free __ZNSt3__221__thread_specific_ptrINS_15__thread_structEE16__at_thread_exitEPv __ZN10__cxxabiv112_GLOBAL__N_19destruct_EPv 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0".split(" "),
	U = ["0", "__ZN15ApplicationMesh22SwapMeshAnimationEvent6UpdateEf"],
	V = "0 __ZNSt3__213basic_filebufIcNS_11char_traitsIcEEE5imbueERKNS_6localeE __ZNK6League16HashValueStorage10DebugPrintEv __ZNK6League18StringValueStorage10DebugPrintEv __ZNK6League18MatrixValueStorage10DebugPrintEv __ZNK6League17ArrayValueStorage10DebugPrintEv __ZNK6League15MapValueStorage10DebugPrintEv __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EiLNS1_9qualifierE0EEEitLi3EE10DebugPrintEv __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EfLNS1_9qualifierE0EEEffLi4EE10DebugPrintEv __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EfLNS1_9qualifierE0EEEffLi3EE10DebugPrintEv __ZNK6League24NumberVectorValueStorageIN3glm3vecILi2EfLNS1_9qualifierE0EEEffLi2EE10DebugPrintEv __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EiLNS1_9qualifierE0EEEihLi4EE10DebugPrintEv __ZNK6League18NumberValueStorageIfE10DebugPrintEv __ZNK6League18NumberValueStorageIyE10DebugPrintEv __ZNK6League18NumberValueStorageIxE10DebugPrintEv __ZNK6League18NumberValueStorageIiE10DebugPrintEv __ZNK6League18NumberValueStorageIjE10DebugPrintEv __ZNK6League18NumberValueStorageItE10DebugPrintEv __ZNK6League18NumberValueStorageIsE10DebugPrintEv __ZNK6League18NumberValueStorageIhE10DebugPrintEv __ZNK6League18NumberValueStorageIaE10DebugPrintEv __ZNK6League18NumberValueStorageIbE10DebugPrintEv __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE5imbueERKNS_6localeE __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE5imbueERKNS_6localeE __ZNSt3__211__stdoutbufIwE5imbueERKNS_6localeE __ZNSt3__211__stdoutbufIcE5imbueERKNS_6localeE __ZNSt3__210__stdinbufIwE5imbueERKNS_6localeE __ZNSt3__210__stdinbufIcE5imbueERKNS_6localeE __ZNKSt3__210moneypunctIcLb0EE11do_groupingEv __ZNKSt3__210moneypunctIcLb0EE14do_curr_symbolEv __ZNKSt3__210moneypunctIcLb0EE16do_positive_signEv __ZNKSt3__210moneypunctIcLb0EE16do_negative_signEv __ZNKSt3__210moneypunctIcLb0EE13do_pos_formatEv __ZNKSt3__210moneypunctIcLb0EE13do_neg_formatEv __ZNKSt3__210moneypunctIcLb1EE11do_groupingEv __ZNKSt3__210moneypunctIcLb1EE14do_curr_symbolEv __ZNKSt3__210moneypunctIcLb1EE16do_positive_signEv __ZNKSt3__210moneypunctIcLb1EE16do_negative_signEv __ZNKSt3__210moneypunctIcLb1EE13do_pos_formatEv __ZNKSt3__210moneypunctIcLb1EE13do_neg_formatEv __ZNKSt3__210moneypunctIwLb0EE11do_groupingEv __ZNKSt3__210moneypunctIwLb0EE14do_curr_symbolEv __ZNKSt3__210moneypunctIwLb0EE16do_positive_signEv __ZNKSt3__210moneypunctIwLb0EE16do_negative_signEv __ZNKSt3__210moneypunctIwLb0EE13do_pos_formatEv __ZNKSt3__210moneypunctIwLb0EE13do_neg_formatEv __ZNKSt3__210moneypunctIwLb1EE11do_groupingEv __ZNKSt3__210moneypunctIwLb1EE14do_curr_symbolEv __ZNKSt3__210moneypunctIwLb1EE16do_positive_signEv __ZNKSt3__210moneypunctIwLb1EE16do_negative_signEv __ZNKSt3__210moneypunctIwLb1EE13do_pos_formatEv __ZNKSt3__210moneypunctIwLb1EE13do_neg_formatEv __ZNKSt3__28messagesIcE8do_closeEl __ZNKSt3__28messagesIwE8do_closeEl __ZNKSt3__28numpunctIcE11do_groupingEv __ZNKSt3__28numpunctIcE11do_truenameEv __ZNKSt3__28numpunctIcE12do_falsenameEv __ZNKSt3__28numpunctIwE11do_groupingEv __ZNKSt3__28numpunctIwE11do_truenameEv __ZNKSt3__28numpunctIwE12do_falsenameEv __ZZN11Application4InitEvEN3__08__invokeEPK14MouseDownEventPv __ZZN11Application4InitEvEN3__18__invokeEPK12MouseUpEventPv __ZZN11Application4InitEvEN3__28__invokeEPK14PointerUpEventPv __ZZN11Application4InitEvEN3__38__invokeEPK16MouseScrollEventPv __ZZN11Application4InitEvEN3__48__invokeEPK16PointerMoveEventPv __ZZN11Application11LoadShadersEvEN4__148__invokeEP6ShaderPv __ZZN11Application11LoadShadersEvEN4__158__invokeEP6ShaderPv __ZZ21OnSkinAndAnimationBinR12SkinLoadDataEN3__78__invokeERN6League9AnimationEPv __ZZN11Application13LoadAnimationER15ApplicationMeshRKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEEPFvRN6League9AnimationEPvESE_EN4__138__invokeESD_SE_ __ZZN11Application8LoadMeshERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_PFvS8_S8_P15ApplicationMeshRN6League4SkinEPvESE_EN4__118__invokeESD_SE_ __ZZN11Application8LoadMeshERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_PFvS8_S8_P15ApplicationMeshRN6League4SkinEPvESE_EN4__128__invokeERNSB_8SkeletonESE_ __ZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_EN3__98__invokeERN6League3BinEPv __ZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_EN4__108__invokeERN6League3BinEPv __ZZN15ApplicationMesh7SubMesh10SetTextureERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEEEN3__08__invokeER7TexturePv __Z8LoadSkinRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEES5_ __Z8LoadMeshRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEES7_ __Z11GetSkinNamem __Z16GetAnimationNamem __Z13PlayAnimationRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEES5_ __ZZ13PlayAnimationRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEES5_EN3__08__invokeERN6League9AnimationEPv 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0".split(" "),
	W = "0 __ZN6League16HashValueStorage17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18StringValueStorage17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18MatrixValueStorage17FetchDataFromFileEP14EmscriptenFileRm __ZN6League17ArrayValueStorage17FetchDataFromFileEP14EmscriptenFileRm __ZN6League15MapValueStorage17FetchDataFromFileEP14EmscriptenFileRm __ZN6League21ContainerValueStorage17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18StructValueStorage17FetchDataFromFileEP14EmscriptenFileRm __ZN6League24NumberVectorValueStorageIN3glm3vecILi3EiLNS1_9qualifierE0EEEitLi3EE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League24NumberVectorValueStorageIN3glm3vecILi4EfLNS1_9qualifierE0EEEffLi4EE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League24NumberVectorValueStorageIN3glm3vecILi3EfLNS1_9qualifierE0EEEffLi3EE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League24NumberVectorValueStorageIN3glm3vecILi2EfLNS1_9qualifierE0EEEffLi2EE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League24NumberVectorValueStorageIN3glm3vecILi4EiLNS1_9qualifierE0EEEihLi4EE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIfE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIyE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIxE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIiE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIjE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageItE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIsE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIhE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIaE17FetchDataFromFileEP14EmscriptenFileRm __ZN6League18NumberValueStorageIbE17FetchDataFromFileEP14EmscriptenFileRm __ZN14EmscriptenFile6OnLoadEPvS0_i __ZZN6League9Animation4LoadERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEEPFvRS0_PvESB_EN3__08__invokeEP14EmscriptenFile13FileLoadStateSB_ __ZZN6League3Bin4LoadERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEEPFvRS0_PvESB_EN3__08__invokeEP14EmscriptenFile13FileLoadStateSB_ __ZZN6League8Skeleton4LoadERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEEPFvRS0_PvESB_EN3__08__invokeEP14EmscriptenFile13FileLoadStateSB_ __ZZN6League4Skin4LoadERKNSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEEPFvRS0_PvESB_EN3__08__invokeEP14EmscriptenFile13FileLoadStateSB_ __ZL16stbi__idct_blockPhiPs __ZZN6Shader4LoadERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEEPFvPS_PvESA_EN3__08__invokeEP14EmscriptenFile13FileLoadStateSA_ __ZZN7Texture4LoadERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEEPFvRS_PvESA_EN3__08__invokeEP14EmscriptenFile13FileLoadStateSA_ __ZN10emscripten8internal7InvokerIvJRKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEES8_EE6invokeEPFvSA_S8_EPNS0_11BindingTypeIS8_EUt_ESH_ __ZN10emscripten8internal7InvokerIvJRKNSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEESA_EE6invokeEPFvSA_SA_EPNS0_11BindingTypeIS8_EUt_ESH_ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0".split(" "),
	X = "0 __ZNSt3__213basic_filebufIcNS_11char_traitsIcEEE7seekposENS_4fposI11__mbstate_tEEj __ZNK6League16HashValueStorage9GetAsJSONEbb __ZNK6League16HashValueStorage4FindEPFbRKNS_16BaseValueStorageEPvES4_ __ZNK6League18StringValueStorage9GetAsJSONEbb __ZNK6League18StringValueStorage4FindEPFbRKNS_16BaseValueStorageEPvES4_ __ZNK6League18MatrixValueStorage9GetAsJSONEbb __ZNK6League18MatrixValueStorage4FindEPFbRKNS_16BaseValueStorageEPvES4_ __ZNK6League17ArrayValueStorage9GetAsJSONEbb __ZNK6League17ArrayValueStorage4FindEPFbRKNS_16BaseValueStorageEPvES4_ __ZNK6League15MapValueStorage9GetAsJSONEbb __ZNK6League15MapValueStorage4FindEPFbRKNS_16BaseValueStorageEPvES4_ __ZNK6League18StructValueStorage9GetAsJSONEbb __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EiLNS1_9qualifierE0EEEitLi3EE9GetAsJSONEbb __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EiLNS1_9qualifierE0EEEitLi3EE4FindEPFbRKNS_16BaseValueStorageEPvES9_ __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EfLNS1_9qualifierE0EEEffLi4EE9GetAsJSONEbb __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EfLNS1_9qualifierE0EEEffLi4EE4FindEPFbRKNS_16BaseValueStorageEPvES9_ __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EfLNS1_9qualifierE0EEEffLi3EE9GetAsJSONEbb __ZNK6League24NumberVectorValueStorageIN3glm3vecILi3EfLNS1_9qualifierE0EEEffLi3EE4FindEPFbRKNS_16BaseValueStorageEPvES9_ __ZNK6League24NumberVectorValueStorageIN3glm3vecILi2EfLNS1_9qualifierE0EEEffLi2EE9GetAsJSONEbb __ZNK6League24NumberVectorValueStorageIN3glm3vecILi2EfLNS1_9qualifierE0EEEffLi2EE4FindEPFbRKNS_16BaseValueStorageEPvES9_ __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EiLNS1_9qualifierE0EEEihLi4EE9GetAsJSONEbb __ZNK6League24NumberVectorValueStorageIN3glm3vecILi4EiLNS1_9qualifierE0EEEihLi4EE4FindEPFbRKNS_16BaseValueStorageEPvES9_ __ZNK6League18NumberValueStorageIfE9GetAsJSONEbb __ZNK6League18NumberValueStorageIfE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIyE9GetAsJSONEbb __ZNK6League18NumberValueStorageIyE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIxE9GetAsJSONEbb __ZNK6League18NumberValueStorageIxE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIiE9GetAsJSONEbb __ZNK6League18NumberValueStorageIiE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIjE9GetAsJSONEbb __ZNK6League18NumberValueStorageIjE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageItE9GetAsJSONEbb __ZNK6League18NumberValueStorageItE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIsE9GetAsJSONEbb __ZNK6League18NumberValueStorageIsE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIhE9GetAsJSONEbb __ZNK6League18NumberValueStorageIhE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIaE9GetAsJSONEbb __ZNK6League18NumberValueStorageIaE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNK6League18NumberValueStorageIbE9GetAsJSONEbb __ZNK6League18NumberValueStorageIbE4FindEPFbRKNS_16BaseValueStorageEPvES5_ __ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE7seekposENS_4fposI11__mbstate_tEEj __ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE7seekposENS_4fposI11__mbstate_tEEj __ZNKSt3__27collateIcE12do_transformEPKcS3_ __ZNKSt3__27collateIwE12do_transformEPKwS3_ __ZNK10__cxxabiv117__class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi __ZNK10__cxxabiv120__si_class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi __ZNK10__cxxabiv121__vmi_class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi 0 0 0 0 0 0 0 0 0 0 0 0 0 0".split(" "),
	Y = "0 __ZNK10__cxxabiv117__class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib __ZNK10__cxxabiv120__si_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib __ZNK10__cxxabiv121__vmi_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib __ZZN11Application8LoadMeshERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_EN3__88__invokeES8_S8_P15ApplicationMeshRN6League4SkinEPv __ZZZN11Application8LoadSkinERKNSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_ENK3__9clERN6League3BinEPvENUlS8_S8_P15ApplicationMeshRNSA_4SkinESD_E_8__invokeES8_S8_SF_SH_SD_ 0 0".split(" "),
	qf = "0 __ZNKSt3__28messagesIcE6do_getEliiRKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE __ZNKSt3__28messagesIwE6do_getEliiRKNS_12basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEE __ZNK10__cxxabiv117__class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib __ZNK10__cxxabiv120__si_class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib __ZNK10__cxxabiv121__vmi_class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib __ZL22stbi__YCbCr_to_RGB_rowPhPKhS1_S1_ii 0".split(" "),
	rf = ["0", "__ZNSt3__213basic_filebufIcNS_11char_traitsIcEEE7seekoffExNS_8ios_base7seekdirEj", "__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEE7seekoffExNS_8ios_base7seekdirEj", "__ZNSt3__215basic_streambufIwNS_11char_traitsIwEEE7seekoffExNS_8ios_base7seekdirEj"];
e.wasmTableSize = 998;
e.wasmMaxTableSize = 998;
e.Wd = {};
e.Xd = {
	nb: function () {
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
	mb: function () {
		return m
	},
	_a: function () {
		k("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + m + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")
	},
	d: function (a) {
		k("Stack overflow! Attempted to allocate " + a + " bytes on the stack, but stack has only " + (Xa - pa() + a) + " bytes available!")
	},
	W: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'ff'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: vif: " + U[a] + "  i: " + G[a] + "  v: " + S[a] + "  ii: " + H[a] + "  vi: " + T[a] + "  iii: " + I[a] + "  vii: " + V[a] + "  iiii: " + J[a] + "  viii: " + W[a] + "  iiiii: " + K[a] + "  viiii: " + X[a] + "  iiiiid: " + L[a] + "  iiiiii: " + M[a] + "  iiiiij: " + R[a] + "  viiiii: " + Y[a] + "  viijii: " + rf[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  viiiiii: " + qf[a] + "  iiiiiiii: " + P[a] + "  iiiiiiiii: " + Q[a] + "  ");
		k(a)
	},
	C: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'i'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: ii: " + H[a] + "  iii: " + I[a] + "  iiii: " + J[a] + "  iiiii: " + K[a] + "  iiiiid: " + L[a] + "  iiiiii: " + M[a] + "  iiiiij: " + R[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  iiiiiiii: " + P[a] + "  iiiiiiiii: " + Q[a] + "  vi: " + T[a] + "  v: " + S[a] + "  vif: " + U[a] + "  vii: " + V[a] + "  ff: " + F[a] + "  viii: " + W[a] + "  viiii: " + X[a] + "  viiiii: " + Y[a] + "  viijii: " + rf[a] + "  viiiiii: " + qf[a] + "  ");
		k(a)
	},
	h: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: i: " + G[a] + "  iii: " + I[a] + "  iiii: " + J[a] + "  iiiii: " + K[a] + "  iiiiid: " + L[a] + "  iiiiii: " + M[a] + "  iiiiij: " + R[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  iiiiiiii: " + P[a] + "  iiiiiiiii: " + Q[a] + "  vii: " + V[a] + "  vi: " + T[a] + "  viii: " + W[a] + "  vif: " + U[a] + "  v: " + S[a] + "  ff: " + F[a] + "  viiii: " + X[a] + "  viiiii: " + Y[a] + "  viijii: " + rf[a] + "  viiiiii: " + qf[a] + "  ");
		k(a)
	},
	g: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: ii: " + H[a] + "  iiii: " + J[a] + "  i: " + G[a] + "  iiiii: " + K[a] + "  iiiiid: " + L[a] + "  iiiiii: " + M[a] + "  iiiiij: " + R[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  iiiiiiii: " + P[a] + "  iiiiiiiii: " + Q[a] + "  viii: " + W[a] + "  vii: " + V[a] + "  vi: " + T[a] + "  viiii: " + X[a] + "  vif: " + U[a] + "  viiiii: " + Y[a] + "  viijii: " + rf[a] + "  ff: " + F[a] + "  v: " + S[a] + "  viiiiii: " + qf[a] + "  ");
		k(a)
	},
	sa: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iii: " + I[a] + "  ii: " + H[a] + "  iiiii: " + K[a] + "  i: " + G[a] + "  iiiiid: " + L[a] + "  iiiiii: " + M[a] + "  iiiiij: " + R[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  iiiiiiii: " + P[a] + "  iiiiiiiii: " + Q[a] + "  viii: " + W[a] + "  viiii: " + X[a] + "  vii: " + V[a] + "  vi: " + T[a] + "  viiiii: " + Y[a] + "  viijii: " + rf[a] + "  vif: " + U[a] + "  viiiiii: " + qf[a] + "  ff: " + F[a] + "  v: " + S[a] + "  ");
		k(a)
	},
	J: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + J[a] + "  iii: " + I[a] + "  ii: " + H[a] + "  iiiiid: " + L[a] + "  iiiiii: " + M[a] + "  iiiiij: " + R[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  i: " + G[a] + "  iiiiiiii: " + P[a] + "  iiiiiiiii: " + Q[a] + "  viiii: " + X[a] + "  viii: " + W[a] + "  viiiii: " + Y[a] + "  vii: " + V[a] + "  vi: " + T[a] + "  viijii: " + rf[a] + "  viiiiii: " + qf[a] + "  vif: " + U[a] + "  ff: " + F[a] + "  v: " + S[a] + "  ");
		k(a)
	},
	G: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiiid'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + J[a] + "  iiiii: " + K[a] + "  iii: " + I[a] + "  ii: " + H[a] + "  i: " + G[a] + "  viiii: " + X[a] + "  viii: " + W[a] + "  iiiiii: " + M[a] + "  iiiiij: " + R[a] + "  viiiii: " + Y[a] + "  vii: " + V[a] + "  iiiiiid: " + N[a] + "  viijii: " + rf[a] + "  vi: " + T[a] + "  iiiiiii: " + O[a] + "  viiiiii: " + qf[a] + "  vif: " + U[a] + "  iiiiiiii: " + P[a] + "  ff: " + F[a] + "  iiiiiiiii: " + Q[a] + "  v: " + S[a] + "  ");
		k(a)
	},
	v: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + J[a] + "  iiiii: " + K[a] + "  iii: " + I[a] + "  ii: " + H[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  iiiiiiii: " + P[a] + "  i: " + G[a] + "  iiiiiiiii: " + Q[a] + "  viiii: " + X[a] + "  viii: " + W[a] + "  iiiiid: " + L[a] + "  iiiiij: " + R[a] + "  viiiii: " + Y[a] + "  vii: " + V[a] + "  viiiiii: " + qf[a] + "  viijii: " + rf[a] + "  vi: " + T[a] + "  vif: " + U[a] + "  ff: " + F[a] + "  v: " + S[a] + "  ");
		k(a)
	},
	ba: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiiiid'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + J[a] + "  iiiii: " + K[a] + "  iiiiii: " + M[a] + "  iii: " + I[a] + "  ii: " + H[a] + "  i: " + G[a] + "  iiiiid: " + L[a] + "  viiii: " + X[a] + "  viii: " + W[a] + "  iiiiij: " + R[a] + "  viiiii: " + Y[a] + "  iiiiiii: " + O[a] + "  viiiiii: " + qf[a] + "  vii: " + V[a] + "  viijii: " + rf[a] + "  vi: " + T[a] + "  iiiiiiii: " + P[a] + "  vif: " + U[a] + "  ff: " + F[a] + "  iiiiiiiii: " + Q[a] + "  v: " + S[a] + "  ");
		k(a)
	},
	l: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + J[a] + "  iiiii: " + K[a] + "  iiiiii: " + M[a] + "  iii: " + I[a] + "  ii: " + H[a] + "  iiiiiiii: " + P[a] + "  iiiiiiiii: " + Q[a] + "  i: " + G[a] + "  viiii: " + X[a] + "  viii: " + W[a] + "  iiiiid: " + L[a] + "  iiiiij: " + R[a] + "  viiiii: " + Y[a] + "  iiiiiid: " + N[a] + "  viiiiii: " + qf[a] + "  vii: " + V[a] + "  viijii: " + rf[a] + "  vi: " + T[a] + "  vif: " + U[a] + "  ff: " + F[a] + "  v: " + S[a] + "  ");
		k(a)
	},
	aa: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + J[a] + "  iiiii: " + K[a] + "  iiiiii: " + M[a] + "  iii: " + I[a] + "  iiiiiii: " + O[a] + "  ii: " + H[a] + "  iiiiiiiii: " + Q[a] + "  i: " + G[a] + "  viiii: " + X[a] + "  viii: " + W[a] + "  iiiiid: " + L[a] + "  iiiiij: " + R[a] + "  viiiii: " + Y[a] + "  iiiiiid: " + N[a] + "  viiiiii: " + qf[a] + "  vii: " + V[a] + "  viijii: " + rf[a] + "  vi: " + T[a] + "  vif: " + U[a] + "  ff: " + F[a] + "  v: " + S[a] + "  ");
		k(a)
	},
	x: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + J[a] + "  iiiii: " + K[a] + "  iiiiii: " + M[a] + "  iii: " + I[a] + "  iiiiiii: " + O[a] + "  iiiiiiii: " + P[a] + "  ii: " + H[a] + "  i: " + G[a] + "  viiii: " + X[a] + "  viii: " + W[a] + "  iiiiid: " + L[a] + "  iiiiij: " + R[a] + "  viiiii: " + Y[a] + "  iiiiiid: " + N[a] + "  viiiiii: " + qf[a] + "  vii: " + V[a] + "  viijii: " + rf[a] + "  vi: " + T[a] + "  vif: " + U[a] + "  ff: " + F[a] + "  v: " + S[a] + "  ");
		k(a)
	},
	E: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'iiiiij'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: iiii: " + J[a] + "  iiiii: " + K[a] + "  iii: " + I[a] + "  ii: " + H[a] + "  i: " + G[a] + "  viiii: " + X[a] + "  viii: " + W[a] + "  iiiiid: " + L[a] + "  iiiiii: " + M[a] + "  viiiii: " + Y[a] + "  vii: " + V[a] + "  vi: " + T[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  viiiiii: " + qf[a] + "  vif: " + U[a] + "  viijii: " + rf[a] + "  iiiiiiii: " + P[a] + "  ff: " + F[a] + "  iiiiiiiii: " + Q[a] + "  v: " + S[a] + "  ");
		k(a)
	},
	u: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'v'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: vi: " + T[a] + "  vif: " + U[a] + "  vii: " + V[a] + "  viii: " + W[a] + "  viiii: " + X[a] + "  viiiii: " + Y[a] + "  viijii: " + rf[a] + "  viiiiii: " + qf[a] + "  i: " + G[a] + "  ff: " + F[a] + "  ii: " + H[a] + "  iii: " + I[a] + "  iiii: " + J[a] + "  iiiii: " + K[a] + "  iiiiid: " + L[a] + "  iiiiii: " + M[a] + "  iiiiij: " + R[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  iiiiiiii: " + P[a] + "  iiiiiiiii: " + Q[a] + "  ");
		k(a)
	},
	f: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'vi'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: v: " + S[a] + "  vif: " + U[a] + "  vii: " + V[a] + "  viii: " + W[a] + "  viiii: " + X[a] + "  viiiii: " + Y[a] + "  viijii: " + rf[a] + "  viiiiii: " + qf[a] + "  i: " + G[a] + "  ii: " + H[a] + "  iii: " + I[a] + "  ff: " + F[a] + "  iiii: " + J[a] + "  iiiii: " + K[a] + "  iiiiid: " + L[a] + "  iiiiii: " + M[a] + "  iiiiij: " + R[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  iiiiiiii: " + P[a] + "  iiiiiiiii: " + Q[a] + "  ");
		k(a)
	},
	$a: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'vif'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: vi: " + T[a] + "  v: " + S[a] + "  vii: " + V[a] + "  i: " + G[a] + "  ii: " + H[a] + "  ff: " + F[a] + "  viii: " + W[a] + "  iii: " + I[a] + "  viiii: " + X[a] + "  iiii: " + J[a] + "  viiiii: " + Y[a] + "  viijii: " + rf[a] + "  iiiii: " + K[a] + "  viiiiii: " + qf[a] + "  iiiiid: " + L[a] + "  iiiiii: " + M[a] + "  iiiiij: " + R[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  iiiiiiii: " + P[a] + "  iiiiiiiii: " + Q[a] + "  ");
		k(a)
	},
	i: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'vii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: vi: " + T[a] + "  viii: " + W[a] + "  v: " + S[a] + "  viiii: " + X[a] + "  viiiii: " + Y[a] + "  viijii: " + rf[a] + "  viiiiii: " + qf[a] + "  ii: " + H[a] + "  iii: " + I[a] + "  vif: " + U[a] + "  i: " + G[a] + "  iiii: " + J[a] + "  iiiii: " + K[a] + "  ff: " + F[a] + "  iiiiid: " + L[a] + "  iiiiii: " + M[a] + "  iiiiij: " + R[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  iiiiiiii: " + P[a] + "  iiiiiiiii: " + Q[a] + "  ");
		k(a)
	},
	k: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'viii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: vii: " + V[a] + "  vi: " + T[a] + "  viiii: " + X[a] + "  v: " + S[a] + "  viiiii: " + Y[a] + "  viiiiii: " + qf[a] + "  iii: " + I[a] + "  ii: " + H[a] + "  iiii: " + J[a] + "  vif: " + U[a] + "  iiiii: " + K[a] + "  i: " + G[a] + "  viijii: " + rf[a] + "  iiiiid: " + L[a] + "  iiiiii: " + M[a] + "  iiiiij: " + R[a] + "  ff: " + F[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  iiiiiiii: " + P[a] + "  iiiiiiiii: " + Q[a] + "  ");
		k(a)
	},
	o: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'viiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: viii: " + W[a] + "  vii: " + V[a] + "  vi: " + T[a] + "  viiiii: " + Y[a] + "  viiiiii: " + qf[a] + "  v: " + S[a] + "  iiii: " + J[a] + "  iii: " + I[a] + "  ii: " + H[a] + "  iiiii: " + K[a] + "  viijii: " + rf[a] + "  vif: " + U[a] + "  iiiiid: " + L[a] + "  iiiiii: " + M[a] + "  iiiiij: " + R[a] + "  i: " + G[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  ff: " + F[a] + "  iiiiiiii: " + P[a] + "  iiiiiiiii: " + Q[a] + "  ");
		k(a)
	},
	L: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'viiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: viii: " + W[a] + "  viiii: " + X[a] + "  vii: " + V[a] + "  vi: " + T[a] + "  viiiiii: " + qf[a] + "  v: " + S[a] + "  iiii: " + J[a] + "  iiiii: " + K[a] + "  iii: " + I[a] + "  ii: " + H[a] + "  iiiiii: " + M[a] + "  viijii: " + rf[a] + "  iiiiid: " + L[a] + "  iiiiij: " + R[a] + "  vif: " + U[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  i: " + G[a] + "  iiiiiiii: " + P[a] + "  ff: " + F[a] + "  iiiiiiiii: " + Q[a] + "  ");
		k(a)
	},
	$: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'viiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: viii: " + W[a] + "  viiii: " + X[a] + "  viiiii: " + Y[a] + "  vii: " + V[a] + "  vi: " + T[a] + "  v: " + S[a] + "  iiii: " + J[a] + "  iiiii: " + K[a] + "  iiiiii: " + M[a] + "  iii: " + I[a] + "  ii: " + H[a] + "  viijii: " + rf[a] + "  iiiiid: " + L[a] + "  iiiiij: " + R[a] + "  iiiiiii: " + O[a] + "  iiiiiid: " + N[a] + "  vif: " + U[a] + "  iiiiiiii: " + P[a] + "  i: " + G[a] + "  ff: " + F[a] + "  iiiiiiiii: " + Q[a] + "  ");
		k(a)
	},
	Za: function (a) {
		l("Invalid function pointer '" + a + "' called with signature 'viijii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
		l("This pointer might make sense in another type signature: vii: " + V[a] + "  vi: " + T[a] + "  v: " + S[a] + "  viii: " + W[a] + "  viiii: " + X[a] + "  iiii: " + J[a] + "  iii: " + I[a] + "  ii: " + H[a] + "  iiiii: " + K[a] + "  viiiii: " + Y[a] + "  vif: " + U[a] + "  iiiiii: " + M[a] + "  iiiiid: " + L[a] + "  viiiiii: " + qf[a] + "  iiiiij: " + R[a] + "  i: " + G[a] + "  iiiiiid: " + N[a] + "  iiiiiii: " + O[a] + "  ff: " + F[a] + "  iiiiiiii: " + P[a] + "  iiiiiiiii: " + Q[a] + "  ");
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
		"uncaught_exception" in sf ? sf.Md++ : sf.Md = 1;
		throw a + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
	},
	Xa: function () {
		return !!sf.Md
	},
	_: function () {},
	Wa: function () {
		Cb(v.Oc);
		return -1
	},
	Z: Cb,
	Va: function (a, b) {
		Gc = b;
		try {
			var c = Hc();
			D();
			var d = D(),
				f = D(),
				g = D();
			zc(c, d, g);
			p[f >>
				2] = c.position;
			c.od && 0 === d && 0 === g && (c.od = null);
			return 0
		} catch (h) {
			return "undefined" !== typeof FS && h instanceof z || k(h), -h.yc
		}
	},
	Ua: function (a, b) {
		Gc = b;
		try {
			var c = Hc(),
				d = D();
			a: {
				var f = D();
				for (b = a = 0; b < f; b++) {
					var g = p[d + (8 * b + 4) >> 2],
						h = c,
						q = p[d + 8 * b >> 2],
						x = g,
						u = void 0,
						w = Ea;
					if (0 > x || 0 > u) throw new z(v.qc);
					if (null === h.fd) throw new z(v.Bc);
					if (1 === (h.flags & 2097155)) throw new z(v.Bc);
					if (16384 === (h.node.mode & 61440)) throw new z(v.Vc);
					if (!h.nc.read) throw new z(v.qc);
					var A = "undefined" !== typeof u;
					if (!A) u = h.position;
					else if (!h.seekable) throw new z(v.Wc);
					var fa = h.nc.read(h, w, q, x, u);
					A || (h.position += fa);
					var ha = fa;
					if (0 > ha) {
						var y = -1;
						break a
					}
					a += ha;
					if (ha < g) break
				}
				y = a
			}
			return y
		} catch (Ga) {
			return "undefined" !== typeof FS && Ga instanceof z || k(Ga), -Ga.yc
		}
	},
	Y: function (a, b) {
		Gc = b;
		try {
			var c = Hc(),
				d = D();
			a: {
				var f = D();
				for (b = a = 0; b < f; b++) {
					var g = c,
						h = p[d + 8 * b >> 2],
						q = p[d + (8 * b + 4) >> 2],
						x = Ea,
						u = void 0;
					if (0 > q || 0 > u) throw new z(v.qc);
					if (null === g.fd) throw new z(v.Bc);
					if (0 === (g.flags & 2097155)) throw new z(v.Bc);
					if (16384 === (g.node.mode & 61440)) throw new z(v.Vc);
					if (!g.nc.write) throw new z(v.qc);
					g.flags & 1024 && zc(g, 0, 2);
					var w = "undefined" !== typeof u;
					if (!w) u = g.position;
					else if (!g.seekable) throw new z(v.Wc);
					var A = g.nc.write(g, x, h, q, u, void 0);
					w || (g.position += A);
					try {
						if (g.path && cc.onWriteToFile) cc.onWriteToFile(g.path)
					} catch (y) {
						console.log("FS.trackingDelegate['onWriteToFile']('" + path + "') threw an exception: " + y.message)
					}
					var fa = A;
					if (0 > fa) {
						var ha = -1;
						break a
					}
					a += fa
				}
				ha = a
			}
			return ha
		} catch (y) {
			return "undefined" !== typeof FS && y instanceof z || k(y), -y.yc
		}
	},
	D: function (a, b) {
		Gc = b;
		try {
			var c = Hc();
			switch (D()) {
				case 0:
					var d =
						D();
					return 0 > d ? -v.qc : wc(c.path, c.flags, 0, d).fd;
				case 1:
				case 2:
					return 0;
				case 3:
					return c.flags;
				case 4:
					return d = D(), c.flags |= d, 0;
				case 12:
				case 12:
					return d = D(), La[d + 0 >> 1] = 2, 0;
				case 13:
				case 14:
				case 13:
				case 14:
					return 0;
				case 16:
				case 8:
					return -v.qc;
				case 9:
					return Cb(v.qc), -1;
				default:
					return -v.qc
			}
		} catch (f) {
			return "undefined" !== typeof FS && f instanceof z || k(f), -f.yc
		}
	},
	Ta: function (a, b) {
		Gc = b;
		try {
			var c = xa(D()),
				d = D(),
				f = D();
			return wc(c, d, f).fd
		} catch (g) {
			return "undefined" !== typeof FS && g instanceof z || k(g), -g.yc
		}
	},
	X: function (a,
		b) {
		Gc = b;
		try {
			var c = Hc(),
				d = D();
			switch (d) {
				case 21509:
				case 21505:
					return c.tty ? 0 : -v.Hc;
				case 21510:
				case 21511:
				case 21512:
				case 21506:
				case 21507:
				case 21508:
					return c.tty ? 0 : -v.Hc;
				case 21519:
					if (!c.tty) return -v.Hc;
					var f = D();
					return p[f >> 2] = 0;
				case 21520:
					return c.tty ? -v.qc : -v.Hc;
				case 21531:
					a = f = D();
					if (!c.nc.ee) throw new z(v.Hc);
					return c.nc.ee(c, d, a);
				case 21523:
					return c.tty ? 0 : -v.Hc;
				case 21524:
					return c.tty ? 0 : -v.Hc;
				default:
					k("bad ioctl syscall " + d)
			}
		} catch (g) {
			return "undefined" !== typeof FS && g instanceof z || k(g), -g.yc
		}
	},
	V: function (a, b) {
		Gc = b;
		try {
			var c = Hc();
			yc(c);
			return 0
		} catch (d) {
			return "undefined" !== typeof FS && d instanceof z || k(d), -d.yc
		}
	},
	Sa: function (a, b) {
		Gc = b;
		try {
			var c = D(),
				d = D(),
				f = Fc[c];
			if (!f) return 0;
			if (d === f.Cg) {
				var g = Zb[f.fd],
					h = f.flags,
					q = new Uint8Array(n.subarray(c, c + d));
				g && g.nc.bd && g.nc.bd(g, q, 0, d, h);
				Fc[c] = null;
				f.Ud && Ia(f.Dg)
			}
			return 0
		} catch (x) {
			return "undefined" !== typeof FS && x instanceof z || k(x), -x.yc
		}
	},
	y: function () {},
	Ra: function (a, b, c, d, f) {
		var g = Ic(c);
		b = Kc(b);
		Vc(a, {
			name: b,
			fromWireType: function (a) {
				return !!a
			},
			toWireType: function (a, b) {
				return b ? d : f
			},
			argPackAdvance: 8,
			readValueFromPointer: function (a) {
				if (1 === c) var d = Ea;
				else if (2 === c) d = La;
				else if (4 === c) d = p;
				else throw new TypeError("Unknown boolean type size: " + b);
				return this.fromWireType(d[a >> g])
			},
			Dc: null
		})
	},
	Qa: function (a, b) {
		b = Kc(b);
		Vc(a, {
			name: b,
			fromWireType: function (a) {
				var b = Xc[a].value;
				4 < a && 0 === --Xc[a].ne && (Xc[a] = void 0, Wc.push(a));
				return b
			},
			toWireType: function (a, b) {
				return Yc(b)
			},
			argPackAdvance: 8,
			readValueFromPointer: Zc,
			Dc: null
		})
	},
	U: function (a, b, c) {
		c = Ic(c);
		b = Kc(b);
		Vc(a, {
			name: b,
			fromWireType: function (a) {
				return a
			},
			toWireType: function (a, b) {
				if ("number" !== typeof b && "boolean" !== typeof b) throw new TypeError('Cannot convert "' + $c(b) + '" to ' + this.name);
				return b
			},
			argPackAdvance: 8,
			readValueFromPointer: ad(b, c),
			Dc: null
		})
	},
	r: function (a, b, c, d, f, g) {
		var h = fd(b, c);
		a = Kc(a);
		f = gd(d, f);
		ed(a, function () {
			kd("Cannot call " + a + " due to unbound types", h)
		}, b - 1);
		Uc(h, function (c) {
			var d = [c[0], null].concat(c.slice(1)),
				h = c = a,
				q = f,
				A = d.length;
			2 > A && Sc("argTypes array size mismatch! Must at least get return value and 'this' types!");
			for (var fa = null !== d[1] && !1, ha = !1, y = 1; y < d.length; ++y)
				if (null !== d[y] && void 0 === d[y].Dc) {
					ha = !0;
					break
				}
			var Ga = "void" !== d[0].name,
				Qa = "",
				fb = "";
			for (y = 0; y < A - 2; ++y) Qa += (0 !== y ? ", " : "") + "arg" + y, fb += (0 !== y ? ", " : "") + "arg" + y + "Wired";
			h = "return function " + Oc(h) + "(" + Qa + ") {\nif (arguments.length !== " + (A - 2) + ") {\nthrowBindingError('function " + h + " called with ' + arguments.length + ' arguments, expected " + (A - 2) + " args!');\n}\n";
			ha && (h += "var destructors = [];\n");
			var oe = ha ? "destructors" : "null";
			Qa = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
			q = [Sc, q, g, cd, d[0], d[1]];
			fa && (h += "var thisWired = classParam.toWireType(" + oe + ", this);\n");
			for (y = 0; y < A - 2; ++y) h += "var arg" + y + "Wired = argType" + y + ".toWireType(" + oe + ", arg" + y + "); // " + d[y + 2].name + "\n", Qa.push("argType" + y), q.push(d[y + 2]);
			fa && (fb = "thisWired" + (0 < fb.length ? ", " : "") + fb);
			h += (Ga ? "var rv = " : "") + "invoker(fn" + (0 < fb.length ? ", " : "") + fb + ");\n";
			if (ha) h += "runDestructors(destructors);\n";
			else
				for (y = fa ? 1 : 2; y < d.length; ++y) A = 1 === y ? "thisWired" : "arg" + (y - 2) + "Wired", null !== d[y].Dc && (h += A + "_dtor(" + A + "); // " +
					d[y].name + "\n", Qa.push(A + "_dtor"), q.push(d[y].Dc));
			Ga && (h += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
			Qa.push(h + "}\n");
			d = bd(Qa).apply(null, q);
			y = b - 1;
			if (!e.hasOwnProperty(c)) throw new Tc("Replacing nonexistant public symbol");
			void 0 !== e[c].xc && void 0 !== y ? e[c].xc[y] = d : (e[c] = d, e[c].Vd = y);
			return []
		})
	},
	q: function (a, b, c, d, f) {
		function g(a) {
			return a
		}
		b = Kc(b); - 1 === f && (f = 4294967295);
		var h = Ic(c);
		if (0 === d) {
			var q = 32 - 8 * c;
			g = function (a) {
				return a << q >>> q
			}
		}
		var x = -1 != b.indexOf("unsigned");
		Vc(a, {
			name: b,
			fromWireType: g,
			toWireType: function (a, c) {
				if ("number" !== typeof c && "boolean" !== typeof c) throw new TypeError('Cannot convert "' + $c(c) + '" to ' + this.name);
				if (c < d || c > f) throw new TypeError('Passing a number "' + $c(c) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + f + "]!");
				return x ? c >>> 0 : c | 0
			},
			argPackAdvance: 8,
			readValueFromPointer: ld(b, h, 0 !== d),
			Dc: null
		})
	},
	p: function (a, b, c) {
		function d(a) {
			a >>= 2;
			var b = Na;
			return new f(b.buffer, b[a + 1], b[a])
		}
		var f = [Int8Array, Uint8Array, Int16Array,
			Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array
		][b];
		c = Kc(c);
		Vc(a, {
			name: c,
			fromWireType: d,
			argPackAdvance: 8,
			readValueFromPointer: d
		}, {
			ce: !0
		})
	},
	T: function (a, b) {
		b = Kc(b);
		var c = "std::string" === b;
		Vc(a, {
			name: b,
			fromWireType: function (a) {
				var b = Na[a >> 2];
				if (c) {
					var d = n[a + 4 + b],
						h = 0;
					0 != d && (h = d, n[a + 4 + b] = 0);
					var q = a + 4;
					for (d = 0; d <= b; ++d) {
						var x = a + 4 + d;
						if (0 == n[x]) {
							q = ya(n, q);
							if (void 0 === u) var u = q;
							else u += String.fromCharCode(0), u += q;
							q = x + 1
						}
					}
					0 != h && (n[a + 4 + b] = h)
				} else {
					u = Array(b);
					for (d = 0; d < b; ++d) u[d] = String.fromCharCode(n[a +
						4 + d]);
					u = u.join("")
				}
				Ia(a);
				return u
			},
			toWireType: function (a, b) {
				b instanceof ArrayBuffer && (b = new Uint8Array(b));
				var d = "string" === typeof b;
				d || b instanceof Uint8Array || b instanceof Uint8ClampedArray || b instanceof Int8Array || Sc("Cannot pass non-string to std::string");
				var f = (c && d ? function () {
						return Ca(b)
					} : function () {
						return b.length
					})(),
					q = Ha(4 + f + 1);
				Na[q >> 2] = f;
				if (c && d) Ba(b, q + 4, f + 1);
				else if (d)
					for (d = 0; d < f; ++d) {
						var x = b.charCodeAt(d);
						255 < x && (Ia(q), Sc("String has UTF-16 code units that do not fit in 8 bits"));
						n[q +
							4 + d] = x
					} else
						for (d = 0; d < f; ++d) n[q + 4 + d] = b[d];
				null !== a && a.push(Ia, q);
				return q
			},
			argPackAdvance: 8,
			readValueFromPointer: Zc,
			Dc: function (a) {
				Ia(a)
			}
		})
	},
	Pa: function (a, b, c) {
		c = Kc(c);
		if (2 === b) {
			var d = function () {
				return Ma
			};
			var f = 1
		} else 4 === b && (d = function () {
			return Na
		}, f = 2);
		Vc(a, {
			name: c,
			fromWireType: function (a) {
				for (var b = d(), c = Na[a >> 2], g = Array(c), u = a + 4 >> f, w = 0; w < c; ++w) g[w] = String.fromCharCode(b[u + w]);
				Ia(a);
				return g.join("")
			},
			toWireType: function (a, c) {
				var g = d(),
					h = c.length,
					u = Ha(4 + h * b);
				Na[u >> 2] = h;
				for (var w = u + 4 >> f, A = 0; A <
					h; ++A) g[w + A] = c.charCodeAt(A);
				null !== a && a.push(Ia, u);
				return u
			},
			argPackAdvance: 8,
			readValueFromPointer: Zc,
			Dc: function (a) {
				Ia(a)
			}
		})
	},
	Oa: function (a, b) {
		b = Kc(b);
		Vc(a, {
			Bg: !0,
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
			zc: a,
			Pc: b
		})
	},
	A: function (a) {
		return tb[a]()
	},
	Na: function (a, b, c, d) {
		be(xa(a), function (a) {
			var d =
				Ha(a.length);
			n.set(a, d);
			e.dynCall_viii(c, b, d, a.length);
			Ia(d)
		}, function () {
			d && e.dynCall_vi(d, b)
		})
	},
	Ma: function () {
		qd = null;
		yd++;
		pd = null
	},
	La: sd,
	Ka: function (a, b, c) {
		n.set(n.subarray(b, b + c), a);
		return a
	},
	Ja: function (a, b, c) {
		a = a ? re(a) : e.canvas;
		if (!a) return -4;
		a.width = b;
		a.height = c;
		return 0
	},
	Ia: wd,
	Ha: function (a, b, c, d) {
		xe(a, b, c, d, 5, "mousedown");
		return 0
	},
	Ga: function (a, b, c, d) {
		xe(a, b, c, d, 8, "mousemove");
		return 0
	},
	Fa: function (a, b, c, d) {
		xe(a, b, c, d, 6, "mouseup");
		return 0
	},
	Ea: function (a, b, c, d) {
		ze(a, b, c, d, 25, "touchcancel");
		return 0
	},
	Da: function (a, b, c, d) {
		ze(a, b, c, d, 23, "touchend");
		return 0
	},
	Ca: function (a, b, c, d) {
		ze(a, b, c, d, 24, "touchmove");
		return 0
	},
	Ba: function (a, b, c, d) {
		ze(a, b, c, d, 22, "touchstart");
		return 0
	},
	Aa: function (a, b, c, d) {
		a = re(a);
		return "undefined" !== typeof a.onwheel ? (ye(a, b, c, d, "wheel"), 0) : "undefined" !== typeof a.onmousewheel ? (ye(a, b, c, d, "mousewheel"), 0) : -1
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
		a = (a = xa(a)) && "#canvas" !== a || !e.canvas ? He[a] || re(a) : e.canvas.id ? He[e.canvas.id] || re(e.canvas.id) : e.canvas;
		return !a || c.explicitSwapControl ? 0 : Pd(a, c)
	},
	ya: function (a) {
		p[a >> 2] = 1;
		p[a + 4 >> 2] = 1;
		p[a + 8 >> 2] = 0;
		p[a + 12 >> 2] = 1;
		p[a + 16 >> 2] = 1;
		p[a + 20 >>
			2] = 0;
		p[a + 24 >> 2] = 0;
		p[a + 28 >> 2] = 0;
		p[a + 32 >> 2] = 1;
		p[a + 36 >> 2] = 0;
		p[a + 40 >> 2] = 1;
		p[a + 44 >> 2] = 0;
		p[a + 48 >> 2] = 0
	},
	xa: function (a) {
		return Rd(a) ? 0 : -5
	},
	z: We,
	wa: function (a) {
		GLctx.activeTexture(a)
	},
	va: function (a, b) {
		GLctx.attachShader(De[a], Ge[b])
	},
	w: function (a, b) {
		var c = b ? Ce[b] : null;
		a == GLctx.ARRAY_BUFFER ? Ie = b : a == GLctx.ELEMENT_ARRAY_BUFFER && (Je = b);
		GLctx.bindBuffer(a, c)
	},
	K: function (a, b) {
		GLctx.bindTexture(a, b ? Ee[b] : null)
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
	ra: function (a) {
		GLctx.compileShader(Ge[a])
	},
	qa: function (a, b, c, d, f, g, h, q) {
		GLctx.compressedTexImage2D(a, b, c, d, f, g, q ? n.subarray(q, q + h) : null)
	},
	pa: function () {
		var a = Pe(De),
			b = GLctx.createProgram();
		b.name = a;
		De[a] = b;
		return a
	},
	R: function (a) {
		var b = Pe(Ge);
		Ge[b] = GLctx.createShader(a);
		return b
	},
	oa: function (a, b) {
		for (var c = 0; c < a; c++) {
			var d = p[b + 4 * c >> 2],
				f = Ce[d];
			f && (GLctx.deleteBuffer(f), f.name = 0, Ce[d] = null, d == Ie && (Ie = 0), d == Je && (Je = 0))
		}
	},
	na: function (a) {
		if (a) {
			var b = De[a];
			b ? (GLctx.deleteProgram(b), b.name = 0, De[a] = null, Le[a] = null) : Oe(1281)
		}
	},
	ma: function (a) {
		if (a) {
			var b = Ge[a];
			b ? (GLctx.deleteShader(b), Ge[a] = null) : Oe(1281)
		}
	},
	la: function (a) {
		GLctx.depthFunc(a)
	},
	ka: _glDrawElements,
	Q: function (a) {
		GLctx.enable(a)
	},
	I: function (a) {
		var b = E.Yc[a];
		assert(b, a);
		b.enabled = !0;
		GLctx.enableVertexAttribArray(a)
	},
	P: function (a, b) {
		for (var c = 0; c < a; c++) {
			var d = GLctx.createBuffer();
			if (!d) {
				for (Oe(1282); c < a;) p[b + 4 * c++ >> 2] = 0;
				break
			}
			var f = Pe(Ce);
			d.name = f;
			Ce[f] = d;
			p[b + 4 * c >> 2] = f
		}
	},
	O: function (a, b) {
		for (var c =
				0; c < a; c++) {
			var d = GLctx.createTexture();
			if (!d) {
				for (Oe(1282); c < a;) p[b + 4 * c++ >> 2] = 0;
				break
			}
			var f = Pe(Ee);
			d.name = f;
			Ee[f] = d;
			p[b + 4 * c >> 2] = f
		}
	},
	ja: function (a, b) {
		return GLctx.getAttribLocation(De[a], xa(b))
	},
	ia: function (a, b, c, d) {
		a = GLctx.getShaderInfoLog(Ge[a]);
		null === a && (a = "(unknown error)");
		0 < b && d ? (b = Ba(a, d, b), c && (p[c >> 2] = b)) : c && (p[c >> 2] = 0)
	},
	N: function (a, b, c) {
		c ? 35716 == b ? (a = GLctx.getShaderInfoLog(Ge[a]), null === a && (a = "(unknown error)"), p[c >> 2] = a.length + 1) : 35720 == b ? (a = GLctx.getShaderSource(Ge[a]), p[c >> 2] = null ===
			a || 0 == a.length ? 0 : a.length + 1) : p[c >> 2] = GLctx.getShaderParameter(Ge[a], b) : Oe(1281)
	},
	H: function (a, b) {
		b = xa(b);
		var c = 0;
		if (-1 !== b.indexOf("]", b.length - 1)) {
			var d = b.lastIndexOf("["),
				f = b.slice(d + 1, -1);
			if (0 < f.length && (c = parseInt(f), 0 > c)) return -1;
			b = b.slice(0, d)
		}
		a = Le[a];
		return a ? (b = a.Qd[b]) && c < b[0] ? b[1] + c : -1 : -1
	},
	ha: function (a) {
		GLctx.linkProgram(De[a]);
		Le[a] = null;
		var b = De[a];
		Le[a] = {
			Qd: {},
			Id: 0,
			Eg: -1,
			Fg: -1
		};
		a = Le[a];
		for (var c = a.Qd, d = GLctx.getProgramParameter(b, GLctx.ACTIVE_UNIFORMS), f = 0; f < d; ++f) {
			var g = GLctx.getActiveUniform(b,
					f),
				h = g.name;
			a.Id = Math.max(a.Id, h.length + 1); - 1 !== h.indexOf("]", h.length - 1) && (h = h.slice(0, h.lastIndexOf("[")));
			var q = GLctx.getUniformLocation(b, h);
			if (null != q) {
				var x = Pe(Fe);
				c[h] = [g.size, x];
				Fe[x] = q;
				for (var u = 1; u < g.size; ++u) q = GLctx.getUniformLocation(b, h + "[" + u + "]"), x = Pe(Fe), Fe[x] = q
			}
		}
	},
	ga: function (a, b) {
		3333 == a || 3317 == a && (Ne = b);
		GLctx.pixelStorei(a, b)
	},
	fa: function (a, b, c, d) {
		for (var f = "", g = 0; g < b; ++g) {
			if (d) {
				var h = p[d + 4 * g >> 2];
				h = 0 > h ? xa(p[c + 4 * g >> 2]) : xa(p[c + 4 * g >> 2], h)
			} else h = xa(p[c + 4 * g >> 2]);
			f += h
		}
		GLctx.shaderSource(Ge[a],
			f)
	},
	lb: function (a, b, c, d, f, g, h, q, x) {
		var u = null;
		x && (u = Xe(q, h, d, f, x));
		GLctx.texImage2D(a, b, c, d, f, g, h, q, u)
	},
	F: function (a, b, c) {
		GLctx.texParameteri(a, b, c)
	},
	kb: function (a, b) {
		GLctx.uniform1i(Fe[a], b)
	},
	ea: function (a, b, c, d) {
		if (256 >= 16 * b) {
			var f = Re[16 * b - 1];
			for (var g = 0; g < 16 * b; g += 16) f[g] = Oa[d + 4 * g >> 2], f[g + 1] = Oa[d + (4 * g + 4) >> 2], f[g + 2] = Oa[d + (4 * g + 8) >> 2], f[g + 3] = Oa[d + (4 * g + 12) >> 2], f[g + 4] = Oa[d + (4 * g + 16) >> 2], f[g + 5] = Oa[d + (4 * g + 20) >> 2], f[g + 6] = Oa[d + (4 * g + 24) >> 2], f[g + 7] = Oa[d + (4 * g + 28) >> 2], f[g + 8] = Oa[d + (4 * g + 32) >> 2], f[g + 9] = Oa[d + (4 *
				g + 36) >> 2], f[g + 10] = Oa[d + (4 * g + 40) >> 2], f[g + 11] = Oa[d + (4 * g + 44) >> 2], f[g + 12] = Oa[d + (4 * g + 48) >> 2], f[g + 13] = Oa[d + (4 * g + 52) >> 2], f[g + 14] = Oa[d + (4 * g + 56) >> 2], f[g + 15] = Oa[d + (4 * g + 60) >> 2]
		} else f = Oa.subarray(d >> 2, d + 64 * b >> 2);
		GLctx.uniformMatrix4fv(Fe[a], !!c, f)
	},
	jb: function (a) {
		GLctx.useProgram(a ? De[a] : null)
	},
	M: function (a, b, c, d, f, g) {
		var h = E.Yc[a];
		assert(h, a);
		Ie ? (h.nd = !1, GLctx.vertexAttribPointer(a, b, c, !!d, f, g)) : (h.size = b, h.type = c, h.Od = d, h.td = f, h.cd = g, h.nd = !0, h.Rd = function (a, b, c, d, g, f) {
			this.vertexAttribPointer(a, b, c, d, g, f)
		})
	},
	ib: function (a, b, c, d) {
		GLctx.viewport(a, b, c, d)
	},
	t: function (a) {
		var b = Ye.sc[a];
		Ye.sc.splice(a, 1);
		qa(b)
	},
	s: Ye,
	hb: function () {
		k("trap!")
	},
	gb: function () {
		return 0
	},
	fb: function () {
		return 11
	},
	eb: function () {},
	db: function (a) {
		return Ze[a] || 0
	},
	cb: function () {},
	da: function (a) {
		if (0 == a) return v.qc;
		p[a >> 2] = $e;
		Ze[$e] = 0;
		$e++;
		return 0
	},
	bb: af,
	ca: function (a, b) {
		if (!(a in Ze)) return v.qc;
		Ze[a] = b;
		return 0
	},
	ab: function (a, b, c, d) {
		return gf(a, b, c, d)
	},
	a: Za,
	b: Wa,
	c: Xa
};
var Z = e.asm(e.Wd, e.Xd, buffer),
	tf = Z.__GLOBAL__I_000101;
Z.__GLOBAL__I_000101 = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return tf.apply(null, arguments)
};
var uf = Z.__GLOBAL__sub_I_bin_valuestorage_cpp;
Z.__GLOBAL__sub_I_bin_valuestorage_cpp = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return uf.apply(null, arguments)
};
var vf = Z.__GLOBAL__sub_I_bind_cpp;
Z.__GLOBAL__sub_I_bind_cpp = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return vf.apply(null, arguments)
};
var wf = Z.__GLOBAL__sub_I_event_cpp;
Z.__GLOBAL__sub_I_event_cpp = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return wf.apply(null, arguments)
};
var xf = Z.__GLOBAL__sub_I_event_handler_cpp;
Z.__GLOBAL__sub_I_event_handler_cpp = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return xf.apply(null, arguments)
};
var yf = Z.__GLOBAL__sub_I_iostream_cpp;
Z.__GLOBAL__sub_I_iostream_cpp = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return yf.apply(null, arguments)
};
var zf = Z.__GLOBAL__sub_I_web_interface_cpp;
Z.__GLOBAL__sub_I_web_interface_cpp = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return zf.apply(null, arguments)
};
var Af = Z.__ZSt18uncaught_exceptionv;
Z.__ZSt18uncaught_exceptionv = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Af.apply(null, arguments)
};
var Bf = Z.___cxa_can_catch;
Z.___cxa_can_catch = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Bf.apply(null, arguments)
};
var Cf = Z.___cxa_demangle;
Z.___cxa_demangle = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Cf.apply(null, arguments)
};
var Df = Z.___cxa_is_pointer_type;
Z.___cxa_is_pointer_type = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Df.apply(null, arguments)
};
var Ef = Z.___errno_location;
Z.___errno_location = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Ef.apply(null, arguments)
};
var Ff = Z.___getTypeName;
Z.___getTypeName = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Ff.apply(null, arguments)
};
var Gf = Z._fflush;
Z._fflush = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Gf.apply(null, arguments)
};
var Hf = Z._free;
Z._free = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Hf.apply(null, arguments)
};
var If = Z._llvm_bswap_i32;
Z._llvm_bswap_i32 = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return If.apply(null, arguments)
};
var Jf = Z._main;
Z._main = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Jf.apply(null, arguments)
};
var Kf = Z._malloc;
Z._malloc = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Kf.apply(null, arguments)
};
var Lf = Z._memmove;
Z._memmove = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Lf.apply(null, arguments)
};
var Mf = Z._pthread_cond_broadcast;
Z._pthread_cond_broadcast = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Mf.apply(null, arguments)
};
var Nf = Z._pthread_mutex_lock;
Z._pthread_mutex_lock = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Nf.apply(null, arguments)
};
var Of = Z._pthread_mutex_unlock;
Z._pthread_mutex_unlock = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Of.apply(null, arguments)
};
var Pf = Z._sbrk;
Z._sbrk = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Pf.apply(null, arguments)
};
var Qf = Z.establishStackSpace;
Z.establishStackSpace = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Qf.apply(null, arguments)
};
var Rf = Z.getTempRet0;
Z.getTempRet0 = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Rf.apply(null, arguments)
};
var Sf = Z.setTempRet0;
Z.setTempRet0 = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Sf.apply(null, arguments)
};
var Tf = Z.setThrew;
Z.setThrew = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Tf.apply(null, arguments)
};
var Uf = Z.stackAlloc;
Z.stackAlloc = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Uf.apply(null, arguments)
};
var Vf = Z.stackRestore;
Z.stackRestore = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Vf.apply(null, arguments)
};
var Wf = Z.stackSave;
Z.stackSave = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return Wf.apply(null, arguments)
};
e.asm = Z;
var ub = e.__GLOBAL__I_000101 = function () {
		assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.ob.apply(null, arguments)
	},
	xb = e.__GLOBAL__sub_I_bin_valuestorage_cpp = function () {
		assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.pb.apply(null, arguments)
	},
	zb = e.__GLOBAL__sub_I_bind_cpp = function () {
		assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.qb.apply(null, arguments)
	},
	vb = e.__GLOBAL__sub_I_event_cpp = function () {
		assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.rb.apply(null, arguments)
	},
	wb = e.__GLOBAL__sub_I_event_handler_cpp = function () {
		assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.sb.apply(null, arguments)
	},
	Ab = e.__GLOBAL__sub_I_iostream_cpp = function () {
		assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.tb.apply(null, arguments)
	},
	yb = e.__GLOBAL__sub_I_web_interface_cpp = function () {
		assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.ub.apply(null, arguments)
	},
	sf = e.__ZSt18uncaught_exceptionv = function () {
		assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.vb.apply(null, arguments)
	};
e.___cxa_can_catch = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.wb.apply(null, arguments)
};
e.___cxa_demangle = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.xb.apply(null, arguments)
};
e.___cxa_is_pointer_type = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.yb.apply(null, arguments)
};
e.___errno_location = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.zb.apply(null, arguments)
};
var jd = e.___getTypeName = function () {
		assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.Ab.apply(null, arguments)
	},
	ab = e._emscripten_replace_memory = function () {
		assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm._emscripten_replace_memory.apply(null,
			arguments)
	};
e._fflush = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Bb.apply(null, arguments)
};
var Ia = e._free = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Cb.apply(null, arguments)
};
e._llvm_bswap_i32 = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Db.apply(null, arguments)
};
e._main = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Eb.apply(null, arguments)
};
var Ha = e._malloc = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Fb.apply(null, arguments)
};
e._memmove = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Gb.apply(null, arguments)
};
e._pthread_cond_broadcast = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Hb.apply(null, arguments)
};
e._pthread_mutex_lock = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Ib.apply(null, arguments)
};
e._pthread_mutex_unlock = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Jb.apply(null, arguments)
};
e._sbrk = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Kb.apply(null, arguments)
};
e.establishStackSpace = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.fc.apply(null, arguments)
};
e.getTempRet0 = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.gc.apply(null, arguments)
};
e.setTempRet0 = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.hc.apply(null, arguments)
};
e.setThrew = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.ic.apply(null, arguments)
};
var ra = e.stackAlloc = function () {
		assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.jc.apply(null, arguments)
	},
	qa = e.stackRestore = function () {
		assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.kc.apply(null, arguments)
	},
	pa = e.stackSave = function () {
		assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
		assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
		return e.asm.lc.apply(null, arguments)
	};
e.dynCall_ff = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Lb.apply(null, arguments)
};
e.dynCall_i = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Mb.apply(null, arguments)
};
e.dynCall_ii = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Nb.apply(null, arguments)
};
e.dynCall_iii = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Ob.apply(null, arguments)
};
e.dynCall_iiii = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Pb.apply(null, arguments)
};
e.dynCall_iiiii = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Qb.apply(null, arguments)
};
e.dynCall_iiiiid = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Rb.apply(null, arguments)
};
e.dynCall_iiiiii = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Sb.apply(null, arguments)
};
e.dynCall_iiiiiid = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Tb.apply(null, arguments)
};
e.dynCall_iiiiiii = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Ub.apply(null, arguments)
};
e.dynCall_iiiiiiii = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Vb.apply(null, arguments)
};
e.dynCall_iiiiiiiii = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Wb.apply(null, arguments)
};
e.dynCall_iiiiij = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Xb.apply(null, arguments)
};
e.dynCall_v = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Yb.apply(null, arguments)
};
e.dynCall_vi = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.Zb.apply(null, arguments)
};
e.dynCall_vif = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm._b.apply(null, arguments)
};
e.dynCall_vii = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.$b.apply(null, arguments)
};
e.dynCall_viii = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.ac.apply(null, arguments)
};
e.dynCall_viiii = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.bc.apply(null, arguments)
};
e.dynCall_viiiii = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.cc.apply(null, arguments)
};
e.dynCall_viiiiii = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.dc.apply(null, arguments)
};
e.dynCall_viijii = function () {
	assert(r, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
	assert(!t, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
	return e.asm.ec.apply(null, arguments)
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
pb = function Xf() {
	e.calledRun || Yf();
	e.calledRun || (pb = Xf)
};
e.callMain = function (a) {
	assert(0 == nb, "cannot call main when async dependencies remain! (listen on __ATMAIN__)");
	assert(0 == eb.length, "cannot call main when preRun functions remain to be called");
	a = a || [];
	kb();
	var b = a.length + 1,
		c = ra(4 * (b + 1));
	p[c >> 2] = Da(e.thisProgram);
	for (var d = 1; d < b; d++) p[(c >> 2) + d] = Da(a[d - 1]);
	p[(c >> 2) + b] = 0;
	try {
		var f = e._main(b, c, 0);
		Zf();
		if (!e.noExitRuntime || 0 !== f) {
			if (!e.noExitRuntime && (wa = !0, Wa = void 0, $a(), db(ib), t = !0, e.onExit)) e.onExit(f);
			e.quit(f, new na(f))
		}
	} catch (g) {
		g instanceof na ||
			("SimulateInfiniteLoop" == g ? e.noExitRuntime = !0 : ((a = g) && "object" === typeof g && g.stack && (a = [g, g.stack]), l("exception thrown: " + a), e.quit(1, g)))
	} finally {}
};

function Yf(a) {
	function b() {
		if (!e.calledRun && (e.calledRun = !0, !wa)) {
			kb();
			$a();
			db(hb);
			if (e.onRuntimeInitialized) e.onRuntimeInitialized();
			e._main && $f && e.callMain(a);
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
		db(eb);
		0 < nb || e.calledRun ||
			(e.setStatus ? (e.setStatus("Running..."), setTimeout(function () {
				setTimeout(function () {
					e.setStatus("")
				}, 1);
				b()
			}, 1)) : b(), $a())
	}
}
e.run = Yf;

function Zf() {
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
				var b = dc(a, {
					Zc: !0
				});
				a = b.path
			} catch (q) {}
			var d = {
				fe: !1,
				exists: !1,
				error: 0,
				name: null,
				path: null,
				object: null,
				je: !1,
				le: null,
				ke: null
			};
			try {
				b = dc(a, {
					parent: !0
				}), d.je = !0, d.le = b.path, d.ke = b.node, d.name = Hb(a), b = dc(a, {
					Zc: !0
				}), d.exists = !0, d.path = b.path, d.object = b.node, d.name = b.node.name, d.fe = "/" === b.path
			} catch (q) {
				d.error = q.yc
			}
			d && (b = Lb[d.object.rdev]) && b.output && b.output.length &&
				(c = !0)
		})
	} catch (f) {}
	oa = a;
	l = b;
	c && ta("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.")
}
var ag = [];

function k(a) {
	if (e.onAbort) e.onAbort(a);
	void 0 !== a ? (oa(a), l(a), a = JSON.stringify(a)) : a = "";
	wa = !0;
	var b = "abort(" + a + ") at " + Ja() + "";
	ag && ag.forEach(function (c) {
		b = c(b, a)
	});
	throw b;
}
e.abort = k;
if (e.preInit)
	for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length;) e.preInit.pop()();
var $f = !0;
e.noInitialRun && ($f = !1);
e.noExitRuntime = !0;
Yf();