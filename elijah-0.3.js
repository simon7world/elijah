/**
 * Elijah JavaScript Collection Library v0.3
 * Copyright 2013 Simon P Chang.
 * 
 * Author: Simon P Chang
 * Email: simon.zsh.peter@gmail.com
 * Date: SUN, JAN 27 2013
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

// List Class
var _l = function (vs) {
	this._arr = [];
	this.setRange(vs);
}
_l.prototype = {
	size: function () {
		return this._arr.length;
	},
	clear: function () {
		this._arr = [];
	},
	set: function (v) {
		v !== undefined && this._arr.push(v);
	},
	get: function (i) {
		return this._arr[i];
	},
	setRange: function (vs) {
		if (vs && vs.length) this._arr = this._arr.concat(vs);
		else if (vs && vs.size && vs.size()) this._arr = this._arr.concat(vs._arr);
	},
	contains: function (v) {
		return this._arr.indexOf(v) !== -1;
	},
	indexOf: function (v) {
		return this._arr.indexOf(v);
	},
	lastIndexOf: function (v) {
		return this._arr.lastIndexOf(v);
	},
	indicesOf: function (v) {
		var inds = [];
		for (var i in this._arr)
			this._arr[i] === v && inds.push(parseInt(i, 10));
		return inds;
	},
	isEmpty: function () {
		return this._arr.length === 0;
	},
	removeAt: function (i) {
		i >= 0 && i < this._arr.length && this._arr.splice(i, 1);
	},
	remove: function (v) {
		this.removeAt(this.indexOf(v));
	},
	removeLast: function (v) {
		this.removeAt(this.lastIndexOf(v));
	},
	removeAll: function (v) {
		if (v === undefined) this.clear();
		else for (var i = this._arr.length - 1; i >= 0; i--)
			this._arr[i] === v && this.removeAt(i);
	},
	reverse: function () {
		this._arr.reverse();
	},
	toArray: function () {
		var newArr = [];
		for (var i in this._arr) newArr.push(this._arr[i]);
		return newArr;
	},
	each: function (fn) {
		if (typeof fn === "function")
			for (var i in this._arr) fn(i, this._arr[i]);
	},
	toString: function () {
		return this._arr.toString();
	}
}

// Map Class
var _m = function () {
	this._map = {}, this._size = 0;
}
_m.prototype = {
	size: function () {
		return this._size;
	},
	clear: function () {
		this._map = {};
		this._size = 0;
	},
	set: function (k, v) {
		if (k !== undefined && v !== undefined) {
			this._map[k] === undefined && this._size++;
			this._map[k] = v;
		}
	},
	get: function (k) {
		return this._map[k];
	},
	getByValue: function (v) {
		if (v !== undefined) {
			var ks = [];
			for (var k in this._map) this._map[k] === v && ks.push(k);
			return ks;
		}
	},
	containsKey: function (k) {
		for (var key in this._map)
			if (key === k) return true;
		return false;
	},
	containsValue: function (v) {
		for (var k in this._map)
			if (this._map[k] === v) return true;
		return false;
	},
	remove: function (k) {
		k !== undefined && (delete this._map[k], this._size--);
	},
	removeByValue: function (v) {
		for (var k in this._map)
			this._map[k] === v && this.remove(k); 
	},
	isEmpty: function () {
		return this._size === 0;
	},
	each: function (fn) {
		if (typeof fn === "function")
			for (var k in this._map) fn(k, this._map[k]);
	},
	keys: function () {
		var ks = [];
		for (var k in this._map) ks.push(k);
		return ks;
	},
	values: function () {
		var vs = [];
		for (var k in this._map) vs.push(this._map[k]);
		return vs;
	},
	toString: function () {
		return this._map.toString();
	}
}

// Add Class to Window
window.List = _l;
window.Map = _m;

}());