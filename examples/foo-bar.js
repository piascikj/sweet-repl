var sweetRepl = require('../index'); // You should use require('sweet-repl');

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

// now `telnet localhost 20000` in terminal and execute `help()`