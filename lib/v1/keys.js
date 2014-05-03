/*jshint node:true*/
'use strict';

exports = module.exports = Keys;

var _ = require('lodash');

var UPDATE_WHITELIST = [
  'value',
  'options'
];

function Keys(client, param, opts) {
  if (!_.isString(param)) {
    throw new Error('Key path must be supplied');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Parameter opts must be an object');
  }

  this.client = client;
  this.pathname = '/keys/:app/:room/:key';

  this.body = {};
  this.query = {};

  var app, room;

  // Perform lookup by app id
  if (opts.app_id) {
    if (!_.isNumber(opts.app_id)) {
      throw new Error('App id must be a number');
    }

    app = opts.app_id;

  // Perform lookup by app name
  } else if (opts.app_name) {
    if (!_.isString(opts.app_name)) {
      throw new Error('App name must be a string');
    }

    this.query.lookup = 'name';
    app = opts.app_name;

  } else {
    throw new Error('App name or id must be supplied');
  }

  // Perform lookup by room id
  if (opts.room_id) {
    if (this.query.lookup) {
      throw new Error('Cannot mix types, Room name must be supplied');
    }
    if (!_.isNumber(opts.room_id)) {
      throw new Error('Room id must be a number');
    }

    room = opts.room_id;

  // Perform lookup by room name
  } else if (opts.room_name) {
    if (!this.query.lookup) {
      throw new Error('Cannot mix types, Room id must be supplied');
    }
    if (!_.isString(opts.room_name)) {
      throw new Error('Room name must be a string');
    }

    room = opts.room_name;

  } else {
    throw new Error('Room name or id must be supplied');
  }

  var key = param;
  if (param.charAt(0) === '/') {
    key = param.substr(1);
  }

  this.params = {
    key: key,
    app: app,
    room: room
  };

  return this;
}

/**
 * Get all, or a single key
 *
 * @param {object} opts - Optional query parameters
 * @param {function} cb - Callback function
 */
Keys.prototype.get = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for get');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to get');
  }

  // Get specific key with URL parameters supplied
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
 * Remove an key
 *
 * @param {function} cb - Callback function
 */
Keys.prototype.remove = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for remove');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to remove');
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
 * Update an key
 *
 * @param {object} opts - Key properties to update
 * @param {function} cb - Callback function
 */
Keys.prototype.update = function(opts, cb) {
  opts = _.pick(opts, UPDATE_WHITELIST);

  if (!_.isPlainObject(opts) || Object.keys(opts).length < 1) {
    throw new Error('Invalid options supplied to update');
  }
  if (!opts.value) {
    throw new Error('Value is required for update');
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for update');
  }

  this.pathname = this.client._path(this.pathname, this.params);
  
  // Build request options object
  var reqOpts = {
    method: 'PUT',
    url: this.pathname,
    body: {
      value: opts.value,
      options: _.extend({}, opts.options)
    },
    qs: {
      create_room: opts.create_room
    }
  };

  return this.client.req(reqOpts, cb);
};
