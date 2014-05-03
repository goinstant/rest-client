/*jshint node:true*/
'use strict';

exports = module.exports = Version1;

var Client = require('./client');

function Version1(opts) {
  return new Client(opts);
}
