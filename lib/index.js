'use strict';

var web = require('node-static');
var chalk = require('chalk');
var debug = require('debug')('metalsmith-serve');

var server;

module.exports = plugin;

function plugin(options) {
  var defaults = { cache: 0, port: 8080, host: "localhost", verbose: false };
  var opts = options || {};

  setDefaults(opts, defaults);

  return function(files, metalsmith, done) {
    var docRoot = metalsmith.destination();
    var fileServer = new web.Server(docRoot, { cache: opts.cache });

    if (server) {
      done();
      return;
    }

    server = require('http').createServer(function (request, response) {
      request.addListener('end', function () {

        fileServer.serve(request, response, function(err, res) {
          if (err) {
            log(chalk.red("[" + err.status + "] " + request.url), true);

            response.writeHead(err.status, err.headers);
            response.end("Not found");

          } else if (opts.verbose) {
            log("[" + response.statusCode + "] " + request.url, true);
          }
        });

      }).resume();
    }).listen(opts.port, opts.host);

    log(chalk.green("serving " + docRoot + " at http://" + opts.host + ":" + opts.port));

    done();
  }

  function setDefaults(opts, defaults) {
    Object.keys(defaults).forEach(function(key) {
      if (!opts[key]) {
        opts[key] = defaults[key];
      }
    });
  }

  function formatNumber(num) {
    return num < 10 ? "0" + num : num;
  }

  function log(message, timestamp) {
    var tag = chalk.blue("[metalsmith-serve]");
    var date = new Date();
    var tstamp = formatNumber(date.getHours()) + ":" + formatNumber(date.getMinutes()) + ":" + formatNumber(date.getSeconds());
    console.log(tag + (timestamp ? " " + tstamp : "") + " " + message);
  }

}

