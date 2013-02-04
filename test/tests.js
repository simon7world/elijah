module("toString Testing");
test ("Object", function () {
	equal({a: 1, b: 2}.toString(), "{a:1,b:2}");
});
test ("Array", function () {
	equal([1, 2, 3].toString(), "[1,2,3]");
});
test ("Date", function () {
	equal(new Date(1274, 10, 21, 14, 40, 04, 124).toString(), "11/21/1274 14:40:4.124");
});
test ("String", function () {
	equal("sim".toString(), "'sim'");
});


module("List Method Testing", {
	setup: function() {
		list = new List();
		list.set("123");
		list.set(456);
		list.set(null);
		list.set(undefined);
		list.set();
	},
	teardown: function() {
		delete list;
	}
});
test ("toString", function () {
	equal(list.toString(), "['123',456,null]");
});
test ("new", function () {
	equal(typeof list, "object");
	var arr = [1, 2, 3];
	var newList = new List(arr);
	equal(typeof newList, "object");
	equal(newList.toString(), [1, 2, 3].toString());
	arr.pop();
	equal(newList.toString(), [1, 2, 3].toString());
});
test ("size", function () {
	equal(list.size(), 3);
});
test ("clear", function () {
	list.clear();
	equal(list.size(), 0);
});
test ("get", function () {
	equal(list.get(0), "123");
	equal(list.get(3), undefined);
	equal(list.get(undefined), undefined);
	equal(list.get(), undefined);
});
test ("setRange", function () {
	var tmpList = new List(["1", "2", "3"]);
	list.setRange(tmpList);
	list.setRange("4");
	list.setRange(undefined);
	list.setRange();
	equal(list.get(3), "1");
	equal(list.get(4), "2");
	tmpList.clear();
	equal(list.get(5), "3");
	equal(list.get(6), undefined);
});
test ("contains", function () {
	ok(list.contains(456));
	ok(!list.contains("456"));
	ok(!list.contains(undefined));
	ok(!list.contains());
});
test ("indexOf", function () {
	equal(list.indexOf(null), 2);
	equal(list.indexOf(undefined), -1);
	equal(list.indexOf(), -1);
});
test ("lastIndexOf", function () {
	list.set("123");
	equal(list.lastIndexOf("123"), 3);
	equal(list.lastIndexOf(undefined), -1);
	equal(list.lastIndexOf(), -1);
});
test ("indicesOf", function () {
	list.set(null);
	equal(list.indicesOf(null).toString(), [2, 3].toString());
	equal(list.indicesOf(undefined).toString(), [].toString());
	equal(list.indicesOf().toString(), [].toString());
});
test ("empty", function () {
	ok(!list.empty());
	list.clear();
	ok(list.empty());
});
test ("removeAt", function () {
	list.removeAt(-1);
	list.removeAt(100);
	list.removeAt();
	list.removeAt(undefined);
	equal(list.size(), 3);
	list.removeAt(0);
	equal(list.size(), 2);
	equal(list.get(0), 456);
});
test ("removeRange", function () {
	list.removeRange(undefined);
	list.removeRange(undefined, undefined);
	list.removeRange();
	list.removeRange(-1, 2);
	list.removeRange(1, 1);
	equal(list.size(), 3);
	list.removeRange(1, 2);
	equal(list.size(), 2);
	equal(list.get(1), null);
	list.removeRange(0, 100);
	ok(list.empty());
});
test ("remove", function () {
	list.remove();
	list.remove(undefined);
	equal(list.size(), 3);
	list.remove("123");
	equal(list.size(), 2);
	equal(list.get(0), 456);
});
test ("removeLast", function () {
	list.set("123");
	list.removeLast();
	list.removeLast(undefined);
	equal(list.size(), 4);
	list.removeLast("123");
	equal(list.size(), 3);
	equal(list.get(0), "123");
});
test ("removeAll", function () {
	list.set("123");
	list.removeAll("123");
	equal(list.size(), 2);
	equal(list.get(0), 456);
	list.removeAll();
	ok(list.empty());
});
test ("reverse", function () {
	equal(list.get(0), "123");
	equal(list.get(2), null);
	list.reverse();
	equal(list.get(0), null);
	equal(list.get(2), "123");
});
test ("sub", function () {
	equal(list.sub(undefined, undefined), undefined);
	equal(list.sub(undefined), undefined);
	equal(list.sub(), undefined);
	equal(list.sub(-1, 2), undefined);
	equal(list.sub(2, 100), undefined);
	equal(list.sub(1, 1).toString(), (new List()).toString());
	equal(list.sub(1, 3).toString(), (new List([456, null])).toString())
});
test ("toArray", function () {
	var arr = list.toArray();
	equal(arr.toString(), ["123", 456, null].toString());
	arr.pop();
	equal(list.toArray().toString(), ["123", 456, null].toString());
});
test ("each", function () {
	var _i = 0;
	list.each(function (i, v) {
		equal(_i++, i);
		ok(v !== undefined);
	});
});
test ("filter", function () {
	equal(list.filter(function (i, v){ return i % 2 == 0; }).toString(), new List(["123", null]).toString());
	equal(list.filter(undefined), undefined);
	equal(list.filter(), undefined);
});


