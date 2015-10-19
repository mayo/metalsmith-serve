'use strict';

var server;

module.exports = function plugin(options) {
  var _plugin = function startPlugin(files, metalsmith, cb) {
    if (!!server) {
      return cb();
    }
    server = require('./server')(options, metalsmith, cb);
  };

  _plugin.shutdown = function shutdownPlugin(done) {
    server.close(done);
  };

  return _plugin;
};
