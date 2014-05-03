/*jshint node:true*/
'use strict';

exports = module.exports = Channels;

var _ = require('lodash');

function Channels(client, param, opts) {
  if (!_.isString(param)) {
    throw new Error('Channel path must be supplied');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Parameter opts must be an object');
  }

  this.client = client;
  this.pathname = '/channels/:app/:room/:channel';

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

  var channel = param;
  if (param.charAt(0) === '/') {
    channel = param.substr(1);
  }

  this.params = {
    app: app,
    room: room,
    channel: channel
  };

  return this;
}

/**
 * Send a message across a particular channel
 *
 * @param {object} opts - Optional query parameters
 * @param {function} cb - Callback function
 */
Channels.prototype.message = function(opts, cb) {
  cb = _.isFunction(opts)? opts : cb;
  opts = _.isFunction(opts)? {} : opts;

  if (!_.isFunction(cb)) {
    throw new Error('Callback is required for message');
  }
  if (!_.isPlainObject(opts)) {
    throw new Error('Invalid options supplied to message');
  }

  // Message specific channel with URL parameters supplied
  this.pathname = this.client._path(this.pathname, this.params);

  // Build request options object
  var reqOpts = {
    method: 'POST',
    url: this.pathname,
    qs: _.extend({}, opts, this.query)
  };

  return this.client.req(reqOpts, cb);
};
