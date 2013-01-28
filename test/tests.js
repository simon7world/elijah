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


module("List Function Testing", {
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


module("Map Function Testing", {
	setup: function() {
		map = new Map();
		map.set("0", "123");
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


module("Stack Function Testing", {
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
test ("toString", function () {
	equal(stack.toString(), "['123',456,null]");
});
test ("new", function () {
	equal(typeof stack, "object");
	var arr = [1, 2, 3];
	var newStack = new Stack(arr);
	equal(typeof newStack, "object");
	equal(newStack.toString(), [1, 2, 3].toString());
	arr.pop();
	equal(newStack.toString(), [1, 2, 3].toString());
});
test ("size", function () {
	equal(stack.size(), 3);
});
test ("clear", function () {
	stack.clear();
	equal(stack.size(), 0);
});
test ("pop", function () {
	equal(stack.pop(), null);
	equal(stack.pop(), 456);
	equal(stack.pop(), "123");
	equal(stack.pop(), undefined);
	equal(stack.size(), 0);
});
test ("pushRange", function () {
	var tmpList = new List(["1", "2", "3"]);
	stack.pushRange(tmpList);
	equal(stack.pop(), "3");
	equal(stack.pop(), "2");
	tmpList.clear();
	equal(stack.pop(), "1");
});
test ("peek", function () {
	equal(stack.peek(), null);
	equal(stack.size(), 3);
});
test ("contains", function () {
	ok(stack.contains(456));
	ok(!stack.contains("456"));
	ok(!stack.contains());
	ok(!stack.contains(undefined));
});
test ("empty", function () {
	ok(!stack.empty());
	stack.clear();
	ok(stack.empty());
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