module("Map Method Testing", {
	setup: function() {
		map = new Map();
		map.set("0", "123");
		map.set("1", "456");
		map.set("1", 456);
		map.set("2", null);
		map.set(3, undefined);
		map.set(undefined, "abc");
		map.set(undefined, undefined);
		map.set();
	},
	teardown: function() {
		delete map;
	}
});
test ("toString", function () {
	equal(map.toString(), "{0:'123',1:456,2:null}");
});
test ("new", function () {
	equal(typeof map, "object");
});
test ("size", function () {
	equal(map.size(), 3);
});
test ("clear", function () {
	map.clear();
	equal(map.size(), 0);
});
test ("get", function () {
	equal(map.get("1"), 456);
	equal(map.get(1), 456);
	equal(map.get(undefined), undefined);
	equal(map.get(), undefined);
});
test ("getByValue", function () {
	map.set("3", "123");
	equal(map.getByValue("123").toString(), ["0", "3"].toString());
	equal(map.getByValue(undefined), undefined);
	equal(map.getByValue(), undefined);
});
test ("containsKey", function () {
	ok(map.containsKey("1"));
	ok(!map.containsKey(1));
	ok(!map.containsKey());
	ok(!map.containsKey(undefined));
});
test ("containsValue", function () {
	ok(map.containsValue(456));
	ok(!map.containsValue("456"));
	ok(!map.containsValue(undefined));
	ok(!map.containsValue());
});
test ("remove", function () {
	equal(map.size(), 3);
	map.remove("0");
	ok(!map.containsKey("0"));
	equal(map.size(), 2);
	map.remove(undefined);
	map.remove();
	equal(map.size(), 2);
});
test ("removeByValue", function () {
	map.set("3", null);
	equal(map.size(), 4);
	map.removeByValue(null);
	ok(!map.containsValue(null));
	equal(map.size(), 2);
	map.removeByValue(undefined);
	map.removeByValue();
	equal(map.size(), 2);
});
test ("empty", function () {
	ok(!map.empty());
	map.clear();
	ok(map.empty());
});
test ("each", function () {
	map.each(function (k, v) {
		ok(k !== undefined && v !== undefined);
	});
});
test ("filter", function () {
	var m = new Map();
	m.set("2", null);
	equal(map.filter(function (k, v){ return k === "2"; }).toString(), m.toString());
	equal(map.filter(undefined), undefined);
	equal(map.filter(), undefined);
});
test ("keys", function () {
	equal(map.keys().toString(), ["0", "1", "2"].toString());
	map.clear();
	equal(map.keys().toString(), [].toString());
});
test ("values", function () {
	equal(map.values().toString(), ["123", 456, null].toString());
	map.clear();
	equal(map.values().toString(), [].toString());
});


