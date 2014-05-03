/*jshint node:true*/
'use strict';

exports = module.exports = TeamsDevs;

var _ = require('lodash');

function TeamsDevs(parent, param, opts) {
  if (_.isPlainObject(param)) {
    opts = param;
    param = undefined;
  }

  this.client = parent.client;
  this.pathname = '/teams/:team/devs/:dev';

  this.body = {};
  this.query = _.extend({}, opts);

  this.params = parent.params;

  if (_.isNumber(param) || _.isString(param)) {
    if (!this.params) {
      this.params = {};
    }

    this.params.dev = param;
  }

  return this;
}

/**
 * Get all, or a single dev on a particular team
 *
 * @param {object} opts - Optional query parameters
 * @param {function} cb - Callback function
 */
TeamsDevs.prototype.get = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for get');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to get');
  }

  this.pathname = this.client._path(this.pathname, this.params);

  // No URL parameters means GET all devs for team
  if (this.params && !this.params.dev) {
    this.pathname = this.pathname.replace('/:dev', '');
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
 * Add a dev to a team
 *
 * @param {object} opts - Options
 * @param {function} cb - Callback function
 */
TeamsDevs.prototype.add = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (this.params && this.params.dev) {
    throw new Error('Developer id must be passed to add');
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for add');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to add');
  }
  if (!_.isNumber(opts.id)) {
    throw new Error('Property id required for add');
  }

  this.pathname = this.client._path(this.pathname, this.params);
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
 * Remove a dev from a team
 *
 * @param {object} opts - Options
 * @param {function} cb - Callback function
 */
TeamsDevs.prototype.remove = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for remove');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to remove');
  }
  if (!this.params || !this.params.dev) {
    throw new Error('Developer identity required for remove');
  }

  this.pathname = this.client._path(this.pathname, this.params);

  // Build request options object
  var reqOpts = {
    method: 'DELETE',
    url: this.pathname,
  };

  return this.client.req(reqOpts, cb);
};
