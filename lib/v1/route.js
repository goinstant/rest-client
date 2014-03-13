/*jshint node:true*/
'use strict';

exports = module.exports = Route;

var _ = require('lodash');

// sub-routes on apps
var Rooms = require('./rooms');
var AuthSettings = require('./auth_settings');

var acceptedCrud = [
  'apps',
  'devs'
];

var optionsWhitelist = {
  'sort': 'sort',
  'direction': 'direction',
  'page': 'page',
  'per_page': 'per_page',
  // Legacy input key names:
  'pageSize': 'per_page',
  'pageNumber': 'page'
};

function Route(client, route) {
  if (!client || !client.req) {
    throw new Error('Invalid client.');
  }
  if (!_.isString(route) || acceptedCrud.indexOf(route) === -1) {
    throw new Error('Invalid route.');
  }

  this.route = route.charAt(0) === '/'? route : '/' + route;
  this.req = client.req.bind(client);

  switch(route) {
    case 'apps':
      this.rooms = new Rooms(this);
      this.authSettings = new AuthSettings(this);
      this.loginSettings = this.authSettings; // XXX: legacy alias
      break;
  }
}

/**
 * Retrieve all rows (for the authenticated account)
 *
 * @param {object} opts
 * @param {function} cb
 */
Route.prototype.all = function(opts, cb) {
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

  var reqOpts = {
    method: 'GET',
    url: this.route
  };

  reqOpts.qs = {};
  _.each(optionsWhitelist, function(key, inputKey) {
    if (!_.isUndefined(opts[inputKey])) {
      reqOpts.qs[key] = opts[inputKey];
    }
  });

  this.req(reqOpts, function(err, objs, resp) {
    if (err) {
      return cb(err, null, resp);
    }

    cb(null, objs, resp);
  });
};

/**
 * Get single resource by id
 *
 * @param {number} id
 * @param {function} cb
 */
Route.prototype.get = function(id, cb) {
  if (!_.isNumber(id)) {
    throw new Error('Parameter id must be an integer');
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback must be supplied');
  }

  var reqOpts = {
    method: 'GET',
    url: this.route + '/' + id
  };

  this.req(reqOpts, function(err, obj, resp) {
    if (err) {
      return cb(err, null, resp);
    }

    cb(null, obj, resp);
  });
};

/**
 * Create new resource
 *
 * @param {object} opts
 * @param {function} cb
 */
Route.prototype.create = function(opts, cb) {
  if (!_.isObject(opts)) {
    throw new Error('Parameter opts must be an object');
  }
  if (Object.keys(opts).length < 1) {
    throw new Error('Parameter opts must have at least one property');
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback must be supplied');
  }

  var reqOpts = {
    method: 'POST',
    url: this.route + '/',
    body: JSON.stringify(opts) // Should throw on invalid opts
  };

  this.req(reqOpts, function(err, obj, resp) {
    if (err) {
      return cb(err, null, resp);
    }

    cb(null, obj, resp);
  });
};

/**
 * Update resource by id
 *
 * @param {number} id
 * @param {object} opts
 * @param {function} cb
 */
Route.prototype.update = function(id, opts, cb) {
  if (!_.isNumber(id)) {
    throw new Error('Parameter id must be an integer');
  }
  if (!_.isObject(opts)) {
    throw new Error('Parameter opts must be an object');
  }
  if (Object.keys(opts).length < 1) {
    throw new Error('At least one property must be passed to update');
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback must be supplied');
  }

  var reqOpts = {
    method: 'PATCH',
    url: this.route + '/' + id,
    body: JSON.stringify(opts) // Should throw on invalid opts
  };

  this.req(reqOpts, function(err, obj, resp) {
    if (err) {
      return cb(err);
    }

    cb(null, obj, resp);
  });
};

/**
 * Remove resource by id
 *
 * @param {number} id
 * @param {function} cb
 */
Route.prototype.remove = function(id, cb) {
  if (!_.isNumber(id)) {
    throw new Error('Parameter id must be an integer');
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback must be supplied');
  }

  var reqOpts = {
    method: 'DELETE',
    url: this.route + '/' + id
  };

  this.req(reqOpts, function(err, empty, resp) {
    if (err) {
      return cb(err, null, resp);
    }

    cb(null, empty, resp);
  });
};
