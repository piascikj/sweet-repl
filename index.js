
/*!
 * sweet-repl
 * Copyright (c) 2014 Innobuilt Software LLC <dev@innobuilt.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var net  = require('net')
  , repl = require('repl');

/**
 * Enable REPL with repl options and all arguments passed to `net.Server#listen()`.
 *
 * Example:
 *
 * var sweetRepl = require('sweet-repl');
 *
 * sweetRepl
 *   .command('foo', 'prints foo:<str>'
 *            ,function(str) { 
 *              this.keyVal('foo',str);
 *              return str;
 *            })
 *   .command('bar', 'prints bar:<str>' 
 *            ,function(str) { 
 *              this.keyVal('bar',str);
 *              return str;
 *            })
 *   .start({ prompt: 'sweet-repl>' }, 20000);
 * 
 * In the terminal:
 *
 *    $ telnet localhost 20000
 *
 * @return {SweetRepl}
 * @api public
 */

function SweetRepl() {
  var self = this;
  this.opts = { prompt: 'sweet-repl>' };
  this.commands = [{
    name: 'help',
    desc: 'Display help information',
    fn: function() {
      _this = this;
      
      this.title('HELP');
      this.println('  ----');
      this.println('');

      self.commands.forEach(function(cmd) {
        var params = cmd.fn.toString().match(/^function +\((.*?)\)/)[1];

        _this.keyVal(cmd.name + '(' + params + ')', cmd.desc);
      });

      this.println();
      this.println('----------------------------------------------------');
      
      return         "Thanks for using sweet-repl by <jesse@piascik.net>";
    }
  }];
}

SweetRepl.prototype.start = function() {
  var args = arguments;
  if (!args.length) throw new Error('start() requires repl options and port/host or path');
  
  var self = this;
  extend(this.opts, args[0]);
  // start repl
  // tcp or unix-domain socket repl
  this.server = net.createServer(function(sock){
    extend(self.opts, { input: sock, output: sock });
    
    self.repl = repl.start(self.opts);
    
    // destroy the socket on exit
    self.repl.on('exit', function() {
      sock.destroy();
    });
  
    // tools to pass as this in command function
    var tools = { 
      title : function(str) { sock.write('\n  \033[36m' + str + '\033[0m\n'); },
      keyVal : function(key, val) { sock.write('  \033[90m' + key + ':\033[0m ' + val + '\n'); },
      println : function(str) { sock.write((str || '') + '\n'); }
    };

    // merge commands into context
    // executing in context of tools
    self.commands.forEach(function(cmd) {
      self.repl.context[cmd.name] = function(){
        var args = Array.prototype.slice.call(arguments);
        return cmd.fn.apply(tools, args);
      };
    });

    return this;
  });

  // Apply all arguments given
  this.server.listen.apply(this.server, Array.prototype.slice.call(arguments, 1));
};

SweetRepl.prototype.stop = function(cb) {
  cb = cb || function() {};
  this.server.close(cb);
  this.server.unref();
};

SweetRepl.prototype.command = function(name, desc, fn) {
  // Add the commands with help here to this.context
  this.commands.push({name: name, desc:desc, fn:fn});
  return this;
};

function extend(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
};

module.exports = new SweetRepl();
