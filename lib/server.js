'use strict';

var nodeStatic = require('node-static');
var _          = require('lodash');
var http       = require('http');
var path       = require('path');
var HTTPStatus = require('http-status');
var log        = require('./log');
var chalk      = require('chalk');

module.exports = createServer;

function _onReqEnd(options, staticServer, request, response, err) {

  if (!err) {
    if (options.verbose) {
      log('[' + response.statusCode + '] ' + request.url, true);
    }
    return;
  }

  if (options.redirects[request.url]) {
    log(chalk.yellow('[' + HTTPStatus.MOVED_PERMANENTLY + '] ' + request.url + ' > ' + options.redirects[request.url]), true);
    response.writeHead(HTTPStatus.MOVED_PERMANENTLY, {
      'Location': options.redirects[request.url]
    });
    return response.end(HTTPStatus[HTTPStatus.MOVED_PERMANENTLY]);
  }

  if (err.status && options.http_error_files && options.http_error_files[err.status]) {
    log(chalk.yellow('[' + err.status + '] ' + request.url + ' - served: ' + options.http_error_files[err.status]), true);
    return staticServer.serveFile(options.http_error_files[err.status], err.status, {}, request, response);
  }

  log(chalk.red('[' + err.status + '] ' + request.url), true);

  response.writeHead(err.status, err.headers);
  response.end(HTTPStatus[err.status]);
}

function addListenerToRequestEnd(options, staticServer, request, response) {
  var onReqEnd = _.partial(_onReqEnd, options, staticServer, request, response);
  request
    .addListener('end', _.bind(staticServer.serve, staticServer, request, response, onReqEnd))
    .resume();
}

function createServer(options, metalsmith, cb) {
  options = options || {};

  if (_.isUndefined(metalsmith)) {
    throw new Error('No metalsmith sent to createServer');
  }

  var docRoot = options.document_root ?
    path.resolve(options.document_root) :
    metalsmith.destination();

  var staticServer = new nodeStatic.Server(docRoot, {
    cache: options.cache,
    indexFile: options.indexFile,
    headers: options.headers
  });

  var server = http.createServer(_.partial(addListenerToRequestEnd, options, staticServer));

  server.on('error', function(err) {
    if (err.code === 'EADDRINUSE') {
      log(chalk.red('Address ' + options.host + ':' + options.port + ' already in use'));
      throw err;
    }
  });

  server.listen(options.port, options.host, function callback() {
    log(chalk.green('serving ' + docRoot + ' at http://' + options.host + ':' + options.port));
    cb(server);
  });

}
