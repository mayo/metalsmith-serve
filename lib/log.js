'use strict';

var chalk = require('chalk');

function formatNumber(num) {
  return num < 10 ? '0' + num : num;
}

module.exports = function log(message, timestamp) {
  var tag = chalk.blue('[metalsmith-serve]');
  var date = new Date();
  var tstamp = formatNumber(date.getHours()) + ':' + formatNumber(date.getMinutes()) + ':' + formatNumber(date.getSeconds());
  console.log(tag + (timestamp ? ' ' + tstamp : '') + ' ' + message);
};
