/*jshint node:true*/
'use strict';

exports = module.exports = Teams;

var _ = require('lodash');

var Devs = require('./devs');

var optionsWhitelist = [
  'sort',
  'direction',
  'pageSize',
  'pageNumber'
];

function Teams(client) {
  if (!client || !client.req) {
    throw new Error('Invalid client.');
  }

  this.route = '/teams';
  this.req = client.req.bind(client);

  // Submodule
  this.devs = new Devs(this);
  this.developers = this.devs;
}

/**
 * Retrieve all teams (for the authenticated account)
 *
 * @param {object} opts
 * @param {function} cb
 */
Teams.prototype.all = function(opts, cb) {
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

  reqOpts.qs = _.pick(opts, function(val, key) {
    return optionsWhitelist.indexOf(key) > -1;
  });

  this.req(reqOpts, function(err, teams, resp) {
    if (err) {
      return cb(err, null, resp);
    }

    cb(null, teams, resp);
  });
};

/**
 * Get single team by id
 *
 * @param {number} id
 * @param {function} cb
 */
Teams.prototype.get = function(id, cb) {
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

  this.req(reqOpts, function(err, team, resp) {
    if (err) {
      return cb(err, null, resp);
    }

    cb(null, team, resp);
  });
};

/**
 * Create a new team
 *
 * @param {object} opts
 * @param {function} cb
 */
Teams.prototype.create = function(opts, cb) {
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

  this.req(reqOpts, function(err, team, resp) {
    if (err) {
      return cb(err, null, resp);
    }

    cb(null, team, resp);
  });
};

/**
 * Update team by id
 *
 * @param {number} id
 * @param {object} opts
 * @param {function} cb
 */
Teams.prototype.update = function(id, opts, cb) {
  if (!_.isNumber(id)) {
    throw new Error('Parameter id must be an integer');
  }
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
    method: 'PATCH',
    url: this.route + '/' + id,
    body: JSON.stringify(opts) // Should throw on invalid opts
  };

  this.req(reqOpts, function(err, team, resp) {
    if (err) {
      return cb(err, null, resp);
    }

    cb(null, team, resp);
  });
};

/**
 * Remove team by id
 *
 * @param {number} id
 * @param {function} cb
 */
Teams.prototype.remove = function(id, cb) {
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
