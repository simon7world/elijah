Elijah JavaScript Collection Library
====================================
### Copyright ©2013 Simon P Chang.
Last Version: 0.7<br>
Author: Simon P Chang<br>
Email: simon.zsh.peter@gmail.com

List
----
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
* toString()

### Create:

    var l1 = new List();
	var l2 = new List([1, 2, 3]);

Map
---
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
* keys()
* values()
* toString()

Stack
-----
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

Queue
-----
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

MultiMap
--------
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
* keys()
* values()
* toString()