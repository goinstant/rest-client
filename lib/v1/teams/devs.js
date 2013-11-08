/*jshint node:true*/
'use strict';

exports = module.exports = Devs;

var _ = require('lodash');

function Devs(client) {
  if (!client || !client.req) {
    throw new Error('Invalid client.');
  }

  this.route = client.route;
  this.req = client.req.bind(client);
}

/**
 * Add developer to team
 *
 * @param {number} id
 * @param {object} opts
 * @param {function} cb
 */
Devs.prototype.add = function(id, opts, cb) {
  if (!_.isNumber(id)) {
    throw new Error('Parameter id must be an integer');
  }
  if (!_.isObject(opts)) {
    throw new Error('Parameter opts must be an object');
  }
  if (Object.hasOwnProperty('developer_id')) {
    throw new Error('Parameter opts must have property developer_id');
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback must be supplied');
  }

  var reqOpts = {
    method: 'POST',
    url: this.route + '/' + id + '/devs',
    body: JSON.stringify({
      developer: opts.developer_id
    }) // Should throw on invalid opts
  };

  this.req(reqOpts, function(err, dev, resp) {
    if (err) {
      return cb(err);
    }

    cb(null, dev, resp);
  });
};

/**
 * Remove developer from team
 *
 * @param {number} id
 * @param {number} dev
 * @param {function} cb
 */
Devs.prototype.remove = function(id, opts, cb) {
  if (!_.isNumber(id)) {
    throw new Error('Parameter id must be an integer');
  }
  if (!_.isObject(opts)) {
    throw new Error('Parameter opts must be an object');
  }
  if (Object.hasOwnProperty('developer_id')) {
    throw new Error('Parameter opts must have property developer_id');
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback must be supplied');
  }

  var reqOpts = {
    method: 'DELETE',
    url: this.route + '/' + id + '/devs/' + opts.developer_id
  };

  this.req(reqOpts, function(err, empty, resp) {
    if (err) {
      return cb(err, null, resp);
    }

    cb(null, empty, resp);
  });
};

/**
 * List developers for a team
 *
 * @param {number} id
 * @param {number} dev
 * @param {function} cb
 */
Devs.prototype.all = function(id, cb) {
  if (!_.isNumber(id)) {
    throw new Error('Parameter id must be an integer');
  }
  if (!_.isFunction(cb)) {
    throw new Error('Callback must be supplied');
  }

  var reqOpts = {
    method: 'GET',
    url: this.route + '/' + id + '/devs'
  };

  this.req(reqOpts, function(err, devs, resp) {
    if (err) {
      return cb(err, null, resp);
    }

    cb(null, devs, resp);
  });
};
