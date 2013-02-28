/**
 * Elijah JavaScript Collection Library v1.0
 * Copyright 2013 Simon P Chang.
 * 
 * Author: Simon P Chang
 * Email: simon.zsh.peter@gmail.com
 * Date: Thu, Feb 28, 2013
 * 
 **/

(function () {

// Override toString Method
Object.prototype.toString = function () {
	var arr = [], m = this;
	for (var k in m) arr.push(k + ":" + (m[k] === null ? "null" : m[k].toString()));
	return "{" + arr.join(",") + "}";
}
Array.prototype.toString = function () {
	var arr = [], m = this;
	for (var i in m) arr.push(m[i] === null ? "null" : m[i].toString());
	return "[" + arr.join(",") + "]";
}
Date.prototype.toString = function () {
	var m = this;
	return m.getMonth() + 1 + "/" + m.getDate() + "/" + m.getFullYear() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds() + "." + m.getMilliseconds();
}
String.prototype.toString = function () {
	return "'" + this + "'";
}

// Override undefined
var undefined;

// Elijah Class
var _elj = function () {}
_elj.prototype.toString = function () {
	return this._ctn.toString();
}

// The [] Implementation Class's Parent
var _ai = function () {
	_elj.apply(this, arguments);
	this._ctn = [];
}
extend(_ai, _elj);
_ai.prototype = {
	size: function () {
		return this._ctn.length;
	},
	clear: function () {
		delete this._ctn, this._ctn = [];
	},
	set: function (v) {
		v !== undefined && this._ctn.push(v);
	},
	setRange: function (vs) {
		var m = this;
		if (vs instanceof Array && vs.length) m._ctn = m._ctn.concat(vs);
		else if (vs instanceof List && vs.size && vs.size()) m._ctn = m._ctn.concat(vs._ctn);
	},
	contains: function (v) {
		return this._ctn.indexOf(v) !== -1;
	},
	empty: function () {
		return this.size() === 0;
	},
	toArray: function () {
		var newArr = [];
		for (var i in this._ctn) newArr.push(this._ctn[i]);
		return newArr;
	},
	each: function (fn) {
		if (typeof fn === "function")
			for (var i in this._ctn) if (fn(parseInt(i, 10), this._ctn[i]) === false) break;
	},
	toString: _ai.b.toString
}

// The {} Implementation Class's Parent
var _oi = function () {
	_elj.apply(this, arguments);
	this._ctn = {}, this._size = 0;
}
extend(_oi, _elj);
_oi.prototype = {
	size: function () {
		return this._size;
	},
	clear: function () {
		delete this._ctn, this._ctn = {}, this._size = 0;
	},
	get: function (k) {
		return this._ctn[k];
	},
	containsKey: function (k) {
		for (var key in this._ctn)
			if (key === k) return true;
		return false;
	},
	remove: function (k) {
		k !== undefined && (delete this._ctn[k], this._size--);
	},
	removeByValue: function (v) {
		for (var k in this._ctn)
			this._ctn[k] === v && this.remove(k);
	},
	empty: function () {
		return this._size === 0;
	},
	keys: function () {
		var ks = [];
		for (var k in this._ctn) ks.push(k);
		return ks;
	},
	values: function () {
		var vs = [];
		for (var k in this._ctn) vs.push(this._ctn[k]);
		return vs;
	},
	toString: _oi.b.toString
}

// List Class
var _l = function (vs) {
	_ai.apply(this, arguments);
	this.setRange(vs);
}
extend(_l, _ai);
_l.prototype = {
	size: _l.b.size,
	clear: _l.b.clear,
	set: _l.b.set,
	get: function (i) {
		return this._ctn[i];
	},
	setRange: _l.b.setRange,
	insert: function (i, v) {
		i >= 0 && i <= this.size() && v !== undefined && this._ctn.splice(i, 0, v);
	},
	insertRange: function (i, vs) {
		var arr;
		if (vs instanceof Array && vs.length) arr = vs;
		else if (vs instanceof List && vs.size && vs.size()) arr = vs._ctn;
		if (arr) for (var j = arr.length; j--;) this.insert(i, arr[j]);
	},
	contains: _l.b.contains,
	indexOf: function (v) {
		return this._ctn.indexOf(v);
	},
	lastIndexOf: function (v) {
		return this._ctn.lastIndexOf(v);
	},
	indicesOf: function (v) {
		var inds = [];
		for (var i in this._ctn)
			this._ctn[i] === v && inds.push(parseInt(i, 10));
		return inds;
	},
	empty: _l.b.empty,
	removeAt: function (i) {
		i >= 0 && i < this.size() && this._ctn.splice(i, 1);
	},
	removeRange: function (fi, ti) {
		fi >= 0 && fi < ti && this._ctn.splice(fi, ti - fi);
	},
	remove: function (v) {
		this.removeAt(this.indexOf(v));
	},
	removeLast: function (v) {
		this.removeAt(this.lastIndexOf(v));
	},
	removeAll: function (v) {
		var m = this;
		if (v === undefined) m.clear();
		else for (var i = m.size(); i--;)
			m._ctn[i] === v && m.removeAt(i);
	},
	reverse: function () {
		this._ctn.reverse();
	},
	sub: function (fi, ti) {
		if (fi >= 0 && ti <= this.size()) {
			var l = new List();
			while (fi < ti) l.set(this._ctn[fi++]);
			return l;
		}
	},
	toArray: _l.b.toArray,
	each: _l.b.each,
	filter: function(fn) {
		if (typeof fn === "function") {
			var l = new _l();
			for (var i in this._ctn) fn(parseInt(i, 10), this._ctn[i]) === true && l.set(this._ctn[i]);
			return l;
		}
	},
	toString: _l.b.toString
}

// Map Class
var _m = function () {
	_oi.apply(this, arguments);
}
extend(_m, _oi);
_m.prototype = {
	size: _m.b.size,
	clear: _m.b.clear,
	set: function (k, v) {
		if (k !== undefined && v !== undefined) {
			this.containsKey(k) || this._size++;
			this._ctn[k] = v;
		}
	},
	get: _m.b.get,
	getByValue: function (v) {
		if (v !== undefined) {
			var ks = [];
			for (var k in this._ctn) this._ctn[k] === v && ks.push(k);
			return ks;
		}
	},
	containsKey: _m.b.containsKey,
	containsValue: function (v) {
		for (var k in this._ctn)
			if (this._ctn[k] === v) return true;
		return false;
	},
	remove: _m.b.remove,
	removeByValue: _m.b.removeByValue,
	empty: _m.b.empty,
	each: function (fn) {
		if (typeof fn === "function")
			for (var k in this._ctn) if (fn(k, this._ctn[k]) === false) break;
	},
	filter: function(fn) {
		if (typeof fn === "function") {
			var m = new _m();
			for (var k in this._ctn) fn(k, this._ctn[k]) === true && m.set(k, this._ctn[k]);
			return m;
		}
	},
	keys: _m.b.keys,
	values: _m.b.values,
	toString: _m.b.toString
}

// Stack Class
var _s = function (vs) {
	_ai.apply(this, arguments);
	this.pushRange(vs);
}
extend(_s, _ai);
_s.prototype = {
	size: _s.b.size,
	clear: _s.b.clear,
	push: _s.b.set,
	pushRange: _s.b.setRange,
	contains: _s.b.contains,
	empty: _s.b.empty,
	toString: _s.b.toString,
	pop: function () {
		return this._ctn.pop();
	},
	peek: function () {
		return this._ctn[this.size() - 1];
	},
	toArray: function () {
		var newArr = [];
		for (var i = this.size(); i--;) newArr.push(this._ctn[i]);
		return newArr;
	},
	each: function (fn) {
		if (typeof fn === "function")
			while (!this.empty()) if (fn(this.pop()) === false) break;
	}
}

// Queue Class
var _q = function (vs) {
	_ai.apply(this, arguments);
	this.offerRange(vs);
}
extend(_q, _ai);
_q.prototype = {
	size: _q.b.size,
	clear: _q.b.clear,
	offer: _q.b.set,
	offerRange: _q.b.setRange,
	contains: _q.b.contains,
	empty: _q.b.empty,
	toArray: _q.b.toArray,
	toString: _q.b.toString,
	poll: function () {
		return this._ctn.shift();
	},
	peek: function () {
		return this._ctn[0];
	},
	each: function (fn) {
		if (typeof fn === "function")
			while (!this.empty()) if (fn(this.poll()) === false) break;
	}
}

// MultiMap Class
var _mm = function () {
	_oi.apply(this, arguments);
}
extend(_mm, _oi);
_mm.prototype = {
	size: _mm.b.size,
	clear: _mm.b.clear,
	get: _mm.b.get,
	containsKey: _mm.b.containsKey,
	remove: _mm.b.remove,
	removeByValue: _mm.b.removeByValue,
	empty: _mm.b.empty,
	keys: _mm.b.keys,
	values: _mm.b.values,
	toString: _mm.b.toString,
	set: function (k, v) {
		if (k !== undefined && v !== undefined) {
			var m = this;
			m._ctn[k] === undefined && (m._size++, m._ctn[k] = []);
			m._ctn[k].indexOf(v) === -1 && m._ctn[k].push(v);
		}
	},
	getByValue: function (v) {
		if (v !== undefined) {
			var ks = [];
			for (var k in this._ctn) this._ctn[k].indexOf(v) !== -1 && ks.push(k);
			return ks;
		}
	},
	getNumberOfValues: function (k) {
		if (k !== undefined && this._ctn[k]) return this._ctn[k].length;
	},
	containsValue: function (v) {
		for (var k in this._ctn)
			if (this._ctn[k].indexOf(v) !== -1) return true;
		return false;
	},
	removeByContainsValue: function (v) {
		for (var k in this._ctn)
			this._ctn[k].indexOf(v) !== -1 && this.remove(k);
	},
	removeValue: function (v) {
		var m = this;
		for (var k in m._ctn)
			var i = m._ctn[k].indexOf(v) !== -1 && (m._ctn[k].length === 1 ? m.remove(k) : m._ctn[k].splice(i, 1));
	},
	each: function (fn) {
		if (typeof fn === "function")
			for (var k in this._ctn) {
				var arr = this._ctn[k];
				for (var i in arr) if (fn(k, arr[i]) === false) break;
			}
	},
	filter: function(fn) {
		if (typeof fn === "function") {
			var mm = new _mm();
			for (var k in this._ctn) {
				var arr = this._ctn[k];
				for (var i in arr) fn(k, arr[i]) === true && mm.set(k, arr[i]);
			}
			return mm;
		}
	}
}

// TreeMap Class
var _tm = function () {
	_m.apply(this, arguments);
}
extend(_tm, _m);
_tm.prototype = {
	size: _tm.b.size,
	clear: _tm.b.clear,
	get: _tm.b.get,
	getByValue: _tm.b.getByValue,
	containsKey: _tm.b.containsKey,
	containsValue: _tm.b.containsValue,
	remove: _tm.b.remove,
	removeByValue: _tm.b.removeByValue,
	empty: _tm.b.empty,
	each: _tm.b.each,
	filter: _tm.b.each,
	keys: _tm.b.keys,
	values: _tm.b.values,
	toString: _tm.b.toString,
	set: function (k, v) {
		if (k !== undefined && v !== undefined) {
			var m = this;
			if (m._ctn[k] !== undefined || m.size() === 0) m._ctn[k] = v, m.size() === 0 && m._size++;
			else {
				var o = {};
				for (var ck in m._ctn) ck > k && (o[k] = v), o[ck] = m._ctn[ck];
				delete m._ctn, m._ctn = o, m._size++;
			}
		}
	}
}

// TreeSet Class
var _ts = function (vs) {
	_l.apply(this, arguments);
	this.setRange(vs);
}
extend(_ts, _l);
_ts.prototype = {
	size: _ts.b.size,
	clear: _ts.b.clear,
	contains: _ts.b.contains,
	empty: _ts.b.empty,
	remove: _ts.b.remove,
	toArray: _ts.b.toArray,
	toString: _ts.b.toString,
	set: function (v) {
		if (v !== undefined && !this.contains(v)) {
			var m = this, s = m.size();
			if (s === 0 || rep(m._ctn[s - 1]) < rep(v)) m._ctn.push(v);
			else for (var i in m._ctn)
				if (rep(m._ctn[i]) > rep(v)) {
					m._ctn.splice(i, 0, v); break;
				}
		}
		
		function rep(s) {
			return s === null ? "null" : s.toString().replace(/^'/, "").replace(/'$/, "");
		}
	},
	setRange: function (vs) {
		var arr = [];
		if (vs instanceof Array && vs.length) arr = vs;
		else if (vs instanceof List && vs.size && vs.size()) arr = vs._ctn;
		for (var i in arr) this.set(arr[i]);
	},
	each: function (fn) {
		if (typeof fn === "function")
			for (var i in this._ctn) if (fn(this._ctn[i]) === false) break;
	},
	filter: function (fn) {
		if (typeof fn === "function") {
			var ts = new _ts();
			for (var i in this._ctn) fn(this._ctn[i]) === true && ts.set(this._ctn[i]);
			return ts;
		}
	}
}

// BiMap Class
var _bm = function () {
	_m.apply(this, arguments);
}
extend(_bm, _m);
_bm.prototype = {
	size: _bm.b.size,
	clear: _bm.b.clear,
	get: _bm.b.get,
	containsKey: _bm.b.containsKey,
	containsValue: _bm.b.containsValue,
	remove: _bm.b.remove,
	removeByValue: _bm.b.removeByValue,
	empty: _bm.b.empty,
	each: _bm.b.each,
	filter: _bm.b.filter,
	keys: _bm.b.keys,
	values: _bm.b.values,
	toString: _bm.b.toString,
	set: function (k, v) {
		var m = this;
		k === undefined || v === undefined || m.containsKey(k) || m.containsValue(v) || (m._ctn[k] = v, m._size++);
	},
	getByValue: function (v) {
		if (v !== undefined) {
			var f;
			for (var k in this._ctn) this._ctn[k] === v && (f = k);
			return f;
		}
	}
}

// Add Class to Window
window.List = _l, window.Map = _m, window.Stack = _s, window.Queue = _q, window.MultiMap = _mm, window.TreeMap = _tm, window.TreeSet = _ts, window.BiMap = _bm;

// Class Extend Method
function extend(C, P) {
	var T = function () {};
	T.prototype = P.prototype;
	C.prototype = new T();
	C.prototype.constructor = C;
	C.b = P.prototype;
}

}());