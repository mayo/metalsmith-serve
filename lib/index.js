'use strict';

var _ = require('lodash');

var defaults = {
  cache: 0,
  port: 8080,
  host: 'localhost',
  verbose: false,
  listDirectories: false,
  indexFile: 'index.html',
  headers: {},
  redirects: {}
};

var _server, _options;

function serverCreatedCallback(newServer, done) {
  _server = newServer;
  done();
}

function createServer(files, metalsmith, next) {
  if (_server) {
    return _server.close(function() {
      _server = null;
      createServer(files, metalsmith, next);
    });
  }
  return require('./server')(_options, metalsmith, _.partial(serverCreatedCallback, _, next));
}

module.exports = function metalsmithServe(options) {
  _options = options || {};
  _.defaults(_options, defaults);
  return createServer;
};
