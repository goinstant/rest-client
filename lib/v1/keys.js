/* jshint node: true */
'use strict';

exports = module.exports = Keys;

var path = require('path');

var _ = require('lodash');

function Keys(client) {
  if (!client || !client.req) {
    throw new Error('Invalid client');
  }

  this.route = '/keys';
  this.req = client.req.bind(client);
}

function validate(opts, cb) {
  if (!_.isFunction(cb)) {
    throw new Error('Callback must be supplied');
  }

  if (!_.isObject(opts)) {
    throw new Error('Parameter opts must be an object');
  }

  _.each(['app_id', 'room_id', 'key'], function(item) {
    if (!_.isString(opts[item]) && !_.isNumber(opts[item])) {
      throw new Error(
        'Opts property ' + item + ' must be a string or integer'
      );
    }
  });
}

Keys.prototype.get = function(opts, cb) {
  validate(opts, cb);

  var reqOpts = {
    method: 'GET',
    url: this.route + path.join(
      // allow numbers
      '/', '' + opts.app_id, '' + opts.room_id, '' + opts.key
    )
  };

  this.req(reqOpts, cb);
};

Keys.prototype.remove = function(opts, cb) {
  validate(opts, cb);

  var reqOpts = {
    method: 'DELETE',
    url: this.route + path.join(
      // allow numbers
      '/', '' + opts.app_id, '' + opts.room_id, '' + opts.key
    )
  };

  this.req(reqOpts, cb);
};

Keys.prototype.update = function(opts, cb) {
  validate(opts, cb);

  // set also requires a value be passed
  if (_.isUndefined(opts.value)) {
    throw new Error('Options[value] must be provided');
  }

  var reqOpts = {
    method: 'PUT',
    url: this.route + path.join(
      // allow numbers
      '/', '' + opts.app_id, '' + opts.room_id, '' + opts.key
    ),
    body: JSON.stringify({
      value: opts.value,
      options: opts.options
    })
  };

  this.req(reqOpts, cb);
};
