/*jshint node:true*/
'use strict';

var requestStub = exports; exports.constructor = function requestStub(){};

var request = require('request');
var sinon = require('sinon');

var stubMethods = [
  'post', 'patch', 'del', 'get'
];

/**
 * Stub out request module, mocha before
 */
requestStub.before = function() {
  stubMethods.forEach(function(method) {
    sinon.stub(request, method).yields(null, {}, {});
  });
};

/**
 * Reset stubs, mocha after
 */
requestStub.after = function() {
  stubMethods.forEach(function(method) {
    request[method].restore();
  });
};
