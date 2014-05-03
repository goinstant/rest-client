/*jshint node:true*/
'use strict';

exports = module.exports = Rooms;

var _ = require('lodash');

function Rooms(parent, param) {
  this.client = parent.client;
  this.pathname = '/apps/:app/rooms/:room';

  this.body = {};
  this.query = {};

  this.params = parent.params || {};
  this.query = parent.query || {};

  if (!this.params || !this.params.app) {
    throw new Error('App identity required for rooms');
  }

  if (param) {
    this.params.room = param;
  }

  return this;
}

/**
 * Get rooms for an app
 *
 * @param {object} opts - Optional query parameters
 * @param {function} cb - Callback function
 */
Rooms.prototype.get = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for get');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to get');
  }

  // When no room supplied, retrieve all
  if (!this.params.room) {
    this.pathname = this.pathname.replace('/:room', '');
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
 * Create a room for an app
 *
 * @param {object} opts - Optional query parameters
 * @param {function} cb - Callback function
 */
Rooms.prototype.create = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to create');
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for create');
  }

  this.pathname = this.pathname.replace('/:room', '');
  this.pathname = this.client._path(this.pathname, this.params);

  // Build request options object
  var reqOpts = {
    method: 'POST',
    url: this.pathname,
    body: _.extend({}, opts, this.body),
    qs: _.extend({}, this.query)
  };

  return this.client.req(reqOpts, cb);
};

Rooms.prototype.users = function() {
  return new Users(this);
};

function Users(parent) {
  this.client = parent.client;
  this.pathname = '/apps/:app/rooms/:room/users';

  this.body = {};
  this.query = {};

  this.params = parent.params || null;
  this.query = parent.query || {};

  return this;
}

/**
 * Get users for a room
 *
 * @param {object} opts - Optional query parameters
 * @param {function} cb - Callback function
 */
Users.prototype.get = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for get');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to get');
  }

  // When no room supplied, retrieve all
  if (!this.params.room) {
    this.pathname = this.pathname.replace('/:room', '');
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
