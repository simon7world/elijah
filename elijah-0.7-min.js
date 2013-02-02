/* Elijah JavaScript Collection Library v0.7 Copyright 2013 Simon P Chang. */
(function(){function k(a,b){var c=function(){};c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.uber=b.prototype}Object.prototype.toString=function(){var a=[],b;for(b in this)a.push(b+":"+(null===this[b]?"null":this[b].toString()));return"{"+a.join(",")+"}"};Array.prototype.toString=function(){var a=[],b;for(b in this)a.push(null===this[b]?"null":this[b].toString());return"["+a.join(",")+"]"};Date.prototype.toString=function(){return this.getMonth()+1+"/"+this.getDate()+"/"+this.getFullYear()+
" "+this.getHours()+":"+this.getMinutes()+":"+this.getSeconds()+"."+this.getMilliseconds()};String.prototype.toString=function(){return"'"+this+"'"};var m=function(){this._ctn};m.prototype={toString:function(){return this._ctn.toString()}};var j=function(){m.apply(this,arguments);this._ctn=[]};k(j,m);j.prototype={size:function(){return this._ctn.length},clear:function(){delete this._ctn;this._ctn=[]},set:function(a){void 0!==a&&this._ctn.push(a)},setRange:function(a){a instanceof Array&&a.length?
this._ctn=this._ctn.concat(a):a instanceof List&&(a.size&&a.size())&&(this._ctn=this._ctn.concat(a._ctn))},contains:function(a){return-1!==this._ctn.indexOf(a)},empty:function(){return 0===this.size()},toArray:function(){var a=[],b;for(b in this._ctn)a.push(this._ctn[b]);return a},each:function(a){if("function"===typeof a)for(var b in this._ctn)if(!1===a(b,this._ctn[b]))break},toString:j.uber.toString};var l=function(){m.apply(this,arguments);this._ctn={};this._size=0};k(l,m);l.prototype={size:function(){return this._size},
clear:function(){delete this._ctn;this._ctn={};this._size=0},get:function(a){return this._ctn[a]},containsKey:function(a){for(var b in this._ctn)if(b===a)return!0;return!1},remove:function(a){void 0!==a&&(delete this._ctn[a],this._size--)},removeByValue:function(a){for(var b in this._ctn)this._ctn[b]===a&&this.remove(b)},empty:function(){return 0===this._size},each:function(a){if("function"===typeof a)for(var b in this._ctn)if(!1===a(b,this._ctn[b]))break},keys:function(){var a=[],b;for(b in this._ctn)a.push(b);
return a},values:function(){var a=[],b;for(b in this._ctn)a.push(this._ctn[b]);return a},toString:l.uber.toString};var f=function(a){j.apply(this,arguments);this.setRange(a)};k(f,j);f.prototype={size:f.uber.size,clear:f.uber.clear,set:f.uber.set,get:function(a){return this._ctn[a]},setRange:f.uber.setRange,contains:f.uber.contains,indexOf:function(a){return this._ctn.indexOf(a)},lastIndexOf:function(a){return this._ctn.lastIndexOf(a)},indicesOf:function(a){var b=[],c;for(c in this._ctn)this._ctn[c]===
a&&b.push(parseInt(c,10));return b},empty:f.uber.empty,removeAt:function(a){0<=a&&a<this.size()&&this._ctn.splice(a,1)},removeRange:function(a,b){0<=a&&a<b&&this._ctn.splice(a,b-a)},remove:function(a){this.removeAt(this.indexOf(a))},removeLast:function(a){this.removeAt(this.lastIndexOf(a))},removeAll:function(a){if(void 0===a)this.clear();else for(var b=this.size();b--;)this._ctn[b]===a&&this.removeAt(b)},reverse:function(){this._ctn.reverse()},toArray:f.uber.toArray,each:f.uber.each,toString:f.uber.toString};
var d=function(){l.apply(this,arguments)};k(d,l);d.prototype={size:d.uber.size,clear:d.uber.clear,set:function(a,b){void 0!==a&&void 0!==b&&(void 0===this._ctn[a]&&this._size++,this._ctn[a]=b)},get:d.uber.get,getByValue:function(a){if(void 0!==a){var b=[],c;for(c in this._ctn)this._ctn[c]===a&&b.push(c);return b}},containsKey:d.uber.containsKey,containsValue:function(a){for(var b in this._ctn)if(this._ctn[b]===a)return!0;return!1},remove:d.uber.remove,removeByValue:d.uber.removeByValue,empty:d.uber.empty,
each:d.uber.each,keys:d.uber.keys,values:d.uber.values,toString:d.uber.toString};var h=function(a){j.apply(this,arguments);this.pushRange(a)};k(h,j);h.prototype={size:h.uber.size,clear:h.uber.clear,push:h.uber.set,pushRange:h.uber.setRange,contains:h.uber.contains,empty:h.uber.empty,toString:h.uber.toString,pop:function(){return this._ctn.pop()},peek:function(){return this._ctn[this.size()-1]},toArray:function(){for(var a=[],b=this.size();b--;)a.push(this._ctn[b]);return a},each:function(a){if("function"===
typeof a)for(;!this.empty()&&!1!==a(this.pop()););}};var g=function(a){j.apply(this,arguments);this.offerRange(a)};k(g,j);g.prototype={size:g.uber.size,clear:g.uber.clear,offer:g.uber.set,offerRange:g.uber.setRange,contains:g.uber.contains,empty:g.uber.empty,toArray:g.uber.toArray,toString:g.uber.toString,poll:function(){return this._ctn.shift()},peek:function(){return this._ctn[0]},each:function(a){if("function"===typeof a)for(;!this.empty()&&!1!==a(this.poll()););}};var e=function(){l.apply(this,
arguments)};k(e,l);e.prototype={size:e.uber.size,clear:e.uber.clear,get:e.uber.get,containsKey:e.uber.containsKey,remove:e.uber.remove,removeByValue:e.uber.removeByValue,empty:e.uber.empty,each:e.uber.each,keys:e.uber.keys,values:e.uber.values,toString:e.uber.toString,set:function(a,b){void 0!==a&&void 0!==b&&(void 0===this._ctn[a]&&(this._size++,this._ctn[a]=[]),-1===this._ctn[a].indexOf(b)&&this._ctn[a].push(b))},getByValue:function(a){if(void 0!==a){var b=[],c;for(c in this._ctn)-1!==this._ctn[c].indexOf(a)&&
b.push(c);return b}},getNumberOfValues:function(a){if(void 0!==a&&this._ctn[a])return this._ctn[a].length},containsValue:function(a){for(var b in this._ctn)if(-1!==this._ctn[b].indexOf(a))return!0;return!1},removeByContainsValue:function(a){for(var b in this._ctn)-1!==this._ctn[b].indexOf(a)&&this.remove(b)},removeValue:function(a){for(var b in this._ctn)var c=-1!==this._ctn[b].indexOf(a)&&(1===this._ctn[b].length?this.remove(b):this._ctn[b].splice(c,1))}};window.List=f;window.Map=d;window.Stack=
h;window.Queue=g;window.MultiMap=e})();