/*jshint node:true*/
'use strict';

exports = module.exports = Rooms;

var _ = require('lodash');

var optionsWhitelist = {
  'sort': 'sort',
  'direction': 'direction',
  'page': 'page',
  'per_page': 'per_page',
  // Legacy input key names:
  'pageSize': 'per_page',
  'pageNumber': 'page'
};

function Rooms(client) {
  if (!client || !client.req) {
    throw new Error('Invalid client.');
  }

  this.route = client.route;
  this.req = client.req.bind(client);
}

/**
 * Retrieve all rows (for the authenticated account)
 *
 * @param {object} opts
 * @param {function} cb
 */
Rooms.prototype.all = function(opts, cb) {
  if (_.isFunction(opts)) {
    cb = opts;
    opts = {};
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback must be supplied');
  }
  if (!_.isObject(opts)) {
    throw new Error('Parameter opts must be an object');
  }
  if (Object.hasOwnProperty('app_id')) {
    throw new Error('Parameter opts must have property app_id');
  }
  if (!_.isNumber(opts.app_id)) {
    throw new Error('Opts property app_id must be an integer');
  }

  var reqOpts = {
    method: 'GET',
    url: this.route + '/' + opts.app_id + '/rooms'
  };

  reqOpts.qs = {};
  _.each(optionsWhitelist, function(key, inputKey) {
    if (!_.isUndefined(opts[inputKey])) {
      reqOpts.qs[key] = opts[inputKey];
    }
  });

  this.req(reqOpts, function(err, rooms, resp) {
    if (err) {
      return cb(err, null, resp);
    }

    cb(null, rooms, resp);
  });
};

/**
 * Get single resource by id
 *
 * @param {number} id
 * @param {function} cb
 */
Rooms.prototype.get = function(id, opts, cb) {
  validateRoomParams(id, opts, cb);

  var reqOpts = {
    method: 'GET',
    url: this.route + '/' + opts.app_id + '/rooms/' + id
  };

  this.req(reqOpts, function(err, room, resp) {
    if (err) {
      return cb(err, null, resp);
    }

    cb(null, room, resp);
  });
};

/**
 * Get list of users for a particular room
 *
 * @param {number} id
 * @param {function} cb
 */
Rooms.prototype.users = function(id, opts, cb) {
  validateRoomParams(id, opts, cb);

  var reqOpts = {
    method: 'GET',
    url: this.route + '/' + opts.app_id + '/rooms/' + id + '/users'
  };

  this.req(reqOpts, function(err, users, resp) {
    if (err) {
      return cb(err, null, resp);
    }

    cb(null, users, resp);
  });
};

function validateRoomParams(id, opts, cb) {
  if (!_.isNumber(id)) {
    throw new Error('Parameter id must be an integer');
  }
  if (!_.isObject(opts)) {
    throw new Error('Parameter opts must be an object');
  }
  if (Object.hasOwnProperty('app_id')) {
    throw new Error('Parameter opts must have property app_id');
  }
  if (!_.isNumber(opts.app_id)) {
    throw new Error('Opts property app_id must be an integer');
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback must be supplied');
  }
}
