Elijah JavaScript Collection Library
====================================
### Copyright 2013 Simon P Chang.
Last Version: 0.5<br>
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
* indexOf(value)
* lastIndexOf(value)
* indicesOf(value)
* empty()
* removeAt(index)
* removeRange(from, to) -- from >= index < to
* remove(value)
* removeLast(value)
* removeAll(value)
* reverse()
* toArray()
* each(fn) -- fn: function(index, value)
* toString()

Map
---
### Methods:

* size()
* clear()
* set(key, value) -- key: not undefined, value: not undefined
* get(key)
* getByValue(value)
* containsKey(key)
* containsValue(value)
* remove(key)
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
