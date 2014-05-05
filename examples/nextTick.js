var sweetRepl = require('../index'); // You should use require('sweet-repl');

sweetRepl
  .command('doNextTick', 'writes to console on nextTick'
           ,function() { 
              process.nextTick(function() {
                setTimeout(function() {
                  console.log("Written on nextTick");
                }, 5000);
              });
           })
  .start({ prompt: 'sweet-repl>' }, 20000);

// now `telnet localhost 20000` in terminal and execute `help()`