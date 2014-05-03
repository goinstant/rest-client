/*jshint node:true*/
'use strict';

exports = module.exports = Apps;

var _ = require('lodash');

var AuthSettings = require('./apps_auth_settings');
var Rooms = require('./apps_rooms');

function Apps(client, param, opts) {
  if (_.isPlainObject(param)) {
    opts = param;
    param = undefined;
  }

  this.client = client;
  this.pathname = '/apps/:app';

  this.body = {};
  this.query = _.extend({}, opts);

  this.params = null;
  if (_.isNumber(param) || _.isString(param)) {

    // Specify lookup parameter when using name
    if (!_.isNumber(param) && !this.query.lookup) {
      this.query.lookup = 'name';
    }

    this.params = {};
    this.params.app = param;
  }

  return this;
}

/**
 * Get all, or a single app
 *
 * @param {object} opts - Optional query parameters
 * @param {function} cb - Callback function
 */
Apps.prototype.get = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for get');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to get');
  }

  // No URL parameters means GET all apps
  if (!this.params) {
    this.pathname = this.pathname.replace('/:app', '');

  // Get specific app with URL parameters supplied
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
 * Create an app
 *
 * @param {object} opts - App properties to use
 * @param {function} cb - Callback function
 */
Apps.prototype.create = function(opts, cb) {
  if (this.params) {
    throw new Error('Cannot create app with specific id');
  }
  if (!_.isPlainObject(opts) || Object.keys(opts).length < 1) {
    throw new Error('New properties are required for create');
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for create');
  }

  this.pathname = this.pathname.replace('/:app', '');

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
 * Remove an app
 *
 * @param {function} cb - Callback function
 */
Apps.prototype.remove = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for remove');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to remove');
  }
  if (!this.params) {
    throw new Error('App identity required for remove');
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
 * Update an app
 *
 * @param {object} opts - App properties to update
 * @param {function} cb - Callback function
 */
Apps.prototype.update = function(opts, cb) {
  if (!this.params) {
    throw new Error('App identity required for update');
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

/**
 * Rooms for an app
 *
 * @param {function} opts - Options
 */
Apps.prototype.rooms = function(opts) {
  return new Rooms(this, opts);
};

/**
 * Login settings for an app
 *
 * @param {function} opts - Options
 */
Apps.prototype.authSettings = function(opts) {
  return new AuthSettings(this, opts);
};
