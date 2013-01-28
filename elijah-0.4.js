/**
 * Elijah JavaScript Collection Library v0.4
 * Copyright 2013 Simon P Chang.
 * 
 * Author: Simon P Chang
 * Email: simon.zsh.peter@gmail.com
 * Date: SUN, JAN 28 2013
 * 
 **/

(function () {

// Override toString Method
Object.prototype.toString = function () {
	var arr = [];
	for (var k in this) arr.push(k + ":" + (this[k] === null ? "null" : this[k].toString()));
	return "{" + arr.join(",") + "}";
}
Array.prototype.toString = function () {
	var arr = [];
	for (var i in this) arr.push(this[i] === null ? "null" : this[i].toString());
	return "[" + arr.join(",") + "]";
}
Date.prototype.toString = function () {
	return this.getMonth() + 1 + "/" + this.getDate() + "/" + this.getFullYear() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds() + "." + this.getMilliseconds();
}
String.prototype.toString = function () {
	return "'" + this + "'";
}

function extend(Child, Parent) {
	var O = function () {};
	O.prototype = Parent.prototype;
	Child.prototype = new O();
	Child.prototype.constructor = Child;
	Child.uber = Parent.prototype;
}

// Elijah Class
var _elj = function () {
	this._ctn;
}
_elj.prototype = {
	toString: function () {
		return this._ctn.toString();
	}
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
		this._ctn = [];
	},
	set: function (v) {
		v !== undefined && this._ctn.push(v);
	},
	setRange: function (vs) {
		if (vs instanceof Array && vs.length) this._ctn = this._ctn.concat(vs);
		else if (vs instanceof List && vs.size && vs.size()) this._ctn = this._ctn.concat(vs._ctn);
	},
	contains: function (v) {
		return this._ctn.indexOf(v) !== -1;
	},
	empty: function () {
		return this._ctn.length === 0;
	},
	toArray: function () {
		var newArr = [];
		for (var i in this._ctn) newArr.push(this._ctn[i]);
		return newArr;
	},
	each: function (fn) {
		if (typeof fn === "function")
			for (var i in this._ctn) if (fn(i, this._ctn[i]) === false) break;
	},
	toString: _ai.uber.toString
}

// The {} Implementation Class's Parent
var _oi = function () {
	_elj.apply(this, arguments);
	this._ctn = {}, this._size = 0;
}
extend(_oi, _elj);
_oi.prototype = {
	
	toString: _oi.uber.toString
}

// List Class
var _l = function (vs) {
	_ai.apply(this, arguments);
	this.setRange(vs);
}
extend(_l, _ai);
_l.prototype = {
	size: _l.uber.size,
	clear: _l.uber.clear,
	set: _l.uber.set,
	get: function (i) {
		return this._ctn[i];
	},
	setRange: _l.uber.setRange,
	contains: _l.uber.contains,
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
	empty: _l.uber.empty,
	removeAt: function (i) {
		i >= 0 && i < this._ctn.length && this._ctn.splice(i, 1);
	},
	remove: function (v) {
		this.removeAt(this.indexOf(v));
	},
	removeLast: function (v) {
		this.removeAt(this.lastIndexOf(v));
	},
	removeAll: function (v) {
		if (v === undefined) this.clear();
		else for (var i = this._ctn.length - 1; i >= 0; i--)
			this._ctn[i] === v && this.removeAt(i);
	},
	reverse: function () {
		this._ctn.reverse();
	},
	toArray: _l.uber.toArray,
	each: _l.uber.each,
	toString: _l.uber.toString
}

// Map Class
var _m = function () {
	_oi.apply(this, arguments);
}
extend(_m, _elj);
_m.prototype = {
	size: function () {
		return this._size;
	},
	clear: function () {
		this._ctn = {};
		this._size = 0;
	},
	set: function (k, v) {
		if (k !== undefined && v !== undefined) {
			this._ctn[k] === undefined && this._size++;
			this._ctn[k] = v;
		}
	},
	get: function (k) {
		return this._ctn[k];
	},
	getByValue: function (v) {
		if (v !== undefined) {
			var ks = [];
			for (var k in this._ctn) this._ctn[k] === v && ks.push(k);
			return ks;
		}
	},
	containsKey: function (k) {
		for (var key in this._ctn)
			if (key === k) return true;
		return false;
	},
	containsValue: function (v) {
		for (var k in this._ctn)
			if (this._ctn[k] === v) return true;
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
	each: function (fn) {
		if (typeof fn === "function")
			for (var k in this._ctn) if (fn(k, this._ctn[k]) === false) break;
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
	toString: _m.uber.toString
}

// Stack Class
var _s = function (vs) {
	_ai.apply(this, arguments);
	this.pushRange(vs);
}
extend(_s, _ai);
_s.prototype = {
	size: _s.uber.size,
	clear: _s.uber.clear,
	push: _s.uber.set,
	pop: function () {
		return this._ctn.pop();
	},
	pushRange: _s.uber.setRange,
	peek: function () {
		return this._ctn[this._ctn.length - 1];
	},
	contains: _s.uber.contains,
	empty: _s.uber.empty,
	toArray: function () {
		var newArr = [];
		for (var i = this._ctn.length - 1; i >= 0; i--) newArr.push(this._ctn[i]);
		return newArr;
	},
	each: function (fn) {
		if (typeof fn === "function")
			while (!this.empty()) if (fn(this.pop()) === false) break;
	},
	toString: _s.uber.toString
}

// Add Class to Window
window.List = _l;
window.Map = _m;
window.Stack = _s;

}());