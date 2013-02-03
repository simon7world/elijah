Elijah JavaScript Collection Library
====================================
### Copyright ©2013 Simon P Chang.
Last Version: 0.7<br>
Available Collection: [List](#list), [Map](#map), [Stack](#stack), [Queue](#queue), [MultiMap](#multimap)<br>
Scheduled Collection: (v0.8)[TreeList](#treelist), (v0.9)[TreeMap](#treemap)<br>
Author: Simon P Chang<br>
Email: simon.zsh.peter@gmail.com

List
----
### Introduction:

Represents a list of objects that can be accessed by index.

### Methods:

* size()
* clear()
* set(value) -- value: not undefined
* get(index)
* setRange(values) -- values: Array or List
* contains(value)
* indexOf(value) -- first index
* lastIndexOf(value)
* indicesOf(value)
* empty()
* removeAt(index)
* removeRange(from, to) -- from >= index < to
* remove(value) -- remove first element
* removeLast(value)
* removeAll(value)
* reverse()
* toArray()
* each(fn) -- fn: function(index, value)
* filter(fn) -- fn: function(index, value) { return Boolean }
* toString()

### Example:

    var l1 = new List();
    var l2 = new List([1, 2, 3]);
    var l3 = new List(new List([1, 2, 3]));

Map
---
### Introduction:

Represents a collection of keys and values.

### Methods:

* size()
* clear()
* set(key, value) -- key: not undefined, value: not undefined
* get(key) -- get value by key
* getByValue(value) -- get key by value
* containsKey(key)
* containsValue(value)
* remove(key) -- remove by key
* removeByValue(value)
* empty()
* each(fn) -- fn: function(key, value)
* filter(fn) -- fn: function(key, value) { return Boolean }
* keys()
* values()
* toString()

### Example:

    var m = new Map();

Stack
-----
### Introduction:

Represents a variable size last-in-first-out (LIFO) collection of objects.

### Methods:

* size()
* clear()
* push(value) -- value: not undefined
* pop()
* pushRange(values) -- values: Array or List
* peek()
* contains(value)
* empty()
* toArray()
* each(fn) -- fn: function(value) `the Stack will be empty if 'each' method completely executed`
* toString()

### Example:

    var s1 = new Stack();
    var s2 = new Stack([1, 2, 3]);
    var s3 = new Stack(new List([1, 2, 3]));

Queue
-----
### Introduction:

Represents a variable size first-in, first-out (FIFO) collection of objects.

### Methods:

* size()
* clear()
* offer(value) -- value: not undefined
* poll()
* offerRange(values) -- values: Array or List
* peek()
* contains(value)
* empty()
* toArray()
* each(fn) -- fn: function(value) `the Queue will be empty if 'each' method completely executed`
* toString()

### Example:

    var q1 = new Queue();
    var q2 = new Queue([1, 2, 3]);
    var q3 = new Queue(new List([1, 2, 3]));

MultiMap
--------
### Introduction:

Represents a collection similar to a Map, but which may associate multiple values with a single key.

### Methods:

* size()
* clear()
* set(key, value) -- key: not undefined, value: not undefined
* get(key) -- get value by key
* getByValue(value) -- get key by value
* getNumberOfValues(key)
* containsKey(key)
* containsValue(value)
* remove(key) -- remove pair by key
* removeByValue(value)
* removeByContainsValue(value)
* removeValue(value) -- remove value not pair
* empty()
* each(fn) -- fn: function(key, value)
* filter(fn) -- fn: function(key, value) { return Boolean }
* keys()
* values()
* toString()

### Example:

    var mm = new MultiMap();


UnitTest Framework
==================
Framework: [QUnit](http://qunitjs.com/)<br>
Version: 1.11.0


Closure Tool
============
Tool: [Closure Compiler](https://developers.google.com/closure/compiler/)<br>
Version: 20121212
