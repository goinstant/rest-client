/*jshint node:true*/
'use strict';

exports = module.exports = Client;

var _ = require('lodash');
var async = require('async');
var request = require('request');

function Client() {
}

/**
 * Perform an API request with required options
 *
 * @param {object} opts - Request options
 * @param {function} cb - Callback function
 */
Client.prototype._performReq = function(opts, cb) {
  var self = this;
  var reqOpts = _.cloneDeep(opts);

  reqOpts = this._addHeaders(reqOpts);
  reqOpts = this._addEndpoint(reqOpts);

  // Force json content type
  reqOpts.json = true;
  reqOpts.headers['Content-Type'] = 'application/json';

  // Optional strictSSL
  reqOpts.strictSSL = this.strictSSL || false;

  this._req(reqOpts, function(err, res, body) {
    err = self._error(err, res, body);
    if (err) {

      // Retry request with authentication step on invalid_grant
      if (err.message === 'invalid_grant') {
        self.access_token = false;
        return self.req(opts, cb);
      }

      return cb(err, res, null);
    }

    body = _.isUndefined(body)? {} : body;

    cb(null, res, body);
  });
};

/**
 * Primary request method, performs authentication step when needed
 *
 * @param {object} opts - Request options
 * @param {function} cb - Callback function
 */
Client.prototype.req = function(opts, cb) {
  var tasks = [
    this._performReq.bind(this, opts)
  ];

  if (!this.access_token) {
    tasks.unshift(this._authenticate.bind(this));
  }

  async.series(tasks, function(err, results) {
    if (err) {
      return cb(err, null, null);
    }

    // Only return the req result, not authenticate
    var requestResult = results[tasks.length - 1];
    var body = requestResult[1];
    var response = requestResult[0];

    cb(null, body, response);
  });
};

/**
 * Authenticate the client
 *
 * @param {function} cb - Callback function
 */
Client.prototype._authenticate = function(cb) {
  var self = this;

  var opts = {
    method: 'POST',
    url: '/oauth/access_token',
    body: {
      client_id: this.client_id,
      client_secret: this.client_secret
    }
  };

  this.access_token = false;
  this._performReq(opts, function(err, res, body) {
    if (err) {
      return cb(err);
    }
    if (!body || !body.token) {
      return cb(new Error('Unknown access_token error'));
    }

    self.access_token = body.token;
    self.expires = body.expires;
  
    cb();
  });
};

/**
 * Add required headers to the request options
 *
 * @param {object} opts - Request options
 */
Client.prototype._addHeaders = function(opts) {
  var headers = _.extend({}, opts.headers);

  var hasAuthorizationHeader = headers.Authorization;
  var hasQueryToken = opts.query && opts.query.access_token;

  // Append token if available and none present
  if (!hasQueryToken && !hasAuthorizationHeader && this.access_token) {
    headers.Authorization = 'Bearer ' + this.access_token;
  }

  opts.headers = _.extend(headers, this.headers);
  return opts;
};

/**
 * Add the API endpoint to the request URL
 *
 * @param {object} opts - Request options
 */
Client.prototype._addEndpoint = function(opts) {
  opts.url = this.endpoint + opts.url;

  return opts;
};

/**
 * Inspect response body for particular API errors
 *
 * @param {object} err - Error object
 * @param {object} body - Response body
 * @param {object} res - Response object
 */
Client.prototype._error = function(err, res, body) {
  if (_.isString(err)) {
    err = new Error(err);

  } else if (!err && body.error) {
    err = new Error(body.error);

    // Append validation messages
    if (body.error === 'Validation failed') {
      err.validation = body.messages;
    }
  }

  if (!err) {
    return null;
  }

  // Provide status code
  err.statusCode = res ? res.statusCode : 'Unknown';

  return err;
};

/**
 * Replace URL parameters in pathname
 *
 * @param {string} pathname - Request pathname
 * @param {object} opts - Parameters
 */
Client.prototype._path = function(pathname, opts) {
  _.each(opts, function(value, key) {
    pathname = pathname.replace(':' + key, value);
  });
  return pathname;
};

/**
 * Expose request for easy stubbing
 */
Client.prototype._req = request;
