/* Elijah JavaScript Collection Library v0.8 Copyright 2013 Simon P Chang. */
(function(){function l(a,b){var c=function(){};c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.uber=b.prototype}Object.prototype.toString=function(){var a=[],b;for(b in this)a.push(b+":"+(null===this[b]?"null":this[b].toString()));return"{"+a.join(",")+"}"};Array.prototype.toString=function(){var a=[],b;for(b in this)a.push(null===this[b]?"null":this[b].toString());return"["+a.join(",")+"]"};Date.prototype.toString=function(){return this.getMonth()+1+"/"+this.getDate()+"/"+this.getFullYear()+
" "+this.getHours()+":"+this.getMinutes()+":"+this.getSeconds()+"."+this.getMilliseconds()};String.prototype.toString=function(){return"'"+this+"'"};var n=function(){this._ctn};n.prototype={toString:function(){return this._ctn.toString()}};var k=function(){n.apply(this,arguments);this._ctn=[]};l(k,n);k.prototype={size:function(){return this._ctn.length},clear:function(){delete this._ctn;this._ctn=[]},set:function(a){void 0!==a&&this._ctn.push(a)},setRange:function(a){a instanceof Array&&a.length?
this._ctn=this._ctn.concat(a):a instanceof List&&(a.size&&a.size())&&(this._ctn=this._ctn.concat(a._ctn))},contains:function(a){return-1!==this._ctn.indexOf(a)},empty:function(){return 0===this.size()},toArray:function(){var a=[],b;for(b in this._ctn)a.push(this._ctn[b]);return a},each:function(a){if("function"===typeof a)for(var b in this._ctn)if(!1===a(parseInt(b,10),this._ctn[b]))break},toString:k.uber.toString};var m=function(){n.apply(this,arguments);this._ctn={};this._size=0};l(m,n);m.prototype=
{size:function(){return this._size},clear:function(){delete this._ctn;this._ctn={};this._size=0},get:function(a){return this._ctn[a]},containsKey:function(a){for(var b in this._ctn)if(b===a)return!0;return!1},remove:function(a){void 0!==a&&(delete this._ctn[a],this._size--)},removeByValue:function(a){for(var b in this._ctn)this._ctn[b]===a&&this.remove(b)},empty:function(){return 0===this._size},keys:function(){var a=[],b;for(b in this._ctn)a.push(b);return a},values:function(){var a=[],b;for(b in this._ctn)a.push(this._ctn[b]);
return a},toString:m.uber.toString};var g=function(a){k.apply(this,arguments);this.setRange(a)};l(g,k);g.prototype={size:g.uber.size,clear:g.uber.clear,set:g.uber.set,get:function(a){return this._ctn[a]},setRange:g.uber.setRange,insert:function(a,b){0<=a&&a<=this.size()&&void 0!==b&&this._ctn.splice(a,0,b)},insertRange:function(a,b){var c;b instanceof Array&&b.length?c=b:b instanceof List&&(b.size&&b.size())&&(c=b._ctn);if(c)for(var d=c.length;d--;)this.insert(a,c[d])},contains:g.uber.contains,indexOf:function(a){return this._ctn.indexOf(a)},
lastIndexOf:function(a){return this._ctn.lastIndexOf(a)},indicesOf:function(a){var b=[],c;for(c in this._ctn)this._ctn[c]===a&&b.push(parseInt(c,10));return b},empty:g.uber.empty,removeAt:function(a){0<=a&&a<this.size()&&this._ctn.splice(a,1)},removeRange:function(a,b){0<=a&&a<b&&this._ctn.splice(a,b-a)},remove:function(a){this.removeAt(this.indexOf(a))},removeLast:function(a){this.removeAt(this.lastIndexOf(a))},removeAll:function(a){if(void 0===a)this.clear();else for(var b=this.size();b--;)this._ctn[b]===
a&&this.removeAt(b)},reverse:function(){this._ctn.reverse()},sub:function(a,b){if(0<=a&&b<=this.size()){for(var c=new List;a<b;)c.set(this._ctn[a++]);return c}},toArray:g.uber.toArray,each:g.uber.each,filter:function(a){if("function"===typeof a){var b=new g,c;for(c in this._ctn)!0===a(parseInt(c,10),this._ctn[c])&&b.set(this._ctn[c]);return b}},toString:g.uber.toString};var e=function(){m.apply(this,arguments)};l(e,m);e.prototype={size:e.uber.size,clear:e.uber.clear,set:function(a,b){void 0!==a&&
void 0!==b&&(void 0===this._ctn[a]&&this._size++,this._ctn[a]=b)},get:e.uber.get,getByValue:function(a){if(void 0!==a){var b=[],c;for(c in this._ctn)this._ctn[c]===a&&b.push(c);return b}},containsKey:e.uber.containsKey,containsValue:function(a){for(var b in this._ctn)if(this._ctn[b]===a)return!0;return!1},remove:e.uber.remove,removeByValue:e.uber.removeByValue,empty:e.uber.empty,each:function(a){if("function"===typeof a)for(var b in this._ctn)if(!1===a(b,this._ctn[b]))break},filter:function(a){if("function"===
typeof a){var b=new e,c;for(c in this._ctn)!0===a(c,this._ctn[c])&&b.set(c,this._ctn[c]);return b}},keys:e.uber.keys,values:e.uber.values,toString:e.uber.toString};var j=function(a){k.apply(this,arguments);this.pushRange(a)};l(j,k);j.prototype={size:j.uber.size,clear:j.uber.clear,push:j.uber.set,pushRange:j.uber.setRange,contains:j.uber.contains,empty:j.uber.empty,toString:j.uber.toString,pop:function(){return this._ctn.pop()},peek:function(){return this._ctn[this.size()-1]},toArray:function(){for(var a=
[],b=this.size();b--;)a.push(this._ctn[b]);return a},each:function(a){if("function"===typeof a)for(;!this.empty()&&!1!==a(this.pop()););}};var h=function(a){k.apply(this,arguments);this.offerRange(a)};l(h,k);h.prototype={size:h.uber.size,clear:h.uber.clear,offer:h.uber.set,offerRange:h.uber.setRange,contains:h.uber.contains,empty:h.uber.empty,toArray:h.uber.toArray,toString:h.uber.toString,poll:function(){return this._ctn.shift()},peek:function(){return this._ctn[0]},each:function(a){if("function"===
typeof a)for(;!this.empty()&&!1!==a(this.poll()););}};var f=function(){m.apply(this,arguments)};l(f,m);f.prototype={size:f.uber.size,clear:f.uber.clear,get:f.uber.get,containsKey:f.uber.containsKey,remove:f.uber.remove,removeByValue:f.uber.removeByValue,empty:f.uber.empty,keys:f.uber.keys,values:f.uber.values,toString:f.uber.toString,set:function(a,b){void 0!==a&&void 0!==b&&(void 0===this._ctn[a]&&(this._size++,this._ctn[a]=[]),-1===this._ctn[a].indexOf(b)&&this._ctn[a].push(b))},getByValue:function(a){if(void 0!==
a){var b=[],c;for(c in this._ctn)-1!==this._ctn[c].indexOf(a)&&b.push(c);return b}},getNumberOfValues:function(a){if(void 0!==a&&this._ctn[a])return this._ctn[a].length},containsValue:function(a){for(var b in this._ctn)if(-1!==this._ctn[b].indexOf(a))return!0;return!1},removeByContainsValue:function(a){for(var b in this._ctn)-1!==this._ctn[b].indexOf(a)&&this.remove(b)},removeValue:function(a){for(var b in this._ctn)var c=-1!==this._ctn[b].indexOf(a)&&(1===this._ctn[b].length?this.remove(b):this._ctn[b].splice(c,
1))},each:function(a){if("function"===typeof a)for(var b in this._ctn){var c=this._ctn[b],d;for(d in c)if(!1===a(b,c[d]))break}},filter:function(a){if("function"===typeof a){var b=new f,c;for(c in this._ctn){var d=this._ctn[c],e;for(e in d)!0===a(c,d[e])&&b.set(c,d[e])}return b}}};var d=function(){e.apply(this,arguments)};l(d,e);d.prototype={size:d.uber.size,clear:d.uber.clear,get:d.uber.get,getByValue:d.uber.getByValue,containsKey:d.uber.containsKey,containsValue:d.uber.containsValue,remove:d.uber.remove,
removeByValue:d.uber.removeByValue,empty:d.uber.empty,each:d.uber.each,filter:d.uber.each,keys:d.uber.keys,values:d.uber.values,toString:d.uber.toString,set:function(a,b){if(void 0!==a&&void 0!==b)if(void 0!==this._ctn[a]||0===this.size())this._ctn[a]=b,0===this.size()&&this._size++;else{var c={},d;for(d in this._ctn)d>a&&(c[a]=b),c[d]=this._ctn[d];delete this._ctn;this._ctn=c;this._size++}}};window.List=g;window.Map=e;window.Stack=j;window.Queue=h;window.MultiMap=f;window.TreeMap=d})();