module("Stack Method Testing", {
	setup: function() {
		stack = new Stack();
		stack.push("123");
		stack.push(456);
		stack.push(null);
		stack.push(undefined);
		stack.push();
	},
	teardown: function() {
		delete stack;
	}
});
test ("pop", function () {
	equal(stack.pop(), null);
	equal(stack.pop(), 456);
	equal(stack.pop(), "123");
	equal(stack.pop(), undefined);
	equal(stack.size(), 0);
});
test ("peek", function () {
	equal(stack.peek(), null);
	equal(stack.size(), 3);
	stack.clear();
	equal(stack.peek(), undefined);
});
test ("toArray", function () {
	var arr = stack.toArray();
	equal(arr.toString(), [null, 456, "123"].toString());
	arr.pop();
	equal(stack.toArray().toString(), [null, 456, "123"].toString());
});
test ("each", function () {
	stack.each(function (v) {
		ok(v !== undefined);
	});
	ok(stack.empty());
});


module("Queue Method Testing", {
	setup: function() {
		queue = new Queue();
		queue.offer("123");
		queue.offer(456);
		queue.offer(null);
		queue.offer(undefined);
		queue.offer();
	},
	teardown: function() {
		delete queue;
	}
});
test ("poll", function () {
	equal(queue.poll(), "123");
	equal(queue.poll(), 456);
	equal(queue.poll(), null);
	equal(queue.poll(), undefined);
	equal(queue.size(), 0);
});
test ("peek", function () {
	equal(queue.peek(), "123");
	equal(queue.size(), 3);
	queue.clear();
	equal(queue.peek(), undefined);
});
test ("each", function () {
	queue.each(function (v) {
		ok(v !== undefined);
	});
	ok(queue.empty());
});


module("MultiMap Method Testing", {
	setup: function() {
		mMap = new MultiMap();
		mMap.set("1", "123");
		mMap.set("2", 456);
		mMap.set("2", 456);
		mMap.set("2", "123");
		mMap.set("3", null);
		mMap.set(4, undefined);
		mMap.set(undefined, "abc");
		mMap.set(undefined, undefined);
		mMap.set();
	},
	teardown: function() {
		delete mMap;
	}
});
test ("getByValue", function () {
	equal(mMap.getByValue("123").toString(), ["1", "2"].toString());
	equal(mMap.getByValue(undefined), undefined);
	equal(mMap.getByValue(), undefined);
});
test ("getNumberOfValues", function () {
	equal(mMap.getNumberOfValues("1"), 1);
	equal(mMap.getNumberOfValues(2), 2);
	equal(mMap.getNumberOfValues("5"), undefined);
	equal(mMap.getNumberOfValues(undefined), undefined);
	equal(mMap.getNumberOfValues(), undefined);
});
test ("containsValue", function () {
	ok(mMap.containsValue(null));
	ok(!mMap.containsValue("456"));
	ok(!mMap.containsValue(undefined));
	ok(!mMap.containsValue());
});
test ("removeByContainsValue", function () {
	mMap.removeByContainsValue(null);
	mMap.removeByContainsValue(undefined);
	mMap.removeByContainsValue();
	equal(mMap.size(), 2);
	mMap.removeByContainsValue("123");
	ok(mMap.empty());
});
test ("removeValue", function () {
	mMap.removeValue("123");
	mMap.removeValue("456");
	mMap.removeValue(undefined);
	mMap.removeValue();
	equal(mMap.size(), 2);
	equal(mMap.get("1"), undefined);
	equal(mMap.getNumberOfValues("2"), 1);
	equal(mMap.get("3")[0], null);
});
test ("each", function () {
	mMap.each(function (k, v) {
		ok(k !== undefined && v !== undefined);
	});
});
test ("filter", function () {
	var mm = new MultiMap();
	mm.set("2", 456);
	mm.set("2", "123");
	equal(mMap.filter(function (k, v){ return k === "2"; }).toString(), mm.toString());
	equal(mMap.filter(undefined), undefined);
	equal(mMap.filter(), undefined);
});