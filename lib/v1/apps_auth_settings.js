/*jshint node:true*/
'use strict';

exports = module.exports = AuthSettings;

var _ = require('lodash');

function AuthSettings(parent, opts) {
  if (!_.isUndefined(opts) && !_.isPlainObject(opts)) {
    throw new Error('Parameter opts must be an object');
  }

  this.client = parent.client;
  this.pathname = '/apps/:app/auth-settings';

  this.body = {};
  this.query = _.extend({}, opts);

  this.params = parent.params ? parent.params : null;

  if (!this.params || !this.params.app) {
    throw new Error('App identity required for auth settings');
  }

  return this;
}

/**
 * Get auth settings for an app
 *
 * @param {object} opts - Optional query parameters
 * @param {function} cb - Callback function
 */
AuthSettings.prototype.get = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for get');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to get');
  }

  this.pathname = this.client._path(this.pathname, this.params);

  // Build request options object
  var reqOpts = {
    method: 'GET',
    url: this.pathname,
    qs: _.extend({}, opts, this.query)
  };

  return this.client.req(reqOpts, cb);
};

/**
 * Update auth settings for an app
 *
 * @param {object} opts - Parameters to update
 * @param {function} cb - Callback function
 */
AuthSettings.prototype.update = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for update');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to update');
  }

  this.pathname = this.client._path(this.pathname, this.params);

  // Build request options object
  var reqOpts = {
    method: 'PATCH',
    url: this.pathname,
    body: _.extend({}, opts, this.body),
    qs: _.extend({}, this.query)
  };

  return this.client.req(reqOpts, cb);
};

/**
 * Set auth settings for an app
 *
 * @param {object} opts - Parameters to update
 * @param {function} cb - Callback function
 */
AuthSettings.prototype.set = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for set');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to set');
  }

  this.pathname = this.client._path(this.pathname, this.params);

  // Build request options object
  var reqOpts = {
    method: 'PUT',
    url: this.pathname,
    body: _.extend({}, opts, this.body),
    qs: _.extend({}, this.query)
  };

  return this.client.req(reqOpts, cb);
};
