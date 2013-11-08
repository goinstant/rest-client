/*jshint node:true*/
'use strict';

exports = module.exports = Client;

var _ = require('lodash');
var async = require('async');
var request = require('request');

var DEFAULT_ENDPOINT = 'https://api.goinstant.net';
var DEFAULT_VERSION = 'v1';

function Client(opts) {
  opts = opts || {};

  if (!_.isUndefined(opts.client_id) && !_.isString(opts.client_id)) {
    throw new Error('client_id must be a string');
  }
  if (!_.isUndefined(opts.client_id) && _.isUndefined(opts.client_secret)) {
    throw new Error('client_secret must also be defined');
  }

  if (!_.isUndefined(opts.client_secret) && !_.isString(opts.client_secret)) {
    throw new Error('client_secret must be a string');
  }
  if (!_.isUndefined(opts.client_secret) && _.isUndefined(opts.client_id)) {
    throw new Error('client_id must also be defined');
  }

  if (opts.access_token && !_.isString(opts.access_token)) {
    throw new Error('access_token must be a string');
  }

  this.version = opts.version || DEFAULT_VERSION;
  this.endpoint = opts.endpoint || DEFAULT_ENDPOINT;
  this.endpoint += '/' + this.version;

  this.client_id = opts.client_id || null;
  this.client_secret = opts.client_secret || null;
  this.hasCredentials = opts.client_id && opts.client_secret;
  this.access_token = opts.access_token || false;

  if (opts.proxy) {
    this.proxy = opts.proxy;
  }
  if (opts.headers) {
    this.headers = opts.headers;
  }
}

/**
 * Adds client_id and client_secret to the client
 *
 * @param {object} opts
 */
Client.prototype.credentials = function(opts) {
  if (!_.isString(opts.client_id)) {
    throw new Error('client_id must be a string');
  }
  if (!_.isString(opts.client_secret)) {
    throw new Error('client_secret must be a string');
  }

  this.client_id = opts.client_id;
  this.client_secret = opts.client_secret;
  this.hasCredentials = true;
};

/**
 * Perform requests to the API
 *
 * @param {object} opts
 * @param {function} cb
 */
Client.prototype.req = function(opts, cb) {
  var tasks = [
    this._performRequest.bind(this, opts)
  ];

  // Client is not yet authenticated and must obtain a token
  if (!this.access_token) {
    tasks.unshift(this.authenticate.bind(this));
  }

  async.series(tasks, function(err, results) {
    if (err) {
      return cb(err);
    }

    // Only return the req result, not authenticate
    var requestResult = results[tasks.length - 1];
    var result = requestResult && requestResult[0] || null;

    cb(null, result);
  });
};

/**
 * Perform request
 *
 * @param {object} client
 * @param {object} opts
 * @param {function} cb
 */
Client.prototype._performRequest = function(opts, cb) {
  var self = this;
  var originalOpts = _.cloneDeep(opts);
  opts = forceOpts(self, opts);

  self._req(opts, function(err, res, body) {
    // Error returned from http client
    if (err) {
      return cb(err, body, res);
    }

    // Inspect the body for API errors
    self._inspectBody(res, body, function(err, body, response) {
      if (err) {
        // Retry authentication on invalid_grant
        if (err.message === 'invalid_grant') {
          self.access_token = false;
          return self.req(originalOpts, cb);
        }

        return cb(err, body, response);
      }

      cb(null, body, response);
    });
  });
};

/**
 * Handle API response
 *
 * @param {object} body
 * @param {function} cb
 */
Client.prototype._inspectBody = function(res, body, cb) {
  // No body, successful request
  var hasRes = !!res;
  if (!_.isObject(body)) {
    if (hasRes && res.statusCode === 503) {
      return cb(new Error('Down for maintenance'), null, res);
    }
    if (hasRes && res.statusCode === 204) {
      return cb(null, {}, res);
    }

    return cb(new Error('Invalid response'), null, res);
  }

  // GoInstant API Error
  if (body.error) {
    var error = new Error(body.error);
    if (body.error === 'Validation failed') {
      error.validation = body.messages;
    }

    return cb(error, null, res);
  }

  cb(null, body, res);
};

/**
 * Obtain an access token
 *
 * @param {function} cb
 */
Client.prototype.authenticate = function(cb) {
  if (!this.hasCredentials) {
    return cb(
      new Error('Client requires credentials to authenticate')
    );
  }

  var self = this;
  self.access_token = false;

  var opts = {
    method: 'POST',
    url: '/oauth/access_token',
    body: JSON.stringify({
      client_id: self.client_id,
      client_secret: self.client_secret
    })
  };

  self._performRequest(opts, function(err, body) {
    if (err) {
      return cb(err);
    }
    // No api error, but no access token either
    if (!body.token) {
      return cb(new Error('Unknown access_token error'));
    }

    self.access_token = body.token;

    cb();
  });
};

Client.prototype._req = request;

/**
 * Force request options required for the API
 *
 * @param {object} client
 * @param {object} opts
 */
function forceOpts(client, opts) {
  opts.headers = opts.headers || {};
  opts.headers = _.extend(opts.headers, client.headers || {});
  opts.url = client.endpoint + opts.url;
  opts.json = true;

  var noQueryToken = !opts.query || !opts.query.access_token;
  var noHeaderToken = !opts.headers.Authorization;
  var noAccessToken = noQueryToken && noHeaderToken;
  if (noAccessToken && client.access_token) {
    opts.headers.Authorization = 'Bearer ' + client.access_token;
  }

  opts.strictSSL = client.strictSSL || false;
  opts.headers['Content-Type'] = 'application/json';

  return opts;
}
