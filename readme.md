What is **sweet-repl**?
====

**sweet-repl** is a jumpstart for nodejs repl creation that provides some utility methods for your context and a customizable help.
It's based on [cluster/lib/plugins/repl.js at master · LearnBoost/cluster](https://github.com/LearnBoost/cluster/blob/master/lib/plugins/repl.js)
for the repl implementation and help from [visionmedia/commander.js](https://github.com/visionmedia/commander.js)

Installation
----
    $ npm install sweet-repl

Example
----
```js
/**
 * Module dependencies.
 */

var sweetRepl = require('sweet-repl');

sweetRepl
  .command('foo', 'prints foo:<str>'
           ,function(str) { 
             this.keyVal('foo',str);
             return str;
           })
  .command('bar', 'prints bar:<str>' 
           ,function(str) { 
             this.keyVal('bar',str);
             return str;
           })
  .start({ prompt: 'sweet-repl>' }, 20000);

```
```
$ telnet localhost 20000
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
sweet-repl>help()

  HELP
  ----

  help(): Display help information
  foo(str): prints foo:<str>
  bar(str): prints bar:<str>

----------------------------------------------------
'Thanks for using sweet-repl by <jesse@piascik.net>'
sweet-repl>foo('bar')
  foo: bar
'bar'
sweet-repl>bar('foo')
  bar: foo
'foo'
sweet-repl>.exit
```

*this* helper functions in commands
----
### title(str)
prints `[str]` in cyan with preceding and trailing line feed

### keyVal(key, val)
prints `[key]: [val]` in gray with trailing line feed

### prinln(str)
prints `[str]` with trailing line feed

Roadmap
----
- Provide a custom help solution like commander

License
----

(The MIT License)

Copyright (c) 2014 Jesse Piacik <jesse@piascik.net>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
