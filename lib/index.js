'use strict';

var plugin   = require('./plugin');
var _        = require('lodash');
var defaults = {
    cache: 0,
    port: 8080,
    host: 'localhost',
    verbose: false,
    listDirectories: false,
    indexFile: 'index.html',
    useWatch: true,
    headers: {},
    redirects: {}
};

module.exports  = function (options) {
    options = options || {};
    _.defaults(options, defaults);
    return plugin(options);
};
