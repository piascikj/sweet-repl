var sweetRepl = require('../index'); // You should use require('sweet-repl');
var fs = require('fs');

sweetRepl
  .command('doNextTick', 'writes testfile on nextTick'
           ,function() { 
              process.nextTick(function() {
                setTimeout(function() {
                  //console.log("Written on nextTick");
                  fs.unlink('testfile', function(err) {
                    fs.openSync('testfile', 'w');
                  });
                }, 10000);
              });
           })
  .start({ prompt: 'sweet-repl>' }, 20000);

// now `telnet localhost 20000` in terminal and execute `help()`