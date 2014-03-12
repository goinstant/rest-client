/*jshint node:true*/
'use strict';

exports = module.exports = AuthSettings;

var _ = require('lodash');

function AuthSettings(client) {
  if (!client || !client.req) {
    throw new Error('Invalid client.');
  }

  this.route = client.route;
  this.fullRoute = this.route + '/:id/auth-settings';
  this.req = client.req.bind(client);
}

AuthSettings.prototype.get = function(appId, cb) {
  if (!_.isFunction(cb)) {
    throw new Error('Callback must be supplied');
  }
  if (!_.isNumber(appId)) {
    throw new Error('appId parameter must be an integer');
  }

  var reqOpts = {
    method: 'GET',
    url: this.fullRoute.replace(':id', appId)
  };
  this.req(reqOpts, cb);
};

AuthSettings.prototype.update = function(appId, settings, cb) {
  if (!_.isFunction(cb)) {
    throw new Error('Callback must be supplied');
  }
  if (!_.isPlainObject(settings)) {
    throw new Error('Settings changes must be an object');
  }
  if (!_.isNumber(appId)) {
    throw new Error('appId parameter must be an integer');
  }

  var reqOpts = {
    method: 'PATCH',
    url: this.fullRoute.replace(':id', appId),
    body: JSON.stringify(settings)
  };
  this.req(reqOpts, cb);
};

AuthSettings.prototype.set = function(appId, settings, cb) {
  if (!_.isFunction(cb)) {
    throw new Error('Callback must be supplied');
  }
  if (!_.isPlainObject(settings)) {
    throw new Error('Settings must be an object');
  }
  if (!_.isNumber(appId)) {
    throw new Error('appId parameter must be an integer');
  }

  var reqOpts = {
    method: 'PUT',
    url: this.fullRoute.replace(':id', appId),
    body: JSON.stringify(settings)
  };
  this.req(reqOpts, cb);
};
