
/*!
 * sweet-repl
 * Copyright (c) 2014 Innobuilt Software LLC <dev@innobuilt.com>
 * MIT Licensed
 *
 * Based on Cluster - repl
 * Copyright (c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var net  = require('net')
  , repl = require('repl')
  , _    = require('lodash');

/**
 * Enable REPL with repl options and all arguments passed to `net.Server#listen()`.
 *
 * Examples:
 *
 * var sweetRepl = require('sweet-repl');
 *
 * sweetRepl.command('foo', 'prints bar:<str>', function(str) { this.keyVal('bar:',str); })
 *          .start({ prompt: 'sweet-repl>' }, 20000);
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
      self.commands.forEach(function(cmd) {
        var params = cmd.fn.toString().match(/^function +\((.*?)\)/)[1];
            params = params.split(/ *, */).slice(2);
       
        _this.keyVal(cmd.name + '(' + params.join(', ') + ')', fn.description);
      });
    }
  }];
}

SweetRepl.prototype.start = function() {
  var args = arguments;
  if (!args.length) throw new Error('start() requires repl options and port/host or path');
  
  var replOpts = _.extend(this.opts, args[0]);

  var self = this;

  // start repl
  // TCP or unix-domain socket repl
  this.server = net.createServer(function(sock){
    replOpts.input = sock; replOpts.output = sock;
    
    self.repl = repl.start(replOtps);
  
    // augment socket to provide some formatting methods
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
  this.server.listen.apply(server, Array.prototype.slice.call(arguments, 1));
};

SweetRepl.prototype.command = function(name, desc, fn) {
  // Add the commands with help here to this.context
  this.commands.push({name: name, desc:desc, fn:fn});
  return this;
};

module.exports = new SweetRepl();
