/*jshint node:true*/
'use strict';

exports = module.exports = LoginSettings;

var _ = require('lodash');

function LoginSettings(client) {
  if (!client || !client.req) {
    throw new Error('Invalid client.');
  }

  this.route = client.route;
  this.fullRoute = this.route + '/:id/login-settings';
  this.req = client.req.bind(client);
}

LoginSettings.prototype.get = function(appId, cb) {
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

LoginSettings.prototype.update = function(appId, settings, cb) {
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

LoginSettings.prototype.set = function(appId, settings, cb) {
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
