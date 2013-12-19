/* jshint node: true */
'use strict';

exports = module.exports = Channels;

var path = require('path');

var _ = require('lodash');

function Channels(client) {
  if (!client || !client.req) {
    throw new Error('Invalid client');
  }

  this.route = '/channels';
  this.req = client.req.bind(client);
}

function validate(opts, cb) {
  if (!_.isFunction(cb)) {
    throw new Error('Callback must be supplied');
  }

  if (!_.isObject(opts)) {
    throw new Error('Parameter opts must be an object');
  }

  _.each(['app_id', 'room_id', 'channel'], function(item) {
    if (!_.isString(opts[item]) && !_.isNumber(opts[item])) {
      throw new Error(
        'Opts property ' + item + ' must be a string or integer'
      );
    }
  });
}

Channels.prototype.message = function(opts, cb) {
  validate(opts, cb);

  // set also requires a value be passed
  if (_.isUndefined(opts.value)) {
    throw new Error('Options[value] must be provided');
  }

  var reqOpts = {
    method: 'POST',
    url: this.route + path.join(
      // allow numbers
      '/', '' + opts.app_id, '' + opts.room_id, '' + opts.channel
    ),
    body: JSON.stringify({
      value: opts.value
    })
  };

  this.req(reqOpts, cb);
};
