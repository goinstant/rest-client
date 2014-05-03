/*jshint node:true*/
'use strict';

exports = module.exports = Devs;

var _ = require('lodash');

function Devs(client, param, opts) {
  if (_.isPlainObject(param)) {
    opts = param;
    param = undefined;
  }

  this.client = client;
  this.pathname = '/devs/:dev';

  this.body = {};
  this.query = _.extend({}, opts);

  this.params = null;
  if (_.isNumber(param) || _.isString(param)) {
    this.params = {
      dev: param
    };
  }

  return this;
}

/**
 * Get all, or a single dev
 *
 * @param {object} opts - Optional query parameters
 * @param {function} cb - Callback function
 */
Devs.prototype.get = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for get');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to get');
  }

  // No URL parameters means GET all devs
  if (!this.params) {
    this.pathname = this.pathname.replace('/:dev', '');

  // Get specific dev with URL parameters supplied
  } else {
    this.pathname = this.client._path(this.pathname, this.params);
  }

  // Build request options object
  var reqOpts = {
    method: 'GET',
    url: this.pathname,
    qs: _.extend({}, opts, this.query)
  };

  return this.client.req(reqOpts, cb);
};

/**
 * Create an dev
 *
 * @param {object} opts - Dev properties to use
 * @param {function} cb - Callback function
 */
Devs.prototype.create = function(opts, cb) {
  if (this.params) {
    throw new Error('Cannot create dev with specific id');
  }
  if (!_.isPlainObject(opts) || Object.keys(opts).length < 1) {
    throw new Error('New properties are required for create');
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for create');
  }

  this.pathname = this.pathname.replace('/:dev', '');

  // Build request options object
  var reqOpts = {
    method: 'POST',
    url: this.pathname,
    qs: _.extend({}, this.query),
    body: _.extend({}, opts, this.body)
  };

  return this.client.req(reqOpts, cb);
};

/**
 * Remove an dev
 *
 * @param {function} cb - Callback function
 */
Devs.prototype.remove = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for remove');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to remove');
  }
  if (!this.params) {
    throw new Error('Dev identity required for remove');
  }

  this.pathname = this.client._path(this.pathname, this.params);

  // Build request options object
  var reqOpts = {
    method: 'DELETE',
    url: this.pathname,
  };

  return this.client.req(reqOpts, cb);
};

/**
 * Update an dev
 *
 * @param {object} opts - Dev properties to update
 * @param {function} cb - Callback function
 */
Devs.prototype.update = function(opts, cb) {
  if (!this.params) {
    throw new Error('Dev identity required for update');
  }
  if (!_.isPlainObject(opts) || Object.keys(opts).length < 1) {
    throw new Error('New properties are required for update');
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for update');
  }

  this.pathname = this.client._path(this.pathname, this.params);

  // Build request options object
  var reqOpts = {
    method: 'PATCH',
    url: this.pathname,
    qs: _.extend({}, this.query),
    body: _.extend({}, opts, this.body)
  };

  return this.client.req(reqOpts, cb);
};
