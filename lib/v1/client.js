/*jshint node:true*/
'use strict';

exports = module.exports = Version1;

var util = require('util');
var _ = require('lodash');

var Client = require('../client');
var Apps = require('./apps');
var Devs = require('./devs');
var Keys = require('./keys');
var Teams = require('./teams');
var Channels = require('./channels');

var DEFAULT_ENDPOINT = 'https://api.goinstant.net';
var DEFAULT_VERSION = 'v1';

var OPTS_WHITELIST = [
  'client_id',
  'client_secret',
  'access_token',
  'version',
  'endpoint',
  'strictSSL',
  'proxy',
  'headers'
];

var QUERY_OPTS = [
  'lookup'
];

function Version1(opts) {
  _.extend(this, _.pick(opts, OPTS_WHITELIST));

  var hasAccessToken = _.isString(this.access_token);
  var hasVersion1Id = _.isString(this.client_id);
  var hasVersion1Secret = _.isString(this.client_secret);
  var hasCredentials = hasVersion1Id && hasVersion1Secret;

  if (!hasAccessToken && !hasCredentials) {
    throw new Error('access_token, or client_id and client_secret required');
  }
  if (!_.isUndefined(this.access_token) && !_.isString(this.access_token)) {
    throw new Error('access_token must be a string');
  }
  if (!_.isUndefined(this.client_id) && !hasVersion1Id) {
    throw new Error('client_id must be a string');
  }
  if (!_.isUndefined(this.client_secret) && !hasVersion1Secret) {
    throw new Error('client_secret must be a string');
  }

  this.queryOpts = QUERY_OPTS;

  this.version = opts.version || DEFAULT_VERSION;
  this.endpoint = opts.endpoint || DEFAULT_ENDPOINT;
  this.endpoint += '/' + this.version;

  return this;
}

util.inherits(Version1, Client);

Version1.prototype.apps = function(param, opts) {
  return new Apps(this, param, opts);
};

Version1.prototype.devs = function(param, opts) {
  return new Devs(this, param, opts);
};

Version1.prototype.teams = function(param, opts) {
  return new Teams(this, param, opts);
};

Version1.prototype.keys = function(param, opts) {
  return new Keys(this, param, opts);
};

Version1.prototype.channels = function(param, opts) {
  return new Channels(this, param, opts);
};
